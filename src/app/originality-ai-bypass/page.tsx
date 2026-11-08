import type { Metadata } from 'next'
import Link from 'next/link'

const i18n = {
  en: {
    title: 'Bypass Originality AI — GPT-Undetectable',
    description: 'Originality.ai bypass tool. Free + Pro $0.99/word. Tested against original.ai\'s API.',
    heroTitle: 'Bypass Originality AI',
    heroSubtitle: 'Make AI text pass original.ai with natural human patterns. Free with Pro tier at $0.99/word.',
    signalsTitle: 'How original.ai Detects AI',
    signalList: [
      'Sentence-level perplexity analysis — too many short uniform sentences',
      'Burstiness metrics — consecutive sentences with similar length variance',
      'AI vocabulary density — flagged words: delve, leverage, robust, furthermore, conclusion',
      'Predictable paragraph transitions — repetitive logical jumps',
    ],
    cta: 'Try Now',
  },
}

export const dynamic = 'force-dynamic'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How do I bypass originality.ai?', acceptedAnswer: { '@type': 'Answer', text: 'GPT-Undetectable bypasses originality.ai by injecting natural human patterns — varied sentence length, conversational transitions, first-person voice where appropriate, and occasional hedges — into AI-generated text. Our engine is tested against original.ai at 85-95% pass rate on English text up to 3,000 characters per submission.' } },
    { '@type': 'Question', name: 'Does this tool really bypass original.ai?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. This page is specifically built for originality.ai bypass. The same engine that passes Turnitin also passes originality.ai. Tested directly against their API in our bypass methodology lab. We break sentence-level perplexity, burstiness, and AI vocabulary density signals that originality.ai uses to flag content.' } },
    { '@type': 'Question', name: 'Is originality.ai bypass free?', acceptedAnswer: { '@type': 'Answer', text: 'Free tier available: 5 submissions per IP per day, each up to 3,000 characters. No signup, no installation, no credit card. Pro tier at $0.99/word via Stripe for unlimited submissions.' } },
    { '@type': 'Question', name: 'What makes original.ai detect AI differently?', acceptedAnswer: { '@type': 'Answer', text: 'originality.ai uses sentence-level perplexity analysis, burstiness metrics, and AI vocabulary density scoring. Its model differs from Turnitin in how it weights each signal. We reverse-engineer each detector\'s exact algorithm rather than guessing general heuristics.' } },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: i18n.en.title,
    description: i18n.en.description,
    alternates: { canonical: 'https://gpt-undetectable.com/originality-ai-bypass' },
  }
}

export default function OriginalityAIBypassPage({ params }: { params: Promise<{ originality?: string; zh?: string }> }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="mx-auto w-full max-w-4xl px-4 py-8">
        <div className="text-center mb-6">
          <Link href="/" className="inline-block bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm py-2 rounded-lg transition-colors mb-3">
            ← Back to tools
          </Link>
          <div className="flex justify-center gap-2">
            {[
              { icon: '🧪', label: 'Test Engine', href: '/embed/detector?originality=1' },
              { icon: '📊', label: 'Pass Rate Report', href: '/bypass-test-methodology' },
              { icon: '➡️', label: 'Full Humanize Tool', href: '/essay-humanizer' },
            ].map((item, idx) => (
              <Link key={idx} href={item.href} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs rounded-md font-medium transition-colors">
                {item.icon} {item.label} →
              </Link>
            ))}
          </div>
        </div>

        <section className="bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 rounded-2xl p-8 border border-violet-100 shadow-sm mb-6">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">{i18n.en.heroTitle}</h1>
            <p className="text-sm text-gray-600 leading-relaxed">{i18n.en.heroSubtitle}</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-violet-600">1.</span> How original.ai detects AI-generated text
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-2">{i18n.en.signalsTitle}</h3>
              <ul className="space-y-2 text-sm text-gray-600 list-disc pl-5">
                {i18n.en.signalList.map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-xl p-5 border border-violet-200 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-2">How we reverse-engineer each signal</h3>
              <ul className="space-y-2 text-sm text-gray-600 list-disc pl-5">
                <li>We analyze the exact perplexity distribution of your input text</li>
                <li>We detect burstiness patterns — consecutive sentences with similar length</li>
                <li>We scan for AI vocabulary density: words like "delve," "leverage," "robust," "furthermore," "in conclusion"</li>
                <li>We map the detector's paragraph transition patterns and inject human-style transitions</li>
                <li>Output testing run against original.ai's actual API endpoint</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-violet-600">2.</span> Why our original.ai bypass works better than alternatives
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
              <h3 className="font-bold text-red-600 mb-3">The Problem with Generic Rewriters</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">Generic paraphrase tools rewrite without changing sentence structure or perplexity. They don't know which AI vocabulary words each detector flags, so they leave them intact. Result: detector still sees AI markers.</p>
              <div className="space-y-1.5 text-xs text-red-500">
                <p>→ Leaves AI vocabulary words untouched ("delve," "leverage," "robust")</p>
                <p>→ Preserves uniform sentence lengths (detector's main flag)</p>
                <p>→ Won't touch paragraph transition predictability</p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 border border-green-200 shadow-sm">
              <h3 className="font-bold text-green-700 mb-3">What Our Engine Does Differently</h3>
              <ul className="space-y-1.5 text-sm text-gray-600 list-disc pl-5">
                <li>Rephrases AI vocabulary words entirely — replaces "delve" with equivalent human phrasing</li>
                <li>Varies sentence lengths strategically to break detector's rhythm pattern</li>
                <li>Injects conversational transitions ("However," "On the other hand," "For instance")</li>
                <li>Adds hedging phrases ("might," "could potentially," "there is evidence to suggest")</li>
                <li>Alters paragraph flow to be less predictable — breaks Burstiness detection</li>
                <li>Final output re-tested against original.ai's actual detector API</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-violet-600">3.</span> How we verify original.ai bypass — bypass-test-methodology
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            Every output is tested in our independent bypass laboratory against original.ai's live API. Pass rate: <strong>85-95%</strong> on English text, consistently across 3,000-character limit. Test results are publicly available at /bypass-test-methodology.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">FAQ</h2>
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <div className="space-y-3">
              {faqSchema.mainEntity.map((q, idx) => (
                <div key={idx} className="border-b pb-3 last:border-0 last:pb-0">
                  <h4 className="font-semibold text-gray-700 mb-1">{q.name}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{q.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-6 text-center">
          <Link href="/essay-humanizer" className="inline-block bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm py-3 rounded-lg transition-colors w-full">
            {i18n.en.cta}
          </Link>
        </div>
      </main>
    </>
  )
}
