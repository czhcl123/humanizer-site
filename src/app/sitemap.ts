import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://tools-site-production.up.railway.app'
  const today = new Date().toISOString().split('T')[0]

  return [
    { url: base, lastModified: today, changeFrequency: 'weekly', priority: 1 },
    // 现有工具
    { url: `${base}/discount-calculator`, lastModified: today, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/bmi-calculator`, lastModified: today, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/countdown`, lastModified: today, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/lunar-calendar`, lastModified: today, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/unit-converter`, lastModified: today, changeFrequency: 'monthly', priority: 0.8 },
    // 新增工具(2026-06-27)
    { url: `${base}/qr-code-generator`, lastModified: today, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/word-counter`, lastModified: today, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/json-formatter`, lastModified: today, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/heic-to-jpg`, lastModified: today, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/invoice-generator`, lastModified: today, changeFrequency: 'monthly', priority: 0.9 },
  ]
}
