import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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

// Category data
const categories = [
  {
    id: "electronics",
    name: "Electronics",
    icon: Laptop,
    description: "Laptops, desktops, and accessories",
    gradient: "gradient-primary"
  },
  {
    id: "phones",
    name: "Phones",
    icon: Smartphone,
    description: "Smartphones and mobile accessories",
    gradient: "gradient-secondary"
  },
  {
    id: "audio",
    name: "Audio",
    icon: Headphones,
    description: "Headphones, speakers, and audio equipment",
    gradient: "gradient-accent"
  },
  {
    id: "wearables",
    name: "Wearables",
    icon: Watch,
    description: "Smartwatches and fitness trackers",
    gradient: "gradient-primary"
  },
  {
    id: "cameras",
    name: "Cameras",
    icon: Camera,
    description: "Digital cameras and photography equipment",
    gradient: "gradient-secondary"
  },
  {
    id: "tablets",
    name: "Tablets",
    icon: Tablet,
    description: "Tablets and e-readers",
    gradient: "gradient-accent"
  },
  {
    id: "tv",
    name: "TV & Home",
    icon: Tv,
    description: "Televisions and home entertainment",
    gradient: "gradient-primary"
  },
  {
    id: "gaming",
    name: "Gaming",
    icon: Gamepad2,
    description: "Gaming consoles and accessories",
    gradient: "gradient-secondary"
  },
  {
    id: "other",
    name: "Other",
    icon: Package,
    description: "Other products",
    gradient: "gradient-accent"
  }
]

export function Categories() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 stagger-children">
      {categories.map((category) => {
        const Icon = category.icon
        
        return (
          <Link key={category.id} href={`/categories/${category.id}`} className="cursor-pointer">
            <Card className={`h-full transition-all duration-300 card-hover ${category.gradient} text-white highlight-border`}>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-white/20 animate-pulse-slow">
                    <Icon className="h-5 w-5 animate-float" />
                  </div>
                  <CardTitle className="text-lg text-shadow">{category.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white/80">{category.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
} 