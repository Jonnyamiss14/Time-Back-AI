import type React from "react"
import type { Metadata } from "next"
import { Noto_Sans } from "next/font/google"
import { Analytics } from "@/components/analytics"
import { PerformanceMonitor } from "@/components/performance-monitor"
import { generateSEOMetadata, generateStructuredData } from "@/components/seo"
import "./globals.css"
import { Suspense } from "react"

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
  variable: "--font-noto-sans",
})

export const metadata: Metadata = generateSEOMetadata({
  title: "TimeBack AI - Give Staff Time Back with Bespoke AI Training",
  description:
    "Bespoke, human-centred AI training for schools and employment services. Designed by someone who's done the job. Book a 30-min session today.",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const structuredData = generateStructuredData({
    type: "Organization",
    description:
      "TimeBack AI provides bespoke, human-centred AI training for schools and employment services. Designed by frontline experts to give staff time back safely and simply.",
  })

  return (
    <html lang="en">
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <link rel="icon" href="/favicon.ico" />
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
      </head>
      <body className={`font-sans ${notoSans.variable}`}>
        <Suspense fallback={null}>
          {children}
          <Analytics gaId={process.env.NEXT_PUBLIC_GA_ID} hotjarId={process.env.NEXT_PUBLIC_HOTJAR_ID} />
          <PerformanceMonitor />
        </Suspense>
      </body>
    </html>
  )
}
