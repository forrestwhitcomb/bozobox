# Rebtel 3.0 — Design Token × Component Mapping

> Token chain: **Primitives → Alias → Mapped (light/dark) → Component**
> Fonts: **Pano** (display only) · **KH Teka** (all others) · letter-spacing: 2% on all
> Shadows: based on `color.semantic.shadow` = `#32325d`

---

## Resolved Token Reference

### Colors — Light Mode

| Mapped Token | Resolved Value |
|---|---|
| `surface.primary.canvas` | `#fafafc` |
| `surface.primary.lighter` | `#ffffff` |
| `surface.primary.light` | `#f3f3f3` |
| `surface.primary.Neutral` | `#dcdce1` |
| `surface.primary.darker` | `#111111` |
| `surface.primary.dark-constant` | `#111111` |
| `surface.primary.soft-contrast` | `#ffffff` |
| `surface.primary.bottom-sheet` | `#ffffff` |
| `surface.primary.brand-red` | `#e31b3b` |
| `surface.primary.error` | `#e31b3b` |
| `surface.primary.error-light` | `#f4a4b1` |
| `surface.primary.warning` | `#f06e1d` |
| `surface.primary.warning-light` | `#fbdbc6` |
| `surface.primary.success-strong` | `#09bc09` |
| `surface.primary.success-light` | `#d1f3c5` |
| `surface.primary.overlay-background` | `#11111166` |
| `surface.primary.transparent` | `#fafafc00` |
| `surface.button.primary` | `#e31b3b` |
| `surface.button.secondary-black` | `#111111` |
| `surface.button.secondary-white` | `#ffffff` |
| `surface.button.secondary-grey` | `#f3f3f3` |
| `surface.button.pressed` | `#881023` |
| `surface.button.disabled` | `#b9b9be` |
| `surface.button.green` | `#09bc09` |
| `surface.label.purple` | `#4200ff` |
| `surface.label.black` | `#2d2d32` |
| `surface.home.calling` | `#edeadd` |
| `surface.home.mtu` | `#dae2f4` |
| `content.primary` | `#2d2d32` |
| `content.secondary` | `#737378` |
| `content.tertiary` | `#b9b9be` |
| `content.brand` | `#e31b3b` |
| `content.ligthest` | `#ffffff` |
| `content.darkest` | `#111111` |
| `content.success` | `#49cd18` |
| `content.warning` | `#f06e1d` |
| `text.primary` | `#2d2d32` |
| `text.secondary` | `#737378` |
| `text.tertiary` | `#b9b9be` |
| `text.lightest` | `#ffffff` |
| `text.brand` | `#e31b3b` |
| `text.button-text` | `#e31b3b` |
| `text.success` | `#49cd18` |
| `text.warning` | `#f06e1d` |
| `text.error` | `#e31b3b` |
| `border.primary` | `#2d2d32` |
| `border.secondary` | `#737378` |
| `border.tertiary` | `#dcdce1` |
| `border.error` | `#e31b3b` |
| `border.success` | `#49cd18` |
| `border.warning` | `#f06e1d` |
| `icon.primary` | `#2d2d32` |
| `icon.secondary` | `#737378` |
| `icon.tertiary` | `#b9b9be` |
| `icon.ligthest` | `#ffffff` |
| `icon.brand` | `#e31b3b` |
| `icon.success` | `#49cd18` |
| `icon.warning` | `#f06e1d` |

### Colors — Dark Mode (overrides only)

| Mapped Token | Dark Resolved | Light Resolved |
|---|---|---|
| `surface.primary.canvas` | `#111111` | `#fafafc` |
| `surface.primary.lighter` | `#111111` | `#ffffff` |
| `surface.primary.light` | `#505055` | `#f3f3f3` |
| `surface.primary.Neutral` | `#737378` | `#dcdce1` |
| `surface.primary.darker` | `#fafafc` | `#111111` |
| `surface.primary.bottom-sheet` | `#2d2d32` | `#ffffff` |
| `surface.primary.soft-contrast` | `#505055` | `#ffffff` |
| `surface.primary.transparent` | `#2d2d3200` | `#fafafc00` |
| `surface.button.secondary-black` | `#ffffff` | `#111111` |
| `surface.button.secondary-grey` | `#737378` | `#f3f3f3` |
| `content.primary` | `#fafafc` | `#2d2d32` |
| `content.secondary` | `#96969b` | `#737378` |
| `content.tertiary` | `#737378` | `#b9b9be` |
| `content.ligthest` | `#111111` | `#ffffff` |
| `content.darkest` | `#ffffff` | `#111111` |
| `text.secondary` | `#96969b` | `#737378` |
| `text.tertiary` | `#737378` | `#b9b9be` |
| `text.lightest` | `#111111` | `#ffffff` |
| `text.button-text` | `#e94962` | `#e31b3b` |
| `border.tertiary` | `#505055` | `#dcdce1` |

### Spacing

| Token | Value |
|---|---|
| `spacing.none` | 0px |
| `spacing.xxxs` | 2px |
| `spacing.xxs` | 4px |
| `spacing.xs` | 8px |
| `spacing.sm` | 12px |
| `spacing.md` | 16px |
| `spacing.lg` | 20px |
| `spacing.xl` | 24px |
| `spacing.xxl` | 32px |
| `spacing.xxxl` | 52px |
| `spacing.xxxxl` | 72px |

### Border Radius

| Token | Value |
|---|---|
| `radius.xs` | 4px |
| `radius.sm` | 8px |
| `radius.md` | 12px |
| `radius.lg` | 16px |
| `radius.xl` | 24px |
| `radius.xxl` | 32px |

### Elevation (Shadows)

| Token | CSS box-shadow |
|---|---|
| `elevation-1` | `4px 4px 10px 2px #32325d05` |
| `elevation-2` | `0px 14px 20px 4px #32325d0f` |
| `elevation-3` | `0px 12px 28px 0px #32325d2e` |

### Typography

| Style | Font | Size | Weight | Line Height |
|---|---|---|---|---|
| `display-lg` | Pano | 32px | 400 | 40px |
| `display-md` | Pano | 24px | 400 | 32px |
| `display-sm` | Pano | 20px | 400 | 32px |
| `display-xs` | Pano | 16px | 400 | 24px |
| `headline-lg` | KH Teka | 32px | 400 | 40px |
| `headline-md` | KH Teka | 24px | 400 | 36px |
| `headline-sm` | KH Teka | 20px | 400 | 32px |
| `headline-xs` | KH Teka | 16px | 400 | 24px |
| `paragraph-xl` | KH Teka | 20px | 400 | 32px |
| `paragraph-lg` | KH Teka | 18px | 400 | 28px |
| `paragraph-md` | KH Teka | 16px | 400 | 24px |
| `paragraph-sm` | KH Teka | 14px | 400 | 20px |
| `paragraph-xs` | KH Teka | 12px | 400 | 18px |
| `label-xl` | KH Teka | 20px | 400 | 20px |
| `label-lg` | KH Teka | 18px | 400 | 18px |
| `label-md` | KH Teka | 16px | 400 | 16px |
| `label-sm` | KH Teka | 14px | 400 | 14px |
| `label-xs` | KH Teka | 11px | 400 | 11px |

---

## Component Token Mapping

### 01 — Navigation

#### `Main navigation`
Variants: Home · Services · Account | Height: 90px

| Property | Token | Light Value |
|---|---|---|
| Background | `surface.primary.canvas` | `#fafafc` |
| Active icon | `icon.brand` | `#e31b3b` |
| Inactive icon | `icon.tertiary` | `#b9b9be` |
| Active label | `text.brand` | `#e31b3b` |
| Inactive label | `text.tertiary` | `#b9b9be` |
| Top border | `border.tertiary` | `#dcdce1` (light) / `#505055` (dark) |
| Typography | `label-xs` | KH Teka · 11px · lh:11px |

#### `Header`
Variants: iOS · Android

| Property | Token | Light Value |
|---|---|---|
| Background | `surface.primary.canvas` | `#fafafc` |
| Title text | `text.primary` | `#2d2d32` |
| Icon (back/close) | `icon.primary` | `#2d2d32` |
| Typography (title) | `headline-xs` | KH Teka · 16px · lh:24px |

#### `Toggle`
Variants: dual · Multi

| Property | Token | Light Value |
|---|---|---|
| Container background | `surface.primary.light` | `#f3f3f3` |
| Active tab background | `surface.primary.lighter` | `#ffffff` |
| Active tab text | `text.primary` | `#2d2d32` |
| Inactive tab text | `text.secondary` | `#737378` |
| Active shadow | `elevation-1` | `4px 4px 10px 2px #32325d05` |
| Typography | `label-md` | KH Teka · 16px · lh:16px |
| Padding | `spacing.xs` | 8px |
| Border radius | `radius.xxl` | 32px |

---

### 02 — Input

#### `Search bar`
Variants: iOS · Android | States: Inactive · Expanded · Active

| Property | Token | Light Value |
|---|---|---|
| Background | `surface.primary.light` | `#f3f3f3` |
| Placeholder text | `text.tertiary` | `#b9b9be` |
| Active text | `text.primary` | `#2d2d32` |
| Search icon | `icon.secondary` | `#737378` |
| Cancel text | `text.brand` | `#e31b3b` |
| Typography | `paragraph-md` | KH Teka · 16px · lh:24px |
| Height | `object-height.md` | 40px |
| Border radius | `radius.xxl` | 32px |
| Horizontal padding | `spacing.md` | 16px |

#### `Enter phone number`
States: Passive · Active

| Property | Token | Light Value |
|---|---|---|
| Background | `surface.primary.lighter` | `#ffffff` |
| Border (inactive) | `border.tertiary` | `#dcdce1` |
| Border (active) | `border.primary` | `#2d2d32` |
| Input text | `text.primary` | `#2d2d32` |
| Flag icon | `icon.primary` | `#2d2d32` |
| Arrow icon | `icon.secondary` | `#737378` |
| Typography | `paragraph-md` | KH Teka · 16px · lh:24px |
| Height | `object-height.md` | 40px |
| Border radius | `radius.sm` | 8px |
| Stroke | `stroke.md` | 1px |

#### `text-field`
States: inactive · active · error · filled

| Property | Token | Light Value |
|---|---|---|
| Label text | `text.secondary` | `#737378` |
| Input text | `text.primary` | `#2d2d32` |
| Placeholder | `text.tertiary` | `#b9b9be` |
| Border (inactive) | `border.tertiary` | `#dcdce1` |
| Border (active) | `border.primary` | `#2d2d32` |
| Border (error) | `border.error` | `#e31b3b` |
| Support text (error) | `text.error` | `#e31b3b` |
| Icon | `icon.secondary` | `#737378` |
| Background | `surface.primary.lighter` | `#ffffff` |
| Label typography | `label-sm` | KH Teka · 14px · lh:14px |
| Input typography | `paragraph-md` | KH Teka · 16px · lh:24px |
| Border radius | `radius.sm` | 8px |
| Stroke | `stroke.md` | 1px |

#### `Input-text-prime`
States: Inactive · Active · Filled · Error

| Property | Token | Light Value |
|---|---|---|
| Label | `text.secondary` | `#737378` |
| Input text | `text.primary` | `#2d2d32` |
| Underline (inactive) | `border.tertiary` | `#dcdce1` |
| Underline (active) | `border.primary` | `#2d2d32` |
| Underline (error) | `border.error` | `#e31b3b` |
| Typography | `paragraph-md` | KH Teka · 16px · lh:24px |
| Label typography | `label-sm` | KH Teka · 14px · lh:14px |

---

### 03 — Actions

#### `Primary` button
Sizes: lg · md · sm | States: Default · Pressed · Disabled · Loading

| Property | Token | Light Value |
|---|---|---|
| Background (default) | `surface.button.primary` | `#e31b3b` |
| Background (pressed) | `surface.button.pressed` | `#881023` |
| Background (disabled) | `surface.button.disabled` | `#b9b9be` |
| Label text | `text.lightest` | `#ffffff` |
| Icon | `icon.ligthest` | `#ffffff` |
| Typography (lg) | `label-lg` | KH Teka · 18px · lh:18px |
| Typography (md) | `label-md` | KH Teka · 16px · lh:16px |
| Typography (sm) | `label-sm` | KH Teka · 14px · lh:14px |
| Height (lg) | `object-height.lg` | 48px |
| Height (md) | `object-height.md` | 40px |
| Height (sm) | `object-height.sm` | 32px |
| Horizontal padding (lg) | `spacing.xl` | 24px |
| Horizontal padding (md) | `spacing.md` | 16px |
| Border radius | `radius.xxl` | 32px |

#### `Secondary` button
Colors: Black · White · Grey | States: Default · Pressed · Disabled

| Property | Token | Light Value |
|---|---|---|
| Background (Black) | `surface.button.secondary-black` | `#111111` (light) / `#ffffff` (dark) |
| Background (White) | `surface.button.secondary-white` | `#ffffff` |
| Background (Grey) | `surface.button.secondary-grey` | `#f3f3f3` (light) / `#737378` (dark) |
| Background (disabled) | `surface.button.disabled` | `#b9b9be` |
| Label (Black) | `text.lightest` | `#ffffff` |
| Label (White/Grey) | `text.primary` | `#2d2d32` |
| Border (White variant) | `border.primary` | `#2d2d32` |
| Typography (lg) | `label-lg` | KH Teka · 18px · lh:18px |
| Border radius | `radius.xxl` | 32px |
| Stroke | `stroke.md` | 1px |

#### `text-button`
Sizes: lg · md · sm | Colors: red · black

| Property | Token | Light Value |
|---|---|---|
| Text (red) | `text.brand` | `#e31b3b` |
| Text (black) | `text.primary` | `#2d2d32` |
| Typography (lg) | `label-lg` | KH Teka · 18px · lh:18px |

#### `button-icon`
Size: sm

| Property | Token | Light Value |
|---|---|---|
| Icon | `icon.primary` | `#2d2d32` |
| Background | `surface.primary.light` | `#f3f3f3` |
| Border radius | `radius.xxl` | 32px |
| Size | `icon-size.md` | 24px |

#### `Calling CTA`
States: one number · Multiple numbers · Expanded · Contact list mode

| Property | Token | Light Value |
|---|---|---|
| Background | `surface.primary.lighter` | `#ffffff` |
| Phone number text | `text.primary` | `#2d2d32` |
| Country / secondary text | `text.secondary` | `#737378` |
| Call icon | `icon.brand` | `#e31b3b` |
| Arrow icon | `icon.secondary` | `#737378` |
| Border | `border.tertiary` | `#dcdce1` |
| Shadow | `elevation-2` | `0px 14px 20px 4px #32325d0f` |
| Typography (number) | `headline-xs` | KH Teka · 16px · lh:24px |
| Typography (country) | `label-sm` | KH Teka · 14px · lh:14px |
| Border radius | `radius.lg` | 16px |
| Padding | `spacing.md` | 16px |

---

### 04 — Lists

#### `Contact list item`
Types: Default · No profile img · MTU contact · Sublist · etc.

| Property | Token | Light Value |
|---|---|---|
| Background | `surface.primary.lighter` | `#ffffff` |
| Primary name | `text.primary` | `#2d2d32` |
| Secondary (number/country) | `text.secondary` | `#737378` |
| Avatar background | `surface.primary.Neutral` | `#dcdce1` |
| Arrow / chevron icon | `icon.secondary` | `#737378` |
| Active state background | `surface.primary.light` | `#f3f3f3` |
| Divider | `border.tertiary` | `#dcdce1` |
| Typography (name) | `paragraph-md` | KH Teka · 16px · lh:24px |
| Typography (meta) | `label-sm` | KH Teka · 14px · lh:14px |
| Height | `object-height.xxl` | 64px |
| Padding H | `spacing.md` | 16px |

#### `Contact list`
Includes sublist, relevant list sections

| Property | Token | Light Value |
|---|---|---|
| List background | `surface.primary.canvas` | `#fafafc` |
| Section header text | `text.secondary` | `#737378` |
| Section header bg | `surface.primary.light` | `#f3f3f3` |
| Typography (section) | `label-xs` | KH Teka · 11px · lh:11px |

#### `Country list`
Types: Simple · With meta · meta+icon

| Property | Token | Light Value |
|---|---|---|
| Background | `surface.primary.lighter` | `#ffffff` |
| Country name | `text.primary` | `#2d2d32` |
| Meta (dial code / info) | `text.secondary` | `#737378` |
| Divider | `border.tertiary` | `#dcdce1` |
| Checkmark icon | `icon.brand` | `#e31b3b` |
| Typography (name) | `paragraph-md` | KH Teka · 16px · lh:24px |
| Typography (meta) | `label-sm` | KH Teka · 14px · lh:14px |
| Padding H | `spacing.md` | 16px |
| Item height | `object-height.xxl` | 64px |

#### `Text list`
State variant

| Property | Token | Light Value |
|---|---|---|
| Background | `surface.primary.lighter` | `#ffffff` |
| Primary text | `text.primary` | `#2d2d32` |
| Secondary text | `text.secondary` | `#737378` |
| Divider | `border.tertiary` | `#dcdce1` |
| Active/selected indicator | `content.brand` | `#e31b3b` |
| Typography | `paragraph-md` | KH Teka · 16px · lh:24px |

#### `simple text list`
Types: sm · default

| Property | Token | Light Value |
|---|---|---|
| Text | `text.primary` | `#2d2d32` |
| Meta text | `text.secondary` | `#737378` |
| Typography (sm) | `paragraph-sm` | KH Teka · 14px · lh:20px |

#### `Transaction list`

| Property | Token | Light Value |
|---|---|---|
| Background | `surface.primary.lighter` | `#ffffff` |
| Transaction name | `text.primary` | `#2d2d32` |
| Date / meta | `text.secondary` | `#737378` |
| Amount (debit) | `text.error` | `#e31b3b` |
| Amount (credit) | `text.success` | `#49cd18` |
| Divider | `border.tertiary` | `#dcdce1` |
| Typography | `paragraph-sm` | KH Teka · 14px · lh:20px |

#### `Order summary`

| Property | Token | Light Value |
|---|---|---|
| Background | `surface.primary.lighter` | `#ffffff` |
| Row label | `text.secondary` | `#737378` |
| Row value | `text.primary` | `#2d2d32` |
| Total label | `text.primary` | `#2d2d32` |
| Total value | `text.primary` | `#2d2d32` |
| Divider | `border.tertiary` | `#dcdce1` |
| Border | `border.tertiary` | `#dcdce1` |
| Shadow | `elevation-1` | `4px 4px 10px 2px #32325d05` |
| Typography (rows) | `paragraph-sm` | KH Teka · 14px · lh:20px |
| Typography (total) | `headline-xs` | KH Teka · 16px · lh:24px |
| Border radius | `radius.lg` | 16px |
| Padding | `spacing.md` | 16px |
| Stroke | `stroke.md` | 1px |

#### `Subscription/MTU` & `Subscription/Calling`
States: Active · Inactive · Pending

| Property | Token | Light Value |
|---|---|---|
| Card background | `surface.primary.lighter` | `#ffffff` |
| Active badge background | `surface.primary.success-light` | `#d1f3c5` |
| Active badge text | `content.success` | `#49cd18` |
| Inactive badge | `surface.primary.Neutral` | `#dcdce1` |
| Title text | `text.primary` | `#2d2d32` |
| Subtitle / meta | `text.secondary` | `#737378` |
| Border | `border.tertiary` | `#dcdce1` |
| Shadow | `elevation-2` | `0px 14px 20px 4px #32325d0f` |
| Typography (title) | `headline-xs` | KH Teka · 16px · lh:24px |
| Typography (meta) | `paragraph-xs` | KH Teka · 12px · lh:18px |
| Border radius | `radius.lg` | 16px |
| Padding | `spacing.md` | 16px |

---

### 05 — Components

#### `Home/Card`
Types: Default · mini-menu

| Property | Token | Light Value |
|---|---|---|
| Card background | `surface.primary.lighter` | `#ffffff` |
| Name text | `text.primary` | `#2d2d32` |
| Meta text | `text.homecard-meta` | `#505055` |
| Meta icon | `surface.home-card.600` | `#737378` |
| Shadow | `elevation-2` | `0px 14px 20px 4px #32325d0f` |
| Typography (name) | `paragraph-md` | KH Teka · 16px · lh:24px |
| Typography (meta) | `label-sm` | KH Teka · 14px · lh:14px |
| Border radius | `radius.lg` | 16px |
| Padding | `spacing.md` | 16px |

#### `Home/Services`
States: Default · Expanded

| Property | Token | Light Value |
|---|---|---|
| Background (Calling) | `surface.home.calling` | `#edeadd` |
| Background (MTU) | `surface.home.mtu` | `#dae2f4` |
| Service name | `text.primary` | `#2d2d32` |
| Meta text | `text.secondary` | `#737378` |
| Border radius | `radius.lg` | 16px |
| Padding | `spacing.md` | 16px |

#### `MTU/Product/Bundle` & `MTU/Product/Credits` & `MTU/Product/Plan`
States: Collapsed · Expanded | Discount: Yes · No

| Property | Token | Light Value |
|---|---|---|
| Background | `surface.primary.lighter` | `#ffffff` |
| Product name | `text.primary` | `#2d2d32` |
| Price | `text.primary` | `#2d2d32` |
| Description | `text.secondary` | `#737378` |
| Validity badge | `text.secondary` | `#737378` |
| Discount badge bg | `surface.primary.success-light` | `#d1f3c5` |
| Discount badge text | `content.success` | `#49cd18` |
| Expand icon | `icon.secondary` | `#737378` |
| Border | `border.tertiary` | `#dcdce1` |
| Shadow | `elevation-1` | `4px 4px 10px 2px #32325d05` |
| Typography (name) | `paragraph-md` | KH Teka · 16px · lh:24px |
| Typography (price) | `headline-xs` | KH Teka · 16px · lh:24px |
| Typography (desc) | `paragraph-xs` | KH Teka · 12px · lh:18px |
| Border radius | `radius.lg` | 16px |
| Padding | `spacing.md` | 16px |
| Stroke | `stroke.md` | 1px |

#### `MTU/Promo`
Types: one · two · three

| Property | Token | Light Value |
|---|---|---|
| Background | `surface.primary.lighter` | `#ffffff` |
| Promo title | `text.primary` | `#2d2d32` |
| Promo description | `text.secondary` | `#737378` |
| CTA button bg | `surface.button.primary` | `#e31b3b` |
| CTA button text | `text.lightest` | `#ffffff` |
| Border | `border.tertiary` | `#dcdce1` |
| Border radius | `radius.lg` | 16px |
| Padding | `spacing.md` | 16px |

#### `MTU/Auto top up` & `MTU/Auto top up reminder`

| Property | Token | Light Value |
|---|---|---|
| Background | `surface.primary.lighter` | `#ffffff` |
| Title | `text.primary` | `#2d2d32` |
| Description | `text.secondary` | `#737378` |
| Toggle active | `surface.button.green` | `#09bc09` |
| Toggle inactive | `surface.primary.Neutral` | `#dcdce1` |
| Border | `border.tertiary` | `#dcdce1` |
| Typography | `paragraph-sm` | KH Teka · 14px · lh:20px |
| Border radius | `radius.lg` | 16px |
| Padding | `spacing.md` | 16px |

#### `Payment module`
States: Default · Apple Pay · Google Pay · No payment method

| Property | Token | Light Value |
|---|---|---|
| Background | `surface.primary.lighter` | `#ffffff` |
| Payment method label | `text.primary` | `#2d2d32` |
| Card meta text | `text.secondary` | `#737378` |
| Rebtel Credits label | `text.brand` | `#e31b3b` |
| Rebtel Credits amount | `text.primary` | `#2d2d32` |
| Add payment text | `text.brand` | `#e31b3b` |
| Divider | `border.tertiary` | `#dcdce1` |
| Border | `border.tertiary` | `#dcdce1` |
| Shadow | `elevation-2` | `0px 14px 20px 4px #32325d0f` |
| Typography (label) | `label-md` | KH Teka · 16px · lh:16px |
| Typography (meta) | `paragraph-xs` | KH Teka · 12px · lh:18px |
| Border radius | `radius.lg` | 16px |
| Padding | `spacing.md` | 16px |

#### `Calling/calling action bar`
Styles: New user · Credit Only · Credit low · Subscription · etc.

| Property | Token | Light Value |
|---|---|---|
| Background | `surface.primary.lighter` | `#ffffff` |
| Credit label | `text.primary` | `#2d2d32` |
| Credit amount | `text.primary` | `#2d2d32` |
| Credit low state text | `text.warning` | `#f06e1d` |
| Credit low state bg | `surface.primary.warning-light` | `#fbdbc6` |
| Subscription label | `text.secondary` | `#737378` |
| Border | `border.tertiary` | `#dcdce1` |
| Typography | `label-sm` | KH Teka · 14px · lh:14px |
| Height | `object-height.xl` | 52px |
| Padding H | `spacing.md` | 16px |

#### `Calling/credit product` & `Calling/Unlimited product`

| Property | Token | Light Value |
|---|---|---|
| Background | `surface.primary.lighter` | `#ffffff` |
| Product name | `text.primary` | `#2d2d32` |
| Price | `text.primary` | `#2d2d32` |
| Meta / minutes | `text.secondary` | `#737378` |
| Select button bg | `surface.button.primary` | `#e31b3b` |
| Select button text | `text.lightest` | `#ffffff` |
| Border | `border.tertiary` | `#dcdce1` |
| Shadow | `elevation-1` | `4px 4px 10px 2px #32325d05` |
| Border radius | `radius.lg` | 16px |
| Padding | `spacing.md` | 16px |

#### `Account activity/Details/Calling`, `/MTU`, `/Rebtel Credits`

| Property | Token | Light Value |
|---|---|---|
| Page background | `surface.primary.canvas` | `#fafafc` |
| Card background | `surface.primary.lighter` | `#ffffff` |
| Section title | `text.primary` | `#2d2d32` |
| Row label | `text.secondary` | `#737378` |
| Row value | `text.primary` | `#2d2d32` |
| Status — Completed | `text.success` | `#49cd18` |
| Status — Pending | `text.warning` | `#f06e1d` |
| Status — Error | `text.error` | `#e31b3b` |
| Divider | `border.tertiary` | `#dcdce1` |
| Shadow | `elevation-1` | `4px 4px 10px 2px #32325d05` |
| Typography (title) | `headline-xs` | KH Teka · 16px · lh:24px |
| Typography (row) | `paragraph-sm` | KH Teka · 14px · lh:20px |
| Border radius | `radius.lg` | 16px |
| Padding | `spacing.md` | 16px |

#### `Address module`

| Property | Token | Light Value |
|---|---|---|
| Background | `surface.primary.lighter` | `#ffffff` |
| Label | `text.secondary` | `#737378` |
| Value text | `text.primary` | `#2d2d32` |
| Edit icon | `icon.brand` | `#e31b3b` |
| Border | `border.tertiary` | `#dcdce1` |
| Typography | `paragraph-sm` | KH Teka · 14px · lh:20px |
| Border radius | `radius.sm` | 8px |
| Padding | `spacing.sm` | 12px |

---

### 06 — Bottom Sheet

#### `Home/contact setup`

| Property | Token | Light Value |
|---|---|---|
| Sheet background | `surface.primary.bottom-sheet` | `#ffffff` (light) / `#2d2d32` (dark) |
| Handle | `surface.primary.Neutral` | `#dcdce1` |
| Contact name | `text.primary` | `#2d2d32` |
| Secondary text | `text.secondary` | `#737378` |
| CTA button | `surface.button.primary` | `#e31b3b` |
| Shadow | `elevation-3` | `0px 12px 28px 0px #32325d2e` |
| Top border radius | `radius.xxl` | 32px |
| Padding H | `spacing.md` | 16px |

#### `Call settings`
States: Default · Hide number · Travel mode · Wi-Fi only · etc.

| Property | Token | Light Value |
|---|---|---|
| Sheet background | `surface.primary.bottom-sheet` | `#ffffff` (light) / `#2d2d32` (dark) |
| Setting label | `text.primary` | `#2d2d32` |
| Setting description | `text.secondary` | `#737378` |
| Toggle (on) | `surface.button.green` | `#09bc09` |
| Toggle (off) | `surface.primary.Neutral` | `#dcdce1` |
| Section divider | `border.tertiary` | `#dcdce1` |
| Icon | `icon.secondary` | `#737378` |
| Shadow | `elevation-3` | `0px 12px 28px 0px #32325d2e` |
| Typography (label) | `paragraph-md` | KH Teka · 16px · lh:24px |
| Typography (desc) | `paragraph-xs` | KH Teka · 12px · lh:18px |
| Top border radius | `radius.xxl` | 32px |

#### `Subscription` (bottom sheet)
Types: Plans · Bundle · Credits | States: Active · Inactive

| Property | Token | Light Value |
|---|---|---|
| Sheet background | `surface.primary.bottom-sheet` | `#ffffff` |
| Active indicator | `surface.primary.success-strong` | `#09bc09` |
| Inactive indicator | `surface.primary.Neutral` | `#dcdce1` |
| Plan name | `text.primary` | `#2d2d32` |
| Plan details | `text.secondary` | `#737378` |
| Price | `text.primary` | `#2d2d32` |
| CTA (buy/renew) | `surface.button.primary` | `#e31b3b` |
| Shadow | `elevation-3` | `0px 12px 28px 0px #32325d2e` |

---

### 07 — Cards

#### `wireless-card`
States: Default · No int-number

| Property | Token | Light Value |
|---|---|---|
| Background | `surface.primary.lighter` | `#ffffff` |
| Title | `text.primary` | `#2d2d32` |
| Status text | `text.secondary` | `#737378` |
| Active status | `content.success` | `#49cd18` |
| Border | `border.tertiary` | `#dcdce1` |
| Shadow | `elevation-2` | `0px 14px 20px 4px #32325d0f` |
| Typography (title) | `headline-xs` | KH Teka · 16px · lh:24px |
| Typography (meta) | `paragraph-xs` | KH Teka · 12px · lh:18px |
| Border radius | `radius.lg` | 16px |
| Padding | `spacing.md` | 16px |

#### `usage-card`

| Property | Token | Light Value |
|---|---|---|
| Background | `surface.primary.lighter` | `#ffffff` |
| Label | `text.secondary` | `#737378` |
| Value | `text.primary` | `#2d2d32` |
| Typography (label) | `label-xs` | KH Teka · 11px · lh:11px |
| Typography (value) | `headline-xs` | KH Teka · 16px · lh:24px |
| Border radius | `radius.sm` | 8px |
| Padding | `spacing.xs` | 8px |

---

### Communication & Offers

#### `Promo/M-card`
Styles: Card 1 · Card 2

| Property | Token | Light Value |
|---|---|---|
| Card background | `surface.primary.brand-red` | `#e31b3b` |
| Title text | `text.lightest` | `#ffffff` |
| Body text | `text.lightest` | `#ffffff` |
| CTA button bg | `surface.primary.lighter` | `#ffffff` |
| CTA button text | `text.brand` | `#e31b3b` |
| Typography (title) | `headline-sm` | KH Teka · 20px · lh:32px |
| Typography (body) | `paragraph-sm` | KH Teka · 14px · lh:20px |
| Border radius | `radius.xl` | 24px |
| Padding | `spacing.md` | 16px |

#### `Welcome module`
Types: Calling · MTU · Wireless | Versions: Free minutes · visuals

| Property | Token | Light Value |
|---|---|---|
| Background (Calling) | `surface.home.calling` | `#edeadd` |
| Background (MTU) | `surface.home.mtu` | `#dae2f4` |
| Title | `text.primary` | `#2d2d32` |
| Body text | `text.secondary` | `#737378` |
| CTA button | `surface.button.primary` | `#e31b3b` |
| CTA text | `text.lightest` | `#ffffff` |
| Typography (title) | `headline-sm` | KH Teka · 20px · lh:32px |
| Typography (body) | `paragraph-sm` | KH Teka · 14px · lh:20px |
| Border radius | `radius.xl` | 24px |
| Padding | `spacing.md` | 16px |

#### `Info-bar`

| Property | Token | Light Value |
|---|---|---|
| Background | `surface.primary.warning-light` | `#fbdbc6` |
| Text | `content.warning` | `#f06e1d` |
| Icon | `icon.warning` | `#f06e1d` |
| Typography | `paragraph-xs` | KH Teka · 12px · lh:18px |
| Padding V | `spacing.xs` | 8px |
| Padding H | `spacing.md` | 16px |

---

### Dialog

#### `Dialog-popup`
Types: high-prio · default · one action

| Property | Token | Light Value |
|---|---|---|
| Overlay | `surface.primary.overlay-background` | `#11111166` |
| Dialog background | `surface.primary.lighter` | `#ffffff` |
| Title | `text.primary` | `#2d2d32` |
| Body text | `text.secondary` | `#737378` |
| Primary CTA | `surface.button.primary` | `#e31b3b` |
| Primary CTA text | `text.lightest` | `#ffffff` |
| Secondary CTA | `surface.button.secondary-black` | `#111111` |
| Secondary CTA text | `text.lightest` | `#ffffff` |
| Destructive CTA text | `text.brand` | `#e31b3b` |
| Shadow | `elevation-3` | `0px 12px 28px 0px #32325d2e` |
| Typography (title) | `headline-sm` | KH Teka · 20px · lh:32px |
| Typography (body) | `paragraph-sm` | KH Teka · 14px · lh:20px |
| Border radius | `radius.xl` | 24px |
| Padding | `spacing.md` | 16px |

#### `Dialog-full-page`
Types: prio-2-cta · prio-1-cta · default-2-cta · default-1-cta

| Property | Token | Light Value |
|---|---|---|
| Background | `surface.primary.canvas` | `#fafafc` |
| Title | `text.primary` | `#2d2d32` |
| Body | `text.secondary` | `#737378` |
| Primary CTA | `surface.button.primary` | `#e31b3b` |
| Secondary CTA | `surface.button.secondary-black` | `#111111` |
| Close icon | `icon.primary` | `#2d2d32` |
| Typography (title) | `headline-md` | KH Teka · 24px · lh:36px |
| Typography (body) | `paragraph-md` | KH Teka · 16px · lh:24px |
| Padding H | `spacing.md` | 16px |

---

### Shared / Atomic Components

#### `Label`
Colors: Purple · Black

| Property | Token | Light Value |
|---|---|---|
| Background (Purple) | `surface.label.purple` | `#4200ff` |
| Background (Black) | `surface.label.black` | `#2d2d32` |
| Text | `text.lightest` | `#ffffff` |
| Typography | `label-xs` | KH Teka · 11px · lh:11px |
| Padding H | `spacing.xxs` | 4px |
| Padding V | `spacing.xxxs` | 2px |
| Border radius | `radius.xs` | 4px |

#### `Pill`

| Property | Token | Light Value |
|---|---|---|
| Background | `surface.primary.light` | `#f3f3f3` |
| Text | `text.secondary` | `#737378` |
| Typography | `label-xs` | KH Teka · 11px · lh:11px |
| Padding H | `spacing.xs` | 8px |
| Border radius | `radius.xxl` | 32px |

#### `Avatar`
Sizes: sm · md · lg | Content: Flag · Initials · Photo

| Property | Token | Light Value |
|---|---|---|
| Background (no photo) | `surface.primary.Neutral` | `#dcdce1` |
| Initials text | `text.primary` | `#2d2d32` |
| Size (sm) | `icon-size.md` | 24px |
| Size (md) | `icon-size.lg` | 32px |
| Size (lg) | `icon-size.xl` | 40px |
| Border radius | `radius.xxl` | 32px (full circle) |

#### `checkbox` & `radiobutton`
States: Filled · Empty · Passive

| Property | Token | Light Value |
|---|---|---|
| Selected background | `surface.button.primary` | `#e31b3b` |
| Selected border | `border.error` | `#e31b3b` |
| Unselected border | `border.tertiary` | `#dcdce1` |
| Checkmark icon | `icon.ligthest` | `#ffffff` |
| Disabled bg | `surface.button.disabled` | `#b9b9be` |
| Size | `icon-size.sm` | 20px |

#### `Toggle` (switch)
States: Inactive · Active

| Property | Token | Light Value |
|---|---|---|
| Active track | `surface.button.green` | `#09bc09` |
| Inactive track | `surface.primary.Neutral` | `#dcdce1` |
| Thumb | `surface.primary.lighter` | `#ffffff` |

#### `Toaster`
Types: Neutral · Success · Error · Warning

| Property | Token | Light Value |
|---|---|---|
| Background (Neutral) | `surface.primary.darker` | `#111111` |
| Background (Success) | `surface.primary.success-light` | `#d1f3c5` |
| Background (Error) | `surface.primary.error-light` | `#f4a4b1` |
| Background (Warning) | `surface.primary.warning-light` | `#fbdbc6` |
| Text (Neutral) | `text.lightest` | `#ffffff` |
| Text (Success) | `content.success` | `#49cd18` |
| Text (Error) | `text.error` | `#e31b3b` |
| Text (Warning) | `content.warning` | `#f06e1d` |
| Icon (Success) | `icon.success` | `#49cd18` |
| Icon (Warning) | `icon.warning` | `#f06e1d` |
| Icon (Error) | `icon.brand` | `#e31b3b` |
| Shadow | `elevation-3` | `0px 12px 28px 0px #32325d2e` |
| Typography | `paragraph-sm` | KH Teka · 14px · lh:20px |
| Border radius | `radius.lg` | 16px |
| Padding V | `spacing.xs` | 8px |
| Padding H | `spacing.md` | 16px |

#### `Section header`
Types: Without icon · With icon

| Property | Token | Light Value |
|---|---|---|
| Text | `text.primary` | `#2d2d32` |
| Icon | `icon.brand` | `#e31b3b` |
| Typography | `label-sm` | KH Teka · 14px · lh:14px |
| Padding V | `spacing.xs` | 8px |
| Padding H | `spacing.md` | 16px |

#### `pricing-bar`
Types: international number · etc. | States: Default · Discount

| Property | Token | Light Value |
|---|---|---|
| Background | `surface.primary.lighter` | `#ffffff` |
| Price text | `text.primary` | `#2d2d32` |
| Discount price | `text.brand` | `#e31b3b` |
| Original price (strikethrough) | `text.secondary` | `#737378` |
| Discount badge bg | `surface.primary.success-light` | `#d1f3c5` |
| Discount badge text | `content.success` | `#49cd18` |
| Border | `border.tertiary` | `#dcdce1` |
| Typography (price) | `headline-xs` | KH Teka · 16px · lh:24px |
| Typography (meta) | `paragraph-xs` | KH Teka · 12px · lh:18px |
| Border radius | `radius.lg` | 16px |

#### `Visualizations`
Types: Success · Error · Warning

| Property | Token | Light Value |
|---|---|---|
| Success bg | `surface.primary.success-light` | `#d1f3c5` |
| Success icon | `icon.success` | `#49cd18` |
| Error bg | `surface.primary.error-light` | `#f4a4b1` |
| Error icon | `icon.brand` | `#e31b3b` |
| Warning bg | `surface.primary.warning-light` | `#fbdbc6` |
| Warning icon | `icon.warning` | `#f06e1d` |
