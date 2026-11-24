import { SITE_URL, SITE_NAME } from '@/lib/site'

/**
 * Site-wide structured data. Only verifiable identities are listed in
 * `sameAs` — invented profiles are treated as a spam signal.
 */
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  alternateName: 'AI 写作改进工具',
  url: SITE_URL,
  description:
    'Free online writing tool that makes rough AI-assisted drafts clearer, more natural, and easier to make your own. English and Simplified Chinese. No signup, 100% free, 5 submissions per IP per 24 hours, 3,000 characters per submission.',
  inLanguage: ['en', 'zh-CN'],
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  alternateName: 'AI 写作改进工具',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/og-image.png`,
    width: 1200,
    height: 630,
  },
  description:
    'Free online writing-improvement tools for AI-assisted drafts. All processing is performed in the cloud via DeepSeek Chat (deepseek-chat). Supports English and Simplified Chinese.',
  foundingDate: '2026-07',
  knowsAbout: [
    'Writing improvement tools',
    'Clarity and tone editing',
    'AI-assisted draft rewriting',
    'English and Simplified Chinese writing',
  ],
  sameAs: ['https://github.com/czhcl123/humanizer-site'],
  founder: {
    '@type': 'Person',
    name: 'czhcl123',
    jobTitle: 'Solo Founder',
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
  '@type': ['WebApplication', 'SoftwareApplication'],
  name: SITE_NAME,
  alternateName: 'AI 写作改进工具',
  url: SITE_URL,
  description:
    'Free online writing tool that makes rough AI-assisted drafts clearer, more natural, and easier to make your own. Cloud-processed via DeepSeek Chat. English and Simplified Chinese. No signup, 5 submissions per IP per 24 hours, 3,000 characters per submission. No detector-score claims.',
  applicationCategory: 'UtilitiesApplication',
  applicationSubCategory: 'Writing Improvement Tool',
  operatingSystem: 'Any (web browser with JavaScript)',
  browserRequirements: 'Requires JavaScript. Requires HTML5.',
  inLanguage: ['en', 'zh-CN'],
  isAccessibleForFree: true,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    description: '100% free. No premium tier. 5 submissions per IP per 24 hours, 3,000 characters each.',
  },
  featureList: [
    'Rewriting rough AI-assisted drafts for clarity and natural tone',
    'Essay writing improvement with a citation-preservation request that users verify manually',
    'Conversational style rewriting',
    'English and Simplified Chinese writing support',
    'Heuristic text self-review, not a detector verdict',
  ],
  dateModified: '2026-11-24',
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
