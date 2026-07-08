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
    essay: '论文改写',
    turnitin: 'Turnitin',
    walter: 'Walter',
    detector: '检测',
    chinese: '降 AI 率',
  },
  en: {
    copyright: 'AI Humanizer Suite · Free Online AI Tools',
    about: 'About',
    privacy: 'Privacy',
    home: 'Home',
    tools: 'Tools',
    essay: 'Essay',
    turnitin: 'Turnitin',
    walter: 'Walter',
    detector: 'Detector',
    chinese: '降 AI 率',
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
          <Link href={`/essay-humanizer?lang=${lang}`} className="text-gray-400 hover:text-violet-500 transition-colors">{t.essay}</Link>
          <span className="text-gray-200">·</span>
          <Link href={`/turnitin-bypass?lang=${lang}`} className="text-gray-400 hover:text-violet-500 transition-colors">{t.turnitin}</Link>
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
        </nav>
        <p className="text-xs text-gray-400 text-center">
          {`${currentYear} ${t.copyright}`}
        </p>
      </div>
    </footer>
  )
}