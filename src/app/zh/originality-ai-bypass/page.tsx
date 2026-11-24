import type { Metadata } from 'next'
import { languageAlternates, pageUrl } from '@/lib/site'
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd'
import Link from 'next/link'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Originality.ai 分数为什么不可靠 — 写作建议',
    description: '免费在线写作改进工具：把生硬的 AI 辅助草稿改得更自然、清晰、更贴合你自己的表达。支持中英双语，无需注册。本页说明检测器局限与写出自己声音的方法。',
    alternates: { canonical: pageUrl('/originality-ai-bypass', 'zh'), languages: languageAlternates('/originality-ai-bypass') },
  }
}

export default async function OriginalityAIBypassPage() {
      return (
      <>
        <BreadcrumbJsonLd slug="/originality-ai-bypass" lang="zh" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJsonSchema }} />
        <main className="mx-auto w-full max-w-4xl px-4 py-8">
          <div className="text-center mb-6">
            <Link href="/" className="inline-block bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm py-2 rounded-lg transition-colors mb-3">
              ← 返回
            </Link>
          </div>

          {/* Hero */}
          <section className="bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 rounded-2xl p-8 border border-violet-100 shadow-sm mb-6">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Originality.ai 分数为什么不可靠</h1>
              <p className="text-sm text-gray-600 leading-relaxed">检测器结论存在争议。写下具体细节、自己的观点，并亲自核对来源。AI Humanizer 是免费的写作改进工具，不承诺任何检测结果。</p>
            </div>
          </section>

          {/* Section 1 */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">常见检测信号为什么只是弱线索</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-2">信号的局限</h3>
                <ul className="space-y-2 text-sm text-gray-600 list-disc pl-5">
                  <li>困惑度与句长变化只是一般启发式，不是任何检测器内部算法的公开说明</li>
                  <li>句长整齐容易被人注意到，但说明不了句子出自谁手</li>
                  <li>模板词汇是值得为读者修正的表达问题，不是应对检测器的技巧</li>
                  <li>段落过渡可预测通常意味着论证需要加强，而不是分数需要调整</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-5 border border-violet-200 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-2">写作真正需要什么</h3>
                <ul className="space-y-2 text-sm text-gray-600 list-disc pl-5">
                  <li>读者能跟上的主张，配上具体证据</li>
                  <li>你对证据的评估，包括不确定的地方</li>
                  <li>亲自打开并核对的引用，而不是照抄的标记</li>
                  <li>让论证更好读的结构</li>
                  <li>本站不调用任何检测器 API，也不验证其判定</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">如何写出更像自己的文字</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                <h3 className="font-bold text-red-600 mb-3">盯着分数帮不到读者</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">通用改写工具只换词，不增加实质内容。检测器判定本就不可靠，针对它优化不是有用的写作策略。</p>
                <ul className="space-y-1 text-xs text-red-500 list-disc pl-5">
                  <li>同义替换之后，空泛的论述依然空泛</li>
                  <li>分数变化说明不了来源有没有核对过</li>
                  <li>任何工具都无法把别人的作品变成你的</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-5 border border-green-200 shadow-sm">
                <h3 className="font-bold text-green-700 mb-3">更有用的做法</h3>
                <ul className="space-y-1 text-sm text-gray-600 list-disc pl-5">
                  <li>用你确知准确的细节替换笼统表述</li>
                  <li>写出你的结论与理由，适度保留不确定性</li>
                  <li>逐条核对引用、数字与引文</li>
                  <li>句长跟意思走，而不是套公式</li>
                  <li>AI Humanizer 在提示词中请求这些改进，不承诺任何检测结果</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">公布的数字说明了什么</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              说明的是局限，不是效果。早前未记录条件的内部印象约 85–95% 已因无法复现而撤回；2026-11-24 自测为 13.3%（4/30），用的是本站检测器；不完整的第三方抽查对改写文本给出 100% AI。这些数字互不可比，不是产品卖点，也不能说明任何第三方检测器的表现。<a href="/zh/bypass-test-methodology" className="text-violet-600 hover:underline">测试方法页</a>记录了协议与注意事项。
            </p>
          </section>

          {/* CTA */}
          <div className="mt-6 text-center">
            <Link href="/essay-humanizer" className="inline-block bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm py-3 rounded-lg transition-colors w-full">
              免费写作改进工具
            </Link>
          </div>
          <p className="text-xs text-gray-400 mt-4">最近核校：2026-11-24</p>
        </main>
    </>
  )
}

const ldJsonSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Originality.ai 是什么？', acceptedAnswer: { '@type': 'Answer', text: '第三方 AI 文本检测工具，内部方法未公开，与本站无关联。它的判定是估算，不是作者身份的证明，也不能验证任何产品效果。' } },
    { '@type': 'Question', name: '为什么它的分数不可靠？', acceptedAnswer: { '@type': 'Answer', text: '不同检测器方法不同、均未公开，对同一文本可能给出相反结论。本站数据只记录局限：早前约 85–95% 的内部印象已因无法复现而撤回；2026-11-24 本站自测 13.3%（4/30）；不完整的第三方抽查给出 100% AI。这些不是产品指标，也没有 Originality.ai 的审计结果。' } },
    { '@type': 'Question', name: '本站承诺检测结果吗？', acceptedAnswer: { '@type': 'Answer', text: '不承诺。AI Humanizer 是免费的写作改进工具，不直连任何检测 API，不针对检测器调优，也不保证输出。' } },
    { '@type': 'Question', name: '怎么写才更像自己的表达？', acceptedAnswer: { '@type': 'Answer', text: '加入你确知的具体细节，写出自己的判断和理由，逐条打开来源核对引用、日期与数字。改写可以帮你看到别的写法，选择仍由你做出。' } },
    { '@type': 'Question', name: '引用会原样保留吗？', acceptedAnswer: { '@type': 'Answer', text: '提示词要求模型保留引用、数字和专有名词，请自行核对；模型输出不做后处理，不保证逐字保留。' } },
    { '@type': 'Question', name: '免费额度是多少？', acceptedAnswer: { '@type': 'Answer', text: '100% 免费，无付费档：每 IP 每滚动 24 小时 5 次，每次最多 3000 字符，支持中英双语，无需注册。' } },
  ],
}
