'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import Footer from '../../components/Footer'

const t = {
  zh: {
    siteTitle: '🧮 实用计算器',
    title: 'BMI 体重指数计算器',
    description: '快速计算您的身体质量指数，判断体重是否健康',
    height: '身高 (cm)',
    weight: '体重 (kg)',
    calc: '计算 BMI',
    result: '您的 BMI',
    category: '体重状态',
    categoryList: {
      underweight: '偏瘦',
      normal: '正常',
      overweight: '偏胖',
      obese: '肥胖',
    },
    range: 'BMI 范围参考',
    underweightRange: '偏瘦：< 18.5',
    normalRange: '正常：18.5 - 23.9',
    overweightRange: '偏胖：24.0 - 27.9',
    obeseRange: '肥胖：≥ 28.0',
    note: '数据仅供参考，BMI 不能完全反映健康状况，请结合其他指标。',
    home: '← 返回首页',
    moreCalc: '更多计算器',
  },
  en: {
    siteTitle: '🧮 Tools',
    title: 'BMI Calculator',
    description: 'Calculate your Body Mass Index quickly',
    height: 'Height (cm)',
    weight: 'Weight (kg)',
    calc: 'Calculate BMI',
    result: 'Your BMI',
    category: 'Status',
    categoryList: {
      underweight: 'Underweight',
      normal: 'Normal',
      overweight: 'Overweight',
      obese: 'Obese',
    },
    range: 'BMI Reference',
    underweightRange: 'Underweight: < 18.5',
    normalRange: 'Normal: 18.5 - 23.9',
    overweightRange: 'Overweight: 24.0 - 27.9',
    obeseRange: 'Obese: ≥ 28.0',
    note: 'For reference only. BMI does not fully reflect health status.',
    home: '← Back to Home',
    moreCalc: 'More Calculators',
  },
}

function getCategory(bmi: number, lang: 'zh' | 'en') {
  if (bmi < 18.5) return t[lang].categoryList.underweight
  if (bmi < 24) return t[lang].categoryList.normal
  if (bmi < 28) return t[lang].categoryList.overweight
  return t[lang].categoryList.obese
}

function getCategoryColor(category: string, lang: 'zh' | 'en') {
  if (category === t[lang].categoryList.underweight) return 'text-blue-500'
  if (category === t[lang].categoryList.normal) return 'text-green-500'
  if (category === t[lang].categoryList.overweight) return 'text-orange-500'
  return 'text-red-500'
}

function BmiCalculatorContent({ initialLang }: { initialLang?: 'zh' | 'en' }) {
  const searchParams = useSearchParams()
  const lang = (searchParams.get('lang') === 'en' ? 'en' : 'zh') as 'zh' | 'en'
  const pathname = usePathname()
  const nextLang: 'zh' | 'en' = lang === 'zh' ? 'en' : 'zh'
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [bmi, setBmi] = useState<number | null>(null)

  const u = (key: string) => t[lang][key as keyof typeof t.zh] as string

  function calc() {
    const h = parseFloat(height)
    const w = parseFloat(weight)
    if (!h || !w || h <= 0 || w <= 0) return
    const bmiVal = w / Math.pow(h / 100, 2)
    setBmi(Math.round(bmiVal * 10) / 10)
  }

  const category = bmi !== null ? getCategory(bmi, lang) : ''

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href={`/?lang=${lang}`} className="text-xl font-bold text-orange-500">
            {u('siteTitle')}
          </Link>
          <Link
            href={`${pathname}?lang=${nextLang}`}
            className="text-sm px-3 py-1 border border-gray-200 rounded-full hover:bg-gray-50"
          >
            {lang === 'zh' ? 'EN' : '中文'}
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{u('title')}</h1>
        <p className="text-gray-500 text-sm mb-6">{u('description')}</p>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">{u('height')}</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="170"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">{u('weight')}</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="65"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-lg"
            />
          </div>
          <button
            onClick={calc}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {u('calc')}
          </button>
        </div>

        {bmi !== null && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6 text-center">
            <div className="text-sm text-gray-500 mb-1">{u('result')}</div>
            <div className="text-5xl font-bold text-orange-500 mb-2">{bmi}</div>
            <div className={`text-lg font-semibold ${getCategoryColor(category, lang)}`}>
              {category}
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
          <h2 className="font-semibold text-gray-700 mb-3">{u('range')}</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-blue-500">{u('underweightRange')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-500">{u('normalRange')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-orange-500">{u('overweightRange')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-red-500">{u('obeseRange')}</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-400 mb-6">{u('note')}</p>

        <div className="flex gap-3 flex-wrap">
          <Link
            href={`/discount-calculator?lang=${lang}`}
            className="text-sm px-4 py-2 bg-orange-100 text-orange-500 rounded-full hover:bg-orange-200"
          >
            🏷️ 折扣计算器
          </Link>
          <Link
            href={`/?lang=${lang}`}
            className="text-sm px-4 py-2 bg-gray-100 text-gray-500 rounded-full hover:bg-gray-200"
          >
            {u('moreCalc')}
          </Link>
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  )
}

export default function BmiCalculator({ initialLang }: { initialLang?: 'zh' | 'en' }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <BmiCalculatorContent initialLang={initialLang} />
    </Suspense>
  )
}
