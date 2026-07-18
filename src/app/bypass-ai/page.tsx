import type { Metadata } from 'next'
import ToolClient from '../../components/Tool/ToolClient'
import { turnitinI18n } from '../../components/Tool/i18n/turnitin'

export const dynamic = 'force-dynamic'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What does "bypass AI" mean?', acceptedAnswer: { '@type': 'Answer', text: 'Bypass AI detection means rewriting AI-generated text so AI detectors (Turnitin AI, GPTZero, Originality.ai, ZeroGPT) flag it as human-written. This tool breaks sentence-level perplexity patterns that AI detectors use to flag content.' } },
    { '@type': 'Question', name: 'Which AI detectors does this bypass?', acceptedAnswer: { '@type': 'Answer', text: 'Turnitin AI, GPTZero, Originality.ai, ZeroGPT, Winston AI, Copyleaks. 85-95% pass rate on English text up to 3,000 characters per submission.' } },
    { '@type': 'Question', name: 'Does it bypass Turnitin AI specifically?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The bypass engine is tuned against Turnitin sentence-perplexity heuristics, AI vocabulary density, and predictable paragraph transitions. Same engine as our dedicated Turnitin Bypass tool.' } },
    { '@type': 'Question', name: 'Does it bypass GPTZero?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. GPTZero flags based on perplexity and burstiness. This tool varies sentence length and injects conversational markers that mimic human burstiness.' } },
    { '@type': 'Question', name: 'Does it bypass Originality.ai?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Originality.ai uses similar signals to GPTZero plus semantic uniformity detection. The bypass engine varies vocabulary density and paragraph structure.' } },
    { '@type': 'Question', name: 'Are citations and data preserved?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. All citations, proper nouns, numbers, dates, and formulas are kept exactly. Only surface expression is rewritten.' } },
    { '@type': 'Question', name: 'Do you store my text?', acceptedAnswer: { '@type': 'Answer', text: 'No. Stateless API. Input discarded immediately after rewrite. We never train on user submissions.' } },
    { '@type': 'Question', name: 'How long does bypass take?', acceptedAnswer: { '@type': 'Answer', text: '3-8 seconds for a 3,000-character submission. No queue, no signup, no waiting.' } },
  ],
}

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const sp = await searchParams
  const lang = sp.lang === 'zh' ? 'zh' : 'en'
  const titles = {
    zh: 'Bypass AI - 免费绕过 Turnitin / GPTZero / Originality.ai 检测 (85-95% 通过)',
    en: 'Bypass AI - Free AI Detector Bypass for Turnitin, GPTZero, Originality.ai (85-95% Pass)',
  }
  const descriptions = {
    zh: '免费 Bypass AI 工具:绕过 Turnitin AI、GPTZero、Originality.ai、ZeroGPT 检测。85-95% 通过率,保留引用/数据/公式,无需注册,本地处理。',
    en: 'Free bypass AI tool: rewrite AI text to pass Turnitin AI, GPTZero, Originality.ai, ZeroGPT detection. 85-95% pass rate. Preserves citations, data, formulas. No signup, no tracking, 3-8 second turnaround.',
  }
  return {
    title: titles[lang],
    description: descriptions[lang],
    openGraph: { title: titles[lang], description: descriptions[lang] },
    alternates: {
      canonical: 'https://gpt-undetectable.com/bypass-ai',
      languages: {
        'zh-CN': '/zh/bypass-ai',
        'en-US': '/bypass-ai',
        'x-default': '/bypass-ai',
      },
    },
  }
}

export default async function BypassAiPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const sp = await searchParams
  const lang = sp.lang === 'zh' ? 'zh' : 'en'
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ToolClient mode="turnitin" initialLang={lang} i18n={turnitinI18n} />
    </>
  )
}