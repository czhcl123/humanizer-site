import { SITE_NAME, SITE_URL, pageUrl, type Lang } from '@/lib/site'

/** Topic tags for the pages that emit TechArticle structured data. */
const aboutBySlug: Record<string, string[]> = {
  '/changelog': [
    'Product changelog',
    'Site content accuracy',
    'AI text rewriting',
    'Heuristic AI detection',
  ],
  '/limitations': [
    'Product limitations',
    'Rate limits',
    'Heuristic AI detection',
    'Academic integrity',
  ],
  '/citation-policy': [
    'Citation policy',
    'Source attribution',
    'Unverified pass-rate observations',
    'Heuristic AI detection',
  ],
}

/**
 * TechArticle structured data for the factual reference pages. `datePublished`
 * and `dateModified` are fixed to the last content review date rather than the
 * build date, so a redeploy does not silently claim new editorial work.
 */
export function ArticleJsonLd({
  slug,
  lang,
  title,
  description,
}: {
  slug: string
  lang: Lang
  title: string
  description: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: title,
    description,
    datePublished: '2026-11-24',
    dateModified: '2026-11-24',
    author: {
      '@type': 'Person',
      name: 'czhcl123',
      url: 'https://github.com/czhcl123',
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    inLanguage: lang === 'zh' ? 'zh-CN' : 'en',
    mainEntityOfPage: pageUrl(slug, lang),
    about: aboutBySlug[slug] ?? ['AI text rewriting', 'Heuristic AI detection'],
  }
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  )
}
