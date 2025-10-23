"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Sparkles,
  MessageCircle,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });

    setIsSubmitting(false);
    alert("Thank you for your message! We'll get back to you soon.");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-slate-50 py-20 lg:py-32 relative overflow-hidden">
        {/* Enhanced floating background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-24 h-24 bg-blue-200 rounded-full opacity-20 animate-float"></div>
          <div className="absolute top-40 right-20 w-20 h-20 bg-blue-300 rounded-full opacity-30 animate-float animate-delay-400"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-blue-400 rounded-full opacity-25 animate-rotate-slow"></div>
          <div className="absolute top-1/2 right-1/3 w-12 h-12 bg-blue-100 rounded-full opacity-40 animate-float animate-delay-600"></div>
          <div className="absolute bottom-1/3 right-10 w-14 h-14 bg-blue-200 rounded-full opacity-30 animate-float animate-delay-800"></div>
          <div className="absolute top-1/3 left-1/3 w-8 h-8 bg-blue-300 rounded-full opacity-50 animate-float animate-delay-1000"></div>
          <div className="absolute bottom-1/4 right-1/4 w-10 h-10 bg-blue-100 rounded-full opacity-35 animate-float animate-delay-1200"></div>
          <div className="absolute top-2/3 left-1/2 w-6 h-6 bg-blue-400 rounded-full opacity-45 animate-float animate-delay-1400"></div>
        </div>

        {/* Decorative grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        <div className="max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Enhanced Logo Section */}
          <div className="flex items-center justify-center space-x-6 mb-12 animate-bounce-in">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 animate-pulse-glow"></div>
              <Image
                src="/logo.avif"
                alt="Epigenetic Coaching Logo"
                width={100}
                height={100}
                className="relative rounded-3xl shadow-2xl group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute -top-3 -right-3">
                <Sparkles className="w-8 h-8 text-blue-500 animate-pulse" />
              </div>
            </div>
            <div className="text-left">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                Epigenetic Coaching
              </h2>
              <p className="text-lg text-blue-600 font-semibold">
                Personalized Health Solutions
              </p>
            </div>
          </div>

          {/* Enhanced Title Section */}
          <div className="mb-8 animate-bounce-in animate-delay-200">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 contact-hero-title">
                <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  Contact
                </span>{" "}
                <span className="text-gray-800">Us</span>
              </h1>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded-full"></div>
          </div>

          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto animate-slide-up animate-delay-400 contact-hero-subtitle">
            Have questions about our services or need support? We&apos;re here
            to help. Reach out to our team of experts who are ready to assist
            you on your personalized health journey.
          </p>

          {/* Quick Contact Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 animate-slide-up animate-delay-600">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-2xl hover:scale-105 transition-all duration-500 group cursor-pointer">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 group-hover:scale-110 transition-all duration-300">
                <Clock className="w-6 h-6 text-blue-600 group-hover:animate-pulse" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                24/7 Support
              </h3>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                Round-the-clock assistance
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-2xl hover:scale-105 transition-all duration-500 group cursor-pointer">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 group-hover:scale-110 transition-all duration-300">
                <Phone className="w-6 h-6 text-blue-600 group-hover:animate-bounce" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                Expert Team
              </h3>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                Medical professionals ready to help
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-2xl hover:scale-105 transition-all duration-500 group cursor-pointer">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 group-hover:scale-110 transition-all duration-300">
                <Mail className="w-6 h-6 text-blue-600 group-hover:animate-pulse" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                Quick Response
              </h3>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                Get answers within 24 hours
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-blue-200 rounded-full opacity-30 animate-float animate-delay-400"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-300 rounded-full opacity-25 animate-float animate-delay-800"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-blue-100 rounded-full opacity-30 animate-float animate-delay-1200"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Enhanced Contact Form */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Send us a <span className="text-blue-600">Message</span>
                </h2>
                <p className="text-lg text-gray-600">
                  Fill out the form below and we&apos;ll get back to you within
                  24 hours. Our team is ready to help with any questions you may
                  have.
                </p>
              </div>

              <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm contact-form-container hover:shadow-3xl hover:scale-[1.02] transition-all duration-500 group">
                <CardContent className="p-6 sm:p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label
                          htmlFor="name"
                          className="text-sm font-semibold text-gray-700 flex items-center"
                        >
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Your full name"
                          className="h-12 border-2 border-gray-200 focus:border-blue-500 hover:border-blue-300 transition-all duration-300 rounded-xl group-hover:shadow-lg"
                        />
                      </div>
                      <div className="space-y-3">
                        <label
                          htmlFor="email"
                          className="text-sm font-semibold text-gray-700 flex items-center"
                        >
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="your.email@example.com"
                          className="h-12 border-2 border-gray-200 focus:border-blue-500 hover:border-blue-300 transition-all duration-300 rounded-xl group-hover:shadow-lg"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label
                          htmlFor="phone"
                          className="text-sm font-semibold text-gray-700 flex items-center"
                        >
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 123-4567"
                          className="h-12 border-2 border-gray-200 focus:border-blue-500 hover:border-blue-300 transition-all duration-300 rounded-xl group-hover:shadow-lg"
                        />
                      </div>
                      <div className="space-y-3">
                        <label
                          htmlFor="subject"
                          className="text-sm font-semibold text-gray-700 flex items-center"
                        >
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                          Subject *
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          placeholder="How can we help?"
                          className="h-12 border-2 border-gray-200 focus:border-blue-500 hover:border-blue-300 transition-all duration-300 rounded-xl group-hover:shadow-lg"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label
                        htmlFor="message"
                        className="text-sm font-semibold text-gray-700 flex items-center"
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        placeholder="Please provide details about your inquiry..."
                        className="border-2 border-gray-200 focus:border-blue-500 hover:border-blue-300 transition-all duration-300 rounded-xl resize-none group-hover:shadow-lg"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-[1.05] hover:-translate-y-1 group-hover:animate-pulse"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                          Sending...
                        </div>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-3" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Contact Information */}
            <div className="space-y-6">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Get in <span className="text-blue-600">Touch</span>
                </h2>
                <p className="text-lg text-gray-600">
                  Multiple ways to reach our team of experts
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {/* Location Card */}
                <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl hover:scale-105 transition-all duration-500 group contact-info-card cursor-pointer">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl flex items-center text-gray-900 group-hover:text-blue-600 transition-colors">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      Our Location
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="font-bold text-lg text-gray-900">
                        Epigenetic Coaching Headquarters
                      </p>
                      <div className="space-y-1 text-gray-600">
                        <p>4567 Hollywood Hills Drive</p>
                        <p>Building B, Floor 3</p>
                        <p>Beverly Hills, CA 90210</p>
                        <p>United States</p>
                      </div>
                      <div className="pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-blue-200 text-blue-600 hover:bg-blue-50"
                        >
                          Get Directions
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Phone Support Card */}
                <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl hover:scale-105 transition-all duration-500 group cursor-pointer">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl flex items-center text-gray-900 group-hover:text-blue-600 transition-colors">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      Phone Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-xl">
                        <p className="font-semibold text-gray-900 mb-1">
                          Customer Support
                        </p>
                        <p className="text-blue-600 font-medium text-lg">
                          +1 (555) 123-4567
                        </p>
                        <p className="text-sm text-gray-500">
                          General inquiries & support
                        </p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-xl">
                        <p className="font-semibold text-gray-900 mb-1">
                          Medical Team
                        </p>
                        <p className="text-green-600 font-medium text-lg">
                          +1 (555) 123-4568
                        </p>
                        <p className="text-sm text-gray-500">
                          Medical consultations
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Email Support Card */}
                <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl hover:scale-105 transition-all duration-500 group cursor-pointer">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl flex items-center text-gray-900 group-hover:text-blue-600 transition-colors">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      Email Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                        <div>
                          <p className="font-semibold text-gray-900">
                            General Inquiries
                          </p>
                          <p className="text-sm text-gray-500">
                            info@wedid.com
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          Copy
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors">
                        <div>
                          <p className="font-semibold text-gray-900">
                            Medical Questions
                          </p>
                          <p className="text-sm text-gray-500">
                            medical@wedid.com
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-green-600 hover:text-green-700"
                        >
                          Copy
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors">
                        <div>
                          <p className="font-semibold text-gray-900">
                            Technical Support
                          </p>
                          <p className="text-sm text-gray-500">
                            support@wedid.com
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-purple-600 hover:text-purple-700"
                        >
                          Copy
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Business Hours Card */}
                <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl hover:scale-105 transition-all duration-500 group cursor-pointer">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl flex items-center text-gray-900 group-hover:text-blue-600 transition-colors">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      Business Hours
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="font-medium text-gray-700">
                          Monday - Friday
                        </span>
                        <span className="font-bold text-green-700">
                          8:00 AM - 8:00 PM PST
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="font-medium text-gray-700">
                          Saturday
                        </span>
                        <span className="font-bold text-blue-700">
                          9:00 AM - 5:00 PM PST
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium text-gray-700">
                          Sunday
                        </span>
                        <span className="font-bold text-gray-500">Closed</span>
                      </div>
                      <div className="pt-2 text-center">
                        <p className="text-sm text-gray-500">
                          <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                          Currently Open
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Map Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 relative overflow-hidden">
        {/* Enhanced background decoration */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-blue-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-300 rounded-full opacity-15 animate-rotate-slow"></div>
        <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-blue-100 rounded-full opacity-25 animate-float animate-delay-600"></div>
        <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-blue-200 rounded-full opacity-30 animate-float animate-delay-800"></div>
        <div className="absolute top-1/4 right-1/3 w-12 h-12 bg-blue-400 rounded-full opacity-35 animate-float animate-delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/3 w-18 h-18 bg-blue-100 rounded-full opacity-25 animate-float animate-delay-1200"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 animate-bounce-in">
              Visit Our{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Office
              </span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 animate-slide-up animate-delay-200 max-w-3xl mx-auto">
              Located in the prestigious Beverly Hills district, our modern
              facility is designed to provide the best experience for our
              clients.
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded-full mt-6"></div>
          </div>

          {/* Real Google Maps Integration */}
          <div className="relative">
            <div className="w-full h-[400px] sm:h-[500px] rounded-2xl overflow-hidden shadow-2xl contact-map-container">
              {/* Google Maps Embed */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3304.1234567890!2d-118.4000000!3d34.0730000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBeverly%20Hills%2C%20CA%2090210!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl"
                title="Epigenetic Coaching Location - Beverly Hills, CA"
              ></iframe>

              {/* Map overlay with address info */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg max-w-xs">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">
                      Our Location
                    </h4>
                    <p className="text-xs text-gray-600">
                      4567 Hollywood Hills Drive
                      <br />
                      Beverly Hills, CA 90210
                    </p>
                  </div>
                </div>
              </div>

              {/* Action buttons overlay */}
              <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg text-sm"
                  onClick={() =>
                    window.open(
                      "https://maps.google.com/maps?q=4567+Hollywood+Hills+Drive,+Beverly+Hills,+CA+90210",
                      "_blank"
                    )
                  }
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Directions
                </Button>
                <Button
                  variant="outline"
                  className="bg-white/95 backdrop-blur-sm border-blue-200 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm"
                  onClick={() =>
                    window.open(
                      "https://maps.google.com/maps?q=4567+Hollywood+Hills+Drive,+Beverly+Hills,+CA+90210&layer=c",
                      "_blank"
                    )
                  }
                >
                  Street View
                </Button>
              </div>
            </div>

            {/* Location info cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl hover:scale-105 transition-all duration-500 group cursor-pointer">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 group-hover:scale-110 transition-all duration-300">
                  <Clock className="w-6 h-6 text-blue-600 group-hover:animate-pulse" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  Office Hours
                </h4>
                <p className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors duration-300">
                  Mon-Fri: 8AM-8PM
                  <br />
                  Sat: 9AM-5PM
                </p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl hover:scale-105 transition-all duration-500 group cursor-pointer">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 group-hover:scale-110 transition-all duration-300">
                  <MapPin className="w-6 h-6 text-green-600 group-hover:animate-bounce" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
                  Parking
                </h4>
                <p className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors duration-300">
                  Free parking available
                  <br />
                  in our building garage
                </p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl hover:scale-105 transition-all duration-500 group cursor-pointer">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-200 group-hover:scale-110 transition-all duration-300">
                  <Phone className="w-6 h-6 text-purple-600 group-hover:animate-pulse" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                  Accessibility
                </h4>
                <p className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors duration-300">
                  Fully accessible
                  <br />
                  wheelchair friendly
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced FAQ Section */}
      <section className="py-24 bg-gradient-to-br from-white via-blue-50 to-white relative overflow-hidden">
        {/* Enhanced background decoration */}
        <div className="absolute top-10 right-10 w-24 h-24 bg-blue-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-blue-300 rounded-full opacity-15 animate-rotate-slow"></div>
        <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-blue-100 rounded-full opacity-25 animate-float animate-delay-600"></div>
        <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-blue-200 rounded-full opacity-30 animate-float animate-delay-800"></div>
        <div className="absolute top-2/3 right-1/3 w-14 h-14 bg-blue-400 rounded-full opacity-35 animate-float animate-delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/4 w-18 h-18 bg-blue-100 rounded-full opacity-25 animate-float animate-delay-1200"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20 animate-slide-up">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 animate-bounce-in">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 animate-slide-up animate-delay-200 max-w-3xl mx-auto">
              Quick answers to common questions about our services and support
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded-full mt-6"></div>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "How quickly will I receive a response?",
                answer:
                  "We typically respond to all inquiries within 24 hours during business days. For urgent medical questions, our medical team aims to respond within 4-6 hours. We also offer priority support for premium members.",
                icon: Clock,
                color: "blue",
              },
              {
                question: "Can I schedule a phone consultation?",
                answer:
                  "Yes! After purchasing a kit or if you're an existing customer, you can schedule phone or video consultations with our genetic counselors and medical team. Consultations are available Monday through Saturday.",
                icon: Phone,
                color: "green",
              },
              {
                question: "Do you offer support in other languages?",
                answer:
                  "Currently, we provide support in English and Spanish. We're working to expand our multilingual support to better serve our diverse customer base. Additional languages will be available soon.",
                icon: MessageCircle,
                color: "purple",
              },
              {
                question: "What if I have technical issues with my account?",
                answer:
                  "For technical support, please email support@wedid.com or use the contact form above. Include details about the issue and your account information for faster resolution. We also have a comprehensive help center.",
                icon: Mail,
                color: "orange",
              },
              {
                question: "Is my personal health information secure?",
                answer:
                  "Absolutely. We use enterprise-grade encryption and follow HIPAA compliance standards to protect your personal health information. Your data is never shared without your explicit consent.",
                icon: Sparkles,
                color: "indigo",
              },
              {
                question: "What payment methods do you accept?",
                answer:
                  "We accept all major credit cards, PayPal, and offer flexible payment plans for our premium services. All transactions are processed securely through our encrypted payment system.",
                icon: Clock,
                color: "teal",
              },
            ].map((faq, index) => (
              <Card
                key={index}
                className={`border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 animate-bounce-in animate-delay-${
                  (index + 1) * 200
                } group hover:scale-[1.03] hover:-translate-y-2 overflow-hidden contact-faq-card cursor-pointer`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-12 h-12 bg-${faq.color}-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-${faq.color}-200 transition-all duration-300`}
                    >
                      <faq.icon
                        className={`w-6 h-6 text-${faq.color}-600 group-hover:animate-pulse`}
                      />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 mb-3">
                        {faq.question}
                      </CardTitle>
                      <CardDescription className="text-base text-gray-600 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed">
                        {faq.answer}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                {/* Decorative border */}
                <div
                  className={`h-1 bg-gradient-to-r from-${faq.color}-400 to-${faq.color}-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>
              </Card>
            ))}
          </div>

          {/* Additional Help Section */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 group cursor-pointer">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                Still have questions?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto group-hover:text-gray-700 transition-colors duration-300">
                Our support team is here to help. Contact us directly for
                personalized assistance with any questions or concerns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 transform hover:-translate-y-1">
                  Contact Support
                </Button>
                <Button
                  variant="outline"
                  className="border-blue-200 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-xl hover:scale-105 transition-all duration-300 transform hover:-translate-y-1"
                >
                  View Help Center
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
