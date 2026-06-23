import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://tools-site-khaki-seven.vercel.app'
  const today = new Date().toISOString().split('T')[0]

  return [
    { url: base, lastModified: today, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/discount-calculator`, lastModified: today, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/bmi-calculator`, lastModified: today, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/countdown`, lastModified: today, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/lunar-calendar`, lastModified: today, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/unit-converter`, lastModified: today, changeFrequency: 'monthly', priority: 0.8 },
  ]
}