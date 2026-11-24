import type { Metadata } from 'next'
import { languageAlternates, pageUrl } from '@/lib/site'
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd'

/** This route tree is English; the language is a compile-time constant. */
const lang = 'en' as const

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is perplexity in AI text detection?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Perplexity describes how surprising or predictable the word choices in a text are. A model-assigned score that is high means the words are harder to predict from context; a low one means they follow a very typical pattern. It is a statistical idea used in language modelling, not a definitive authorship test.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does burstiness mean in writing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Burstiness refers to variation in sentence length and rhythm. Text with high burstiness mixes very short sentences with much longer ones. Text with low burstiness keeps sentences close to the same length. Detectors sometimes treat low burstiness as one weak hint of machine-generated prose.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is AI vocabulary density?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It is the share of stock phrasing in a text — words and transitions such as “delve”, “leverage”, “robust”, “furthermore” or “in conclusion”. A high density means those templates appear often relative to the rest of the wording; a low density means the text relies more on specific, contextual language. The word list is not universal and changes over time.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this site’s detector connected to GPTZero or Turnitin?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. The detector on this site is a prompt-driven heuristic: a DeepSeek model is asked to describe five textual signals and output an estimated probability. It is not an API connection to GPTZero, Turnitin or any other detector, and its result is not their official verdict. It is intended for self-checking only and is not guaranteed to be accurate.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does this site reproduce the DetectGPT research?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. DetectGPT is published academic research on detecting machine-generated text through probability curvature. We cite it as background reading; this site does not implement its method or claim the same performance.',
      },
    },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  const title = 'AI Detection Glossary: Perplexity, Burstiness & More'
  const description = 'Plain definitions of perplexity, burstiness and AI detection, with examples and why detector scores are unreliable.'
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: 'https://gpt-undetectable.com/og-image.png', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://gpt-undetectable.com/og-image.png'],
    },
    alternates: { canonical: pageUrl('/glossary', 'en'), languages: languageAlternates('/glossary') },
  }
}

const termClass = 'bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6 text-gray-700 leading-relaxed space-y-3'

export default async function GlossaryPage() {
  return (
    <>
      <BreadcrumbJsonLd slug="/glossary" lang="en" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="mx-auto w-full max-w-3xl px-4 py-8 text-sm leading-relaxed text-gray-700">
        <article className={termClass}>
          <h1 className="text-2xl font-bold text-gray-900">AI Detection Glossary: Perplexity, Burstiness &amp; More</h1>
          <p className="text-xs text-gray-500">Last updated: 24 November 2026</p>
          <p>This page defines four terms that come up whenever people discuss AI-written text. The examples below are short sentences written for this page to illustrate each concept; they are not measurements, test results, or claims about any detector’s accuracy.</p>
          <p><strong>Why these terms?</strong> These concepts help explain why detector verdicts are unreliable and contested. They are not instructions for evading a detector. AI Humanizer is a writing improvement tool: it helps make rough drafts clearer and more natural, not manipulate scores.</p>
        </article>

        <article className={termClass}>
          <h2 className="text-lg font-semibold text-gray-800">1. Perplexity (困惑度)</h2>
          <p><strong>Definition.</strong> Perplexity is a language-modelling measure of how predictable a piece of text is to a model. In plain terms: how surprised would a model be by the next word, given the words before it? Lower perplexity means the sequence follows familiar, high-probability patterns; higher perplexity means the choices are less expected. It is a property of a text under a particular model, not a universal number.</p>
          <p><strong>High vs low — a concrete contrast:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li><em>Lower perplexity (predictable):</em> “In conclusion, it is important to note that technology plays a vital role in modern education.”</li>
            <li><em>Higher perplexity (less predictable):</em> “Then the projector died, so we drew the diagram on a coffee stain and somehow it made more sense.”</li>
          </ul>
          <p>Neither sentence proves anything about authorship on its own. A person can write a predictable sentence, and a model can produce a surprising one.</p>
        </article>

        <article className={termClass}>
          <h2 className="text-lg font-semibold text-gray-800">2. Burstiness (句长 / 节奏变化)</h2>
          <p><strong>Definition.</strong> Burstiness describes how much sentence lengths and rhythms vary across a passage. High burstiness means short fragments sit next to long, winding sentences. Low burstiness means most sentences fall into a similar length band and follow a similar shape.</p>
          <p><strong>High vs low — a concrete contrast:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li><em>Lower burstiness (even rhythm):</em> “The system collects user feedback regularly. The team reviews the feedback carefully. The product improves gradually over time. The results are documented internally.”</li>
            <li><em>Higher burstiness (varied rhythm):</em> “It failed. Twice. Then, after a long afternoon of checking cables, logs and one very unhelpful error message, we found the problem: a switch had been left in the wrong position since morning.”</li>
          </ul>
          <p>Burstiness is easy to notice but hard to score reliably: genre matters. A legal contract and a text message thread naturally have very different rhythms.</p>
        </article>

        <article className={termClass}>
          <h2 className="text-lg font-semibold text-gray-800">3. AI vocabulary density (模板词密度)</h2>
          <p><strong>Definition.</strong> This is the proportion of stock, reusable phrasing in a text — expressions such as “delve”, “leverage”, “robust”, “comprehensive”, “furthermore”, “moreover” and “in conclusion”. A high density means these templates cluster; a low density means the wording is more specific to the subject. Any such word list is imperfect: each of these words is legitimate in the right context, and the list changes as language use changes.</p>
          <p><strong>High vs low — a concrete contrast:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li><em>Higher density:</em> “Furthermore, the robust framework leverages comprehensive data to deliver a seamless experience. Moreover, it enables stakeholders to navigate complex challenges.”</li>
            <li><em>Lower density:</em> “The app imports a CSV, flags duplicate rows and lets you fix them before publishing. Most of the work happens in one screen.”</li>
          </ul>
          <p>Counting these words is a rough surface signal. It says nothing about whether the underlying claims are true or whether the text was written by a person.</p>
        </article>

        <article className={termClass}>
          <h2 className="text-lg font-semibold text-gray-800">4. AI detection (AI 文本检测)</h2>
          <p><strong>Definition.</strong> AI detection is the task of estimating whether a text was generated or substantially assisted by a language model. Both research systems and commercial tools look for statistical and stylistic patterns; none can read the writing process itself. Outputs are probabilities or labels, not proof.</p>
          <p><strong>High vs low — what the two ends look like as descriptions:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li><em>A “high AI-likelihood” profile:</em> even sentence lengths, several template transitions, few concrete details, and vocabulary that could fit almost any topic.</li>
            <li><em>A “low AI-likelihood” profile:</em> uneven sentence lengths, specific nouns and details, and wording tied closely to the situation being described.</li>
          </ul>
          <p>These profiles are tendencies, not rules. Edited human writing can look like the first, and unedited model output can look like the second.</p>
        </article>

        <article className={termClass}>
          <h2 className="text-lg font-semibold text-gray-800">What this site’s detector actually does</h2>
          <p>The detector at <a href="/ai-detector" className="text-violet-600 hover:underline">/ai-detector</a> is <strong>a prompt-driven heuristic analysis</strong>. Text is passed to DeepSeek (deepseek-chat) with a prompt that asks the model to assess five textual signals and return an AI probability, a human probability and a short explanation. It does not calculate those signals with a dedicated statistical model, and it does not call GPTZero, Turnitin, Originality.ai or any other detector’s API.</p>
          <p>Consequently, its verdict is not an official determination from any of those products and should not be treated as one. Results are for self-checking only; accuracy is not guaranteed, and false positives and false negatives both happen. A score from this tool is one opinion generated by a model, not ground truth.</p>
        </article>

        <article className={termClass}>
          <h2 className="text-lg font-semibold text-gray-800">An illustrative rewrite: input → clearer prose → signal change</h2>
          <p>The following is a made-up illustration of the concepts above. It is not a screenshot, not measured data, and not a claim about how any score would change on our tool.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Input (even, templated):</strong> “Furthermore, it is important to note that the platform provides robust and comprehensive analytics. Moreover, the solution enables teams to leverage data effectively. In conclusion, organizations can benefit significantly.”</li>
            <li><strong>Rewritten version:</strong> “The dashboard shows which emails were opened and which were ignored. That was enough. By Thursday the team had dropped two subject lines and moved the send time to the morning.”</li>
            <li><strong>Conceptual signal change:</strong> sentence lengths become uneven (burstiness rises); the wording becomes less generic, so the word choices are less predictable; template transitions disappear, so AI vocabulary density falls. The probability label, if a detector produced one, would be expected to move downward — but the size of any such move is unknown without an actual measurement.</li>
          </ul>
          <p>Notice that the rewrite also gets more specific. That is a writing choice, not a guaranteed detector strategy. The point is clarity and a natural voice; no score change is promised.</p>
        </article>

        <article className={termClass}>
          <h2 className="text-lg font-semibold text-gray-800">Public research background</h2>
          <p>For readers who want the academic side, <a href="https://crfm.stanford.edu/2023/05/02/detectgpt.html" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">DetectGPT (Stanford CRFM, 2023)</a> studies machine-generated text detection using the curvature of the model’s probability function. It is public research背景 reading only: this site does not reproduce DetectGPT, implement its curvature test, or claim comparable results.</p>
          <p className="text-sm text-gray-500 pt-2">Related: <a href="/ai-detector" className="text-violet-600 hover:underline">AI text self-review</a> · <a href="/limitations" className="text-violet-600 hover:underline">Known limitations</a> · <a href="/bypass-test-methodology" className="text-violet-600 hover:underline">Test methodology</a> · <a href="/privacy" className="text-violet-600 hover:underline">Privacy</a></p>
        </article>
      </main>
    </>
  )
}
