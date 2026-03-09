import React, { useRef, useCallback, useState } from 'react'
import type { CanvasState, ShapeNode } from '../model/types'
import type { Action } from '../model/reducer'

interface Props {
  state: CanvasState
  dispatch: React.Dispatch<Action>
}

const CANVAS_W = 800
const CANVAS_H = 600
const MIN_SIZE = 8
const HANDLE_SIZE = 8

type DragState =
  | null
  | { kind: 'draw'; startX: number; startY: number; curX: number; curY: number }
  | { kind: 'move'; id: string; offsetX: number; offsetY: number }
  | { kind: 'resize'; id: string; handle: string; origShape: ShapeNode; startX: number; startY: number }

export default function Canvas({ state, dispatch }: Props) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [drag, setDrag] = useState<DragState>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const toSvg = useCallback((clientX: number, clientY: number) => {
    const svg = svgRef.current
    if (!svg) return { x: 0, y: 0 }
    const rect = svg.getBoundingClientRect()
    const scaleX = CANVAS_W / rect.width
    const scaleY = CANVAS_H / rect.height
    return {
      x: Math.round((clientX - rect.left) * scaleX),
      y: Math.round((clientY - rect.top) * scaleY),
    }
  }, [])

  const onPointerDown = useCallback((e: React.PointerEvent) => {
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
        dispatch({ type: 'SELECT', id: hit.id })
        setDrag({ kind: 'move', id: hit.id, offsetX: x - hit.x, offsetY: y - hit.y })
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
    const { x, y } = toSvg(e.clientX, e.clientY)

    if (drag.kind === 'draw') {
      setDrag({ ...drag, curX: x, curY: y })
    } else if (drag.kind === 'move') {
      dispatch({ type: 'MOVE', id: drag.id, x: x - drag.offsetX, y: y - drag.offsetY })
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

  return (
    <div className="canvas-wrap" style={{ position: 'relative' }}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
        className="canvas-svg"
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onDoubleClick={onDoubleClick}
        onKeyDown={onKeyDown}
      >
        {/* Grid */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e0e0e4" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width={CANVAS_W} height={CANVAS_H} fill="#fafafc" />
        <rect width={CANVAS_W} height={CANVAS_H} fill="url(#grid)" />

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
              strokeWidth={s.fill === '#ffffff' ? 1 : 0}
              style={{ cursor: state.activeTool === 'select' ? 'move' : 'crosshair' }}
            />
          )
        })}

        {/* Selection outline + handles */}
        {selected && selected.type !== 'text' && (
          <>
            <rect
              x={selected.x} y={selected.y}
              width={selected.width} height={selected.height}
              rx={selected.cornerRadius === 9999 ? Math.min(selected.width, selected.height) / 2 : selected.cornerRadius}
              fill="none" stroke="#2196f3" strokeWidth="2" strokeDasharray="6 3"
            />
            {getHandles(selected).map(h => (
              <rect
                key={h.pos}
                x={h.x - HANDLE_SIZE / 2} y={h.y - HANDLE_SIZE / 2}
                width={HANDLE_SIZE} height={HANDLE_SIZE}
                fill="#fff" stroke="#2196f3" strokeWidth="1.5"
                style={{ cursor: h.cursor }}
              />
            ))}
          </>
        )}
        {selected && selected.type === 'text' && (
          <rect
            x={selected.x - 4} y={selected.y - 2}
            width={(selected.text?.length ?? 4) * (selected.fontSize ?? 16) * 0.6 + 8}
            height={(selected.fontSize ?? 16) + 8}
            fill="none" stroke="#2196f3" strokeWidth="1.5" strokeDasharray="4 2"
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
              fill="none" stroke="#2196f3" strokeWidth="1.5" strokeDasharray="4 2"
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
        const scaleX = rect.width / CANVAS_W
        const scaleY = rect.height / CANVAS_H
        return (
          <input
            ref={inputRef}
            className="canvas-text-input"
            defaultValue={s.text ?? ''}
            style={{
              position: 'absolute',
              left: s.x * scaleX,
              top: s.y * scaleY,
              fontSize: (s.fontSize ?? 16) * scaleX,
              color: s.fill,
              fontFamily: "'KH Teka', 'Inter', sans-serif",
            }}
            onBlur={commitText}
            onKeyDown={e => { if (e.key === 'Enter') commitText() }}
          />
        )
      })()}
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
