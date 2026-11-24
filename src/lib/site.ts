/**
 * Single source of truth for URLs, page inventory, and real modification dates.
 *
 * `lastModified` used to be `new Date()` at build time, which told Google that
 * all ~35 URLs changed on every deploy — a well-known way to get sitemap
 * lastmod ignored entirely. These dates come from the actual last commit that
 * touched each page file; bump the value when you meaningfully change a page.
 */

export const SITE_URL = 'https://gpt-undetectable.com'
export const SITE_NAME = 'AI Humanizer'
export const SITE_LOCALE: Record<Lang, string> = { en: 'en_US', zh: 'zh_CN' }

export type Lang = 'en' | 'zh'

export interface PageEntry {
  /** Path without the `/zh` prefix, '' for the home page. */
  slug: string
  /** ISO date (YYYY-MM-DD) of the last real content change. */
  enModified: string
  /** `null` when there is no Chinese mirror. */
  zhModified: string | null
  priority: number
  changeFrequency: 'daily' | 'weekly' | 'monthly'
  /** Breadcrumb label per language. */
  label: Record<Lang, string>
}

export const PAGES: PageEntry[] = [
  {
    slug: '',
    enModified: '2026-11-06',
    zhModified: '2026-10-20',
    priority: 1,
    changeFrequency: 'weekly',
    label: { en: 'Home', zh: '首页' },
  },
  {
    slug: '/essay-humanizer',
    enModified: '2026-11-06',
    zhModified: '2026-11-06',
    priority: 0.95,
    changeFrequency: 'weekly',
    label: { en: 'Essay Humanizer', zh: '论文改写器' },
  },
  {
    slug: '/turnitin-bypass',
    enModified: '2026-11-06',
    zhModified: '2026-07-28',
    priority: 0.95,
    changeFrequency: 'weekly',
    label: { en: 'Turnitin Bypass', zh: 'Turnitin 绕过' },
  },
  {
    slug: '/bypass-ai',
    enModified: '2026-11-06',
    zhModified: '2026-11-06',
    priority: 0.95,
    changeFrequency: 'weekly',
    label: { en: 'Bypass AI Detection', zh: '绕过 AI 检测' },
  },
  {
    slug: '/walterwrites',
    enModified: '2026-11-05',
    zhModified: '2026-11-05',
    priority: 0.9,
    changeFrequency: 'weekly',
    label: { en: 'Walter Writes Style Rewriter', zh: 'Walter Writes 风格改写' },
  },
  {
    slug: '/walterwrites-vs-undetectable',
    enModified: '2026-11-05',
    zhModified: '2026-11-06',
    priority: 0.9,
    changeFrequency: 'weekly',
    label: { en: 'Walter Writes vs Undetectable', zh: 'Walter Writes 对比测试' },
  },
  {
    slug: '/originality-ai-bypass',
    enModified: '2026-11-08',
    zhModified: '2026-11-08',
    priority: 0.9,
    changeFrequency: 'weekly',
    label: { en: 'Originality.ai Bypass', zh: 'Originality.ai 绕过' },
  },
  {
    slug: '/ai-detector',
    enModified: '2026-11-06',
    zhModified: '2026-11-04',
    priority: 0.9,
    changeFrequency: 'weekly',
    label: { en: 'AI Detector', zh: 'AI 检测器' },
  },
  {
    slug: '/jiang-ai-lv',
    enModified: '2026-11-06',
    zhModified: '2026-11-05',
    priority: 0.9,
    changeFrequency: 'weekly',
    label: { en: 'Jiang AI LV (降 AI 率)', zh: '降 AI 率' },
  },
  {
    slug: '/essay-writer-bypass-turnitin',
    enModified: '2026-11-06',
    zhModified: '2026-11-05',
    priority: 0.9,
    changeFrequency: 'weekly',
    label: { en: 'Essay Writer That Bypasses Turnitin', zh: '论文写作 + 过 Turnitin' },
  },
  {
    slug: '/gptzero-bypass',
    enModified: '2026-11-06',
    zhModified: '2026-11-05',
    priority: 0.9,
    changeFrequency: 'weekly',
    label: { en: 'GPTZero Bypass', zh: 'GPTZero 绕过' },
  },
  {
    slug: '/humanize-ai-text',
    enModified: '2026-11-06',
    zhModified: '2026-11-05',
    priority: 0.9,
    changeFrequency: 'weekly',
    label: { en: 'Humanize AI Text', zh: 'Humanize AI 文本' },
  },
  {
    slug: '/quillbot-bypass',
    enModified: '2026-11-06',
    zhModified: '2026-11-05',
    priority: 0.9,
    changeFrequency: 'weekly',
    label: { en: 'QuillBot Bypass', zh: 'QuillBot 绕过' },
  },
  {
    slug: '/pricing',
    enModified: '2026-11-08',
    zhModified: '2026-11-09',
    priority: 0.85,
    changeFrequency: 'monthly',
    label: { en: 'Pricing', zh: '定价' },
  },
  {
    slug: '/cost-comparison',
    enModified: '2026-11-08',
    zhModified: '2026-11-08',
    priority: 0.85,
    changeFrequency: 'monthly',
    label: { en: 'Cost Comparison', zh: '价格对比' },
  },
  {
    slug: '/bypass-test-methodology',
    enModified: '2026-11-06',
    zhModified: '2026-11-05',
    priority: 0.7,
    changeFrequency: 'monthly',
    label: { en: 'Bypass Test Methodology', zh: '测试方法' },
  },
  {
    slug: '/about',
    enModified: '2026-07-28',
    zhModified: '2026-10-20',
    priority: 0.7,
    changeFrequency: 'monthly',
    label: { en: 'About', zh: '关于' },
  },
  {
    slug: '/embed',
    enModified: '2026-11-04',
    zhModified: null,
    priority: 0.5,
    changeFrequency: 'monthly',
    label: { en: 'Embed the Detector', zh: '嵌入检测器' },
  },
]

/** Canonical absolute URL for a page in a given language. */
export function pageUrl(slug: string, lang: Lang): string {
  return lang === 'zh' ? `${SITE_URL}/zh${slug}` : `${SITE_URL}${slug}`
}

/** Path (no origin) for a page in a given language — safe for <Link href>. */
export function pagePath(slug: string, lang: Lang): string {
  return lang === 'zh' ? `/zh${slug}` : slug === '' ? '/' : slug
}

/** hreflang map for a page, honouring pages that have no Chinese mirror. */
export function languageAlternates(slug: string) {
  const entry = PAGES.find((p) => p.slug === slug)
  if (!entry || entry.zhModified === null) {
    return { 'x-default': pageUrl(slug, 'en') }
  }
  return {
    'en-US': pageUrl(slug, 'en'),
    'zh-CN': pageUrl(slug, 'zh'),
    'x-default': pageUrl(slug, 'en'),
  }
}

/**
 * Two-level BreadcrumbList for a single page. A site-wide breadcrumb that
 * listed every tool as position 2..7 was not a trail Google could use; this is.
 */
export function breadcrumbSchema(slug: string, lang: Lang) {
  const entry = PAGES.find((p) => p.slug === slug)
  const label = entry ? entry.label[lang] : slug
  const items =
    slug === ''
      ? [{ name: label, item: pageUrl('', lang) }]
      : [
          { name: lang === 'zh' ? '首页' : 'Home', item: pageUrl('', lang) },
          { name: label, item: pageUrl(slug, lang) },
        ]
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.item,
    })),
  }
}
