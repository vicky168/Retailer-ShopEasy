"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { deleteProduct } from "../actions"
import { useToast } from "@/hooks/use-toast"

export function DeleteProductButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const { toast } = useToast()

  async function handleDelete() {
    if (confirm("Are you sure you want to delete this product?")) {
      setIsDeleting(true)

      try {
        const result = await deleteProduct(id)

        if (result.success) {
          toast({
            title: "Product deleted",
            description: "The product has been successfully deleted.",
          })
        } else {
          throw new Error("Failed to delete product")
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete the product. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsDeleting(false)
      }
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={handleDelete} disabled={isDeleting}>
      <Trash2 className="h-4 w-4 mr-2" />
      {isDeleting ? "Deleting..." : "Delete"}
    </Button>
  )
}

