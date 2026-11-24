import type { Metadata } from 'next'
import { languageAlternates, pageUrl } from '@/lib/site'
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd'
import Link from 'next/link'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What does AI Humanizer cost?', acceptedAnswer: { '@type': 'Answer', text: 'AI Humanizer is 100% free with no paid tier: 5 submissions per IP per rolling 24 hours, 3,000 characters each, no signup, English and Simplified Chinese. It is a writing-improvement tool and makes no detector promise.' } },
    { '@type': 'Question', name: 'How much do other writing tools cost?', acceptedAnswer: { '@type': 'Answer', text: 'We do not publish competitor prices because they change. Check each vendor’s official pricing page for current plans. This comparison covers access and editing approach, not detector results.' } },
    { '@type': 'Question', name: 'What should I look for in a free writing aid?', acceptedAnswer: { '@type': 'Answer', text: 'Look for a clear editing goal, a prompt that asks to keep citations and numbers, transparent limits, no signup and an honest statement that you must verify the output yourself. Detector scores are unreliable and are not a measure of writing quality.' } },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Free Writing Tools Compared — AI Humanizer',
    description: 'Free writing aids compared: AI Humanizer is free, no signup, with clear limits. No prices or detector rankings.',
    alternates: { canonical: pageUrl('/cost-comparison', 'en'), languages: languageAlternates('/cost-comparison') },
  }
}

const comparisonData = {
  title: 'Free writing tools compared: AI Humanizer',
  subtitle: 'A plain comparison of writing aids — what they cost to try, what access they require and how they approach editing. No detector claims and no competitor prices.',
  plans: [
    {
      name: 'Other writing products',
      tagline: 'Commercial editors — check official sites',
      monthly: 'See official site',
      highlight: false,
      pros: ['Browser-based editing', 'Vendor account features may be included', 'Check the official site for plans'],
      cons: ['Paid product; pricing may change', 'Signup requirements vary'],
    },
    {
      name: 'AI Humanizer',
      tagline: 'Free writing-improvement tool',
      monthly: '$0',
      highlight: true,
      pros: ['100% free, no paid tier', 'No signup, no installation', '5 submissions per IP per rolling 24 hours', 'English and Simplified Chinese'],
      cons: ['5 submissions per IP per rolling 24 hours', '3,000 characters per submission', 'Prompt asks to keep citations; verify manually'],
    },
  ],
  footer: {
    note: 'AI Humanizer is 100% free. Competitor prices change — check the official pricing pages: <a href="https://walterwrites.ai/pricing" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">Walter Writes AI</a>. Detector scores are unreliable; no tool is compared on detector results.',
    cta: 'Start free',
  },
}

export default function CostComparisonPage() {
  return (
    <>
      <BreadcrumbJsonLd slug="/cost-comparison" lang="en" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="mx-auto w-full max-w-4xl px-4 py-8">
        <div className="text-center mb-6">
          <Link href="/" className="inline-block bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm py-2 rounded-lg transition-colors mb-3">
            ← Back to tools
          </Link>
        </div>

        {/* Hero */}
        <section className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-8 border border-violet-100 shadow-sm mb-6">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">{comparisonData.title}</h1>
            <p className="text-sm text-gray-600 leading-relaxed">{comparisonData.subtitle}</p>
          </div>
        </section>

        {/* Plans comparison */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-violet-600">1.</span> Free vs paid access
          </h2>
          <div className="space-y-4">
            {comparisonData.plans.map((plan, i) => (
              <div key={i} className={`rounded-2xl p-6 border ${plan.highlight ? 'border-violet-300 bg-white shadow-md relative' : 'border-gray-200 bg-white shadow-sm'}`}>
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-violet-500 text-white text-xs font-semibold rounded-full">
                    FREE TO TRY
                  </div>
                )}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{plan.name}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">{plan.tagline}</p>
                  </div>
                  <div className={`text-2xl font-bold ${plan.highlight ? 'text-violet-700' : 'text-gray-800'}`}>{plan.monthly}</div>
                </div>
                <div className={`grid md:grid-cols-2 gap-3 ${plan.highlight ? 'md:gap-6' : ''}`}>
                  {plan.pros.map((pro, j) => (
                    <div key={j} className={`flex items-center gap-2 text-sm ${plan.highlight ? 'bg-green-50 rounded-lg p-2' : 'bg-gray-50 rounded-lg p-2'}`}>
                      <span className="text-green-600 font-semibold">✓</span>
                      <span className="text-gray-600">{pro}</span>
                    </div>
                  ))}
                  <div className={`flex items-center gap-2 text-sm ${plan.highlight ? 'bg-red-50 rounded-lg p-2' : 'bg-gray-50 rounded-lg p-2'}`}>
                    <span className="text-red-500 font-semibold">✗</span>
                    <span className="text-gray-500">{plan.cons.join(' · ')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Decision guide */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-violet-600">2.</span> Which one should you pick?
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <h4 className="font-bold text-gray-800">If you want an editor with an account</h4>
              <p className="text-sm text-gray-600 mt-2">Commercial writing products may offer accounts and extra features. Check each official site for current details and plans.</p>
              <Link href="/walterwrites-vs-undetectable" className="text-violet-600 text-sm font-semibold hover:underline mt-2 inline-block">→ Writing tool comparison</Link>
            </div>
            <div className="bg-white rounded-xl p-5 border border-green-200 shadow-sm relative">
              <div className="absolute top-4 right-4 px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">FREE TO TRY</div>
              <h4 className="font-bold text-gray-800">If you want clearer prose</h4>
              <p className="text-sm text-gray-600 mt-2">AI Humanizer helps you revise a rough AI-assisted draft into clearer, more natural writing. It makes no promise about any detector result.</p>
              <Link href="/essay-humanizer" className="text-violet-600 text-sm font-semibold hover:underline mt-2 inline-block">→ Try the free writing tool →</Link>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <h4 className="font-bold text-gray-800">If you want zero friction</h4>
              <p className="text-sm text-gray-600 mt-2">AI Humanizer is 100% free: 5 submissions per IP per rolling 24 hours, 3,000 characters each. No credit card, no signup, no paid tier.</p>
              <Link href="/pricing" className="text-violet-600 text-sm font-semibold hover:underline mt-2 inline-block">→ See pricing →</Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="mt-6 text-center">
          <Link
            href="/pricing"
            className="inline-block bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm py-3 rounded-lg transition-colors w-full"
          >
            {comparisonData.footer.cta}
          </Link>
        </div>

        {/* Note */}
        <section className="mt-4 text-center">
          <p className="text-xs text-gray-400" dangerouslySetInnerHTML={{ __html: comparisonData.footer.note }} />
          <p className="text-xs text-gray-400 mt-4">Last reviewed: 2026-11-24</p>
        </section>
      </main>
    </>
  )
}
