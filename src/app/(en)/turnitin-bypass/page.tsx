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
    { '@type': 'Question', name: 'What is Turnitin’s AI detector?', acceptedAnswer: { '@type': 'Answer', text: 'A product that estimates whether text was written with AI assistance. Its detection method is not public. A score is an estimate, not proof of authorship or of an academic integrity violation.' } },
    { '@type': 'Question', name: 'Why are Turnitin AI scores unreliable?', acceptedAnswer: { '@type': 'Answer', text: 'Perplexity and burstiness are widely discussed heuristics, not verified internal signals. Verdicts are contested and can disagree with other detectors. Published numbers here are evidence of limits only: an earlier undocumented 85–95% impression has been withdrawn as unreproduced; the 2026-11-24 self-check measured 13.3% (4/30) with this site’s own detector, and incomplete third-party spot-checks returned 100% AI on rewrites. No third-party detector result has been verified.' } },
    { '@type': 'Question', name: 'How do I write an academic draft in my own voice?', acceptedAnswer: { '@type': 'Answer', text: 'Start with a clear claim, support it with concrete details you understand, say where your own judgment is still provisional, and remove template phrasing that does not say anything. Read the result aloud and keep the sentences you would actually write.' } },
    { '@type': 'Question', name: 'How should I handle citations in an AI-assisted draft?', acceptedAnswer: { '@type': 'Answer', text: 'Open every source yourself. The rewrite prompt asks the model to keep (Author, Year) markers, numbers, dates, quoted material and proper nouns, but LLM output is not post-processed: verify that each citation survived and that the source supports the claim. See /citation-policy.' } },
    { '@type': 'Question', name: 'Does AI Humanizer make any promise about Turnitin?', acceptedAnswer: { '@type': 'Answer', text: 'No. It is a free writing-improvement tool with no detector-specific tuning, no reverse engineering and no guaranteed output. It is not connected to Turnitin.' } },
    { '@type': 'Question', name: 'Is using a writing aid allowed?', acceptedAnswer: { '@type': 'Answer', text: 'Policies vary by institution. Editing work you wrote yourself is different from submitting work someone else produced. Check your school’s academic integrity rules before submitting.' } },
    { '@type': 'Question', name: 'What does it cost and do you store my essay?', acceptedAnswer: { '@type': 'Answer', text: '100% free, no signup: 5 submissions per IP per rolling 24 hours, 3,000 characters each, English and Simplified Chinese. No persistent storage; a short-lived in-memory cache may retain a hash of the input and the output for up to 10 minutes. See /privacy.' } },
  ],
}

export async function generateMetadata() {
  const titles = {
    zh: 'Turnitin AI 分数为什么不可靠 — 学术写作建议',
    en: 'Why Turnitin AI Scores Are Unreliable — Writing Guidance',
  }
  const descriptions = {
    zh: '免费在线写作改进工具：把生硬的 AI 辅助草稿改得更自然、清晰、更贴合你自己的表达。支持中英双语，无需注册。本页说明 Turnitin 分数的局限与学术写作建议。',
    en: 'Free writing tool: Turnitin score limits, clear academic prose and checked citations. EN / zh-CN, no signup.',
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
    alternates: { canonical: pageUrl('/turnitin-bypass', 'en'), languages: languageAlternates('/turnitin-bypass') },
  }
}

export default async function TurnitinPage() {

  const seoBodyEn = (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6 text-gray-700 leading-relaxed space-y-3">
      <section className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 border border-violet-100 mb-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Why Turnitin AI scores are unreliable</h1>
        <p className="text-sm text-gray-600 leading-relaxed">An academic writing guide: clear prose, your own point of view, and citations you have checked. AI Humanizer is free, needs no signup, and makes no promise about any detector.</p>
      </section>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">A score is an estimate, not a verdict</h2>
      <p>Turnitin is widely used, but its AI detection method is not public. Perplexity (how predictable a word is) and burstiness (how much sentence length varies) are general heuristics discussed in public, not verified internal signals. Detector verdicts are unreliable and contested; a score cannot establish who wrote a paragraph. The data published here is presented as a limitation: an earlier undocumented 85–95% impression has been withdrawn as unreproduced, the 2026-11-24 self-check measured 13.3% (4/30) with this site’s own detector, and incomplete third-party spot-checks returned 100% AI on rewrites. See <a href="/bypass-test-methodology" className="text-violet-600 hover:underline">test methodology</a> and <a href="/limitations" className="text-violet-600 hover:underline">limitations</a>.</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">Academic writing that reads like yours</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Say something specific.</strong> Replace broad claims with the evidence, example or measurement you actually know.</li>
        <li><strong>Take a position.</strong> Explain why a source persuaded you, and where you think the argument is still weak.</li>
        <li><strong>Make the structure legible.</strong> One claim per paragraph, plain transitions, sentences of the length the idea needs.</li>
        <li><strong>Keep the reader in mind.</strong> If a sentence sounds like a template, rewrite it for the reader rather than for any score.</li>
      </ul>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">Citations: request, then verify</h2>
      <p>The prompt asks the model to preserve (Author, Year) citations, quoted material, numbers, dates and proper nouns while rewriting the surrounding prose. LLM output is not post-processed, so check every marker against your source yourself. Our <a href="/citation-policy" className="text-violet-600 hover:underline">citation policy</a> describes how to credit a writing aid. For a fuller academic-writing walkthrough, see <a href="/essay-writer-bypass-turnitin" className="text-violet-600 hover:underline">academic writing help</a>.</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">What AI Humanizer does</h2>
      <p>It is a free writing-improvement tool: 100% free, no signup, 5 submissions per IP per rolling 24 hours, 3,000 characters each, English and Simplified Chinese, cloud-processed with DeepSeek Chat. No persistent storage; a 10-minute in-memory cache of up to 500 entries; no analytics cookies or tracking pixels. It has no connection to Turnitin and does not promise any detector outcome. Check your institution’s academic integrity rules before submitting.</p>
    </div>
  )

  return (
    <>
      <BreadcrumbJsonLd slug="/turnitin-bypass" lang="en" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {seoBodyEn}
      <p className="text-xs text-gray-400 mt-4">Last reviewed: 2026-11-24</p>
      <ToolClient mode="turnitin" lang={lang} i18n={turnitinI18n} />
    </>
  )
}