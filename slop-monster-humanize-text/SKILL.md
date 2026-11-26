---
name: slop-monster-humanize-text
description: >
  Edits writing for its real reader and strips the usual AI-writing tells. Runs a regex checker
  (vocabulary, sentence shapes, punctuation cadence, three-item lists, invented proof), rewrites
  in context, gets a second pass from a different model family, then checks again. Works on
  READMEs, landing pages, HTML, emails and scripts. Use on /slop-monster-humanize-text, "humanize this", "de-slop
  this", "does this sound like AI", "fix this copy", "make this sound less like ChatGPT".
license: MIT
metadata:
  version: 1.0.0
  adapted-from: SlopMonster by Jack Roberts (https://github.com/ItsssssJack/SlopMonster), MIT
  category: writing
  tags: [copywriting, editing, ai-writing, readme, landing-page]
---

# Slop Monster: Humanize Text

Adapted from **SlopMonster** by Jack Roberts, MIT licensed (see `LICENSE`). Keep this credit
in any copy. Companion to the `unslop` skill: `unslop` fixes AI-looking **UI**, this skill fixes
AI-sounding **words**.

All paths below are relative to this skill's folder (the folder containing this file). Use
the absolute path when running from another project, e.g.
`python3 ~/.claude/skills/slop-monster-humanize-text/tools/deslop.py draft.md`.

Edit the draft for its audience and purpose. The checker finds known patterns; you still
review in context. A 5/5 score means no scored pattern matched. It does not mean the copy is
clear or accurate.

## Step 1: Context and checker

Work out the reader, the format and what the reader needs from the text, using the user's
brief and the draft. Ask one focused question only when missing context would change the edit.

A README explains what the project does, how to use it and its limits. A sales page may open
on a problem. An email may open with the request.

```bash
python3 tools/deslop.py draft.md
python3 tools/deslop.py page.html                 # visible text only, scripts/styles/tags stripped
python3 tools/deslop.py page.html --view view-site
python3 tools/deslop.py --text "paste a draft"
```

Five categories, one point each: vocabulary, sentence patterns, punctuation, three-item lists,
possible unsupported proof. Below 5/5 exits 1. Empty input fails. Pass Markdown as a file path
so code and quoted specimens are skipped. English only.

## Step 2: Review and rewrite

Read [references/principles.md](references/principles.md) (editorial checks) and
[references/signs-of-ai-writing.md](references/signs-of-ai-writing.md) (pattern catalogue).
A worked before/after is in [examples/ridgeline-roofing.md](examples/ridgeline-roofing.md).

Go in this order:

1. **Purpose and structure.** Answer the reader's first question early. Cut duplicate hooks
   and curiosity gaps. One useful point per paragraph.
2. **Meaning and evidence.** Every sentence adds information and follows from the last. Keep
   conditions on claims. Cut empty contrasts, repeated metaphors, pointless comparisons.
   Preserve facts, technical behavior and the author's position.
3. **Wording and rhythm.** Replace vague words flagged by the checker with direct ones. Read
   adjacent sentences for repeated shapes. Sentence length follows the thought. Keep useful
   lists and punctuation.

Do not fake personality: no invented opinions, planted mistakes, forced fragments or quota of
short sentences. Do not bolt a number onto every claim.

The checker can flag valid language; read the match before editing. Never wrap ordinary prose
in code formatting to raise the score. If a necessary phrase still triggers, tell the user why.

## Step 3: Second pass from a different model family

A model is bad at hearing its own accent. Have the other family edit, then inspect its changes.

| Draft written with | Command |
|---|---|
| Claude | `DESLOP_WRITER=claude tools/cleanse.sh draft.md > cleansed.md 2> notes.txt` (uses `codex`) |
| GPT / Codex | `DESLOP_WRITER=gpt tools/cleanse.sh draft.md > cleansed.md 2> notes.txt` (uses `claude`) |

The script sends [prompts/cleanse.txt](prompts/cleanse.txt) plus the draft to the rival CLI
(must be installed and logged in). Stdout is the edited copy, stderr the change notes.

Exit codes: `124` timeout (raise with `TIMEOUT=240`), `127` no rival CLI — stdout is then the
prompt + draft, **not** an edit; paste it into the other family's chat or report the pass as
skipped. `66` unreadable or empty draft. A warning about a missing `<<<SLOPMONSTER-NOTES>>>`
marker means notes may have leaked into the copy; check the tail.

## Step 4: Compare and check again

Diff against the source: facts and commands unchanged, links and placeholders intact, opening
reads right. Check the notes for deletions of needed information.

```bash
python3 tools/deslop.py cleansed.md
```

Resolve findings without changing meaning; report justified exceptions. The final read-through
is required even at 5/5.

Changed a regex? Run `python3 tools/test_deslop.py`. Changed the cleanse script? Run
`bash tools/test_cleanse.sh`.

## Factual claims

Never invent evidence: customer counts, testimonials, ratings, results, dates, specs. Mark
gaps for the author, e.g. `[needs number]`, and never ship an unresolved placeholder as fact.

The proof rule only sees number-near-noun patterns; it cannot tell true from false. Use
`--allow-proof` only after checking the evidence (keeps the warning, drops the penalty).

## Output

Return the rewritten copy, or save the artifact as asked. Then up to five short notes: the
substantive changes, the checker result, and whether the second-model pass ran. Keep
unresolved claims and remaining findings visible. Never claim the edit proves human authorship.
