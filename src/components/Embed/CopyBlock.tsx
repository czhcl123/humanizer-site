'use client'

import { useState } from 'react'

export default function CopyBlock({ code, label = 'Copy code' }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="relative">
      <pre className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-900 p-3 pr-24 text-[11px] leading-relaxed text-gray-100">
        <code>{code}</code>
      </pre>
      <button
        type="button"
        onClick={copy}
        className="absolute right-2 top-2 rounded-md bg-white/10 px-2 py-1 text-[11px] font-medium text-white hover:bg-white/20"
      >
        {copied ? 'Copied' : label}
      </button>
    </div>
  )
}
