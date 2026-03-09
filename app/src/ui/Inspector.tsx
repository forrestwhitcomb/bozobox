import type { ShapeNode } from '../model/types'
import type { Action } from '../model/reducer'

interface Props {
  shape: ShapeNode | null
  dispatch: React.Dispatch<Action>
}

const SWATCHES = ['#e31b3b', '#111111', '#6b6b6b', '#ffffff', '#f3f3f3', '#dcdce1']

const TEXT_STYLES: { label: string; fontSize: number; font: 'display' | 'body' }[] = [
  { label: 'Display LG', fontSize: 32, font: 'display' },
  { label: 'Display MD', fontSize: 24, font: 'display' },
  { label: 'Display SM', fontSize: 16, font: 'display' },
  { label: 'Body LG',    fontSize: 18, font: 'body' },
  { label: 'Body MD',    fontSize: 14, font: 'body' },
  { label: 'Body SM',    fontSize: 12, font: 'body' },
]

export default function Inspector({ shape, dispatch }: Props) {
  if (!shape) {
    return (
      <div className="inspector">
        <p className="inspector-empty">Select a shape to edit its properties</p>
      </div>
    )
  }

  return (
    <div className="inspector">
      <h3 className="inspector-title">
        {shape.type === 'text' ? 'Text' : shape.type === 'rounded-rect' ? 'Rounded Rect' : 'Rectangle'}
      </h3>

      <div className="inspector-section">
        <label className="inspector-label">Position</label>
        <div className="inspector-row">
          <Field label="X" value={shape.x} onChange={v => dispatch({ type: 'MOVE', id: shape.id, x: v, y: shape.y })} />
          <Field label="Y" value={shape.y} onChange={v => dispatch({ type: 'MOVE', id: shape.id, x: shape.x, y: v })} />
        </div>
      </div>

      {shape.type !== 'text' && (
        <div className="inspector-section">
          <label className="inspector-label">Size</label>
          <div className="inspector-row">
            <Field label="W" value={shape.width} onChange={v => dispatch({ type: 'RESIZE', id: shape.id, width: v, height: shape.height })} />
            <Field label="H" value={shape.height} onChange={v => dispatch({ type: 'RESIZE', id: shape.id, width: shape.width, height: v })} />
          </div>
        </div>
      )}

      <div className="inspector-section">
        <label className="inspector-label">Fill</label>
        <div className="swatch-row">
          {SWATCHES.map(c => (
            <button
              key={c}
              className={`swatch ${shape.fill === c ? 'active' : ''}`}
              style={{ background: c, border: c === '#ffffff' ? '1px solid #dcdce1' : 'none' }}
              onClick={() => dispatch({ type: 'RECOLOR', id: shape.id, fill: c })}
            />
          ))}
          <input
            type="color"
            className="swatch-custom"
            value={shape.fill}
            onChange={e => dispatch({ type: 'RECOLOR', id: shape.id, fill: e.target.value })}
          />
        </div>
      </div>

      {shape.type === 'text' && (
        <div className="inspector-section">
          <label className="inspector-label">Text Style</label>
          <div className="style-list">
            {TEXT_STYLES.map(s => (
              <button
                key={s.label}
                className={`style-option ${shape.fontSize === s.fontSize ? 'active' : ''}`}
                onClick={() => dispatch({ type: 'UPDATE_FONT_SIZE', id: shape.id, fontSize: s.fontSize })}
              >
                <span
                  className="style-option-preview"
                  style={{
                    fontFamily: s.font === 'display'
                      ? "'Pano', 'Plus Jakarta Sans', sans-serif"
                      : "'KH Teka', 'Inter', 'DM Sans', sans-serif",
                    fontSize: Math.min(s.fontSize, 20),
                  }}
                >
                  Aa
                </span>
                <span className="style-option-label">{s.label}</span>
                <span className="style-option-size">{s.fontSize}px</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <button className="delete-btn" onClick={() => dispatch({ type: 'DELETE', id: shape.id })}>
        Delete
      </button>
    </div>
  )
}

function Field({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      <input
        type="number"
        className="field-input"
        value={Math.round(value)}
        onChange={e => onChange(Number(e.target.value))}
      />
    </label>
  )
}
