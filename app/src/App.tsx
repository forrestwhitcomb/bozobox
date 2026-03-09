import { useReducer, useMemo, useEffect } from 'react'
import { reducer, initialState } from './model/reducer'
import { translate } from './model/translator'
import Canvas from './canvas/Canvas'
import Toolbar from './ui/Toolbar'
import Inspector from './ui/Inspector'
import PhonePreview from './preview/PhonePreview'

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const components = useMemo(() => translate(state), [state.shapes, state.order])

  // Expose dispatch for dev testing
  useEffect(() => { (window as any).__dispatch = dispatch }, [dispatch])

  const selectedShape = state.selectedId ? state.shapes[state.selectedId] ?? null : null

  return (
    <div className="app">
      <header className="top-bar">
        <span className="top-bar-title">BozoBox v0.0.1</span>
      </header>

      <main className="layout">
        <section className="canvas-panel">
          <Canvas state={state} dispatch={dispatch} />
          <Toolbar
            activeTool={state.activeTool}
            onSetTool={tool => dispatch({ type: 'SET_TOOL', tool })}
          />
        </section>

        <section className="preview-panel">
          <PhonePreview components={components} />
        </section>

        <aside className="inspector-panel">
          <Inspector shape={selectedShape} dispatch={dispatch} />
          <button
            className="view-components-btn"
            onClick={() => window.open('http://localhost:3131/component-library', '_blank')}
          >
            View components
          </button>
        </aside>
      </main>
    </div>
  )
}
