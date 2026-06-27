'use client'

import { Suspense, useState, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import QRCode from 'qrcode'
import Footer from '../../components/Footer'

const t = {
  zh: {
    siteTitle: '🧮 实用计算器',
    pageTitle: 'QR码生成器',
    pageSubtitle: '免费在线生成可下载二维码',
    backHome: '← 返回首页',
    inputLabel: '输入内容（网址/文本/邮箱/Wi-Fi）',
    inputPlaceholder: '例如：https://example.com',
    sizeLabel: '尺寸（像素）',
    errorLabel: '纠错级别',
    errorLevels: { L: 'L 7%', M: 'M 15%', Q: 'Q 25%', H: 'H 30%' },
    fgLabel: '前景色',
    bgLabel: '背景色',
    generate: '生成二维码',
    download: '下载PNG',
    downloadSvg: '下载SVG',
    copy: '复制图片',
    copied: '已复制',
    history: '最近生成',
    empty: '尚无记录',
    switchLang: 'EN',
  },
  en: {
    siteTitle: '🧮 Tools',
    pageTitle: 'QR Code Generator',
    pageSubtitle: 'Free online QR code generator, no watermark',
    backHome: '← Back to Home',
    inputLabel: 'Enter content (URL / text / email / Wi-Fi)',
    inputPlaceholder: 'e.g., https://example.com',
    sizeLabel: 'Size (pixels)',
    errorLabel: 'Error correction',
    errorLevels: { L: 'L 7%', M: 'M 15%', Q: 'Q 25%', H: 'H 30%' },
    fgLabel: 'Foreground',
    bgLabel: 'Background',
    generate: 'Generate QR Code',
    download: 'Download PNG',
    downloadSvg: 'Download SVG',
    copy: 'Copy image',
    copied: 'Copied!',
    history: 'Recent generations',
    empty: 'No history yet',
    switchLang: '中文',
  },
}

function u(key: keyof typeof t.en, lang: 'zh' | 'en') {
  return t[lang][key] as string
}

function QrCodeGeneratorContent({ initialLang }: { initialLang?: 'zh' | 'en' }) {
  const searchParams = useSearchParams()
  const lang: 'zh' | 'en' = initialLang ?? (searchParams.get('lang') === 'zh' ? 'zh' : 'en')
  const pathname = usePathname()
  const nextLang: 'zh' | 'en' = lang === 'zh' ? 'en' : 'zh'

  const [text, setText] = useState('https://example.com')
  const [size, setSize] = useState(256)
  const [errorLevel, setErrorLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M')
  const [fgColor, setFgColor] = useState('#000000')
  const [bgColor, setBgColor] = useState('#ffffff')
  const [dataUrl, setDataUrl] = useState('')
  const [svgString, setSvgString] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [copied, setCopied] = useState(false)

  const generate = async () => {
    if (!text.trim()) return
    const opts = {
      width: size,
      margin: 2,
      errorCorrectionLevel: errorLevel,
      color: { dark: fgColor, light: bgColor },
    } as const
    const url = await QRCode.toDataURL(text, opts)
    const svg = await QRCode.toString(text, { ...opts, type: 'svg' })
    setDataUrl(url)
    setSvgString(svg)
    setHistory((h) => [text, ...h.filter((x) => x !== text)].slice(0, 5))
  }

  const downloadPng = () => {
    if (!dataUrl) return
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = `qrcode-${Date.now()}.png`
    a.click()
  }

  const downloadSvg = () => {
    if (!svgString) return
    const blob = new Blob([svgString], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `qrcode-${Date.now()}.svg`
    a.click()
    URL.revokeObjectURL(url)
  }

  const copyImage = async () => {
    if (!dataUrl) return
    try {
      const blob = await (await fetch(dataUrl)).blob()
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // ignore
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
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
        <p className="text-sm text-gray-400 mb-6">{u('pageSubtitle', lang)}</p>

        {/* Input card */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">{u('inputLabel', lang)}</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={u('inputPlaceholder', lang)}
                rows={3}
                className="w-full px-4 py-3 text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all resize-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">{u('sizeLabel', lang)}</label>
                <select
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="w-full px-3 py-3 text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
                >
                  <option value={128}>128</option>
                  <option value={256}>256</option>
                  <option value={512}>512</option>
                  <option value={1024}>1024</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">{u('errorLabel', lang)}</label>
                <select
                  value={errorLevel}
                  onChange={(e) => setErrorLevel(e.target.value as 'L' | 'M' | 'Q' | 'H')}
                  className="w-full px-3 py-3 text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
                >
                  {(['L', 'M', 'Q', 'H'] as const).map((l) => (
                    <option key={l} value={l}>{t[lang].errorLevels[l]}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">{u('fgLabel', lang)}</label>
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-full h-12 border border-gray-200 rounded-xl cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">{u('bgLabel', lang)}</label>
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-full h-12 border border-gray-200 rounded-xl cursor-pointer"
                />
              </div>
            </div>
            <button
              onClick={generate}
              className="w-full bg-orange-500 text-white py-3.5 rounded-xl font-semibold text-base hover:bg-orange-600 active:scale-[0.98] transition-all"
            >
              {u('generate', lang)}
            </button>
          </div>
        </div>

        {/* Preview card */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-4">
          <div className="flex items-center justify-center min-h-[220px] bg-gray-50 rounded-xl mb-3">
            {dataUrl ? (
              <img src={dataUrl} alt="QR Code" className="max-w-full max-h-[200px]" />
            ) : (
              <div className="text-gray-300 text-sm">{lang === 'zh' ? '预览将显示在这里' : 'Preview will appear here'}</div>
            )}
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={downloadPng}
              disabled={!dataUrl}
              className="px-3 py-2.5 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 text-gray-700 text-xs font-medium rounded-lg transition"
            >
              {u('download', lang)}
            </button>
            <button
              onClick={downloadSvg}
              disabled={!dataUrl}
              className="px-3 py-2.5 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 text-gray-700 text-xs font-medium rounded-lg transition"
            >
              {u('downloadSvg', lang)}
            </button>
            <button
              onClick={copyImage}
              disabled={!dataUrl}
              className="px-3 py-2.5 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 text-gray-700 text-xs font-medium rounded-lg transition"
            >
              {copied ? u('copied', lang) : u('copy', lang)}
            </button>
          </div>
        </div>

        {/* History */}
        {history.length > 0 && (
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-4">
            <h2 className="text-sm font-semibold text-gray-600 mb-3">{u('history', lang)}</h2>
            <div className="space-y-1">
              {history.map((h, i) => (
                <button
                  key={i}
                  onClick={() => setText(h)}
                  className="block w-full text-left text-sm text-gray-600 hover:text-orange-500 truncate py-1"
                >
                  → {h}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="text-center">
          <Link href={`/?lang=${lang}`} className="text-sm text-gray-400 hover:text-orange-500 transition-colors">
            {u('backHome', lang)}
          </Link>
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  )
}

export default function QrCodeGeneratorClient({ initialLang }: { initialLang?: 'zh' | 'en' }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <QrCodeGeneratorContent initialLang={initialLang} />
    </Suspense>
  )
}
