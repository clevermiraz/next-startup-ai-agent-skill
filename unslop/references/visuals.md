# Visuals

Replace decorative filler with a visual that belongs to this product.

## Decide

1. **Does the screen need one?** Dashboards, settings and most app screens don't. Landing
   heroes and empty states usually do.
2. **Image tool available?** (an MCP server for fal, Replicate, OpenAI images, etc.) For a
   landing hero, generate a wide scene from the world as the hero background — subject on one
   side, calm space for the headline — and let the product view rise from the bottom edge.
3. **Show the product.** Under the scene, or instead of it, build a coded preview of the one
   moment that proves the headline (scheduling → one week with a booked slot; code review →
   one diff with a comment). Use the project's components, plausible data, real-looking names.
4. **Say the scene in one sentence** before generating. If you can't, it isn't clear yet.
   Shape of a good one: "a small lighthouse on a dark rocky coast, beam reaching into fog"
   (for a backup tool). Derive yours — don't reuse examples.

Avoid AI defaults unless the product is literally about them: blobs, orbs, nebulas, chrome
liquid, floating cubes, neon circuits, holograms, brains, robots, rockets, crystals.

## Styles that work (pick one for the whole page)

- **Painted background art** — calm sky/landscape, one subject, open sky for text. Warm, hopeful products.
- **Cinematic photo of one object** — one real thing in dramatic light on a plain field. Calm, trustworthy products.
- **Soft stylized 3D** — one small scene, matte materials, gentle light. Playful, friendly products.
- **Product object render** — a real-looking card, phone, package, studio lit. Anything physical.
- **Light and optics** — one phenomenon on a dark field (prism split). Technical/data products.
- **Engraving or print** — one ink on a tinted page, only if the whole brand lives in that world.

Tends to fail: asking for film/paper grain (models bake in checker noise — add texture in
code), a print style on one image of an otherwise plain modern UI, busy collages, glossy
purple-blue abstractions.

## Objects for moments

- One object, studio lit, on a plain background in the exact page color, soft contact shadow.
- Ask for the exact angle the layout needs ("tilted 20°, seen slightly from above").
- Cut it out or mask it into the page color; overlap a card edge slightly, soft shadow.
- Everything in one visual tells the same story (same client, invoice number, amount).
- To show real UI on a device: generate it straight on, overlay HTML on the screen rectangle,
  transform both together.

## Generate it

- Show the user the prompt, model and size, and **ask before running** (it may cost money).
- Run once, judge against the sentence and palette, change the prompt rather than rerolling.
- Save into the project (`public/images/…`), never a temporary URL.
- No tool? Say so before the Visuals pass and offer to connect one. If skipped, leave an
  empty slot — a plain surface step of the exact size and radius, **no text inside** — and put
  the prompt and target filename in the report.

## Prompt recipe (in order)

1. **Subject** — the one sentence, concrete and physical.
2. **Setting** — simple.
3. **Light and palette** — name the page background hex so edges blend; light direction.
4. **Style** — one, matching the character.
5. **Composition** — where the subject sits ("subject right half, calm empty left"). For a
   full hero scene: 16:9 or wider, lower fifth calm for the product view.
6. **Exclusions** — no text, letters, logos, UI, watermark.
7. **Format** — slot aspect ratio at 2× display size.

## Put it on the page

- WebP/AVIF at 2× display size via `next/image` with fixed `width`/`height` (or `fill` +
  sized parent) and `priority` for the hero. Real `alt` describing what's shown.
- Match edges to the background or fade them:
  `mask-image: radial-gradient(closest-side, #000 70%, transparent)`.
- Static, or one slow subtle motion that fits the subject, inside `motion-safe:`. No parallax.

---

Adapted from unslop by Damir Sokolovsky ([@heydamir](https://x.com/heydamir)), CC BY 4.0.
