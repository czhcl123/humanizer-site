import type { Metadata } from 'next'
import { languageAlternates, pageUrl } from '@/lib/site'
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd'
import AboutClient from '@/components/AboutClient'

/** This route tree is English; the language is a compile-time constant. */
const lang = 'en' as const

export async function generateMetadata() {
  const titles = {
    zh: '关于我们',
    en: 'About',
  }
  const descriptions = {
    zh: 'AI Humanizer 帮助把生硬的 AI 辅助草稿改得更自然、清晰。了解我们的方法、目标与局限。',
    en: 'AI Humanizer helps make rough AI-assisted drafts clearer and more natural. Learn about our mission, goals, and limitations.',
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
    alternates: { canonical: pageUrl('/about', 'en'), languages: languageAlternates('/about') },
  }
}

const faqSchemaEn = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is AI Humanizer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AI Humanizer is a free online writing improvement tool: a draft rewriter, essay rewriter, style rewriter, Chinese text editor and a heuristic self-review tool. Everything is 100% free with no signup. Rewrites and self-review are processed in the cloud via the DeepSeek Chat (deepseek-chat) API, not locally.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why six different tools instead of one?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Each scenario uses a different prompt: essays ask the model to keep citations, style rewriters adjust tone and rhythm, and the Chinese tool works on Chinese academic prose. All are prompt-driven rewrites through DeepSeek Chat; there is no direct connection to any third-party detector API. Always check the output yourself.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you promise detector outcomes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Detector verdicts are unreliable and contested, and this site is not a way to manipulate them. An early unverified impression (85–95%) was withdrawn after a published self-check measured 13.3% (4/30) on 2026-11-24; third-party spot-checks are incomplete. These are limitations, not a product claim. Academic integrity remains the user\'s responsibility.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is AI Humanizer free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — 100% free, no signup, no watermark, no analytics tracking. The limits are 5 submissions per IP per rolling 24 hours and up to 3,000 characters per submission. Use any tool from the homepage without an account.',
      },
    },
  ],
}

export default async function AboutPage() {
  const faqSchema = faqSchemaEn
  return (
    <>
      <BreadcrumbJsonLd slug="/about" lang="en" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <section className="max-w-3xl mx-auto px-4 pb-2 text-sm text-gray-600 leading-relaxed">
        <h2 className="text-lg font-bold text-gray-800 mb-2">Founder &amp; contact</h2>
        <p>AI Humanizer is built and maintained by <strong className="text-gray-800">czhcl123</strong> (Solo Founder). Questions and feedback: <a href="mailto:contact@gpt-undetectable.com" className="text-violet-600 hover:underline">contact@gpt-undetectable.com</a>. Source code: <a href="https://github.com/czhcl123/humanizer-site" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">github.com/czhcl123/humanizer-site</a>.</p>
      </section>
      <section className="max-w-3xl mx-auto px-4 pb-2 text-sm text-gray-600 leading-relaxed space-y-2">
        <h2 className="text-lg font-bold text-gray-800">What changed on 2026-11-24</h2>
        <p>
          Published tests showed that detector scores are unreliable: our early 85–95% impression
          was not reproduced, and third-party spot-checks are incomplete. We therefore repositioned
          AI Humanizer around writing quality — making rough drafts clearer, more natural and easier
          to make your own — instead of making claims about detectors.
        </p>
      </section>
      <AboutClient lang={lang} />
      <p className="text-xs text-gray-400 mt-4">Last reviewed: 2026-11-24</p>
    </>
  )
}