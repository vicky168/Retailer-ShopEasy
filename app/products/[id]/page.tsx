import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit } from "lucide-react"
import { getProduct } from "../actions"
import { DeleteProductButton } from "../components/delete-product-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Laptop, 
  Smartphone, 
  Headphones, 
  Watch, 
  Camera, 
  Tablet, 
  Tv, 
  Gamepad2, 
  Package
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
  "Other": Package
}

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.id)

  if (!product) {
    notFound()
  }

  const Icon = CATEGORY_ICONS[product.category] || Package

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <div className="flex flex-1 items-center gap-2">
          <h1 className="text-xl font-semibold">ShopEasy Dashboard</h1>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/" className="text-sm font-medium hover:underline">
            Dashboard
          </Link>
          <Link href="/products" className="text-sm font-medium hover:underline">
            Products
          </Link>
          <Link href="/analytics" className="text-sm font-medium hover:underline">
            Analytics
          </Link>
        </nav>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-4">
          <Link href="/products">
            <Button variant="outline" size="icon" className="h-7 w-7">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Product Details</h1>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Icon className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">{product.category}</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-2xl font-bold mt-2">${product.price.toFixed(2)}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Description</h4>
                <p className="mt-1">{product.description}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Added On</h4>
                <p className="mt-1">{product.createdAt.toLocaleDateString()}</p>
              </div>
              <div className="flex gap-2 pt-4">
                <Link href={`/products/${product.id}/edit`}>
                  <Button>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Product
                  </Button>
                </Link>
                <DeleteProductButton id={product.id} />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {product.images.map((image, index) => (
                  <div key={index} className="relative aspect-square overflow-hidden rounded-lg border">
                    <img 
                      src={image} 
                      alt={`${product.name} - Image ${index + 1}`} 
                      className="object-cover w-full h-full"
                    />
                    {index === product.images.indexOf(product.mainImage) && (
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                        Main
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
} 