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
      title: '字数统计工具 - 在线中英文字数计算器',
      description: '免费在线字数统计工具,实时统计中英文字数、字符、句子、段落,提供阅读时间估算。作家、学生、自媒体必备。',
    },
    en: {
      title: 'Word Counter - Online Character & Word Count Tool',
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
    alternates: {
      languages: {
        'zh-CN': '/word-counter?lang=zh',
        'en-US': '/word-counter?lang=en',
        'x-default': '/word-counter',
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
  },
  en: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How does the word counter work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It splits your text by whitespace and punctuation boundaries, then counts the resulting tokens. Numbers, hyphens, and contractions follow standard word-counting conventions.',
        },
      },
      {
        '@type': 'Question',
        name: 'How are Chinese characters counted?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Each Chinese character counts as one character. For mixed text, both English words and Chinese characters contribute to the total character count.',
        },
      },
      {
        '@type': 'Question',
        name: 'How accurate is it compared to Microsoft Word?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Within 1-2% of Word for plain English text. Word, Google Docs, and online counters often disagree by 1-3% on the same input — for client work with strict word limits, we recommend verifying in two different tools.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is my text uploaded to a server?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. All counting happens locally in your browser. Your text is never transmitted, logged, or stored anywhere.',
        },
      },
    ],
  },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemas[lang]) }}
      />
      <WordCounterClient initialLang={lang} />
    </>
  )
}
