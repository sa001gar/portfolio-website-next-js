"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { TerminalLoader } from "./terminal-loader"

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsLoading(true)

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [pathname])

  return <TerminalLoader isLoading={isLoading} />
}
