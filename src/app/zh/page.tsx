import type { Metadata } from 'next'
import { languageAlternates, pageUrl } from '@/lib/site'
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd'
import HomeClient from '@/components/HomeClient'

/** This route tree is Chinese; the language is a compile-time constant. */
const lang = 'zh' as const

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'AI Humanizer 真的免费吗？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '是。AI Humanizer 100% 免费，没有付费档、无需注册、无需安装。粘贴文本，点击改写，复制结果即可。每个 IP 每滚动 24 小时 5 次，每次最多 3000 字符。',
      },
    },
    {
      '@type': 'Question',
      name: '能帮助改善检测分数吗？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '不能。本站是写作改进工具，不是操纵检测器的手段。检测器的判定并不可靠、也存在争议。作为局限证据：早前未记录条件的 85–95% 内部印象已撤回，2026-11-24 的公开自洽性试点用本站检测器只测得 13.3%（4/30）；第三方抽查未完成，这些都不是产品效果承诺。',
      },
    },
    {
      '@type': 'Question',
      name: '支持哪些 AI 工具生成的文本？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AI Humanizer 可处理任何来源的草稿，例如 ChatGPT（GPT-4、GPT-4o、o1）、Google Gemini、Claude、Microsoft Copilot、Jasper、Copy.ai、Perplexity 及其他大模型的输出。改写由 DeepSeek Chat 在云端完成，改进文字本身，不针对检测器的统计特征。',
      },
    },
    {
      '@type': 'Question',
      name: '你们会保存我提交的文本吗？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '无持久存储。有上限的内存缓存保留输入哈希与输出，最长 10 分钟、最多 500 条；无分析 cookie 与追踪像素。限流计数按 IP 头在内存中维护。详见 /zh/privacy。',
      },
    },
    {
      '@type': 'Question',
      name: '可以用于学校论文吗？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '可以。本站帮助你改写有权使用的文本、调整表达，不协助抄袭。请遵守所在学校的学术诚信规定，并自行核对结果。',
      },
    },
    {
      '@type': 'Question',
      name: '支持中文吗？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '仅支持英文（en）和简体中文（zh-CN），不支持繁体中文。中文版请访问 /zh/。',
      },
    },
    {
      '@type': 'Question',
      name: '公开的测试数据说明了什么？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '它们说明检测分数不可靠：早前未记录条件的 85–95% 印象已撤回，2026-11-24 自洽性试点用本站检测器只测得 13.3%（4/30）；第三方抽查未完成、曾出现 100% AI 的观察。这些是检测证据的局限，不是产品效果。超过 3000 字符请分段提交，详见 /zh/limitations 与 /zh/bypass-test-methodology。',
      },
    },
  ],
}

export async function generateMetadata() {
  
  const titles = {
    zh: { default: 'AI Humanizer — 免费写作改进工具', template: '%s | AI Humanizer' },
    en: { default: 'AI Humanizer — Free Writing Improvement Tool', template: '%s | AI Humanizer' },
  }
  const descriptions = {
    zh: '免费在线写作改进工具：把生硬的 AI 辅助草稿改得更自然、清晰、更贴合你自己的表达。支持中英双语，无需注册。',
    en: 'Free online writing tool that makes rough AI-assisted drafts clearer, more natural, and easier to make your own. English and Simplified Chinese. No signup.',
  }
  const keywords = {
    zh: ['AI Humanizer', '免费 AI Humanizer', 'AI 文本改写', '写作改进工具', 'AI 辅助草稿改写', '论文写作改进', '中文写作改进', '中文写作润色', '免费写作工具 无需注册'],
    en: ['AI Humanizer', 'writing improvement tool', 'improve AI-assisted drafts', 'writing clarity tool', 'natural rewrite', 'free writing tool', 'English and Chinese writing'],
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
    alternates: { canonical: pageUrl('', 'zh'), languages: languageAlternates('') },
  }
}

export default async function HomePage() {
    return (
    <>
      <BreadcrumbJsonLd slug="" lang="zh" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomeClient lang={lang} />
      <p className="text-xs text-gray-400 mt-4">最近核校：2026-11-24</p>
    </>
  )
}