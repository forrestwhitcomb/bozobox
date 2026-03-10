import type { CanvasState, ShapeNode, ToolType } from './types'

export type Action =
  | { type: 'ADD_SHAPE'; shape: ShapeNode }
  | { type: 'SELECT'; id: string | null }
  | { type: 'MOVE'; id: string; x: number; y: number }
  | { type: 'MOVE_GROUP'; moves: Array<{ id: string; x: number; y: number }> }
  | { type: 'RESIZE'; id: string; width: number; height: number; x?: number; y?: number }
  | { type: 'RECOLOR'; id: string; fill: string }
  | { type: 'UPDATE_TEXT'; id: string; text: string }
  | { type: 'UPDATE_FONT_SIZE'; id: string; fontSize: number }
  | { type: 'DELETE'; id: string }
  | { type: 'SET_TOOL'; tool: ToolType }

export const initialState: CanvasState = {
  shapes: {},
  order: [],
  selectedId: null,
  activeTool: 'select',
}

export function reducer(state: CanvasState, action: Action): CanvasState {
  switch (action.type) {
    case 'ADD_SHAPE':
      return {
        ...state,
        shapes: { ...state.shapes, [action.shape.id]: action.shape },
        order: [...state.order, action.shape.id],
        selectedId: action.shape.id,
      }

    case 'SELECT':
      return { ...state, selectedId: action.id }

    case 'MOVE': {
      const shape = state.shapes[action.id]
      if (!shape) return state
      return {
        ...state,
        shapes: { ...state.shapes, [action.id]: { ...shape, x: action.x, y: action.y } },
      }
    }

    case 'MOVE_GROUP': {
      const updated = { ...state.shapes }
      for (const m of action.moves) {
        const s = updated[m.id]
        if (s) updated[m.id] = { ...s, x: m.x, y: m.y }
      }
      return { ...state, shapes: updated }
    }

    case 'RESIZE': {
      const shape = state.shapes[action.id]
      if (!shape) return state
      return {
        ...state,
        shapes: {
          ...state.shapes,
          [action.id]: {
            ...shape,
            width: action.width,
            height: action.height,
            ...(action.x !== undefined && { x: action.x }),
            ...(action.y !== undefined && { y: action.y }),
          },
        },
      }
    }

    case 'RECOLOR': {
      const shape = state.shapes[action.id]
      if (!shape) return state
      return {
        ...state,
        shapes: { ...state.shapes, [action.id]: { ...shape, fill: action.fill } },
      }
    }

    case 'UPDATE_TEXT': {
      const shape = state.shapes[action.id]
      if (!shape) return state
      return {
        ...state,
        shapes: { ...state.shapes, [action.id]: { ...shape, text: action.text } },
      }
    }

    case 'UPDATE_FONT_SIZE': {
      const shape = state.shapes[action.id]
      if (!shape) return state
      return {
        ...state,
        shapes: { ...state.shapes, [action.id]: { ...shape, fontSize: action.fontSize } },
      }
    }

    case 'DELETE': {
      const { [action.id]: _, ...rest } = state.shapes
      return {
        ...state,
        shapes: rest,
        order: state.order.filter(id => id !== action.id),
        selectedId: state.selectedId === action.id ? null : state.selectedId,
      }
    }

    case 'SET_TOOL':
      return { ...state, activeTool: action.tool, selectedId: null }

    default:
      return state
  }
}
