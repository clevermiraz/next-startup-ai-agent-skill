# Tokens

Starting values, not a house style. If the project already has a good system, keep its values
and fix how they're used. Let the direction move them.

## Spacing

Scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128 (any multiple of 4 is fine)

| Use | Value |
| --- | --- |
| Inside a control | 4–12 |
| Between related items (list rows) | 2–8 |
| Between groups (label→list, card→card) | 12–24 |
| Between sections | 32–64 (landing 80–128) |
| Row heights | 32 compact · 36 default · 40–44 touch |
| Hero: nav → headline | 96–128 desktop · 48–64 mobile |

## App layout

- Sidebar 240–280, content fluid with 24–32 padding, capped ~1440–1600.
- Top bar / page header 56–64 tall.
- Nav rows 32–36, gap 2–4, section labels 24 above / 8 below.
- Stat cards share one height, 3–4 per row on desktop, numbers only.
- Main chart ≥ 2/3 of content width, 280–360 tall. Data beside it is a list or table, narrower.

## Neutral ramps

Apps/dashboards: graphite (or equally grey) for every surface. Landing pages: pick the tint
of the world — **warm** for paper, wood, food, craft, people; **ink** for night, sky, water,
technical. Keep saturation very low so no surface reads as a color.

### Dark

| Role | Graphite | Warm | Ink |
| --- | --- | --- | --- |
| Deepest (sidebar) | #0f0f10 | #12110f | #07080d |
| Page background | #141415 | #161513 | #0b0d14 |
| Card | #19191b | #1c1a18 | #11141c |
| Raised (active row, input) | #232325 | #262421 | #1a1e28 |
| Hairline | primary @ 8% | primary @ 8% | primary @ 8% |
| Primary text | #ededed | #efe9de | #eef0f5 |
| Secondary text | #a1a1a6 | #aaa398 | #a3a9b8 |
| Muted text / icons | #85858b | #8a847a | #7a8296 |

### Light

| Role | Graphite | Warm | Ink |
| --- | --- | --- | --- |
| Page background | #fafafa | #f7f4ee | #f5f7fa |
| Card | #ffffff | #fdfbf7 | #ffffff |
| Raised | #f4f4f5 | #efe9df | #eceff4 |
| Hairline | primary @ 8% | primary @ 8% | primary @ 8% |
| Primary text | #171717 | #1f1b16 | #111827 |
| Secondary text | #525252 | #5e554a | #4b5565 |
| Muted text / icons | #737373 | #7b7266 | #6b7487 |

Muted is for meta and captions only (~4.5:1 on its surface). Body uses primary or secondary.

Semantic: positive `#4cc38a` dark / `#16a34a` light · negative `#e5484d` dark / `#dc2626` light.

### shadcn/ui mapping (`globals.css`)

| shadcn variable | Ramp role |
| --- | --- |
| `--background` | Page background |
| `--card`, `--popover` | Card |
| `--muted`, `--secondary`, `--accent`, `--input` | Raised |
| `--sidebar` | Deepest (dark) / page background (light) |
| `--border` | Hairline (primary text at 8%, e.g. `oklch(from var(--foreground) l c h / 0.08)` or a solid equivalent) |
| `--foreground`, `--card-foreground` | Primary text |
| `--muted-foreground` | Secondary or muted text (pick one; use `text-foreground/60` for the other if needed) |
| `--primary` / `--primary-foreground` | Accent (or off-white on dark) / text on it, ≥ 4.5:1 |
| `--ring` | Accent at reduced opacity, or secondary text |
| `--radius` | 10px (controls 8–10, cards derive from it) |
| `--chart-1…5` | `--chart-1` = accent, the rest neutral steps unless series must be told apart |

Note: shadcn's `--accent` is a hover surface, not the brand accent — keep it neutral.

## Accent

- Keep a real brand color. Hue-to-hue glow gradients are not a brand color unless the user says so.
- No brand color → take it from the world: warm → amber, coral, ember; cool → cobalt, teal, sky; natural → moss, sage. Avoid purple→blue unless the brand truly is purple.
- Text on the accent ≥ 4.5:1 — darken it or use dark text.
- The accent covers a few percent of the screen: primary action, selection, one key figure.

## Buttons

- Hero 44–48 tall · nav 32–36 · side padding 16–20.
- Primary on dark: off-white with dark text, or the accent. Primary on light: primary-text fill with white text, or the accent.
- Secondary: raised surface + hairline, primary text.
- Dark buttons may carry `inset 0 1px 0 rgba(255,255,255,0.12)` for depth without glow.

## Type families (all free; Google Fonts → `next/font/google`)

| Character | Interface | Optional partner |
| --- | --- | --- |
| Precise, technical, calm | Geist, Inter, IBM Plex Sans | Geist Mono, IBM Plex Mono, JetBrains Mono (figures, meta) |
| Warm, friendly, human | Instrument Sans, DM Sans, Figtree | Instrument Serif or Newsreader (hero headline only) |
| Editorial, literary, crafted | Inter or Instrument Sans | Newsreader, Instrument Serif, Fraunces (headlines) |
| Playful, bold | Space Grotesk, Bricolage Grotesque | a mono for small labels |

A display serif is for large headlines only, never labels or buttons.

## Type scale

| Use | Size | Line height | Weight |
| --- | --- | --- | --- |
| Small labels, meta, counts | 12 | 16 | 400, mono welcome |
| Secondary, captions | 13–14 | 20 | 400 |
| Body, nav items | 14–15 | 20–22 | 400–500 |
| Logo wordmark | 16–18 | 1 | 500–600 |
| Hero subhead | 18–20 | 28–30 | 400, secondary, max 36rem |
| Card figures | 28–32 | 1 | 500, tabular |
| Page title | 28–36 | 1.15 | 400–500 |
| Hero headline | 56–72 desktop · 36–44 mobile | 1.02–1.08 | 400–500 |

Letter spacing: 0 under 16px (≤ 0.01em for small muted text). From 40px up to −0.02em, from
56px up to −0.03em. Latin only — 0 for Arabic.

## Radius

| Element | Radius |
| --- | --- |
| Keycap, tag, small button | 4–6 |
| Row, input, button | 8–10 |
| Card | 12–16 |
| Panel, window | 14–20 |

Nested: inner = outer − padding, never below 4. A 16px card with 8px padding holds 8px items.

## Icons

`lucide-react`, 16 or 18px, `strokeWidth={1.5}`, muted or secondary text color, 8–10px gap.

## Depth

- Dark: surface steps + hairline. Active row may carry `inset 0 1px 0 rgba(255,255,255,0.12)`.
- Light: `0 1px 2px rgba(0,0,0,0.05)` small · `0 8px 24px rgba(0,0,0,0.06)` floating.

## Motion

One curve: `cubic-bezier(0.22, 1, 0.36, 1)` (Tailwind v4: `--ease-out` in `@theme`).

| Use | Duration |
| --- | --- |
| Hover, press, toggles | 120–180ms |
| Menus, popovers, tooltips | 160–220ms |
| Entrances, sheets, layout changes | 300–500ms |
| Stagger | 40–60ms, max 6 items |

Rise on enter 6–12px · press scale 0.97–0.98 · transition only color, background, border,
opacity, transform · wrap non-essential motion in `motion-safe:`.

---

Adapted from unslop by Damir Sokolovsky ([@heydamir](https://x.com/heydamir)), CC BY 4.0.
