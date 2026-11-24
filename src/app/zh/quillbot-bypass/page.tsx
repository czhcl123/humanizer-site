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
    { '@type': 'Question', name: 'QuillBot 是什么？', acceptedAnswer: { '@type': 'Answer', text: '通用的商业改写工具，可以给出不同的措辞，但换词不会补充细节、观点或核对过的来源。本站没有与任何检测器做受控对比，也不评价其输出会被如何判定。' } },
    { '@type': 'Question', name: '为什么改写之后分数依然不可靠？', acceptedAnswer: { '@type': 'Answer', text: '检测器方法不同且未公开；公开讨论的困惑度、句长变化只是一般启发式，不是已验证的内部信号。本站公布的数据仅说明局限：早前约 85–95% 的内部印象已因无法复现而撤回；2026-11-24 本站自测 13.3%（4/30）；不完整的第三方抽查对改写文本给出 100% AI。换词无法回答作者身份问题。' } },
    { '@type': 'Question', name: '改写稿怎么写出自己的声音？', acceptedAnswer: { '@type': 'Answer', text: '别停在换词：补上你确知的具体细节，说出自己的判断和理由，解释来源为何支持论点，逐条核对引用、数字与引文。朗读一遍，留下你自己会写的句子。' } },
    { '@type': 'Question', name: '本站针对 QuillBot 或检测器吗？', acceptedAnswer: { '@type': 'Answer', text: '不针对。AI Humanizer 是免费的写作改进工具，使用通用对话式提示词；不针对检测器调优、不逆向工程、不保证输出，目标是表述更清晰自然。' } },
    { '@type': 'Question', name: '收费吗？引用会保留吗？', acceptedAnswer: { '@type': 'Answer', text: '100% 免费、无需注册：每 IP 每滚动 24 小时 5 次，每次最多 3000 字符，支持中英双语。提示词要求模型保留引用、数字和专有名词，请自行核对；输出不做后处理。见 /zh/privacy。' } },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'QuillBot 改写之后：检测器为什么不可靠 — 写作建议',
    description: '免费在线写作改进工具：把生硬的 AI 辅助草稿改得更自然、清晰、更贴合你自己的表达。支持中英双语，无需注册。本页说明换词与写出自己声音的区别。',
    openGraph: {
      title: 'QuillBot 改写之后：检测器为什么不可靠 — 写作建议',
      description: '免费在线写作改进工具：把生硬的 AI 辅助草稿改得更自然、清晰、更贴合你自己的表达。无需注册。',
      images: [{ url: 'https://gpt-undetectable.com/og-image.png', width: 1200, height: 630 }],
    },
    alternates: { canonical: pageUrl('/quillbot-bypass', 'zh'), languages: languageAlternates('/quillbot-bypass') },
  }
}

export default async function QuillbotBypassPage() {

  const seoBody = (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6 text-gray-700 leading-relaxed space-y-3">
      <p>很多人把草稿贴进 <strong>QuillBot</strong>，以为换一套措辞就能解决检测器分数。保留这个网址是为了原有链接继续可用，但本页现在只讲一件事：<strong>检测器判定并不可靠</strong>，换词也不能让草稿变成你的作品。</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">分数不是作者身份的度量</h2>
      <p>QuillBot 是通用改写产品；本站没有与 GPTZero、Turnitin 或 Originality.ai 做受控对比，也无法说任何输出会被如何判定。这些检测器采用未公开的方法，公开讨论的困惑度和突发性只是宽泛的启发式，不是已验证的内部信号。公布的数据只说明局限：早前约 85–95% 的内部印象已因无法复现而撤回；2026-11-24 本站自测 13.3%（4/30）；不完整的第三方抽查对改写文本给出 100% AI。详见<a href="/zh/bypass-test-methodology" className="text-violet-600 hover:underline">测试方法</a>与<a href="/zh/limitations" className="text-violet-600 hover:underline">局限说明</a>。</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">从换词到自己的文字</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>改写只是换措辞。</strong>可能让句子更好读，但补不出证据和立场。</li>
        <li><strong>你的声音改变实质。</strong>加入你确知的事实细节，说出结论和理由，标明哪些地方仍不确定。</li>
        <li><strong>核对过的来源才可信。</strong>打开每条来源，确认 (作者, 年份)、数字和引文。提示词只要求保留，并不验证。</li>
        <li><strong>读者才是对象。</strong>节奏跟着内容走，不是追分数；朗读时留下像你自己的表达。</li>
      </ul>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">AI Humanizer 是什么</h2>
      <p>免费的写作改进工具，不是检测器产品：100% 免费、无需注册，每 IP 每滚动 24 小时 5 次、每次最多 3000 字符，支持中英双语，DeepSeek Chat 云端处理。无持久存储，仅有 10 分钟内存缓存，没有分析 cookie 或追踪像素。我们不承诺任何检测结果。学术写作见<a href="/zh/essay-writer-bypass-turnitin" className="text-violet-600 hover:underline">学术写作辅助</a>，通用工具见<a href="/zh/bypass-ai" className="text-violet-600 hover:underline">写作改进</a>。</p>
    </div>
  )

  return (
    <>
      <BreadcrumbJsonLd slug="/quillbot-bypass" lang="zh" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {seoBody}
      <p className="text-xs text-gray-400 mt-4">最近核校：2026-11-24</p>
      <ToolClient mode="essay" lang={lang} i18n={essayI18n}
      heroTitle={{ zh: 'QuillBot 改写之后：检测器为什么不可靠 — 写作建议' }} heroSubtitle={{ zh: '换词不等于写出自己的声音。补上具体细节、个人判断，并亲自核对引用。AI Humanizer 免费、无需注册，不承诺任何检测结果。' }}
    />
    </>
  )
}
