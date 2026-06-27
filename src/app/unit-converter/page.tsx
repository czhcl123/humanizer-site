import type { Metadata } from 'next'
import UnitConverterClient from './converter-client'

export const metadata: Metadata = {
  title: '单位换算器',
  description: '长度、重量、温度单位快速互转。支持米、厘米、公斤、磅、摄氏度、华氏度等单位之间的换算。',
  openGraph: {
    title: '单位换算器 - 实用计算器',
    description: '长度、重量、温度单位快速互转',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '单位换算器支持哪些类别？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '支持三大类单位换算：长度（米、厘米、毫米、公里、英寸、英尺、码、英里）、重量（千克、克、毫克、磅、盎司、吨）、温度（摄氏度、华氏度、开尔文）。',
      },
    },
    {
      '@type': 'Question',
      name: '如何进行温度换算？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '选择"温度"类别，选择起始单位和目标单位，输入数值后点击"结果"即可。支持的换算包括摄氏度↔华氏度、摄氏度↔开尔文、华氏度↔开尔文。',
      },
    },
    {
      '@type': 'Question',
      name: '换算结果保留几位小数？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '结果保留5位有效数字。对于日常生活场景，大多数换算结果已经足够精确。如需更高精度，可使用专业测量工具。',
      },
    },
  ],
}

export default async function UnitConverterPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const sp = await searchParams
  const lang = (sp.lang === 'zh' ? 'zh' : 'en') as 'zh' | 'en'
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <UnitConverterClient initialLang={lang} />
    </>
  )
}