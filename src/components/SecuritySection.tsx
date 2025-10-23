"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, Lock, Eye, FileCheck } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import StaggerReveal from "@/components/animations/StaggerReveal";
import FadeInScale from "@/components/animations/FadeInScale";

export default function SecuritySection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <ScrollReveal direction="left" delay={0.2}>
            <div className="space-y-6 sm:space-y-8">
              <Badge className="w-fit bg-blue-100 text-blue-800 px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                Security & Privacy
              </Badge>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900">
                Your Health Data is
                <span className="block text-blue-600">100% Secure</span>
              </h2>

              <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
                We use enterprise-grade security measures to protect your
                personal health information. Your data is encrypted, secure, and
                never shared without your explicit consent.
              </p>

              {/* Security Features */}
              <StaggerReveal staggerDelay={0.1} direction="up">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-lg text-gray-700">
                      End-to-end encryption
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-lg text-gray-700">
                      HIPAA compliant infrastructure
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-lg text-gray-700">
                      Regular security audits
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-lg text-gray-700">
                      Zero data sharing policy
                    </span>
                  </div>
                </div>
              </StaggerReveal>
            </div>
          </ScrollReveal>

          {/* Right Security Dashboard */}
          <ScrollReveal direction="right" delay={0.4}>
            <div className="relative">
              <FadeInScale delay={0.6} scale={0.9}>
                <Card className="bg-gradient-to-br from-blue-600 to-blue-700 shadow-2xl rounded-3xl overflow-hidden">
                  <CardContent className="p-8 text-white">
                    <div className="flex items-center gap-3 mb-6">
                      <Shield className="w-8 h-8" />
                      <div>
                        <h3 className="text-2xl font-bold">
                          Secure Connection
                        </h3>
                        <p className="text-blue-200">256-bit SSL Encryption</p>
                      </div>
                    </div>

                    <StaggerReveal staggerDelay={0.1} direction="up">
                      <div className="space-y-6">
                        {/* Security Status Items */}
                        <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                          <div className="flex items-center gap-3">
                            <Lock className="w-6 h-6" />
                            <span className="font-medium">Data Encryption</span>
                          </div>
                          <span className="text-green-300 font-semibold">
                            Active
                          </span>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                          <div className="flex items-center gap-3">
                            <FileCheck className="w-6 h-6" />
                            <span className="font-medium">
                              HIPAA Compliance
                            </span>
                          </div>
                          <span className="text-green-300 font-semibold">
                            Verified
                          </span>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                          <div className="flex items-center gap-3">
                            <Eye className="w-6 h-6" />
                            <span className="font-medium">
                              Security Monitoring
                            </span>
                          </div>
                          <span className="text-green-300 font-semibold">
                            24/7
                          </span>
                        </div>
                      </div>
                    </StaggerReveal>
                  </CardContent>
                </Card>
              </FadeInScale>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
