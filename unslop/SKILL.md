---
name: unslop
description: >
  Turns vibecoded, AI-looking UI into a deliberate interface with its own character. Scans the
  code for slop signals, sets a direction from the product itself, then fixes spacing, color,
  icons, copy, type, layout, details, visuals and motion in that order, at the design-token
  source first. Use when the user asks to unslop, polish, clean up, de-AI or redesign a screen,
  or when a UI shows the usual tells: purple/violet gradients, glows, gradient text, emoji
  labels, "New ✨" badges, blobs, UPPERCASE tracked labels, pulsing elements, uneven spacing,
  hype copy. Works on Next.js, React, Tailwind (v3/v4), shadcn/ui, HTML and CSS — dashboards,
  apps and landing pages.
license: CC-BY-4.0
metadata:
  version: 1.0.0
  adapted-from: unslop by Damir Sokolovsky (https://github.com/heydamir/unslop), CC BY 4.0
  category: design
  tags: [ui-polish, design-review, tailwind, shadcn, nextjs]
---

# Unslop

Adapted from **unslop** by Damir Sokolovsky ([@heydamir](https://x.com/heydamir)), licensed
CC BY 4.0. Condensed and extended (code scanner, token-first fixes, accessibility, verification).
Keep this credit in any copy.

AI-generated UI fails in predictable ways: every surface glows, every label has an emoji,
spacing is random and the copy shouts. Unslopping fixes the craft and **keeps the product** —
features, content and section order stay. What changes is that every size, color, word and
image becomes deliberate.

Clean is only half the job. A clean screen that could belong to any product is the next
template. The goal is a screen only *this* product could have.

**Where the richness goes:** slop spreads color and effects over the chrome (backgrounds,
buttons, borders, labels). Craft keeps the chrome quiet and spends richness on one or two
content moments — a well-drawn chart, a rendered object, an image from the product's world.

## Workflow

1. **Look.** Find the files that render the screen (page, layout, components, `globals.css`,
   Tailwind config / `@theme`, `components.json`). If you can run the app and screenshot it
   (browser tool, `run` skill), do it — judge what people see, not only the code. If you only
   have a screenshot, rebuild it as one static HTML file first and treat that as the original.
2. **Scan.** Run the scanner on the screen's files and save the score as the baseline:
   ```bash
   node <skill-dir>/scripts/scan.mjs app/(marketing) components/landing
   ```
   It flags code-level signs (gradients, glows, emoji, off-grid values, tracked caps, heavy
   weights, loop animations, `transition-all`, hype words, unverified claims…). Then audit by
   eye against [references/signs.md](references/signs.md) — the scanner can't see composition,
   hierarchy or template look. Write one line per sign with where it lives.
3. **Triage honestly.**
   - **Heavy slop** (signs across color, type, icons, copy) → full process.
   - **Light slop** (mostly designed, a few signs) → *polish mode*: fix only what the audit
     found, keep the existing palette, type, layout and visual. Bigger ideas go in the report
     as suggestions.
   - **No slop** → say so; suggest at most 2–3 refinements with exact values; apply only if
     the user agrees. Never change a good screen just to make it different.
4. **Set the direction, then stop.** Write the five lines below, show them with the audit, and
   wait for the user's answer before editing (use the ask-question tool if available). Skip the
   wait only if the user already said "just do it".
5. **Fix in nine passes, in order.** Finish each pass across the whole screen before the next.
   If nearly every line changes, plan all passes, then write the screen in one go. Fix at the
   **token source first** (see *Stack notes*), then the components.
6. **Verify.** Re-run the scanner (score should drop to near zero; anything left must be
   intentional — mark it `// unslop-ignore`). Run the project's lint/typecheck/build. Render
   again (max 3 renders per run), check both light and dark themes, walk the checklist.
7. **Report:** the direction, a few lines per pass, scanner score before → after, claims the
   user must confirm, and any image prompt you wrote.

Exact starting values for every pass: [references/tokens.md](references/tokens.md).

## Direction

Five short lines, derived from what the page says the product does and for whom — never from
what's trending.

- **Product** — what it does, for whom, one plain sentence.
- **Character** — 2–3 concrete words (`calm, exact, a little warm`). Banned: clean, modern,
  sleek, minimal, premium — they describe every template.
- **World** — the place/material the product belongs to (notes → paper and ink; monitoring →
  instruments and night shifts; travel → maps and window light). It tints the neutrals, picks
  the accent and the visual.
- **Moments** — 1–2 places that get rich color and detail, chosen from what the product shows.
- **Signature** — one small detail only this product would have, used consistently (live status
  dot, keycaps, hand-drawn underline, route line). One, not five.

Keep a real brand (logo, color, typeface that isn't slop) and build around it. A violet→blue
gradient, sparkles or glow are not brand, even in the logo, unless the user says so.

## The nine passes

### 1. Spacing
- Everything on a 4px grid (2px only for nudges inside small controls). Replace one-offs like
  `mt-[13px]` with scale steps.
- Same thing, same size: one row height and gap per list, one padding per card row.
- Space shows grouping: gap inside a group < gap between groups.
- One alignment column each for icons, labels and right-aligned numbers. No stray translates.
- Density: compact panels ~16, cards 20–24, page edges 24–32. Nav rows 32–36, gap 2–4,
  section labels 24 above / 8 below. Measure the sidebar afterwards — it breaks most often.

### 2. Color
- One neutral ramp, tinted toward the world. Surfaces, borders and text all come from it.
- Apps/dashboards: surfaces stay neutral (graphite-grey); the content carries color. Landing
  pages may tint surfaces further.
- Three text roles: primary, secondary, muted.
- One accent in the chrome, used rarely (primary action, selection, the one key number).
  Inside the moments, color may be rich if each hue means something.
- Contrast: text on accent ≥ 4.5:1; accent used as text gets a darker shade. Check **both
  themes**.
- On dark themes an off-white primary button with dark text often beats a colored one.
- Semantic colors only carry meaning, toned down into the palette.
- Remove hue-to-hue gradients, gradient text, colored glows/shadows, radial washes, blobs,
  neon borders. Borders are hairlines (text color at 6–10%). Dark depth = surface steps +
  hairlines; light depth = small neutral shadows. A gradient is allowed only as a tiny tone
  shift within one neutral.

### 3. Icons
- Emoji used as icons or label decoration → line icons from one set (the project's, else
  `lucide-react`).
- One size and stroke: 16 or 18px, stroke 1.5. Icons take their text role's color, never
  their own.
- Fixed icon box width and 8–10px gap so labels align.
- Drop icons that add nothing. Categories that need color get a small status dot.

### 4. Copy
- Headlines say what the product does for whom, using facts already on the page.
- No exclamation marks, no greeting headlines (`Welcome back, Sam! 👋` → `October 2026`).
- Short labels (`Search`, not `Search anything...`). No trailing periods on headlines, labels,
  buttons, captions.
- Changes state their comparison: `+12% vs last month`.
- No hype (supercharge, seamless, unlock, magic, revolutionize, game-changing, `AI-powered`
  everywhere).
- Unverifiable claims (`Loved by 10,000+ teams`, `10x faster`) → **ask**; keep quiet and
  specific if real, remove otherwise. List them in the report.
- Mock data looks real (plausible numbers and names, never `[X]` or `123,456`).
- `PRO` / `New ✨` / `Beta 🚀` badges go, or become quiet text if truly needed.

### 5. Type
- Pick family for the character (see tokens). Keep a real brand font; a default nobody chose
  may be swapped. One interface family + at most one partner (mono for figures, or a display
  face for big headlines). Load via `next/font` in Next.js.
- Weights 400 and 500, 600 rarely. No 700–900 headings. Hierarchy from size and color.
- Sentence case everywhere: `PAID THIS MONTH` → `Paid this month`.
- No negative tracking below 16px; tight tracking only for large display text.
- `tabular-nums` and one number format across the screen. No italic for emphasis.

### 6. Layout
- Keep sections and their order; proportions and alignment inside a section may change.
- Apps keep real app proportions: full-viewport shell, 240–280 sidebar, fluid content capped
  ~1440–1600. Never shrink an app into a narrow centered column.
- Landing hero: strongest is a full-bleed scene with the headline on its calm part and the
  product view rising from the bottom edge. Otherwise an asymmetric split (visual ≥ half
  width) or text over a large product view. Stacked-and-centered is the template default.
- Long headlines align left. One primary + at most one secondary action; nothing stacked under.
- Quiet nav: logo, existing links, one button; "Log in" is a text link.
- First screen composed as a whole, no dead band. On mobile stack in reading order, simplify
  dense previews instead of zooming them, no text under 11px, touch targets ≥ 40px.

### 7. Details
- Nested radius: inner = outer − padding, min 4. Controls 8–10, cards 12–16, panels 14–20.
  Not everything is a pill.
- Counts and meta become quiet (often mono, muted) text; shortcuts become keycaps.
- Charts: muted grid, muted mono labels, one accent on the thing that matters, the rest in
  neutral steps. One main chart clearly biggest; secondary data is a different kind (ranked
  list, short table). Pick chart type for the data (trend → line, comparison → bars, share →
  stacked bar/list, goal → progress).
- Stat cards are numbers: label, figure, change with comparison. No filler sparklines/icons.
- Vary sizes — equal cards with equal content read as a template.
- Active state = small surface step + hairline highlight. Hover and `focus-visible` states
  exist and stay in palette.
- Logo = product name in the main family + a simple flat mark. No gradient wordmark or
  sparkle tile.
- The signature detail appears where it belongs and nowhere else.

### 8. Visuals
- Decorative filler goes: blobs, orbs, nebulas, floating cubes, glowing grids, brains, robots.
- Dashboards and app screens almost never need generated images; their moments come from the
  product (a careful chart, beautifully set figures, real content). Physical things like a
  payment card are usually better built in code.
- A landing hero gets a visual that shows something true: a scene from the world, and/or a
  coded preview of what the page already promises, with plausible data and one moment inside.
- Image generation, prompt recipe and placement: [references/visuals.md](references/visuals.md).
  Always show the prompt and ask before generating (it may cost money).

### 9. Motion
- Remove purposeless loops (`animate-pulse`/`animate-ping` on non-live things, shimmer,
  breathing glows, floating, parallax), `transition-all`, bouncy springs, `hover:scale` on
  cards, and hover moves > a few px.
- Keep motion that explains: hover = color/surface change, press = tiny scale down, menus fade
  and rise a few px, changed numbers tween.
- Name transitioned properties (`transition-colors`, `transition-[transform,opacity]`). Never
  animate width/height/top/left/margin or large blurs.
- One easing curve, few durations (tokens). At most one entrance on load.
- Respect `prefers-reduced-motion` (`motion-safe:` / `motion-reduce:` in Tailwind).

## Stack notes (Next.js · Tailwind · shadcn/ui)

- **Fix at the source.** Change the CSS variables in `globals.css` (`:root` and `.dark`) or the
  Tailwind v4 `@theme` block / v3 `tailwind.config` first — `--background`, `--foreground`,
  `--card`, `--muted`, `--muted-foreground`, `--border`, `--primary`, `--ring`, `--radius`.
  One token change fixes dozens of components; per-class edits come after.
- Prefer semantic classes (`bg-background`, `text-muted-foreground`, `border-border`) over raw
  palette classes (`bg-purple-500`, `text-gray-400`) in components.
- Keep `cn()`/`cva` variants intact; edit variant values rather than adding overrides.
- Fonts via `next/font` (no layout shift); images via `next/image` with fixed size and
  `priority` for the hero.
- **Presentation-only diff.** Don't touch data fetching, state, handlers, routes or props
  contracts. If a fix seems to need that, put it in the report instead.
- RTL screens (Arabic, Hebrew, Persian, Urdu): set `dir`/`lang`, use logical utilities
  (`ms-*`, `me-*`, `start-*`, `text-start`), mirror directional icons only, zero letter
  spacing on Arabic, one digit system.

## Do not

- Rename the product or change what it is (features, content, section order) unless asked.
  Meaningless placeholder content may be replaced with meaningful content.
- Replace removed decoration with new decoration, or swap one trend for another (glass,
  grain, noise, neon, bento).
- Invent features, claims or data.
- Fall back to the same look for every product — the direction decides palette, type, visual.
- Redraw a real logo. Only a slop logo (emoji, sparkle in a gradient tile, glossy orb) is
  redrawn flat: the wordmark alone, or a simple one-color glyph.

## Checklist

- [ ] Direction written and every pass follows it
- [ ] Scanner re-run; remaining hits are intentional and marked `unslop-ignore`
- [ ] All spacing on the 4px scale; equal things have equal sizes; one alignment column each
- [ ] One tinted neutral ramp, three text roles, one accent; contrast ≥ 4.5:1 in both themes
- [ ] No hue gradients, gradient text, glows, colored shadows, blobs; no emoji in the UI
- [ ] One icon set, one size and stroke, text-role colors
- [ ] Type fits the character; weights 400–600; sentence case; no italic; no negative tracking
      on small text; tabular, consistently formatted numbers
- [ ] No exclamation marks, trailing periods on short strings, greetings, hype or unverified
      claims
- [ ] Nested radii add up; buttons share the control radius
- [ ] Table/list states read apart: header, hover, selected, `focus-visible`
- [ ] Hero has a real visual or product preview with one moment — never filler or a labeled
      placeholder; first screen has no dead band
- [ ] No looping or bouncy motion; one easing curve; no animated layout properties;
      reduced-motion respected
- [ ] Lint/typecheck/build pass; diff is presentation-only
- [ ] **Template check:** swap in another product's name — would the screen still fit? If yes,
      push the direction harder in copy, visual and signature detail
