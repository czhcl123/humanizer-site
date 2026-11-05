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
    en: '降 AI 率 - Free CNKI AIGC Bypass for Chinese Papers',
  }
  const descriptions = {
    zh: '免费在线降低中文论文 AI 率。改写知网 AIGC、维普、GPTZero 中文、ZeroGPT 中文都识别不出的 AI 八股词,保留论点、引用、数据。',
    en: 'Reduce Chinese AI Rate: lower 知网 AIGC and 维普 detection scores for Chinese essays. Preserves 论点, 引用, and 数据 while rewriting surface structure. Up to 3,000 characters per pass, free, no signup.',
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
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6 text-gray-700 leading-relaxed space-y-3 max-w-3xl mx-auto">
        <p><strong>江 AI 率</strong> 是中文论文 AI 检测的核心指标：知网 AIGC、维普、GPTZero 中文模型、ZeroGPT 中文都会给出 0-100% 的 AI 生成概率。AI 率高意味着内容被判定为机器写作，学术审核会打回重写。本工具针对中文语境优化，保留所有引用、数据、专有名词，只改写表述层。</p>
        <h2 className="text-lg font-semibold text-gray-800 pt-2">为什么中文 AI 率特别高？</h2>
        <p>中文 AI 输出有典型特征："赋能"、"抓手"、"底层逻辑"、"生态位"、"范式"、"价值闭环" 等八股词高频出现；句式过于整齐；缺乏个人观点和具体例子。检测器通过词频和句型模式识别，这些模式在 3000 字内就能被准确打分。</p>
        <h2 className="text-lg font-semibold text-gray-800 pt-2">改写方法</h2>
        <ul className="list-disc pl-5 space-y-1"><li>替换八股词为口语化表达</li><li>打断句式均匀性，混合短句和长句</li><li>加入真实观点和具体示例</li><li>保留引用、数字、年份、专有名词</li></ul>
      <h3 className="text-base font-semibold text-gray-800 pt-1">先确认是哪一关在判你</h3>
      <p>中文论文往往不只被一个平台查:知网 AIGC、维普、GPTZero 中文模型、ZeroGPT 中文各有一套打分口径。用我们的<a href="/ai-detector" className="text-violet-600 hover:underline">免费 AI 检测器</a>跑一遍,就能看到具体是哪一项分数高,而不是凭感觉反复重写。如果你面对的是英文论文的检测,走的是<a href="/essay-writer-bypass-turnitin" className="text-violet-600 hover:underline">绕过 Turnitin 的论文写作工具</a>那条路线。</p>

      <h3 className="text-base font-semibold text-gray-800 pt-1">改完之后怎么验证</h3>
      <p>中文改写同样要过一遍检测。如果不确定判分标准,<a href="/bypass-test-methodology" className="text-violet-600 hover:underline">过检测试方法论</a>那页写了我们每月用的检测器、样本量和通过标准;英文文本的通用改写则见<a href="/essay-humanizer" className="text-violet-600 hover:underline">Essay Humanizer</a>。</p>
      </div>
      <ToolClient mode="chinese" initialLang={lang} i18n={chineseI18n}
      heroTitle={{ zh: '降低中文论文 AI 率 — 免费知网 AIGC 绕过工具', en: 'Reduce AI Rate in Chinese Papers — Free CNKI AIGC Bypass' }} heroSubtitle={{ zh: '改写知网 AIGC、维普、GPTZero 中文、ZeroGPT 中文都识别不出的 AI 八股词,保留论点、引用、数据。免费,无需注册,3000 字以内。', en: 'Rewrites the AI clichés that 知网 AIGC, 维普, GPTZero and ZeroGPT flag in Chinese essays, while keeping your 论点, 引用 and 数据. Free, no signup, 3,000 characters.' }}
    />
    </>
  )
}
