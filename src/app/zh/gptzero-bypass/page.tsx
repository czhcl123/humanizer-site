import type { Metadata } from 'next'
import ToolClient from '../../../components/Tool/ToolClient'
import { turnitinI18n } from '../../../components/Tool/i18n/turnitin'

export const dynamic = 'force-dynamic'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How do you bypass GPTZero?', acceptedAnswer: { '@type': 'Answer', text: 'Rewrite the text so sentence length varies wildly and word choices are less predictable — the two signals GPTZero scores (burstiness and perplexity). Synonym swaps alone do not work; the sentence structure itself has to change.' } },
    { '@type': 'Question', name: 'Can GPTZero detect humanized AI text?', acceptedAnswer: { '@type': 'Answer', text: 'GPTZero only detects statistical uniformity. Once a rewrite introduces genuine variation in sentence length and word predictability, there is no uniformity left to detect.' } },
    { '@type': 'Question', name: 'What text does GPTZero flag as AI?', acceptedAnswer: { '@type': 'Answer', text: 'Text with low perplexity and low burstiness. Typical tells: template phrases, parallel paragraph openers, and perfectly balanced sentence grids.' } },
    { '@type': 'Question', name: 'Is bypassing GPTZero allowed?', acceptedAnswer: { '@type': 'Answer', text: 'Editing AI-assisted text into your own voice is generally acceptable; submitting fabricated work is not. Policies vary by institution — check the rules that apply to you.' } },
    { '@type': 'Question', name: 'Does this preserve citations?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. (Author, Year) citations, quoted material, numerical data, and proper nouns are kept exactly. Only the surrounding prose is rewritten.' } },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'GPTZero Bypass - 免费绕过 GPTZero AI 检测',
    description: '免费 GPTZero Bypass 工具:重写 AI 文本,打乱句长和词频,过 GPTZero 检测。保留引用和数据,无需注册。',
    openGraph: {
      title: 'GPTZero Bypass - 免费绕过 GPTZero AI 检测',
      description: '免费 GPTZero Bypass 工具:重写 AI 文本,打乱句长和词频,过 GPTZero 检测。保留引用和数据,无需注册。',
      images: [{ url: 'https://gpt-undetectable.com/og-image.png', width: 1200, height: 630 }],
    },
    alternates: {
      canonical: 'https://gpt-undetectable.com/zh/gptzero-bypass',
      languages: {
        'zh-CN': '/zh/gptzero-bypass',
        'en-US': '/gptzero-bypass',
        'x-default': '/gptzero-bypass',
      },
    },
  }
}

export default async function GptZeroBypassPage() {
  const lang = 'zh'

  const seoBody = (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6 text-gray-700 leading-relaxed space-y-3">
      <p><strong>GPTZero</strong> 是使用最广的 AI 检测器之一——学校、出版方、招聘团队在接受投稿前都会先跑一遍。如果你的稿子被标记了,解法不是骗过检测器,而是去掉 GPTZero 真正在测的统计特征。</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">GPTZero 打分的两个数字</h2>
      <p>GPTZero 看 <strong>perplexity</strong>(每个词在上文语境下有多可预测)和 <strong>burstiness</strong>(句长在段落里的变化幅度)。AI 写作以流畅为目标,所以每个词都选概率最高的,每句都挤在 15-25 词的舒适区。这个组合就是机器输出的签名,和主题无关。</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">为什么换同义词过不了 GPTZero</h2>
      <p>把"利用"换成"使用",句子骨架没动。perplexity 几乎不变——替换词在统计上还是普通词——burstiness 完全不变。GPTZero 打的是底层模式,不是表面词汇。能改变分数的是重构:把匀称句拆成 6 词碎片 + 30 词长句,从句顺序重排,砍掉填充连接词。</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">实操:怎么绕过 GPTZero</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>句长剧烈变化</strong> — 一句话和复合长句交替,变化幅度要超出"自然"的直觉。</li>
        <li><strong>清除模板短语</strong> — "深入探讨""在当今快节奏的世界""值得注意的是""此外""综上所述"。</li>
        <li><strong>加入观点和人声</strong> — 第一人称、对冲、旁白。AI 什么都不得罪,人写作有立场。</li>
        <li><strong>提交前先用 GPTZero 自己测一遍</strong> — 分数还高就把被标记的段落再改一轮。</li>
      </ul>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">提交前检查你的改写</h2>
      <p>先用 <a href="/zh/ai-detector" className="text-violet-600 hover:underline">免费 AI 检测器</a>查一遍——它打的就是 GPTZero 用的同组信号。如果论文是被 Turnitin 标记的,用 <a href="/zh/turnitin-bypass" className="text-violet-600 hover:underline">Turnitin Bypass</a>,那个引擎专门针对 Turnitin 的额外启发式规则调优。</p>
    </div>
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {seoBody}
      <ToolClient mode="turnitin" initialLang={lang} i18n={turnitinI18n} />
    </>
  )
}
