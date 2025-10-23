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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  Plus,
  CheckCircle,
  Users,
  Phone,
} from "lucide-react";
import Image from "next/image";
import { Sparkles } from "lucide-react";

export default function AppointmentsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [showBooking, setShowBooking] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [appointmentType, setAppointmentType] = useState("consultation");
  const [notes, setNotes] = useState("");

  if (!session || session.user.role !== "patient") {
    router.push("/auth/login");
    return null;
  }

  // Mock data
  const upcomingAppointments = [
    {
      id: "1",
      doctorName: "Dr. Sarah Johnson",
      doctorSpecialty: "Epigenetic Medicine",
      date: new Date("2024-02-01T14:00:00"),
      duration: 45,
      type: "Result Review",
      status: "confirmed" as const,
      meetingType: "video" as const,
      meetingLink: "https://meet.wedid.com/room/abc123",
      notes:
        "Discuss comprehensive health kit results and lifestyle recommendations",
    },
    {
      id: "2",
      doctorName: "Dr. Michael Chen",
      doctorSpecialty: "Nutrigenomics",
      date: new Date("2024-02-15T10:30:00"),
      duration: 30,
      type: "Follow-up",
      status: "pending" as const,
      meetingType: "in-person" as const,
      location: "WeDid Clinic, 123 Health St, San Francisco, CA",
      notes: "Follow-up on nutritional recommendations and progress check",
    },
  ];

  const pastAppointments = [
    {
      id: "3",
      doctorName: "Dr. Emily Rodriguez",
      doctorSpecialty: "Genetic Counseling",
      date: new Date("2024-01-20T11:00:00"),
      duration: 60,
      type: "Initial Consultation",
      status: "completed" as const,
      meetingType: "video" as const,
      notes:
        "Initial genetic counseling session - discussed family history and risk factors",
      summary:
        "Reviewed genetic predispositions and created action plan for health optimization.",
    },
  ];

  const availableDoctors = [
    {
      id: "dr-sarah-johnson",
      name: "Dr. Sarah Johnson",
      specialty: "Epigenetic Medicine",
      rating: 4.9,
      nextAvailable: "Tomorrow",
    },
    {
      id: "dr-michael-chen",
      name: "Dr. Michael Chen",
      specialty: "Nutrigenomics",
      rating: 4.8,
      nextAvailable: "Today",
    },
    {
      id: "dr-emily-rodriguez",
      name: "Dr. Emily Rodriguez",
      specialty: "Genetic Counseling",
      rating: 4.9,
      nextAvailable: "In 2 days",
    },
  ];

  const availableTimeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
  ];

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

  const handleBookAppointment = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate booking
    alert(
      `Appointment booked successfully!\nDoctor: ${
        availableDoctors.find((d) => d.id === selectedDoctor)?.name
      }\nDate: ${selectedDate}\nTime: ${selectedTime}`
    );

    setShowBooking(false);
    setSelectedDoctor(null);
    setSelectedDate("");
    setSelectedTime("");
    setNotes("");
  };

  if (showBooking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-50 to-white relative overflow-hidden animate-gradient-shift">
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-float"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-blue-200 rounded-full opacity-30 animate-float animate-delay-400"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-300 rounded-full opacity-25 animate-rotate-slow"></div>
          <div className="absolute bottom-40 right-1/3 w-14 h-14 bg-blue-300 rounded-full opacity-20 animate-float animate-delay-800"></div>
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
                <p className="text-xs text-blue-600 font-medium">
                  Book Appointment
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowBooking(false)}
              className="mb-4"
            >
              ← Back to Appointments
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 animate-bounce-in animate-delay-200">
              Book Appointment
            </h1>
            <p className="text-gray-600 mt-2 animate-slide-up animate-delay-400">
              Schedule a consultation with our experts
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Booking Form */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-600">
              <CardHeader>
                <CardTitle className="flex items-center group">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                    <Calendar className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                  </div>
                  Appointment Details
                </CardTitle>
                <CardDescription>
                  Fill in the details for your appointment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBookAppointment} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Doctor *
                    </label>
                    <div className="space-y-2">
                      {availableDoctors.map((doctor) => (
                        <div
                          key={doctor.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            selectedDoctor === doctor.id
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => setSelectedDoctor(doctor.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold">{doctor.name}</h3>
                              <p className="text-sm text-gray-600">
                                {doctor.specialty}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-500">
                                Available
                              </div>
                              <div className="text-sm font-medium">
                                {doctor.nextAvailable}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date *
                      </label>
                      <Input
                        type="date"
                        required
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Time *
                      </label>
                      <select
                        required
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select time</option>
                        {availableTimeSlots.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Appointment Type *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {[
                        { id: "consultation", label: "Consultation" },
                        { id: "follow-up", label: "Follow-up" },
                        { id: "result-review", label: "Result Review" },
                      ].map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          className={`p-3 border rounded-lg text-sm font-medium transition-all ${
                            appointmentType === type.id
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => setAppointmentType(type.id)}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notes (Optional)
                    </label>
                    <Textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any specific topics you'd like to discuss or questions you have..."
                      rows={4}
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={!selectedDoctor || !selectedDate || !selectedTime}
                  >
                    Book Appointment
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Booking Summary */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-800">
                <CardHeader>
                  <CardTitle className="flex items-center group">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                      <CheckCircle className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                    </div>
                    Booking Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedDoctor && selectedDate && selectedTime ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h3 className="font-semibold text-blue-900">
                          {
                            availableDoctors.find(
                              (d) => d.id === selectedDoctor
                            )?.name
                          }
                        </h3>
                        <p className="text-blue-700 text-sm">
                          {
                            availableDoctors.find(
                              (d) => d.id === selectedDoctor
                            )?.specialty
                          }
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-600" />
                          <span className="text-sm">
                            {new Date(selectedDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-600" />
                          <span className="text-sm">{selectedTime}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Video className="w-4 h-4 text-gray-600" />
                          <span className="text-sm">Video consultation</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">
                      Select appointment details to see summary
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-1000">
                <CardHeader>
                  <CardTitle className="flex items-center group">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                      <Users className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                    </div>
                    What to Expect
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Confirmation email with meeting link</li>
                    <li>• 15-minute buffer time before appointment</li>
                    <li>• Secure, HIPAA-compliant video platform</li>
                    <li>• Follow-up summary and recommendations</li>
                    <li>• Option to reschedule up to 24 hours before</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
              <p className="text-gray-600 mt-2">
                Manage your consultations with our medical experts
              </p>
            </div>
            <Button onClick={() => setShowBooking(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Book Appointment
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Appointments */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Your scheduled consultations</CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="p-4 border border-gray-200 rounded-lg"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {appointment.doctorName}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {appointment.doctorSpecialty}
                            </p>
                          </div>
                          <Badge className={getStatusColor(appointment.status)}>
                            {appointment.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-gray-600" />
                            <span className="text-sm">
                              {appointment.date.toLocaleDateString()}
                            </span>
                          </div>
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
                            <Badge variant="outline">{appointment.type}</Badge>
                          </div>
                        </div>

                        {appointment.notes && (
                          <p className="text-sm text-gray-600 mb-3">
                            {appointment.notes}
                          </p>
                        )}

                        <div className="flex space-x-3">
                          {appointment.meetingType === "video" &&
                            appointment.meetingLink && (
                              <Button size="sm" asChild>
                                <a
                                  href={appointment.meetingLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Video className="w-4 h-4 mr-2" />
                                  Join Call
                                </a>
                              </Button>
                            )}
                          <Button size="sm" variant="outline">
                            Reschedule
                          </Button>
                          <Button size="sm" variant="outline">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No upcoming appointments</p>
                    <Button
                      onClick={() => setShowBooking(true)}
                      className="mt-4"
                    >
                      Book Your First Appointment
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Past Appointments */}
            <Card>
              <CardHeader>
                <CardTitle>Past Appointments</CardTitle>
                <CardDescription>Your appointment history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pastAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="p-4 border border-gray-200 rounded-lg bg-gray-50"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {appointment.doctorName}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {appointment.doctorSpecialty}
                          </p>
                        </div>
                        <Badge className={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-600" />
                          <span className="text-sm">
                            {appointment.date.toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-600" />
                          <span className="text-sm">
                            {appointment.duration} minutes
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{appointment.type}</Badge>
                        </div>
                      </div>

                      {appointment.summary && (
                        <div className="p-3 bg-white rounded border">
                          <h4 className="font-medium text-sm mb-1">Summary:</h4>
                          <p className="text-sm text-gray-600">
                            {appointment.summary}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
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
                <Button
                  onClick={() => setShowBooking(true)}
                  className="w-full justify-start"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Book New Appointment
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="w-4 h-4 mr-2" />
                  Emergency Contact
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  View All Doctors
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Appointment Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Prepare questions in advance</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Have your test results ready</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Join 5 minutes early for video calls</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Take notes during consultation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
