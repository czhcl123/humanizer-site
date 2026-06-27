'use client'

import { Suspense, useState, useMemo } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import Footer from '../../components/Footer'

const t = {
  zh: {
    siteTitle: '🧮 实用计算器',
    pageTitle: '字数统计',
    pageSubtitle: '中英文实时统计，阅读时间估算',
    backHome: '← 返回首页',
    placeholder: '在此粘贴或输入文本...',
    clear: '清空',
    copy: '复制',
    copied: '已复制',
    words: '单词数',
    chinese: '中文字数',
    chars: '字符数（含空格）',
    charsNoSpace: '字符数（不含空格）',
    sentences: '句子数',
    paragraphs: '段落数',
    readingTime: '阅读时间（分钟）',
    switchLang: 'EN',
  },
  en: {
    siteTitle: '🧮 Tools',
    pageTitle: 'Word Counter',
    pageSubtitle: 'Real-time word, character & reading time count',
    backHome: '← Back to Home',
    placeholder: 'Paste or type text here...',
    clear: 'Clear',
    copy: 'Copy',
    copied: 'Copied!',
    words: 'Words',
    chinese: 'Chinese chars',
    chars: 'Characters',
    charsNoSpace: 'Characters (no spaces)',
    sentences: 'Sentences',
    paragraphs: 'Paragraphs',
    readingTime: 'Reading time (min)',
    switchLang: '中文',
  },
}

function u(key: keyof typeof t.en, lang: 'zh' | 'en') {
  return t[lang][key] as string
}

function WordCounterContent({ initialLang }: { initialLang?: 'zh' | 'en' }) {
  const searchParams = useSearchParams()
  const lang: 'zh' | 'en' = initialLang ?? (searchParams.get('lang') === 'zh' ? 'zh' : 'en')
  const pathname = usePathname()
  const nextLang: 'zh' | 'en' = lang === 'zh' ? 'en' : 'zh'

  const [text, setText] = useState('')
  const [copied, setCopied] = useState(false)

  const stats = useMemo(() => {
    const trimmed = text.trim()
    const words = trimmed ? (trimmed.match(/[a-zA-Z]+/g) || []).length : 0
    const chinese = (text.match(/[\u4e00-\u9fa5]/g) || []).length
    const characters = text.length
    const charactersNoSpaces = text.replace(/\s/g, '').length
    const sentences = trimmed ? trimmed.split(/[.!?。!?]+/).filter((s) => s.trim()).length : 0
    const paragraphs = trimmed ? trimmed.split(/\n+/).filter((p) => p.trim()).length : 0
    const enTime = words / 200
    const zhTime = chinese / 300
    const readingMinutes = Math.max(enTime, zhTime)
    const readingTime = readingMinutes < 1 ? 0 : Math.ceil(readingMinutes)
    return { words, chinese, characters, charactersNoSpaces, sentences, paragraphs, readingTime }
  }, [text])

  const copyText = async () => {
    if (!text) return
    await navigator.clipboard.writeText(text)
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

        {/* Input card */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={u('placeholder', lang)}
            rows={12}
            className="w-full px-4 py-3 text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all resize-y font-mono text-sm"
          />
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => setText('')}
              className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-md"
            >
              {u('clear', lang)}
            </button>
            <button
              onClick={copyText}
              disabled={!text}
              className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 disabled:opacity-40 text-gray-600 rounded-md"
            >
              {copied ? u('copied', lang) : u('copy', lang)}
            </button>
          </div>
        </div>

        {/* Stats card */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-4">
          <div className="space-y-3">
            <Stat label={u('words', lang)} value={stats.words} highlight />
            <Stat label={u('chinese', lang)} value={stats.chinese} highlight />
            <Stat label={u('chars', lang)} value={stats.characters} />
            <Stat label={u('charsNoSpace', lang)} value={stats.charactersNoSpaces} />
            <Stat label={u('sentences', lang)} value={stats.sentences} />
            <Stat label={u('paragraphs', lang)} value={stats.paragraphs} />
            <div className="pt-3 border-t border-gray-100">
              <Stat label={u('readingTime', lang)} value={stats.readingTime} highlight />
            </div>
          </div>
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

function Stat({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-500">{label}</span>
      <span className={`font-mono font-semibold ${highlight ? 'text-2xl text-orange-500' : 'text-lg text-gray-700'}`}>
        {value}
      </span>
    </div>
  )
}

export default function WordCounterClient({ initialLang }: { initialLang?: 'zh' | 'en' }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <WordCounterContent initialLang={initialLang} />
    </Suspense>
  )
}
