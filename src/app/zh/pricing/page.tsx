import type { Metadata } from 'next'
import Link from 'next/link'
import { PricingConfig } from '../../pricing/pricing-data'

export const dynamic = 'force-dynamic'

const pricingSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '怎么收费?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '免费版每天 5 次,每次 3000 字;Pro 版 $0.99/词,通过 Stripe 支付。',
      },
    },
    {
      '@type': 'Question',
      name: '免费版是什么?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '免费版:每天每个 IP 5 次,每次最多 3000 字。无需注册、信用卡、安装。',
      },
    },
    {
      '@type': 'Question',
      name: 'Pro 版是什么?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pro 版($0.99/词):不限次提交,无每日限制,支持更长输入长度,优先处理,详细统计。',
      },
    },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '定价 - AI Humanizer',
    description: '免费版每天 5 次 + Pro 版 $0.99/词,支持 Stripe 安全支付。',
    alternates: { canonical: 'https://gpt-undetectable.com/zh/pricing' },
  }
}

export default async function PricingPage({ searchParams }) {
  const sp = await searchParams
  const lang = sp?.lang === 'zh' ? 'zh' : 'en'
  const config = PricingConfig[lang]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }} />
      <main className="mx-auto w-full max-w-4xl px-4 py-8">
        {/* Hero */}
        <section className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-8 border border-violet-100 shadow-sm mb-6">
          <div className="text-center">
            <div className="text-3xl mb-2">💰</div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">{config.heroTitle}</h1>
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

        {/* Pro Tier */}
        <section className="bg-gradient-to-br from-violet-50 via-white to-purple-50 rounded-2xl p-6 border border-violet-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-violet-200 to-purple-200 rounded-full blur-xl opacity-30"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-gray-800">{config.proTitle}</h2>
              <span className="px-2 py-0.5 bg-violet-100 text-violet-700 text-xs font-semibold rounded-full">{config.proBadge}</span>
            </div>
            <div className="bg-violet-50 rounded-xl p-4 mb-4">
              <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">按词计费</div>
              <div className="text-3xl font-bold text-violet-700">{config.proPrice}</div>
              <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">{config.stripeNote}</div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">{config.proDesc}</p>
            <ul className="space-y-2 text-sm text-gray-500 list-disc pl-5">
              {config.proFeatures.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
            <div className="mt-5">
              <Link href="/" className="inline-block bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm py-3 rounded-lg transition-colors w-full">
                {config.cta}
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-4 text-center">
          <p className="text-xs text-gray-400">{config.note}</p>
        </section>
      </main>
    </>
  )
}
