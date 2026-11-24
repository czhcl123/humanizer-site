import type { Metadata } from 'next'
import { languageAlternates, pageUrl } from '@/lib/site'
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd'
import ToolClient from '../../../components/Tool/ToolClient'
import { turnitinI18n } from '../../../components/Tool/i18n/turnitin'

/** This route tree is Chinese; the language is a compile-time constant. */
const lang = 'zh' as const

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'GPTZero 是什么？', acceptedAnswer: { '@type': 'Answer', text: '第三方工具，用于估算文本是否使用了 AI 辅助。其内部方法未公开，与本站无关联；判定是估算，不是作者身份的证明。' } },
    { '@type': 'Question', name: 'GPTZero 的分数为什么不可靠？', acceptedAnswer: { '@type': 'Answer', text: '困惑度和句长变化只是公开讨论的一般启发式，不是其算法的已验证说明；不同检测器可能对同一文本给出相反结论。本站数据仅说明局限：早前未记录条件的 85–95% 印象已因无法复现而撤回；2026-11-24 自测为 13.3%（4/30），用的是本站检测器；不完整的第三方抽查对改写文本给出 100% AI。我们没有与 GPTZero 的审计式对比。' } },
    { '@type': 'Question', name: '高分或低分能说明什么？', acceptedAnswer: { '@type': 'Answer', text: '单独看说明不了太多。把它当作重读文本的提醒：内容是否具体、是否有自己的判断、来源是否真实且经过核对。分数不是对你的评价。' } },
    { '@type': 'Question', name: '怎么把 AI 辅助草稿写得像自己的？', acceptedAnswer: { '@type': 'Answer', text: '补上你负责任的具体细节，写下自己对证据的评估，逐条核对引用与数字，删掉填充式过渡语。对话式改写能帮你看到别的写法，最终判断在你。' } },
    { '@type': 'Question', name: '本站承诺 GPTZero 结果吗？', acceptedAnswer: { '@type': 'Answer', text: '不承诺。AI Humanizer 是免费的写作改进工具，不针对检测器调优，也没有连接 GPTZero 的 API，更不保证输出。' } },
    { '@type': 'Question', name: '引用会保留吗？收费吗？', acceptedAnswer: { '@type': 'Answer', text: '提示词要求模型保留引用、数字和专有名词，请自行核对；输出不做后处理。100% 免费、无需注册，每 IP 每滚动 24 小时 5 次、每次最多 3000 字符。' } },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'GPTZero 分数为什么不可靠 — 写作建议',
    description: '免费在线写作改进工具：把生硬的 AI 辅助草稿改得更自然、清晰、更贴合你自己的表达。支持中英双语，无需注册。本页说明 GPTZero 分数的局限与写作方法。',
    openGraph: {
      title: 'GPTZero 分数为什么不可靠 — 写作建议',
      description: '免费在线写作改进工具：把生硬的 AI 辅助草稿改得更自然、清晰、更贴合你自己的表达。无需注册。',
      images: [{ url: 'https://gpt-undetectable.com/og-image.png', width: 1200, height: 630 }],
    },
    alternates: { canonical: pageUrl('/gptzero-bypass', 'zh'), languages: languageAlternates('/gptzero-bypass') },
  }
}

export default async function GptZeroBypassPage() {

  const seoBody = (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6 text-gray-700 leading-relaxed space-y-3">
      <p><strong>GPTZero</strong> 是学校和出版方使用的 AI 检测器之一。保留这个网址是为了原有链接继续可用，但本页现在讲一件事：<strong>检测器分数不可靠</strong>，真正值得投入的是写作本身。</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">为什么分数不是判定</h2>
      <p>困惑度（词在上下文中的可预测性）与突发性（句长变化幅度）只是公开讨论的一般启发式，不是 GPTZero 内部算法的公开说明。不同检测器可能对同一段文字给出不同结论。本站公布的数据记录的是局限，不是效果：早前未记录条件的 85–95% 印象已因无法复现而撤回；2026-11-24 自测为 13.3%（4/30），用的是本站检测器；不完整的第三方抽查对改写文本给出 100% AI。这些都不是与 GPTZero 的审计式对比。详见<a href="/zh/bypass-test-methodology" className="text-violet-600 hover:underline">测试方法</a>。</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">为读者写，而不是为分数写</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>具体细节</strong>——写出研究、数字、地点或你观察到的事，而不是任何文章都能套的话。</li>
        <li><strong>自己的判断</strong>——说出你的结论和理由，包括不确定的地方。</li>
        <li><strong>核对过的来源</strong>——打开来源，确认日期、数字、(作者, 年份) 和引文。提示词只要求保留，并不验证。</li>
        <li><strong>自然的节奏</strong>——句长跟着意思走，不是套公式。朗读草稿，留下像你自己的句子。</li>
      </ul>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">本站提供什么</h2>
      <p><strong>AI Humanizer</strong> 是免费的写作改进工具：100% 免费、无需注册，每 IP 每滚动 24 小时 5 次、每次最多 3000 字符，支持中英双语，DeepSeek Chat 云端处理。无持久存储，没有分析 cookie 或追踪像素，短期内存缓存最多保留 10 分钟。它未连接 GPTZero，也不承诺任何检测结果。更多背景见<a href="/zh/limitations" className="text-violet-600 hover:underline">局限说明</a>与<a href="/zh/glossary" className="text-violet-600 hover:underline">术语表</a>。</p>
    </div>
  )

  return (
    <>
      <BreadcrumbJsonLd slug="/gptzero-bypass" lang="zh" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {seoBody}
      <p className="text-xs text-gray-400 mt-4">最近核校：2026-11-24</p>
      <ToolClient mode="turnitin" lang={lang} i18n={turnitinI18n}
      heroTitle={{ zh: 'GPTZero 分数为什么不可靠 — 写作建议' }} heroSubtitle={{ zh: '写下具体细节、自己的判断，并亲自核对每一条引用。AI Humanizer 是免费的写作改进工具，不承诺任何检测结果；无需注册。' }}
    />
    </>
  )
}
