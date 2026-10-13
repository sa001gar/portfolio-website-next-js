"use client"

import { useState, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import { ImageCropperModal } from "@/components/image-cropper-modal"
import { Upload, X, User, Loader2, Link as LinkIcon, Crop } from "lucide-react"
import Image from "next/image"

interface AvatarUploaderProps {
  value?: string
  onChange: (url: string) => void
  folder?: string
  bucket?: string
  label?: string
  placeholderText?: string
}

export function AvatarUploader({
  value,
  onChange,
  folder = "avatars",
  bucket = "portfolio-assets",
  label = "Avatar",
  placeholderText = "Upload avatar",
}: AvatarUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [selectedRawImage, setSelectedRawImage] = useState<string | null>(null)
  const [isCropperOpen, setIsCropperOpen] = useState(false)
  const [showUrlInput, setShowUrlInput] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const supabase = createClient()

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const objectUrl = URL.createObjectURL(file)
    setSelectedRawImage(objectUrl)
    setIsCropperOpen(true)

    // Clear input so same file can be chosen again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleCroppedFile = async (croppedFile: File) => {
    setIsUploading(true)
    try {
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2)}.webp`

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, croppedFile, {
          contentType: "image/webp",
          upsert: true,
        })

      if (uploadError) {
        throw uploadError
      }

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName)

      onChange(publicUrl)
    } catch (err: any) {
      console.error("Error uploading avatar:", err)
      alert("Failed to upload avatar image: " + (err?.message || "Unknown error"))
    } finally {
      setIsUploading(false)
      if (selectedRawImage) {
        URL.revokeObjectURL(selectedRawImage)
        setSelectedRawImage(null)
      }
    }
  }

  return (
    <div className="space-y-2">
      {label && (
        <span className="text-xs font-mono text-terminal-green/70 block uppercase">
          {label}
        </span>
      )}

      <div className="flex items-center gap-3">
        {/* Avatar Preview */}
        <div className="relative w-12 h-12 rounded-full border border-terminal-green/40 bg-terminal-black/80 flex items-center justify-center overflow-hidden flex-shrink-0 group shadow-sm">
          {value ? (
            <Image
              src={value}
              alt="Avatar"
              fill
              className="object-cover"
              sizes="48px"
            />
          ) : (
            <User className="w-6 h-6 text-terminal-green/40" />
          )}

          {isUploading && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
              <Loader2 className="w-5 h-5 text-terminal-bright animate-spin" />
            </div>
          )}
        </div>

        {/* Upload Controls */}
        <div className="flex-1 min-w-0 flex flex-wrap items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileSelect}
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono border border-terminal-green/40 bg-terminal-green/10 text-terminal-bright hover:bg-terminal-green/20 hover:border-terminal-green/60 transition-colors disabled:opacity-50"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{value ? "Change Image" : placeholderText}</span>
          </button>

          {value && (
            <button
              type="button"
              onClick={() => {
                setSelectedRawImage(value)
                setIsCropperOpen(true)
              }}
              title="Crop existing image"
              className="p-1.5 rounded text-terminal-green/60 hover:text-terminal-bright border border-terminal-green/20 hover:border-terminal-green/40 transition-colors"
            >
              <Crop className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            type="button"
            onClick={() => setShowUrlInput(!showUrlInput)}
            title="Toggle URL Input"
            className={`p-1.5 rounded border transition-colors ${
              showUrlInput
                ? "border-terminal-bright text-terminal-bright bg-terminal-green/10"
                : "border-terminal-green/20 text-terminal-green/60 hover:text-terminal-bright"
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
          </button>

          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              title="Remove avatar"
              className="p-1.5 rounded text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/20 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Optional Direct URL Input */}
      {showUrlInput && (
        <div className="pt-1">
          <input
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Or paste image URL (https://...)"
            className="w-full text-xs font-mono bg-terminal-black border border-terminal-green/30 rounded px-2.5 py-1.5 text-terminal-green focus:outline-none focus:border-terminal-bright"
          />
        </div>
      )}

      {/* Cropper Modal */}
      <ImageCropperModal
        imageSrc={selectedRawImage}
        isOpen={isCropperOpen}
        onClose={() => {
          setIsCropperOpen(false)
          if (selectedRawImage && selectedRawImage.startsWith("blob:")) {
            URL.revokeObjectURL(selectedRawImage)
          }
          setSelectedRawImage(null)
        }}
        onConfirm={handleCroppedFile}
        aspectRatio={1}
        cropShape="round"
        maxWidth={500}
        maxHeight={500}
        title="Crop & Optimize Avatar"
      />
    </div>
  )
}
