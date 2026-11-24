import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 — Page not found | AI Humanizer',
  robots: { index: false, follow: false },
}

/**
 * `global-not-found` replaces the old `not-found.tsx`, which rendered its own
 * <html>/<body> inside the root layout — two nested documents, invalid markup.
 * Next only picks this file up with `experimental.globalNotFound` set in
 * next.config.ts, which is why that flag is enabled there.
 */
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-gray-50 antialiased">
        <div className="text-center px-4">
          <div className="text-6xl mb-4">✨</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">404 — Page not found</h1>
          <p className="text-sm text-gray-500 mb-4">The page you are looking for does not exist.</p>
          <a
            href="/"
            className="inline-block px-4 py-2 bg-violet-600 text-white text-sm rounded-lg hover:bg-violet-700 transition-colors"
          >
            Go to AI Humanizer
          </a>
        </div>
      </body>
    </html>
  )
}
