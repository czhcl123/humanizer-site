import type { Metadata } from 'next'
import ToolClient from '../../../components/Tool/ToolClient'
import { walterwritesI18n } from '../../../components/Tool/i18n/walterwrites'

export const dynamic = 'force-dynamic'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What does it mean to humanize AI text?', acceptedAnswer: { '@type': 'Answer', text: 'Rewriting AI-generated content so it reads like a person wrote it — varied sentence length, natural transitions, opinions, and none of the template vocabulary AI models default to.' } },
    { '@type': 'Question', name: 'How do you humanize AI text for free?', acceptedAnswer: { '@type': 'Answer', text: 'Three steps: strip AI vocabulary ("delve", "leverage", "robust", "furthermore"), break sentence uniformity by mixing fragments and long sentences, and add your own voice — opinions, examples, asides. Our free tool automates all three, no signup.' } },
    { '@type': 'Question', name: 'Why does AI text sound robotic?', acceptedAnswer: { '@type': 'Answer', text: 'Language models produce the most statistically probable next word, which yields fluent but uniform text: same sentence rhythm, safe vocabulary, balanced structure. Humans vary — we ramble, we commit to opinions, we break our own patterns.' } },
    { '@type': 'Question', name: 'Does humanizing AI text remove the facts?', acceptedAnswer: { '@type': 'Answer', text: 'No. A proper humanizer preserves facts, numbers, citations, and proper nouns exactly. Only the surface expression changes.' } },
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
    alternates: {
      canonical: 'https://gpt-undetectable.com/zh/humanize-ai-text',
      languages: {
        'zh-CN': '/zh/humanize-ai-text',
        'en-US': '/humanize-ai-text',
        'x-default': '/humanize-ai-text',
      },
    },
  }
}

export default async function HumanizeAiTextPage() {
  const lang = 'zh'

  const seoBody = (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6 text-gray-700 leading-relaxed space-y-3">
      <p>"<strong>把 AI 文本改写成真人风格</strong>"已经成了写作流程的标准一步:先用 ChatGPT 或 Claude 打草稿,再把输出改写成读起来像人写的东西。原因可能是 AI 检测器、编辑标准,或者单纯是读者看得出来——方法是一样的,五分钟能学会。</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">AI 文本为什么读起来像机器</h2>
      <p>语言模型优化的是统计上概率最高的下一个词。结果流畅但均匀:句子挤在同一长度带,每个连接词都选最安全的,词汇停在分布中段。这正是检测器在测的——低 perplexity、低 burstiness——也正是读者说不清但感觉得到的东西。</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">三步法</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>清除 AI 词汇</strong> — "深入探讨""赋能""稳健""全面""此外""综上所述"。这些短语在 AI 输出里的出现频率远高于人写文本,替换掉它们一轮就能去掉最响的信号。</li>
        <li><strong>打破句长均匀</strong> — AI 把句子控制在 15-25 词的带宽里。一句话碎片和复合长句交替出现,这种反差就是 burstiness 在测的东西。</li>
        <li><strong>加入你的声音</strong> — 观点、第一人称、自己经历的具体例子、括号旁白。AI 什么都对冲,人写作敢下判断。</li>
      </ul>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">什么不该改</h2>
      <p>事实、数字、引用、引文、专有名词原样保留。人性化改的是表达,不是内容——改写把数据改了,比不改还糟。</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">自动完成</h2>
      <p>把 AI 草稿粘贴到下面,工具一轮完成三步:句子结构重建、AI 词汇清除、人类节奏恢复——事实和引用保持不动。发布或提交前,先用 <a href="/zh/ai-detector" className="text-violet-600 hover:underline">免费 AI 检测器</a> 检查结果。</p>
    </div>
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {seoBody}
      <ToolClient mode="walterwrites" initialLang={lang} i18n={walterwritesI18n} />
    </>
  )
}
