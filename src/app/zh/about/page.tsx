import type { Metadata } from 'next'
import { languageAlternates, pageUrl } from '@/lib/site'
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd'
import AboutClient from '@/components/AboutClient'

/** This route tree is Chinese; the language is a compile-time constant. */
const lang = 'zh' as const

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'AI Humanizer 是什么？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AI Humanizer 是创始人 czhcl123 创建的免费在线写作改进工具：把生硬的 AI 辅助草稿改得更自然、清晰、更贴合自己的表达。改写与自查由 DeepSeek Chat 在云端完成；100% 免费，无需注册。',
      },
    },
    {
      '@type': 'Question',
      name: '为什么完全免费？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '本站没有付费档，100% 免费、无需注册。每个 IP 每滚动 24 小时可使用 5 次，每次最多 3000 字符。',
      },
    },
    {
      '@type': 'Question',
      name: '工具如何工作？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '文本经本站服务端 API 交给 DeepSeek Chat 在云端处理；提示词要求改善句长、用词和语气，让草稿更自然清晰，并尽量保留事实、引用和数据（请自行核对）。所谓“检测”只是提示词驱动的启发式自查，不直连第三方检测 API。',
      },
    },
    {
      '@type': 'Question',
      name: '是否承诺检测器的判定结果？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '不承诺。检测器判定并不可靠、也有争议，本站不是操纵检测器的工具。早前未记录条件的 85–95% 内部印象已撤回，公开的 2026-11-24 自洽性试点只测得 13.3%（4/30）；第三方抽查未完成。这些是局限证据，不是产品效果。本站仅支持英文（en）和简体中文（zh-CN），不支持繁体中文。',
      },
    },
    {
      '@type': 'Question',
      name: '如何联系你们？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '发邮件到 contact@gpt-undetectable.com。创始人 czhcl123，公开仓库 github.com/czhcl123/humanizer-site。本站无持久存储，仅有最长 10 分钟、最多 500 条的内存缓存，无分析 cookie 与追踪像素；详见 /zh/privacy。',
      },
    },
  ],
}

export async function generateMetadata() {
    const titles = {
    zh: '关于我们 - AI Humanizer 方法与目标',
    en: 'About - AI Humanizer Method & Goals',
  }
  const descriptions = {
    zh: 'AI Humanizer 由 czhcl123 创建，100% 免费、无需注册。使命是帮助人们写得更清楚，而非应对检测器。了解我们的方法、目标与局限。',
    en: 'AI Humanizer helps make rough AI-assisted drafts clearer and more natural. Learn about our mission, goals, and limitations.',
  }
  return {
    title: titles[lang],
    description: descriptions[lang],
    openGraph: {
      title: titles[lang],
      description: descriptions[lang],
      images: [{ url: 'https://gpt-undetectable.com/og-image.png', width: 1200, height: 630, alt: titles[lang] }],
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[lang],
      description: descriptions[lang],
      images: ['https://gpt-undetectable.com/og-image.png'],
    },
    alternates: { canonical: pageUrl('/about', 'zh'), languages: languageAlternates('/about') },
  }
}

export default async function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd slug="/about" lang="zh" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <section className="max-w-3xl mx-auto px-4 pb-2 text-sm text-gray-600 leading-relaxed space-y-2">
        <h2 className="text-lg font-bold text-gray-800">2026-11-24 定位变更说明</h2>
        <p>
          公开的测试显示检测分数并不可靠：早前未记录条件的 85–95% 印象未能复现，第三方抽查尚未完成。因此我们把 AI Humanizer 的定位转向写作质量——把生硬的草稿改得更自然、清晰、更贴合自己的表达，而不是围绕检测器做承诺。
        </p>
      </section>
      <AboutClient lang={lang} />
      <section className="max-w-3xl mx-auto px-4 pb-2 text-sm text-gray-600 leading-relaxed space-y-3">
        <p>AI Humanizer 由创始人 <strong>czhcl123</strong> 创建。联系邮箱：<a href="mailto:contact@gpt-undetectable.com" className="text-violet-600 hover:underline">contact@gpt-undetectable.com</a>；公开源码仓库：<a href="https://github.com/czhcl123/humanizer-site" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">https://github.com/czhcl123/humanizer-site</a>。</p>
        <p>本站 100% 免费，没有付费档；每个 IP 每滚动 24 小时 5 次，每次最多 3000 字符，无需注册。改写与启发式自查均由 DeepSeek Chat（deepseek-chat）在云端处理。早前未记录条件的 85–95% 内部印象已撤回；公开的 2026-11-24 自洽性试点只测得 13.3%（4/30），第三方抽查未完成。这些数字是检测局限的证据，不是产品效果承诺。</p>
        <p>详情见 <a href="/zh/privacy" className="text-violet-600 hover:underline">隐私政策</a>。</p>
        <p className="text-xs text-gray-400 mt-4">最近核校：2026-11-24</p>
      </section>
    </>
  )
}