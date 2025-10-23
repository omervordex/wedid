"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Clock,
  Star,
  Users,
  Sparkles,
  Stethoscope,
  Mic,
  Phone,
  Video,
} from "lucide-react";

export default function HeroSection() {
  useEffect(() => {
    // Component mount effect
  }, []);

  return (
    <>
      {/* Hero Section (navbar intentionally omitted) */}
      <section className="min-h-screen grid lg:grid-cols-2 pt-24">
        {/* Left Side */}
        <div className="flex flex-col justify-center px-6 lg:px-20 py-20 relative">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl -z-10" />

          <Badge className="w-fit bg-white text-blue-900 border border-blue-900/20 shadow-lg mb-8 px-5 py-2 rounded-full font-semibold">
            <Sparkles className="w-4 h-4 mr-2" />
            Trusted by 50,000+ Patients Worldwide
          </Badge>

          <h1 className="text-6xl lg:text-7xl font-black mb-8 leading-tight">
            Modern Healthcare
            <br />
            <span className="bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent">
              Delivered Digitally
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-xl">
            Experience seamless virtual consultations with board-certified
            physicians. Quality healthcare accessible anytime, anywhere, from
            the comfort of your home.
          </p>

          <div className="flex flex-wrap gap-5 mb-16">
            <Button className="bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-full px-10 py-6 text-lg font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
              Book Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              className="border-2 border-blue-900 text-blue-900 rounded-full px-10 py-6 text-lg font-bold hover:bg-blue-900 hover:text-white transition-all"
            >
              How It Works
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-900 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <div>
                <h4 className="text-2xl font-extrabold text-blue-800">15min</h4>
                <p className="text-xs text-gray-600">Avg. Wait Time</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-900 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Star className="w-7 h-7 text-white" />
              </div>
              <div>
                <h4 className="text-2xl font-extrabold text-blue-800">4.9/5</h4>
                <p className="text-xs text-gray-600">Patient Rating</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-900 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Users className="w-7 h-7 text-white" />
              </div>
              <div>
                <h4 className="text-2xl font-extrabold text-blue-800">500+</h4>
                <p className="text-xs text-gray-600">Specialists</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Video Call */}
        <div className="flex items-center justify-center px-6 lg:px-20 py-20 relative">
          <div className="relative w-full max-w-lg">
            {/* Main Video Frame */}
            <Card className="relative w-full h-[450px] bg-gradient-to-br from-blue-900 to-blue-800 border-0 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
              <CardContent className="p-10 relative z-10 h-full flex flex-col items-center justify-center">
                <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center shadow-2xl mb-8 relative">
                  <div className="w-44 h-44 bg-gradient-to-br from-blue-600 to-blue-900 rounded-full flex items-center justify-center text-8xl">
                    👨‍⚕️
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <Stethoscope className="w-6 h-6 text-blue-900" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Dr. Sarah Mitchell
                </h3>
                <p className="text-blue-200 mb-6">Cardiologist</p>
                <Badge className="bg-white/20 backdrop-blur-sm text-white border-0 px-5 py-2 rounded-full">
                  <div className="w-2.5 h-2.5 bg-green-400 rounded-full mr-2 animate-pulse" />
                  Live Consultation
                </Badge>
              </CardContent>
            </Card>

            {/* Patient Small Video */}
            <Card className="absolute bottom-6 right-6 w-36 h-44 shadow-2xl border-0">
              <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                <div className="w-28 h-28 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full flex items-center justify-center text-5xl mb-3">
                  👤
                </div>
                <p className="text-sm font-bold text-gray-900">You</p>
              </CardContent>
            </Card>

            {/* Call Controls */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 z-20">
              <Button
                size="icon"
                className="w-14 h-14 rounded-full bg-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
              >
                <Mic className="w-6 h-6 text-gray-900" />
              </Button>
              <Button
                size="icon"
                className="w-14 h-14 rounded-full bg-red-500 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
              >
                <Phone className="w-6 h-6 text-white" />
              </Button>
              <Button
                size="icon"
                className="w-14 h-14 rounded-full bg-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
              >
                <Video className="w-6 h-6 text-gray-900" />
              </Button>
            </div>

            {/* Floating Stats */}
            <Card className="absolute -left-10 top-6 w-32 shadow-xl border-blue-900/10">
              <CardContent className="p-5">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                  <Clock className="w-5 h-5 text-blue-900" />
                </div>
                <div className="text-2xl font-extrabold text-blue-900 mb-1">
                  15min
                </div>
                <div className="text-xs text-gray-600">Wait Time</div>
              </CardContent>
            </Card>

            <Card className="absolute -right-10 top-1/2 -translate-y-1/2 w-32 shadow-xl border-blue-900/10">
              <CardContent className="p-5">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                  <Star className="w-5 h-5 text-blue-900" />
                </div>
                <div className="text-2xl font-extrabold text-blue-900 mb-1">
                  4.9★
                </div>
                <div className="text-xs text-gray-600">Rating</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Animations (disabled for FaceTime-like static layout) */}
      <style jsx global>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 3s infinite;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-float {
        }
        .animate-float-delayed {
        }
      `}</style>
    </>
  );
}
