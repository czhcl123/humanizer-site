import type { Metadata } from 'next'
import { languageAlternates, pageUrl } from '@/lib/site'
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd'
import Link from 'next/link'
import ToolClient from '../../../components/Tool/ToolClient'
import { detectorI18n } from '../../../components/Tool/i18n/detector'

/** This route tree is Chinese; the language is a compile-time constant. */
const lang = 'zh' as const

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: '本站 AI 检测器真的免费吗？', acceptedAnswer: { '@type': 'Answer', text: '是。没有隐藏费用、无水印、无需注册。每个 IP 每滚动 24 小时 5 次，每次最多 3000 字符。' } },
    { '@type': 'Question', name: '检测原理是什么？', acceptedAnswer: { '@type': 'Answer', text: '由 DeepSeek Chat（deepseek-chat）进行提示词驱动的启发式分析：模型描述 5 项文本信号（句长均匀性、AI 词汇密度、困惑度、句长变化、列表式结构），并输出 ai_probability、human_probability、verdict、signals 和解释。不直连 GPTZero、Turnitin 或任何第三方检测 API，不独立计算信号，也不依据真实检测器反馈校准。' } },
    { '@type': 'Question', name: '检测准确率如何？', acceptedAnswer: { '@type': 'Answer', text: '早前未记录条件的内部印象约为 85–95%，但首个公开自洽性试点（2026-11-24）用本站检测器只测得 13.3%（4/30）；两者不可比，也没有任何第三方检测器的实测数据。分数是模型的意见，不是检测器的官方判定。' } },
    { '@type': 'Question', name: '会不会误判？', acceptedAnswer: { '@type': 'Answer', text: '会。风格均匀的人工写作可能被判为 AI，带缩写和第一人称的 AI 文本也可能被判为人写。5 项信号由模型生成而非独立计算；若 JSON 解析失败，结果会回退为 signals: [] 和固定的 50/50 分数。' } },
    { '@type': 'Question', name: '你们会保存我的文本吗？', acceptedAnswer: { '@type': 'Answer', text: '无持久存储。有上限的内存缓存保留输入哈希与输出，最长 10 分钟；限流计数按 IP 头记录。无分析 cookie 与追踪像素。详见 /zh/privacy。' } },
    { '@type': 'Question', name: '支持中文吗？', acceptedAnswer: { '@type': 'Answer', text: '仅支持英文（en）和简体中文（zh-CN），不支持繁体中文。' } },
  ],
}

export async function generateMetadata() {
    const titles = {
    zh: 'AI 内容检测器 - 免费检测 ChatGPT / Gemini / Claude 输出',
    en: 'AI Detector - Free AI Content Detection Tool',
  }
  const descriptions = {
    zh: '免费 AI 内容检测器：DeepSeek 提示词驱动的启发式分析，支持英文和简体中文，无需注册，非第三方检测器官方判定。',
    en: 'Free AI content detector using prompt-driven heuristic analysis via DeepSeek Chat. English and Simplified Chinese, no signup.',
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
    alternates: { canonical: pageUrl('/ai-detector', 'zh'), languages: languageAlternates('/ai-detector') },
  }
}

export default async function DetectorPage() {
  const seoBlockZh = (
    <section className="max-w-3xl mx-auto px-4 pt-8 pb-2 text-sm text-gray-600 leading-relaxed">
      <h2 className="text-xl font-bold text-gray-800 mb-3">AI 文本自查 — 启发式参考，非判定</h2>
      <p className="mb-3">
        这里提供的是提示词驱动的启发式文本自查：把草稿粘贴进来，DeepSeek Chat（deepseek-chat）会被要求评论<strong className="text-gray-800">句长是否均匀</strong>、<strong className="text-gray-800">模板词密度</strong>（如“深入探讨”“总而言之”）、<strong className="text-gray-800">列表式结构</strong>和<strong className="text-gray-800">可预测的段落过渡</strong>。这些是写作信号，不是作者身份的证据。本站<strong>不直连 GPTZero、Turnitin、ZeroGPT 或任何第三方检测器</strong>，不实现它们的算法，也无法验证作者身份或保证任何检测器的判定。若 JSON 解析失败，返回空 signals 与固定 50/50。
      </p>
      <p className="mb-3">
        检测器判定不可靠且存在争议，本站不是操纵分数的工具。作为局限证据：早前未记录条件的 85–95% 内部印象已撤回，2026-11-24 自洽性试点用本站检测器只测得 13.3%（4/30）；第三方抽查未完成，改写样本曾反复得到 100% AI 的结论。这些都不是产品效果承诺，数据与限定见<a href="/zh/bypass-test-methodology" className="text-violet-600 hover:underline">测试方法页</a>。若 JSON 解析失败，接口返回空 signals 和固定 50/50 分，不保证每次都有完整明细。
      </p>
      <h3 className="text-base font-semibold text-gray-800 mb-2 mt-4">适合做什么</h3>
      <ul className="list-disc list-inside mb-3 space-y-1 pl-1">
        <li><strong className="text-gray-800">草稿自查</strong> — 找出生硬、模板化的段落并自己改写。</li>
        <li><strong className="text-gray-800">编辑审阅</strong> — 发布前发现泛泛的套话。</li>
        <li><strong className="text-gray-800">写作改进</strong> — 把这些信号当作让文字更自然清晰的提示。</li>
        <li><strong className="text-gray-800">不适合</strong> — 证明或否定作者身份、处理学校/职场的判定争议，或预测某个检测器的结论。</li>
      </ul>
      <p className="text-xs text-gray-500 mb-0 pt-3 border-t border-gray-100">
        隐私：无持久存储；短期内存缓存最多保留输入哈希与输出 10 分钟，另有基于 IP 头的限流计数；无分析 cookie 与追踪像素，详见 <a href="/zh/privacy" className="text-violet-600 hover:underline">隐私政策</a>。免费配额：每个 IP 每滚动 24 小时 5 次，每次最多 3000 字符，无需注册。
      </p>
      <h3 className="text-base font-semibold text-gray-800 mb-2 mt-4">把注意力放在写作本身</h3>
      <ul className="list-disc list-inside mb-3 space-y-1 pl-1">
        <li><strong className="text-gray-800">学生论文</strong> — <Link href="/zh/essay-humanizer" className="text-violet-600 hover:underline">EssayRewriter</Link> 的提示词要求保留引用和学术语域，请自行核对。</li>
        <li><strong className="text-gray-800">博客/营销文案</strong> — <Link href="/zh" className="text-violet-600 hover:underline">AI Humanizer</Link> 把生硬的草稿改得更自然清晰。</li>
        <li><strong className="text-gray-800">个人风格</strong> — <Link href="/zh/walterwrites" className="text-violet-600 hover:underline">Walter Writes 风格</Link> 改写为更口语化的语气。</li>
      </ul>
      <p className="mb-3">
        检测器为何不可靠？不同引擎、版本和文体的表现不同，误判和漏判都会发生。可读<a href="/zh/glossary" className="text-violet-600 hover:underline">术语表</a>了解这些分数背后的概念，并参见<a href="/zh/limitations" className="text-violet-600 hover:underline">已知限制</a>。任何分数都不是作者身份或检测通过的证明。
      </p>
      <p className="mt-3 text-sm">
        想把这项启发式自查放到自己的站点?
        <Link href="/embed" className="text-violet-600 underline underline-offset-2">
          免费嵌入该工具
        </Link>
        —— 一段 iframe,无需注册、无需 API key。
      </p>
    <p className="text-xs text-gray-400 mt-4">最近核校：2026-11-24</p>
    </section>
  )
  return (
    <>
      <BreadcrumbJsonLd slug="/ai-detector" lang="zh" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {seoBlockZh}
      <ToolClient mode="detector" lang={lang} i18n={detectorI18n} />
    </>
  )
}
