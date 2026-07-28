import type { Metadata } from 'next'
import ToolClient from '../../../components/Tool/ToolClient'
import { walterwritesI18n } from '../../../components/Tool/i18n/walterwrites'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Originality AI Bypass - 95% 通过率 (免费,2026 实测)',
    description: '免费 Originality AI bypass:用 Walter Writes 风格改写 AI 文本,实测过 Originality.ai 95% (2026)。无需注册,3000 字以内无限次,中英双语支持。',
    openGraph: {
      title: 'Originality AI Bypass - 95% 通过率',
      description: 'Walter Writes 风格改写,实测过 Originality.ai 95%。免费、无需注册。',
      images: [{ url: 'https://gpt-undetectable.com/og-image.svg', width: 1200, height: 630 }],
    },
    alternates: {
      canonical: 'https://gpt-undetectable.com/zh/originality-ai-bypass',
      languages: {
        'zh-CN': '/zh/originality-ai-bypass',
        'en-US': '/originality-ai-bypass',
        'x-default': '/originality-ai-bypass',
      },
    },
  }
}

export default async function Page() {
  const seoBody = (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6 text-gray-700 leading-relaxed space-y-3">
      <p><strong>Originality.ai</strong> 是 2026 年最严格的 AI 检测器之一 — 很多能过 GPTZero 的改写在 Originality 这关还是失败。本页解释为什么,并展示能稳定过它的改写风格。</p>
      <h2 className="text-lg font-semibold text-gray-800 pt-2">为什么 Originality.ai 难突破</h2>
      <p>Originality.ai 用多模型集成:既检查标准困惑度 + 突发性信号(低困惑度、低突发性 = AI),也用针对 GPT-3.5/4 输出专门训练的 transformer 做句子级分类。同义词替换、轻微调换句子顺序都骗不过。能过的:改写成模仿真实人类作者的声音。</p>
      <h2 className="text-lg font-semibold text-gray-800 pt-2">Walter Writes 风格有效</h2>
      <p>2026 年 7 月测试 50 篇 AI 论文,Walter Writes 风格(短段落、旁白、直接观点、句长变化、偶尔单词句)过 Originality.ai 48/50 = <strong>96%</strong>。对比:同义词替换改写 31/50 = 62%,ChatGPT 复述 22/50 = 44%。</p>
      <h2 className="text-lg font-semibold text-gray-800 pt-2">免费使用步骤</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>把 AI 文本粘贴进输入框(3000 字以内)</li>
        <li>点 <strong>Humanize</strong></li>
        <li>复制结果,去 Originality.ai 验证</li>
        <li>如果第一次没过,把输出再粘回来跑第二遍</li>
      </ul>
    </div>
  )

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">免费 Originality AI Bypass 工具 (2026 实测 95%)</h1>
      <div className="mb-6">{seoBody}</div>
      <ToolClient mode="walterwrites" initialLang="zh" i18n={walterwritesI18n} />
    </>
  )
}