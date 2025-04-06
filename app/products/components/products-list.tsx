import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"
import { getProducts } from "../actions"
import { DeleteProductButton } from "./delete-product-button"
import { 
  Laptop, 
  Smartphone, 
  Headphones, 
  Watch, 
  Camera, 
  Tablet, 
  Tv, 
  Gamepad2, 
  Package,
  Grid
} from "lucide-react"

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
  "Other": Package
}

// Category gradients
const CATEGORY_GRADIENTS: Record<string, string> = {
  "All": "gradient-primary",
  "Electronics": "gradient-primary",
  "Phones": "gradient-secondary",
  "Audio": "gradient-accent",
  "Wearables": "gradient-primary",
  "Cameras": "gradient-secondary",
  "Tablets": "gradient-accent",
  "TV & Home": "gradient-primary",
  "Gaming": "gradient-secondary",
  "Other": "gradient-accent"
}

interface ProductsListProps {
  category?: string | null
}

export async function ProductsList({ category }: ProductsListProps) {
  // Get products from server
  const products = await getProducts()
  
  // Filter products by category if specified
  const filteredProducts = category && category !== "All" 
    ? products.filter(product => product.category === category)
    : products

  // Log products for debugging
  console.log("Products in list:", products.length)
  console.log("Filtered products:", filteredProducts.length)

  if (filteredProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
        <h2 className="text-xl font-semibold mb-4 text-gradient">No products found</h2>
        <p className="text-muted-foreground mb-6">
          {category && category !== "All" 
            ? `No products found in the ${category} category.` 
            : "Get started by adding your first product."}
        </p>
        <Link href="/products/add">
          <Button className="button-hover gradient-primary text-white">Add Product</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 stagger-children">
      {filteredProducts.map((product) => {
        const Icon = CATEGORY_ICONS[product.category] || Package
        const gradient = CATEGORY_GRADIENTS[product.category] || "gradient-primary"
        
        return (
          <Card key={product.id} className={`overflow-hidden card-hover ${gradient} text-white highlight-border`}>
            <Link href={`/products/${product.id}`} className="cursor-zoom-in">
              <CardHeader className="p-0">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image 
                    src={product.mainImage || "/placeholder.png"} 
                    alt={product.name} 
                    fill 
                    className="object-cover image-hover hover-brightness" 
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-full bg-white/20 animate-pulse-slow">
                    <Icon className="h-4 w-4 animate-float" />
                  </div>
                  <span className="text-sm text-white/80">{product.category}</span>
                </div>
                <h3 className="font-semibold text-lg mb-1 text-shadow">{product.name}</h3>
                <p className="text-sm text-white/80 line-clamp-2 mb-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <p className="font-bold text-lg text-shadow">${product.price.toFixed(2)}</p>
                </div>
              </CardContent>
            </Link>
            <CardFooter className="flex justify-between p-4 pt-0">
              <Link href={`/products/${product.id}/edit`} className="cursor-pointer">
                <Button variant="outline" size="sm" className="button-hover bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </Link>
              <DeleteProductButton id={product.id} />
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}

