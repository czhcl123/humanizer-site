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
      name: 'What are the hard usage limits on this site?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Each submission accepts at most 3,000 characters, and the default rate limit is 5 submissions per client IP in a rolling 24-hour window. The daily limit is configurable on the server. Longer text must be split into separate submissions, and the 5-per-IP counter can affect users who share an IP address.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you guarantee any detector outcome?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. This site makes no bypass claim and no tool can guarantee a detector outcome. An early undocumented impression of 85–95% was withdrawn after a published self-check measured 13.3% (4/30) on 2026-11-24 with this site’s own detector; third-party spot-checks of rewrites returned 100% AI and are explicitly incomplete. Detector verdicts are unreliable, contested and change over time; these numbers are evidence of limits, not product performance.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is this site’s detector result, exactly?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It is a prompt-driven heuristic opinion. A DeepSeek model is asked to describe five textual signals and return an estimated probability. It is not an API call to any third-party detector and not an official verdict. If the model returns text that cannot be parsed as JSON, the API falls back to an Uncertain verdict with 50/50 probabilities and an empty signals list.',
      },
    },
    {
      '@type': 'Question',
      name: 'Will citations survive a rewrite?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Not reliably. The prompt asks the model to keep citations, numbers and proper nouns, but the rewrite is an LLM output with no post-processing verification: it may change, reorder or drop details. Check every citation against the original source before using the output. The site is a writing aid, not a source of detector approval or a substitute for your own academic work.',
      },
    },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Known Limitations — Limits, Accuracy and Scope'
  const description =
    'AI Humanizer limits: 3,000 chars/submission, 5 per IP/24h, en + zh-CN, unreliable detector scores, no SLA.'
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
    alternates: { canonical: pageUrl('/limitations', 'en'), languages: languageAlternates('/limitations') },
  }
}

const entryClass =
  'bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-4 text-gray-700 leading-relaxed'

/** Each limitation carries one sentence that can be quoted on its own. */
const limitations: { title: string; quote: string; detail: string }[] = [
  {
    title: '1. Input size',
    quote: 'AI Humanizer accepts up to 3,000 characters per submission.',
    detail: 'The server enforces this cap on POST /api/humanize. There is no automatic continuation of a longer document across requests.',
  },
  {
    title: '2. Rate limit',
    quote: 'By default, AI Humanizer allows 5 submissions per client IP in a 24-hour window.',
    detail: 'The counter is configurable via HUMANIZE_DAILY_LIMIT on the server. IPs are read from proxy headers, so users behind the same IP can share a counter, and the identifier is best-effort rather than a verified identity.',
  },
  {
    title: '3. Language scope',
    quote: 'AI Humanizer supports English and Simplified Chinese only.',
    detail: 'Other languages are not a supported use case; quality and detector behaviour outside these two languages have not been assessed.',
  },
  {
    title: '4. Detector scores are unreliable',
    quote: 'AI Humanizer makes no bypass claim, and detector scores are not a reliable measure of writing quality.',
    detail: 'An undocumented early impression of 85–95% was withdrawn after a 2026-11-24 self-check pilot measured 13.3% (4/30) with this site’s own detector. Third-party spot-checks are incomplete; rewritten samples repeatedly returned 100% AI. These observations show the limits of detector verdicts, not product performance.',
  },
  {
    title: '5. Self-consistency detection is not independent evidence',
    quote: 'In the published self-check pilot, this site’s own detector judged only 13.3% (4/30) of rewrites Likely Human; that result is not independent evidence about detector evasion.',
    detail: 'The 2026-11-24 pilot used the same DeepSeek prompt-driven detector for both samples and rewrites. Most rewrites were classified as AI by that detector, which shows it cannot serve as independent confirmation of rewrite quality. Real third-party detector performance has not been measured.',
  },
  {
    title: '6. Heuristic detection',
    quote: 'This site’s detector is a prompt-driven heuristic opinion, not an official determination from GPTZero, Turnitin or any other detector.',
    detail: 'DeepSeek Chat is asked to assess five textual signals and return a probability estimate. It does not call any third-party detector API, and its output is for self-checking only.',
  },
  {
    title: '7. Parse fallback',
    quote: 'When the detector model’s JSON output cannot be parsed, the API returns an Uncertain verdict with 50% AI and 50% human probability and an empty signals list.',
    detail: 'The raw model text is kept in the response as `raw`, with a short explanation. A 50/50 result therefore means parsing failed, not that the text was measured as exactly half human.',
  },
  {
    title: '8. Citation accuracy',
    quote: 'The prompt asks the model to keep citations, numbers and proper nouns, but every one must be checked against the original source.',
    detail: 'The rewrite is an LLM output with no post-processing verification. Citation-preserving prompts reduce the risk but cannot eliminate it. Verifying references remains the user’s responsibility.',
  },
  {
    title: '9. Short-lived cache',
    quote: 'AI Humanizer keeps a bounded in-memory response cache for 10 minutes, up to 500 entries, cleared on server restart.',
    detail: 'It is not a persistent database. A repeated submission within the window may be served from the cache instead of making a new model call.',
  },
  {
    title: '10. No service-level agreement',
    quote: 'AI Humanizer provides no uptime or response-time SLA.',
    detail: 'Availability depends on the hosting provider and the upstream DeepSeek API. Requests can fail or time out, and there is no contractual remedy for an outage.',
  },
  {
    title: '11. Long documents',
    quote: 'Text longer than 3,000 characters must be split into separate submissions, and coherence across the parts is not checked automatically.',
    detail: 'Splitting can change how each part reads. Review the joined result yourself before using it.',
  },
  {
    title: '12. Scope of use',
    quote: 'AI Humanizer is a rewriting aid and is not intended for ghostwriting or for submitting work as your own.',
    detail: 'Academic integrity rules at your institution still apply. Detection results are heuristic opinions, not evidence of authorship.',
  },
]

export default async function LimitationsPage() {
  return (
    <>
      <BreadcrumbJsonLd slug="/limitations" lang="en" />
      <ArticleJsonLd
        slug="/limitations"
        lang={lang}
        title="Known Limitations — Limits, Accuracy and Scope"
        description="A quotable list of AI Humanizer's usage limits, detection caveats, citation risks and scope of use."
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="mx-auto w-full max-w-3xl px-4 py-8 text-sm leading-relaxed text-gray-700">
        <article className={entryClass}>
          <h1 className="text-2xl font-bold text-gray-900">Known Limitations</h1>
          <p className="text-xs text-gray-500">Last reviewed: 2026-11-24</p>
          <p>
            This page lists the limits that actually apply to the service as of 24 November 2026. Each
            item includes one self-contained sentence you can quote. Where a number is an observation
            rather than a measurement, it is labelled as such.
          </p>
        </article>

        {limitations.map((item) => (
          <article key={item.title} className={entryClass}>
            <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
            <p className="text-gray-900 font-medium">“{item.quote}”</p>
            <p>{item.detail}</p>
          </article>
        ))}

        <article className={entryClass}>
          <h2 className="text-lg font-semibold text-gray-800">Quoting this page</h2>
          <p>
            See the <a href="/citation-policy" className="text-violet-600 hover:underline">Citation Policy</a>{' '}
            for the recommended format. Do not cite AI Humanizer as a bypass tool or as evidence that
            a text passed detection. The withdrawn 85–95% figure is not a current rate; the published
            test is a self-consistency pilot measuring 13.3% (4/30) on 2026-11-24 with this site's own
            detector, and third-party spot-checks remain incomplete.
          </p>
          <p className="text-sm text-gray-500 pt-2">
            Related: <a href="/changelog" className="text-violet-600 hover:underline">Changelog</a> ·{' '}
            <a href="/glossary" className="text-violet-600 hover:underline">Glossary</a> ·{' '}
            <a href="/privacy" className="text-violet-600 hover:underline">Privacy</a>
          </p>
        </article>

        <p className="text-xs text-gray-400 mt-4">Last reviewed: 2026-11-24</p>
      </main>
    </>
  )
}
