import Link from 'next/link'

/**
 * Shared Simplified-Chinese product block for the Walter Writes pages.
 * Used by /zh/walterwrites and by /walterwrites?lang=zh so both stay in sync.
 * Facts verified against walterwrites.ai on 2026-10-20.
 */
export const walterFaqZh = [
  { q: 'Walter Writes AI 免费吗?', a: '有 300 词免费试用,不需要信用卡;长期使用是订阅制,Starter 月付 $8 起。' },
  { q: '支持中文吗?', a: '官网称支持 80+ 语言。本站免费替代支持英文和简体中文。' },
  { q: '用这个页面需要注册吗?', a: '不需要。粘贴、改写、复制,没有邮箱和账号。每 IP 每天 5 次,每次 3000 字。' },
  { q: '会保存我粘贴的文本吗?', a: '不会。改写 API 无状态,处理完立即丢弃,也不会用于训练模型。' },
]

export const walterFaqSchemaZh = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: walterFaqZh.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function WalterSeoZh() {
  return (
    <section className="max-w-3xl mx-auto px-4 pt-8 pb-2 text-sm text-gray-600 leading-relaxed">
      <p className="text-xs text-gray-400 mb-4">2026 年 10 月 20 日更新 · 作者 czhcl123,AI 检测工具开发者。</p>

      <h2 className="text-xl font-bold text-gray-800 mb-3">什么是 Walter Writes AI?</h2>
      <p className="mb-3">
        Walter Writes AI(walterwrites.ai)是一款付费 AI 改写工具,内置 AI 检测器。粘贴 AI 生成的文本、选择改写强度,它会把文字改成更像真人写的:段落更短、大量自然缩写、句长不均匀、偶尔插入旁白。官网列出 80+ 语言、声音匹配、可调改写强度、API,以及给 Claude 用的 MCP 连接器。
      </p>
      <p className="mb-3">
        真正有意思的是这种风格本身。AI 检测器(GPTZero、Originality.ai、Turnitin)判定机器文本的部分依据是“过于均匀”:句长均匀、用词均匀、没有题外话。Walter Writes 风格恰恰是均匀的反面,所以有人专门搜这个名字。
      </p>

      <h2 className="text-xl font-bold text-gray-800 mb-3 mt-6">Walter Writes AI 价格(2026 年 10 月核对)</h2>
      <div className="overflow-x-auto mb-3">
        <table className="w-full text-xs border border-gray-200 rounded">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="text-left p-2 border-b border-gray-200">套餐</th>
              <th className="text-left p-2 border-b border-gray-200">每月字数</th>
              <th className="text-left p-2 border-b border-gray-200">月付</th>
              <th className="text-left p-2 border-b border-gray-200">年付(总额)</th>
              <th className="text-left p-2 border-b border-gray-200">单次上限</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="p-2 border-b border-gray-100 font-medium text-gray-800">Starter</td><td className="p-2 border-b border-gray-100">30,000</td><td className="p-2 border-b border-gray-100">$8</td><td className="p-2 border-b border-gray-100">$96</td><td className="p-2 border-b border-gray-100">750 词</td></tr>
            <tr><td className="p-2 border-b border-gray-100 font-medium text-gray-800">Pro</td><td className="p-2 border-b border-gray-100">70,000</td><td className="p-2 border-b border-gray-100">$13</td><td className="p-2 border-b border-gray-100">$156</td><td className="p-2 border-b border-gray-100">1,500 词</td></tr>
            <tr><td className="p-2 border-b border-gray-100 font-medium text-gray-800">Elite</td><td className="p-2 border-b border-gray-100">200,000</td><td className="p-2 border-b border-gray-100">$26</td><td className="p-2 border-b border-gray-100">$312</td><td className="p-2 border-b border-gray-100">2,000 词</td></tr>
            <tr><td className="p-2 font-medium text-gray-800">Teams</td><td className="p-2">500,000</td><td className="p-2">$99</td><td className="p-2">$1,188</td><td className="p-2">2,000 词</td></tr>
          </tbody>
        </table>
      </div>
      <p className="mb-3 text-xs text-gray-500">数据取自 Walter Writes AI 官网定价页(2026-10-20)。价格可能变动,购买前请以其官网为准。</p>

      <h2 className="text-xl font-bold text-gray-800 mb-3 mt-6">Walter Writes AI 免费吗?</h2>
      <p className="mb-3">
        有免费试用:300 词,不需要信用卡。300 词大约是一封短邮件或一段摘要——够判断输出风格,不够写完整论文或博客。长期使用需要订阅。
      </p>

      <h2 className="text-xl font-bold text-gray-800 mb-3 mt-6">能过 Turnitin / GPTZero 吗?</h2>
      <p className="mb-3">
        Walter Writes AI 的产品定位就是让 AI 文本读起来像真人写的,官网也主打这个用途。但实际结果会变:检测器每月更新,同一段文字可能过 GPTZero 却在 Originality.ai 上被标记。任何改写工具都无法保证固定通过率。
      </p>
      <p className="mb-3">
        判断一个工具的正确方式是:同一段样本,改写前后分别跑多个检测器。我们的测试方法写在{' '}
        <Link href="/zh/bypass-test-methodology" className="text-violet-600 hover:underline">Bypass 测试方法</Link>,你也可以用{' '}
        <Link href="/zh/ai-detector" className="text-violet-600 hover:underline">免费 AI 检测器</Link>自己验证。
      </p>

      <h2 className="text-xl font-bold text-gray-800 mb-3 mt-6">Walter Writes AI 的免费替代</h2>
      <p className="mb-3">
        本页面是一个独立的免费改写器,复刻同一种风格:短段落、自然缩写、括号旁白、直接观点、句长剧烈变化。无需注册,每次 3000 字,每 IP 每天 5 次,支持中英文。
      </p>
      <p className="mb-3">
        它是风格改写器,不是官方产品的克隆:没有账号、没有后台、没有 API、没有团队席位。如果你需要每月 3 万字以上、声音匹配或团队席位,官方付费套餐更合适。想看同一篇论文上的差别,读{' '}
        <Link href="/zh/walterwrites-vs-undetectable" className="text-violet-600 hover:underline">Walter Writes vs Undetectable AI 对比</Link>。
      </p>

      <h2 className="text-xl font-bold text-gray-800 mb-3 mt-6">Walter Writes AI 靠谱吗?</h2>
      <p className="mb-3">
        Walter Writes AI 是在运营的商业产品:公开定价、免费试用、月付/年付可在账户内管理。本站与其无关联——不销售、不转售、不从其套餐抽取佣金。任何厂商的“100% 无法检测”都应视为营销话术,而不是保证。
      </p>

      <h2 className="text-xl font-bold text-gray-800 mb-3 mt-6">你的文本该用哪个工具?</h2>
      <ul className="list-disc list-inside mb-3 space-y-1 pl-1">
        <li><strong className="text-gray-800">博客、邮件、营销文案</strong> — 本 Walter Writes 改写器,或 <Link href="/zh" className="text-violet-600 hover:underline">AI Humanizer</Link>。</li>
        <li><strong className="text-gray-800">学生论文</strong> — <Link href="/zh/essay-humanizer" className="text-violet-600 hover:underline">EssayRewriter</Link> 保持学术语域;被 Turnitin 标记的看 <Link href="/zh/turnitin-bypass" className="text-violet-600 hover:underline">Turnitin Bypass</Link>。</li>
        <li><strong className="text-gray-800">不确定能不能过?</strong> — 先用 <Link href="/zh/ai-detector" className="text-violet-600 hover:underline">免费 AI 检测器</Link> 查一遍。</li>
      </ul>

      <h2 className="text-xl font-bold text-gray-800 mb-3 mt-6">常见问题</h2>
      <div className="space-y-3 mb-4">
        {walterFaqZh.map((f) => (
          <div key={f.q}>
            <h3 className="text-base font-semibold text-gray-800 mb-1">{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 mb-0 pt-3 border-t border-gray-100">
        隐私:输入文本改写后立即丢弃(无状态 API)。我们从不用用户提交训练模型。
      </p>
    </section>
  )
}
