"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, DollarSign, Users, ShoppingCart, TrendingUp, ChevronUp, ChevronDown, BarChart3, LineChart, PieChart, Activity } from "lucide-react";
import { NavBar } from "../components/nav-bar";
import { useEffect, useState } from "react";

// Sample data for the dashboard
const currentYearData = [
  { month: "Jan", revenue: 45000, sales: 120, users: 850, conversion: 3.2 },
  { month: "Feb", revenue: 52000, sales: 145, users: 920, conversion: 3.5 },
  { month: "Mar", revenue: 49000, sales: 132, users: 890, conversion: 3.3 },
  { month: "Apr", revenue: 58000, sales: 160, users: 950, conversion: 3.7 },
  { month: "May", revenue: 63000, sales: 175, users: 1020, conversion: 3.9 },
  { month: "Jun", revenue: 72000, sales: 200, users: 1150, conversion: 4.1 },
  { month: "Jul", revenue: 68000, sales: 188, users: 1080, conversion: 3.8 },
  { month: "Aug", revenue: 75000, sales: 210, users: 1220, conversion: 4.2 },
  { month: "Sep", revenue: 82000, sales: 230, users: 1350, conversion: 4.4 },
  { month: "Oct", revenue: 89000, sales: 250, users: 1480, conversion: 4.6 },
  { month: "Nov", revenue: 95000, sales: 270, users: 1620, conversion: 4.8 },
  { month: "Dec", revenue: 102000, sales: 290, users: 1750, conversion: 5.0 }
];

const previousYearData = [
  { month: "Jan", revenue: 42000, sales: 115, users: 800, conversion: 3.0 },
  { month: "Feb", revenue: 48000, sales: 135, users: 870, conversion: 3.2 },
  { month: "Mar", revenue: 46000, sales: 125, users: 840, conversion: 3.1 },
  { month: "Apr", revenue: 54000, sales: 150, users: 900, conversion: 3.4 },
  { month: "May", revenue: 59000, sales: 165, users: 970, conversion: 3.6 },
  { month: "Jun", revenue: 67000, sales: 185, users: 1080, conversion: 3.8 },
  { month: "Jul", revenue: 63000, sales: 175, users: 1020, conversion: 3.5 },
  { month: "Aug", revenue: 70000, sales: 195, users: 1150, conversion: 3.9 },
  { month: "Sep", revenue: 76000, sales: 215, users: 1280, conversion: 4.0 },
  { month: "Oct", revenue: 83000, sales: 235, users: 1400, conversion: 4.2 },
  { month: "Nov", revenue: 89000, sales: 255, users: 1530, conversion: 4.4 },
  { month: "Dec", revenue: 95000, sales: 275, users: 1650, conversion: 4.6 }
];

// Calculate growth percentages
const calculateGrowth = (current: number, previous: number) => {
  return ((current - previous) / previous) * 100;
};

// Get the latest month's data
const latestMonth = currentYearData[currentYearData.length - 1];
const previousLatestMonth = previousYearData[previousYearData.length - 1];

// Calculate growth for each metric
const revenueGrowth = calculateGrowth(latestMonth.revenue, previousLatestMonth.revenue);
const salesGrowth = calculateGrowth(latestMonth.sales, previousLatestMonth.sales);
const usersGrowth = calculateGrowth(latestMonth.users, previousLatestMonth.users);
const conversionGrowth = calculateGrowth(latestMonth.conversion, previousLatestMonth.conversion);

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("revenue");
  const [chartData, setChartData] = useState(currentYearData);
  const [showComparison, setShowComparison] = useState(true);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [tooltipData, setTooltipData] = useState<{x: number, y: number, value: number, month: string} | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Find min and max values for the y-axis
  const allValues = [...currentYearData, ...previousYearData].map(d => d.revenue);
  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);
  const yAxisHeight = 200; // Height of the chart in pixels
  const padding = 40; // Padding around the chart

  // Function to calculate y position based on value
  const getYPosition = (value: number) => {
    return yAxisHeight - ((value - minValue) / (maxValue - minValue)) * (yAxisHeight - padding * 2) + padding;
  };

  // Function to calculate x position based on index
  const getXPosition = (index: number, total: number) => {
    return (index / (total - 1)) * (600 - padding * 2) + padding;
  };

  // Generate path for the line chart
  const generatePath = (data: typeof currentYearData) => {
    return data.map((point, index) => {
      const x = getXPosition(index, data.length);
      const y = getYPosition(point.revenue);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  // Generate path for the area chart
  const generateAreaPath = (data: typeof currentYearData) => {
    const path = data.map((point, index) => {
      const x = getXPosition(index, data.length);
      const y = getYPosition(point.revenue);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
    
    // Close the path to create an area
    const lastPoint = data[data.length - 1];
    const firstPoint = data[0];
    const lastX = (600 - padding * 2) + padding;
    const firstX = padding;
    
    return `${path} L ${lastX} ${yAxisHeight - padding} L ${firstX} ${yAxisHeight - padding} Z`;
  };

  // Generate bars for the bar chart
  const generateBars = (data: typeof currentYearData) => {
    const barWidth = 20;
    const spacing = 10;
    const totalWidth = (600 - padding * 2);
    const availableWidth = totalWidth - (data.length - 1) * spacing;
    const singleBarWidth = availableWidth / data.length;
    
    return data.map((point, index) => {
      const x = getXPosition(index, data.length) - singleBarWidth / 2;
      const y = getYPosition(point.revenue);
      const height = yAxisHeight - padding - y;
      
      return `<rect 
        x="${x}" 
        y="${y}" 
        width="${singleBarWidth}" 
        height="${height}" 
        fill="rgba(59, 130, 246, 0.7)" 
        rx="2" 
        data-index="${index}" 
        class="bar" 
      />`;
    }).join('');
  };

  // Generate dots for the line chart
  const generateDots = (data: typeof currentYearData) => {
    return data.map((point, index) => {
      const x = getXPosition(index, data.length);
      const y = getYPosition(point.revenue);
      return `<circle cx="${x}" cy="${y}" r="4" class="dot" data-index="${index}" />`;
    }).join('');
  };

  // Generate y-axis labels
  const generateYAxisLabels = () => {
    const steps = 5;
    const stepValue = (maxValue - minValue) / steps;
    const labels = [];
    
    for (let i = 0; i <= steps; i++) {
      const value = minValue + (stepValue * i);
      const y = getYPosition(value);
      labels.push(`<text x="${padding - 10}" y="${y + 5}" class="text-xs text-gray-500">$${(value / 1000).toFixed(0)}k</text>`);
    }
    
    return labels.join('');
  };

  // Generate x-axis labels
  const generateXAxisLabels = () => {
    return currentYearData.map((point, index) => {
      const x = getXPosition(index, currentYearData.length);
      return `<text x="${x}" y="${yAxisHeight - padding + 20}" class="text-xs text-gray-500">${point.month}</text>`;
    }).join('');
  };

  // Handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === "revenue") {
      setChartData(currentYearData);
    } else if (tab === "sales") {
      setChartData(currentYearData.map(d => ({ ...d, revenue: d.sales })));
    } else if (tab === "users") {
      setChartData(currentYearData.map(d => ({ ...d, revenue: d.users })));
    } else if (tab === "conversion") {
      setChartData(currentYearData.map(d => ({ ...d, revenue: d.conversion })));
    }
  };

  // Handle mouse move on chart
  const handleChartMouseMove = (e: React.MouseEvent<SVGElement>) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    
    // Find the closest data point
    let closestIndex = 0;
    let minDistance = Infinity;
    
    currentYearData.forEach((_, index) => {
      const dataX = getXPosition(index, currentYearData.length);
      const distance = Math.abs(x - dataX);
      
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });
    
    // Only show tooltip if mouse is close enough to a data point
    if (minDistance < 30) {
      const dataPoint = currentYearData[closestIndex];
      const y = getYPosition(dataPoint.revenue);
      setTooltipData({
        x: getXPosition(closestIndex, currentYearData.length),
        y,
        value: dataPoint.revenue,
        month: dataPoint.month
      });
    } else {
      setTooltipData(null);
    }
  };

  // Handle mouse leave from chart
  const handleChartMouseLeave = () => {
    setTooltipData(null);
  };

  if (!mounted) return null;

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
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setShowComparison(!showComparison)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  showComparison 
                    ? "bg-blue-100 text-blue-700" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {showComparison ? "Hide Comparison" : "Show Comparison"}
              </button>
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
                <div className="text-2xl font-bold text-gray-900">${latestMonth.revenue.toLocaleString()}</div>
                <div className="flex items-center mt-1">
                  {revenueGrowth >= 0 ? (
                    <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-xs font-medium ${revenueGrowth >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {Math.abs(revenueGrowth).toFixed(1)}% from last year
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-fade-in" style={{ animationDelay: "200ms" }}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Sales</CardTitle>
                <ShoppingCart className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{latestMonth.sales.toLocaleString()}</div>
                <div className="flex items-center mt-1">
                  {salesGrowth >= 0 ? (
                    <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-xs font-medium ${salesGrowth >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {Math.abs(salesGrowth).toFixed(1)}% from last year
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-fade-in" style={{ animationDelay: "300ms" }}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Active Users</CardTitle>
                <Users className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{latestMonth.users.toLocaleString()}</div>
                <div className="flex items-center mt-1">
                  {usersGrowth >= 0 ? (
                    <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-xs font-medium ${usersGrowth >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {Math.abs(usersGrowth).toFixed(1)}% from last year
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-fade-in" style={{ animationDelay: "400ms" }}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Conversion Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{latestMonth.conversion.toFixed(1)}%</div>
                <div className="flex items-center mt-1">
                  {conversionGrowth >= 0 ? (
                    <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-xs font-medium ${conversionGrowth >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {Math.abs(conversionGrowth).toFixed(1)}% from last year
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sales Overview Chart */}
          <Card className="mb-8 bg-white shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: "500ms" }}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">Sales Overview</CardTitle>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mt-1">Sales Performance</h2>
                </div>
                <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                  <button 
                    onClick={() => handleTabChange("revenue")}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                      activeTab === "revenue" 
                        ? "bg-white text-blue-600 shadow-sm" 
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Revenue
                  </button>
                  <button 
                    onClick={() => handleTabChange("sales")}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                      activeTab === "sales" 
                        ? "bg-white text-blue-600 shadow-sm" 
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Sales
                  </button>
                  <button 
                    onClick={() => handleTabChange("users")}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                      activeTab === "users" 
                        ? "bg-white text-blue-600 shadow-sm" 
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Users
                  </button>
                  <button 
                    onClick={() => handleTabChange("conversion")}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                      activeTab === "conversion" 
                        ? "bg-white text-blue-600 shadow-sm" 
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Conversion
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative h-[300px] w-full">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full max-w-3xl">
                    <svg 
                      width="100%" 
                      height="250" 
                      viewBox="0 0 600 250" 
                      className="overflow-visible"
                      onMouseMove={handleChartMouseMove}
                      onMouseLeave={handleChartMouseLeave}
                    >
                      {/* Y-axis line */}
                      <line 
                        x1={padding} 
                        y1={padding} 
                        x2={padding} 
                        y2={yAxisHeight - padding} 
                        stroke="#e5e7eb" 
                        strokeWidth="1" 
                      />
                      
                      {/* X-axis line */}
                      <line 
                        x1={padding} 
                        y1={yAxisHeight - padding} 
                        x2={600 - padding} 
                        y2={yAxisHeight - padding} 
                        stroke="#e5e7eb" 
                        strokeWidth="1" 
                      />
                      
                      {/* Y-axis labels */}
                      <g dangerouslySetInnerHTML={{ __html: generateYAxisLabels() }} />
                      
                      {/* X-axis labels */}
                      <g dangerouslySetInnerHTML={{ __html: generateXAxisLabels() }} />
                      
                      {/* Grid lines */}
                      {Array.from({ length: 5 }).map((_, i) => {
                        const y = getYPosition(minValue + ((maxValue - minValue) / 5) * i);
                        return (
                          <line 
                            key={i}
                            x1={padding} 
                            y1={y} 
                            x2={600 - padding} 
                            y2={y} 
                            stroke="#f3f4f6" 
                            strokeWidth="1" 
                            strokeDasharray="4 4"
                          />
                        );
                      })}
                      
                      {/* Previous year area (if comparison is enabled) */}
                      {showComparison && (
                        <path 
                          d={generateAreaPath(previousYearData)} 
                          fill="rgba(59, 130, 246, 0.1)" 
                          stroke="none" 
                        />
                      )}
                      
                      {/* Current year area */}
                      <path 
                        d={generateAreaPath(chartData)} 
                        fill="rgba(37, 99, 235, 0.15)" 
                        stroke="none" 
                      />
                      
                      {/* Previous year line (if comparison is enabled) */}
                      {showComparison && (
                        <path 
                          d={generatePath(previousYearData)} 
                          fill="none" 
                          stroke="#94a3b8" 
                          strokeWidth="1.5" 
                          strokeDasharray="4 4" 
                        />
                      )}
                      
                      {/* Current year line */}
                      <path 
                        d={generatePath(chartData)} 
                        fill="none" 
                        stroke="#2563eb" 
                        strokeWidth="2.5" 
                      />
                      
                      {/* Previous year dots (if comparison is enabled) */}
                      {showComparison && (
                        <g dangerouslySetInnerHTML={{ 
                          __html: generateDots(previousYearData.map((point, index) => ({
                            ...point,
                            revenue: point.revenue * 0.9
                          }))) 
                        }} />
                      )}
                      
                      {/* Current year dots */}
                      <g dangerouslySetInnerHTML={{ __html: generateDots(chartData) }} />

                      {/* Bar chart - current year */}
                      <g dangerouslySetInnerHTML={{ __html: generateBars(chartData) }} />
                      
                      {/* Bar chart - previous year (if comparison is enabled) */}
                      {showComparison && (
                        <g dangerouslySetInnerHTML={{ 
                          __html: generateBars(previousYearData.map((point, index) => ({
                            ...point,
                            revenue: point.revenue * 0.9 // Slightly smaller for visual distinction
                          }))) 
                        }} />
                      )}
                      
                      {/* Tooltip (appears on hover) */}
                      {tooltipData && (
                        <g>
                          {/* Vertical line */}
                          <line 
                            x1={tooltipData.x} 
                            y1={padding} 
                            x2={tooltipData.x} 
                            y2={yAxisHeight - padding} 
                            stroke="#2563eb" 
                            strokeWidth="1" 
                            strokeDasharray="4 4" 
                          />
                          
                          {/* Tooltip box */}
                          <rect 
                            x={tooltipData.x - 60} 
                            y={tooltipData.y - 40} 
                            width="120" 
                            height="30" 
                            rx="4" 
                            fill="#2563eb" 
                            opacity="0.95" 
                          />
                          
                          {/* Tooltip text */}
                          <text 
                            x={tooltipData.x} 
                            y={tooltipData.y - 20} 
                            textAnchor="middle" 
                            fill="white" 
                            fontSize="12" 
                            fontWeight="bold"
                          >
                            {tooltipData.month}: ${tooltipData.value.toLocaleString()}
                          </text>
                          
                          {/* Highlighted dot */}
                          <circle 
                            cx={tooltipData.x} 
                            cy={tooltipData.y} 
                            r="6" 
                            fill="#2563eb" 
                            stroke="white" 
                            strokeWidth="2" 
                          />
                        </g>
                      )}
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Legend */}
              <div className="flex justify-center mt-4 space-x-6">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-xs text-gray-600">Current Year</span>
                </div>
                {showComparison && (
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-gray-400 mr-2"></div>
                    <span className="text-xs text-gray-600">Previous Year</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Additional Metrics */}
          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <Card className="bg-white shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: "600ms" }}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-gray-900">Monthly Performance</CardTitle>
                <h3 className="text-xl font-bold text-blue-600 mt-1">Monthly Sales Trends</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentYearData.slice(-3).reverse().map((month, index) => {
                    const prevMonth = currentYearData[currentYearData.length - 4 + index];
                    const revenueGrowth = calculateGrowth(month.revenue, prevMonth.revenue);
                    
                    return (
                      <div key={month.month} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-2 ${
                            revenueGrowth >= 0 ? "bg-green-500" : "bg-red-500"
                          }`}></div>
                          <span className="text-sm font-medium text-gray-700">{month.month} 2023</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900 mr-2">${month.revenue.toLocaleString()}</span>
                          <div className="flex items-center">
                            {revenueGrowth >= 0 ? (
                              <ChevronUp className="h-3 w-3 text-green-500 mr-1" />
                            ) : (
                              <ChevronDown className="h-3 w-3 text-red-500 mr-1" />
                            )}
                            <span className={`text-xs font-medium ${
                              revenueGrowth >= 0 ? "text-green-500" : "text-red-500"
                            }`}>
                              {Math.abs(revenueGrowth).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: "700ms" }}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-gray-900">Key Metrics</CardTitle>
                <h3 className="text-xl font-bold text-indigo-600 mt-1">Sales Analytics</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <BarChart3 className="h-4 w-4 text-blue-500 mr-2" />
                      <span className="text-sm font-medium text-gray-700">Average Order Value</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">${(latestMonth.revenue / latestMonth.sales).toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <LineChart className="h-4 w-4 text-blue-500 mr-2" />
                      <span className="text-sm font-medium text-gray-700">Revenue per User</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">${(latestMonth.revenue / latestMonth.users).toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <PieChart className="h-4 w-4 text-blue-500 mr-2" />
                      <span className="text-sm font-medium text-gray-700">Sales per User</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{(latestMonth.sales / latestMonth.users).toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Activity className="h-4 w-4 text-blue-500 mr-2" />
                      <span className="text-sm font-medium text-gray-700">Year-over-Year Growth</span>
                    </div>
                    <span className="text-sm font-medium text-green-500">+{revenueGrowth.toFixed(1)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Sales */}
          <Card className="bg-white shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: "800ms" }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-gray-900">Recent Sales</CardTitle>
              <h3 className="text-xl font-bold text-green-600 mt-1">Latest Transactions</h3>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 text-sm text-gray-900">MacBook Pro</td>
                      <td className="py-3 px-4 text-sm text-gray-500">John Doe</td>
                      <td className="py-3 px-4 text-sm font-medium text-gray-900">$1,299.99</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Completed</span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 text-sm text-gray-900">iPhone 13</td>
                      <td className="py-3 px-4 text-sm text-gray-500">Jane Smith</td>
                      <td className="py-3 px-4 text-sm font-medium text-gray-900">$999.99</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Completed</span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 text-sm text-gray-900">Sony WH-1000XM4</td>
                      <td className="py-3 px-4 text-sm text-gray-500">Robert Johnson</td>
                      <td className="py-3 px-4 text-sm font-medium text-gray-900">$349.99</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Processing</span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 text-sm text-gray-900">Apple Watch Series 7</td>
                      <td className="py-3 px-4 text-sm text-gray-500">Emily Davis</td>
                      <td className="py-3 px-4 text-sm font-medium text-gray-900">$399.99</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">Shipped</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 text-sm text-gray-900">Canon EOS R5</td>
                      <td className="py-3 px-4 text-sm text-gray-500">Michael Wilson</td>
                      <td className="py-3 px-4 text-sm font-medium text-gray-900">$3,899.99</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Completed</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  );
} 