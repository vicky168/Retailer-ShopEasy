"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Laptop, Smartphone, Headphones, Watch, Camera, Tablet, Tv, Gamepad2, Package, Grid, Shirt, Sparkles, Dumbbell, BookOpen } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Product, deleteProduct } from "../actions"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { ExternalLinks } from "./external-links"

// Category icons mapping
const CATEGORY_ICONS: Record<string, React.ElementType> = {
  "All": Grid,
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

interface ProductsClientProps {
  initialProducts: Product[]
  categories: string[]
}

export function ProductsClient({ 
  initialProducts, 
  categories
}: ProductsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const { toast } = useToast()
  const router = useRouter()

  // Filter products based on selected category
  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  const handleDelete = async (productId: string) => {
    try {
      const result = await deleteProduct(productId)
      if (result.success) {
        // Update local state
        setProducts(products.filter(p => p.id !== productId))
        toast({
          title: "Product deleted",
          description: "The product has been successfully deleted.",
        })
        router.refresh()
      } else {
        throw new Error("Failed to delete product")
      }
    } catch (error) {
      console.error("Error deleting product:", error)
      toast({
        title: "Error",
        description: "Failed to delete the product. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => {
          const Icon = CATEGORY_ICONS[category] || CATEGORY_ICONS["Other"]
          return (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={`flex items-center gap-2 ${
                selectedCategory === category 
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white" 
                  : "hover:bg-blue-50"
              }`}
            >
              <Icon className="h-4 w-4" />
              {category}
            </Button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Products Grid */}
        <div className="lg:col-span-3 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product, index) => (
            <Card 
              key={product.id}
              className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-48 w-full bg-gray-100">
                {product.mainImage ? (
                  <Image 
                    src={product.mainImage} 
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    priority={index < 4}
                  />
                ) : (
                  <Image 
                    src="/placeholder.png" 
                    alt="Placeholder"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    priority={index < 4}
                  />
                )}
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-2 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-blue-600">${product.price.toFixed(2)}</span>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Category: {product.category}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 pt-0">
                <Link href={`/products/${product.id}/edit`}>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-red-600 hover:text-red-700"
                  onClick={() => handleDelete(product.id)}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* External Links */}
        <div className="lg:col-span-1">
          <ExternalLinks category={selectedCategory} />
        </div>
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found in this category.</p>
        </div>
      )}
    </div>
  )
} 