"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { addProduct, updateProduct, type Product } from "../actions"
import { PRODUCT_CATEGORIES } from "./constants"
import { ImageCropper } from "./image-cropper"
import { 
  Upload, 
  Package, 
  Tag, 
  DollarSign, 
  FileText, 
  Save, 
  X, 
  ArrowLeft,
  Laptop, 
  Smartphone, 
  Headphones, 
  Watch, 
  Camera, 
  Tablet, 
  Tv, 
  Gamepad2,
  Shirt,
  Sparkles,
  Dumbbell,
  BookOpen
} from "lucide-react"

// Category icons mapping
const CATEGORY_ICONS: Record<string, React.ElementType> = {
  "Electronics": Laptop,
  "Phones": Smartphone,
  "Audio": Headphones,
  "Wearables": Watch,
  "Cameras": Camera,
  "Tablets": Tablet,
  "TV & Home": Tv,
  "Gaming": Gamepad2,
  "Fashion": Shirt,
  "Beauty & Personal Care": Sparkles,
  "Sports": Dumbbell,
  "Books": BookOpen,
  "Other": Package
}

// Category descriptions
const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  "Electronics": "Laptops, desktops, and accessories",
  "Phones": "Smartphones and mobile accessories",
  "Audio": "Headphones, speakers, and audio equipment",
  "Wearables": "Smartwatches and fitness trackers",
  "Cameras": "Digital cameras and photography equipment",
  "Tablets": "Tablets and e-readers",
  "TV & Home": "Televisions and home entertainment",
  "Gaming": "Gaming consoles and accessories",
  "Fashion": "Clothing, shoes, and accessories",
  "Beauty & Personal Care": "Cosmetics, skincare, and personal care products",
  "Sports": "Sports equipment and athletic gear",
  "Books": "Books, e-books, and educational materials",
  "Other": "Other products"
}

// Category gradients
const CATEGORY_GRADIENTS: Record<string, string> = {
  "Electronics": "gradient-primary",
  "Phones": "gradient-secondary",
  "Audio": "gradient-accent",
  "Wearables": "gradient-primary",
  "Cameras": "gradient-secondary",
  "Tablets": "gradient-accent",
  "TV & Home": "gradient-primary",
  "Gaming": "gradient-secondary",
  "Fashion": "gradient-accent",
  "Beauty & Personal Care": "gradient-primary",
  "Sports": "gradient-secondary",
  "Books": "gradient-accent",
  "Other": "gradient-accent"
}

interface ProductFormProps {
  product?: Product
}

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(product?.category || "Other")
  const [imagePreviews, setImagePreviews] = useState<string[]>(product?.images || [])
  const [mainImageIndex, setMainImageIndex] = useState(product?.mainImage ? product.images.indexOf(product.mainImage) : 0)
  const [isDragging, setIsDragging] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    formData.append("category", selectedCategory)
    formData.append("mainImageIndex", mainImageIndex.toString())

    // Get all image files from the input
    const imageInput = event.currentTarget.querySelector('input[type="file"]') as HTMLInputElement
    if (imageInput?.files) {
      // Clear any existing image files in the FormData
      formData.delete("images")
      
      // Add each image file to the FormData
      for (let i = 0; i < imageInput.files.length; i++) {
        const file = imageInput.files[i]
        if (file) {
          formData.append("images", file)
        }
      }
    }

    // Also add any existing image previews that are not from new file inputs
    const existingImages = imagePreviews.filter(preview => !preview.startsWith('blob:'))
    for (const imageUrl of existingImages) {
      formData.append("existingImages", imageUrl)
    }

    try {
      let result

      if (product) {
        result = await updateProduct(product.id, formData)
        if (result.success) {
          toast({
            title: "Product updated",
            description: "The product has been successfully updated.",
          })
          router.push("/products")
          router.refresh()
        } else {
          throw new Error("Failed to update product")
        }
      } else {
        result = await addProduct(formData)
        if (result.success) {
          toast({
            title: "Product added",
            description: "The new product has been successfully added.",
          })
          router.push("/products")
          router.refresh()
        } else {
          throw new Error("Failed to add product")
        }
      }
    } catch (error) {
      console.error("Error saving product:", error)
      toast({
        title: "Error",
        description: "Failed to save the product. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files
    if (files) {
      const newPreviews: string[] = []
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        if (file) {
          const previewUrl = URL.createObjectURL(file)
          newPreviews.push(previewUrl)
        }
      }
      setImagePreviews([...imagePreviews, ...newPreviews])
    }
  }

  function handleImageCrop(index: number, croppedImageUrl: string) {
    const newPreviews = [...imagePreviews]
    newPreviews[index] = croppedImageUrl
    setImagePreviews(newPreviews)
  }

  function removeImage(index: number) {
    setImagePreviews(imagePreviews.filter((_, i) => i !== index))
    if (mainImageIndex === index) {
      setMainImageIndex(0)
    } else if (mainImageIndex > index) {
      setMainImageIndex(mainImageIndex - 1)
    }
  }

  function setMainImage(index: number) {
    setMainImageIndex(index)
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setIsDragging(true)
  }

  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setIsDragging(false)
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setIsDragging(false)
    
    const files = e.dataTransfer.files
    if (files) {
      // Get the file input
      const fileInput = document.querySelector('input[type="file"][name="images"]') as HTMLInputElement
      
      // Create a new FileList-like object
      const dataTransfer = new DataTransfer()
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        if (file && file.type.startsWith('image/')) {
          dataTransfer.items.add(file)
        }
      }
      
      // Set the files to the input
      if (fileInput) {
        fileInput.files = dataTransfer.files
        
        // Trigger the change event manually
        const event = new Event('change', { bubbles: true })
        fileInput.dispatchEvent(event)
      }
    }
  }

  const Icon = CATEGORY_ICONS[selectedCategory] || Package
  const gradient = CATEGORY_GRADIENTS[selectedCategory] || "gradient-accent"

  return (
    <div className="animate-fade-in">
      <div className="mb-4 flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => router.push("/products")}
          className="hover:bg-primary/10"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Products
        </Button>
      </div>
      
      <Card className="overflow-hidden card-hover glass">
        <CardHeader className={`pb-2 ${gradient} text-white`}>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-white/20 animate-pulse-slow">
              <Icon className="h-4 w-4 animate-float" />
            </div>
            <CardTitle className="text-base text-shadow">
              {product ? "Edit Product" : "Add New Product"}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div className="grid gap-3">
                <div className="grid gap-1.5">
                  <Label htmlFor="images" className="text-sm font-medium">Product Images</Label>
                  <div className="flex flex-col gap-3">
                    <div 
                      className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center gap-2 transition-all duration-300 ${isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'}`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <div className="p-2 rounded-full bg-primary/10 animate-pulse-slow">
                        <Upload className="h-5 w-5 text-primary" />
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-medium">Drag and drop images here</p>
                        <p className="text-xs text-muted-foreground mt-0.5">or click to browse files</p>
                      </div>
                      <Button 
                        type="button"
                        variant="outline" 
                        size="sm"
                        className="relative overflow-hidden"
                        onClick={() => {
                          // Get the hidden file input
                          const fileInput = document.querySelector('input[type="file"][name="images"]') as HTMLInputElement
                          if (fileInput) {
                            // Trigger file selection
                            fileInput.click()
                          }
                        }}
                      >
                        Browse Files
                      </Button>
                      
                      {/* Hidden file input for form submission */}
                      <input 
                        type="file" 
                        name="images" 
                        accept="image/*" 
                        multiple 
                        className="hidden" 
                        onChange={handleImageChange}
                      />
                    </div>
                    
                    {imagePreviews.length > 0 && (
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 stagger-children">
                        {imagePreviews.map((preview, index) => (
                          <ImageCropper
                            key={index}
                            imageUrl={preview}
                            onCrop={(croppedImageUrl) => handleImageCrop(index, croppedImageUrl)}
                            onRemove={() => removeImage(index)}
                            isMainImage={mainImageIndex === index}
                            onSetMain={() => setMainImage(index)}
                          />
                        ))}
                      </div>
                    )}
                    
                    <p className="text-xs text-muted-foreground">
                      Upload product images. For best results, use square images (1:1 aspect ratio).
                      You can select multiple images at once.
                    </p>
                  </div>
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="name" className="text-sm font-medium">Product Name</Label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="name" 
                      name="name" 
                      defaultValue={product?.name} 
                      required 
                      className="pl-10 focus-ring"
                      placeholder="Enter product name"
                    />
                  </div>
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="category" className="text-sm font-medium">Category</Label>
                  <Select 
                    defaultValue={product?.category || "Other"} 
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger id="category" className="focus-ring">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {PRODUCT_CATEGORIES.map((category) => {
                        const CategoryIcon = CATEGORY_ICONS[category] || Package
                        return (
                          <SelectItem key={category} value={category} className="flex items-center gap-2">
                            <CategoryIcon className="h-4 w-4" />
                            {category}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                  {selectedCategory && (
                    <div className={`p-2 rounded-lg ${gradient} text-white text-xs animate-slide-up`}>
                      <div className="flex items-center gap-2">
                        <Icon className="h-3 w-3" />
                        <p>{CATEGORY_DESCRIPTIONS[selectedCategory]}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="description" className="text-sm font-medium">Description</Label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Textarea 
                      id="description" 
                      name="description" 
                      defaultValue={product?.description} 
                      rows={3} 
                      required 
                      placeholder="Enter a detailed description of your product..."
                      className="pl-10 focus-ring"
                    />
                  </div>
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="price" className="text-sm font-medium">Price ($)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="price" 
                      name="price" 
                      type="number" 
                      step="0.01" 
                      min="0" 
                      defaultValue={product?.price} 
                      required 
                      placeholder="0.00"
                      className="pl-10 focus-ring"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t">
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => router.push("/products")} 
                disabled={isSubmitting}
                className="button-hover"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button 
                type="submit" 
                size="sm"
                disabled={isSubmitting}
                className={`button-hover ${gradient} text-white`}
              >
                <Save className="h-4 w-4 mr-2" />
                {isSubmitting ? "Saving..." : product ? "Update Product" : "Add Product"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}


