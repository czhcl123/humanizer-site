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
      title: 'HEIC转JPG - 在线iPhone照片转换工具',
      description: '免费在线HEIC转JPG工具,支持批量转换iPhone HEIC照片为JPG格式。100%浏览器本地处理,照片不上传,保护隐私。',
    },
    en: {
      title: 'HEIC to JPG Converter - Free Online HEIC to JPG',
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
    alternates: {
      languages: {
        'zh-CN': '/heic-to-jpg?lang=zh',
        'en-US': '/heic-to-jpg?lang=en',
        'x-default': '/heic-to-jpg',
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
  },
  en: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is HEIC?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "HEIC is Apple's default photo format since iOS 11. It offers better compression than JPG while maintaining similar quality, but it is not universally supported outside the Apple ecosystem.",
        },
      },
      {
        '@type': 'Question',
        name: 'Why convert HEIC to JPG?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'JPG is supported on virtually every device, app, and website. HEIC files may not open on Windows, Android, older software, or when uploaded to many web platforms.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are my photos uploaded to a server?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. All conversion happens entirely in your browser. Your photos never leave your device, ensuring full privacy.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I convert multiple files at once?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Drop a folder or select multiple HEIC files, and they will all convert to JPG in a single batch.',
        },
      },
      {
        '@type': 'Question',
        name: 'Will the JPG quality be lower than HEIC?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'JPG is a lossy format, so there is some quality loss. We use a high-quality setting (95%) by default to minimize visible differences. Files are typically 2-3x larger than the original HEIC.',
        },
      },
    ],
  },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemas[lang]) }}
      />
      <HeicToJpgClient initialLang={lang} />
    </>
  )
}
