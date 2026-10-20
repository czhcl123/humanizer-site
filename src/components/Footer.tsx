'use client'

import Link from 'next/link'

interface FooterProps {
  lang?: 'zh' | 'en'
}

const footerText = {
  zh: {
    copyright: 'AI Humanizer Suite · 免费在线 AI 工具集',
    about: '关于',
    privacy: '隐私',
    home: '首页',
    tools: '工具',
    paper: '论文改写',
    turnitin: 'Turnitin',
    bypass: 'Bypass AI',
    walter: 'Walter',
    detector: '检测',
    chinese: '降 AI 率',
    quillbot: 'QuillBot 绕过',
    essayTurnitin: '论文过 Turnitin',
    methodology: '测试方法',
    more: '更多',
  },
  en: {
    copyright: 'AI Humanizer Suite · Free Online AI Tools',
    about: 'About',
    privacy: 'Privacy',
    home: 'Home',
    tools: 'Tools',
    paper: 'Paper',
    turnitin: 'Turnitin',
    bypass: 'Bypass AI',
    walter: 'Walter',
    detector: 'Detector',
    chinese: '降 AI 率',
    quillbot: 'QuillBot bypass',
    essayTurnitin: 'Essay writer + Turnitin',
    methodology: 'How we test',
    more: 'More',
  },
}

export default function Footer({ lang = 'en' }: FooterProps) {
  const t = footerText[lang]
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-3xl mx-auto px-4 py-6">
        <nav className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 mb-3 text-xs">
          <Link href={`/?lang=${lang}`} className="text-gray-400 hover:text-violet-500 transition-colors">{t.home}</Link>
          <span className="text-gray-200">·</span>
          <Link href={`/essay-humanizer?lang=${lang}`} className="text-gray-400 hover:text-violet-500 transition-colors">{t.paper}</Link>
          <span className="text-gray-200">·</span>
          <Link href={`/turnitin-bypass?lang=${lang}`} className="text-gray-400 hover:text-violet-500 transition-colors">{t.turnitin}</Link>
          <span className="text-gray-200">·</span>
          <Link href={`/bypass-ai?lang=${lang}`} className="text-gray-400 hover:text-violet-500 transition-colors">{t.bypass}</Link>
          <span className="text-gray-200">·</span>
          <Link href={`/walterwrites?lang=${lang}`} className="text-gray-400 hover:text-violet-500 transition-colors">{t.walter}</Link>
          <span className="text-gray-200">·</span>
          <Link href={`/ai-detector?lang=${lang}`} className="text-gray-400 hover:text-violet-500 transition-colors">{t.detector}</Link>
          <span className="text-gray-200">·</span>
          <Link href={`/jiang-ai-lv?lang=${lang}`} className="text-gray-400 hover:text-violet-500 transition-colors">{t.chinese}</Link>
          <span className="text-gray-200">·</span>
          <Link href={`/about?lang=${lang}`} className="text-gray-400 hover:text-violet-500 transition-colors">{t.about}</Link>
          <span className="text-gray-200">·</span>
          <a href="/llms.txt" className="text-gray-400 hover:text-violet-500 transition-colors">llms.txt</a>
          <span className="text-gray-200">·</span>
          <a href="https://www.aixploria.com/en/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-violet-500 transition-colors">AI Tools</a>
        </nav>
        <nav className="flex flex-wrap justify-center items-center gap-x-3 gap-y-2 mb-3 text-xs text-gray-400">
          <span className="text-gray-300">{t.more}:</span>
          <Link href={`/quillbot-bypass?lang=${lang}`} className="hover:text-violet-500 transition-colors">{t.quillbot}</Link>
          <span className="text-gray-200">·</span>
          <Link href={`/essay-writer-bypass-turnitin?lang=${lang}`} className="hover:text-violet-500 transition-colors">{t.essayTurnitin}</Link>
          <span className="text-gray-200">·</span>
          <Link href={`/bypass-test-methodology?lang=${lang}`} className="hover:text-violet-500 transition-colors">{t.methodology}</Link>
        </nav>
        <p className="text-xs text-gray-400 text-center">
          {`${currentYear} ${t.copyright}`}
        </p>
      </div>
    </footer>
  )
}