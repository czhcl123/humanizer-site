import type { Metadata } from 'next'
import { languageAlternates, pageUrl } from '@/lib/site'
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd'

/** This route tree is Chinese; the language is a compile-time constant. */
const lang = 'zh' as const

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '本站会保存我提交的文本吗？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '本站没有持久化数据库存储用户文本。但服务端有一份短期内存响应缓存：缓存键包含输入文本的哈希，缓存值是完整输出，条目存活最长 10 分钟、最多 500 条，服务重启即清空。',
      },
    },
    {
      '@type': 'Question',
      name: '本站使用分析 cookie 或追踪像素吗？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '没有分析 cookie，没有追踪像素，也不需要注册。但嵌入版检测器会通过 postMessage 向父页面发送高度信息，返回链接带 utm_source 和 utm_medium 参数；第三方站点嵌入时其父页面能看到这条消息。',
      },
    },
    {
      '@type': 'Question',
      name: '我的文本在哪里处理？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '文本会从浏览器发送到本站服务端 API（POST /api/humanize），再交给 DeepSeek Chat（deepseek-chat）处理。处理发生在云端，不是在本地。站点托管在 Railway，Upstash Redis 是可选的限流后端。',
      },
    },
    {
      '@type': 'Question',
      name: '如何联系运营者咨询我的数据？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '发邮件到 contact@gpt-undetectable.com。创始人是 czhcl123，公开仓库是 https://github.com/czhcl123/humanizer-site。',
      },
    },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  const title = '隐私政策 — 你的文本如何处理'
  const description = '如实说明本站的文本处理方式：经服务端 API 交给 DeepSeek 云端处理、短期内存缓存、基于 IP 的限流，以及无分析 cookie 与追踪像素。'
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: 'https://gpt-undetectable.com/og-image.png', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://gpt-undetectable.com/og-image.png'],
    },
    alternates: { canonical: pageUrl('/privacy', 'zh'), languages: languageAlternates('/privacy') },
  }
}

export default async function PrivacyPage() {
  return (
    <>
      <BreadcrumbJsonLd slug="/privacy" lang="zh" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="mx-auto w-full max-w-3xl px-4 py-8 text-sm leading-relaxed text-gray-700">
        <article className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6 space-y-3">
          <h1 className="text-2xl font-bold text-gray-900">隐私政策</h1>
          <p className="text-xs text-gray-500">更新日期：2026 年 11 月 24 日</p>

          <p>这一页如实说明你粘贴到本站的文本会发生什么。目标是描述系统的实际行为，而不是做出系统做不到的承诺。</p>

          <h2 className="text-lg font-semibold text-gray-800 pt-2">简要说明</h2>
          <p>你的文本由 DeepSeek Chat 在云端处理。本站没有持久化数据库存储用户文本，也没有分析 cookie 和追踪像素，不需要账号。但服务端确实有一份短期内存响应缓存和一个基于 IP 的限流器，下面分别说明。</p>

          <h2 className="text-lg font-semibold text-gray-800 pt-2">提交文本后发生什么</h2>
          <p>点击改写或检测按钮时，浏览器把文本发到本站服务端 API <code className="bg-gray-100 px-1 rounded">POST /api/humanize</code>，服务端再转给 <strong>DeepSeek Chat（deepseek-chat）</strong>，并把模型输出返回。处理发生在远程服务器上，不是在你的浏览器本地完成。整个过程没有注册步骤。</p>

          <h2 className="text-lg font-semibold text-gray-800 pt-2">短期响应缓存</h2>
          <p>本站没有持久化数据库保存用户文本，但服务端有一份有上限的内存响应缓存：</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>存活时间：</strong>每条 10 分钟（TTL）。</li>
            <li><strong>容量：</strong>最多 500 条；新条目写入时 oldest 条目会被挤出。</li>
            <li><strong>键：</strong>由输入文本的哈希加上模式、语言等信息构成。</li>
            <li><strong>值：</strong>该输入对应的完整输出。</li>
          </ul>
          <p>缓存只存在于服务进程的内存中，不写入数据库，服务重启即全部消失。如果在 10 分钟内重复提交同一内容，这次请求可能直接由缓存返回，而不再发起新的模型调用。</p>

          <h2 className="text-lg font-semibold text-gray-800 pt-2">限流与 IP 地址</h2>
          <p>请求按客户端 IP 限流。服务端从 <code className="bg-gray-100 px-1 rounded">x-forwarded-for</code>、<code className="bg-gray-100 px-1 rounded">cf-connecting-ip</code>、<code className="bg-gray-100 px-1 rounded">x-real-ip</code> 等代理头里取 IP。这些头可能受代理、VPN 和托管环境影响，因此这个标识只是尽力而为，不等于经过验证的身份；共用同一 IP 的用户可能共用一个计数。</p>
          <p>默认配置下计数保存在服务端内存中，只作用于单个实例。配置 Upstash Redis 后，计数会在多个实例之间共享。这个过程不会创建账号。</p>

          <h2 className="text-lg font-semibold text-gray-800 pt-2">Cookie、追踪与嵌入检测器</h2>
          <p>本站没有分析 cookie，也没有追踪像素，无需注册。</p>
          <p><a href="/zh/ai-detector" className="text-violet-600 hover:underline">检测器</a>的嵌入版（<a href="/embed" className="text-violet-600 hover:underline">/embed</a>）在 iframe 里运行时行为不同：它会用 <code className="bg-gray-100 px-1 rounded">postMessage</code> 向父页面发送高度信息，以便调整框架高度。父页面可以看到这条消息，因此如果第三方站点嵌入了该检测器，该站点能观察到它。检测器的返回链接带有 <code className="bg-gray-100 px-1 rounded">utm_source</code> 和 <code className="bg-gray-100 px-1 rounded">utm_medium</code> 参数。</p>

          <h2 className="text-lg font-semibold text-gray-800 pt-2">哪些第三方参与数据处理</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>DeepSeek</strong> — 接收提交文本用于改写或分析的模型供应商。<a href="https://platform.deepseek.com" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">platform.deepseek.com</a></li>
            <li><strong>Railway</strong> — 托管本站及服务端缓存的平台。<a href="https://railway.com" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">railway.com</a></li>
            <li><strong>Upstash</strong> — 配置后作为共享限流计数的 Redis 后端。<a href="https://upstash.com" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">upstash.com</a></li>
          </ul>

          <h2 className="text-lg font-semibold text-gray-800 pt-2">你的选择与联系方式</h2>
          <p>本站没有可供编辑或删除的账号。由于提交的文本会发给 DeepSeek 处理，并可能短暂存在于服务端内存缓存中，实际可行的做法是避免提交敏感文本；如对你的数据有疑问，可以联系我们。隐私相关问题与请求请发到 <a href="mailto:contact@gpt-undetectable.com" className="text-violet-600 hover:underline">contact@gpt-undetectable.com</a>。</p>
          <p>创始人是 <strong>czhcl123</strong>。源码仓库公开：<a href="https://github.com/czhcl123/humanizer-site" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">github.com/czhcl123/humanizer-site</a>。</p>

          <h2 className="text-lg font-semibold text-gray-800 pt-2">变更</h2>
          <p>本说明反映 2026 年 11 月 24 日时本站的情况。如果数据处理方式变化，本页会更新并标注新日期。</p>

          <p className="text-sm text-gray-500 pt-2">相关：<a href="/zh/glossary" className="text-violet-600 hover:underline">AI 检测术语表</a> · <a href="/zh/about" className="text-violet-600 hover:underline">关于我们</a></p>
        </article>
      </main>
    </>
  )
}
