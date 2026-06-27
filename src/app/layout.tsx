import "./globals.css";

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Practical Tools',
  alternateName: '实用计算器',
  url: 'https://tools-site-production.up.railway.app',
  description: 'Free online calculators and tools: discount calculator, BMI, date, lunar calendar, unit converter, QR code generator, word counter, JSON formatter, HEIC to JPG, invoice generator.',
  inLanguage: ['en', 'zh'],
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
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#f97316" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Practical Tools" />
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
