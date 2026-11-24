import type { Metadata } from 'next'
import { languageAlternates, pageUrl } from '@/lib/site'
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd'
import Link from 'next/link'

const i18n = {
  en: {
    title: 'Why Originality.ai Scores Are Unreliable — Writing Guidance',
    description: 'Free writing tool for clearer drafts. Why Originality.ai scores are unreliable and how to write in your voice. No signup.',
    heroTitle: 'Why Originality.ai scores are unreliable',
    heroSubtitle: 'Detector verdicts are contested. Write with concrete details, a point of view and sources you checked yourself. AI Humanizer is a free writing-improvement tool with no detector promise.',
    signalsTitle: 'Why common detector signals are weak hints',
    signalList: [
      'Perplexity and burstiness are general heuristics, not a published description of any detector internals',
      'Uniform sentence length is easy to notice but says nothing about who wrote the sentence',
      'Template vocabulary is a clarity problem worth fixing for the reader, not a detector trick',
      'Predictable paragraph transitions usually mean the draft needs a stronger argument, not a different score',
    ],
    cta: 'Try the free writing tool',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is Originality.ai?', acceptedAnswer: { '@type': 'Answer', text: 'A third-party tool that estimates whether text was written with AI assistance. Its internal method is not public, it is not connected to this site, and its verdict is an estimate rather than proof of authorship.' } },
    { '@type': 'Question', name: 'Why are Originality.ai scores unreliable?', acceptedAnswer: { '@type': 'Answer', text: 'Different detectors use different, unpublished methods and can disagree on the same text. The published numbers here document limits only: an earlier undocumented 85–95% impression has been withdrawn as unreproduced; the 2026-11-24 self-check measured 13.3% (4/30) with this site’s own detector; incomplete third-party spot-checks returned 100% AI on rewrites. We have no audited comparison with Originality.ai.' } },
    { '@type': 'Question', name: 'Does AI Humanizer promise a particular score?', acceptedAnswer: { '@type': 'Answer', text: 'No. It is a free writing-improvement tool. There is no detector-specific tuning, no reverse engineering and no guaranteed output.' } },
    { '@type': 'Question', name: 'How can I make a draft sound more like my own writing?', acceptedAnswer: { '@type': 'Answer', text: 'Add specifics you know are true, state your own conclusion and its limits, and check each citation, date and number against the source. A rewrite can make alternatives easier to see; the choices are yours.' } },
    { '@type': 'Question', name: 'Are citations kept intact?', acceptedAnswer: { '@type': 'Answer', text: 'The prompt asks the model to preserve citations, numbers and proper nouns; verify manually. LLM output is not post-processed, so nothing is guaranteed verbatim.' } },
    { '@type': 'Question', name: 'What does the free plan include?', acceptedAnswer: { '@type': 'Answer', text: '100% free with no paid tier: 5 submissions per IP per rolling 24 hours, 3,000 characters each, English and Simplified Chinese, no signup.' } },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: i18n.en.title,
    description: i18n.en.description,
    alternates: { canonical: pageUrl('/originality-ai-bypass', 'en'), languages: languageAlternates('/originality-ai-bypass') },
  }
}

export default function OriginalityAIBypassPage() {
  return (
    <>
      <BreadcrumbJsonLd slug="/originality-ai-bypass" lang="en" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="mx-auto w-full max-w-4xl px-4 py-8">
        <div className="text-center mb-6">
          <Link href="/" className="inline-block bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm py-2 rounded-lg transition-colors mb-3">
            ← Back to tools
          </Link>
          <div className="flex justify-center gap-2">
            {[
              { icon: '🧪', label: 'Self-review', href: '/embed/detector?originality=1' },
              { icon: '📊', label: 'Test methodology', href: '/bypass-test-methodology' },
              { icon: '➡️', label: 'Free writing tool', href: '/essay-humanizer' },
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
            <span className="text-violet-600">1.</span> Why detector scores can mislead
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
              <h3 className="font-bold text-gray-800 mb-2">What writing actually needs</h3>
              <ul className="space-y-2 text-sm text-gray-600 list-disc pl-5">
                <li>A claim a reader can follow, supported by specific evidence</li>
                <li>Your own assessment of that evidence, including uncertainty</li>
                <li>Citations you opened and checked, not markers copied on trust</li>
                <li>Structure that makes the argument easier to read</li>
                <li>No detector API is called and no detector result is validated here</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-violet-600">2.</span> How to write in your own voice
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
              <h3 className="font-bold text-red-600 mb-3">Chasing a score does not help the reader</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">Generic paraphrase tools change words without adding substance. Detector verdicts remain unreliable, so optimizing for one is not a useful writing strategy.</p>
              <div className="space-y-1.5 text-xs text-red-500">
                <p>→ Generic claims stay generic after a synonym swap</p>
                <p>→ A different score says nothing about whether the source was checked</p>
                <p>→ No tool can turn someone else’s work into yours</p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 border border-green-200 shadow-sm">
              <h3 className="font-bold text-green-700 mb-3">What helps instead</h3>
              <ul className="space-y-1.5 text-sm text-gray-600 list-disc pl-5">
                <li>Replace vague statements with details you know are accurate</li>
                <li>Say what you think and why, with appropriate hedging</li>
                <li>Verify every citation, number and quotation yourself</li>
                <li>Use sentence lengths that fit the idea rather than a formula</li>
                <li>AI Humanizer requests those changes in its prompt; it makes no detector promise</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-violet-600">3.</span> What the published numbers show
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            They show limitations, not performance. An earlier undocumented internal impression of roughly 85–95% has been withdrawn as unreproduced. The 2026-11-24 self-check measured 13.3% (4/30) with this site’s own detector; incomplete third-party spot-checks returned 100% AI on rewrites. These figures are not comparable, are not product claims, and say nothing about any third-party detector. The <a href="/bypass-test-methodology" className="text-violet-600 hover:underline">methodology page</a> documents the protocol and caveats.
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
      <p className="text-xs text-gray-400 mt-4">Last reviewed: 2026-11-24</p>
      </main>
    </>
  )
}
