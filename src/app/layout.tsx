import "./globals.css";

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'AI Humanizer',
  alternateName: 'AI 人性化工具',
  url: 'https://humanizer-site-production.up.railway.app',
  description: 'Free AI Humanizer that rewrites AI-generated text so it reads like a human wrote it. Pass GPTZero, Turnitin AI, and Originality.ai detection. Built for students, marketers, and writers.',
  inLanguage: ['en', 'zh'],
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://humanizer-site-production.up.railway.app/?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'AI Humanizer',
  alternateName: 'AI 人性化工具',
  url: 'https://humanizer-site-production.up.railway.app',
  logo: {
    '@type': 'ImageObject',
    url: 'https://humanizer-site-production.up.railway.app/favicon.svg',
    width: 512,
    height: 512,
  },
  description: 'A free online tool that rewrites AI-generated text into natural, human-sounding writing. Built for students, content marketers, and writers who need their work to pass AI detection.',
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
    'https://humanizer-site-production.up.railway.app/about',
    'https://en.wikipedia.org/wiki/AI_humanizer',
    'https://www.wikidata.org/wiki/Q131436255',
    'https://www.linkedin.com/company/ai-humanizer-suite',
    'https://www.crunchbase.com/organization/ai-humanizer-suite',
  ],
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
    email: 'contact@humanizer-site-production.up.railway.app',
    url: 'https://humanizer-site-production.up.railway.app/about',
    availableLanguage: ['English', 'Chinese'],
  },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'AI Humanizer',
  alternateName: 'AI 人性化工具',
  url: 'https://humanizer-site-production.up.railway.app',
  description: 'Free online tool that rewrites AI-generated text to sound like a human wrote it. Passes GPTZero, Turnitin AI, and Originality.ai detection. No signup, no tracking, no installation. Supports English and Chinese.',
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
    url: 'https://humanizer-site-production.up.railway.app',
  },
};

export const metadata = {
  metadataBase: new URL('https://humanizer-site-production.up.railway.app'),
  title: {
    default: 'AI Humanizer - Make AI Text Undetectable, Free',
    template: '%s | AI Humanizer',
  },
  description: 'Free AI Humanizer that rewrites AI-generated text so it reads naturally and bypasses GPTZero, Turnitin AI, and Originality.ai detection. No signup, no installation. Supports English and Chinese.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'zh_CN',
    url: 'https://humanizer-site-production.up.railway.app',
    siteName: 'AI Humanizer',
    title: 'AI Humanizer - Make AI Text Undetectable, Free',
    description: 'Free online AI humanizer. Rewrite ChatGPT, Gemini, and Claude output to bypass AI detection. No signup, no tracking.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'AI Humanizer - Free Online Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Humanizer - Make AI Text Undetectable, Free',
    description: 'Free online AI humanizer. Rewrite ChatGPT output to bypass AI detection.',
    images: ['/og-image.svg'],
  },
  alternates: {
    canonical: 'https://humanizer-site-production.up.railway.app',
    languages: {
      'en-US': 'https://humanizer-site-production.up.railway.app/?lang=en',
      'zh-CN': 'https://humanizer-site-production.up.railway.app/?lang=zh',
      'x-default': 'https://humanizer-site-production.up.railway.app',
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
        {children}
      </body>
    </html>
  );
}