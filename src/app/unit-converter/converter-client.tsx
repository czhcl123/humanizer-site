'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import Footer from '../../components/Footer'

const t = {
  zh: {
    siteTitle: '🧮 实用计算器',
    title: '单位换算器',
    description: '长度、重量、温度单位快速互转',
    category: '类别',
    length: '长度',
    weight: '重量',
    temperature: '温度',
    from: '从',
    to: '到',
    input: '输入数值',
    result: '结果',
    moreCalc: '更多计算器',
    linkBmi: '⚖️ BMI计算器',
    linkCountdown: '📅 日期计算器',
  },
  en: {
    siteTitle: '🧮 Tools',
    title: 'Unit Converter',
    description: 'Convert length, weight and temperature units instantly',
    category: 'Category',
    length: 'Length',
    weight: 'Weight',
    temperature: 'Temperature',
    from: 'From',
    to: 'To',
    input: 'Enter value',
    result: 'Result',
    moreCalc: 'More Calculators',
    linkBmi: '⚖️ BMI Calculator',
    linkCountdown: '📅 Date Calculator',
  },
}

const UNITS = {
  length: {
    zh: { m: '米', cm: '厘米', mm: '毫米', km: '公里', in: '英寸', ft: '英尺', yd: '码', mi: '英里' },
    en: { m: 'Meter', cm: 'cm', mm: 'mm', km: 'km', in: 'Inch', ft: 'Foot', yd: 'Yard', mi: 'Mile' },
    base: 'm',
    map: { m: 1, cm: 0.01, mm: 0.001, km: 1000, in: 0.0254, ft: 0.3048, yd: 0.9144, mi: 1609.344 },
  },
  weight: {
    zh: { kg: '千克', g: '克', mg: '毫克', lb: '磅', oz: '盎司', ton: '吨' },
    en: { kg: 'kg', g: 'g', mg: 'mg', lb: 'lb', oz: 'oz', ton: 'Ton' },
    base: 'kg',
    map: { kg: 1, g: 0.001, mg: 0.000001, lb: 0.453592, oz: 0.0283495, ton: 1000 },
  },
  temperature: {
    zh: { c: '摄氏度', f: '华氏度', k: '开尔文' },
    en: { c: '°C', f: '°F', k: 'K' },
    base: 'c',
    map: { c: 1, f: 1, k: 1 },
  },
}

function convert(value: number, from: string, to: string, category: string): number {
  const unit = UNITS[category as keyof typeof UNITS]
  if (category === 'temperature') {
    if (from === 'c' && to === 'f') return value * 9 / 5 + 32
    if (from === 'f' && to === 'c') return (value - 32) * 5 / 9
    if (from === 'c' && to === 'k') return value + 273.15
    if (from === 'k' && to === 'c') return value - 273.15
    if (from === 'f' && to === 'k') return (value - 32) * 5 / 9 + 273.15
    if (from === 'k' && to === 'f') return (value - 273.15) * 9 / 5 + 32
    return value
  }
  const baseValue = value * (unit.map as Record<string, number>)[from]
  return baseValue / (unit.map as Record<string, number>)[to]
}

function UnitConverterContent({ initialLang }: { initialLang?: 'zh' | 'en' }) {
  const searchParams = useSearchParams()
  const lang = (searchParams.get('lang') === 'zh' ? 'zh' : 'en') as 'zh' | 'en'
  const pathname = usePathname()
  const nextLang: 'zh' | 'en' = lang === 'zh' ? 'en' : 'zh'
  const [category, setCategory] = useState<'length' | 'weight' | 'temperature'>('length')
  const [fromUnit, setFromUnit] = useState('m')
  const [toUnit, setToUnit] = useState('cm')
  const [input, setInput] = useState('')
  const [result, setResult] = useState<number | null>(null)

  const u = (key: string) => t[lang][key as keyof typeof t.zh] as string
  const units = UNITS[category]
  const unitKeys = Object.keys(units.map) as string[]

  function calc() {
    const v = parseFloat(input)
    if (isNaN(v)) return
    setResult(Math.round(convert(v, fromUnit, toUnit, category) * 100000) / 100000)
  }

  function handleCategoryChange(cat: 'length' | 'weight' | 'temperature') {
    setCategory(cat)
    const keys = Object.keys(UNITS[cat].map)
    setFromUnit(keys[0])
    setToUnit(keys[1])
    setResult(null)
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
            <label className="block text-sm font-medium text-gray-600 mb-2">{u('category')}</label>
            <div className="flex gap-2">
              {(['length', 'weight', 'temperature'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                    category === cat
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {u(cat)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">{u('from')}</label>
              <select
                value={fromUnit}
                onChange={(e) => { setFromUnit(e.target.value); setResult(null) }}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              >
                {unitKeys.map((k) => (
                  <option key={k} value={k}>{units.zh[k]} / {units.en[k]}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">{u('to')}</label>
              <select
                value={toUnit}
                onChange={(e) => { setToUnit(e.target.value); setResult(null) }}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              >
                {unitKeys.map((k) => (
                  <option key={k} value={k}>{units.zh[k]} / {units.en[k]}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">{u('input')}</label>
            <input
              type="number"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="100"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-lg"
            />
          </div>

          <button
            onClick={calc}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {u('result')}
          </button>
        </div>

        {result !== null && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6 text-center">
            <div className="text-sm text-gray-500 mb-1">{u('result')}</div>
            <div className="text-4xl font-bold text-orange-500">{result}</div>
            <div className="text-sm text-gray-400 mt-1">
              {units.zh[toUnit as keyof typeof units.zh]}
            </div>
          </div>
        )}

        <div className="flex gap-3 flex-wrap">
          <Link
            href={`/bmi-calculator?lang=${lang}`}
            className="text-sm px-4 py-2 bg-orange-100 text-orange-500 rounded-full hover:bg-orange-200"
          >
            {u('linkBmi')}
          </Link>
          <Link
            href={`/countdown?lang=${lang}`}
            className="text-sm px-4 py-2 bg-orange-100 text-orange-500 rounded-full hover:bg-orange-200"
          >
            {u('linkCountdown')}
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

export default function UnitConverterClient({ initialLang }: { initialLang?: 'zh' | 'en' }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <UnitConverterContent initialLang={initialLang} />
    </Suspense>
  )
}
