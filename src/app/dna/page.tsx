"use client";

import { Button } from "@/components/ui/button";
import {
  Shield,
  Clock,
  Users,
  Heart,
  Brain,
  Activity,
  BarChart3,
  PieChart,
  Database,
  Microscope,
  Zap,
  Target,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import DNADataChart from "@/components/DNADataChart";

export default function DNAPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dnaTests = [
    {
      id: "ancestry",
      title: "Ancestry Analysis",
      price: "$199",
      originalPrice: "$299",
      description: "Discover your ethnic background and ancestral origins",
      features: [
        "500,000+ genetic markers",
        "150+ regional analysis",
        "Relative finder",
        "Migration routes",
      ],
      popular: false,
      icon: Users,
    },
    {
      id: "health",
      title: "Health DNA Test",
      price: "$399",
      originalPrice: "$499",
      description: "Learn about genetic health risks and carrier status",
      features: [
        "200+ health reports",
        "Drug response analysis",
        "Nutrition recommendations",
        "Fitness genetics",
      ],
      popular: true,
      icon: Heart,
    },
    {
      id: "complete",
      title: "Complete DNA Analysis",
      price: "$599",
      originalPrice: "$799",
      description: "Comprehensive analysis combining ancestry and health",
      features: [
        "All ancestry features",
        "All health reports",
        "Personalized recommendations",
        "Expert consultation",
      ],
      popular: false,
      icon: Brain,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Matching Home Design */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/ssaa.mp4" type="video/mp4" />
          </video>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/85"></div>
        </div>

        {/* Floating Particles */}
        <motion.div
          className="absolute top-20 right-20 w-2 h-2 bg-yellow-400 rounded-full z-10"
          animate={{
            y: [0, -20, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-40 right-40 w-1 h-1 bg-orange-400 rounded-full z-10"
          animate={{
            y: [0, -15, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-3 h-3 bg-yellow-300 rounded-full z-10"
          animate={{
            y: [0, -25, 0],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 2 }}
        />

        <div className="w-full px-4 sm:px-6 lg:px-20 relative z-20">
          <div className="flex items-center min-h-screen py-8 sm:py-12">
            <div className="w-full max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Left Content - Matching Home Style */}
                <div className="relative ml-0 sm:ml-4 lg:ml-0">
                  {/* Background Elements */}
                  <motion.div
                    className="absolute -left-10 -top-10 w-32 h-32 opacity-20"
                    animate={{
                      rotate: 360,
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      rotate: {
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      },
                      scale: {
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                  >
                    <svg
                      viewBox="0 0 100 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M50 0C22.4 0 0 22.4 0 50C0 77.6 22.4 100 50 100C77.6 100 100 77.6 100 50C100 22.4 77.6 0 50 0ZM50 90C27.9 90 10 72.1 10 50C10 27.9 27.9 10 50 10C72.1 10 90 27.9 90 50C90 72.1 72.1 90 50 90Z"
                        fill="url(#paint0_linear)"
                      />
                      <path
                        d="M80 50C80 66.5685 66.5685 80 50 80C33.4315 80 20 66.5685 20 50C20 33.4315 33.4315 20 50 20C66.5685 20 80 33.4315 80 50Z"
                        fill="url(#paint1_radial)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear"
                          x1="0"
                          y1="0"
                          x2="100"
                          y2="100"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#FF6B6B" />
                          <stop offset="1" stopColor="#FFD166" />
                        </linearGradient>
                        <radialGradient
                          id="paint1_radial"
                          cx="0"
                          cy="0"
                          r="1"
                          gradientUnits="userSpaceOnUse"
                          gradientTransform="translate(50 50) rotate(90) scale(30)"
                        >
                          <stop stopColor="#FFD166" stopOpacity="0.2" />
                          <stop
                            offset="1"
                            stopColor="#FF6B6B"
                            stopOpacity="0"
                          />
                        </radialGradient>
                      </defs>
                    </svg>
                  </motion.div>

                  <div className="relative z-10 space-y-4 sm:space-y-6">
                    <div className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-full border border-orange-500/30 mb-2">
                      <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-orange-500"></span>
                      <span className="text-orange-300 font-semibold text-xs sm:text-sm tracking-wider">
                        DNA ANALYSIS TECHNOLOGY
                      </span>
                    </div>

                    <div className="mb-4 sm:mb-6">
                      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight">
                        <span className="block text-white">DECODE YOUR</span>
                        <span className="block" style={{ color: "#c8a257" }}>
                          GENETIC STORY!
                        </span>
                      </h1>
                    </div>

                    <div className="space-y-4 sm:space-y-5 mb-4 sm:mb-6">
                      <div className="text-center space-y-3">
                        <p className="text-sm sm:text-base md:text-lg font-bold text-orange-300">
                          We&apos;re analyzing both ways from;
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                          <div className="bg-orange-500/20 rounded-xl px-3 sm:px-4 py-2">
                            <span className="text-base sm:text-lg md:text-xl font-black text-orange-200">
                              PHENOTYPE
                            </span>
                          </div>
                          <motion.span
                            className="text-lg sm:text-xl md:text-2xl text-orange-300"
                            animate={{ rotate: [0, 180, 360] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            ⟷
                          </motion.span>
                          <div className="bg-red-500/20 rounded-xl px-3 sm:px-4 py-2">
                            <span className="text-base sm:text-lg md:text-xl font-black text-red-200">
                              GENOTYPE
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                      <p className="text-xs sm:text-sm md:text-base text-white/90 leading-relaxed">
                        Your DNA contains{" "}
                        <span className="font-bold text-orange-300">
                          99.9% similar
                        </span>{" "}
                        information but the{" "}
                        <span className="font-bold text-red-300">0.01%</span>{" "}
                        makes you unique!
                      </p>

                      <p className="text-xs sm:text-sm md:text-base text-white/90 leading-relaxed">
                        We are here to help you discover your uniqueness with{" "}
                        <span className="font-bold text-orange-400">
                          advanced DNA analysis
                        </span>
                        .
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-orange-100/20 to-red-100/20 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-orange-300/30 mb-4 sm:mb-6">
                      <div className="text-center">
                        <h3 className="text-sm sm:text-base md:text-lg font-bold text-orange-200">
                          For 23andME & Ancestry users!
                        </h3>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <Link href="/shop">
                        <Button className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs font-bold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-md shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300">
                          SHOP DNA TESTS
                        </Button>
                      </Link>
                      <Button className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs font-bold bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white rounded-md shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300">
                        LEARN MORE
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DNA Data Visualization Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 bg-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-32 h-32 bg-blue-100/30 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-blue-100/30 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-blue-100/30 rounded-full blur-xl animate-pulse delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-sm font-semibold mb-4">
              <Activity className="w-4 h-4 mr-2" />
              Advanced Analytics
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-4">
              Your DNA Data
              <span className="block text-blue-600">Insights Dashboard</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Comprehensive analysis of your genetic information with
              cutting-edge technology
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content - Modern Cards */}
            <div className="space-y-6">
              {/* Health Risk Card */}
              <motion.div
                className="group bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      Health Risk Analysis
                    </h3>
                    <p className="text-gray-600 font-medium text-sm">
                      Genetic predisposition insights
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                      <span className="font-semibold text-gray-800">
                        Heart Disease Risk
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-24 h-3 bg-gray-200 rounded-full mr-3">
                        <div className="w-1/3 h-3 bg-blue-500 rounded-full"></div>
                      </div>
                      <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        Low
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border border-gray-200">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                      <span className="font-semibold text-gray-800">
                        Type 2 Diabetes
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-24 h-3 bg-gray-200 rounded-full mr-3">
                        <div className="w-2/3 h-3 bg-blue-500 rounded-full"></div>
                      </div>
                      <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        Moderate
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border border-gray-200">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                      <span className="font-semibold text-gray-800">
                        Alzheimer&apos;s Disease
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-24 h-3 bg-gray-200 rounded-full mr-3">
                        <div className="w-1/4 h-3 bg-blue-500 rounded-full"></div>
                      </div>
                      <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        Low
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Ancestry Card */}
              <motion.div
                className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <PieChart className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      Ancestry Composition
                    </h3>
                    <p className="text-gray-600 font-medium">
                      Your ethnic background breakdown
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
                    <div className="text-2xl font-black text-blue-600 mb-2">
                      45%
                    </div>
                    <div className="text-sm font-semibold text-gray-700">
                      European
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
                    <div className="text-2xl font-black text-blue-600 mb-2">
                      30%
                    </div>
                    <div className="text-sm font-semibold text-gray-700">
                      Asian
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
                    <div className="text-2xl font-black text-blue-600 mb-2">
                      15%
                    </div>
                    <div className="text-sm font-semibold text-gray-700">
                      African
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
                    <div className="text-2xl font-black text-blue-600 mb-2">
                      10%
                    </div>
                    <div className="text-sm font-semibold text-gray-700">
                      Native American
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Content - Interactive Chart */}
            <div className="relative order-first lg:order-last">
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <DNADataChart />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Detailed Process */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 bg-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-20 h-20 bg-blue-100/30 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-16 h-16 bg-blue-100/30 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-blue-100/30 rounded-full blur-xl animate-pulse delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-sm font-semibold mb-4">
              <Clock className="w-4 h-4 mr-2" />
              Process Overview
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-4">
              How DNA Analysis
              <span className="block text-blue-600">Works</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              From sample collection to comprehensive genetic insights
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content - Process Steps */}
            <div className="space-y-6">
              <motion.div
                className="group flex items-start space-x-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Sample Collection
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-base">
                    Simple saliva collection using our sterile kit. Your sample
                    contains millions of cells with complete DNA information
                    ready for analysis.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="group flex items-start space-x-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Microscope className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    DNA Extraction
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-base">
                    Advanced laboratory techniques extract and purify your DNA
                    from saliva cells, preparing it for comprehensive genetic
                    sequencing.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="group flex items-start space-x-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Genetic Sequencing
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-base">
                    State-of-the-art sequencing technology reads over 700,000
                    genetic markers across your entire genome with 99.9%
                    accuracy.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="group flex items-start space-x-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Data Analysis
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-base">
                    AI-powered algorithms compare your genetic data against
                    scientific databases to identify health risks, traits, and
                    ancestry patterns.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right Content - Timeline */}
            <motion.div
              className="bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-center mb-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Processing Timeline
                </h3>
                <p className="text-gray-600 text-lg">
                  Step-by-step progress tracking
                </p>
              </div>

              <div className="space-y-6">
                <motion.div
                  className="flex items-center justify-between p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-lg font-bold mr-4 shadow-lg">
                      1
                    </div>
                    <div>
                      <span className="font-bold text-gray-900 text-lg">
                        Kit Delivery
                      </span>
                      <p className="text-sm text-gray-600">
                        Express shipping included
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                    2-3 days
                  </span>
                </motion.div>

                <motion.div
                  className="flex items-center justify-between p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-lg font-bold mr-4 shadow-lg">
                      2
                    </div>
                    <div>
                      <span className="font-bold text-gray-900 text-lg">
                        Sample Processing
                      </span>
                      <p className="text-sm text-gray-600">
                        DNA extraction & preparation
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                    1-2 weeks
                  </span>
                </motion.div>

                <motion.div
                  className="flex items-center justify-between p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-lg font-bold mr-4 shadow-lg">
                      3
                    </div>
                    <div>
                      <span className="font-bold text-gray-900 text-lg">
                        DNA Sequencing
                      </span>
                      <p className="text-sm text-gray-600">
                        700K+ genetic markers
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                    2-3 weeks
                  </span>
                </motion.div>

                <motion.div
                  className="flex items-center justify-between p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-lg font-bold mr-4 shadow-lg">
                      4
                    </div>
                    <div>
                      <span className="font-bold text-gray-900 text-lg">
                        Report Generation
                      </span>
                      <p className="text-sm text-gray-600">
                        AI analysis & insights
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                    3-5 days
                  </span>
                </motion.div>
              </div>

              <motion.div
                className="mt-10 text-center p-6 bg-blue-600 rounded-2xl text-white"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="text-3xl font-black mb-2">4-6 weeks</div>
                <div className="text-blue-100 font-semibold">
                  Total processing time
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results Preview - Split Layout */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 bg-gradient-to-br from-white via-slate-50 to-blue-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-24 h-24 bg-blue-200/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-20 h-20 bg-purple-200/20 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-200/20 rounded-full blur-xl animate-pulse delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Left Content - Video */}
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                <div className="relative">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-80 sm:h-96 md:h-[28rem] lg:h-[32rem] object-cover object-top rounded-3xl shadow-2xl border border-white/20 group-hover:scale-105 transition-transform duration-500"
                  >
                    <source src="/vbvb.MP4" type="video/mp4" />
                  </video>

                  {/* Floating Elements */}
                  <motion.div
                    className="absolute -top-6 -right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/20"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <div className="flex items-center">
                      <Eye className="w-5 h-5 text-blue-500 mr-2" />
                      <div>
                        <div className="text-sm font-bold text-gray-900">
                          Live Preview
                        </div>
                        <div className="text-xs text-gray-600">
                          Interactive Dashboard
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/20"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                  >
                    <div className="flex items-center">
                      <BarChart3 className="w-5 h-5 text-blue-500 mr-2" />
                      <div>
                        <div className="text-sm font-bold text-gray-900">
                          Real-time
                        </div>
                        <div className="text-xs text-gray-600">
                          Data Updates
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Right Content - Text and Features */}
            <motion.div
              className="order-1 lg:order-2 space-y-10"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full text-blue-700 text-sm font-semibold mb-6">
                  <Activity className="w-4 h-4 mr-2" />
                  Comprehensive Reports
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-4">
                  Detailed DNA
                  <span className="block bg-blue-600 bg-clip-text text-transparent">
                    Analysis
                  </span>
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8">
                  Get comprehensive insights presented through intuitive
                  dashboards and detailed explanations. Discover health risks,
                  nutrition advice, and ancestry information.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div
                  className="group flex items-center gap-4 p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 text-lg block">
                      Health Risk Analysis
                    </span>
                    <span className="text-sm text-gray-600">
                      Genetic predispositions
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  className="group flex items-center gap-4 p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 text-lg block">
                      Ancestry Mapping
                    </span>
                    <span className="text-sm text-gray-600">
                      Ethnic background
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  className="group flex items-center gap-4 p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 text-lg block">
                      Fitness & Nutrition
                    </span>
                    <span className="text-sm text-gray-600">
                      Personalized advice
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  className="group flex items-center gap-4 p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 text-lg block">
                      Drug Response
                    </span>
                    <span className="text-sm text-gray-600">
                      Medication insights
                    </span>
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              ></motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
