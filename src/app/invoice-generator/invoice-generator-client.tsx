'use client'

import { Suspense, useState, useMemo } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { jsPDF } from 'jspdf'
import Footer from '../../components/Footer'

type Item = { desc: string; qty: number; price: number }

const t = {
  zh: {
    siteTitle: '🧮 实用计算器',
    pageTitle: '发票生成器',
    pageSubtitle: '免费生成专业PDF发票',
    backHome: '← 返回首页',
    invoiceNumber: '发票号',
    date: '开票日期',
    dueDate: '到期日期',
    from: '开票方（您的信息）',
    to: '收票方（客户信息）',
    name: '名称',
    email: '邮箱',
    address: '地址',
    items: '商品/服务明细',
    desc: '描述',
    qty: '数量',
    price: '单价',
    total: '金额',
    addItem: '+ 添加一项',
    currency: '币种',
    taxRate: '税率（%）',
    logo: '公司Logo（可选）',
    notes: '备注',
    notesPh: '例如：感谢您的惠顾',
    generate: '生成PDF发票',
    clear: '清空',
    subtotal: '小计',
    tax: '税额',
    grandTotal: '总计',
    switchLang: 'EN',
  },
  en: {
    siteTitle: '🧮 Tools',
    pageTitle: 'Invoice Generator',
    pageSubtitle: 'Free online PDF invoice maker',
    backHome: '← Back to Home',
    invoiceNumber: 'Invoice #',
    date: 'Issue date',
    dueDate: 'Due date',
    from: 'From (your info)',
    to: 'Bill to (client)',
    name: 'Name',
    email: 'Email',
    address: 'Address',
    items: 'Items / services',
    desc: 'Description',
    qty: 'Qty',
    price: 'Price',
    total: 'Total',
    addItem: '+ Add item',
    currency: 'Currency',
    taxRate: 'Tax rate (%)',
    logo: 'Company Logo (optional)',
    notes: 'Notes',
    notesPh: 'e.g., Thank you for your business!',
    generate: 'Generate PDF Invoice',
    clear: 'Clear',
    subtotal: 'Subtotal',
    tax: 'Tax',
    grandTotal: 'Total',
    switchLang: '中文',
  },
}

function u(key: keyof typeof t.en, lang: 'zh' | 'en') {
  return t[lang][key] as string
}

function InvoiceGeneratorContent({ initialLang }: { initialLang?: 'zh' | 'en' }) {
  const searchParams = useSearchParams()
  const lang: 'zh' | 'en' = initialLang ?? (searchParams.get('lang') === 'zh' ? 'zh' : 'en')
  const pathname = usePathname()
  const nextLang: 'zh' | 'en' = lang === 'zh' ? 'en' : 'zh'

  const [number, setNumber] = useState(`INV-${Date.now().toString().slice(-6)}`)
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [dueDate, setDueDate] = useState(() => {
    const d = new Date()
    d.setDate(d.getDate() + 30)
    return d.toISOString().split('T')[0]
  })
  const [from, setFrom] = useState({ name: '', email: '', address: '' })
  const [to, setTo] = useState({ name: '', email: '', address: '' })
  const [items, setItems] = useState<Item[]>([{ desc: '', qty: 1, price: 0 }])
  const [currency, setCurrency] = useState('USD')
  const [taxRate, setTaxRate] = useState(0)
  const [notes, setNotes] = useState('')
  const [logoData, setLogoData] = useState<string>('')

  const subtotal = useMemo(() => items.reduce((sum, it) => sum + it.qty * it.price, 0), [items])
  const taxAmount = useMemo(() => (subtotal * taxRate) / 100, [subtotal, taxRate])
  const total = subtotal + taxAmount

  const sym = currency === 'CNY' || currency === 'JPY' ? '¥' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '$'
  const fmt = (n: number) => `${sym}${n.toFixed(2)}`

  const handleLogo = (file: File | null) => {
    if (!file) { setLogoData(''); return }
    const reader = new FileReader()
    reader.onload = () => setLogoData(reader.result as string)
    reader.readAsDataURL(file)
  }

  const clear = () => {
    setFrom({ name: '', email: '', address: '' })
    setTo({ name: '', email: '', address: '' })
    setItems([{ desc: '', qty: 1, price: 0 }])
    setNotes('')
    setLogoData('')
  }

  const generate = () => {
    const doc = new jsPDF()
    if (logoData) doc.addImage(logoData, 'PNG', 15, 12, 30, 30)
    doc.setFontSize(24)
    doc.setFont('helvetica', 'bold')
    doc.text(lang === 'zh' ? '发票' : 'INVOICE', logoData ? 50 : 15, 25)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text(`# ${number}`, logoData ? 50 : 15, 32)
    doc.setFontSize(9)
    doc.text(`${u('date', lang)}: ${date}`, 195, 18, { align: 'right' })
    doc.text(`${u('dueDate', lang)}: ${dueDate}`, 195, 24, { align: 'right' })

    let y = 50
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text(u('from', lang), 15, y)
    doc.text(u('to', lang), 110, y)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    y += 6
    if (from.name) doc.text(from.name, 15, y)
    if (to.name) doc.text(to.name, 110, y)
    y += 5
    if (from.email) doc.text(from.email, 15, y)
    if (to.email) doc.text(to.email, 110, y)
    y += 5
    if (from.address) doc.text(from.address.slice(0, 50), 15, y)
    if (to.address) doc.text(to.address.slice(0, 50), 110, y)

    y = 90
    doc.setFillColor(241, 245, 249)
    doc.rect(15, y - 5, 180, 8, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    doc.text(u('desc', lang), 17, y)
    doc.text(u('qty', lang), 130, y)
    doc.text(u('price', lang), 155, y)
    doc.text(u('total', lang), 180, y)
    y += 8
    doc.setFont('helvetica', 'normal')
    items.forEach((it) => {
      if (it.desc || it.qty > 0) {
        doc.text((it.desc || '').slice(0, 60), 17, y)
        doc.text(String(it.qty), 130, y)
        doc.text(fmt(it.price), 155, y)
        doc.text(fmt(it.qty * it.price), 180, y)
        y += 6
      }
    })

    y += 5
    doc.text(`${u('subtotal', lang)}:`, 145, y)
    doc.text(fmt(subtotal), 180, y)
    y += 6
    if (taxRate > 0) {
      doc.text(`${u('tax', lang)} (${taxRate}%):`, 145, y)
      doc.text(fmt(taxAmount), 180, y)
      y += 6
    }
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.text(`${u('grandTotal', lang)}:`, 145, y)
    doc.text(fmt(total), 180, y)

    if (notes) {
      y += 15
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      doc.text(`${u('notes', lang)}:`, 15, y)
      y += 5
      const lines = doc.splitTextToSize(notes, 180)
      doc.text(lines, 15, y)
    }

    doc.save(`invoice-${number}.pdf`)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
          <Link href={`/?lang=${lang}`} className="text-xl font-bold text-orange-500 hover:text-orange-600">
            {u('siteTitle', lang)}
          </Link>
          <Link
            href={`${pathname}?lang=${nextLang}`}
            className="text-xs px-3 py-1.5 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
          >
            🌐 {u('switchLang', lang)}
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-8 pb-24">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">{u('pageTitle', lang)}</h1>
        <p className="text-sm text-gray-400 mb-6">{u('pageSubtitle', lang)}</p>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-4 space-y-4">
          {/* Meta */}
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">{u('invoiceNumber', lang)}</label>
              <input value={number} onChange={(e) => setNumber(e.target.value)} className="w-full px-2 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">{u('date', lang)}</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-2 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">{u('dueDate', lang)}</label>
              <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full px-2 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>
          </div>

          {/* From / To */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <h3 className="text-xs font-semibold text-gray-600 mb-2">{u('from', lang)}</h3>
              <div className="space-y-1.5">
                <input placeholder={u('name', lang)} value={from.name} onChange={(e) => setFrom({ ...from, name: e.target.value })} className="w-full px-2 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" />
                <input placeholder={u('email', lang)} value={from.email} onChange={(e) => setFrom({ ...from, email: e.target.value })} className="w-full px-2 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" />
                <textarea placeholder={u('address', lang)} value={from.address} onChange={(e) => setFrom({ ...from, address: e.target.value })} rows={2} className="w-full px-2 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none" />
              </div>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-600 mb-2">{u('to', lang)}</h3>
              <div className="space-y-1.5">
                <input placeholder={u('name', lang)} value={to.name} onChange={(e) => setTo({ ...to, name: e.target.value })} className="w-full px-2 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" />
                <input placeholder={u('email', lang)} value={to.email} onChange={(e) => setTo({ ...to, email: e.target.value })} className="w-full px-2 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" />
                <textarea placeholder={u('address', lang)} value={to.address} onChange={(e) => setTo({ ...to, address: e.target.value })} rows={2} className="w-full px-2 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none" />
              </div>
            </div>
          </div>

          {/* Items */}
          <div>
            <h3 className="text-xs font-semibold text-gray-600 mb-2">{u('items', lang)}</h3>
            <div className="space-y-1.5">
              {items.map((it, i) => (
                <div key={i} className="grid grid-cols-12 gap-1.5">
                  <input placeholder={u('desc', lang)} value={it.desc} onChange={(e) => setItems(items.map((x, j) => j === i ? { ...x, desc: e.target.value } : x))} className="col-span-5 px-2 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" />
                  <input type="number" placeholder={u('qty', lang)} value={it.qty} onChange={(e) => setItems(items.map((x, j) => j === i ? { ...x, qty: Number(e.target.value) } : x))} className="col-span-2 px-2 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" min={0} />
                  <input type="number" placeholder={u('price', lang)} value={it.price} onChange={(e) => setItems(items.map((x, j) => j === i ? { ...x, price: Number(e.target.value) } : x))} className="col-span-4 px-2 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" min={0} step="0.01" />
                  <button onClick={() => setItems(items.filter((_, j) => j !== i))} className="col-span-1 px-1 py-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg text-xs" disabled={items.length === 1}>×</button>
                </div>
              ))}
              <button onClick={() => setItems([...items, { desc: '', qty: 1, price: 0 }])} className="text-xs text-orange-500 hover:underline mt-1">{u('addItem', lang)}</button>
            </div>
          </div>

          {/* Currency / Tax / Logo */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">{u('currency', lang)}</label>
              <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full px-2 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-400">
                <option value="USD">USD ($)</option>
                <option value="CNY">CNY (¥)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="JPY">JPY (¥)</option>
                <option value="CAD">CAD ($)</option>
                <option value="AUD">AUD ($)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">{u('taxRate', lang)}</label>
              <input type="number" value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value))} min={0} max={100} step="0.01" className="w-full px-2 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">{u('logo', lang)}</label>
            <input type="file" accept="image/*" onChange={(e) => handleLogo(e.target.files?.[0] || null)} className="w-full text-xs" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">{u('notes', lang)}</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={u('notesPh', lang)} rows={2} className="w-full px-2 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none" />
          </div>

          {/* Totals + actions */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="text-xs text-gray-500 space-y-0.5">
              <div>{u('subtotal', lang)}: <span className="font-semibold text-gray-700">{fmt(subtotal)}</span></div>
              {taxRate > 0 && <div>{u('tax', lang)}: <span className="font-semibold text-gray-700">{fmt(taxAmount)}</span></div>}
              <div className="text-base">{u('grandTotal', lang)}: <span className="font-bold text-orange-500 text-lg">{fmt(total)}</span></div>
            </div>
            <div className="flex gap-2">
              <button onClick={clear} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs">{u('clear', lang)}</button>
              <button onClick={generate} className="px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg text-sm">{u('generate', lang)}</button>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link href={`/?lang=${lang}`} className="text-sm text-gray-400 hover:text-orange-500 transition-colors">
            {u('backHome', lang)}
          </Link>
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  )
}

export default function InvoiceGeneratorClient({ initialLang }: { initialLang?: 'zh' | 'en' }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <InvoiceGeneratorContent initialLang={initialLang} />
    </Suspense>
  )
}
