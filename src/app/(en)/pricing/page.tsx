import type { Metadata } from 'next'
import { languageAlternates, pageUrl } from '@/lib/site'
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd'
import { PricingConfig } from './pricing-data'

const pricingSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does it cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AI Humanizer is 100% free: 5 submissions per IP per rolling 24 hours, up to 3,000 characters each. No signup, no payment, no paid tier.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the limits?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '5 submissions per IP per rolling 24 hours, up to 3,000 characters each. No signup, no credit card, no installation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there any paid plans?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. There is no paid tier, no checkout, and no per-word charge. Every feature is free.',
      },
    },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Pricing — 100% Free',
    description: 'AI Humanizer is 100% free: 5 submissions per IP per rolling 24 hours, 3,000 characters each. No paid tier.',
    alternates: { canonical: pageUrl('/pricing', 'en'), languages: languageAlternates('/pricing') },
  }
}

export default async function PricingPage() {

  const pricingConfig = PricingConfig.en

  return (
    <>
      <BreadcrumbJsonLd slug="/pricing" lang="en" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }} />
      <main className="mx-auto w-full max-w-4xl px-4 py-8">
        {/* Hero */}
        <section className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-8 border border-violet-100 shadow-sm mb-6">
          <div className="text-center">
            <div className="text-3xl mb-2">{'💰'}</div>
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

        {/* Note */}
        <section className="mt-4 text-center">
          <p className="text-xs text-gray-400">{pricingConfig.note}</p>
          <p className="text-xs text-gray-400 mt-4">Last reviewed: 2026-11-24</p>
        </section>
      </main>
    </>
  )
}
