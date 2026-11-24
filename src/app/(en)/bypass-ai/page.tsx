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
    { '@type': 'Question', name: 'What is an AI detector?', acceptedAnswer: { '@type': 'Answer', text: 'A tool that estimates whether text was written with AI assistance. Detectors use different, unpublished methods; their verdicts are contested and are not proof of authorship.' } },
    { '@type': 'Question', name: 'Why do detector verdicts disagree?', acceptedAnswer: { '@type': 'Answer', text: 'GPTZero, Turnitin, Originality.ai and ZeroGPT use independently developed methods. Widely discussed signals such as perplexity and burstiness are general heuristics, not verified internal algorithms, so the same paragraph can be scored differently.' } },
    { '@type': 'Question', name: 'What do the published test numbers actually show?', acceptedAnswer: { '@type': 'Answer', text: 'They show limits, not performance. An earlier undocumented internal impression of roughly 85–95% has been withdrawn as unreproduced. The 2026-11-24 self-check measured 13.3% (4/30) with this site’s own detector; incomplete third-party spot-checks returned 100% AI on rewrites. None of these validate any detector or product claim. See /bypass-test-methodology.' } },
    { '@type': 'Question', name: 'How do I make a draft sound more like my own writing?', acceptedAnswer: { '@type': 'Answer', text: 'Add concrete details you know are true, say what you think and why, and check every citation, number and quotation against the source yourself. Reading the result aloud helps you find sentences that do not sound like you.' } },
    { '@type': 'Question', name: 'Does AI Humanizer promise a particular detector result?', acceptedAnswer: { '@type': 'Answer', text: 'No. It is a free writing-improvement tool: the prompt asks the model to make prose clearer and easier to make your own, with no detector-specific tuning, reverse engineering or guaranteed outcome.' } },
    { '@type': 'Question', name: 'Are citations and numbers preserved?', acceptedAnswer: { '@type': 'Answer', text: 'The prompt asks the model to preserve citations, numbers and proper nouns; verify manually. LLM output is not post-processed and nothing is preserved with a guarantee.' } },
    { '@type': 'Question', name: 'How much does it cost and do you store my text?', acceptedAnswer: { '@type': 'Answer', text: '100% free, no signup: 5 submissions per IP per rolling 24 hours, 3,000 characters each, English and Simplified Chinese. No persistent storage; a short-lived in-memory cache may retain a hash of the input and the output for up to 10 minutes. See /privacy.' } },
  ],
}

export async function generateMetadata() {
  const titles = {
    zh: 'AI 检测器为什么不可靠 — 写作建议',
    en: 'Why AI Detectors Are Unreliable — Writing Guidance',
  }
  const descriptions = {
    zh: '免费在线写作改进工具：把生硬的 AI 辅助草稿改得更自然、清晰、更贴合你自己的表达。支持中英双语，无需注册。本页说明检测器局限与写出自己声音的方法。',
    en: 'Free writing tool for clearer, more natural drafts. EN / zh-CN, no signup. Why detector scores are unreliable.',
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
    alternates: { canonical: pageUrl('/bypass-ai', 'en'), languages: languageAlternates('/bypass-ai') },
  }
}

export default async function BypassAiPage() {

  const seoBodyEn = (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6 text-gray-700 leading-relaxed space-y-3">
      <p>This address is kept for existing links. The page is now an explainer: <strong>AI detector verdicts are unreliable</strong>, and the useful question is how to turn a rough AI-assisted draft into writing that sounds like you.</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">Why detectors are unreliable</h2>
      <p>GPTZero, Turnitin, Originality.ai and ZeroGPT use independently developed, unpublished methods. Perplexity and burstiness are widely discussed heuristics, not verified internal signals. Published data here supports the limits, not a product claim: an earlier undocumented 85–95% impression has been withdrawn as unreproduced; the 2026-11-24 self-check measured 13.3% (4/30) with this site’s own detector, and incomplete third-party spot-checks returned 100% AI on rewrites. None of this validates any detector or tool. See the <a href="/bypass-test-methodology" className="text-violet-600 hover:underline">test methodology</a> and <a href="/limitations" className="text-violet-600 hover:underline">limitations</a> pages.</p>

      <h3 className="text-base font-semibold text-gray-800 pt-1">How to write in your own voice</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Concrete details.</strong> Replace generic claims with specific things you have seen, measured or experienced.</li>
        <li><strong>Your own view.</strong> Say what you think, why you think it, and where you are uncertain. A position is more informative than neutral filler.</li>
        <li><strong>Citations you checked.</strong> Open each source, confirm the (Author, Year) marker, numbers and quoted words, then decide whether the source really supports the claim. The rewrite prompt asks the model to keep them; check them yourself.</li>
        <li><strong>Read it aloud.</strong> Vary sentence length because some ideas need a short sentence and others need a long one — not because a detector rewards a pattern.</li>
      </ul>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">What this site is</h2>
      <p><strong>AI Humanizer</strong> is a free writing-improvement tool, not a way to manipulate any detector. It runs in the cloud on DeepSeek Chat, supports English and Simplified Chinese, costs nothing, needs no signup, and limits each IP to 5 submissions per rolling 24 hours of up to 3,000 characters. There is no persistent storage, only a 10-minute in-memory cache, and no analytics cookies or tracking pixels. Our <a href="/ai-detector" className="text-violet-600 hover:underline">self-review tool</a> is a prompt-driven heuristic, not a verdict on authorship.</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">Academic integrity comes first</h2>
      <p>Use this to edit work you have the right to submit. No tool makes someone else’s work legitimate, and rules on AI assistance vary by institution — check yours. Our <a href="/citation-policy" className="text-violet-600 hover:underline">citation policy</a> explains how to credit a writing aid.</p>
    </div>
  )

  return (
    <>
      <BreadcrumbJsonLd slug="/bypass-ai" lang="en" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {seoBodyEn}
      <p className="text-xs text-gray-400 mt-4">Last reviewed: 2026-11-24</p>
      <ToolClient mode="turnitin" lang={lang} i18n={turnitinI18n}
      heroTitle={{ zh: 'AI 检测器为什么不可靠 — 写作建议', en: 'Why AI Detectors Are Unreliable — Writing Guidance' }} heroSubtitle={{ zh: '把具体的细节、自己的观点和亲自核对的引用写进草稿。AI Humanizer 是免费的写作改进工具，不承诺任何检测结果；无需注册。', en: 'Write with concrete details, your own point of view, and citations you have checked. AI Humanizer is a free writing-improvement tool with no detector promise. No signup.' }}
    />
    </>
  )
}