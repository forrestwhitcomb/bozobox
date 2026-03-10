import type { ShapeNode, TranslatedComponent, TranslatedScreen, CanvasState } from './types'

const CANVAS_W = 800
const CANVAS_H = 600
const PHONE_W = 390
const PHONE_H = 844
const SCREEN_GAP_THRESHOLD = 150  // horizontal gap between shape clusters = new screen

function isInside(child: ShapeNode, parent: ShapeNode): boolean {
  const cx = child.type === 'text' ? child.x : child.x
  const cy = child.type === 'text' ? child.y : child.y
  const cw = child.type === 'text' ? (child.text?.length ?? 4) * (child.fontSize ?? 16) * 0.6 : child.width
  const ch = child.type === 'text' ? (child.fontSize ?? 16) * 1.4 : child.height
  return (
    cx >= parent.x &&
    cy >= parent.y &&
    cx + cw <= parent.x + parent.width + 4 &&
    cy + ch <= parent.y + parent.height + 4
  )
}

function isDark(hex: string): boolean {
  const c = hex.replace('#', '')
  const r = parseInt(c.substring(0, 2), 16)
  const g = parseInt(c.substring(2, 4), 16)
  const b = parseInt(c.substring(4, 6), 16)
  return (r * 0.299 + g * 0.587 + b * 0.114) < 128
}

function isReddish(hex: string): boolean {
  const c = hex.replace('#', '')
  const r = parseInt(c.substring(0, 2), 16)
  const g = parseInt(c.substring(2, 4), 16)
  const b = parseInt(c.substring(4, 6), 16)
  return r > 180 && g < 100 && b < 100
}

function classifyButtonType(fill: string, parentCardFill?: string): string {
  if (isReddish(fill)) return 'btn-primary'
  if (!isDark(fill)) return 'btn-outline-white'
  // Black button — check parent card context
  if (parentCardFill && isDark(parentCardFill)) return 'btn-outline-black-inv'
  return 'btn-outline-black'
}

function classifyButtonSize(height: number): string {
  return height >= 44 ? 'btn--lg' : 'btn--sm'
}

const PHONE_PAD = 16

function scaleY(y: number): number {
  return Math.round(y * (PHONE_H / CANVAS_H))
}

function scaleToPhone(x: number, y: number, w: number, h: number) {
  const sx = PHONE_W / CANVAS_W
  const sy = PHONE_H / CANVAS_H
  return {
    x: Math.round(x * sx),
    y: Math.round(y * sy),
    width: Math.round(w * sx),
    height: Math.round(h * sy),
  }
}

function cardToPhone(y: number, h: number) {
  return {
    x: PHONE_PAD,
    y: scaleY(y),
    width: PHONE_W - PHONE_PAD * 2,
    height: Math.round(h * (PHONE_H / CANVAS_H)),
  }
}

// --- Screen clustering ---

function clusterIntoScreens(shapes: ShapeNode[]): ShapeNode[][] {
  if (shapes.length === 0) return []

  // Get bounding x-range for each shape
  const withBounds = shapes.map(s => {
    const w = s.type === 'text' ? (s.text?.length ?? 4) * (s.fontSize ?? 16) * 0.6 : s.width
    return { shape: s, left: s.x, right: s.x + w }
  })

  // Sort by left edge
  withBounds.sort((a, b) => a.left - b.left)

  const clusters: { shapes: ShapeNode[]; left: number; right: number }[] = []

  for (const item of withBounds) {
    const last = clusters[clusters.length - 1]
    if (last && item.left <= last.right + SCREEN_GAP_THRESHOLD) {
      // Extends or overlaps current cluster
      last.shapes.push(item.shape)
      last.right = Math.max(last.right, item.right)
    } else {
      // New cluster
      clusters.push({ shapes: [item.shape], left: item.left, right: item.right })
    }
  }

  return clusters.map(c => c.shapes)
}

// Translate a single screen's shapes into components
// offsetX shifts shapes so each screen is positioned relative to itself
function translateScreen(allShapes: ShapeNode[], offsetX: number): TranslatedComponent[] {
  // Shift shapes so this screen's content starts near x=0
  const shapes = allShapes.map(s => ({ ...s, x: s.x - offsetX }))

  const used = new Set<string>()
  const result: TranslatedComponent[] = []

  const sorted = [...shapes].sort((a, b) => {
    const areaA = a.type === 'text' ? 0 : a.width * a.height
    const areaB = b.type === 'text' ? 0 : b.width * b.height
    return areaB - areaA
  })

  // Pass 1: Cards
  for (const s of sorted) {
    if (s.type === 'text' || used.has(s.id)) continue
    if (s.width < 180 || s.height < 100) continue

    const children = shapes.filter(c => c.id !== s.id && !used.has(c.id) && isInside(c, s))
    if (children.length === 0) {
      const variant = isDark(s.fill) ? 'card--black' : 'card--white'
      const scaled = cardToPhone(s.y, s.height)
      used.add(s.id)
      result.push({ kind: 'card', className: `card ${variant}`, sourceIds: [s.id], ...scaled })
      continue
    }

    const btnNodes = children.filter(c => c.type === 'rounded-rect')
    const textNodes = children
      .filter(c => c.type === 'text')
      .filter(c => !btnNodes.some(btn => isInside(c, btn)))
      .sort((a, b) => (b.fontSize ?? 16) - (a.fontSize ?? 16))

    const variant = isDark(s.fill) ? 'card--black' : 'card--white'
    const title = textNodes[0]?.text
    const subtitle = textNodes[1]?.text
    const btn = btnNodes[0]
    const btnLabel = btn ? findTextInside(shapes, btn, used) ?? 'Button' : undefined
    const btnClass = btn ? `btn ${classifyButtonType(btn.fill, s.fill)} ${classifyButtonSize(btn.height)}` : undefined

    const sourceIds = [s.id, ...children.map(c => c.id)]
    sourceIds.forEach(id => used.add(id))
    if (btn) {
      shapes.filter(c => c.type === 'text' && !used.has(c.id) && isInside(c, btn)).forEach(c => used.add(c.id))
    }

    const scaled = cardToPhone(s.y, s.height)
    result.push({ kind: 'card', className: `card ${variant}`, sourceIds, ...scaled, title, subtitle, buttonLabel: btnLabel, buttonClass: btnClass })
  }

  // Pass 2: Standalone buttons
  for (const s of sorted) {
    if (used.has(s.id)) continue
    if (s.type !== 'rounded-rect') continue

    const label = findTextInside(shapes, s, used) ?? 'Button'
    const sourceIds = [s.id]
    shapes.filter(c => c.type === 'text' && !used.has(c.id) && isInside(c, s)).forEach(c => { sourceIds.push(c.id); used.add(c.id) })
    used.add(s.id)

    const scaled = scaleToPhone(s.x, s.y, s.width, s.height)
    result.push({ kind: 'button', className: `btn ${classifyButtonType(s.fill)} ${classifyButtonSize(s.height)}`, sourceIds, ...scaled, buttonLabel: label })
  }

  // Pass 3: Standalone text
  for (const s of shapes) {
    if (used.has(s.id)) continue
    if (s.type !== 'text') continue
    used.add(s.id)

    const fs = s.fontSize ?? 16
    let textClass: string
    if (fs >= 32) textClass = 'text-display-lg'
    else if (fs >= 24) textClass = 'text-display-md'
    else if (fs >= 18) textClass = 'text-body-lg'
    else if (fs >= 14) textClass = 'text-body-md'
    else textClass = 'text-body-sm'

    const tw = (s.text?.length ?? 4) * fs * 0.6
    const th = fs * 1.4
    const scaled = scaleToPhone(s.x, s.y, tw, th)
    result.push({ kind: 'typography', className: textClass, sourceIds: [s.id], ...scaled, text: s.text ?? '', textClass, fill: s.fill })
  }

  // Pass 4: Remaining rects
  for (const s of sorted) {
    if (used.has(s.id)) continue
    if (s.type === 'text') continue
    used.add(s.id)

    const variant = isDark(s.fill) ? 'card--black' : 'card--white'
    const scaled = cardToPhone(s.y, s.height)
    result.push({ kind: 'card', className: `card ${variant}`, sourceIds: [s.id], ...scaled })
  }

  return result
}

export function translate(state: CanvasState): TranslatedScreen[] {
  const shapes = state.order.map(id => state.shapes[id]).filter(Boolean)
  if (shapes.length === 0) return []

  const clusters = clusterIntoScreens(shapes)

  return clusters.map((cluster, index) => {
    // Find the leftmost x in this cluster for offset
    const minX = Math.min(...cluster.map(s => s.x))
    const maxRight = Math.max(...cluster.map(s => {
      const w = s.type === 'text' ? (s.text?.length ?? 4) * (s.fontSize ?? 16) * 0.6 : s.width
      return s.x + w
    }))

    return {
      index,
      components: translateScreen(cluster, minX),
      canvasXRange: [minX, maxRight] as [number, number],
    }
  })
}

function findTextInside(shapes: ShapeNode[], parent: ShapeNode, used: Set<string>): string | undefined {
  const t = shapes.find(c => c.type === 'text' && !used.has(c.id) && isInside(c, parent))
  return t?.text
}
