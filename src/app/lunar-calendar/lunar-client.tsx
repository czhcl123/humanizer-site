'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import Footer from '../../components/Footer'

const t = {
  zh: {
    title: '农历阳历转换器',
    description: '快速转换公历与农历日期，支持查看任意日期的农历信息',
    solarDate: '公历日期',
    lunarDate: '农历日期',
    goCountdown: '📅 日期计算器',
    convertToLunar: '转农历',
    convertToSolar: '转公历',
    lunarYear: '农历年',
    lunarMonth: '农历月',
    lunarDay: '农历日',
    leapMonth: '（闰月）',
    moreCalc: '更多计算器',
    home: '← 返回首页',
  },
  en: {
    title: 'Lunar-Solar Calendar Converter',
    description: 'Convert between Gregorian and Chinese Lunar calendar',
    solarDate: 'Solar Date',
    lunarDate: 'Lunar Date',
    goCountdown: '📅 Date Calculator',
    convertToLunar: 'To Lunar',
    convertToSolar: 'To Solar',
    lunarYear: 'Lunar Year',
    lunarMonth: 'Lunar Month',
    lunarDay: 'Lunar Day',
    leapMonth: '(Leap)',
    moreCalc: 'More Calculators',
    home: '← Back to Home',
  },
}

const LUNAR_INFO: Record<number, number> = {
  2025: 0x04bd8, 2024: 0x04ae0, 2023: 0x0a570, 2022: 0x054d5,
  2021: 0x0d260, 2020: 0x0d550, 2019: 0x05655, 2018: 0x050aa,
  2017: 0x0a5b5, 2016: 0x04b60, 2015: 0x0a4d0, 2014: 0x0a4b0,
  2013: 0x0a570, 2012: 0x05554, 2011: 0x0546e, 2010: 0x06986,
}

const LUNAR_CHARS = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊']
const LUNAR_DAYS = ['初一','初二','初三','初四','初五','初六','初七','初八','初九','初十',
  '十一','十二','十三','十四','十五','十六','十七','十八','十九','二十',
  '廿一','廿二','廿三','廿四','廿五','廿六','廿七','廿八','廿九','三十']

function getLunarInfo(year: number): { leapMonth: number; monthDays: number[] } {
  const info = LUNAR_INFO[year] || 0x04bd8
  const leapMonth = info & 0xf
  const monthDays: number[] = []
  let data = info >> 4
  for (let i = 12; i >= 1; i--) {
    monthDays[i] = (data & 1) === 1 ? 30 : 29
    data >>= 1
  }
  return { leapMonth, monthDays }
}

function solarToLunar(year: number, month: number, day: number) {
  const startYear = 2000
  const startLunarYear = 2000
  const startLunarMonth = 1
  const startLunarDay = 1

  const lunarInfo = getLunarInfo(year)
  let lunarMonth = 1
  let lunarDay = 1
  let days = 0

  const m1 = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  const m2 = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  const isLeapYear = (y: number) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0
  const daysInMonth = (y: number, m: number) => isLeapYear(y) ? m1[m - 1] : m2[m - 1]

  for (let y = startYear; y < year; y++) {
    for (let m = 1; m <= 12; m++) {
      days += daysInMonth(y, m)
    }
  }
  for (let m = 1; m < month; m++) {
    days += daysInMonth(year, m)
  }
  days += day - 1

  let cy = startLunarYear
  let cm = startLunarMonth
  let cd = startLunarDay
  let lunarLeapMonth = getLunarInfo(cy).leapMonth

  for (let d = 0; d < days; d++) {
    const info = getLunarInfo(cy)
    const maxDay = info.monthDays[cm] || 29
    cd++
    if (cd > maxDay) {
      cd = 1
      cm++
      if (cm > 12) {
        cm = 1
        cy++
        lunarLeapMonth = getLunarInfo(cy).leapMonth
      }
    }
  }

  return { year: cy, month: cm, day: cd, leap: false }
}

function LunarCalendarContent({ initialLang }: { initialLang?: 'zh' | 'en' }) {
  const searchParams = useSearchParams()
  const lang = (searchParams.get('lang') === 'en' ? 'en' : 'zh') as 'zh' | 'en'
  const pathname = usePathname()
  const nextLang: 'zh' | 'en' = lang === 'zh' ? 'en' : 'zh'
  const [solarDate, setSolarDate] = useState('')
  const [result, setResult] = useState<{ year: number; month: number; day: number } | null>(null)

  const u = (key: string) => t[lang][key as keyof typeof t.zh] as string

  function toLunar() {
    if (!solarDate) return
    const [y, m, d] = solarDate.split('-').map(Number)
    const lunar = solarToLunar(y, m, d)
    setResult(lunar)
  }

  function getMonthName(month: number, lang: 'zh' | 'en') {
    if (lang === 'en') {
      const names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      return `月 ${names[month - 1]}`
    }
    return LUNAR_CHARS[month - 1] + '月'
  }

  function getDayName(day: number, lang: 'zh' | 'en') {
    if (lang === 'en') return `日 Day ${day}`
    return LUNAR_DAYS[day - 1]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href={`/?lang=${lang}`} className="text-xl font-bold text-orange-500">
            🧮 实用计算器
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
            <label className="block text-sm font-medium text-gray-600 mb-1">{u('solarDate')}</label>
            <input
              type="date"
              value={solarDate}
              onChange={(e) => setSolarDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-lg"
            />
          </div>
          <button
            onClick={toLunar}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {u('convertToLunar')}
          </button>
        </div>

        {result && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6 text-center">
            <div className="text-sm text-gray-500 mb-2">{u('lunarDate')}</div>
            <div className="text-2xl font-bold text-orange-500">
              {result.year} {getMonthName(result.month, lang)} {getDayName(result.day, lang)}
            </div>
            <div className="text-sm text-gray-400 mt-1">
              {u('lunarYear')} {result.year}，{u('lunarMonth')} {getMonthName(result.month, lang)}，{u('lunarDay')} {getDayName(result.day, lang)}
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
            href={`/countdown?lang=${lang}`}
            className="text-sm px-4 py-2 bg-orange-100 text-orange-500 rounded-full hover:bg-orange-200"
          >
            {u('goCountdown')}
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

export default function LunarCalendar({ initialLang }: { initialLang?: 'zh' | 'en' }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <LunarCalendarContent initialLang={initialLang} />
    </Suspense>
  )
}
