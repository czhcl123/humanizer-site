import type { Metadata } from 'next'
import Link from 'next/link'
import CopyBlock from '../../components/Embed/CopyBlock'

export const metadata: Metadata = {
  title: 'Embed a Free AI Detector',
  description:
    'Add a free AI detector to your blog, classroom or writing-center page with one iframe. No signup, no API key, no tracking.',
  alternates: { canonical: 'https://gpt-undetectable.com/embed' },
}

const FIXED_SNIPPET = `<iframe
  src="https://gpt-undetectable.com/embed/detector"
  title="Free AI detector"
  style="width:100%;max-width:520px;height:330px;border:1px solid #e5e7eb;border-radius:12px"
  loading="lazy"
></iframe>`

const AUTO_SNIPPET = `<iframe
  id="ai-detector-widget"
  src="https://gpt-undetectable.com/embed/detector"
  title="Free AI detector"
  style="width:100%;max-width:520px;height:330px;border:0"
  loading="lazy"
></iframe>
<script>
  window.addEventListener('message', function (e) {
    if (e.origin !== 'https://gpt-undetectable.com') return;
    if (e.data && e.data.type === 'ai-humanizer-detector') {
      var el = document.getElementById('ai-detector-widget');
      if (el) el.style.height = e.data.height + 'px';
    }
  });
</script>`

export default function EmbedPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 text-sm leading-relaxed text-gray-600">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Embed a free AI detector on your site</h1>
      <p className="mb-4">
        A one-line iframe that estimates how likely a piece of text is to be AI-generated. Built for teachers, writing
        centers, editors and blogs that want a free check without sending readers to a signup wall.
      </p>

      <h2 className="text-lg font-semibold text-gray-800 mt-6 mb-2">What it does</h2>
      <ul className="list-disc list-inside space-y-1 mb-4">
        <li>Paste up to 3,000 characters, get an AI score plus the three strongest signals.</li>
        <li>Same model as the <Link href="/ai-detector" className="text-violet-600 underline underline-offset-2">full AI detector</Link>.</li>
        <li>No API key, no signup, no tracking pixels. Nothing is stored — text is discarded after each check.</li>
      </ul>

      <h2 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Live preview</h2>
      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-3">
        <iframe
          src="/embed/detector"
          title="Free AI detector preview"
          style={{ width: '100%', maxWidth: 520, height: 330, border: '1px solid #e5e7eb', borderRadius: 12 }}
        />
      </div>

      <h2 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Snippet (fixed height)</h2>
      <p className="mb-2">Simplest option — pick a height that fits your layout.</p>
      <CopyBlock code={FIXED_SNIPPET} />

      <h2 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Snippet (auto-resize)</h2>
      <p className="mb-2">
        The widget reports its own height, so the iframe grows and shrinks with the result card. Paste both the iframe
        and the listener.
      </p>
      <CopyBlock code={AUTO_SNIPPET} />

      <h2 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Notes</h2>
      <ul className="list-disc list-inside space-y-1 mb-4">
        <li>The widget is free to embed, including on commercial sites. No attribution required — the &quot;Powered by&quot; line is part of the widget.</li>
        <li>Each visitor gets a fair-use daily quota; heavy automated use will be rate-limited.</li>
        <li>Scores are estimates from a language model, not a verdict. Do not use them as the sole basis for academic misconduct findings.</li>
      </ul>

      <p className="text-xs text-gray-400 mt-8 border-t border-gray-200 pt-3">
        Questions or a different embed size? <Link href="/about" className="underline underline-offset-2">Contact</Link>.
      </p>
    </main>
  )
}
