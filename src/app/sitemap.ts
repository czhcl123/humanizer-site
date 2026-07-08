import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://humanizer-site-production.up.railway.app'
  const today = new Date().toISOString().split('T')[0]

  return [
    { url: base, lastModified: today, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/essay-humanizer`, lastModified: today, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${base}/turnitin-bypass`, lastModified: today, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${base}/walterwrites`, lastModified: today, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/ai-detector`, lastModified: today, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/jiang-ai-lv`, lastModified: today, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/about`, lastModified: today, changeFrequency: 'monthly', priority: 0.7 },
  ]
}