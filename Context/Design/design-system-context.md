# Rebtel Mini Design System — Agent Context

> This file is the single source of truth for building browser prototypes using this design system.
> Point an agent at this file + `design-system.css` + `component-library.html` to get full context.

---

## Files in this system

| File | Purpose |
|---|---|
| `design-system-context.md` | This file — full spec and usage guide |
| `design-system.css` | Drop-in stylesheet — all tokens as CSS variables + component classes |
| `component-library.html` | Live HTML reference — copy/paste component markup |

---

## Fonts

Two custom typefaces. Both weight 400, letter-spacing 2%.

| Family | Role | Load via |
|---|---|---|
| **Pano** | Display / hero text | Self-hosted or substitute |
| **KH Teka** | All body, UI, labels | Self-hosted or substitute |

**Web fallback stack (if fonts unavailable):**
```css
font-family: 'Pano', 'Plus Jakarta Sans', sans-serif;      /* display */
font-family: 'KH Teka', 'Inter', 'DM Sans', sans-serif;   /* body */
```

To load from local files, add `@font-face` blocks pointing to the font files, or swap for the fallbacks above. `design-system.css` already includes the fallback stacks.

---

## Colour Tokens

| Token | Hex | CSS Variable | Usage |
|---|---|---|---|
| Red | `#e31b3b` | `--color-red` | Primary CTA, brand accent |
| Black | `#111111` | `--color-black` | Secondary button, card bg, body text |
| White | `#ffffff` | `--color-white` | Surface, card bg, text on dark |
| Grey Light | `#f3f3f3` | `--color-grey-light` | Page background, subtle fills |
| Grey Mid | `#dcdce1` | `--color-grey-mid` | Borders, dividers, muted surfaces |

---

## Typography Scale

All styles: `font-weight: 400`, `letter-spacing: 0.02em` (2%).

### Display — Pano

| Token | CSS Class | Size | Line Height |
|---|---|---|---|
| Display LG | `.text-display-lg` | 32px | 40px |
| Display MD | `.text-display-md` | 24px | 32px |
| Display SM | `.text-display-sm` | 16px | 24px |

### Body — KH Teka

| Token | CSS Class | Size | Line Height |
|---|---|---|---|
| Body LG | `.text-body-lg` | 18px | 28px |
| Body MD | `.text-body-md` | 14px | 22px |
| Body SM | `.text-body-sm` | 12px | 18px |

---

## Components

### Button

**Component set:** 3 types × 2 sizes = 6 variants.
**Shape:** Full pill (`border-radius: 9999px`). No sharp corners anywhere.

#### Sizes

| Size | Height | H-Padding | Font Size | CSS Modifier |
|---|---|---|---|---|
| Large | 48px | 28px | 16px | `.btn--lg` |
| Small | 36px | 20px | 14px | `.btn--sm` |

#### Types

| Type | Background | Text | Border | CSS Class |
|---|---|---|---|---|
| Primary | `#e31b3b` (Red) | `#ffffff` | none | `.btn-primary` |
| Secondary | `#111111` (Black) | `#ffffff` | none | `.btn-secondary` |
| Tertiary | transparent | `#111111` | 1.5px solid `#111111` | `.btn-tertiary` |

#### Usage
```html
<!-- Primary Large -->
<button class="btn btn-primary btn--lg">Get started</button>

<!-- Secondary Small -->
<button class="btn btn-secondary btn--sm">Cancel</button>

<!-- Tertiary Large -->
<button class="btn btn-tertiary btn--lg">Learn more</button>
```

---

### Card

**Component set:** 2 colours × 2 button states = 4 variants.
**Width:** Fixed 358px. **Height:** Auto — hugs content.
**Padding:** 24px all sides. **Gap between elements:** 8px.
**Border radius:** 16px.

#### Variants

| Variant | Background | Title colour | Subtitle colour | Button |
|---|---|---|---|---|
| White / Button=True | `#ffffff` | `#111111` | `#888888` | Red Primary shown |
| White / Button=False | `#ffffff` | `#111111` | `#888888` | Hidden |
| Black / Button=True | `#111111` | `#ffffff` | `rgba(255,255,255,0.55)` | Red Primary shown |
| Black / Button=False | `#111111` | `#ffffff` | `rgba(255,255,255,0.55)` | Hidden |

White variant has a `1px solid #dcdce1` border. Black variant has no border.

#### Text inside cards

| Element | Font | Size | Weight |
|---|---|---|---|
| Title | KH Teka | 20px | 400 |
| Subtitle | KH Teka | 14px | 400 |
| Button | KH Teka | 14px | 400 |

#### Usage
```html
<!-- White card, with button -->
<div class="card card--white">
  <h3 class="card__title">Card Title</h3>
  <p class="card__subtitle">Short description that sits below the title.</p>
  <button class="btn btn-primary btn--sm">Get started</button>
</div>

<!-- Black card, no button -->
<div class="card card--black">
  <h3 class="card__title">Card Title</h3>
  <p class="card__subtitle">Short description that sits below the title.</p>
</div>
```

---

## Elevation / Shadow

| Token | CSS Variable | Value |
|---|---|---|
| Elevation 1 | `--elevation-1` | `4px 4px 10px 2px rgba(50,50,93,0.02)` |
| Elevation 2 | `--elevation-2` | `0px 14px 20px 4px rgba(50,50,93,0.06)` |
| Elevation 3 | `--elevation-3` | `0px 12px 28px 0px rgba(50,50,93,0.18)` |

---

## Spacing Scale (from design tokens)

`--space-0: 0` · `--space-1: 2px` · `--space-2: 4px` · `--space-3: 8px` · `--space-4: 12px` · `--space-5: 16px` · `--space-6: 20px` · `--space-7: 24px` · `--space-8: 32px` · `--space-9: 40px` · `--space-10: 48px` · `--space-11: 56px` · `--space-12: 64px` · `--space-13: 72px`

---

## Agent Instructions

When asked to build a prototype using this design system:

1. **Link the stylesheet:** `<link rel="stylesheet" href="design-system.css">`
2. **Use the CSS classes** listed above — do not hardcode colours or sizes inline.
3. **Use CSS variables** (e.g. `var(--color-red)`) for any values not covered by a class.
4. **Respect the type scale** — never use a font size outside the 6 defined sizes.
5. **Cards are always 358px wide.** Stack or grid them; do not stretch them.
6. **Buttons are always pill-shaped.** Never use square corners.
7. **Font fallbacks** are already in the CSS. No need to add additional fonts.
8. **Backgrounds:** Default page bg is `var(--color-grey-light)` (`#f3f3f3`). Sections or hero areas may use `var(--color-white)` or `var(--color-black)`.
9. For layout, use standard CSS Grid or Flexbox — no layout utilities are included in the CSS, just tokens and components.
