import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ProductNotFound() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col items-center justify-center p-4 md:p-8">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-4xl font-bold">Product Not Found</h1>
          <p className="text-muted-foreground">The product you're looking for doesn't exist or has been removed.</p>
          <Link href="/products" className="mt-4">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

