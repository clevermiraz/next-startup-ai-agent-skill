#!/usr/bin/env node
// unslop scanner — flags code-level signs of AI-generated UI slop.
// Usage: node scan.mjs [paths...] [--json] [--min=low|med|high]
// Skip a line by adding the comment `unslop-ignore` on it.
// No dependencies; Node 18+.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";

const EXTS = new Set([".tsx", ".jsx", ".ts", ".js", ".mjs", ".html", ".css", ".scss", ".vue", ".svelte", ".astro", ".mdx"]);
const SKIP_DIRS = new Set(["node_modules", ".next", ".git", "dist", "build", "out", "coverage", ".turbo", ".vercel", "public"]);
const WEIGHT = { high: 3, med: 2, low: 1 };

// Off-grid px check: allow multiples of 4, plus 0/1/2 (hairlines, nudges).
const offGrid = (n) => n > 2 && n % 4 !== 0;

const RULES = [
  // Surfaces and color
  { id: "purple-gradient", group: "color", sev: "high", re: /\b(?:from|via|to)-(?:purple|violet|indigo|fuchsia|pink)-\d{2,3}\b/, fix: "Hue gradient in the AI palette → one neutral surface, accent only where it means something" },
  { id: "gradient", group: "color", sev: "med", re: /\bbg-(?:gradient-to|linear-to|radial|conic)-?\w*|\b(?:linear|radial|conic)-gradient\(/, fix: "Gradient → check it's only a tiny tone shift within one neutral; remove hue-to-hue" },
  { id: "gradient-text", group: "color", sev: "high", re: /\bbg-clip-text\b|background-clip:\s*text/, fix: "Gradient text → solid primary text color" },
  { id: "glow", group: "color", sev: "high", re: /shadow-\[0_0_|drop-shadow-\[|\bshadow-(?:purple|violet|indigo|fuchsia|pink|blue|cyan|sky|emerald)-\d{2,3}|box-shadow:[^;]*\b0(?:px)?\s+0(?:px)?\s+\d{2,}px[^;]*(?:rgba?|hsla?)\(/, fix: "Colored glow → remove; depth from surface steps and hairlines" },
  { id: "blur-blob", group: "visuals", sev: "med", re: /\bblur-(?:2xl|3xl)\b|\bblur-\[\d{2,}px\]|filter:\s*blur\(\d{2,}px/, fix: "Blurred blob/wash behind content → remove" },
  { id: "glass", group: "color", sev: "low", re: /\bbackdrop-blur(?:-\w+)?\b|backdrop-filter:/, fix: "Glass effect → plain raised surface + hairline (fine on a sticky header over content)" },
  { id: "raw-palette", group: "color", sev: "low", re: /\b(?:bg|text|border)-(?:purple|violet|indigo|fuchsia|pink)-\d{2,3}\b/, fix: "Raw AI-palette color class → semantic token (bg-primary, text-muted-foreground…)" },

  // Type
  { id: "heavy-weight", group: "type", sev: "med", re: /\bfont-(?:extrabold|black)\b|font-weight:\s*(?:800|900)\b/, fix: "800–900 weight → 400–500, hierarchy from size and color" },
  { id: "bold-weight", group: "type", sev: "low", re: /\bfont-bold\b|font-weight:\s*(?:700|bold)\b/, fix: "700 weight → 500 (600 only for rare emphasis)" },
  { id: "tracked-caps", group: "type", sev: "med", re: /\buppercase\b[^"'`]*\btracking-(?:wide|wider|widest|\[)|\btracking-(?:wide|wider|widest|\[)[^"'`]*\buppercase\b|text-transform:\s*uppercase/, fix: "UPPERCASE tracked label → sentence case, normal tracking" },
  { id: "tight-small", group: "type", sev: "med", re: /\btext-(?:xs|sm|base)\b[^"'`]*\btracking-(?:tight|tighter)\b|\btracking-(?:tight|tighter)\b[^"'`]*\btext-(?:xs|sm|base)\b/, fix: "Negative tracking on small text → 0 or slightly positive" },
  { id: "italic", group: "type", sev: "low", re: /(?<![\w-])italic(?![\w-])|font-style:\s*italic/, fix: "Italic for emphasis → color or size" },

  // Icons
  { id: "emoji", group: "icons", sev: "high", re: /(?![©®™‼↔-↙])\p{Extended_Pictographic}/u, fix: "Emoji in the UI → line icon from one set, or nothing" },
  { id: "sparkles", group: "icons", sev: "med", re: /\bSparkles?\b|\bWandSparkles\b|\bStars?Icon\b/, fix: "Sparkle icon for AI → remove, or a plain icon where it explains" },

  // Spacing (custom test for off-grid values)
  {
    id: "off-grid", group: "spacing", sev: "med",
    test(line) {
      const hits = [];
      for (const m of line.matchAll(/(?<![\w-])-?(?:m|p|gap|space|inset|top|left|right|bottom|h|w|min-h|min-w|size)(?:-[xytrblse])?-\[(\d+(?:\.\d+)?)px\]/g)) if (offGrid(+m[1])) hits.push(m[0]);
      for (const m of line.matchAll(/\b(?:margin|padding|gap|row-gap|column-gap)(?:-(?:top|right|bottom|left|inline|block)(?:-start|-end)?)?\s*:\s*([^;}"']+)/g))
        for (const v of m[1].matchAll(/(\d+(?:\.\d+)?)px/g)) if (offGrid(+v[1])) hits.push(`${v[0]}`);
      return hits.length ? hits.join(", ") : null;
    },
    fix: "Off-grid value → step on the 4px scale",
  },

  // Copy
  { id: "greeting", group: "copy", sev: "high", re: /\b(?:welcome back|hey there|hi there|good (?:morning|afternoon|evening))\b/i, fix: "Greeting headline → page or period as the title" },
  { id: "exclamation", group: "copy", sev: "med", re: />[^<>{}=]*[A-Za-z]!+\s*<|["'`][A-Z][\w ,.'’-]*!+["'`]/, fix: "Exclamation in UI text → plain statement" },
  { id: "hype", group: "copy", sev: "med", re: /\b(?:supercharge[sd]?|seamless(?:ly)?|unlock(?:s|ing)?|magic(?:al)?|revolutioni[sz](?:e|es|ing)|game[- ]?chang(?:er|ing)|next[- ]gen(?:eration)?|cutting[- ]edge|effortless(?:ly)?|unleash(?:es)?|10x|AI[- ]powered|blazing(?:ly)?[- ]fast|lightning[- ]fast|world[- ]class|best[- ]in[- ]class)\b/i, fix: "Hype word → what the thing actually does" },
  { id: "claim", group: "copy", sev: "med", re: /\b(?:trusted|loved|used|chosen) by\s+(?:over\s+)?[\d,.]+\s*[kKmM]?\+?|\b[\d,.]+[kKmM]?\+\s*(?:teams|users|customers|companies|developers|businesses)\b/i, fix: "Unverifiable claim → ask the user; quiet and specific if real, else remove" },
  { id: "wordy-placeholder", group: "copy", sev: "low", re: /placeholder\s*=\s*\{?["'`][^"'`]*(?:\.\.\.|…)["'`]/, fix: "Wordy placeholder → short label (\"Search\")" },
  { id: "fake-data", group: "copy", sev: "med", re: /\[X\]|\b123,?456\b|\blorem ipsum\b|\bJohn Doe\b|\bAcme(?: Inc| Corp)?\b/i, fix: "Placeholder data → plausible numbers and names" },
  { id: "badge", group: "copy", sev: "low", re: /["'>]\s*(?:New|NEW|PRO|Beta|BETA|HOT|Hot)\s*["'<]/, fix: "Badge → remove, or one quiet text badge if truly needed" },

  // Motion
  { id: "loop-anim", group: "motion", sev: "med", re: /\banimate-(?:pulse|ping|bounce)\b|@keyframes\s+(?:float|glow|shimmer|breath\w*|pulse\w*)/, fix: "Looping animation on non-live element → static (keep only for real live status/loading)" },
  { id: "transition-all", group: "motion", sev: "med", re: /\btransition-all\b|transition:\s*all\b/, fix: "transition-all → name properties (transition-colors, transition-[transform,opacity])" },
  { id: "hover-scale", group: "motion", sev: "med", re: /\bhover:(?:scale-(?:1[0-9]{2})|-?translate-y-(?:[2-9]|1[0-9]|\[))/, fix: "Hover scale/lift → color or surface step on hover, tiny scale down on press" },
  { id: "layout-anim", group: "motion", sev: "low", re: /\btransition-\[(?:[^\]]*\b(?:width|height|top|left|margin|padding))|transition(?:-property)?:[^;]*\b(?:width|height|top|left|margin)\b/, fix: "Animated layout property → transform and opacity" },
];

const args = process.argv.slice(2);
const asJson = args.includes("--json");
const minArg = (args.find((a) => a.startsWith("--min=")) || "--min=low").slice(6);
const minW = WEIGHT[minArg] ?? 1;
const roots = args.filter((a) => !a.startsWith("--"));
if (!roots.length) roots.push(".");

function* walk(p) {
  let st;
  try { st = statSync(p); } catch { return; }
  if (st.isDirectory()) {
    for (const name of readdirSync(p)) {
      if (SKIP_DIRS.has(name) || name.startsWith(".")) continue;
      yield* walk(join(p, name));
    }
  } else if (EXTS.has(extname(p)) && !/\.(?:test|spec|stories|d)\.\w+$/.test(p) && st.size < 1_000_000) {
    yield p;
  }
}

const displayPath = (f) => { const r = relative(process.cwd(), f); return r.startsWith("..") ? f : r; };
const findings = [];
let filesScanned = 0;
for (const root of roots) {
  for (const file of walk(root)) {
    filesScanned++;
    const lines = readFileSync(file, "utf8").split(/\r?\n/);
    lines.forEach((line, i) => {
      if (line.includes("unslop-ignore")) return;
      const trimmed = line.trim();
      if (/^(?:import|export \* from)\b/.test(trimmed) && !/Sparkles/.test(trimmed)) return;
      for (const r of RULES) {
        if (WEIGHT[r.sev] < minW) continue;
        let match = null;
        if (r.test) match = r.test(line);
        else { const m = line.match(r.re); if (m) match = m[0]; }
        if (match) findings.push({ file: displayPath(file), line: i + 1, rule: r.id, group: r.group, sev: r.sev, match: String(match).trim().slice(0, 80), fix: r.fix });
      }
    });
  }
}

const score = findings.reduce((s, f) => s + WEIGHT[f.sev], 0);
const byGroup = {};
for (const f of findings) byGroup[f.group] = (byGroup[f.group] || 0) + 1;

if (asJson) {
  console.log(JSON.stringify({ filesScanned, score, byGroup, findings }, null, 2));
} else {
  const tty = process.stdout.isTTY;
  const c = (code, s) => (tty ? `\x1b[${code}m${s}\x1b[0m` : s);
  const sevColor = { high: "31", med: "33", low: "36" };
  let current = "";
  for (const f of findings.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line)) {
    if (f.file !== current) { current = f.file; console.log("\n" + c("1", f.file)); }
    console.log(`  ${String(f.line).padStart(4)}  ${c(sevColor[f.sev], f.sev.padEnd(4))} ${f.rule.padEnd(17)} ${c("2", f.match)}`);
  }
  const seen = new Set();
  const fixes = findings.filter((f) => !seen.has(f.rule) && seen.add(f.rule));
  if (fixes.length) {
    console.log("\n" + c("1", "Fixes"));
    for (const f of fixes) console.log(`  ${f.rule.padEnd(17)} ${f.fix}`);
  }
  console.log(`\n${c("1", "Slop score")}: ${score}  (${findings.length} findings in ${filesScanned} files)`);
  console.log("  " + (Object.entries(byGroup).map(([g, n]) => `${g} ${n}`).join(" · ") || "clean"));
  console.log(c("2", "  Scanner covers code-level signs only; also audit the rendered screen against references/signs.md"));
}
