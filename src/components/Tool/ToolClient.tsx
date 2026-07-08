'use client'

import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Footer from '../Footer'

const MAX_CHARS = 3000

export type ToolMode = 'generic' | 'essay' | 'turnitin' | 'walterwrites' | 'chinese' | 'detector'

export interface ToolI18n {
  // Brand
  brand: string
  // Header
  homeLabel: string
  // Hero
  heroBadge: string
  heroTitle: string
  heroSubtitle: string
  heroTag1: string
  heroTag2: string
  heroTag3: string
  heroTag4: string
  // Tool
  inputLabel: string
  inputPlaceholder: string
  outputLabel: string
  outputPlaceholder: string
  actionLabel: string
  actionLoading: string
  copy: string
  copied: string
  clear: string
  paste: string
  charCount: string
  rateLimit: string
  errorEmpty: string
  errorTooLong: string
  errorNetwork: string
  errorApi: string
  // Detector specific
  verdictLabel: string
  verdictHuman: string
  verdictAi: string
  verdictUncertain: string
  signalsLabel: string
  explanationLabel: string
  // Sections
  samplesTitle: string
  featuresTitle: string
  whatTitle: string
  whatBody: string
  howTitle: string
  howBody: string
  trustTitle: string
  trustBody: string
  ctaTitle: string
  ctaBody: string
  faqTitle: string
  faqList: Array<{ q: string; a: string }>
  // Trust refs (optional, fallback ok)
  refsTitle?: string
  refs?: Array<{ name: string; url: string }>
  // Features (4 cards)
  features: Array<{ icon: string; title: string; body: string; color: string }>
  // Samples
  samples: Array<{ label: string; text: string }>
  // Related tools at footer
  relatedTitle: string
  related: Array<{ href: string; title: string; desc: string }>
}

interface Props {
  mode: ToolMode
  initialLang?: 'zh' | 'en'
  i18n: { zh: ToolI18n; en: ToolI18n }
}

function ToolContent({ mode, initialLang, i18n }: Props) {
  const searchParams = useSearchParams()
  const rawLang = searchParams.get('lang')
  const lang: 'zh' | 'en' = initialLang ?? (rawLang === 'zh' ? 'zh' : 'en')
  const t = i18n[lang]
  const isZh = lang === 'zh'
  const nextLang = isZh ? 'en' : 'zh'

  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [dailyCount, setDailyCount] = useState(0)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const tooLong = input.length > MAX_CHARS
  const canSubmit = !!input.trim() && !tooLong && !loading && dailyCount < 5

  useEffect(() => {
    try {
      const key = `humanizer_daily_${new Date().toISOString().split('T')[0]}`
      const raw = localStorage.getItem(key)
      if (raw) setDailyCount(parseInt(raw, 10) || 0)
    } catch {}
  }, [])

  const trackSubmit = () => {
    try {
      const key = `humanizer_daily_${new Date().toISOString().split('T')[0]}`
      const next = dailyCount + 1
      localStorage.setItem(key, String(next))
      setDailyCount(next)
    } catch {}
  }

  const handleSubmit = async () => {
    if (!input.trim()) { setError(t.errorEmpty); return }
    if (tooLong) { setError(t.errorTooLong); return }
    if (dailyCount >= 5) { setError(t.rateLimit); return }
    setError(null)
    setLoading(true)
    setOutput('')
    try {
      const res = await fetch('/api/humanize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input, lang, mode }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || t.errorApi)
      }
      const data = await res.json()
      if (mode === 'detector') {
        // data.output is the parsed JSON
        setOutput(JSON.stringify(data.output, null, 2))
      } else {
        setOutput(data.output || '')
      }
      trackSubmit()
    } catch (e: any) {
      setError(e?.message || t.errorNetwork)
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    if (!output) return
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  const handleClear = () => { setInput(''); setOutput(''); setError(null); textareaRef.current?.focus() }
  const handleSample = (sampleText: string) => { setInput(sampleText); setOutput(''); setError(null); textareaRef.current?.focus() }
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      if (text) setInput(text)
    } catch {}
  }

  // For detector mode, parse JSON output to render visually
  const detectorResult = useMemo(() => {
    if (mode !== 'detector' || !output) return null
    try { return JSON.parse(output) } catch { return null }
  }, [mode, output])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href={`/?lang=${lang}`} className="flex-shrink-0 flex items-center gap-1.5 text-base font-bold text-violet-600 hover:text-violet-700 transition-colors">
            <span className="text-xl">✦</span>
            <span className="hidden sm:inline text-sm">{t.brand}</span>
          </Link>
          <div className="flex-1" />
          <Link href={`/?lang=${nextLang}`} title={isZh ? 'Switch to English' : '切换到中文'} className="flex-shrink-0 flex items-center gap-1 text-xs px-3 py-1.5 border border-gray-200 rounded-full hover:bg-gray-50 hover:border-violet-300 transition-colors">
            <span>🌐</span>
            <span className="hidden sm:inline">{isZh ? 'EN' : '中文'}</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6 space-y-6">
        {/* Hero */}
        <section className="bg-gradient-to-br from-violet-50 via-white to-purple-50 rounded-2xl p-6 border border-violet-100 shadow-sm">
          <div className="text-center">
            <div className="text-3xl mb-2">{t.heroBadge}</div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">{t.heroTitle}</h1>
            <p className="text-sm text-gray-600 mb-4 max-w-xl mx-auto leading-relaxed">{t.heroSubtitle}</p>
            <div className="flex flex-wrap justify-center gap-2 text-xs">
              <span className="px-3 py-1 bg-white border border-violet-200 text-violet-700 rounded-full">{t.heroTag1}</span>
              <span className="px-3 py-1 bg-white border border-violet-200 text-violet-700 rounded-full">{t.heroTag2}</span>
              <span className="px-3 py-1 bg-white border border-violet-200 text-violet-700 rounded-full">{t.heroTag3}</span>
              <span className="px-3 py-1 bg-white border border-violet-200 text-violet-700 rounded-full">{t.heroTag4}</span>
            </div>
          </div>
        </section>

        {/* Tool */}
        <section className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="space-y-4">
            <div>
              <label htmlFor="input" className="block text-sm font-semibold text-gray-800 mb-2">{t.inputLabel}</label>
              <textarea
                id="input"
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.inputPlaceholder}
                rows={8}
                className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-300 resize-y"
              />
              <div className="flex items-center justify-between mt-2 text-xs">
                <span className={tooLong ? 'text-red-500' : 'text-gray-400'}>{input.length} / {MAX_CHARS} {t.charCount}</span>
                <div className="flex gap-2">
                  <button onClick={handlePaste} className="text-violet-600 hover:text-violet-700 hover:underline">{t.paste}</button>
                  <button onClick={handleClear} className="text-gray-400 hover:text-gray-600">{t.clear}</button>
                </div>
              </div>
            </div>

            <button onClick={handleSubmit} disabled={!canSubmit} className="w-full bg-violet-600 hover:bg-violet-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors text-sm">
              {loading ? t.actionLoading : t.actionLabel}
            </button>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-lg">{error}</div>
            )}

            {(output || loading) && (
              <div>
                <label htmlFor="output" className="block text-sm font-semibold text-gray-800 mb-2">{t.outputLabel}</label>
                {mode === 'detector' && detectorResult ? (
                  <div className="space-y-3">
                    <div className={`p-4 rounded-lg border-2 ${
                      detectorResult.verdict === 'Likely AI' || detectorResult.verdict === '可能 AI' ? 'bg-red-50 border-red-300' :
                      detectorResult.verdict === 'Likely Human' || detectorResult.verdict === '可能人类' ? 'bg-emerald-50 border-emerald-300' :
                      'bg-amber-50 border-amber-300'
                    }`}>
                      <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">{t.verdictLabel}</div>
                      <div className="text-xl font-bold text-gray-800 mb-2">{detectorResult.verdict}</div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <div className="text-xs text-gray-500 mb-1">AI</div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-red-500" style={{ width: `${detectorResult.ai_probability}%` }} />
                          </div>
                          <div className="text-xs font-semibold text-gray-700 mt-1">{detectorResult.ai_probability}%</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">{isZh ? '人类' : 'Human'}</div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500" style={{ width: `${detectorResult.human_probability}%` }} />
                          </div>
                          <div className="text-xs font-semibold text-gray-700 mt-1">{detectorResult.human_probability}%</div>
                        </div>
                      </div>
                    </div>
                    {detectorResult.signals && detectorResult.signals.length > 0 && (
                      <div className="bg-white border border-gray-200 rounded-lg p-3">
                        <div className="text-xs font-semibold text-gray-700 mb-2">{t.signalsLabel}</div>
                        <ul className="space-y-1 text-sm text-gray-600">
                          {detectorResult.signals.map((s: string, i: number) => <li key={i}>• {s}</li>)}
                        </ul>
                      </div>
                    )}
                    {detectorResult.explanation && (
                      <div className="bg-white border border-gray-200 rounded-lg p-3">
                        <div className="text-xs font-semibold text-gray-700 mb-1">{t.explanationLabel}</div>
                        <p className="text-sm text-gray-600 leading-relaxed">{detectorResult.explanation}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <textarea id="output" value={output} readOnly placeholder={t.outputPlaceholder} rows={8} className="w-full p-3 text-sm border border-violet-200 bg-violet-50/30 rounded-lg resize-y focus:outline-none" />
                    {output && (
                      <div className="flex items-center justify-end mt-2">
                        <button onClick={handleCopy} className="text-xs px-3 py-1.5 bg-violet-100 text-violet-700 rounded-full hover:bg-violet-200 transition-colors">
                          {copied ? `✓ ${t.copied}` : t.copy}
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Samples */}
        <section className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-base font-bold text-gray-800 mb-3">{t.samplesTitle}</h2>
          <div className="space-y-2">
            {t.samples.map((s, i) => (
              <button key={i} onClick={() => handleSample(s.text)} className="block w-full text-left p-3 bg-gray-50 hover:bg-violet-50 border border-gray-200 hover:border-violet-200 rounded-lg transition-colors text-sm">
                <div className="font-medium text-violet-700 text-xs mb-1">{s.label}</div>
                <div className="text-gray-600 text-xs line-clamp-2">{s.text}</div>
              </button>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-4">{t.featuresTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {t.features.map((f, i) => (
              <div key={i} className={`bg-gradient-to-br ${f.color} rounded-xl p-4 border`}>
                <div className="text-2xl mb-2">{f.icon}</div>
                <div className="font-semibold text-gray-800 mb-1 text-sm">{f.title}</div>
                <div className="text-xs text-gray-600 leading-relaxed">{f.body}</div>
              </div>
            ))}
          </div>
        </section>

        {/* What */}
        <section className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-3">{t.whatTitle}</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{t.whatBody}</p>
        </section>

        {/* How */}
        <section className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-3">{t.howTitle}</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{t.howBody}</p>
        </section>

        {/* Trust */}
        <section className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-3">{t.trustTitle}</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{t.trustBody}</p>
        </section>

        {/* Refs (optional) */}
        {t.refs && t.refs.length > 0 && (
          <section className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 border border-violet-200 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-3">{t.refsTitle}</h2>
            <ul className="space-y-2 text-sm">
              {t.refs.map((r, i) => (
                <li key={i}>
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:text-violet-700 hover:underline">{r.name} →</a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* FAQ */}
        <section className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-4">{t.faqTitle}</h2>
          <div className="space-y-4">
            {t.faqList.map((f, i) => (
              <div key={i}>
                <h3 className="text-base font-semibold text-gray-800 mb-1">{f.q}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-4">
          <h2 className="text-lg font-bold text-gray-800 mb-2">{t.ctaTitle}</h2>
          <p className="text-sm text-gray-500">{t.ctaBody}</p>
        </section>

        {/* Related tools */}
        <section className="border-t border-gray-200 pt-6">
          <h2 className="text-xs text-gray-400 uppercase tracking-wide mb-3 font-medium">{t.relatedTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {t.related.map((r, i) => (
              <Link key={i} href={`${r.href}?lang=${lang}`} className="block p-3 bg-white border border-gray-200 hover:border-violet-300 rounded-lg transition-colors">
                <div className="font-semibold text-violet-700 text-sm mb-1">{r.title} →</div>
                <div className="text-xs text-gray-500 leading-relaxed">{r.desc}</div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </div>
  )
}

export default function ToolClient(props: Props) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <ToolContent {...props} />
    </Suspense>
  )
}