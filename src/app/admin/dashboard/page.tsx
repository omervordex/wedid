"use client";

// Force dynamic rendering for this page
export const dynamic = "force-dynamic";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  ShoppingCart,
  FileText,
  Settings,
  BarChart3,
  Activity,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Sparkles,
  UserPlus,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AdminDashboard() {
  const sessionResult = useSession();
  const session = sessionResult?.data;
  const status = sessionResult?.status || "loading";
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Still loading

    if (!session) {
      router.push("/auth/login");
      return;
    }

    if (session.user.role !== "admin") {
      // Redirect to appropriate dashboard based on role
      switch (session.user.role) {
        case "patient":
          router.push("/patient/dashboard");
          break;
        case "doctor":
          router.push("/doctor/dashboard");
          break;
        case "lab":
          router.push("/lab/dashboard");
          break;
        default:
          router.push("/");
      }
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session || session.user.role !== "admin") {
    return null;
  }

  // Mock data - in a real app, this would come from your API
  const mockData = {
    systemStats: {
      totalUsers: 12847,
      activeUsers: 8923,
      totalOrders: 3456,
      monthlyRevenue: 234567,
      systemUptime: 99.9,
    },
    recentActivity: [
      {
        id: "1",
        type: "user_registration",
        message: "New patient registered: John Smith",
        timestamp: new Date("2024-01-25T10:30:00"),
        status: "success" as const,
      },
      {
        id: "2",
        type: "order_completed",
        message: "Order WD-240125-A7X9 completed",
        timestamp: new Date("2024-01-25T09:15:00"),
        status: "success" as const,
      },
      {
        id: "3",
        type: "system_alert",
        message: "High server load detected",
        timestamp: new Date("2024-01-25T08:45:00"),
        status: "warning" as const,
      },
      {
        id: "4",
        type: "payment_failed",
        message: "Payment failed for order WD-240125-B8Y1",
        timestamp: new Date("2024-01-25T08:00:00"),
        status: "error" as const,
      },
    ],
    userBreakdown: {
      patients: 11234,
      doctors: 45,
      labTechs: 12,
      admins: 8,
    },
    recentOrders: [
      {
        id: "1",
        orderNumber: "WD-240125-A7X9",
        customerName: "John Smith",
        amount: 399,
        status: "completed" as const,
        date: new Date("2024-01-25"),
      },
      {
        id: "2",
        orderNumber: "WD-240125-B8Y1",
        customerName: "Sarah Wilson",
        amount: 199,
        status: "processing" as const,
        date: new Date("2024-01-25"),
      },
      {
        id: "3",
        orderNumber: "WD-240124-C9Z2",
        customerName: "Michael Johnson",
        amount: 799,
        status: "shipped" as const,
        date: new Date("2024-01-24"),
      },
    ],
    systemHealth: {
      database: "healthy" as const,
      api: "healthy" as const,
      storage: "warning" as const,
      payments: "healthy" as const,
    },
  };

  const getOrderStatusColor = (
    status: "completed" | "processing" | "shipped" | "cancelled"
  ) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-50 border-green-200";
      case "processing":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "shipped":
        return "text-purple-600 bg-purple-50 border-purple-200";
      case "cancelled":
        return "text-red-600 bg-red-50 border-red-200";
    }
  };

  const getHealthStatusIcon = (status: "healthy" | "warning" | "error") => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "warning":
        return <AlertCircle className="w-4 h-4 text-blue-600" />;
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-50 to-white relative overflow-hidden animate-gradient-shift">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-blue-200 rounded-full opacity-30 animate-float animate-delay-400"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-300 rounded-full opacity-25 animate-rotate-slow"></div>
        <div className="absolute bottom-40 right-1/3 w-14 h-14 bg-blue-300 rounded-full opacity-20 animate-float animate-delay-800"></div>
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
              <p className="text-xs text-blue-600 font-medium">
                Admin Dashboard
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 mb-4 animate-bounce-in animate-delay-200">
            <Settings className="w-6 h-6 text-blue-600 animate-pulse" />
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back,{" "}
              <span className="text-blue-600">{session.user.name}</span>
            </h1>
          </div>
          <p className="text-gray-600 mt-2 animate-slide-up animate-delay-400">
            Here&apos;s your system overview
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card
            className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-bounce-in animate-delay-200 group cursor-pointer"
            onClick={() => router.push("/admin/analytics")}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium group-hover:text-blue-600 transition-colors">
                Total Users
              </CardTitle>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center group-hover:animate-pulse-glow transition-all">
                <Users className="h-4 w-4 text-blue-600 group-hover:scale-110 transition-transform" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {mockData.systemStats.totalUsers.toLocaleString()}
              </div>
              <div className="flex items-center space-x-1 text-green-600">
                <TrendingUp className="w-3 h-3" />
                <p className="text-xs font-medium">+12% from last month</p>
              </div>
            </CardContent>
          </Card>

          <Card
            className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-bounce-in animate-delay-400 group cursor-pointer"
            onClick={() => router.push("/admin/analytics")}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium group-hover:text-blue-600 transition-colors">
                Total Orders
              </CardTitle>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center group-hover:animate-pulse-glow transition-all">
                <ShoppingCart className="h-4 w-4 text-blue-600 group-hover:scale-110 transition-transform" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {mockData.systemStats.totalOrders.toLocaleString()}
              </div>
              <div className="flex items-center space-x-1 text-green-600">
                <TrendingUp className="w-3 h-3" />
                <p className="text-xs font-medium">+8% from last month</p>
              </div>
            </CardContent>
          </Card>

          <Card
            className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-bounce-in animate-delay-600 group cursor-pointer"
            onClick={() => router.push("/admin/analytics")}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium group-hover:text-blue-600 transition-colors">
                Monthly Revenue
              </CardTitle>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center group-hover:animate-pulse-glow transition-all">
                <TrendingUp className="h-4 w-4 text-blue-600 group-hover:scale-110 transition-transform" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                ${mockData.systemStats.monthlyRevenue.toLocaleString()}
              </div>
              <div className="flex items-center space-x-1 text-green-600">
                <TrendingUp className="w-3 h-3" />
                <p className="text-xs font-medium">+15% from last month</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-bounce-in animate-delay-800 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium group-hover:text-blue-600 transition-colors">
                System Uptime
              </CardTitle>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center group-hover:animate-pulse-glow transition-all">
                <Activity className="h-4 w-4 text-blue-600 group-hover:scale-110 transition-transform" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {mockData.systemStats.systemUptime}%
              </div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-1000">
              <CardHeader>
                <CardTitle className="flex items-center group">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                    <Activity className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                  </div>
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Latest system activities and events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex-shrink-0">
                        {activity.status === "success" && (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        )}
                        {activity.status === "warning" && (
                          <AlertCircle className="w-5 h-5 text-blue-600" />
                        )}
                        {activity.status === "error" && (
                          <AlertCircle className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.message}
                        </p>
                        <p className="text-xs text-gray-500">
                          {activity.timestamp.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}

                  <Button className="w-full mt-4" variant="outline" asChild>
                    <Link href="/admin/activity-log">View All Activity</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & System Health */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-1200">
              <CardHeader>
                <CardTitle className="flex items-center group">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                    <Settings className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                  </div>
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full justify-start animate-pulse-glow hover:scale-105 transition-transform"
                  variant="outline"
                  asChild
                >
                  <Link href="/admin/users">
                    <Users className="w-4 h-4 mr-2" />
                    User Management
                  </Link>
                </Button>
                <Button
                  className="w-full justify-start animate-pulse-glow hover:scale-105 transition-transform"
                  variant="outline"
                  asChild
                >
                  <Link href="/doctors/add">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Doctor
                  </Link>
                </Button>
                <Button
                  className="w-full justify-start animate-pulse-glow hover:scale-105 transition-transform"
                  variant="outline"
                  asChild
                >
                  <Link href="/admin/orders">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Order Management
                  </Link>
                </Button>
                <Button
                  className="w-full justify-start animate-pulse-glow hover:scale-105 transition-transform"
                  variant="outline"
                  asChild
                >
                  <Link href="/admin/blog">
                    <FileText className="w-4 h-4 mr-2" />
                    Blog Management
                  </Link>
                </Button>
                <Button
                  className="w-full justify-start animate-pulse-glow hover:scale-105 transition-transform"
                  variant="outline"
                  asChild
                >
                  <Link href="/admin/analytics">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Analytics Dashboard
                  </Link>
                </Button>
                <Button
                  className="w-full justify-start animate-pulse-glow hover:scale-105 transition-transform"
                  variant="outline"
                  asChild
                >
                  <Link href="/admin/settings">
                    <Settings className="w-4 h-4 mr-2" />
                    System Settings
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-1400">
              <CardHeader>
                <CardTitle className="flex items-center group">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                    <BarChart3 className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                  </div>
                  System Health
                </CardTitle>
                <CardDescription>Current system status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(mockData.systemHealth).map(
                    ([service, status]) => (
                      <div
                        key={service}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm font-medium capitalize">
                          {service}
                        </span>
                        <div className="flex items-center space-x-2">
                          {getHealthStatusIcon(status)}
                          <Badge
                            className={`text-xs ${
                              status === "healthy"
                                ? "text-green-600 bg-green-50"
                                : status === "warning"
                                ? "text-blue-600 bg-blue-50"
                                : "text-red-600 bg-red-50"
                            }`}
                          >
                            {status}
                          </Badge>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-1600">
              <CardHeader>
                <CardTitle className="flex items-center group">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                    <Users className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                  </div>
                  User Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Patients</span>
                    <span className="font-semibold">
                      {mockData.userBreakdown.patients.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Doctors</span>
                    <span className="font-semibold">
                      {mockData.userBreakdown.doctors}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Lab Techs</span>
                    <span className="font-semibold">
                      {mockData.userBreakdown.labTechs}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Admins</span>
                    <span className="font-semibold">
                      {mockData.userBreakdown.admins}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-1800">
              <CardHeader>
                <CardTitle className="flex items-center group">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                    <ShoppingCart className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                  </div>
                  Recent Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockData.recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="p-3 border border-gray-200 rounded-lg"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-medium text-sm">
                          {order.orderNumber}
                        </p>
                        <Badge className={getOrderStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-1">
                        {order.customerName}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold">
                          ${order.amount}
                        </span>
                        <span className="text-xs text-gray-500">
                          {order.date.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-3"
                    asChild
                  >
                    <Link href="/admin/orders">View All Orders</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
