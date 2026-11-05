import type { Metadata } from 'next'
import ToolClient from '../../components/Tool/ToolClient'
import { essayI18n } from '../../components/Tool/i18n/essay'

export const dynamic = 'force-dynamic'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Can an essay writer bypass Turnitin AI detection?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — if it rewrites sentence-level structure, not just synonyms. Turnitin flags AI text by perplexity (predictable word choices) and burstiness (uniform sentence length). A writer that varies both can pass 85-95% of the time on English essays up to 3,000 characters.' } },
    { '@type': 'Question', name: 'How do I write an essay that Turnitin will not flag as AI?', acceptedAnswer: { '@type': 'Answer', text: 'Four moves: break uniform sentence rhythm (mix 5-word and 30-word sentences), replace AI vocabulary ("delve", "leverage", "robust", "furthermore"), add personal voice and opinions, and avoid list-heavy paragraph structure. Our tool applies all four automatically.' } },
    { '@type': 'Question', name: 'Is using an essay writer to bypass Turnitin cheating?', acceptedAnswer: { '@type': 'Answer', text: 'That depends on your institution\'s policy. Rewriting your own AI-assisted draft into your natural voice is different from submitting fabricated work. Many students use rewrite tools to edit drafts they wrote themselves. Check your school\'s academic integrity policy before submitting.' } },
    { '@type': 'Question', name: 'Does Turnitin detect AI-generated essays rewritten by a tool?', acceptedAnswer: { '@type': 'Answer', text: 'Turnitin detects statistical patterns, not tool usage. If the rewritten text has human-like perplexity and burstiness, Turnitin scores it as likely human. The rewrite must be substantial — surface synonym swaps are not enough.' } },
    { '@type': 'Question', name: 'What is the success rate of AI essay writers against Turnitin?', acceptedAnswer: { '@type': 'Answer', text: 'Our engine passes Turnitin AI 85-95% of the time on English essays up to 3,000 characters. Results depend on the source text: heavily uniform AI drafts need more rewriting. Always run your rewritten essay through an AI detector before submitting.' } },
    { '@type': 'Question', name: 'Does this preserve citations and references?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. (Author, Year) citations, quoted material, numerical data, and proper nouns are kept exactly. Only the surrounding prose is rewritten — this is the key difference from generic paraphrasers that mangle academic references.' } },
  ],
}

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ lang?: string }> }): Promise<Metadata> {
  const sp = await searchParams
  const lang = sp.lang === 'zh' ? 'zh' : 'en'
  const titles = {
    zh: '绕过 Turnitin 的论文写作工具 — 免费 AI 改写',
    en: 'Essay Writer That Bypasses Turnitin — Free AI Tool',
  }
  const descriptions = {
    zh: '免费 AI 论文改写工具:专门绕过 Turnitin AI 检测。保留引用和数据,85-95% 通过率,无需注册。含写作技巧和检测原理。',
    en: 'Free AI essay writer that bypasses Turnitin AI detection. Preserves citations and data, 85-95% pass rate, no signup. Includes the four writing moves that beat Turnitin\'s perplexity and burstiness checks.',
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
      canonical: 'https://gpt-undetectable.com/essay-writer-bypass-turnitin',
      languages: {
        'zh-CN': '/zh/essay-writer-bypass-turnitin',
        'en-US': '/essay-writer-bypass-turnitin',
        'x-default': '/essay-writer-bypass-turnitin',
      },
    },
  }
}

export default async function EssayWriterBypassPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const sp = await searchParams
  const lang = sp.lang === 'zh' ? 'zh' : 'en'

  const seoBodyEn = (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6 text-gray-700 leading-relaxed space-y-3">
      <p>Students searching for an <strong>essay writer that bypasses Turnitin</strong> usually have the same problem: they used ChatGPT or Claude to draft an essay, Turnitin flagged it, and now they need the text rewritten — not just reworded, but rewritten at the sentence level — while keeping their citations, data, and arguments intact.</p>

      <p>If your search was for an <strong>essay generator that bypasses Turnitin</strong>, the honest answer is that no generator produces text that passes on its own. What works is a generator or a draft plus a rewrite pass — the draft gets you to a complete argument, and the rewrite changes the statistical signature Turnitin scores. That two-step path is what this page covers, and it is also why the <a href="/bypass-test-methodology" className="text-violet-600 hover:underline">bypass test methodology</a> page exists: we publish the pass rates instead of asking you to take the claim on faith.</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">Why Turnitin flags AI essays</h2>
      <p>Turnitin's AI detection runs on two statistical signals borrowed from language-model research: <strong>perplexity</strong> (how predictable each word choice is) and <strong>burstiness</strong> (how much sentence length varies). AI writing scores low on both — every sentence lands in a narrow length band, and every word is the most probable one. That uniformity is what the classifier keys on, not any watermark.</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">The four moves that beat it</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Break the rhythm</strong> — mix three-word fragments with thirty-word sentences. Uniform length is the #1 AI tell.</li>
        <li><strong>Kill the AI vocabulary</strong> — "delve", "leverage", "robust", "furthermore", "in conclusion", "it is important to note". Replace with plain speech.</li>
        <li><strong>Add a human voice</strong> — first person, opinions, parenthetical asides. AI hedges; people commit.</li>
        <li><strong>Flatten the structure</strong> — AI loves lists and parallel paragraphs. Real essays digress.</li>
      </ul>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">How this tool differs from a paraphraser</h2>
      <p>Generic paraphrasers (QuillBot, Wordtune) swap synonyms inside the same sentence skeleton. Turnitin sees through that instantly — the perplexity profile barely moves. This tool rebuilds sentence structure from the ground up: active to passive, clause order flipped, connectors replaced. Citations in (Author, Year) format, quoted passages, and numerical data are held constant while everything around them changes.</p>

      <h3 className="text-base font-semibold text-gray-800 pt-1">What an essay generator does vs. what this rewrite does</h3>
      <p>An essay generator produces a first draft — it assembles a thesis, three body paragraphs and a conclusion, which is genuinely useful when you are stuck on structure. But that draft carries the generator's signature: uniform paragraph length, hedged claims, textbook transitions. Running it through a paraphraser leaves the skeleton and the statistical profile intact. This page sits after the generator: it rebuilds the sentences so the structure of the draft survives but the texture of the writing changes. If you need the draft itself, a generator is the right tool. If you need to submit the draft, this is the step that matters.</p>

      <h3 className="text-base font-semibold text-gray-800 pt-1">Which detector are you actually up against?</h3>
      <p>The rewrite strategy depends on the engine. <a href="/turnitin-bypass" className="text-violet-600 hover:underline">Turnitin AI detection</a> scores perplexity and burstiness. <a href="/gptzero-bypass" className="text-violet-600 hover:underline">GPTZero</a> uses the same two signals but weights them differently, and leans on the uniformity of sentence rhythm. <a href="/originality-ai-bypass" className="text-violet-600 hover:underline">Originality.ai</a> rewards short paragraphs, parenthetical asides and direct opinions. The shared moves are the same; the weighting is not.</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">Before you submit</h2>
      <p>Run the rewritten essay through our <a href="/ai-detector" className="text-violet-600 hover:underline">free AI detector</a> first. If it still scores high, submit the flagged sections again — long essays should be split into chunks of 3,000 characters. And check your institution's academic integrity policy: rewriting your own draft is different from submitting fabricated work.</p>

      <h3 className="text-base font-semibold text-gray-800 pt-1">If you need the voice, not just the score</h3>
      <p>A detector pass rate is not the same thing as sounding human. If the rewrite reads flat to you — which happens when the original draft was already generic — start from a <a href="/essay-humanizer" className="text-violet-600 hover:underline">rewrite aimed at natural academic prose</a> rather than one aimed at a specific detector, then check the result. For a style reference and a look at how one popular tool writes, see our <a href="/walterwrites" className="text-violet-600 hover:underline">Walter Writes AI review</a>.</p>
    </div>
  )

  const seoBodyZh = (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6 text-gray-700 leading-relaxed space-y-3">
      <p>搜「<strong>绕过 Turnitin 的论文写作工具</strong>」的人,处境基本一样:用 ChatGPT 或 Claude 写了初稿,Turnitin 标记为 AI 生成,现在需要改写——不是同义词替换,而是句子层面的重写——同时保留引用、数据和论点。</p>

      <p>如果搜的是「<strong>能绕过 Turnitin 的论文生成器</strong>」,说实话:没有任何生成器能一步产出通过检测的文本。可行的路径是「生成器写初稿 + 改写器重写」——生成器给你完整论证结构,改写这一步改变 Turnitin 打分的统计特征。这条两步走就是本页讲的内容,也是我们专门写<a href="/zh/bypass-test-methodology" className="text-violet-600 hover:underline">过检测试方法论</a>的原因:我们把通过率摆出来,而不是让你自己信。</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">Turnitin 为什么能标记 AI 论文</h2>
      <p>Turnitin 的 AI 检测基于两个统计信号:<strong>perplexity</strong>(词的可预测性)和 <strong>burstiness</strong>(句长变化幅度)。AI 写作两项都低——每句长度挤在窄区间里,每个词都是概率最高的那个。分类器抓的就是这种均匀性,不是什么水印。</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">过 Turnitin 的四个动作</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>打破节奏</strong> — 三词碎片句和三十词长句混用。句长均匀是 AI 第一大破绽。</li>
        <li><strong>清除 AI 词汇</strong> — "深入探讨""赋能""稳健""此外""综上所述"。全部换成自然表达。</li>
        <li><strong>加入人声</strong> — 第一人称、直接观点、括号旁白。AI 爱对冲,人敢下判断。</li>
        <li><strong>打平结构</strong> — AI 爱列表和对称段落。真人写作会跑题。</li>
      </ul>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">和普通改写工具的区别</h2>
      <p>通用改写工具(QuillBot 之类)只在原句骨架里换同义词,perplexity 曲线几乎不动,Turnitin 一眼看穿。本工具从句子结构层面重建:主动变被动、从句顺序重排、连接词替换。(Author, Year) 格式引用、引文、数字数据保持原样,只改周围的表述。</p>

      <h3 className="text-base font-semibold text-gray-800 pt-1">论文生成器做的,和这一步改写做的</h3>
      <p>论文生成器产出的是初稿——论点、三个主体段、结论,结构卡住的时候确实有用。但初稿带着生成器的指纹:段落长度均匀、观点对冲、过渡词模板化。再套一层同义改写,骨架和统计特征都原封不动。本页是生成器之后的那一步:句子重建,论证结构保留,行文质地改变。如果你要的是初稿本身,生成器是对的工具;如果你要交的是初稿,这一步才是关键。</p>

      <h3 className="text-base font-semibold text-gray-800 pt-1">你面对的到底是哪个检测器</h3>
      <p>改写策略随引擎不同。<a href="/zh/turnitin-bypass" className="text-violet-600 hover:underline">Turnitin AI 检测</a>看 perplexity 和 burstiness;<a href="/zh/gptzero-bypass" className="text-violet-600 hover:underline">GPTZero</a>用同样两个信号但权重不同,更偏重句子节奏的均匀性;<a href="/zh/originality-ai-bypass" className="text-violet-600 hover:underline">Originality.ai</a>则偏好短段落、括号插话和直接观点。底层动作相同,权重不同。</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">提交前</h2>
      <p>先用 <a href="/zh/ai-detector" className="text-violet-600 hover:underline">免费 AI 检测器</a> 查一遍。如果还有高分段落,把标记部分单独再跑一次——长论文按 3000 字分段。另外确认你学校的学术诚信政策:改写自己的草稿和提交编造的内容是两回事。</p>

      <h3 className="text-base font-semibold text-gray-800 pt-1">要的不只是分数,还要人味</h3>
      <p>过了检测不等于读起来像人写的。如果改完读着发平——初稿本来就泛的时候常这样——就从<a href="/zh/essay-humanizer" className="text-violet-600 hover:underline">面向自然学术表达的改写</a>入手,而不是针对某一个检测器去调。想看一种流行工具怎么写,参考我们的<a href="/zh/walterwrites" className="text-violet-600 hover:underline">Walter Writes AI 实测</a>。</p>
    </div>
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {lang === 'zh' ? seoBodyZh : seoBodyEn}
      <ToolClient mode="essay" initialLang={lang} i18n={essayI18n}
      heroTitle={{ zh: '绕过 Turnitin 的论文写作工具 — 免费 AI Essay Writer', en: 'Essay Writer That Bypasses Turnitin — Free AI Tool' }} heroSubtitle={{ zh: '写论文、改论文,让句子结构的变化幅度足够大,通过 Turnitin AI 检测。引用、数据和论点都保持不变,无需注册。', en: 'Draft and rewrite academic essays so the sentence structure varies enough to pass Turnitin AI detection. Citations, data, and your argument stay intact. No signup.' }}
    />
    </>
  )
}
