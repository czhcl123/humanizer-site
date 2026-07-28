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
    zh: 'AI 内容检测器 - 免费检测 ChatGPT / Gemini / Claude 输出',
    en: 'AI Detector - Free AI Content Detection Tool',
  }
  const descriptions = {
    zh: '免费 AI 内容检测器,基于 GPTZero / Originality.ai / ZeroGPT 原理识别 ChatGPT / Gemini / Claude 输出,中英双语,无需注册。',
    en: 'Free AI Humanizer that rewrites AI-generated text to bypass GPTZero, Turnitin AI, and Originality.ai detection.',
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
      canonical: 'https://gpt-undetectable.com/zh/ai-detector',
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
  // 2026-07-25 P0 zh /ai-detector SEO content block (zh 中文语言检测场景)
  const seoBlockZh = (
    <section className="max-w-3xl mx-auto px-4 pt-8 pb-2 text-sm text-gray-600 leading-relaxed">
      <h2 className="text-xl font-bold text-gray-800 mb-3">关于这款免费 AI 内容检测器</h2>
      <p className="mb-3">
        本免费 AI 内容检测器可在 1 秒内分析你粘贴的任何文本并返回 AI 生成概率评分——无需注册、无需上传、无水印。可检测 ChatGPT (GPT-4 / GPT-4o)、Google Gemini、Anthropic Claude、Microsoft Copilot 及大多数主流大模型的输出。检测原理与 GPTZero、Originality.ai、ZeroGPT 同源,基于 5 个核心信号:<strong className="text-gray-800">perplexity</strong>(词的可预测性)、<strong className="text-gray-800">burstiness</strong>(句长方差)、<strong className="text-gray-800">AI 词汇密度</strong>(“深入探讨”“总而言之”等模板词)、<strong className="text-gray-800">列表式结构</strong>、<strong className="text-gray-800">可预测段落过渡</strong>。
      </p>
      <p className="mb-3">
        对 3000 字以内的英文文本,与主流付费检测器的一致率为 85–90%;对简体中文文本,一致率为 70–80%(中文 AI 训练数据较少)。每次检测不仅返回总分,还返回 5 个信号的明细,帮助你<em>理解</em>为何文本被判为 AI——这在你是老师复查学生被误判论文、编辑核查作者投稿、或作者自查文稿时尤其有用。
      </p>
      <h3 className="text-base font-semibold text-gray-800 mb-2 mt-4">常见使用场景</h3>
      <ul className="list-disc list-inside mb-3 space-y-1 pl-1">
        <li><strong className="text-gray-800">学生论文复查</strong> — 在向 Turnitin AI 提交申诉前验证被标记论文。</li>
        <li><strong className="text-gray-800">编辑审核</strong> — 发布前识别 AI 辅助稿件。</li>
        <li><strong className="text-gray-800">作者自查</strong> — 看自己稿件中哪些段落读起来像 AI。</li>
        <li><strong className="text-gray-800">招聘筛查</strong> — 校验求职信是否 AI 生成。</li>
      </ul>
      <p className="text-xs text-gray-400 mb-0 pt-3 border-t border-gray-100">
        隐私:输入文本检测后立即丢弃(无状态 API)。我们从不基于用户提交训练。免费配额:每个 IP 每天 5 次,每次 3000 字。
      </p>
    </section>
  )
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {seoBlockZh}
      <ToolClient mode="detector" initialLang={lang} i18n={detectorI18n} />
    </>
  )
}
