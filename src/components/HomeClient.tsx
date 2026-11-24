'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import Footer from '../components/Footer'

const MAX_CHARS = 3000

const T = {
  zh: {
    title: 'AI Humanizer',
    heroTitle: 'AI Humanizer — 免费在线写作改进工具',
        heroSubtitle: '免费在线写作改进工具：把生硬的 AI 辅助草稿改得更自然、清晰、更贴合你自己的表达。支持英文和简体中文,无需注册。100% 免费,无需注册。每 IP 每滚动 24 小时 5 次,每次最多 3000 字符。',
    inputLabel: '粘贴你的草稿',
    inputPlaceholder: '把 ChatGPT、Gemini、Claude、Copilot 或任何 AI 辅助生成的草稿粘贴到这里,点击「改进写作」即可。',
    outputLabel: '改进后的文本',
    outputPlaceholder: '改写后的文本会出现在这里。',
    humanize: '改进写作',
    humanizing: '正在改写...',
    copy: '复制',
    copied: '已复制',
    clear: '清空',
    paste: '粘贴',
    sample: '示例',
    errorEmpty: '请先粘贴文本',
    errorTooLong: '文本超过 3000 字限制,请分段提交',
    errorNetwork: '网络错误,请重试',
    errorApi: '改写失败,稍后重试',
    charCount: '字符',
        rateLimit: '100% 免费,无需注册。每 IP 每滚动 24 小时 5 次,每次最多 3000 字符。 如需更多请稍候。',
    features: {
          writing: '写作改进',
          writingDesc: '提示词驱动的改写,让草稿更清晰、更自然;不保证检测器结果',
      bilingual: '中英双语',
      bilingualDesc: '支持英文和简体中文改写,保留原文意思和语种',
      private: '隐私保护',
          privateDesc: '无持久存储;短期内存缓存可能将输入哈希与输出保留最多 10 分钟。',
      free: '完全免费',
          freeDesc: '无注册、无广告、无水印、无付费升级',
    },
    seo: {
      whatTitle: '什么是 AI Humanizer?',
          whatBody: 'AI Humanizer 是免费在线写作改进工具：把生硬的 AI 辅助草稿改得更自然、清晰、更贴合你自己的表达。复制 ChatGPT / Gemini / Claude / Copilot 等输出,粘贴进来,通常几秒得到版本。提示词要求保留引用、数字和专有名词,请自行核对;模型输出不做后处理,不保证这些内容逐字不变。所有改写与文本自查均由 DeepSeek Chat(deepseek-chat)云端处理。自查结果是提示词驱动的启发式分析,DeepSeek 输出 ai_probability、human_probability、verdict、signals 和 explanation;没有直连 GPTZero、Turnitin 等第三方检测 API,也没有独立信号计算或加权集成,不能验证作者身份。结果仅为启发式参考,不是 ground truth。仅支持英文和简体中文。',
      whoTitle: '谁在用 AI Humanizer?',
      whoBody: '学生 — 把 AI 辅助写作的初稿改得更贴合自己的口吻。学生使用前请确认自己学校的学术诚信政策。营销人员 — 让营销文案、博客文章、产品描述读起来不像模板。作者 — 把机械的初稿润色成更自然的口吻。自由职业者 — 把生硬的交付稿改得更清晰自然。',
      howTitle: '写作改进怎么工作',
          howBody: '所有改写与文本自查均由 DeepSeek Chat(deepseek-chat)云端处理。自查是提示词驱动的启发式分析,DeepSeek 输出 ai_probability、human_probability、verdict、signals 和 explanation;没有直连 GPTZero、Turnitin 等第三方检测 API,也没有独立信号计算或加权集成。结果仅为启发式参考,不是 ground truth。改写提示词变化句子长度、加入口语化转折与第一人称视角、减少列表式结构,提示词要求保留原文事实和意思,请自行核对。无持久存储;短期内存缓存可能将输入哈希与输出保留最多 10 分钟。',
      trustTitle: '为什么这个工具值得信',
          trustBody: '目标是自然、清晰、保留原意的改写,而不是套同义词表的玩具。检测器判定并不可靠:2026-11-24 的公开自洽性试点用本站检测器只测得 13.3%（4/30）,早前未记录条件的 85–95% 内部印象已撤回;第三方抽查尚未完成,曾有改写被判 100% AI。这些数据只是局限证据,不是产品效果承诺。详见 /limitations。提示词要求返回 5 项信号;JSON 解析失败时会回退为空信号列表和固定 50/50 分数,因此不保证每次都返回完整 5 项明细。',
      refTitle: '为什么写作质量比检测分数更重要',
          refBody: '检测器的判定存在争议且并不可靠;这些公开资源用于理解检测原理,不代表本站接入其 API,也不是规避建议:',
      refGPTZero: 'GPTZero — AI 检测算法公开说明',
          refOpenAI: 'DetectGPT — 检测原理研究(外部参考)',
      refStanford: 'Stanford CRFM — DetectGPT',
      refTurnitin: 'Turnitin — AI Writing Detection 官方文档',
      faqTitle: '常见问题',
      ctaTitle: '现在就改进你的草稿',
      ctaBody: '粘贴、点按钮、复制。无需注册。',
    },
    faqList: [
            { q: 'AI Humanizer 真的免费吗?', a: '100% 免费,无需注册。每 IP 每滚动 24 小时 5 次,每次最多 3000 字符。无隐藏收费、无水印、无付费升级。' },
            { q: '能保证检测器判定结果吗?', a: '不能。检测器判定并不可靠:2026-11-24 的公开自洽性试点用本站检测器只测得 13.3%（4/30）,早前未记录条件的 85–95% 内部印象已撤回;第三方抽查尚未完成,曾有改写被判 100% AI。这些数据只是局限证据,不是产品效果承诺。所有改写与文本自查均由 DeepSeek Chat(deepseek-chat)云端处理。自查结果是提示词驱动的启发式分析,没有直连 GPTZero、Turnitin 等第三方检测 API,也没有独立信号计算或加权集成,不能验证作者身份。详见 /limitations。' },
      { q: '支持哪些 AI 源?', a: 'ChatGPT / GPT-4 / o1 / Gemini / Claude / Copilot / Jasper / Copy.ai / Perplexity / 任何 LLM。改写针对的是这些工具生成草稿中常见的模板化表达。' },
            { q: '你存我的文本吗?', a: '无持久存储;短期内存缓存可能将输入哈希与输出保留最多 10 分钟。无分析 cookie 或追踪像素;基于 IP 头的限流计数用于执行上述次数限制。详见 /privacy。' },
      { q: '能用于学校论文吗?', a: '能,但请遵守你学校的学术诚信政策。工具帮助你改写你有权限使用的文本,不帮你抄袭;引用请自行核对。' },
            { q: '支持中文吗?', a: '仅支持英文和简体中文。界面和改写都支持英文和简体中文,保留成语和口语表达。' },
    ],
    sectionWhatTitle: 'AI Humanizer 是什么',
        sectionWhatBody: 'AI Humanizer 是免费在线写作改进工具：把生硬的 AI 辅助草稿改得更自然、清晰、更贴合你自己的表达。粘贴 ChatGPT、Gemini、Claude、Copilot 等输出,通常几秒得到版本。所有改写与文本自查均由 DeepSeek Chat(deepseek-chat)云端处理;自查是提示词驱动的启发式分析,不是第三方检测 API,也不能验证作者身份。',
    sectionWhoTitle: '谁在用 AI Humanizer',
    sectionWhoBody: '学生把 AI 辅助写作的初稿改得更贴合自己的口吻。营销人员让营销文案、博客、产品描述读起来不像模板。作者把机械初稿润色成自然口吻。自由职业者交付的稿件改得更清晰自然。',
    sectionHowTitle: '工作原理',
        sectionHowBody: '所有改写与文本自查均由 DeepSeek Chat(deepseek-chat)云端处理。自查是提示词驱动的启发式分析,结果不是 ground truth。改写提示词变化句子长度、加入口语化转折和第一人称视角、减少列表式结构;提示词要求保留原文事实和意思,请自行核对。无持久存储;短期内存缓存可能将输入哈希与输出保留最多 10 分钟。',
    sectionFeaturesTitle: '核心功能',
    sectionTrustTitle: '为什么值得信',
        sectionTrustBody: '目标是自然、清晰、保留原意的改写,而不是套同义词表的玩具。检测器判定并不可靠:2026-11-24 的公开自洽性试点用本站检测器只测得 13.3%（4/30）,早前未记录条件的 85–95% 内部印象已撤回;第三方抽查尚未完成,曾有改写被判 100% AI。这些数据只是局限证据,不是产品效果承诺。详见 /limitations 与 /glossary。',
    sectionRefTitle: '为什么写作质量比检测分数更重要',
    refGPTZero: 'GPTZero — AI 检测算法',
    refStanford: 'Stanford CRFM — DetectGPT',
    refTurnitin: 'Turnitin — AI 检测官方文档',
    refAnthropic: 'DeepSeek — 模型卡与安全',
    sectionFaqTitle: '常见问题',
    sectionCtaTitle: '开始改进写作',
    sectionCtaBody: '粘贴 → 点按钮 → 复制。无需注册。',
    samplesTitle: '试试这几个示例',
    samples: [
      { label: 'ChatGPT 学术风', text: 'The advent of artificial intelligence has fundamentally transformed the way we approach complex problems in various domains. Machine learning algorithms, particularly deep neural networks, have demonstrated remarkable capabilities in tasks ranging from image recognition to natural language processing. These technologies continue to evolve at an unprecedented pace, offering new opportunities for innovation and efficiency across industries.' },
      { label: '营销文案', text: 'Our cutting-edge platform revolutionizes the way businesses manage their workflows. By leveraging state-of-the-art AI technology, we empower teams to achieve unprecedented levels of productivity. Our solution seamlessly integrates with existing systems, providing a comprehensive suite of tools designed to streamline operations and drive measurable results.' },
      { label: '学生作文', text: 'Climate change represents one of the most pressing challenges facing humanity in the 21st century. The scientific consensus overwhelmingly indicates that human activities, particularly the burning of fossil fuels, are the primary drivers of global warming. It is imperative that we take decisive action to mitigate these effects and transition to sustainable energy sources.' },
    ],
    footerNote: 'AI Humanizer · 免费在线写作改进工具',
  },
  en: {
    title: 'AI Humanizer',
    heroTitle: 'Free writing improvement tool for rough AI-assisted drafts',
        heroSubtitle: 'Free online writing tool that makes rough AI-assisted drafts clearer, more natural, and easier to make your own. English and Simplified Chinese. No signup. 100% free. No signup, 5 submissions per IP per rolling 24 hours, up to 3,000 characters per submission.',
    inputLabel: 'Paste your draft',
    inputPlaceholder: 'Paste text from ChatGPT, Gemini, Claude, Copilot, or any AI-assisted draft. Click Improve writing to get a clearer, more natural version.',
    outputLabel: 'Improved text',
    outputPlaceholder: 'Your rewritten text will appear here.',
    humanize: 'Improve writing',
    humanizing: 'Rewriting...',
    copy: 'Copy',
    copied: 'Copied',
    clear: 'Clear',
    paste: 'Paste',
    sample: 'Sample',
    errorEmpty: 'Please paste some text first',
    errorTooLong: 'Text exceeds 3,000 character limit. Please split into smaller chunks.',
    errorNetwork: 'Network error. Please try again.',
    errorApi: 'Rewrite failed. Please try again later.',
    charCount: 'characters',
        rateLimit: '100% free. No signup, 5 submissions per IP per rolling 24 hours, up to 3,000 characters per submission. Please wait before trying again.',
    features: {
          writing: 'Writing improvement',
          writingDesc: 'Prompt-driven rewriting for clearer, more natural prose; detector outcomes not guaranteed',
      bilingual: 'Bilingual Support',
      bilingualDesc: 'English and Simplified Chinese with natural idiom preservation',
      private: 'Privacy First',
          privateDesc: 'No persistent storage; a short-lived in-memory cache may retain a hash of the input and the output for up to 10 minutes. No analytics cookies or tracking pixels.',
      free: 'Always Free',
          freeDesc: 'No signup, no ads, no watermarks, no paid upgrades',
    },
    seo: {
      whatTitle: 'What is AI Humanizer?',
          whatBody: 'AI Humanizer is a free online writing tool that makes rough AI-assisted drafts clearer, more natural, and easier to make your own. Paste output from ChatGPT, Gemini, Claude, Copilot or another tool and usually get a version within a few seconds. The prompt asks the model to preserve citations, numbers and proper nouns; check them yourself — LLM output is not post-processed. All rewriting and text self-review is handled by DeepSeek Chat (deepseek-chat) in the cloud. Self-review is a prompt-driven heuristic analysis: DeepSeek outputs ai_probability, human_probability, verdict, signals and explanation. There is no direct integration with GPTZero, Turnitin or other third-party detector APIs, and no independent signal computation or weighted ensemble; it cannot validate authorship. The scoring is heuristic, not ground truth. English and Simplified Chinese only.',
      whoTitle: 'Who uses AI Humanizer?',
      whoBody: 'Students revise AI-assisted drafts in their own voice. Always check your school academic integrity policy first. Marketers make AI-assisted copy sound less templated. Authors polish mechanical first drafts into natural prose. Freelancers make stiff client deliverables clearer and more natural.',
      howTitle: 'How the writing improvement works',
          howBody: 'All rewriting and text self-review is handled by DeepSeek Chat (deepseek-chat) in the cloud. Self-review is a prompt-driven heuristic analysis: DeepSeek outputs ai_probability, human_probability, verdict, signals and explanation. There is no direct integration with GPTZero, Turnitin or other third-party detector APIs, and no independent signal computation or weighted ensemble. The scoring is heuristic, not ground truth. The prompt varies sentence length, adds conversational transitions and first-person voice, and reduces list structure; it asks the model to preserve the meaning and facts, which you should verify. No persistent storage; a short-lived in-memory cache may retain a hash of the input and the output for up to 10 minutes.',
      trustTitle: 'Why trust this tool',
          trustBody: 'Our goal is natural, meaning-preserving rewriting, not a synonym-swap toy. Detector verdicts are unreliable: a published self-check pilot on 2026-11-24 measured 13.3% (4/30) with this site’s own detector; the earlier undocumented 85–95% impression is withdrawn, and third-party spot-checks remain incomplete and returned 100% AI on rewrites. These figures are evidence of limits, not a product claim. See /limitations. The prompt asks for five signals; if JSON parsing fails, the tool falls back to an empty signals list and a fixed 50/50 score, so a full five-item breakdown is not guaranteed every time.',
      refTitle: 'Why writing quality matters more than detector scores',
          refBody: 'Detector verdicts are contested and unreliable; these public resources explain detection principles. None is integrated with this site, and none offers guidance on evading detection:',
      refGPTZero: 'GPTZero — How AI detection works',
          refOpenAI: 'DetectGPT — detection research (external reference)',
      refStanford: 'Stanford CRFM — DetectGPT',
      refTurnitin: 'Turnitin — AI Writing Detection documentation',
      faqTitle: 'Frequently asked questions',
      ctaTitle: 'Improve your draft now',
      ctaBody: 'Paste, click, copy. No signup needed.',
    },
    faqList: [
            { q: 'Is AI Humanizer really free?', a: 'Yes. 100% free. No signup, 5 submissions per IP per rolling 24 hours, up to 3,000 characters per submission. No hidden fees, watermarks or paid upgrades.' },
            { q: 'Can it guarantee a detector verdict?', a: 'No. Detector verdicts are unreliable: a published self-check pilot on 2026-11-24 measured 13.3% (4/30) with this site’s own detector; the earlier undocumented 85–95% impression is withdrawn, and third-party spot-checks remain incomplete and returned 100% AI on rewrites. These figures are evidence of limits, not a product claim. All rewriting and text self-review is handled by DeepSeek Chat (deepseek-chat) in the cloud, with no third-party detector API and no ability to validate authorship. See /limitations.' },
      { q: 'Which AI sources are supported?', a: 'ChatGPT / GPT-4 / o1 / Gemini / Claude / Copilot / Jasper / Copy.ai / Perplexity / any LLM. The rewrite targets templated phrasing common in drafts from these tools.' },
            { q: 'Do you store my text?', a: 'No persistent storage; a short-lived in-memory cache may retain a hash of the input and the output for up to 10 minutes. No analytics cookies or tracking pixels. IP-header-based rate-limit counters enforce the usage cap. See /privacy.' },
      { q: 'Can I use it for school essays?', a: 'Yes, but follow your school academic integrity policy. The tool helps you rewrite text you have permission to use — it does not help with plagiarism; verify citations yourself.' },
            { q: 'Does it support Chinese?', a: 'English and Simplified Chinese only. The interface and rewriting work in English and Simplified Chinese, preserving idioms and natural speech.' },
            { q: 'Is there a free writing tool with no signup required?', a: 'Yes. 100% free. No signup, 5 submissions per IP per rolling 24 hours, up to 3,000 characters per submission. No email or credit card required. There is no paid tier and no paid upgrade path. No persistent storage; a short-lived in-memory cache may retain a hash of the input and the output for up to 10 minutes.' },
            { q: 'What should college students look for in a writing tool?', a: 'A useful tool should keep citations such as (Smith, 2019) and footnotes in place, retain a formal register, and be free to use. AI Humanizer is 100% free with no signup and supports English and Simplified Chinese. The prompt asks the model to preserve citations, numbers and proper nouns; verify manually — LLM output is not post-processed. Always check your school academic integrity policy before submitting rewritten work.' },
    ],
    sectionWhatTitle: 'What is AI Humanizer?',
        sectionWhatBody: 'AI Humanizer is a free online writing tool that makes rough AI-assisted drafts clearer, more natural, and easier to make your own. Paste AI-assisted output from ChatGPT, Gemini, Claude or Copilot and usually get a version within a few seconds. All rewriting and text self-review is handled by DeepSeek Chat (deepseek-chat) in the cloud; self-review is a prompt-driven heuristic, not a third-party detector API, and it cannot validate authorship.',
    sectionWhoTitle: 'Who uses AI Humanizer',
    sectionWhoBody: 'Students revise AI-assisted drafts in their own voice. Marketers make AI-assisted copy sound less templated. Authors polish mechanical first drafts. Freelancers make stiff client deliverables clearer and more natural.',
    sectionHowTitle: 'How it works',
        sectionHowBody: 'All rewriting and text self-review is handled by DeepSeek Chat (deepseek-chat) in the cloud. Self-review is a prompt-driven heuristic; its scoring is not ground truth. The prompt varies sentence length, adds conversational transitions and first-person voice, and reduces list structure; it asks the model to preserve facts and meaning, which you should verify. No persistent storage; a short-lived in-memory cache may retain a hash of the input and the output for up to 10 minutes.',
    sectionFeaturesTitle: 'Core features',
    sectionTrustTitle: 'Why trust this tool',
        sectionTrustBody: 'Our goal is natural, meaning-preserving rewriting, not a synonym-swap toy. Detector verdicts are unreliable: a published self-check pilot on 2026-11-24 measured 13.3% (4/30) with this site’s own detector; the earlier undocumented 85–95% impression is withdrawn, and third-party spot-checks remain incomplete and returned 100% AI on rewrites. These figures are evidence of limits, not a product claim. See /limitations and /glossary.',
    sectionRefTitle: 'Why writing quality matters more than detector scores',
    refGPTZero: 'GPTZero — AI detection algorithm',
    refStanford: 'Stanford CRFM — DetectGPT',
    refTurnitin: 'Turnitin — AI detection official docs',
    refAnthropic: 'DeepSeek — Model card and safety',
    sectionFaqTitle: 'Frequently asked questions',
    sectionCtaTitle: 'Start improving your writing',
    sectionCtaBody: 'Paste, click, copy. No signup needed.',
    samplesTitle: 'Try these samples',
    samples: [
      { label: 'ChatGPT academic', text: 'The advent of artificial intelligence has fundamentally transformed the way we approach complex problems in various domains. Machine learning algorithms, particularly deep neural networks, have demonstrated remarkable capabilities in tasks ranging from image recognition to natural language processing. These technologies continue to evolve at an unprecedented pace, offering new opportunities for innovation and efficiency across industries.' },
      { label: 'Marketing copy', text: 'Our cutting-edge platform revolutionizes the way businesses manage their workflows. By leveraging state-of-the-art AI technology, we empower teams to achieve unprecedented levels of productivity. Our solution seamlessly integrates with existing systems, providing a comprehensive suite of tools designed to streamline operations and drive measurable results.' },
      { label: 'Student essay', text: 'Climate change represents one of the most pressing challenges facing humanity in the 21st century. The scientific consensus overwhelmingly indicates that human activities, particularly the burning of fossil fuels, are the primary drivers of global warming. It is imperative that we take decisive action to mitigate these effects and transition to sustainable energy sources.' },
    ],
    footerNote: 'AI Humanizer · Free online writing improvement tool',
  },
}

type Lang = 'zh' | 'en'

function HomePageContent({ lang }: { lang: Lang }) {
  const t = T[lang]
  const isZh = lang === 'zh'
  const otherLang: Lang = isZh ? 'en' : 'zh'
  const homePath = isZh ? '/zh' : '/'
  const otherPath = isZh ? '/' : '/zh'
  const toolPath = (slug: string) => (isZh ? `/zh${slug}` : slug)

  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [dailyCount, setDailyCount] = useState(0)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const remaining = MAX_CHARS - input.length
  const tooLong = input.length > MAX_CHARS
  const canSubmit = input.trim().length > 0 && !tooLong && !loading && dailyCount < 5

  useEffect(() => {
    try {
      const key = `humanizer_daily_${new Date().toISOString().split('T')[0]}`
      const raw = localStorage.getItem(key)
      if (raw) setDailyCount(parseInt(raw, 10) || 0)
    } catch {}
  }, [])

  const trackSubmit = () => {
    try {
      const key = `humanizer_daily_${new Date().toISOString().split('T')[0]}`
      const next = dailyCount + 1
      localStorage.setItem(key, String(next))
      setDailyCount(next)
    } catch {}
  }

  const handleHumanize = async () => {
    if (!input.trim()) {
      setError(t.errorEmpty)
      return
    }
    if (tooLong) {
      setError(t.errorTooLong)
      return
    }
    if (dailyCount >= 5) {
      setError(t.rateLimit)
      return
    }
    setError(null)
    setLoading(true)
    setOutput('')
    try {
      const res = await fetch('/api/humanize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input, lang }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || t.errorApi)
      }
      const data = await res.json()
      setOutput(data.output || '')
      trackSubmit()
    } catch (e: any) {
      setError(e?.message || t.errorNetwork)
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    if (!output) return
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
    setError(null)
    textareaRef.current?.focus()
  }

  const handleSample = (sampleText: string) => {
    setInput(sampleText)
    setOutput('')
    setError(null)
    textareaRef.current?.focus()
  }

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      if (text) setInput(text)
    } catch {}
  }

  const featureCards = useMemo(
    () => [
      { key: 'writing', icon: '✍️', color: 'from-violet-50 to-purple-50 border-violet-200' },
      { key: 'bilingual', icon: '🌐', color: 'from-blue-50 to-cyan-50 border-blue-200' },
      { key: 'private', icon: '🔒', color: 'from-emerald-50 to-teal-50 border-emerald-200' },
      { key: 'free', icon: '✨', color: 'from-amber-50 to-orange-50 border-amber-200' },
    ],
    []
  )

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href={homePath} className="flex-shrink-0 flex items-center gap-1.5 text-base font-bold text-violet-600 hover:text-violet-700 transition-colors">
            <span className="text-xl">✨</span>
            <span className="hidden sm:inline text-sm">{t.title}</span>
          </Link>
          <div className="flex-1" />
          <Link
            href={otherPath}
            hrefLang={otherLang === 'zh' ? 'zh-CN' : 'en'}
            title={isZh ? 'Switch to English' : '切换到中文'}
            className="flex-shrink-0 flex items-center gap-1 text-xs px-3 py-1.5 border border-gray-200 rounded-full hover:bg-gray-50 hover:border-violet-300 transition-colors"
          >
            <span>🌐</span>
            <span className="hidden sm:inline">{isZh ? 'EN' : '中文'}</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6 space-y-6">
        {/* Hero */}
        <section className="bg-gradient-to-br from-violet-50 via-white to-purple-50 rounded-2xl p-6 border border-violet-100 shadow-sm">
          <div className="text-center">
            <div className="text-3xl mb-2">✨</div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">{t.heroTitle}</h1>
            <p className="text-sm text-gray-600 mb-4 max-w-xl mx-auto leading-relaxed">{t.heroSubtitle}</p>
            <div className="flex flex-wrap justify-center gap-2 text-xs">
              <span className="px-3 py-1 bg-white border border-violet-200 text-violet-700 rounded-full">✓ {t.features.writing}</span>
              <span className="px-3 py-1 bg-white border border-violet-200 text-violet-700 rounded-full">✓ {t.features.bilingual}</span>
              <span className="px-3 py-1 bg-white border border-violet-200 text-violet-700 rounded-full">✓ {t.features.private}</span>
              <span className="px-3 py-1 bg-white border border-violet-200 text-violet-700 rounded-full">✓ {t.features.free}</span>
            </div>
          </div>
        </section>

        {/* Humanizer tool */}
        <section className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="space-y-4">
            {/* Input */}
            <div>
              <label htmlFor="input" className="block text-sm font-semibold text-gray-800 mb-2">
                {t.inputLabel}
              </label>
              <textarea
                id="input"
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.inputPlaceholder}
                rows={8}
                className="w-full p-3 text-sm border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-300 resize-y"
              />
              <div className="flex items-center justify-between mt-2 text-xs">
                <span className={tooLong ? 'text-red-500' : 'text-gray-500'}>
                  {input.length} / {MAX_CHARS} {t.charCount}
                </span>
                <div className="flex gap-2">
                  <button onClick={handlePaste} className="text-violet-600 hover:text-violet-700 hover:underline">
                    {t.paste}
                  </button>
                  <button onClick={handleClear} className="text-gray-500 hover:text-gray-600">
                    {t.clear}
                  </button>
                </div>
              </div>
            </div>

            {/* Action */}
            <button
              onClick={handleHumanize}
              disabled={!canSubmit}
              className="w-full bg-violet-600 hover:bg-violet-700 disabled:bg-gray-200 disabled:text-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors text-sm"
            >
              {loading ? t.humanizing : t.humanize}
            </button>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Output */}
            {(output || loading) && (
              <div>
                <label htmlFor="output" className="block text-sm font-semibold text-gray-800 mb-2">
                  {t.outputLabel}
                </label>
                <textarea
                  id="output"
                  value={output}
                  readOnly
                  placeholder={t.outputPlaceholder}
                  rows={8}
                  className="w-full p-3 text-sm border border-violet-200 bg-violet-50/30 rounded-lg resize-y focus:outline-none"
                />
                {output && (
                  <div className="flex items-center justify-end mt-2">
                    <button
                      onClick={handleCopy}
                      className="text-xs px-3 py-1.5 bg-violet-100 text-violet-700 rounded-full hover:bg-violet-200 transition-colors"
                    >
                      {copied ? `✓ ${t.copied}` : t.copy}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Samples */}
        <section className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-base font-bold text-gray-800 mb-3">{t.samplesTitle}</h2>
          <div className="space-y-2">
            {t.samples.map((s, i) => (
              <button
                key={i}
                onClick={() => handleSample(s.text)}
                className="block w-full text-left p-3 bg-gray-50 hover:bg-violet-50 border border-gray-200 hover:border-violet-200 rounded-lg transition-colors text-sm"
              >
                <div className="font-medium text-violet-700 text-xs mb-1">{s.label}</div>
                <div className="text-gray-600 text-xs line-clamp-2">{s.text}</div>
              </button>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-4">{t.sectionFeaturesTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {featureCards.map((f) => {
              const key = f.key as keyof typeof t.features
              return (
                <div key={f.key} className={`bg-gradient-to-br ${f.color} rounded-xl p-4 border`}>
                  <div className="text-2xl mb-2">{f.icon}</div>
                  <div className="font-semibold text-gray-800 mb-1 text-sm">{t.features[key]}</div>
                  <div className="text-xs text-gray-600 leading-relaxed">{t.features[`${key}Desc` as keyof typeof t.features]}</div>
                </div>
              )
            })}
          </div>
        </section>

        {/* What */}
        <section className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-3">{t.sectionWhatTitle}</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{t.sectionWhatBody}</p>
        </section>

        {/* Who */}
        <section className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-3">{t.sectionWhoTitle}</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{t.sectionWhoBody}</p>
        </section>

        {/* How */}
        <section className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-3">{t.sectionHowTitle}</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{t.sectionHowBody}</p>
        </section>

        {/* Trust */}
        <section className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-3">{t.sectionTrustTitle}</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{t.sectionTrustBody}</p>
        </section>

        {/* References */}
        <section className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 border border-violet-200 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-3">{t.sectionRefTitle}</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="https://gptzero.me" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:text-violet-700 hover:underline">
                {t.refGPTZero} →
              </a>
            </li>
            <li>
              <a href="https://crfm.stanford.edu/2023/05/02/detectgpt.html" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:text-violet-700 hover:underline">
                {t.refStanford} →
              </a>
            </li>
            <li>
              <a href="https://www.turnitin.com/products/ai-writing-detection" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:text-violet-700 hover:underline">
                {t.refTurnitin} →
              </a>
            </li>
            <li>
              <a href="https://platform.deepseek.com" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:text-violet-700 hover:underline">
                {t.refAnthropic} →
              </a>
            </li>
          </ul>
        </section>

        {/* FAQ */}
        <section className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-4">{t.sectionFaqTitle}</h2>
          <div className="space-y-4">
            {t.faqList.map((f, i) => (
              <div key={i}>
                <h3 className="text-base font-semibold text-gray-800 mb-1">{f.q}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-4">
          <h2 className="text-lg font-bold text-gray-800 mb-2">{t.sectionCtaTitle}</h2>
          <p className="text-sm text-gray-500">{t.sectionCtaBody}</p>
        </section>

        {/* Related tools */}
        <section className="border-t border-gray-200 pt-6">
          <h2 className="text-xs text-gray-500 uppercase tracking-wide mb-3 font-medium">
            {isZh ? '其他写作工具' : 'Other writing tools'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link href={toolPath('/essay-humanizer')} className="block p-3 bg-white border border-gray-200 hover:border-violet-300 rounded-lg transition-colors">
              <div className="font-semibold text-violet-700 text-sm mb-1">EssayRewriter →</div>
              <div className="text-xs text-gray-500 leading-relaxed">{isZh ? '学生论文写作改进;提示词要求保留引用与事实,请自行核对' : 'Essay writing improvement; the prompt asks to preserve citations and facts — verify manually.'}</div>
            </Link>
            <Link href={toolPath('/turnitin-bypass')} className="block p-3 bg-white border border-gray-200 hover:border-violet-300 rounded-lg transition-colors">
              <div className="font-semibold text-violet-700 text-sm mb-1">Turnitin 写作说明 →</div>
              <div className="text-xs text-gray-500 leading-relaxed">{isZh ? '检测器为什么不可靠,以及如何写出自己的声音' : 'Why detectors are unreliable and how to write in your own voice.'}</div>
            </Link>
            <Link href={toolPath('/walterwrites')} className="block p-3 bg-white border border-gray-200 hover:border-violet-300 rounded-lg transition-colors">
              <div className="font-semibold text-violet-700 text-sm mb-1">Walter Writes 风格改写 →</div>
              <div className="text-xs text-gray-500 leading-relaxed">{isZh ? '自然、口语化的写作风格改写' : 'Rewrite in a natural, conversational style.'}</div>
            </Link>
            <Link href={toolPath('/walterwrites-vs-undetectable')} className="block p-3 bg-white border border-gray-200 hover:border-violet-300 rounded-lg transition-colors">
              <div className="font-semibold text-violet-700 text-sm mb-1">风格对比说明 →</div>
              <div className="text-xs text-gray-500 leading-relaxed">{isZh ? '写作风格对比与检测局限说明' : 'Writing-style comparison and detector limitations.'}</div>
            </Link>
            <Link href={toolPath('/originality-ai-bypass')} className="block p-3 bg-white border border-gray-200 hover:border-violet-300 rounded-lg transition-colors">
              <div className="font-semibold text-violet-700 text-sm mb-1">Originality.ai 检测说明 →</div>
              <div className="text-xs text-gray-500 leading-relaxed">{isZh ? '检测器可靠性说明与写作建议' : 'Detector reliability notes and writing guidance.'}</div>
            </Link>
            <Link href={toolPath('/ai-detector')} className="block p-3 bg-white border border-gray-200 hover:border-violet-300 rounded-lg transition-colors">
              <div className="font-semibold text-violet-700 text-sm mb-1">AI 文本自查 →</div>
              <div className="text-xs text-gray-500 leading-relaxed">{isZh ? '提示词驱动的启发式自查,非第三方检测 API' : 'Prompt-driven heuristic self-review, not a third-party detector API.'}</div>
            </Link>
            <Link href={toolPath('/jiang-ai-lv')} className="block p-3 bg-white border border-gray-200 hover:border-violet-300 rounded-lg transition-colors">
              <div className="font-semibold text-violet-700 text-sm mb-1">中文写作改进 →</div>
              <div className="text-xs text-gray-500 leading-relaxed">{isZh ? '简体中文改写,提示词要求保留原意,请自行核对' : 'Simplified Chinese rewriting; meaning-preserving prompt, verify manually.'}</div>
            </Link>
          </div>
        </section>

        {/* Sitemap */}
        <section className="border-t border-gray-200 pt-6">
          <h2 className="text-xs text-gray-500 uppercase tracking-wide mb-3 font-medium">
            {isZh ? '网站地图' : 'Sitemap'}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1">
            <Link href={homePath} className="text-sm text-gray-500 hover:text-violet-600 transition-colors py-0.5">Home</Link>
            <Link href={toolPath('/essay-humanizer')} className="text-sm text-gray-500 hover:text-violet-600 transition-colors py-0.5">Essay</Link>
            <Link href={toolPath('/turnitin-bypass')} className="text-sm text-gray-500 hover:text-violet-600 transition-colors py-0.5">Turnitin</Link>
            <Link href={toolPath('/walterwrites')} className="text-sm text-gray-500 hover:text-violet-600 transition-colors py-0.5">Walterwrites</Link>
            <Link href={toolPath('/ai-detector')} className="text-sm text-gray-500 hover:text-violet-600 transition-colors py-0.5">Detector</Link>
            <Link href={toolPath('/jiang-ai-lv')} className="text-sm text-gray-500 hover:text-violet-600 transition-colors py-0.5">中文写作</Link>
            <Link href={toolPath('/about')} className="text-sm text-gray-500 hover:text-violet-600 transition-colors py-0.5">About</Link>
            <a href="/llms.txt" className="text-sm text-gray-500 hover:text-violet-600 transition-colors py-0.5">llms.txt</a>
            <a href="/rss.xml" className="text-sm text-gray-500 hover:text-violet-600 transition-colors py-0.5">RSS</a>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </div>
  )
}

/**
 * `lang` is a required prop, not derived from `?lang=`. Reading search params
 * here forced the whole page into client-side rendering behind a Suspense
 * fallback, which shipped an empty body to crawlers. Language now comes from
 * the route (/ vs /zh) at build time.
 */
export default function HomePageClient({ lang }: { lang: Lang }) {
  return <HomePageContent lang={lang} />
}
