import type { Metadata } from 'next'
import { languageAlternates, pageUrl } from '@/lib/site'
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd'
import ToolClient from '../../../components/Tool/ToolClient'
import { turnitinI18n } from '../../../components/Tool/i18n/turnitin'

/** This route tree is English; the language is a compile-time constant. */
const lang = 'en' as const

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is GPTZero?', acceptedAnswer: { '@type': 'Answer', text: 'A third-party tool that estimates whether text was written with AI assistance. Its internal method is not public, it is not connected to this site, and its verdict is an estimate rather than proof of authorship.' } },
    { '@type': 'Question', name: 'Why is a GPTZero score unreliable?', acceptedAnswer: { '@type': 'Answer', text: 'Perplexity and burstiness are widely discussed general heuristics, not a verified description of GPTZero’s algorithm. Detector verdicts are contested and can disagree with each other. Published data here shows limits only: an earlier undocumented 85–95% impression has been withdrawn as unreproduced; the 2026-11-24 self-check measured 13.3% (4/30) with this site’s own detector; incomplete third-party spot-checks returned 100% AI on rewrites. We have no audited comparison with GPTZero.' } },
    { '@type': 'Question', name: 'What does a high or low score tell me?', acceptedAnswer: { '@type': 'Answer', text: 'Very little on its own. Treat it as a prompt to re-read the prose: is it specific, does it take a position, are the sources real and checked? Do not treat any score as a judgment about you.' } },
    { '@type': 'Question', name: 'How do I make an AI-assisted draft sound like mine?', acceptedAnswer: { '@type': 'Answer', text: 'Add concrete details you can stand behind, write your own assessment of the evidence, check every citation and number against its source, and cut filler transitions. A conversational rewrite can help you see alternatives; the final judgment is yours.' } },
    { '@type': 'Question', name: 'Does AI Humanizer promise a GPTZero result?', acceptedAnswer: { '@type': 'Answer', text: 'No. It is a free writing-improvement tool with no detector-specific tuning, no API connection to GPTZero and no guaranteed output.' } },
    { '@type': 'Question', name: 'Are citations preserved and what does it cost?', acceptedAnswer: { '@type': 'Answer', text: 'The prompt asks the model to preserve citations, numbers and proper nouns; verify manually because LLM output is not post-processed. AI Humanizer is 100% free with no signup: 5 submissions per IP per rolling 24 hours, 3,000 characters each.' } },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  const titles = {
    zh: 'GPTZero 分数为什么不可靠 — 写作建议',
    en: 'Why GPTZero Scores Are Unreliable — Writing Guidance',
  }
  const descriptions = {
    zh: '免费在线写作改进工具：把生硬的 AI 辅助草稿改得更自然、清晰、更贴合你自己的表达。支持中英双语，无需注册。本页说明 GPTZero 分数的局限与写作方法。',
    en: 'Free writing tool for clearer drafts. Why GPTZero scores are unreliable and how to write in your own voice. No signup.',
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
    alternates: { canonical: pageUrl('/gptzero-bypass', 'en'), languages: languageAlternates('/gptzero-bypass') },
  }
}

export default async function GptZeroBypassPage() {

  const seoBodyEn = (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6 text-gray-700 leading-relaxed space-y-3">
      <p><strong>GPTZero</strong> is one of several AI detectors used by schools and publishers. This page keeps its old address so existing links still work, but it is now an explainer: detector scores are unreliable, and the useful work happens in the writing itself.</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">Why a GPTZero score is not a verdict</h2>
      <p>Perplexity (how predictable a word is in context) and burstiness (how much sentence length varies) are widely discussed heuristics, not a published description of GPTZero’s internal algorithm. Different detectors can score the same text differently. The data published here documents limitations, not success: an earlier undocumented 85–95% impression has been withdrawn as unreproduced; the 2026-11-24 self-check measured 13.3% (4/30) with this site’s own detector; incomplete third-party spot-checks returned 100% AI on rewrites. None of it is an audited comparison with GPTZero. See <a href="/bypass-test-methodology" className="text-violet-600 hover:underline">test methodology</a>.</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">Write for the reader, not for a score</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Concrete detail.</strong> Name the study, the number, the place, the thing you observed — instead of a general statement that could fit any essay.</li>
        <li><strong>Your own view.</strong> Say what you conclude and why, including what you are unsure about.</li>
        <li><strong>Sources you checked.</strong> Open them, confirm dates, numbers, (Author, Year) markers and quotations. The rewrite prompt asks the model to keep them; it does not verify them.</li>
        <li><strong>Natural rhythm.</strong> Sentence length should follow the idea, not a formula. Read the draft aloud and keep what sounds like you.</li>
      </ul>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">What this tool offers</h2>
      <p><strong>AI Humanizer</strong> is a free writing-improvement tool: 100% free, no signup, 5 submissions per IP per rolling 24 hours, 3,000 characters each, English and Simplified Chinese, cloud-processed with DeepSeek Chat. No persistent storage, no analytics cookies or tracking pixels; a short-lived in-memory cache holds data for up to 10 minutes. It is not connected to GPTZero and makes no promise about any detector result. You can read about <a href="/limitations" className="text-violet-600 hover:underline">limitations</a> and the <a href="/glossary" className="text-violet-600 hover:underline">glossary</a> for more context.</p>
    </div>
  )

  return (
    <>
      <BreadcrumbJsonLd slug="/gptzero-bypass" lang="en" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {seoBodyEn}
      <p className="text-xs text-gray-400 mt-4">Last reviewed: 2026-11-24</p>
      <ToolClient mode="turnitin" lang={lang} i18n={turnitinI18n}
      heroTitle={{ zh: 'GPTZero 分数为什么不可靠 — 写作建议', en: 'Why GPTZero Scores Are Unreliable — Writing Guidance' }} heroSubtitle={{ zh: '写下具体细节、自己的判断，并亲自核对每一条引用。AI Humanizer 是免费的写作改进工具，不承诺任何检测结果；无需注册。', en: 'Write concrete details, your own judgment, and citations you checked yourself. AI Humanizer is a free writing-improvement tool with no detector promise. No signup.' }}
    />
    </>
  )
}
