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
    { '@type': 'Question', name: 'Turnitin 的 AI 检测是什么？', acceptedAnswer: { '@type': 'Answer', text: '一种估算文本是否使用了 AI 辅助的产品。其检测方法未公开；分数只是估算，不是作者身份或学术违规的证明。' } },
    { '@type': 'Question', name: '为什么 Turnitin 的 AI 分数不可靠？', acceptedAnswer: { '@type': 'Answer', text: '困惑度和句长变化只是公开讨论的一般启发式，不是已验证的内部信号；判定存在争议，也可能与其他检测器不一致。本站公布的数据只说明局限：早前未记录条件的 85–95% 印象已因无法复现而撤回；2026-11-24 用本站检测器自测为 13.3%（4/30）；不完整的第三方抽查对改写文本给出 100% AI。没有第三方检测器的有效实测。' } },
    { '@type': 'Question', name: '怎么写才是自己的学术表达？', acceptedAnswer: { '@type': 'Answer', text: '先写清楚一个主张，用你真正理解的具体证据支撑，说明哪些地方你仍持保留态度，删掉没有信息量的套话。朗读一遍，留下你自己会写的句子。' } },
    { '@type': 'Question', name: 'AI 辅助草稿的引用怎么处理？', acceptedAnswer: { '@type': 'Answer', text: '每条来源都亲自打开。提示词要求模型保留 (作者, 年份)、数字、日期、引文和专有名词，但输出不做后处理：请逐条核对引用是否还在、来源是否真能支持论点。见 /zh/citation-policy。' } },
    { '@type': 'Question', name: '本站对 Turnitin 有任何承诺吗？', acceptedAnswer: { '@type': 'Answer', text: '没有。AI Humanizer 是免费的写作改进工具，不针对检测器调优、不逆向工程、不保证输出，也未连接 Turnitin。' } },
    { '@type': 'Question', name: '使用写作辅助工具允许吗？', acceptedAnswer: { '@type': 'Answer', text: '各校规定不同。改写自己写的草稿与提交他人生成的作品是两回事。提交前请查阅所在学校的学术诚信规定。' } },
    { '@type': 'Question', name: '收费吗？会保存我的论文吗？', acceptedAnswer: { '@type': 'Answer', text: '100% 免费、无需注册：每 IP 每滚动 24 小时 5 次，每次最多 3000 字符，支持中英双语。无持久存储；短期内存缓存最多保留输入哈希与输出 10 分钟。详见 /zh/privacy。' } },
  ],
}

export async function generateMetadata() {
  const titles = {
    zh: 'Turnitin AI 分数为什么不可靠 — 学术写作建议',
    en: 'Why Turnitin AI Scores Are Unreliable — Writing Guidance',
  }
  const descriptions = {
    zh: '免费在线写作改进工具：把生硬的 AI 辅助草稿改得更自然、清晰、更贴合你自己的表达。支持中英双语，无需注册。本页说明 Turnitin 分数的局限与学术写作建议。',
    en: 'Free writing tool: Turnitin score limits, clear academic prose and checked citations. EN / zh-CN, no signup.',
  }
  return {
    title: titles[lang],
    description: descriptions[lang],
    openGraph: {
      title: titles[lang],
      description: descriptions[lang],
      images: [{ url: 'https://gpt-undetectable.com/og-image.png', width: 1200, height: 630, alt: titles[lang] }],
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[lang],
      description: descriptions[lang],
      images: ['https://gpt-undetectable.com/og-image.png'],
    },
    alternates: { canonical: pageUrl('/turnitin-bypass', 'zh'), languages: languageAlternates('/turnitin-bypass') },
  }
}

export default async function TurnitinPage() {
  const seoBody = (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6 text-gray-700 leading-relaxed space-y-3">
      <section className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 border border-violet-100 mb-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Turnitin AI 分数为什么不可靠</h1>
        <p className="text-sm text-gray-600 leading-relaxed">学术写作指南：清晰的表达、你自己的观点、亲自核对的引用。AI Humanizer 免费、无需注册，不承诺任何检测结果。</p>
      </section>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">分数是估算，不是判定</h2>
      <p>Turnitin 使用广泛，但检测方法并未公开。公开讨论的困惑度（用词可预测性）与突发性（句长变化）只是一般启发式，不是已验证的内部信号。检测器判定并不可靠、存在争议，分数无法证明某段文字出自谁手。本站公布的数据只用于说明局限：早前未记录条件的 85–95% 印象已因无法复现而撤回；2026-11-24 自测为 13.3%（4/30），用的是本站检测器；不完整的第三方抽查对改写文本给出 100% AI。详见<a href="/zh/bypass-test-methodology" className="text-violet-600 hover:underline">测试方法</a>与<a href="/zh/limitations" className="text-violet-600 hover:underline">局限说明</a>。</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">写起来像自己的学术文字</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>说具体的东西</strong>——用你真正理解的证据、例子或数据替换空泛表述。</li>
        <li><strong>给出判断</strong>——说明某条来源为何说服了你，论证还有哪些薄弱处。</li>
        <li><strong>结构好读</strong>——一段一个主张，过渡平实，句子长度随内容需要。</li>
        <li><strong>心里有读者</strong>——像模板的句子就为读者重写，而不是为某个分数。</li>
      </ul>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">引用：先请求保留，再人工核对</h2>
      <p>提示词要求模型在改写正文时保留 (作者, 年份) 引用、引文、数字、日期和专有名词。模型输出不做后处理，请逐条对照原文核对标记和引文。<a href="/zh/citation-policy" className="text-violet-600 hover:underline">引用政策</a>说明了如何标注写作辅助；学术写作的完整说明见<a href="/zh/essay-writer-bypass-turnitin" className="text-violet-600 hover:underline">学术写作辅助</a>。</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">本站提供什么</h2>
      <p>AI Humanizer 是写作改进工具：100% 免费、无需注册，每 IP 每滚动 24 小时 5 次、每次最多 3000 字符，支持中英双语，DeepSeek Chat 云端处理。无持久存储，仅有最多 10 分钟、上限 500 条的内存缓存；没有分析 cookie 或追踪像素。它与 Turnitin 没有任何关联，也不承诺任何检测结果。提交前请查清本校的学术诚信规定。</p>
    </div>
  )

  return (
    <>
      <BreadcrumbJsonLd slug="/turnitin-bypass" lang="zh" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {seoBody}
      <p className="text-xs text-gray-400 mt-4">最近核校：2026-11-24</p>
      <ToolClient mode="turnitin" lang={lang} i18n={turnitinI18n} />
    </>
  )
}
