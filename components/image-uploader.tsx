"use client"

import { useState, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, X, Image as ImageIcon, Loader2, Crop, WandSparkles } from "lucide-react"
import Image from "next/image"
import { processImageToWebP } from "@/lib/image-utils"
import { ImageCropperModal } from "@/components/image-cropper-modal"

interface ImageUploaderProps {
  value?: string | string[]
  onChange: (value: string | string[]) => void
  onRemove?: (value: string) => void
  multiple?: boolean
  bucket?: string
  folder?: string
  enableCrop?: boolean
  cropAspectRatio?: number
  maxWidth?: number
  maxHeight?: number
}

export function ImageUploader({
  value,
  onChange,
  onRemove,
  multiple = false,
  bucket = "portfolio-assets",
  folder = "uploads",
  enableCrop = false,
  cropAspectRatio,
  maxWidth = 1920,
  maxHeight = 1920,
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [inputType, setInputType] = useState<"file" | "url">("file")
  const [selectedCropImage, setSelectedCropImage] = useState<string | null>(null)
  const [cropTargetIndex, setCropTargetIndex] = useState<number | null>(null)
  const [isCropperOpen, setIsCropperOpen] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const urlInputRef = useRef<HTMLInputElement>(null)

  const supabase = createClient()

  // Helper to handle single or multiple values
  const values = Array.isArray(value) ? value : value ? [value] : []

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    // If single image and crop is enabled, open cropper modal
    if (!multiple && enableCrop && files.length === 1) {
      const objectUrl = URL.createObjectURL(files[0])
      setSelectedCropImage(objectUrl)
      setIsCropperOpen(true)
      if (fileInputRef.current) fileInputRef.current.value = ""
      return
    }

    setIsUploading(true)
    setStatusMessage("Resizing & converting to WebP...")
    try {
      const newUrls: string[] = []

      for (let i = 0; i < files.length; i++) {
        const file = files[i]

        // Convert and downscale to WebP with preserved visual fidelity
        const optimizedWebP = await processImageToWebP(file, {
          maxWidth,
          maxHeight,
          quality: 0.85,
        })

        const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2)}.webp`

        setStatusMessage(`Uploading ${i + 1}/${files.length} as WebP...`)
        const { error } = await supabase.storage
          .from(bucket)
          .upload(fileName, optimizedWebP, {
            contentType: "image/webp",
            upsert: true,
          })

        if (error) {
          throw error
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from(bucket).getPublicUrl(fileName)
        newUrls.push(publicUrl)
      }

      if (multiple) {
        onChange([...values, ...newUrls])
      } else {
        onChange(newUrls[0])
      }
    } catch (error: any) {
      console.error("Error uploading image:", error)
      alert("Error uploading image: " + (error?.message || "Unknown error"))
    } finally {
      setIsUploading(false)
      setStatusMessage(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleCroppedFile = async (croppedFile: File) => {
    setIsUploading(true)
    setStatusMessage("Uploading cropped WebP...")
    try {
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2)}.webp`

      const { error } = await supabase.storage
        .from(bucket)
        .upload(fileName, croppedFile, {
          contentType: "image/webp",
          upsert: true,
        })

      if (error) throw error

      const {
        data: { publicUrl },
      } = supabase.storage.from(bucket).getPublicUrl(fileName)

      if (cropTargetIndex !== null && multiple) {
        const updated = [...values]
        updated[cropTargetIndex] = publicUrl
        onChange(updated)
      } else if (multiple) {
        onChange([...values, publicUrl])
      } else {
        onChange(publicUrl)
      }
    } catch (err: any) {
      console.error("Error uploading cropped image:", err)
      alert("Upload failed: " + (err?.message || "Unknown error"))
    } finally {
      setIsUploading(false)
      setStatusMessage(null)
      setCropTargetIndex(null)
      if (selectedCropImage && selectedCropImage.startsWith("blob:")) {
        URL.revokeObjectURL(selectedCropImage)
      }
      setSelectedCropImage(null)
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

  const openCropperForUrl = (url: string, index?: number) => {
    setSelectedCropImage(url)
    setCropTargetIndex(index !== undefined ? index : null)
    setIsCropperOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 mb-4">
        <Button
          type="button"
          variant={inputType === "file" ? "default" : "outline"}
          onClick={() => setInputType("file")}
          size="sm"
          className={inputType === "file" ? "bg-terminal-green text-terminal-black font-semibold" : "border-terminal-green/30 text-terminal-green"}
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Files
        </Button>
        <Button
          type="button"
          variant={inputType === "url" ? "default" : "outline"}
          onClick={() => setInputType("url")}
          size="sm"
          className={inputType === "url" ? "bg-terminal-green text-terminal-black font-semibold" : "border-terminal-green/30 text-terminal-green"}
        >
          <ImageIcon className="w-4 h-4 mr-2" />
          External URL
        </Button>
      </div>

      {inputType === "file" ? (
        <div className="grid w-full max-w-md items-center gap-1.5">
          <Label htmlFor="picture" className="text-xs font-mono text-terminal-green/70 uppercase">
            Upload Image (Auto-resized & converted to WebP)
          </Label>
          <Input
            id="picture"
            type="file"
            accept="image/*"
            multiple={multiple}
            onChange={handleFileUpload}
            disabled={isUploading}
            ref={fileInputRef}
            className="cursor-pointer file:cursor-pointer file:text-terminal-bright file:bg-terminal-green/20 hover:file:bg-terminal-green/30 font-mono text-xs"
          />
          {isUploading && (
            <div className="flex items-center text-xs font-mono text-terminal-bright mt-1">
              <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin text-terminal-bright" />
              <span>{statusMessage || "Processing..."}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-terminal-green/50">
            <WandSparkles className="w-3 h-3 text-terminal-green/60" />
            <span>Auto-scales to max {maxWidth}px & encodes to optimized WebP format</span>
          </div>
        </div>
      ) : (
        <div className="flex gap-2 max-w-md">
          <Input
            ref={urlInputRef}
            placeholder="https://example.com/image.jpg"
            className="flex-1 font-mono text-xs bg-terminal-black border-terminal-green/30 text-terminal-green"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                handleUrlAdd()
              }
            }}
          />
          <Button
            type="button"
            onClick={handleUrlAdd}
            variant="secondary"
            className="bg-terminal-green/20 text-terminal-bright hover:bg-terminal-green/30"
          >
            Add
          </Button>
        </div>
      )}

      {/* Preview Grid */}
      {values.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {values.map((url, index) => (
            <div
              key={`${url}-${index}`}
              className="relative group border border-terminal-green/30 rounded-md overflow-hidden aspect-video bg-black/40 shadow-sm"
            >
              <Image
                src={url}
                alt="Uploaded image"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />

              {/* Action Buttons overlay */}
              <div className="absolute top-1 right-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => openCropperForUrl(url, index)}
                  title="Crop Image"
                  className="bg-black/80 hover:bg-black text-terminal-bright p-1 rounded-full border border-terminal-green/40 transition-colors"
                >
                  <Crop className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleRemove(url)}
                  title="Delete Image"
                  className="bg-red-500/80 hover:bg-red-600 text-white p-1 rounded-full transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {url.endsWith(".webp") && (
                <div className="absolute bottom-1 left-1 bg-black/70 border border-terminal-green/40 text-terminal-bright text-[9px] font-mono px-1 py-0.5 rounded">
                  WEBP
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Cropper Modal */}
      <ImageCropperModal
        imageSrc={selectedCropImage}
        isOpen={isCropperOpen}
        onClose={() => {
          setIsCropperOpen(false)
          setSelectedCropImage(null)
          setCropTargetIndex(null)
        }}
        onConfirm={handleCroppedFile}
        aspectRatio={cropAspectRatio}
        cropShape={cropAspectRatio === 1 ? "round" : "rect"}
        maxWidth={maxWidth}
        maxHeight={maxHeight}
        title="Crop & Optimize Image"
      />
    </div>
  )
}
