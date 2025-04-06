"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, ShoppingBag, ShoppingCart, Store, Package, Globe } from "lucide-react"

// Define the structure for external links
interface ExternalLink {
  name: string
  url: string
  icon: React.ElementType
  description: string
}

// Sample external links for different product categories
const EXTERNAL_LINKS: Record<string, ExternalLink[]> = {
  "Electronics": [
    {
      name: "Amazon Electronics",
      url: "https://www.amazon.com/electronics",
      icon: ShoppingCart,
      description: "Browse electronics on Amazon"
    },
    {
      name: "Best Buy",
      url: "https://www.bestbuy.com/site/electronics",
      icon: Store,
      description: "Shop electronics at Best Buy"
    },
    {
      name: "Newegg",
      url: "https://www.newegg.com/electronics",
      icon: ShoppingBag,
      description: "Find electronics deals on Newegg"
    }
  ],
  "Fashion": [
    {
      name: "Amazon Fashion",
      url: "https://www.amazon.com/fashion",
      icon: ShoppingCart,
      description: "Browse fashion on Amazon"
    },
    {
      name: "ASOS",
      url: "https://www.asos.com",
      icon: Store,
      description: "Shop fashion at ASOS"
    },
    {
      name: "Zara",
      url: "https://www.zara.com",
      icon: ShoppingBag,
      description: "Find fashion at Zara"
    }
  ],
  "Beauty & Personal Care": [
    {
      name: "Sephora",
      url: "https://www.sephora.com",
      icon: ShoppingCart,
      description: "Browse beauty products at Sephora"
    },
    {
      name: "Ulta Beauty",
      url: "https://www.ulta.com",
      icon: Store,
      description: "Shop beauty at Ulta"
    },
    {
      name: "Amazon Beauty",
      url: "https://www.amazon.com/beauty",
      icon: ShoppingBag,
      description: "Find beauty products on Amazon"
    }
  ],
  "Sports": [
    {
      name: "Nike",
      url: "https://www.nike.com",
      icon: ShoppingCart,
      description: "Shop sports gear at Nike"
    },
    {
      name: "Adidas",
      url: "https://www.adidas.com",
      icon: Store,
      description: "Find sports equipment at Adidas"
    },
    {
      name: "Dick's Sporting Goods",
      url: "https://www.dickssportinggoods.com",
      icon: ShoppingBag,
      description: "Browse sports equipment at Dick's"
    }
  ],
  "Books": [
    {
      name: "Amazon Books",
      url: "https://www.amazon.com/books",
      icon: ShoppingCart,
      description: "Browse books on Amazon"
    },
    {
      name: "Barnes & Noble",
      url: "https://www.barnesandnoble.com",
      icon: Store,
      description: "Shop books at Barnes & Noble"
    },
    {
      name: "Book Depository",
      url: "https://www.bookdepository.com",
      icon: ShoppingBag,
      description: "Find books at Book Depository"
    }
  ],
  "Phones": [
    {
      name: "Amazon Phones",
      url: "https://www.amazon.com/phones",
      icon: ShoppingCart,
      description: "Browse phones on Amazon"
    },
    {
      name: "Best Buy Phones",
      url: "https://www.bestbuy.com/site/phones",
      icon: Store,
      description: "Shop phones at Best Buy"
    },
    {
      name: "Walmart Phones",
      url: "https://www.walmart.com/c/phones",
      icon: ShoppingBag,
      description: "Find phones at Walmart"
    }
  ],
  "Audio": [
    {
      name: "Amazon Audio",
      url: "https://www.amazon.com/audio",
      icon: ShoppingCart,
      description: "Browse audio equipment on Amazon"
    },
    {
      name: "Best Buy Audio",
      url: "https://www.bestbuy.com/site/audio",
      icon: Store,
      description: "Shop audio at Best Buy"
    },
    {
      name: "Target Audio",
      url: "https://www.target.com/c/audio",
      icon: ShoppingBag,
      description: "Find audio at Target"
    }
  ],
  "Wearables": [
    {
      name: "Amazon Wearables",
      url: "https://www.amazon.com/wearables",
      icon: ShoppingCart,
      description: "Browse wearables on Amazon"
    },
    {
      name: "Best Buy Wearables",
      url: "https://www.bestbuy.com/site/wearables",
      icon: Store,
      description: "Shop wearables at Best Buy"
    },
    {
      name: "Target Wearables",
      url: "https://www.target.com/c/wearables",
      icon: ShoppingBag,
      description: "Find wearables at Target"
    }
  ],
  "Cameras": [
    {
      name: "Amazon Cameras",
      url: "https://www.amazon.com/cameras",
      icon: ShoppingCart,
      description: "Browse cameras on Amazon"
    },
    {
      name: "Best Buy Cameras",
      url: "https://www.bestbuy.com/site/cameras",
      icon: Store,
      description: "Shop cameras at Best Buy"
    },
    {
      name: "B&H Photo",
      url: "https://www.bhphotovideo.com/c/cameras",
      icon: ShoppingBag,
      description: "Find cameras at B&H Photo"
    }
  ],
  "Tablets": [
    {
      name: "Amazon Tablets",
      url: "https://www.amazon.com/tablets",
      icon: ShoppingCart,
      description: "Browse tablets on Amazon"
    },
    {
      name: "Best Buy Tablets",
      url: "https://www.bestbuy.com/site/tablets",
      icon: Store,
      description: "Shop tablets at Best Buy"
    },
    {
      name: "Walmart Tablets",
      url: "https://www.walmart.com/c/tablets",
      icon: ShoppingBag,
      description: "Find tablets at Walmart"
    }
  ],
  "TV & Home": [
    {
      name: "Amazon TV & Home",
      url: "https://www.amazon.com/tv-home",
      icon: ShoppingCart,
      description: "Browse TV & home on Amazon"
    },
    {
      name: "Best Buy TV & Home",
      url: "https://www.bestbuy.com/site/tv-home",
      icon: Store,
      description: "Shop TV & home at Best Buy"
    },
    {
      name: "Target TV & Home",
      url: "https://www.target.com/c/tv-home",
      icon: ShoppingBag,
      description: "Find TV & home at Target"
    }
  ],
  "Gaming": [
    {
      name: "Amazon Gaming",
      url: "https://www.amazon.com/gaming",
      icon: ShoppingCart,
      description: "Browse gaming on Amazon"
    },
    {
      name: "Best Buy Gaming",
      url: "https://www.bestbuy.com/site/gaming",
      icon: Store,
      description: "Shop gaming at Best Buy"
    },
    {
      name: "GameStop",
      url: "https://www.gamestop.com",
      icon: ShoppingBag,
      description: "Find gaming at GameStop"
    }
  ],
  "Other": [
    {
      name: "Amazon",
      url: "https://www.amazon.com",
      icon: ShoppingCart,
      description: "Browse products on Amazon"
    },
    {
      name: "eBay",
      url: "https://www.ebay.com",
      icon: Globe,
      description: "Find deals on eBay"
    },
    {
      name: "Walmart",
      url: "https://www.walmart.com",
      icon: ShoppingBag,
      description: "Shop at Walmart"
    }
  ]
}

interface ExternalLinksProps {
  category: string
}

export function ExternalLinks({ category }: ExternalLinksProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(category || "Other")
  
  // Get links for the selected category, or fall back to "Other"
  const links = EXTERNAL_LINKS[selectedCategory] || EXTERNAL_LINKS["Other"]
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <ExternalLink className="h-5 w-5" />
          Related External Links
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {links.map((link, index) => {
            const Icon = link.icon
            return (
              <a 
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start p-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors"
              >
                <div className="mr-4 mt-1">
                  <Icon className="h-5 w-5 text-gray-700" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{link.name}</h3>
                  <p className="text-sm text-gray-500">{link.description}</p>
                </div>
              </a>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
} 