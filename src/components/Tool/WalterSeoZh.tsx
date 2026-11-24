import Link from 'next/link'

/**
 * Shared Simplified-Chinese product block for the Walter Writes pages.
 * Used by /zh/walterwrites and by /walterwrites?lang=zh so both stay in sync.
 * Product details below describe walterwrites.ai, not this site.
 */
export const walterFaqZh = [
  { q: 'Walter Writes AI 免费吗?', a: '免费试用与订阅价格以各自官网为准;长期使用通常为订阅制。' },
  { q: '支持中文吗?', a: '支持语言以官网说明为准。本站免费替代支持英文和简体中文。' },
  { q: '用这个页面需要注册吗?', a: '不需要。粘贴、改写、复制,没有邮箱和账号。100% 免费,无需注册。每 IP 每滚动 24 小时 5 次,每次最多 3000 字符。' },
  { q: '会保存我粘贴的文本吗?', a: '无持久存储;短期内存缓存可能将输入哈希与输出保留最多 10 分钟。本站没有分析 cookie 或追踪像素,详情见 /privacy。' },
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
      <p className="text-xs text-gray-500 mb-4">作者 czhcl123 · 联系方式 contact@gpt-undetectable.com · AI Humanizer</p>

      <h2 className="text-xl font-bold text-gray-800 mb-3">什么是 Walter Writes AI?</h2>
      <p className="mb-3">
        Walter Writes AI(walterwrites.ai)是一款付费 AI 改写工具,内置 AI 检测器。粘贴 AI 生成的文本、选择改写强度,它会把文字改成更短段落、大量自然缩写、句长不均匀、偶尔插入旁白的风格。官网列出声音匹配、可调改写强度、API,以及给 Claude 用的 MCP 连接器。
      </p>
      <p className="mb-3">
        真正有意思的是这种风格本身:自然、口语化、不机械。本站的改写器复刻这种写作美学,作为写作改进工具使用;不针对任何检测器调优,也不把检测分数当作写作质量的证明。
      </p>

      <h2 className="text-xl font-bold text-gray-800 mb-3 mt-6">Walter Writes AI 价格与套餐</h2>
      <p className="mb-3">竞品价格以各自官网为准。查看 <a href="https://walterwrites.ai/pricing" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">Walter Writes AI 官方定价页</a> 获取最新套餐、试用额度与限制。</p>

      <h2 className="text-xl font-bold text-gray-800 mb-3 mt-6">Walter Writes AI 免费吗?</h2>
      <p className="mb-3">
        是否提供免费试用、额度与是否需要信用卡,均以 <a href="https://walterwrites.ai/pricing" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">官方定价页</a>为准;长期使用通常为订阅制。本站改写器免费、无需注册。
      </p>

      <h2 className="text-xl font-bold text-gray-800 mb-3 mt-6">AI 检测器可靠吗?</h2>
      <p className="mb-3">
        检测器的具体算法未公开,误判时有发生,同一段文字在不同检测器上可能得到不同结论。本站不直连任何第三方检测 API,也不做反向工程或检测器专属调优;不承诺任何检测结果。检测器判定不是写作质量的证明,详见 <Link href="/zh/limitations" className="text-violet-600 hover:underline">限制说明</Link>。
      </p>
      <p className="mb-3">
        本站的改写与文本自查均由 DeepSeek Chat(deepseek-chat)云端提示词驱动处理,不直连第三方检测 API。如需启发式自查,可用{' '}
        <Link href="/zh/ai-detector" className="text-violet-600 hover:underline">文本自查工具</Link>;其结果不是检测器的官方判定,也不能验证作者身份。
      </p>

      <h2 className="text-xl font-bold text-gray-800 mb-3 mt-6">Walter Writes AI 的免费替代</h2>
      <p className="mb-3">
        本页面是一个独立的免费改写器,复刻同一种风格:短段落、自然缩写、括号旁白、直接观点、句长变化。无需注册,每次最多 3000 字符,每 IP 每滚动 24 小时 5 次,仅支持英文和简体中文。
      </p>
      <p className="mb-3">
        它是风格改写器,不是官方产品的克隆:没有账号、没有后台、没有 API、没有团队席位。如果你需要每月 3 万字以上、声音匹配或团队席位,官方付费套餐更合适。想看同一篇文字上的风格差别,读{' '}
        <Link href="/zh/walterwrites-vs-undetectable" className="text-violet-600 hover:underline">Walter Writes 风格对比说明</Link>。
      </p>

      <h2 className="text-xl font-bold text-gray-800 mb-3 mt-6">Walter Writes AI 靠谱吗?</h2>
      <p className="mb-3">
        Walter Writes AI 是在运营的商业产品,套餐与试用信息以官网为准。本站与其无关联——不销售、不转售、不从其套餐抽取佣金。任何"保证检测器判定"的说法都应审慎看待;本站不作此类承诺。
      </p>

      <h2 className="text-xl font-bold text-gray-800 mb-3 mt-6">你的文本该用哪个工具?</h2>
      <ul className="list-disc list-inside mb-3 space-y-1 pl-1">
        <li><strong className="text-gray-800">博客、邮件、营销文案</strong> — 本 Walter Writes 改写器,或 <Link href="/zh" className="text-violet-600 hover:underline">AI Humanizer</Link>。</li>
        <li><strong className="text-gray-800">学生论文</strong> — <Link href="/zh/essay-humanizer" className="text-violet-600 hover:underline">EssayRewriter</Link> 保持学术语域;检测器局限见 <Link href="/zh/turnitin-bypass" className="text-violet-600 hover:underline">Turnitin 写作说明</Link>。</li>
        <li><strong className="text-gray-800">想看看表达哪里生硬?</strong> — 先用 <Link href="/zh/ai-detector" className="text-violet-600 hover:underline">文本自查工具</Link> 获得启发式参考。</li>
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

      <p className="text-xs text-gray-500 mb-0 pt-3 border-t border-gray-100">
        隐私:无持久存储;短期内存缓存可能将输入哈希与输出保留最多 10 分钟。无分析 cookie 或追踪像素。详情见 /privacy。
      </p>
    </section>
  )
}
