import type { Metadata } from 'next'
import Link from 'next/link'
import ToolClient from '../../components/Tool/ToolClient'
import { walterwritesI18n } from '../../components/Tool/i18n/walterwrites'
import WalterSeoZh from '../../components/Tool/WalterSeoZh'

export const dynamic = 'force-dynamic'

const faqItems = [
  {
    q: 'Is Walter Writes AI free?',
    a: 'Walter Writes AI offers a free 300-word trial with no credit card required. Ongoing use is subscription-based: the Starter plan is $8 per month (billed $96 annually) at the time of writing.',
  },
  {
    q: 'How much does Walter Writes AI cost?',
    a: 'Starter is $8/month for 30,000 words, Pro is $13/month for 70,000 words, Elite is $26/month for 200,000 words, and Teams is $99/month for 500,000 words with 10 team members. Annual billing is discounted.',
  },
  {
    q: 'Does Walter Writes AI work in Chinese?',
    a: 'Walter Writes AI lists support for 80+ languages on its site. This free alternative works in English and Simplified Chinese.',
  },
  {
    q: 'Do I need an account to use this page?',
    a: 'No. Paste your text, rewrite, and copy the result. There is no signup, no email, and no dashboard — 5 rewrites per IP per day, up to 3,000 characters each.',
  },
  {
    q: 'Does Walter Writes AI bypass Turnitin?',
    a: 'Walter Writes AI is built to make AI-generated text read like human writing, and its site markets it for that purpose. Actual detector results vary by detector, version, and text — no tool can guarantee a fixed pass rate. Test your own sample on more than one detector.',
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
    a: 'No. The rewrite API is stateless: input text is discarded immediately after processing and is never used for model training.',
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

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ lang?: string }> }): Promise<Metadata> {
  const sp = await searchParams
  const lang = sp.lang === 'zh' ? 'zh' : 'en'
  const titles = {
    zh: 'Walter Writes AI 价格、免费替代与实测',
    en: 'Walter Writes AI: Free Alternative & Pricing',
  }
  const descriptions = {
    zh: 'Walter Writes AI 实测:月付 $8 起、免费 300 词试用、内置检测器;附免费免注册的同风格替代方案与逐项对比。',
    en: 'Walter Writes AI, tested: $8/mo Starter, free 300-word trial, built-in detector — plus a free, no-signup alternative that writes in the same style.',
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
    alternates: {
      canonical: 'https://gpt-undetectable.com/walterwrites',
      languages: {
        'zh-CN': '/zh/walterwrites',
        'en-US': '/walterwrites',
        'x-default': '/walterwrites',
      },
    },
  }
}

export default async function WalterPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const sp = await searchParams
  const lang = sp.lang === 'zh' ? 'zh' : 'en'

  // 2026-10-20 rank-push block (GSC: /walterwrites 200 imp / avg rank 31.4 / 0 clicks)
  // Targets: 'walter writes ai', 'walter writes ai free', 'walter writes ai pricing',
  // 'walter writes ai login', 'walterwrites ai detector', 'walter writes ai alternative'
  const seoBlockEn = (
    <section className="max-w-3xl mx-auto px-4 pt-8 pb-2 text-sm text-gray-600 leading-relaxed">
      <p className="text-xs text-gray-400 mb-4">
        Last updated 20 October 2026 · Written by czhcl123, who builds and tests AI-detection tools.
      </p>

      <h2 className="text-xl font-bold text-gray-800 mb-3">What Is Walter Writes AI?</h2>
      <p className="mb-3">
        Walter Writes AI (walterwrites.ai) is a paid AI humanizer with a built-in AI detector. You paste AI-generated text, choose a rewrite strength, and it reworks the draft so it reads like a person wrote it: shorter paragraphs, contractions, uneven sentence lengths, occasional asides. Their site lists 80+ languages, voice matching, adjustable rewrite strength, an API, and an MCP connector for Claude.
      </p>
      <p className="mb-3">
        The style itself is the interesting part. AI detectors (GPTZero, Originality.ai, Turnitin) partly flag machine text because it is uniform — even sentence lengths, even vocabulary, no digressions. The Walter Writes voice is the opposite of uniform, which is why people search for it by name.
      </p>

      <h2 className="text-xl font-bold text-gray-800 mb-3 mt-6">Walter Writes AI Pricing (Checked October 2026)</h2>
      <div className="overflow-x-auto mb-3">
        <table className="w-full text-xs border border-gray-200 rounded">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="text-left p-2 border-b border-gray-200">Plan</th>
              <th className="text-left p-2 border-b border-gray-200">Words / month</th>
              <th className="text-left p-2 border-b border-gray-200">Monthly</th>
              <th className="text-left p-2 border-b border-gray-200">Annual (billed)</th>
              <th className="text-left p-2 border-b border-gray-200">Words / request</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="p-2 border-b border-gray-100 font-medium text-gray-800">Starter</td><td className="p-2 border-b border-gray-100">30,000</td><td className="p-2 border-b border-gray-100">$8</td><td className="p-2 border-b border-gray-100">$96</td><td className="p-2 border-b border-gray-100">750</td></tr>
            <tr><td className="p-2 border-b border-gray-100 font-medium text-gray-800">Pro</td><td className="p-2 border-b border-gray-100">70,000</td><td className="p-2 border-b border-gray-100">$13</td><td className="p-2 border-b border-gray-100">$156</td><td className="p-2 border-b border-gray-100">1,500</td></tr>
            <tr><td className="p-2 border-b border-gray-100 font-medium text-gray-800">Elite</td><td className="p-2 border-b border-gray-100">200,000</td><td className="p-2 border-b border-gray-100">$26</td><td className="p-2 border-b border-gray-100">$312</td><td className="p-2 border-b border-gray-100">2,000</td></tr>
            <tr><td className="p-2 font-medium text-gray-800">Teams</td><td className="p-2">500,000</td><td className="p-2">$99</td><td className="p-2">$1,188</td><td className="p-2">2,000</td></tr>
          </tbody>
        </table>
      </div>
      <p className="mb-3 text-xs text-gray-500">
        Figures taken from the Walter Writes AI pricing page on 20 October 2026. Prices and limits can change — check their site before buying.
      </p>

      <h2 className="text-xl font-bold text-gray-800 mb-3 mt-6">Is There a Free Walter Writes AI Trial?</h2>
      <p className="mb-3">
        Yes. Walter Writes AI offers a 300-word trial with no credit card required. Three hundred words is roughly one short email or an abstract — enough to judge the output style, not enough for a full essay or a blog post.
      </p>

      <h2 className="text-xl font-bold text-gray-800 mb-3 mt-6">Does Walter Writes AI Bypass Turnitin and GPTZero?</h2>
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

      <p className="text-xs text-gray-400 mb-0 pt-3 border-t border-gray-100">
        Privacy: input text is discarded immediately after rewriting (stateless API). We never train on user submissions.
      </p>
    </section>
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ToolClient mode="walterwrites" initialLang={lang} i18n={walterwritesI18n} />
      {lang === 'zh' ? <WalterSeoZh /> : seoBlockEn}
    </>
  )
}
