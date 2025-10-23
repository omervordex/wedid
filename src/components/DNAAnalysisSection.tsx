"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  Download,
  Activity,
  FileText,
  ArrowRight,
  Play,
} from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import StaggerReveal from "@/components/animations/StaggerReveal";
import FadeInScale from "@/components/animations/FadeInScale";

export default function DNAAnalysisSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
        {/* Header */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="text-center mb-12 sm:mb-16">
            <div className="flex justify-center gap-4 mb-4 sm:mb-6">
              <Badge className="bg-blue-100 text-blue-600 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base">
                <Activity className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                Analysis Process
              </Badge>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 text-gray-900">
              DNA Analysis Process
              <span className="block text-blue-600">Made Simple</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Get your genetic analysis easily. Order your kit, send your
              sample, analyze in our laboratory and receive your personalized
              results.
            </p>
          </div>
        </ScrollReveal>

        {/* Video Cards */}
        <StaggerReveal staggerDelay={0.3} direction="up">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {/* DNA Test Kit Process */}
            <FadeInScale delay={0.4} scale={0.9}>
              <Card className="relative overflow-hidden rounded-3xl shadow-2xl group hover:shadow-3xl transition-all duration-300">
                <div className="relative h-160">
                  <Image
                    src="/te1.png"
                    alt="DNA Test Kit Process"
                    width={400}
                    height={320}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">
                      DNA Test Kit Process
                    </h3>
                    <p className="text-white/90 leading-relaxed">
                      Collect your sample with our easy-to-use DNA test kit at
                      home. Follow simple instructions, collect your saliva
                      sample and send it to our certified laboratory.
                    </p>
                  </div>
                </div>
              </Card>
            </FadeInScale>

            {/* How DNA Analysis Works */}
            <FadeInScale delay={0.6} scale={0.9}>
              <Card className="relative overflow-hidden rounded-3xl shadow-2xl group hover:shadow-3xl transition-all duration-300">
                <div className="relative h-160">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src="/vid.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Live Demo Button */}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-gray-900 px-3 py-1 rounded-full font-semibold">
                      <Play className="w-4 h-4 mr-1" />
                      Live Demo
                    </Badge>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">
                      How DNA Analysis Works?
                    </h3>
                    <p className="text-white/90 leading-relaxed">
                      Personalized health insights with 500,000+ genetic markers
                    </p>
                  </div>
                </div>
              </Card>
            </FadeInScale>
          </div>
        </StaggerReveal>

        {/* Process Steps */}
        <StaggerReveal staggerDelay={0.2} direction="up">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Step 1 */}
            <FadeInScale delay={0.8} scale={0.9}>
              <Card className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-0">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <Upload className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 px-2 py-1 text-xs font-semibold mb-3">
                    STEP 1
                  </Badge>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Order DNA Kit
                  </h3>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    Order your DNA test kit online. Place your order easily with
                    fast and secure payment options.
                  </p>
                </CardContent>
              </Card>
            </FadeInScale>

            {/* Step 2 */}
            <FadeInScale delay={1.0} scale={0.9}>
              <Card className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-0">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <Download className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 px-2 py-1 text-xs font-semibold mb-3">
                    STEP 2
                  </Badge>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Send Within Few Days
                  </h3>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    Your DNA test kit will reach you within 2-3 days. Collect
                    your sample and send it back with free shipping.
                  </p>
                </CardContent>
              </Card>
            </FadeInScale>

            {/* Step 3 */}
            <FadeInScale delay={1.2} scale={0.9}>
              <Card className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-0">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 px-2 py-1 text-xs font-semibold mb-3">
                    STEP 3
                  </Badge>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Lab Analysis
                  </h3>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    Your sample is analyzed with advanced technology in our
                    certified laboratory. 500,000+ genetic markers are examined.
                  </p>
                </CardContent>
              </Card>
            </FadeInScale>

            {/* Step 4 */}
            <FadeInScale delay={1.4} scale={0.9}>
              <Card className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-0">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 px-2 py-1 text-xs font-semibold mb-3">
                    STEP 4
                  </Badge>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Get Your Results
                  </h3>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    Receive your detailed genetic analysis report within 5-7
                    business days. Personalized health recommendations included.
                  </p>
                </CardContent>
              </Card>
            </FadeInScale>
          </div>
        </StaggerReveal>

        {/* CTA Button */}
        <ScrollReveal direction="up" delay={1.6}>
          <div className="text-center">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
              Start DNA Analysis
              <ArrowRight className="ml-3 w-6 h-6" />
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
