import type { Metadata } from 'next'
import LunarCalendarClient from './lunar-client'

export const metadata: Metadata = {
  title: '农历转换器',
  description: '快速转换公历与农历日期，支持查看任意日期的农历信息，中英文免费使用。',
  openGraph: {
    title: '农历转换器 - 实用计算器',
    description: '快速转换公历与农历日期，支持查看任意日期的农历信息',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '农历和公历有什么区别？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '公历（阳历）是以地球绕太阳公转为基础的历法，一年365或366天。农历（阴阳历）兼顾月亮盈亏和太阳回归年，一年354或384天，并设有闰月来调整两者差距。',
      },
    },
    {
      '@type': 'Question',
      name: '如何将公历转换为农历？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '在本工具中输入公历日期（年月日），点击"转农历"即可获得对应的农历日期，包括农历年、月（正月至腊月，闰月会标注）、以及初一到三十的日期。',
      },
    },
    {
      '@type': 'Question',
      name: '农历转换器支持哪些年份？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '本工具支持2010年至2025年的公历转农历计算，覆盖了近年需要查询的主要农历日期范围。',
      },
    },
  ],
}

export default async function LunarCalendarPage({
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
      <LunarCalendarClient initialLang={lang} />
    </>
  )
}