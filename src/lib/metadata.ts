import type { Metadata } from 'next'
import { SITE_URL, SITE_NAME, SITE_LOCALE, type Lang } from './site'

const copy: Record<Lang, { title: string; description: string; keywords: string[]; ogTitle: string; ogDescription: string }> = {
  en: {
    title: 'Free AI Writing Improvement Tool — EN & 简体中文 | No Signup',
    description:
      'Free online writing tool that makes rough AI-assisted drafts clearer, more natural, and easier to make your own. English and Simplified Chinese. No signup.',
    keywords: [
      'AI Humanizer',
      'free AI humanizer',
      'humanize AI text',
      'AI writing improvement',
      'writing improvement tool',
      'essay writing improvement',
      'Chinese writing improvement',
      'AI text self-review',
      'no signup writing tool',
    ],
    ogTitle: 'Free AI Writing Improvement Tool — EN & 简体中文',
    ogDescription:
      'Free online writing tool that makes rough AI-assisted drafts clearer, more natural, and easier to make your own. English and Simplified Chinese. No signup.',
  },
  zh: {
    title: '免费在线写作改进工具 — 中英双语',
    description:
      '免费在线写作改进工具：把生硬的 AI 辅助草稿改得更自然、清晰、更贴合你自己的表达。支持中英双语，无需注册。',
    keywords: ['AI Humanizer', '免费 AI Humanizer', 'AI 文本改写', '写作改进工具', 'AI 辅助草稿改写', '论文写作改进', '中文写作改进', '中英双语写作', 'AI 文本自查', '免费写作工具 无需注册'],
    ogTitle: '免费在线写作改进工具',
    ogDescription: '免费在线写作改进工具：把生硬的 AI 辅助草稿改得更自然、清晰、更贴合你自己的表达。支持中英双语，无需注册。',
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
