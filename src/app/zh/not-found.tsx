import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '页面未找到 | AI Humanizer',
  robots: { index: false, follow: false },
}

/** Chinese 404, rendered inside the zh root layout so lang stays zh-CN. */
export default function ZhNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <div className="text-6xl mb-4">✨</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">404 — 页面不存在</h1>
        <p className="text-sm text-gray-500 mb-4">你访问的页面不存在,或者已经被移动。</p>
        <a
          href="/zh"
          className="inline-block px-4 py-2 bg-violet-600 text-white text-sm rounded-lg hover:bg-violet-700 transition-colors"
        >
          返回首页
        </a>
      </div>
    </div>
  )
}
