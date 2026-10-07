import type { Metadata } from 'next'
import ToolClient from '../../components/Tool/ToolClient'
import { turnitinI18n } from '../../components/Tool/i18n/turnitin'

export const dynamic = 'force-dynamic'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How do you measure the AI humanizer bypass rate?', acceptedAnswer: { '@type': 'Answer', text: 'Each test run scores at least 150 AI-generated samples against each detector. The raw AI text is scored first as a sanity check — if it is not flagged as AI, the sample is discarded. The same text is then humanized and scored again. A pass means the detector interface reports the rewrite as not AI-generated or below its threshold. Mixed or ambiguous verdicts count as failures.' } },
    { '@type': 'Question', name: 'Which AI detectors do you test against?', acceptedAnswer: { '@type': 'Answer', text: 'GPTZero, Turnitin AI, Originality.ai, and Winston AI — the detectors schools and publishers actually run. The detector version and test date are logged for every run, because these tools update frequently and old results stop meaning anything after an update.' } },
    { '@type': 'Question', name: 'What counts as a pass?', acceptedAnswer: { '@type': 'Answer', text: "The detector's own interface must report the humanized text as not AI-generated or below its detection threshold. Verdicts like 'mixed' or 'uncertain' are counted as failures. Borderline texts are never re-scored until they pass." } },
    { '@type': 'Question', name: 'How often are the tests run?', acceptedAnswer: { '@type': 'Answer', text: 'A full regression run happens every month, plus an unscheduled run after any major detector release. Results are published on this page with the date, detector versions, and sample counts.' } },
    { '@type': 'Question', name: 'Are the bypass rate numbers independently verified?', acceptedAnswer: { '@type': 'Answer', text: 'The figures used on this site come from our own runs using the protocol documented on this page. The protocol is written so anyone can reproduce it: same detectors, same sample categories, same pass rule. Any independent third-party audit will be listed here with a link when it exists.' } },
  ],
}

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ lang?: string }> }): Promise<Metadata> {
  const sp = await searchParams
  const lang = sp.lang === 'zh' ? 'zh' : 'en'
  const titles = {
    zh: '过检测试方法论 — 检测器、样本与通过标准',
    en: 'Bypass Test Methodology — Detectors, Samples, Pass Rate',
  }
  const descriptions = {
    zh: 'AI 改写过检率的完整测试方法:检测器清单、文本类别、样本量、通过标准、每月回归测试节奏。透明可复现。',
    en: 'How we test AI humanizer bypass rates: detectors, text categories, sample sizes, pass criteria, and the monthly regression schedule. Fully documented.',
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
    alternates: {
      canonical: 'https://gpt-undetectable.com/bypass-test-methodology',
      languages: {
        'zh-CN': '/zh/bypass-test-methodology',
        'en-US': '/bypass-test-methodology',
        'x-default': '/bypass-test-methodology',
      },
    },
  }
}

export default async function BypassTestMethodologyPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const sp = await searchParams
  const lang = sp.lang === 'zh' ? 'zh' : 'en'

  const seoBodyEn = (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6 text-gray-700 leading-relaxed space-y-3">
      <p>This site tells you our rewrites pass AI detectors <strong>85-95% of the time</strong> on text up to 3,000 characters. A number like that only means something if the test behind it is visible. This page is that test: what we run against, what counts as a pass, how often we re-run, and how to reproduce the whole thing yourself.</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">What we test against</h2>
      <p>Four detectors, chosen because they are the ones schools and publishers actually run: <strong>GPTZero</strong>, <strong>Turnitin AI</strong>, <strong>Originality.ai</strong>, and <strong>Winston AI</strong>. Detector products ship updates constantly, so every run logs the detector version and the date. A pass rate from six months ago is not evidence about today&apos;s detector — that is why we re-run monthly instead of publishing one number forever.</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">Sample set</h2>
      <p>Each run uses at least 150 AI-generated samples, split across five categories that map to how people actually use the tool:</p>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Academic essays</strong> — argumentative drafts, literature reviews, lab reports</li>
        <li><strong>Marketing and blog articles</strong> — SEO posts, product pages, newsletters</li>
        <li><strong>Professional email</strong> — outreach, internal updates, follow-ups</li>
        <li><strong>Technical documentation</strong> — README-style prose, release notes, tutorials</li>
        <li><strong>Non-native English writing</strong> — ESL student and professional texts</li>
      </ul>
      <p>All samples run 1,500-3,000 characters — the range the free tool processes in one pass — generated with ChatGPT, Gemini, and Claude using ordinary prompts, no adversarial tricks, raw output only.</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">Pass criteria</h2>
      <p>Two stages, deliberately conservative:</p>
      <ol className="list-decimal pl-5 space-y-1">
        <li><strong>Sanity check</strong> — the raw AI sample must be flagged as AI by the detector. If the baseline is missed, the sample is discarded. We never count an easy baseline as a win.</li>
        <li><strong>Scoring</strong> — the humanized rewrite goes through the same detector. A pass is the detector&apos;s own interface reporting the text as not AI-generated or below its threshold. &quot;Mixed&quot; and &quot;uncertain&quot; verdicts count as failures.</li>
      </ol>
      <p>Pass rate = passes ÷ (samples × detectors). Borderline texts are never re-scored until they pass.</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">Monthly regression schedule</h2>
      <p>One full run every month, plus an unscheduled run after any major detector release. Results go straight into the log below:</p>
      <table className="w-full text-sm border border-gray-200">
        <thead>
          <tr className="bg-gray-50"><th className="p-2 text-left border-b border-gray-200">Run</th><th className="p-2 text-left border-b border-gray-200">Date</th><th className="p-2 text-left border-b border-gray-200">Detectors</th><th className="p-2 text-left border-b border-gray-200">Samples</th><th className="p-2 text-left border-b border-gray-200">Pass rate</th></tr>
        </thead>
        <tbody>
          <tr><td className="p-2 border-b border-gray-100">First full run</td><td className="p-2 border-b border-gray-100">November 2026</td><td className="p-2 border-b border-gray-100">GPTZero, Turnitin, Originality.ai, Winston</td><td className="p-2 border-b border-gray-100">≥150</td><td className="p-2 border-b border-gray-100">Published with the run</td></tr>
        </tbody>
      </table>
      <p className="text-sm text-gray-500">The 85-95% figure comes from our internal calibration while building the engine. From November 2026 onward, every month&apos;s run is published here under this protocol — including runs where the number moves down.</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">Reproduce it yourself</h2>
      <ol className="list-decimal pl-5 space-y-1">
        <li>Generate 150 short-to-medium texts across the five categories with any mainstream chatbot.</li>
        <li>Score every raw sample through each detector; drop any that are not flagged as AI.</li>
        <li>Rewrite each sample with our <a href="/humanize-ai-text" className="text-violet-600 hover:underline">AI humanizer</a> — or your own method. The protocol does not care which tool produced the rewrite.</li>
        <li>Score every rewrite on the same detectors and record verdicts exactly as the interface shows them.</li>
        <li>Divide passes by total scores, then compare with our log.</li>
      </ol>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">Limitations, stated plainly</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Numbers age.</strong> Detectors update constantly. Any bypass figure is evidence about its run date, not a permanent property of the tool.</li>
        <li><strong>Your text is not our sample set.</strong> Long, technical, or citation-heavy documents behave differently from 2,000-character essays.</li>
        <li><strong>This is not a license to submit fabricated work.</strong> Editing AI-assisted drafts into your own voice is what the tool is for. Policies at schools and workplaces vary — check the rules that apply to you.</li>
      </ul>

      <p>Related: <a href="/ai-detector" className="text-violet-600 hover:underline">free AI detector</a> — check any rewrite before you submit · <a href="/gptzero-bypass" className="text-violet-600 hover:underline">GPTZero bypass</a> and <a href="/turnitin-bypass" className="text-violet-600 hover:underline">Turnitin bypass</a> — per-detector rewrite tuning</p>
    </div>
  )

  const seoBodyZh = (
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
        <li><strong>打分</strong> — 改写后的文本过同一个检测器。通过 = 检测器自己的界面判定「非 AI / 低于阈值」。&quot;混合&quot;、&quot;不确定&quot;一律算失败。</li>
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
      {lang === 'zh' ? seoBodyZh : seoBodyEn}
      <ToolClient mode="turnitin" initialLang={lang} i18n={turnitinI18n} />
    </>
  )
}
