import type { Metadata } from 'next'
import HeicToJpgClient from './heic-to-jpg-client'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const sp = await searchParams
  const lang = (sp && sp.lang) === 'zh' ? 'zh' : 'en'

  const data = {
    zh: {
      title: 'HEIC转JPG_在线iPhone照片转换工具_实用计算器',
      description: '免费在线HEIC转JPG工具,支持批量转换iPhone HEIC照片为JPG格式。100%浏览器本地处理,照片不上传,保护隐私。',
    },
    en: {
      title: 'HEIC to JPG Converter_Online Free HEIC Converter_实用计算器',
      description: 'Free online HEIC to JPG converter. Batch convert iPhone HEIC photos to JPG. 100% browser-side processing, no upload, full privacy.',
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
      name: 'HEIC是什么？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'HEIC是苹果iOS 11起的默认照片格式（高效图像格式）,文件小但部分设备和软件不兼容。',
      },
    },
    {
      '@type': 'Question',
      name: '为什么需要转JPG？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'JPG兼容性最广,Windows、安卓、网页、邮件附件都支持。HEIC在这些场景可能打不开。',
      },
    },
    {
      '@type': 'Question',
      name: '会上传我的照片吗？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '不会。所有转换在您的浏览器本地完成,照片不上传任何服务器。',
      },
    },
    {
      '@type': 'Question',
      name: '支持批量转换吗？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '支持。可以一次选择多张HEIC照片,批量转JPG。',
      },
    },
    {
      '@type': 'Question',
      name: '转换后质量会下降吗？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'JPG是有损格式,质量可调。默认92%,肉眼几乎无差别。文件大小比HEIC大2-3倍。',
      },
    },
  ],
}

export default async function HeicToJpgPage({
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
      <HeicToJpgClient initialLang={lang} />
    </>
  )
}
