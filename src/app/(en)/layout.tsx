import type { Metadata, Viewport } from 'next'
import { rootMetadata } from '@/lib/metadata'
import { SiteJsonLd } from '@/components/SiteJsonLd'
import '../globals.css'

export const metadata: Metadata = rootMetadata('en')

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#8b5cf6',
}

/**
 * English root layout.
 *
 * `lang` is a static literal here rather than being read from a middleware
 * response header. The App Router renders a layout for cached HTML without the
 * request's middleware headers, so reading `x-pathname` there left every page
 * (including /zh) with `<html lang="en">`. Each language now owns a root
 * layout, which makes the attribute correct in the static output and removes
 * the last request-time dependency that forced dynamic rendering.
 */
export default function EnRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta name="build-id" content="b6d2b9a" />
        <meta name="site-version" content="v0.3.0" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="AI Humanizer" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.svg" />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM-friendly site index" />
        <link rel="alternate" type="application/rss+xml" title="AI Humanizer RSS Feed" href="/rss.xml" />
      </head>
      <body className="min-h-full flex flex-col antialiased bg-gray-50">
        <SiteJsonLd />
        {children}
      </body>
    </html>
  )
}
