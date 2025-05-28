"use client"

import type React from "react"
import { useEffect } from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS, MARKS, INLINES, type Document } from "@contentful/rich-text-types"
import Image from "next/image"
import Link from "next/link"
import Prism from "prismjs"

// Import Prism syntax highlighting
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-tsx"
import "prismjs/components/prism-css"
import "prismjs/components/prism-python"
import "prismjs/components/prism-java"
import "prismjs/components/prism-c"
import "prismjs/components/prism-cpp"
import "prismjs/components/prism-csharp"
import "prismjs/components/prism-go"
import "prismjs/components/prism-rust"
import "prismjs/components/prism-bash"
import "prismjs/components/prism-json"
import "prismjs/components/prism-markdown"
import "prismjs/components/prism-yaml"
import "prismjs/components/prism-sql"
import "prismjs/components/prism-graphql"
import "prismjs/components/prism-docker"

interface RichTextRendererProps {
  content: Document | string
  className?: string
}

interface CodeBlockProps {
  language?: string
  children: string
}

// Code Block component with syntax highlighting
const CodeBlock = ({ language = "javascript", children }: CodeBlockProps) => {
  useEffect(() => {
    Prism.highlightAll()
  }, [children])

  return (
    <div className="relative my-8 rounded-lg overflow-hidden border border-terminal-green/30 shadow-lg">
      {/* Terminal header */}
      <div className="flex items-center justify-between bg-terminal-black/90 px-4 py-3 border-b border-terminal-green/20">
        <span className="text-xs text-terminal-green/80 font-mono uppercase tracking-wider">{language}</span>
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
        </div>
      </div>
      {/* Code content */}
      <div className="bg-terminal-black/70 p-6 overflow-x-auto">
        <pre className="text-sm leading-relaxed">
          <code className={`language-${language} text-terminal-green`}>{children.trim()}</code>
        </pre>
      </div>
    </div>
  )
}

// Table component for rendering Contentful tables
const Table = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="my-8 overflow-x-auto rounded-lg border border-terminal-green/30">
      <table className="min-w-full bg-terminal-black/30">{children}</table>
    </div>
  )
}

export function RichTextRenderer({ content, className = "" }: RichTextRendererProps) {
  // Initialize Prism.js when component mounts
  useEffect(() => {
    Prism.highlightAll()
  }, [content])

  // Handle both rich text documents and plain strings
  if (typeof content === "string") {
    return (
      <div
        className={`prose prose-invert prose-terminal max-w-none ${className}`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    )
  }

  // Custom rendering options for rich text
  const renderOptions = {
    renderMark: {
      [MARKS.BOLD]: (text: React.ReactNode) => <strong className="font-bold text-terminal-bright">{text}</strong>,
      [MARKS.ITALIC]: (text: React.ReactNode) => <em className="italic text-terminal-green/90">{text}</em>,
      [MARKS.UNDERLINE]: (text: React.ReactNode) => (
        <span className="underline decoration-terminal-green/70 underline-offset-2">{text}</span>
      ),
      [MARKS.CODE]: (text: React.ReactNode) => (
        <code className="bg-terminal-black/60 px-2 py-1 rounded-md text-terminal-green font-mono text-sm border border-terminal-green/30 mx-1">
          {text}
        </code>
      ),
      [MARKS.SUPERSCRIPT]: (text: React.ReactNode) => <sup className="text-terminal-green/80 text-xs">{text}</sup>,
      [MARKS.SUBSCRIPT]: (text: React.ReactNode) => <sub className="text-terminal-green/80 text-xs">{text}</sub>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => {
        // Check if paragraph is empty or just whitespace
        const textContent = node.content
          ?.map((item: any) => (item.nodeType === "text" ? item.value : ""))
          .join("")
          .trim()

        if (!textContent) {
          return <div className="h-4" /> // Empty line spacing
        }

        return <p className="mb-6 text-terminal-green/90 leading-relaxed text-base">{children}</p>
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
        <h4 className="text-xl font-bold text-terminal-bright mb-4 mt-6 flex items-center">
          <span className="text-terminal-green mr-2">####</span>
          {children}
        </h4>
      ),
      [BLOCKS.HEADING_5]: (node: any, children: React.ReactNode) => (
        <h5 className="text-lg font-bold text-terminal-bright mb-3 mt-5 flex items-center">
          <span className="text-terminal-green mr-2">#####</span>
          {children}
        </h5>
      ),
      [BLOCKS.HEADING_6]: (node: any, children: React.ReactNode) => (
        <h6 className="text-base font-bold text-terminal-bright mb-3 mt-4 flex items-center">
          <span className="text-terminal-green mr-2">######</span>
          {children}
        </h6>
      ),
      [BLOCKS.UL_LIST]: (node: any, children: React.ReactNode) => (
        <ul className="mb-6 mt-4 space-y-3 text-terminal-green/90">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (node: any, children: React.ReactNode) => (
        <ol className="mb-6 mt-4 space-y-3 text-terminal-green/90 counter-reset-list">{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (node: any, children: React.ReactNode) => {
        // Determine if this is part of an ordered or unordered list
        const isOrderedList = node.nodeType === BLOCKS.LIST_ITEM

        // Handle nested content properly
        const content = node.content || []
        const hasNestedList = content.some(
          (item: any) => item.nodeType === BLOCKS.UL_LIST || item.nodeType === BLOCKS.OL_LIST,
        )

        if (hasNestedList) {
          // Extract paragraph content and nested lists separately
          const paragraphContent = content
            .filter((item: any) => item.nodeType === BLOCKS.PARAGRAPH)
            .map((item: any) => documentToReactComponents(item, renderOptions))

          const nestedLists = content
            .filter((item: any) => item.nodeType === BLOCKS.UL_LIST || item.nodeType === BLOCKS.OL_LIST)
            .map((item: any) => documentToReactComponents(item, renderOptions))

          return (
            <li className="flex items-start mb-3">
              <span className="text-terminal-green mr-3 mt-1 flex-shrink-0">•</span>
              <div className="flex-1">
                <div>{paragraphContent}</div>
                <div className="ml-4 mt-2">{nestedLists}</div>
              </div>
            </li>
          )
        }

        return (
          <li className="flex items-start mb-3">
            <span className="text-terminal-green mr-3 mt-1 flex-shrink-0">•</span>
            <div className="flex-1 leading-relaxed">{children}</div>
          </li>
        )
      },
      [BLOCKS.QUOTE]: (node: any, children: React.ReactNode) => (
        <blockquote className="border-l-4 border-terminal-green/60 pl-6 py-4 my-8 bg-terminal-green/5 rounded-r-lg">
          <div className="text-terminal-green/90 italic text-lg leading-relaxed">{children}</div>
        </blockquote>
      ),
      [BLOCKS.HR]: () => (
        <div className="my-12 flex items-center justify-center">
          <div className="flex-1 h-px bg-terminal-green/30"></div>
          <span className="px-4 text-terminal-green/60">***</span>
          <div className="flex-1 h-px bg-terminal-green/30"></div>
        </div>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        try {
          const { file, title, description } = node.data.target.fields
          const imageUrl = file?.url ? `https:${file.url}` : null

          if (!imageUrl) {
            return (
              <div className="my-8 p-6 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-center">
                <span className="text-2xl mb-2 block">⚠️</span>
                Missing image asset
              </div>
            )
          }

          return (
            <div className="my-8">
              <div className="rounded-lg overflow-hidden border border-terminal-green/30 shadow-lg">
                <Image
                  src={imageUrl || "/placeholder.svg"}
                  alt={description || title || "Blog image"}
                  width={file.details.image.width}
                  height={file.details.image.height}
                  className="w-full h-auto"
                />
              </div>
              {description && (
                <p className="text-sm text-terminal-green/60 mt-3 text-center italic bg-terminal-green/5 py-2 rounded">
                  {description}
                </p>
              )}
            </div>
          )
        } catch (error) {
          console.error("Error rendering embedded asset:", error)
          return (
            <div className="my-8 p-6 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-center">
              <span className="text-2xl mb-2 block">❌</span>
              Error rendering embedded asset
            </div>
          )
        }
      },
      [BLOCKS.EMBEDDED_ENTRY]: (node: any) => {
        try {
          const entry = node.data.target
          const contentType = entry.sys.contentType.sys.id

          // Handle different embedded entry types
          switch (contentType) {
            case "codeSnippet":
              return <CodeBlock language={entry.fields.language || "javascript"}>{entry.fields.code}</CodeBlock>
            case "callout":
              const calloutType = entry.fields.type || "info"
              const calloutColors = {
                info: "bg-blue-500/10 border-blue-500/30 text-blue-300",
                warning: "bg-yellow-500/10 border-yellow-500/30 text-yellow-300",
                success: "bg-green-500/10 border-green-500/30 text-green-300",
                error: "bg-red-500/10 border-red-500/30 text-red-300",
              }

              return (
                <div
                  className={`my-8 p-6 rounded-lg border ${calloutColors[calloutType as keyof typeof calloutColors] || calloutColors.info}`}
                >
                  <h4 className="font-bold mb-3 text-lg">{entry.fields.title}</h4>
                  <div className="leading-relaxed">{entry.fields.content}</div>
                </div>
              )
            default:
              return (
                <div className="my-8 p-6 bg-terminal-green/10 border border-terminal-green/30 rounded-lg">
                  <h4 className="font-bold text-terminal-bright mb-3 text-lg">
                    {entry.fields.title || "Embedded Content"}
                  </h4>
                  {entry.fields.description && (
                    <p className="text-terminal-green/80 leading-relaxed">{entry.fields.description}</p>
                  )}
                </div>
              )
          }
        } catch (error) {
          console.error("Error rendering embedded entry:", error)
          return (
            <div className="my-8 p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-300 text-center">
              <span className="text-2xl mb-2 block">📦</span>
              Embedded content
            </div>
          )
        }
      },
      [BLOCKS.TABLE]: (node: any, children: React.ReactNode) => <Table>{children}</Table>,
      [BLOCKS.TABLE_ROW]: (node: any, children: React.ReactNode) => (
        <tr className="border-b border-terminal-green/20 hover:bg-terminal-green/5 transition-colors">{children}</tr>
      ),
      [BLOCKS.TABLE_CELL]: (node: any, children: React.ReactNode) => (
        <td className="px-6 py-4 border-r border-terminal-green/20 last:border-r-0 text-terminal-green/90">
          {children}
        </td>
      ),
      [BLOCKS.TABLE_HEADER_CELL]: (node: any, children: React.ReactNode) => (
        <th className="px-6 py-4 bg-terminal-green/20 font-bold text-terminal-bright border-r border-terminal-green/20 last:border-r-0">
          {children}
        </th>
      ),
      // Handle code blocks properly
      [BLOCKS.CODE]: (node: any) => {
        // Extract the actual code content
        const codeContent = node.content?.[0]?.value || node.value || ""
        const language = node.data?.language || "text"

        return <CodeBlock language={language}>{codeContent}</CodeBlock>
      },
      [INLINES.HYPERLINK]: (node: any, children: React.ReactNode) => (
        <Link
          href={node.data.uri}
          className="text-terminal-bright underline decoration-terminal-green/50 hover:text-terminal-green hover:decoration-terminal-green transition-all duration-200"
          target={node.data.uri.startsWith("http") ? "_blank" : undefined}
          rel={node.data.uri.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {children}
        </Link>
      ),
      [INLINES.ENTRY_HYPERLINK]: (node: any, children: React.ReactNode) => {
        try {
          // Handle internal content links
          const contentType = node.data.target.sys.contentType.sys.id
          let href = "/"

          if (contentType === "blogPost") {
            href = `/blog/${node.data.target.fields.slug}`
          } else if (contentType === "project") {
            href = `/projects/${node.data.target.fields.slug}`
          }

          return (
            <Link
              href={href}
              className="text-terminal-bright underline decoration-terminal-green/50 hover:text-terminal-green hover:decoration-terminal-green transition-all duration-200"
            >
              {children}
            </Link>
          )
        } catch (error) {
          console.error("Error rendering entry hyperlink:", error)
          return <span className="text-terminal-bright underline">{children}</span>
        }
      },
      [INLINES.ASSET_HYPERLINK]: (node: any, children: React.ReactNode) => {
        try {
          const asset = node.data.target.fields
          const assetUrl = asset.file?.url ? `https:${asset.file.url}` : "#"

          return (
            <a
              href={assetUrl}
              className="text-terminal-bright underline decoration-terminal-green/50 hover:text-terminal-green hover:decoration-terminal-green transition-all duration-200"
              target="_blank"
              rel="noopener noreferrer"
              download={asset.title}
            >
              {children}
            </a>
          )
        } catch (error) {
          console.error("Error rendering asset hyperlink:", error)
          return <span className="text-terminal-bright underline">{children}</span>
        }
      },
    },
  }

  return (
    <div className={`prose prose-invert prose-terminal max-w-none ${className}`}>
      {documentToReactComponents(content, renderOptions)}
    </div>
  )
}
