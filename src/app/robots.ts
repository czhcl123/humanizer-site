import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: 'https://humanizer-site-production.up.railway.app/sitemap.xml',
    host: 'https://humanizer-site-production.up.railway.app',
  }
}