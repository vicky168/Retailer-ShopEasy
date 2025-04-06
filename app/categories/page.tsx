"use client";

import { NavBar } from "../components/nav-bar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
} from "lucide-react";
import Link from "next/link";

const categories = [
  {
    id: "Electronics",
    name: "Electronics",
    icon: Laptop,
    description: "Laptops, desktops, and accessories",
  },
  {
    id: "Phones",
    name: "Phones",
    icon: Smartphone,
    description: "Smartphones and mobile accessories",
  },
  {
    id: "Audio",
    name: "Audio",
    icon: Headphones,
    description: "Headphones, speakers, and audio equipment",
  },
  {
    id: "Wearables",
    name: "Wearables",
    icon: Watch,
    description: "Smartwatches and fitness trackers",
  },
  {
    id: "Cameras",
    name: "Cameras",
    icon: Camera,
    description: "Digital cameras and photography equipment",
  },
  {
    id: "Tablets",
    name: "Tablets",
    icon: Tablet,
    description: "Tablets and e-readers",
  },
  {
    id: "TV & Home",
    name: "TV & Home",
    icon: Tv,
    description: "Televisions and home entertainment",
  },
  {
    id: "Gaming",
    name: "Gaming",
    icon: Gamepad2,
    description: "Gaming consoles and accessories",
  },
  {
    id: "Other",
    name: "Other",
    icon: Package,
    description: "Other products",
  },
];

export default function CategoriesPage() {
  return (
    <>
      <NavBar />
      <div className="pt-16 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <main className="container mx-auto p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.id}
                  href={`/categories/${category.id}`}
                  className="transform transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-full bg-blue-100">
                          <Icon className="h-5 w-5 text-blue-600" />
                        </div>
                        <CardTitle className="text-lg">{category.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500">{category.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </main>
      </div>
    </>
  );
} 