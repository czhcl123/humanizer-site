import { NextRequest, NextResponse } from 'next/server'

const MAX_CHARS = 3000

const SYSTEM_PROMPT_EN = `You are an expert editor specializing in rewriting AI-generated text so it reads like a human wrote it.

Your task:
- Take the user's AI-generated text and rewrite it so it passes AI detection tools like GPTZero, Turnitin AI, Originality.ai, ZeroGPT, and Copyleaks.
- Preserve the original meaning, facts, and key information exactly.
- Output ONLY the rewritten text. No preamble, no explanation, no quotes, no markdown formatting.

Rewrite principles to break AI detector patterns:
- Vary sentence length deliberately. Short sentences. Then longer ones that ramble a bit. Mix them up.
- Add conversational transitions ("honestly", "to be fair", "the thing is", "here's the kicker").
- Use occasional first-person voice if context allows ("I'd argue", "what I noticed", "in my experience").
- Reduce list-like and bullet-point structure. Use full sentences with natural connectors.
- Include occasional hedges ("probably", "seems like", "I'd say").
- Use contractions (don't, it's, they're) where natural.
- Break up predictable paragraph rhythms. Real writers ramble, then get sharp, then circle back.
- Avoid "AI vocabulary": do not overuse "delve", "leverage", "robust", "comprehensive", "moreover", "furthermore", "in conclusion", "it is important to note".
- Use concrete examples or mini-anecdotes where the original is generic.
- The result should feel like a thoughtful person wrote it on their second draft, not their first polished version.`
const SYSTEM_PROMPT_ZH = `你是一位经验丰富的中文编辑,专门把 AI 生成的文本改写成自然的人话版本。

任务:
- 把用户的 AI 文本改写成能通过 GPTZero、Turnitin AI、Originality.ai、ZeroGPT、Copyleaks 等检测的版本。
- 完整保留原文的意思、事实、关键信息。
- 只输出改写后的文本。不要解释、不要前言、不要引用、不要 markdown 格式。

改写原则(打破 AI 检测器识别的统计特征):
- 刻意变化句子长度。短句,长句,再短句。混着用。
- 加口语化转折(说实话、其实、说白了、有意思的是、我觉得吧)。
- 适当用第一人称(我觉得、我发现、在我的经验里)。
- 减少列表式、bullet 式排版,用完整句子和自然连接词。
- 偶尔用模糊词(大概、可能、估计、我觉得吧、反正)。
- 用正常口语的缩写(不会、就是、也没、其实吧)。
- 段落节奏要真:先扯一句,再尖锐一句,再绕回来。
- 不要用「AI 八股词」:赋能、抓手、底层逻辑、深度赋能、链路、生态位、范式、价值闭环、降维打击。
- 原文抽象的地方,加具体例子或小细节。
- 读起来像一个有想法的人在写第二遍,不是 AI 第一遍生成。`

export async function POST(req: NextRequest) {
  let body: any
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }
  const text = String(body?.text || '').trim()
  const lang = body?.lang === 'zh' ? 'zh' : 'en'

  if (!text) return NextResponse.json({ error: 'No text provided' }, { status: 400 })
  if (text.length > MAX_CHARS) return NextResponse.json({ error: 'Text too long' }, { status: 400 })

  const apiKey = process.env.DEEPSEEK_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Humanizer backend not configured. Please set DEEPSEEK_API_KEY environment variable.' },
      { status: 503 }
    )
  }

  const systemPrompt = lang === 'zh' ? SYSTEM_PROMPT_ZH : SYSTEM_PROMPT_EN
  const userMsg = lang === 'zh'
    ? `请把下面这段 AI 文本改写成自然的中文,只输出改写后的版本,不要任何其他内容:\n\n${text}`
    : `Rewrite the following AI-generated text so it reads like a human wrote it. Output only the rewritten version, nothing else:\n\n${text}`

  try {
    const res = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMsg },
        ],
        temperature: 1.3,
        max_tokens: 4096,
      }),
    })

    if (!res.ok) {
      const errBody = await res.text().catch(() => '')
      console.error('DeepSeek API error:', res.status, errBody)
      return NextResponse.json({ error: `DeepSeek API error: ${res.status}` }, { status: 502 })
    }

    const data = await res.json()
    const output = data?.choices?.[0]?.message?.content?.trim() || ''

    if (!output) return NextResponse.json({ error: 'Empty response from model' }, { status: 502 })

    return NextResponse.json({ output })
  } catch (e: any) {
    console.error('DeepSeek request error:', e?.message || e)
    return NextResponse.json({ error: 'Rewrite service error' }, { status: 502 })
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'AI Humanizer',
    backend: 'deepseek',
    max_chars: MAX_CHARS,
    languages: ['en', 'zh'],
    requires_api_key: !process.env.DEEPSEEK_API_KEY,
  })
}