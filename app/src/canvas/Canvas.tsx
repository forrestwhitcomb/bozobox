import React, { useRef, useCallback, useState, useEffect } from 'react'
import type { CanvasState, ShapeNode } from '../model/types'
import type { Action } from '../model/reducer'

interface Props {
  state: CanvasState
  dispatch: React.Dispatch<Action>
}

const DEFAULT_W = 800
const DEFAULT_H = 600
const MIN_SIZE = 8
const HANDLE_SIZE = 8
const MIN_ZOOM = 0.2  // zoomed out: see 5x the default area
const MAX_ZOOM = 4     // zoomed in: see 1/4 the default area

type ChildOffset = { id: string; offsetX: number; offsetY: number }

type DragState =
  | null
  | { kind: 'draw'; startX: number; startY: number; curX: number; curY: number }
  | { kind: 'move'; id: string; offsetX: number; offsetY: number; children: ChildOffset[] }
  | { kind: 'resize'; id: string; handle: string; origShape: ShapeNode; startX: number; startY: number }
  | { kind: 'pan'; lastX: number; lastY: number }

interface ViewBox { x: number; y: number; w: number; h: number }

export default function Canvas({ state, dispatch }: Props) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [drag, setDrag] = useState<DragState>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [vb, setVb] = useState<ViewBox>({ x: 0, y: 0, w: DEFAULT_W, h: DEFAULT_H })

  const zoom = DEFAULT_W / vb.w  // >1 = zoomed in, <1 = zoomed out

  const toSvg = useCallback((clientX: number, clientY: number) => {
    const svg = svgRef.current
    if (!svg) return { x: 0, y: 0 }
    const rect = svg.getBoundingClientRect()
    return {
      x: Math.round(vb.x + ((clientX - rect.left) / rect.width) * vb.w),
      y: Math.round(vb.y + ((clientY - rect.top) / rect.height) * vb.h),
    }
  }, [vb])

  // Wheel: pinch-to-zoom or scroll-to-pan (native listener for passive: false)
  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    const handler = (e: WheelEvent) => {
      e.preventDefault()
      const rect = svg.getBoundingClientRect()

      if (e.ctrlKey || e.metaKey) {
        // Zoom — pinch or ctrl+scroll
        const cursorFracX = (e.clientX - rect.left) / rect.width
        const cursorFracY = (e.clientY - rect.top) / rect.height
        const factor = e.deltaY > 0 ? 0.97 : 1.03

        setVb(prev => {
          const prevZoom = DEFAULT_W / prev.w
          const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, prevZoom * factor))
          const newW = DEFAULT_W / newZoom
          const newH = DEFAULT_H / newZoom
          return {
            x: prev.x + (prev.w - newW) * cursorFracX,
            y: prev.y + (prev.h - newH) * cursorFracY,
            w: newW,
            h: newH,
          }
        })
      } else {
        // Pan — regular scroll / two-finger swipe
        setVb(prev => {
          const prevZoom = DEFAULT_W / prev.w
          const panSpeed = 1 / prevZoom
          return {
            ...prev,
            x: prev.x + e.deltaX * panSpeed,
            y: prev.y + e.deltaY * panSpeed,
          }
        })
      }
    }
    svg.addEventListener('wheel', handler, { passive: false })
    return () => svg.removeEventListener('wheel', handler)
  }, [])

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    // Middle mouse button or space+click for panning
    if (e.button === 1) {
      setDrag({ kind: 'pan', lastX: e.clientX, lastY: e.clientY })
      try { (e.target as Element).setPointerCapture(e.pointerId) } catch {}
      return
    }
    if (e.button !== 0) return
    const { x, y } = toSvg(e.clientX, e.clientY)
    const tool = state.activeTool

    if (tool === 'select') {
      // Check if clicking a resize handle
      const sel = state.selectedId ? state.shapes[state.selectedId] : null
      if (sel) {
        const handle = hitHandle(sel, x, y)
        if (handle) {
          setDrag({ kind: 'resize', id: sel.id, handle, origShape: { ...sel }, startX: x, startY: y })
          try { (e.target as Element).setPointerCapture(e.pointerId) } catch {}
          return
        }
      }
      // Check if clicking a shape
      const hit = hitTest(state, x, y)
      if (hit) {
        // Determine the move target and its children
        let moveTarget = hit
        const children: ChildOffset[] = []

        if (hit.type === 'text') {
          // Text clicked — check if it's inside a parent shape (button/card)
          const parent = findParentShape(state, hit)
          if (parent) {
            moveTarget = parent
            // Gather all text inside the parent as children
            for (const cid of state.order) {
              const c = state.shapes[cid]
              if (!c || c.id === parent.id || c.type !== 'text') continue
              if (isContained(c, parent)) {
                children.push({ id: c.id, offsetX: x - c.x, offsetY: y - c.y })
              }
            }
          }
        } else {
          // Non-text shape — find contained text children
          for (const cid of state.order) {
            const c = state.shapes[cid]
            if (!c || c.id === hit.id || c.type !== 'text') continue
            if (isContained(c, hit)) {
              children.push({ id: c.id, offsetX: x - c.x, offsetY: y - c.y })
            }
          }
        }

        dispatch({ type: 'SELECT', id: moveTarget.id })
        setDrag({ kind: 'move', id: moveTarget.id, offsetX: x - moveTarget.x, offsetY: y - moveTarget.y, children })
        try { (e.target as Element).setPointerCapture(e.pointerId) } catch {}
      } else {
        dispatch({ type: 'SELECT', id: null })
      }
    } else {
      setDrag({ kind: 'draw', startX: x, startY: y, curX: x, curY: y })
      try { (e.target as Element).setPointerCapture(e.pointerId) } catch {}
    }
  }, [state, dispatch, toSvg])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!drag) return

    if (drag.kind === 'pan') {
      const dx = e.clientX - drag.lastX
      const dy = e.clientY - drag.lastY
      const svg = svgRef.current
      if (svg) {
        const rect = svg.getBoundingClientRect()
        setVb(prev => ({
          ...prev,
          x: prev.x - (dx / rect.width) * prev.w,
          y: prev.y - (dy / rect.height) * prev.h,
        }))
      }
      setDrag({ kind: 'pan', lastX: e.clientX, lastY: e.clientY })
      return
    }

    const { x, y } = toSvg(e.clientX, e.clientY)

    if (drag.kind === 'draw') {
      setDrag({ ...drag, curX: x, curY: y })
    } else if (drag.kind === 'move') {
      if (drag.children.length > 0) {
        const moves = [
          { id: drag.id, x: x - drag.offsetX, y: y - drag.offsetY },
          ...drag.children.map(c => ({ id: c.id, x: x - c.offsetX, y: y - c.offsetY })),
        ]
        dispatch({ type: 'MOVE_GROUP', moves })
      } else {
        dispatch({ type: 'MOVE', id: drag.id, x: x - drag.offsetX, y: y - drag.offsetY })
      }
    } else if (drag.kind === 'resize') {
      const { origShape: s, handle, startX, startY } = drag
      const dx = x - startX
      const dy = y - startY
      let nx = s.x, ny = s.y, nw = s.width, nh = s.height

      if (handle.includes('e')) { nw = Math.max(MIN_SIZE, s.width + dx) }
      if (handle.includes('w')) { nw = Math.max(MIN_SIZE, s.width - dx); nx = s.x + s.width - nw }
      if (handle.includes('s')) { nh = Math.max(MIN_SIZE, s.height + dy) }
      if (handle.includes('n')) { nh = Math.max(MIN_SIZE, s.height - dy); ny = s.y + s.height - nh }

      dispatch({ type: 'RESIZE', id: drag.id, width: nw, height: nh, x: nx, y: ny })
    }
  }, [drag, dispatch, toSvg])

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (!drag) return

    if (drag.kind === 'draw') {
      const x1 = Math.min(drag.startX, drag.curX)
      const y1 = Math.min(drag.startY, drag.curY)
      const w = Math.abs(drag.curX - drag.startX)
      const h = Math.abs(drag.curY - drag.startY)
      const tool = state.activeTool

      if (tool === 'text') {
        const id = crypto.randomUUID()
        dispatch({
          type: 'ADD_SHAPE',
          shape: {
            id, type: 'text',
            x: drag.startX, y: drag.startY,
            width: 120, height: 28,
            fill: '#111111', cornerRadius: 0,
            text: 'Text', fontSize: 16,
          },
        })
        setTimeout(() => setEditingId(id), 50)
      } else if (w >= MIN_SIZE && h >= MIN_SIZE) {
        const isRounded = tool === 'rounded-rect'
        if (isRounded) {
          const btnId = crypto.randomUUID()
          const labelId = crypto.randomUUID()
          dispatch({
            type: 'ADD_SHAPE',
            shape: {
              id: btnId, type: 'rounded-rect',
              x: x1, y: y1, width: w, height: h,
              fill: '#e31b3b', cornerRadius: 9999,
            },
          })
          const labelText = 'Button'
          const labelFs = 16
          const labelW = labelText.length * labelFs * 0.6
          dispatch({
            type: 'ADD_SHAPE',
            shape: {
              id: labelId, type: 'text',
              x: Math.round(x1 + (w - labelW) / 2),
              y: Math.round(y1 + (h - labelFs * 1.4) / 2),
              width: Math.round(labelW), height: labelFs,
              fill: '#ffffff', cornerRadius: 0,
              text: labelText, fontSize: labelFs,
            },
          })
        } else {
          dispatch({
            type: 'ADD_SHAPE',
            shape: {
              id: crypto.randomUUID(), type: 'rect',
              x: x1, y: y1, width: w, height: h,
              fill: '#ffffff', cornerRadius: 0,
            },
          })
        }
      }
      dispatch({ type: 'SET_TOOL', tool: 'select' })
    }

    setDrag(null)
  }, [drag, state.activeTool, dispatch])

  const onDoubleClick = useCallback((e: React.MouseEvent) => {
    const { x, y } = toSvg(e.clientX, e.clientY)
    const hit = hitTest(state, x, y)
    if (hit?.type === 'text') {
      setEditingId(hit.id)
      dispatch({ type: 'SELECT', id: hit.id })
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [state, dispatch, toSvg])

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (editingId) return
    if ((e.key === 'Delete' || e.key === 'Backspace') && state.selectedId) {
      dispatch({ type: 'DELETE', id: state.selectedId })
    }
  }, [state.selectedId, editingId, dispatch])

  const commitText = useCallback(() => {
    if (editingId) {
      const val = inputRef.current?.value ?? ''
      if (val) dispatch({ type: 'UPDATE_TEXT', id: editingId, text: val })
      setEditingId(null)
    }
  }, [editingId, dispatch])

  const selected = state.selectedId ? state.shapes[state.selectedId] : null

  const resetZoom = useCallback(() => {
    setVb({ x: 0, y: 0, w: DEFAULT_W, h: DEFAULT_H })
  }, [])

  // Compute grid extent — cover visible area with generous margin
  const gridX = Math.floor(vb.x / 40) * 40 - 40
  const gridY = Math.floor(vb.y / 40) * 40 - 40
  const gridW = Math.ceil(vb.w / 40) * 40 + 120
  const gridH = Math.ceil(vb.h / 40) * 40 + 120

  return (
    <div className="canvas-wrap" style={{ position: 'relative' }}>
      <svg
        ref={svgRef}
        viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
        className="canvas-svg"
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onDoubleClick={onDoubleClick}
        onKeyDown={onKeyDown}
      >
        {/* Infinite grid background */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e0e0e4" strokeWidth={0.5 / Math.min(zoom, 1)} />
          </pattern>
        </defs>
        <rect x={gridX} y={gridY} width={gridW} height={gridH} fill="#fafafc" />
        <rect x={gridX} y={gridY} width={gridW} height={gridH} fill="url(#grid)" />

        {/* Shapes */}
        {state.order.map(id => {
          const s = state.shapes[id]
          if (!s) return null
          if (s.type === 'text') {
            return (
              <text
                key={id}
                x={s.x}
                y={s.y + (s.fontSize ?? 16)}
                fontSize={s.fontSize ?? 16}
                fill={s.fill}
                fontFamily="'KH Teka', 'Inter', sans-serif"
                style={{ pointerEvents: 'all', cursor: 'default', userSelect: 'none' }}
                visibility={editingId === id ? 'hidden' : 'visible'}
              >
                {s.text ?? ''}
              </text>
            )
          }
          return (
            <rect
              key={id}
              x={s.x} y={s.y}
              width={s.width} height={s.height}
              rx={s.cornerRadius === 9999 ? Math.min(s.width, s.height) / 2 : s.cornerRadius}
              fill={s.fill}
              stroke={s.fill === '#ffffff' ? '#dcdce1' : 'none'}
              strokeWidth={s.fill === '#ffffff' ? 1 / zoom : 0}
              style={{ cursor: state.activeTool === 'select' ? 'move' : 'crosshair' }}
            />
          )
        })}

        {/* Selection outline + handles */}
        {selected && selected.type !== 'text' && (() => {
          const hs = HANDLE_SIZE / zoom  // scale handles to stay same screen size
          const sw = 2 / zoom
          return (
            <>
              <rect
                x={selected.x} y={selected.y}
                width={selected.width} height={selected.height}
                rx={selected.cornerRadius === 9999 ? Math.min(selected.width, selected.height) / 2 : selected.cornerRadius}
                fill="none" stroke="#2196f3" strokeWidth={sw} strokeDasharray={`${6/zoom} ${3/zoom}`}
              />
              {getHandles(selected).map(h => (
                <rect
                  key={h.pos}
                  x={h.x - hs / 2} y={h.y - hs / 2}
                  width={hs} height={hs}
                  fill="#fff" stroke="#2196f3" strokeWidth={1.5 / zoom}
                  style={{ cursor: h.cursor }}
                />
              ))}
            </>
          )
        })()}
        {selected && selected.type === 'text' && (
          <rect
            x={selected.x - 4 / zoom} y={selected.y - 2 / zoom}
            width={(selected.text?.length ?? 4) * (selected.fontSize ?? 16) * 0.6 + 8 / zoom}
            height={(selected.fontSize ?? 16) + 8 / zoom}
            fill="none" stroke="#2196f3" strokeWidth={1.5 / zoom} strokeDasharray={`${4/zoom} ${2/zoom}`}
          />
        )}

        {/* Draft shape preview */}
        {drag?.kind === 'draw' && state.activeTool !== 'text' && (() => {
          const x1 = Math.min(drag.startX, drag.curX)
          const y1 = Math.min(drag.startY, drag.curY)
          const w = Math.abs(drag.curX - drag.startX)
          const h = Math.abs(drag.curY - drag.startY)
          const isRounded = state.activeTool === 'rounded-rect'
          return (
            <rect
              x={x1} y={y1} width={w} height={h}
              rx={isRounded ? Math.min(w, h) / 2 : 0}
              fill="none" stroke="#2196f3" strokeWidth={1.5 / zoom} strokeDasharray={`${4/zoom} ${2/zoom}`}
            />
          )
        })()}
      </svg>

      {/* Inline text editing overlay */}
      {editingId && state.shapes[editingId] && (() => {
        const s = state.shapes[editingId]
        const svg = svgRef.current
        if (!svg) return null
        const rect = svg.getBoundingClientRect()
        const pxPerUnit = rect.width / vb.w
        return (
          <input
            ref={inputRef}
            className="canvas-text-input"
            defaultValue={s.text ?? ''}
            style={{
              position: 'absolute',
              left: (s.x - vb.x) * pxPerUnit,
              top: (s.y - vb.y) * pxPerUnit,
              fontSize: (s.fontSize ?? 16) * pxPerUnit,
              color: s.fill,
              fontFamily: "'KH Teka', 'Inter', sans-serif",
            }}
            onBlur={commitText}
            onKeyDown={e => { if (e.key === 'Enter') commitText() }}
          />
        )
      })()}

      {/* Zoom indicator */}
      {Math.abs(zoom - 1) > 0.01 && (
        <button className="zoom-badge" onClick={resetZoom} title="Reset zoom">
          {Math.round(zoom * 100)}%
        </button>
      )}
    </div>
  )
}

// --- Helpers ---

function hitTest(state: CanvasState, x: number, y: number): ShapeNode | null {
  for (let i = state.order.length - 1; i >= 0; i--) {
    const s = state.shapes[state.order[i]]
    if (!s) continue
    if (s.type === 'text') {
      const tw = (s.text?.length ?? 4) * (s.fontSize ?? 16) * 0.6
      const th = (s.fontSize ?? 16) * 1.4
      if (x >= s.x && x <= s.x + tw && y >= s.y && y <= s.y + th) return s
    } else {
      if (x >= s.x && x <= s.x + s.width && y >= s.y && y <= s.y + s.height) return s
    }
  }
  return null
}

function textBounds(t: ShapeNode) {
  const tw = (t.text?.length ?? 4) * (t.fontSize ?? 16) * 0.6
  const th = (t.fontSize ?? 16) * 1.4
  return { right: t.x + tw, bottom: t.y + th }
}

function isContained(text: ShapeNode, parent: ShapeNode): boolean {
  const tb = textBounds(text)
  return text.x >= parent.x && text.y >= parent.y &&
    tb.right <= parent.x + parent.width && tb.bottom <= parent.y + parent.height
}

function findParentShape(state: CanvasState, text: ShapeNode): ShapeNode | null {
  for (const id of state.order) {
    const s = state.shapes[id]
    if (!s || s.type === 'text') continue
    if (isContained(text, s)) return s
  }
  return null
}

function hitHandle(s: ShapeNode, x: number, y: number): string | null {
  const handles = getHandles(s)
  for (const h of handles) {
    if (Math.abs(x - h.x) <= 6 && Math.abs(y - h.y) <= 6) return h.pos
  }
  return null
}

function getHandles(s: ShapeNode) {
  return [
    { pos: 'nw', x: s.x, y: s.y, cursor: 'nwse-resize' },
    { pos: 'ne', x: s.x + s.width, y: s.y, cursor: 'nesw-resize' },
    { pos: 'sw', x: s.x, y: s.y + s.height, cursor: 'nesw-resize' },
    { pos: 'se', x: s.x + s.width, y: s.y + s.height, cursor: 'nwse-resize' },
    { pos: 'n', x: s.x + s.width / 2, y: s.y, cursor: 'ns-resize' },
    { pos: 's', x: s.x + s.width / 2, y: s.y + s.height, cursor: 'ns-resize' },
    { pos: 'e', x: s.x + s.width, y: s.y + s.height / 2, cursor: 'ew-resize' },
    { pos: 'w', x: s.x, y: s.y + s.height / 2, cursor: 'ew-resize' },
  ]
}
