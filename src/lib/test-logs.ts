/**
 * Test log data model and aggregation logic.
 *
 * The site publishes the *raw* per-sample records, not just a headline pass
 * rate. A single summary number cannot be checked; a row-level CSV with the
 * detector version, verdicts and regrade flag can. This module reads the
 * checked-in JSON dataset and derives every number shown on the methodology
 * pages, so the prose, the table and the downloadable CSV can never disagree.
 */

export const LOG_FIELDS = [
  'run_id',
  'date_utc',
  'detector',
  'detector_version',
  'sample_id',
  'category',
  'raw_verdict',
  'rewritten_verdict',
  'pass',
  'prompt_version',
  'model',
  'temperature',
  'regraded',
  'input_hash',
] as const

export type LogField = (typeof LOG_FIELDS)[number]

/** A single detector scoring of a single sample in a single run. */
export interface TestRecord {
  run_id: string
  date_utc: string
  detector: string
  detector_version: string
  sample_id: string
  category: string
  raw_verdict: string
  rewritten_verdict: string
  pass: 0 | 1
  prompt_version: string
  model: string
  temperature: number
  regraded: 0 | 1
  input_hash: string
  /** Optional: URL to a screenshot or detector export for this scoring. */
  evidence_url?: string
}

/** A third-party spot-check that is too sparse to count as a measured pass rate. */
export interface ThirdPartyObservation {
  detector: string
  detector_version: string
  sample_id: string
  text_stage: 'raw' | 'rewritten'
  verdict: string
  ai_probability: number
  evidence: string
}

export interface ThirdPartyObservations {
  status: 'incomplete' | 'complete'
  last_updated: string
  note: string
  observations: ThirdPartyObservation[]
}

/** A collection of runs. Keeping an array makes future monthly runs additive. */
export interface TestLogData {
  last_updated: string | null
  note: string
  runs: TestRecord[]
  third_party_observations?: ThirdPartyObservations
}

/** Numbers derived from the raw records for display in the results table. */
export interface RunSummary {
  runId: string
  dateUtc: string
  detectors: string[]
  detectorVersions: string[]
  samples: number
  passes: number
  passRate: number
  categories: number
  regraded: number
}

const PASS_VERDICTS = [
  'human',
  'likely human',
  'not ai',
  'not ai-generated',
  'human-written',
  'below threshold',
]

/**
 * Independently recompute `pass` from the recorded verdicts. If a checked-in
 * row disagrees with the protocol, the row is excluded and the data is marked
 * inconsistent — a wrong number in the log is worse than no log.
 */
export function isPass(record: TestRecord): boolean {
  const v = record.rewritten_verdict.trim().toLowerCase()
  const raw = record.raw_verdict.trim().toLowerCase()
  const rawFlagged = !PASS_VERDICTS.some((p) => raw.includes(p))
  return record.regraded === 0 && rawFlagged && PASS_VERDICTS.some((p) => v.includes(p))
}

export function validateRecords(records: TestRecord[]): string[] {
  const errors: string[] = []
  records.forEach((r, i) => {
    const label = `${r.run_id || '?'} / ${r.sample_id || '?'} / ${r.detector || '?'} (row ${i + 1})`
    if (!r.run_id || !r.date_utc || !r.detector || !r.sample_id) {
      errors.push(`${label}: run_id, date_utc, detector and sample_id are required`)
    }
    if (!/^\d{4}-\d{2}-\d{2}/.test(r.date_utc)) {
      errors.push(`${label}: date_utc must start with YYYY-MM-DD`)
    }
    if (!Number.isFinite(r.temperature)) {
      errors.push(`${label}: temperature must be a number`)
    }
    if (!/^[a-f0-9]{8,}$/i.test(r.input_hash || '')) {
      errors.push(`${label}: input_hash must be a hex digest (8+ characters)`)
    }
    if (Boolean(r.pass) !== isPass(r)) {
      errors.push(`${label}: pass=${r.pass} disagrees with the verdicts / regraded rule`)
    }
  })
  return errors
}

export function summarizeRuns(records: TestRecord[]): RunSummary[] {
  const byRun = new Map<string, TestRecord[]>()
  for (const record of records) {
    const bucket = byRun.get(record.run_id) ?? []
    bucket.push(record)
    byRun.set(record.run_id, bucket)
  }

  return Array.from(byRun.entries())
    .map(([runId, rows]) => {
      const passes = rows.filter((r) => r.pass === 1).length
      return {
        runId,
        dateUtc: rows[0].date_utc,
        detectors: Array.from(new Set(rows.map((r) => r.detector))).sort(),
        detectorVersions: Array.from(new Set(rows.map((r) => r.detector_version).filter(Boolean))).sort(),
        samples: new Set(rows.map((r) => `${r.sample_id}|${r.detector}`)).size,
        passes,
        passRate: rows.length ? Math.round((passes / rows.length) * 1000) / 10 : 0,
        categories: new Set(rows.map((r) => r.category).filter(Boolean)).size,
        regraded: rows.filter((r) => r.regraded === 1).length,
      }
    })
    .sort((a, b) => b.dateUtc.localeCompare(a.dateUtc))
}

function csvCell(value: unknown): string {
  const s = String(value ?? '')
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

/** Clients download exactly the same records the table is computed from. */
export function recordsToCsv(records: TestRecord[]): string {
  const header = [...LOG_FIELDS, 'evidence_url'].join(',')
  const columns: (keyof TestRecord)[] = [...LOG_FIELDS, 'evidence_url']
  const rows = records.map((r) =>
    columns.map((field) => csvCell(r[field])).join(','),
  )
  return [header, ...rows].join('\r\n') + '\r\n'
}
