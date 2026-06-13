import { NextRequest, NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// Rate Limiting — In-memory store (per-instance; use Redis in multi-instance)
// ---------------------------------------------------------------------------

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Cleanup stale entries every 5 minutes to prevent memory leaks
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanupStaleEntries(): void {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;

  for (const [key, entry] of rateLimitStore) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

/**
 * Check rate limit for a given IP + route combination.
 * Returns { allowed, remaining, retryAfterSeconds }.
 */
function checkRateLimit(
  ip: string,
  route: string,
  maxRequests: number,
  windowMs: number
): { allowed: boolean; remaining: number; retryAfterSeconds: number } {
  cleanupStaleEntries();

  const key = `${ip}:${route}`;
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1, retryAfterSeconds: 0 };
  }

  entry.count++;
  const remaining = Math.max(0, maxRequests - entry.count);
  const retryAfterSeconds = Math.ceil((entry.resetTime - now) / 1000);

  if (entry.count > maxRequests) {
    return { allowed: false, remaining: 0, retryAfterSeconds };
  }

  return { allowed: true, remaining, retryAfterSeconds: 0 };
}

// ---------------------------------------------------------------------------
// Route-specific rate limit configuration
// ---------------------------------------------------------------------------

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

function getRateLimitConfig(pathname: string): RateLimitConfig {
  // Auth routes: 5 requests per 15 minutes
  if (pathname.startsWith("/api/auth")) {
    return { maxRequests: 5, windowMs: 15 * 60 * 1000 };
  }

  // Form submission routes: 5 requests per minute
  if (
    pathname.startsWith("/api/contact") ||
    pathname.startsWith("/api/reservation") ||
    pathname.startsWith("/api/newsletter")
  ) {
    return {
      maxRequests: parseInt(process.env.RATE_LIMIT_FORM_MAX_REQUESTS || "5", 10),
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "60000", 10),
    };
  }

  // General API: 60 requests per minute
  return {
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "60", 10),
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "60000", 10),
  };
}

// ---------------------------------------------------------------------------
// CORS configuration
// ---------------------------------------------------------------------------

function getAllowedOrigins(): string[] {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const origins = [siteUrl];

  // In development, also allow localhost variants
  if (process.env.NODE_ENV === "development") {
    origins.push("http://localhost:3000", "http://localhost:3001");
  }

  return origins;
}

function getCorsHeaders(origin: string | null): Record<string, string> {
  const allowedOrigins = getAllowedOrigins();
  const headers: Record<string, string> = {
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
  };

  // Only set the origin if it's in our allowed list — no wildcards
  if (origin && allowedOrigins.includes(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Vary"] = "Origin";
  }

  return headers;
}

// ---------------------------------------------------------------------------
// Proxy (Next.js 16 convention — replaces deprecated middleware)
// ---------------------------------------------------------------------------

export function proxy(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;
  const origin = request.headers.get("origin");

  // Handle CORS preflight requests for API routes
  if (pathname.startsWith("/api") && request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: getCorsHeaders(origin),
    });
  }

  // Apply rate limiting to API routes only
  if (pathname.startsWith("/api")) {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    const config = getRateLimitConfig(pathname);
    const { allowed, remaining, retryAfterSeconds } = checkRateLimit(
      ip,
      pathname,
      config.maxRequests,
      config.windowMs
    );

    if (!allowed) {
      return new NextResponse(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": String(retryAfterSeconds),
            "X-RateLimit-Limit": String(config.maxRequests),
            "X-RateLimit-Remaining": "0",
            ...getCorsHeaders(origin),
          },
        }
      );
    }

    // Add rate limit headers + CORS headers to successful API responses
    const response = NextResponse.next();
    response.headers.set("X-RateLimit-Limit", String(config.maxRequests));
    response.headers.set("X-RateLimit-Remaining", String(remaining));
    const corsHeaders = getCorsHeaders(origin);
    for (const [key, value] of Object.entries(corsHeaders)) {
      response.headers.set(key, value);
    }
    return response;
  }

  return NextResponse.next();
}

// Only run proxy on API routes — does NOT affect page rendering
export const config = {
  matcher: ["/api/:path*"],
};
