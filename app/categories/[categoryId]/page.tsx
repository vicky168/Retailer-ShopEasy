import Link from "next/link"
import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Laptop, 
  Smartphone, 
  Headphones, 
  Watch, 
  Camera, 
  Tablet, 
  Tv, 
  Gamepad,
  ArrowLeft
} from "lucide-react"
import { getProducts } from "@/app/products/actions"

// This would typically come from a database
const categories = [
  {
    id: "Electronics",
    name: "Electronics",
    icon: Laptop,
    description: "Laptops, desktops, and accessories",
  },
  {
    id: "Phones",
    name: "Phones",
    icon: Smartphone,
    description: "Smartphones and mobile accessories",
  },
  {
    id: "Audio",
    name: "Audio",
    icon: Headphones,
    description: "Headphones, speakers, and audio equipment",
  },
  {
    id: "Wearables",
    name: "Wearables",
    icon: Watch,
    description: "Smartwatches and fitness trackers",
  },
  {
    id: "Cameras",
    name: "Cameras",
    icon: Camera,
    description: "Digital cameras and photography equipment",
  },
  {
    id: "Tablets",
    name: "Tablets",
    icon: Tablet,
    description: "Tablets and e-readers",
  },
  {
    id: "TV & Home",
    name: "TV & Home",
    icon: Tv,
    description: "Televisions and home entertainment",
  },
  {
    id: "Gaming",
    name: "Gaming",
    icon: Gamepad,
    description: "Gaming consoles and accessories",
  },
  {
    id: "Other",
    name: "Other",
    icon: Gamepad,
    description: "Other products",
  }
]

export default async function CategoryPage({ params }: { params: { categoryId: string } }) {
  const category = categories.find(c => c.id === params.categoryId)
  
  if (!category) {
    notFound()
  }
  
  // Get all products and filter by category
  const allProducts = await getProducts()
  const categoryProducts = allProducts.filter(p => 
    p.category.toLowerCase() === params.categoryId.toLowerCase()
  )
  
  const Icon = category.icon

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <div className="flex flex-1 items-center gap-2">
          <Link href="/categories" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            Back to Categories
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5" />
          <h1 className="text-xl font-semibold">{category.name}</h1>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold tracking-tight">{category.name}</h2>
          <p className="text-muted-foreground">
            {category.description}
          </p>
        </div>
        
        {categoryProducts.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categoryProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <Card className="h-full transition-colors hover:bg-muted/50">
                  <CardHeader className="pb-2">
                    <div className="relative aspect-square overflow-hidden rounded-lg">
                      <img 
                        src={product.mainImage} 
                        alt={product.name} 
                        className="object-cover"
                      />
                    </div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6">
              <p className="text-center text-muted-foreground">
                No products found in this category.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
} 