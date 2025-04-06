"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { PRODUCT_CATEGORIES } from "../constants"
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

// Category descriptions
const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  "All": "View all products",
  "Electronics": "Laptops, desktops, and accessories",
  "Phones": "Smartphones and mobile accessories",
  "Audio": "Headphones, speakers, and audio equipment",
  "Wearables": "Smartwatches and fitness trackers",
  "Cameras": "Digital cameras and photography equipment",
  "Tablets": "Tablets and e-readers",
  "TV & Home": "Televisions and home entertainment",
  "Gaming": "Gaming consoles and accessories",
  "Other": "Other products"
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

export function CategoryFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get("category")

  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams(searchParams)
    if (category === currentCategory || (category === "All" && !currentCategory)) {
      params.delete("category")
    } else {
      params.set("category", category)
    }
    router.push(`/products?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-2 animate-slide-up">
      <Button
        variant={!currentCategory ? "default" : "outline"}
        size="sm"
        onClick={() => handleCategoryClick("All")}
        className={`flex items-center gap-2 button-hover ${!currentCategory ? "gradient-primary text-white" : ""}`}
      >
        <Grid className="h-4 w-4 animate-float" />
        <span>All</span>
      </Button>
      {PRODUCT_CATEGORIES.map((category) => {
        const Icon = CATEGORY_ICONS[category] || Package
        const isSelected = category === currentCategory
        const gradient = CATEGORY_GRADIENTS[category] || "gradient-primary"
        
        return (
          <Button
            key={category}
            variant={isSelected ? "default" : "outline"}
            size="sm"
            onClick={() => handleCategoryClick(category)}
            className={`flex items-center gap-2 button-hover ${isSelected ? `${gradient} text-white` : ""}`}
          >
            <Icon className={`h-4 w-4 ${isSelected ? "animate-pulse-slow" : ""}`} />
            <span>{category}</span>
          </Button>
        )
      })}
    </div>
  )
} 