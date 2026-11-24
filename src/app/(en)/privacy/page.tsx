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
      name: 'Does this site store the text I submit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'There is no persistent database of user text. A short-lived in-memory response cache can hold a submitted text’s hash and the complete output for up to 10 minutes (maximum 500 entries); it disappears when the server restarts.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does the site use analytics cookies or tracking pixels?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No analytics cookies, no tracking pixels, and no account or signup are required. The embedded detector does send a height message to the parent page via postMessage, and its return link includes utm_source and utm_medium parameters.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where is my text processed?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Text is sent from your browser to this site’s server API (POST /api/humanize) and then to DeepSeek Chat (deepseek-chat) for processing. That processing happens in the cloud, not on your device. The site is hosted on Railway, and Upstash Redis is an optional rate-limit backend.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I contact the operator or ask about my data?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Email contact@gpt-undetectable.com. The founder is czhcl123, and the public repository is https://github.com/czhcl123/humanizer-site.',
      },
    },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Privacy Policy — What Happens to Your Text'
  const description = 'How this site handles text: DeepSeek cloud processing, short memory cache, IP rate limits, no analytics cookies.'
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
    alternates: { canonical: pageUrl('/privacy', 'en'), languages: languageAlternates('/privacy') },
  }
}

export default async function PrivacyPage() {
  return (
    <>
      <BreadcrumbJsonLd slug="/privacy" lang="en" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="mx-auto w-full max-w-3xl px-4 py-8 text-sm leading-relaxed text-gray-700">
        <article className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6 space-y-3">
          <h1 className="text-2xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="text-xs text-gray-500">Last updated: 24 November 2026</p>

          <p>This page describes what actually happens to text you paste into this site. It is written to be checked against the site’s behaviour, not to promise more than the system does.</p>

          <h2 className="text-lg font-semibold text-gray-800 pt-2">In short</h2>
          <p>Your text is processed in the cloud by DeepSeek Chat. We do not keep user text in a persistent database. We do not use analytics cookies or tracking pixels, and you do not need an account. There is, however, a short-lived server-side memory cache and an IP-based rate limiter; both are described below.</p>

          <h2 className="text-lg font-semibold text-gray-800 pt-2">What happens when you submit text</h2>
          <p>When you click a rewrite or detection button, your browser sends the text to this site’s server API at <code className="bg-gray-100 px-1 rounded">POST /api/humanize</code>. The server passes it to <strong>DeepSeek Chat (deepseek-chat)</strong> and returns the model’s output. Processing happens on remote servers, not locally in your browser. There is no registration step.</p>

          <h2 className="text-lg font-semibold text-gray-800 pt-2">The short-term response cache</h2>
          <p>There is no persistent database storing user text. There is a bounded in-memory response cache on the server:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Lifetime:</strong> 10 minutes per entry (TTL).</li>
            <li><strong>Size:</strong> at most 500 entries; older entries are evicted as new ones arrive.</li>
            <li><strong>Key:</strong> derived from a hash of the input text, together with the mode and language.</li>
            <li><strong>Value:</strong> the complete output returned for that input.</li>
          </ul>
          <p>The cache lives in the server process’s memory. It is not written to a database, and a restart clears all of it. A repeat submission inside the 10-minute window may be served from this cache instead of making a new model call.</p>

          <h2 className="text-lg font-semibold text-gray-800 pt-2">Rate limiting and IP addresses</h2>
          <p>Requests are rate-limited by client IP. The server derives that IP from proxy headers such as <code className="bg-gray-100 px-1 rounded">x-forwarded-for</code>, <code className="bg-gray-100 px-1 rounded">cf-connecting-ip</code> and <code className="bg-gray-100 px-1 rounded">x-real-ip</code>. These headers can be influenced by proxies, VPNs and hosting setups, so the identifier is best-effort rather than a verified identity; users sharing an IP may share a counter.</p>
          <p>By default the counters are kept in server memory, which means they apply to a single instance. When Upstash Redis is configured, the counters are shared across instances instead. No account is created from this process.</p>

          <h2 className="text-lg font-semibold text-gray-800 pt-2">Cookies, tracking and the embedded detector</h2>
          <p>This site uses no analytics cookies and no tracking pixels. No signup is required.</p>
          <p>The embeddable detector at <a href="/embed" className="text-violet-600 hover:underline">/embed</a> behaves differently from a normal page when it runs inside an iframe: it sends a height message to the parent page using <code className="bg-gray-100 px-1 rounded">postMessage</code> so the frame can be resized. That message is visible to the parent page, so if a third-party site embeds the detector, that site can observe it. The detector’s return link carries <code className="bg-gray-100 px-1 rounded">utm_source</code> and <code className="bg-gray-100 px-1 rounded">utm_medium</code> parameters.</p>

          <h2 className="text-lg font-semibold text-gray-800 pt-2">Who else processes data</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>DeepSeek</strong> — the model provider that receives submitted text for rewriting or analysis. <a href="https://platform.deepseek.com" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">platform.deepseek.com</a></li>
            <li><strong>Railway</strong> — the hosting platform running this site and its server-side cache. <a href="https://railway.com" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">railway.com</a></li>
            <li><strong>Upstash</strong> — optional Redis backend for shared rate-limit counters when configured. <a href="https://upstash.com" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">upstash.com</a></li>
          </ul>

          <h2 className="text-lg font-semibold text-gray-800 pt-2">Your choices and how to reach us</h2>
          <p>There is no account to edit or delete. Because submitted text is sent to DeepSeek for processing and can briefly exist in the server’s memory cache, the practical steps available are to avoid submitting sensitive text and to contact us with any question about your data. For privacy questions or requests, write to <a href="mailto:contact@gpt-undetectable.com" className="text-violet-600 hover:underline">contact@gpt-undetectable.com</a>.</p>
          <p>The founder is <strong>czhcl123</strong>. The source repository is public: <a href="https://github.com/czhcl123/humanizer-site" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">github.com/czhcl123/humanizer-site</a>.</p>

          <h2 className="text-lg font-semibold text-gray-800 pt-2">Changes</h2>
          <p>This description reflects the site as of 24 November 2026. If the data flow changes, this page will be updated with a new date.</p>

          <p className="text-sm text-gray-500 pt-2">Related: <a href="/glossary" className="text-violet-600 hover:underline">AI detection glossary</a> · <a href="/about" className="text-violet-600 hover:underline">About</a></p>
        </article>
      </main>
    </>
  )
}
