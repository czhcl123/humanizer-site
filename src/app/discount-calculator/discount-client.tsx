'use client'

import { Suspense, useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import Footer from '../../components/Footer'

interface HistoryEntry {
  id: number
  price: string
  discount: string
  final: number
  saving: number
}

const t = {
  zh: {
    siteTitle: '🧮 实用计算器',
    pageTitle: '折扣计算器',
    backHome: '← 返回首页',
    priceLabel: '商品原价（元）',
    pricePlaceholder: '请输入原价',
    discountLabel: '折扣力度',
    discountPlaceholder: '请输入数字 1-99',
    discountHint: '注：8 = 8折（80%），7.5 = 75折',
    result: '折后价',
    saving: '立省',
    copy: '复制结果',
    copied: '已复制',
    reset: '重置',
    calc: '计算',
    history: '计算历史',
    clearHistory: '清空',
    noHistory: '暂无记录',
    invalidPrice: '请输入有效的原价',
    invalidDiscount: '折扣需在 1 到 99 之间',
    switchLang: 'EN',
  },
  en: {
    siteTitle: '🧮 Tools',
    pageTitle: 'Discount Calculator',
    backHome: '← Back to Home',
    priceLabel: 'Original Price',
    pricePlaceholder: 'Enter original price',
    discountLabel: 'Discount (%)',
    discountPlaceholder: 'Enter a number between 1-99',
    discountHint: 'Note: 8 = 80% of price, 7.5 = 75% of price',
    result: 'Final Price',
    saving: 'You Save',
    copy: 'Copy',
    copied: 'Copied!',
    reset: 'Reset',
    calc: 'Calculate',
    history: 'History',
    clearHistory: 'Clear',
    noHistory: 'No records yet',
    invalidPrice: 'Please enter a valid original price',
    invalidDiscount: 'Discount must be between 1 and 99',
    switchLang: '中文',
  },
}

function u(key: keyof typeof t.en, lang: 'zh' | 'en') {
  return t[lang][key] as string
}

function DiscountCalculatorContent({ initialLang }: { initialLang?: 'zh' | 'en' }) {
  const searchParams = useSearchParams()
  const lang: 'zh' | 'en' = initialLang ?? (searchParams.get('lang') === 'en' ? 'en' : 'zh')
  const pathname = usePathname()
  const nextLang: 'zh' | 'en' = lang === 'zh' ? 'en' : 'zh'

  const [price, setPrice] = useState('')
  const [discount, setDiscount] = useState('')
  const [result, setResult] = useState<{ final: number; saving: number } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [copied, setCopied] = useState(false)

  // Mobile keyboard fix: scroll result into view when it appears
  const resultRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (result && resultRef.current) {
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 100)
    }
  }, [result])

  function calc() {
    setError(null)
    const p = parseFloat(price)
    const d = parseFloat(discount)
    if (!p || p <= 0) {
      setError(u('invalidPrice', lang))
      setResult(null)
      return
    }
    if (!d || d < 1 || d >= 100) {
      setError(u('invalidDiscount', lang))
      setResult(null)
      return
    }
    const final = Math.round(p * (1 - d / 100) * 100) / 100
    const saving = Math.round(p * d / 100 * 100) / 100
    setResult({ final, saving })
    setHistory(prev => [{
      id: Date.now(),
      price,
      discount,
      final,
      saving,
    }, ...prev].slice(0, 10))
  }

  function reset() {
    setPrice('')
    setDiscount('')
    setResult(null)
    setError(null)
  }

  function copyResult() {
    if (!result) return
    const text = lang === 'zh'
      ? `原价 ¥${price}，${discount}折，折后价 ¥${result.final}，立省 ¥${result.saving}`
      : `Original ¥${price}, ${discount}% off → Final ¥${result.final}, Save ¥${result.saving}`
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
          <Link href={`/?lang=${lang}`} className="text-xl font-bold text-orange-500 hover:text-orange-600">
            {u('siteTitle', lang)}
          </Link>
          <Link
            href={`${pathname}?lang=${nextLang}`}
            className="text-xs px-3 py-1.5 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
          >
            🌐 {u('switchLang', lang)}
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-8 pb-24">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">{u('pageTitle', lang)}</h1>
        <p className="text-sm text-gray-400 mb-6">{lang === 'zh' ? '输入原价和折扣，快速计算折后价' : 'Enter price and discount to calculate'}</p>

        {/* Calculator card */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6">
          <div className="space-y-4">
            {/* Price input */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">{u('priceLabel', lang)}</label>
              <input
                type="number"
                inputMode="decimal"
                value={price}
                onChange={e => setPrice(e.target.value)}
                placeholder={u('pricePlaceholder', lang)}
                className="w-full px-4 py-3 text-lg border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
              />
            </div>

            {/* Discount input */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">{u('discountLabel', lang)}</label>
              <input
                type="number"
                inputMode="decimal"
                value={discount}
                onChange={e => setDiscount(e.target.value)}
                placeholder={u('discountPlaceholder', lang)}
                min="1"
                max="99"
                className="w-full px-4 py-3 text-lg border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
              />
              <p className="text-xs text-gray-400 mt-1">{u('discountHint', lang)}</p>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-2.5 rounded-xl text-sm">{error}</div>
            )}

            {/* Result */}
            {result && (
              <div ref={resultRef} className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-5 text-center border border-orange-200">
                <div className="text-sm text-orange-500 mb-1">{u('result', lang)}</div>
                <div className="text-4xl font-bold text-orange-600 mb-1">¥{result.final}</div>
                <div className="text-sm text-gray-500">{u('saving', lang)} ¥{result.saving}</div>
                <button
                  onClick={copyResult}
                  className="mt-3 text-xs px-4 py-1.5 bg-white border border-orange-200 text-orange-500 rounded-full hover:bg-orange-50 transition-colors"
                >
                  {copied ? u('copied', lang) : u('copy', lang)}
                </button>
              </div>
            )}

            {/* Action buttons — large touch targets */}
            <div className="flex gap-3 pt-1">
              <button
                onClick={calc}
                className="flex-1 bg-orange-500 text-white py-3.5 rounded-xl font-semibold text-base hover:bg-orange-600 active:scale-[0.98] transition-all"
              >
                {u('calc', lang)}
              </button>
              <button
                onClick={reset}
                className="px-5 py-3.5 text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50 active:scale-[0.98] transition-all text-base"
              >
                {u('reset', lang)}
              </button>
            </div>
          </div>
        </div>

        {/* History */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-600">{u('history', lang)}</h2>
            {history.length > 0 && (
              <button onClick={() => setHistory([])} className="text-xs text-gray-400 hover:text-red-500 transition-colors">
                {u('clearHistory', lang)}
              </button>
            )}
          </div>
          {history.length === 0 ? (
            <p className="text-sm text-gray-300 text-center py-4">{u('noHistory', lang)}</p>
          ) : (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {history.map(entry => (
                <div key={entry.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">¥{entry.price}</span>
                    <span className="text-gray-300 mx-1">·</span>
                    <span>{entry.discount}{lang === 'zh' ? '折' : '%'}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-orange-500">¥{entry.final}</span>
                    <span className="text-xs text-gray-400 ml-2">{u('saving', lang)} ¥{entry.saving}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <Link href={`/?lang=${lang}`} className="text-sm text-gray-400 hover:text-orange-500 transition-colors">
            {u('backHome', lang)}
          </Link>
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  )
}

export default function DiscountCalculatorClient({ initialLang }: { initialLang?: 'zh' | 'en' }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <DiscountCalculatorContent initialLang={initialLang} />
    </Suspense>
  )
}
