"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface TerminalTextProps {
  text: string
  className?: string
  typingDelay?: number
  showCursor?: boolean
  onComplete?: () => void
}

export function TerminalText({ text, className, typingDelay = 50, showCursor = true, onComplete }: TerminalTextProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    let currentIndex = 0
    setIsTyping(true)
    setDisplayedText("")

    const typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText((prev) => prev + text.charAt(currentIndex))
        currentIndex++
      } else {
        clearInterval(typingInterval)
        setIsTyping(false)
        onComplete?.()
      }
    }, typingDelay)

    return () => clearInterval(typingInterval)
  }, [text, typingDelay, onComplete])

  return (
    <span className={cn("font-mono", className)}>
      {displayedText}
      {showCursor && (
        <span className={`inline-block w-2 h-4 bg-terminal-bright ml-0.5 ${isTyping ? "animate-blink" : ""}`}></span>
      )}
    </span>
  )
}
