import { testStorage } from "../test-storage"

export default async function TestPage() {
  const result = await testStorage()
  
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <div className="flex flex-1 items-center gap-2">
          <h1 className="text-xl font-semibold">ShopEasy Dashboard</h1>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <h1 className="text-2xl font-bold">Storage Test</h1>
        
        <div className="rounded-lg border p-4">
          <h2 className="text-lg font-semibold mb-2">Test Results</h2>
          {result.success ? (
            <div>
              <p className="text-green-600">Storage test successful!</p>
              <pre className="mt-2 p-2 bg-muted rounded-md overflow-auto">
                {JSON.stringify(result.data, null, 2)}
              </pre>
            </div>
          ) : (
            <div>
              <p className="text-red-600">Storage test failed!</p>
              <p className="mt-2 text-muted-foreground">{result.error}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
} 