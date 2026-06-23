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

// Embedded discount calculator — rendered directly on homepage
function EmbeddedDiscountCalculator({ lang }: { lang: 'zh' | 'en' }) {
  const [price, setPrice] = useState('')
  const [discount, setDiscount] = useState('')
  const [result, setResult] = useState<{ final: number; saving: number } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const texts = {
    zh: {
      title: '折扣计算器', hint: '输入原价和折扣，点击计算',
      priceLabel: '商品原价（元）', pricePlaceholder: '请输入原价',
      discountLabel: '折扣力度（1-99）', discountPlaceholder: '例如 8',
      result: '折后价', saving: '立省',
      calcBtn: '计算', resetBtn: '重置',
      invalidPrice: '请输入有效的原价', invalidDiscount: '折扣需在 1 到 99 之间',
    },
    en: {
      title: 'Discount Calculator', hint: 'Enter price and discount, then calculate',
      priceLabel: 'Original Price', pricePlaceholder: 'Enter original price',
      discountLabel: 'Discount (1-99)', discountPlaceholder: 'e.g. 8',
      result: 'Final Price', saving: 'You Save',
      calcBtn: 'Calculate', resetBtn: 'Reset',
      invalidPrice: 'Please enter a valid original price', invalidDiscount: 'Discount must be between 1 and 99',
    },
  }
  const t = texts[lang]

  function calc() {
    setError(null)
    const p = parseFloat(price)
    const d = parseFloat(discount)
    if (!p || p <= 0) { setError(t.invalidPrice); setResult(null); return }
    if (!d || d < 1 || d >= 100) { setError(t.invalidDiscount); setResult(null); return }
    setResult({ final: Math.round(p * (1 - d / 100) * 100) / 100, saving: Math.round(p * d / 100 * 100) / 100 })
  }

  function reset() { setPrice(''); setDiscount(''); setResult(null); setError(null) }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-1">{t.title}</h2>
      <p className="text-sm text-gray-400 mb-4">{t.hint}</p>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">{t.priceLabel}</label>
          <input type="number" value={price} onChange={e => setPrice(e.target.value)}
            placeholder={t.pricePlaceholder}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-base" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">{t.discountLabel}</label>
          <input type="number" value={discount} onChange={e => setDiscount(e.target.value)}
            placeholder={t.discountPlaceholder} min="1" max="99"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-base" />
        </div>
        {error && <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm">{error}</div>}
        {result && (
          <div className="bg-orange-50 rounded-xl p-5 text-center border border-orange-100">
            <div className="text-sm text-orange-500 mb-1">{t.result}</div>
            <div className="text-4xl font-bold text-orange-600">¥{result.final}</div>
            <div className="text-sm text-gray-500 mt-1">{t.saving} ¥{result.saving}</div>
          </div>
        )}
        <div className="flex gap-3">
          <button onClick={calc} className="flex-1 bg-orange-500 text-white py-2.5 rounded-lg font-semibold hover:bg-orange-600 transition-colors text-base">
            {t.calcBtn}
          </button>
          <button onClick={reset} className="px-4 py-2.5 text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm">
            {t.resetBtn}
          </button>
        </div>
      </div>
      <div className="mt-3 text-right">
        <Link href={`/discount-calculator?lang=${lang}`} className="text-xs text-gray-400 hover:text-orange-500 transition-colors">
          {lang === 'zh' ? '→ 完整版' : '→ Full version'}
        </Link>
      </div>
    </div>
  )
}

function HomePageContent() {
  const searchParams = useSearchParams()
  const lang = (searchParams.get('lang') === 'en' ? 'en' : 'zh') as 'zh' | 'en'
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
            className="flex-1 px-4 py-2 bg-gray-100 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:bg-white transition-all"
          />
          <Link
            href={`/?lang=${nextLang}`}
            title={lang === 'zh' ? 'Switch to English' : '切换到中文'}
            className="flex-shrink-0 flex items-center gap-1 text-xs px-3 py-1.5 border border-gray-200 rounded-full hover:bg-gray-50 hover:border-orange-300 transition-colors"
          >
            <span>🌐</span>
            <span>{lang === 'zh' ? 'EN' : '中文'}</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6 space-y-8">

        {/* Tool cards — only show when not searching, or show filtered results */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.length === 0 && search ? null : filtered.map(calc => (
              <Link key={calc.path} href={`${calc.path}?lang=${lang}`}
                className={`block p-5 rounded-xl border transition-all ${calc.color} hover:shadow-md hover:-translate-y-0.5`}>
                <div className="text-2xl mb-2">{calc.icon}</div>
                <div className="font-semibold text-gray-800">{calc.name}</div>
                <div className="text-sm text-gray-500 mt-0.5">{calc.desc}</div>
              </Link>
            ))}
          </div>
          {search && filtered.length === 0 && (
            <p className="text-center text-gray-400 text-sm py-8">
              {lang === 'zh' ? '未找到相关工具' : 'No tools found'}
            </p>
          )}
        </section>

        {/* Embedded discount calculator — always visible */}
        <section>
          <EmbeddedDiscountCalculator lang={lang} />
        </section>

        {/* Sitemap — text links only */}
        <section className="border-t border-gray-200 pt-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">{t.sitemapTitle}</h2>
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

export default function HomePageClient() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <HomePageContent />
    </Suspense>
  )
}
