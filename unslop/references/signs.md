# Signs of slop

Each line pairs a sign with its fix. Signs marked **(scan)** are also caught by
`scripts/scan.mjs`; the rest need eyes on the rendered screen.

## Surfaces and color

- Purple→blue / violet→pink gradients on backgrounds, cards, buttons, active nav **(scan)** → one neutral surface, accent only where it means something
- Gradient text in headings, numbers or logo (`bg-clip-text text-transparent`) **(scan)** → solid primary text
- Colored glows (`shadow-[0_0_20px_rgba(139,92,246,.5)]`, `drop-shadow` on emoji, `shadow-purple-500/50`) **(scan)** → remove; depth from surface steps and hairlines
- Radial washes or blurred blobs behind content (`blur-3xl` circles) **(scan)** → remove
- Neon or high-contrast colored borders → hairline at 6–10% opacity
- Five near-identical lavenders for text → three text roles from one ramp
- Everything highlighted so nothing stands out → one accent, once or twice per screen
- Glass cards with inner white highlight + colored shadow (`backdrop-blur`) **(scan)** → plain raised surface + hairline
- Raw palette classes everywhere (`bg-purple-600`, `text-gray-400`) instead of tokens → semantic tokens

## Type

- Headings at 700–900 (`font-bold`, `font-extrabold`, `font-black`) **(scan)** → 400–500, size for hierarchy
- `UPPERCASE` labels with wide tracking **(scan)** → sentence case, normal tracking
- Too many sizes and weights → a few scale sizes, 400 and 500
- Mixed number formats (`$48,210` next to `$124,860.40`) → one format, `tabular-nums`
- Negative tracking on small text **(scan)** → zero or slightly positive
- Italic for emphasis **(scan)** → color or size instead

## Icons

- Emoji as nav icons, label decoration or status (🏠 🚀 💰 🔥 📈) **(scan)** → one line icon set or nothing
- Emoji in pills and counts (`18 👤`) **(scan)** → plain number
- Icons in many sizes and colors → one size, one stroke, text-role color
- Icons off the column → same icon box width in every row
- ✨ / `Sparkles` for anything AI **(scan)** → remove, or a plain icon only where it explains

## Spacing

- Arbitrary off-grid values (`mt-[13px]`, `h-[31px]`, `padding: 11px`) **(scan)** → 4px scale
- Rows in one list with different heights or gaps → one height, one gap
- Groups closer to neighbours than to their own items → smaller gaps inside, larger between
- Uneven padding in sibling cards → one padding
- Big empty gap above a section, cramped below → balanced rhythm

## Copy

- Greeting headlines (`Welcome back, Sam! 👋`) **(scan)** → page or period as the title
- Exclamation marks, `!!` **(scan)** → plain statement
- Changes without reference (`+12%!!`) → `+12% vs last month`
- Wordy placeholders (`Search anything...`) **(scan)** → `Search`
- Hype words (supercharge, seamless, unlock, magic, revolutionize, effortless, next-gen) **(scan)** → what it actually does
- Trailing periods on labels and buttons → none
- Fake data (`$123,456`, `[X]`, lorem ipsum) **(scan)** → plausible numbers and names
- `Trusted by 10,000+ teams`, `10x faster`, avatar rows, five stars without a source **(scan)** → ask; quiet and specific if real, else remove

## Components

- Glowing pills for counts, plans, shortcuts, status → quiet mono text or a keycap
- `PRO`, `New ✨`, `Beta 🚀` badges everywhere → remove, or one quiet text badge
- Everything a full pill (`rounded-full` on search, cards, buttons) → radius by size, nested math
- Charts with rainbow/glowing/pill bars or uppercase day labels → 1–2 series, muted grid, mono labels, one highlight
- Every chart in shades of the accent → neutral steps, accent on the one thing that matters
- Sparklines/mini bars stuffed into every stat card → number, label, change
- Equal cards side by side with the same layout → one main chart, compact stats, varied widths
- Gradient-tile logo with sparkle, gradient wordmark, glossy orb mark → wordmark + flat one-color glyph

## Landing pages

- Pill badge above the headline (`✨ Introducing X 2.0`) → remove, or quiet text link if real news
- Headline that fits any product (`Supercharge your workflow with AI`) → what it does, for whom
- Shimmer on the headline → solid text
- Blobs, orbs, grids, glowing lines behind the hero → plain background or one real visual
- Everything stacked and centered → asymmetric split or text over a large product view
- 3+ buttons, or chips/avatars stacked under them → one primary, at most one secondary
- Feature cards with emoji + bold title + vague line → fewer features, concrete copy, line icons or none

## Visuals

- Glossy 3D blobs, liquid chrome, purple nebula as hero → the product, or one concrete metaphor
- Robots, glowing brains, circuits, holograms for AI → show what the AI produces
- Text, fake buttons or logos baked into images → real text on the page
- Image with a hard edge on a differently colored page → match background, soft mask
- A visual on every section → one, usually the hero

## Motion

- `animate-pulse` / `animate-ping` / breathing glow on non-live things **(scan)** → static
- `transition-all`, `hover:scale` on cards/buttons **(scan)** → color/surface step on hover, tiny scale down on press
- Bouncy springs, overshoot → one ease-out curve
- Everything flying in from different sides → one short fade-and-rise, small stagger
- Parallax, floating loops, scroll-driven movement → static
- Animating width/height/top/left **(scan)** → transform and opacity

## Template look (what a cleaned screen falls back to)

Not slop, but a sign nobody made a decision. Check after the passes.

- Pure grey page, Inter, white text, old brand color on one button — on a product whose world is warm or bright → ramp tinted toward the world, accent from it
- Headline that fits another product if you swap the name → use this product's own nouns
- Hero visual that is an empty box or generic picture → coded preview or image from the world
- Same layout, type and palette as the last product you unslopped → let the direction choose

---

Adapted from unslop by Damir Sokolovsky ([@heydamir](https://x.com/heydamir)), CC BY 4.0.
