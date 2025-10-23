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
  BarChart3,
  Package,
  Calendar,
  MessageSquare,
  Activity,
  Sparkles,
  User,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function PatientDashboard() {
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

    if (session.user.role !== "patient") {
      // Redirect to appropriate dashboard based on role
      switch (session.user.role) {
        case "doctor":
          router.push("/doctor/dashboard");
          break;
        case "lab":
          router.push("/lab/dashboard");
          break;
        case "admin":
          router.push("/admin/dashboard");
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

  if (!session || session.user.role !== "patient") {
    return null;
  }

  // Mock data - in a real app, this would come from your API
  const mockData = {
    latestResults: {
      riskScore: 65,
      riskLevel: "medium" as const,
      completedAt: new Date("2024-01-15"),
      recommendations: 3,
    },
    orders: [
      {
        id: "1",
        orderNumber: "WD-240115-A7X9",
        kitName: "Comprehensive Health Kit",
        status: "completed" as const,
        createdAt: new Date("2024-01-01"),
      },
    ],
    upcomingAppointments: [
      {
        id: "1",
        doctorName: "Dr. Sarah Johnson",
        date: new Date("2024-02-01"),
        type: "Result Review",
      },
    ],
    unreadMessages: 2,
  };

  const getRiskColor = (level: "low" | "medium" | "high") => {
    switch (level) {
      case "low":
        return "text-green-600 bg-green-50 border-green-200";
      case "medium":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "high":
        return "text-red-600 bg-red-50 border-red-200";
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
                Patient Dashboard
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 mb-4 animate-bounce-in animate-delay-200">
            <User className="w-6 h-6 text-blue-600 animate-pulse" />
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back,{" "}
              <span className="text-blue-600">{session.user.name}</span>
            </h1>
          </div>
          <p className="text-gray-600 mt-2 animate-slide-up animate-delay-400">
            Here&apos;s an overview of your health journey
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-200 group hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium group-hover:text-blue-600 transition-colors">
                Risk Score
              </CardTitle>
              <Activity className="h-4 w-4 text-blue-600 group-hover:scale-110 transition-transform animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold group-hover:text-blue-600 transition-colors">
                {mockData.latestResults.riskScore}
              </div>
              <Badge
                className={`mt-2 ${getRiskColor(
                  mockData.latestResults.riskLevel
                )} hover:scale-105 transition-transform`}
              >
                {mockData.latestResults.riskLevel.toUpperCase()} RISK
              </Badge>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-400 group hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium group-hover:text-blue-600 transition-colors">
                Orders
              </CardTitle>
              <Package className="h-4 w-4 text-blue-600 group-hover:scale-110 transition-transform animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold group-hover:text-blue-600 transition-colors">
                {mockData.orders.length}
              </div>
              <p className="text-xs text-muted-foreground group-hover:text-gray-600 transition-colors">
                Latest: {mockData.orders[0].status}
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-600 group hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium group-hover:text-blue-600 transition-colors">
                Appointments
              </CardTitle>
              <Calendar className="h-4 w-4 text-blue-600 group-hover:scale-110 transition-transform animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold group-hover:text-blue-600 transition-colors">
                {mockData.upcomingAppointments.length}
              </div>
              <p className="text-xs text-muted-foreground group-hover:text-gray-600 transition-colors">
                Next: Feb 1, 2024
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-800 group hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium group-hover:text-blue-600 transition-colors">
                Messages
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-blue-600 group-hover:scale-110 transition-transform animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold group-hover:text-blue-600 transition-colors">
                {mockData.unreadMessages}
              </div>
              <p className="text-xs text-muted-foreground group-hover:text-gray-600 transition-colors">
                Unread messages
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Latest Results */}
          <div className="lg:col-span-2 animate-slide-up animate-delay-600">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader>
                <CardTitle className="flex items-center group-hover:text-blue-600 transition-colors">
                  <BarChart3 className="w-5 h-5 mr-2 text-blue-600 group-hover:scale-110 transition-transform animate-pulse" />
                  Latest Test Results
                </CardTitle>
                <CardDescription className="group-hover:text-gray-700 transition-colors">
                  Your most recent genetic analysis results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium group-hover:text-gray-700 transition-colors">
                      Overall Risk Score
                    </span>
                    <Badge
                      className={`${getRiskColor(
                        mockData.latestResults.riskLevel
                      )} hover:scale-105 transition-transform`}
                    >
                      {mockData.latestResults.riskScore}/100
                    </Badge>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2 group-hover:bg-gray-300 transition-colors">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-blue-500 h-2 rounded-full animate-pulse-glow"
                      style={{ width: `${mockData.latestResults.riskScore}%` }}
                    ></div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg hover:shadow-md transition-all duration-300 hover:scale-105">
                      <div className="text-2xl font-bold text-gray-900 hover:text-brand-600 transition-colors">
                        {mockData.latestResults.recommendations}
                      </div>
                      <div className="text-sm text-gray-600">
                        Active Recommendations
                      </div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-gray-50 rounded-lg hover:shadow-md transition-all duration-300 hover:scale-105">
                      <div className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                        Jan 15
                      </div>
                      <div className="text-sm text-gray-600">Results Date</div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button
                      className="w-full animate-pulse-glow hover:scale-105 transition-transform bg-blue-600 hover:bg-blue-700"
                      asChild
                    >
                      <Link href="/patient/results">View Detailed Results</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6 animate-slide-up animate-delay-800">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader>
                <CardTitle className="group-hover:text-blue-600 transition-colors">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full justify-start hover:scale-105 transition-transform border-blue-300 hover:bg-blue-50 hover:border-blue-400"
                  variant="outline"
                  asChild
                >
                  <Link href="/shop">
                    <Package className="w-4 h-4 mr-2 text-blue-600 animate-pulse" />
                    Order New Kit
                  </Link>
                </Button>
                <Button
                  className="w-full justify-start hover:scale-105 transition-transform"
                  variant="outline"
                  asChild
                >
                  <Link href="/patient/activate-kit">
                    <Activity className="w-4 h-4 mr-2 text-blue-600 animate-pulse" />
                    Activate Kit
                  </Link>
                </Button>
                <Button
                  className="w-full justify-start hover:scale-105 transition-transform border-blue-300 hover:bg-blue-50 hover:border-blue-400"
                  variant="outline"
                  asChild
                >
                  <Link href="/patient/appointments">
                    <Calendar className="w-4 h-4 mr-2 text-blue-600 animate-pulse" />
                    Book Appointment
                  </Link>
                </Button>
                <Button
                  className="w-full justify-start hover:scale-105 transition-transform"
                  variant="outline"
                  asChild
                >
                  <Link href="/patient/messages">
                    <MessageSquare className="w-4 h-4 mr-2 text-blue-600 animate-pulse" />
                    View Messages
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader>
                <CardTitle className="group-hover:text-blue-600 transition-colors">
                  Recent Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                {mockData.orders.map((order) => (
                  <div
                    key={order.id}
                    className="space-y-2 hover:bg-blue-50 p-2 rounded-lg transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-sm hover:text-brand-600 transition-colors">
                          {order.kitName}
                        </p>
                        <p className="text-xs text-gray-600">
                          #{order.orderNumber}
                        </p>
                      </div>
                      <Badge
                        variant="secondary"
                        className="hover:scale-105 transition-transform"
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-4 hover:scale-105 transition-transform animate-pulse-glow border-blue-300 hover:bg-blue-50 hover:border-blue-400"
                  asChild
                >
                  <Link href="/patient/history">View All Orders</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
