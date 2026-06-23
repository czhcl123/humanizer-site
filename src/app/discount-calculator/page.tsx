import type { Metadata } from 'next'
import DiscountCalculatorClient from './discount-client'

export const metadata: Metadata = {
  title: '折扣计算器',
  description: '输入商品原价和折扣力度，快速计算折后价和节省金额。支持1-99折各种折扣场景。',
  openGraph: {
    title: '折扣计算器 - 实用计算器',
    description: '输入商品原价和折扣力度，快速计算折后价和节省金额',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '折扣计算器是什么？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '折扣计算器是一款在线工具，可以根据商品原价和折扣力度，自动计算出折后价格和节省的金额，帮助您快速判断是否值得购买。',
      },
    },
    {
      '@type': 'Question',
      name: '如何计算折后价？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '折后价 = 原价 × (1 - 折扣 ÷ 100)。例如原价100元打8折，折后价为 100 × 0.8 = 80元，节省20元。',
      },
    },
    {
      '@type': 'Question',
      name: '支持哪些折扣形式？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '支持1折到99折各种折扣场景，包括满减优惠叠加、限时折扣计算等。输入1-99的数字即可计算。',
      },
    },
  ],
}

export default async function DiscountCalculatorPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const sp = await searchParams
  const lang = (sp.lang === 'en' ? 'en' : 'zh') as 'zh' | 'en'
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <DiscountCalculatorClient initialLang={lang} />
    </>
  )
}