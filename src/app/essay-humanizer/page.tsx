import type { Metadata } from 'next'
import ToolClient from '../../components/Tool/ToolClient'
import { essayI18n } from '../../components/Tool/i18n/essay'

export const dynamic = 'force-dynamic'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Is AI EssayRewriter really free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. AI EssayRewriter is 100% free with no premium tier, no signup, and no installation. Paste your paper text, click Humanize, and get a natural-sounding rewrite. Up to 3,000 characters per submission.' } },
    { '@type': 'Question', name: 'Does it pass Turnitin paper AI detection?', acceptedAnswer: { '@type': 'Answer', text: 'Calibrated specifically against Turnitin AI, GPTZero, and Originality.ai document detection. 85-95% pass rate on English papers up to 3,000 characters.' } },
    { '@type': 'Question', name: 'Does it preserve my citations and facts?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Your thesis, citations, dates, numbers, and proper nouns are all preserved exactly. Only the surface expression is rewritten.' } },
    { '@type': 'Question', name: 'Can I use it for school academic paper?', acceptedAnswer: { '@type': 'Answer', text: 'The tool helps you rewrite text you have permission to use. Users are responsible for following their school academic integrity policy. We do not help with plagiarism.' } },
    { '@type': 'Question', name: 'Does it support Chinese writing?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. English and Simplified Chinese papers supported. Idioms and academic terms preserved.' } },
    { '@type': 'Question', name: 'Do you store my paper?', acceptedAnswer: { '@type': 'Answer', text: 'No. Stateless API. Input discarded immediately after rewrite. We never train on user submissions.' } },
  ],
}

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const sp = await searchParams
  const lang = sp.lang === 'zh' ? 'zh' : 'en'
  const titles = {
    zh: 'AI Essay Humanizer - 免费学生论文改写,绕过 Turnitin 检测',
    en: 'AI EssayRewriter - Free text Rewriter, Bypass Turnitin',
  }
  const descriptions = {
    zh: '免费 AI Humanizer 改写 AI 生成的文本,绕过 GPTZero、Turnitin、Originality.ai 检测。保留引用、事实、数据。中英双语。',
    en: 'Free AI Humanizer that rewrites AI-generated text to bypass GPTZero, Turnitin AI, and Originality.ai detection. Preserves citations, dates, and proper nouns. Bilingual.',
  }
  return {
    title: titles[lang],
    description: descriptions[lang],
    openGraph: { title: titles[lang], description: descriptions[lang] },
    alternates: {
      canonical: `https://humanizer-site-production.up.railway.app/essay-humanizer${lang === 'zh' ? '?lang=zh' : '?lang=en'}`,
      languages: {
        'zh-CN': '/essay-humanizer?lang=zh',
        'en-US': '/essay-humanizer?lang=en',
        'x-default': '/essay-humanizer',
      },
    },
  }
}

export default async function essayPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const sp = await searchParams
  const lang = sp.lang === 'zh' ? 'zh' : 'en'
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ToolClient mode="essay" initialLang={lang} i18n={essayI18n} />
    </>
  )
}