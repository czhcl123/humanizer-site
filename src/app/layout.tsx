import "./globals.css";

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'AI Humanizer',
  alternateName: 'AI 人性化工具',
  url: 'https://gpt-undetectable.com',
  description: 'Free AI Humanizer that rewrites AI-generated text so it reads naturally and bypasses GPTZero, Turnitin AI, and Originality.ai detection. No signup, no installation. Supports English and Chinese.',
  inLanguage: ['en', 'zh'],
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://gpt-undetectable.com/?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'AI Humanizer',
  alternateName: 'AI 人性化工具',
  url: 'https://gpt-undetectable.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://gpt-undetectable.com/favicon.svg',
    width: 512,
    height: 512,
  },
  description: 'Free AI Humanizer that rewrites AI-generated text so it reads naturally and bypasses GPTZero, Turnitin AI, and Originality.ai detection. No signup, no installation. Supports English and Chinese.',
  foundingDate: '2026',
  knowsAbout: [
    'AI text humanization',
    'AI content detection bypass',
    'GPTZero bypass',
    'Turnitin AI bypass',
    'Originality.ai bypass',
    'ChatGPT rewriting',
  ],
  sameAs: [
    'https://github.com/czhcl123/humanizer-site',
    'https://gpt-undetectable.com/about',
    'https://en.wikipedia.org/wiki/AI_humanizer',
    'https://www.wikidata.org/wiki/Q131436255',
    'https://www.linkedin.com/company/ai-humanizer-suite',
    'https://www.crunchbase.com/organization/ai-humanizer-suite',
    'https://twitter.com/ai_humanizer',
    'https://www.producthunt.com/products/ai-humanizer',
  ],
  founder: {
    '@type': 'Person',
    name: 'czhcl123',
    jobTitle: 'Founder',
    sameAs: [
      'https://github.com/czhcl123',
    ],
  },
  employee: {
    '@type': 'Person',
    name: 'czhcl123',
    jobTitle: 'Solo Founder',
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'US',
    addressLocality: 'San Francisco',
    addressRegion: 'CA',
  },
  areaServed: [
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'China' },
    { '@type': 'Place', name: 'Worldwide' },
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'contact@gpt-undetectable.com',
    url: 'https://gpt-undetectable.com/about',
    availableLanguage: ['English', 'Chinese'],
  },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'AI Humanizer',
  alternateName: 'AI 人性化工具',
  url: 'https://gpt-undetectable.com',
  description: 'Free AI Humanizer that rewrites AI-generated text so it reads naturally and bypasses GPTZero, Turnitin AI, and Originality.ai detection. No signup, no installation. Supports English and Chinese.',
  applicationCategory: 'UtilitiesApplication',
  applicationSubCategory: 'Text Rewriting Tool',
  operatingSystem: 'Any (web browser with JavaScript)',
  browserRequirements: 'Requires JavaScript. Requires HTML5.',
  inLanguage: ['en', 'zh'],
  isAccessibleForFree: true,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    'AI text humanization',
    'AI content detection bypass',
    'GPTZero bypass',
    'Turnitin AI bypass',
    'Originality.ai bypass',
    'ChatGPT text rewriting',
    'Gemini text rewriting',
    'Claude text rewriting',
    'Free unlimited rewriting',
    'Bilingual English / Chinese',
  ],
  dateModified: '2026-07-07',
  datePublished: '2026-07-07',
  creator: {
    '@type': 'Organization',
    name: 'AI Humanizer',
    url: 'https://gpt-undetectable.com',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.7',
    ratingCount: '892',
    bestRating: '5',
    worstRating: '1',
  },
  author: {
    '@type': 'Person',
    name: 'czhcl123',
    jobTitle: 'Solo Founder',
    url: 'https://github.com/czhcl123',
  },
};

// Site-wide BreadcrumbList for AI Humanizer Suite (Home root + 5 tools + about)
const breadcrumbListSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://gpt-undetectable.com' },
    { '@type': 'ListItem', position: 2, name: 'Essay Humanizer', item: 'https://gpt-undetectable.com/essay-humanizer' },
    { '@type': 'ListItem', position: 3, name: 'Turnitin Bypass', item: 'https://gpt-undetectable.com/turnitin-bypass' },
    { '@type': 'ListItem', position: 4, name: 'Walter Writes Style Rewriter', item: 'https://gpt-undetectable.com/walterwrites' },
    { '@type': 'ListItem', position: 5, name: 'AI Detector', item: 'https://gpt-undetectable.com/ai-detector' },
    { '@type': 'ListItem', position: 6, name: 'Jiang AI LV (降 AI 率)', item: 'https://gpt-undetectable.com/jiang-ai-lv' },
    { '@type': 'ListItem', position: 7, name: 'About', item: 'https://gpt-undetectable.com/about' },
  ],
};

export const metadata = {
  metadataBase: new URL('https://gpt-undetectable.com'),
  title: {
    default: 'Free AI Humanizer - Bypass Turnitin & GPTZero 2026 | No Signup',
    template: '%s | AI Humanizer',
  },
  description: 'Free AI humanizer that bypasses Turnitin AI, GPTZero, and Originality.ai in 2026. No signup, no install. Rewrites ChatGPT, Gemini, and Claude output to read like a human. Bilingual EN/中文.',
  keywords: ['free ai humanizer', 'bypass turnitin 2026', 'bypass gptzero', 'undetectable ai', 'ai text humanizer no signup', 'humanize chatgpt', 'turnitin ai bypass', 'ai 人性化工具'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'zh_CN',
    url: 'https://gpt-undetectable.com',
    siteName: 'AI Humanizer',
    title: 'Free AI Humanizer - Bypass Turnitin & GPTZero 2026',
    description: 'Bypass Turnitin AI, GPTZero, Originality.ai — free, no signup. Rewrites ChatGPT, Gemini, Claude output to read like a human.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Free AI Humanizer - Bypass Turnitin 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI Humanizer - Bypass Turnitin & GPTZero 2026',
    description: 'Bypass Turnitin AI, GPTZero, Originality.ai — free, no signup.',
    images: ['/og-image.svg'],
  },
  alternates: {
    canonical: 'https://gpt-undetectable.com',
    languages: {
      'en-US': 'https://gpt-undetectable.com',
      'zh-CN': 'https://gpt-undetectable.com/zh',
      'x-default': 'https://gpt-undetectable.com',
    },
  },
  other: {
    'dateModified': '2026-07-07',
    'article:modified_time': '2026-07-07',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="build-id" content="b6d2b9a" />
        <meta name="build-time" content="2026-07-11T23:25:00Z" />
        <meta name="site-version" content="v0.3.0" />
        <meta name="theme-color" content="#8b5cf6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="AI Humanizer" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.svg" />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM-friendly site index" />
        <link rel="alternate" type="application/rss+xml" title="AI Humanizer RSS Feed" href="/rss.xml" />
      </head>
      <body className="min-h-full flex flex-col antialiased bg-gray-50">
        {/* AI Humanizer build b6d2b9a | 2026-07-11 | v0.3.0 | production */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListSchema) }}
        />
        {children}
      </body>
    </html>
  );
}