"use client";

import { motion } from "framer-motion";
import { Stethoscope } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Image from "next/image";

const doctors = [
  {
    id: 1,
    name: "Gülsen Meral",
    specialty: "Assoc. Prof.",
    image: "/ddt6.png",
  },
  {
    id: 2,
    name: "Savaş Gür",
    specialty: "Doctor",
    image: "/ddt2.png",
  },
  {
    id: 3,
    name: "Yunus Alp",
    specialty: "Dr. Medical Geneticist",
    image: "/ddt3.png",
  },
  {
    id: 4,
    name: "Zübeyde Gündüz",
    specialty: "Prof. Dr.",
    image: "/ddt4.png",
  },
  {
    id: 5,
    name: "Neval Burkay",
    specialty: "Dietitian",
    image: "/ddt5.png",
  },
  {
    id: 6,
    name: "Aslıhan Özkur",
    specialty: "Dt.",
    image: "/ddt1.png",
  },
];

export default function DoctorsSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="text-center mb-12 sm:mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-600 hover:bg-blue-200 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3">
              <Stethoscope className="w-4 h-4 mr-2" />
              Our Expert Doctors
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Leading Specialists in
              <span className="block bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                Genetic Medicine
              </span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Make the right decisions for your health with our experienced
              doctors specialized in genetic analysis and counseling.
            </p>
          </div>
        </ScrollReveal>

        {/* Horizontal Scrolling Doctors */}
        <div className="relative overflow-hidden">
          {/* Gradient overlays for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>

          <div className="flex space-x-6 animate-scroll">
            {/* First set of doctors */}
            {doctors.map((doctor, index) => (
              <motion.div
                key={`first-${doctor.id}`}
                className="flex-shrink-0 w-80"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border-0 rounded-2xl flex flex-col h-96 group">
                  {/* Doctor Image */}
                  <div className="relative h-56 overflow-hidden bg-gray-200">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      width={280}
                      height={224}
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                      quality={95}
                      priority={index < 4}
                      unoptimized={true}
                      onError={(e) => {
                        console.error(`Failed to load image: ${doctor.image}`);
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                  </div>

                  {/* Doctor Info */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-4 flex-grow">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {doctor.name}
                      </h3>
                      <p className="text-blue-600 font-semibold text-base">
                        {doctor.specialty}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}

            {/* Second set of doctors for continuous loop */}
            {doctors.map((doctor, index) => (
              <motion.div
                key={`second-${doctor.id}`}
                className="flex-shrink-0 w-80"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.5,
                  delay: (index + doctors.length) * 0.1,
                }}
              >
                <Card className="overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border-0 rounded-2xl flex flex-col h-96 group">
                  {/* Doctor Image */}
                  <div className="relative h-56 overflow-hidden bg-gray-200">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      width={280}
                      height={224}
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                      quality={95}
                      priority={index < 4}
                      unoptimized={true}
                      onError={(e) => {
                        console.error(`Failed to load image: ${doctor.image}`);
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                  </div>

                  {/* Doctor Info */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-4 flex-grow">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {doctor.name}
                      </h3>
                      <p className="text-blue-600 font-semibold text-base">
                        {doctor.specialty}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 15s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
