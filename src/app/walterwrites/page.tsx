import type { Metadata } from 'next'
import Link from 'next/link'
import ToolClient from '../../components/Tool/ToolClient'
import { walterwritesI18n } from '../../components/Tool/i18n/walterwrites'

export const dynamic = 'force-dynamic'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is Walter Writes?', acceptedAnswer: { '@type': 'Answer', text: 'Walter Writes AI is the natural writing style that AI detectors most often misclassify as human — short paragraphs, conversational, occasional asides, direct opinions.' } },
    { '@type': 'Question', name: 'Why does Walter Writes style pass AI detection?', acceptedAnswer: { '@type': 'Answer', text: 'AI detectors core signals are perplexity and burstiness. AI writing has both low. Walter Writes style has both high — surprising word choices, wild short-long variation, asides that spike perplexity further.' } },
    { '@type': 'Question', name: 'What scenarios is this best for?', acceptedAnswer: { '@type': 'Answer', text: 'Blog posts, product copy, marketing content, emails, social media posts. Anything you want to read like "a real friend wrote it". Not for academic essays.' } },
    { '@type': 'Question', name: 'Are my facts and data preserved?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. All facts, numbers, citations, and proper nouns are kept exactly. Only the surface expression is rewritten.' } },
    { '@type': 'Question', name: 'Does it support Chinese?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Both English and Simplified Chinese supported in the Walter Writes style.' } },
    { '@type': 'Question', name: 'Do you store my text?', acceptedAnswer: { '@type': 'Answer', text: 'No. Stateless API. Input discarded immediately after rewrite. We never train on user submissions.' } },
  ],
}

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const sp = await searchParams
  const lang = sp.lang === 'zh' ? 'zh' : 'en'
  const titles = {
    zh: 'Walterwrites AI 改写器 — 过检测 95%',
    en: 'Walter Writes AI — Free Rewriter to Bypass Detection',
  }
  const descriptions = {
    zh: 'Walter Writes 风格改写:短段落 + 口语化 + 直接观点,GPTZero / Turnitin 95% 过。免费,无需注册。',
    en: 'Rewrite AI text in the Walter Writes style — the voice detectors misclassify as human. Free, no signup. 95% bypass on GPTZero, Turnitin, Originality.ai.',
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

  // 2026-10-06 rank-push block (GSC: /walterwrites 697 imp / avg rank 41)
  // Targets: 'walter writes ai', 'what is walter writes ai', 'walter writes ai free', 'walter writes alternatives'
  const seoBlockEn = (
    <section className="max-w-3xl mx-auto px-4 pt-8 pb-2 text-sm text-gray-600 leading-relaxed">
      <h2 className="text-xl font-bold text-gray-800 mb-3">What Is Walter Writes AI?</h2>
      <p className="mb-3">
        Walter Writes AI is a writing style — and a paid rewriting tool — built on one idea: text should read like a sharp person talking, not a language model generating. The style uses short paragraphs, contractions everywhere, parenthetical asides, second-person address, and wild sentence-length variation. AI detectors (GPTZero, Originality.ai, Turnitin) partly flag machine text because it is uniform; the Walter Writes voice is the opposite of uniform.
      </p>
      <p className="mb-3">
        Searches like “Walter Writes AI free” and “Walter Writes AI alternative” exist because the official tool is subscription-based. This page is an independent rewriter that mimics the Walter Writes style: free, no signup, 5 rewrites per IP per day, 3,000 characters per pass, English and Simplified Chinese. It is not affiliated with Walter Writes AI.
      </p>
      <h3 className="text-base font-semibold text-gray-800 mb-2 mt-4">Free alternative to Walter Writes AI</h3>
      <ul className="list-disc list-inside mb-3 space-y-1 pl-1">
        <li><strong className="text-gray-800">Same aesthetic</strong> — short paragraphs, contractions, asides, direct opinions, AI-vocabulary replacement.</li>
        <li><strong className="text-gray-800">No subscription</strong> — paste, rewrite, copy. 5 free rewrites per day per IP.</li>
        <li><strong className="text-gray-800">See the comparison</strong> — <Link href="/walterwrites-vs-undetectable" className="text-violet-600 hover:underline">Walter Writes vs Undetectable AI, side by side</Link>.</li>
      </ul>
      <h3 className="text-base font-semibold text-gray-800 mb-2 mt-4">Which tool fits your text?</h3>
      <ul className="list-disc list-inside mb-3 space-y-1 pl-1">
        <li><strong className="text-gray-800">Blog posts, emails, marketing copy</strong> — this Walter Writes rewriter, or the <Link href="/" className="text-violet-600 hover:underline">AI Humanizer</Link>.</li>
        <li><strong className="text-gray-800">Student essays</strong> — <Link href="/essay-humanizer" className="text-violet-600 hover:underline">EssayRewriter</Link> keeps academic register; for Turnitin-flagged work see <Link href="/turnitin-bypass" className="text-violet-600 hover:underline">Turnitin Bypass</Link>.</li>
        <li><strong className="text-gray-800">Not sure it passes?</strong> — check first with the <Link href="/ai-detector" className="text-violet-600 hover:underline">free AI Detector</Link>.</li>
      </ul>
      <p className="text-xs text-gray-400 mb-0 pt-3 border-t border-gray-100">
        Privacy: input text is discarded immediately after rewriting (stateless API). We never train on user submissions.
      </p>
    </section>
  )

  const seoBlockZh = (
    <section className="max-w-3xl mx-auto px-4 pt-8 pb-2 text-sm text-gray-600 leading-relaxed">
      <h2 className="text-xl font-bold text-gray-800 mb-3">什么是 Walter Writes AI?</h2>
      <p className="mb-3">
        Walter Writes AI 是一种写作风格,也是一个付费改写工具,核心理念只有一个:文本应该读起来像一个思路清晰的人在说话,而不是语言模型在生成。这种风格的特征:短段落、大量自然缩写、括号旁白、第二人称、句子长度剧烈变化。AI 检测器(GPTZero、Originality.ai、Turnitin)判定机器文本的部分依据是“过于均匀”,而 Walter Writes 风格恰恰是均匀的反面。
      </p>
      <p className="mb-3">
        “Walter Writes AI 免费”“Walter Writes AI 替代”这类搜索存在,因为官方工具是订阅制。本页面是一个独立的 Walter Writes 风格改写器:免费、无需注册、每 IP 每天 5 次、每次 3000 字、支持中英文。与 Walter Writes AI 官方无关联。
      </p>
      <h3 className="text-base font-semibold text-gray-800 mb-2 mt-4">Walter Writes AI 的免费替代</h3>
      <ul className="list-disc list-inside mb-3 space-y-1 pl-1">
        <li><strong className="text-gray-800">同种美学</strong> — 短段落、自然缩写、括号旁白、直接观点、替换 AI 词汇。</li>
        <li><strong className="text-gray-800">无需订阅</strong> — 粘贴、改写、复制。每 IP 每天 5 次免费。</li>
        <li><strong className="text-gray-800">看详细对比</strong> — <Link href="/zh/walterwrites-vs-undetectable" className="text-violet-600 hover:underline">Walter Writes vs Undetectable AI 逐项对比</Link>。</li>
      </ul>
      <h3 className="text-base font-semibold text-gray-800 mb-2 mt-4">你的文本该用哪个工具?</h3>
      <ul className="list-disc list-inside mb-3 space-y-1 pl-1">
        <li><strong className="text-gray-800">博客、邮件、营销文案</strong> — 本 Walter Writes 改写器,或 <Link href="/zh" className="text-violet-600 hover:underline">AI Humanizer</Link>。</li>
        <li><strong className="text-gray-800">学生论文</strong> — <Link href="/zh/essay-humanizer" className="text-violet-600 hover:underline">EssayRewriter</Link> 保持学术语域;被 Turnitin 标记的看 <Link href="/zh/turnitin-bypass" className="text-violet-600 hover:underline">Turnitin Bypass</Link>。</li>
        <li><strong className="text-gray-800">不确定能不能过?</strong> — 先用 <Link href="/zh/ai-detector" className="text-violet-600 hover:underline">免费 AI 检测器</Link> 查一遍。</li>
      </ul>
      <p className="text-xs text-gray-400 mb-0 pt-3 border-t border-gray-100">
        隐私:输入文本改写后立即丢弃(无状态 API)。我们从不用用户提交训练模型。
      </p>
    </section>
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {lang === 'zh' ? seoBlockZh : seoBlockEn}
      <ToolClient mode="walterwrites" initialLang={lang} i18n={walterwritesI18n} />
    </>
  )
}
