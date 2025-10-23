"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Users } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import StaggerReveal from "@/components/animations/StaggerReveal";

export default function CTASection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-500 to-blue-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-20 text-center">
        <ScrollReveal direction="up" delay={0.2}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-6 leading-tight">
            Ready to start your
            <span className="block text-blue-200">health journey?</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.4}>
          <p className="text-base sm:text-lg lg:text-xl text-blue-100 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed">
            Like thousands of our patients, get professional healthcare services
            from our virtual clinic. Consult with expert doctors from the
            comfort of your home and improve your health.
          </p>
        </ScrollReveal>

        <StaggerReveal staggerDelay={0.2} direction="up">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button className="bg-white text-blue-600 hover:bg-blue-50 px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300">
              Book Appointment Now
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            <Button
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-bold transition-all duration-300"
            >
              <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Get Genetic Test
            </Button>
          </div>
        </StaggerReveal>
      </div>
    </section>
  );
}
