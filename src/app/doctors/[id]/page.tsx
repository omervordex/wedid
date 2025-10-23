"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Calendar,
  Award,
  Clock,
  MapPin,
  ArrowLeft,
  CheckCircle,
  GraduationCap,
  Briefcase,
  Heart,
  Shield,
  Zap,
} from "lucide-react";

// Mock data for doctors (same as in the main doctors page)
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
    education: [
      "PhD in Genetics - Harvard Medical School",
      "MD in Internal Medicine - Johns Hopkins University",
      "Board Certified in Genetic Medicine",
    ],
    certifications: [
      "American Board of Medical Genetics",
      "Certified Genetic Counselor",
      "Epigenetic Medicine Specialist",
    ],
    achievements: [
      "Published 50+ research papers in top medical journals",
      "Recipient of the National Genetics Award 2023",
      "Keynote speaker at International Epigenetics Conference",
    ],
    approach:
      "Dr. Johnson believes in a holistic approach to healthcare, combining cutting-edge genetic insights with personalized lifestyle recommendations to help patients achieve optimal health and prevent disease before it starts.",
    consultationTypes: [
      "Initial Genetic Assessment (60 min)",
      "Follow-up Consultation (30 min)",
      "Family Planning Consultation (45 min)",
      "Lifestyle Optimization (45 min)",
    ],
    location: "New York, NY",
    clinic: "Epigenetic Health Center",
    nextAvailable: "Tomorrow at 2:00 PM",
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
    education: [
      "MD in Internal Medicine - Stanford University",
      "MS in Nutritional Sciences - UC Berkeley",
      "Board Certified in Clinical Nutrition",
    ],
    certifications: [
      "American Board of Nutrition",
      "Certified Nutrigenomics Specialist",
      "Metabolic Health Practitioner",
    ],
    achievements: [
      "Developed personalized nutrition protocols for 1000+ patients",
      "Author of 'Genetic Nutrition: A Personalized Approach'",
      "Featured in Health & Wellness Magazine",
    ],
    approach:
      "Dr. Chen focuses on using genetic information to create personalized nutrition plans that optimize metabolic health, prevent chronic diseases, and enhance overall well-being.",
    consultationTypes: [
      "Genetic Nutrition Assessment (60 min)",
      "Metabolic Health Review (30 min)",
      "Weight Management Planning (45 min)",
      "Family Nutrition Consultation (45 min)",
    ],
    location: "San Francisco, CA",
    clinic: "Nutrigenomics Institute",
    nextAvailable: "Today at 4:00 PM",
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
    education: [
      "PhD in Molecular Biology - MIT",
      "MS in Genetic Counseling - Johns Hopkins",
      "Board Certified Genetic Counselor",
    ],
    certifications: [
      "American Board of Genetic Counseling",
      "Certified Family Health Specialist",
      "Prenatal Genetics Expert",
    ],
    achievements: [
      "Counseled over 2000 families on genetic risks",
      "Developed innovative risk assessment tools",
      "International speaker on genetic counseling",
    ],
    approach:
      "Dr. Rodriguez provides compassionate, evidence-based genetic counseling to help families understand their genetic risks and make informed decisions about their health and family planning.",
    consultationTypes: [
      "Genetic Risk Assessment (60 min)",
      "Family Planning Consultation (45 min)",
      "Prenatal Genetic Counseling (60 min)",
      "Follow-up Risk Discussion (30 min)",
    ],
    location: "Miami, FL",
    clinic: "Family Genetics Center",
    nextAvailable: "Today at 1:00 PM",
  },
];

export default function DoctorDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const doctor = doctors.find((d) => d.id === params.id);

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Doctor Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The doctor you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button asChild>
            <Link href="/doctors">Back to Doctors</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/doctors" className="flex items-center">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Doctors
                </Link>
              </Button>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-xl font-semibold text-gray-900">
                Doctor Profile
              </h1>
            </div>
            <Button asChild>
              <Link href={`/doctors/${doctor.id}/book`}>
                <Calendar className="w-4 h-4 mr-2" />
                Book Appointment
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Doctor Info */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <div className="w-28 h-28 bg-white rounded-full overflow-hidden flex items-center justify-center shadow-inner">
                    <Image
                      src={
                        doctor.gender === "female" ? "/rtrt.png" : "/qwqw.png"
                      }
                      alt={doctor.name}
                      width={112}
                      height={112}
                      className="object-cover"
                    />
                  </div>
                </div>

                <CardTitle className="text-2xl font-bold text-gray-900">
                  {doctor.name}
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  {doctor.title}
                </CardDescription>

                <Badge className="mx-auto bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 font-semibold px-4 py-2 text-sm">
                  {doctor.specialization}
                </Badge>

                <div className="flex items-center justify-center space-x-2 mt-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(doctor.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 font-medium">
                    {doctor.rating} ({doctor.reviews} reviews)
                  </span>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                    <span className="text-gray-600 font-medium">
                      Experience:
                    </span>
                    <span className="font-bold text-blue-700">
                      {doctor.experience} years
                    </span>
                  </div>

                  <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                    <span className="text-gray-600 font-medium">Patients:</span>
                    <span className="font-bold text-orange-600">
                      {doctor.patients.toLocaleString()}+
                    </span>
                  </div>

                  <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                    <span className="text-gray-600 font-medium">Fee:</span>
                    <span className="font-bold text-gray-900">
                      ${doctor.consultationFee}/session
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    asChild
                  >
                    <Link href={`/doctors/${doctor.id}/book`}>
                      <Calendar className="w-5 h-5 mr-2" />
                      Book Appointment
                    </Link>
                  </Button>
                </div>
              </CardHeader>
            </Card>
          </div>

          {/* Right Column - Detailed Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-blue-600" />
                  About Dr. {doctor.name.split(" ")[1]}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {doctor.bio}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {doctor.approach}
                </p>
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2 text-blue-600" />
                  Education & Training
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {doctor.education.map((edu, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{edu}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2 text-blue-600" />
                  Certifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {doctor.certifications.map((cert, index) => (
                    <li key={index} className="flex items-start">
                      <Shield className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{cert}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Specialties */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
                  Specialties
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {doctor.specialties.map((specialty, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-gradient-to-r from-gray-50 to-slate-50 text-gray-700 border-gray-300 font-medium px-3 py-1"
                    >
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Consultation Types */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-600" />
                  Consultation Types
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {doctor.consultationTypes.map((type, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between bg-gray-50 rounded-lg p-3"
                    >
                      <span className="text-gray-700 font-medium">{type}</span>
                      <Badge
                        variant="secondary"
                        className="bg-blue-100 text-blue-800"
                      >
                        Available
                      </Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-blue-600" />
                  Key Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {doctor.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">
                        {doctor.clinic}
                      </p>
                      <p className="text-sm text-gray-600">{doctor.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">
                        Next Available
                      </p>
                      <p className="text-sm text-gray-600">
                        {doctor.nextAvailable}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Languages */}
            <Card>
              <CardHeader>
                <CardTitle>Languages Spoken</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {doctor.languages.map((language, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-blue-50 text-blue-700 border-blue-200"
                    >
                      {language}
                    </Badge>
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
