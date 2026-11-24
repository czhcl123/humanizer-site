import type { Metadata } from 'next'
import { languageAlternates, pageUrl } from '@/lib/site'
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd'
import ToolClient from '../../../components/Tool/ToolClient'
import { turnitinI18n } from '../../../components/Tool/i18n/turnitin'
import TestResults from '@/components/TestResults'

/** This route tree is English; the language is a compile-time constant. */
const lang = 'en' as const

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How is the detector-reliability protocol designed?', acceptedAnswer: { '@type': 'Answer', text: 'A published run would score at least 150 AI-generated samples with each detector. The raw text is scored first as a sanity check — if it is not flagged as AI, the sample is discarded. The rewritten text is scored again. The protocol is documented to show why detector verdicts are unreliable; it is not a product performance test.' } },
    { '@type': 'Question', name: 'Which AI detectors do you test against?', acceptedAnswer: { '@type': 'Answer', text: 'No third-party detector API is used, and no detector-version log exists. The protocol below is a proposal for independent testing; we have not run it or published results. Our own detector is a prompt-driven heuristic on DeepSeek Chat.' } },
    { '@type': 'Question', name: 'How are detector verdicts classified in the protocol?', acceptedAnswer: { '@type': 'Answer', text: "The detector's own interface result is recorded as-is: 'not AI-generated', 'AI-generated', 'mixed' or 'uncertain'. Borderline texts are never re-scored until a favourable verdict appears. The point is to document inconsistency, not to advertise a result." } },
    { '@type': 'Question', name: 'How often are the tests run?', acceptedAnswer: { '@type': 'Answer', text: 'No recurring test run is currently performed and no results are published. This page documents the protocol only.' } },
    { '@type': 'Question', name: 'Are the published figures independently verified?', acceptedAnswer: { '@type': 'Answer', text: 'No. The 2026-11-24 pilot measured 13.3% (4/30) using this site’s own prompt-driven detector; the roughly 85–95% figure is a withdrawn, undocumented early impression. Neither is a third-party audit or a measure of writing quality.' } },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  const titles = {
    zh: '检测器可靠性说明 — 协议、样本与已知局限',
    en: 'Detector Reliability — Test Protocol & Limits',
  }
  const descriptions = {
    zh: 'AI 改写测试协议与已公布数据：检测器、样本、通过标准与局限。数据用于说明检测器不可靠，不是产品效果证明。',
    en: 'Test protocol and published data on detector reliability and its limits. Evidence of detector unreliability, not a product claim.',
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
    alternates: { canonical: pageUrl('/bypass-test-methodology', 'en'), languages: languageAlternates('/bypass-test-methodology') },
  }
}

export default async function BypassTestMethodologyPage() {

  const seoBodyEn = (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6 text-gray-700 leading-relaxed space-y-3">
      <p>An earlier informal impression suggested roughly <strong>85–95% human-looking rewrites</strong>. A first published pilot (2026-11-24) does <strong>not</strong> reproduce that figure: it measured 13.3% on 30 samples using this site's own detector. The two numbers are not comparable — see the note below. Treat the 85–95% impression as withdrawn pending independent measurement.</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">What we test against</h2>
      <p>A reproducible study would compare against detectors such as <strong>GPTZero</strong>, <strong>Turnitin AI</strong>, <strong>Originality.ai</strong> and <strong>ZeroGPT</strong>, logging each detector version and test date. We have not run such a study, have no direct detector API access, and publish no pass-rate table. Detector products update frequently, so any past number would be evidence only about its run date.</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">Sample set</h2>
      <p>A run would use at least 150 AI-generated samples, split across five categories that map to how people actually use the tool:</p>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Academic essays</strong> — argumentative drafts, literature reviews, lab reports</li>
        <li><strong>Marketing and blog articles</strong> — SEO posts, product pages, newsletters</li>
        <li><strong>Professional email</strong> — outreach, internal updates, follow-ups</li>
        <li><strong>Technical documentation</strong> — README-style prose, release notes, tutorials</li>
        <li><strong>Non-native English writing</strong> — ESL student and professional texts</li>
      </ul>
      <p>All samples run 1,500-3,000 characters — the range the free tool processes in one pass — generated with ChatGPT, Gemini, and Claude using ordinary prompts, no adversarial tricks, raw output only.</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">Verdict classification</h2>
      <p>Two stages, deliberately conservative:</p>
      <ol className="list-decimal pl-5 space-y-1">
        <li><strong>Sanity check</strong> — the raw AI sample must be flagged as AI by the detector. If the baseline is missed, the sample is discarded.</li>
        <li><strong>Scoring</strong> — the rewritten text goes through the same detector. The interface verdict is recorded as-is: &quot;not AI-generated&quot;, &quot;AI-generated&quot;, &quot;mixed&quot; or &quot;uncertain&quot;. Borderline texts are never re-scored until a favourable verdict appears.</li>
      </ol>
      <p>This protocol documents detector behaviour; it is not a measure of writing quality or a product performance claim.</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">Published results</h2>
      <p className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-amber-900"><strong>Read this before citing a number.</strong> The only published run so far is a self-consistency pilot: the same DeepSeek prompt driven detector scored both the original samples and the rewrites. It is not an independent measurement of GPTZero, Turnitin, Originality.ai or any third-party detector, and it cannot be compared with the earlier 85–95% impression, which came from informal checks under undocumented conditions. Full samples, generation prompts and the run script are linked below.</p>
      <p>Rows are computed from the raw, downloadable log:</p>
      <TestResults lang="en" />
      <p className="text-sm text-gray-500">The 85–95% figure is an informal internal observation, not a calibrated or audited result. Any published run is evidence only about its own date, samples and detector versions — never a guarantee for an individual text. Raw evidence for the pilot: <a href="/test-logs/evidence/self-2026-11-24/results.csv" className="text-violet-600 hover:underline">results.csv</a> · <a href="/test-logs/evidence/self-2026-11-24/samples.jsonl" className="text-violet-600 hover:underline">samples.jsonl</a> · <a href="/test-logs/run_pilot.py" className="text-violet-600 hover:underline">run script</a>.</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">Reproduce it yourself</h2>
      <ol className="list-decimal pl-5 space-y-1">
        <li>A future run would generate 150 short-to-medium texts across the five categories with any mainstream chatbot.</li>
        <li>Score every raw sample through each detector; drop any that are not flagged as AI.</li>
        <li>Rewrite each sample with our <a href="/humanize-ai-text" className="text-violet-600 hover:underline">AI humanizer</a> — or your own method. The protocol does not care which tool produced the rewrite.</li>
        <li>Score every rewrite on the same detectors and record verdicts exactly as the interface shows them.</li>
        <li>Divide passes by total scores and publish your own log; we do not yet have one of our own.</li>
      </ol>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">Limitations, stated plainly</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Numbers age.</strong> Detectors update constantly, and no audited third-party figure has been published. No detector-related claim is made for the writing tool.</li>
        <li><strong>Your text is not our sample set.</strong> Long, technical, or citation-heavy documents behave differently from 2,000-character essays.</li>
        <li><strong>This is not a license to submit fabricated work.</strong> Editing AI-assisted drafts into your own voice is what the tool is for. Policies at schools and workplaces vary — check the rules that apply to you.</li>
      </ul>

      <p>Related: <a href="/ai-detector" className="text-violet-600 hover:underline">AI text self-review</a> — heuristic writing feedback · <a href="/gptzero-bypass" className="text-violet-600 hover:underline">GPTZero score reliability</a> and <a href="/turnitin-bypass" className="text-violet-600 hover:underline">Turnitin writing guidance</a> — detector-limits explainers</p>
    </div>
  )

  return (
    <>
      <BreadcrumbJsonLd slug="/bypass-test-methodology" lang="en" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {seoBodyEn}
      <p className="text-xs text-gray-400 mt-4">Last reviewed: 2026-11-24</p>
      <ToolClient mode="turnitin" lang={lang} i18n={turnitinI18n}
      heroTitle={{ zh: '检测器可靠性说明 — 协议与已公布数据', en: 'Detector Reliability — Protocol & Published Data' }} heroSubtitle={{ zh: '测试协议、样本类别、判定标准与已公布数据。这些数据用于说明检测分数的局限，不是产品效果证明。', en: 'The test protocol, sample categories, verdict criteria and published observations. These explain the limits of detector scores and are not a product performance claim.' }}
    />
    </>
  )
}
