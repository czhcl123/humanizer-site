import type { Metadata } from 'next'
import ToolClient from '../../components/Tool/ToolClient'
import { detectorI18n } from '../../components/Tool/i18n/detector'

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

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const sp = await searchParams
  const lang = sp.lang === 'zh' ? 'zh' : 'en'
  const titles = {
    zh: 'AI Detector - 免费 AI 内容检测',
    en: 'AI Detector - Free AI Content Detector',
  }
  const descriptions = {
    zh: '免费 AI 检测器,基于 GPTZero、Originality.ai、ZeroGPT 原理识别 ChatGPT / Gemini / Claude 输出,无需注册,中英双语。',
    en: 'Free AI content detector: paste any text and get an AI-likelihood score in 1 second. Trained on GPTZero, Originality.ai, and ZeroGPT detection principles. Detects ChatGPT, Gemini, Claude, and Copilot output. No signup, no upload, up to 3,000 characters.',
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
      canonical: 'https://gpt-undetectable.com/ai-detector',
      languages: {
        'zh-CN': '/zh/ai-detector',
        'en-US': '/ai-detector',
        'x-default': '/ai-detector',
      },
    },
  }
}

export default async function DetectorPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const sp = await searchParams
  const lang = sp.lang === 'zh' ? 'zh' : 'en'

  // 2026-07-25 P0 /ai-detector SEO content block (GSC: 2 imp / rank #4, USA 61%)
  // Target: 'ai detector', 'free ai detector', 'gptzero alternative', 'turnitin ai check', 'chatgpt detector', 'claude detector', 'gemini detector'
  const seoBlockEn = (
    <section className="max-w-3xl mx-auto px-4 pt-8 pb-2 text-sm text-gray-600 leading-relaxed">
      <h2 className="text-xl font-bold text-gray-800 mb-3">About This Free AI Content Detector</h2>
      <p className="mb-3">
        This free AI content detector analyzes any text you paste and returns an AI-likelihood score in under 1 second — no signup, no upload, no watermark. It detects output from ChatGPT (GPT-4 / GPT-4o), Google Gemini, Anthropic Claude, Microsoft Copilot and most other large-language-model outputs. Detection is based on the same five core principles used by GPTZero, Originality.ai and ZeroGPT: <strong className="text-gray-800">perplexity</strong> (how predictable each word is), <strong className="text-gray-800">burstiness</strong> (sentence-length variance), <strong className="text-gray-800">AI vocabulary density</strong> (boilerplate phrases like “delve into”, “in conclusion”), <strong className="text-gray-800">list-like structure</strong>, and <strong className="text-gray-800">predictable paragraph transitions</strong>.
      </p>
      <p className="mb-3">
        For English text up to 3,000 characters, agreement with mainstream paid detectors is 85–90%. For Simplified Chinese, agreement is 70–80% because Chinese AI training data is more limited. Each detection returns not just a percentage, but a breakdown of all five signals so you can see <em>why</em> the text was flagged — useful if you’re a teacher reviewing a flagged student essay, an editor verifying a freelancer’s work, or a writer auditing your own draft before submission.
      </p>
      <h3 className="text-base font-semibold text-gray-800 mb-2 mt-4">Common use cases</h3>
      <ul className="list-disc list-inside mb-3 space-y-1 pl-1">
        <li><strong className="text-gray-800">Student essay check</strong> — verify a flagged essay before submitting an appeal to Turnitin AI.</li>
        <li><strong className="text-gray-800">Editor review</strong> — spot AI-assisted copy before publication.</li>
        <li><strong className="text-gray-800">Self-audit</strong> — see which paragraphs of your draft read as AI.</li>
        <li><strong className="text-gray-800">Recruiter screening</strong> — sanity-check cover letters for AI generation.</li>
      </ul>
      <p className="text-xs text-gray-400 mb-0 pt-3 border-t border-gray-100">
        Privacy: input text is discarded immediately after detection (stateless API). We never train on user submissions. Free quota is 5 submissions per IP per day, 3,000 characters each.
      </p>
    </section>
  )

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
      {lang === 'zh' ? seoBlockZh : seoBlockEn}
      <ToolClient mode="detector" initialLang={lang} i18n={detectorI18n} />
    </>
  )
}