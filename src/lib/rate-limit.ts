/**
 * Server-side rate limiting for /api/humanize.
 *
 * The old "5 per day" limit lived in localStorage, so clearing storage or
 * calling the endpoint directly gave unlimited access to a paid LLM API.
 *
 * Storage is in-process by default (fine for the single replica this site
 * runs). Set UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN to share
 * counters across replicas — the Redis path uses INCR + EXPIRE so it stays
 * atomic without a Lua script.
 */

const LIMIT = Number(process.env.HUMANIZE_DAILY_LIMIT ?? 5)
const WINDOW_SECONDS = 24 * 60 * 60

export interface RateLimitResult {
  allowed: boolean
  remaining: number
  limit: number
  /** Epoch seconds when the current window expires. */
  reset: number
}

// ---------------------------------------------------------------------------
// In-memory fallback
// ---------------------------------------------------------------------------

interface Bucket {
  count: number
  reset: number
}

const buckets = new Map<string, Bucket>()
let lastSweep = 0

function sweep(now: number) {
  // Cheap amortised cleanup: at most once a minute, drop expired buckets.
  if (now - lastSweep < 60_000) return
  lastSweep = now
  for (const [key, bucket] of buckets) {
    if (bucket.reset <= now) buckets.delete(key)
  }
}

function memoryLimit(key: string): RateLimitResult {
  const now = Date.now()
  sweep(now)
  const existing = buckets.get(key)
  if (!existing || existing.reset <= now) {
    const reset = now + WINDOW_SECONDS * 1000
    buckets.set(key, { count: 1, reset })
    return { allowed: true, remaining: LIMIT - 1, limit: LIMIT, reset: Math.floor(reset / 1000) }
  }
  if (existing.count >= LIMIT) {
    return { allowed: false, remaining: 0, limit: LIMIT, reset: Math.floor(existing.reset / 1000) }
  }
  existing.count += 1
  return {
    allowed: true,
    remaining: Math.max(0, LIMIT - existing.count),
    limit: LIMIT,
    reset: Math.floor(existing.reset / 1000),
  }
}

// ---------------------------------------------------------------------------
// Redis (Upstash REST) path
// ---------------------------------------------------------------------------

const redisUrl = process.env.UPSTASH_REDIS_REST_URL
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN

async function redisCommand<T>(command: (string | number)[]): Promise<T> {
  const res = await fetch(`${redisUrl}/${command.map((c) => encodeURIComponent(String(c))).join('/')}`, {
    headers: { Authorization: `Bearer ${redisToken}` },
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`Redis ${res.status}`)
  const json = (await res.json()) as { result: T }
  return json.result
}

async function redisLimit(key: string): Promise<RateLimitResult> {
  const count = await redisCommand<number>(['INCR', key])
  if (count === 1) await redisCommand<number>(['EXPIRE', key, WINDOW_SECONDS])
  const ttl = await redisCommand<number>(['TTL', key])
  const reset = Math.floor(Date.now() / 1000) + (ttl > 0 ? ttl : WINDOW_SECONDS)
  if (count > LIMIT) return { allowed: false, remaining: 0, limit: LIMIT, reset }
  return { allowed: true, remaining: LIMIT - count, limit: LIMIT, reset }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** Best-effort client identity. Vercel/Railway/Cloudflare all set one of these. */
export function clientKey(req: Request): string {
  const headers = req.headers
  const forwarded = headers.get('x-forwarded-for')
  const ip =
    headers.get('cf-connecting-ip') ||
    headers.get('x-real-ip') ||
    (forwarded ? forwarded.split(',')[0].trim() : '') ||
    'unknown'
  return `humanize:rl:${ip}`
}

export async function checkRateLimit(key: string): Promise<RateLimitResult> {
  if (redisUrl && redisToken) {
    try {
      return await redisLimit(key)
    } catch (error) {
      // Never fail closed on a limiter outage: log and fall back to memory.
      console.error('Rate limit backend unavailable, using memory store:', error)
    }
  }
  return memoryLimit(key)
}
