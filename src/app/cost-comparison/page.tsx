import type { Metadata } from 'next'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How much does Walter Writes AI cost?', acceptedAnswer: { '@type': 'Answer', text: 'Walter Writes AI pricing is about $14.99 per month for Pro. GPT-Undetectable offers both Free and Pro ($0.99 per word via Stripe). For long documents, our per-word pricing is significantly cheaper than Walter Writes\' flat monthly rate.' } },
    { '@type': 'Question', name: 'Comparison table: Walter Writes vs GPT-Undetectable', acceptedAnswer: { '@type': 'Answer', text: 'See the full comparison below. Key differentiators: (1) Walter Writes does not claim to bypass AI detectors at all — our tool is built specifically for that purpose. (2) Walter Writes pricing is $14.99/month flat; ours is $0.99 per word, cheaper for longer texts. (3) Our free tier has no signup, no installation.' } },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Cost Comparison — Walter Writes vs GPT-Undetectable',
    description: 'Compare Walter Writes AI pricing with our Pro tier at $0.99/word. Free tier available. No signup, no installation.',
    alternates: { canonical: 'https://gpt-undetectable.com/cost-comparison' },
  }
}

const comparisonData = {
  title: 'Walter Writes AI vs GPT-Undetectable: Cost Comparison',
  subtitle: 'Which AI humanizer costs less — and which one actually bypasses AI detection?',
  plans: [
    {
      name: 'Walter Writes AI',
      tagline: 'AI Rewriter (paraphraser)',
      monthly: '$14.99/月',
      highlight: false,
      pros: ['Easy to use in browser', 'Good for structural edits'],
      cons: ['Does not bypass AI detectors', 'Flat monthly rate high for long texts', 'No free tier'],
    },
    {
      name: 'GPT-Undetectable Pro',
      tagline: 'AI Humanizer + Detection Bypass',
      monthly: '$0.99/词',
      highlight: true,
      pros: ['Specifically bypasses Turnitin, GPTZero, Originality.ai', 'Free tier available (no signup)', 'Per-word pricing cheaper for long documents', 'No credit card required for free'],
      cons: ['Paid only via Stripe', 'No preset monthly bundle'],
    },
    {
      name: 'GPT-Undetectable Free',
      tagline: 'Humanize AI Text',
      monthly: '$0',
      highlight: false,
      pros: ['100% free', 'No signup, no installation', '5 submissions/day per IP', 'Works with English and Chinese'],
      cons: ['5 submissions per day limit', '3,000 chars per submission'],
    },
  ],
  footer: {
    note: 'For 500 words: Walter Writes costs ~$1.25 = $14.99/月 vs our $0.99 = $1.25/月 same total, but higher for ≥10K words. Our per-word model scales better for long documents.',
    cta: 'Upgrade to Pro ($0.99/word)',
  },
}

export default function CostComparisonPage({ params }: { params: Promise<{ lang?: string }> }) {
  return (
    <>
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
            <span className="text-violet-600">1.</span> Pricing Plans Compared
          </h2>
          <div className="space-y-4">
            {comparisonData.plans.map((plan, i) => (
              <div key={i} className={`rounded-2xl p-6 border ${plan.highlight ? 'border-violet-300 bg-white shadow-md relative' : 'border-gray-200 bg-white shadow-sm'}`}>
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-violet-500 text-white text-xs font-semibold rounded-full">
                    RECOMMENDED
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
              <h4 className="font-bold text-gray-800">If you restructure your own writing</h4>
              <p className="text-sm text-gray-600 mt-2">Walter Writes is better. Use it when you want synonym swaps or paragraph edits on human-written text.</p>
              <Link href="/walterwrites" className="text-violet-600 text-sm font-semibold hover:underline mt-2 inline-block">→ Check out Walter Writes</Link>
            </div>
            <div className="bg-white rounded-xl p-5 border border-green-200 shadow-sm relative">
              <div className="absolute top-4 right-4 px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">BEST FOR AI</div>
              <h4 className="font-bold text-gray-800">If ChatGPT wrote it and needs to pass detectors</h4>
              <p className="text-sm text-gray-600 mt-2">GPT-Undetectable is purpose-built. Same engine passes Turnitin, GPTZero, Originality.ai, Copyleaks. Free tier means zero risk.</p>
              <Link href="/essay-humanizer" className="text-violet-600 text-sm font-semibold hover:underline mt-2 inline-block">→ Try our free humanizer →</Link>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <h4 className="font-bold text-gray-800">If budget is no concern</h4>
              <p className="text-sm text-gray-600 mt-2">Pro Tier at $0.99/word via Stripe. No credit card required for free tier. Unlimited submissions once paid.</p>
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
          <p className="text-xs text-gray-400">{comparisonData.footer.note}</p>
        </section>
      </main>
    </>
  )
}
