import type { Metadata } from 'next'
import ToolClient from '../../../components/Tool/ToolClient'
import { essayI18n } from '../../../components/Tool/i18n/essay'

export const dynamic = 'force-dynamic'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Does QuillBot bypass AI detection?', acceptedAnswer: { '@type': 'Answer', text: 'No. QuillBot paraphrases inside the original sentence skeleton — it swaps synonyms but keeps sentence length uniform and structure intact, which is exactly what AI detectors score. Text paraphrased with QuillBot still gets flagged by GPTZero, Turnitin, and Originality.ai.' } },
    { '@type': 'Question', name: 'What is the difference between paraphrasing and humanizing?', acceptedAnswer: { '@type': 'Answer', text: 'Paraphrasing changes words; humanizing changes structure. Detectors measure sentence-length variation (burstiness) and word predictability (perplexity). Only restructuring moves those numbers.' } },
    { '@type': 'Question', name: 'How do I bypass AI detection after using QuillBot?', acceptedAnswer: { '@type': 'Answer', text: 'Run the QuillBot output through a humanizer that rebuilds sentence structure rather than swapping words. Our free tool does this in one pass, preserving citations and data.' } },
    { '@type': 'Question', name: 'Is QuillBot paraphrasing detectable by Turnitin?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Turnitin scores perplexity and burstiness, both of which survive synonym substitution.' } },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'QuillBot Bypass - 为什么 QuillBot 过不了检测',
    description: 'QuillBot 改写为什么还是被 GPTZero/Turnitin 标记?同义词替换 vs 结构重建的区别,以及真正能过检测的免费工具。',
    openGraph: {
      title: 'QuillBot Bypass - 为什么 QuillBot 过不了检测',
      description: 'QuillBot 改写为什么还是被 GPTZero/Turnitin 标记?同义词替换 vs 结构重建的区别,以及真正能过检测的免费工具。',
      images: [{ url: 'https://gpt-undetectable.com/og-image.png', width: 1200, height: 630 }],
    },
    alternates: {
      canonical: 'https://gpt-undetectable.com/zh/quillbot-bypass',
      languages: {
        'zh-CN': '/zh/quillbot-bypass',
        'en-US': '/quillbot-bypass',
        'x-default': '/quillbot-bypass',
      },
    },
  }
}

export default async function QuillbotBypassPage() {
  const lang = 'zh'

  const seoBody = (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6 text-gray-700 leading-relaxed space-y-3">
      <p>绕 AI 检测最常见的失败操作是:把 AI 文本贴进 <strong>QuillBot</strong>,复制改写结果,提交——然后还是被标记。这不是 bug。QuillBot 和检测器测的是两回事,同义词替换永远碰不到检测器真正在打分的东西。</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">QuillBot 实际改了什么</h2>
      <p>QuillBot 在原句骨架里换词换短语。主语位置不动,动词顺序不动,句长还在同一区间。perplexity 略降——替换词有时比原词少见一点——但 burstiness 完全不动。检测器对 burstiness 权重很高,这就是为什么 QuillBot 的输出在 GPTZero 和 Turnitin 眼里还是机器写的。</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">改写 vs 人性化</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>改写(QuillBot)</strong> — 新词,旧结构。统计签名完整保留。</li>
        <li><strong>人性化</strong> — 新结构。从句顺序重排、碎片句和长句混用、AI 词汇清除、加入人声。被改掉的正是签名本身。</li>
      </ul>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">解法:重建,不是换词</h2>
      <p>拿 QuillBot 的输出——或者干脆跳过 QuillBot——放进能重建句子骨架的工具。本工具剧烈变化句长、清除 AI 词汇("深入探讨""赋能""稳健""此外")、恢复人类节奏,同时把引用、数字、专有名词原样保留。</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">提交前验证</h2>
      <p>用 <a href="/zh/ai-detector" className="text-violet-600 hover:underline">免费 AI 检测器</a>查一遍——它打的就是检测器用的同组信号。如果你主要在绕 Turnitin,用 <a href="/zh/turnitin-bypass" className="text-violet-600 hover:underline">Turnitin Bypass</a>,那个引擎针对 Turnitin 的额外规则调优。</p>
    </div>
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {seoBody}
      <ToolClient mode="essay" initialLang={lang} i18n={essayI18n} />
    </>
  )
}
