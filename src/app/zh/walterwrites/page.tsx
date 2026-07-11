import type { Metadata } from 'next'
import ToolClient from '../../../components/Tool/ToolClient'
import { walterwritesI18n } from '../../../components/Tool/i18n/walterwrites'

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

export async function generateMetadata() {
  const lang = 'zh'
  const titles = {
    zh: 'Walterwrites AI - 模仿 Walter Writes 风格改写',
    en: 'Walterwrites AI - Rewrite in Walter Writes Style',
  }
  const descriptions = {
    zh: '免费 AI Humanizer,改写 ChatGPT / Gemini / Claude 输出,绕过 GPTZero、Turnitin、Originality.ai 检测,无需注册,中英双语。',
    en: 'Free online rewriter in the Walter Writes style. The natural voice AI detectors most often misclassify as human — short paragraphs, conversational, parenthetical asides, direct opinions.',
  }
  return {
    title: titles[lang],
    description: descriptions[lang],
    openGraph: { title: titles[lang], description: descriptions[lang] },
    alternates: {
      canonical: 'https://humanizer-site-production.up.railway.app/zh/walterwrites',
      languages: {
        'zh-CN': '/zh/walterwrites',
        'en-US': '/walterwrites',
        'x-default': '/walterwrites',
      },
    },
  }
}

export default async function WalterPage() {
  const lang = 'zh'
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ToolClient mode="walterwrites" initialLang={lang} i18n={walterwritesI18n} />
    </>
  )
}