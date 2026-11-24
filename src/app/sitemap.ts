import { MetadataRoute } from 'next'
import { PAGES, pageUrl } from '@/lib/site'

/**
 * Every entry used `new Date()` as lastModified, so all ~35 URLs claimed to
 * change on every deploy. Google's documented behaviour is to ignore an
 * unreliable lastmod, which is why recrawl scheduling ignored this sitemap.
 * Dates now come from `PAGES`, where they are the real last-change dates.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const page of PAGES) {
    const en = pageUrl(page.slug, 'en')
    const alternates =
      page.zhModified === null
        ? { languages: { 'x-default': en } }
        : {
            languages: {
              'en-US': en,
              'zh-CN': pageUrl(page.slug, 'zh'),
              'x-default': en,
            },
          }

    entries.push({
      url: en,
      lastModified: page.enModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates,
    })

    if (page.zhModified !== null) {
      entries.push({
        url: pageUrl(page.slug, 'zh'),
        lastModified: page.zhModified,
        changeFrequency: page.changeFrequency,
        priority: Math.max(0.5, Math.round((page.priority - 0.1) * 100) / 100),
        alternates,
      })
    }
  }

  return entries
}
