"use client";

import { useState } from "react";

// Force dynamic rendering for this page
export const dynamic = "force-dynamic";
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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Users,
  Search,
  Filter,
  Calendar,
  MessageSquare,
  FileText,
  Activity,
  Phone,
  Mail,
  AlertTriangle,
  CheckCircle,
  Clock,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

export default function DoctorPatientsPage() {
  const sessionResult = useSession();
  const session = sessionResult?.data;
  const status = sessionResult?.status || "loading";
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);

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
    router.push("/auth/login");
    return null;
  }

  // Mock patients data
  const patients = [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+1 (555) 123-4567",
      age: 34,
      gender: "Male",
      joinDate: new Date("2024-01-15"),
      lastVisit: new Date("2024-01-20"),
      status: "active" as const,
      riskLevel: "medium" as const,
      currentKit: "Comprehensive Health Kit",
      kitStatus: "results_available" as const,
      upcomingAppointment: new Date("2024-02-01T14:00:00"),
      totalAppointments: 3,
      notes:
        "Patient shows good compliance with recommendations. Interested in nutritional optimization.",
      conditions: ["Hypertension", "Pre-diabetes"],
      medications: ["Lisinopril 10mg", "Metformin 500mg"],
    },
    {
      id: "2",
      name: "Sarah Wilson",
      email: "sarah.wilson@email.com",
      phone: "+1 (555) 234-5678",
      age: 28,
      gender: "Female",
      joinDate: new Date("2024-01-10"),
      lastVisit: new Date("2024-01-25"),
      status: "active" as const,
      riskLevel: "low" as const,
      currentKit: "Basic Health Kit",
      kitStatus: "processing" as const,
      upcomingAppointment: null,
      totalAppointments: 2,
      notes:
        "Young professional, very health-conscious. Primarily interested in fitness optimization.",
      conditions: [],
      medications: [],
    },
    {
      id: "3",
      name: "Michael Johnson",
      email: "michael.j@email.com",
      phone: "+1 (555) 345-6789",
      age: 45,
      gender: "Male",
      joinDate: new Date("2023-12-20"),
      lastVisit: new Date("2024-01-18"),
      status: "inactive" as const,
      riskLevel: "high" as const,
      currentKit: "Premium Coaching Package",
      kitStatus: "completed" as const,
      upcomingAppointment: null,
      totalAppointments: 5,
      notes:
        "Requires close monitoring. Family history of cardiovascular disease.",
      conditions: ["Cardiovascular Disease", "High Cholesterol"],
      medications: ["Atorvastatin 20mg", "Aspirin 81mg"],
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily.davis@email.com",
      phone: "+1 (555) 456-7890",
      age: 31,
      gender: "Female",
      joinDate: new Date("2024-01-05"),
      lastVisit: new Date("2024-01-22"),
      status: "active" as const,
      riskLevel: "medium" as const,
      currentKit: "Comprehensive Health Kit",
      kitStatus: "sample_received" as const,
      upcomingAppointment: new Date("2024-02-15T10:30:00"),
      totalAppointments: 1,
      notes: "First-time patient, very engaged and asks detailed questions.",
      conditions: ["Anxiety"],
      medications: ["Sertraline 50mg"],
    },
  ];

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "all" || patient.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const selectedPatientData = patients.find((p) => p.id === selectedPatient);

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

  const getKitStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-50 border-green-200";
      case "results_available":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "processing":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "sample_received":
        return "text-purple-600 bg-purple-50 border-purple-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getKitStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "results_available":
        return "Results Available";
      case "processing":
        return "Processing";
      case "sample_received":
        return "Sample Received";
      default:
        return "Unknown";
    }
  };

  if (selectedPatient && selectedPatientData) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Button
              variant="outline"
              onClick={() => setSelectedPatient(null)}
              className="mb-4"
            >
              ← Back to Patients
            </Button>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {selectedPatientData.name}
                </h1>
                <p className="text-gray-600 mt-2">Patient Details</p>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                <Button>
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Appointment
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Patient Overview */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Patient Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Contact Information
                        </label>
                        <div className="mt-1 space-y-2">
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4 text-gray-600" />
                            <span className="text-sm">
                              {selectedPatientData.email}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-gray-600" />
                            <span className="text-sm">
                              {selectedPatientData.phone}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Demographics
                        </label>
                        <div className="mt-1 space-y-1">
                          <p className="text-sm">
                            Age: {selectedPatientData.age}
                          </p>
                          <p className="text-sm">
                            Gender: {selectedPatientData.gender}
                          </p>
                          <p className="text-sm">
                            Patient since:{" "}
                            {selectedPatientData.joinDate.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Health Status
                        </label>
                        <div className="mt-1 space-y-2">
                          <Badge
                            className={getRiskColor(
                              selectedPatientData.riskLevel
                            )}
                          >
                            {selectedPatientData.riskLevel.toUpperCase()} RISK
                          </Badge>
                          <Badge
                            className={`${
                              selectedPatientData.status === "active"
                                ? "bg-green-50 text-green-700"
                                : "bg-gray-50 text-gray-700"
                            }`}
                          >
                            {selectedPatientData.status.toUpperCase()}
                          </Badge>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Current Kit
                        </label>
                        <div className="mt-1 space-y-2">
                          <p className="text-sm font-medium">
                            {selectedPatientData.currentKit}
                          </p>
                          <Badge
                            className={getKitStatusColor(
                              selectedPatientData.kitStatus
                            )}
                          >
                            {getKitStatusLabel(selectedPatientData.kitStatus)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Medical Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Medical Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-gray-500 mb-2 block">
                        Current Conditions
                      </label>
                      {selectedPatientData.conditions.length > 0 ? (
                        <div className="space-y-2">
                          {selectedPatientData.conditions.map(
                            (condition, index) => (
                              <div
                                key={index}
                                className="p-2 bg-red-50 border border-red-200 rounded-lg"
                              >
                                <span className="text-sm text-red-800">
                                  {condition}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">
                          No current conditions
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500 mb-2 block">
                        Current Medications
                      </label>
                      {selectedPatientData.medications.length > 0 ? (
                        <div className="space-y-2">
                          {selectedPatientData.medications.map(
                            (medication, index) => (
                              <div
                                key={index}
                                className="p-2 bg-blue-50 border border-blue-200 rounded-lg"
                              >
                                <span className="text-sm text-blue-800">
                                  {medication}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">
                          No current medications
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notes */}
              <Card>
                <CardHeader>
                  <CardTitle>Clinical Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      {selectedPatientData.notes}
                    </p>
                  </div>
                  <div className="mt-4 flex space-x-3">
                    <Button variant="outline" size="sm">
                      Edit Notes
                    </Button>
                    <Button variant="outline" size="sm">
                      Add Note
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Appointment
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    View Test Results
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Activity className="w-4 h-4 mr-2" />
                    View History
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Appointment Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Total Appointments
                      </span>
                      <span className="font-semibold">
                        {selectedPatientData.totalAppointments}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Last Visit</span>
                      <span className="font-semibold">
                        {selectedPatientData.lastVisit.toLocaleDateString()}
                      </span>
                    </div>
                    {selectedPatientData.upcomingAppointment && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          Next Appointment
                        </span>
                        <span className="font-semibold">
                          {selectedPatientData.upcomingAppointment.toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Risk Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedPatientData.riskLevel === "high" ? (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-red-900">
                            High Risk Patient
                          </p>
                          <p className="text-xs text-red-700 mt-1">
                            Requires close monitoring and regular follow-ups
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-green-900">
                            No Active Alerts
                          </p>
                          <p className="text-xs text-green-700 mt-1">
                            Patient is following recommendations well
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
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
                Doctor Patients
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 animate-bounce-in animate-delay-200">
                My Patients
              </h1>
              <p className="text-gray-600 mt-2 animate-slide-up animate-delay-400">
                Manage and monitor your patient care
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Export List
              </Button>
              <Button>
                <Users className="w-4 h-4 mr-2" />
                Add Patient
              </Button>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <Card className="mb-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-600">
          <CardHeader>
            <CardTitle className="flex items-center group">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-100 to-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                <Search className="w-5 h-5 text-brand-600 group-hover:scale-110 transition-transform" />
              </div>
              Patient Search & Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search patients by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex space-x-3">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="all">All Patients</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Patients List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPatients.map((patient, index) => (
            <Card
              key={patient.id}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer animate-bounce-in"
              style={{ animationDelay: `${800 + index * 200}ms` }}
              onClick={() => setSelectedPatient(patient.id)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-brand-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{patient.name}</CardTitle>
                      <CardDescription>
                        {patient.age} years old, {patient.gender}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className={getRiskColor(patient.riskLevel)}>
                    {patient.riskLevel}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Kit Status:</span>
                    <Badge className={getKitStatusColor(patient.kitStatus)}>
                      {getKitStatusLabel(patient.kitStatus)}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Last Visit:</span>
                    <span className="font-medium">
                      {patient.lastVisit.toLocaleDateString()}
                    </span>
                  </div>

                  {patient.upcomingAppointment && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Next Appointment:</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-green-600" />
                        <span className="font-medium text-green-600">
                          {patient.upcomingAppointment.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="pt-2 border-t">
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {patient.notes}
                    </p>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <Badge
                      variant={
                        patient.status === "active" ? "default" : "secondary"
                      }
                    >
                      {patient.status}
                    </Badge>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <MessageSquare className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Calendar className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPatients.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                No patients found matching your criteria
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
