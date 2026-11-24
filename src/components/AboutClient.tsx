'use client'

import Link from 'next/link'
import Footer from './Footer'

const T = {
  zh: {
    title: '关于 AI Humanizer',
    mission: '我们的使命',
    missionBody: '帮助人们把生硬的 AI 辅助草稿改得更自然、清晰、更贴合自己的表达;免费可用,保护隐私。',
    howWorks: '工作原理',
    howWorksBody: '后端调用 DeepSeek Chat（deepseek-chat）,提示词要求改善句子长度与节奏、语气和行文结构,让草稿更自然清晰,并尽量保留原意、数字和引用（请自行核对）。文本通过服务端 API 处理,不做持久存储;有上限的内存缓存保留输入哈希与输出最长 10 分钟、最多 500 条,并按 IP 头记录限流计数,详见 /zh/privacy。本站不直连第三方检测器,分数不是作者身份的判定。',
    privacy: '隐私保护',
    privacyBody: '不做持久存储;有上限的内存缓存保留输入哈希与输出最长 10 分钟,并按 IP 记录限流计数,详见 /zh/privacy。不使用分析 cookie 或追踪像素,不用用户提交内容训练模型,无需注册。',
    limitations: '局限与责任',
    limitationsBody: '我们不帮助抄袭。工具帮你改进你有权限使用的草稿。语言模型的输出没有后置核验,数字、引用和专有名词请自行检查;检测分数不可靠,不能用来证明作者身份。使用者需遵守所在机构的学术诚信政策。',
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
    missionBody: 'Help people make rough AI-assisted drafts clearer, more natural and easier to make their own — free for everyone, privacy-respecting.',
    howWorks: 'How it works',
    howWorksBody: 'The backend calls DeepSeek Chat (deepseek-chat) with a prompt that asks for clearer sentence length and rhythm, tone and structure, so a rough draft reads more naturally and in the writer\'s own voice. The prompt asks the model to preserve meaning, numbers and citations, but you must check them yourself. No persistent storage; a bounded 10-minute in-memory cache of up to 500 entries and IP-header rate-limit counters are used — see /privacy for details. There is no connection to third-party detectors, and no score is a verdict on authorship.',
    privacy: 'Privacy first',
    privacyBody: 'No persistent storage; a bounded 10-minute in-memory cache and IP-based rate-limit counters are used — see /privacy for details. No analytics cookies, no tracking pixels, no model training, no signup.',
    limitations: 'Limitations & responsibility',
    limitationsBody: 'We do not help with plagiarism. The tool helps you improve drafts you have permission to use. LLM output has no post-processing verification, so check numbers, citations and proper nouns yourself. Detector scores are unreliable and cannot establish authorship. Users are responsible for following their school or organization academic integrity policies.',
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

function AboutContent({ lang }: { lang: Lang }) {
  const t = T[lang]
  const isZh = lang === 'zh'
  const otherLang: Lang = isZh ? 'en' : 'zh'
  const homePath = isZh ? '/zh' : '/'
  const otherPath = isZh ? '/' : '/zh'

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href={homePath} className="flex-shrink-0 flex items-center gap-1.5 text-base font-bold text-violet-600 hover:text-violet-700 transition-colors">
            <span className="text-xl">✨</span>
            <span className="hidden sm:inline text-sm">AI Humanizer</span>
          </Link>
          <div className="flex-1" />
          <Link
            href={otherPath}
            hrefLang={otherLang === 'zh' ? 'zh-CN' : 'en'}
            className="flex-shrink-0 flex items-center gap-1 text-xs px-3 py-1.5 border border-gray-200 rounded-full hover:bg-gray-50 hover:border-violet-300 transition-colors"
          >
            <span>🌐</span>
            <span className="hidden sm:inline">{isZh ? 'EN' : '中文'}</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6 space-y-6">
        <section className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <Link href={homePath} className="text-sm text-violet-600 hover:underline mb-3 inline-block">
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
          <h2 className="text-xs text-gray-500 uppercase tracking-wide mb-3 font-medium">{t.sections}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1">
            <Link href={homePath} className="text-sm text-gray-500 hover:text-violet-600 transition-colors py-0.5">
              ✨ {t.homeLink}
            </Link>
            <Link href={isZh ? '/zh/about' : '/about'} className="text-sm text-gray-500 hover:text-violet-600 transition-colors py-0.5">
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

export default function AboutClient({ lang }: { lang: Lang }) {
  return <AboutContent lang={lang} />
}