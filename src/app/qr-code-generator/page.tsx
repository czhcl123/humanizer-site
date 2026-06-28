import type { Metadata } from 'next'
import QrCodeGeneratorClient from './qr-code-generator-client'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const sp = await searchParams
  const lang = (sp && sp.lang) === 'zh' ? 'zh' : 'en'

  const data = {
    zh: {
      title: '免费QR码生成器 - 在线二维码制作工具',
      description: '免费在线QR码生成器,输入文本或网址快速生成可下载的PNG/SVG二维码。支持自定义尺寸、颜色、纠错级别,无水印无需注册。',
    },
    en: {
      title: 'Free QR Code Generator - Online QR Code Maker',
      description: 'Free online QR code generator. Create downloadable PNG/SVG QR codes from any text or URL. Custom size, color, error correction. No watermark, no signup.',
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
        'zh-CN': '/qr-code-generator?lang=zh',
        'en-US': '/qr-code-generator?lang=en',
        'x-default': '/qr-code-generator',
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
        name: 'QR码生成器免费吗？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '完全免费,无需注册。所有生成在浏览器本地完成,无水印,无次数限制。',
        },
      },
      {
        '@type': 'Question',
        name: '生成的二维码可以商用吗？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '可以。二维码本身没有版权,生成的图像归您所有,可用于商业用途（产品包装、广告、名片等）。',
        },
      },
      {
        '@type': 'Question',
        name: '支持哪些内容类型？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '支持任意文本：网址URL、纯文本、邮箱、Wi-Fi名片、vCard联系人、地理位置坐标等。',
        },
      },
      {
        '@type': 'Question',
        name: '纠错级别是什么意思？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '纠错级别越高,二维码部分被遮挡（30%）仍可扫描。L=7%, M=15%, Q=25%, H=30%。推荐H（可放Logo）。',
        },
      },
      {
        '@type': 'Question',
        name: '可以下载什么格式？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '支持PNG（位图,适合大部分场景）和SVG（矢量,适合印刷和任意缩放）。',
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
        name: 'Is this QR code generator free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, completely free with no signup required. All generation happens in your browser, with no watermarks, no scan limits, and no hidden fees.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I use the generated QR codes commercially?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. QR codes themselves have no copyright, and the generated images belong entirely to you. Use them freely for product packaging, advertising, business cards, or any other commercial purpose.',
        },
      },
      {
        '@type': 'Question',
        name: 'What content types are supported?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Any text content: URLs, plain text, email addresses, Wi-Fi credentials, vCard contact info, geographic coordinates, phone numbers, and more.',
        },
      },
      {
        '@type': 'Question',
        name: 'What does error correction level mean?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Higher error correction means the QR code remains scannable even if partially obscured. Levels: L=7%, M=15%, Q=25%, H=30%. We recommend H if you plan to add a logo in the center.',
        },
      },
      {
        '@type': 'Question',
        name: 'What file formats can I download?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'PNG (raster, best for sharing on screen and most use cases) and SVG (vector, best for printing at any size without quality loss).',
        },
      },
    ],
  },
}

export default async function QrCodeGeneratorPage({
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
      <QrCodeGeneratorClient initialLang={lang} />
    </>
  )
}
