import type { Metadata } from 'next'
import { languageAlternates, pageUrl } from '@/lib/site'
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd'
import ToolClient from '../../../components/Tool/ToolClient'
import { turnitinI18n } from '../../../components/Tool/i18n/turnitin'
import TestResults from '@/components/TestResults'

/** This route tree is Chinese; the language is a compile-time constant. */
const lang = 'zh' as const

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: '检测器可靠性协议是怎么设计的?', acceptedAnswer: { '@type': 'Answer', text: '目前没有公开的第三方测试结果。以下协议说明如何复核检测器判定的不一致性：先给原始 AI 文本打分，再给改写稿打分，原样记录每次判定。这是检测器局限说明，不是产品效果证明。' } },
    { '@type': 'Question', name: '测哪些 AI 检测器?', acceptedAnswer: { '@type': 'Answer', text: '协议建议覆盖 GPTZero、Turnitin AI、Originality.ai 等常见检测器，并记录版本和日期。本站检测器本身不直连这些产品，不输出它们的官方判定。' } },
    { '@type': 'Question', name: '如何记录检测器的判定?', acceptedAnswer: { '@type': 'Answer', text: '协议建议：原样记录检测器界面给出的「非 AI 生成」「AI 生成」「混合」「不确定」等判定；临界文本不反复重打分直到出现理想结果。目的是记录判定不一致，而不是宣传某个成绩。' } },
    { '@type': 'Question', name: '多久测一次?', acceptedAnswer: { '@type': 'Answer', text: '没有固定的公开发布节奏。本站自查是提示词驱动的启发式分析，没有周期性发布承诺，也没有按真实检测器反馈校准的数据集。' } },
    { '@type': 'Question', name: '已公布的数字有第三方验证吗?', acceptedAnswer: { '@type': 'Answer', text: '没有。2026-11-24 自洽性试点用本站自己的检测器测得 13.3%（4/30）；早前约 85–95% 的说法是未记录条件的内部印象，已撤回。两者都不是第三方审计，也不衡量写作质量。' } },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '检测器可靠性说明 — 协议与已知局限',
    description: '检测器判定的测试协议与已公布数据：自洽性试点 13.3%（4/30），用于说明检测分数的局限，不是产品效果证明。',
    openGraph: {
      title: '检测器可靠性说明 — 协议与已知局限',
      description: '检测器判定的测试协议与已公布数据：自洽性试点 13.3%（4/30），用于说明检测分数的局限，不是产品效果证明。',
      images: [{ url: 'https://gpt-undetectable.com/og-image.png', width: 1200, height: 630 }],
    },
    alternates: { canonical: pageUrl('/bypass-test-methodology', 'zh'), languages: languageAlternates('/bypass-test-methodology') },
  }
}

export default async function BypassTestMethodologyZhPage() {
  
  const seoBody = (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6 text-gray-700 leading-relaxed space-y-3">
      <p>早前的非正式印象认为改写稿约 <strong>85–95%</strong> 能被判为人类风格。首个公开试点（2026-11-24）<strong>没有复现这个数字</strong>：30 条样本用本站自己的检测器自测，只有 13.3% 被判为 Likely Human。两者不可直接比较，见下方说明。在获得独立测量结果之前，85–95% 这一印象应视为撤回。</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">测哪些检测器</h2>
      <p>协议建议覆盖 <strong>GPTZero</strong>、<strong>Turnitin AI</strong>、<strong>Originality.ai</strong> 等常见检测器，并记录版本号和日期。本站检测器本身不直连这些产品，也不掌握其内部算法细节；结果不是它们的官方判定。</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">样本集</h2>
      <p>如发布结果,每轮测试将至少使用 150 个 AI 生成样本,覆盖五类真实使用场景:</p>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>学术论文</strong> — 论证草稿、文献综述、实验报告</li>
        <li><strong>营销与博客文章</strong> — SEO 文章、产品页、邮件通讯</li>
        <li><strong>商务邮件</strong> — 外联、内部汇报、跟进</li>
        <li><strong>技术文档</strong> — README 式行文、发布说明、教程</li>
        <li><strong>非母语英语写作</strong> — ESL 学生和职场文本</li>
      </ul>
      <p>全部样本 1500-3000 字符——免费工具单次处理的范围——用 ChatGPT、Gemini、Claude 普通提示词生成,不做对抗技巧,只用原始输出。</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">判定记录方式</h2>
      <p>两阶段,刻意保守:</p>
      <ol className="list-decimal pl-5 space-y-1">
        <li><strong>基线核查</strong> — 原始 AI 样本必须先被该检测器判为 AI。基线没被标记的样本直接剔除。</li>
        <li><strong>打分</strong> — 改写后的文本过同一个检测器。按界面原样记录「非 AI 生成」「AI 生成」「混合」「不确定」等判定,临界文本不反复重打分直到出现理想结果。</li>
      </ol>
      <p>这套协议用于记录检测器判定的不一致性,不是产品效果证明,也不衡量写作质量。</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">公开结果</h2>
      <p className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-amber-900"><strong>引用数字前请先读这段。</strong>目前唯一的公开结果是一次自洽性试点：同一个 DeepSeek 提示词检测器，既给原文打分，也给改写稿打分。它不是 GPTZero、Turnitin、Originality.ai 等任何第三方检测器的独立测量，也不能和条件不明的早期 85–95% 印象直接比较。完整样本、生成提示词和运行脚本见下方链接。</p>
      <p>下表数字由可下载的原始日志逐行计算得出：</p>
      <TestResults lang="zh" />
      <p className="text-sm text-gray-500">85–95%（英文）/ 70–85%（中文）是未审计的内部非正式观察，不是第三方审计结果，也不是保证。任何已发布的结果只对其测试日期、样本和检测器版本有效，不构成对单篇文本的保证。试点原始证据：<a href="/test-logs/evidence/self-2026-11-24/results.csv" className="text-violet-600 hover:underline">results.csv</a> · <a href="/test-logs/evidence/self-2026-11-24/samples.jsonl" className="text-violet-600 hover:underline">samples.jsonl</a> · <a href="/test-logs/run_pilot.py" className="text-violet-600 hover:underline">运行脚本</a>。</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">自己复现</h2>
      <ol className="list-decimal pl-5 space-y-1">
        <li>如自行复现,可用任意主流聊天机器人,按五类场景生成 150 个短中篇文本。</li>
        <li>每个原始样本过全部检测器打分;没被标记为 AI 的剔除。</li>
        <li>用我们的 <a href="/zh/humanize-ai-text" className="text-violet-600 hover:underline">AI 改写器</a>改写每个样本——或用你自己的方法,协议不在乎改写出自哪个工具。</li>
        <li>改写稿过同样的检测器,按界面原样记录判定。</li>
        <li>通过数除以总打分数,和我们的记录对比。</li>
      </ol>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">局限,直说</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>数字未经审计。</strong>13.3% 是本站自洽性试点结果；早前 85–95% 说法已撤回。两者均非第三方审计，检测器更新后更不宜外推。</li>
        <li><strong>你的文本不等于我们的样本。</strong>长文、技术文、高引用密度的文档,行为和 2000 字符的短文不一样。</li>
        <li><strong>这不是提交伪造作业的许可。</strong>工具的用途是把 AI 辅助草稿改成你自己的声音。学校和职场的规则各不相同——先查适用于你的那套。</li>
      </ul>

      <p>相关:<a href="/zh/ai-detector" className="text-violet-600 hover:underline">AI 文本自查</a>——启发式写作反馈 · <a href="/zh/gptzero-bypass" className="text-violet-600 hover:underline">GPTZero 检测局限</a> 和 <a href="/zh/turnitin-bypass" className="text-violet-600 hover:underline">Turnitin 写作说明</a>——检测器局限说明</p>
    </div>
  )

  return (
    <>
      <BreadcrumbJsonLd slug="/bypass-test-methodology" lang="zh" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {seoBody}
      <ToolClient mode="turnitin" lang={lang} i18n={turnitinI18n}
      heroTitle={{ zh: '检测器可靠性说明 — 协议与已公布数据' }} heroSubtitle={{ zh: '测试协议、样本类别、判定方式与已公布数据。这些数据用于说明检测分数的局限，不是产品效果证明。' }}
    />
    <p className="text-xs text-gray-400 mt-4">最近核校：2026-11-24</p>
    </>
  )
}
