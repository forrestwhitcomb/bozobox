export type ShapeType = 'rect' | 'rounded-rect' | 'text'
export type ToolType = 'select' | 'rect' | 'rounded-rect' | 'text'

export interface ShapeNode {
  id: string
  type: ShapeType
  x: number
  y: number
  width: number
  height: number
  fill: string
  cornerRadius: number
  text?: string
  fontSize?: number
}

export interface CanvasState {
  shapes: Record<string, ShapeNode>
  order: string[]            // z-order (first = bottom)
  selectedId: string | null
  activeTool: ToolType
}

// --- Translated output ---

export type ComponentKind = 'card' | 'button' | 'typography'

export interface TranslatedComponent {
  kind: ComponentKind
  className: string          // e.g. "card card--white"
  sourceIds: string[]        // canvas shape IDs that compose this
  x: number                  // position in phone viewport (0-390)
  y: number                  // position in phone viewport (0-844)
  width: number
  height: number
  title?: string
  subtitle?: string
  buttonLabel?: string
  buttonClass?: string
  text?: string
  textClass?: string
  fill?: string
}
