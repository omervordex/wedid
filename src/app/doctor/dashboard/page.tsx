"use client";

// Force dynamic rendering for this page
export const dynamic = "force-dynamic";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthSession } from "@/lib/useAuthSession";
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
  Calendar,
  FileText,
  MessageSquare,
  ClipboardCheck,
  Activity,
  Sparkles,
  UserCheck,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function DoctorDashboard() {
  const { session, status } = useAuthSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Still loading

    if (!session) {
      router.push("/auth/login");
      return;
    }

    if (session.user.role !== "doctor") {
      // Redirect to appropriate dashboard based on role
      switch (session.user.role) {
        case "patient":
          router.push("/patient/dashboard");
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

  if (!session || session.user.role !== "doctor") {
    return null;
  }

  // Mock data - in a real app, this would come from your API
  const mockData = {
    todayStats: {
      totalPatients: 127,
      todayAppointments: 8,
      pendingReviews: 12,
      unreadMessages: 5,
    },
    recentPatients: [
      {
        id: "1",
        name: "John Smith",
        lastVisit: new Date("2024-01-20"),
        riskLevel: "medium" as const,
        status: "active",
      },
      {
        id: "2",
        name: "Sarah Wilson",
        lastVisit: new Date("2024-01-18"),
        riskLevel: "low" as const,
        status: "active",
      },
    ],
    todayAppointments: [
      {
        id: "1",
        patientName: "Michael Johnson",
        time: "10:00 AM",
        type: "Consultation",
        duration: 30,
      },
      {
        id: "2",
        patientName: "Emily Davis",
        time: "2:30 PM",
        type: "Result Review",
        duration: 45,
      },
    ],
    pendingReviews: [
      {
        id: "1",
        patientName: "Robert Brown",
        kitNumber: "WD-240120-X9Y2",
        submittedAt: new Date("2024-01-20"),
      },
    ],
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
                Doctor Dashboard
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 mb-4 animate-bounce-in animate-delay-200">
            <UserCheck className="w-6 h-6 text-blue-600 animate-pulse" />
            <h1 className="text-3xl font-bold text-gray-900">
              Good morning,{" "}
              <span className="text-blue-600">{session.user.name}</span>
            </h1>
          </div>
          <p className="text-gray-600 mt-2 animate-slide-up animate-delay-400">
            Here&apos;s your patient overview for today
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-bounce-in animate-delay-200 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium group-hover:text-blue-600 transition-colors">
                Total Patients
              </CardTitle>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center group-hover:animate-pulse-glow transition-all">
                <Users className="h-4 w-4 text-blue-600 group-hover:scale-110 transition-transform" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {mockData.todayStats.totalPatients}
              </div>
              <p className="text-xs text-muted-foreground">Under your care</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-bounce-in animate-delay-400 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium group-hover:text-blue-600 transition-colors">
                Today&apos;s Appointments
              </CardTitle>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center group-hover:animate-pulse-glow transition-all">
                <Calendar className="h-4 w-4 text-blue-600 group-hover:scale-110 transition-transform" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {mockData.todayStats.todayAppointments}
              </div>
              <p className="text-xs text-muted-foreground">
                Scheduled for today
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-bounce-in animate-delay-600 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium group-hover:text-blue-600 transition-colors">
                Pending Reviews
              </CardTitle>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center group-hover:animate-pulse-glow transition-all">
                <ClipboardCheck className="h-4 w-4 text-blue-600 group-hover:scale-110 transition-transform" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {mockData.todayStats.pendingReviews}
              </div>
              <p className="text-xs text-muted-foreground">Results to review</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-bounce-in animate-delay-800 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium group-hover:text-blue-600 transition-colors">
                Messages
              </CardTitle>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center group-hover:animate-pulse-glow transition-all">
                <MessageSquare className="h-4 w-4 text-blue-600 group-hover:scale-110 transition-transform" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {mockData.todayStats.unreadMessages}
              </div>
              <p className="text-xs text-muted-foreground">Unread messages</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Today's Schedule */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-1000">
              <CardHeader>
                <CardTitle className="flex items-center group">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                    <Calendar className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                  </div>
                  Today&apos;s Schedule
                </CardTitle>
                <CardDescription>Your appointments for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.todayAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-300 hover:scale-105 group"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-brand-600" />
                        </div>
                        <div>
                          <p className="font-medium">
                            {appointment.patientName}
                          </p>
                          <p className="text-sm text-gray-600">
                            {appointment.type}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{appointment.time}</p>
                        <p className="text-sm text-gray-600">
                          {appointment.duration} min
                        </p>
                      </div>
                    </div>
                  ))}

                  <Button className="w-full mt-4" variant="outline" asChild>
                    <Link href="/doctor/appointments">
                      View All Appointments
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Pending Reviews */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-1200">
              <CardHeader>
                <CardTitle className="flex items-center group">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                    <Activity className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
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
                  <Link href="/doctor/patients">
                    <Users className="w-4 h-4 mr-2" />
                    View Patients
                  </Link>
                </Button>
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  asChild
                >
                  <Link href="/doctor/review-results">
                    <ClipboardCheck className="w-4 h-4 mr-2" />
                    Review Results
                  </Link>
                </Button>
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  asChild
                >
                  <Link href="/doctor/reports">
                    <FileText className="w-4 h-4 mr-2" />
                    Create Report
                  </Link>
                </Button>
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  asChild
                >
                  <Link href="/doctor/messages">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Messages
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-1400">
              <CardHeader>
                <CardTitle className="flex items-center group">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                    <ClipboardCheck className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                  </div>
                  Pending Reviews
                </CardTitle>
                <CardDescription>
                  Test results waiting for your review
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockData.pendingReviews.map((review) => (
                    <div
                      key={review.id}
                      className="p-3 border border-gray-200 rounded-lg"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-medium text-sm">
                          {review.patientName}
                        </p>
                        <Badge variant="outline">Pending</Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">
                        Kit: {review.kitNumber}
                      </p>
                      <p className="text-xs text-gray-500">
                        Submitted: {review.submittedAt.toLocaleDateString()}
                      </p>
                    </div>
                  ))}

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-3"
                    asChild
                  >
                    <Link href="/doctor/review-results">Review All</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-1600">
              <CardHeader>
                <CardTitle className="flex items-center group">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                    <Users className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                  </div>
                  Recent Patients
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockData.recentPatients.map((patient) => (
                    <div
                      key={patient.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <Users className="w-4 h-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{patient.name}</p>
                          <p className="text-xs text-gray-600">
                            Last visit: {patient.lastVisit.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Badge
                        className={`${getRiskColor(patient.riskLevel)} text-xs`}
                      >
                        {patient.riskLevel}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
