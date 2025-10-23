"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Star,
  Calendar,
  Users,
  Award,
  Clock,
  Sparkles,
  UserCheck,
  ArrowRight,
  Search,
  Filter,
  X,
} from "lucide-react";

// Mock data for doctors
const doctors = [
  {
    id: "dr-sarah-johnson",
    name: "Dr. Sarah Johnson",
    title: "MD, PhD in Genetics",
    specialization: "Epigenetic Medicine",
    avatar: "/api/placeholder/150/150",
    rating: 4.9,
    reviews: 342,
    experience: 15,
    patients: 1200,
    languages: ["English", "Spanish"],
    bio: "Leading expert in epigenetic medicine with over 15 years of experience in personalized healthcare.",
    specialties: ["Nutrigenomics", "Pharmacogenomics", "Preventive Medicine"],
    availability: "Available this week",
    consultationFee: 150,
    gender: "female",
  },
  {
    id: "dr-michael-chen",
    name: "Dr. Michael Chen",
    title: "MD, Genetics Specialist",
    specialization: "Nutrigenomics",
    avatar: "/api/placeholder/150/150",
    rating: 4.8,
    reviews: 298,
    experience: 12,
    patients: 980,
    languages: ["English", "Mandarin"],
    bio: "Specializes in nutrition-based genetic counseling and personalized dietary recommendations.",
    specialties: [
      "Nutritional Genetics",
      "Metabolic Health",
      "Weight Management",
    ],
    availability: "Next available: Tomorrow",
    consultationFee: 125,
    gender: "male",
  },
  {
    id: "dr-emily-rodriguez",
    name: "Dr. Emily Rodriguez",
    title: "PhD in Molecular Biology",
    specialization: "Genetic Counseling",
    avatar: "/api/placeholder/150/150",
    rating: 4.9,
    reviews: 456,
    experience: 10,
    patients: 850,
    languages: ["English", "Spanish", "Portuguese"],
    bio: "Certified genetic counselor specializing in risk assessment and family health planning.",
    specialties: ["Risk Assessment", "Family Planning", "Genetic Counseling"],
    availability: "Available today",
    consultationFee: 100,
    gender: "female",
  },
  {
    id: "dr-james-wilson",
    name: "Dr. James Wilson",
    title: "MD, Internal Medicine",
    specialization: "Personalized Medicine",
    avatar: "/api/placeholder/150/150",
    rating: 4.7,
    reviews: 189,
    experience: 20,
    patients: 1500,
    languages: ["English", "French"],
    bio: "Integrates genetic insights with traditional medicine for comprehensive patient care.",
    specialties: [
      "Personalized Treatment",
      "Chronic Disease",
      "Preventive Care",
    ],
    availability: "Available this week",
    consultationFee: 175,
    gender: "male",
  },
  {
    id: "dr-lisa-patel",
    name: "Dr. Lisa Patel",
    title: "MD, Functional Medicine",
    specialization: "Holistic Health",
    avatar: "/api/placeholder/150/150",
    rating: 4.8,
    reviews: 267,
    experience: 8,
    patients: 650,
    languages: ["English", "Hindi"],
    bio: "Combines genetic insights with functional medicine approaches for optimal wellness.",
    specialties: [
      "Functional Medicine",
      "Hormone Optimization",
      "Wellness Coaching",
    ],
    availability: "Next available: In 2 days",
    consultationFee: 140,
    gender: "female",
  },
  {
    id: "dr-robert-kim",
    name: "Dr. Robert Kim",
    title: "PhD in Genomics",
    specialization: "Pharmacogenomics",
    avatar: "/api/placeholder/150/150",
    rating: 4.9,
    reviews: 312,
    experience: 14,
    patients: 920,
    languages: ["English", "Korean"],
    bio: "Expert in how genetic variations affect drug responses and medication optimization.",
    specialties: ["Drug Response", "Medication Safety", "Pharmacogenomics"],
    availability: "Available tomorrow",
    consultationFee: 160,
    gender: "male",
  },
  {
    id: "dr-amanda-brown",
    name: "Dr. Amanda Brown",
    title: "MD, Sports Medicine",
    specialization: "Athletic Performance",
    avatar: "/api/placeholder/150/150",
    rating: 4.8,
    reviews: 201,
    experience: 9,
    patients: 580,
    languages: ["English"],
    bio: "Specializes in genetic optimization for athletic performance and injury prevention.",
    specialties: [
      "Sports Genetics",
      "Performance Optimization",
      "Injury Prevention",
    ],
    availability: "Available this week",
    consultationFee: 135,
    gender: "female",
  },
  {
    id: "dr-david-martinez",
    name: "Dr. David Martinez",
    title: "MD, Cardiology",
    specialization: "Cardiovascular Genetics",
    avatar: "/api/placeholder/150/150",
    rating: 4.9,
    reviews: 387,
    experience: 18,
    patients: 1100,
    languages: ["English", "Spanish"],
    bio: "Focuses on genetic risk factors for cardiovascular disease and prevention strategies.",
    specialties: ["Cardiovascular Risk", "Heart Health", "Genetic Cardiology"],
    availability: "Next available: In 3 days",
    consultationFee: 180,
    gender: "male",
  },
];

// Get unique specializations for filter options
const specializations = [
  ...new Set(doctors.map((doctor) => doctor.specialization)),
];
const genders = [...new Set(doctors.map((doctor) => doctor.gender))];

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 200 });
  const [showFilters, setShowFilters] = useState(false);

  // Filter doctors based on search criteria
  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const matchesSearch =
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialization
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        doctor.specialties.some((specialty) =>
          specialty.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesSpecialization =
        !selectedSpecialization ||
        doctor.specialization === selectedSpecialization;
      const matchesGender = !selectedGender || doctor.gender === selectedGender;
      const matchesPrice =
        doctor.consultationFee >= priceRange.min &&
        doctor.consultationFee <= priceRange.max;

      return (
        matchesSearch && matchesSpecialization && matchesGender && matchesPrice
      );
    });
  }, [searchTerm, selectedSpecialization, selectedGender, priceRange]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedSpecialization("");
    setSelectedGender("");
    setPriceRange({ min: 0, max: 200 });
  };

  const activeFiltersCount = [
    searchTerm,
    selectedSpecialization,
    selectedGender,
    priceRange.min > 0 || priceRange.max < 200,
  ].filter(Boolean).length;
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-slate-50 py-16 lg:py-24 relative overflow-hidden">
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-float"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-blue-300 rounded-full opacity-30 animate-float animate-delay-400"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-400 rounded-full opacity-25 animate-rotate-slow"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Logo Section */}
          <div className="flex items-center justify-center space-x-4 mb-8 animate-bounce-in">
            <div className="relative">
              <Image
                src="/logo.avif"
                alt="Epigenetic Coaching Logo"
                width={80}
                height={80}
                className="rounded-2xl shadow-lg animate-pulse-glow"
              />
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-6 h-6 text-blue-500 animate-pulse" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Epigenetic Coaching
              </h2>
              <p className="text-sm text-blue-600 font-medium">
                Epigenetic Coaching
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-3 mb-6 animate-bounce-in animate-delay-200">
            <UserCheck className="w-8 h-8 text-blue-600 animate-pulse" />
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900">
              Meet Our Expert <span className="text-blue-600">Geneticists</span>
            </h1>
          </div>
          <p className="text-xl text-gray-600 leading-relaxed mb-8 animate-slide-up animate-delay-400">
            Connect with board-certified physicians and genetic specialists who
            will guide you through your personalized health journey with expert
            insights and recommendations.
          </p>

          <div className="flex items-center justify-center space-x-8 text-sm text-gray-600 animate-slide-up animate-delay-600">
            <div className="flex items-center space-x-2 animate-bounce-in animate-delay-800">
              <Award className="w-5 h-5 text-blue-600 animate-pulse" />
              <span>Board Certified</span>
            </div>
            <div className="flex items-center space-x-2 animate-bounce-in animate-delay-1000">
              <Users className="w-5 h-5 text-blue-600 animate-pulse" />
              <span>10,000+ Consultations</span>
            </div>
            <div className="flex items-center space-x-2 animate-bounce-in animate-delay-1200">
              <Clock className="w-5 h-5 text-green-600 animate-pulse" />
              <span>Same Day Availability</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search doctors by name, specialization, or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
              />
            </div>
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="h-12 px-6 border-2 border-gray-200 hover:border-blue-500 rounded-xl flex items-center gap-2"
            >
              <Filter className="w-5 h-5" />
              {showFilters ? "Hide Filters" : "Show Filters"}
              {activeFiltersCount > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-2 bg-blue-100 text-blue-700"
                >
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </div>

          {/* Filter Buttons */}
          {showFilters && (
            <div className="bg-gray-50 rounded-xl p-6 mb-6 animate-slide-down">
              {/* Specialization Buttons */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Specialization
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={() => setSelectedSpecialization("")}
                    variant="outline"
                    size="sm"
                    className={`rounded-full transition-all duration-200 hover:scale-105 ${
                      selectedSpecialization === ""
                        ? "bg-blue-600 text-white border-blue-600 shadow-lg hover:bg-blue-700"
                        : "border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-400"
                    }`}
                  >
                    All
                  </Button>
                  {specializations.map((spec) => (
                    <Button
                      key={spec}
                      onClick={() => setSelectedSpecialization(spec)}
                      variant="outline"
                      size="sm"
                      className={`rounded-full transition-all duration-200 hover:scale-105 ${
                        selectedSpecialization === spec
                          ? "bg-blue-600 text-white border-blue-600 shadow-lg hover:bg-blue-700"
                          : "border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-400"
                      }`}
                    >
                      {spec}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Gender Buttons */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Gender
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={() => setSelectedGender("")}
                    variant="outline"
                    size="sm"
                    className={`rounded-full transition-all duration-200 hover:scale-105 ${
                      selectedGender === ""
                        ? "bg-green-600 text-white border-green-600 shadow-lg hover:bg-green-700"
                        : "border-green-200 text-green-600 hover:bg-green-50 hover:border-green-400"
                    }`}
                  >
                    All
                  </Button>
                  {genders.map((gender) => (
                    <Button
                      key={gender}
                      onClick={() => setSelectedGender(gender)}
                      variant="outline"
                      size="sm"
                      className={`rounded-full transition-all duration-200 hover:scale-105 ${
                        selectedGender === gender
                          ? "bg-green-600 text-white border-green-600 shadow-lg hover:bg-green-700"
                          : "border-green-200 text-green-600 hover:bg-green-50 hover:border-green-400"
                      }`}
                    >
                      {gender === "male" ? "Male" : "Female"}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Price Range Buttons */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Price Range
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={() => setPriceRange({ min: 0, max: 200 })}
                    variant="outline"
                    size="sm"
                    className={`rounded-full transition-all duration-200 hover:scale-105 ${
                      priceRange.min === 0 && priceRange.max === 200
                        ? "bg-purple-600 text-white border-purple-600 shadow-lg hover:bg-purple-700"
                        : "border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-400"
                    }`}
                  >
                    All Prices
                  </Button>
                  <Button
                    onClick={() => setPriceRange({ min: 0, max: 100 })}
                    variant="outline"
                    size="sm"
                    className={`rounded-full transition-all duration-200 hover:scale-105 ${
                      priceRange.min === 0 && priceRange.max === 100
                        ? "bg-purple-600 text-white border-purple-600 shadow-lg hover:bg-purple-700"
                        : "border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-400"
                    }`}
                  >
                    Under $100
                  </Button>
                  <Button
                    onClick={() => setPriceRange({ min: 100, max: 150 })}
                    variant="outline"
                    size="sm"
                    className={`rounded-full transition-all duration-200 hover:scale-105 ${
                      priceRange.min === 100 && priceRange.max === 150
                        ? "bg-purple-600 text-white border-purple-600 shadow-lg hover:bg-purple-700"
                        : "border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-400"
                    }`}
                  >
                    $100 - $150
                  </Button>
                  <Button
                    onClick={() => setPriceRange({ min: 150, max: 200 })}
                    variant="outline"
                    size="sm"
                    className={`rounded-full transition-all duration-200 hover:scale-105 ${
                      priceRange.min === 150 && priceRange.max === 200
                        ? "bg-purple-600 text-white border-purple-600 shadow-lg hover:bg-purple-700"
                        : "border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-400"
                    }`}
                  >
                    $150 - $200
                  </Button>
                  <Button
                    onClick={() => setPriceRange({ min: 200, max: 200 })}
                    variant="outline"
                    size="sm"
                    className={`rounded-full transition-all duration-200 hover:scale-105 ${
                      priceRange.min === 200 && priceRange.max === 200
                        ? "bg-purple-600 text-white border-purple-600 shadow-lg hover:bg-purple-700"
                        : "border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-400"
                    }`}
                  >
                    Over $200
                  </Button>
                </div>
              </div>

              {/* Filter Actions */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Showing {filteredDoctors.length} of {doctors.length} doctors
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={clearFilters}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-400 transition-all duration-200 hover:scale-105"
                  >
                    <X className="w-4 h-4" />
                    Clear All
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Results Summary */}
          {activeFiltersCount > 0 && (
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-600">
                {filteredDoctors.length === doctors.length
                  ? "All doctors shown"
                  : `Found ${filteredDoctors.length} doctor${
                      filteredDoctors.length !== 1 ? "s" : ""
                    } matching your criteria`}
              </div>
              <Button
                onClick={clearFilters}
                variant="ghost"
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200 hover:scale-105"
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredDoctors.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                No doctors found
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Try adjusting your search criteria or filters to find the
                perfect doctor for your needs.
              </p>
              <Button
                onClick={clearFilters}
                variant="outline"
                className="px-6 py-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-400 transition-all duration-200 hover:scale-105"
              >
                Clear all filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredDoctors.map((doctor, index) => (
                <Card
                  key={doctor.id}
                  className={`border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-bounce-in animate-delay-${
                    (index + 1) * 100
                  } group bg-gradient-to-br from-white via-blue-50/20 to-white relative overflow-hidden`}
                >
                  <CardHeader className="text-center pb-3 relative z-10">
                    <div
                      className={`w-20 h-20 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-full mx-auto mb-3 flex items-center justify-center group-hover:animate-pulse-glow transition-all duration-300 shadow-lg group-hover:shadow-xl`}
                    >
                      <div className="w-16 h-16 bg-white rounded-full overflow-hidden flex items-center justify-center shadow-inner">
                        <Image
                          src={
                            doctor.gender === "female"
                              ? "/rtrt.png"
                              : "/qwqw.png"
                          }
                          alt={doctor.name}
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      </div>
                    </div>

                    <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                      {doctor.name}
                    </CardTitle>
                    <p className="text-xs text-gray-600 font-medium group-hover:text-gray-700 transition-colors duration-300">
                      {doctor.title}
                    </p>

                    <Badge
                      variant="secondary"
                      className="mx-auto bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 font-semibold px-2 py-1 text-xs shadow-sm group-hover:shadow-md transition-all duration-300"
                    >
                      {doctor.specialization}
                    </Badge>

                    <div className="flex items-center justify-center space-x-1 mt-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(doctor.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-600 font-medium">
                        ({doctor.reviews})
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-2 text-xs relative z-10">
                    <div className="flex items-center justify-between bg-gray-50 rounded-md p-2 group-hover:bg-blue-50 transition-colors duration-300">
                      <span className="text-gray-600 font-medium">
                        Experience:
                      </span>
                      <span className="font-bold text-blue-700">
                        {doctor.experience}y
                      </span>
                    </div>

                    <div className="flex items-center justify-between bg-gray-50 rounded-md p-2 group-hover:bg-blue-50 transition-colors duration-300">
                      <span className="text-gray-600 font-medium">
                        Patients:
                      </span>
                      <span className="font-bold text-orange-600">
                        {doctor.patients.toLocaleString()}+
                      </span>
                    </div>

                    <div className="text-center">
                      <div className="flex flex-wrap gap-1 justify-center">
                        {doctor.specialties
                          .slice(0, 2)
                          .map((specialty, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs bg-gradient-to-r from-gray-50 to-slate-50 text-gray-700 border-gray-300 font-medium px-1 py-0.5 group-hover:shadow-sm transition-all duration-300"
                            >
                              {specialty}
                            </Badge>
                          ))}
                      </div>
                    </div>

                    <div className="text-center bg-gradient-to-r from-blue-50 to-slate-50 rounded-md p-2 group-hover:from-blue-100 group-hover:to-slate-100 transition-all duration-300">
                      <p className="text-xs text-blue-600 font-semibold mb-1">
                        {doctor.availability}
                      </p>
                      <p className="text-sm font-bold text-gray-900">
                        ${doctor.consultationFee}
                        <span className="text-xs text-gray-600 font-normal">
                          /session
                        </span>
                      </p>
                    </div>
                  </CardContent>

                  <CardFooter className="flex flex-col gap-2 pt-3 relative z-10">
                    <Button
                      size="sm"
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 group-hover:animate-pulse-glow"
                      asChild
                    >
                      <Link
                        href={`/doctors/${doctor.id}`}
                        className="flex items-center justify-center"
                      >
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full border-2 border-orange-500 text-orange-700 hover:bg-orange-500 hover:text-white font-semibold py-2.5 px-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 group-hover:border-orange-600"
                      asChild
                    >
                      <Link
                        href={`/doctors/${doctor.id}/book`}
                        className="flex items-center justify-center"
                      >
                        <Calendar className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform duration-300" />
                        Book Now
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-10 right-10 w-24 h-24 bg-blue-200 rounded-full opacity-15 animate-float"></div>
        <div className="absolute bottom-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-rotate-slow"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-brand-100 rounded-full opacity-25 animate-float animate-delay-600"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 animate-bounce-in">
              Why Choose Our <span className="text-blue-600">Doctors</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-slide-up animate-delay-200">
              Our team of experts combines years of experience with cutting-edge
              genetic knowledge
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg text-center hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-200 group hover:scale-105">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-glow transition-all">
                  <Award className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform animate-pulse" />
                </div>
                <CardTitle className="group-hover:text-blue-600 transition-colors">
                  Board Certified
                </CardTitle>
                <CardDescription className="group-hover:text-gray-700 transition-colors">
                  All our doctors are board-certified with specialized training
                  in genetic medicine and personalized healthcare
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg text-center hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-400 group hover:scale-105">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-glow transition-all">
                  <Users className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform animate-pulse" />
                </div>
                <CardTitle className="group-hover:text-blue-600 transition-colors">
                  Personalized Care
                </CardTitle>
                <CardDescription className="group-hover:text-gray-700 transition-colors">
                  Each consultation is tailored to your unique genetic profile
                  and health goals with actionable recommendations
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg text-center hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-600 group hover:scale-105">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-glow transition-all">
                  <Clock className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform animate-pulse" />
                </div>
                <CardTitle className="group-hover:text-blue-600 transition-colors">
                  Flexible Scheduling
                </CardTitle>
                <CardDescription className="group-hover:text-gray-700 transition-colors">
                  Book appointments that fit your schedule with same-day
                  availability and virtual consultation options
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Ready to Meet Your Genetic Health Expert?
            </h2>
            <p className="text-xl text-blue-100">
              Book a consultation with one of our specialists and start your
              personalized health journey today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/auth/register">Get Started Today</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-blue-900"
                asChild
              >
                <Link href="/contact">Have Questions?</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
