import type { Metadata } from 'next'
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
    en: 'Walter Writes AI — Rewrite AI Text to Bypass Detection',
  }
  const descriptions = {
    zh: 'Walter Writes 风格改写:短段落 + 口语化 + 直接观点,GPTZero / Turnitin 95% 过。免费,无需注册。',
    en: 'Rewrite AI text in the Walter Writes style — the voice AI detectors misclassify as human. Free, no signup, 3,000 chars per pass. Tested 95% bypass on GPTZero, Turnitin, Originality.ai.',
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
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ToolClient mode="walterwrites" initialLang={lang} i18n={walterwritesI18n} />
    </>
  )
}
