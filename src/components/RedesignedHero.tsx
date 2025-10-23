"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { useRouter } from "next/navigation";

export default function RedesignedHero() {
  const router = useRouter();

  const handleLearnMore = () => {
    router.push("/dna");
  };

  return (
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
          <source src="/tyty.MP4" type="video/mp4" />
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
              {/* Left Content */}
              <div className="relative lg:ml-0 ml-0 sm:ml-4 lg:ml-0">
                {/* Background Elements */}
                <motion.div
                  className="absolute -left-10 -top-10 w-32 h-32 opacity-20"
                  animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
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
                        <stop offset="1" stopColor="#FF6B6B" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                  </svg>
                </motion.div>

                <div className="relative z-10 space-y-4 sm:space-y-6">
                  <ScrollReveal direction="left" delay={0.2}>
                    <div className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-full border border-orange-500/30 mb-2">
                      <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-orange-500"></span>
                      <span className="text-orange-300 font-semibold text-xs sm:text-sm tracking-wider">
                        EPIGENETIC COACHING
                      </span>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal direction="left" delay={0.3}>
                    <div className="mb-4 sm:mb-6">
                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight">
                        <span className="block text-white">YOUR DNA IS</span>
                        <span className="block" style={{ color: "#c8a257" }}>
                          NOT YOUR DESTINY!
                        </span>
                      </h1>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal direction="left" delay={0.4}>
                    <div className="space-y-4 sm:space-y-5 mb-4 sm:mb-6">
                      <div className="text-center space-y-3">
                        <p className="text-sm sm:text-base md:text-lg font-bold text-orange-300">
                          We&apos;re going both ways from;
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
                  </ScrollReveal>

                  <ScrollReveal direction="left" delay={0.5}>
                    <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                      <p className="text-xs sm:text-sm md:text-base text-white/90 leading-relaxed">
                        Our DNA&apos;s may be{" "}
                        <span className="font-bold text-orange-300">
                          99.9% similar
                        </span>{" "}
                        but the{" "}
                        <span className="font-bold text-red-300">0.01%</span>{" "}
                        makes you unique!
                      </p>

                      <p className="text-xs sm:text-sm md:text-base text-white/90 leading-relaxed">
                        We are here to help you discover your uniqueness with{" "}
                        <span className="font-bold text-orange-400">
                          epigenetic coaching
                        </span>
                        .
                      </p>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal direction="left" delay={0.6}>
                    <div className="bg-gradient-to-r from-orange-100/20 to-red-100/20 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-orange-300/30 mb-4 sm:mb-6">
                      <div className="text-center">
                        <h3 className="text-sm sm:text-base md:text-lg font-bold text-orange-200">
                          For 23andME & Ancestry users!
                        </h3>
                      </div>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal direction="left" delay={0.7}>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <Button
                        onClick={handleLearnMore}
                        className="px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-bold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
                      >
                        LEARN MORE
                      </Button>
                      <Button className="px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-bold bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300">
                        READY TO START?
                      </Button>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
