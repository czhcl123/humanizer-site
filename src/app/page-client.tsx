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

function HomePageContent() {
  const searchParams = useSearchParams()
  const lang = (searchParams.get('lang') === 'en' ? 'en' : 'zh') as 'zh' | 'en'
  const nextLang: 'zh' | 'en' = lang === 'zh' ? 'en' : 'zh'
  const calculators = lang === 'zh' ? CALCULATORS_ZH : CALCULATORS_EN

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-orange-500">
            {lang === 'zh' ? '🧮 实用计算器' : '🧮 Tools'}
          </h1>
          <Link
            href={`/?lang=${nextLang}`}
            className="text-sm px-3 py-1 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
          >
            {lang === 'zh' ? 'EN' : '中文'}
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {calculators.map((calc) => (
            <Link
              key={calc.path}
              href={`${calc.path}?lang=${lang}`}
              className={`block p-5 rounded-xl border transition-colors ${calc.color}`}
            >
              <div className="text-2xl mb-2">{calc.icon}</div>
              <div className="font-semibold text-gray-800">{calc.name}</div>
              <div className="text-sm text-gray-500 mt-1">{calc.desc}</div>
            </Link>
          ))}
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  )
}

export default function HomePageClient({ initialLang }: { initialLang?: 'zh' | 'en' }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <HomePageContent />
    </Suspense>
  )
}
