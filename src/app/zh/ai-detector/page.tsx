import type { Metadata } from 'next'
import ToolClient from '../../../components/Tool/ToolClient'
import { detectorI18n } from '../../../components/Tool/i18n/detector'

export const dynamic = 'force-dynamic'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Is the AI Detector really free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. No hidden fees, no watermark, no signup. 5 submissions per IP per day, 3,000 characters each.' } },
    { '@type': 'Question', name: 'What is the detection principle?', acceptedAnswer: { '@type': 'Answer', text: 'Based on GPTZero, Originality.ai, ZeroGPT core principles: sentence length uniformity, AI vocabulary density, perplexity, burstiness, list-like structure, predictable paragraph transitions. Each signal analyzed individually, then combined.' } },
    { '@type': 'Question', name: 'How accurate is it?', acceptedAnswer: { '@type': 'Answer', text: 'For English text up to 3,000 characters, consistency with mainstream detectors is 85-90%. Chinese detection accuracy is slightly lower because Chinese AI training data is more limited.' } },
    { '@type': 'Question', name: 'Can it misclassify?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. A human author writing in a very uniform, "AI-flavored" style may be misclassified as AI. AI text with contractions, fragments, and first-person voice may be misclassified as human. Calibration is based on real data, but it is not 100%.' } },
    { '@type': 'Question', name: 'Do you store my text?', acceptedAnswer: { '@type': 'Answer', text: 'No. Stateless API. Input discarded immediately after detection. We never train on user submissions.' } },
    { '@type': 'Question', name: 'Does it support Chinese?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Both English and Simplified Chinese supported. Chinese mode is tuned for AI boilerplate vocabulary, symmetric four-character structures, and conversational transitions.' } },
  ],
}

export async function generateMetadata() {
  const lang = 'zh'
  const titles = {
    zh: 'AI Detector - 免费 AI 内容检测工具',
    en: 'AI Detector - Free AI Content Detection Tool',
  }
  const descriptions = {
    zh: '免费 AI Humanizer,改写 ChatGPT / Gemini / Claude 输出,绕过 GPTZero、Turnitin、Originality.ai 检测,无需注册,中英双语。',
    en: 'Free AI Humanizer that rewrites AI-generated text to bypass GPTZero, Turnitin AI, and Originality.ai detection.',
  }
  return {
    title: titles[lang],
    description: descriptions[lang],
    openGraph: { title: titles[lang], description: descriptions[lang] },
    alternates: {
      canonical: 'https://humanizer-site-production.up.railway.app/zh/ai-detector',
      languages: {
        'zh-CN': '/zh/ai-detector',
        'en-US': '/ai-detector',
        'x-default': '/ai-detector',
      },
    },
  }
}

export default async function DetectorPage() {
  const lang = 'zh'
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ToolClient mode="detector" initialLang={lang} i18n={detectorI18n} />
    </>
  )
}