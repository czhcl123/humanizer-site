import type { Metadata } from 'next'
import { languageAlternates, pageUrl } from '@/lib/site'
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd'
import ToolClient from '../../../components/Tool/ToolClient'
import { chineseI18n } from '../../../components/Tool/i18n/chinese'

/** This route tree is Chinese; the language is a compile-time constant. */
const lang = 'zh' as const

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: '什么是 AI 率?', acceptedAnswer: { '@type': 'Answer', text: 'AI 率 是中文论文场景的指标 —— 知网、维普等中文检测器对论文 AI 生成概率的评分。AI 率高 = 像 AI 写的;AI 率低 = 像人写的。' } },
    { '@type': 'Question', name: '能过知网 AIGC 检测吗?', acceptedAnswer: { '@type': 'Answer', text: '本站不直连知网、维普或任何第三方检测 API，也不声称其与官方结果一致。早前未记录条件的内部印象约为 85–95%，但首个公开自洽性试点（2026-11-24）用本站检测器只测得 13.3%（4/30）；两者不可比，也没有任何第三方检测器的实测数据。' } },
    { '@type': 'Question', name: '保留引用和数据吗?', acceptedAnswer: { '@type': 'Answer', text: '保留。所有引用、专有名词、数字、年份、术语都不动。只改写表述层。' } },
    { '@type': 'Question', name: '支持英文论文吗?', acceptedAnswer: { '@type': 'Answer', text: '仅支持英文（en）和简体中文（zh-CN），无繁中优化。' } },
    { '@type': 'Question', name: '替换哪些 AI 八股词?', acceptedAnswer: { '@type': 'Answer', text: '"赋能"→"帮助/推动";"抓手"→"方法/路径";"底层逻辑"→"核心思路";"链路"→"环节";"生态位"→"位置";"范式"→"模式";"价值闭环"→"完整流程";"降维打击"→"突破"。' } },
    { '@type': 'Question', name: '你存我的论文吗?', acceptedAnswer: { '@type': 'Answer', text: '无持久存储；短期内存缓存最多保留输入哈希与输出 10 分钟，另有基于 IP 头的限流计数；无分析 cookie 与追踪像素。详见 /zh/privacy。' } },
  ],
}

export async function generateMetadata() {
    const titles = {
    zh: '中文写作改进 — 免费中文文本润色工具',
    en: 'Chinese Writing Improvement — Free Rewrite Tool',
  }
  const descriptions = {
    zh: '免费在线改写中文文本，保留论点、引用和数据。由 DeepSeek 云端处理，不直连第三方检测 API，内部观察非保证。',
    en: 'Free AI text rewriter for English and Simplified Chinese, processed by DeepSeek Chat in the cloud. No pass-rate guarantee.',
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
    alternates: { canonical: pageUrl('/jiang-ai-lv', 'zh'), languages: languageAlternates('/jiang-ai-lv') },
  }
}

export default async function ChinesePage() {
    return (
    <>
      <BreadcrumbJsonLd slug="/jiang-ai-lv" lang="zh" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6 text-gray-700 leading-relaxed space-y-3 max-w-3xl mx-auto">
        <p><strong>AI 率</strong> 是中文论文场景常见的说法，指检测器给出的 AI 生成概率。本站不直连知网 AIGC、维普或任何第三方检测 API，也不掌握其内部算法；改写与检测由 DeepSeek Chat（deepseek-chat）在云端完成，尽量保留引用、数据和专有名词。</p>
        <h2 className="text-lg font-semibold text-gray-800 pt-2">为什么中文 AI 率特别高？</h2>
        <p>中文 AI 输出常见"赋能""抓手""底层逻辑"等套话、句式过于整齐、缺乏个人观点和具体例子。本站检测器是提示词驱动的启发式分析，输出概率与信号说明，不是检测器官方判定；早前未记录条件的内部印象约为 85–95%，但首个公开自洽性试点（2026-11-24）用本站检测器只测得 13.3%（4/30）；两者不可比，也没有任何第三方检测器的实测数据。</p>
      <p className="text-xs text-gray-400 mt-4">最近核校：2026-11-24</p>
      </div>
      <ToolClient mode="chinese" lang={lang} i18n={chineseI18n}
      heroTitle={{ zh: '中文写作改进 — 免费中文改写工具' }} heroSubtitle={{ zh: '针对常见中文 AI 写作套话的改写策略,提示词要求保留论点、引用、数据,请自行核对。100% 免费,无需注册,每次最多 3000 字符,每 IP 每 24 小时 5 次。结果非保证。' }}
    />
    </>
  )
}
