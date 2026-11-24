import type { Metadata } from 'next'
import { languageAlternates, pageUrl } from '@/lib/site'
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd'
import ToolClient from '../../../components/Tool/ToolClient'
import { turnitinI18n } from '../../../components/Tool/i18n/turnitin'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: '什么是 AI 检测器？', acceptedAnswer: { '@type': 'Answer', text: '一种估算文本是否使用了 AI 辅助的工具。不同检测器方法不同且未公开，判定存在争议，不能作为作者身份的证明。' } },
    { '@type': 'Question', name: '为什么检测器的结论不可靠？', acceptedAnswer: { '@type': 'Answer', text: 'GPTZero、Turnitin、Originality.ai、ZeroGPT 各自独立开发方法；公开讨论的困惑度、句长变化只是一般启发式，不是经过验证的内部信号。同一段文字在不同工具上的判定可能不同。' } },
    { '@type': 'Question', name: '已公布的数字说明什么？', acceptedAnswer: { '@type': 'Answer', text: '说明的是局限，不是产品效果：早前未记录条件的内部印象约 85–95% 已撤回（无法复现）；2026-11-24 本站自测用本站检测器只测得 13.3%（4/30）；不完整的第三方抽查对改写文本给出 100% AI。这些数据互不可比，也不验证任何检测器或产品。详见 /bypass-test-methodology。' } },
    { '@type': 'Question', name: '怎么把草稿写得更像自己的表达？', acceptedAnswer: { '@type': 'Answer', text: '写进你确实知道的具体细节；说出你的判断和理由；每条引用、数字、引文都打开原始来源亲自核对。朗读一遍，留下你自己会写的句子。' } },
    { '@type': 'Question', name: '本站承诺检测结果吗？', acceptedAnswer: { '@type': 'Answer', text: '不承诺。AI Humanizer 是免费的写作改进工具：提示词要求把表述改得更清晰自然，不针对任何检测器调优、逆向或保证输出。' } },
    { '@type': 'Question', name: '引用和数字会保留吗？', acceptedAnswer: { '@type': 'Answer', text: '提示词要求模型保留引用、数字和专有名词，请自行核对；模型输出不做后处理，不保证逐字保留。' } },
    { '@type': 'Question', name: '收费吗？会保存我的文本吗？', acceptedAnswer: { '@type': 'Answer', text: '100% 免费、无需注册：每 IP 每滚动 24 小时 5 次，每次最多 3000 字符，支持中英双语。无持久存储；短期内存缓存最多保留输入哈希与输出 10 分钟。详见 /zh/privacy。' } },
  ],
}

export async function generateMetadata() {
  return {
    title: 'AI 检测器为什么不可靠 — 写作建议',
    description: '免费在线写作改进工具：把生硬的 AI 辅助草稿改得更自然、清晰、更贴合你自己的表达。支持中英双语，无需注册。本页说明检测器局限与写出自己声音的方法。',
    openGraph: {
      title: 'AI 检测器为什么不可靠 — 写作建议',
      description: '免费在线写作改进工具：把生硬的 AI 辅助草稿改得更自然、清晰、更贴合你自己的表达。无需注册。',
      images: [{ url: 'https://gpt-undetectable.com/og-image.png', width: 1200, height: 630, alt: 'AI 检测器为什么不可靠 — 写作建议' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'AI 检测器为什么不可靠 — 写作建议',
      description: '免费在线写作改进工具：把生硬的 AI 辅助草稿改得更自然、清晰、更贴合你自己的表达。无需注册。',
      images: ['https://gpt-undetectable.com/og-image.png'],
    },
    alternates: { canonical: pageUrl('/bypass-ai', 'zh'), languages: languageAlternates('/bypass-ai') },
  }
}

export default async function BypassAiZhPage() {
  const seoBody = (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6 text-gray-700 leading-relaxed space-y-3">
      <p>保留这个网址是为了原有链接继续可用。本页现在是一篇说明：<strong>AI 检测器的判定并不可靠</strong>，更有用的是把生硬的 AI 辅助草稿改成你自己的表达。</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">为什么检测器不可靠</h2>
      <p>GPTZero、Turnitin、Originality.ai、ZeroGPT 采用各自独立且未公开的方法。困惑度和句长变化只是公开讨论的一般启发式，不是已验证的内部信号。本站公布的数据只说明局限，不证明产品效果：早前未记录条件的 85–95% 印象已因无法复现而撤回；2026-11-24 用本站检测器自测只测得 13.3%（4/30）；不完整的第三方抽查对改写文本给出 100% AI。这些数字互不可比，也不验证任何检测器。详见<a href="/zh/bypass-test-methodology" className="text-violet-600 hover:underline">测试方法</a>与<a href="/zh/limitations" className="text-violet-600 hover:underline">局限说明</a>。</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">如何写出更像你自己的文字</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>具体细节</strong>——写进你亲眼见过、测过或经历过的事，替换泛泛而谈。</li>
        <li><strong>个人观点</strong>——说出你的判断、理由和不确定之处，别只写中立的套话。</li>
        <li><strong>亲自核对引用</strong>——打开每条来源，确认 (作者, 年份)、数字与引文，再判断它是否真的支持论点。提示词只要求保留，核对靠你。</li>
        <li><strong>朗读一遍</strong>——句长跟着意思走，不是为了让检测器满意；留下你会说的话。</li>
      </ul>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">本站是什么</h2>
      <p><strong>AI Humanizer</strong> 是免费的写作改进工具，不承诺任何检测结果。DeepSeek Chat 云端处理，支持中英双语，100% 免费、无需注册；每 IP 每滚动 24 小时 5 次、每次最多 3000 字符。无持久存储，仅有最长 10 分钟的内存缓存，也没有分析 cookie 或追踪像素。我们的<a href="/zh/ai-detector" className="text-violet-600 hover:underline">文本自查</a>是提示词驱动的启发式分析，不是作者身份判定。</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">学术诚信优先</h2>
      <p>只改写成你有权提交的内容。任何工具都不能让别人的作品变得正当；各校关于 AI 辅助的规定不同，提交前请查清本校政策。<a href="/zh/citation-policy" className="text-violet-600 hover:underline">引用政策</a>说明了如何标注写作辅助工具。</p>
    </div>
  )

  return (
    <>
      <BreadcrumbJsonLd slug="/bypass-ai" lang="zh" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {seoBody}
      <ToolClient mode="turnitin" lang="zh" i18n={turnitinI18n}
      heroTitle={{ zh: 'AI 检测器为什么不可靠 — 写作建议' }} heroSubtitle={{ zh: '写下具体细节、自己的判断，并亲自核对每一条引用。AI Humanizer 是免费的写作改进工具，不承诺任何检测结果；无需注册。' }}
    />
    <p className="text-xs text-gray-400 mt-4">最近核校：2026-11-24</p>
    </>
  )
}