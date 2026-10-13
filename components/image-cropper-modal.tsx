"use client"

import { useState, useCallback } from "react"
import Cropper from "react-easy-crop"
import type { Area, Point } from "react-easy-crop"
import { Button } from "@/components/ui/button"
import { Loader2, ZoomIn, ZoomOut, RotateCcw, Check, X } from "lucide-react"
import { processImageToWebP } from "@/lib/image-utils"

interface ImageCropperModalProps {
  imageSrc: string | null
  isOpen: boolean
  onClose: () => void
  onConfirm: (file: File) => Promise<void> | void
  aspectRatio?: number
  cropShape?: "round" | "rect"
  maxWidth?: number
  maxHeight?: number
  title?: string
}

export function ImageCropperModal({
  imageSrc,
  isOpen,
  onClose,
  onConfirm,
  aspectRatio = 1,
  cropShape = "round",
  maxWidth = 600,
  maxHeight = 600,
  title = "Crop & Optimize Image",
}: ImageCropperModalProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const onCropCompleteCallback = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels)
  }, [])

  const handleApply = async () => {
    if (!imageSrc || !croppedAreaPixels) return

    setIsProcessing(true)
    try {
      const optimizedWebPFile = await processImageToWebP(imageSrc, {
        maxWidth,
        maxHeight,
        quality: 0.9,
        cropArea: croppedAreaPixels,
      })

      await onConfirm(optimizedWebPFile)
      onClose()
    } catch (err) {
      console.error("Failed to crop and optimize image:", err)
      alert("Failed to process image. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  if (!isOpen || !imageSrc) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg border border-terminal-green/30 rounded-lg bg-terminal-black shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-terminal-green/10 border-b border-terminal-green/20 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-terminal-green animate-pulse" />
            <h3 className="font-mono text-sm font-semibold text-terminal-bright tracking-wide">
              {title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-terminal-green/60 hover:text-terminal-bright transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cropper Container */}
        <div className="relative w-full h-80 sm:h-96 bg-black/90 select-none">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspectRatio}
            cropShape={cropShape}
            showGrid={true}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropCompleteCallback}
            style={{
              containerStyle: { backgroundColor: "#050a05" },
              cropAreaStyle: {
                borderColor: "#00ff66",
                boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.75)",
              },
            }}
          />
        </div>

        {/* Controls */}
        <div className="p-4 bg-terminal-black/90 border-t border-terminal-green/20 space-y-4">
          <div className="flex items-center gap-3">
            <ZoomOut className="w-4 h-4 text-terminal-green/60" />
            <input
              type="range"
              min={1}
              max={3}
              step={0.05}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full h-1.5 bg-terminal-green/20 rounded-lg appearance-none cursor-pointer accent-terminal-bright"
            />
            <ZoomIn className="w-4 h-4 text-terminal-green/60" />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => {
                setZoom(1)
                setCrop({ x: 0, y: 0 })
              }}
              className="h-7 w-7 text-terminal-green/60 hover:text-terminal-bright hover:bg-terminal-green/10"
              title="Reset Zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </Button>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-terminal-green/60 pt-1">
            <span>Dimensions: Max {maxWidth}px</span>
            <span className="text-terminal-bright font-bold">Auto-converts to WebP</span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              disabled={isProcessing}
              className="border-terminal-green/30 text-terminal-green hover:bg-terminal-green/10"
            >
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleApply}
              disabled={isProcessing}
              className="bg-terminal-green text-terminal-black hover:bg-terminal-green/90 font-bold"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                  Optimizing...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-1.5" />
                  Apply & Upload
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
