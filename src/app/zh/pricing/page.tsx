import type { Metadata } from 'next'
import { languageAlternates, pageUrl } from '@/lib/site'
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd'
import { PricingConfig } from '@/app/(en)/pricing/pricing-data'

/** This route tree is Chinese; the language is a compile-time constant. */
const lang = 'zh' as const

const pricingSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '怎么收费?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AI Humanizer 100% 免费，无付费档。每个 IP 每滚动 24 小时 5 次，每次最多 3000 字符，无需注册。',
      },
    },
    {
      '@type': 'Question',
      name: '免费版是什么?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '免费版：每个 IP 每滚动 24 小时 5 次，每次最多 3000 字符。无需注册、信用卡或安装。',
      },
    },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '定价 — 100% 免费 - AI Humanizer',
    description: 'AI Humanizer 100% 免费，无付费档：每个 IP 每滚动 24 小时 5 次，每次最多 3000 字符，无需注册。',
    alternates: { canonical: pageUrl('/pricing', 'zh'), languages: languageAlternates('/pricing') },
  }
}

export default async function PricingPage() {
    const config = PricingConfig[lang]

  return (
    <>
      <BreadcrumbJsonLd slug="/pricing" lang="zh" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }} />
      <main className="mx-auto w-full max-w-4xl px-4 py-8">
        {/* Hero */}
        <section className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-8 border border-violet-100 shadow-sm mb-6">
          <div className="text-center">
            <div className="text-3xl mb-2">💰</div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">定价 — 100% 免费</h1>
            <p className="text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">{config.heroSubtitle}</p>
          </div>
        </section>

        {/* Free Tier */}
        <section className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">{config.freeTitle}</h2>
            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">{config.freeBadge}</span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed mb-3">{config.freeDesc}</p>
          <ul className="space-y-1.5 text-sm text-gray-500 list-disc pl-5">
            {config.freeFeatures.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        </section>

        <section className="mt-4 text-center">
          <p className="text-xs text-gray-400">{config.note}</p>
          <p className="text-xs text-gray-400 mt-4">最近核校：2026-11-24</p>
        </section>
      </main>
    </>
  )
}
