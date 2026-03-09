import type { ShapeNode, TranslatedComponent, CanvasState } from './types'

const CANVAS_W = 800
const CANVAS_H = 600
const PHONE_W = 390
const PHONE_H = 844

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

export function translate(state: CanvasState): TranslatedComponent[] {
  const shapes = state.order.map(id => state.shapes[id]).filter(Boolean)
  if (shapes.length === 0) return []

  const used = new Set<string>()
  const result: TranslatedComponent[] = []

  // Sort by area descending (large containers first)
  const sorted = [...shapes].sort((a, b) => {
    const areaA = a.type === 'text' ? 0 : a.width * a.height
    const areaB = b.type === 'text' ? 0 : b.width * b.height
    return areaB - areaA
  })

  // Pass 1: Find cards (large rects containing children)
  for (const s of sorted) {
    if (s.type === 'text' || used.has(s.id)) continue
    if (s.width < 180 || s.height < 100) continue

    const children = shapes.filter(c => c.id !== s.id && !used.has(c.id) && isInside(c, s))
    if (children.length === 0) {
      // Large empty rect — still a card
      const variant = isDark(s.fill) ? 'card--black' : 'card--white'
      const scaled = cardToPhone(s.y, s.height)
      used.add(s.id)
      result.push({
        kind: 'card',
        className: `card ${variant}`,
        sourceIds: [s.id],
        ...scaled,
      })
      continue
    }

    // Extract children
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
    // Also mark text inside button as used
    if (btn) {
      shapes.filter(c => c.type === 'text' && !used.has(c.id) && isInside(c, btn)).forEach(c => used.add(c.id))
    }

    const scaled = cardToPhone(s.y, s.height)
    result.push({
      kind: 'card',
      className: `card ${variant}`,
      sourceIds,
      ...scaled,
      title,
      subtitle,
      buttonLabel: btnLabel,
      buttonClass: btnClass,
    })
  }

  // Pass 2: Standalone buttons (rounded-rects not inside a card)
  for (const s of sorted) {
    if (used.has(s.id)) continue
    if (s.type !== 'rounded-rect') continue

    const label = findTextInside(shapes, s, used) ?? 'Button'
    const sourceIds = [s.id]

    // Find and consume label text
    shapes.filter(c => c.type === 'text' && !used.has(c.id) && isInside(c, s)).forEach(c => {
      sourceIds.push(c.id)
      used.add(c.id)
    })
    used.add(s.id)

    const scaled = scaleToPhone(s.x, s.y, s.width, s.height)
    result.push({
      kind: 'button',
      className: `btn ${classifyButtonType(s.fill)} ${classifyButtonSize(s.height)}`,
      sourceIds,
      ...scaled,
      buttonLabel: label,
    })
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
    result.push({
      kind: 'typography',
      className: textClass,
      sourceIds: [s.id],
      ...scaled,
      text: s.text ?? '',
      textClass,
      fill: s.fill,
    })
  }

  // Pass 4: Remaining plain rects (that weren't big enough for cards)
  for (const s of sorted) {
    if (used.has(s.id)) continue
    if (s.type === 'text') continue
    used.add(s.id)

    const variant = isDark(s.fill) ? 'card--black' : 'card--white'
    const scaled = cardToPhone(s.y, s.height)
    result.push({
      kind: 'card',
      className: `card ${variant}`,
      sourceIds: [s.id],
      ...scaled,
    })
  }

  return result
}

function findTextInside(shapes: ShapeNode[], parent: ShapeNode, used: Set<string>): string | undefined {
  const t = shapes.find(c => c.type === 'text' && !used.has(c.id) && isInside(c, parent))
  return t?.text
}
