import type React from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types"
import type { Document } from "@contentful/rich-text-types"
import Image from "next/image"
import Link from "next/link"

interface RichTextRendererProps {
  content: Document | string
  className?: string
}

// Custom rendering options for rich text
const renderOptions = {
  renderMark: {
    [MARKS.BOLD]: (text: React.ReactNode) => <strong className="font-bold text-terminal-bright">{text}</strong>,
    [MARKS.ITALIC]: (text: React.ReactNode) => <em className="italic text-terminal-green/90">{text}</em>,
    [MARKS.CODE]: (text: React.ReactNode) => (
      <code className="bg-terminal-black/50 px-2 py-1 rounded text-terminal-green font-mono text-sm border border-terminal-green/20">
        {text}
      </code>
    ),
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => (
      <p className="mb-4 text-terminal-green/90 leading-relaxed">{children}</p>
    ),
    [BLOCKS.HEADING_1]: (node: any, children: React.ReactNode) => (
      <h1 className="text-3xl font-bold text-terminal-bright mb-6 mt-8 border-b border-terminal-green/20 pb-2">
        {children}
      </h1>
    ),
    [BLOCKS.HEADING_2]: (node: any, children: React.ReactNode) => (
      <h2 className="text-2xl font-bold text-terminal-bright mb-4 mt-6">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (node: any, children: React.ReactNode) => (
      <h3 className="text-xl font-bold text-terminal-bright mb-3 mt-5">{children}</h3>
    ),
    [BLOCKS.HEADING_4]: (node: any, children: React.ReactNode) => (
      <h4 className="text-lg font-bold text-terminal-bright mb-3 mt-4">{children}</h4>
    ),
    [BLOCKS.HEADING_5]: (node: any, children: React.ReactNode) => (
      <h5 className="text-base font-bold text-terminal-bright mb-2 mt-3">{children}</h5>
    ),
    [BLOCKS.HEADING_6]: (node: any, children: React.ReactNode) => (
      <h6 className="text-sm font-bold text-terminal-bright mb-2 mt-3">{children}</h6>
    ),
    [BLOCKS.UL_LIST]: (node: any, children: React.ReactNode) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-terminal-green/90 ml-4">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (node: any, children: React.ReactNode) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-terminal-green/90 ml-4">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (node: any, children: React.ReactNode) => <li className="mb-1">{children}</li>,
    [BLOCKS.QUOTE]: (node: any, children: React.ReactNode) => (
      <blockquote className="border-l-4 border-terminal-green/50 pl-4 py-2 mb-4 bg-terminal-green/5 italic text-terminal-green/80">
        {children}
      </blockquote>
    ),
    [BLOCKS.HR]: () => <hr className="border-terminal-green/30 my-8" />,
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const { file, title, description } = node.data.target.fields
      const imageUrl = `https:${file.url}`

      return (
        <div className="my-6">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={description || title || "Blog image"}
            width={file.details.image.width}
            height={file.details.image.height}
            className="rounded-md border border-terminal-green/20"
          />
          {description && <p className="text-sm text-terminal-green/60 mt-2 text-center italic">{description}</p>}
        </div>
      )
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
      // Handle internal content links
      const slug = node.data.target.fields.slug
      return (
        <Link
          href={`/blog/${slug}`}
          className="text-terminal-bright underline hover:text-terminal-green transition-colors"
        >
          {children}
        </Link>
      )
    },
  },
}

export function RichTextRenderer({ content, className = "" }: RichTextRendererProps) {
  // Handle both rich text documents and plain strings
  if (typeof content === "string") {
    return (
      <div
        className={`prose prose-invert prose-terminal max-w-none ${className}`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    )
  }

  return (
    <div className={`prose prose-invert prose-terminal max-w-none ${className}`}>
      {documentToReactComponents(content, renderOptions)}
    </div>
  )
}
