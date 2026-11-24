import type { Metadata } from 'next'
import { languageAlternates, pageUrl } from '@/lib/site'
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd'

/** This route tree is Chinese; the language is a compile-time constant. */
const lang = 'zh' as const

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '2026-11-24 这次更新改了什么？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'v2.0 在公开测试显示检测分数不可靠后，把本站定位转向写作改进；旧 URL 保留但内容改写。v1.2 发布首个公开自洽性试点（2026-11-24，本站检测器，13.3%（4/30），不是第三方结果），撤回 85–95% 作为当前估计；v1.1 统一全站事实口径并新增参考资料页。',
      },
    },
    {
      '@type': 'Question',
      name: '这些版本是否改变了检测器的工作方式？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '没有。v1.1 和 v1.2 都是文档与表述层面的更新。检测器仍是提示词驱动的启发式分析，不是 GPTZero、Turnitin 或任何其他检测器的官方判定，也不保证准确。',
      },
    },
    {
      '@type': 'Question',
      name: '为什么撤回 85–95% 这个通过率数字？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '85–95% 是早前未记录条件的内部印象，不是审计或可复现的通过率。v1.2 将其作为当前估计撤回：首个公开自洽性试点（2026-11-24）用本站检测器只测得 13.3%（4/30）；第三方抽查未完成、改写样本曾反复得到 100% AI 的观察。这些数字只作为局限证据。',
      },
    },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  const title = '更新记录 — v2.0 变更内容'
  const description =
    '记录 2026-11-24 的 v2.0（测试显示检测分数不可靠，转向写作改进）以及早期 v1.2（13.3% 自洽性试点、撤回 85–95%）、v1.1 的改动。'
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
    alternates: { canonical: pageUrl('/changelog', 'zh'), languages: languageAlternates('/changelog') },
  }
}

const entryClass =
  'bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-4 text-gray-700 leading-relaxed'

export default async function ChangelogPage() {
  return (
    <>
      <BreadcrumbJsonLd slug="/changelog" lang="zh" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="mx-auto w-full max-w-3xl px-4 py-8 text-sm leading-relaxed text-gray-700">
        <article className={entryClass}>
          <h1 className="text-2xl font-bold text-gray-900">更新记录</h1>
          <p className="text-xs text-gray-500">最近核校：2026-11-24</p>
          <p>
            这一页记录本站对外表述与参考资料页的变更。它是文档日志，不代表底层工具经过重新训练，也不代表检测器表现有所提升。
          </p>
        </article>

        <article className={entryClass}>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h2 className="text-lg font-semibold text-gray-800">2026-11-24</h2>
            <span className="text-xs font-medium text-violet-700 bg-violet-50 border border-violet-100 rounded px-2 py-0.5">
              v2.0
            </span>
          </div>
          <ul className="list-decimal pl-5 space-y-3">
            <li>
              <strong>定位转向写作改进。</strong>公开测试显示检测分数不可靠，因此 AI Humanizer 现在定位为写作改进工具：把生硬的 AI 辅助草稿改得更自然、清晰、更贴合自己的表达。任何检测分数都不再作为本站效果的证明。
            </li>
            <li>
              <strong>保留旧 URL、改写内容。</strong>旧 bypass 路径下的页面改为解释检测器为何不可靠、如何写出自己的声音。AI 检测器页面改为启发式文本自查，不是判定，也不是作者身份验证。
            </li>
            <li>
              <strong>收紧表述。</strong>改写是语言模型输出，没有后置核验：提示词要求保留引用、数字和专有名词，请自行核对。已撤回的 85–95% 与 13.3% 自洽性试点只作为局限证据保留。
            </li>
          </ul>
        </article>

        <article className={entryClass}>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h2 className="text-lg font-semibold text-gray-800">2026-11-24</h2>
            <span className="text-xs font-medium text-violet-700 bg-violet-50 border border-violet-100 rounded px-2 py-0.5">
              v1.2
            </span>
          </div>
          <ul className="list-decimal pl-5 space-y-3">
            <li>
              <strong>发布首个公开自洽性试点。</strong>2026-11-24 用本站自己的检测器对 30 条样本做自洽性测试，改写稿只有 13.3%（4/30）被判为 Likely Human。样本、提示词与运行脚本见测试方法页。这不是第三方检测器结果。
            </li>
            <li>
              <strong>撤回 85–95% 作为当前估计。</strong>该数字来自未记录条件的早期内部印象，从未被复现。它只能作为历史背景与试点结果并列出现；没有任何第三方通过率实测数据。
            </li>
            <li>
              <strong>更新引用与限制说明。</strong>引用政策要求引用测试时注明自洽性试点、13.3%、2026-11-24、本站检测器、非第三方结果；限制说明解释为何自洽检测不构成独立证据。
            </li>
          </ul>
        </article>

        <article className={entryClass}>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h2 className="text-lg font-semibold text-gray-800">2026-11-24</h2>
            <span className="text-xs font-medium text-violet-700 bg-violet-50 border border-violet-100 rounded px-2 py-0.5">
              v1.1
            </span>
          </div>
          <ol className="list-decimal pl-5 space-y-3">
            <li>
              <strong>全站口径统一。</strong>免费、使用限制和通过率的说法在各页保持一致。85–95% 当时只作为“未审计内部观察”出现，不再写成已验证通过率；v1.2 进一步将其撤回。
            </li>
            <li>
              <strong>新增隐私政策与术语表页。</strong>用平实语言说明文本如何处理，并解释困惑度、句长变化、模板词密度和 AI 检测等术语，同时说明本站检测器的实际做法。
            </li>
            <li>
              <strong>新增参考资料页。</strong>本更新记录，以及“已知限制”和“引用政策”页，为描述本站工具提供可稳定引用的出处。
            </li>
            <li>
              <strong>技术描述更正。</strong>改写与检测统一描述为 DeepSeek 提示词驱动的处理，而非接入任何第三方检测器 API。
            </li>
            <li>
              <strong>删除无源断言。</strong>移除关于审计准确率、获得检测器官方认可以及结果保证之类的说法。
            </li>
            <li>
              <strong>FAQ 中文化。</strong>中文 FAQ 改用中文表述，并与英文版遵守相同的事实边界，而不是直译旧版说法。
            </li>
          </ol>
        </article>

        <article className={entryClass}>
          <h2 className="text-lg font-semibold text-gray-800">如何引用本次更新</h2>
          <p>
            推荐格式见<a href="/zh/citation-policy" className="text-violet-600 hover:underline">引用政策</a>页。只能把本站作为写作辅助工具引用，不得当作绕过工具或检测通过的证据；凡引用测试数据，必须保留“自洽性试点、2026-11-24、本站检测器、非第三方实测”等限定。
          </p>
          <p className="text-sm text-gray-500 pt-2">
            相关：<a href="/zh/limitations" className="text-violet-600 hover:underline">已知限制</a> ·{' '}
            <a href="/zh/glossary" className="text-violet-600 hover:underline">AI 检测术语表</a> ·{' '}
            <a href="/zh/about" className="text-violet-600 hover:underline">关于我们</a>
          </p>
        </article>

        <p className="text-xs text-gray-400 mt-4">最近核校：2026-11-24</p>
      </main>
    </>
  )
}
