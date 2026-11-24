import type { Metadata } from 'next'
import { languageAlternates, pageUrl } from '@/lib/site'
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd'

/** This route tree is Chinese; the language is a compile-time constant. */
const lang = 'zh' as const

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'AI 检测里的 perplexity（困惑度）是什么？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Perplexity 衡量文本中用词的可预测程度，可以理解为模型看到下一个词时有多“意外”。数值越低，词越符合常见的高概率搭配；越高，选词越不常规。这是语言模型语境下的统计量，不是判定作者身份的证据。',
      },
    },
    {
      '@type': 'Question',
      name: 'burstiness（句长/节奏变化）是什么意思？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Burstiness 指一段文字里句子长度和节奏的变化幅度。高 burstiness 是短句和长句交错；低 burstiness 是句子长度和形态都接近。检测器有时把低 burstiness 当作机器生成文本的一个弱提示，但文体本身会影响这个指标。',
      },
    },
    {
      '@type': 'Question',
      name: 'AI vocabulary density（模板词密度）是什么？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '它指文本中套话式表达所占的比例，例如 “delve”“leverage”“robust”“furthermore”“in conclusion”。密度高表示这些模板词集中出现；密度低表示用词更贴近具体内容。这类词表并不完美，每个词在合适语境下都可用，而且词表会随时间变化。',
      },
    },
    {
      '@type': 'Question',
      name: '本站检测器连接了 GPTZero 或 Turnitin 吗？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '没有。本站检测器是提示词驱动的启发式分析：由 DeepSeek 模型按提示词描述 5 项文本信号，并输出一个概率估计。它没有接入 GPTZero、Turnitin 或其他检测器的 API，结果也不是这些产品的官方判定，仅供自查，不保证准确。',
      },
    },
    {
      '@type': 'Question',
      name: '本站复现了 DetectGPT 研究吗？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '没有。DetectGPT 是一项关于用概率曲率检测机器生成文本的公开学术研究。我们只把它列为背景阅读，本站没有实现它的方法，也不声称达到同样的表现。',
      },
    },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  const title = 'AI 检测术语表：困惑度、突发性与模板词密度'
  const description = '解释困惑度、句长变化、模板词密度与 AI 文本检测，附对比例句，并说明这些概念为何表明检测分数不可靠——不是如何规避检测。'
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
    alternates: { canonical: pageUrl('/glossary', 'zh'), languages: languageAlternates('/glossary') },
  }
}

const termClass = 'bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6 text-gray-700 leading-relaxed space-y-3'

export default async function GlossaryPage() {
  return (
    <>
      <BreadcrumbJsonLd slug="/glossary" lang="zh" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="mx-auto w-full max-w-3xl px-4 py-8 text-sm leading-relaxed text-gray-700">
        <article className={termClass}>
          <h1 className="text-2xl font-bold text-gray-900">AI 检测术语表：困惑度、突发性与模板词密度</h1>
          <p className="text-xs text-gray-500">更新日期：2026 年 11 月 24 日</p>
          <p>这一页解释讨论 AI 生成文本时经常出现的四个术语。下面的例句都是为本页临时写的短句，用来说明概念；它们不是测量结果、测试数据，也不是对任何检测器准确率的声明。</p>
          <p><strong>为什么要了解这些术语？</strong>这些概念说明为什么检测器的判定不可靠、存在争议，而不是教人如何规避检测。AI Humanizer 是写作改进工具：把生硬的草稿改得更自然、清晰，不操纵分数。</p>
        </article>

        <article className={termClass}>
          <h2 className="text-lg font-semibold text-gray-800">1. Perplexity（困惑度）</h2>
          <p><strong>定义。</strong>Perplexity 是语言模型中衡量文本可预测程度的指标。通俗地说：看到前面的词之后，模型对下一个词有多“意外”？数值越低，说明用词越符合常见的高概率模式；越高，说明选词越不常规。它是特定模型对某段文本的度量，不是通用数字。</p>
          <p><strong>高 vs 低——具体例句对比：</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li><em>较低（可预测）：</em>“总之，需要注意的是，技术在现代教育中发挥着至关重要的作用。”</li>
            <li><em>较高（较不可预测）：</em>“结果投影仪坏了，我们只好把图直接在咖啡渍上画，奇怪的是那样反而更清楚。”</li>
          </ul>
          <p>单独看任何一句都不能证明作者是谁。人也会写可预测的句子，模型也可能写出出人意料的用词。</p>
        </article>

        <article className={termClass}>
          <h2 className="text-lg font-semibold text-gray-800">2. Burstiness（句长 / 节奏变化）</h2>
          <p><strong>定义。</strong>Burstiness 指一段文字中句子长度和节奏的变化幅度。高 burstiness 是极短句与很长的句子相邻；低 burstiness 是大多数句子长度接近、形态相似。</p>
          <p><strong>高 vs 低——具体例句对比：</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li><em>较低（节奏均匀）：</em>“系统定期收集用户反馈。团队认真审阅这些反馈。产品随着时间逐步改进。结果记录在项目文档中。”</li>
            <li><em>较高（节奏起伏）：</em>“失败了。两次。后来，在查了一下午线缆、日志和一条毫无用处的报错之后，我们找到了原因：有台交换机从早上起就插错了口。”</li>
          </ul>
          <p>Burstiness 容易观察，却不容易稳定打分：文体很重要。合同和聊天记录的节奏天然不同。</p>
        </article>

        <article className={termClass}>
          <h2 className="text-lg font-semibold text-gray-800">3. AI vocabulary density（模板词密度）</h2>
          <p><strong>定义。</strong>它指文本中可复用的套话式表达所占的比例，比如 “delve”（深入探讨）、“leverage”（利用）、“robust”（稳健）、“comprehensive”（全面）、“furthermore”（此外）、“moreover”（而且）、“in conclusion”（总之）。密度高意味着这些模板集中堆叠；密度低意味着用词更贴合具体对象。任何这类词表都不完美：这些词在合适语境下完全正当，而且词表会随语言使用而变化。</p>
          <p><strong>高 vs 低——具体例句对比：</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li><em>密度较高：</em>“此外，这个稳健的框架利用全面的数据提供无缝体验。而且，它让相关方能够高效应对复杂挑战。”</li>
            <li><em>密度较低：</em>“这个应用会导入 CSV，标出重复行，让你在发布前逐一修改。大部分操作都在同一个页面完成。”</li>
          </ul>
          <p>统计这些词只是粗略的表层信号。它无法说明底层说法是否真实，也无法说明文本是否出自人手。</p>
        </article>

        <article className={termClass}>
          <h2 className="text-lg font-semibold text-gray-800">4. AI detection（AI 文本检测）</h2>
          <p><strong>定义。</strong>AI 检测指的是估计一段文本是否由语言模型生成、或是否经过模型大幅辅助的任务。研究系统和商业工具都会寻找统计与文体上的模式，但没有任何工具能直接读取写作过程。它们输出的是概率或标签，不是证据。</p>
          <p><strong>高 vs 低——两端分别是什么样：</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li><em>“高 AI 可能性”特征：</em>句长均匀、模板式过渡词较多、具体细节少、词汇可以套到几乎任何主题上。</li>
            <li><em>“低 AI 可能性”特征：</em>句长不齐、名词和细节具体、措辞与所描述的情境紧密绑定。</li>
          </ul>
          <p>这些只是倾向，不是规则。人改过的文字可能符合第一种，未经修改的模型输出也可能符合第二种。</p>
        </article>

        <article className={termClass}>
          <h2 className="text-lg font-semibold text-gray-800">本站检测器实际做什么</h2>
          <p><a href="/zh/ai-detector" className="text-violet-600 hover:underline">/zh/ai-detector</a> 的检测器是<strong>提示词驱动的启发式分析</strong>：文本交给 DeepSeek（deepseek-chat），提示词要求模型描述 5 项文本信号，并给出 AI 概率、人类概率和简短说明。它并没有用专门的统计模型逐项计算这些信号，也没有调用 GPTZero、Turnitin、Originality.ai 或任何其他检测器的 API。</p>
          <p>因此，它的判定不是上述任何产品的官方结论，也不应被当作官方结论。结果仅供自查，不保证准确，误判和漏判都会发生。这个分数只是模型给出的一种意见，不是事实判定。</p>
        </article>

        <article className={termClass}>
          <h2 className="text-lg font-semibold text-gray-800">示意：输入 → 改写 → 信号变化（仅作概念说明）</h2>
          <p>下面是一个为解释概念而编的示意例子。它不是截图，不是实测数据，也不声称在本站工具上会得到这样的分值变化。</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>输入（句式整齐、模板化）：</strong>“此外，需要注意的是，该平台提供稳健而全面的分析能力。 moreover，该方案使团队能够有效利用数据。总之，组织可以从中显著受益。”</li>
            <li><strong>改写后：</strong>“后台能看出哪些邮件被打开、哪些被直接删掉。这就够了。到周四，团队换掉了两个标题，把发送时间挪到了早上。”</li>
            <li><strong>概念上的信号变化：</strong>句长变得不齐（burstiness 上升）；用词不再泛泛而谈，可预测性下降；模板式过渡词消失，模板词密度下降。如果检测器给出概率，方向上预计会往下走——但没有实际测量，变化幅度无从得知。</li>
          </ul>
          <p>还要注意，改写也让内容变得更具体。这是为了清楚自然的写作选择，不是保证有效的检测策略；本站不承诺任何分值变化。</p>
        </article>

        <article className={termClass}>
          <h2 className="text-lg font-semibold text-gray-800">可核实的公开研究背景</h2>
          <p>想了解学术背景的读者可以看 <a href="https://crfm.stanford.edu/2023/05/02/detectgpt.html" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">DetectGPT（Stanford CRFM，2023）</a>：它研究的是用模型概率函数的曲率来检测机器生成文本。这里只把它作为公开研究背景引用；本站没有复现 DetectGPT，没有实现它的曲率检验，也不声称达到相当的效果。</p>
          <p className="text-sm text-gray-500 pt-2">相关：<a href="/zh/ai-detector" className="text-violet-600 hover:underline">AI 文本自查</a> · <a href="/zh/limitations" className="text-violet-600 hover:underline">已知限制</a> · <a href="/zh/bypass-test-methodology" className="text-violet-600 hover:underline">测试方法</a> · <a href="/zh/privacy" className="text-violet-600 hover:underline">隐私政策</a></p>
        </article>
      </main>
    </>
  )
}
