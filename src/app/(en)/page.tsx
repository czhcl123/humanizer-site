import type { Metadata } from 'next'
import { languageAlternates, pageUrl } from '@/lib/site'
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd'
import HomeClient from '@/components/HomeClient'

/** This route tree is English; the language is a compile-time constant. */
const lang = 'en' as const

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is AI Humanizer really free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AI Humanizer is 100% free: no paid tier, no signup, and no installation. Paste your text, click Humanize, and copy the rewritten result. Limit: 5 submissions per IP per rolling 24 hours, up to 3,000 characters each.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can it help with detector scores?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. AI Humanizer is a writing improvement tool, not a way to manipulate detectors. Detector verdicts are unreliable and contested. As evidence of those limits, an undocumented early impression of roughly 85–95% was withdrawn after a published self-check pilot on 2026-11-24 measured 13.3% (4/30) with this site\'s own detector; third-party spot-checks are incomplete and are not a product claim.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the best AI humanizer in 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A good writing tool makes rough drafts clearer, more natural and easier to make your own. AI Humanizer works with text from ChatGPT, Gemini and Claude, is 100% free with no signup, and supports English and Simplified Chinese only. Detector scores are not a measure of writing quality.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you humanize AI text?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Paste your rough ChatGPT or Claude draft into AI Humanizer. The prompt asks DeepSeek Chat to improve clarity, tone and flow while keeping your meaning; check names, numbers and citations yourself. No signup or installation required.',
      },
    },
    {
      '@type': 'Question',
      name: 'What AI sources does it work with?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AI Humanizer works on drafts from any source: ChatGPT (GPT-4, GPT-4o, o1), Google Gemini, Claude, Microsoft Copilot, Jasper, Copy.ai, Perplexity, and other LLMs. It improves the writing itself; it does not target detector patterns.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you store the text I submit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No persistent storage: a short-lived in-memory cache may retain a hash of the input and the output for up to 10 minutes. We do not use analytics cookies or tracking pixels, and we never train a model on user submissions. See our privacy page at /privacy for details.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use it for school essays?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Many students use AI Humanizer to rewrite drafts, fix awkward phrasing, or add personal voice to first drafts. You are responsible for following your school academic integrity policy. The tool does not help with plagiarism; it helps you rewrite text you have permission to use.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does it support Chinese?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The interface and rewriting work in both English and Simplified Chinese. English is the default; visit /zh/ for the Chinese version. The prompt asks for natural wording in either language; review the result yourself.',
      },
    },
    {
      '@type': 'Question',
      name: 'What do the published tests show?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'They show why detector scores are not reliable: an undocumented early impression of 85–95% was withdrawn after a 2026-11-24 self-check pilot measured 13.3% (4/30) with this site\'s own detector, and third-party spot-checks are incomplete. These are limits of detector evidence, not product performance. Text over 3,000 characters must be split. See /bypass-test-methodology and /limitations.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there a free AI humanizer with no signup required?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. AI Humanizer is fully free with no signup, no email, no credit card. You get 5 submissions per IP per rolling 24 hours, each up to 3,000 characters. No persistent storage; a short-lived in-memory cache may retain a hash of the input and the output for up to 10 minutes, and we never train on user inputs. Our self-review tool is a prompt-driven heuristic, not an API connection to any third-party detector.',
      },
    },
    {
      '@type': 'Question',
      name: "What's the best free AI humanizer for college students?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For college students, a useful writing aid asks the model to keep citation markers such as (Smith, 2019) and footnotes, a formal scholarly register, and your own voice — then you verify every citation yourself. AI Humanizer is free and needs no signup. A short reflection may need light editing; a research paper or literature review needs a careful read-through. Detector outcomes are not a measure of quality.',
      },
    },
  ],
}

export async function generateMetadata() {

  const titles = {
    zh: { default: 'AI Humanizer — 免费 AI 文本改写工具', template: '%s | AI Humanizer' },
    en: { default: 'AI Humanizer — Free Writing Improvement Tool (EN / 中文)', template: '%s | AI Humanizer' },
  }
  const descriptions = {
    zh: '免费 AI 文本改写器,处理 ChatGPT / Gemini / Claude 输出。支持英文和简体中文,3000 字/次,每 IP 每天 5 次,无需注册;检测结果不作保证。',
    en: 'Free online writing tool that makes rough AI-assisted drafts clearer, more natural, and easier to make your own. English and Simplified Chinese. No signup.',
  }
  const keywords = {
    zh: ['AI Humanizer', '写作改进工具', 'AI 辅助草稿改写', '中文写作润色', '英文写作润色', '免费写作工具', '自然语言改写'],
    en: ['AI Humanizer', 'free AI humanizer', 'humanize AI text', 'AI writing improvement', 'writing improvement tool', 'essay writing improvement', 'improve AI-assisted drafts', 'natural rewrite', 'English and Chinese writing'],
  }

  return {
    title: { default: titles[lang].default, template: titles[lang].template },
    description: descriptions[lang],
    keywords: keywords[lang],
    openGraph: {
      title: titles[lang].default,
      description: descriptions[lang],
      images: [{ url: 'https://gpt-undetectable.com/og-image.png', width: 1200, height: 630, alt: titles[lang].default }],
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[lang].default,
      description: descriptions[lang],
      images: ['https://gpt-undetectable.com/og-image.png'],
    },
    alternates: { canonical: pageUrl('', 'en'), languages: languageAlternates('') },
  }
}

export default async function HomePage() {
  return (
    <>
      <BreadcrumbJsonLd slug="" lang="en" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomeClient lang={lang} />
      <p className="text-xs text-gray-400 mt-4">Last reviewed: 2026-11-24</p>
    </>
  )
}