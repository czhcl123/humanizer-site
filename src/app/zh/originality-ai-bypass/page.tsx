import type { Metadata } from 'next'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '绕过原创性检测 — AI 人性化工具',
    description: '免费工具，支持 Pro 版 $0.99/词。测试通过原创性 AI 检测。',
    alternates: { canonical: 'https://gpt-undetectable.com/zh/originality-ai-bypass' },
  }
}

export default function OriginalityAIBypassPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
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
          <section className="bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 rounded-2xl p-8 border border-violet-100 shadow-sm mb-6">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">绕过原创性 AI 检测</h1>
              <p className="text-sm text-gray-600 leading-relaxed">免费工具，Pro 版 $0.99/词。让 AI 文本通过原创性 AI 检测。</p>
            </div>
          </section>

          {/* Section 1 */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">原创性 AI 如何检测 AI 文本？</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-2">检测信号</h3>
                <ul className="space-y-2 text-sm text-gray-600 list-disc pl-5">
                  <li>句级困惑度分析——太短太均的句子太多</li>
                  <li>突发性指标——连续句子长度相似度异常</li>
                  <li>AI 词汇密度——关键词：delve、leverage、robust、furthermore、conclusion</li>
                  <li>段落过渡可预测性——重复的逻辑跳跃模式</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-5 border border-violet-200 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-2">我们的逆向工程方法</h3>
                <ul className="space-y-2 text-sm text-gray-600 list-disc pl-5">
                  <li>分析输入文本的精确困惑度分布</li>
                  <li>检测突发性模式并注入人类风格</li>
                  <li>扫描 AI 词汇密度关键词并替换为口语表达</li>
                  <li>注入对话式过渡（"但是"、"另一方面"、"例如"）</li>
                  <li>修改段落流，减少可预测性</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">为什么我们的方案比通用改写器更有效？</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                <h3 className="font-bold text-red-600 mb-3">通用改写器的痛点</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">通用改写器只改词不改变句式结构，不会替换检测器标记的词汇。结果：检测器仍然看到 AI 标记。</p>
                <ul className="space-y-1 text-xs text-red-500 list-disc pl-5">
                  <li>保留 AI 词汇不被替换</li>
                  <li>保持均匀句子长度</li>
                  <li>不改变段落过渡逻辑</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-5 border border-green-200 shadow-sm">
                <h3 className="font-bold text-green-700 mb-3">我们做了什么不同的事</h3>
                <ul className="space-y-1 text-sm text-gray-600 list-disc pl-5">
                  <li>重新表达 AI 词汇——"delve"等词全部替换成口语化表达</li>
                  <li>策略性地改变句子长度打破检测器节奏</li>
                  <li>注入对话式过渡"但是""另一方面""例如"</li>
                  <li>添加模糊词"可能""或许""证据表明"</li>
                  <li>改变段落流减少突发性检测</li>
                </ul>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="mt-6 text-center">
            <Link href="/essay-humanizer" className="inline-block bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm py-3 rounded-lg transition-colors w-full">
              立即使用
            </Link>
          </div>
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
    { '@type': 'Question', name: '怎么绕过原创性 AI？', acceptedAnswer: { '@type': 'Answer', text: 'GPT-Undetectable 通过注入自然人类模式——变长的句子结构、对话式过渡、适当的第一人称声音和偶尔的模糊短语——来改写 AI 生成的文本。引擎经过原创性 AI 测试，85-95% 通过率。' } },
    { '@type': 'Question', name: '真的能通过原创性 AI 检测吗？', acceptedAnswer: { '@type': 'Answer', text: '可以。该页面专为原创性 AI 绕过而构建，经过独立的 bypass-test-methodology 测试。引擎同样通过 Turnitin 和原创性 AI。' } },
    { '@type': 'Question', name: '免费吗？', acceptedAnswer: { '@type': 'Answer', text: '免费版：每天每个 IP 5 次，每次 3000 字。无需注册、信用卡、安装。Pro 版 $0.99/词通过 Stripe 支付。' } },
  ],
}
