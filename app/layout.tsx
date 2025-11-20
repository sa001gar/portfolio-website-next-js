import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { Sidebar } from "@/components/sidebar"
import { TerminalProvider } from "@/components/terminal-provider"
import { Analytics } from "@/components/analytics"
import { ScrollToTop } from "@/components/scroll-to-top"
import { PageLoader } from "@/components/page-loader"
import { Suspense } from "react"
// import { PWAInstallPrompt } from "@/components/pwa-install-prompt"
// import { ServiceWorkerRegistration } from "@/components/service-worker-registration"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

const SITE_URL = new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:3000")

// Viewport and Metadata settings
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  colorScheme: "dark",
}
export const metadata: Metadata = {
  title: {
    default: "Sagar Kundu | Full Stack Developer & ML Expert",
    template: "%s — Sagar Kundu",
  },
  description:
    "Full‑stack engineer focused on web applications, machine learning, and secure cloud-native systems.",
  metadataBase: SITE_URL,
  keywords: [
    "Sagar Kundu",
    "software engineer",
    "full stack developer",
    "machine learning",
    "web development",
    "cloud",
    "cybersecurity",
    "portfolio",
  ],
  authors: [{ name: "Sagar Kundu", url: SITE_URL.href }],
  creator: "Sagar Kundu",
 
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL.href,
    title: "Sagar Kundu | Full Stack Developer & ML Expert",
    description:
      "Full‑stack engineer focused on web applications, machine learning, and secure cloud-native systems.",
    siteName: "Sagar Kundu Portfolio",
    images: [
      {
        url: new URL("/og-image.png", SITE_URL).href,
        width: 1200,
        height: 630,
        alt: "Sagar Kundu — Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sagar Kundu | Software Engineer",
    description:
      "Full‑stack engineer focused on backend systems, ML, and cloud-native architecture.",
    creator: "@sagarkundu",
    images: [new URL("/og-image.png", SITE_URL).href],
  },
  icons: {
    icon: [
      { url: "/favicon.avif", sizes: "any" },
      { url: "/favicon.avif", sizes: "16x16", type: "image/png" },
      { url: "/favicon.avif", sizes: "32x32", type: "image/png" },
      { url: "/favicon.avif", sizes: "192x192", type: "image/png" },
      { url: "/favicon.avif", sizes: "512x512", type: "image/png" },
    ],
    shortcut: ["/favicon.avif"],
  },
  alternates: {
    canonical: SITE_URL.href,
    languages: {
      "en-US": SITE_URL.href,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // uncomment and fill verification tokens if needed:
  // verification: { google: "...", yandex: "...", yahoo: "..." },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="theme-color" content="#00ff41" />
        <meta name="msapplication-TileColor" content="#0a0a0a" />
        {/* <meta name="msapplication-config" content="/browserconfig.xml" /> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Preload hero and OG images to improve largest contentful paint and social preview load */}
        <link rel="preload" as="image" href="https://sagarkundu.me/sagarkundu_square.avif" type="image/avif" />
        <link rel="preload" as="image" href="https://sagarkundu.me/og-image.png" type="image/png" />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-terminal-black text-terminal-green`}>
        <TerminalProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <PageLoader />
            <ScrollToTop />
            <div className="flex flex-col md:flex-row min-h-screen">
              <Sidebar />
              <main className="flex-1 md:pl-[280px] min-h-screen">
                {children}
                <div className="fixed inset-0 pointer-events-none bg-terminal-glow opacity-20 z-[-1]"></div>
              </main>
            </div>
          </Suspense>
      <Analytics />
      {/* <PWAInstallPrompt /> */}
      {/* Component will now attempt to unregister any existing service workers
        rather than register a new one. This ensures previously-installed
        SWs don't interfere with site performance. */}
      {/* <ServiceWorkerRegistration /> */}
        </TerminalProvider>
      </body>
    </html>
  )
}
