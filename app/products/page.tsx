import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { NavBar } from "../components/nav-bar";
import { getProducts } from "./actions";
import { PRODUCT_CATEGORIES } from "./constants";
import { ProductsClient } from "./components/products-client";

// Get unique categories for filter
const categories = ["All", ...PRODUCT_CATEGORIES];

export default async function ProductsPage() {
  // Fetch products from the server
  const products = await getProducts();

  return (
    <>
      <NavBar />
      <div className="pt-16 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <main className="container mx-auto p-6">
          <div className="flex justify-between items-center mb-8 animate-fade-in">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Products</h1>
              <p className="text-gray-500 mt-1">Manage your product inventory</p>
            </div>
            <Link href="/products/add">
              <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </Link>
          </div>

          {/* Pass products to client component */}
          <ProductsClient 
            initialProducts={products} 
            categories={categories} 
          />
        </main>
      </div>
    </>
  );
}

