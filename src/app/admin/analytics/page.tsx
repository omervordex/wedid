"use client";

// Force dynamic rendering for this page
export const dynamic = "force-dynamic";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Package,
  DollarSign,
  Download,
  ArrowUp,
  ArrowDown,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

export default function AdminAnalyticsPage() {
  const sessionResult = useSession();
  const session = sessionResult?.data;
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState("6months");

  if (!session || session.user.role !== "admin") {
    router.push("/auth/login");
    return null;
  }

  // Mock analytics data
  const monthlyData = {
    users: [
      { month: "Aug 2023", value: 45, growth: 12 },
      { month: "Sep 2023", value: 52, growth: 15.6 },
      { month: "Oct 2023", value: 48, growth: -7.7 },
      { month: "Nov 2023", value: 61, growth: 27.1 },
      { month: "Dec 2023", value: 73, growth: 19.7 },
      { month: "Jan 2024", value: 89, growth: 21.9 },
    ],
    orders: [
      { month: "Aug 2023", value: 23, growth: 8 },
      { month: "Sep 2023", value: 31, growth: 34.8 },
      { month: "Oct 2023", value: 28, growth: -9.7 },
      { month: "Nov 2023", value: 42, growth: 50.0 },
      { month: "Dec 2023", value: 56, growth: 33.3 },
      { month: "Jan 2024", value: 67, growth: 19.6 },
    ],
    revenue: [
      { month: "Aug 2023", value: 12450, growth: 8.5 },
      { month: "Sep 2023", value: 18320, growth: 47.2 },
      { month: "Oct 2023", value: 15680, growth: -14.4 },
      { month: "Nov 2023", value: 24890, growth: 58.7 },
      { month: "Dec 2023", value: 32150, growth: 29.2 },
      { month: "Jan 2024", value: 41230, growth: 28.2 },
    ],
  };

  const currentMonth = monthlyData.users[monthlyData.users.length - 1];

  const stats = {
    totalUsers: currentMonth.value,
    userGrowth: currentMonth.growth,
    totalOrders: monthlyData.orders[monthlyData.orders.length - 1].value,
    orderGrowth: monthlyData.orders[monthlyData.orders.length - 1].growth,
    monthlyRevenue: monthlyData.revenue[monthlyData.revenue.length - 1].value,
    revenueGrowth: monthlyData.revenue[monthlyData.revenue.length - 1].growth,
  };

  const getMaxValue = (data: { value: number }[]) =>
    Math.max(...data.map((d) => d.value));

  const BarChart = ({
    data,
    title,
    color,
    prefix = "",
    suffix = "",
  }: {
    data: { value: number; month: string; growth: number }[];
    title: string;
    color: string;
    prefix?: string;
    suffix?: string;
  }) => {
    const maxValue = getMaxValue(data);

    return (
      <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-1200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-100 to-blue-100 rounded-lg flex items-center justify-center group-hover:animate-pulse-glow transition-all">
              <BarChart3 className="w-5 h-5 text-brand-600 group-hover:scale-110 transition-transform" />
            </div>
            <span>{title}</span>
          </CardTitle>
          <CardDescription>
            Monthly comparison over the last 6 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.map(
              (
                item: { value: number; month: string; growth: number },
                index: number
              ) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium">{item.month}</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">
                        {prefix}
                        {item.value.toLocaleString()}
                        {suffix}
                      </span>
                      <div
                        className={`flex items-center space-x-1 ${
                          item.growth >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {item.growth >= 0 ? (
                          <ArrowUp className="w-3 h-3" />
                        ) : (
                          <ArrowDown className="w-3 h-3" />
                        )}
                        <span className="text-xs font-medium">
                          {Math.abs(item.growth).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${color}`}
                      style={{ width: `${(item.value / maxValue) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  const LineChart = ({
    data,
    title,
    color,
  }: {
    data: { value: number; month: string; growth: number }[];
    title: string;
    color: string;
  }) => {
    const maxValue = getMaxValue(data);
    const minValue = Math.min(...data.map((d) => d.value));
    const range = maxValue - minValue;

    return (
      <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-1400">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-brand-100 rounded-lg flex items-center justify-center group-hover:animate-pulse-glow transition-all">
              <TrendingUp className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
            </div>
            <span>{title} Trend</span>
          </CardTitle>
          <CardDescription>Growth trend over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 relative">
            <svg className="w-full h-full" viewBox="0 0 400 200">
              {/* Grid lines */}
              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={i}
                  x1="40"
                  y1={40 + i * 32}
                  x2="380"
                  y2={40 + i * 32}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
              ))}

              {/* Data line */}
              <polyline
                points={data
                  .map(
                    (
                      item: { value: number; month: string; growth: number },
                      index: number
                    ) =>
                      `${60 + index * 60},${
                        180 - ((item.value - minValue) / range) * 120
                      }`
                  )
                  .join(" ")}
                fill="none"
                stroke={color}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points */}
              {data.map(
                (
                  item: { value: number; month: string; growth: number },
                  index: number
                ) => (
                  <circle
                    key={index}
                    cx={60 + index * 60}
                    cy={180 - ((item.value - minValue) / range) * 120}
                    r="4"
                    fill={color}
                  />
                )
              )}

              {/* Labels */}
              {data.map(
                (
                  item: { value: number; month: string; growth: number },
                  index: number
                ) => (
                  <text
                    key={index}
                    x={60 + index * 60}
                    y="195"
                    textAnchor="middle"
                    className="text-xs fill-gray-600"
                  >
                    {item.month.split(" ")[0]}
                  </text>
                )
              )}
            </svg>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-blue-50 to-white relative overflow-hidden animate-gradient-shift">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-brand-200 rounded-full opacity-30 animate-float animate-delay-400"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-300 rounded-full opacity-25 animate-rotate-slow"></div>
        <div className="absolute bottom-40 right-1/3 w-14 h-14 bg-brand-300 rounded-full opacity-20 animate-float animate-delay-800"></div>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-8 animate-slide-up">
          {/* Logo Section */}
          <div className="flex items-center space-x-4 mb-6 animate-bounce-in">
            <div className="relative">
              <Image
                src="/logo.avif"
                alt="Epigenetic Coaching Logo"
                width={60}
                height={60}
                className="rounded-xl shadow-lg animate-pulse-glow"
              />
              <div className="absolute -top-1 -right-1">
                <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Epigenetic Coaching
              </h2>
              <p className="text-xs text-brand-600 font-medium">
                Admin Analytics
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 animate-bounce-in animate-delay-200">
                Analytics Dashboard
              </h1>
              <p className="text-gray-600 mt-2 animate-slide-up animate-delay-400">
                Detailed analytics and performance metrics
              </p>
            </div>
            <div className="flex space-x-3">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="3months">Last 3 Months</option>
                <option value="6months">Last 6 Months</option>
                <option value="12months">Last 12 Months</option>
              </select>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-bounce-in animate-delay-600 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-brand-100 to-blue-100 rounded-lg flex items-center justify-center group-hover:animate-pulse-glow transition-all">
                      <Users className="w-5 h-5 text-brand-600 group-hover:scale-110 transition-transform" />
                    </div>
                    <p className="text-sm font-medium text-gray-600 group-hover:text-brand-600 transition-colors">
                      Total Users
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <p className="text-3xl font-bold text-brand-600">
                      {stats.totalUsers}
                    </p>
                    <div
                      className={`flex items-center space-x-1 ${
                        stats.userGrowth >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {stats.userGrowth >= 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span className="text-sm font-medium">
                        {Math.abs(stats.userGrowth).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-bounce-in animate-delay-800 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-brand-100 rounded-lg flex items-center justify-center group-hover:animate-pulse-glow transition-all">
                      <Package className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                    </div>
                    <p className="text-sm font-medium text-gray-600 group-hover:text-blue-600 transition-colors">
                      Total Orders
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <p className="text-3xl font-bold text-blue-600">
                      {stats.totalOrders}
                    </p>
                    <div
                      className={`flex items-center space-x-1 ${
                        stats.orderGrowth >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {stats.orderGrowth >= 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span className="text-sm font-medium">
                        {Math.abs(stats.orderGrowth).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-bounce-in animate-delay-1000 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-brand-100 to-blue-100 rounded-lg flex items-center justify-center group-hover:animate-pulse-glow transition-all">
                      <DollarSign className="w-5 h-5 text-brand-600 group-hover:scale-110 transition-transform" />
                    </div>
                    <p className="text-sm font-medium text-gray-600 group-hover:text-brand-600 transition-colors">
                      Monthly Revenue
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <p className="text-3xl font-bold text-brand-600">
                      ${stats.monthlyRevenue.toLocaleString()}
                    </p>
                    <div
                      className={`flex items-center space-x-1 ${
                        stats.revenueGrowth >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {stats.revenueGrowth >= 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span className="text-sm font-medium">
                        {Math.abs(stats.revenueGrowth).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LineChart
                data={monthlyData.users}
                title="User Growth"
                color="#3b82f6"
              />
              <LineChart
                data={monthlyData.revenue}
                title="Revenue Growth"
                color="#10b981"
              />
            </div>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-1600">
              <CardHeader>
                <CardTitle className="flex items-center group">
                  <div className="w-8 h-8 bg-gradient-to-br from-brand-100 to-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                    <BarChart3 className="w-5 h-5 text-brand-600 group-hover:scale-110 transition-transform" />
                  </div>
                  Performance Summary
                </CardTitle>
                <CardDescription>
                  Key insights from the last 6 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">97%</div>
                    <div className="text-sm text-blue-700">
                      User Satisfaction
                    </div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      2.3x
                    </div>
                    <div className="text-sm text-green-700">Revenue Growth</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      68%
                    </div>
                    <div className="text-sm text-purple-700">
                      Repeat Customers
                    </div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">4.8</div>
                    <div className="text-sm text-blue-700">Avg Rating</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BarChart
                data={monthlyData.users}
                title="Monthly User Growth"
                color="bg-blue-600"
              />
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-1800">
                <CardHeader>
                  <CardTitle className="flex items-center group">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-brand-100 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                      <Users className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                    </div>
                    User Demographics
                  </CardTitle>
                  <CardDescription>User distribution by role</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        role: "Patients",
                        count: 76,
                        percentage: 85.4,
                        color: "bg-gray-600",
                      },
                      {
                        role: "Doctors",
                        count: 8,
                        percentage: 9.0,
                        color: "bg-blue-600",
                      },
                      {
                        role: "Lab Staff",
                        count: 3,
                        percentage: 3.4,
                        color: "bg-green-600",
                      },
                      {
                        role: "Admins",
                        count: 2,
                        percentage: 2.2,
                        color: "bg-purple-600",
                      },
                    ].map((item) => (
                      <div key={item.role} className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-medium">{item.role}</span>
                          <span className="font-semibold">
                            {item.count} ({item.percentage}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${item.color}`}
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="orders">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BarChart
                data={monthlyData.orders}
                title="Monthly Orders"
                color="bg-purple-600"
              />
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-2000">
                <CardHeader>
                  <CardTitle className="flex items-center group">
                    <div className="w-8 h-8 bg-gradient-to-br from-brand-100 to-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                      <Package className="w-5 h-5 text-brand-600 group-hover:scale-110 transition-transform" />
                    </div>
                    Order Status Distribution
                  </CardTitle>
                  <CardDescription>Current order statuses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        status: "Delivered",
                        count: 45,
                        percentage: 67.2,
                        color: "bg-green-600",
                      },
                      {
                        status: "Shipped",
                        count: 12,
                        percentage: 17.9,
                        color: "bg-purple-600",
                      },
                      {
                        status: "Processing",
                        count: 7,
                        percentage: 10.4,
                        color: "bg-blue-600",
                      },
                      {
                        status: "Pending",
                        count: 3,
                        percentage: 4.5,
                        color: "bg-blue-600",
                      },
                    ].map((item) => (
                      <div key={item.status} className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-medium">{item.status}</span>
                          <span className="font-semibold">
                            {item.count} ({item.percentage}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${item.color}`}
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="revenue">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BarChart
                data={monthlyData.revenue}
                title="Monthly Revenue"
                color="bg-green-600"
                prefix="$"
              />
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-2200">
                <CardHeader>
                  <CardTitle className="flex items-center group">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-brand-100 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                      <DollarSign className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                    </div>
                    Revenue by Kit Type
                  </CardTitle>
                  <CardDescription>
                    Revenue breakdown by product
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        kit: "Premium Coaching Package",
                        revenue: 23970,
                        percentage: 58.1,
                        color: "bg-green-600",
                      },
                      {
                        kit: "Comprehensive Health Kit",
                        revenue: 11970,
                        percentage: 29.0,
                        color: "bg-blue-600",
                      },
                      {
                        kit: "Basic Health Kit",
                        revenue: 5290,
                        percentage: 12.9,
                        color: "bg-gray-600",
                      },
                    ].map((item) => (
                      <div key={item.kit} className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-medium">{item.kit}</span>
                          <span className="font-semibold">
                            ${item.revenue.toLocaleString()} ({item.percentage}
                            %)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${item.color}`}
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
