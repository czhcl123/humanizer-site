import type { Metadata } from 'next'
import EmbedDetector from '../../../components/Embed/EmbedDetector'

export const metadata: Metadata = {
  title: 'AI Detector Widget',
  description: 'Paste text to estimate how likely it is to be AI-generated. Free, no signup.',
  robots: { index: false, follow: true },
}

export default function EmbedDetectorPage() {
  return (
    <main className="mx-auto w-full max-w-xl p-3">
      <EmbedDetector />
    </main>
  )
}
