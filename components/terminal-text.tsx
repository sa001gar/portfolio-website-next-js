"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface TerminalTextProps {
  text: string
  className?: string
  typingDelay?: number
  showCursor?: boolean
  onComplete?: () => void
}

export function TerminalText({
  text,
  className,
  typingDelay = 50,
  showCursor = true,
  onComplete,
}: TerminalTextProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const currentIndexRef = useRef(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    currentIndexRef.current = 0
    setDisplayedText("")
    setIsTyping(true)

    const typeChar = () => {
      if (currentIndexRef.current < text.length) {
        const nextChar = text[currentIndexRef.current]
        setDisplayedText((prev) => prev + nextChar)
        currentIndexRef.current += 1
        timeoutRef.current = setTimeout(typeChar, typingDelay)
      } else {
        setIsTyping(false)
        onComplete?.()
      }
    }

    timeoutRef.current = setTimeout(typeChar, typingDelay)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [text, typingDelay, onComplete])

  return (
    <span className={cn("font-mono", className)}>
      {displayedText}
      {showCursor && (
        <span
          className={`inline-block w-2 h-4 bg-terminal-bright ml-0.5 ${
            isTyping ? "animate-blink" : ""
          }`}
        ></span>
      )}
    </span>
  )
}
