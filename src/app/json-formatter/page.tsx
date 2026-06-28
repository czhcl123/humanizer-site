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
      title: 'JSON格式化工具 - 在线JSON验证、美化与压缩',
      description: '免费在线JSON格式化、美化、压缩、验证工具。支持自定义缩进、错误提示、语法高亮。开发者、API调试必备。',
    },
    en: {
      title: 'JSON Formatter - Online JSON Beautifier & Validator',
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
    alternates: {
      languages: {
        'zh-CN': '/json-formatter?lang=zh',
        'en-US': '/json-formatter?lang=en',
        'x-default': '/json-formatter',
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
  },
  en: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is JSON formatting?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Converting minified single-line JSON into a human-readable, indented multi-line format that is easier to read and edit.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does this tool support large files?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, files up to 10MB are supported. For larger files, we recommend a desktop tool like jq or a streaming JSON parser.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is my data secure?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. All processing happens locally in your browser. Your JSON is never uploaded to any server, and nothing is logged or stored.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between JSON and JSON5?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'JSON5 is a superset of JSON that supports comments, trailing commas, single quotes, and other relaxed syntax. This tool uses the standard JSON specification.',
        },
      },
    ],
  },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemas[lang]) }}
      />
      <JsonFormatterClient initialLang={lang} />
    </>
  )
}
