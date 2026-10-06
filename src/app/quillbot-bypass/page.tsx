import type { Metadata } from 'next'
import ToolClient from '../../components/Tool/ToolClient'
import { essayI18n } from '../../components/Tool/i18n/essay'

export const dynamic = 'force-dynamic'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Does QuillBot bypass AI detection?', acceptedAnswer: { '@type': 'Answer', text: 'No. QuillBot paraphrases inside the original sentence skeleton — it swaps synonyms but keeps sentence length uniform and structure intact, which is exactly what AI detectors score. Text paraphrased with QuillBot still gets flagged by GPTZero, Turnitin, and Originality.ai.' } },
    { '@type': 'Question', name: 'What is the difference between paraphrasing and humanizing?', acceptedAnswer: { '@type': 'Answer', text: 'Paraphrasing changes words; humanizing changes structure. Detectors measure sentence-length variation (burstiness) and word predictability (perplexity). Only restructuring — flipping clause order, breaking uniform rhythm, removing template vocabulary — moves those numbers.' } },
    { '@type': 'Question', name: 'How do I bypass AI detection after using QuillBot?', acceptedAnswer: { '@type': 'Answer', text: 'Run the QuillBot output through a humanizer that rebuilds sentence structure rather than swapping words. Our free tool does this in one pass: sentence skeletons rebuilt, AI vocabulary removed, citations and data held constant.' } },
    { '@type': 'Question', name: 'Is QuillBot paraphrasing detectable by Turnitin?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Turnitin scores perplexity and burstiness, both of which survive synonym substitution. A QuillBot-paraphrased AI draft typically still scores as AI-generated.' } },
    { '@type': 'Question', name: 'What QuillBot alternatives bypass AI detection?', acceptedAnswer: { '@type': 'Answer', text: 'Tools that rebuild sentence structure instead of swapping synonyms. Our humanizer preserves citations and factual data while varying sentence length and removing AI vocabulary — the two signals detectors rely on.' } },
  ],
}

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ lang?: string }> }): Promise<Metadata> {
  const sp = await searchParams
  const lang = sp.lang === 'zh' ? 'zh' : 'en'
  const titles = {
    zh: 'QuillBot Bypass — 为什么 QuillBot 过不了检测',
    en: 'QuillBot Bypass: Why Paraphrasing Fails AI Detection',
  }
  const descriptions = {
    zh: 'QuillBot 改写为什么还是被 GPTZero/Turnitin 标记?同义词替换 vs 结构重建的区别,以及真正能过检测的免费工具。',
    en: 'Why QuillBot paraphrases still get flagged by GPTZero and Turnitin — synonym swapping vs structure rebuilding, and the free tool that actually passes.',
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
      canonical: 'https://gpt-undetectable.com/quillbot-bypass',
      languages: {
        'zh-CN': '/zh/quillbot-bypass',
        'en-US': '/quillbot-bypass',
        'x-default': '/quillbot-bypass',
      },
    },
  }
}

export default async function QuillbotBypassPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const sp = await searchParams
  const lang = sp.lang === 'zh' ? 'zh' : 'en'

  const seoBodyEn = (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6 text-gray-700 leading-relaxed space-y-3">
      <p>The most common failed attempt at beating AI detection is this: paste AI text into <strong>QuillBot</strong>, copy the paraphrase, submit — and get flagged anyway. It is not a bug. QuillBot and detectors are measuring different things, and paraphrasing never touches what detectors actually score.</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">What QuillBot actually changes</h2>
      <p>QuillBot swaps words and phrases inside the original sentence skeleton. The subject stays where it was, the verb order stays, sentence length stays within the same band. Perplexity drops slightly — a synonym is sometimes less predictable than the original word — but burstiness does not move at all. Detectors weight burstiness heavily, which is why QuillBot output still reads as machine-written to GPTZero and Turnitin.</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">Paraphrasing vs humanizing</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Paraphrasing (QuillBot)</strong> — new words, same structure. The statistical signature survives.</li>
        <li><strong>Humanizing</strong> — new structure. Clause order flipped, fragments mixed with long sentences, template vocabulary removed, voice added. The signature is what changes.</li>
      </ul>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">The fix: rebuild, don't reword</h2>
      <p>Take the QuillBot output — or skip QuillBot entirely — and run it through a tool that rebuilds sentence skeletons. Our humanizer varies sentence length aggressively, strips AI vocabulary ("delve", "leverage", "robust", "furthermore"), and adds human rhythm, while holding citations, numbers, and proper nouns exactly where they were.</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">Verify before you submit</h2>
      <p>Check the result with the <a href="/ai-detector" className="text-violet-600 hover:underline">free AI detector</a> — it scores the same signals detectors use. If you are working around Turnitin specifically, the <a href="/turnitin-bypass" className="text-violet-600 hover:underline">Turnitin Bypass</a> tool tunes the rewrite against Turnitin's extra heuristics.</p>
    </div>
  )

  const seoBodyZh = (
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
      {lang === 'zh' ? seoBodyZh : seoBodyEn}
      <ToolClient mode="essay" initialLang={lang} i18n={essayI18n} />
    </>
  )
}
