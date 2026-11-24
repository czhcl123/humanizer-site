import type { Metadata } from 'next'
import { languageAlternates, pageUrl } from '@/lib/site'
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd'
import ToolClient from '../../../components/Tool/ToolClient'
import { walterwritesI18n } from '../../../components/Tool/i18n/walterwrites'

/** This route tree is Chinese; the language is a compile-time constant. */
const lang = 'zh' as const

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: '把 AI 文本人性化是什么意思？', acceptedAnswer: { '@type': 'Answer', text: '把 AI 生成的内容改写得像人写的：句长有变化、过渡自然、带有观点，并去除 AI 模型惯用的模板词汇。改写由 DeepSeek Chat 在云端完成。' } },
    { '@type': 'Question', name: '如何免费把 AI 文本改写得像人写？', acceptedAnswer: { '@type': 'Answer', text: '三步：清除模板词汇、变化句长、加入自己的声音。本站免费工具通过云端 DeepSeek Chat 自动完成这些步骤，无需注册，每个 IP 每滚动 24 小时 5 次，每次最多 3000 字符。' } },
    { '@type': 'Question', name: 'AI 文本为什么读起来像机器？', acceptedAnswer: { '@type': 'Answer', text: '语言模型倾向输出统计上最可能的下一个词，因此文本流畅但均匀：句子节奏相似、用词保守、结构平衡。人的写作会有变化：会跑题、会下判断、会打破自己的模式。' } },
    { '@type': 'Question', name: '人性化改写会丢失事实吗？', acceptedAnswer: { '@type': 'Answer', text: '改写会尽量保留事实、数字、引用和专有名词。请自行核对结果；本站不保证任何检测通过率。' } },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '如何把 AI 文本改写成真人风格 - 免费方法',
    description: '教你把 ChatGPT/Claude 输出改写成真人风格:3 步去除 AI 痕迹,免费工具 + 实操方法,保留事实和引用。',
    openGraph: {
      title: '如何把 AI 文本改写成真人风格 - 免费方法',
      description: '教你把 ChatGPT/Claude 输出改写成真人风格:3 步去除 AI 痕迹,免费工具 + 实操方法,保留事实和引用。',
      images: [{ url: 'https://gpt-undetectable.com/og-image.png', width: 1200, height: 630 }],
    },
    alternates: { canonical: pageUrl('/humanize-ai-text', 'zh'), languages: languageAlternates('/humanize-ai-text') },
  }
}

export default async function HumanizeAiTextPage() {
  
  const seoBody = (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6 text-gray-700 leading-relaxed space-y-3">
      <p>"<strong>把 AI 文本改写成真人风格</strong>"已经成了写作流程的标准一步:先用 ChatGPT 或 Claude 打草稿,再把输出改写成读起来像人写的东西。原因可能是 AI 检测器、编辑标准,或者单纯是读者看得出来——方法是一样的,五分钟能学会。</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">AI 文本为什么读起来像机器</h2>
      <p>语言模型倾向输出流畅但均匀的文本：句子长度接近、连接词保守、词汇常见。公开讨论常以 perplexity、burstiness 等统计弱信号描述这类特征；本站检测器是 DeepSeek 提示词驱动的启发式分析，不是官方检测判定。</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">三步法</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>清除 AI 词汇</strong> — "深入探讨""赋能""稳健""全面""此外""综上所述"。这些短语在 AI 输出里的出现频率远高于人写文本,替换掉它们一轮就能去掉最响的信号。</li>
        <li><strong>打破句长均匀</strong> — AI 把句子控制在 15-25 词的带宽里。一句话碎片和复合长句交替出现,这种反差就是 burstiness 在测的东西。</li>
        <li><strong>加入你的声音</strong> — 观点、第一人称、自己经历的具体例子、括号旁白。AI 什么都对冲,人写作敢下判断。</li>
      </ul>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">什么不该改</h2>
      <p>事实、数字、引用、引文、专有名词原样保留。人性化改的是表达,不是内容——改写把数据改了,比不改还糟。</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">自动完成</h2>
      <p>把 AI 草稿粘贴到下面，改写由 DeepSeek Chat（deepseek-chat）在云端处理，尝试重建句式、清除模板词、恢复自然节奏，并尽量保持事实和引用不动。100% 免费，每 IP 每 24 小时 5 次。发布或提交前可用 <a href="/zh/ai-detector" className="text-violet-600 hover:underline">免费 AI 检测器</a>自查；它不是官方判定，非保证。</p>
    <p className="text-xs text-gray-400 mt-4">最近核校：2026-11-24</p>
    </div>
  )

  return (
    <>
      <BreadcrumbJsonLd slug="/humanize-ai-text" lang="zh" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {seoBody}
      <ToolClient mode="walterwrites" lang={lang} i18n={walterwritesI18n}
      heroTitle={{ zh: '如何把 AI 文本改写成真人风格 — 免费方法' }} heroSubtitle={{ zh: '变化句长、清除模板词、加入个人声音。本站由 DeepSeek 云端改写，100% 免费，无需注册；结果非保证。' }}
    />
    </>
  )
}
