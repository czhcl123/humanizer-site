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
      title: '免费发票生成器_在线PDF发票制作工具_实用计算器',
      description: '免费在线发票生成器,输入商家、客户、商品信息,一键生成可下载的PDF发票。支持多币种、自定义税率、添加Logo。',
    },
    en: {
      title: 'Free Invoice Generator_Online PDF Invoice Maker_实用计算器',
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
  }
}

const faqSchema = {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <InvoiceGeneratorClient initialLang={lang} />
    </>
  )
}
