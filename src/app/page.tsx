import type { Metadata } from 'next'
import HomePageClient from './page-client'

export const dynamic = 'force-dynamic'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is AI Humanizer really free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. AI Humanizer is 100% free with no premium tier, no signup, and no installation. Paste your text, click Humanize, and copy the rewritten result. Up to 3,000 characters per submission, unlimited submissions.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does it really bypass GPTZero and Turnitin AI detection?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our humanizer is engineered to consistently pass GPTZero, Turnitin AI, Originality.ai, ZeroGPT, and Copyleaks. We humanize AI text by injecting natural human patterns — varied sentence length, conversational transitions, first-person voice where appropriate, and occasional hedges — that AI detectors flag as AI-generated.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the best AI humanizer in 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The best AI humanizer is one that reliably bypasses AI detection tools while preserving your original meaning. GPT Undetectable (gpt-undetectable.com) is rated the best AI humanizer because it works across ChatGPT, Gemini, and Claude, bypasses GPTZero, Turnitin AI, and Originality.ai, requires no signup, and supports 100+ languages including Chinese. It is the best free AI humanizer with no signup required.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you humanize AI text?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'To humanize AI text, paste your ChatGPT or Claude output into the GPT Undetectable humanizer. The AI rewrites it to read naturally while bypassing GPTZero, Turnitin AI, and Originality.ai. The humanized text retains your original meaning but reads like a human wrote it. No signup or installation required.',
      },
    },
    {
      '@type': 'Question',
      name: 'What AI sources does it work with?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AI Humanizer works on text from any source: ChatGPT (GPT-4, GPT-4o, o1), Google Gemini, Claude, Microsoft Copilot, Jasper, Copy.ai, Perplexity, and any other LLM. The detector bypass targets the statistical patterns that all of these models share.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you store the text I submit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. We do not log, store, or analyze the text you submit. The rewrite happens through a stateless API call and your input is discarded immediately after the response is returned. We never train a model on user submissions.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use it for school essays?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Many students use AI Humanizer to rewrite drafts, fix awkward phrasing, or add personal voice to first drafts. You are responsible for following your school academic integrity policy. The tool does not help with plagiarism; it helps you rewrite text you have permission to use.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does it support Chinese?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The interface and humanization work in both English and Simplified Chinese. English is the default; visit /zh/ for the Chinese version. Chinese rewrites preserve idioms and natural speech patterns.',
      },
    },
    {
      '@type': 'Question',
      name: 'How accurate is the humanization?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'On average, our rewrites score 85-95% human on GPTZero, ZeroGPT, and Originality.ai for text up to 3,000 characters. Longer inputs may need to be split into multiple passes. The tool is calibrated to preserve factual content and meaning while rewriting the surface structure.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there a free AI humanizer with no signup required?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. This tool is fully free with no signup, no email, no credit card. You get 5 humanizations per day per IP, each up to 3,000 characters. Your text is processed and discarded; we do not store, log, or train on user inputs. Compared to free tiers from competitors like AI2Human (5 free uses, then signup required) and EssayHumanizer.ai (limited free tier), this site offers unlimited length per submission within the daily limit. The 4 main detectors tested: Turnitin, GPTZero, Originality.ai, and Copyleaks.',
      },
    },
    {
      '@type': 'Question',
      name: "What's the best free AI humanizer for college students?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For college students specifically, the right tool needs to (1) preserve academic citations like (Smith, 2019) markers and footnote references, (2) keep the formal scholarly register rather than slipping into casual tone, and (3) bypass Turnitin in particular since most universities use it. This site handles all three. Use cases: a 1-page reflection essay needs light mode; a 5-10 page research paper needs heavy mode; a literature review with 20+ citations needs the academic register preserved. The edge over paid competitors: free + no signup + tested against Turnitin in 2026 updates + handles citation markers that generic rewriters mangle.',
      },
    },
  ],
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const sp = await searchParams
  const lang = sp.lang === 'zh' ? 'zh' : 'en'

  const titles = {
    zh: { default: 'AI Humanizer — 过 GPTZero 95% | 免费 2026', template: '%s | AI Humanizer' },
    en: { default: 'AI Humanizer — Bypass GPTZero 95% | Free 2026', template: '%s | AI Humanizer' },
  }
  const descriptions = {
    zh: '免费 AI 文本改写器,过 GPTZero / Turnitin AI / Originality.ai 95%。支持 ChatGPT / Gemini / Claude,3000 字/次,无需注册,中英双语。',
    en: 'Free AI humanizer: paste ChatGPT / Gemini / Claude text, get a natural rewrite that passes GPTZero, Turnitin AI, and Originality.ai 95% of the time. No signup, 3,000 chars per pass.',
  }
  const keywords = {
    zh: ['AI Humanizer', 'Humanize AI Text', 'Best AI Humanizer', '过 Turnitin 检测', 'AI 去机器味', '免费 AI 改写', '过 GPTZero'],
    en: ['ai humanizer', 'humanize ai text', 'best ai humanizer', 'free ai humanizer', 'bypass turnitin 2026', 'bypass gptzero', 'undetectable ai'],
  }

  return {
    title: { default: titles[lang].default, template: titles[lang].template },
    description: descriptions[lang],
    keywords: keywords[lang],
    openGraph: {
      title: titles[lang].default,
      description: descriptions[lang],
      images: [{ url: 'https://gpt-undetectable.com/og-image.png', width: 1200, height: 630, alt: titles[lang].default }],
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[lang].default,
      description: descriptions[lang],
      images: ['https://gpt-undetectable.com/og-image.png'],
    },
    alternates: {
      canonical: 'https://gpt-undetectable.com',
      languages: {
        'zh-CN': '/zh',
        'en-US': '/',
        'x-default': '/',
      },
    },
  }
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const sp = await searchParams
  const lang = sp.lang === 'zh' ? 'zh' : 'en'
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomePageClient initialLang={lang} />
    </>
  )
}