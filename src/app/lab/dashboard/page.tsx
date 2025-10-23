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
  Upload,
  CheckCircle,
  Clock,
  AlertTriangle,
  BarChart3,
  FileText,
  Users,
  Activity,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LabDashboard() {
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

    if (session.user.role !== "lab") {
      // Redirect to appropriate dashboard based on role
      switch (session.user.role) {
        case "patient":
          router.push("/patient/dashboard");
          break;
        case "doctor":
          router.push("/doctor/dashboard");
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

  if (!session || session.user.role !== "lab") {
    return null;
  }

  // Mock data - in a real app, this would come from your API
  const mockData = {
    todayStats: {
      samplesReceived: 24,
      testsCompleted: 18,
      pendingQC: 6,
      rejectedSamples: 2,
    },
    recentSamples: [
      {
        id: "1",
        kitNumber: "WD-240125-A7X9",
        patientName: "John Smith",
        receivedAt: new Date("2024-01-25"),
        status: "processing" as const,
        priority: "normal" as const,
      },
      {
        id: "2",
        kitNumber: "WD-240125-B8Y1",
        patientName: "Sarah Wilson",
        receivedAt: new Date("2024-01-25"),
        status: "completed" as const,
        priority: "high" as const,
      },
      {
        id: "3",
        kitNumber: "WD-240124-C9Z2",
        patientName: "Michael Johnson",
        receivedAt: new Date("2024-01-24"),
        status: "qc_pending" as const,
        priority: "normal" as const,
      },
    ],
    batchQueue: [
      {
        id: "1",
        batchNumber: "BATCH-240125-001",
        sampleCount: 12,
        status: "ready" as const,
        estimatedCompletion: new Date("2024-01-26"),
      },
      {
        id: "2",
        batchNumber: "BATCH-240125-002",
        sampleCount: 8,
        status: "processing" as const,
        estimatedCompletion: new Date("2024-01-27"),
      },
    ],
    qualityMetrics: {
      passRate: 96.5,
      averageProcessingTime: 18.5,
      customerSatisfaction: 4.8,
    },
  };

  const getStatusColor = (
    status: "processing" | "completed" | "qc_pending" | "rejected"
  ) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-50 border-green-200";
      case "processing":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "qc_pending":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "rejected":
        return "text-red-600 bg-red-50 border-red-200";
    }
  };

  const getPriorityColor = (priority: "normal" | "high" | "urgent") => {
    switch (priority) {
      case "normal":
        return "text-gray-600 bg-gray-50 border-gray-200";
      case "high":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "urgent":
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
                Laboratory Dashboard
              </p>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 animate-bounce-in animate-delay-200">
            Laboratory Dashboard
          </h1>
          <p className="text-gray-600 mt-2 animate-slide-up animate-delay-400">
            Welcome back, {session.user.name}. Here&apos;s your lab overview for
            today.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-bounce-in animate-delay-200 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium group-hover:text-blue-600 transition-colors">
                Samples Received
              </CardTitle>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center group-hover:animate-pulse-glow transition-all">
                <Upload className="h-4 w-4 text-blue-600 group-hover:scale-110 transition-transform" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {mockData.todayStats.samplesReceived}
              </div>
              <p className="text-xs text-muted-foreground">Today</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-bounce-in animate-delay-400 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium group-hover:text-blue-600 transition-colors">
                Tests Completed
              </CardTitle>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center group-hover:animate-pulse-glow transition-all">
                <CheckCircle className="h-4 w-4 text-blue-600 group-hover:scale-110 transition-transform" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {mockData.todayStats.testsCompleted}
              </div>
              <p className="text-xs text-muted-foreground">Today</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-bounce-in animate-delay-600 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium group-hover:text-blue-600 transition-colors">
                Pending QC
              </CardTitle>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center group-hover:animate-pulse-glow transition-all">
                <Clock className="h-4 w-4 text-blue-600 group-hover:scale-110 transition-transform" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {mockData.todayStats.pendingQC}
              </div>
              <p className="text-xs text-muted-foreground">Awaiting review</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-bounce-in animate-delay-800 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium group-hover:text-blue-600 transition-colors">
                Rejected Samples
              </CardTitle>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center group-hover:animate-pulse-glow transition-all">
                <AlertTriangle className="h-4 w-4 text-blue-600 group-hover:scale-110 transition-transform" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {mockData.todayStats.rejectedSamples}
              </div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Samples */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-1000">
              <CardHeader>
                <CardTitle className="flex items-center group">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                    <Activity className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                  </div>
                  Recent Samples
                </CardTitle>
                <CardDescription>
                  Latest samples received and their processing status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.recentSamples.map((sample) => (
                    <div
                      key={sample.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center">
                          <FileText className="w-6 h-6 text-brand-600" />
                        </div>
                        <div>
                          <p className="font-medium">{sample.kitNumber}</p>
                          <p className="text-sm text-gray-600">
                            {sample.patientName}
                          </p>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <Badge className={getStatusColor(sample.status)}>
                          {sample.status.replace("_", " ").toUpperCase()}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={getPriorityColor(sample.priority)}
                        >
                          {sample.priority.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  ))}

                  <Button className="w-full mt-4" variant="outline" asChild>
                    <Link href="/lab/samples">View All Samples</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Batch Queue */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-1200">
              <CardHeader>
                <CardTitle className="flex items-center group">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                    <BarChart3 className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                  </div>
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  asChild
                >
                  <Link href="/lab/upload-results">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Results
                  </Link>
                </Button>
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  asChild
                >
                  <Link href="/lab/quality-control">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Quality Control
                  </Link>
                </Button>
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  asChild
                >
                  <Link href="/lab/batch-processing">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Batch Processing
                  </Link>
                </Button>
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  asChild
                >
                  <Link href="/lab/reports">
                    <FileText className="w-4 h-4 mr-2" />
                    Lab Reports
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-1400">
              <CardHeader>
                <CardTitle className="flex items-center group">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                    <FileText className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                  </div>
                  Batch Queue
                </CardTitle>
                <CardDescription>
                  Current batch processing status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockData.batchQueue.map((batch) => (
                    <div
                      key={batch.id}
                      className="p-3 border border-gray-200 rounded-lg"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-medium text-sm">
                          {batch.batchNumber}
                        </p>
                        <Badge
                          variant={
                            batch.status === "ready" ? "default" : "secondary"
                          }
                        >
                          {batch.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">
                        {batch.sampleCount} samples
                      </p>
                      <p className="text-xs text-gray-500">
                        ETA: {batch.estimatedCompletion.toLocaleDateString()}
                      </p>
                    </div>
                  ))}

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-3"
                    asChild
                  >
                    <Link href="/lab/batch-processing">Manage Batches</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-1600">
              <CardHeader>
                <CardTitle className="flex items-center group">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                    <CheckCircle className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                  </div>
                  Quality Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Pass Rate</span>
                    <span className="font-semibold">
                      {mockData.qualityMetrics.passRate}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Avg Processing Time
                    </span>
                    <span className="font-semibold">
                      {mockData.qualityMetrics.averageProcessingTime}h
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Customer Rating
                    </span>
                    <span className="font-semibold">
                      {mockData.qualityMetrics.customerSatisfaction}/5.0
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
