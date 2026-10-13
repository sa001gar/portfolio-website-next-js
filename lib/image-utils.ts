export interface CropArea {
  x: number
  y: number
  width: number
  height: number
}

export interface ImageProcessingOptions {
  maxWidth?: number
  maxHeight?: number
  quality?: number
  cropArea?: CropArea
}

/**
 * Resizes an image and converts it into an optimized WebP File without visual quality loss.
 */
export async function processImageToWebP(
  fileOrUrl: File | Blob | string,
  options: ImageProcessingOptions = {}
): Promise<File> {
  const {
    maxWidth = 1920,
    maxHeight = 1920,
    quality = 0.85,
    cropArea,
  } = options

  // 1. Load into Image object
  const image = await loadImage(fileOrUrl)

  // 2. Determine source dimensions
  const sourceX = cropArea ? cropArea.x : 0
  const sourceY = cropArea ? cropArea.y : 0
  const sourceWidth = cropArea ? cropArea.width : image.naturalWidth
  const sourceHeight = cropArea ? cropArea.height : image.naturalHeight

  // 3. Determine target dimensions within maxWidth / maxHeight
  let targetWidth = sourceWidth
  let targetHeight = sourceHeight

  if (targetWidth > maxWidth || targetHeight > maxHeight) {
    const scale = Math.min(maxWidth / targetWidth, maxHeight / targetHeight)
    targetWidth = Math.max(1, Math.round(targetWidth * scale))
    targetHeight = Math.max(1, Math.round(targetHeight * scale))
  }

  // 4. Render to canvas
  const canvas = document.createElement("canvas")
  canvas.width = targetWidth
  canvas.height = targetHeight
  const ctx = canvas.getContext("2d")
  if (!ctx) {
    throw new Error("Unable to create canvas rendering context")
  }

  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = "high"

  ctx.drawImage(
    image,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    0,
    0,
    targetWidth,
    targetHeight
  )

  // 5. Export as WebP blob
  const blob: Blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => {
        if (b) {
          resolve(b)
        } else {
          // Fallback to jpeg if WebP export fails
          canvas.toBlob(
            (fallbackBlob) => {
              if (fallbackBlob) resolve(fallbackBlob)
              else reject(new Error("Image encoding failed"))
            },
            "image/jpeg",
            quality
          )
        }
      },
      "image/webp",
      quality
    )
  })

  // 6. Revoke temporary object URL if created
  if (typeof fileOrUrl !== "string") {
    URL.revokeObjectURL(image.src)
  }

  // 7. Format clean filename with .webp extension
  const originalName =
    typeof fileOrUrl === "object" && "name" in fileOrUrl
      ? (fileOrUrl as File).name
      : "upload"
  const cleanBase = originalName.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "_")
  return new File([blob], `${cleanBase}.webp`, { type: "image/webp" })
}

function loadImage(src: File | Blob | string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => resolve(img)
    img.onerror = (err) => reject(new Error("Failed to load image for processing"))
    if (typeof src === "string") {
      img.src = src
    } else {
      img.src = URL.createObjectURL(src)
    }
  })
}
