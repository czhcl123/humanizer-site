'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import Footer from '../../components/Footer'

const t = {
  zh: {
    siteTitle: '🧮 实用计算器',
    pageTitle: 'JSON格式化',
    pageSubtitle: '在线JSON美化、验证、压缩',
    backHome: '← 返回首页',
    inputLabel: '输入JSON',
    outputLabel: '格式化结果',
    placeholder: '在此粘贴JSON数据...',
    format: '格式化',
    minify: '压缩',
    validate: '验证',
    sample: '加载示例',
    clear: '清空',
    copy: '复制结果',
    copied: '已复制',
    indent: '缩进',
    valid: '✓ JSON有效',
    invalid: '✗ JSON无效',
    switchLang: 'EN',
  },
  en: {
    siteTitle: '🧮 Tools',
    pageTitle: 'JSON Formatter',
    pageSubtitle: 'Format, validate, and minify JSON online',
    backHome: '← Back to Home',
    inputLabel: 'Input JSON',
    outputLabel: 'Formatted result',
    placeholder: 'Paste JSON data here...',
    format: 'Format',
    minify: 'Minify',
    validate: 'Validate',
    sample: 'Load sample',
    clear: 'Clear',
    copy: 'Copy result',
    copied: 'Copied!',
    indent: 'Indent',
    valid: '✓ Valid JSON',
    invalid: '✗ Invalid JSON',
    switchLang: '中文',
  },
}

function u(key: keyof typeof t.en, lang: 'zh' | 'en') {
  return t[lang][key] as string
}

const SAMPLE = {
  name: 'Practical Tools',
  version: '0.1.0',
  tools: [
    { id: 1, name: 'QR Code Generator', url: '/qr-code-generator' },
    { id: 2, name: 'Word Counter', url: '/word-counter' },
    { id: 3, name: 'JSON Formatter', url: '/json-formatter' },
  ],
  stats: { tools: 10, traffic: 0, languages: ['zh', 'en'] },
}

function JsonFormatterContent({ initialLang }: { initialLang?: 'zh' | 'en' }) {
  const searchParams = useSearchParams()
  const lang: 'zh' | 'en' = initialLang ?? (searchParams.get('lang') === 'zh' ? 'zh' : 'en')
  const pathname = usePathname()
  const nextLang: 'zh' | 'en' = lang === 'zh' ? 'en' : 'zh'

  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [valid, setValid] = useState<boolean | null>(null)
  const [indent, setIndent] = useState(2)
  const [copied, setCopied] = useState(false)

  const tryParse = (text: string) => {
    try {
      const parsed = JSON.parse(text)
      setValid(true)
      setError('')
      return parsed
    } catch (e) {
      setValid(false)
      setError((e as Error).message)
      return null
    }
  }

  const format = () => {
    const parsed = tryParse(input)
    if (parsed !== null) setOutput(JSON.stringify(parsed, null, indent))
  }

  const minify = () => {
    const parsed = tryParse(input)
    if (parsed !== null) setOutput(JSON.stringify(parsed))
  }

  const validate = () => {
    tryParse(input)
  }

  const loadSample = () => {
    const text = JSON.stringify(SAMPLE, null, 0)
    setInput(text)
    setOutput(JSON.stringify(SAMPLE, null, indent))
    setValid(true)
    setError('')
  }

  const clear = () => {
    setInput('')
    setOutput('')
    setError('')
    setValid(null)
  }

  const copyOutput = async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
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

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <div className="flex items-center gap-1.5">
            <label className="text-xs text-gray-500">{u('indent', lang)}:</label>
            <select value={indent} onChange={(e) => setIndent(Number(e.target.value))} className="px-2 py-1.5 border border-gray-200 rounded-lg text-xs bg-white">
              <option value={2}>2</option>
              <option value={4}>4</option>
              <option value={0}>Tab</option>
            </select>
          </div>
          <button onClick={format} className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-medium rounded-md">{u('format', lang)}</button>
          <button onClick={minify} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded-md">{u('minify', lang)}</button>
          <button onClick={validate} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded-md">{u('validate', lang)}</button>
          <button onClick={loadSample} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded-md">{u('sample', lang)}</button>
          <button onClick={clear} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded-md">{u('clear', lang)}</button>
          {valid !== null && (
            <span className={`text-xs font-medium ${valid ? 'text-green-600' : 'text-red-500'}`}>
              {valid ? u('valid', lang) : `${u('invalid', lang)}: ${error}`}
            </span>
          )}
        </div>

        {/* Input */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-3">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-semibold text-gray-600">{u('inputLabel', lang)}</h3>
            <span className="text-xs text-gray-400">{input.length} chars</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={u('placeholder', lang)}
            rows={12}
            className="w-full font-mono text-xs px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            spellCheck={false}
          />
        </div>

        {/* Output */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-semibold text-gray-600">{u('outputLabel', lang)}</h3>
            <button onClick={copyOutput} disabled={!output} className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 text-gray-600 rounded">
              {copied ? u('copied', lang) : u('copy', lang)}
            </button>
          </div>
          <pre className="w-full min-h-[300px] font-mono text-xs px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 overflow-auto whitespace-pre-wrap break-all">
            {output || <span className="text-gray-300">{lang === 'zh' ? '结果将显示在这里' : 'Result will appear here'}</span>}
          </pre>
        </div>

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

export default function JsonFormatterClient({ initialLang }: { initialLang?: 'zh' | 'en' }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <JsonFormatterContent initialLang={initialLang} />
    </Suspense>
  )
}
