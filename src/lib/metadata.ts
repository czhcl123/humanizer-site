import type { Metadata } from 'next'
import { SITE_URL, SITE_NAME, SITE_LOCALE, type Lang } from './site'

const copy: Record<Lang, { title: string; description: string; keywords: string[]; ogTitle: string; ogDescription: string }> = {
  en: {
    title: 'Free AI Humanizer - Bypass Turnitin & GPTZero 2026 | No Signup',
    description:
      'Free AI humanizer that bypasses Turnitin AI, GPTZero, and Originality.ai in 2026. No signup, no install. Rewrites ChatGPT, Gemini, and Claude output to read like a human. Bilingual EN/中文.',
    keywords: [
      'free ai humanizer',
      'bypass turnitin 2026',
      'bypass gptzero',
      'undetectable ai',
      'ai text humanizer no signup',
      'humanize chatgpt',
      'turnitin ai bypass',
      'ai 人性化工具',
    ],
    ogTitle: 'Free AI Humanizer - Bypass Turnitin & GPTZero 2026',
    ogDescription:
      'Bypass Turnitin AI, GPTZero, Originality.ai — free, no signup. Rewrites ChatGPT, Gemini, Claude output to read like a human.',
  },
  zh: {
    title: '免费 AI 人性化工具 - 让 AI 文本通过 GPTZero 2026',
    description:
      '免费 AI 人性化工具,把 ChatGPT / Gemini / Claude 的文本改写成像人写的,过 GPTZero、Turnitin AI、Originality.ai 检测。无需注册,中英双语,3000 字/次。',
    keywords: ['AI 人性化工具', '过 Turnitin 检测', 'AI 去机器味', '免费 AI 改写', '过 GPTZero', '降 AI 率'],
    ogTitle: '免费 AI 人性化工具 - 过 GPTZero 与 Turnitin 2026',
    ogDescription: '免费、无需注册的 AI 人性化工具。改写 ChatGPT / Gemini / Claude 文本,过 GPTZero、Turnitin AI、Originality.ai。',
  },
}

/**
 * Root metadata shared by the two root layouts. Every page overrides title,
 * description and canonical; this supplies the defaults, template, social
 * cards, and robots directives exactly once.
 */
export function rootMetadata(lang: Lang): Metadata {
  const t = copy[lang]
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t.title, template: '%s | AI Humanizer' },
    description: t.description,
    keywords: t.keywords,
    applicationName: SITE_NAME,
    openGraph: {
      type: 'website',
      locale: SITE_LOCALE[lang],
      alternateLocale: SITE_LOCALE[lang === 'en' ? 'zh' : 'en'],
      url: lang === 'zh' ? `${SITE_URL}/zh` : SITE_URL,
      siteName: SITE_NAME,
      title: t.ogTitle,
      description: t.ogDescription,
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: t.ogTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.ogTitle,
      description: t.ogDescription,
      images: ['/og-image.png'],
    },
    alternates: {
      canonical: lang === 'zh' ? `${SITE_URL}/zh` : SITE_URL,
      languages: {
        'en-US': SITE_URL,
        'zh-CN': `${SITE_URL}/zh`,
        'x-default': SITE_URL,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}
