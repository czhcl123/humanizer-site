import type { Metadata } from 'next'
import { languageAlternates, pageUrl } from '@/lib/site'
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd'
import ToolClient from '../../../components/Tool/ToolClient'
import { essayI18n } from '../../../components/Tool/i18n/essay'

/** This route tree is Chinese; the language is a compile-time constant. */
const lang = 'zh' as const

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: '学术写作辅助是做什么的？', acceptedAnswer: { '@type': 'Answer', text: '帮你把论证表达得更清楚、结构更好读，并检查引用是否支撑论点。它不是改变检测器判定的手段，任何工具都无法证明作者身份。' } },
    { '@type': 'Question', name: '怎么写好一个学术段落？', acceptedAnswer: { '@type': 'Answer', text: '开头给出主张，接着用你理解的证据支撑，说明证据与主张的关系，注明局限。把没有信息量的模板话换成你真正要说的意思。' } },
    { '@type': 'Question', name: '引文和参考文献会保留吗？', acceptedAnswer: { '@type': 'Answer', text: '提示词要求模型在改写正文时保留 (作者, 年份) 引用、引文、数字、日期和专有名词。输出不做后处理：请逐条对照来源核对标记与引文。见 /zh/citation-policy。' } },
    { '@type': 'Question', name: 'Turnitin 的 AI 分数为什么不可靠？', acceptedAnswer: { '@type': 'Answer', text: '其方法未公开，困惑度与句长变化只是一般启发式而非已验证的内部信号。本站数据仅说明局限：早前约 85–95% 的内部印象已因无法复现而撤回；2026-11-24 本站自测 13.3%（4/30）；不完整的第三方抽查对改写文本给出 100% AI。这些不是产品卖点。' } },
    { '@type': 'Question', name: '学校允许用写作辅助工具吗？', acceptedAnswer: { '@type': 'Answer', text: '各校规定不同。改写自己写的草稿与提交他人生成的作品是两回事。提交前请查清本校学术诚信政策，并按要求标注使用的工具。' } },
    { '@type': 'Question', name: '收费吗？会保存我的论文吗？', acceptedAnswer: { '@type': 'Answer', text: '100% 免费、无需注册：每 IP 每滚动 24 小时 5 次，每次最多 3000 字符，支持中英双语。无持久存储；短期内存缓存最多保留输入哈希与输出 10 分钟。见 /zh/privacy。' } },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '学术写作辅助：清晰表达 + 引用保留（人工核对）',
    description: '免费在线写作改进工具：把生硬的 AI 辅助草稿改得更自然、清晰、更贴合你自己的表达。支持中英双语，无需注册。本页讲学术写作的清晰表达与引用人工核对。',
    openGraph: {
      title: '学术写作辅助：清晰表达 + 引用保留（人工核对）',
      description: '免费在线写作改进工具：把生硬的 AI 辅助草稿改得更自然、清晰、更贴合你自己的表达。无需注册。',
      images: [{ url: 'https://gpt-undetectable.com/og-image.png', width: 1200, height: 630 }],
    },
    alternates: { canonical: pageUrl('/essay-writer-bypass-turnitin', 'zh'), languages: languageAlternates('/essay-writer-bypass-turnitin') },
  }
}

export default async function EssayWriterBypassPage() {

  const seoBody = (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6 text-gray-700 leading-relaxed space-y-3">
      <section className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 border border-violet-100 mb-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">学术写作辅助：清晰表达 + 引用保留（人工核对）</h1>
        <p className="text-sm text-gray-600 leading-relaxed">保留原网址，内容改为学术写作辅助：表述更清晰、结构更好读、引用由你亲自核对。AI Humanizer 不承诺任何检测结果。</p>
      </section>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">为什么分数不是好的修改指南</h2>
      <p>Turnitin 的 AI 检测方法未公开；困惑度和突发性只是公开讨论的一般启发式，不是已验证的内部信号。检测器判定存在争议，也可能彼此矛盾。本站公布的数据只用于说明局限，不是效果证明：早前约 85–95% 的内部印象已因无法复现而撤回；2026-11-24 自测为 13.3%（4/30），用的是本站检测器；不完整的第三方抽查对改写文本给出 100% AI。详见<a href="/zh/bypass-test-methodology" className="text-violet-600 hover:underline">测试方法</a>与<a href="/zh/limitations" className="text-violet-600 hover:underline">局限说明</a>。</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">清晰表达清单</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>一段一个主张</strong>——先说清楚，再给证据，然后解释两者的联系。</li>
        <li><strong>具体细节</strong>——用你真正理解的研究、数据或观察替换笼统断言。</li>
        <li><strong>自己的推理</strong>——说明证据为何说服你，论证还有哪些局限。</li>
        <li><strong>平实的语言</strong>——删掉没有意义的过渡语与对冲词，句长随内容需要。</li>
      </ul>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">引用保留是请求，不是保证</h2>
      <p>对话式提示词要求 DeepSeek Chat 在改写正文时保留 (作者, 年份) 标记、引文、数字、日期与专有名词。模型输出不做后处理，请打开来源逐条核对标记是否还在、是否真的支持论点。<a href="/zh/citation-policy" className="text-violet-600 hover:underline">引用政策</a>说明了如何标注写作辅助；通用工具见<a href="/zh/bypass-ai" className="text-violet-600 hover:underline">写作改进</a>。</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">提交前</h2>
      <p>朗读草稿，确认每条引用与数字，长论文按 3000 字符分段使用工具，并查清本校的学术诚信规定。改写自己写的草稿与提交编造内容是两回事。AI Humanizer 100% 免费、无需注册，不承诺任何检测结果。</p>
    </div>
  )

  return (
    <>
      <BreadcrumbJsonLd slug="/essay-writer-bypass-turnitin" lang="zh" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {seoBody}
      <p className="text-xs text-gray-400 mt-4">最近核校：2026-11-24</p>
      <ToolClient mode="essay" lang={lang} i18n={essayI18n}
      heroTitle={{ zh: '学术写作辅助：清晰表达 + 引用保留（人工核对）' }} heroSubtitle={{ zh: '每段一个主张，具体证据加上自己的判断。提示词要求保留引用与数字，请人工核对；本站免费、无需注册，不承诺任何检测结果。' }}
    />
    </>
  )
}
