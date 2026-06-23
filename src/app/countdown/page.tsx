import type { Metadata } from 'next'
import CountdownClient from './countdown-client'

export const metadata: Metadata = {
  title: '日期计算器',
  description: '计算任意日期距离今天还有多少天，或已过去多少天。支持倒计时和日期差计算。',
  openGraph: {
    title: '日期计算器 - 实用计算器',
    description: '计算任意日期距离今天还有多少天，或已过去多少天',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '日期计算器能做什么？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '日期计算器可以计算任意日期距离今天还有多少天（未来倒计时），或者已经过去多少天（历史日期），帮助您规划重要事件、纪念日、生日等。',
      },
    },
    {
      '@type': 'Question',
      name: '如何计算两个日期之间的天数差？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '输入目标日期后点击计算，计算器会自动用目标日期减去今天的日期，得出精确天数。如果目标是未来日期则显示倒计时，是过去日期则显示已过去天数。',
      },
    },
    {
      '@type': 'Question',
      name: '计算结果包含起止日期吗？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '我们的日期计算方法是不包含起始日的。例如今天1月1日，目标日期1月2日，则显示1天（即1月2日到1月1日之间相差1天）。',
      },
    },
  ],
}

export default async function CountdownPage({
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
      <CountdownClient initialLang={lang} />
    </>
  )
}