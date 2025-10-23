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
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  UserPlus,
  Users,
  Shield,
  Mail,
  Phone,
  MapPin,
  Activity,
  Ban,
  CheckCircle,
  Sparkles,
  FileText,
  Settings,
  Calendar,
} from "lucide-react";
import Image from "next/image";

export default function AdminUsersPage() {
  const sessionResult = useSession();
  const session = sessionResult?.data;
  const status = sessionResult?.status || "loading";
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "patient",
    phone: "",
    address: "",
    notes: "",
  });

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
    router.push("/auth/login");
    return null;
  }

  // Mock users data
  const users = [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@email.com",
      role: "patient" as const,
      status: "active" as const,
      phone: "+1 (555) 123-4567",
      address: "123 Main St, San Francisco, CA 94102",
      joinDate: new Date("2024-01-15"),
      lastLogin: new Date("2024-01-29T10:30:00"),
      totalOrders: 2,
      totalAppointments: 3,
      notes: "Regular patient, good compliance with recommendations",
      avatar: "/api/placeholder/150/150",
    },
    {
      id: "2",
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@wedid.com",
      role: "doctor" as const,
      status: "active" as const,
      phone: "+1 (555) 234-5678",
      address: "456 Medical Center Dr, San Francisco, CA 94103",
      joinDate: new Date("2023-12-01"),
      lastLogin: new Date("2024-01-29T14:15:00"),
      specialization: "Epigenetic Medicine",
      patientsCount: 45,
      appointmentsCount: 120,
      notes: "Senior doctor, specializes in cardiovascular genetics",
      avatar: "/api/placeholder/150/150",
    },
    {
      id: "3",
      name: "Lab Tech Mike",
      email: "mike.lab@wedid.com",
      role: "lab" as const,
      status: "active" as const,
      phone: "+1 (555) 345-6789",
      address: "789 Lab Complex, San Francisco, CA 94104",
      joinDate: new Date("2024-01-01"),
      lastLogin: new Date("2024-01-29T08:45:00"),
      samplesProcessed: 156,
      batchesCompleted: 12,
      notes: "Experienced lab technician, excellent quality control record",
      avatar: "/api/placeholder/150/150",
    },
    {
      id: "4",
      name: "Admin User",
      email: "admin@wedid.com",
      role: "admin" as const,
      status: "active" as const,
      phone: "+1 (555) 456-7890",
      address: "321 Admin Plaza, San Francisco, CA 94105",
      joinDate: new Date("2023-11-15"),
      lastLogin: new Date("2024-01-29T16:20:00"),
      notes: "System administrator with full access privileges",
      avatar: "/api/placeholder/150/150",
    },
    {
      id: "5",
      name: "Emily Davis",
      email: "emily.davis@email.com",
      role: "patient" as const,
      status: "inactive" as const,
      phone: "+1 (555) 567-8901",
      address: "654 Oak Ave, San Francisco, CA 94106",
      joinDate: new Date("2024-01-05"),
      lastLogin: new Date("2024-01-20T12:00:00"),
      totalOrders: 1,
      totalAppointments: 1,
      notes: "New patient, completed initial consultation",
      avatar: "/api/placeholder/150/150",
    },
    {
      id: "6",
      name: "Dr. Michael Chen",
      email: "michael.chen@wedid.com",
      role: "doctor" as const,
      status: "suspended" as const,
      phone: "+1 (555) 678-9012",
      address: "987 Health St, San Francisco, CA 94107",
      joinDate: new Date("2023-10-20"),
      lastLogin: new Date("2024-01-15T09:30:00"),
      specialization: "Nutrigenomics",
      patientsCount: 32,
      appointmentsCount: 85,
      notes: "Temporarily suspended pending review",
      avatar: "/api/placeholder/150/150",
    },
  ];

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesStatus =
      filterStatus === "all" || user.status === filterStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const selectedUserData = users.find((u) => u.id === selectedUser);

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "text-purple-600 bg-purple-50 border-purple-200";
      case "doctor":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "lab":
        return "text-green-600 bg-green-50 border-green-200";
      case "patient":
        return "text-gray-600 bg-gray-50 border-gray-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-50 border-green-200";
      case "inactive":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "suspended":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const handleCreateUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.role) {
      alert("Please fill in all required fields");
      return;
    }

    // Mock user creation
    const user = {
      ...newUser,
      id: Date.now().toString(),
      status: "active",
      joinDate: new Date(),
      lastLogin: null,
    };

    console.log("Creating user:", user);
    alert(`User "${newUser.name}" created successfully!`);

    // Reset form
    setNewUser({
      name: "",
      email: "",
      role: "patient",
      phone: "",
      address: "",
      notes: "",
    });
    setShowCreateUser(false);
  };

  const handleUserAction = (action: string, userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return;

    switch (action) {
      case "activate":
        alert(`User ${user.name} has been activated`);
        break;
      case "suspend":
        alert(`User ${user.name} has been suspended`);
        break;
      case "delete":
        if (confirm(`Are you sure you want to delete ${user.name}?`)) {
          alert(`User ${user.name} has been deleted`);
        }
        break;
    }
  };

  const userStats = {
    total: users.length,
    active: users.filter((u) => u.status === "active").length,
    patients: users.filter((u) => u.role === "patient").length,
    doctors: users.filter((u) => u.role === "doctor").length,
    lab: users.filter((u) => u.role === "lab").length,
    admin: users.filter((u) => u.role === "admin").length,
  };

  if (selectedUser && selectedUserData) {
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
                  Admin Users
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={() => setSelectedUser(null)}
              className="mb-4"
            >
              ← Back to Users
            </Button>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 animate-bounce-in animate-delay-200">
                  {selectedUserData.name}
                </h1>
                <p className="text-gray-600 mt-2 animate-slide-up animate-delay-400">
                  User Profile & Management
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Badge className={getRoleColor(selectedUserData.role)}>
                  {selectedUserData.role.toUpperCase()}
                </Badge>
                <Badge className={getStatusColor(selectedUserData.status)}>
                  {selectedUserData.status.toUpperCase()}
                </Badge>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  {selectedUserData.status === "active" ? (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() =>
                        handleUserAction("suspend", selectedUserData.id)
                      }
                    >
                      <Ban className="w-4 h-4 mr-1" />
                      Suspend
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() =>
                        handleUserAction("activate", selectedUserData.id)
                      }
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Activate
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* User Information */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-600">
                <CardHeader>
                  <CardTitle className="flex items-center group">
                    <div className="w-8 h-8 bg-gradient-to-br from-brand-100 to-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                      <Users className="w-5 h-5 text-brand-600 group-hover:scale-110 transition-transform" />
                    </div>
                    User Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                          <Users className="w-8 h-8 text-gray-500" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">
                            {selectedUserData.name}
                          </h3>
                          <p className="text-gray-600">
                            {selectedUserData.email}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-gray-600" />
                          <span className="text-sm">
                            {selectedUserData.phone || "Not provided"}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-600" />
                          <span className="text-sm">
                            {selectedUserData.address || "Not provided"}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-600" />
                          <span className="text-sm">
                            Joined:{" "}
                            {selectedUserData.joinDate.toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Activity className="w-4 h-4 text-gray-600" />
                          <span className="text-sm">
                            Last login:{" "}
                            {selectedUserData.lastLogin
                              ? selectedUserData.lastLogin.toLocaleString()
                              : "Never"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Role-specific information */}
                      {selectedUserData.role === "patient" && (
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-900">
                            Patient Statistics
                          </h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 bg-blue-50 rounded-lg">
                              <div className="text-2xl font-bold text-blue-600">
                                {selectedUserData.totalOrders || 0}
                              </div>
                              <div className="text-sm text-blue-700">
                                Total Orders
                              </div>
                            </div>
                            <div className="p-3 bg-green-50 rounded-lg">
                              <div className="text-2xl font-bold text-green-600">
                                {selectedUserData.totalAppointments || 0}
                              </div>
                              <div className="text-sm text-green-700">
                                Appointments
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {selectedUserData.role === "doctor" && (
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-900">
                            Doctor Statistics
                          </h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">
                                Specialization:
                              </span>
                              <span className="text-sm font-medium">
                                {selectedUserData.specialization || "General"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">
                                Patients:
                              </span>
                              <span className="text-sm font-medium">
                                {selectedUserData.patientsCount || 0}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">
                                Appointments:
                              </span>
                              <span className="text-sm font-medium">
                                {selectedUserData.appointmentsCount || 0}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {selectedUserData.role === "lab" && (
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-900">
                            Lab Statistics
                          </h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 bg-purple-50 rounded-lg">
                              <div className="text-2xl font-bold text-purple-600">
                                {selectedUserData.samplesProcessed || 0}
                              </div>
                              <div className="text-sm text-purple-700">
                                Samples Processed
                              </div>
                            </div>
                            <div className="p-3 bg-indigo-50 rounded-lg">
                              <div className="text-2xl font-bold text-indigo-600">
                                {selectedUserData.batchesCompleted || 0}
                              </div>
                              <div className="text-sm text-indigo-700">
                                Batches Completed
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notes */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-800">
                <CardHeader>
                  <CardTitle className="flex items-center group">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-brand-100 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                      <FileText className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                    </div>
                    Admin Notes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      {selectedUserData.notes || "No notes available"}
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

              {/* Activity Log */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-1000">
                <CardHeader>
                  <CardTitle className="flex items-center group">
                    <div className="w-8 h-8 bg-gradient-to-br from-brand-100 to-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                      <Activity className="w-5 h-5 text-brand-600 group-hover:scale-110 transition-transform" />
                    </div>
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">Logged in</p>
                        <p className="text-xs text-gray-500">
                          {selectedUserData.lastLogin?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">Profile updated</p>
                        <p className="text-xs text-gray-500">2 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">Account created</p>
                        <p className="text-xs text-gray-500">
                          {selectedUserData.joinDate.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-1200">
                <CardHeader>
                  <CardTitle className="flex items-center group">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-brand-100 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                      <Settings className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                    </div>
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="w-4 h-4 mr-2" />
                    Reset Password
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-full justify-start"
                    onClick={() =>
                      handleUserAction("delete", selectedUserData.id)
                    }
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete User
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-1400">
                <CardHeader>
                  <CardTitle className="flex items-center group">
                    <div className="w-8 h-8 bg-gradient-to-br from-brand-100 to-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                      <Shield className="w-5 h-5 text-brand-600 group-hover:scale-110 transition-transform" />
                    </div>
                    Account Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Status</span>
                      <Badge
                        className={getStatusColor(selectedUserData.status)}
                      >
                        {selectedUserData.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Role</span>
                      <Badge className={getRoleColor(selectedUserData.role)}>
                        {selectedUserData.role}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Account Age</span>
                      <span className="text-sm font-medium">
                        {Math.floor(
                          (new Date().getTime() -
                            selectedUserData.joinDate.getTime()) /
                            (1000 * 60 * 60 * 24)
                        )}{" "}
                        days
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

  if (showCreateUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-50 via-blue-50 to-white relative overflow-hidden animate-gradient-shift">
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-float"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-brand-200 rounded-full opacity-30 animate-float animate-delay-400"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-300 rounded-full opacity-25 animate-rotate-slow"></div>
          <div className="absolute bottom-40 right-1/3 w-14 h-14 bg-brand-300 rounded-full opacity-20 animate-float animate-delay-800"></div>
        </div>

        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 relative z-10">
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
                  Admin Users
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={() => setShowCreateUser(false)}
              className="mb-4"
            >
              ← Back to Users
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 animate-bounce-in animate-delay-200">
              Create New User
            </h1>
            <p className="text-gray-600 mt-2 animate-slide-up animate-delay-400">
              Add a new user to the system
            </p>
          </div>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-600">
            <CardHeader>
              <CardTitle className="flex items-center group">
                <div className="w-8 h-8 bg-gradient-to-br from-brand-100 to-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                  <UserPlus className="w-5 h-5 text-brand-600 group-hover:scale-110 transition-transform" />
                </div>
                User Information
              </CardTitle>
              <CardDescription>
                Fill in the details for the new user account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <Input
                    required
                    value={newUser.name}
                    onChange={(e) =>
                      setNewUser({ ...newUser, name: e.target.value })
                    }
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <Input
                    required
                    type="email"
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                    placeholder="Enter email address"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role *
                  </label>
                  <select
                    value={newUser.role}
                    onChange={(e) =>
                      setNewUser({ ...newUser, role: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                    <option value="lab">Lab Technician</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    value={newUser.phone}
                    onChange={(e) =>
                      setNewUser({ ...newUser, phone: e.target.value })
                    }
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <Input
                  value={newUser.address}
                  onChange={(e) =>
                    setNewUser({ ...newUser, address: e.target.value })
                  }
                  placeholder="Enter address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <Textarea
                  value={newUser.notes}
                  onChange={(e) =>
                    setNewUser({ ...newUser, notes: e.target.value })
                  }
                  placeholder="Add any notes about this user..."
                  rows={4}
                />
              </div>

              <div className="flex space-x-4 pt-4 border-t">
                <Button
                  onClick={handleCreateUser}
                  disabled={!newUser.name || !newUser.email || !newUser.role}
                  className="flex-1"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Create User
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowCreateUser(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
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
              <p className="text-xs text-brand-600 font-medium">Admin Users</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 animate-bounce-in animate-delay-200">
                User Management
              </h1>
              <p className="text-gray-600 mt-2 animate-slide-up animate-delay-400">
                Manage system users and their permissions
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Export Users
              </Button>
              <Button onClick={() => setShowCreateUser(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-bounce-in animate-delay-600 group">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-brand-600">
                {userStats.total}
              </div>
              <div className="text-sm text-gray-600">Total Users</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-bounce-in animate-delay-800 group">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">
                {userStats.active}
              </div>
              <div className="text-sm text-gray-600">Active</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-bounce-in animate-delay-1000 group">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-gray-600">
                {userStats.patients}
              </div>
              <div className="text-sm text-gray-600">Patients</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-bounce-in animate-delay-1200 group">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">
                {userStats.doctors}
              </div>
              <div className="text-sm text-gray-600">Doctors</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-bounce-in animate-delay-1400 group">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">
                {userStats.lab}
              </div>
              <div className="text-sm text-gray-600">Lab Staff</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-bounce-in animate-delay-1600 group">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-600">
                {userStats.admin}
              </div>
              <div className="text-sm text-gray-600">Admins</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-1800">
          <CardHeader>
            <CardTitle className="flex items-center group">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-100 to-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                <Search className="w-5 h-5 text-brand-600 group-hover:scale-110 transition-transform" />
              </div>
              Filter Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search users by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex space-x-3">
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="all">All Roles</option>
                  <option value="patient">Patients</option>
                  <option value="doctor">Doctors</option>
                  <option value="lab">Lab Staff</option>
                  <option value="admin">Admins</option>
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users List */}
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-2000">
          <CardHeader>
            <CardTitle className="flex items-center group">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-brand-100 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                <Users className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
              </div>
              Users ({filteredUsers.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredUsers.map((user, index) => (
                <div
                  key={user.id}
                  className="p-4 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer animate-bounce-in"
                  style={{ animationDelay: `${2200 + index * 200}ms` }}
                  onClick={() => setSelectedUser(user.id)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-gray-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {user.name}
                        </h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getRoleColor(user.role)}>
                        {user.role}
                      </Badge>
                      <Badge className={getStatusColor(user.status)}>
                        {user.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Joined:</span>
                      <span className="ml-1 font-medium">
                        {user.joinDate.toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Last Login:</span>
                      <span className="ml-1 font-medium">
                        {user.lastLogin
                          ? user.lastLogin.toLocaleDateString()
                          : "Never"}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Phone:</span>
                      <span className="ml-1 font-medium">
                        {user.phone || "Not provided"}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUserAction("delete", user.id);
                        }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredUsers.length === 0 && (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
                    No users found matching your criteria
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
