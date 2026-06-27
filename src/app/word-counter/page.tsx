import type { Metadata } from 'next'
import WordCounterClient from './word-counter-client'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const sp = await searchParams
  const lang = (sp && sp.lang) === 'zh' ? 'zh' : 'en'

  const data = {
    zh: {
      title: '字数统计工具_在线中英文字数计算器_实用计算器',
      description: '免费在线字数统计工具,实时统计中英文字数、字符、句子、段落,提供阅读时间估算。作家、学生、自媒体必备。',
    },
    en: {
      title: 'Word Counter_Online Character & Word Count Tool_实用计算器',
      description: 'Free online word counter. Instantly count words, characters, sentences, paragraphs, and reading time. Supports mixed Chinese/English text.',
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
      name: '中英文混合文本如何统计字数？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '本工具同时统计英文单词数和中文字符数（汉字每个算1字）。一个汉字=1字符,一个英文单词=1单词,均计入"总字符数"。',
      },
    },
    {
      '@type': 'Question',
      name: '阅读时间怎么算？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '按中文300字/分钟、英文200词/分钟的阅读速度估算,取较大值。',
      },
    },
    {
      '@type': 'Question',
      name: '支持哪些文件类型？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '目前支持直接粘贴纯文本。如需统计Word/PDF文件,建议先复制内容到剪贴板再粘贴。',
      },
    },
    {
      '@type': 'Question',
      name: '数据安全吗？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '所有统计在浏览器本地完成,文本不上传任何服务器,完全私密。',
      },
    },
  ],
}

export default async function WordCounterPage({
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
      <WordCounterClient initialLang={lang} />
    </>
  )
}
