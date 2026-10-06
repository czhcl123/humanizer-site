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

      <h2 className="text-lg font-semibold text-gray-800 pt-2">Before you submit</h2>
      <p>Run the rewritten essay through our <a href="/ai-detector" className="text-violet-600 hover:underline">free AI detector</a> first. If it still scores high, submit the flagged sections again — long essays should be split into chunks of 3,000 characters. And check your institution's academic integrity policy: rewriting your own draft is different from submitting fabricated work.</p>
    </div>
  )

  const seoBodyZh = (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6 text-gray-700 leading-relaxed space-y-3">
      <p>搜「<strong>绕过 Turnitin 的论文写作工具</strong>」的人,处境基本一样:用 ChatGPT 或 Claude 写了初稿,Turnitin 标记为 AI 生成,现在需要改写——不是同义词替换,而是句子层面的重写——同时保留引用、数据和论点。</p>

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

      <h2 className="text-lg font-semibold text-gray-800 pt-2">提交前</h2>
      <p>先用 <a href="/zh/ai-detector" className="text-violet-600 hover:underline">免费 AI 检测器</a> 查一遍。如果还有高分段落,把标记部分单独再跑一次——长论文按 3000 字分段。另外确认你学校的学术诚信政策:改写自己的草稿和提交编造的内容是两回事。</p>
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
