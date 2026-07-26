import type { Metadata } from 'next'
import AboutClient from '../../about/about-client'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  searchParams,
}: {
  
}) {
  const lang = 'zh'
  const titles = {
    zh: '关于我们 - AI Humanizer 方法与目标',
    en: 'About - AI Humanizer Method & Goals',
  }
  const descriptions = {
    zh: 'AI Humanizer 致力于做出能通过最严格 AI 检测器的改写工具。了解我们的方法、目标、局限。',
    en: 'AI Humanizer builds the most reliable AI text humanizer. Learn about our methodology, goals, and limitations.',
  }
  return {
    title: titles[lang],
    description: descriptions[lang],
    openGraph: {
      title: titles[lang],
      description: descriptions[lang],
      images: [{ url: 'https://gpt-undetectable.com/og-image.svg', width: 1200, height: 630, alt: titles[lang] }],
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[lang],
      description: descriptions[lang],
      images: ['https://gpt-undetectable.com/og-image.svg'],
    },
    alternates: {
      canonical: 'https://gpt-undetectable.com/zh/about',
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
  
}) {
  const lang = 'zh'
  return <AboutClient initialLang={lang} />
}