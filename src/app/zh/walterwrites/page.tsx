import type { Metadata } from 'next'
import ToolClient from '../../../components/Tool/ToolClient'
import { walterwritesI18n } from '../../../components/Tool/i18n/walterwrites'
import WalterSeoZh, { walterFaqSchemaZh } from '../../../components/Tool/WalterSeoZh'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const lang = 'zh'
  const titles = {
    zh: 'Walter Writes AI 价格、免费替代与实测',
    en: 'Walter Writes AI: Free Alternative & Pricing',
  }
  const descriptions = {
    zh: 'Walter Writes AI 实测:月付 $8 起、免费 300 词试用、内置检测器;附免费免注册的同风格替代方案与逐项对比。',
    en: 'Walter Writes AI, tested: $8/mo Starter, free 300-word trial, built-in detector — plus a free, no-signup alternative that writes in the same style.',
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
    alternates: {
      canonical: 'https://gpt-undetectable.com/zh/walterwrites',
      languages: {
        'zh-CN': '/zh/walterwrites',
        'en-US': '/walterwrites',
        'x-default': '/walterwrites',
      },
    },
  }
}

export default async function WalterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(walterFaqSchemaZh) }} />
      <ToolClient mode="walterwrites" initialLang="zh" i18n={walterwritesI18n} />
      <WalterSeoZh />
    </>
  )
}
