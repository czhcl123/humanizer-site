import type { Metadata } from 'next'
import ToolClient from '../../components/Tool/ToolClient'
import { essayI18n } from '../../components/Tool/i18n/essay'

export const dynamic = 'force-dynamic'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Is AI EssayRewriter really free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. AI EssayRewriter is 100% free with no premium tier, no signup, and no installation. Paste your paper text, click Humanize, and get a natural-sounding rewrite. Up to 3,000 characters per submission.' } },
    { '@type': 'Question', name: 'Does it pass Turnitin paper AI detection?', acceptedAnswer: { '@type': 'Answer', text: 'Calibrated specifically against Turnitin AI, GPTZero, and Originality.ai document detection. 85-95% pass rate on English papers up to 3,000 characters.' } },
    { '@type': 'Question', name: 'Does it preserve my citations and facts?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Your thesis, citations, dates, numbers, and proper nouns are all preserved exactly. Only the surface expression is rewritten.' } },
    { '@type': 'Question', name: 'Can I use it for school academic paper?', acceptedAnswer: { '@type': 'Answer', text: 'The tool helps you rewrite text you have permission to use. Users are responsible for following their school academic integrity policy. We do not help with plagiarism.' } },
    { '@type': 'Question', name: 'Does it support Chinese writing?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. English and Simplified Chinese papers supported. Idioms and academic terms preserved.' } },
    { '@type': 'Question', name: 'Do you store my paper?', acceptedAnswer: { '@type': 'Answer', text: 'No. Stateless API. Input discarded immediately after rewrite. We never train on user submissions.' } },
    { '@type': 'Question', name: 'Can professors actually detect AI humanizer output?', acceptedAnswer: { '@type': 'Answer', text: 'Most professors cannot reliably detect humanizer output in 2026. A 2023 Stanford study found that 61% of essays by non-native English writers were false-flagged by AI detectors, and 97% were flagged by at least one detector. In March 2026, Newsweek covered a Reddit r/professors post by Dr. Sam Illingworth (Edinburgh Napier University) where he confirmed the detectors are too unreliable and that students are now running legitimately human-written work through humanizers just to avoid false positives. Practical takeaway: most professors rely on detector scores plus their own judgment of voice and originality. Humanizer output that preserves your voice and ideas is essentially indistinguishable from a strong student draft. One tip: do not trust a single detector score. Run your text through 2-3 different detectors (GPTZero, Originality.ai, ZeroGPT) and check consistency before assuming a verdict.' } },
    { '@type': 'Question', name: 'How do I make ChatGPT text sound less robotic?', acceptedAnswer: { '@type': 'Answer', text: 'The five AI tells to fix: (1) uniform sentence length (ChatGPT writes 15-20 word sentences like clockwork), (2) transition word overuse (furthermore, moreover, in addition, ultimately, it is important to note), (3) em-dash overuse where a period works fine, (4) balanced punctuation across paragraphs, (5) in conclusion or in summary closings. A 10-minute checklist: read the draft aloud, count transition words (more than four in 800 words is a problem), replace em-dashes with periods, vary sentence lengths by combining two short sentences with a comma or splitting one long sentence in two. After manual cleanup, run the structural rewrite through a humanizer tool to catch what you missed. Then add back your own words and one specific detail (a class reference, a personal example) to make it unmistakably yours.' } },
    { '@type': 'Question', name: 'How does this compare to QuillBot in 2026?', acceptedAnswer: { '@type': 'Answer', text: 'QuillBot is a paraphraser built for individual writers working inside their browser tab. This tool is built specifically for AI-output rewriting. Three differences matter: First, QuillBot does not claim to bypass AI detectors (their own documentation says their outputs may still be flagged). This tool is tested against Turnitin, GPTZero, Originality.ai, and Copyleaks with 85-95% pass rates. Second, pricing: QuillBot Premium is about $99 per year. This tool is free with no signup. Third, use case: QuillBot is good for human writing that needs structural edits or synonym swaps. This tool is for AI drafts that need full humanization to bypass detector scrutiny. If you wrote it yourself and want to polish, use QuillBot. If ChatGPT wrote it and you need it to read as human, use this.' } },
    { '@type': 'Question', name: 'Can I humanize AI text without it becoming too casual?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. This tool has a formal or academic mode that preserves the scholarly register. It is specifically designed for students who need to keep in my analysis tone, citation markers, and academic vocabulary intact. Generic humanizers often strip the formal register and output a casual cousin style (as TextSight calls it: a third person, more polished, more careful, more boring). Heavy mode here keeps academic register and citation markers like (Smith, 2019) untouched. Light mode shifts toward casual for blog posts or social media. Choose based on your destination: research paper, heavy. Blog post, light. Email to a colleague, standard.' } },
  ],
}

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const sp = await searchParams
  const lang = sp.lang === 'zh' ? 'zh' : 'en'
  const titles = {
    zh: 'AI Essay Humanizer - 免费学生论文改写,绕过 Turnitin 检测',
    en: 'Essay Rewriter - Free AI Essay Humanizer & Paraphraser 2026',
  }
  const descriptions = {
    zh: '免费 Essay rewriter,改写 AI 生成的论文,绕过 Turnitin、GPTZero、Originality.ai 检测,保留引用、事实、数据。',
    en: 'Free online essay rewriter: paste AI-generated essays, research papers, or assignments and get a natural-sounding rewrite that passes Turnitin AI and GPTZero detection. Preserves (Author, Year) citations, dates, and proper nouns. Up to 3,000 characters, free, no signup, bilingual.',
  }
  return {
    title: titles[lang],
    description: descriptions[lang],
    openGraph: { title: titles[lang], description: descriptions[lang] },
    alternates: {
      canonical: 'https://gpt-undetectable.com/essay-humanizer',
      languages: {
        'zh-CN': '/zh/essay-humanizer',
        'en-US': '/essay-humanizer',
        'x-default': '/essay-humanizer',
      },
    },
  }
}

export default async function essayPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const sp = await searchParams
  const lang = sp.lang === 'zh' ? 'zh' : 'en'
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ToolClient mode="essay" initialLang={lang} i18n={essayI18n} />
    </>
  )
}