import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { ProductForm } from "../../components/product-form"
import { getProduct } from "../../actions"

interface EditProductPageProps {
  params: {
    id: string
  }
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const product = await getProduct(params.id)

  if (!product) {
    notFound()
  }

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
          <h1 className="text-2xl font-bold">Edit Product</h1>
        </div>
        <div className="grid gap-6">
          <ProductForm product={product} />
        </div>
      </main>
    </div>
  )
}

