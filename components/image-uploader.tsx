"use client"

import { useState, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react"
import Image from "next/image"

interface ImageUploaderProps {
  value?: string | string[]
  onChange: (value: string | string[]) => void
  onRemove?: (value: string) => void
  multiple?: boolean
  bucket?: string
  folder?: string
}

export function ImageUploader({
  value,
  onChange,
  onRemove,
  multiple = false,
  bucket = "portfolio-assets",
  folder = "uploads",
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [inputType, setInputType] = useState<"file" | "url">("file")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const urlInputRef = useRef<HTMLInputElement>(null)

  const supabase = createClient()

  // Helper to handle single or multiple values
  const values = Array.isArray(value) ? value : value ? [value] : []

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)
    try {
      const newUrls: string[] = []

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const fileExt = file.name.split(".").pop()
        const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`

        const { data, error } = await supabase.storage.from(bucket).upload(fileName, file)

        if (error) {
          throw error
        }

        const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(fileName)
        newUrls.push(publicUrl)
      }

      if (multiple) {
        onChange([...values, ...newUrls])
      } else {
        onChange(newUrls[0])
      }
    } catch (error) {
      console.error("Error uploading image:", error)
      alert("Error uploading image")
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleUrlAdd = () => {
    const url = urlInputRef.current?.value
    if (!url) return

    if (multiple) {
      onChange([...values, url])
    } else {
      onChange(url)
    }

    if (urlInputRef.current) {
      urlInputRef.current.value = ""
    }
  }

  const handleRemove = (urlToRemove: string) => {
    if (onRemove) {
      onRemove(urlToRemove)
      return
    }

    if (multiple) {
      onChange(values.filter((url) => url !== urlToRemove))
    } else {
      onChange("")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 mb-4">
        <Button
          type="button"
          variant={inputType === "file" ? "default" : "outline"}
          onClick={() => setInputType("file")}
          size="sm"
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload
        </Button>
        <Button
          type="button"
          variant={inputType === "url" ? "default" : "outline"}
          onClick={() => setInputType("url")}
          size="sm"
        >
          <ImageIcon className="w-4 h-4 mr-2" />
          External URL
        </Button>
      </div>

      {inputType === "file" ? (
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="picture">Upload Image</Label>
          <Input
            id="picture"
            type="file"
            accept="image/*"
            multiple={multiple}
            onChange={handleFileUpload}
            disabled={isUploading}
            ref={fileInputRef}
            className="cursor-pointer file:cursor-pointer file:text-terminal-bright file:bg-terminal-green/20 hover:file:bg-terminal-green/30"
          />
          {isUploading && (
            <div className="flex items-center text-sm text-terminal-green">
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Uploading...
            </div>
          )}
        </div>
      ) : (
        <div className="flex gap-2">
          <Input
            ref={urlInputRef}
            placeholder="https://example.com/image.jpg"
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleUrlAdd()
              }
            }}
          />
          <Button type="button" onClick={handleUrlAdd} variant="secondary">
            Add
          </Button>
        </div>
      )}

      {/* Preview Grid */}
      {values.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {values.map((url, index) => (
            <div key={`${url}-${index}`} className="relative group border border-terminal-green/30 rounded-md overflow-hidden aspect-video bg-black/20">
              <Image
                src={url}
                alt="Uploaded image"
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemove(url)}
                className="absolute top-1 right-1 bg-red-500/80 hover:bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
