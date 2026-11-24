'use client'

import Link from 'next/link'

interface FooterProps {
  lang?: 'zh' | 'en'
}

const footerText = {
  zh: {
    copyright: 'AI Humanizer · 免费在线写作改进工具',
    about: '关于',
    privacy: '隐私',
    home: '首页',
    tools: '工具',
    paper: '论文改写',
    turnitin: 'Turnitin',
    bypass: 'AI 写作改进',
    walter: 'Walter Writes AI',
    detector: '文本自查',
    chinese: '中文写作改进',
    quillbot: 'QuillBot 写作建议',
    essayTurnitin: '论文写作与检测说明',
    methodology: '测试方法',
    glossary: '术语表',
    limitations: '限制说明',
    citation: '引用说明',
    changelog: '更新记录',
    more: '更多',
  },
  en: {
    copyright: 'AI Humanizer · Free Online Writing Tools',
    about: 'About',
    privacy: 'Privacy',
    home: 'Home',
    tools: 'Tools',
    paper: 'Paper',
    turnitin: 'Turnitin',
    bypass: 'Writing Improvement',
    walter: 'Walter Writes AI',
    detector: 'Self-review',
    chinese: 'Chinese writing improvement',
    quillbot: 'QuillBot writing guidance',
    essayTurnitin: 'Essay writing + detector notes',
    methodology: 'How we test',
    glossary: 'Glossary',
    limitations: 'Limitations',
    citation: 'Citation policy',
    changelog: 'Changelog',
    more: 'More',
  },
}

export default function Footer({ lang = 'en' }: FooterProps) {
  const t = footerText[lang]
  const currentYear = new Date().getFullYear()
  // Real paths, not ?lang= variants: those 301 and duplicate every page.
  const p = (slug: string) => (lang === 'zh' ? `/zh${slug}` : slug)

  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-3xl mx-auto px-4 py-6">
        <nav className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 mb-3 text-xs">
          <Link href={p('')} className="text-gray-500 hover:text-violet-700 transition-colors">{t.home}</Link>
          <span className="text-gray-200">·</span>
          <Link href={p('/essay-humanizer')} className="text-gray-500 hover:text-violet-700 transition-colors">{t.paper}</Link>
          <span className="text-gray-200">·</span>
          <Link href={p('/turnitin-bypass')} className="text-gray-500 hover:text-violet-700 transition-colors">{t.turnitin}</Link>
          <span className="text-gray-200">·</span>
          <Link href={p('/bypass-ai')} className="text-gray-500 hover:text-violet-700 transition-colors">{t.bypass}</Link>
          <span className="text-gray-200">·</span>
          <Link href={p('/walterwrites')} className="text-gray-500 hover:text-violet-700 transition-colors">{t.walter}</Link>
          <span className="text-gray-200">·</span>
          <Link href={p('/ai-detector')} className="text-gray-500 hover:text-violet-700 transition-colors">{t.detector}</Link>
          <span className="text-gray-200">·</span>
          <Link href={p('/jiang-ai-lv')} className="text-gray-500 hover:text-violet-700 transition-colors">{t.chinese}</Link>
          <span className="text-gray-200">·</span>
          <Link href={p('/about')} className="text-gray-500 hover:text-violet-700 transition-colors">{t.about}</Link>
          <span className="text-gray-200">·</span>
          <Link href={p('/privacy')} className="text-gray-500 hover:text-violet-700 transition-colors">{t.privacy}</Link>
          <span className="text-gray-200">·</span>
          <Link href={p('/glossary')} className="text-gray-500 hover:text-violet-700 transition-colors">{t.glossary}</Link>
          <span className="text-gray-200">·</span>
          <a href="/llms.txt" className="text-gray-500 hover:text-violet-700 transition-colors">llms.txt</a>
          <span className="text-gray-200">·</span>
        </nav>
        <nav className="flex flex-wrap justify-center items-center gap-x-3 gap-y-2 mb-3 text-xs text-gray-500">
          <span className="text-gray-600">{t.more}:</span>
          <Link href={p('/quillbot-bypass')} className="hover:text-violet-700 transition-colors">{t.quillbot}</Link>
          <span className="text-gray-200">·</span>
          <Link href={p('/essay-writer-bypass-turnitin')} className="hover:text-violet-700 transition-colors">{t.essayTurnitin}</Link>
          <span className="text-gray-200">·</span>
          <Link href={p('/bypass-test-methodology')} className="hover:text-violet-700 transition-colors">{t.methodology}</Link>
          <span className="text-gray-200">·</span>
          <Link href={p('/limitations')} className="hover:text-violet-700 transition-colors">{t.limitations}</Link>
          <span className="text-gray-200">·</span>
          <Link href={p('/citation-policy')} className="hover:text-violet-700 transition-colors">{t.citation}</Link>
          <span className="text-gray-200">·</span>
          <Link href={p('/changelog')} className="hover:text-violet-700 transition-colors">{t.changelog}</Link>
        </nav>
        <p className="text-xs text-gray-500 text-center">
          {`${currentYear} ${t.copyright}`}
        </p>
      </div>
    </footer>
  )
}