import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { Sidebar } from "@/components/sidebar"
import { TerminalProvider } from "@/components/terminal-provider"
import { Analytics } from "@/components/analytics"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Sagar Kundu | Full Stack Developer & ML Expert",
  description: "Software engineer with expertise in full stack development, machine learning, and cybersecurity.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-terminal-black text-terminal-green`}>
        <TerminalProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <div className="flex flex-col md:flex-row min-h-screen">
              <Sidebar />
              <main className="flex-1 md:pl-[280px] min-h-screen">
                {children}
                <div className="fixed inset-0 pointer-events-none bg-terminal-glow opacity-20 z-[-1]"></div>
              </main>
            </div>
          </Suspense>
          <Analytics />
        </TerminalProvider>
      </body>
    </html>
  )
}
