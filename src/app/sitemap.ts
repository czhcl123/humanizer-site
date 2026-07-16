import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://gpt-undetectable.com'
  const today = new Date().toISOString().split('T')[0]

  const pages = ['', '/essay-humanizer', '/turnitin-bypass', '/walterwrites', '/ai-detector', '/jiang-ai-lv', '/about']
  const priority = [1, 0.95, 0.95, 0.9, 0.9, 0.9, 0.7]
  const entries: MetadataRoute.Sitemap = []

  pages.forEach((slug, i) => {
    entries.push({
      url: `${base}${slug}`,
      lastModified: today,
      changeFrequency: slug === '/about' ? 'monthly' : 'weekly',
      priority: priority[i],
      alternates: {
        languages: {
          'en-US': `${base}${slug}`,
          'zh-CN': `${base}/zh${slug === '' ? '' : slug}`,
          'x-default': `${base}${slug}`,
        },
      },
    })
  })

  return entries
}