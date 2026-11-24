import { NextResponse } from 'next/server'
import { PAGES, pageUrl, type Lang } from '@/lib/site'

const BUILD_DATE = '2026-11-24'

function pubDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toUTCString()
}

export async function GET() {
  const base = 'https://gpt-undetectable.com'

  // Feed items use the real last-reviewed dates from the page inventory, not
  // `new Date()` at request time — a feed that republishes everything on every
  // build is a discardable signal for both readers and crawlers.
  const featured = [
    '',
    '/essay-humanizer',
    '/turnitin-bypass',
    '/ai-detector',
    '/jiang-ai-lv',
    '/bypass-test-methodology',
    '/privacy',
    '/glossary',
    '/limitations',
    '/citation-policy',
    '/changelog',
    '/about',
  ]

  const items = featured
    .map((slug) => PAGES.find((p) => p.slug === slug))
    .filter((p): p is (typeof PAGES)[number] => Boolean(p))
    .map((page) => {
      const url = pageUrl(page.slug, 'en' as Lang)
      const description =
        page.slug === ''
          ? 'Free AI text rewriting and heuristic AI detection tools. No signup, no installation, 5 submissions per IP per 24 hours.'
          : `${page.label.en} — part of the free AI Humanizer tool suite. Cloud-processed via DeepSeek. English and Simplified Chinese.`
      return `    <item>
      <title>${page.label.en} | AI Humanizer</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate(page.enModified)}</pubDate>
      <description>${description}</description>
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>AI Humanizer</title>
    <link>${base}</link>
    <description>Free AI text rewriting and heuristic detection tools. English and Simplified Chinese. No signup, no installation.</description>
    <language>en</language>
    <lastBuildDate>${pubDate(BUILD_DATE)}</lastBuildDate>
    <atom:link href="${base}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
