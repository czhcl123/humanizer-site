import type { Metadata } from 'next'
import ToolClient from '../../components/Tool/ToolClient'
import { walterwritesI18n } from '../../components/Tool/i18n/walterwrites'

export const dynamic = 'force-dynamic'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What does it mean to humanize AI text?', acceptedAnswer: { '@type': 'Answer', text: 'Rewriting AI-generated content so it reads like a person wrote it — varied sentence length, natural transitions, opinions, and none of the template vocabulary AI models default to. The goal is text that sounds human because it follows human patterns, not because a detector was fooled.' } },
    { '@type': 'Question', name: 'How do you humanize AI text for free?', acceptedAnswer: { '@type': 'Answer', text: 'Three steps: (1) strip AI vocabulary — "delve", "leverage", "robust", "furthermore", "in conclusion"; (2) break sentence uniformity — mix fragments and long sentences; (3) add your own voice — opinions, examples, asides. Our free tool automates all three, up to 3,000 characters per pass, no signup.' } },
    { '@type': 'Question', name: 'Why does AI text sound robotic?', acceptedAnswer: { '@type': 'Answer', text: 'Language models are trained to produce the most statistically probable next word, which produces fluent but uniform text: same sentence rhythm, safe vocabulary, balanced structure. Humans vary — we ramble, we commit to opinions, we break our own patterns.' } },
    { '@type': 'Question', name: 'Does humanizing AI text remove the facts?', acceptedAnswer: { '@type': 'Answer', text: 'No — a proper humanizer preserves facts, numbers, citations, and proper nouns exactly. Only the surface expression changes: sentence structure, word choice, transitions, and voice.' } },
    { '@type': 'Question', name: 'Is AI text humanizing detectable?', acceptedAnswer: { '@type': 'Answer', text: 'Detectors score statistical patterns, not tool usage. Text rewritten to have genuine variation in sentence length and word predictability has no machine signature left to detect.' } },
  ],
}

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ lang?: string }> }): Promise<Metadata> {
  const sp = await searchParams
  const lang = sp.lang === 'zh' ? 'zh' : 'en'
  const titles = {
    zh: '如何把 AI 文本改写成真人风格 — 免费方法',
    en: 'How to Humanize AI Text: Free Methods That Work',
  }
  const descriptions = {
    zh: '教你把 ChatGPT/Claude 输出改写成真人风格:3 步去除 AI 痕迹,免费工具 + 实操方法,保留事实和引用。',
    en: 'Three steps to turn ChatGPT and Claude output into natural human writing: strip AI vocabulary, break sentence uniformity, add your voice. Free tool included.',
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
      canonical: 'https://gpt-undetectable.com/humanize-ai-text',
      languages: {
        'zh-CN': '/zh/humanize-ai-text',
        'en-US': '/humanize-ai-text',
        'x-default': '/humanize-ai-text',
      },
    },
  }
}

export default async function HumanizeAiTextPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const sp = await searchParams
  const lang = sp.lang === 'zh' ? 'zh' : 'en'

  const seoBodyEn = (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6 text-gray-700 leading-relaxed space-y-3">
      <p>"<strong>Humanize AI text</strong>" has become a standard step in writing workflows: draft with ChatGPT or Claude, then rewrite the output so it reads like a person wrote it. Whether the reason is AI detectors, editor standards, or simply that your readers can tell — the method is the same, and it is learnable in five minutes.</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">Why AI text sounds robotic</h2>
      <p>Language models optimize for the most statistically probable next word. The result is fluent but uniform: sentences cluster around the same length, every transition is the safe one, and the vocabulary stays in the middle of the distribution. That is exactly what detectors measure — low perplexity, low burstiness — and exactly what readers feel without knowing why.</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">The three-step method</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Strip the AI vocabulary</strong> — "delve into", "leverage", "robust", "comprehensive", "furthermore", "moreover", "in conclusion", "it is important to note". These phrases appear in AI output far more than in human writing; replacing them removes the loudest signal in one pass.</li>
        <li><strong>Break sentence uniformity</strong> — AI keeps sentences in a 15-25 word band. Alternate one-line fragments with compound sentences. The contrast is what burstiness measures.</li>
        <li><strong>Add your voice</strong> — opinions, first person, specific examples from your own experience, parenthetical asides. AI hedges everything; people commit to claims.</li>
      </ul>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">What not to change</h2>
      <p>Facts, numbers, citations, quoted material, and proper nouns stay exactly as they are. Humanizing is about expression, not content — a rewrite that alters your data is worse than no rewrite at all.</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">Do it automatically</h2>
      <p>Paste your AI draft below and the tool applies all three steps in one pass: sentence structure rebuilt, AI vocabulary removed, human rhythm restored — facts and citations held constant. Then check the result with the <a href="/ai-detector" className="text-violet-600 hover:underline">free AI detector</a> before you publish or submit.</p>
    </div>
  )

  const seoBodyZh = (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6 text-gray-700 leading-relaxed space-y-3">
      <p>"<strong>把 AI 文本改写成真人风格</strong>"已经成了写作流程的标准一步:先用 ChatGPT 或 Claude 打草稿,再把输出改写成读起来像人写的东西。原因可能是 AI 检测器、编辑标准,或者单纯是读者看得出来——方法是一样的,五分钟能学会。</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">AI 文本为什么读起来像机器</h2>
      <p>语言模型优化的是统计上概率最高的下一个词。结果流畅但均匀:句子挤在同一长度带,每个连接词都选最安全的,词汇停在分布中段。这正是检测器在测的——低 perplexity、低 burstiness——也正是读者说不清但感觉得到的东西。</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">三步法</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>清除 AI 词汇</strong> — "深入探讨""赋能""稳健""全面""此外""更重要的是""综上所述""值得注意的是"。这些短语在 AI 输出里的出现频率远高于人写文本,替换掉它们一轮就能去掉最响的信号。</li>
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
      {lang === 'zh' ? seoBodyZh : seoBodyEn}
      <ToolClient mode="walterwrites" initialLang={lang} i18n={walterwritesI18n} />
    </>
  )
}
