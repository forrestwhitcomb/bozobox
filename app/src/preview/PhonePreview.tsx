import { useState } from 'react'
import type { TranslatedComponent, TranslatedScreen } from '../model/types'

interface Props {
  screens: TranslatedScreen[]
}

// Native iPhone 14 Pro content dimensions
const PHONE_W = 390
const PHONE_H = 844

// Figma reference: iPhone 14 Pro body is 477×983 with 6.72px border, border-radius 75px
// We scale proportionally to a target height
const FIGMA_BODY_W = 477
const FIGMA_BODY_H = 983
const FIGMA_BORDER = 6.72
const FIGMA_RADIUS = 75
const FIGMA_ISLAND_W = 128
const FIGMA_ISLAND_H = 33
const FIGMA_ISLAND_X = 168.28  // from left of inner body
const FIGMA_ISLAND_Y = 25.28   // from top of inner body

const TARGET_H = 680
const SCALE = TARGET_H / FIGMA_BODY_H

const BODY_W = Math.round(FIGMA_BODY_W * SCALE)
const BODY_H = TARGET_H
const BORDER = Math.round(FIGMA_BORDER * SCALE * 10) / 10
const RADIUS = Math.round(FIGMA_RADIUS * SCALE)

// Screen fills inside the border
const SCREEN_W = Math.round(BODY_W - BORDER * 2)
const SCREEN_H = Math.round(BODY_H - BORDER * 2)
const SCREEN_RADIUS = Math.round((FIGMA_RADIUS - FIGMA_BORDER) * SCALE)

// Dynamic Island
const ISLAND_W = Math.round(FIGMA_ISLAND_W * SCALE)
const ISLAND_H = Math.round(FIGMA_ISLAND_H * SCALE)
const ISLAND_Y = Math.round(FIGMA_ISLAND_Y * SCALE)

// Scale phone content to fit screen
const CONTENT_SCALE = SCREEN_W / PHONE_W

export default function PhonePreview({ screens }: Props) {
  const [currentScreen, setCurrentScreen] = useState(0)

  // Clamp screen index to valid range
  const screenCount = screens.length
  const safeIndex = screenCount === 0 ? 0 : Math.min(currentScreen, screenCount - 1)
  const components = screens[safeIndex]?.components ?? []

  return (
    <div className="phone-panel">
      {/* Left arrow */}
      {screenCount > 1 && (
        <button
          className="screen-nav screen-nav--left"
          onClick={() => setCurrentScreen(Math.max(0, safeIndex - 1))}
          disabled={safeIndex === 0}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      <div
        className="iphone-body"
        style={{ width: BODY_W, height: BODY_H, borderWidth: BORDER, borderRadius: RADIUS }}
      >
        {/* Screen area */}
        <div className="iphone-screen" style={{ borderRadius: SCREEN_RADIUS }}>
          {/* Dynamic Island */}
          <div
            className="iphone-island"
            style={{ width: ISLAND_W, height: ISLAND_H, top: ISLAND_Y }}
          />

          {/* Status bar */}
          <div className="iphone-status-bar" style={{ top: ISLAND_Y - 2, height: ISLAND_H + 4 }}>
            <span className="iphone-time">9:41</span>
            <div className="iphone-status-icons">
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                <rect x="0" y="3" width="3" height="9" rx="1" fill="currentColor" opacity="0.3"/>
                <rect x="4.5" y="2" width="3" height="10" rx="1" fill="currentColor" opacity="0.5"/>
                <rect x="9" y="1" width="3" height="11" rx="1" fill="currentColor" opacity="0.7"/>
                <rect x="13.5" y="0" width="3" height="12" rx="1" fill="currentColor"/>
              </svg>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                <path d="M8 2.5C10.5 2.5 12.7 3.6 14.2 5.4L15.6 4C13.8 1.9 11.1 0.5 8 0.5C4.9 0.5 2.2 1.9 0.4 4L1.8 5.4C3.3 3.6 5.5 2.5 8 2.5Z" fill="currentColor" opacity="0.4"/>
                <path d="M8 6C9.7 6 11.1 6.7 12.1 7.8L13.5 6.4C12.1 5 10.2 4 8 4C5.8 4 3.9 5 2.5 6.4L3.9 7.8C4.9 6.7 6.3 6 8 6Z" fill="currentColor" opacity="0.7"/>
                <path d="M8 9.5C8.8 9.5 9.5 9.8 10 10.3L8 12.5L6 10.3C6.5 9.8 7.2 9.5 8 9.5Z" fill="currentColor"/>
              </svg>
              <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
                <rect x="0.5" y="0.5" width="21" height="11" rx="2" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.35"/>
                <rect x="22" y="3.5" width="2" height="5" rx="1" fill="currentColor" opacity="0.35"/>
                <rect x="2" y="2" width="18" height="8" rx="1" fill="currentColor"/>
              </svg>
            </div>
          </div>

          {/* Phone content */}
          <div
            className="phone-screen ds-scope"
            style={{
              width: PHONE_W,
              height: PHONE_H,
              transform: `scale(${CONTENT_SCALE})`,
              transformOrigin: 'top left',
            }}
          >
            {screens.length === 0 && (
              <div className="phone-empty">
                <p>Draw shapes on the canvas</p>
                <p className="phone-empty-sub">They'll appear here as components</p>
              </div>
            )}
            {components.map((c, i) => (
              <ComponentRenderer key={i} comp={c} />
            ))}
          </div>
        </div>

        {/* Screen indicator dots */}
        {screenCount > 1 && (
          <div className="screen-dots">
            {screens.map((_, i) => (
              <div
                key={i}
                className={`screen-dot${i === safeIndex ? ' active' : ''}`}
                onClick={() => setCurrentScreen(i)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Right arrow */}
      {screenCount > 1 && (
        <button
          className="screen-nav screen-nav--right"
          onClick={() => setCurrentScreen(Math.min(screenCount - 1, safeIndex + 1))}
          disabled={safeIndex === screenCount - 1}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M8 4L14 10L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
    </div>
  )
}

function ComponentRenderer({ comp }: { comp: TranslatedComponent }) {
  const base: React.CSSProperties = {
    position: 'absolute',
    left: comp.x,
    top: comp.y,
  }

  if (comp.kind === 'card') {
    return (
      <div className={comp.className} style={{ ...base, width: comp.width, minHeight: comp.height || undefined }}>
        {comp.title && <h3 className="card__title">{comp.title}</h3>}
        {comp.subtitle && <p className="card__subtitle">{comp.subtitle}</p>}
        {comp.buttonLabel && comp.buttonClass && (
          <button className={comp.buttonClass}>{comp.buttonLabel}</button>
        )}
      </div>
    )
  }

  if (comp.kind === 'button') {
    return (
      <button className={comp.className} style={{ ...base, width: comp.width, height: comp.height }}>
        {comp.buttonLabel ?? 'Button'}
      </button>
    )
  }

  if (comp.kind === 'typography') {
    return (
      <span className={comp.textClass} style={{ ...base, color: comp.fill }}>
        {comp.text}
      </span>
    )
  }

  return null
}
