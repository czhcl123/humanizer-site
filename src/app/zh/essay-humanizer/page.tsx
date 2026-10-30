import type { Metadata } from 'next'
import ToolClient from '../../../components/Tool/ToolClient'
import { essayI18n } from '../../../components/Tool/i18n/essay'

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

export async function generateMetadata() {
  const lang = 'zh'
  const titles = {
    zh: 'Essay Rewriter - 免费 AI 论文改写,过 Turnitin 与 GPTZero',
    en: 'Essay Rewriter - Free AI Essay Humanizer & Paraphraser 2026',
  }
  const descriptions = {
    zh: '免费 Essay rewriter,改写 AI 生成的论文,绕过 Turnitin、GPTZero、Originality.ai 检测,保留引用、事实、数据。',
    en: 'Free AI Humanizer that rewrites AI-generated text to bypass GPTZero, Turnitin AI, and Originality.ai detection. Preserves citations, dates, and proper nouns. Bilingual.',
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
      canonical: 'https://gpt-undetectable.com/zh/essay-humanizer',
      languages: {
        'zh-CN': '/zh/essay-humanizer',
        'en-US': '/essay-humanizer',
        'x-default': '/essay-humanizer',
      },
    },
  }
}

export default async function essayPage() {
  const lang = 'zh'
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6 text-gray-700 leading-relaxed space-y-3 max-w-3xl mx-auto">
        <p><strong>Essay Rewriter</strong> 专为学术写作设计：将 AI 生成的论文草稿改写成自然人类风格，绕过 Turnitin AI、GPTZero、Originality.ai 的检测，同时完整保留引用格式（如 Smith, 2019）、数据、年份和专有名词。适用于 1 页反思文章到 10 页研究论文。</p>
        <h2 className="text-lg font-semibold text-gray-800 pt-2">为什么需要改写</h2>
        <p>AI 生成的论文有明显特征：句式过于整齐、过渡词重复（"furthermore", "moreover", "therefore"）、缺乏个人观点。检测器通过统计模式识别这些特征，而不是理解内容。本工具重构句式结构、替换模板词汇、增加真实观点表达，让内容通过检测的同时保持学术严谨。</p>
      </div>
      <ToolClient mode="essay" initialLang={lang} i18n={essayI18n} />
    </>
  )
}
