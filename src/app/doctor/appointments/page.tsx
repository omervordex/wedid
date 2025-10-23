"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  Plus,
  Search,
  CheckCircle,
  AlertCircle,
  Users,
  Phone,
  FileText,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Activity,
} from "lucide-react";
import Image from "next/image";

export default function DoctorAppointmentsPage() {
  const session = useSession();
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<
    "day" | "week" | "month" | "list" | "calendar"
  >("day");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAppointmentDetails, setShowAppointmentDetails] = useState<
    string | null
  >(null);

  // Handle case where session might be undefined during SSR
  if (!session) {
    return <div>Loading...</div>;
  }

  if (session.status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session.data || session.data.user.role !== "doctor") {
    router.push("/auth/login");
    return null;
  }

  // Mock appointments data
  const appointments = [
    {
      id: "1",
      patientName: "John Smith",
      patientAge: 34,
      patientEmail: "john.smith@email.com",
      date: new Date("2024-02-01T09:00:00"),
      duration: 45,
      type: "Initial Consultation",
      status: "confirmed" as const,
      meetingType: "video" as const,
      meetingLink: "https://meet.wedid.com/room/abc123",
      notes:
        "First consultation to discuss genetic test results and lifestyle recommendations",
      reason: "Discuss comprehensive health kit results",
      riskLevel: "medium" as const,
      kitType: "Comprehensive Health Kit",
      preparation: [
        "Review genetic test results",
        "Prepare lifestyle recommendations",
        "Check family history",
      ],
    },
    {
      id: "2",
      patientName: "Sarah Wilson",
      patientAge: 28,
      patientEmail: "sarah.wilson@email.com",
      date: new Date("2024-02-01T10:30:00"),
      duration: 30,
      type: "Follow-up",
      status: "confirmed" as const,
      meetingType: "video" as const,
      meetingLink: "https://meet.wedid.com/room/def456",
      notes: "Follow-up on nutrition plan implementation and exercise routine",
      reason: "Progress check on fitness optimization",
      riskLevel: "low" as const,
      kitType: "Basic Health Kit",
      preparation: [
        "Review progress notes",
        "Check fitness metrics",
        "Update recommendations",
      ],
    },
    {
      id: "3",
      patientName: "Michael Johnson",
      patientAge: 45,
      patientEmail: "michael.j@email.com",
      date: new Date("2024-02-01T14:00:00"),
      duration: 60,
      type: "Result Review",
      status: "pending" as const,
      meetingType: "in-person" as const,
      location: "WeDid Clinic, Room 203",
      notes:
        "Comprehensive review of premium package results, high-risk patient requiring detailed discussion",
      reason: "Premium package results and risk management",
      riskLevel: "high" as const,
      kitType: "Premium Coaching Package",
      preparation: [
        "Prepare detailed risk assessment",
        "Review cardiovascular markers",
        "Plan intervention strategy",
      ],
    },
    {
      id: "4",
      patientName: "Emily Davis",
      patientAge: 31,
      patientEmail: "emily.davis@email.com",
      date: new Date("2024-02-01T15:30:00"),
      duration: 45,
      type: "Consultation",
      status: "confirmed" as const,
      meetingType: "video" as const,
      meetingLink: "https://meet.wedid.com/room/ghi789",
      notes:
        "Discussion about anxiety-related genetic markers and stress management strategies",
      reason: "Mental health genetics and stress optimization",
      riskLevel: "medium" as const,
      kitType: "Comprehensive Health Kit",
      preparation: [
        "Review anxiety markers",
        "Prepare stress management plan",
        "Check medication interactions",
      ],
    },
    {
      id: "5",
      patientName: "Robert Chen",
      patientAge: 52,
      patientEmail: "robert.chen@email.com",
      date: new Date("2024-02-02T11:00:00"),
      duration: 30,
      type: "Follow-up",
      status: "completed" as const,
      meetingType: "video" as const,
      notes:
        "Completed follow-up on medication adjustments based on pharmacogenomics results",
      reason: "Medication optimization follow-up",
      riskLevel: "medium" as const,
      kitType: "Premium Coaching Package",
      preparation: [],
    },
  ];

  const todaysAppointments = appointments.filter(
    (apt) => apt.date.toDateString() === selectedDate.toDateString()
  );

  const upcomingAppointments = appointments.filter(
    (apt) => apt.date > new Date() && apt.status !== "completed"
  );

  const filteredAppointments = todaysAppointments.filter(
    (appointment) =>
      appointment.patientName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appointment.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (
    status: "confirmed" | "pending" | "completed" | "cancelled"
  ) => {
    switch (status) {
      case "confirmed":
        return "text-green-600 bg-green-50 border-green-200";
      case "pending":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "completed":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "cancelled":
        return "text-red-600 bg-red-50 border-red-200";
    }
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

  const selectedAppointment = appointments.find(
    (apt) => apt.id === showAppointmentDetails
  );

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(selectedDate);
    if (viewMode === "day") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1));
    } else if (viewMode === "week") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7));
    } else {
      newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1));
    }
    setSelectedDate(newDate);
  };

  if (showAppointmentDetails && selectedAppointment) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Button
              variant="outline"
              onClick={() => setShowAppointmentDetails(null)}
              className="mb-4"
            >
              ← Back to Calendar
            </Button>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Appointment Details
                </h1>
                <p className="text-gray-600 mt-2">
                  {selectedAppointment.patientName} •{" "}
                  {selectedAppointment.date.toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Add Notes
                </Button>
                {selectedAppointment.meetingType === "video" &&
                  selectedAppointment.meetingLink && (
                    <Button asChild>
                      <a
                        href={selectedAppointment.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Video className="w-4 h-4 mr-2" />
                        Join Call
                      </a>
                    </Button>
                  )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Appointment Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Patient
                        </label>
                        <p className="text-lg font-semibold">
                          {selectedAppointment.patientName}
                        </p>
                        <p className="text-sm text-gray-600">
                          {selectedAppointment.patientAge} years old
                        </p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Contact
                        </label>
                        <p className="text-sm">
                          {selectedAppointment.patientEmail}
                        </p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Appointment Type
                        </label>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline">
                            {selectedAppointment.type}
                          </Badge>
                          <Badge
                            className={getRiskColor(
                              selectedAppointment.riskLevel
                            )}
                          >
                            {selectedAppointment.riskLevel} risk
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Date & Time
                        </label>
                        <div className="flex items-center space-x-2 mt-1">
                          <Calendar className="w-4 h-4 text-gray-600" />
                          <span>
                            {selectedAppointment.date.toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <Clock className="w-4 h-4 text-gray-600" />
                          <span>
                            {selectedAppointment.date.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}{" "}
                            ({selectedAppointment.duration} min)
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Meeting Type
                        </label>
                        <div className="flex items-center space-x-2 mt-1">
                          {selectedAppointment.meetingType === "video" ? (
                            <Video className="w-4 h-4 text-gray-600" />
                          ) : (
                            <MapPin className="w-4 h-4 text-gray-600" />
                          )}
                          <span>
                            {selectedAppointment.meetingType === "video"
                              ? "Video consultation"
                              : selectedAppointment.location || "In-person"}
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Status
                        </label>
                        <div className="mt-1">
                          <Badge
                            className={getStatusColor(
                              selectedAppointment.status
                            )}
                          >
                            {selectedAppointment.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Reason for Visit</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{selectedAppointment.reason}</p>
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">Kit Information</h4>
                    <p className="text-sm text-gray-600">
                      {selectedAppointment.kitType}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Clinical Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-gray-50 rounded-lg mb-4">
                    <p className="text-sm text-gray-700">
                      {selectedAppointment.notes}
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <Button variant="outline" size="sm">
                      Edit Notes
                    </Button>
                    <Button variant="outline" size="sm">
                      Add Follow-up Note
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Preparation Checklist</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedAppointment.preparation.length > 0 ? (
                    <ul className="space-y-2">
                      {selectedAppointment.preparation.map((item, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">
                      No preparation items
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    View Patient Records
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Reschedule
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Patient
                  </Button>
                </CardContent>
              </Card>

              {selectedAppointment.riskLevel === "high" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Risk Alert</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-red-900">
                            High Risk Patient
                          </p>
                          <p className="text-xs text-red-700 mt-1">
                            Requires careful monitoring and detailed discussion
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                Doctor Appointments
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 animate-bounce-in animate-delay-200">
                Appointments
              </h1>
              <p className="text-gray-600 mt-2 animate-slide-up animate-delay-400">
                Manage your patient consultations and schedule
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Export Schedule
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Block Time
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Calendar */}
          <div className="lg:col-span-3 space-y-6">
            {/* Calendar Controls */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-600">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigateDate("prev")}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <h2 className="text-xl font-semibold">
                        {selectedDate.toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </h2>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigateDate("next")}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedDate(new Date())}
                    >
                      Today
                    </Button>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search appointments..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <div className="flex border rounded-lg">
                      {["day", "week", "month"].map((mode) => (
                        <Button
                          key={mode}
                          variant={viewMode === mode ? "default" : "ghost"}
                          size="sm"
                          onClick={() =>
                            setViewMode(mode as "list" | "calendar")
                          }
                          className="rounded-none first:rounded-l-lg last:rounded-r-lg"
                        >
                          {mode.charAt(0).toUpperCase() + mode.slice(1)}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Today's Appointments */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-800">
              <CardHeader>
                <CardTitle className="flex items-center group">
                  <div className="w-8 h-8 bg-gradient-to-br from-brand-100 to-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                    <Calendar className="w-5 h-5 text-brand-600 group-hover:scale-110 transition-transform" />
                  </div>
                  Today&apos;s Schedule ({filteredAppointments.length}{" "}
                  appointments)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {filteredAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {filteredAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() =>
                          setShowAppointmentDetails(appointment.id)
                        }
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {appointment.patientName}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {appointment.patientAge} years old •{" "}
                              {appointment.type}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge
                              className={getStatusColor(appointment.status)}
                            >
                              {appointment.status}
                            </Badge>
                            <Badge
                              className={getRiskColor(appointment.riskLevel)}
                            >
                              {appointment.riskLevel}
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-gray-600" />
                            <span className="text-sm">
                              {appointment.date.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}{" "}
                              ({appointment.duration} min)
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {appointment.meetingType === "video" ? (
                              <Video className="w-4 h-4 text-gray-600" />
                            ) : (
                              <MapPin className="w-4 h-4 text-gray-600" />
                            )}
                            <span className="text-sm">
                              {appointment.meetingType === "video"
                                ? "Video call"
                                : "In-person"}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">
                              {appointment.kitType}
                            </Badge>
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-3">
                          {appointment.reason}
                        </p>

                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">
                            {appointment.notes.substring(0, 80)}...
                          </span>
                          <div className="flex space-x-2">
                            {appointment.meetingType === "video" &&
                              appointment.meetingLink && (
                                <Button size="sm" asChild>
                                  <a
                                    href={appointment.meetingLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <Video className="w-4 h-4 mr-1" />
                                    Join
                                  </a>
                                </Button>
                              )}
                            <Button size="sm" variant="outline">
                              <FileText className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">
                      No appointments scheduled for today
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-1000">
              <CardHeader>
                <CardTitle className="flex items-center group">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-brand-100 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                    <Activity className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                  </div>
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Today&apos;s Appointments
                    </span>
                    <span className="font-semibold">
                      {todaysAppointments.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">This Week</span>
                    <span className="font-semibold">
                      {upcomingAppointments.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      High Risk Patients
                    </span>
                    <span className="font-semibold text-red-600">
                      {
                        appointments.filter((apt) => apt.riskLevel === "high")
                          .length
                      }
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-1200">
              <CardHeader>
                <CardTitle className="flex items-center group">
                  <div className="w-8 h-8 bg-gradient-to-br from-brand-100 to-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                    <Calendar className="w-5 h-5 text-brand-600 group-hover:scale-110 transition-transform" />
                  </div>
                  Upcoming Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingAppointments.slice(0, 3).map((appointment) => (
                    <div
                      key={appointment.id}
                      className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                      onClick={() => setShowAppointmentDetails(appointment.id)}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-medium text-sm">
                          {appointment.patientName}
                        </h4>
                        <Badge className={getRiskColor(appointment.riskLevel)}>
                          {appointment.riskLevel}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600">
                        {appointment.date.toLocaleDateString()} at{" "}
                        {appointment.date.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {appointment.type}
                      </p>
                    </div>
                  ))}
                  {upcomingAppointments.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">
                      No upcoming appointments
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-1400">
              <CardHeader>
                <CardTitle className="flex items-center group">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-brand-100 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                    <Plus className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                  </div>
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Appointment
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  View Full Calendar
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Patient List
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
