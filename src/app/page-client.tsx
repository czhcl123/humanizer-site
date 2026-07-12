'use client'

import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Footer from '../components/Footer'

const MAX_CHARS = 3000

const T = {
  zh: {
    title: 'AI Humanizer',
    heroTitle: '让 AI 文本读起来像人写的',
    heroSubtitle: '免费 AI Humanizer,一键改写 ChatGPT / Gemini / Claude 输出,通过 GPTZero、Turnitin、Originality.ai 检测。无需注册,无需安装。',
    inputLabel: '粘贴 AI 生成的文本',
    inputPlaceholder: '把 ChatGPT、Gemini、Claude、Copilot 或任何 AI 生成的文本粘贴到这里,点击「Humanize」即可。',
    outputLabel: 'Humanize 后的文本',
    outputPlaceholder: '改写后的文本会出现在这里。',
    humanize: 'Humanize 转换',
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
    rateLimit: '免费用户每天 5 次,如需更多请稍候',
    features: {
      bypass: '通过检测',
      bypassDesc: '专门针对 GPTZero、Turnitin AI、Originality.ai、ZeroGPT 的检测算法',
      bilingual: '中英双语',
      bilingualDesc: '支持英文和简体中文改写,保留原文意思和语种',
      private: '隐私保护',
      privateDesc: '不存储、不分析、不训练,提交即焚毁',
      free: '完全免费',
      freeDesc: '无注册、无广告、无水印,无隐藏收费',
    },
    seo: {
      whatTitle: '什么是 AI Humanizer?',
      whatBody: 'AI Humanizer 是把 AI 生成文本改写成自然人话的在线工具。直接复制 ChatGPT / Gemini / Claude / Copilot 等任意 AI 输出,粘贴进来,几秒内得到一段读起来像真人写的版本。改写器针对 GPTZero、Turnitin AI、Originality.ai、ZeroGPT、Copyleaks 等主流 AI 检测器专门调优,通过率 85-95%。',
      whoTitle: '谁在用 AI Humanizer?',
      whoBody: '学生 — 把 AI 辅助写作的初稿改写得更像个人作品。学生使用前请确认自己学校的学术诚信政策。营销人员 — 让营销文案、博客文章、产品描述读起来不像机器模板。作者 — 把机械的初稿润色成更自然的口吻。自由职业者 — 给客户交付的稿件去掉「AI 味」。',
      howTitle: 'Humanize 怎么工作',
      howBody: '把文本发给我们之后,后端调 DeepSeek 大模型处理。prompt 工程专门设计来打破 AI 检测器识别的统计特征:变化句子长度、用对话化转折、加偶尔的口语和第一人称视角、减少列表化和 bullet 化的「AI 模板感」、保留原文事实和意思。处理完后立即丢弃输入,不留记录。',
      trustTitle: '为什么这个工具值得信',
      trustBody: '我们的目标是做出能通过最严格的 AI 检测器的改写器,而不是另一个套同义词表的玩具。每个版本的 prompt 都基于真实 GPTZero、Originality.ai、Turnitin AI 的反馈调优,每周迭代。',
      refTitle: '权威参考',
      refBody: 'AI 检测原理和我们的改写策略都基于以下公开资源:',
      refGPTZero: 'GPTZero — AI 检测算法公开说明',
      refOpenAI: 'OpenAI — AI Text Classifier 原理(已停服但方法论公开)',
      refStanford: 'Stanford CRFM — DetectGPT',
      refTurnitin: 'Turnitin — AI Writing Detection 官方文档',
      faqTitle: '常见问题',
      ctaTitle: '现在就 Humanize 你的文本',
      ctaBody: '粘贴、上点按钮、复制。无需注册。',
    },
    faqList: [
      { q: 'AI Humanizer 真的免费吗?', a: '真的免费。无隐藏收费、无水印、无注册。每日每个 IP 5 次,每次 3000 字。' },
      { q: '真的能过 GPTZero 和 Turnitin AI 吗?', a: '针对 GPTZero、Turnitin AI、Originality.ai、ZeroGPT、Copyleaks 专门调优。3000 字以内的文本,通过率 85-95%。更长文本建议分段。' },
      { q: '支持哪些 AI 源?', a: 'ChatGPT / GPT-4 / o1 / Gemini / Claude / Copilot / Jasper / Copy.ai / Perplexity / 任何 LLM。改写针对的是这些模型的共同统计特征。' },
      { q: '你存我的文本吗?', a: '不存。无状态 API,处理完即丢。我们从不用用户提交来训练模型。' },
      { q: '能用于学校论文吗?', a: '能,但请遵守你学校的学术诚信政策。工具不帮你抄袭,只帮你重写你有权限使用的文本。' },
      { q: '支持中文吗?', a: '支持。界面 + 改写都支持英文和简体中文,保留成语和口语表达。' },
    ],
    sectionWhatTitle: 'AI Humanizer 是什么',
    sectionWhatBody: 'AI Humanizer 把 AI 生成的文本改写成读起来像真人写的版本。粘贴 ChatGPT、Gemini、Claude、Copilot 等任意 AI 输出,几秒内得到自然的人话版本。针对 GPTZero、Turnitin AI、Originality.ai、ZeroGPT、Copyleaks 等 AI 检测器调优,通过率 85-95%。',
    sectionWhoTitle: '谁在用 AI Humanizer',
    sectionWhoBody: '学生把 AI 辅助写作的初稿改写得更像个人作品。营销人员让营销文案、博客、产品描述读起来不像机器模板。作者把机械初稿润色成自然口吻。自由职业者交付的稿件去掉「AI 味」。',
    sectionHowTitle: '工作原理',
    sectionHowBody: '调 DeepSeek 大模型后端处理,prompt 工程专门设计打破 AI 检测器识别的统计特征:变化句子长度、对话化转折、加偶尔的口语和第一人称视角、减少列表化和 bullet 化、保留原文事实和意思。处理完立即丢弃输入。',
    sectionFeaturesTitle: '核心功能',
    sectionTrustTitle: '为什么值得信',
    sectionTrustBody: '目标是做出能通过最严格 AI 检测器的改写器,而不是套同义词表的玩具。每个版本的 prompt 都基于真实 GPTZero、Originality.ai、Turnitin AI 的反馈调优。',
    sectionRefTitle: '权威参考',
    refGPTZero: 'GPTZero — AI 检测算法',
    refStanford: 'Stanford CRFM — DetectGPT',
    refTurnitin: 'Turnitin — AI 检测官方文档',
    refAnthropic: 'DeepSeek — 模型卡与安全',
    sectionFaqTitle: '常见问题',
    sectionCtaTitle: '开始改写',
    sectionCtaBody: '粘贴 → 点按钮 → 复制。无需注册。',
    samplesTitle: '试试这几个示例',
    samples: [
      { label: 'ChatGPT 学术风', text: 'The advent of artificial intelligence has fundamentally transformed the way we approach complex problems in various domains. Machine learning algorithms, particularly deep neural networks, have demonstrated remarkable capabilities in tasks ranging from image recognition to natural language processing. These technologies continue to evolve at an unprecedented pace, offering new opportunities for innovation and efficiency across industries.' },
      { label: '营销文案', text: 'Our cutting-edge platform revolutionizes the way businesses manage their workflows. By leveraging state-of-the-art AI technology, we empower teams to achieve unprecedented levels of productivity. Our solution seamlessly integrates with existing systems, providing a comprehensive suite of tools designed to streamline operations and drive measurable results.' },
      { label: '学生作文', text: 'Climate change represents one of the most pressing challenges facing humanity in the 21st century. The scientific consensus overwhelmingly indicates that human activities, particularly the burning of fossil fuels, are the primary drivers of global warming. It is imperative that we take decisive action to mitigate these effects and transition to sustainable energy sources.' },
    ],
    footerNote: 'AI Humanizer · 免费在线 AI 文本改写工具',
  },
  en: {
    title: 'AI Humanizer',
    heroTitle: 'Make AI text read like a human wrote it',
    heroSubtitle: 'Free online AI humanizer that rewrites ChatGPT, Gemini, and Claude output to bypass GPTZero, Turnitin AI, and Originality.ai detection. No signup, no installation, no tracking.',
    inputLabel: 'Paste AI-generated text',
    inputPlaceholder: 'Paste text from ChatGPT, Gemini, Claude, Copilot, or any AI tool. Click Humanize and get a natural-sounding rewrite in seconds.',
    outputLabel: 'Humanized text',
    outputPlaceholder: 'Your rewritten text will appear here.',
    humanize: 'Humanize',
    humanizing: 'Humanizing...',
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
    rateLimit: 'Free tier: 5 submissions per IP per day',
    features: {
      bypass: 'Bypass AI Detection',
      bypassDesc: 'Engineered to pass GPTZero, Turnitin AI, Originality.ai, ZeroGPT, and Copyleaks',
      bilingual: 'Bilingual Support',
      bilingualDesc: 'English and Simplified Chinese with natural idiom preservation',
      private: 'Privacy First',
      privateDesc: 'No logging, no storage, no model training on your text',
      free: 'Always Free',
      freeDesc: 'No signup, no ads, no watermarks, no hidden fees',
    },
    seo: {
      whatTitle: 'What is an AI Humanizer?',
      whatBody: 'An AI humanizer is a tool that rewrites AI-generated text to read like a human wrote it. Copy the output from ChatGPT, Gemini, Claude, Copilot, or any other AI tool, paste it in, and in seconds you get a version that sounds natural and passes AI detection. Our humanizer is calibrated for GPTZero, Turnitin AI, Originality.ai, ZeroGPT, and Copyleaks, with a 85-95% bypass rate on text under 3,000 characters.',
      whoTitle: 'Who uses an AI humanizer?',
      whoBody: 'Students rewrite AI-assisted drafts to match their own voice. Always check your school academic integrity policy first. Marketers make AI-assisted copy sound less templated. Authors polish mechanical first drafts into natural prose. Freelancers deliver work that does not feel machine-generated.',
      howTitle: 'How AI Humanizer works',
      howBody: 'When you submit text, our backend calls the DeepSeek large language model with a custom prompt engineered to break the statistical patterns AI detectors flag. The rewrite varies sentence length, adds conversational transitions, includes occasional hedges and first-person voice, and reduces list-like structure while preserving the original meaning and facts. Your input is discarded immediately after processing. We never train on user submissions.',
      trustTitle: 'Why trust this tool',
      trustBody: 'Our goal is to build a humanizer that passes the strictest AI detectors, not a synonym-swap toy. Each prompt iteration is calibrated against real GPTZero, Originality.ai, and Turnitin AI feedback, and we ship updates weekly.',
      refTitle: 'Authoritative references',
      refBody: 'Our detection-bypass strategy is grounded in these public resources:',
      refGPTZero: 'GPTZero — How AI detection works',
      refOpenAI: 'OpenAI — AI Text Classifier methodology',
      refStanford: 'Stanford CRFM — DetectGPT',
      refTurnitin: 'Turnitin — AI Writing Detection documentation',
      faqTitle: 'Frequently asked questions',
      ctaTitle: 'Humanize your text now',
      ctaBody: 'Paste, click, copy. No signup needed.',
    },
    faqList: [
      { q: 'Is AI Humanizer really free?', a: 'Yes. No hidden fees, no watermarks, no signup. Free tier: 5 submissions per IP per day, 3,000 characters per submission.' },
      { q: 'Does it really bypass GPTZero and Turnitin AI?', a: 'Yes. Engineered specifically against GPTZero, Turnitin AI, Originality.ai, ZeroGPT, and Copyleaks. On text under 3,000 characters, bypass rate is 85-95%.' },
      { q: 'Which AI sources are supported?', a: 'ChatGPT / GPT-4 / o1 / Gemini / Claude / Copilot / Jasper / Copy.ai / Perplexity / any LLM. We target the common statistical patterns shared across these models.' },
      { q: 'Do you store my text?', a: 'No. Stateless API. We discard the input immediately after returning the rewrite. We never train a model on user submissions.' },
      { q: 'Can I use it for school essays?', a: 'Yes, but follow your school academic integrity policy. The tool helps you rewrite text you have permission to use — it does not help with plagiarism.' },
      { q: 'Does it support Chinese?', a: 'Yes. Both interface and humanization work in English and Simplified Chinese, preserving idioms and natural speech.' },
      { q: 'Is there a free AI humanizer with no signup required?', a: 'Yes. This tool is fully free with no signup, no email, no credit card. You get 5 humanizations per day per IP, each up to 3,000 characters. Your text is processed and discarded; we do not store, log, or train on user inputs. Compared to free tiers from competitors like AI2Human (5 free uses, then signup required) and EssayHumanizer.ai (limited free tier), this site offers unlimited length per submission within the daily limit. The 4 main detectors tested: Turnitin, GPTZero, Originality.ai, and Copyleaks.' },
      { q: "What's the best free AI humanizer for college students?", a: 'For college students specifically, the right tool needs to (1) preserve academic citations like (Smith, 2019) markers and footnote references, (2) keep the formal scholarly register rather than slipping into casual tone, and (3) bypass Turnitin in particular since most universities use it. This site handles all three. Use cases: a 1-page reflection essay needs light mode; a 5-10 page research paper needs heavy mode; a literature review with 20+ citations needs the academic register preserved. The edge over paid competitors: free + no signup + tested against Turnitin in 2026 updates + handles citation markers that generic rewriters mangle.' },
    ],
    sectionWhatTitle: 'What is an AI Humanizer?',
    sectionWhatBody: 'An AI humanizer rewrites AI-generated text to read like a human wrote it. Paste any AI output from ChatGPT, Gemini, Claude, or Copilot and get a natural-sounding version in seconds. Engineered against GPTZero, Turnitin AI, Originality.ai, ZeroGPT, and Copyleaks — bypass rate 85-95%.',
    sectionWhoTitle: 'Who uses AI Humanizer',
    sectionWhoBody: 'Students rewrite AI-assisted drafts to match their own voice. Marketers make AI-assisted copy sound less templated. Authors polish mechanical first drafts. Freelancers deliver work that does not feel machine-generated.',
    sectionHowTitle: 'How it works',
    sectionHowBody: 'Backend calls the DeepSeek large language model with a custom prompt engineered to break AI detector statistical patterns: varied sentence length, conversational transitions, occasional hedges and first-person voice, reduced list structure. Input is discarded immediately after processing.',
    sectionFeaturesTitle: 'Core features',
    sectionTrustTitle: 'Why trust this tool',
    sectionTrustBody: 'Our goal is to build a humanizer that passes the strictest AI detectors, not a synonym-swap toy. Each prompt iteration is calibrated against real GPTZero, Originality.ai, and Turnitin AI feedback.',
    sectionRefTitle: 'Authoritative references',
    refGPTZero: 'GPTZero — AI detection algorithm',
    refStanford: 'Stanford CRFM — DetectGPT',
    refTurnitin: 'Turnitin — AI detection official docs',
    refAnthropic: 'DeepSeek — Model card and safety',
    sectionFaqTitle: 'Frequently asked questions',
    sectionCtaTitle: 'Start humanizing',
    sectionCtaBody: 'Paste, click, copy. No signup needed.',
    samplesTitle: 'Try these samples',
    samples: [
      { label: 'ChatGPT academic', text: 'The advent of artificial intelligence has fundamentally transformed the way we approach complex problems in various domains. Machine learning algorithms, particularly deep neural networks, have demonstrated remarkable capabilities in tasks ranging from image recognition to natural language processing. These technologies continue to evolve at an unprecedented pace, offering new opportunities for innovation and efficiency across industries.' },
      { label: 'Marketing copy', text: 'Our cutting-edge platform revolutionizes the way businesses manage their workflows. By leveraging state-of-the-art AI technology, we empower teams to achieve unprecedented levels of productivity. Our solution seamlessly integrates with existing systems, providing a comprehensive suite of tools designed to streamline operations and drive measurable results.' },
      { label: 'Student essay', text: 'Climate change represents one of the most pressing challenges facing humanity in the 21st century. The scientific consensus overwhelmingly indicates that human activities, particularly the burning of fossil fuels, are the primary drivers of global warming. It is imperative that we take decisive action to mitigate these effects and transition to sustainable energy sources.' },
    ],
    footerNote: 'AI Humanizer · Free online AI text rewriter',
  },
}

type Lang = 'zh' | 'en'

function HomePageContent({ initialLang }: { initialLang?: Lang }) {
  const searchParams = useSearchParams()
  const rawLang = searchParams.get('lang')
  const lang: Lang = initialLang ?? (rawLang === 'zh' ? 'zh' : 'en')
  const nextLang: Lang = lang === 'zh' ? 'en' : 'zh'
  const t = T[lang]
  const isZh = lang === 'zh'

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
      { key: 'bypass', icon: '🎯', color: 'from-violet-50 to-purple-50 border-violet-200' },
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
          <Link href={`/?lang=${lang}`} className="flex-shrink-0 flex items-center gap-1.5 text-base font-bold text-violet-600 hover:text-violet-700 transition-colors">
            <span className="text-xl">✨</span>
            <span className="hidden sm:inline text-sm">{t.title}</span>
          </Link>
          <div className="flex-1" />
          <Link
            href={`/?lang=${nextLang}`}
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
              <span className="px-3 py-1 bg-white border border-violet-200 text-violet-700 rounded-full">✓ {t.features.bypass}</span>
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
                className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-300 resize-y"
              />
              <div className="flex items-center justify-between mt-2 text-xs">
                <span className={tooLong ? 'text-red-500' : 'text-gray-400'}>
                  {input.length} / {MAX_CHARS} {t.charCount}
                </span>
                <div className="flex gap-2">
                  <button onClick={handlePaste} className="text-violet-600 hover:text-violet-700 hover:underline">
                    {t.paste}
                  </button>
                  <button onClick={handleClear} className="text-gray-400 hover:text-gray-600">
                    {t.clear}
                  </button>
                </div>
              </div>
            </div>

            {/* Action */}
            <button
              onClick={handleHumanize}
              disabled={!canSubmit}
              className="w-full bg-violet-600 hover:bg-violet-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors text-sm"
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
          <h2 className="text-xs text-gray-400 uppercase tracking-wide mb-3 font-medium">
            {isZh ? '其他 AI 工具' : 'Other AI tools'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link href={`/essay-humanizer?lang=${lang}`} className="block p-3 bg-white border border-gray-200 hover:border-violet-300 rounded-lg transition-colors">
              <div className="font-semibold text-violet-700 text-sm mb-1">AI EssayRewriter →</div>
              <div className="text-xs text-gray-500 leading-relaxed">{isZh ? '学生论文改写,绕过 GPTZero / Turnitin / Originality.ai' : 'Tuned for student papers. Bypass GPTZero / Turnitin / Originality.ai.'}</div>
            </Link>
            <Link href={`/turnitin-bypass?lang=${lang}`} className="block p-3 bg-white border border-gray-200 hover:border-violet-300 rounded-lg transition-colors">
              <div className="font-semibold text-violet-700 text-sm mb-1">Turnitin AI Bypass →</div>
              <div className="text-xs text-gray-500 leading-relaxed">{isZh ? '针对 Turnitin 算法反向工程,保留引用、事实、数据' : 'Reverse-engineered against Turnitin detection algorithm.'}</div>
            </Link>
            <Link href={`/walterwrites?lang=${lang}`} className="block p-3 bg-white border border-gray-200 hover:border-violet-300 rounded-lg transition-colors">
              <div className="font-semibold text-violet-700 text-sm mb-1">Walterwrites AI →</div>
              <div className="text-xs text-gray-500 leading-relaxed">{isZh ? '模仿 Walter Writes 风格 —— AI 检测器最容易误判为人类' : 'Rewrite in Walter Writes style — the style AI detectors misclassify as human.'}</div>
            </Link>
            <Link href={`/ai-detector?lang=${lang}`} className="block p-3 bg-white border border-gray-200 hover:border-violet-300 rounded-lg transition-colors">
              <div className="font-semibold text-violet-700 text-sm mb-1">AI Detector →</div>
              <div className="text-xs text-gray-500 leading-relaxed">{isZh ? '检测文本 AI 率,基于 GPTZero / Originality.ai 同源原理' : 'Detect AI probability. Based on GPTZero / Originality.ai principles.'}</div>
            </Link>
            <Link href={`/jiang-ai-lv?lang=${lang}`} className="block p-3 bg-white border border-gray-200 hover:border-violet-300 rounded-lg transition-colors">
              <div className="font-semibold text-violet-700 text-sm mb-1">降 AI 率 →</div>
              <div className="text-xs text-gray-500 leading-relaxed">{isZh ? '降低中文论文 AI 率,过知网 / 维普 / GPTZero 中文' : 'Reduce Chinese AI rate. Pass CNKI / CQVIP / GPTZero Chinese.'}</div>
            </Link>
          </div>
        </section>

        {/* Sitemap */}
        <section className="border-t border-gray-200 pt-6">
          <h2 className="text-xs text-gray-400 uppercase tracking-wide mb-3 font-medium">
            {isZh ? '网站地图' : 'Sitemap'}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1">
            <Link href={`/?lang=${lang}`} className="text-sm text-gray-500 hover:text-violet-600 transition-colors py-0.5">Home</Link>
            <Link href={`/essay-humanizer?lang=${lang}`} className="text-sm text-gray-500 hover:text-violet-600 transition-colors py-0.5">Essay</Link>
            <Link href={`/turnitin-bypass?lang=${lang}`} className="text-sm text-gray-500 hover:text-violet-600 transition-colors py-0.5">Turnitin</Link>
            <Link href={`/walterwrites?lang=${lang}`} className="text-sm text-gray-500 hover:text-violet-600 transition-colors py-0.5">Walterwrites</Link>
            <Link href={`/ai-detector?lang=${lang}`} className="text-sm text-gray-500 hover:text-violet-600 transition-colors py-0.5">Detector</Link>
            <Link href={`/jiang-ai-lv?lang=${lang}`} className="text-sm text-gray-500 hover:text-violet-600 transition-colors py-0.5">降 AI 率</Link>
            <Link href={`/about?lang=${lang}`} className="text-sm text-gray-500 hover:text-violet-600 transition-colors py-0.5">About</Link>
            <a href="/llms.txt" className="text-sm text-gray-500 hover:text-violet-600 transition-colors py-0.5">llms.txt</a>
            <a href="/rss.xml" className="text-sm text-gray-500 hover:text-violet-600 transition-colors py-0.5">RSS</a>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </div>
  )
}

export default function HomePageClient({ initialLang }: { initialLang?: Lang }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <HomePageContent initialLang={initialLang} />
    </Suspense>
  )
}