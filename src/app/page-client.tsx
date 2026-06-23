'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Footer from '../components/Footer'

const CALCULATORS_ZH = [
  { path: '/discount-calculator', name: '折扣计算器', desc: '计算折扣价、省钱金额', icon: '🏷️', color: 'bg-orange-50 border-orange-200 hover:bg-orange-100' },
  { path: '/bmi-calculator', name: 'BMI计算器', desc: '身体质量指数计算', icon: '⚖️', color: 'bg-blue-50 border-blue-200 hover:bg-blue-100' },
  { path: '/countdown', name: '日期计算器', desc: '计算日期间隔与倒计时', icon: '📅', color: 'bg-green-50 border-green-200 hover:bg-green-100' },
  { path: '/lunar-calendar', name: '农历转换', desc: '公历农历互转', icon: '📆', color: 'bg-purple-50 border-purple-200 hover:bg-purple-100' },
  { path: '/unit-converter', name: '单位换算', desc: '长度/重量/温度换算', icon: '📐', color: 'bg-teal-50 border-teal-200 hover:bg-teal-100' },
]

const CALCULATORS_EN = [
  { path: '/discount-calculator', name: 'Discount Calculator', desc: 'Calculate discounted price & savings', icon: '🏷️', color: 'bg-orange-50 border-orange-200 hover:bg-orange-100' },
  { path: '/bmi-calculator', name: 'BMI Calculator', desc: 'Body Mass Index calculation', icon: '⚖️', color: 'bg-blue-50 border-blue-200 hover:bg-blue-100' },
  { path: '/countdown', name: 'Date Calculator', desc: 'Calculate days between dates', icon: '📅', color: 'bg-green-50 border-green-200 hover:bg-green-100' },
  { path: '/lunar-calendar', name: 'Lunar Calendar', desc: 'Convert between lunar & solar', icon: '📆', color: 'bg-purple-50 border-purple-200 hover:bg-purple-100' },
  { path: '/unit-converter', name: 'Unit Converter', desc: 'Length/weight/temperature conversion', icon: '📐', color: 'bg-teal-50 border-teal-200 hover:bg-teal-100' },
]

function HomePageContent({ initialLang }: { initialLang?: 'zh' | 'en' }) {
  const searchParams = useSearchParams()
  const rawLang = searchParams.get('lang')
  const lang: 'zh' | 'en' = initialLang ?? (rawLang === 'en' ? 'en' : 'zh')
  const nextLang: 'zh' | 'en' = lang === 'zh' ? 'en' : 'zh'
  const calculators = lang === 'zh' ? CALCULATORS_ZH : CALCULATORS_EN
  const [search, setSearch] = useState('')

  const filtered = calculators.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.desc.toLowerCase().includes(search.toLowerCase())
  )

  const t = {
    zh: {
      searchPlaceholder: '🔍 搜索工具...',
      toolsLabel: '全部工具',
      sitemapTitle: '网站地图',
    },
    en: {
      searchPlaceholder: '🔍 Search tools...',
      toolsLabel: 'All Tools',
      sitemapTitle: 'Sitemap',
    },
  }[lang]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href={`/?lang=${lang}`} className="flex-shrink-0 flex items-center gap-1.5 text-base font-bold text-orange-500 hover:text-orange-600 transition-colors">
            <span className="text-xl">🧮</span>
            <span className="hidden sm:inline text-sm">{lang === 'zh' ? '实用计算器' : 'Tools'}</span>
          </Link>
          <input
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="flex-1 px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:bg-white transition-all min-w-0"
          />
          <Link
            href={`/?lang=${nextLang}`}
            title={lang === 'zh' ? 'Switch to English' : '切换到中文'}
            className="flex-shrink-0 flex items-center gap-1 text-xs px-3 py-1.5 border border-gray-200 rounded-full hover:bg-gray-50 hover:border-orange-300 transition-colors"
          >
            <span>🌐</span>
            <span className="hidden sm:inline">{lang === 'zh' ? 'EN' : '中文'}</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6 space-y-8">

        {/* Tool cards */}
        <section>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-3 font-medium">{t.toolsLabel}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.length === 0 && search ? null : filtered.map(calc => (
              <Link key={calc.path} href={`${calc.path}?lang=${lang}`}
                className={`block p-5 rounded-xl border transition-all ${calc.color} hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98]`}>
                <div className="text-2xl mb-2">{calc.icon}</div>
                <div className="font-semibold text-gray-800">{calc.name}</div>
                <div className="text-sm text-gray-500 mt-0.5">{calc.desc}</div>
              </Link>
            ))}
          </div>
          {search && filtered.length === 0 && (
            <p className="text-center text-gray-400 text-sm py-12">
              {lang === 'zh' ? '未找到相关工具' : 'No tools found'}
            </p>
          )}
        </section>

        {/* Sitemap */}
        <section className="border-t border-gray-200 pt-6">
          <h2 className="text-xs text-gray-400 uppercase tracking-wide mb-3 font-medium">{t.sitemapTitle}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1">
            {calculators.map(calc => (
              <Link key={calc.path} href={`${calc.path}?lang=${lang}`}
                className="text-sm text-gray-500 hover:text-orange-500 transition-colors py-0.5">
                {calc.icon} {calc.name}
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </div>
  )
}

export default function HomePageClient({ initialLang }: { initialLang?: 'zh' | 'en' }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <HomePageContent initialLang={initialLang} />
    </Suspense>
  )
}
