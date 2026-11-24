# Environment variables

Copy to `.env.local` for development, or set these in Railway's dashboard for
production. `.env.local` is gitignored.

## Required

| Name | Purpose |
| --- | --- |
| `DEEPSEEK_API_KEY` | DeepSeek API key used by `/api/humanize`. Without it the endpoint returns 503. |

## Optional

| Name | Default | Purpose |
| --- | --- | --- |
| `HUMANIZE_DAILY_LIMIT` | `5` | Rewrites allowed per IP per rolling 24h. Enforced server-side in `src/lib/rate-limit.ts`. |
| `HUMANIZE_TIMEOUT_MS` | `55000` | Abort budget for the upstream DeepSeek call. A slower request returns 504 instead of hanging. |
| `UPSTASH_REDIS_REST_URL` | — | Set together with the token to share rate-limit counters across replicas. Without it counters live in process memory, which is correct for the current single-replica deployment (`railway.json` sets `numReplicas: 1`). |
| `UPSTASH_REDIS_REST_TOKEN` | — | Auth token for the Upstash REST endpoint above. |

## Notes

- The response cache in `/api/humanize` is in-process with a 10-minute TTL and a
  500-entry cap. It is a cost optimisation, not a correctness guarantee: a cache
  miss simply calls DeepSeek.
- If the Redis limiter is unreachable, the endpoint logs the failure and falls
  back to the in-memory counter rather than failing closed. A limiter outage
  should not take the tool down.
- Scale out past one replica and you must set the Upstash pair, otherwise each
  replica enforces its own five-per-day allowance.
