import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export function ProductsListSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <CardHeader className="p-0">
            <Skeleton className="aspect-[4/3] w-full rounded-none" />
          </CardHeader>
          <CardContent className="p-4">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-4" />
            <Skeleton className="h-5 w-1/3" />
          </CardContent>
          <CardFooter className="flex justify-between p-4 pt-0">
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-20" />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

