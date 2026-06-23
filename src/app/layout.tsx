import type { Metadata } from "next";
import "./globals.css";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const sp = await searchParams;
  const lang = sp.lang === 'en' ? 'en' : 'zh';

  const titles = {
    zh: { default: '实用计算器 - 在线工具箱', template: '%s | 实用计算器' },
    en: { default: 'Practical Tools - Free Online Calculators', template: '%s | Practical Tools' },
  };
  const descriptions = {
    zh: '提供折扣计算器、BMI计算器、日期计算器、农历转换、单位换算等实用在线工具，无需下载，打开即用。',
    en: 'Free online calculators: discount, BMI, date countdown, lunar calendar, unit converter. No download needed, works instantly.',
  };

  return {
    metadataBase: new URL('https://tools-site-production.up.railway.app'),
    title: { default: titles[lang].default, template: titles[lang].template },
    description: descriptions[lang],
    openGraph: {
      type: 'website',
      siteName: lang === 'zh' ? '实用计算器' : 'Practical Tools',
      title: titles[lang].default,
      description: descriptions[lang],
      images: [{ url: '/og-image.svg', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[lang].default,
      description: descriptions[lang],
    },
    icons: {
      icon: '/favicon.svg',
    },
  };
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: '实用计算器',
  url: 'https://tools-site-production.up.railway.app',
  description: '提供折扣计算器、BMI计算器、日期计算器、农历转换、单位换算等实用在线工具',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://tools-site-production.up.railway.app/?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body className="min-h-full flex flex-col antialiased bg-gray-50">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
