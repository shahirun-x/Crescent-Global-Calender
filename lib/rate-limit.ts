/**
 * Simple in-memory rate limiter for API routes.
 * Tracks request counts per key (IP) with a sliding window.
 * Not shared across serverless instances — best-effort protection.
 */

interface Entry {
  count: number;
  resetAt: number;
}

const store = new Map<string, Entry>();

const CLEANUP_INTERVAL = 60_000;
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  for (const [key, entry] of store) {
    if (entry.resetAt <= now) store.delete(key);
  }
}

/**
 * Check rate limit for a key.
 * @param key    Unique identifier (usually IP address)
 * @param limit  Max requests allowed in the window
 * @param windowMs  Window size in milliseconds (default: 1 hour)
 * @returns { ok: true } if allowed, { ok: false, retryAfterMs } if exceeded
 */
export function checkRateLimit(
  key: string,
  limit: number,
  windowMs = 3_600_000
): { ok: true } | { ok: false; retryAfterMs: number } {
  cleanup();
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || entry.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }

  if (entry.count >= limit) {
    return { ok: false, retryAfterMs: entry.resetAt - now };
  }

  entry.count++;
  return { ok: true };
}

/**
 * Extract client IP from request headers.
 */
export function getClientIP(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const real = request.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}
