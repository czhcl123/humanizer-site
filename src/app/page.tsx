import type { Metadata } from 'next'
import HomePageClient from './page-client'

export const metadata: Metadata = {
  title: '实用计算器 - 在线工具箱',
  description: '提供折扣计算器、BMI计算器、日期计算器、农历转换、单位换算等实用在线工具，无需下载，打开即用。',
  openGraph: {
    title: '实用计算器 - 在线工具箱',
    description: '提供折扣计算器、BMI计算器、日期计算器、农历转换、单位换算等实用在线工具',
  },
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const sp = await searchParams
  const initialLang = (sp.lang === 'en' ? 'en' : 'zh') as 'zh' | 'en'
  return <HomePageClient initialLang={initialLang} />
}
