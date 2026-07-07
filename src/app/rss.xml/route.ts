import { NextResponse } from 'next/server'

export async function GET() {
  const base = 'https://humanizer-site-production.up.railway.app'
  const now = new Date().toUTCString()

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>AI Humanizer</title>
    <link>${base}</link>
    <description>Free online AI text humanizer that rewrites ChatGPT, Gemini, and Claude output to bypass GPTZero, Turnitin AI, and Originality.ai detection. Bilingual English / Chinese.</description>
    <language>en</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${base}/rss.xml" rel="self" type="application/rss+xml"/>
    <item>
      <title>AI Humanizer - Make AI Text Undetectable, Free</title>
      <link>${base}</link>
      <guid>${base}/</guid>
      <pubDate>${now}</pubDate>
      <description>Paste AI text from ChatGPT, Gemini, Claude, or Copilot and get a natural-sounding rewrite in seconds. Engineered to pass GPTZero, Turnitin AI, Originality.ai, ZeroGPT, and Copyleaks.</description>
    </item>
    <item>
      <title>What is an AI Humanizer?</title>
      <link>${base}/?lang=en</link>
      <guid>${base}/#what</guid>
      <pubDate>${now}</pubDate>
      <description>An AI humanizer rewrites AI-generated text so it reads like a human wrote it. Targets statistical patterns AI detectors flag — sentence length uniformity, predictable word choices, low perplexity, list-like structure.</description>
    </item>
    <item>
      <title>About AI Humanizer</title>
      <link>${base}/about</link>
      <guid>${base}/about</guid>
      <pubDate>${now}</pubDate>
      <description>Learn about our methodology, privacy policy, and limitations. Built with DeepSeek large language model for human-like rewriting. Bilingual support. No signup, no tracking.</description>
    </item>
  </channel>
</rss>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}