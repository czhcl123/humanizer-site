import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://tools-site-production.up.railway.app'),
  title: { default: '实用计算器 - 在线工具箱', template: '%s | 实用计算器' },
  description: '提供折扣计算器、BMI计算器、日期计算器、农历转换、单位换算等实用在线工具，无需下载，打开即用。',
  openGraph: {
    type: 'website',
    siteName: '实用计算器',
    title: '实用计算器 - 在线工具箱',
    description: '提供折扣计算器、BMI计算器、日期计算器、农历转换、单位换算等实用在线工具',
    images: [{ url: '/og-image.svg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '实用计算器 - 在线工具箱',
    description: '提供折扣计算器、BMI计算器、日期计算器、农历转换、单位换算等实用在线工具',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

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