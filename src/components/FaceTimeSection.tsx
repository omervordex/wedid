"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Video,
  Mic,
  MessageSquare,
  MoreHorizontal,
  PhoneCall,
} from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import StaggerReveal from "@/components/animations/StaggerReveal";
import FadeInScale from "@/components/animations/FadeInScale";
import { useEffect, useRef } from "react";

export default function FaceTimeSection() {
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Smooth auto scroll with continuous loop
    let scrollInterval: NodeJS.Timeout;
    let isScrollingDown = true;
    let currentPosition = 0;

    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (chatRef.current) {
          const maxScroll =
            chatRef.current.scrollHeight - chatRef.current.clientHeight;

          if (isScrollingDown) {
            currentPosition += 1; // Slow scroll down
            if (currentPosition >= maxScroll) {
              isScrollingDown = false;
              // Wait a bit at bottom
              setTimeout(() => {
                isScrollingDown = false;
              }, 2000);
            }
          } else {
            currentPosition -= 1; // Slow scroll up
            if (currentPosition <= 0) {
              isScrollingDown = true;
              currentPosition = 0;
              // Wait a bit at top
              setTimeout(() => {
                isScrollingDown = true;
              }, 2000);
            }
          }

          chatRef.current.scrollTo({
            top: currentPosition,
            behavior: "smooth",
          });
        }
      }, 100); // Scroll every 100ms for smooth movement
    };

    // Start auto scroll after initial delay
    const startTimer = setTimeout(startAutoScroll, 2000);

    return () => {
      clearTimeout(startTimer);
      if (scrollInterval) {
        clearInterval(scrollInterval);
      }
    };
  }, []);

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
        {/* Header */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="text-center mb-6 sm:mb-8 mt-6 sm:mt-8 px-4 sm:px-8">
            <Badge className="mb-4 sm:mb-6 bg-blue-100 text-blue-600 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base">
              <Video className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Video Call
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 text-gray-900">
              How to Start Your
              <span className="block text-blue-600">Video Consultation</span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Connect with qualified doctors instantly. Schedule your
              appointment, join the video call, and get professional medical
              consultation from the comfort of your home.
            </p>
          </div>
        </ScrollReveal>

        {/* Main Content - 3 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 items-start">
          {/* Left - FaceTime Interface */}
          <ScrollReveal direction="left" delay={0.4}>
            <div className="lg:col-span-1 order-1 lg:order-1">
              <FadeInScale delay={0.6} scale={0.9}>
                <Card className="bg-black rounded-3xl overflow-hidden shadow-2xl border-0">
                  <CardContent className="p-0">
                    {/* FaceTime Header */}
                    <div className="bg-gray-900 px-4 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 text-blue-600 rounded-full"></div>
                      </div>
                      <div className="text-white text-sm font-medium">
                        FaceTime
                      </div>
                      <div className="w-6"></div>
                    </div>

                    {/* Video Call Area */}
                    <div className="relative bg-gray-900 aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4]">
                      {/* Main Doctor Video */}
                      <div className="absolute inset-2 sm:inset-4 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl sm:rounded-2xl overflow-hidden">
                        <div className="relative w-full h-full">
                          {/* Doctor Video */}
                          <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover"
                          >
                            <source src="/ben.mp4" type="video/mp4" />
                          </video>
                          {/* Overlay for better text readability */}
                          <div className="absolute inset-0 bg-black/20"></div>

                          <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4">
                            <div className="bg-black/60 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-1 sm:py-2">
                              <p className="text-white font-semibold text-xs sm:text-sm">
                                Dr. Sarah Mitchell
                              </p>
                              <p className="text-blue-200 text-xs">
                                Cardiologist
                              </p>
                            </div>
                          </div>

                          {/* Connection Status */}
                          <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
                            <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                              LIVE
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Patient Video (Small) */}
                      <div className="absolute top-3 sm:top-6 right-3 sm:right-6 w-16 h-20 sm:w-20 sm:h-28 bg-gray-700 rounded-lg sm:rounded-xl overflow-hidden border-2 border-white/20">
                        <div className="relative w-full h-full">
                          <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover"
                          >
                            <source src="/sen.mp4" type="video/mp4" />
                          </video>
                        </div>
                        <div className="absolute bottom-1 left-1 right-1">
                          <div className="bg-black/70 rounded px-1 py-0.5">
                            <p className="text-white text-xs font-medium">
                              You
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Call Duration */}
                      <div className="absolute top-3 sm:top-6 left-3 sm:left-6">
                        <div className="bg-black/50 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-1">
                          <p className="text-white text-xs sm:text-sm font-mono">
                            15:42
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Control Buttons */}
                    <div className="bg-gray-900 px-3 sm:px-6 py-3 sm:py-4">
                      <div className="flex items-center justify-center gap-2 sm:gap-4">
                        <Button
                          size="icon"
                          className="w-8 h-8 sm:w-12 sm:h-12 bg-gray-700 hover:bg-gray-600 text-white rounded-full"
                        >
                          <Mic className="w-3 h-3 sm:w-5 sm:h-5" />
                        </Button>
                        <Button
                          size="icon"
                          className="w-8 h-8 sm:w-12 sm:h-12 bg-gray-700 hover:bg-gray-600 text-white rounded-full"
                        >
                          <Video className="w-3 h-3 sm:w-5 sm:h-5" />
                        </Button>
                        <Button
                          size="icon"
                          className="w-10 h-10 sm:w-14 sm:h-14 bg-red-500 hover:bg-red-600 text-white rounded-full"
                        >
                          <PhoneCall className="w-4 h-4 sm:w-6 sm:h-6" />
                        </Button>
                        <Button
                          size="icon"
                          className="w-8 h-8 sm:w-12 sm:h-12 bg-gray-700 hover:bg-gray-600 text-white rounded-full"
                        >
                          <MessageSquare className="w-3 h-3 sm:w-5 sm:h-5" />
                        </Button>
                        <Button
                          size="icon"
                          className="w-8 h-8 sm:w-12 sm:h-12 bg-gray-700 hover:bg-gray-600 text-white rounded-full"
                        >
                          <MoreHorizontal className="w-3 h-3 sm:w-5 sm:h-5" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeInScale>
            </div>
          </ScrollReveal>

          {/* Second - Live Doctor Conversation */}
          <ScrollReveal direction="up" delay={0.6}>
            <div className="lg:col-span-1 space-y-4 sm:space-y-6 order-2 lg:order-2">
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Live Doctor Conversation
                </h3>

                <StaggerReveal staggerDelay={0.3} direction="left">
                  {/* Conversation Messages */}
                  <div
                    ref={chatRef}
                    className="chat-container space-y-3 sm:space-y-4 max-h-60 sm:max-h-80 overflow-y-auto"
                  >
                    {/* Doctor Message */}
                    <div className="flex gap-2 sm:gap-3">
                      <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-sm sm:text-lg">
                          👩‍⚕️
                        </span>
                      </div>
                      <div className="bg-blue-100 rounded-2xl rounded-tl-sm p-3 sm:p-5 max-w-xs sm:max-w-sm shadow-sm border border-blue-200">
                        <p className="text-gray-800 text-sm sm:text-base font-medium leading-relaxed">
                          Hello! I&apos;m Dr. Sarah Mitchell. How can I help you
                          today?
                        </p>
                        <span className="text-xs text-blue-600 font-semibold">
                          2:32 PM
                        </span>
                      </div>
                    </div>

                    {/* Patient Message */}
                    <div className="flex gap-2 sm:gap-3 justify-end">
                      <div className="bg-green-100 rounded-2xl rounded-tr-sm p-3 sm:p-5 max-w-xs sm:max-w-sm shadow-sm border border-green-200">
                        <p className="text-gray-800 text-sm sm:text-base font-medium leading-relaxed">
                          Hi doctor, I&apos;ve been having headaches recently
                          and I&apos;m worried about them.
                        </p>
                        <span className="text-xs text-green-600 font-semibold">
                          2:33 PM
                        </span>
                      </div>
                      <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-sm sm:text-lg">
                          👤
                        </span>
                      </div>
                    </div>

                    {/* Doctor Message */}
                    <div className="flex gap-2 sm:gap-3">
                      <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-sm sm:text-lg">
                          👩‍⚕️
                        </span>
                      </div>
                      <div className="bg-blue-100 rounded-2xl rounded-tl-sm p-3 sm:p-5 max-w-xs sm:max-w-sm shadow-sm border border-blue-200">
                        <p className="text-gray-800 text-sm sm:text-base font-medium leading-relaxed">
                          I understand your concern. How long have you been
                          experiencing these headaches? How often do they occur?
                        </p>
                        <span className="text-xs text-blue-600 font-semibold">
                          2:34 PM
                        </span>
                      </div>
                    </div>

                    {/* Patient Message */}
                    <div className="flex gap-2 sm:gap-3 justify-end">
                      <div className="bg-green-100 rounded-2xl rounded-tr-sm p-3 sm:p-5 max-w-xs sm:max-w-sm shadow-sm border border-green-200">
                        <p className="text-gray-800 text-sm sm:text-base font-medium leading-relaxed">
                          It&apos;s been about a week now, happening 2-3 times a
                          day. They seem to get worse when I&apos;m stressed.
                        </p>
                        <span className="text-xs text-green-600 font-semibold">
                          2:35 PM
                        </span>
                      </div>
                      <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-sm sm:text-lg">
                          👤
                        </span>
                      </div>
                    </div>

                    {/* Doctor Message */}
                    <div className="flex gap-2 sm:gap-3">
                      <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-sm sm:text-lg">
                          👩‍⚕️
                        </span>
                      </div>
                      <div className="bg-blue-100 rounded-2xl rounded-tl-sm p-3 sm:p-5 max-w-xs sm:max-w-sm shadow-sm border border-blue-200">
                        <p className="text-gray-800 text-sm sm:text-base font-medium leading-relaxed">
                          This sounds like tension headaches related to stress.
                          Let me create a treatment plan for you.
                        </p>
                        <span className="text-xs text-blue-600 font-semibold">
                          2:36 PM
                        </span>
                      </div>
                    </div>

                    {/* Patient Message */}
                    <div className="flex gap-2 sm:gap-3 justify-end">
                      <div className="bg-green-100 rounded-2xl rounded-tr-sm p-3 sm:p-5 max-w-xs sm:max-w-sm shadow-sm border border-green-200">
                        <p className="text-gray-800 text-sm sm:text-base font-medium leading-relaxed">
                          Thank you doctor. What do you recommend I should do?
                        </p>
                        <span className="text-xs text-green-600 font-semibold">
                          2:37 PM
                        </span>
                      </div>
                      <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-sm sm:text-lg">
                          👤
                        </span>
                      </div>
                    </div>

                    {/* Doctor Message */}
                    <div className="flex gap-2 sm:gap-3">
                      <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-sm sm:text-lg">
                          👩‍⚕️
                        </span>
                      </div>
                      <div className="bg-blue-100 rounded-2xl rounded-tl-sm p-3 sm:p-5 max-w-xs sm:max-w-sm shadow-sm border border-blue-200">
                        <p className="text-gray-800 text-sm sm:text-base font-medium leading-relaxed">
                          I&apos;ll recommend stress management techniques
                          first. I can also prescribe medication if needed.
                        </p>
                        <span className="text-xs text-blue-600 font-semibold">
                          2:38 PM
                        </span>
                      </div>
                    </div>

                    {/* Patient Message */}
                    <div className="flex gap-2 sm:gap-3 justify-end">
                      <div className="bg-green-100 rounded-2xl rounded-tr-sm p-3 sm:p-5 max-w-xs sm:max-w-sm shadow-sm border border-green-200">
                        <p className="text-gray-800 text-sm sm:text-base font-medium leading-relaxed">
                          That sounds good. When should I follow up with you?
                        </p>
                        <span className="text-xs text-green-600 font-semibold">
                          2:39 PM
                        </span>
                      </div>
                      <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-sm sm:text-lg">
                          👤
                        </span>
                      </div>
                    </div>

                    {/* Doctor Message */}
                    <div className="flex gap-2 sm:gap-3">
                      <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-sm sm:text-lg">
                          👩‍⚕️
                        </span>
                      </div>
                      <div className="bg-blue-100 rounded-2xl rounded-tl-sm p-3 sm:p-5 max-w-xs sm:max-w-sm shadow-sm border border-blue-200">
                        <p className="text-gray-800 text-sm sm:text-base font-medium leading-relaxed">
                          Let&apos;s schedule a follow-up in 2 weeks. I&apos;ll
                          send you the prescription and treatment plan now.
                        </p>
                        <span className="text-xs text-blue-600 font-semibold">
                          2:40 PM
                        </span>
                      </div>
                    </div>
                  </div>
                </StaggerReveal>

                {/* Dual Communication Options */}
                <div className="pt-6 border-t border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">
                    Dual Communication Options
                  </h4>

                  <StaggerReveal staggerDelay={0.1} direction="up">
                    <div className="space-y-3">
                      {/* Step 1 - Video Call */}
                      <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                        <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                          <Video className="w-3 h-3 text-white" />
                        </div>
                        <div>
                          <h5 className="text-sm font-medium text-gray-900">
                            Video Call
                          </h5>
                          <p className="text-xs text-gray-600">
                            Face-to-face consultation with your doctor
                          </p>
                        </div>
                      </div>

                      {/* Step 2 - Live Chat */}
                      <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                        <div className="flex-shrink-0 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                          <MessageSquare className="w-3 h-3 text-white" />
                        </div>
                        <div>
                          <h5 className="text-sm font-medium text-gray-900">
                            Live Chat
                          </h5>
                          <p className="text-xs text-gray-600">
                            Real-time messaging during consultation
                          </p>
                        </div>
                      </div>

                      {/* Step 3 - Combined */}
                      <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                        <div className="flex-shrink-0 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                          <PhoneCall className="w-3 h-3 text-white" />
                        </div>
                        <div>
                          <h5 className="text-sm font-medium text-gray-900">
                            Both Together
                          </h5>
                          <p className="text-xs text-gray-600">
                            Use video and chat simultaneously
                          </p>
                        </div>
                      </div>
                    </div>
                  </StaggerReveal>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right - Demo Video with Cloud */}
          <ScrollReveal direction="right" delay={0.8}>
            <div className="lg:col-span-1 order-3 lg:order-3">
              <FadeInScale delay={1.0} scale={0.9}>
                <div className="relative">
                  {/* Cloud with Text */}
                  <div className="relative mb-3 sm:mb-4">
                    <div className="bg-blue-600 rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 relative">
                      <div className="text-center">
                        <h3 className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2">
                          Start Video Call in 1 Click
                        </h3>
                        <p className="text-sm sm:text-lg text-white">
                          No waiting, start immediately!
                        </p>
                      </div>
                      {/* Cloud tail */}
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-600 transform rotate-45"></div>
                      </div>
                    </div>
                  </div>

                  {/* Video */}
                  <div className="relative">
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] object-cover rounded-2xl sm:rounded-3xl"
                    >
                      <source src="/ghgh.mp4" type="video/mp4" />
                    </video>
                  </div>
                </div>
              </FadeInScale>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
