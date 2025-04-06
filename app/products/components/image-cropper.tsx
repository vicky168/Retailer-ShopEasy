"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { X, ZoomIn, ZoomOut, RotateCcw, Star, StarOff, Edit2, Trash2 } from "lucide-react"

interface ImageCropperProps {
  imageUrl: string
  onCrop: (croppedImageUrl: string) => void
  onRemove: () => void
  isMainImage: boolean
  onSetMain: () => void
}

export function ImageCropper({ 
  imageUrl, 
  onCrop, 
  onRemove, 
  isMainImage, 
  onSetMain 
}: ImageCropperProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scale, setScale] = useState(1)
  const [rotation, setRotation] = useState(0)
  const imageRef = useRef<HTMLImageElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleCrop = () => {
    if (!imageRef.current || !canvasRef.current) return

    const image = imageRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size to match image
    canvas.width = image.naturalWidth
    canvas.height = image.naturalHeight

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Save context state
    ctx.save()

    // Translate to center of canvas
    ctx.translate(canvas.width / 2, canvas.height / 2)

    // Rotate
    ctx.rotate((rotation * Math.PI) / 180)

    // Scale
    ctx.scale(scale, scale)

    // Draw image centered
    ctx.drawImage(
      image,
      -image.naturalWidth / 2,
      -image.naturalHeight / 2,
      image.naturalWidth,
      image.naturalHeight
    )

    // Restore context state
    ctx.restore()

    // Convert to data URL
    const croppedImageUrl = canvas.toDataURL("image/jpeg", 0.8)
    onCrop(croppedImageUrl)
    setIsOpen(false)
  }

  const resetTransform = () => {
    setScale(1)
    setRotation(0)
  }

  return (
    <div className="relative group animate-fade-in">
      <div className="relative aspect-square overflow-hidden rounded-lg border shadow-sm hover:shadow-md transition-all duration-300 card-hover">
        <Image 
          src={imageUrl} 
          alt="Product image" 
          fill 
          className="object-cover hover-brightness"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
        
        {isMainImage && (
          <div className="absolute top-2 left-2 bg-primary/80 text-white p-1 rounded-full animate-pulse-slow">
            <Star className="h-3 w-3" />
          </div>
        )}
        
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="secondary" className="button-hover">
                <Edit2 className="h-3 w-3 mr-1" />
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl animate-scale-in">
              <DialogHeader>
                <DialogTitle className="text-gradient">Edit Image</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="relative aspect-square overflow-hidden rounded-lg border shadow-md">
                  <img
                    ref={imageRef}
                    src={imageUrl}
                    alt="Edit preview"
                    className="w-full h-full object-contain"
                    style={{
                      transform: `scale(${scale}) rotate(${rotation}deg)`,
                      transition: "transform 0.2s"
                    }}
                  />
                  <canvas ref={canvasRef} className="hidden" />
                </div>
                <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ZoomOut className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Zoom</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{Math.round(scale * 100)}%</span>
                    </div>
                    <Slider
                      value={[scale * 100]}
                      onValueChange={([value]) => setScale(value / 100)}
                      min={50}
                      max={200}
                      step={1}
                      className="flex-1"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <RotateCcw className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Rotate</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{rotation}°</span>
                    </div>
                    <Slider
                      value={[rotation]}
                      onValueChange={([value]) => setRotation(value)}
                      min={0}
                      max={360}
                      step={90}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={resetTransform} className="button-hover">
                    Reset
                  </Button>
                  <Button onClick={handleCrop} className="gradient-primary text-white button-hover">
                    Apply
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button 
            size="sm" 
            variant="destructive"
            onClick={onRemove}
            className="button-hover"
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Remove
          </Button>
          <Button
            size="sm"
            variant={isMainImage ? "default" : "secondary"}
            onClick={onSetMain}
            className={`button-hover ${isMainImage ? 'gradient-primary text-white' : ''}`}
          >
            {isMainImage ? (
              <>
                <Star className="h-3 w-3 mr-1" />
                Main Image
              </>
            ) : (
              <>
                <StarOff className="h-3 w-3 mr-1" />
                Set as Main
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
} 