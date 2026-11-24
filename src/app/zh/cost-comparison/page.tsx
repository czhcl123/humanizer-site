import type { Metadata } from 'next'
import { languageAlternates, pageUrl } from '@/lib/site'
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd'
import Link from 'next/link'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '免费写作工具对比 — AI Humanizer',
    description: '普通写作辅助对比：AI Humanizer 100% 免费、无需注册、额度公开。不列竞品价格、不比较检测能力，只谈写作改进。',
    alternates: { canonical: pageUrl('/cost-comparison', 'zh'), languages: languageAlternates('/cost-comparison') },
  }
}

export default async function CostComparisonPage() {
      return (
      <>
        <BreadcrumbJsonLd slug="/cost-comparison" lang="zh" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJsonSchema }} />
        <main className="mx-auto w-full max-w-4xl px-4 py-8">
          <div className="text-center mb-6">
            <Link href="/" className="inline-block bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm py-2 rounded-lg transition-colors mb-3">
              ← 返回
            </Link>
          </div>

          {/* Hero */}
          <section className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-8 border border-violet-100 shadow-sm mb-6">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">免费写作工具对比：AI Humanizer</h1>
              <p className="text-sm text-gray-600 leading-relaxed">普通写作辅助对比：试用费用、使用门槛与编辑取向。不比较检测器结果，也不列竞品价格。</p>
            </div>
          </section>

          {/* 两种方案对比 */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">免费与付费的使用门槛</h2>
            <div className="space-y-4">
              {[
                {
                  name: '其他商业写作产品',
                  tagline: '商业编辑工具 — 请查官网',
                  monthly: '以官网为准',
                  pros: ['浏览器内编辑', '可能包含账号配套功能', '资费请查官网'],
                  cons: ['付费产品，价格会变动', '注册要求各不相同'],
                },
                {
                  name: 'AI Humanizer（本站）',
                  tagline: '免费写作改进工具',
                  monthly: '100% 免费',
                  highlight: true,
                  pros: ['完全免费，无付费档', '免注册、免安装', '每 IP 每滚动 24 小时 5 次', '仅支持英文和简体中文'],
                  cons: ['每 IP 每滚动 24 小时 5 次', '每次最多 3000 字符', '提示词要求保留引用，请自行核对'],
                },
              ].map((plan, i) => (
                <div key={i} className={`rounded-2xl p-6 border ${plan.highlight ? 'border-violet-300 bg-white shadow-md relative' : 'border-gray-200 bg-white shadow-sm'}`}>
                  {plan.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-violet-500 text-white text-xs font-semibold rounded-full">
                      免费试用
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
                <h4 className="font-bold text-gray-800">如果你想要带账号的编辑器</h4>
                <p className="text-sm text-gray-600 mt-2">商业写作产品可能提供账号和配套功能，详情与资费请查官网。</p>
                <Link href="/zh/walterwrites-vs-undetectable" className="text-violet-600 text-sm font-semibold hover:underline mt-2 inline-block">→ 写作工具对比</Link>
              </div>
              <div className="bg-white rounded-xl p-5 border border-green-200 shadow-sm relative">
                <div className="absolute top-4 right-4 px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">免费、无需注册</div>
                <h4 className="font-bold text-gray-800">如果你想让表述更清晰</h4>
                <p className="text-sm text-gray-600 mt-2">AI Humanizer 帮你把生硬的 AI 辅助草稿改得更自然、更清楚；不承诺任何检测结果。</p>
                <Link href="/zh/essay-humanizer" className="text-violet-600 text-sm font-semibold hover:underline mt-2 inline-block">→ 免费写作改进工具 →</Link>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <h4 className="font-bold text-gray-800">如果你想要零门槛</h4>
                <p className="text-sm text-gray-600 mt-2">本站没有付费档：每 IP 每滚动 24 小时 5 次、每次最多 3000 字符，无需注册和信用卡。<Link href="/zh/pricing" className="text-violet-600 hover:underline">查看定价</Link>。</p>
              </div>
            </div>
          </section>

          {/* 底部提示 */}
          <section className="mt-4 text-center">
            <p className="text-xs text-gray-400">竞品价格可能变动，请以各自官网（如 <a href="https://walterwrites.ai" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">walterwrites.ai</a>）为准。本站 100% 免费，无付费档。检测器分数不可靠，本页不按检测能力比较任何工具。</p>
            <p className="text-xs text-gray-400 mt-4">最近核校：2026-11-24</p>
          </section>
        </main>
    </>
  )
}

const ldJsonSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'AI Humanizer 收费吗？', acceptedAnswer: { '@type': 'Answer', text: 'AI Humanizer 100% 免费，无付费档：每 IP 每滚动 24 小时 5 次，每次最多 3000 字符，无需注册，支持中英双语。它是写作改进工具，不承诺任何检测结果。' } },
    { '@type': 'Question', name: '其他写作工具多少钱？', acceptedAnswer: { '@type': 'Answer', text: '竞品价格会变动，本站不发布具体数字；请查各家官网的定价页。本对比只谈使用门槛和编辑取向，不比较检测器结果。' } },
    { '@type': 'Question', name: '选免费写作辅助时看什么？', acceptedAnswer: { '@type': 'Answer', text: '看编辑目标是否明确、提示词是否要求保留引用与数字、额度是否透明、是否需要注册，以及是否明确说明输出要由你核对。检测器分数不可靠，不是写作质量的度量。' } },
  ],
}
