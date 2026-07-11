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
  ],
}

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const sp = await searchParams
  const lang = sp.lang === 'zh' ? 'zh' : 'en'
  const titles = {
    zh: 'Turnitin AI Bypass - 免费绕过 Turnitin AI 检测',
    en: 'Turnitin AI Bypass - Free Turnitin AI Detection Bypass',
  }
  const descriptions = {
    zh: '免费在线绕过 Turnitin AI 检测。专门针对 Turnitin 算法调优,保留引用、事实、数据。85-95% 通过率。',
    en: 'Free online Turnitin AI bypass. Specifically tuned against Turnitin\'s detection algorithm. Preserves citations, facts, data. 85-95% pass rate.',
  }
  return {
    title: titles[lang],
    description: descriptions[lang],
    openGraph: { title: titles[lang], description: descriptions[lang] },
    alternates: {
      canonical: `https://humanizer-site-production.up.railway.app/turnitin-bypass${lang === 'zh' ? '?lang=zh' : '?lang=en'}`,
      languages: {
        'zh-CN': '/turnitin-bypass?lang=zh',
        'en-US': '/turnitin-bypass?lang=en',
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