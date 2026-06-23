'use client'

import Link from 'next/link'

interface FooterProps {
  lang?: 'zh' | 'en'
}

const footerText = {
  zh: {
    copyright: '© 2025 实用计算器 · 免费在线工具',
    links: '工具导航',
    tools: {
      discount: '折扣计算器',
      bmi: 'BMI计算器',
      countdown: '日期计算器',
      lunar: '农历转换器',
      unit: '单位换算器',
    },
  },
  en: {
    copyright: '© 2025 Tools · Free Online Calculators',
    links: 'Tools',
    tools: {
      discount: 'Discount Calculator',
      bmi: 'BMI Calculator',
      countdown: 'Countdown Calculator',
      lunar: 'Lunar Calendar',
      unit: 'Unit Converter',
    },
  },
}

export default function Footer({ lang = 'zh' }: FooterProps) {
  const t = footerText[lang]
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Tool links */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">{t.links}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <Link href={`/discount-calculator?lang=${lang}`} className="text-sm text-gray-500 hover:text-orange-500 transition-colors py-1">
              🏷️ {t.tools.discount}
            </Link>
            <Link href={`/bmi-calculator?lang=${lang}`} className="text-sm text-gray-500 hover:text-orange-500 transition-colors py-1">
              ⚖️ {t.tools.bmi}
            </Link>
            <Link href={`/countdown?lang=${lang}`} className="text-sm text-gray-500 hover:text-orange-500 transition-colors py-1">
              📅 {t.tools.countdown}
            </Link>
            <Link href={`/lunar-calendar?lang=${lang}`} className="text-sm text-gray-500 hover:text-orange-500 transition-colors py-1">
              📆 {t.tools.lunar}
            </Link>
            <Link href={`/unit-converter?lang=${lang}`} className="text-sm text-gray-500 hover:text-orange-500 transition-colors py-1">
              📐 {t.tools.unit}
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-center gap-2">
          <p className="text-sm text-gray-400">
            {t.copyright.replace('2025', String(currentYear))}
          </p>
        </div>
      </div>
    </footer>
  )
}