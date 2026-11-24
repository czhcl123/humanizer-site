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
    { '@type': 'Question', name: 'What is academic writing assistance for?', acceptedAnswer: { '@type': 'Answer', text: 'It helps you express an argument clearly, keep your structure legible and check that citations support the claims around them. It is not a way to change a detector’s verdict, and no tool can establish authorship.' } },
    { '@type': 'Question', name: 'How do I write a clearer academic paragraph?', acceptedAnswer: { '@type': 'Answer', text: 'Open with a claim, follow with evidence you understand, explain how the evidence supports the claim, and state any limit. Replace template phrases with an explanation of what you actually mean.' } },
    { '@type': 'Question', name: 'Are citations and references preserved?', acceptedAnswer: { '@type': 'Answer', text: 'The prompt asks the model to preserve (Author, Year) citations, quoted material, numbers, dates and proper nouns while rewriting the surrounding prose. LLM output is not post-processed: verify every marker and quotation against the source yourself. See /citation-policy.' } },
    { '@type': 'Question', name: 'Why are Turnitin AI scores unreliable?', acceptedAnswer: { '@type': 'Answer', text: 'Turnitin’s method is not public, and widely discussed heuristics such as perplexity and burstiness are not verified internal signals. Published numbers here document limits only: an earlier undocumented 85–95% impression has been withdrawn as unreproduced; the 2026-11-24 self-check measured 13.3% (4/30) with this site’s own detector; incomplete third-party spot-checks returned 100% AI on rewrites. These are not product claims.' } },
    { '@type': 'Question', name: 'Is using a writing aid allowed at my school?', acceptedAnswer: { '@type': 'Answer', text: 'Rules differ by institution. Editing a draft you wrote yourself is different from submitting work produced by someone else. Check your academic integrity policy before submitting, and credit tools as your policy requires.' } },
    { '@type': 'Question', name: 'What does AI Humanizer cost and does it store my essay?', acceptedAnswer: { '@type': 'Answer', text: '100% free, no signup: 5 submissions per IP per rolling 24 hours, 3,000 characters each, English and Simplified Chinese. No persistent storage; a short-lived in-memory cache may retain a hash of the input and the output for up to 10 minutes. See /privacy.' } },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  const titles = {
    zh: '学术写作辅助：清晰表达 + 引用保留（人工核对）',
    en: 'Academic Writing Help: Clear Prose + Checked Citations',
  }
  const descriptions = {
    zh: '免费在线写作改进工具：把生硬的 AI 辅助草稿改得更自然、清晰、更贴合你自己的表达。支持中英双语，无需注册。本页讲学术写作的清晰表达与引用人工核对。',
    en: 'Free academic writing help: clarity, structure and citations you verify. EN / zh-CN, no signup, no detector promise.',
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
    alternates: { canonical: pageUrl('/essay-writer-bypass-turnitin', 'en'), languages: languageAlternates('/essay-writer-bypass-turnitin') },
  }
}

export default async function EssayWriterBypassPage() {

  const seoBodyEn = (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6 text-gray-700 leading-relaxed space-y-3">
      <section className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 border border-violet-100 mb-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Academic writing help: clear prose and checked citations</h1>
        <p className="text-sm text-gray-600 leading-relaxed">This page keeps its old address. It now covers academic writing assistance — clearer expression, legible structure and citations you verify yourself. AI Humanizer makes no detector promise.</p>
      </section>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">Why detector scores are a poor editing guide</h2>
      <p>Turnitin’s AI detection method is not public; perplexity and burstiness are general heuristics widely discussed but not verified internal signals. Detector verdicts are contested and can disagree with each other. The numbers published here are evidence of limits, not a performance claim: an earlier undocumented 85–95% impression has been withdrawn as unreproduced, the 2026-11-24 self-check measured 13.3% (4/30) with this site’s own detector, and incomplete third-party spot-checks returned 100% AI on rewrites. See <a href="/bypass-test-methodology" className="text-violet-600 hover:underline">test methodology</a> and <a href="/limitations" className="text-violet-600 hover:underline">limitations</a>.</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">Clear expression: a working checklist</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>One claim per paragraph.</strong> State it early, then show the evidence and explain the link.</li>
        <li><strong>Concrete details.</strong> Replace broad assertions with the specific study, figure or observation you understand.</li>
        <li><strong>Your own reasoning.</strong> Say why the evidence persuades you and where the argument is still limited.</li>
        <li><strong>Plain language.</strong> Cut template transitions and hedges that do not add meaning; choose sentence length to fit the idea.</li>
      </ul>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">Citation preservation is a request, not a guarantee</h2>
      <p>The conversational prompt asks DeepSeek Chat to keep (Author, Year) markers, quoted passages, numbers, dates and proper nouns while rewriting the surrounding prose. LLM output is not post-processed, so open the source and verify that each citation survived and supports the claim. Our <a href="/citation-policy" className="text-violet-600 hover:underline">citation policy</a> explains how to credit a writing aid. For the general tool, see <a href="/bypass-ai" className="text-violet-600 hover:underline">writing improvement</a>.</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">Before you submit</h2>
      <p>Read the draft aloud, confirm every citation and number, split long papers into sections of up to 3,000 characters when using the tool, and check your institution’s academic integrity policy. Editing your own draft is different from submitting fabricated work. AI Humanizer is 100% free, needs no signup, and does not promise any detector result.</p>
    </div>
  )

  return (
    <>
      <BreadcrumbJsonLd slug="/essay-writer-bypass-turnitin" lang="en" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {seoBodyEn}
      <p className="text-xs text-gray-400 mt-4">Last reviewed: 2026-11-24</p>
      <ToolClient mode="essay" lang={lang} i18n={essayI18n}
      heroTitle={{ zh: '学术写作辅助：清晰表达 + 引用保留（人工核对）', en: 'Academic Writing Help: Clear Prose + Checked Citations' }} heroSubtitle={{ zh: '每段一个主张，具体证据加自己的判断。提示词要求保留引用与数字，请人工核对；本站免费、无需注册，不承诺任何检测结果。', en: 'One claim per paragraph, concrete evidence, and your own reasoning. The prompt asks to keep citations and numbers; check them yourself. Free, no signup, no detector promise.' }}
    />
    </>
  )
}
