"use client"

import { useEffect } from "react"
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

export function PrismLoader() {
  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return null
}
