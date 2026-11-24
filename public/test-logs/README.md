# Test log: how to publish a real run

The methodology pages publish **row-level records**, not just a headline pass rate. A single percentage cannot be checked; a CSV with detector versions, raw and rewritten verdicts, the prompt version and a hash of the input can be.

## Workflow

1. **Run the protocol** documented on `/bypass-test-methodology`: 150+ samples across five categories, 1,500–3,000 characters each, generated with a fixed model and prompt. Record the generation prompt and date.
2. **Baseline check**: score the raw AI text with each detector. Samples the detector does not flag as AI are discarded — never counted as wins.
3. **Rewrite** each remaining sample with a known prompt version of this tool.
4. **Score again** on the same detector. Record verdicts exactly as the interface shows them. `mixed` / `uncertain` = failure. Do not regrade borderline cases until they pass.
5. **Fill in `template.csv`** — one row per sample × detector. Save screenshots or raw exports and put their URLs in `evidence_url`.
6. **Convert CSV → JSON** into `/src/data/test-runs.json` (shape below), set `last_updated`, then commit. Both methodology pages pick up the new run automatically; the CSV download is generated from the same records.

## Column meanings

| Column | Meaning |
| --- | --- |
| `run_id` | Stable ID for the run, e.g. `RUN-2026-11`. |
| `date_utc` | Test date, `YYYY-MM-DD`. |
| `detector` | Detector name, e.g. `GPTZero`. Use `not tested` for detectors you did not run — never invent numbers. |
| `detector_version` | Version shown by the product, or `web-interface-YYYY-MM-DD` if none is exposed. |
| `sample_id` | Stable sample identifier, e.g. `essay-001`. |
| `category` | One of the five protocol categories. |
| `raw_verdict` | Verdict on the original AI text (`AI` / `human` / `uncertain`). |
| `rewritten_verdict` | Verdict on the rewrite, copied verbatim from the interface. |
| `pass` | `1` only if raw was flagged AI, rewrite was judged human / below threshold, and `regraded=0`; otherwise `0`. |
| `prompt_version` | Version of this site's rewrite prompt (e.g. `v1.1`). |
| `model` | Model used, e.g. `deepseek-chat`. |
| `temperature` | Sampling temperature used for the rewrite. |
| `regraded` | `1` if the sample was re-scored after a borderline result — such rows are excluded from summaries. |
| `input_hash` | Hex digest (8+ chars) of the input text, so a reader can match records to published samples. |
| `evidence_url` | Optional link to a screenshot or raw detector export. |

## JSON shape

```json
{
  "last_updated": "2026-11-30",
  "note": "Run protocol v1.1; samples and generation prompts in /test-logs/samples-2026-11.zip.",
  "runs": [
    {
      "run_id": "RUN-2026-11",
      "date_utc": "2026-11-30",
      "detector": "GPTZero",
      "detector_version": "web-interface-2026-11",
      "sample_id": "essay-001",
      "category": "academic_essay",
      "raw_verdict": "AI",
      "rewritten_verdict": "human",
      "pass": 1,
      "prompt_version": "v1.1",
      "model": "deepseek-chat",
      "temperature": 1.3,
      "regraded": 0,
      "input_hash": "a1b2c3d4e5f6",
      "evidence_url": "https://gpt-undetectable.com/test-logs/evidence/run-2026-11/gptzero-essay-001.png"
    }
  ]
}
```

## Validation

`src/lib/test-logs.ts` recomputes `pass` from the verdicts on every render. Rows with an inconsistent `pass` value, a missing identifier, a bad date or an invalid hash are excluded in production and reported in the console during development. The pass rate in the table is always `passes ÷ rows`, never a hand-entered number.

## Rules

- Publish runs where the number goes **down**, too. Selective publication invalidates the protocol.
- If you could not test a detector (e.g. Turnitin has no public API), write `not tested`. Do not carry over numbers from a different product or an old version.
- The log supports a narrow claim: "on these samples, on this date, with these detector versions". It is not a guarantee for any individual text. Keep the qualifiers on `/limitations` and `/citation-policy` intact.
