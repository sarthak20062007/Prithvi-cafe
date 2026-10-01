
import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "PRITHVI CAFE | Where Art Meets Food",
  description:
    "Born from the dreams of Prithviraj Kapoor, Prithvi Cafe is a vibrant extension of Mumbai's ...",
  keywords: [
    "Prithvi Cafe",
    "Mumbai",
    "Theatre",
    "Fine Dining",
    "Prithviraj Kapoor",
    "Juhu",
  ],

  verification: {
    google: "JFd98sC00jufMcQJQ-eTHBxprbfm2t3SWEQPEGThV2g",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${playfairDisplay.variable} ${inter.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
