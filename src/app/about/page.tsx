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

export default async function AboutPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const sp = await searchParams
  const lang = sp.lang === 'zh' ? 'zh' : 'en'
  return <AboutClient initialLang={lang} />
}