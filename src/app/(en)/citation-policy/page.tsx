import type { Metadata } from 'next'
import { languageAlternates, pageUrl } from '@/lib/site'
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd'
import { ArticleJsonLd } from '@/components/ArticleJsonLd'

/** This route tree is English; the language is a compile-time constant. */
const lang = 'en' as const

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How should I cite this site?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use: AI Humanizer (2026). [page title]. https://gpt-undetectable.com/[path]. Accessed [DATE]. Replace the placeholders with the actual page title, path and date of access. Cite AI Humanizer only as a writing aid. Never cite it as a bypass tool or as evidence of detector approval. The 85–95% figure is withdrawn; the 2026-11-24 self-check was a self-consistency pilot measuring 13.3% (4/30) with this site’s own detector, and third-party spot-checks are incomplete.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I cite AI Humanizer as proof that a text passed detection?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. You may cite this site as a writing aid, but not as a bypass tool, evidence of a verified pass rate, or detector approval. The 85–95% figure is withdrawn; the 2026-11-24 self-check measured 13.3% (4/30) with this site’s own detector, and third-party spot-checks are incomplete. None of these are product performance claims.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this site affiliated with GPTZero or Turnitin?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. AI Humanizer is not an official tool of GPTZero, Turnitin or any other detector. Its own detector output is a prompt-driven heuristic opinion, not an official verdict from those products.',
      },
    },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Citation Policy — How to Quote This Site'
  const description =
    'How to cite AI Humanizer as a writing aid: not a bypass tool; 85–95% withdrawn, 13.3% self-check is a limited pilot.'
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: 'https://gpt-undetectable.com/og-image.png', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://gpt-undetectable.com/og-image.png'],
    },
    alternates: { canonical: pageUrl('/citation-policy', 'en'), languages: languageAlternates('/citation-policy') },
  }
}

const entryClass =
  'bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-4 text-gray-700 leading-relaxed'

export default async function CitationPolicyPage() {
  return (
    <>
      <BreadcrumbJsonLd slug="/citation-policy" lang="en" />
      <ArticleJsonLd
        slug="/citation-policy"
        lang={lang}
        title="Citation Policy — How to Quote This Site"
        description="Recommended citation format and the boundaries on citing AI Humanizer as a source."
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="mx-auto w-full max-w-3xl px-4 py-8 text-sm leading-relaxed text-gray-700">
        <article className={entryClass}>
          <h1 className="text-2xl font-bold text-gray-900">Citation Policy</h1>
          <p className="text-xs text-gray-500">Last reviewed: 2026-11-24</p>
          <p>
            This page tells you how to reference AI Humanizer in a paper, report or article, and which
            claims may be attributed to it. Cite it as a writing aid — not as a bypass tool or as
            evidence that a text passed detection. It describes what the site can support, not what
            it can prove.
          </p>
        </article>

        <article className={entryClass}>
          <h2 className="text-lg font-semibold text-gray-800">Recommended format</h2>
          <p className="bg-gray-50 border border-gray-100 rounded p-3 font-mono text-xs text-gray-900 break-words">
            AI Humanizer (2026). &lt;page title&gt;. https://gpt-undetectable.com/&lt;path&gt;. Accessed &lt;DATE&gt;.
          </p>
          <p>
            Example for the English limitations page: AI Humanizer (2026). Known Limitations — Limits,
            Accuracy and Scope. https://gpt-undetectable.com/limitations. Accessed 2026-11-24. Use the
            actual page you read and the date you read it; for Chinese pages, insert <code className="bg-gray-100 px-1 rounded">/zh</code>{' '}
            before the path and give the Chinese page title.
          </p>
        </article>

        <article className={entryClass}>
          <h2 className="text-lg font-semibold text-gray-800">What may be cited</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Appropriate:</strong> citing AI Humanizer as a free writing aid that improves the
              clarity and naturalness of rough drafts, with a heuristic self-review tool. This is a
              description of a tool, not a research finding.
            </li>
            <li>
              <strong>Not citable as a current number:</strong> the 85–95% figure is a withdrawn,
              undocumented early impression. The self-check pilot measured <strong>13.3%
              (4/30) on 2026-11-24</strong> with this site's own detector, and third-party spot-checks
              of rewrites returned 100% AI but are <strong>explicitly incomplete</strong>. Any citation
              must say this is a <strong>self-consistency pilot, not a third-party detector result</strong>,
              and must present it as a limitation, not a product claim.
            </li>
            <li>
              <strong>Not appropriate:</strong> citing this site as a <strong>bypass tool</strong>, for a
              <strong>verified pass rate</strong>, for detector approval, for third-party detector
              performance, or as proof that a specific text is human-written.
            </li>
          </ul>
        </article>

        <article className={entryClass}>
          <h2 className="text-lg font-semibold text-gray-800">Boundaries you must keep</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Not an official tool.</strong> AI Humanizer is not affiliated with GPTZero,
              Turnitin, Originality.ai or any other detector, and is not their official product.
            </li>
            <li>
              <strong>Heuristic results.</strong> This site’s detector output is a model-generated
              opinion about textual signals. It is not an official determination and accuracy is not
              guaranteed.
            </li>
            <li>
              <strong>Version dependence.</strong> Detection outcomes change as detector versions and
              model behaviour change. A result observed on one date is not a stable property of a text
              or a tool.
            </li>
            <li>
              <strong>No research equivalence.</strong> Public research such as DetectGPT is background
              reading; this site does not implement it and should not be cited as if it did.
            </li>
          </ul>
        </article>

        <article className={entryClass}>
          <h2 className="text-lg font-semibold text-gray-800">Example of a compliant sentence</h2>
          <p>
            “AI Humanizer is a free writing aid that makes rough drafts clearer and more natural; a
            published self-check pilot (2026-11-24) measured 13.3% (4/30) as judged by the site's own
            detector in a self-consistency test, not by a third-party detector, which illustrates why
            detector scores are unreliable (AI Humanizer, 2026).” That sentence keeps the required
            qualifiers. “AI Humanizer has a verified 85–95% pass rate” or “use AI Humanizer to pass
            detectors” would not.
          </p>
          <p className="text-sm text-gray-500 pt-2">
            Related: <a href="/limitations" className="text-violet-600 hover:underline">Known Limitations</a> ·{' '}
            <a href="/changelog" className="text-violet-600 hover:underline">Changelog</a> ·{' '}
            <a href="/bypass-test-methodology" className="text-violet-600 hover:underline">Test Methodology</a>
          </p>
        </article>

        <p className="text-xs text-gray-400 mt-4">Last reviewed: 2026-11-24</p>
      </main>
    </>
  )
}
