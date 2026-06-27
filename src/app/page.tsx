import type { Metadata } from 'next'
import HomePageClient from './page-client'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const sp = await searchParams
  const lang = sp.lang === 'zh' ? 'zh' : 'en'

  const titles = {
    zh: { default: '实用计算器 - 在线工具箱', template: '%s | 实用计算器' },
    en: { default: 'Practical Tools - Free Online Calculators', template: '%s | Practical Tools' },
  }
  const descriptions = {
    zh: '提供折扣计算器、BMI计算器、日期计算器、农历转换、单位换算等实用在线工具，无需下载，打开即用。',
    en: 'Free online calculators: discount, BMI, date countdown, lunar calendar, unit converter. No download needed, works instantly.',
  }

  return {
    title: { default: titles[lang].default, template: titles[lang].template },
    description: descriptions[lang],
    openGraph: {
      title: titles[lang].default,
      description: descriptions[lang],
    },
  }
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const sp = await searchParams
  const lang = sp.lang === 'zh' ? 'zh' : 'en'
  return <HomePageClient initialLang={lang} />
}
