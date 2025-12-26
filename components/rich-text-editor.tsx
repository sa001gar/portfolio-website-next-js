"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import Youtube from "@tiptap/extension-youtube"
import Placeholder from "@tiptap/extension-placeholder"
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import Table from "@tiptap/extension-table"
import TableRow from "@tiptap/extension-table-row"
import TableCell from "@tiptap/extension-table-cell"
import TableHeader from "@tiptap/extension-table-header"
import Underline from "@tiptap/extension-underline"
import TextStyle from "@tiptap/extension-text-style"
import FontFamily from "@tiptap/extension-font-family"
import { common, createLowlight } from "lowlight"
import { useState, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  Image as ImageIcon,
  Youtube as YoutubeIcon,
  Eye,
  EyeOff,
  Upload,
  Loader2,
  Underline as UnderlineIcon,
  Table as TableIcon,
  Heading1,
  Heading2,
  Heading3,
  Type,
  ChevronDown,
} from "lucide-react"

const lowlight = createLowlight(common)

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

const fontFamilies = [
  { name: "Default", value: "" },
  { name: "Serif", value: "Georgia, serif" },
  { name: "Monospace", value: "monospace" },
  { name: "Cursive (Signature)", value: "'Brush Script MT', cursive" },
  { name: "Script", value: "'Lucida Handwriting', cursive" },
]

export function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
  const [isPreview, setIsPreview] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [showFontMenu, setShowFontMenu] = useState(false)
  const [showHeadingMenu, setShowHeadingMenu] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-terminal-green underline",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg border border-terminal-green/30 max-w-full",
        },
      }),
      Youtube.configure({
        width: 480,
        height: 320,
      }),
      Placeholder.configure({
        placeholder: placeholder || "Start typing...",
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: "border-collapse border border-terminal-green/30",
        },
      }),
      TableRow,
      TableHeader.configure({
        HTMLAttributes: {
          class: "bg-terminal-green/10 border border-terminal-green/30 p-2 font-bold",
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: "border border-terminal-green/30 p-2",
        },
      }),
      Underline,
      TextStyle,
      FontFamily,
    ],
    content,
    editorProps: {
      attributes: {
        class: "prose prose-invert prose-terminal max-w-none focus:outline-none min-h-[200px] p-4",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    immediatelyRender: false,
  })

  if (!editor) {
    return null
  }

  const addLink = () => {
    const url = window.prompt("URL")
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      const fileExt = file.name.split(".").pop()
      const fileName = `editor/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      
      const { error } = await supabase.storage
        .from("portfolio-assets")
        .upload(fileName, file)

      if (error) throw error

      const { data: { publicUrl } } = supabase.storage
        .from("portfolio-assets")
        .getPublicUrl(fileName)

      editor.chain().focus().setImage({ src: publicUrl }).run()
    } catch (error) {
      console.error("Error uploading image:", error)
      alert("Failed to upload image. Please try again.")
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const addImageFromUrl = () => {
    const url = window.prompt("Image URL")
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const addYoutube = () => {
    const url = window.prompt("YouTube URL")
    if (url) {
      editor.chain().focus().setYoutubeVideo({ src: url }).run()
    }
  }

  const insertTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
  }

  const setFontFamily = (fontFamily: string) => {
    if (fontFamily) {
      editor.chain().focus().setFontFamily(fontFamily).run()
    } else {
      editor.chain().focus().unsetFontFamily().run()
    }
    setShowFontMenu(false)
  }

  return (
    <div className="border border-terminal-green/30 rounded-md overflow-hidden bg-terminal-black/50">
      {/* Hidden file input for image upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-terminal-green/20 bg-terminal-green/5 sticky top-0 z-10 backdrop-blur-sm">
        {/* Heading Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowHeadingMenu(!showHeadingMenu)}
            className="flex items-center gap-1 px-2 py-1.5 rounded hover:bg-terminal-green/20 transition-colors text-terminal-green text-sm"
            title="Headings"
          >
            <Type className="w-4 h-4" />
            <ChevronDown className="w-3 h-3" />
          </button>
          {showHeadingMenu && (
            <div className="absolute top-full left-0 mt-1 bg-terminal-black border border-terminal-green/30 rounded-md shadow-lg z-20 min-w-[140px]">
              <button
                type="button"
                onClick={() => { editor.chain().focus().setParagraph().run(); setShowHeadingMenu(false) }}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-terminal-green/20 ${editor.isActive('paragraph') ? 'bg-terminal-green/10' : ''}`}
              >
                Paragraph
              </button>
              <button
                type="button"
                onClick={() => { editor.chain().focus().toggleHeading({ level: 1 }).run(); setShowHeadingMenu(false) }}
                className={`w-full text-left px-3 py-2 text-lg font-bold hover:bg-terminal-green/20 ${editor.isActive('heading', { level: 1 }) ? 'bg-terminal-green/10' : ''}`}
              >
                Heading 1
              </button>
              <button
                type="button"
                onClick={() => { editor.chain().focus().toggleHeading({ level: 2 }).run(); setShowHeadingMenu(false) }}
                className={`w-full text-left px-3 py-2 text-base font-bold hover:bg-terminal-green/20 ${editor.isActive('heading', { level: 2 }) ? 'bg-terminal-green/10' : ''}`}
              >
                Heading 2
              </button>
              <button
                type="button"
                onClick={() => { editor.chain().focus().toggleHeading({ level: 3 }).run(); setShowHeadingMenu(false) }}
                className={`w-full text-left px-3 py-2 text-sm font-bold hover:bg-terminal-green/20 ${editor.isActive('heading', { level: 3 }) ? 'bg-terminal-green/10' : ''}`}
              >
                Heading 3
              </button>
            </div>
          )}
        </div>

        {/* Font Family Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowFontMenu(!showFontMenu)}
            className="flex items-center gap-1 px-2 py-1.5 rounded hover:bg-terminal-green/20 transition-colors text-terminal-green text-sm"
            title="Font Family"
          >
            <span className="text-xs font-mono">Aa</span>
            <ChevronDown className="w-3 h-3" />
          </button>
          {showFontMenu && (
            <div className="absolute top-full left-0 mt-1 bg-terminal-black border border-terminal-green/30 rounded-md shadow-lg z-20 min-w-[180px]">
              {fontFamilies.map((font) => (
                <button
                  key={font.name}
                  type="button"
                  onClick={() => setFontFamily(font.value)}
                  style={{ fontFamily: font.value || 'inherit' }}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-terminal-green/20"
                >
                  {font.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="w-px h-6 bg-terminal-green/20 mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
          icon={<Bold className="w-4 h-4" />}
          title="Bold"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
          icon={<Italic className="w-4 h-4" />}
          title="Italic"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive("underline")}
          icon={<UnderlineIcon className="w-4 h-4" />}
          title="Underline"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive("strike")}
          icon={<Strikethrough className="w-4 h-4" />}
          title="Strike"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          isActive={editor.isActive("code")}
          icon={<Code className="w-4 h-4" />}
          title="Code"
        />
        <ToolbarButton
           onClick={() => editor.chain().focus().toggleCodeBlock().run()}
           isActive={editor.isActive("codeBlock")}
           icon={<div className="font-mono text-[10px] font-bold px-0.5">&lt;/&gt;</div>}
           title="Code Block"
        />
        <div className="w-px h-6 bg-terminal-green/20 mx-1" />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
          icon={<List className="w-4 h-4" />}
          title="Bullet List"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
          icon={<ListOrdered className="w-4 h-4" />}
          title="Ordered List"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive("blockquote")}
          icon={<Quote className="w-4 h-4" />}
          title="Quote"
        />
        <ToolbarButton
          onClick={insertTable}
          icon={<TableIcon className="w-4 h-4" />}
          title="Insert Table"
        />
        <div className="w-px h-6 bg-terminal-green/20 mx-1" />
        <ToolbarButton
          onClick={addLink}
          isActive={editor.isActive("link")}
          icon={<LinkIcon className="w-4 h-4" />}
          title="Link"
        />
        <ToolbarButton 
          onClick={() => fileInputRef.current?.click()} 
          disabled={isUploading}
          icon={isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />} 
          title="Upload Image" 
        />
        <ToolbarButton 
          onClick={addImageFromUrl} 
          icon={<ImageIcon className="w-4 h-4" />} 
          title="Image URL" 
        />
        <ToolbarButton onClick={addYoutube} icon={<YoutubeIcon className="w-4 h-4" />} title="YouTube" />
        <div className="ml-auto flex items-center gap-1">
          <ToolbarButton
            onClick={() => setIsPreview(!isPreview)}
            isActive={isPreview}
            icon={isPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            title={isPreview ? "Edit" : "Preview"}
          />
          <div className="w-px h-6 bg-terminal-green/20 mx-1" />
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            icon={<Undo className="w-4 h-4" />}
            title="Undo"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            icon={<Redo className="w-4 h-4" />}
            title="Redo"
          />
        </div>
      </div>

      {/* Editor / Preview Area */}
      <div style={{ display: isPreview ? 'none' : 'block' }}>
        <EditorContent editor={editor} />
      </div>
      
      {isPreview && (
        <div 
          className="prose prose-invert prose-terminal max-w-none p-4 min-h-[200px]"
          dangerouslySetInnerHTML={{ __html: editor.getHTML() }}
        />
      )}
    </div>
  )
}

function ToolbarButton({
  onClick,
  isActive,
  disabled,
  icon,
  title,
}: {
  onClick: () => void
  isActive?: boolean
  disabled?: boolean
  icon: React.ReactNode
  title: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-2 rounded hover:bg-terminal-green/20 transition-colors ${
        isActive ? "bg-terminal-green/20 text-terminal-bright" : "text-terminal-green"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {icon}
    </button>
  )
}
