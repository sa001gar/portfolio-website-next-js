"use client"

import type React from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS, MARKS, INLINES, type Document } from "@contentful/rich-text-types"
import Image from "next/image"
import Link from "next/link"
import { TerminalWindow } from "@/components/terminal-window"

interface ContentfulRichTextProps {
  content: Document | any
  className?: string
}

// Helper function to extract text content from rich text nodes
function getTextContent(node: any): string {
  if (typeof node === "string") return node
  if (node.nodeType === "text") return node.value || ""
  if (node.content) {
    return node.content.map((child: any) => getTextContent(child)).join("")
  }
  return ""
}

// Helper function to detect if content is a code block
function isCodeBlock(text: string): boolean {
  // Check for common code patterns
  const codePatterns = [
    /^(import|from|def|class|function|const|let|var|if|for|while)\s/m,
    /^(pip install|npm install|yarn add)/m,
    /^\s*[{}[\]();]/m,
    /^#\s*\w+/m, // Comments
    /^\s*\/\//m, // JS comments
    /^\s*\/\*/m, // Block comments
    /^\w+\s*=\s*\w+/m, // Assignments
  ]

  return codePatterns.some((pattern) => pattern.test(text.trim()))
}

// Helper function to detect programming language
function detectLanguage(text: string): string {
  const trimmedText = text.trim().toLowerCase()

  if (
    trimmedText.includes("pip install") ||
    trimmedText.includes("python") ||
    trimmedText.includes("def ") ||
    trimmedText.includes("import ")
  ) {
    return "python"
  }
  if (
    trimmedText.includes("npm install") ||
    trimmedText.includes("yarn add") ||
    trimmedText.includes("const ") ||
    trimmedText.includes("let ") ||
    trimmedText.includes("function")
  ) {
    return "javascript"
  }
  if (trimmedText.includes("from fastapi") || trimmedText.includes("@app.")) {
    return "python"
  }
  if (trimmedText.includes("curl") || trimmedText.includes("bash") || trimmedText.includes("sh")) {
    return "bash"
  }
  if (trimmedText.includes("select") || trimmedText.includes("insert") || trimmedText.includes("update")) {
    return "sql"
  }
  if (trimmedText.includes("{") && trimmedText.includes("}")) {
    return "json"
  }

  return "text"
}

export function ContentfulRichText({ content, className = "" }: ContentfulRichTextProps) {
  if (!content) return null

  const renderOptions = {
    renderMark: {
      [MARKS.BOLD]: (text: React.ReactNode) => <strong className="font-bold text-terminal-bright">{text}</strong>,
      [MARKS.ITALIC]: (text: React.ReactNode) => <em className="italic text-terminal-green/90">{text}</em>,
      [MARKS.UNDERLINE]: (text: React.ReactNode) => (
        <span className="underline decoration-terminal-green/70">{text}</span>
      ),
      [MARKS.CODE]: (text: React.ReactNode) => (
        <code className="bg-terminal-black/60 px-2 py-1 rounded text-terminal-green font-mono text-sm border border-terminal-green/30">
          {text}
        </code>
      ),
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => {
        // Extract text content to check if it's a code block
        const textContent = getTextContent(node)

        // If it looks like code and is long enough, render as code block
        if (textContent.length > 50 && isCodeBlock(textContent)) {
          const language = detectLanguage(textContent)
          return (
            <div className="my-6">
              <TerminalWindow title={`code.${language}`}>
                <pre className="text-terminal-green font-mono text-sm leading-relaxed whitespace-pre-wrap">
                  {textContent}
                </pre>
              </TerminalWindow>
            </div>
          )
        }

        // Regular paragraph
        if (!textContent.trim()) {
          return <div className="h-4" />
        }

        return <p className="mb-6 text-terminal-green/90 leading-relaxed">{children}</p>
      },

      [BLOCKS.HEADING_1]: (node: any, children: React.ReactNode) => (
        <h1 className="text-4xl font-bold text-terminal-bright mb-8 mt-12 border-b-2 border-terminal-green/30 pb-4">
          {children}
        </h1>
      ),

      [BLOCKS.HEADING_2]: (node: any, children: React.ReactNode) => (
        <h2 className="text-3xl font-bold text-terminal-bright mb-6 mt-10 flex items-center">
          <span className="text-terminal-green mr-3">##</span>
          {children}
        </h2>
      ),

      [BLOCKS.HEADING_3]: (node: any, children: React.ReactNode) => (
        <h3 className="text-2xl font-bold text-terminal-bright mb-5 mt-8 flex items-center">
          <span className="text-terminal-green mr-3">###</span>
          {children}
        </h3>
      ),

      [BLOCKS.HEADING_4]: (node: any, children: React.ReactNode) => (
        <h4 className="text-xl font-bold text-terminal-bright mb-4 mt-6">{children}</h4>
      ),

      [BLOCKS.HEADING_5]: (node: any, children: React.ReactNode) => (
        <h5 className="text-lg font-bold text-terminal-bright mb-3 mt-5">{children}</h5>
      ),

      [BLOCKS.HEADING_6]: (node: any, children: React.ReactNode) => (
        <h6 className="text-base font-bold text-terminal-bright mb-3 mt-4">{children}</h6>
      ),

      [BLOCKS.UL_LIST]: (node: any, children: React.ReactNode) => <ul className="mb-6 mt-4 space-y-2">{children}</ul>,

      [BLOCKS.OL_LIST]: (node: any, children: React.ReactNode) => (
        <ol className="mb-6 mt-4 space-y-2 list-decimal list-inside">{children}</ol>
      ),

      [BLOCKS.LIST_ITEM]: (node: any, children: React.ReactNode) => (
        <li className="flex items-start text-terminal-green/90">
          <span className="text-terminal-green mr-3 mt-1">•</span>
          <div className="flex-1">{children}</div>
        </li>
      ),

      [BLOCKS.QUOTE]: (node: any, children: React.ReactNode) => (
        <blockquote className="border-l-4 border-terminal-green/60 pl-6 py-4 my-8 bg-terminal-green/5 rounded-r-lg">
          <div className="text-terminal-green/90 italic">{children}</div>
        </blockquote>
      ),

      [BLOCKS.HR]: () => (
        <div className="my-12 flex items-center justify-center">
          <div className="flex-1 h-px bg-terminal-green/30"></div>
          <span className="px-4 text-terminal-green/60">***</span>
          <div className="flex-1 h-px bg-terminal-green/30"></div>
        </div>
      ),

      // Handle code blocks specifically
      [(BLOCKS as any).CODE]: (node: any) => {
        const codeContent = node.content?.[0]?.value || ""
        const language = detectLanguage(codeContent)

        return (
          <div className="my-6">
            <TerminalWindow title={`code.${language}`}>
              <pre className="text-terminal-green font-mono text-sm leading-relaxed whitespace-pre-wrap">
                {codeContent}
              </pre>
            </TerminalWindow>
          </div>
        )
      },

      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        try {
          const { file, title, description } = node.data.target.fields
          const imageUrl = file?.url ? `https:${file.url}` : null

          if (!imageUrl) {
            return (
              <div className="my-8 p-6 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-center">
                Missing image asset
              </div>
            )
          }

          return (
            <div className="my-8">
              <div className="rounded-lg overflow-hidden border border-terminal-green/30">
                <Image
                  src={imageUrl || "/placeholder.svg"}
                  alt={description || title || "Blog image"}
                  width={file.details.image.width}
                  height={file.details.image.height}
                  className="w-full h-auto"
                />
              </div>
              {description && <p className="text-sm text-terminal-green/60 mt-3 text-center italic">{description}</p>}
            </div>
          )
        } catch (error) {
          return (
            <div className="my-8 p-6 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-center">
              Error rendering image
            </div>
          )
        }
      },

      [BLOCKS.EMBEDDED_ENTRY]: (node: any) => {
        try {
          const entry = node.data.target
          const contentType = entry.sys.contentType.sys.id

          if (contentType === "codeSnippet") {
            const code = entry.fields.code || ""
            const language = entry.fields.language || detectLanguage(code)

            return (
              <div className="my-6">
                <TerminalWindow title={`${entry.fields.title || "code"}.${language}`}>
                  <pre className="text-terminal-green font-mono text-sm leading-relaxed whitespace-pre-wrap">
                    {code}
                  </pre>
                </TerminalWindow>
              </div>
            )
          }

          return (
            <div className="my-8 p-6 bg-terminal-green/10 border border-terminal-green/30 rounded-lg">
              <h4 className="font-bold text-terminal-bright mb-3">{entry.fields.title || "Embedded Content"}</h4>
              {entry.fields.description && <p className="text-terminal-green/80">{entry.fields.description}</p>}
            </div>
          )
        } catch (error) {
          return (
            <div className="my-8 p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-300 text-center">
              Embedded content
            </div>
          )
        }
      },

      [INLINES.HYPERLINK]: (node: any, children: React.ReactNode) => (
        <Link
          href={node.data.uri}
          className="text-terminal-bright underline hover:text-terminal-green transition-colors"
          target={node.data.uri.startsWith("http") ? "_blank" : undefined}
          rel={node.data.uri.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {children}
        </Link>
      ),

      [INLINES.ENTRY_HYPERLINK]: (node: any, children: React.ReactNode) => {
        try {
          const contentType = node.data.target.sys.contentType.sys.id
          let href = "/"

          if (contentType === "blogPost") {
            href = `/blog/${node.data.target.fields.slug}`
          } else if (contentType === "project") {
            href = `/project/${node.data.target.fields.slug}`
          }

          return (
            <Link href={href} className="text-terminal-bright underline hover:text-terminal-green transition-colors">
              {children}
            </Link>
          )
        } catch (error) {
          return <span className="text-terminal-bright underline">{children}</span>
        }
      },
    },
  }

  return (
    <div className={`prose prose-invert max-w-none ${className}`}>
      {documentToReactComponents(content, renderOptions)}
    </div>
  )
}
