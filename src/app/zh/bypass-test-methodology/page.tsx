import type { Metadata } from 'next'
import ToolClient from '../../../components/Tool/ToolClient'
import { turnitinI18n } from '../../../components/Tool/i18n/turnitin'

export const dynamic = 'force-dynamic'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: '过检率是怎么测出来的?', acceptedAnswer: { '@type': 'Answer', text: '每次测试对每个检测器至少跑 150 个 AI 生成样本。先给原始 AI 文本打分做基线核查——没被标记为 AI 的样本直接剔除——再把同一篇改写后重新打分。通过 = 检测器自己的界面判定改写稿为非 AI 或低于阈值。混合、不确定的判定一律算失败。' } },
    { '@type': 'Question', name: '测哪些 AI 检测器?', acceptedAnswer: { '@type': 'Answer', text: 'GPTZero、Turnitin AI、Originality.ai、Winston AI——学校和出版方真正在用的四个。每次测试记录检测器版本和日期,因为这些工具更新频繁,旧结果在更新后就失去意义。' } },
    { '@type': 'Question', name: '什么算通过?', acceptedAnswer: { '@type': 'Answer', text: '检测器自己的界面必须把改写稿判为「非 AI 生成」或低于其检测阈值。「混合」「不确定」算失败。临界文本不会反复重打分直到通过为止。' } },
    { '@type': 'Question', name: '多久测一次?', acceptedAnswer: { '@type': 'Answer', text: '每月一次完整回归测试,检测器大版本更新后额外加测。结果带日期、检测器版本、样本量发布在本页。' } },
    { '@type': 'Question', name: '通过率数字有第三方验证吗?', acceptedAnswer: { '@type': 'Answer', text: '本站数字来自我们按本页协议自己跑的测试。协议写得足够清楚,任何人都能复现:同样的检测器、同样的样本类别、同样的通过标准。如有独立第三方审计,会带链接列在本页。' } },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '过检测试方法论 — 检测器、样本与通过标准',
    description: 'AI 改写过检率的完整测试方法:检测器清单、文本类别、样本量、通过标准、每月回归测试节奏。透明可复现。',
    openGraph: {
      title: '过检测试方法论 — 检测器、样本与通过标准',
      description: 'AI 改写过检率的完整测试方法:检测器清单、文本类别、样本量、通过标准、每月回归测试节奏。透明可复现。',
      images: [{ url: 'https://gpt-undetectable.com/og-image.png', width: 1200, height: 630 }],
    },
    alternates: {
      canonical: 'https://gpt-undetectable.com/zh/bypass-test-methodology',
      languages: {
        'zh-CN': '/zh/bypass-test-methodology',
        'en-US': '/bypass-test-methodology',
        'x-default': '/bypass-test-methodology',
      },
    },
  }
}

export default async function BypassTestMethodologyZhPage() {
  const lang = 'zh'

  const seoBody = (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6 text-gray-700 leading-relaxed space-y-3">
      <p>本站的说法是:3000 字以内的文本,改写后以 <strong>85-95%</strong> 的概率通过 AI 检测。这个数字只有在测试方法公开时才有意义。这一页就是那套方法:测什么、怎么算通过、多久重测一次,以及你自己如何复现。</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">测哪些检测器</h2>
      <p>四个,选的是学校和出版方真正在用的:<strong>GPTZero</strong>、<strong>Turnitin AI</strong>、<strong>Originality.ai</strong>、<strong>Winston AI</strong>。检测器更新很频繁,所以每次测试都记录版本号和日期。六个月前的通过率不能证明今天的检测器——这就是我们每月重测、而不是发布一个数字用到永远的原因。</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">样本集</h2>
      <p>每次测试至少 150 个 AI 生成样本,覆盖五类真实使用场景:</p>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>学术论文</strong> — 论证草稿、文献综述、实验报告</li>
        <li><strong>营销与博客文章</strong> — SEO 文章、产品页、邮件通讯</li>
        <li><strong>商务邮件</strong> — 外联、内部汇报、跟进</li>
        <li><strong>技术文档</strong> — README 式行文、发布说明、教程</li>
        <li><strong>非母语英语写作</strong> — ESL 学生和职场文本</li>
      </ul>
      <p>全部样本 1500-3000 字符——免费工具单次处理的范围——用 ChatGPT、Gemini、Claude 普通提示词生成,不做对抗技巧,只用原始输出。</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">通过标准</h2>
      <p>两阶段,刻意保守:</p>
      <ol className="list-decimal pl-5 space-y-1">
        <li><strong>基线核查</strong> — 原始 AI 样本必须先被该检测器判为 AI。基线没被标记的样本直接剔除,绝不把送分题算成成绩。</li>
        <li><strong>打分</strong> — 改写后的文本过同一个检测器。通过 = 检测器自己的界面判定「非 AI / 低于阈值」。「混合」、「不确定」一律算失败。</li>
      </ol>
      <p>通过率 = 通过数 ÷(样本数 × 检测器数)。临界文本不会反复重打分直到通过为止。</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">每月回归节奏</h2>
      <p>每月一次完整测试,检测器大版本更新后额外加测。结果直接进下表:</p>
      <table className="w-full text-sm border border-gray-200">
        <thead>
          <tr className="bg-gray-50"><th className="p-2 text-left border-b border-gray-200">轮次</th><th className="p-2 text-left border-b border-gray-200">日期</th><th className="p-2 text-left border-b border-gray-200">检测器</th><th className="p-2 text-left border-b border-gray-200">样本量</th><th className="p-2 text-left border-b border-gray-200">通过率</th></tr>
        </thead>
        <tbody>
          <tr><td className="p-2 border-b border-gray-100">首次完整测试</td><td className="p-2 border-b border-gray-100">2026 年 11 月</td><td className="p-2 border-b border-gray-100">GPTZero、Turnitin、Originality.ai、Winston</td><td className="p-2 border-b border-gray-100">≥150</td><td className="p-2 border-b border-gray-100">随测试发布</td></tr>
        </tbody>
      </table>
      <p className="text-sm text-gray-500">85-95% 来自开发引擎期间的内部校准。从 2026 年 11 月起,每月结果都按这套协议发布在这一页——包括数字下降的月份。</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">自己复现</h2>
      <ol className="list-decimal pl-5 space-y-1">
        <li>用任意主流聊天机器人,按五类场景生成 150 个短中篇文本。</li>
        <li>每个原始样本过全部检测器打分;没被标记为 AI 的剔除。</li>
        <li>用我们的 <a href="/zh/humanize-ai-text" className="text-violet-600 hover:underline">AI 改写器</a>改写每个样本——或用你自己的方法,协议不在乎改写出自哪个工具。</li>
        <li>改写稿过同样的检测器,按界面原样记录判定。</li>
        <li>通过数除以总打分数,和我们的记录对比。</li>
      </ol>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">局限,直说</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>数字会过期。</strong>检测器持续更新,任何通过率只是它测试当天的证据,不是工具的永久属性。</li>
        <li><strong>你的文本不等于我们的样本。</strong>长文、技术文、高引用密度的文档,行为和 2000 字符的短文不一样。</li>
        <li><strong>这不是提交伪造作业的许可。</strong>工具的用途是把 AI 辅助草稿改成你自己的声音。学校和职场的规则各不相同——先查适用于你的那套。</li>
      </ul>

      <p>相关:<a href="/zh/ai-detector" className="text-violet-600 hover:underline">免费 AI 检测器</a>——提交前先自查 · <a href="/zh/gptzero-bypass" className="text-violet-600 hover:underline">GPTZero Bypass</a> 和 <a href="/zh/turnitin-bypass" className="text-violet-600 hover:underline">Turnitin Bypass</a>——针对单一检测器的改写调优</p>
    </div>
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {seoBody}
      <ToolClient mode="turnitin" initialLang={lang} i18n={turnitinI18n} />
    </>
  )
}
