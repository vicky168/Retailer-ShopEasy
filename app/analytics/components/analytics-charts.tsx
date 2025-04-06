"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Cell,
  Tooltip,
} from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// Mock data for recently viewed products
const productViewsData = [
  { name: "Wireless Headphones", views: 245 },
  { name: "Smart Watch", views: 187 },
  { name: "Bluetooth Speaker", views: 156 },
  { name: "Laptop Stand", views: 132 },
  { name: "Wireless Charger", views: 98 },
  { name: "USB-C Hub", views: 76 },
  { name: "Mechanical Keyboard", views: 65 },
]

// Mock data for customer budgets by product
const customerBudgetsByProduct = {
  "Wireless Headphones": [
    { budget: "$0-$100", count: 42 },
    { budget: "$101-$200", count: 78 },
    { budget: "$201-$300", count: 95 },
    { budget: "$301-$500", count: 25 },
    { budget: "$501+", count: 5 },
  ],
  "Smart Watch": [
    { budget: "$0-$100", count: 35 },
    { budget: "$101-$200", count: 92 },
    { budget: "$201-$300", count: 45 },
    { budget: "$301-$500", count: 12 },
    { budget: "$501+", count: 3 },
  ],
  "Bluetooth Speaker": [
    { budget: "$0-$100", count: 68 },
    { budget: "$101-$200", count: 65 },
    { budget: "$201-$300", count: 18 },
    { budget: "$301-$500", count: 5 },
    { budget: "$501+", count: 0 },
  ],
  "Laptop Stand": [
    { budget: "$0-$100", count: 98 },
    { budget: "$101-$200", count: 28 },
    { budget: "$201-$300", count: 6 },
    { budget: "$301-$500", count: 0 },
    { budget: "$501+", count: 0 },
  ],
  "Wireless Charger": [
    { budget: "$0-$100", count: 82 },
    { budget: "$101-$200", count: 15 },
    { budget: "$201-$300", count: 1 },
    { budget: "$301-$500", count: 0 },
    { budget: "$501+", count: 0 },
  ],
  "USB-C Hub": [
    { budget: "$0-$100", count: 65 },
    { budget: "$101-$200", count: 11 },
    { budget: "$201-$300", count: 0 },
    { budget: "$301-$500", count: 0 },
    { budget: "$501+", count: 0 },
  ],
  "Mechanical Keyboard": [
    { budget: "$0-$100", count: 12 },
    { budget: "$101-$200", count: 38 },
    { budget: "$201-$300", count: 15 },
    { budget: "$301-$500", count: 0 },
    { budget: "$501+", count: 0 },
  ],
}

// Bar colors for different budget ranges
const budgetColors = [
  "#3b82f6", // blue-500
  "#6366f1", // indigo-500
  "#8b5cf6", // violet-500
  "#ec4899", // pink-500
  "#f43f5e", // rose-500
]

// Custom tooltip with black text
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-md shadow-md">
        <p className="font-medium text-black">{label}</p>
        <p className="text-black">
          {payload[0].name}: <span className="font-bold">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

export function AnalyticsCharts() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)

  const handleProductClick = (data: any) => {
    setSelectedProduct(data?.name || null)
  }

  // Custom bar renderer for the first chart
  const CustomBar = (props: any) => {
    const { x, y, width, height, index } = props;
    return (
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={index % 2 === 0 ? "#3b82f6" : "#6366f1"} // Alternating blue and indigo
        rx={4}
        ry={4}
      />
    );
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="bg-gradient-to-br from-blue-400/90 to-indigo-500/90 shadow-blue-200/50 border border-blue-200/30 hover-lift">
        <CardHeader>
          <CardTitle className="text-black font-bold">Recently Viewed Products</CardTitle>
          <CardDescription className="text-black/80">
            Click on a bar to see customer budget distribution
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              views: {
                label: "Views",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={productViewsData}
                margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
              >
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={70}
                  tick={{ fontSize: 12, fill: "#000000" }}
                />
                <YAxis tick={{ fill: "#000000" }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="views"
                  name="Views"
                  cursor="pointer"
                  onClick={(data: any) => handleProductClick(data)}
                  shape={<CustomBar />}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {selectedProduct ? (
        <Card className="bg-gradient-to-br from-blue-400/90 to-indigo-500/90 shadow-blue-200/50 border border-blue-200/30 hover-lift">
          <CardHeader>
            <CardTitle className="text-black font-bold">
              Customer Budget Distribution for {selectedProduct}
            </CardTitle>
            <CardDescription className="text-black/80">
              Budget ranges of customers who viewed this product
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: {
                  label: "Customers",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={
                    customerBudgetsByProduct[
                      selectedProduct as keyof typeof customerBudgetsByProduct
                    ]
                  }
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <XAxis dataKey="budget" tick={{ fill: "#000000" }} />
                  <YAxis tick={{ fill: "#000000" }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="count"
                    name="Customers"
                    radius={[4, 4, 0, 0]}
                  >
                    {customerBudgetsByProduct[selectedProduct as keyof typeof customerBudgetsByProduct].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={budgetColors[index % budgetColors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-gradient-to-br from-blue-400/90 to-indigo-500/90 shadow-blue-200/50 border border-blue-200/30 hover-lift">
          <CardHeader>
            <CardTitle className="text-black font-bold">Product Performance</CardTitle>
            <CardDescription className="text-black/80">
              Select a product from the chart to see detailed budget analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-[300px]">
            <div className="text-center text-black/70">
              <p>Click on a product in the chart to the left</p>
              <p className="text-sm mt-2">to view customer budget distribution</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

