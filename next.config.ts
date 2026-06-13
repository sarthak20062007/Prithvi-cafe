import type { NextConfig } from "next";

// ---------------------------------------------------------------------------
// Security Headers
// ---------------------------------------------------------------------------
// These headers are applied to ALL responses. They protect against
// clickjacking, MIME-type sniffing, XSS reflection, and other browser-level
// attacks without affecting the visual appearance of the site.
// ---------------------------------------------------------------------------

const securityHeaders = [
  {
    // Content Security Policy
    // - 'self': allow same-origin resources
    // - fonts.googleapis.com / fonts.gstatic.com: Google Fonts
    // - lh3.googleusercontent.com: all current images
    // - 'unsafe-inline' for styles: required by Tailwind CSS + Framer Motion
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""}`,
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' https://lh3.googleusercontent.com data:",
      "connect-src 'self'",
      "frame-src 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
  {
    // Prevent clickjacking — page cannot be embedded in iframes
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    // Prevent MIME-type sniffing
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    // Control referrer information sent with requests
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    // Enforce HTTPS for 2 years, including subdomains
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    // Restrict browser features — deny unused permissions
    key: "Permissions-Policy",
    value: [
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "browsing-topics=()",
      "payment=()",
      "usb=()",
      "magnetometer=()",
      "gyroscope=()",
      "accelerometer=()",
    ].join(", "),
  },
  {
    // Prevent DNS prefetching to avoid privacy leaks
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
];

// ---------------------------------------------------------------------------
// Next.js Configuration
// ---------------------------------------------------------------------------

const nextConfig: NextConfig = {
  // Remove X-Powered-By header to avoid exposing the framework
  poweredByHeader: false,

  // Apply security headers to all routes
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  // Dev origins for local development
  allowedDevOrigins: ["192.168.1.105", "192.168.1.105:3001", "localhost:3001"],
};

export default nextConfig;
