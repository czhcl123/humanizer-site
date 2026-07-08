import type { Metadata } from 'next'
import ToolClient from '../../components/Tool/ToolClient'
import { essayI18n } from '../../components/Tool/i18n/essay'

export const dynamic = 'force-dynamic'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Is AI EssayRewriter really free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. AI EssayRewriter is 100% free with no premium tier, no signup, and no installation. Paste your paper text, click Humanize, and get a natural-sounding rewrite. Up to 3,000 characters per submission.' } },
    { '@type': 'Question', name: 'Does it pass Turnitin paper AI detection?', acceptedAnswer: { '@type': 'Answer', text: 'Calibrated specifically against Turnitin AI, GPTZero, and Originality.ai paper detection. 85-95% pass rate on English papers up to 3,000 characters.' } },
    { '@type': 'Question', name: 'Does it preserve my citations and facts?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Your thesis, citations, dates, numbers, and proper nouns are all preserved exactly. Only the surface expression is rewritten.' } },
    { '@type': 'Question', name: 'Can I use it for school academic paper?', acceptedAnswer: { '@type': 'Answer', text: 'The tool helps you rewrite text you have permission to use. Users are responsible for following their school academic integrity policy. We do not help with plagiarism.' } },
    { '@type': 'Question', name: 'Does it support Chinese papers?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. English and Simplified Chinese papers supported. Idioms and academic terms preserved.' } },
    { '@type': 'Question', name: 'Do you store my paper?', acceptedAnswer: { '@type': 'Answer', text: 'No. Stateless API. Input discarded immediately after rewrite. We never train on user submissions.' } },
  ],
}

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const sp = await searchParams
  const lang = sp.lang === 'zh' ? 'zh' : 'en'
  const titles = {
    zh: 'AI composition Humanizer - 免费论文改写,绕过 Turnitin 检测',
    en: 'AI EssayRewriter - Free paper Rewriter, Bypass Turnitin',
  }
  const descriptions = {
    zh: '免费 AI EssayRewriter,专门为学生论文改写优化。绕过 GPTZero、Turnitin、Originality.ai 论文检测,保留论点、引用、事实。中英双语。',
    en: 'Free AI student work Humanizer optimized for student papers. Bypass GPTZero, Turnitin AI, and Originality.ai paper detection. Preserves thesis, citations, and facts. Bilingual.',
  }
  return {
    title: titles[lang],
    description: descriptions[lang],
    openGraph: { title: titles[lang], description: descriptions[lang] },
    alternates: {
      canonical: 'https://humanizer-site-production.up.railway.app/paper-humanizer',
      languages: {
        'zh-CN': '/paper-humanizer?lang=zh',
        'en-US': '/paper-humanizer?lang=en',
        'x-default': '/paper-humanizer',
      },
    },
  }
}

export default async function paperPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const sp = await searchParams
  const lang = sp.lang === 'zh' ? 'zh' : 'en'
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ToolClient mode="paper" initialLang={lang} i18n={essayI18n} />
    </>
  )
}