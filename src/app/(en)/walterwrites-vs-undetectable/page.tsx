import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd'
import { Metadata } from 'next'
import ToolClient from '../../../components/Tool/ToolClient'
import { walterwritesI18n } from '../../../components/Tool/i18n/walterwrites'

/** This route tree is English; the language is a compile-time constant. */
const lang = 'en' as const

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What does this comparison cover?', acceptedAnswer: { '@type': 'Answer', text: 'A plain comparison of writing tools: editing approach, access requirements and cost of using this site. It does not rank tools by detector results, which are unreliable and contested.' } },
    { '@type': 'Question', name: 'How much do the other tools cost?', acceptedAnswer: { '@type': 'Answer', text: 'We do not publish competitor prices because they change. Check each vendor’s official site for current plans. AI Humanizer is 100% free with no paid tier.' } },
    { '@type': 'Question', name: 'What are the limits of this site?', acceptedAnswer: { '@type': 'Answer', text: '100% free, no signup: 5 submissions per IP per rolling 24 hours, 3,000 characters each, English and Simplified Chinese. The prompt asks the model to preserve citations, numbers and proper nouns; verify manually. Detector scores are unreliable; published numbers here document limits, not performance.' } },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  const titles = {
    zh: '写作工具对比：AI Humanizer 与其他写作辅助',
    en: 'Writing Tool Comparison: AI Humanizer and Other Writing Aids',
  }
  const descriptions = {
    zh: '免费、无需注册的写作改进工具与其他写作辅助的普通对比：编辑取向与使用门槛。不比较检测能力，不列竞品价格。',
    en: 'Writing aids compared by editing approach and access: AI Humanizer is free, no signup, no detector promise.',
  }
  return {
    title: titles[lang],
    description: descriptions[lang],
    openGraph: { title: titles[lang], description: descriptions[lang] },
    alternates: {
      canonical: `https://gpt-undetectable.com/walterwrites-vs-undetectable`,
      languages: {
        'zh-CN': 'https://gpt-undetectable.com/zh/walterwrites-vs-undetectable',
        'en-US': 'https://gpt-undetectable.com/walterwrites-vs-undetectable',
        'x-default': 'https://gpt-undetectable.com/walterwrites-vs-undetectable',
      },
    },
  }
}

export default async function Page() {

  const seoBodyEn = (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6 text-gray-700 leading-relaxed space-y-3">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Writing tool comparison: AI Humanizer and other writing aids</h1>
      <p>This page keeps its old address for existing links. It is now a plain comparison of writing tools — how they approach editing, what access they require and what using this site costs. It does not compare any tool’s detector results, because <a href="/limitations" className="text-violet-600 hover:underline">detector scores are unreliable</a>.</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">Different editing approaches</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Walter Writes AI</strong> is a commercial writing product. A short-paragraph, opinion-forward style is a stylistic choice, not evidence about any detector.</li>
        <li><strong>Undetectable</strong> is another commercial rewriting product; check its official site for product details.</li>
        <li><strong>AI Humanizer</strong> is a free writing-improvement tool: clearer prose, natural rhythm and a prompt that asks the model to keep citations, numbers and proper nouns. Verify those yourself — LLM output is not post-processed.</li>
      </ul>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">Access and cost</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Other products:</strong> paid, with changing plans and signup requirements. Check the official sites — we do not list competitor prices.</li>
        <li><strong>AI Humanizer:</strong> 100% free, no signup, no installation, no paid tier; 5 submissions per IP per rolling 24 hours and 3,000 characters each; English and Simplified Chinese; cloud-processed with DeepSeek Chat; no persistent storage beyond a 10-minute in-memory cache.</li>
      </ul>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">How to write in your own voice</h2>
      <p>Whichever editor you use, the substance comes from you: add concrete details you know are accurate, state your own view, and check every citation, number and quotation against its source. AI Humanizer does not promise any detector outcome. For a <a href="/cost-comparison" className="text-violet-600 hover:underline">free-tool cost comparison</a>, see that page.</p>
    </div>
  )

  return (
    <>
      <BreadcrumbJsonLd slug="/walterwrites-vs-undetectable" lang="en" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="mb-6">{seoBodyEn}</div>
      <p className="text-xs text-gray-400 mt-4">Last reviewed: 2026-11-24</p>
      <ToolClient mode="walterwrites" lang={lang} i18n={walterwritesI18n} hideHeroTitle />
    </>
  )
}