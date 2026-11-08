import type { Metadata } from 'next'
import Link from 'next/link'
import { PricingConfig } from './pricing-data'

export const dynamic = 'force-dynamic'

const pricingSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does it cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Free tier (5 submissions per day, 3,000 chars each) and Pro tier at $0.99 per word. Pay via Stripe for unlimited submissions with no daily limits.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the free tier?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Free: 5 humanizations per IP per day, each up to 3,000 characters. No signup, no credit card, no installation.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the Pro tier?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pro ($0.99/word): Unlimited submissions, no daily limit, longer input support, priority processing, and detailed analytics.',
      },
    },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Pricing - AI Humanizer',
    description: 'Free tier + Pro at $0.99 per word. Unlimited humanize with Stripe payment.',
    alternates: { canonical: 'https://gpt-undetectable.com/pricing' },
  }
}

export default async function PricingPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const sp = await searchParams
  const lang = sp?.lang === 'zh' ? 'zh' : 'en'

  const pricingConfig = lang === 'zh' ? PricingConfig.zh : PricingConfig.en

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }} />
      <main className="mx-auto w-full max-w-4xl px-4 py-8">
        {/* Hero */}
        <section className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-8 border border-violet-100 shadow-sm mb-6">
          <div className="text-center">
            <div className="text-3xl mb-2">{lang === 'zh' ? '💰' : '💰'}</div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">{pricingConfig.heroTitle}</h1>
            <p className="text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">{pricingConfig.heroSubtitle}</p>
          </div>
        </section>

        {/* Free Tier Card */}
        <section className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">{pricingConfig.freeTitle}</h2>
            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">{pricingConfig.freeBadge}</span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed mb-3">{pricingConfig.freeDesc}</p>
          <ul className="space-y-1.5 text-sm text-gray-500 list-disc pl-5">
            {pricingConfig.freeFeatures.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </section>

        {/* Pro Tier Card */}
        <section className="bg-gradient-to-br from-violet-50 via-white to-purple-50 rounded-2xl p-6 border border-violet-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-violet-200 to-purple-200 rounded-full blur-xl opacity-30"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-gray-800">{pricingConfig.proTitle}</h2>
              <span className="px-2 py-0.5 bg-violet-100 text-violet-700 text-xs font-semibold rounded-full">{pricingConfig.proBadge}</span>
            </div>

            {/* Price */}
            <div className="bg-violet-50 rounded-xl p-4 mb-4">
              <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Per word</div>
              <div className="text-3xl font-bold text-violet-700">{pricingConfig.proPrice}</div>
              <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">{pricingConfig.stripeNote}</div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 leading-relaxed mb-4">{pricingConfig.proDesc}</p>

            {/* Features */}
            <ul className="space-y-2 text-sm text-gray-500 list-disc pl-5">
              {pricingConfig.proFeatures.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-5">
              <Link
                href="/"
                className="inline-block bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm py-3 rounded-lg transition-colors w-full"
              >
                {pricingConfig.cta}
              </Link>
            </div>
          </div>
        </section>

        {/* Note */}
        <section className="mt-4 text-center">
          <p className="text-xs text-gray-400">{pricingConfig.note}</p>
        </section>
      </main>
    </>
  )
}
