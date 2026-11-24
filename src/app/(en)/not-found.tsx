import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page not found | AI Humanizer',
  robots: { index: false, follow: false },
}

/**
 * The App Router needs a `not-found` boundary inside a route group to answer
 * unmatched paths under that group's root layout. This one keeps the English
 * document shell (lang="en"); zh has its own copy.
 */
export default function EnNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
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
    </div>
  )
}
