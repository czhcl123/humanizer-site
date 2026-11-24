import type { Metadata } from 'next'
import { languageAlternates, pageUrl } from '@/lib/site'
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd'
import ToolClient from '../../../components/Tool/ToolClient'
import { essayI18n } from '../../../components/Tool/i18n/essay'

/** This route tree is English; the language is a compile-time constant. */
const lang = 'en' as const

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Is AI EssayRewriter really free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. AI EssayRewriter is 100% free with no paid tier, no signup, and no installation. Limits: 5 submissions per IP per rolling 24 hours, up to 3,000 characters each.' } },
    { '@type': 'Question', name: 'Does it pass Turnitin paper AI detection?', acceptedAnswer: { '@type': 'Answer', text: 'There is no calibration against Turnitin, GPTZero or Originality.ai. An earlier, undocumented internal impression suggested roughly 85–95%, but it has not been reproduced: a published self-check pilot on 2026-11-24 measured 13.3% (4/30) with this site’s own detector. The two are not comparable, and no third-party detector result has been measured. Results are not guaranteed.' } },
    { '@type': 'Question', name: 'Does it preserve my citations and facts?', acceptedAnswer: { '@type': 'Answer', text: 'The prompt asks the model to preserve citations, numbers and proper nouns; verify manually — LLM output is not post-processed.' } },
    { '@type': 'Question', name: 'Can I use it for school academic paper?', acceptedAnswer: { '@type': 'Answer', text: 'The tool helps you rewrite text you have permission to use. Users are responsible for following their school academic integrity policy. We do not help with plagiarism.' } },
    { '@type': 'Question', name: 'Does it support Chinese writing?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. English and Simplified Chinese papers supported. Idioms and academic terms preserved.' } },
    { '@type': 'Question', name: 'Do you store my paper?', acceptedAnswer: { '@type': 'Answer', text: 'No persistent storage; a short-lived in-memory cache may retain a hash of the input and the output for up to 10 minutes. See the privacy page at /privacy for details.' } },
    { '@type': 'Question', name: 'Can professors actually detect AI humanizer output?', acceptedAnswer: { '@type': 'Answer', text: 'Detector reliability is widely discussed but contested; sweeping claims about precise false-positive rates or specific news coverage are unverified and are not repeated here as fact. Practical takeaway: most instructors rely on detector scores along with their own judgment of voice and originality, and a detector score should never be treated as a verdict. Check your institution\'s policy.' } },
    { '@type': 'Question', name: 'How do I make ChatGPT text sound less robotic?', acceptedAnswer: { '@type': 'Answer', text: 'The five AI tells to fix: (1) uniform sentence length (ChatGPT writes 15-20 word sentences like clockwork), (2) transition word overuse (furthermore, moreover, in addition, ultimately, it is important to note), (3) em-dash overuse where a period works fine, (4) balanced punctuation across paragraphs, (5) in conclusion or in summary closings. A 10-minute checklist: read the draft aloud, count transition words (more than four in 800 words is a problem), replace em-dashes with periods, vary sentence lengths by combining two short sentences with a comma or splitting one long sentence in two. After manual cleanup, run the structural rewrite through a humanizer tool to catch what you missed. Then add back your own words and one specific detail (a class reference, a personal example) to make it unmistakably yours.' } },
    { '@type': 'Question', name: 'How does this compare to QuillBot in 2026?', acceptedAnswer: { '@type': 'Answer', text: 'QuillBot is a paraphraser for individual writers; this tool focuses on rewriting AI-generated drafts. QuillBot\'s exact pricing is widely discussed but unverified — check the official QuillBot pricing page at https://quillbot.com/pricing for current figures. This tool is 100% free with no signup. QuillBot suits human writing that needs light edits; this tool is for AI drafts that need a fuller rewrite. Detector results for either tool are not guaranteed.' } },
    { '@type': 'Question', name: 'Can I humanize AI text without it becoming too casual?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. This tool has a formal or academic mode that preserves the scholarly register. It is specifically designed for students who need to keep in my analysis tone, citation markers, and academic vocabulary intact. Generic humanizers often strip the formal register and output a casual cousin style (as TextSight calls it: a third person, more polished, more careful, more boring). Heavy mode here keeps academic register and citation markers like (Smith, 2019) untouched. Light mode shifts toward casual for blog posts or social media. Choose based on your destination: research paper, heavy. Blog post, light. Email to a colleague, standard.' } },
  ],
}

export async function generateMetadata() {
  const titles = {
    zh: 'Essay Humanizer - 免费论文 AI 改写工具',
    en: 'Essay Humanizer — Free Academic Rewriting',
  }
  const descriptions = {
    zh: '论文 AI 改写器,保留 (作者, 年份) 引用格式与脚注。支持英中和简体中文,3000 字以内,免费、无需注册;检测结果不作保证。',
    en: 'Free essay writing improvement: clearer, more natural drafts; citations kept on request, verified by you. No signup.',
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
    alternates: { canonical: pageUrl('/essay-humanizer', 'en'), languages: languageAlternates('/essay-humanizer') },
  }
}

export default async function essayPage() {

  const seoBodyEn = (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6 text-gray-700 leading-relaxed space-y-3">
      <p>An <strong>essay humanizer</strong> is not a spell checker and it is not a paraphraser. It rewrites AI-generated prose at the sentence level so it reads as something a person wrote — which matters when a school runs your paper through Turnitin AI, GPTZero, or Originality.ai and you need the structure of your argument intact while the statistical texture changes.</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">What an essay humanizer actually changes</h2>
      <p>Four things, in this order: <strong>sentence length variation</strong> (AI writes in a narrow band, humans do not), <strong>connective vocabulary</strong> (template transitions get replaced with ordinary speech), <strong>sentence order</strong> (clauses get reordered, active and passive get swapped), and <strong>paragraph shape</strong> (perfectly parallel paragraphs get broken up). What it does not change: your thesis, your citations, your numbers, your proper nouns.</p>

      <h3 className="text-base font-semibold text-gray-800 pt-1">Why natural writing and detector scores are different things</h3>
      <p>Detectors read statistical uniformity, not whether prose feels human. Two texts can read identically well and score completely differently, because one happens to have uniform sentence lengths. That is why we publish our <a href="/bypass-test-methodology" className="text-violet-600 hover:underline">test methodology</a> rather than a promise. See <a href="/limitations" className="text-violet-600 hover:underline">known limitations</a> for what the data does and does not show.</p>

      <h3 className="text-base font-semibold text-gray-800 pt-1">Which detector is grading you</h3>
      <p><a href="/turnitin-bypass" className="text-violet-600 hover:underline">Turnitin</a> scores perplexity and burstiness. <a href="/gptzero-bypass" className="text-violet-600 hover:underline">GPTZero</a> weighs the same signals differently and pays more attention to rhythmic uniformity. <a href="/originality-ai-bypass" className="text-violet-600 hover:underline">Originality.ai</a> rewards short paragraphs, parenthetical asides and direct opinions. If you know which one is in front of you, you can aim at it — our <a href="/ai-detector" className="text-violet-600 hover:underline">free AI detector</a> checks all three at once.</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">Using it on academic work</h2>
      <p>Paste a paragraph, read the rewrite, keep what you agree with. This is a revision step for text you wrote or are allowed to use, not a way to submit work you did not write. Split longer papers into chunks of 3,000 characters and run the sections that score worst. Check your institution's academic integrity policy before submitting — rules about AI assistance vary widely, and we cannot advise on that.</p>

      <h3 className="text-base font-semibold text-gray-800 pt-1">A note on false positives</h3>
      <p>Detectors are not reliable enough to be treated as verdicts. Research has repeatedly found that writing by non-native English speakers gets flagged at a much higher rate than it should. If you are writing in English as a second language, a flagged result may reflect the detector rather than your text — read the rewrite and keep the parts that sound like you.</p>
    </div>
  )

  const seoBodyZh = (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6 text-gray-700 leading-relaxed space-y-3">
      <p><strong>Essay Humanizer</strong> 不是拼写检查,也不是同义改写。它在句子层面重写 AI 生成的文本,让它读起来像人写的——学校用 Turnitin AI、GPTZero 或 Originality.ai 查重、而你要保住论证结构只换统计特征时,这一步是关键。</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">Essay Humanizer 到底改什么</h2>
      <p>四件事,按顺序:<strong>句长变化幅度</strong>(AI 的句子挤在窄区间,人不会)、<strong>连接词词汇</strong>(模板过渡词换成日常说法)、<strong>语序</strong>(从句重排,主动被动互换)、<strong>段落形状</strong>(过于工整的并列段落打散)。不改的:论点、引用、数字、专有名词。</p>

      <h3 className="text-base font-semibold text-gray-800 pt-1">「改得像人写的」不等于「过检测」</h3>
      <p>检测器读的是统计上的均匀性,不是读起来像不像人。两段读感完全一样的文本得分可以差很多,因为其中一段恰好句长均匀。这也是我们公布<a href="/zh/bypass-test-methodology" className="text-violet-600 hover:underline">测试方法、数据与局限</a>而不是空口承诺的原因;更多边界见<a href="/zh/limitations" className="text-violet-600 hover:underline">限制说明</a>。</p>

      <h3 className="text-base font-semibold text-gray-800 pt-1">到底是哪个检测器在判你</h3>
      <p><a href="/zh/turnitin-bypass" className="text-violet-600 hover:underline">Turnitin</a>看 perplexity 和 burstiness;<a href="/zh/gptzero-bypass" className="text-violet-600 hover:underline">GPTZero</a>同样两个信号但权重不同,更偏重节奏均匀性;<a href="/zh/originality-ai-bypass" className="text-violet-600 hover:underline">Originality.ai</a>偏好短段落、括号插话和直接观点。知道对面是谁才好瞄准——我们的<a href="/zh/ai-detector" className="text-violet-600 hover:underline">免费 AI 检测器</a>一次查三个。</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">用在学术写作上</h2>
      <p>粘一段,读改写结果,留下你认可的部分。这是给「自己写的、或有权使用的」文本做的修订步骤,不是提交别人没写的东西。长论文按 3000 字分段,先跑得分最差的几段。提交前确认学校的学术诚信政策——各校规定差别很大,这个我们没法替你判断。</p>

      <h3 className="text-base font-semibold text-gray-800 pt-1">关于误判</h3>
      <p>检测器不够可靠,不能当结论用。研究反复发现非母语者的英文写作被判 AI 的比例明显偏高。如果英语是你的第二语言,被判 AI 可能是检测器的问题而不是文本的问题——读改写结果,留下像你的部分。</p>
    </div>
  )

  return (
    <>
      <BreadcrumbJsonLd slug="/essay-humanizer" lang="en" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {seoBodyEn}
      <p className="text-xs text-gray-400 mt-4">Last reviewed: 2026-11-24</p>
      <ToolClient mode="essay" lang={lang} i18n={essayI18n}
      heroTitle={{ zh: 'Essay Humanizer — 免费论文写作改进', en: 'Essay Humanizer — Free Academic Rewriting' }} heroSubtitle={{ zh: '把生硬的 AI 辅助论文草稿改得更自然、清晰,提示词要求保留引用、事实和学术语气,请自行核对。免费,无需注册,3000 字以内。', en: 'Make rough AI-assisted academic drafts clearer and more natural. The prompt asks to keep your citations, facts and academic tone; verify them yourself. Free, no signup, 3,000 characters.' }}
    />
    </>
  )
}