import type { Metadata } from 'next'
import { languageAlternates, pageUrl } from '@/lib/site'
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd'
import Link from 'next/link'
import ToolClient from '../../../components/Tool/ToolClient'
import { detectorI18n } from '../../../components/Tool/i18n/detector'

/** This route tree is English; the language is a compile-time constant. */
const lang = 'en' as const

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Is AI text self-review really free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. No hidden fees, no watermark, no signup. 5 submissions per IP per rolling 24 hours, 3,000 characters each.' } },
    { '@type': 'Question', name: 'How does this self-review work?', acceptedAnswer: { '@type': 'Answer', text: 'This is a prompt-driven heuristic: DeepSeek Chat is asked to comment on textual patterns such as sentence-length uniformity, stock phrasing and predictable transitions, and to return ai_probability, human_probability, verdict, signals and explanation. It does not call GPTZero, Turnitin, ZeroGPT or any other detector API, does not validate authorship, and the signals are not independently computed.' } },
    { '@type': 'Question', name: 'What do the published tests show?', acceptedAnswer: { '@type': 'Answer', text: 'They show the limits of detector evidence: an undocumented early impression of 85–95% was withdrawn after a 2026-11-24 self-check measured 13.3% (4/30) with this site’s own detector; third-party spot-checks are incomplete and rewritten samples repeatedly returned 100% AI. These are limitations, not product claims. If JSON parsing fails, the API returns signals: [] with a fixed 50/50 score.' } },
    { '@type': 'Question', name: 'Can it verify who wrote a text?', acceptedAnswer: { '@type': 'Answer', text: 'No. It is not connected to GPTZero, Turnitin or any third-party detector and cannot validate authorship. A human author writing in a uniform style may be misclassified as AI, and AI text with contractions or first-person voice may be misclassified as human. There is no calibrated dataset based on real detector feedback; treat every result as an estimate, not a verdict.' } },
    { '@type': 'Question', name: 'Do you store my text?', acceptedAnswer: { '@type': 'Answer', text: 'No persistent storage; a short-lived in-memory cache may retain a hash of the input and the output for up to 10 minutes. See the privacy page at /privacy for details.' } },
    { '@type': 'Question', name: 'Does it support Chinese?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Only English and Simplified Chinese (zh-CN) are supported; no other languages or traditional-Chinese optimization are offered.' } },
  ],
}

export async function generateMetadata() {
  const titles = {
    zh: 'AI 文本自查 — 启发式参考，非判定',
    en: 'AI Text Self-Review — Heuristic, Not a Verdict',
  }
  const descriptions = {
    zh: '启发式 AI 文本自查：不直连第三方检测器，不能验证作者身份；检测分数不可靠，仅作写作自查参考。支持中英双语，无需注册。',
    en: 'Heuristic AI text self-review, not a detector verdict or authorship check. Free, no signup, in English and Simplified Chinese.',
  }
  return {
    title: titles[lang],
    description: descriptions[lang],
    openGraph: {
      title: titles[lang],
      description: descriptions[lang],
      images: [{ url: 'https://gpt-undetectable.com/og-image.png', width: 1200, height: 630, alt: titles[lang] }],
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[lang],
      description: descriptions[lang],
      images: ['https://gpt-undetectable.com/og-image.png'],
    },
    alternates: { canonical: pageUrl('/ai-detector', 'en'), languages: languageAlternates('/ai-detector') },
  }
}

export default async function DetectorPage() {

  // 2026-07-25 P0 /ai-detector SEO content block (GSC: 2 imp / rank #4, USA 61%)
  // Target: 'ai detector', 'free ai detector', 'gptzero alternative', 'turnitin ai check', 'chatgpt detector', 'claude detector', 'gemini detector'
  const seoBlockEn = (
    <section className="max-w-3xl mx-auto px-4 pt-8 pb-2 text-sm text-gray-600 leading-relaxed">
      <h2 className="text-xl font-bold text-gray-800 mb-3">AI Text Self-Review — Heuristic, Not a Verdict</h2>
      <p className="mb-3">
        This page offers a prompt-driven heuristic self-review of text you paste — no signup, no upload, no watermark. DeepSeek Chat (deepseek-chat) is asked to comment on <strong className="text-gray-800">sentence-length uniformity</strong>, <strong className="text-gray-800">stock phrasing</strong> (e.g. “delve into”, “in conclusion”), <strong className="text-gray-800">list-like structure</strong> and <strong className="text-gray-800">predictable transitions</strong>. These are writing signals, not evidence about who wrote the text. This tool is <strong>not connected to GPTZero, Turnitin, ZeroGPT or any third-party detector</strong>, does not implement their algorithms, and cannot validate authorship or guarantee any detector outcome.
      </p>
      <p className="mb-3">
        Detector verdicts are unreliable and contested; AI Humanizer is not a way to manipulate them. As evidence of those limits: an undocumented early impression of 85–95% was withdrawn after a 2026-11-24 self-check pilot measured 13.3% (4/30) with this site’s own detector; third-party spot-checks returned 100% AI on rewrites and are explicitly incomplete. None of these figures is a product claim. Full data and caveats are published at <Link href="/bypass-test-methodology" className="text-violet-600 hover:underline">/bypass-test-methodology</Link>. If JSON parsing fails, the API returns <code>signals: []</code> with a fixed 50/50 score, so a full breakdown is not guaranteed.
      </p>
      <h3 className="text-base font-semibold text-gray-800 mb-2 mt-4">What this is useful for</h3>
      <ul className="list-disc list-inside mb-3 space-y-1 pl-1">
        <li><strong className="text-gray-800">Draft self-review</strong> — notice which paragraphs read stiff or templated and revise them.</li>
        <li><strong className="text-gray-800">Editor review</strong> — find generic phrasing before publication.</li>
        <li><strong className="text-gray-800">Writing improvement</strong> — use the signals as a prompt to make your prose clearer and more natural.</li>
        <li><strong className="text-gray-800">Not for</strong> — proving or disproving authorship, adjudicating school or workplace cases, or predicting a detector verdict.</li>
      </ul>
      <p className="text-xs text-gray-500 mb-0 pt-3 border-t border-gray-100">
        No persistent storage; a short-lived in-memory cache may retain a hash of the input and the output for up to 10 minutes. See the privacy page at /privacy for details. Free quota: 5 submissions per IP per rolling 24 hours, 3,000 characters each.
      </p>
      <h3 className="text-base font-semibold text-gray-800 mb-2 mt-4">Improve the writing instead</h3>
      <ul className="list-disc list-inside mb-3 space-y-1 pl-1">
        <li><strong className="text-gray-800">Student essays</strong> — <Link href="/essay-humanizer" className="text-violet-600 hover:underline">EssayRewriter</Link> asks the model to keep citations and an academic register; check them yourself.</li>
        <li><strong className="text-gray-800">Blog & marketing copy</strong> — <Link href="/" className="text-violet-600 hover:underline">AI Humanizer</Link> makes rough drafts read more naturally.</li>
        <li><strong className="text-gray-800">Personal voice</strong> — <Link href="/walterwrites" className="text-violet-600 hover:underline">Walter Writes style</Link> rewrites toward a conversational tone.</li>
        <li><strong className="text-gray-800">Chinese draft editing</strong> — <Link href="/jiang-ai-lv" className="text-violet-600 hover:underline">中文改写</Link> works on Chinese academic prose.</li>
      </ul>
      <h3 className="text-base font-semibold text-gray-800 mb-2 mt-4">Why detectors are unreliable</h3>
      <p className="mb-3">
        Detector verdicts depend on the engine, version and genre; false positives and false negatives both occur. A rewrite that changes one tool's output can leave another unchanged. Read the <Link href="/glossary" className="text-violet-600 hover:underline">glossary</Link> for the concepts behind these scores and the <Link href="/limitations" className="text-violet-600 hover:underline">known limitations</Link> for what this site cannot do. No writer should treat a score as proof of authorship or detector approval.
      </p>
      <p className="mt-3 text-sm">
        Want this heuristic self-review on your own site?{' '}
        <Link href="/embed" className="text-violet-600 underline underline-offset-2">
          Embed the free tool
        </Link>{' '}
        with one iframe — no signup, no API key, no tracking.
      </p>
    </section>
  )

  const seoBlockZh = (
    <section className="max-w-3xl mx-auto px-4 pt-8 pb-2 text-sm text-gray-600 leading-relaxed">
      <h2 className="text-xl font-bold text-gray-800 mb-3">AI 文本自查 — 启发式参考，非判定</h2>
      <p className="mb-3">
        这里提供的是提示词驱动的启发式文本自查：无需注册、无需上传、无水印。DeepSeek Chat（deepseek-chat）会被要求评论<strong className="text-gray-800">句长是否均匀</strong>、<strong className="text-gray-800">模板词密度</strong>、<strong className="text-gray-800">列表式结构</strong>和<strong className="text-gray-800">可预测的段落过渡</strong>。这些是写作信号，不是作者身份的证据。本站不直连 GPTZero、Turnitin、ZeroGPT 或任何第三方检测器，不能验证作者身份，也不保证任何检测器的判定。
      </p>
      <p className="mb-3">
        早前未记录条件的 85–95% 内部印象已撤回；2026-11-24 自洽性试点用本站检测器只测得 13.3%（4/30），第三方抽查未完成。这些是检测局限的证据，不是产品效果承诺。数据与限定见 /zh/bypass-test-methodology。JSON 解析失败时会返回空 signals 和固定 50/50 分，不保证完整明细。
      </p>
      <h3 className="text-base font-semibold text-gray-800 mb-2 mt-4">适合做什么</h3>
      <ul className="list-disc list-inside mb-3 space-y-1 pl-1">
        <li><strong className="text-gray-800">草稿自查</strong> — 找出生硬、模板化的段落并自己改写。</li>
        <li><strong className="text-gray-800">编辑审阅</strong> — 发布前发现泛泛的套话。</li>
        <li><strong className="text-gray-800">写作改进</strong> — 把信号当作让文字更自然清晰的提示。</li>
        <li><strong className="text-gray-800">不适合</strong> — 证明作者身份或预测检测器的判定。</li>
      </ul>
      <p className="text-xs text-gray-500 mb-0 pt-3 border-t border-gray-100">
        隐私:输入文本检测后立即丢弃(无状态 API)。我们从不基于用户提交训练。免费配额:每个 IP 每天 5 次,每次 3000 字。
      </p>
      <p className="mt-3 text-sm">
        想把检测器放到自己的站点?
        <Link href="/embed" className="text-violet-600 underline underline-offset-2">
          免费嵌入 AI 检测器
        </Link>
        —— 一段 iframe,无需注册、无需 API key。
      </p>
    </section>
  )

  return (
    <>
      <BreadcrumbJsonLd slug="/ai-detector" lang="en" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {seoBlockEn}
      <ToolClient mode="detector" lang={lang} i18n={detectorI18n} />
      <p className="text-xs text-gray-400 mt-4">Last reviewed: 2026-11-24</p>
    </>
  )
}