import type { Metadata } from 'next'
import BmiCalculatorClient from './bmi-client'

export const metadata: Metadata = {
  title: 'BMI计算器',
  description: '快速计算身体质量指数(BMI)，判断体重是否健康，支持中英文，免费使用。',
  openGraph: {
    title: 'BMI计算器 - 实用计算器',
    description: '快速计算身体质量指数BMI，判断体重是否健康',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'BMI是什么？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'BMI（Body Mass Index，身体质量指数）是国际上常用的衡量人体胖瘦程度的标准，计算公式为：体重(kg) ÷ 身高(m)的平方。',
      },
    },
    {
      '@type': 'Question',
      name: 'BMI正常范围是多少？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '对于亚洲成年人，BMI 18.5-23.9 为正常范围，低于18.5为偏瘦，24.0-27.9为偏胖，28.0及以上为肥胖。不同人种标准略有差异。',
      },
    },
    {
      '@type': 'Question',
      name: 'BMI能完全反映健康状况吗？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'BMI只是一个参考指标，不能完全反映健康状况。它没有考虑肌肉量、骨密度、年龄、性别等因素。建议结合腰围、体脂率等其他指标综合判断。',
      },
    },
  ],
}

export default async function BmiCalculatorPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const sp = await searchParams
  const lang = (sp.lang === 'en' ? 'en' : 'zh') as 'zh' | 'en'
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BmiCalculatorClient initialLang={lang} />
    </>
  )
}