import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://humanizer-site-production.up.railway.app'
  const today = new Date().toISOString().split('T')[0]

  return [
    { url: base, lastModified: today, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/about`, lastModified: today, changeFrequency: 'monthly', priority: 0.7 },
  ]
}