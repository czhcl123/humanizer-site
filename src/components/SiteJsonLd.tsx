import { SITE_URL, SITE_NAME } from '@/lib/site'

/**
 * Site-wide structured data.
 *
 * `sameAs` used to list a Wikipedia article, a Wikidata item, a LinkedIn page,
 * a Crunchbase profile, a Twitter account, and a Product Hunt listing that do
 * not exist. Google treats unverifiable `sameAs` entries as a spam signal on
 * Organization markup, so only profiles we actually control are listed here.
 */
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  alternateName: 'AI 人性化工具',
  url: SITE_URL,
  description:
    'Free AI Humanizer that rewrites AI-generated text so it reads naturally and bypasses GPTZero, Turnitin AI, and Originality.ai detection. Free tier (5/day) + Pro $0.99/word via Stripe.',
  inLanguage: ['en', 'zh'],
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  alternateName: 'AI 人性化工具',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/og-image.png`,
    width: 1200,
    height: 630,
  },
  description:
    'Free AI Humanizer that rewrites AI-generated text so it reads naturally and bypasses GPTZero, Turnitin AI, and Originality.ai detection. No signup, no installation. Supports English and Chinese.',
  foundingDate: '2026',
  knowsAbout: [
    'AI text humanization',
    'AI content detection bypass',
    'GPTZero bypass',
    'Turnitin AI bypass',
    'Originality.ai bypass',
    'ChatGPT rewriting',
  ],
  sameAs: ['https://github.com/czhcl123/humanizer-site'],
  founder: {
    '@type': 'Person',
    name: 'czhcl123',
    jobTitle: 'Founder',
    url: 'https://github.com/czhcl123',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'contact@gpt-undetectable.com',
    url: `${SITE_URL}/about`,
    availableLanguage: ['English', 'Chinese'],
  },
}

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: SITE_NAME,
  alternateName: 'AI 人性化工具',
  url: SITE_URL,
  description:
    'Free AI Humanizer that rewrites AI-generated text so it reads naturally and bypasses GPTZero, Turnitin AI, and Originality.ai detection. Free tier (5/day) + Pro $0.99/word via Stripe. Supports English and Chinese.',
  applicationCategory: 'UtilitiesApplication',
  applicationSubCategory: 'Text Rewriting Tool',
  operatingSystem: 'Any (web browser with JavaScript)',
  browserRequirements: 'Requires JavaScript. Requires HTML5.',
  inLanguage: ['en', 'zh'],
  isAccessibleForFree: true,
  offers: [
    {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    {
      '@type': 'Offer',
      price: '0.99',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      description: 'Pro tier: $0.99 per word, unlimited submissions via Stripe.',
    },
  ],
  featureList: [
    'AI text humanization',
    'AI content detection bypass',
    'GPTZero bypass',
    'Turnitin AI bypass',
    'Originality.ai bypass',
    'ChatGPT text rewriting',
    'Gemini text rewriting',
    'Claude text rewriting',
    'Bilingual English / Chinese',
  ],
  dateModified: '2026-11-09',
  datePublished: '2026-07-07',
  creator: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
  },
  author: {
    '@type': 'Person',
    name: 'czhcl123',
    jobTitle: 'Solo Founder',
    url: 'https://github.com/czhcl123',
  },
}

export function SiteJsonLd() {
  return (
    <>
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
    </>
  )
}
