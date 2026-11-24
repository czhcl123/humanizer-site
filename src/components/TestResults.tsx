import { loadTestLog } from '@/lib/test-log-data'
import { recordsToCsv } from '@/lib/test-logs'

type Lang = 'en' | 'zh'

const T = {
  en: {
    emptyTitle: 'No published test runs',
    emptyBody:
      'No complete test run has been published yet. The early 85–95% impression is withdrawn; only isolated observations are recorded below.',
    run: 'Run',
    date: 'Date (UTC)',
    detectors: 'Detectors (versions)',
    samples: 'Samples',
    passes: 'Passes',
    passRate: 'Pass rate',
    download: 'Download raw log (CSV)',
    template: 'Download the CSV template',
    howTo: 'How to fill the log',
    howToBody:
      'One row per sample × detector. Record the raw verdict first, discard samples the detector did not flag as AI, then score the rewrite. mixed / uncertain count as failures, and a regraded row is invalid. The CSV columns are: run_id, date_utc, detector, detector_version, sample_id, category, raw_verdict, rewritten_verdict, pass, prompt_version, model, temperature, regraded, input_hash.',
    lastUpdated: 'Log last updated',
    invalid: 'Rows excluded: please check the pass field against the verdicts.',
    evidence: 'Per-row evidence is linked in the CSV where available.',
    thirdPartyTitle: 'Third-party detector spot-check (incomplete)',
    thirdPartyNote: 'Isolated manual scans on free web detectors. The planned 15-sample run could not be completed — GPTZero free scans were exhausted and the ZeroGPT run was stopped after repeated 100% AI results on rewrites. These observations do NOT measure a pass rate and no percentage may be calculated from them.',
    detector: 'Detector',
    stage: 'Text',
    verdict: 'Result',
    aiProbability: 'AI probability',
    raw: 'Original',
    rewritten: 'Rewrite',
  },
  zh: {
    emptyTitle: '尚无公开的完整测试轮次',
    emptyBody:
      '目前没有已发布的完整测试。早期 85–95% 的印象已撤回，下方仅记录零星观察。',
    run: '轮次',
    date: '日期（UTC）',
    detectors: '检测器（版本）',
    samples: '样本数',
    passes: '通过数',
    passRate: '通过率',
    download: '下载原始日志（CSV）',
    template: '下载 CSV 模板',
    howTo: '如何填写日志',
    howToBody:
      '每条「样本 × 检测器」记一行。先记原文判定，剔除未被标记为 AI 的样本，再对改写稿打分。mixed / uncertain 算失败；重新打分的记录无效。CSV 列：run_id、date_utc、detector、detector_version、sample_id、category、raw_verdict、rewritten_verdict、pass、prompt_version、model、temperature、regraded、input_hash。',
    lastUpdated: '日志最近更新',
    invalid: '已排除异常行：请核对 pass 字段与判定是否一致。',
    evidence: '如有个案截图或原始导出，链接见 CSV 的 evidence_url 列。',
    thirdPartyTitle: '第三方检测器手动抽查（未完成）',
    thirdPartyNote: '在免费网页检测器上所做的零星手动检测。原定 15 条样本的测试未能完成：GPTZero 免费次数用尽，ZeroGPT 在改写稿反复出现 100% AI 后停止。这些观察不构成通过率测量，不得据此计算百分比。',
    detector: '检测器',
    stage: '文本',
    verdict: '判定',
    aiProbability: 'AI 概率',
    raw: '原文',
    rewritten: '改写稿',
  },
}

/**
 * Server component. Reads the checked-in dataset at render time: adding a run
 * means adding rows to /src/data/test-runs.json — no page edits required.
 */
export default function TestResults({ lang }: { lang: Lang }) {
  const t = T[lang]
  const { records, summaries, errors, lastUpdated, thirdParty } = loadTestLog()
  const hasData = summaries.length > 0

  const csvUrl =
    'data:text/csv;charset=utf-8,' + encodeURIComponent(recordsToCsv(records))
  const templateUrl = '/test-logs/template.csv'

  return (
    <section className="my-6 rounded-xl border border-gray-200 bg-white p-5 text-sm text-gray-700 leading-relaxed">
      {!hasData ? (
        <>
          <h3 className="text-base font-semibold text-gray-800">{t.emptyTitle}</h3>
          <p className="mt-2 text-gray-600">{t.emptyBody}</p>
        </>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-2 text-left border-b border-gray-200">{t.run}</th>
                  <th className="p-2 text-left border-b border-gray-200">{t.date}</th>
                  <th className="p-2 text-left border-b border-gray-200">{t.detectors}</th>
                  <th className="p-2 text-left border-b border-gray-200">{t.samples}</th>
                  <th className="p-2 text-left border-b border-gray-200">{t.passes}</th>
                  <th className="p-2 text-left border-b border-gray-200">{t.passRate}</th>
                </tr>
              </thead>
              <tbody>
                {summaries.map((s) => (
                  <tr key={s.runId}>
                    <td className="p-2 border-b border-gray-100">{s.runId}</td>
                    <td className="p-2 border-b border-gray-100">{s.dateUtc.slice(0, 10)}</td>
                    <td className="p-2 border-b border-gray-100">
                      {s.detectors.join(', ')}
                      {s.detectorVersions.length > 0 && (
                        <span className="text-gray-500"> ({s.detectorVersions.join(', ')})</span>
                      )}
                    </td>
                    <td className="p-2 border-b border-gray-100">{s.samples}</td>
                    <td className="p-2 border-b border-gray-100">{s.passes}</td>
                    <td className="p-2 border-b border-gray-100 font-semibold">{s.passRate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {lastUpdated && (
            <p className="mt-2 text-xs text-gray-500">
              {t.lastUpdated}: {lastUpdated}
            </p>
          )}
          {errors.length > 0 && process.env.NODE_ENV !== 'production' && (
            <p className="mt-2 text-xs text-amber-700">{t.invalid} ({errors.length})</p>
          )}
          <p className="mt-2 text-xs text-gray-500">{t.evidence}</p>
        </>
      )}

      <div className="mt-4 flex flex-wrap gap-4 text-xs">
        {hasData && (
          <a href={csvUrl} download={`test-log-${lastUpdated ?? 'latest'}.csv`} className="text-violet-600 hover:underline">
            {t.download}
          </a>
        )}
        <a href={templateUrl} download className="text-violet-600 hover:underline">
          {t.template}
        </a>
      </div>

      <details className="mt-3 text-xs text-gray-500">
        <summary className="cursor-pointer">{t.howTo}</summary>
        <p className="mt-2 leading-relaxed">{t.howToBody}</p>
      </details>

      {thirdParty && thirdParty.observations.length > 0 && (
        <div className="mt-6 border-t border-gray-200 pt-5">
          <h3 className="text-base font-semibold text-gray-800">{t.thirdPartyTitle}</h3>
          <p className="mt-2 text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded p-3">
            {t.thirdPartyNote}
          </p>
          <div className="overflow-x-auto mt-3">
            <table className="w-full text-sm border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-2 text-left border-b border-gray-200">{t.detector}</th>
                  <th className="p-2 text-left border-b border-gray-200">sample_id</th>
                  <th className="p-2 text-left border-b border-gray-200">{t.stage}</th>
                  <th className="p-2 text-left border-b border-gray-200">{t.verdict}</th>
                  <th className="p-2 text-left border-b border-gray-200">{t.aiProbability}</th>
                </tr>
              </thead>
              <tbody>
                {thirdParty.observations.map((o, i) => (
                  <tr key={`${o.detector}-${o.sample_id}-${o.text_stage}-${i}`}>
                    <td className="p-2 border-b border-gray-100">{o.detector}<span className="text-gray-500"> ({o.detector_version})</span></td>
                    <td className="p-2 border-b border-gray-100">{o.sample_id}</td>
                    <td className="p-2 border-b border-gray-100">{o.text_stage === 'raw' ? t.raw : t.rewritten}</td>
                    <td className="p-2 border-b border-gray-100">{o.verdict}</td>
                    <td className="p-2 border-b border-gray-100 font-semibold">{o.ai_probability}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-gray-500">{thirdParty.note}</p>
        </div>
      )}
    </section>
  )
}
