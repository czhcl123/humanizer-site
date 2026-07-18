import type { Metadata } from 'next'
import ToolClient from '../../../components/Tool/ToolClient'
import { turnitinI18n } from '../../../components/Tool/i18n/turnitin'

export const dynamic = 'force-dynamic'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: '"Bypass AI"是什么意思?', acceptedAnswer: { '@type': 'Answer', text: '绕过 AI 检测 = 把 AI 生成的文本改写,让 AI 检测器(Turnitin AI、GPTZero、Originality.ai、ZeroGPT)识别不出是 AI 写的。本工具专门打破 AI 检测器依赖的句级 perplexity 模式。' } },
    { '@type': 'Question', name: '能绕过哪些 AI 检测器?', acceptedAnswer: { '@type': 'Answer', text: 'Turnitin AI、GPTZero、Originality.ai、ZeroGPT、Winston AI、Copyleaks。3000 字以内英文内容 85-95% 通过率。' } },
    { '@type': 'Question', name: '专门绕过 Turnitin AI 吗?', acceptedAnswer: { '@type': 'Answer', text: '是的。绕过引擎专门针对 Turnitin 的句级 perplexity 启发式、AI 词汇密度、可预测段落转换调优。跟我们的 Turnitin Bypass 工具用同一个引擎。' } },
    { '@type': 'Question', name: '能绕过 GPTZero 吗?', acceptedAnswer: { '@type': 'Answer', text: 'GPTZero 根据 perplexity 和 burstiness 标记。本工具变化句子长度 + 注入口语化标记,模拟人类写作的 burstiness。' } },
    { '@type': 'Question', name: '引用和数据保留吗?', acceptedAnswer: { '@type': 'Answer', text: '保留。所有引用、专有名词、数字、年份、公式都不动。只改写表述层。' } },
    { '@type': 'Question', name: '存我的文本吗?', acceptedAnswer: { '@type': 'Answer', text: '不存。无状态 API,处理完即丢。我们从不用用户提交训练模型。' } },
    { '@type': 'Question', name: '绕过要多久?', acceptedAnswer: { '@type': 'Answer', text: '3000 字提交 3-8 秒。无需排队、无需注册、无需等待。' } },
  ],
}

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const lang = 'zh'
  return {
    title: 'Bypass AI - 免费绕过 Turnitin / GPTZero / Originality.ai 检测 (85-95% 通过)',
    description: '免费 Bypass AI 工具:绕过 Turnitin AI、GPTZero、Originality.ai、ZeroGPT 检测。85-95% 通过率,保留引用/数据/公式,无需注册,本地处理。',
    openGraph: {
      title: 'Bypass AI - 免费绕过 Turnitin / GPTZero / Originality.ai 检测',
      description: '免费 Bypass AI 工具,85-95% 通过率,无需注册。',
    },
    alternates: {
      canonical: 'https://gpt-undetectable.com/zh/bypass-ai',
      languages: {
        'zh-CN': '/zh/bypass-ai',
        'en-US': '/bypass-ai',
        'x-default': '/bypass-ai',
      },
    },
  }
}

export default async function BypassAiZhPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ToolClient mode="turnitin" initialLang="zh" i18n={turnitinI18n} />
    </>
  )
}