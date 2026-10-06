import type { Metadata } from 'next'
import ToolClient from '../../components/Tool/ToolClient'
import { turnitinI18n } from '../../components/Tool/i18n/turnitin'

export const dynamic = 'force-dynamic'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How do you bypass GPTZero?', acceptedAnswer: { '@type': 'Answer', text: 'Rewrite the text so sentence length varies wildly and word choices are less predictable — the two signals GPTZero scores (burstiness and perplexity). Synonym swaps alone do not work; the sentence structure itself has to change. Our free tool rebuilds structure while keeping facts and citations intact.' } },
    { '@type': 'Question', name: 'Can GPTZero detect humanized AI text?', acceptedAnswer: { '@type': 'Answer', text: 'GPTZero can only detect statistical uniformity. Once a rewrite introduces genuine variation in sentence length and word predictability, there is no uniformity left to detect. Heavy AI tells (uniform rhythm, template vocabulary) must be removed for the score to drop.' } },
    { '@type': 'Question', name: 'What text does GPTZero flag as AI?', acceptedAnswer: { '@type': 'Answer', text: 'Text with low perplexity (every word the most probable one) and low burstiness (sentences clustered around the same length). Typical tells: "delve into", "in today\'s fast-paced world", parallel paragraph openers, and perfectly balanced sentence grids.' } },
    { '@type': 'Question', name: 'Is bypassing GPTZero allowed?', acceptedAnswer: { '@type': 'Answer', text: 'Editing AI-assisted text into your own voice is generally acceptable; submitting fabricated work is not. Policies vary by institution and workplace — check the rules that apply to you before submitting.' } },
    { '@type': 'Question', name: 'How accurate is GPTZero?', acceptedAnswer: { '@type': 'Answer', text: 'GPTZero is one of the stronger detectors, but false positives happen — confident human writers with uniform styles get flagged. That is why the rewrite approach works: it removes the statistical signature the detector relies on.' } },
  ],
}

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ lang?: string }> }): Promise<Metadata> {
  const sp = await searchParams
  const lang = sp.lang === 'zh' ? 'zh' : 'en'
  const titles = {
    zh: 'GPTZero Bypass — 免费绕过 GPTZero AI 检测',
    en: 'GPTZero Bypass — Free Tool to Pass AI Detection',
  }
  const descriptions = {
    zh: '免费 GPTZero Bypass 工具:重写 AI 文本,打乱句长和词频,过 GPTZero 检测。保留引用和数据,无需注册。',
    en: 'Free GPTZero bypass tool: rewrite AI text to break the burstiness and perplexity signals GPTZero scores. Preserves citations and data. No signup.',
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
      canonical: 'https://gpt-undetectable.com/gptzero-bypass',
      languages: {
        'zh-CN': '/zh/gptzero-bypass',
        'en-US': '/gptzero-bypass',
        'x-default': '/gptzero-bypass',
      },
    },
  }
}

export default async function GptZeroBypassPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const sp = await searchParams
  const lang = sp.lang === 'zh' ? 'zh' : 'en'

  const seoBodyEn = (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6 text-gray-700 leading-relaxed space-y-3">
      <p><strong>GPTZero</strong> is one of the most widely used AI detectors — schools, publishers, and hiring teams run AI-generated text through it before accepting submissions. If your draft got flagged, the fix is not tricking the detector; it is removing the statistical signature GPTZero actually measures.</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">The two numbers GPTZero scores</h2>
      <p>GPTZero looks at <strong>perplexity</strong> — how predictable each word is given the last one — and <strong>burstiness</strong> — how much sentence length varies across a passage. AI text is written to be fluent, which means every word is the most probable choice and every sentence lands in a comfortable 15-25 word band. That combination reads as machine output, regardless of topic.</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">Why synonym tools fail against GPTZero</h2>
      <p>Swapping "utilize" for "use" leaves the sentence skeleton untouched. Perplexity barely moves — the replacement word is still statistically ordinary — and burstiness does not move at all. GPTZero scores the underlying pattern, not the surface vocabulary. What changes the score is restructuring: turning a balanced sentence into a 6-word fragment plus a 30-word follow-up, flipping clause order, cutting filler transitions.</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">How to bypass GPTZero in practice</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Vary sentence length aggressively</strong> — alternate one-liners with long compound sentences. Aim for a wider spread than feels natural.</li>
        <li><strong>Replace template phrases</strong> — "delve into", "in today's fast-paced world", "it is important to note", "furthermore", "in conclusion".</li>
        <li><strong>Add opinion and voice</strong> — first person, hedging, asides. AI text commits to nothing; human text has a point of view.</li>
        <li><strong>Run it through GPTZero itself before submitting</strong> — if the score is still high, rewrite the flagged sections again.</li>
      </ul>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">Check your rewrite before you submit</h2>
      <p>Paste your rewritten text into our <a href="/ai-detector" className="text-violet-600 hover:underline">free AI detector</a> first — it scores the same signals GPTZero uses. For essays flagged by Turnitin specifically, see our <a href="/turnitin-bypass" className="text-violet-600 hover:underline">Turnitin Bypass</a> tool, which tunes the rewrite against Turnitin's additional heuristics.</p>
    </div>
  )

  const seoBodyZh = (
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
      {lang === 'zh' ? seoBodyZh : seoBodyEn}
      <ToolClient mode="turnitin" initialLang={lang} i18n={turnitinI18n} />
    </>
  )
}
