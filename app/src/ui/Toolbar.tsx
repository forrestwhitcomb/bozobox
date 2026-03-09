import type { ToolType } from '../model/types'

interface Props {
  activeTool: ToolType
  onSetTool: (tool: ToolType) => void
}

const CursorIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M3 2L8 16L10.5 9.5L16 8L3 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
)

const RectIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <rect x="2" y="3" width="14" height="12" rx="1" stroke="currentColor" strokeWidth="1.8" />
  </svg>
)

const PillIcon = () => (
  <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
    <rect x="1" y="1" width="20" height="12" rx="6" stroke="currentColor" strokeWidth="1.8" />
  </svg>
)

const TOOLS: { tool: ToolType; label: string; icon: React.ReactNode }[] = [
  { tool: 'select',       label: 'Select', icon: <CursorIcon /> },
  { tool: 'rect',         label: 'Card',   icon: <RectIcon /> },
  { tool: 'rounded-rect', label: 'Button', icon: <PillIcon /> },
  { tool: 'text',         label: 'Text',   icon: <span style={{ fontSize: 16, fontWeight: 600 }}>T</span> },
]

export default function Toolbar({ activeTool, onSetTool }: Props) {
  return (
    <div className="toolbar">
      {TOOLS.map(t => (
        <button
          key={t.tool}
          className={`toolbar-btn ${activeTool === t.tool ? 'active' : ''}`}
          onClick={() => onSetTool(t.tool)}
          title={t.label}
        >
          {t.icon}
        </button>
      ))}
    </div>
  )
}
