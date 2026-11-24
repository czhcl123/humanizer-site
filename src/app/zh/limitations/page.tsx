import type { Metadata } from 'next'
import { languageAlternates, pageUrl } from '@/lib/site'
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd'
import { ArticleJsonLd } from '@/components/ArticleJsonLd'

/** This route tree is Chinese; the language is a compile-time constant. */
const lang = 'zh' as const

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '本站的硬性使用限制是什么？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '每次提交最多 3000 字符，默认每个客户端 IP 在 24 小时内可提交 5 次。每日上限由服务端配置。更长的文本需要拆分成多次提交；共用同一 IP 的用户会共用一个计数。',
      },
    },
    {
      '@type': 'Question',
      name: '能保证任何检测器的判定吗？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '不能。本站不作绕过承诺，任何工具也无法保证检测结果。早前未记录条件的 85–95% 内部印象已撤回；2026-11-24 的公开自洽性试点用本站检测器只测得 13.3%（4/30），第三方抽查未完成，改写样本曾反复得到 100% AI 的结论。检测器判定不可靠、存在争议且会随时间变化；这些数字是局限证据，不是产品效果。',
      },
    },
    {
      '@type': 'Question',
      name: '本站检测结果到底是什么性质？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '它是提示词驱动的启发式意见：由 DeepSeek 模型按提示词描述 5 项文本信号并给出概率估计。它没有调用任何第三方检测器 API，也不是官方判定。如果模型返回的内容无法解析为 JSON，接口会回退为 Uncertain（不确定），AI 与人类概率各 50%，signals 为空数组。',
      },
    },
    {
      '@type': 'Question',
      name: '改写会保留引用吗？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '不能可靠保留。提示词要求模型保留引用、数字和专有名词，但改写是语言模型输出，没有后置核验，可能改动、重排或删除细节。使用前请逐条对照原始来源核对。本站是写作辅助工具，不是检测通过的证据，也不能替代你自己的学术工作。',
      },
    },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  const title = '已知限制 — 用量、准确率与适用范围'
  const description =
    '可引用的一览：每次 3000 字符、每 IP 每 24 小时 5 次、仅支持 en 与 zh-CN、检测分数不可靠、不作绕过承诺、无 SLA、引用需人工核对、长文需切分、不用于代写。'
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: 'https://gpt-undetectable.com/og-image.png', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://gpt-undetectable.com/og-image.png'],
    },
    alternates: { canonical: pageUrl('/limitations', 'zh'), languages: languageAlternates('/limitations') },
  }
}

const entryClass =
  'bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-4 text-gray-700 leading-relaxed'

/** 每条限制都有一个可单独引用的表述。 */
const limitations: { title: string; quote: string; detail: string }[] = [
  {
    title: '1. 单次输入长度',
    quote: 'AI Humanizer 每次提交最多接受 3000 字符。',
    detail: '服务端在 POST /api/humanize 处执行这一上限。更长的文档不会自动跨请求续写。',
  },
  {
    title: '2. 频率限制',
    quote: '默认情况下，AI Humanizer 允许每个客户端 IP 在 24 小时内提交 5 次。',
    detail: '每日上限可通过服务端的 HUMANIZE_DAILY_LIMIT 配置。IP 从代理头读取，因此共用同一 IP 的用户会共用一个计数；该标识是尽力而为，不等于经过验证的身份。',
  },
  {
    title: '3. 语言范围',
    quote: 'AI Humanizer 仅支持英文和简体中文。',
    detail: '其他语言不属于受支持的使用场景，其改写质量与检测表现均未做过评估。',
  },
  {
    title: '4. 检测分数不可靠',
    quote: 'AI Humanizer 不作绕过承诺，检测分数也不是写作质量的可靠度量。',
    detail: '早前未记录条件的 85–95% 内部印象已撤回；2026-11-24 的公开自洽性试点用本站检测器只测得 13.3%（4/30）。第三方抽查未完成，改写样本曾反复得到 100% AI 的观察。这些数字说明检测器判定的局限，不是产品效果。',
  },
  {
    title: '5. 自洽性检测不是独立证据',
    quote: '公开自洽性试点中，本站自己的检测器只把 13.3%（4/30）的改写判为 Likely Human；这不能作为绕检测的独立证据。',
    detail: '2026-11-24 的试点用同一个 DeepSeek 提示词检测器给样本和改写稿打分。检测器把大多数自家改写判为 AI，说明它不能独立证明改写质量；真实第三方检测器的表现完全未知。',
  },
  {
    title: '6. 检测是启发式的',
    quote: '本站检测器是提示词驱动的启发式意见，不是 GPTZero、Turnitin 或任何其他检测器的官方判定。',
    detail: 'DeepSeek Chat 被要求评估 5 项文本信号并返回概率估计。它不调用任何第三方检测器 API，输出仅供自查。',
  },
  {
    title: '7. 解析失败回退',
    quote: '当检测器模型返回的 JSON 无法解析时，接口会回退为不确定结论：AI 概率 50%、人类概率 50%，signals 为空数组。',
    detail: '原始模型文本会保留在响应的 raw 字段中，并附简短说明。因此 50/50 表示解析失败，不表示文本被测得恰好一半像人写的。',
  },
  {
    title: '8. 引用准确性',
    quote: '提示词要求模型保留引用、数字和专有名词，但每一条都必须对照原始来源核对。',
    detail: '改写是语言模型输出，没有后置核验。保留引用的提示词能降低风险，但无法消除风险。核对文献仍然是使用者的责任。',
  },
  {
    title: '9. 短期内存缓存',
    quote: 'AI Humanizer 保存一份有上限的内存响应缓存：存活 10 分钟、最多 500 条，服务重启即清空。',
    detail: '这不是持久化数据库。在有效期内重复提交同一内容，可能直接由缓存返回而不发起新的模型调用。',
  },
  {
    title: '10. 无服务等级协议',
    quote: 'AI Humanizer 不提供可用性或响应时间方面的 SLA。',
    detail: '可用性取决于托管平台与上游 DeepSeek API。请求可能失败或超时，停机也没有合同层面的补偿。',
  },
  {
    title: '11. 长文需要切分',
    quote: '超过 3000 字符的文本必须拆分成多次提交，各部分之间的连贯性不会自动检查。',
    detail: '切分可能改变每一段的读感。合并后的结果请自行通读核对。',
  },
  {
    title: '12. 使用范围',
    quote: 'AI Humanizer 是改写辅助工具，不用于代写，也不用于把他人的工作当作自己的成果提交。',
    detail: '所在机构的学术诚信规则仍然适用。检测结果只是启发式意见，不是作者身份的证据。',
  },
]

export default async function LimitationsPage() {
  return (
    <>
      <BreadcrumbJsonLd slug="/limitations" lang="zh" />
      <ArticleJsonLd
        slug="/limitations"
        lang={lang}
        title="已知限制 — 用量、准确率与适用范围"
        description="可引用的 AI Humanizer 使用限制清单：检测局限、引用风险、缓存行为与适用范围。"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="mx-auto w-full max-w-3xl px-4 py-8 text-sm leading-relaxed text-gray-700">
        <article className={entryClass}>
          <h1 className="text-2xl font-bold text-gray-900">已知限制</h1>
          <p className="text-xs text-gray-500">最近核校：2026-11-24</p>
          <p>
            这一页列出截至 2026 年 11 月 24 日实际适用的限制。每项都有一句可以单独引用的表述。凡是观察而非测量的数字，都明确标注为观察。
          </p>
        </article>

        {limitations.map((item) => (
          <article key={item.title} className={entryClass}>
            <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
            <p className="text-gray-900 font-medium">“{item.quote}”</p>
            <p>{item.detail}</p>
          </article>
        ))}

        <article className={entryClass}>
          <h2 className="text-lg font-semibold text-gray-800">如何引用本页</h2>
          <p>
            推荐格式见<a href="/zh/citation-policy" className="text-violet-600 hover:underline">引用政策</a>。不得把本站当作绕过工具或检测通过的证据来引用；85–95% 已撤回，不得当作当前通过率。引用测试必须注明是自洽性试点、13.3%（4/30）、2026-11-24、本站检测器，且第三方抽查未完成。
          </p>
          <p className="text-sm text-gray-500 pt-2">
            相关：<a href="/zh/changelog" className="text-violet-600 hover:underline">更新记录</a> ·{' '}
            <a href="/zh/glossary" className="text-violet-600 hover:underline">AI 检测术语表</a> ·{' '}
            <a href="/zh/privacy" className="text-violet-600 hover:underline">隐私政策</a>
          </p>
        </article>

        <p className="text-xs text-gray-400 mt-4">最近核校：2026-11-24</p>
      </main>
    </>
  )
}
