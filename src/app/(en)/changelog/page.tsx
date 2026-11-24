import type { Metadata } from 'next'
import { languageAlternates, pageUrl } from '@/lib/site'
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd'

/** This route tree is English; the language is a compile-time constant. */
const lang = 'en' as const

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What changed on 2026-11-24?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Version v2.0 repositioned the site around writing improvement after published tests showed detector scores are unreliable. v1.2 published the first self-consistency pilot (13.3% (4/30) on 2026-11-24, this site’s own detector, not a third-party result) and withdrew 85–95% as a current estimate. v1.1 unified factual wording and added the reference pages. Old URLs are retained with revised content.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do these releases change how the detector works?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. v1.1 and v1.2 are documentation and wording releases. The detector remains a prompt-driven heuristic analysis, not an official determination from GPTZero, Turnitin or any other detector, and it is still not guaranteed to be accurate.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why was the 85–95% figure withdrawn?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The 85–95% range was an undocumented early impression, not an audited or reproducible pass rate. v1.2 withdrew it as a current estimate after a published self-check pilot on 2026-11-24 measured 13.3% (4/30) with this site’s own detector; no third-party detector result has been measured.',
      },
    },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Changelog — What Changed in v2.0'
  const description =
    'Dated changelog: v2.0 repositioned around writing improvement; the 13.3% pilot and withdrawn 85–95% figure explained.'
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
    alternates: { canonical: pageUrl('/changelog', 'en'), languages: languageAlternates('/changelog') },
  }
}

const entryClass =
  'bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-4 text-gray-700 leading-relaxed'

export default async function ChangelogPage() {
  return (
    <>
      <BreadcrumbJsonLd slug="/changelog" lang="en" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="mx-auto w-full max-w-3xl px-4 py-8 text-sm leading-relaxed text-gray-700">
        <article className={entryClass}>
          <h1 className="text-2xl font-bold text-gray-900">Changelog</h1>
          <p className="text-xs text-gray-500">Last reviewed: 2026-11-24</p>
          <p>
            This page records what changed in the site’s published claims and reference pages. It is a
            documentation log, not a claim that the underlying tools were retrained or that detector
            behaviour improved.
          </p>
        </article>

        <article className={entryClass}>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h2 className="text-lg font-semibold text-gray-800">2026-11-24</h2>
            <span className="text-xs font-medium text-violet-700 bg-violet-50 border border-violet-100 rounded px-2 py-0.5">
              v2.0
            </span>
          </div>
          <ol className="list-decimal pl-5 space-y-3">
            <li>
              <strong>Repositioning to writing improvement.</strong> Published tests showed detector
              scores are unreliable, so AI Humanizer is now presented as a writing improvement tool:
              making rough AI-assisted drafts clearer, more natural and easier to make your own. No
              detector score is presented as a validation of the tool.
            </li>
            <li>
              <strong>Old URLs retained, content revised.</strong> Pages at previous bypass URLs now
              explain why detectors are unreliable and how to write in your own voice. The AI detector
              page is framed as a heuristic self-review, not a verdict or authorship check.
            </li>
            <li>
              <strong>Claims tightened.</strong> Rewrites are LLM outputs with no post-processing
              verification: the prompt asks the model to preserve citations, numbers and proper nouns,
              and you must check them yourself. The withdrawn 85–95% figure and the 13.3% self-check
              remain only as documented limitations.
            </li>
          </ol>
        </article>

        <article className={entryClass}>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h2 className="text-lg font-semibold text-gray-800">2026-11-24</h2>
            <span className="text-xs font-medium text-violet-700 bg-violet-50 border border-violet-100 rounded px-2 py-0.5">
              v1.2
            </span>
          </div>
          <ol className="list-decimal pl-5 space-y-3">
            <li>
              <strong>First published self-check pilot.</strong> A 30-sample self-consistency run with
              this site's own detector on 2026-11-24 measured 13.3% (4/30) Likely Human rewrites.
              Samples, prompts and the run script are linked from the test methodology page. It is not
              a third-party detector measurement.
            </li>
            <li>
              <strong>85–95% withdrawn as a current estimate.</strong> The early figure came from an
              undocumented internal impression and was never reproduced. It may appear only as
              historical context next to the pilot result; no third-party pass rate has been measured.
            </li>
            <li>
              <strong>Citation and limitations updated.</strong> The citation policy now requires any
              test citation to state that it is a self-consistency pilot (13.3%, 2026-11-24, this
              site's detector, not third-party), and the limitations page explains why self-checking
              is not independent evidence.
            </li>
          </ol>
        </article>

        <article className={entryClass}>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h2 className="text-lg font-semibold text-gray-800">2026-11-24</h2>
            <span className="text-xs font-medium text-violet-700 bg-violet-50 border border-violet-100 rounded px-2 py-0.5">
              v1.1
            </span>
          </div>
          <ol className="list-decimal pl-5 space-y-3">
            <li>
              <strong>Site-wide factual alignment.</strong> Free access, usage limits and pass-rate
              language now say the same thing on every page. The 85–95% figure was described only as
              an unaudited internal observation, never as a verified pass rate; v1.2 goes further and
              withdraws it as a current estimate.
            </li>
            <li>
              <strong>New Privacy and Glossary pages.</strong> A plain-language account of text
              handling, plus definitions of perplexity, burstiness, AI vocabulary density and AI
              detection, with an explicit note on what this site’s detector does.
            </li>
            <li>
              <strong>New reference pages.</strong> This Changelog, together with Limitations and
              Citation Policy, gives readers a stable place to quote when describing the tool.
            </li>
            <li>
              <strong>Technical description corrected.</strong> Rewriting and detection are described
              as DeepSeek prompt-driven processing, not as a connection to any third-party detector API.
            </li>
            <li>
              <strong>Unsourced assertions removed.</strong> Claims about audited accuracy, official
              detector approval and guaranteed outcomes were taken out of the public copy.
            </li>
            <li>
              <strong>FAQ content localised.</strong> Chinese FAQs now use Chinese wording and the same
              factual limits as the English versions, instead of a loose translation of older claims.
            </li>
          </ol>
        </article>

        <article className={entryClass}>
          <h2 className="text-lg font-semibold text-gray-800">How to cite this release</h2>
          <p>
            The preferred format is given on the <a href="/citation-policy" className="text-violet-600 hover:underline">Citation Policy</a>{' '}
            page. Cite AI Humanizer as a writing aid, never as a bypass tool or detector-approval
            evidence. For the test result, cite the v1.2 self-consistency pilot with its date,
            13.3% (4/30) figure, and the explicit note that no third-party detector run was completed.
          </p>
          <p className="text-sm text-gray-500 pt-2">
            Related: <a href="/limitations" className="text-violet-600 hover:underline">Limitations</a> ·{' '}
            <a href="/glossary" className="text-violet-600 hover:underline">Glossary</a> ·{' '}
            <a href="/about" className="text-violet-600 hover:underline">About</a>
          </p>
        </article>

        <p className="text-xs text-gray-400 mt-4">Last reviewed: 2026-11-24</p>
      </main>
    </>
  )
}
