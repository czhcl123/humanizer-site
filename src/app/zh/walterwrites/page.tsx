import type { Metadata } from 'next'
import { languageAlternates, pageUrl } from '@/lib/site'
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd'
import ToolClient from '../../../components/Tool/ToolClient'
import { walterwritesI18n } from '../../../components/Tool/i18n/walterwrites'
import WalterSeoZh, { walterFaqSchemaZh } from '../../../components/Tool/WalterSeoZh'

/** This route tree is Chinese; the language is a compile-time constant. */
const lang = 'zh' as const

export async function generateMetadata(): Promise<Metadata> {
    const titles = {
    zh: 'Walter Writes AI 免费替代方案',
    en: 'Walter Writes AI: Free Alternative & Pricing',
  }
  const descriptions = {
    zh: 'Walter Writes AI 是订阅制商业产品，价格以官网为准；本站提供免费免注册的同风格替代方案，逐项说明差异。',
    en: 'Walter Writes AI is a paid commercial product; check its official site for pricing. AI Humanizer offers a free, no-signup alternative in a similar style.'
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
    alternates: { canonical: pageUrl('/walterwrites', 'zh'), languages: languageAlternates('/walterwrites') },
  }
}

export default async function WalterPage() {
  return (
    <>
      <BreadcrumbJsonLd slug="/walterwrites" lang="zh" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(walterFaqSchemaZh) }} />
      <ToolClient mode="walterwrites" lang="zh" i18n={walterwritesI18n}
      heroTitle={{ zh: 'Walter Writes AI 免费替代方案' }} heroSubtitle={{ zh: 'Walter Writes AI 是订阅制产品，价格以官网为准。本站 AI Humanizer 100% 免费、无需注册，仅支持英文和简体中文，改写由 DeepSeek 云端处理，结果非保证。' }}
    />
      <WalterSeoZh />
      <p className="text-xs text-gray-400 mt-4">最近核校：2026-11-24</p>
    </>
  )
}
