"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Sparkles,
  UserPlus,
  MapPin,
  GraduationCap,
  Award,
  ArrowLeft,
  Save,
} from "lucide-react";

export default function AddDoctorPage() {
  useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialization: "",
    licenseNumber: "",
    yearsOfExperience: "",
    education: "",
    certifications: "",
    bio: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    languages: "",
    consultationFee: "",
    availability: "available",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    alert("Doctor added successfully!");
    setIsSubmitting(false);
    router.push("/admin/dashboard");
  };

  const isFormValid = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.phone &&
      formData.specialization &&
      formData.licenseNumber &&
      formData.yearsOfExperience &&
      formData.education
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-blue-50 to-white relative overflow-hidden animate-gradient-shift">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-brand-200 rounded-full opacity-30 animate-float animate-delay-400"></div>
        <div className="absolute bottom-20 left-1/3 w-12 h-12 bg-blue-300 rounded-full opacity-25 animate-rotate-slow"></div>
        <div className="absolute bottom-40 right-1/4 w-14 h-14 bg-brand-300 rounded-full opacity-20 animate-float animate-delay-800"></div>
      </div>

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
        </div>

        {/* Header */}
        <div className="mb-8 animate-slide-up">
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
                Add New Doctor
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 mb-4 animate-bounce-in animate-delay-200">
            <UserPlus className="w-8 h-8 text-brand-600 animate-pulse" />
            <h1 className="text-3xl font-bold text-gray-900">Add New Doctor</h1>
          </div>
          <p className="text-gray-600 mt-2 animate-slide-up animate-delay-400">
            Register a new doctor to join our platform
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-600">
            <CardHeader>
              <CardTitle className="flex items-center group">
                <div className="w-8 h-8 bg-gradient-to-br from-brand-100 to-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                  <UserPlus className="w-5 h-5 text-brand-600 group-hover:scale-110 transition-transform" />
                </div>
                Personal Information
              </CardTitle>
              <CardDescription>
                Basic information about the doctor
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <Input
                    required
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    placeholder="Enter first name"
                    className="border-gray-300 focus:border-brand-500 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <Input
                    required
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    placeholder="Enter last name"
                    className="border-gray-300 focus:border-brand-500 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="doctor@example.com"
                    className="border-gray-300 focus:border-brand-500 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <Input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="border-gray-300 focus:border-brand-500 focus:ring-brand-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-800">
            <CardHeader>
              <CardTitle className="flex items-center group">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-brand-100 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                  <GraduationCap className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                </div>
                Professional Information
              </CardTitle>
              <CardDescription>
                Medical credentials and specialization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specialization *
                  </label>
                  <select
                    required
                    value={formData.specialization}
                    onChange={(e) =>
                      handleInputChange("specialization", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="">Select specialization</option>
                    <option value="genetics">Genetics</option>
                    <option value="internal-medicine">Internal Medicine</option>
                    <option value="family-medicine">Family Medicine</option>
                    <option value="endocrinology">Endocrinology</option>
                    <option value="nutrition">Nutrition</option>
                    <option value="psychiatry">Psychiatry</option>
                    <option value="cardiology">Cardiology</option>
                    <option value="oncology">Oncology</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    License Number *
                  </label>
                  <Input
                    required
                    value={formData.licenseNumber}
                    onChange={(e) =>
                      handleInputChange("licenseNumber", e.target.value)
                    }
                    placeholder="Enter license number"
                    className="border-gray-300 focus:border-brand-500 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience *
                  </label>
                  <Input
                    type="number"
                    required
                    value={formData.yearsOfExperience}
                    onChange={(e) =>
                      handleInputChange("yearsOfExperience", e.target.value)
                    }
                    placeholder="Enter years of experience"
                    className="border-gray-300 focus:border-brand-500 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Consultation Fee
                  </label>
                  <Input
                    value={formData.consultationFee}
                    onChange={(e) =>
                      handleInputChange("consultationFee", e.target.value)
                    }
                    placeholder="$150"
                    className="border-gray-300 focus:border-brand-500 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Education *
                </label>
                <Textarea
                  required
                  value={formData.education}
                  onChange={(e) =>
                    handleInputChange("education", e.target.value)
                  }
                  placeholder="Medical school, residency, fellowship details..."
                  rows={3}
                  className="border-gray-300 focus:border-brand-500 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Certifications
                </label>
                <Textarea
                  value={formData.certifications}
                  onChange={(e) =>
                    handleInputChange("certifications", e.target.value)
                  }
                  placeholder="Board certifications, additional qualifications..."
                  rows={2}
                  className="border-gray-300 focus:border-brand-500 focus:ring-brand-500"
                />
              </div>
            </CardContent>
          </Card>

          {/* Location Information */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-1000">
            <CardHeader>
              <CardTitle className="flex items-center group">
                <div className="w-8 h-8 bg-gradient-to-br from-brand-100 to-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                  <MapPin className="w-5 h-5 text-brand-600 group-hover:scale-110 transition-transform" />
                </div>
                Location Information
              </CardTitle>
              <CardDescription>Practice location details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <Input
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Enter practice address"
                  className="border-gray-300 focus:border-brand-500 focus:ring-brand-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <Input
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="Enter city"
                    className="border-gray-300 focus:border-brand-500 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <Input
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    placeholder="Enter state"
                    className="border-gray-300 focus:border-brand-500 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP Code
                  </label>
                  <Input
                    value={formData.zipCode}
                    onChange={(e) =>
                      handleInputChange("zipCode", e.target.value)
                    }
                    placeholder="Enter ZIP code"
                    className="border-gray-300 focus:border-brand-500 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <Input
                  value={formData.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  className="border-gray-300 focus:border-brand-500 focus:ring-brand-500"
                />
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-1200">
            <CardHeader>
              <CardTitle className="flex items-center group">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-brand-100 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                  <Award className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                </div>
                Additional Information
              </CardTitle>
              <CardDescription>
                Languages, bio, and availability
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Languages Spoken
                </label>
                <Input
                  value={formData.languages}
                  onChange={(e) =>
                    handleInputChange("languages", e.target.value)
                  }
                  placeholder="English, Spanish, French..."
                  className="border-gray-300 focus:border-brand-500 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <Textarea
                  value={formData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  placeholder="Brief professional biography..."
                  rows={4}
                  className="border-gray-300 focus:border-brand-500 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Availability Status
                </label>
                <select
                  value={formData.availability}
                  onChange={(e) =>
                    handleInputChange("availability", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="available">Available</option>
                  <option value="busy">Busy</option>
                  <option value="unavailable">Unavailable</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 animate-slide-up animate-delay-1400">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="animate-pulse-glow hover:scale-105 transition-transform"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid() || isSubmitting}
              className="animate-pulse-glow hover:scale-105 transition-transform bg-gradient-to-r from-brand-600 to-blue-500 hover:from-brand-700 hover:to-blue-600 text-white shadow-lg"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Adding Doctor...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Add Doctor
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
