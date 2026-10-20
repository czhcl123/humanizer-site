import { MetadataRoute } from 'next'

const base = 'https://gpt-undetectable.com'

const PAGES: { slug: string; priority: number }[] = [
  { slug: '', priority: 1 },
  { slug: '/essay-humanizer', priority: 0.95 },
  { slug: '/turnitin-bypass', priority: 0.95 },
  { slug: '/bypass-ai', priority: 0.95 },
  { slug: '/walterwrites', priority: 0.9 },
  { slug: '/walterwrites-vs-undetectable', priority: 0.9 },
  { slug: '/originality-ai-bypass', priority: 0.9 },
  { slug: '/ai-detector', priority: 0.9 },
  { slug: '/jiang-ai-lv', priority: 0.9 },
  { slug: '/essay-writer-bypass-turnitin', priority: 0.9 },
  { slug: '/gptzero-bypass', priority: 0.9 },
  { slug: '/humanize-ai-text', priority: 0.9 },
  { slug: '/quillbot-bypass', priority: 0.9 },
  { slug: '/bypass-test-methodology', priority: 0.7 },
  { slug: '/about', priority: 0.7 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date().toISOString().split('T')[0]
  const entries: MetadataRoute.Sitemap = []

  for (const { slug, priority } of PAGES) {
    const en = `${base}${slug}`
    const zh = `${base}/zh${slug}`
    const alternates = {
      languages: { 'en-US': en, 'zh-CN': zh, 'x-default': en },
    }
    const changeFrequency = slug === '/about' ? ('monthly' as const) : ('weekly' as const)

    entries.push({ url: en, lastModified: today, changeFrequency, priority, alternates })
    // Chinese mirror: self-canonical translation, discoverable through hreflang + internal links.
    entries.push({
      url: zh,
      lastModified: today,
      changeFrequency,
      priority: Math.max(0.5, priority - 0.1),
      alternates,
    })
  }

  // English-only utility page (no zh mirror).
  entries.push({
    url: `${base}/embed`,
    lastModified: today,
    changeFrequency: 'monthly',
    priority: 0.5,
  })

  return entries
}
