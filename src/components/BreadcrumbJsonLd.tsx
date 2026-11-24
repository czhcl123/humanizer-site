import { SITE_URL, pageUrl, pagePath, breadcrumbSchema, type Lang } from '@/lib/site'

/**
 * Per-page BreadcrumbList. Replaces the single site-wide trail that listed
 * every tool as positions 2–7 on every URL — that is not a breadcrumb Google
 * can render in results, because it does not describe the page it sits on.
 */
export function BreadcrumbJsonLd({ slug, lang }: { slug: string; lang: Lang }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(slug, lang)) }}
    />
  )
}

export { SITE_URL, pageUrl, pagePath }
