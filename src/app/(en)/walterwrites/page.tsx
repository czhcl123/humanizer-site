import type { Metadata } from 'next'
import { languageAlternates, pageUrl } from '@/lib/site'
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd'
import Link from 'next/link'
import ToolClient from '../../../components/Tool/ToolClient'
import { walterwritesI18n } from '../../../components/Tool/i18n/walterwrites'
import WalterSeoZh from '../../../components/Tool/WalterSeoZh'

/** This route tree is English; the language is a compile-time constant. */
const lang = 'en' as const

const faqItems = [
  {
    q: 'Is Walter Writes AI free?',
    a: 'Walter Writes AI has historically offered a free trial and paid subscriptions. Prices change — check the official pricing page for current figures.' ,
  },
  {
    q: 'How much does Walter Writes AI cost?',
    a: 'We do not publish competitor price figures because they change. Check the official pricing page for current plans and limits.',
  },
  {
    q: 'Does Walter Writes AI work in Chinese?',
    a: 'Competitor language support should be checked on the official site. This free alternative supports English and Simplified Chinese only.' ,
  },
  {
    q: 'Do I need an account to use this page?',
    a: 'No. Paste your text, rewrite, and copy the result. There is no signup, no email, and no dashboard — 5 rewrites per IP per day, up to 3,000 characters each.',
  },
  {
    q: 'Is Walter Writes AI a detector guarantee?',
    a: 'Walter Writes AI markets itself as a writing-style tool. Detector results vary by detector, version and text; no vendor can guarantee a fixed outcome. Treat "100% undetectable" claims as marketing, not evidence.',
  },
  {
    q: 'What is the difference between this page and Walter Writes AI?',
    a: 'This page is an independent, free rewriter that reproduces the Walter Writes style. It is not the official product and has no accounts, dashboard, API, or team seats.',
  },
  {
    q: 'Can I cancel a Walter Writes AI subscription?',
    a: 'Walter Writes AI offers monthly and annual billing, and subscriptions can be managed from your account. Check their current terms before you buy, since pricing and cancellation rules can change.',
  },
  {
    q: 'Do you store the text I paste here?',
    a: 'No persistent storage; a short-lived in-memory cache may retain a hash of the input and the output for up to 10 minutes. See /privacy for details.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export async function generateMetadata(): Promise<Metadata> {
  const titles = {
    zh: 'Walter Writes AI 价格、免费替代与实测',
    en: 'Walter Writes AI: Free Alternative & Pricing',
  }
  const descriptions = {
    zh: 'Walter Writes AI 是付费工具,附免费免注册的同风格替代方案与定性对比;竞品价格请以官网为准。',
    en: 'Walter Writes AI: a paid humanizer with a built-in detector, plus a free, no-signup rewriter that writes in a similar style on this site.',
  }
  return {
    title: titles[lang],
    description: descriptions[lang],
    openGraph: {
      title: titles[lang],
      description: descriptions[lang],
      images: [{ url: 'https://gpt-undetectable.com/og-image.png', width: 1200, height: 630, alt: titles[lang] }],
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[lang],
      description: descriptions[lang],
      images: ['https://gpt-undetectable.com/og-image.png'],
    },
    alternates: { canonical: pageUrl('/walterwrites', 'en'), languages: languageAlternates('/walterwrites') },
  }
}

export default async function WalterPage() {

  // 2026-10-20 rank-push block (GSC: /walterwrites 200 imp / avg rank 31.4 / 0 clicks)
  // Targets: 'walter writes ai', 'walter writes ai free', 'walter writes ai pricing',
  // 'walter writes ai login', 'walterwrites ai detector', 'walter writes ai alternative'
  const seoBlockEn = (
    <section className="max-w-3xl mx-auto px-4 pt-8 pb-2 text-sm text-gray-600 leading-relaxed">
      <p className="text-xs text-gray-500 mb-4">
        Written by czhcl123, founder of AI Humanizer.
      </p>

      <h2 className="text-xl font-bold text-gray-800 mb-3">What Is Walter Writes AI?</h2>
      <p className="mb-3">
        <a href="https://walterwrites.ai" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">Walter Writes AI</a> is a paid AI humanizer with a built-in AI detector. You paste AI-generated text, choose a rewrite strength, and it reworks the draft into shorter paragraphs, contractions and uneven sentence lengths. Its exact feature list and language support should be checked on the official site.
      </p>
      <p className="mb-3">
        The style itself is the interesting part: less uniform sentence lengths and more conversational asides. Claims that any detector systematically misclassifies this style as human are widely discussed but unverified.
      </p>

      <h2 className="text-xl font-bold text-gray-800 mb-3 mt-6">Walter Writes AI Pricing</h2>
      <p className="mb-3">
        We do not reproduce competitor price tables: plans and limits change. Check the <a href="https://walterwrites.ai/pricing" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">official Walter Writes AI pricing page</a> before buying.
      </p>

      <h2 className="text-xl font-bold text-gray-800 mb-3 mt-6">Is There a Free Walter Writes AI Trial?</h2>
      <p className="mb-3">
        Historically a short free trial has been offered; check the official site for current terms. A short trial is enough to judge output style, not a full essay.
      </p>

      <h2 className="text-xl font-bold text-gray-800 mb-3 mt-6">Does Walter Writes AI guarantee detector results?</h2>
      <p className="mb-3">
        Walter Writes AI is built to make AI-generated text read like human writing, and its marketing targets exactly that use case. Independent results vary: detector versions change monthly, and the same tool can pass GPTZero and fail Originality.ai on the same text. No humanizer can promise a fixed pass rate, whatever the landing page says.
      </p>
      <p className="mb-3">
        The useful way to judge any tool is to run the same sample through several detectors before and after rewriting. Our method is documented on the{' '}
        <Link href="/bypass-test-methodology" className="text-violet-600 hover:underline">bypass test methodology</Link> page, and you can check any output yourself with the{' '}
        <Link href="/ai-detector" className="text-violet-600 hover:underline">free AI detector</Link>.
      </p>

      <h2 className="text-xl font-bold text-gray-800 mb-3 mt-6">Walter Writes AI Free Alternative</h2>
      <p className="mb-3">
        This page runs a free rewriter in the same style: short paragraphs, contractions, parenthetical asides, direct opinions, and wide sentence-length variation. It needs no signup, handles 3,000 characters per pass, allows 5 free rewrites per IP per day, and works in English and Simplified Chinese.
      </p>
      <p className="mb-3">
        It is a style rewriter, not a clone of the product: no account, no dashboard, no API, no team seats. If you need 30,000+ words a month, voice matching, or seats for a team, their paid plans are the better fit. If you want to see the difference on one essay, read the{' '}
        <Link href="/walterwrites-vs-undetectable" className="text-violet-600 hover:underline">Walter Writes vs Undetectable AI comparison</Link>.
      </p>

      <h2 className="text-xl font-bold text-gray-800 mb-3 mt-6">Is Walter Writes AI Legit?</h2>
      <p className="mb-3">
        Walter Writes AI is an operating commercial product with public pricing, a free trial, and monthly or annual billing you can manage from your account. It is not affiliated with this site: we do not sell it, resell it, or earn commission on its plans. Treat &quot;100% undetectable&quot; claims from any vendor as marketing rather than a guarantee.
      </p>

      <h2 className="text-xl font-bold text-gray-800 mb-3 mt-6">Which Tool Fits Your Text?</h2>
      <ul className="list-disc list-inside mb-3 space-y-1 pl-1">
        <li><strong className="text-gray-800">Blog posts, emails, marketing copy</strong> — this Walter Writes rewriter, or the <Link href="/" className="text-violet-600 hover:underline">AI Humanizer</Link>.</li>
        <li><strong className="text-gray-800">Student essays</strong> — <Link href="/essay-humanizer" className="text-violet-600 hover:underline">EssayRewriter</Link> keeps an academic register; for Turnitin-flagged work see <Link href="/turnitin-bypass" className="text-violet-600 hover:underline">Turnitin Bypass</Link>.</li>
        <li><strong className="text-gray-800">Not sure it passes?</strong> — check first with the <Link href="/ai-detector" className="text-violet-600 hover:underline">free AI Detector</Link>.</li>
      </ul>

      <h2 className="text-xl font-bold text-gray-800 mb-3 mt-6">Walter Writes AI FAQ</h2>
      <div className="space-y-3 mb-4">
        {faqItems.map((f) => (
          <div key={f.q}>
            <h3 className="text-base font-semibold text-gray-800 mb-1">{f.q}</h3>
            <p className="text-gray-600">{f.a}</p>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-500 mb-0 pt-3 border-t border-gray-100">
        No persistent storage; a short-lived in-memory cache may retain a hash of the input and the output for up to 10 minutes. See the privacy page at /privacy for details.
      </p>
      <p className="text-xs text-gray-400 mt-4">Last reviewed: 2026-11-24</p>
    </section>
  )

  return (
    <>
      <BreadcrumbJsonLd slug="/walterwrites" lang="en" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ToolClient mode="walterwrites" lang={lang} i18n={walterwritesI18n}
      heroTitle={{ zh: 'Walter Writes AI 价格、免费替代与实测', en: 'Walter Writes AI — Free Alternative & Comparison' }} heroSubtitle={{ zh: 'Walter Writes AI 是付费工具,本站提供同风格的免费免注册替代方案。竞品价格请以官网为准。', en: 'Walter Writes AI is a paid tool; this site offers a free, no-signup alternative in a similar style. Check official pricing for competitor figures.' }}
    />
      {seoBlockEn}
    </>
  )
}
