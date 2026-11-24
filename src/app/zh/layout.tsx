import type { Metadata, Viewport } from 'next'
import { rootMetadata } from '@/lib/metadata'
import { SiteJsonLd } from '@/components/SiteJsonLd'
import '../globals.css'

export const metadata: Metadata = rootMetadata('zh')

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#8b5cf6',
}

/** Chinese root layout: static `lang="zh-CN"`, no request-time headers. */
export default function ZhRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
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
