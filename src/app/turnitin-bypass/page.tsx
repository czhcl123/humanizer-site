import type { Metadata } from 'next'
import ToolClient from '../../components/Tool/ToolClient'
import { turnitinI18n } from '../../components/Tool/i18n/turnitin'

export const dynamic = 'force-dynamic'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Does it pass Turnitin AI detection?', acceptedAnswer: { '@type': 'Answer', text: 'Tuned specifically for Turnitin AI. 85-95% pass rate on English essays up to 3,000 characters. Longer essays should be split into sections.' } },
    { '@type': 'Question', name: 'What is Turnitin\'s detection algorithm?', acceptedAnswer: { '@type': 'Answer', text: 'Turnitin uses sentence-level perplexity, burstiness, AI vocabulary density ("delve", "leverage", "robust", "furthermore", "in conclusion"), and predictable paragraph transitions. We reverse-engineer each signal.' } },
    { '@type': 'Question', name: 'Are citations and data preserved?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. All citations, proper nouns, numbers, dates, and formulas are kept exactly. Only surface expression is rewritten.' } },
    { '@type': 'Question', name: 'Are AI vocabulary words removed?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. "Delve", "leverage", "robust", "comprehensive", "furthermore", "moreover", "in conclusion", "it is important to note" are all replaced with natural expressions.' } },
    { '@type': 'Question', name: 'Does it support Chinese essays?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Both English and Simplified Chinese supported. Chinese mode is tuned for 知网 (CNKI), 维普, GPTZero Chinese, and ZeroGPT Chinese.' } },
    { '@type': 'Question', name: 'Do you store my essay?', acceptedAnswer: { '@type': 'Answer', text: 'No. Stateless API. Input discarded immediately after rewrite. We never train on user submissions.' } },
    { '@type': 'Question', name: 'Can I bypass Turnitin without changing my original meaning?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. This tool specifically protects citations in (Author, Year) format, factual data, numerical references, and quoted material while rewriting the surrounding prose. This is the key differentiator from basic paraphrase tools that mangle citations or change numbers in your data tables. Specialized tools like HumanizeMyAI explicitly train on citation preservation; most generic humanizers (QuillBot, Wordtune) were built for marketing copy and strip academic markers as a side effect. Practical workflow: paste your AI draft with all citations and numbers intact, run heavy mode, then verify that (Smith, 2019) markers and any quoted material stayed unchanged. The rewrite only touches sentence structure, vocabulary, and connector words. Your thesis, arguments, evidence, and source attributions all stay exactly as you wrote them.' } },
  ],
}

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const sp = await searchParams
  const lang = sp.lang === 'zh' ? 'zh' : 'en'
  const titles = {
    zh: 'Turnitin AI Bypass - 免费绕过 Turnitin AI 检测',
    en: 'Turnitin AI Detector Bypass - Free, Preserves Citations 2026',
  }
  const descriptions = {
    zh: '免费在线绕过 Turnitin AI 检测。专门针对 Turnitin 算法调优,保留引用、事实、数据。85-95% 通过率。',
    en: 'Free online Turnitin AI bypass: rewrite essays, research papers, and assignments to pass Turnitin AI detection. Specifically tuned against Turnitin sentence-perplexity and AI-vocabulary heuristics. Preserves (Author, Year) citations, factual data, and quoted material. 85-95% pass rate on English text up to 3,000 characters. No signup.',
  }
  return {
    title: titles[lang],
    description: descriptions[lang],
    openGraph: { title: titles[lang], description: descriptions[lang] },
    alternates: {
      canonical: 'https://gpt-undetectable.com/turnitin-bypass',
      languages: {
        'zh-CN': '/zh/turnitin-bypass',
        'en-US': '/turnitin-bypass',
        'x-default': '/turnitin-bypass',
      },
    },
  }
}

export default async function TurnitinPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const sp = await searchParams
  const lang = sp.lang === 'zh' ? 'zh' : 'en'
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ToolClient mode="turnitin" initialLang={lang} i18n={turnitinI18n} />
    </>
  )
}