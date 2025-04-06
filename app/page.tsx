"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, DollarSign, Users, TrendingUp } from "lucide-react";
import { NavBar } from "./components/nav-bar";

const currentYearData = [
  { month: "Jan", value: 4000 },
  { month: "Feb", value: 3000 },
  { month: "Mar", value: 5000 },
  { month: "Apr", value: 4500 },
  { month: "May", value: 6000 },
  { month: "Jun", value: 5500 },
  { month: "Jul", value: 7000 },
  { month: "Aug", value: 6500 },
  { month: "Sep", value: 8000 },
  { month: "Oct", value: 7500 },
  { month: "Nov", value: 9000 },
  { month: "Dec", value: 8500 },
];

const previousYearData = [
  { month: "Jan", value: 3000 },
  { month: "Feb", value: 2500 },
  { month: "Mar", value: 4000 },
  { month: "Apr", value: 3500 },
  { month: "May", value: 5000 },
  { month: "Jun", value: 4500 },
  { month: "Jul", value: 6000 },
  { month: "Aug", value: 5500 },
  { month: "Sep", value: 7000 },
  { month: "Oct", value: 6500 },
  { month: "Nov", value: 8000 },
  { month: "Dec", value: 7500 },
];

export default function HomePage() {
  return (
    <>
      <NavBar />
      <div className="pt-16 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <main className="container mx-auto p-6">
          <div className="flex justify-between items-center mb-8 animate-fade-in">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-500 mt-1">Welcome to your retail analytics dashboard</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card className="bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-fade-in" style={{ animationDelay: "100ms" }}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">$85,000</div>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-xs font-medium text-green-500">+12.5% from last year</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-fade-in" style={{ animationDelay: "200ms" }}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Sales</CardTitle>
                <BarChart className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">2,450</div>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-xs font-medium text-green-500">+8.2% from last year</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-fade-in" style={{ animationDelay: "300ms" }}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Active Users</CardTitle>
                <Users className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">1,750</div>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-xs font-medium text-green-500">+15.3% from last year</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-fade-in" style={{ animationDelay: "400ms" }}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Conversion Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">5.0%</div>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-xs font-medium text-green-500">+0.8% from last year</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
}

