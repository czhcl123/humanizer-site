import type { Metadata } from 'next'
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd'
import EmbedDetector from '../../../../components/Embed/EmbedDetector'

export const metadata: Metadata = {
  title: 'AI Detector Widget',
  description: 'Paste text to estimate how likely it is to be AI-generated. Free, no signup.',
  robots: { index: false, follow: true },
}

export default function EmbedDetectorPage() {
  return (
    <>
      <BreadcrumbJsonLd slug="/embed/detector" lang="en" />
      <main className="mx-auto w-full max-w-xl p-3">
      <EmbedDetector />
      <p className="text-xs text-gray-400 mt-4">Last reviewed: 2026-11-24</p>
    </main>
    </>
  )
}
