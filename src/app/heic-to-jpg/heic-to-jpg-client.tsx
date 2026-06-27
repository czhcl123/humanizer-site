'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import Footer from '../../components/Footer'

const t = {
  zh: {
    siteTitle: '🧮 实用计算器',
    pageTitle: 'HEIC转JPG',
    pageSubtitle: 'iPhone照片转JPG，100%本地处理',
    backHome: '← 返回首页',
    dropzone: '点击选择或拖拽HEIC文件',
    dropzoneSub: '支持.heic/HEIC，可批量',
    quality: 'JPG质量',
    converting: '转换中...',
    convert: (n: number) => `转换 ${n} 个文件`,
    downloadAll: '下载全部',
    clear: '清空',
    result: '转换结果',
    selected: (n: number) => `已选择 ${n} 个文件`,
    switchLang: 'EN',
  },
  en: {
    siteTitle: '🧮 Tools',
    pageTitle: 'HEIC to JPG',
    pageSubtitle: 'Convert iPhone HEIC photos to JPG, 100% local',
    backHome: '← Back to Home',
    dropzone: 'Click or drop HEIC files here',
    dropzoneSub: 'Supports .heic/HEIC, batch upload',
    quality: 'JPG quality',
    converting: 'Converting...',
    convert: (n: number) => `Convert ${n} file(s)`,
    downloadAll: 'Download all (ZIP)',
    clear: 'Clear',
    result: 'Results',
    selected: (n: number) => `${n} file(s) selected`,
    switchLang: '中文',
  },
}

function u(key: keyof typeof t.en, lang: 'zh' | 'en') {
  return t[lang][key] as string
}

function HeicToJpgContent({ initialLang }: { initialLang?: 'zh' | 'en' }) {
  const searchParams = useSearchParams()
  const lang: 'zh' | 'en' = initialLang ?? (searchParams.get('lang') === 'zh' ? 'zh' : 'en')
  const pathname = usePathname()
  const nextLang: 'zh' | 'en' = lang === 'zh' ? 'en' : 'zh'

  const [files, setFiles] = useState<File[]>([])
  const [converted, setConverted] = useState<{ name: string; url: string; size: number }[]>([])
  const [processing, setProcessing] = useState(false)
  const [quality, setQuality] = useState(0.92)
  const [dragOver, setDragOver] = useState(false)

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return
    const heic = Array.from(newFiles).filter((f) => /\.(heic|HEIC)$/i.test(f.name))
    setFiles((prev) => [...prev, ...heic])
  }

  const convert = async () => {
    if (files.length === 0) return
    setProcessing(true)
    setConverted([])
    try {
      const heic2any = (await import('heic2any')).default
      const results: { name: string; url: string; size: number }[] = []
      for (const file of files) {
        try {
          const result = await heic2any({ blob: file, toType: 'image/jpeg', quality })
          const blob = (Array.isArray(result) ? result[0] : result) as Blob
          const url = URL.createObjectURL(blob)
          const name = file.name.replace(/\.heic$/i, '.jpg')
          results.push({ name, url, size: blob.size })
        } catch (e) {
          console.error(`Failed to convert ${file.name}:`, e)
        }
      }
      setConverted(results)
    } catch (e) {
      alert((lang === 'zh' ? '转换失败: ' : 'Conversion failed: ') + (e as Error).message)
    }
    setProcessing(false)
  }

  const downloadAll = async () => {
    if (converted.length === 0) return
    const JSZip = (await import('jszip')).default
    const zip = new JSZip()
    for (const c of converted) {
      const blob = await (await fetch(c.url)).blob()
      zip.file(c.name, blob)
    }
    const blob = await zip.generateAsync({ type: 'blob' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `heic-to-jpg-${Date.now()}.zip`
    a.click()
    URL.revokeObjectURL(url)
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`
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

        {/* Dropzone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files) }}
          className={`bg-white rounded-xl p-8 shadow-sm border-2 border-dashed mb-4 text-center cursor-pointer transition ${dragOver ? 'border-orange-400 bg-orange-50' : 'border-gray-200'}`}
        >
          <input
            type="file"
            accept=".heic,.HEIC"
            multiple
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
            id="heic-input"
          />
          <label htmlFor="heic-input" className="cursor-pointer block">
            <div className="text-4xl mb-2">📱</div>
            <div className="text-base font-medium text-gray-700 mb-1">{u('dropzone', lang)}</div>
            <div className="text-xs text-gray-400">{u('dropzoneSub', lang)}</div>
          </label>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5">
              <label className="text-xs text-gray-500">{u('quality', lang)}:</label>
              <select value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="px-2 py-1.5 border border-gray-200 rounded-lg text-xs bg-white">
                <option value={1.0}>100%</option>
                <option value={0.92}>92%</option>
                <option value={0.85}>85%</option>
                <option value={0.75}>75%</option>
              </select>
            </div>
            <button
              onClick={convert}
              disabled={files.length === 0 || processing}
              className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white py-2 rounded-lg text-sm font-medium"
            >
              {processing ? u('converting', lang) : t[lang].convert(files.length)}
            </button>
            {converted.length > 1 && (
              <button onClick={downloadAll} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs rounded-lg">
                {u('downloadAll', lang)}
              </button>
            )}
            {(files.length > 0 || converted.length > 0) && (
              <button onClick={() => { setFiles([]); setConverted([]) }} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs rounded-lg">
                {u('clear', lang)}
              </button>
            )}
          </div>

          {files.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="text-xs font-semibold text-gray-600 mb-2">{t[lang].selected(files.length)}</div>
              <div className="space-y-1 text-xs text-gray-500 max-h-32 overflow-y-auto">
                {files.map((f, i) => (
                  <div key={i} className="flex justify-between">
                    <span className="truncate">{f.name}</span>
                    <span className="text-gray-400 ml-2">{formatSize(f.size)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {converted.length > 0 && (
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
            <h3 className="text-sm font-semibold text-gray-600 mb-3">{u('result', lang)} ({converted.length})</h3>
            <div className="space-y-2">
              {converted.map((c, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-gray-700 truncate">✓ {c.name}</div>
                    <div className="text-xs text-gray-400">{formatSize(c.size)}</div>
                  </div>
                  <a href={c.url} download={c.name} className="ml-2 px-2.5 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs rounded-md">
                    {lang === 'zh' ? '下载' : 'Download'}
                  </a>
                </div>
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

export default function HeicToJpgClient({ initialLang }: { initialLang?: 'zh' | 'en' }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <HeicToJpgContent initialLang={initialLang} />
    </Suspense>
  )
}
