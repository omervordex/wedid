"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, Plus, Minus } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import StaggerReveal from "@/components/animations/StaggerReveal";

export default function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "How quickly can I get an appointment?",
      answer:
        "Most appointments are available within 24 hours. For urgent consultations, we often have same-day availability. Our doctors are available 7 days a week to ensure you get the care you need when you need it.",
    },
    {
      question: "Is online consultation as effective as in-person visits?",
      answer:
        "Yes, online consultations are highly effective for many health conditions. Our doctors can diagnose, treat, and prescribe medications for a wide range of health issues. For conditions requiring physical examination, we'll recommend an in-person visit.",
    },
    {
      question: "What technology do I need for video consultations?",
      answer:
        "You only need a device with a camera and microphone (smartphone, tablet, or computer) and a stable internet connection. Our platform works on all major browsers and doesn't require any special software downloads.",
    },
    {
      question: "Can doctors prescribe medication online?",
      answer:
        "Yes, our licensed doctors can prescribe medications when medically appropriate. Prescriptions are sent electronically to your preferred pharmacy, and you'll receive notifications when they're ready for pickup.",
    },
    {
      question: "How secure is my health information?",
      answer:
        "Your health information is completely secure. We use bank-level encryption, are fully HIPAA compliant, and never share your data without your explicit consent. All consultations are private and confidential.",
    },
    {
      question: "What if I need follow-up care?",
      answer:
        "Follow-up care is easy to schedule through our platform. You can book additional appointments with the same doctor, send secure messages, and access all your medical records and treatment plans in one place.",
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-20">
        {/* Header */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="text-center mb-12 sm:mb-16">
            <Badge className="mb-4 sm:mb-6 bg-blue-100 text-blue-800 px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base">
              <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Got Questions?
            </Badge>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 text-black">
              Frequently Asked Questions
            </h2>

            <p className="text-base sm:text-lg lg:text-xl text-blue-600 leading-relaxed">
              Everything you need to know about our online consultation process
            </p>
          </div>
        </ScrollReveal>

        {/* FAQ Items */}
        <StaggerReveal staggerDelay={0.1} direction="up">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <ScrollReveal
                key={index}
                direction="up"
                delay={0.3 + index * 0.1}
              >
                <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 rounded-2xl overflow-hidden">
                  <CardContent className="p-0">
                    <button
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-blue-50 transition-colors"
                      onClick={() =>
                        setOpenFAQ(openFAQ === index ? null : index)
                      }
                    >
                      <span className="text-lg font-semibold text-black pr-4">
                        {faq.question}
                      </span>
                      <div className="flex-shrink-0">
                        {openFAQ === index ? (
                          <Minus className="w-6 h-6 text-blue-600" />
                        ) : (
                          <Plus className="w-6 h-6 text-blue-500" />
                        )}
                      </div>
                    </button>

                    {openFAQ === index && (
                      <div className="px-6 pb-6">
                        <div className="pt-4 border-t border-blue-100">
                          <p className="text-blue-700 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </StaggerReveal>
      </div>
    </section>
  );
}
