import rawLog from '@/data/test-runs.json'
import {
  type TestLogData,
  type TestRecord,
  isPass,
  summarizeRuns,
  validateRecords,
} from './test-logs'

/**
 * Server-only accessor for the checked-in test log.
 *
 * Fails loudly on malformed rows in development so whoever edits the CSV/JSON
 * sees the problem immediately. In production we hide the error rows rather
 * than publish a table that mixes valid and invalid evidence.
 */
export function loadTestLog(): {
  records: TestRecord[]
  summaries: ReturnType<typeof summarizeRuns>
  errors: string[]
  lastUpdated: string | null
  note: string
  thirdParty: import('./test-logs').ThirdPartyObservations | null
} {
  const data = rawLog as TestLogData
  const records = Array.isArray(data.runs) ? data.runs : []
  const errors = validateRecords(records)

  if (errors.length && process.env.NODE_ENV !== 'production') {
    console.warn('[test-log] invalid rows found:\n' + errors.join('\n'))
  }

  // An inconsistent row must not silently contribute to a headline number.
  const valid = records.filter((row) => Boolean(row.pass) === isPass(row))

  return {
    records: process.env.NODE_ENV === 'production' ? valid : records,
    summaries: summarizeRuns(valid),
    errors,
    lastUpdated: data.last_updated ?? null,
    note: data.note ?? '',
    thirdParty: data.third_party_observations ?? null,
  }
}
