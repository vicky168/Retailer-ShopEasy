"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Package, LogOut } from "lucide-react";

export function NavBar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // Redirect to login page
    router.push("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b shadow-sm">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <Package className="h-6 w-6 text-blue-600" />
              <span className="font-bold text-blue-700">Retailer Dashboard</span>
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link
              href="/dashboard"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/dashboard" ? "text-blue-700" : "text-gray-600"
              )}
            >
              Dashboard
            </Link>
            <Link
              href="/products"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/products" ? "text-blue-700" : "text-gray-600"
              )}
            >
              Products
            </Link>
            <Link
              href="/categories"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/categories" ? "text-blue-700" : "text-gray-600"
              )}
            >
              Categories
            </Link>
            <Link
              href="/analytics"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/analytics" ? "text-blue-700" : "text-gray-600"
              )}
            >
              Analytics
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 