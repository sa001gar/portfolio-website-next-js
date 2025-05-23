"use client"

import { useEffect, useState } from "react"
import { Terminal } from "lucide-react"

interface TerminalLoaderProps {
  isLoading?: boolean
  loadingText?: string
}

export function TerminalLoader({ isLoading = true, loadingText = "Loading" }: TerminalLoaderProps) {
  const [progress, setProgress] = useState(0)
  const [dots, setDots] = useState("")
  const [currentMessage, setCurrentMessage] = useState(0)

  const loadingMessages = [
    "Initializing terminal...",
    "Loading components...",
    "Establishing connection...",
    "Rendering interface...",
    "Almost ready...",
  ]

  useEffect(() => {
    if (!isLoading) return

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)

    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."))
    }, 500)

    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % loadingMessages.length)
    }, 1000)

    return () => {
      clearInterval(progressInterval)
      clearInterval(dotsInterval)
      clearInterval(messageInterval)
    }
  }, [isLoading, loadingMessages.length])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 bg-terminal-black/95 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-terminal-black border-2 border-terminal-green rounded-lg p-6 max-w-md w-full mx-4 shadow-2xl">
        {/* Terminal Header */}
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-terminal-green/30">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-terminal-green" />
            <span className="text-terminal-green text-sm font-mono">system.loader</span>
          </div>
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
          </div>
        </div>

        {/* Loading Content */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-terminal-green font-mono">$</span>
            <span className="text-terminal-green font-mono">
              {loadingMessages[currentMessage]}
              {dots}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-terminal-green/70 font-mono">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-terminal-green/20 rounded-full h-2">
              <div
                className="bg-terminal-green h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Animated Cursor */}
          <div className="flex items-center space-x-1">
            <span className="text-terminal-green font-mono">&gt;</span>
            <div className="w-2 h-4 bg-terminal-green animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
