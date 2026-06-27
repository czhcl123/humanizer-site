import type { Metadata } from 'next'
import JsonFormatterClient from './json-formatter-client'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const sp = await searchParams
  const lang = (sp && sp.lang) === 'zh' ? 'zh' : 'en'

  const data = {
    zh: {
      title: 'JSON格式化工具_在线JSON验证美化压缩_实用计算器',
      description: '免费在线JSON格式化、美化、压缩、验证工具。支持自定义缩进、错误提示、语法高亮。开发者、API调试必备。',
    },
    en: {
      title: 'JSON Formatter_Online JSON Beautifier & Validator_实用计算器',
      description: 'Free online JSON formatter, beautifier, minifier, and validator. Custom indent, error messages, syntax highlighting. Essential for developers.',
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
      name: 'JSON格式化是什么？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '把压缩的单行JSON转成带缩进的多行格式,便于阅读和编辑。',
      },
    },
    {
      '@type': 'Question',
      name: '支持大文件吗？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '支持10MB以内的JSON。更大文件建议使用专业工具如jq。',
      },
    },
    {
      '@type': 'Question',
      name: '数据安全吗？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '所有处理在浏览器本地完成,数据不上传任何服务器。',
      },
    },
    {
      '@type': 'Question',
      name: 'JSON和JSON5区别？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'JSON5是JSON的超集,支持注释、尾逗号、单引号等。本工具使用标准JSON规范。',
      },
    },
  ],
}

export default async function JsonFormatterPage({
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
      <JsonFormatterClient initialLang={lang} />
    </>
  )
}
