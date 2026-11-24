# Site repositioning spec — writing improvement tool (v2.0, 2026-11-24)

This is the single source of truth for the site-wide repositioning. URLs stay unchanged; the brand displayed everywhere is **AI Humanizer**; the domain `gpt-undetectable.com` remains (do not display it as a product name).

## Core positioning

The site helps people **improve rough AI-assisted drafts**: make the prose clearer, more natural, better suited to the writer's own voice and audience. It does **not** promise to defeat, bypass, or evade AI detectors, and no detector score is presented as a validation of the tool.

Standard one-line description (en):
`Free online writing tool that makes rough AI-assisted drafts clearer, more natural, and easier to make your own. English and Simplified Chinese. No signup.`

Standard one-line description (zh):
`免费在线写作改进工具：把生硬的 AI 辅助草稿改得更自然、清晰、更贴合你自己的表达。支持中英双语，无需注册。`

## Claims rules (mandatory)

1. **No bypass framing.** Delete/replace: "bypass", "beat", "evade", "undetectable", "pass AI detection", "绕过", "过检", "不被检测", "骗过检测器", "降低 AI 率至 XX%". A URL may still contain `/turnitin-bypass` etc. — keep the path, change the visible content. Never present the old 85–95% or the 13.3% self-check as a product performance claim.
2. **Detector testing is evidence of limits, not of success.** If a page discusses detectors (GPTZero, Turnitin, ZeroGPT, etc.), the point is: detector verdicts are unreliable and contested; the tool is not a way to manipulate them. Published data: 2026-11-24 self-check 4/30 (13.3%) by this site's own detector; third-party spot-checks returned 100% AI on rewrites and are explicitly incomplete. Any mention must be labeled as a limitation/evidence, not a selling point.
3. **No guaranteed output properties.** The rewrite is an LLM output with no post-processing verification. Say "the prompt asks the model to preserve citations, numbers and proper nouns; check them yourself". Never "preserved exactly / verbatim / guaranteed".
4. **Same facts as before, still valid:** 100% free, 5 submissions per IP per rolling 24h, 3,000 characters per submission, en + zh-CN only, cloud-processed via DeepSeek Chat (`deepseek-chat`), no persistent storage but a 10-minute in-memory cache of up to 500 entries, IP-header rate-limit counters, no analytics cookies/tracking pixels, founder czhcl123, contact@gpt-undetectable.com, GitHub `github.com/czhcl123/humanizer-site`. Published at `/privacy`, `/limitations`, `/citation-policy`, `/changelog`, `/glossary`, `/bypass-test-methodology`.
5. **No fabricated sources.** No Stanford 61%/97%, no Newsweek article, no competitor prices, no "OpenAI's GPTZero", no unverified accuracy figures. External links only to official sites (GPTZero docs, ZeroGPT, Turnitin product page, DetectGPT paper, DeepSeek platform).

## Per-page guidance

- **Home** — Lead with writing improvement. Show the tool, then "Why writing quality, not detector scores". Link to /limitations and /glossary.
- **About** — Mission: help people write clearly, not game detectors. Add a short "What changed on 2026-11-24" paragraph: after running published tests we found detector scores unreliable and repositioned the product around writing quality. Keep author/contact info.
- **Old bypass URLs** (`/bypass-ai`, `/turnitin-bypass`, `/gptzero-bypass`, `/originality-ai-bypass`, `/quillbot-bypass`, `/essay-writer-bypass-turnitin`, `/walterwrites-vs-undetectable`, `/cost-comparison`) — Keep the URL for existing links/indexing, but retitle and rewrite the body as an explainer: "why detectors are unreliable and how to write in your own voice". Titles must not promise bypass. Meta descriptions must not contain "bypass" as a promise. Example new title: "Why AI Detectors Are Unreliable — Writing Guidance" / "AI 检测器为什么不可靠 — 写作建议". `/cost-comparison` becomes a plain free-tool comparison with no bypass claims.
- **Essay/Chinese/Walter/humanize-ai-text pages** — Writing-quality framing: clarity, tone, coherence, citation preservation *requests* with manual verification. Remove detector-targeting language from prompts visible in UI copy; the backend prompts may stay until a later pass, but visible text must match the new positioning.
- **AI detector page** — Reframe as "AI text self-review (heuristic, not a verdict)". Explicitly state it is not connected to GPTZero/Turnitin and cannot validate authorship. Published self-check data lives on /bypass-test-methodology.
- **Glossary** — Keep definitions; add a note that these concepts explain why detectors are unreliable, not how to evade them.
- **Limitations** — Add a prominent item: detector scores are unreliable; third-party spot-checks of rewrites returned 100% AI; no bypass claim is made.
- **Citation policy** — Keep: cite the tool as a writing aid; never cite it as evidence of detector approval; 85–95% withdrawn; 13.3% self-check not a product claim.
- **Changelog** — Add v2.0 entry (2026-11-24): repositioning to writing improvement after published tests showed detector scores unreliable; old URLs retained with revised content.
- **Methodology page** — Keep data and caveats intact; add one line: "These tests are published to explain why we do not make detector claims."

## Technical files

- `src/lib/metadata.ts` default title/description/keywords: writing improvement only.
- `SiteJsonLd.tsx`: description/featureList/knowsAbout -> writing tools, clarity, tone; remove "bypass/detection bypass" from knowsAbout and featureList; keep free offer.
- `public/llms.txt`, `llms-full.txt`, `.well-known/ai.txt`, `ai/*.json`: rewrite descriptions, tool summaries, FAQ answers and service capabilities to the new framing. Keep URLs, counts and contact data accurate. Keep the test data fields/caveats.
- `robots.txt`: only remove the word "bypass" if present in comments; do not change directives.
- API route `GET` response `service`/`modes`: visible strings may keep technical mode names (`generic`, `essay`, ...), but any marketing wording follows the spec.

## What NOT to change

- URLs, sitemap structure, `PAGES` slugs, hreflang, pricing facts, privacy facts, test data (`src/data/test-runs.json`), test log component, `public/test-logs/**`, `WRITING-IMPROVEMENT-SPEC.md` itself.
