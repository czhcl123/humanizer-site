import type { Metadata } from 'next'
import ToolClient from '../../components/Tool/ToolClient'
import { turnitinI18n } from '../../components/Tool/i18n/turnitin'

export const dynamic = 'force-dynamic'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Does it pass Turnitin AI detection?', acceptedAnswer: { '@type': 'Answer', text: 'Tuned specifically for Turnitin AI. 85-95% pass rate on English essays up to 3,000 characters. Longer essays should be split into sections.' } },
    { '@type': 'Question', name: 'What is Turnitin\'s detection algorithm?', acceptedAnswer: { '@type': 'Answer', text: 'Turnitin uses sentence-level perplexity, burstiness, AI vocabulary density ("delve", "leverage", "robust", "furthermore", "in conclusion"), and predictable paragraph transitions. We reverse-engineer each signal.' } },
    { '@type': 'Question', name: 'Are citations and data preserved?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. All citations, proper nouns, numbers, dates, and formulas are kept exactly. Only surface expression is rewritten.' } },
    { '@type': 'Question', name: 'Are AI vocabulary words removed?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. "Delve", "leverage", "robust", "comprehensive", "furthermore", "moreover", "in conclusion", "it is important to note" are all replaced with natural expressions.' } },
    { '@type': 'Question', name: 'Does it support Chinese essays?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Both English and Simplified Chinese supported. Chinese mode is tuned for 知网 (CNKI), 维普, GPTZero Chinese, and ZeroGPT Chinese.' } },
    { '@type': 'Question', name: 'Do you store my essay?', acceptedAnswer: { '@type': 'Answer', text: 'No. Stateless API. Input discarded immediately after rewrite. We never train on user submissions.' } },
    { '@type': 'Question', name: 'Can I bypass Turnitin without changing my original meaning?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. This tool specifically protects citations in (Author, Year) format, factual data, numerical references, and quoted material while rewriting the surrounding prose. This is the key differentiator from basic paraphrase tools that mangle citations or change numbers in your data tables. Specialized tools like HumanizeMyAI explicitly train on citation preservation; most generic humanizers (QuillBot, Wordtune) were built for marketing copy and strip academic markers as a side effect. Practical workflow: paste your AI draft with all citations and numbers intact, run heavy mode, then verify that (Smith, 2019) markers and any quoted material stayed unchanged. The rewrite only touches sentence structure, vocabulary, and connector words. Your thesis, arguments, evidence, and source attributions all stay exactly as you wrote them.' } },
    { '@type': 'Question', name: 'Is this the same as the Bypass AI tool?', acceptedAnswer: { '@type': 'Answer', text: 'Same underlying bypass engine, different landing page. /bypass-ai is the general bypass for Turnitin, GPTZero, Originality.ai, and ZeroGPT. This /turnitin-bypass page is specifically tuned for Turnitin AI detection with additional Turnitin-specific heuristics. For most users the two pages produce identical output; use whichever URL you found.' } },
  ],
}

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const sp = await searchParams
  const lang = sp.lang === 'zh' ? 'zh' : 'en'
  const titles = {
    zh: 'Turnitin Bypass - 绕过 Turnitin AI 检测 (85-95% 通过)',
    en: 'Turnitin Bypass - Free Tool (85-95% Pass)',
  }
  const descriptions = {
    zh: '免费 Turnitin Bypass 工具:专门针对 Turnitin AI 检测器调优,保留引用、事实、数据。85-95% 通过率,无需注册。',
    en: 'Turnitin bypass tool: rewrite essays and papers to pass Turnitin AI detection. Keeps citations and factual data intact. 85-95% pass rate, free, no signup.',
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
      canonical: 'https://gpt-undetectable.com/turnitin-bypass',
      languages: {
        'zh-CN': '/zh/turnitin-bypass',
        'en-US': '/turnitin-bypass',
        'x-default': '/turnitin-bypass',
      },
    },
  }
}

export default async function TurnitinPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const sp = await searchParams
  const lang = sp.lang === 'zh' ? 'zh' : 'en'

  const seoBodyEn = (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6 text-gray-700 leading-relaxed space-y-3">
      <p>Turnitin is the detector most schools actually run, so <strong>bypassing Turnitin</strong> is the version of this problem most people hit first. Turnitin&apos;s AI detection looks at two statistical signals — <strong>perplexity</strong> (how predictable each word is given the words before it) and <strong>burstiness</strong> (how much sentence length varies across a passage). Neither one knows whether a human or a model wrote the text; they only measure whether the text is uniform.</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">Why a paraphraser fails Turnitin</h2>
      <p>Swap <em>utilise</em> for <em>use</em> and the sentence skeleton survives. Perplexity barely moves, because the replacement is still an ordinary word in an ordinary context. Burstiness does not move at all. Turnitin is not looking for awkward vocabulary — it is looking for the flatness that comes from every sentence choosing the most probable continuation. Only restructuring changes that number.</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">The four moves that change the score</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Vary sentence length hard</strong> — a three-word fragment next to a thirty-word sentence. This is the single biggest lever on burstiness.</li>
        <li><strong>Replace template vocabulary</strong> — "delve", "leverage", "robust", "furthermore", "in conclusion", "it is important to note".</li>
        <li><strong>Break parallel structure</strong> — AI loves three-item lists and identical paragraph openers. Real writing wanders.</li>
        <li><strong>Add a point of view</strong> — first person, hedging, parenthetical asides. AI takes no position; people do.</li>
      </ul>

      <h3 className="text-base font-semibold text-gray-800 pt-1">Turnitin versus the other detectors</h3>
      <p>Turnitin is not the only engine, and the difference matters if you are being graded on more than one. <a href="/gptzero-bypass" className="text-violet-600 hover:underline">GPTZero</a> uses the same two signals but weights rhythmic uniformity more heavily. <a href="/originality-ai-bypass" className="text-violet-600 hover:underline">Originality.ai</a> responds to short paragraphs, parenthetical asides and direct opinions, and for Chinese-language papers <a href="/jiang-ai-lv" className="text-violet-600 hover:underline">降 AI 率 for 知网 AIGC</a> targets the Chinese detectors instead. <a href="/quillbot-bypass" className="text-violet-600 hover:underline">QuillBot</a> is the tool people usually reach for first — and the one that most reliably produces text Turnitin still flags. Our <a href="/ai-detector" className="text-violet-600 hover:underline">free AI detector</a> runs all of them so you can see which one your text is failing.</p>

      <h3 className="text-base font-semibold text-gray-800 pt-1">What this tool does and does not touch</h3>
      <p>Citations in (Author, Year) format, quoted passages, numerical data, dates and proper nouns are held exactly as written. Only the prose around them is rebuilt. For a full breakdown of what we change and why, see <a href="/essay-writer-bypass-turnitin" className="text-violet-600 hover:underline">how to rewrite an essay that passes Turnitin</a>.</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">Before you submit</h2>
      <p>Check your rewrite against <a href="/ai-detector" className="text-violet-600 hover:underline">a detector run</a> before you submit, and split long papers into chunks of 3,000 characters — a 6,000-word essay scored as one block tells you nothing about which paragraph is the problem. If you want to see the numbers behind our claims, the <a href="/bypass-test-methodology" className="text-violet-600 hover:underline">bypass test methodology</a> page has the detectors, sample sizes and pass criteria we run every month.</p>
    </div>
  )

  const seoBodyZh = (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6 text-gray-700 leading-relaxed space-y-3">
      <p>Turnitin 是学校真正在用的检测器,所以<strong>绕过 Turnitin</strong>是大多数人最先撞上的版本。Turnitin 的 AI 检测看两个统计信号——<strong>perplexity</strong>(每个词在前文语境下有多可预测)和 <strong>burstiness</strong>(段落内句长的变化幅度)。它并不判断是人写的还是模型写的,只测文本是否均匀。</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">为什么同义改写过不了 Turnitin</h2>
      <p>把 utilize 换成 use,句子骨架还在。perplexity 几乎不动,因为替换后仍是普通语境里的普通词;burstiness 完全不动。Turnitin 找的不是生僻词,而是「每个句子都选最可能的下文」这种平坦感。只有重构能改变这个数字。</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">真正能改分的四个动作</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>句长剧烈变化</strong>——三词碎片接三十词长句,这是对 burstiness 影响最大的单一动作。</li>
        <li><strong>换掉模板词汇</strong>——"delve"、"leverage"、"robust"、"furthermore"、"in conclusion"、"it is important to note"。</li>
        <li><strong>打散并列结构</strong>——AI 喜欢三项列表和雷同的段首句,真人写作会跑偏。</li>
        <li><strong>加入观点</strong>——第一人称、对冲、括号插话。AI 不表态,人会。</li>
      </ul>

      <h3 className="text-base font-semibold text-gray-800 pt-1">Turnitin 和其他检测器的区别</h3>
      <p>Turnitin 不是唯一的引擎,如果不止一个平台在判你,差别就很关键。<a href="/zh/gptzero-bypass" className="text-violet-600 hover:underline">GPTZero</a>用同样两个信号但更看重节奏均匀性;<a href="/zh/originality-ai-bypass" className="text-violet-600 hover:underline">Originality.ai</a>对短段落、括号插话和直接观点更敏感;<a href="/zh/quillbot-bypass" className="text-violet-600 hover:underline">QuillBot</a>是大多数人第一个想到的工具,也是最容易改出「Turnitin 照样标记」的工具。我们的<a href="/zh/ai-detector" className="text-violet-600 hover:underline">免费 AI 检测器</a>一次跑全部,让你看清是哪一关没过。</p>

      <h3 className="text-base font-semibold text-gray-800 pt-1">这个工具动什么、不动什么</h3>
      <p>(Author, Year) 格式引用、引文、数字、日期、专有名词原样保留,只重建周围的表述。想看完整清单,见<a href="/zh/essay-writer-bypass-turnitin" className="text-violet-600 hover:underline">怎么改写论文才能过 Turnitin</a>。</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">提交前</h2>
      <p>提交前先用<a href="/zh/ai-detector" className="text-violet-600 hover:underline">检测器跑一遍</a>,长论文按 3000 字分段——6000 词整篇打分看不出哪一段有问题。想看我们说法的数据依据,<a href="/zh/bypass-test-methodology" className="text-violet-600 hover:underline">过检测试方法论</a>那页有我们每月跑的检测器、样本量和通过标准。</p>
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