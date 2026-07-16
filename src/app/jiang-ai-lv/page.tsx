import type { Metadata } from 'next'
import ToolClient from '../../components/Tool/ToolClient'
import { chineseI18n } from '../../components/Tool/i18n/chinese'

export const dynamic = 'force-dynamic'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: '什么是 AI 率?', acceptedAnswer: { '@type': 'Answer', text: 'AI 率 是中文论文场景的指标 —— 知网、维普等中文检测器对论文 AI 生成概率的评分。AI 率高 = 像 AI 写的;AI 率低 = 像人写的。' } },
    { '@type': 'Question', name: '能过知网 AIGC 检测吗?', acceptedAnswer: { '@type': 'Answer', text: '针对知网 AIGC、维普、GPTZero 中文模型、ZeroGPT 中文专门调优。3000 字以内的中文段落,AI 率可从 80%+ 降到 20% 以下。' } },
    { '@type': 'Question', name: '保留引用和数据吗?', acceptedAnswer: { '@type': 'Answer', text: '保留。所有引用、专有名词、数字、年份、术语都不动。只改写表述层。' } },
    { '@type': 'Question', name: '支持英文论文吗?', acceptedAnswer: { '@type': 'Answer', text: '工具专注中文场景。英文论文请用我们的 AI Humanizer 或 Essay Humanizer。' } },
    { '@type': 'Question', name: '替换哪些 AI 八股词?', acceptedAnswer: { '@type': 'Answer', text: '"赋能"→"帮助/推动";"抓手"→"方法/路径";"底层逻辑"→"核心思路";"链路"→"环节";"生态位"→"位置";"范式"→"模式";"价值闭环"→"完整流程";"降维打击"→"突破"。' } },
    { '@type': 'Question', name: '你存我的论文吗?', acceptedAnswer: { '@type': 'Answer', text: '不存。无状态 API,处理完即丢。我们从不用用户提交训练模型。' } },
  ],
}

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const sp = await searchParams
  const lang = sp.lang === 'zh' ? 'zh' : 'en'
  const titles = {
    zh: '降 AI 率 - 免费中文论文 AI 率降低工具',
    en: 'Reduce Chinese AI Rate - Free CNKI AIGC Bypass',
  }
  const descriptions = {
    zh: '免费在线降低中文论文 AI 率。改写知网 AIGC、维普、GPTZero 中文、ZeroGPT 中文都识别不出的 AI 八股词,保留论点、引用、数据。',
    en: 'Free AI Humanizer that rewrites AI-generated text to bypass GPTZero, Turnitin AI, and Originality.ai detection.',
  }
  return {
    title: titles[lang],
    description: descriptions[lang],
    openGraph: { title: titles[lang], description: descriptions[lang] },
    alternates: {
      canonical: 'https://gpt-undetectable.com/jiang-ai-lv',
      languages: {
        'zh-CN': '/zh/jiang-ai-lv',
        'en-US': '/jiang-ai-lv',
        'x-default': '/jiang-ai-lv',
      },
    },
  }
}

export default async function ChinesePage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const sp = await searchParams
  const lang = sp.lang === 'zh' ? 'zh' : 'en'
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ToolClient mode="chinese" initialLang={lang} i18n={chineseI18n} />
    </>
  )
}