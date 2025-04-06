import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col items-center justify-center p-4 md:p-8">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
          <p className="text-muted-foreground">The page you're looking for doesn't exist or has been moved.</p>
          <Link href="/" className="mt-4">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

