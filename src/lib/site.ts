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
    enModified: '2026-11-24',
    zhModified: '2026-11-24',
    priority: 1,
    changeFrequency: 'weekly',
    label: { en: 'Home', zh: '首页' },
  },
  {
    slug: '/essay-humanizer',
    enModified: '2026-11-24',
    zhModified: '2026-11-24',
    priority: 0.95,
    changeFrequency: 'weekly',
    label: { en: 'Essay Humanizer', zh: '论文改写器' },
  },
  {
    slug: '/turnitin-bypass',
    enModified: '2026-11-24',
    zhModified: '2026-11-24',
    priority: 0.95,
    changeFrequency: 'weekly',
    label: { en: 'Turnitin writing guidance', zh: 'Turnitin 写作说明' },
  },
  {
    slug: '/bypass-ai',
    enModified: '2026-11-24',
    zhModified: '2026-11-24',
    priority: 0.95,
    changeFrequency: 'weekly',
    label: { en: 'Why AI detectors are unreliable', zh: 'AI 检测器为什么不可靠' },
  },
  {
    slug: '/walterwrites',
    enModified: '2026-11-24',
    zhModified: '2026-11-24',
    priority: 0.9,
    changeFrequency: 'weekly',
    label: { en: 'Walter Writes Style Rewriter', zh: 'Walter Writes 风格改写' },
  },
  {
    slug: '/walterwrites-vs-undetectable',
    enModified: '2026-11-24',
    zhModified: '2026-11-24',
    priority: 0.9,
    changeFrequency: 'weekly',
    label: { en: 'Walter Writes style comparison', zh: 'Walter Writes 风格对比说明' },
  },
  {
    slug: '/originality-ai-bypass',
    enModified: '2026-11-24',
    zhModified: '2026-11-24',
    priority: 0.9,
    changeFrequency: 'weekly',
    label: { en: 'Originality.ai detector reliability', zh: 'Originality.ai 检测说明' },
  },
  {
    slug: '/ai-detector',
    enModified: '2026-11-24',
    zhModified: '2026-11-24',
    priority: 0.9,
    changeFrequency: 'weekly',
    label: { en: 'AI text self-review', zh: 'AI 文本自查' },
  },
  {
    slug: '/jiang-ai-lv',
    enModified: '2026-11-24',
    zhModified: '2026-11-24',
    priority: 0.9,
    changeFrequency: 'weekly',
    label: { en: 'Chinese writing improvement', zh: '中文写作改进' },
  },
  {
    slug: '/essay-writer-bypass-turnitin',
    enModified: '2026-11-24',
    zhModified: '2026-11-24',
    priority: 0.9,
    changeFrequency: 'weekly',
    label: { en: 'Essay writing and detector notes', zh: '论文写作与检测说明' },
  },
  {
    slug: '/gptzero-bypass',
    enModified: '2026-11-24',
    zhModified: '2026-11-24',
    priority: 0.9,
    changeFrequency: 'weekly',
    label: { en: 'GPTZero detector reliability', zh: 'GPTZero 检测说明' },
  },
  {
    slug: '/humanize-ai-text',
    enModified: '2026-11-24',
    zhModified: '2026-11-24',
    priority: 0.9,
    changeFrequency: 'weekly',
    label: { en: 'Improve AI-assisted text', zh: 'AI 辅助文本改进' },
  },
  {
    slug: '/quillbot-bypass',
    enModified: '2026-11-24',
    zhModified: '2026-11-24',
    priority: 0.9,
    changeFrequency: 'weekly',
    label: { en: 'QuillBot writing guidance', zh: 'QuillBot 写作建议' },
  },
  {
    slug: '/pricing',
    enModified: '2026-11-24',
    zhModified: '2026-11-24',
    priority: 0.85,
    changeFrequency: 'monthly',
    label: { en: 'Pricing', zh: '定价' },
  },
  {
    slug: '/cost-comparison',
    enModified: '2026-11-24',
    zhModified: '2026-11-24',
    priority: 0.85,
    changeFrequency: 'monthly',
    label: { en: 'Cost Comparison', zh: '价格对比' },
  },
  {
    slug: '/bypass-test-methodology',
    enModified: '2026-11-24',
    zhModified: '2026-11-24',
    priority: 0.7,
    changeFrequency: 'monthly',
    label: { en: 'Detector test methodology', zh: '测试方法' },
  },
  {
    slug: '/about',
    enModified: '2026-11-24',
    zhModified: '2026-11-24',
    priority: 0.7,
    changeFrequency: 'monthly',
    label: { en: 'About', zh: '关于' },
  },
  {
    slug: '/privacy',
    enModified: '2026-11-24',
    zhModified: '2026-11-24',
    priority: 0.5,
    changeFrequency: 'monthly',
    label: { en: 'Privacy Policy', zh: '隐私政策' },
  },
  {
    slug: '/glossary',
    enModified: '2026-11-24',
    zhModified: '2026-11-24',
    priority: 0.5,
    changeFrequency: 'monthly',
    label: { en: 'AI Detection Glossary', zh: 'AI 检测术语表' },
  },
  {
    slug: '/limitations',
    enModified: '2026-11-24',
    zhModified: '2026-11-24',
    priority: 0.6,
    changeFrequency: 'monthly',
    label: { en: 'Limitations', zh: '限制说明' },
  },
  {
    slug: '/citation-policy',
    enModified: '2026-11-24',
    zhModified: '2026-11-24',
    priority: 0.6,
    changeFrequency: 'monthly',
    label: { en: 'Citation Policy', zh: '引用说明' },
  },
  {
    slug: '/changelog',
    enModified: '2026-11-24',
    zhModified: '2026-11-24',
    priority: 0.4,
    changeFrequency: 'monthly',
    label: { en: 'Changelog', zh: '更新记录' },
  },
  {
    slug: '/embed',
    enModified: '2026-11-24',
    zhModified: null,
    priority: 0.5,
    changeFrequency: 'monthly',
    label: { en: 'Embed the self-review tool', zh: '嵌入自查工具' },
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
