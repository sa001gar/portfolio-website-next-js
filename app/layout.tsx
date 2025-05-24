import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { Sidebar } from "@/components/sidebar"
import { TerminalProvider } from "@/components/terminal-provider"
import { Analytics } from "@/components/analytics"
import { ScrollToTop } from "@/components/scroll-to-top"
import { PageLoader } from "@/components/page-loader"
import { Suspense } from "react"
import { PWAInstallPrompt } from "@/components/pwa-install-prompt"
import { ServiceWorkerRegistration } from "@/components/service-worker-registration"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Sagar Kundu | Full Stack Developer & ML Expert",
  description: "Software engineer with expertise in full stack development, machine learning, and cybersecurity.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://your-portfolio-domain.com"),
  keywords: [
    "software engineer",
    "full stack developer",
    "machine learning",
    "cybersecurity",
    "web development",
    "portfolio",
  ],
  authors: [{ name: "Sagar Kundu" }],
  creator: "Sagar Kundu",
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Sagar Kundu Portfolio",
    startupImage: [
      {
        url: "/icons/apple-splash-2048-2732.png",
        media:
          "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
      },
      {
        url: "/icons/apple-splash-1668-2224.png",
        media:
          "(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
      },
      {
        url: "/icons/apple-splash-1536-2048.png",
        media:
          "(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
      },
      {
        url: "/icons/apple-splash-1125-2436.png",
        media:
          "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      {
        url: "/icons/apple-splash-1242-2208.png",
        media:
          "(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      {
        url: "/icons/apple-splash-750-1334.png",
        media:
          "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
      },
      {
        url: "/icons/apple-splash-640-1136.png",
        media:
          "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://your-portfolio-domain.com",
    title: "Sagar Kundu | Full Stack Developer & ML Expert",
    description: "Software engineer with expertise in full stack development, machine learning, and cybersecurity.",
    siteName: "Sagar Kundu Portfolio",
    images: [
      {
        url: "/favicon.avif",
        width: 1200,
        height: 630,
        alt: "Sagar Kundu - Full Stack Developer & ML Expert",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sagar Kundu | Full Stack Developer & ML Expert",
    description: "Software engineer with expertise in full stack development, machine learning, and cybersecurity.",
    creator: "@sagarkundu",
    images: ["/favicon.avif"],
  },
  icons: {
    icon: [
      { url: "/favicon.avif", sizes: "any" },
      { url: "/favicon.avif", sizes: "16x16", type: "image/png" },
      { url: "/favicon.avif", sizes: "32x32", type: "image/png" },
      { url: "/favicon.avif", sizes: "192x192", type: "image/png" },
      { url: "/favicon.avif", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/icons/safari-pinned-tab.svg",
        color: "#00ff41",
      },
    ],
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
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
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
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
          <PWAInstallPrompt />
          <ServiceWorkerRegistration />
        </TerminalProvider>
      </body>
    </html>
  )
}
