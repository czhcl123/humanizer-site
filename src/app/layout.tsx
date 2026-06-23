import "./globals.css";

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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#f97316" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="实用计算器" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.svg" />
      </head>
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
