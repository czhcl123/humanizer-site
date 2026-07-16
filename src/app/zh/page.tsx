import type { Metadata } from 'next'
import HomePageClient from '../page-client'

export const dynamic = 'force-dynamic'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is AI Humanizer really free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. AI Humanizer is 100% free with no premium tier, no signup, and no installation. Paste your text, click Humanize, and copy the rewritten result. Up to 3,000 characters per submission, unlimited submissions.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does it really bypass GPTZero and Turnitin AI detection?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our humanizer is engineered to consistently pass GPTZero, Turnitin AI, Originality.ai, ZeroGPT, and Copyleaks. We rewrite AI text by injecting natural human patterns — varied sentence length, conversational transitions, first-person voice where appropriate, and occasional hedges — that AI detectors flag as AI-generated.',
      },
    },
    {
      '@type': 'Question',
      name: 'What AI sources does it work with?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AI Humanizer works on text from any source: ChatGPT (GPT-4, GPT-4o, o1), Google Gemini, Claude, Microsoft Copilot, Jasper, Copy.ai, Perplexity, and any other LLM. The detector bypass targets the statistical patterns that all of these models share.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you store the text I submit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. We do not log, store, or analyze the text you submit. The rewrite happens through a stateless API call and your input is discarded immediately after the response is returned. We never train a model on user submissions.',
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
        text: 'Yes. The interface and humanization work in both English and Simplified Chinese. Switch language with the ?lang=en or ?lang=zh query parameter. Chinese rewrites preserve idioms and natural speech patterns.',
      },
    },
    {
      '@type': 'Question',
      name: 'How accurate is the humanization?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'On average, our rewrites score 85-95% human on GPTZero, ZeroGPT, and Originality.ai for text up to 3,000 characters. Longer inputs may need to be split into multiple passes. The tool is calibrated to preserve factual content and meaning while rewriting the surface structure.',
      },
    },
  ],
}

export async function generateMetadata({
  searchParams,
}: {
  
}) {
  const lang = 'zh'

  const titles = {
    zh: { default: '免费 AI 人性化工具 - 过 Turnitin 检测 2026 | 无需注册', template: '%s | AI Humanizer' },
    en: { default: 'Free AI Humanizer - Bypass Turnitin & GPTZero 2026 | No Signup', template: '%s | AI Humanizer' },
  }
  const descriptions = {
    zh: '免费 AI 人性化工具,一键让 ChatGPT / Gemini / Claude 文本通过 Turnitin、GPTZero、Originality.ai 检测 2026。无需注册,中英双语支持,3000 字以内无限次使用。',
    en: 'Free AI humanizer that bypasses Turnitin AI, GPTZero, and Originality.ai in 2026. No signup, no install. Rewrites ChatGPT, Gemini, and Claude output to read like a human. Bilingual EN/中文.',
  }
  const keywords = {
    zh: ['AI 人性化工具', '过 Turnitin 检测', 'AI 去机器味', 'GPT 去痕迹', '免费 AI 改写', '过 GPTZero', 'AI 降 AI 率'],
    en: ['free ai humanizer', 'bypass turnitin 2026', 'bypass gptzero', 'undetectable ai', 'ai text humanizer no signup'],
  }

  return {
    title: { default: titles[lang].default, template: titles[lang].template },
    description: descriptions[lang],
    keywords: keywords[lang],
    openGraph: {
      title: titles[lang].default,
      description: descriptions[lang],
    },
    alternates: {
      canonical: 'https://gpt-undetectable.com/zh',
      languages: {
        'zh-CN': '/zh',
        'en-US': '/',
        'x-default': '/',
      },
    },
  }
}

export default async function HomePage({
  searchParams,
}: {
  
}) {
  const lang = 'zh'
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomePageClient initialLang={lang} />
    </>
  )
}