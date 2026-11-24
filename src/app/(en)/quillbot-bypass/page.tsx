import type { Metadata } from 'next'
import { languageAlternates, pageUrl } from '@/lib/site'
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd'
import ToolClient from '../../../components/Tool/ToolClient'
import { essayI18n } from '../../../components/Tool/i18n/essay'

/** This route tree is English; the language is a compile-time constant. */
const lang = 'en' as const

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is QuillBot?', acceptedAnswer: { '@type': 'Answer', text: 'A general-purpose paraphrasing product. It can suggest different wording, but a word swap does not add detail, a point of view or checked sources. We have no controlled comparison with any detector and make no claim about how its output is scored.' } },
    { '@type': 'Question', name: 'Why do AI detector scores stay unreliable after paraphrasing?', acceptedAnswer: { '@type': 'Answer', text: 'Detectors use different, unpublished methods; widely discussed signals such as perplexity and burstiness are general heuristics, not verified internal algorithms. Changing words does not settle an authorship question. The data published here documents limits only: an earlier undocumented 85–95% impression has been withdrawn as unreproduced; the 2026-11-24 self-check measured 13.3% (4/30) with this site’s own detector; incomplete third-party spot-checks returned 100% AI on rewrites.' } },
    { '@type': 'Question', name: 'How do I make a paraphrased draft sound like me?', acceptedAnswer: { '@type': 'Answer', text: 'Go past wording: add concrete details you can verify, state your own judgment, explain why a source supports a claim, and check every citation, number and quotation yourself. Read the result aloud and keep the sentences you would actually write.' } },
    { '@type': 'Question', name: 'Does AI Humanizer target QuillBot or any detector?', acceptedAnswer: { '@type': 'Answer', text: 'No. It is a free writing-improvement tool using a general conversational prompt. No detector-specific tuning, no reverse engineering and no guaranteed output. Its purpose is clearer, more natural prose.' } },
    { '@type': 'Question', name: 'What does it cost and are citations preserved?', acceptedAnswer: { '@type': 'Answer', text: '100% free, no signup: 5 submissions per IP per rolling 24 hours, 3,000 characters each, English and Simplified Chinese. The prompt asks the model to preserve citations, numbers and proper nouns; verify manually because LLM output is not post-processed. See /privacy.' } },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  const titles = {
    zh: 'QuillBot 改写之后：检测器为什么不可靠 — 写作建议',
    en: 'After QuillBot: Why AI Detectors Are Unreliable',
  }
  const descriptions = {
    zh: '免费在线写作改进工具：把生硬的 AI 辅助草稿改得更自然、清晰、更贴合你自己的表达。支持中英双语，无需注册。本页说明换词与写出自己声音的区别。',
    en: 'Free writing tool: why word swaps do not fix a draft and how to write in your own voice. EN / zh-CN, no signup.',
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
    alternates: { canonical: pageUrl('/quillbot-bypass', 'en'), languages: languageAlternates('/quillbot-bypass') },
  }
}

export default async function QuillbotBypassPage() {

  const seoBodyEn = (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6 text-gray-700 leading-relaxed space-y-3">
      <p>People often paste a draft into <strong>QuillBot</strong> and expect different wording to settle a detector score. This page keeps its address for existing links, but the point now is simpler: <strong>detector verdicts are unreliable</strong>, and a paraphrase does not make a draft yours.</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">Why a score is not a measure of authorship</h2>
      <p>QuillBot is a general paraphraser; we have no controlled comparison with GPTZero, Turnitin or Originality.ai and cannot say how any output will be scored. Those detectors use unpublished methods, and the perplexity and burstiness often discussed in public are broad heuristics rather than verified internal signals. Published numbers here are evidence of limits: an earlier undocumented 85–95% impression has been withdrawn as unreproduced, the 2026-11-24 self-check measured 13.3% (4/30) with this site’s own detector, and incomplete third-party spot-checks returned 100% AI on rewrites. See <a href="/bypass-test-methodology" className="text-violet-600 hover:underline">test methodology</a> and <a href="/limitations" className="text-violet-600 hover:underline">limitations</a>.</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">From word swaps to your own writing</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Paraphrasing changes wording.</strong> It can make a sentence easier to read, but it cannot supply evidence or a position.</li>
        <li><strong>Your voice changes the substance.</strong> Add the concrete detail you know, say what you conclude and why, and mark what remains uncertain.</li>
        <li><strong>Checked sources change the trustworthiness.</strong> Open each source and verify the (Author, Year) marker, numbers and quoted words yourself. The rewrite prompt asks the model to keep them; it does not verify them.</li>
        <li><strong>The reader is the audience.</strong> Vary rhythm where the idea calls for it, not to chase a score.</li>
      </ul>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">What AI Humanizer is</h2>
      <p>It is a free writing-improvement tool, not a detector product: 100% free, no signup, 5 submissions per IP per rolling 24 hours, 3,000 characters per submission, English and Simplified Chinese, cloud-processed with DeepSeek Chat. No persistent storage; a 10-minute in-memory cache; no analytics cookies or tracking pixels. We make no promise about any detector outcome. For academic writing, see <a href="/essay-writer-bypass-turnitin" className="text-violet-600 hover:underline">academic writing help</a>; for the general tool, see <a href="/bypass-ai" className="text-violet-600 hover:underline">writing improvement</a>.</p>
    </div>
  )

  return (
    <>
      <BreadcrumbJsonLd slug="/quillbot-bypass" lang="en" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {seoBodyEn}
      <p className="text-xs text-gray-400 mt-4">Last reviewed: 2026-11-24</p>
      <ToolClient mode="essay" lang={lang} i18n={essayI18n}
      heroTitle={{ zh: 'QuillBot 改写之后：检测器为什么不可靠 — 写作建议', en: 'After QuillBot: Why AI Detectors Are Unreliable' }} heroSubtitle={{ zh: '换词不等于写出自己的声音。补上具体细节、个人判断，并亲自核对引用。AI Humanizer 免费、无需注册，不承诺任何检测结果。', en: 'A word swap is not your own voice. Add concrete details, your judgment, and citations you checked. AI Humanizer is free, needs no signup, and promises no detector result.' }}
    />
    </>
  )
}
