"use client"

import Link from "next/link"
import { AnalyticsCharts } from "./components/analytics-charts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, TrendingUp, TrendingDown, DollarSign, AlertTriangle, Search, Loader2, ArrowUp, ArrowDown, Percent } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useRef } from "react"
import { NavBar } from "../components/nav-bar"

// Mock data for product pricing recommendations
const productPricingData = [
  {
    name: "Wireless Headphones",
    currentPrice: 129.99,
    recommendedAction: "increase",
    recommendedChange: 15,
    reason: "High demand elasticity and premium positioning in market",
    potentialProfitIncrease: 12.5
  },
  {
    name: "Smart Watch",
    currentPrice: 249.99,
    recommendedAction: "decrease",
    recommendedChange: 10,
    reason: "Competitive pressure and price sensitivity in segment",
    potentialProfitIncrease: 8.3
  },
  {
    name: "Bluetooth Speaker",
    currentPrice: 79.99,
    recommendedAction: "increase",
    recommendedChange: 5,
    reason: "Strong brand loyalty and low price sensitivity",
    potentialProfitIncrease: 4.2
  },
  {
    name: "Laptop Stand",
    currentPrice: 29.99,
    recommendedAction: "decrease",
    recommendedChange: 15,
    reason: "High competition and price elasticity",
    potentialProfitIncrease: 18.7
  },
  {
    name: "Wireless Charger",
    currentPrice: 49.99,
    recommendedAction: "increase",
    recommendedChange: 8,
    reason: "Growing demand and premium features",
    potentialProfitIncrease: 6.9
  }
];

export default function AnalyticsPage() {
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const recommendationsRef = useRef<HTMLDivElement>(null);

  const handleAnalyze = () => {
    setIsLoading(true);
    
    // Simulate loading for 2 seconds
    setTimeout(() => {
      setIsLoading(false);
      setShowRecommendations(true);
      
      // Scroll to recommendations after they appear
      setTimeout(() => {
        if (recommendationsRef.current) {
          recommendationsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }, 2000);
  };

  return (
    <>
      <NavBar />
      <div className="pt-16 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <main className="container mx-auto p-6">
          <div className="flex items-center justify-between animate-fade-up">
            <h1 className="text-2xl font-bold text-black">Product Analytics</h1>
            <Button 
              onClick={handleAnalyze}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Analyze Data
                </>
              )}
            </Button>
          </div>
          
          <div className="mt-6 animate-scale-in">
            <AnalyticsCharts />
          </div>
          
          {showRecommendations && (
            <div ref={recommendationsRef} className="mt-8 animate-fade-up">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-black">
                <Lightbulb className="h-5 w-5 text-amber-500 animate-pulse-slow" />
                AI Insights & Recommendations
              </h2>
              
              <div className="grid gap-4 md:grid-cols-2 stagger-children">
                <Card className="bg-gradient-to-br from-blue-400/90 to-indigo-500/90 shadow-blue-200/50 border border-blue-200/30 hover-lift">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2 text-white">
                      <TrendingUp className="h-4 w-4 text-green-300 animate-float" />
                      Price Increase Opportunities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-white/90">
                      <li className="flex items-start gap-2 animate-fade-up" style={{ animationDelay: "0.1s" }}>
                        <DollarSign className="h-4 w-4 text-green-300 mt-0.5" />
                        <span>Electronics category shows high demand elasticity. Consider a 5-10% price increase for premium models.</span>
                      </li>
                      <li className="flex items-start gap-2 animate-fade-up" style={{ animationDelay: "0.2s" }}>
                        <DollarSign className="h-4 w-4 text-green-300 mt-0.5" />
                        <span>Gaming products have low price sensitivity. A 15% price increase could boost revenue without significant sales impact.</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-blue-400/90 to-indigo-500/90 shadow-blue-200/50 border border-blue-200/30 hover-lift">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2 text-white">
                      <TrendingDown className="h-4 w-4 text-red-300 animate-float" />
                      Inventory Optimization
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-white/90">
                      <li className="flex items-start gap-2 animate-fade-up" style={{ animationDelay: "0.3s" }}>
                        <AlertTriangle className="h-4 w-4 text-yellow-300 mt-0.5" />
                        <span>Cameras category has 30% excess inventory. Consider promotional pricing to reduce stock levels.</span>
                      </li>
                      <li className="flex items-start gap-2 animate-fade-up" style={{ animationDelay: "0.4s" }}>
                        <AlertTriangle className="h-4 w-4 text-yellow-300 mt-0.5" />
                        <span>Audio products show stockout risk. Increase reorder points by 25% to prevent lost sales.</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              {/* Product Pricing Recommendations */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-black">
                  <Percent className="h-5 w-5 text-blue-500" />
                  Product Pricing Recommendations
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Based on market analysis, customer behavior, and competitive positioning, here are specific product pricing recommendations to improve your profits:
                </p>
                
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {productPricingData.map((product, index) => (
                    <Card 
                      key={product.name}
                      className={`bg-white shadow-md hover:shadow-lg transition-all duration-300 animate-fade-up`}
                      style={{ animationDelay: `${0.1 * index}s` }}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-base font-medium">{product.name}</CardTitle>
                          <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            product.recommendedAction === "increase" 
                              ? "bg-green-100 text-green-700" 
                              : "bg-red-100 text-red-700"
                          }`}>
                            {product.recommendedAction === "increase" ? (
                              <ArrowUp className="h-3 w-3 mr-1" />
                            ) : (
                              <ArrowDown className="h-3 w-3 mr-1" />
                            )}
                            {product.recommendedChange}%
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Current Price:</span>
                            <span className="font-medium">${product.currentPrice.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Recommended Price:</span>
                            <span className="font-medium">
                              ${(product.recommendedAction === "increase" 
                                ? product.currentPrice * (1 + product.recommendedChange/100)
                                : product.currentPrice * (1 - product.recommendedChange/100)
                              ).toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Potential Profit Increase:</span>
                            <span className="font-medium text-green-600">+{product.potentialProfitIncrease}%</span>
                          </div>
                          <div className="mt-2 text-xs text-gray-600 italic">
                            {product.reason}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

