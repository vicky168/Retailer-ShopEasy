"use server"

import { writeFile, readFile, mkdir } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"

// File path for storing test data
const TEST_FILE_PATH = join(process.cwd(), "data", "test.json")

export async function testStorage() {
  try {
    // Create data directory if it doesn't exist
    const dataDir = join(process.cwd(), "data")
    if (!existsSync(dataDir)) {
      await mkdir(dataDir, { recursive: true })
    }
    
    // Write test data to file
    const testData = {
      timestamp: new Date().toISOString(),
      message: "Test storage is working"
    }
    
    await writeFile(TEST_FILE_PATH, JSON.stringify(testData, null, 2))
    console.log("Test data written to file:", TEST_FILE_PATH)
    
    // Read test data from file
    const data = await readFile(TEST_FILE_PATH, 'utf-8')
    const loadedData = JSON.parse(data)
    console.log("Test data read from file:", loadedData)
    
    return { success: true, data: loadedData }
  } catch (error) {
    console.error("Error testing storage:", error)
    return { success: false, error: String(error) }
  }
} 