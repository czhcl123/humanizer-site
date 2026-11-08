import type { Metadata } from 'next'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '价格对比 — Walter Writes vs GPT-Undetectable',
    description: 'Walter Writes 每月$14.99 vs 我们 Pro 版 $0.99/词。免费版可零注册使用。',
    alternates: { canonical: 'https://gpt-undetectable.com/zh/cost-comparison' },
  }
}

export default async function CostComparisonPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const sp = await searchParams
  const lang = sp?.lang === 'zh' ? 'zh' : 'en'

  if (lang === 'zh') {
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJsonSchema) }} />
        <main className="mx-auto w-full max-w-4xl px-4 py-8">
          <div className="text-center mb-6">
            <Link href="/" className="inline-block bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm py-2 rounded-lg transition-colors mb-3">
              ← 返回
            </Link>
          </div>

          {/* Hero */}
          <section className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-8 border border-violet-100 shadow-sm mb-6">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">价格对比：Walter Writes vs GPT-Undetectable</h1>
              <p className="text-sm text-gray-600 leading-relaxed">哪个更便宜？哪个真正绕过 AI 检测？</p>
            </div>
          </section>

          {/* 三种方案对比 */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">三种方案对比</h2>
            <div className="space-y-4">
              {[
                {
                  name: 'Walter Writes AI',
                  tagline: 'AI 改写（通用改写器）',
                  monthly: '$14.99/月',
                  pros: ['浏览器内易用', '适合结构编辑'],
                  cons: ['声称不能绕过 AI 检测', '固定月费，长文不划算', '无免费层'],
                },
                {
                  name: 'GPT-Undetectable Pro',
                  tagline: 'AI 人性化 + 绕过检测',
                  monthly: '$0.99/词',
                  highlight: true,
                  pros: ['专门绕过 Turnitin、GPTZero、原创性 AI', '免费版免注册', '按词计费，长文更便宜', '免费无需信用卡'],
                  cons: ['需 Stripe 支付', '无固定月费包'],
                },
                {
                  name: 'GPT-Undetectable 免费',
                  tagline: 'AI 文本人性化',
                  monthly: '$0',
                  highlight: false,
                  pros: ['完全免费', '免注册、免安装', '每天每个 IP 5 次', '支持中英文'],
                  cons: ['每天限制 5 次', '每次最多 3000 字'],
                },
              ].map((plan, i) => (
                <div key={i} className={`rounded-2xl p-6 border ${plan.highlight ? 'border-violet-300 bg-white shadow-md relative' : 'border-gray-200 bg-white shadow-sm'}`}>
                  {plan.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-violet-500 text-white text-xs font-semibold rounded-full">
                      推荐
                    </div>
                  )}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{plan.name}</h3>
                      <p className="text-sm text-gray-500 mt-0.5">{plan.tagline}</p>
                    </div>
                    <div className="text-2xl font-bold text-gray-800">{plan.monthly}</div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3 md:gap-6">
                    {plan.pros.map((pro, j) => (
                      <div key={j} className="flex items-center gap-2 text-sm bg-green-50 rounded-lg p-2">
                        <span className="text-green-600 font-semibold">✓</span>
                        <span className="text-gray-600">{pro}</span>
                      </div>
                    ))}
                    <div className="flex items-center gap-2 text-sm bg-red-50 rounded-lg p-2">
                      <span className="text-red-500 font-semibold">✗</span>
                      <span className="text-gray-500">{plan.cons.join(' · ')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 选择指南 */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">选哪个？</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <h4 className="font-bold text-gray-800">如果你改写自己的文章</h4>
                <p className="text-sm text-gray-600 mt-2">Walter Writes 更好。适合在浏览器内做同义词替换或段落编辑。</p>
                <Link href="/walterwrites" className="text-violet-600 text-sm font-semibold hover:underline mt-2 inline-block">→ 查看 Walter Writes</Link>
              </div>
              <div className="bg-white rounded-xl p-5 border border-green-200 shadow-sm relative">
                <div className="absolute top-4 right-4 px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">最适合 AI 文本绕过检测</div>
                <h4 className="font-bold text-gray-800">如果你用 ChatGPT 写东西需要绕过检测</h4>
                <p className="text-sm text-gray-600 mt-2">GPT-Undetectable 专为这个而生。引擎同时通过 Turnitin、GPTZero、原创性 AI、Copyleaks。免费版零风险。</p>
                <Link href="/essay-humanizer" className="text-violet-600 text-sm font-semibold hover:underline mt-2 inline-block">→ 免费人性化工具 →</Link>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <h4 className="font-bold text-gray-800">如果不考虑预算</h4>
                <p className="text-sm text-gray-600 mt-2">Pro 版 $0.99/词，Stripe 支付。免费版不需要信用卡。</p>
                <Link href="/pricing" className="text-violet-600 text-sm font-semibold hover:underline mt-2 inline-block">→ 查看定价 →</Link>
              </div>
            </div>
          </section>

          {/* 底部提示 */}
          <section className="mt-4 text-center">
            <p className="text-xs text-gray-400">500字：Walter Writes 约 $1.25/月 vs 我们 $0.99/词同样值，但 ≥10K字时更划算。按词计费模式更适合长文档。</p>
          </section>
        </main>
      </>
    )
  }

  return null
}

const ldJsonSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Walter Writes AI 多少钱？', acceptedAnswer: { '@type': 'Answer', text: 'Walter Writes AI Pro 版约 $14.99/月。GPT-Undetectable 有 Free 和 Pro（$0.99/词，Stripe 支付）。长文档按词计费比每月固定费用更划算。' } },
    { '@type': 'Question', name: '两个怎么选？', acceptedAnswer: { '@type': 'Answer', text: '如果你改写自己的文章用 Walter Writes；如果 ChatGPT 写的东西要绕过检测用我们。两者核心差异：我们的工具明确声称能绕过检测，且免费版无需注册。' } },
  ],
}
