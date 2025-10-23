"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Microscope,
  FileText,
  Calendar,
  CheckCircle,
  Sparkles,
  Play,
  Upload,
  Download,
  Video,
  UserCheck,
  MessageCircle,
  Phone,
  Stethoscope,
} from "lucide-react";
export default function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="bg-blue-100 text-blue-900 border border-blue-200 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Stethoscope className="w-4 h-4 mr-2" />
            Simple 4-Step Process
          </Badge>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Your Journey to
            <span className="block bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Better Health
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Our streamlined online clinic process makes it easy to get expert
            medical care, personalized treatment plans, and ongoing health
            monitoring from certified healthcare professionals.
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-200 via-blue-600 to-blue-200 rounded-full"></div>

          {/* Process Steps */}
          <div className="space-y-24">
            {/* Step 1 - Order Kit */}
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-full flex items-center justify-center text-2xl font-bold z-10 shadow-xl border-4 border-white">
                1
              </div>
              <div className="lg:pr-16">
                <div className="text-sm text-blue-600 uppercase tracking-wider font-semibold mb-2">
                  Step One
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Create Your Online Profile
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Sign up for our secure online clinic platform and create your
                  personalized health profile. Share your medical history,
                  current symptoms, and health goals with our certified
                  healthcare professionals.
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    "Quick 3-minute registration process",
                    "Secure HIPAA-compliant platform",
                    "Comprehensive health questionnaire",
                    "24/7 access to your health records",
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                      <span className="text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl">
                  <UserCheck className="w-5 h-5 mr-2" />
                  Create Account
                </Button>
              </div>
              <div className="bg-white rounded-2xl p-8 border border-blue-200 h-96 shadow-lg relative overflow-hidden">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover rounded-xl"
                >
                  <source src="/vbvb.MP4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent rounded-xl"></div>
                <div className="relative z-10 h-full flex flex-col justify-end">
                  <h4 className="text-white font-bold text-lg mb-2">
                    Quick Registration Process
                  </h4>
                  <p className="text-blue-100 text-sm">
                    Create your profile and get started in minutes
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 - Choose Doctor */}
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-full flex items-center justify-center text-2xl font-bold z-10 shadow-xl border-4 border-white">
                2
              </div>
              <div className="bg-white rounded-2xl p-8 border border-blue-200 h-96 shadow-lg lg:order-1">
                <div className="text-center">
                  <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Stethoscope className="w-16 h-16 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-lg mb-4">Choose Your Doctor</h4>
                  <div className="space-y-3">
                    {[
                      {
                        name: "Dr. Sarah Johnson",
                        specialty: "General Medicine",
                        rating: "4.9",
                        available: "Available Now",
                      },
                      {
                        name: "Dr. Michael Chen",
                        specialty: "Cardiology",
                        rating: "4.8",
                        available: "Available in 15min",
                      },
                    ].map((doctor, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 bg-blue-50 rounded-lg"
                      >
                        <div className="text-left">
                          <div className="font-semibold text-sm">
                            {doctor.name}
                          </div>
                          <div className="text-xs text-slate-600">
                            {doctor.specialty}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-blue-600">
                            ⭐ {doctor.rating}
                          </div>
                          <div className="text-xs text-green-600">
                            {doctor.available}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="lg:pl-16 lg:order-2">
                <div className="text-sm text-blue-600 uppercase tracking-wider font-semibold mb-2">
                  Step Two
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Select Your Healthcare Provider
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Browse our network of certified healthcare professionals and
                  choose the doctor that best matches your needs. All our
                  doctors are board-certified and experienced in online
                  consultations.
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    "50+ certified healthcare professionals",
                    "Multiple specialties available",
                    "Real patient reviews and ratings",
                    "Same-day appointments available",
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                      <span className="text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Step 3 - Video Consultation */}
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-full flex items-center justify-center text-2xl font-bold z-10 shadow-xl border-4 border-white">
                3
              </div>
              <div className="lg:pr-16">
                <div className="text-sm text-blue-600 uppercase tracking-wider font-semibold mb-2">
                  Step Three
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Video Consultation with Your Doctor
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Connect with your chosen healthcare provider through our
                  secure HD video platform. Discuss your symptoms, medical
                  history, and health concerns in a private, professional
                  consultation from the comfort of your home.
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    "HD quality video consultations",
                    "Secure, HIPAA-compliant platform",
                    "Screen sharing for medical records",
                    "Instant prescription delivery",
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                      <span className="text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 h-96 text-white shadow-lg">
                <div className="text-center">
                  <h4 className="text-xl font-bold mb-6">
                    Live Video Consultation
                  </h4>
                  <div className="text-center h-full flex flex-col justify-center">
                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Video className="w-12 h-12 text-white" />
                    </div>
                    <p className="text-blue-100 mb-6">
                      Connect with your doctor in real-time
                    </p>
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-sm">Connection Active</span>
                      </div>
                      <div className="text-xs text-blue-200">
                        Dr. Sarah Johnson - Consultation in progress...
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 - Treatment Plan & Follow-up */}
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-full flex items-center justify-center text-2xl font-bold z-10 shadow-xl border-4 border-white">
                4
              </div>
              <div className="bg-white rounded-2xl p-8 border border-blue-200 h-96 shadow-lg lg:order-1 relative overflow-hidden">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover rounded-xl opacity-30"
                >
                  <source src="/tyty.MP4" type="video/mp4" />
                </video>
                <div className="relative z-10 space-y-4">
                  <div className="border-b border-slate-200 pb-4">
                    <h4 className="font-bold text-lg mb-2">
                      Your Treatment Plan
                    </h4>
                    <p className="text-sm text-slate-600">
                      Personalized care plan and prescriptions
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50/90 backdrop-blur-sm rounded-lg">
                      <span className="text-sm font-medium">
                        Prescription Medications
                      </span>
                      <span className="text-sm text-blue-600">✓ Ready</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50/90 backdrop-blur-sm rounded-lg">
                      <span className="text-sm font-medium">
                        Follow-up Appointment
                      </span>
                      <span className="text-sm text-green-600">
                        📅 Scheduled
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50/90 backdrop-blur-sm rounded-lg">
                      <span className="text-sm font-medium">
                        Care Instructions
                      </span>
                      <span className="text-sm text-purple-600">✓ Sent</span>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                    <Download className="w-4 h-4 mr-2" />
                    Download Full Report
                  </Button>
                </div>
              </div>
              <div className="lg:pl-16 lg:order-2">
                <div className="text-sm text-blue-600 uppercase tracking-wider font-semibold mb-2">
                  Step Four
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Receive Treatment Plan & Follow-up Care
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Get your personalized treatment plan, prescriptions, and
                  follow-up care recommendations. Access your medical records
                  anytime and schedule follow-up appointments as needed.
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    "Personalized treatment plan",
                    "Digital prescription delivery",
                    "24/7 access to medical records",
                    "Ongoing support and follow-ups",
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                      <span className="text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl">
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule Follow-up
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
