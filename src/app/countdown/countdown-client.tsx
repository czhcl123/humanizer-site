'use client'

import { Suspense, useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import Footer from '../../components/Footer'

const t = {
  zh: {
    siteTitle: '🧮 实用计算器',
    title: '日期倒计时计算器',
    description: '计算任意日期距离今天还有多少天，或已过去多少天',
    targetDate: '目标日期',
    calc: '计算',
    today: '今天',
    daysLeft: '距离目标还有',
    daysPassed: '已过去',
    days: '天',
    moreCalc: '更多计算器',
    home: '← 返回首页',
  },
  en: {
    siteTitle: '🧮 Tools',
    title: 'Date Countdown Calculator',
    description: 'Calculate days until or since any date',
    targetDate: 'Target Date',
    calc: 'Calculate',
    today: 'Today',
    daysLeft: 'Days until target',
    daysPassed: 'Days since',
    days: 'days',
    moreCalc: 'More Calculators',
    home: '← Back to Home',
  },
}

function formatDate(date: Date, lang: 'zh' | 'en') {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  if (lang === 'zh') return `${y}年${m}月${d}日`
  return `${y}-${m}-${d}`
}

function getDaysDiff(target: Date, today: Date) {
  const diff = target.getTime() - today.getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24))
}

function CountdownContent({ initialLang }: { initialLang?: 'zh' | 'en' }) {
  const searchParams = useSearchParams()
  const lang = (searchParams.get('lang') === 'zh' ? 'zh' : 'en') as 'zh' | 'en'
  const pathname = usePathname()
  const nextLang: 'zh' | 'en' = lang === 'zh' ? 'en' : 'zh'
  const [targetDate, setTargetDate] = useState('')
  const [result, setResult] = useState<{ days: number; future: boolean } | null>(null)
  const [todayStr, setTodayStr] = useState('')

  useEffect(() => {
    const today = new Date()
    const y = today.getFullYear()
    const m = String(today.getMonth() + 1).padStart(2, '0')
    const d = String(today.getDate()).padStart(2, '0')
    setTodayStr(`${y}-${m}-${d}`)
  }, [])

  const u = (key: string) => t[lang][key as keyof typeof t.zh] as string

  function calc() {
    if (!targetDate) return
    const target = new Date(targetDate + 'T00:00:00')
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const days = getDaysDiff(target, today)
    setResult({ days: Math.abs(days), future: days >= 0 })
  }

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
            <label className="block text-sm font-medium text-gray-600 mb-1">{u('targetDate')}</label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
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

        {result && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6 text-center">
            <div className="text-sm text-gray-500 mb-1">{u('today')}: {todayStr}</div>
            <div className="text-sm text-gray-500 mb-1">
              {u('targetDate')}: {targetDate}
            </div>
            <div className="text-4xl font-bold text-orange-500 my-4">
              {result.days}
            </div>
            <div className="text-lg font-semibold text-gray-600">
              {result.future ? u('daysLeft') : u('daysPassed')} {u('days')}
            </div>
          </div>
        )}

        <div className="flex gap-3 flex-wrap">
          <Link
            href={`/bmi-calculator?lang=${lang}`}
            className="text-sm px-4 py-2 bg-orange-100 text-orange-500 rounded-full hover:bg-orange-200"
          >
            ⚖️ BMI计算器
          </Link>
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

export default function Countdown({ initialLang }: { initialLang?: 'zh' | 'en' }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <CountdownContent initialLang={initialLang} />
    </Suspense>
  )
}
