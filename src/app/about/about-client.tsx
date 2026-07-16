'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Footer from '../../components/Footer'

const T = {
  zh: {
    title: '关于 AI Humanizer',
    mission: '我们的使命',
    missionBody: '做出能通过最严格 AI 检测器的改写工具,免费可用,保护隐私。',
    howWorks: '工作原理',
    howWorksBody: '后端调 DeepSeek 大模型,prompt 工程专门设计打破 AI 检测器识别的统计特征:变化句子长度、加口语化转折、用第一人称和模糊词、减少列表化结构、避免 AI 八股词。输入通过无状态 API 处理,处理完立即丢弃,不存储,不分析,不训练。',
    privacy: '隐私保护',
    privacyBody: '我们不存储你提交的文本。我们不训练模型。我们不使用第三方追踪。无 cookie,无登录,无数据收集。',
    limitations: '局限与责任',
    limitationsBody: '我们不帮助抄袭。工具帮你重写你有权限使用的文本。使用者需遵守所在机构的学术诚信政策。',
    contact: '联系方式',
    contactBody: '问题、反馈、合作,欢迎联系。',
    backHome: '← 返回首页',
    sections: '页面',
    homeLink: '首页',
    aboutLink: '关于',
    llms: 'llms.txt',
  },
  en: {
    title: 'About AI Humanizer',
    mission: 'Our mission',
    missionBody: 'Build a humanizer that passes the strictest AI detectors, free for everyone, privacy-respecting.',
    howWorks: 'How it works',
    howWorksBody: 'The backend calls the DeepSeek large language model with a custom system prompt engineered to break the statistical patterns AI detectors flag: varied sentence length, conversational transitions, occasional first-person voice and hedges, reduced list-like structure, and avoidance of AI vocabulary like "delve", "leverage", "robust", "comprehensive". Input is processed through a stateless API and discarded immediately — no storage, no analysis, no training.',
    privacy: 'Privacy first',
    privacyBody: 'We do not store your submitted text. We do not train models on user submissions. We do not use third-party trackers. No cookies, no signup, no data collection.',
    limitations: 'Limitations & responsibility',
    limitationsBody: 'We do not help with plagiarism. The tool helps you rewrite text you have permission to use. Users are responsible for following their school or organization academic integrity policies.',
    contact: 'Contact',
    contactBody: 'Questions, feedback, collaboration — get in touch.',
    backHome: '← Back to home',
    sections: 'Pages',
    homeLink: 'Home',
    aboutLink: 'About',
    llms: 'llms.txt',
  },
}

type Lang = 'zh' | 'en'

function AboutContent({ initialLang }: { initialLang?: Lang }) {
  const searchParams = useSearchParams()
  const rawLang = searchParams.get('lang')
  const lang: Lang = initialLang ?? (rawLang === 'zh' ? 'zh' : 'en')
  const t = T[lang]
  const isZh = lang === 'zh'

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href={`/?lang=${lang}`} className="flex-shrink-0 flex items-center gap-1.5 text-base font-bold text-violet-600 hover:text-violet-700 transition-colors">
            <span className="text-xl">✨</span>
            <span className="hidden sm:inline text-sm">AI Humanizer</span>
          </Link>
          <div className="flex-1" />
          <Link
            href={`/?lang=${lang === 'zh' ? 'en' : 'zh'}`}
            className="flex-shrink-0 flex items-center gap-1 text-xs px-3 py-1.5 border border-gray-200 rounded-full hover:bg-gray-50 hover:border-violet-300 transition-colors"
          >
            <span>🌐</span>
            <span className="hidden sm:inline">{isZh ? 'EN' : '中文'}</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6 space-y-6">
        <section className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <Link href={`/?lang=${lang}`} className="text-sm text-violet-600 hover:underline mb-3 inline-block">
            {t.backHome}
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{t.title}</h1>
          <p className="text-sm text-gray-500">
            {isZh ? '建立于 2026 年 7 月' : 'Founded July 2026'}
          </p>
        </section>

        <section className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-3">{t.mission}</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{t.missionBody}</p>
        </section>

        <section className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-3">{t.howWorks}</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{t.howWorksBody}</p>
        </section>

        <section className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-3">{t.privacy}</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{t.privacyBody}</p>
        </section>

        <section className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-3">{t.limitations}</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{t.limitationsBody}</p>
        </section>

        <section className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 border border-violet-200 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-3">{t.contact}</h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-3">{t.contactBody}</p>
          <div className="space-y-1 text-sm">
            <div>
              <a href="https://github.com/czhcl123/humanizer-site" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">
                GitHub →
              </a>
            </div>
            <div>
              <a href="https://gpt-undetectable.com/llms.txt" className="text-violet-600 hover:underline">
                llms.txt →
              </a>
            </div>
          </div>
        </section>

        <section className="border-t border-gray-200 pt-6">
          <h2 className="text-xs text-gray-400 uppercase tracking-wide mb-3 font-medium">{t.sections}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1">
            <Link href={`/?lang=${lang}`} className="text-sm text-gray-500 hover:text-violet-600 transition-colors py-0.5">
              ✨ {t.homeLink}
            </Link>
            <Link href={`/about?lang=${lang}`} className="text-sm text-gray-500 hover:text-violet-600 transition-colors py-0.5">
              📖 {t.aboutLink}
            </Link>
            <a href={`/llms.txt`} className="text-sm text-gray-500 hover:text-violet-600 transition-colors py-0.5">
              🤖 {t.llms}
            </a>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </div>
  )
}

export default function AboutClient({ initialLang }: { initialLang?: Lang }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <AboutContent initialLang={initialLang} />
    </Suspense>
  )
}