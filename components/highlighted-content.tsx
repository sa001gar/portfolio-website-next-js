"use client"

import { useEffect, useRef } from "react"
import Prism from "prismjs"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-css"
import "prismjs/components/prism-json"
import "prismjs/components/prism-bash"
import "prismjs/components/prism-python"
import "prismjs/components/prism-sql"
import "prismjs/components/prism-markdown"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-tsx"

interface HighlightedContentProps {
  content: string
  className?: string
}

export function HighlightedContent({ content, className }: HighlightedContentProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      Prism.highlightAllUnder(contentRef.current)
    }
  }, [content])

  return (
    <div
      ref={contentRef}
      className={`markdown-content ${className || ""}`}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
