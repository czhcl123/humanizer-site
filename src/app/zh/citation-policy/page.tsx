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
      name: '引用本站应采用什么格式？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AI Humanizer（2026）：《[页面标题]》，https://gpt-undetectable.com/[路径]，访问日期：[DATE]。请把占位符换成实际读过的页面标题、路径和访问日期。只能把本站作为写作辅助工具引用；不得当作绕过工具或检测通过的证据。85–95% 已撤回；2026-11-24 自洽性试点为 13.3%（4/30）、使用本站检测器，第三方抽查未完成。',
      },
    },
    {
      '@type': 'Question',
      name: '可以把本站引用为“已验证通过率”的依据吗？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '不可以。你可以把本站作为写作辅助工具来引用，但不能当作绕过工具、已验证通过率或检测器认可的证据。85–95% 已撤回；2026-11-24 自洽性试点测得 13.3%（4/30），使用本站检测器，第三方抽查未完成。这些都不是产品效果承诺。',
      },
    },
    {
      '@type': 'Question',
      name: '本站与 GPTZero 或 Turnitin 有关联吗？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '没有。AI Humanizer 不是 GPTZero、Turnitin 或任何其他检测器的官方工具。本站自己的检测器输出是提示词驱动的启发式意见，不是这些产品的官方判定。',
      },
    },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  const title = '引用政策 — 如何引用本站'
  const description =
    '如何把 AI Humanizer 作为写作辅助工具引用：不得当作绕过工具或检测通过的证据；85–95% 已撤回，2026-11-24 的 13.3% 自洽性试点只是有限证据。'
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
    alternates: { canonical: pageUrl('/citation-policy', 'zh'), languages: languageAlternates('/citation-policy') },
  }
}

const entryClass =
  'bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-4 text-gray-700 leading-relaxed'

export default async function CitationPolicyPage() {
  return (
    <>
      <BreadcrumbJsonLd slug="/citation-policy" lang="zh" />
      <ArticleJsonLd
        slug="/citation-policy"
        lang={lang}
        title="引用政策 — 如何引用本站"
        description="本站推荐引用格式，以及把 AI Humanizer 作为来源引用时必须遵守的边界。"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="mx-auto w-full max-w-3xl px-4 py-8 text-sm leading-relaxed text-gray-700">
        <article className={entryClass}>
          <h1 className="text-2xl font-bold text-gray-900">引用政策</h1>
          <p className="text-xs text-gray-500">最近核校：2026-11-24</p>
          <p>
            这一页说明在论文、报告或文章中如何引用 AI Humanizer，以及哪些说法可以归到本站名下。只能作为写作辅助工具引用，不得当作绕过工具或检测通过的证据。它描述本站能支持什么，而不是本站能证明什么。
          </p>
        </article>

        <article className={entryClass}>
          <h2 className="text-lg font-semibold text-gray-800">推荐引用格式</h2>
          <p className="bg-gray-50 border border-gray-100 rounded p-3 text-xs text-gray-900 break-words">
            AI Humanizer（2026）：《&lt;页面标题&gt;》，https://gpt-undetectable.com/&lt;路径&gt;，访问日期：&lt;DATE&gt;。
          </p>
          <p>
            例如引用英文的“已知限制”页：AI Humanizer (2026). Known Limitations — Limits, Accuracy and
            Scope. https://gpt-undetectable.com/limitations. Accessed 2026-11-24。请换成你实际读过的页面标题、路径和访问日期；引用中文页时，在路径前加上 <code className="bg-gray-100 px-1 rounded">/zh</code>{' '}
            并使用中文页面标题。
          </p>
        </article>

        <article className={entryClass}>
          <h2 className="text-lg font-semibold text-gray-800">可以引用什么</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>可以：</strong>把 AI Humanizer 作为一个免费的写作改进工具来引用：帮助把生硬的草稿改得更自然、清晰，并配有启发式文本自查。这是对工具的描述，不是研究结论。
            </li>
            <li>
              <strong>不得作为当前数字引用：</strong>85–95% 是早前未记录条件的内部印象，已撤回。自洽性试点（2026-11-24）测得 <strong>13.3%（4/30）</strong>；第三方抽查未完成，改写样本曾反复得到 100% AI 的观察。引用时必须注明是<strong>自洽性试点、使用本站检测器、不是第三方检测器结果</strong>，并作为局限而非产品效果呈现。
            </li>
            <li>
              <strong>不可以：</strong>把本站当作<strong>绕过工具</strong>或<strong>已验证通过率</strong>、检测器认可、第三方检测器表现、某段文本确由人写的证据来引用。
            </li>
          </ul>
        </article>

        <article className={entryClass}>
          <h2 className="text-lg font-semibold text-gray-800">必须保留的边界</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>不是官方工具。</strong>AI Humanizer 与 GPTZero、Turnitin、Originality.ai 或其他检测器没有关联，也不是它们的官方产品。
            </li>
            <li>
              <strong>结果是启发式的。</strong>本站检测器输出是模型对文本信号给出的意见，不是官方判定，也不保证准确。
            </li>
            <li>
              <strong>依赖版本。</strong>检测结果会随检测器版本和模型行为变化。某一天观察到的结果不是文本或工具的稳定属性。
            </li>
            <li>
              <strong>不等于研究复现。</strong>DetectGPT 等公开研究只是背景阅读；本站没有实现它，也不应被引用为实现了该研究。
            </li>
          </ul>
        </article>

        <article className={entryClass}>
          <h2 className="text-lg font-semibold text-gray-800">合规引用示例</h2>
          <p>
            “AI Humanizer 是一个免费的写作改进工具，帮助把生硬的草稿改得更自然、清晰；其公开自洽性试点（2026-11-24）用本站检测器测得 13.3%（4/30）被判为 Likely Human，不是第三方检测器结果，这说明检测分数并不可靠（AI Humanizer, 2026）。”这句话保留了必要限定。“AI Humanizer 的通过率已经验证达到 85–95%”或“用 AI Humanizer 绕过检测器”都不成立。
          </p>
          <p className="text-sm text-gray-500 pt-2">
            相关：<a href="/zh/limitations" className="text-violet-600 hover:underline">已知限制</a> ·{' '}
            <a href="/zh/changelog" className="text-violet-600 hover:underline">更新记录</a> ·{' '}
            <a href="/zh/bypass-test-methodology" className="text-violet-600 hover:underline">测试方法</a>
          </p>
        </article>

        <p className="text-xs text-gray-400 mt-4">最近核校：2026-11-24</p>
      </main>
    </>
  )
}
