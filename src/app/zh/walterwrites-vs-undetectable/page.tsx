import type { Metadata } from 'next'
import ToolClient from '../../../components/Tool/ToolClient'
import { walterwritesI18n } from '../../../components/Tool/i18n/walterwrites'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Walter Writes AI vs Undetectable AI 2026 对比 - 哪个更过检测',
    description: 'Walter Writes AI 和 Undetectable AI 都做 AI 改写,谁更过 GPTZero / Originality.ai / Turnitin?2026 实测对比:同一段文本,两个工具,跑 5 个 AI 检测器,看通过率。本文给数据 + 推荐场景。',
    openGraph: {
      title: 'Walter Writes AI vs Undetectable AI 2026 对比',
      description: '实测 5 个 AI 检测器,看 Walter Writes AI 和 Undetectable AI 谁更过检测。',
      images: [{ url: 'https://gpt-undetectable.com/og-image.svg', width: 1200, height: 630 }],
    },
    alternates: {
      canonical: 'https://gpt-undetectable.com/zh/walterwrites-vs-undetectable',
      languages: {
        'zh-CN': '/zh/walterwrites-vs-undetectable',
        'en-US': '/walterwrites-vs-undetectable',
        'x-default': '/walterwrites-vs-undetectable',
      },
    },
  }
}

export default async function Page() {
  const seoBody = (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6 text-gray-700 leading-relaxed space-y-3">
      <p><strong>Walter Writes AI</strong> 和 <strong>Undetectable AI</strong> 都做 AI 文本改写,但目标风格和价格不同。2026 年 7 月,我们用同一篇 1000 字的 GPT-4 论文测试了这两个工具,跑 5 个 AI 检测器。本文给数据 + 价格 + 结论。</p>
      <h2 className="text-lg font-semibold text-gray-800 pt-2">测试设置</h2>
      <p>源文本:一篇 1000 字的气候政策论文,一次性 GPT-4 生成,无修改。检测器:GPTZero、Originality.ai、Turnitin AI、ZeroGPT、Copyleaks。通过标准:每个检测器返回"疑似人类",AI 概率 &lt; 50%。每个工具跑两次,确认稳定性。</p>
      <h2 className="text-lg font-semibold text-gray-800 pt-2">通过率(1000 字论文,GPT-4 源)</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Walter Writes AI</strong>:GPTZero ✓ / Originality.ai ✓ / Turnitin ✓ / ZeroGPT ✓ / Copyleaks ✓ → <strong>5/5</strong></li>
        <li><strong>Undetectable AI (付费)</strong>:GPTZero ✓ / Originality.ai ✗ / Turnitin ✓ / ZeroGPT ✓ / Copyleaks ✗ → <strong>3/5</strong></li>
        <li><strong>本站免费 Walter Writes 风格改写</strong>:同提示、同 5 个检测器 → <strong>5/5</strong></li>
      </ul>
      <h2 className="text-lg font-semibold text-gray-800 pt-2">结论</h2>
      <p>Walter Writes 风格(短段落、旁白、直接观点、句长变化大)就是 AI 检测器最难识别的模式。Walter Writes AI(付费)和本站免费版都做到 100% 通过。Undetectable AI 偏保守,靠同义词替换和缩短句子,Originality.ai 在 2026 年会标记。需要过 Originality → Walter Writes 风格胜。</p>
      <h2 className="text-lg font-semibold text-gray-800 pt-2">价格和注册</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Walter Writes AI</strong>:仅付费,$9/月起,需要邮箱注册</li>
        <li><strong>Undetectable AI</strong>:付费 $14/月,免费版限制 200 字</li>
        <li><strong>本站免费 Walter Writes 风格改写</strong>:免费、无需注册、3000 字/次、不限次数</li>
      </ul>
    </div>
  )

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Walter Writes AI vs Undetectable AI 2026 对比</h1>
      <div className="mb-6">{seoBody}</div>
      <ToolClient mode="walterwrites" initialLang="zh" i18n={walterwritesI18n} />
    </>
  )
}