import { NextResponse } from 'next/server'

export async function GET() {
  const base = 'https://gpt-undetectable.com'
  const now = new Date().toUTCString()

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>AI Humanizer Suite</title>
    <link>${base}</link>
    <description>Free online AI text tool suite — humanizer, essay rewriter, Turnitin bypass, Walter Writes style rewriter, AI detector, and Chinese AI rate reducer. Bilingual English / Chinese.</description>
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
      <title>AI Essay Humanizer - Bypass GPTZero, Turnitin, Originality.ai</title>
      <link>${base}/essay-humanizer</link>
      <guid>${base}/essay-humanizer</guid>
      <pubDate>${now}</pubDate>
      <description>Specifically tuned for student essays. Preserves thesis, citations, dates, and numbers. 85-95% pass rate on English essays up to 3,000 characters.</description>
    </item>
    <item>
      <title>Turnitin AI Bypass - Free Online Turnitin Detection Bypass</title>
      <link>${base}/turnitin-bypass</link>
      <guid>${base}/turnitin-bypass</guid>
      <pubDate>${now}</pubDate>
      <description>Specifically engineered against Turnitin's AI detection algorithm: sentence-level perplexity, burstiness, AI vocabulary density, predictable paragraph transitions. Calibrated weekly.</description>
    </item>
    <item>
      <title>Walterwrites AI - Rewrite in Walter Writes Style</title>
      <link>${base}/walterwrites</link>
      <guid>${base}/walterwrites</guid>
      <pubDate>${now}</pubDate>
      <description>Rewrite AI text in the natural Walter Writes style — short paragraphs, conversational, parenthetical asides, direct opinions. The style AI detectors most often misclassify as human.</description>
    </item>
    <item>
      <title>AI Detector - Free AI Content Detection Tool</title>
      <link>${base}/ai-detector</link>
      <guid>${base}/ai-detector</guid>
      <pubDate>${now}</pubDate>
      <description>Detect if text is AI-generated. Based on the same principles as GPTZero, Originality.ai, ZeroGPT. Returns AI probability score, verdict, and 5 detailed detection signals.</description>
    </item>
    <item>
      <title>降 AI 率 - 免费中文论文 AI 率降低工具</title>
      <link>${base}/jiang-ai-lv</link>
      <guid>${base}/jiang-ai-lv</guid>
      <pubDate>${now}</pubDate>
      <description>免费在线降低中文论文 AI 率。改写知网 AIGC、维普、GPTZero 中文、ZeroGPT 中文都识别不出的 AI 八股词,保留论点、引用、数据。</description>
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