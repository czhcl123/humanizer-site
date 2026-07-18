import type { Metadata } from 'next'
import AboutClient from './about-client'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const sp = await searchParams
  const lang = sp.lang === 'zh' ? 'zh' : 'en'
  const titles = {
    zh: '关于我们 - AI Humanizer',
    en: 'About - AI Humanizer',
  }
  const descriptions = {
    zh: 'AI Humanizer 致力于做出能通过最严格 AI 检测器的改写工具。了解我们的方法、目标、局限。',
    en: 'AI Humanizer builds the most reliable AI text humanizer. Learn about our methodology, goals, and limitations.',
  }
  return {
    title: titles[lang],
    description: descriptions[lang],
    alternates: {
      canonical: 'https://gpt-undetectable.com/about',
      languages: {
        'zh-CN': '/zh/about',
        'en-US': '/about',
        'x-default': '/about',
      },
    },
  }
}

const faqSchemaZh = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'AI Humanizer 是什么?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AI Humanizer 是一套在线 AI 文本改写工具,涵盖主改写器、论⽂改写器、Turnitin 绕过器、Walter Writes 风格改写器、AI 检测器、中文降 AI 率工具 6 个页面。所有数据本地处理 + API 调用,免费、无需注册、无追踪。',
      },
    },
    {
      '@type': 'Question',
      name: '为什么你的工具有 6 个不同页面?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '不同场景需要不同的改写策略:论⽂要保留引用,Turnitin 要打破句子级别 perplexity,Walter Writes 要改写口语风格,中文降 AI 率要绕过 AIGC 检测。每个工具调用不同 system prompt 提示词,优化特定检测器。',
      },
    },
    {
      '@type': 'Question',
      name: '你们能通过所有 AI 检测器吗?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '不能保证 100% 通过所有检测器。GPTZero / Turnitin / Originality.ai 都在不断更新算法。本工具以 85-95% 的人类改写质量为设计目标,不代表学生可以拿去作为 100% 可提交代写。学术诚信是用户的责任。',
      },
    },
    {
      '@type': 'Question',
      name: 'AI Humanizer 是免费的吗?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '免费、无需注册、无水印、无追踪。唯一的限制是每次提交 3,000 字符上限。点击首页输入框即可使用。',
      },
    },
  ],
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
        text: 'AI Humanizer is a free online suite of six AI text rewriting tools: main humanizer, essay rewriter, Turnitin bypass, Walter Writes style rewriter, AI detector, and Chinese AIGC reducer. All tools are free, no signup, no tracking, browser-only.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why six different tools instead of one?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Each scenario needs a different rewriting strategy: essays preserve citations, Turnitin bypass breaks sentence-level perplexity, Walter Writes mimics conversational style, Chinese AIGC reducer evades CNKI AIGC detection. Each tool calls a different custom-engineered system prompt.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you guarantee passing every AI detector?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No tool can guarantee 100% pass rates. GPTZero, Turnitin, and Originality.ai continuously update their algorithms. Our tools target 85-95% pass rates on tested samples, not 100%. Academic integrity remains the user\'s responsibility.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is AI Humanizer free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — free, no signup, no watermark, no tracking. The only limit is a 3,000-character cap per submission. Use any tool from the homepage without an account.',
      },
    },
  ],
}

export default async function AboutPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const sp = await searchParams
  const lang = sp.lang === 'zh' ? 'zh' : 'en'
  const faqSchema = lang === 'zh' ? faqSchemaZh : faqSchemaEn
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AboutClient initialLang={lang} />
    </>
  )
}