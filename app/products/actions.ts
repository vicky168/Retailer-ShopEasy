"use server"

import { revalidatePath } from "next/cache"
import { PRODUCT_CATEGORIES } from "./constants"
import { writeFile, readFile, mkdir } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"

export type ProductCategory = typeof PRODUCT_CATEGORIES[number]

export type Product = {
  id: string
  name: string
  description: string
  price: number
  images: string[]  // Changed from single image to array of images
  mainImage: string // Added main image field
  category: ProductCategory
  createdAt: Date
}

// File path for storing products
const PRODUCTS_FILE_PATH = join(process.cwd(), "data", "products.json")

// Initialize products array
let products: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    description: "Premium noise-cancelling wireless headphones with 30-hour battery life.",
    price: 249.99,
    images: ["/products/headphones-1.jpg", "/products/headphones-2.jpg"],
    mainImage: "/products/headphones-1.jpg",
    category: "Audio",
    createdAt: new Date("2023-01-15"),
  },
  {
    id: "2",
    name: "Smart Watch",
    description: "Fitness tracker with heart rate monitor, GPS, and 7-day battery life.",
    price: 199.99,
    images: ["/products/smartwatch-1.jpg", "/products/smartwatch-2.jpg"],
    mainImage: "/products/smartwatch-1.jpg",
    category: "Wearables",
    createdAt: new Date("2023-02-10"),
  },
  {
    id: "3",
    name: "Bluetooth Speaker",
    description: "Waterproof portable speaker with 360° sound and 24-hour playtime.",
    price: 129.99,
    images: ["/products/speaker-1.jpg", "/products/speaker-2.jpg"],
    mainImage: "/products/speaker-1.jpg",
    category: "Audio",
    createdAt: new Date("2023-03-05"),
  },
  {
    id: "4",
    name: "Laptop Stand",
    description: "Adjustable aluminum laptop stand compatible with all laptops.",
    price: 49.99,
    images: ["/products/laptop-stand-1.jpg", "/products/laptop-stand-2.jpg"],
    mainImage: "/products/laptop-stand-1.jpg",
    category: "Electronics",
    createdAt: new Date("2023-04-20"),
  },
]

// Load products from file if it exists
async function loadProducts() {
  try {
    // Create data directory if it doesn't exist
    const dataDir = join(process.cwd(), "data")
    if (!existsSync(dataDir)) {
      await mkdir(dataDir, { recursive: true })
    }
    
    // Check if products file exists
    if (existsSync(PRODUCTS_FILE_PATH)) {
      const data = await readFile(PRODUCTS_FILE_PATH, 'utf-8')
      const loadedProducts = JSON.parse(data)
      
      // Convert date strings back to Date objects
      products = loadedProducts.map((p: any) => ({
        ...p,
        createdAt: new Date(p.createdAt)
      }))
      
      console.log(`Loaded ${products.length} products from file: ${PRODUCTS_FILE_PATH}`)
    } else {
      // Save initial products to file
      await saveProducts()
      console.log("Created initial products file")
    }
  } catch (error) {
    console.error("Error loading products:", error)
    // If there's an error loading products, use the default products
    console.log("Using default products")
  }
}

// Save products to file
async function saveProducts() {
  try {
    // Create data directory if it doesn't exist
    const dataDir = join(process.cwd(), "data")
    if (!existsSync(dataDir)) {
      await mkdir(dataDir, { recursive: true })
    }
    
    // Convert Date objects to ISO strings for JSON serialization
    const productsToSave = products.map(product => ({
      ...product,
      createdAt: product.createdAt.toISOString()
    }))
    
    await writeFile(PRODUCTS_FILE_PATH, JSON.stringify(productsToSave, null, 2))
    console.log(`Saved ${products.length} products to file: ${PRODUCTS_FILE_PATH}`)
  } catch (error) {
    console.error("Error saving products:", error)
    throw error // Re-throw to handle in the calling function
  }
}

// Load products on server start
loadProducts()

export async function getProducts() {
  // Try to load products from file if they haven't been loaded yet
  if (products.length === 0) {
    try {
      // Create data directory if it doesn't exist
      const dataDir = join(process.cwd(), "data")
      if (!existsSync(dataDir)) {
        await mkdir(dataDir, { recursive: true })
      }
      
      // Check if products file exists
      if (existsSync(PRODUCTS_FILE_PATH)) {
        const data = await readFile(PRODUCTS_FILE_PATH, 'utf-8')
        const loadedProducts = JSON.parse(data)
        
        // Convert date strings back to Date objects
        products = loadedProducts.map((p: any) => ({
          ...p,
          createdAt: new Date(p.createdAt)
        }))
        
        console.log(`Loaded ${products.length} products from file: ${PRODUCTS_FILE_PATH}`)
      } else {
        console.log("Products file not found, using default products")
      }
    } catch (error) {
      console.error("Error loading products:", error)
      console.log("Using default products")
    }
  }
  
  console.log("Getting products, count:", products.length)
  return [...products]
}

export async function getProduct(id: string) {
  return products.find((product) => product.id === id)
}

async function saveImage(file: File): Promise<string> {
  try {
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    // Create a unique filename
    const filename = `${Date.now()}-${file.name}`
    const productsDir = join(process.cwd(), "public", "products")
    
    // Ensure the products directory exists with proper permissions
    if (!existsSync(productsDir)) {
      await mkdir(productsDir, { recursive: true, mode: 0o755 })
      console.log("Created products directory:", productsDir)
    }
    
    const path = join(productsDir, filename)
    
    // Save the file with proper permissions
    await writeFile(path, buffer, { mode: 0o644 })
    console.log("Saved image to:", path)
    
    // Return the public URL
    return `/products/${filename}`
  } catch (error) {
    console.error("Error saving image:", error)
    throw new Error("Failed to save image file")
  }
}

export async function addProduct(formData: FormData) {
  console.log("Adding new product...")
  
  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const price = Number.parseFloat(formData.get("price") as string)
  const category = (formData.get("category") as string) || "Other"
  const imageFiles = formData.getAll("images") as File[]
  const existingImages = formData.getAll("existingImages") as string[]
  const mainImageIndex = Number(formData.get("mainImageIndex") || "0")

  console.log("Product details:", { 
    name, 
    description, 
    price, 
    category, 
    newImageCount: imageFiles.length,
    existingImageCount: existingImages.length,
    mainImageIndex
  })

  // Validate category
  const validCategory = PRODUCT_CATEGORIES.includes(category) ? category : "Other"

  // Ensure data directory exists
  const dataDir = join(process.cwd(), "data")
  if (!existsSync(dataDir)) {
    await mkdir(dataDir, { recursive: true })
    console.log("Created data directory:", dataDir)
  }

  // Handle image uploads
  const imageUrls: string[] = []
  
  // First add existing images
  for (const imageUrl of existingImages) {
    if (imageUrl && imageUrl !== "/placeholder.png") {
      imageUrls.push(imageUrl)
      console.log("Added existing image:", imageUrl)
    }
  }

  // Then handle new image uploads
  for (const file of imageFiles) {
    if (file instanceof File && file.size > 0) {
      try {
        const imageUrl = await saveImage(file)
        imageUrls.push(imageUrl)
        console.log("Saved new image:", imageUrl)
      } catch (error) {
        console.error("Failed to save image:", error)
      }
    }
  }

  // Use selected main image or first image as main image, or placeholder if no images
  const mainImage = imageUrls.length > 0 
    ? (mainImageIndex < imageUrls.length ? imageUrls[mainImageIndex] : imageUrls[0]) 
    : "/placeholder.png"

  const newProduct: Product = {
    id: Date.now().toString(),
    name,
    description,
    price,
    images: imageUrls.length > 0 ? imageUrls : ["/placeholder.png"],
    mainImage,
    category: validCategory,
    createdAt: new Date(),
  }

  console.log("New product created:", JSON.stringify(newProduct, null, 2))

  // Add the product to the beginning of the array
  products.unshift(newProduct)
  
  // Save products to file
  try {
    // Convert Date objects to ISO strings for JSON serialization
    const productsToSave = products.map(product => ({
      ...product,
      createdAt: product.createdAt.toISOString()
    }))
    
    await writeFile(PRODUCTS_FILE_PATH, JSON.stringify(productsToSave, null, 2))
    console.log(`Saved ${products.length} products to file: ${PRODUCTS_FILE_PATH}`)
  } catch (error) {
    console.error("Failed to save products to file:", error)
    return { success: false, error: "Failed to save product data" }
  }
  
  console.log("Products after adding:", products.length)
  
  // Revalidate paths to ensure the UI is updated
  revalidatePath("/products")
  revalidatePath("/categories")
  revalidatePath(`/categories/${validCategory.toLowerCase()}`)
  revalidatePath(`/categories/${validCategory}`)

  return { success: true, product: newProduct }
}

export async function updateProduct(id: string, formData: FormData) {
  const productIndex = products.findIndex((p) => p.id === id)

  if (productIndex === -1) {
    return { success: false, error: "Product not found" }
  }

  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const price = Number.parseFloat(formData.get("price") as string)
  const category = (formData.get("category") as string) || products[productIndex].category
  const imageFiles = formData.getAll("images") as File[]
  const existingImages = formData.getAll("existingImages") as string[]
  const mainImageIndex = Number(formData.get("mainImageIndex") || "0")

  console.log("Update product details:", { 
    name, 
    description, 
    price, 
    category, 
    newImageCount: imageFiles.length,
    existingImageCount: existingImages.length,
    mainImageIndex
  })

  // Validate category
  const validCategory = PRODUCT_CATEGORIES.includes(category) ? category : "Other"

  // Handle image uploads
  const imageUrls: string[] = []
  
  // First add existing images
  for (const imageUrl of existingImages) {
    if (imageUrl && imageUrl !== "/placeholder.png") {
      imageUrls.push(imageUrl)
      console.log("Added existing image:", imageUrl)
    }
  }

  // Then handle new image uploads
  for (const file of imageFiles) {
    if (file instanceof File && file.size > 0) {
      try {
        const imageUrl = await saveImage(file)
        imageUrls.push(imageUrl)
        console.log("Saved new image:", imageUrl)
      } catch (error) {
        console.error("Failed to save image:", error)
      }
    }
  }

  // Use selected main image or first image as main image, or placeholder if no images
  const mainImage = imageUrls.length > 0 
    ? (mainImageIndex < imageUrls.length ? imageUrls[mainImageIndex] : imageUrls[0]) 
    : "/placeholder.png"

  products[productIndex] = {
    ...products[productIndex],
    name,
    description,
    price,
    images: imageUrls.length > 0 ? imageUrls : ["/placeholder.png"],
    mainImage,
    category: validCategory,
  }

  // Save products to file
  try {
    // Create data directory if it doesn't exist
    const dataDir = join(process.cwd(), "data")
    if (!existsSync(dataDir)) {
      await mkdir(dataDir, { recursive: true })
    }
    
    // Convert Date objects to ISO strings for JSON serialization
    const productsToSave = products.map(product => ({
      ...product,
      createdAt: product.createdAt.toISOString()
    }))
    
    await writeFile(PRODUCTS_FILE_PATH, JSON.stringify(productsToSave, null, 2))
    console.log(`Saved ${products.length} products to file: ${PRODUCTS_FILE_PATH}`)
  } catch (error) {
    console.error("Failed to save products to file:", error)
  }

  revalidatePath("/products")
  revalidatePath(`/products/${id}`)
  
  // Revalidate the category paths
  revalidatePath(`/categories/${validCategory.toLowerCase()}`)
  
  // If the category has changed, also revalidate the old category path
  if (products[productIndex].category !== validCategory) {
    revalidatePath(`/categories/${products[productIndex].category.toLowerCase()}`)
  }

  return { success: true, product: products[productIndex] }
}

export async function deleteProduct(id: string) {
  const productIndex = products.findIndex((p) => p.id === id)

  if (productIndex === -1) {
    return { success: false, error: "Product not found" }
  }

  // Get the product category for revalidation
  const category = products[productIndex].category

  // Remove the product from the array
  products.splice(productIndex, 1)
  
  // Save products to file
  try {
    // Convert Date objects to ISO strings for JSON serialization
    const productsToSave = products.map(product => ({
      ...product,
      createdAt: product.createdAt.toISOString()
    }))
    
    await writeFile(PRODUCTS_FILE_PATH, JSON.stringify(productsToSave, null, 2))
    console.log(`Saved ${products.length} products to file: ${PRODUCTS_FILE_PATH}`)
  } catch (error) {
    console.error("Failed to save products to file:", error)
    return { success: false, error: "Failed to save product data" }
  }
  
  // Revalidate paths to ensure the UI is updated
  revalidatePath("/products")
  revalidatePath(`/categories/${category.toLowerCase()}`)

  return { success: true }
}

