import type { Metadata } from 'next'
import { languageAlternates, pageUrl } from '@/lib/site'
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd'
import ToolClient from '../../../components/Tool/ToolClient'
import { walterwritesI18n } from '../../../components/Tool/i18n/walterwrites'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: '这个对比讲什么？', acceptedAnswer: { '@type': 'Answer', text: '普通写作工具对比：编辑取向、使用门槛和本站的免费额度。不按检测器结果排名；检测器判定并不可靠，也存在争议。' } },
    { '@type': 'Question', name: '其他工具多少钱？', acceptedAnswer: { '@type': 'Answer', text: '竞品价格会变动，本站不发布具体数字；请查各家官网。AI Humanizer 100% 免费，没有付费档。' } },
    { '@type': 'Question', name: '本站有哪些事实与局限？', acceptedAnswer: { '@type': 'Answer', text: '100% 免费、无需注册，每 IP 每滚动 24 小时 5 次、每次最多 3000 字符，支持中英双语。提示词要求保留引用、数字和专有名词，请自行核对。公布的数字只说明局限，不是产品卖点；不承诺任何检测结果。' } },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '写作工具对比：AI Humanizer 与其他写作辅助',
    description: '免费、无需注册的写作改进工具与其他写作辅助的普通对比：编辑取向与使用门槛。不比较检测能力，不列竞品价格。',
    openGraph: {
      title: '写作工具对比：AI Humanizer 与其他写作辅助',
      description: '免费、无需注册的写作改进工具与其他写作辅助的普通对比。不比较检测能力。',
      images: [{ url: 'https://gpt-undetectable.com/og-image.png', width: 1200, height: 630 }],
    },
    alternates: { canonical: pageUrl('/walterwrites-vs-undetectable', 'zh'), languages: languageAlternates('/walterwrites-vs-undetectable') },
  }
}

export default async function Page() {
  const seoBody = (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6 text-gray-700 leading-relaxed space-y-3">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">写作工具对比：AI Humanizer 与其他写作辅助</h1>
      <p>保留这个网址是为了原有链接继续可用。本页现在只是普通写作工具对比：编辑取向、使用门槛，以及使用本站的费用。不比较任何工具的检测器结果，因为<a href="/zh/limitations" className="text-violet-600 hover:underline">检测器分数并不可靠</a>。</p>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">编辑取向不同</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Walter Writes AI</strong>：商业写作产品。短段落、直接表达观点的风格是一种写作取向，不构成检测器方面的证据。</li>
        <li><strong>Undetectable</strong>：另一款商业改写产品；产品详情请以官网为准。</li>
        <li><strong>AI Humanizer</strong>：免费的写作改进工具，目标是表述更清晰、节奏更自然；提示词要求保留引用、数字和专有名词，请自行核对，模型输出不做后处理。</li>
      </ul>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">使用门槛与费用</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>其他产品</strong>：付费，资费与注册要求会变；请查各家官网，本站不列竞品具体价格。</li>
        <li><strong>AI Humanizer</strong>：100% 免费、无需注册、无需安装、无付费档；每 IP 每滚动 24 小时 5 次、每次最多 3000 字符，支持中英双语，DeepSeek Chat 云端处理；无持久存储，仅有最长 10 分钟的内存缓存。</li>
      </ul>

      <h2 className="text-lg font-semibold text-gray-800 pt-2">怎么写得像自己的声音</h2>
      <p>无论用哪种编辑工具，实质内容来自你：写进你确知准确的细节，说出自己的观点，逐条核对引用、数字与引文。AI Humanizer 不承诺任何检测结果。需要免费的<a href="/zh/cost-comparison" className="text-violet-600 hover:underline">费用对比</a>请看另一页。</p>
    </div>
  )

  return (
    <>
      <BreadcrumbJsonLd slug="/walterwrites-vs-undetectable" lang="zh" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="mb-6">{seoBody}</div>
      <p className="text-xs text-gray-400 mt-4">最近核校：2026-11-24</p>
      <ToolClient mode="walterwrites" lang="zh" i18n={walterwritesI18n} hideHeroTitle />
    </>
  )
}