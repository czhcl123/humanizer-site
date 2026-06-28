import type { Metadata } from 'next'
import InvoiceGeneratorClient from './invoice-generator-client'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const sp = await searchParams
  const lang = (sp && sp.lang) === 'zh' ? 'zh' : 'en'

  const data = {
    zh: {
      title: '免费发票生成器 - 在线PDF发票制作工具',
      description: '免费在线发票生成器,输入商家、客户、商品信息,一键生成可下载的PDF发票。支持多币种、自定义税率、添加Logo。',
    },
    en: {
      title: 'Free Invoice Generator - Online PDF Invoice Maker',
      description: 'Free online invoice generator. Enter business, client, and item details, instantly download a professional PDF invoice. Multi-currency, custom tax, logo support.',
    },
  }

  return {
    title: data[lang].title,
    description: data[lang].description,
    openGraph: {
      title: data[lang].title,
      description: data[lang].description,
    },
    alternates: {
      languages: {
        'zh-CN': '/invoice-generator?lang=zh',
        'en-US': '/invoice-generator?lang=en',
        'x-default': '/invoice-generator',
      },
    },
  }
}

const faqSchemas = {
  zh: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '发票生成器免费吗？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '完全免费,无水印,无次数限制。所有数据本地处理,保护您的客户信息。',
        },
      },
      {
        '@type': 'Question',
        name: '生成的发票可以商用吗？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '可以。生成的PDF是您的文档,可直接发给客户用于付款。',
        },
      },
      {
        '@type': 'Question',
        name: '支持哪些币种？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '支持美元、欧元、人民币、英镑、日元等任意币种,您可以自定义币种符号。',
        },
      },
      {
        '@type': 'Question',
        name: '能添加公司Logo吗？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '可以。上传PNG/JPG Logo,自动嵌入PDF顶部。',
        },
      },
      {
        '@type': 'Question',
        name: '数据安全吗？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '所有数据仅在浏览器本地处理,客户信息不会上传到任何服务器。',
        },
      },
    ],
  },
  en: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is this invoice generator really free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes — no signup, no fees, no watermarks, and no download limits. All calculations happen in your browser, so your client information stays private.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I use the generated invoices commercially?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The PDF is your document — send it directly to clients for payment, print it, or archive it. No attribution required.',
        },
      },
      {
        '@type': 'Question',
        name: 'What currencies are supported?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Any currency. Built-in presets for USD, EUR, CNY, GBP, JPY, and more, plus the option to set a custom currency symbol for less common currencies.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I add my company logo?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Upload a PNG or JPG logo and it will appear at the top of the generated PDF invoice automatically.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does it calculate tax?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Set a tax rate (percentage), and the tool calculates tax per line item and the grand total in real time as you edit.',
        },
      },
    ],
  },
}

export default async function InvoiceGeneratorPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const sp = await searchParams
  const lang = (sp && sp.lang) === 'zh' ? 'zh' : 'en'
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemas[lang]) }}
      />
      <InvoiceGeneratorClient initialLang={lang} />
    </>
  )
}
