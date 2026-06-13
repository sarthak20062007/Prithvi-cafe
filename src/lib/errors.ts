/**
 * Secure error handling utility.
 *
 * - Users always see generic, safe error messages.
 * - Developers see detailed logs in development only.
 * - Stack traces, internal paths, and env values are never exposed.
 */

/** Generic user-safe error messages keyed by error category. */
const USER_MESSAGES: Record<string, string> = {
  validation: "Please check your input and try again.",
  not_found: "The requested resource was not found.",
  rate_limit: "Too many requests. Please try again later.",
  server: "Something went wrong. Please try again later.",
  unauthorized: "You are not authorized to perform this action.",
  forbidden: "Access denied.",
  default: "An unexpected error occurred. Please try again.",
};

/**
 * Returns a generic, user-safe error message.
 * Never exposes internal details, stack traces, or environment values.
 */
export function sanitizeError(
  category: keyof typeof USER_MESSAGES = "default"
): string {
  return USER_MESSAGES[category] ?? USER_MESSAGES.default;
}

/**
 * Logs full error details in development, minimal info in production.
 * Call this in catch blocks before returning sanitized errors to users.
 */
export function logError(error: unknown, context?: string): void {
  if (process.env.NODE_ENV === "development") {
    console.error(
      `[ERROR]${context ? ` [${context}]` : ""}`,
      error instanceof Error
        ? { message: error.message, stack: error.stack }
        : error
    );
  } else {
    // In production, log only the error message and context — no stack traces
    console.error(
      `[ERROR]${context ? ` [${context}]` : ""}`,
      error instanceof Error ? error.message : "Unknown error"
    );
  }
}

/**
 * Creates a safe JSON error response for API routes.
 * Use in API route handlers to return consistent, safe error responses.
 */
export function createErrorResponse(
  category: keyof typeof USER_MESSAGES = "default",
  status: number = 500
): Response {
  return new Response(
    JSON.stringify({ error: sanitizeError(category) }),
    {
      status,
      headers: { "Content-Type": "application/json" },
    }
  );
}
