import type { Metadata } from 'next'
import ToolClient from '../../components/Tool/ToolClient'
import { turnitinI18n } from '../../components/Tool/i18n/turnitin'

export const dynamic = 'force-dynamic'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What does "bypass AI" mean?', acceptedAnswer: { '@type': 'Answer', text: 'Bypass AI detection means rewriting AI-generated text so AI detectors (Turnitin AI, GPTZero, Originality.ai, ZeroGPT) flag it as human-written. This tool breaks sentence-level perplexity patterns that AI detectors use to flag content.' } },
    { '@type': 'Question', name: 'Which AI detectors does this bypass?', acceptedAnswer: { '@type': 'Answer', text: 'Turnitin AI, GPTZero, Originality.ai, ZeroGPT, Winston AI, Copyleaks. 85-95% pass rate on English text up to 3,000 characters per submission.' } },
    { '@type': 'Question', name: 'Does it bypass Turnitin AI specifically?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The bypass engine is tuned against Turnitin sentence-perplexity heuristics, AI vocabulary density, and predictable paragraph transitions. Same engine as our dedicated Turnitin Bypass tool.' } },
    { '@type': 'Question', name: 'Does it bypass GPTZero?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. GPTZero flags based on perplexity and burstiness. This tool varies sentence length and injects conversational markers that mimic human burstiness.' } },
    { '@type': 'Question', name: 'Does it bypass Originality.ai?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Originality.ai uses similar signals to GPTZero plus semantic uniformity detection. The bypass engine varies vocabulary density and paragraph structure.' } },
    { '@type': 'Question', name: 'Are citations and data preserved?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. All citations, proper nouns, numbers, dates, and formulas are kept exactly. Only surface expression is rewritten.' } },
    { '@type': 'Question', name: 'Do you store my text?', acceptedAnswer: { '@type': 'Answer', text: 'No. Stateless API. Input discarded immediately after rewrite. We never train on user submissions.' } },
    { '@type': 'Question', name: 'How long does bypass take?', acceptedAnswer: { '@type': 'Answer', text: '3-8 seconds for a 3,000-character submission. No queue, no signup, no waiting.' } },
  ],
}

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const sp = await searchParams
  const lang = sp.lang === 'zh' ? 'zh' : 'en'
  const titles = {
    zh: 'Bypass AI - 绕过 Turnitin / GPTZero 检测 (85-95% 通过)',
    en: 'Bypass AI — Free Turnitin & GPTZero Tool',
  }
  const descriptions = {
    zh: '免费 Bypass AI 工具:绕过 Turnitin AI、GPTZero、Originality.ai、ZeroGPT 检测。85-95% 通过率,保留引用/数据/公式,无需注册,本地处理。',
    en: 'Bypass AI detection: rewrite text to pass Turnitin, GPTZero, Originality.ai. Preserves citations, data, formulas. Free, no signup, 3-8 seconds.',
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
      canonical: 'https://gpt-undetectable.com/bypass-ai',
      languages: {
        'zh-CN': '/zh/bypass-ai',
        'en-US': '/bypass-ai',
        'x-default': '/bypass-ai',
      },
    },
  }
}

export default async function BypassAiPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const sp = await searchParams
  const lang = sp.lang === 'zh' ? 'zh' : 'en'

  const seoBodyEn = (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6 text-gray-700 leading-relaxed space-y-3">
      <p>Searching for a <strong>bypass AI</strong> tool usually means you have text that got flagged and you do not know which detector flagged it. The awkward part: the fix is different for each one. <strong>Turnitin</strong> scores perplexity and burstiness. <strong>GPTZero</strong> uses the same two signals but weights rhythmic uniformity more heavily. <strong>Originality.ai</strong> responds to short paragraphs, parenthetical asides and direct opinions. <strong>ZeroGPT</strong> leans on sentence-level predictability. A rewrite that fixes one of these can leave the other three exactly where they were.</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">One rewrite, four detectors</h2>
      <p>The tool rebuilds sentence structure rather than swapping words, which is the only approach that moves all four at once: sentence length variation widens, template vocabulary gets replaced, clause order changes, and parallel paragraphs get broken up. We run every rewrite against all four detectors and publish the pass rates — the numbers and the test setup are on the <a href="/bypass-test-methodology" className="text-violet-600 hover:underline">bypass test methodology</a> page.</p>

      <h3 className="text-base font-semibold text-gray-800 pt-1">Find out which detector is actually failing</h3>
      <p>Run the text through our <a href="/ai-detector" className="text-violet-600 hover:underline">free AI detector</a> first. It scores all four, so you get a list instead of a guess. If you already know your target, the <a href="/turnitin-bypass" className="text-violet-600 hover:underline">Turnitin bypass</a>, <a href="/gptzero-bypass" className="text-violet-600 hover:underline">GPTZero bypass</a> and <a href="/originality-ai-bypass" className="text-violet-600 hover:underline">Originality.ai bypass</a> pages each explain what that engine rewards.</p>

      <h3 className="text-base font-semibold text-gray-800 pt-1">What stays untouched</h3>
      <p>Citations in (Author, Year) format, quoted material, numbers, formulas, dates and proper nouns are preserved exactly. Only the surrounding prose is rebuilt — which is why <a href="/essay-writer-bypass-turnitin" className="text-violet-600 hover:underline">essay and academic text</a> keeps working after a rewrite.</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">A note on what this is for</h2>
      <p>This rewrites text you have the right to submit. It is not a way to launder work you did not write, and no tool can make that legitimate. Check your institution&apos;s academic integrity policy — the rules on AI assistance vary more than most people expect.</p>
    </div>
  )

  const seoBodyZh = (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6 text-gray-700 leading-relaxed space-y-3">
      <p>搜「<strong>bypass AI</strong>」工具的人,通常情况是:文本被判了,但不知道是哪个检测器判的。麻烦的地方在于——每个引擎的解法不一样。<strong>Turnitin</strong>看 perplexity 和 burstiness;<strong>GPTZero</strong>用同样两个信号但更看重节奏均匀性;<strong>Originality.ai</strong>对短段落、括号插话和直接观点敏感;<strong>ZeroGPT</strong>偏重句级可预测性。修好一个,另外三个可能原地不动。</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">一次改写,四个检测器</h2>
      <p>本工具做的是句子结构重建而不是换词,这是唯一能同时推动四个检测器的做法:句长变化幅度拉大、模板词汇替换、从句语序调整、并列段落打散。每次改写我们都会跑这四个检测器并公布通过率——数字和测试设置在<a href="/zh/bypass-test-methodology" className="text-violet-600 hover:underline">过检测试方法论</a>那页。</p>

      <h3 className="text-base font-semibold text-gray-800 pt-1">先搞清楚是哪一关没过</h3>
      <p>先丢进我们的<a href="/zh/ai-detector" className="text-violet-600 hover:underline">免费 AI 检测器</a>。四个都打分,给你一张清单而不是猜。已知目标的话,<a href="/zh/turnitin-bypass" className="text-violet-600 hover:underline">Turnitin 绕过</a>、<a href="/zh/gptzero-bypass" className="text-violet-600 hover:underline">GPTZero 绕过</a>、<a href="/zh/originality-ai-bypass" className="text-violet-600 hover:underline">Originality.ai 绕过</a>这三页分别讲每个引擎吃什么。</p>

      <h3 className="text-base font-semibold text-gray-800 pt-1">哪些东西不动</h3>
      <p>(Author, Year) 格式引用、引文、数字、公式、日期、专有名词原样保留,只重建周围表述。这也是<a href="/zh/essay-writer-bypass-turnitin" className="text-violet-600 hover:underline">论文和学术文本</a>改写后还能用的原因。</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">这工具是干什么用的</h2>
      <p>它改写的是你有权提交的文本,不是给代写洗白用的,也没有工具能让代写变得正当。提交前确认学校的学术诚信政策——对 AI 辅助的规定差异比多数人以为的大。</p>
    </div>
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {lang === 'zh' ? seoBodyZh : seoBodyEn}
      <ToolClient mode="turnitin" initialLang={lang} i18n={turnitinI18n}
      heroTitle={{ zh: 'Bypass AI 检测 — Turnitin / GPTZero / Originality.ai', en: 'Bypass AI Detection — Turnitin, GPTZero, Originality.ai' }} heroSubtitle={{ zh: '重写 AI 文本,让结构变化幅度足够大,通过 Turnitin、GPTZero、Originality.ai、ZeroGPT 检测。引用、数据、公式保持不变。免费,无需注册,3-8 秒。', en: 'Rewrite AI text so the structure varies enough to pass Turnitin, GPTZero, Originality.ai and ZeroGPT. Citations, data and formulas stay intact. Free, no signup, 3-8 seconds.' }}
    />
    </>
  )
}