'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

type DetectorResult = {
  ai_probability?: number
  human_probability?: number
  verdict?: string
  signals?: string[]
  explanation?: string
}

const MAX_CHARS = 3000

export default function EmbedDetector() {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<DetectorResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const boxRef = useRef<HTMLDivElement>(null)

  // Tell the hosting page how tall we are so the iframe can resize itself.
  const reportHeight = useCallback(() => {
    if (typeof window === 'undefined' || window.parent === window) return
    const height = Math.ceil(document.documentElement.getBoundingClientRect().height)
    window.parent.postMessage({ type: 'ai-humanizer-detector', height }, '*')
  }, [])

  useEffect(() => {
    reportHeight()
    if (!boxRef.current || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(reportHeight)
    ro.observe(boxRef.current)
    return () => ro.disconnect()
  }, [reportHeight])

  const submit = async () => {
    const value = text.trim()
    if (!value) {
      setError('Paste some text first.')
      return
    }
    if (value.length > MAX_CHARS) {
      setError(`Text exceeds ${MAX_CHARS.toLocaleString()} characters. Split it up and check each part.`)
      return
    }
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await fetch('/api/humanize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: value, lang: 'en', mode: 'detector' }),
      })
      if (!res.ok) throw new Error('The detector is busy right now. Please try again in a moment.')
      const data = await res.json()
      const parsed = typeof data.output === 'string' ? JSON.parse(data.output) : data.output
      if (!parsed || typeof parsed !== 'object') throw new Error('Unexpected response from the detector.')
      setResult(parsed as DetectorResult)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const score = typeof result?.ai_probability === 'number' ? Math.max(0, Math.min(100, result.ai_probability)) : null
  const band = score === null ? '' : score >= 70 ? 'likely-ai' : score <= 30 ? 'likely-human' : 'uncertain'
  const tone =
    band === 'likely-ai'
      ? { text: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200', bar: 'bg-red-500' }
      : band === 'likely-human'
        ? { text: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200', bar: 'bg-emerald-500' }
        : { text: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200', bar: 'bg-amber-500' }

  return (
    <div ref={boxRef} className="w-full bg-white text-gray-800">
      <div className="flex items-baseline justify-between gap-2 mb-1">
        <h1 className="text-sm font-semibold">AI detector</h1>
        <span className="text-[11px] text-gray-400">free · no signup</span>
      </div>
      <p className="text-[11px] text-gray-500 mb-2">Paste text to estimate how likely it is to be AI-generated.</p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        placeholder="Paste a paragraph or essay excerpt…"
        className="w-full resize-y rounded-lg border border-gray-300 p-2 text-xs leading-relaxed focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
        aria-label="Text to analyze"
      />

      <div className="mt-1 flex items-center justify-between gap-2 text-[11px] text-gray-400">
        <span>
          {text.length.toLocaleString()} / {MAX_CHARS.toLocaleString()}
        </span>
        <button
          type="button"
          onClick={submit}
          disabled={loading}
          className="rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Checking…' : 'Check AI score'}
        </button>
      </div>

      {error && <p className="mt-2 rounded-lg border border-red-200 bg-red-50 p-2 text-[11px] text-red-700">{error}</p>}

      {result && score !== null && (
        <div className={`mt-2 rounded-lg border ${tone.border} ${tone.bg} p-2`}>
          <div className="flex items-center justify-between gap-2">
            <span className={`text-[11px] font-semibold ${tone.text}`}>{result.verdict ?? 'Result'}</span>
            <span className={`text-sm font-bold ${tone.text}`}>{score}% AI</span>
          </div>
          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/70">
            <div className={`h-full ${tone.bar}`} style={{ width: `${score}%` }} />
          </div>
          {!!result.signals?.length && (
            <ul className="mt-1.5 space-y-0.5">
              {result.signals.slice(0, 3).map((s, i) => (
                <li key={i} className="text-[11px] leading-snug text-gray-600">
                  · {s}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <p className="mt-2 text-[11px] text-gray-400">
        <a
          href="https://gpt-undetectable.com/ai-detector?utm_source=embed&utm_medium=widget"
          target="_blank"
          rel="noopener"
          className="underline underline-offset-2 hover:text-violet-600"
        >
          Powered by AI Humanizer
        </a>{' '}
        — free AI detector &amp; humanizer, no signup.
      </p>
    </div>
  )
}
