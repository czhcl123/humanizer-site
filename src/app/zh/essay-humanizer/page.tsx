import type { Metadata } from 'next'
import { languageAlternates, pageUrl } from '@/lib/site'
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd'
import ToolClient from '../../../components/Tool/ToolClient'
import { essayI18n } from '../../../components/Tool/i18n/essay'

/** This route tree is Chinese; the language is a compile-time constant. */
const lang = 'zh' as const

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'AI 论文改写器真的免费吗？', acceptedAnswer: { '@type': 'Answer', text: '是。100% 免费，没有付费档、无需注册、无需安装。每次最多 3000 字符，每个 IP 每滚动 24 小时 5 次。' } },
    { '@type': 'Question', name: '能通过 Turnitin 的论文 AI 检测吗？', acceptedAnswer: { '@type': 'Answer', text: '早前未记录条件的内部印象约为 85–95%，但首个公开自洽性试点（2026-11-24）用本站检测器只测得 13.3%（4/30）；两者不可比，也没有任何第三方检测器的实测数据。不直连检测 API，也不依据真实检测器反馈校准。' } },
    { '@type': 'Question', name: '会保留引用和事实吗？', acceptedAnswer: { '@type': 'Answer', text: '会。论点、引用、日期、数字和专有名词都原样保留，只改写表述层。改写结果请自行核对。' } },
    { '@type': 'Question', name: '可以用于学校论文吗？', acceptedAnswer: { '@type': 'Answer', text: '本站帮助你改写有权使用的文本，不协助抄袭。请遵守所在学校的学术诚信规定，并自行核对结果。' } },
    { '@type': 'Question', name: '支持中文写作吗？', acceptedAnswer: { '@type': 'Answer', text: '仅支持英文（en）和简体中文（zh-CN），不支持繁体中文。' } },
    { '@type': 'Question', name: '你们会保存我的论文吗？', acceptedAnswer: { '@type': 'Answer', text: '无持久存储。有上限的内存缓存保留输入哈希与输出，最长 10 分钟；限流计数按 IP 头记录。无分析 cookie 与追踪像素。详见 /zh/privacy。' } },
  ],
}

export async function generateMetadata() {
    const titles = {
    zh: '论文写作改进 — 免费论文改写工具',
    en: 'Essay Rewriter - Free AI Essay Humanizer & Paraphraser 2026',
  }
  const descriptions = {
    zh: '免费论文写作改进工具：把生硬的 AI 草稿改得更自然清晰，按提示词保留引用与事实，需你人工核对。',
    en: 'Free essay writing tool that makes rough AI drafts clearer and more natural. The prompt asks the model to keep citations and proper nouns; verify them yourself. Bilingual.',
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
    alternates: { canonical: pageUrl('/essay-humanizer', 'zh'), languages: languageAlternates('/essay-humanizer') },
  }
}

export default async function essayPage() {
    return (
    <>
      <BreadcrumbJsonLd slug="/essay-humanizer" lang="zh" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6 text-gray-700 leading-relaxed space-y-3 max-w-3xl mx-auto">
        <p><strong>Essay Rewriter</strong> 专为学术写作设计：把 AI 生成的论文草稿改写成更自然的表述，尽量保留引用格式（如 Smith, 2019）、数据、年份和专有名词。改写与检测均由 DeepSeek Chat（deepseek-chat）在云端处理，不直连 Turnitin、GPTZero 等第三方检测 API。</p>
        <h2 className="text-lg font-semibold text-gray-800 pt-2">为什么需要改写</h2>
        <p>AI 生成的论文常有句式过于整齐、过渡词重复、缺乏个人观点等特征。本站检测器是提示词驱动的启发式分析：由 DeepSeek 输出概率与信号说明，不是检测器官方判定，也不保证每次返回完整 5 项信号（JSON 解析失败时 signals 为空、分数固定 50/50）。内部观察非第三方审计、非保证。</p>
      <p className="text-xs text-gray-400 mt-4">最近核校：2026-11-24</p>
      </div>
      <ToolClient mode="essay" lang={lang} i18n={essayI18n}
      heroTitle={{ zh: 'Essay Humanizer — 免费论文改写' }} heroSubtitle={{ zh: '改写 AI 论文表述，尽量保留引用、事实和学术语气。100% 免费，无需注册，每次最多 3000 字符，每 IP 每 24 小时 5 次。内部观察非保证。' }}
    />
    </>
  )
}
