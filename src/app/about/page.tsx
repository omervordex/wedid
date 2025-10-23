import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  Award,
  Shield,
  Target,
  Heart,
  Microscope,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const stats = [
    { label: "Happy Customers", value: "10,000+", icon: Users },
    { label: "Years of Experience", value: "15+", icon: Award },
    { label: "Tests Processed", value: "50,000+", icon: Microscope },
    { label: "Expert Doctors", value: "25+", icon: Heart },
  ];

  const team = [
    {
      name: "Dr. Jennifer Walsh",
      title: "Chief Medical Officer",
      bio: "Leading geneticist with 20+ years in personalized medicine research.",
      avatar: "/api/placeholder/150/150",
    },
    {
      name: "Michael Rodriguez",
      title: "Chief Technology Officer",
      bio: "Expert in bioinformatics and genetic data analysis platforms.",
      avatar: "/api/placeholder/150/150",
    },
    {
      name: "Dr. Sarah Kim",
      title: "Director of Research",
      bio: "Pioneering researcher in epigenetic applications for health optimization.",
      avatar: "/api/placeholder/150/150",
    },
    {
      name: "David Chen",
      title: "Chief Executive Officer",
      bio: "Healthcare entrepreneur focused on making genetic insights accessible.",
      avatar: "/api/placeholder/150/150",
    },
  ];

  return (
    <div className="flex flex-col relative">
      {/* Fixed Summary Boxes */}
      <div className="fixed top-20 right-4 z-50 hidden lg:block space-y-3">
        {/* Mission Box */}
        <a
          href="#mission"
          className="block bg-white rounded-xl shadow-lg border border-blue-100 p-3 w-56 hover:shadow-xl hover:scale-105 transition-all duration-300 group"
        >
          <div className="flex items-center space-x-3">
            <Target className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
            <div>
              <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600">
                Our Mission
              </p>
              <p className="text-xs text-gray-500">Vision and goals</p>
            </div>
          </div>
        </a>

        {/* Stats Box */}
        <a
          href="#stats"
          className="block bg-white rounded-xl shadow-lg border border-blue-100 p-3 w-56 hover:shadow-xl hover:scale-105 transition-all duration-300 group"
        >
          <div className="flex items-center space-x-3">
            <Microscope className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
            <div>
              <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600">
                Our Impact
              </p>
              <p className="text-xs text-gray-500">Success and statistics</p>
            </div>
          </div>
        </a>

        {/* Values Box */}
        <a
          href="#values"
          className="block bg-white rounded-xl shadow-lg border border-blue-100 p-3 w-56 hover:shadow-xl hover:scale-105 transition-all duration-300 group"
        >
          <div className="flex items-center space-x-3">
            <Heart className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
            <div>
              <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600">
                Our Values
              </p>
              <p className="text-xs text-gray-500">Core principles</p>
            </div>
          </div>
        </a>

        {/* Team Box */}
        <a
          href="#team"
          className="block bg-white rounded-xl shadow-lg border border-blue-100 p-3 w-56 hover:shadow-xl hover:scale-105 transition-all duration-300 group"
        >
          <div className="flex items-center space-x-3">
            <Users className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
            <div>
              <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600">
                Our Team
              </p>
              <p className="text-xs text-gray-500">Leadership team</p>
            </div>
          </div>
        </a>

        {/* Story Box */}
        <a
          href="#story"
          className="block bg-white rounded-xl shadow-lg border border-blue-100 p-3 w-56 hover:shadow-xl hover:scale-105 transition-all duration-300 group"
        >
          <div className="flex items-center space-x-3">
            <Award className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
            <div>
              <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600">
                Our Story
              </p>
              <p className="text-xs text-gray-500">Company history</p>
            </div>
          </div>
        </a>
      </div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-slate-50 py-16 lg:py-24 relative overflow-hidden">
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-float"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-blue-300 rounded-full opacity-30 animate-float animate-delay-400"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-400 rounded-full opacity-25 animate-rotate-slow"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Logo Section */}
          <div className="flex items-center justify-center space-x-4 mb-8 animate-bounce-in">
            <div className="relative">
              <Image
                src="/logo.avif"
                alt="Epigenetic Coaching Logo"
                width={80}
                height={80}
                className="rounded-2xl shadow-lg animate-pulse-glow"
              />
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-6 h-6 text-blue-500 animate-pulse" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Epigenetic Coaching
              </h2>
              <p className="text-sm text-blue-600 font-medium">
                Epigenetic Coaching
              </p>
            </div>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 animate-slide-up">
            About <span className="text-blue-600">Epigenetic Coaching</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed animate-slide-up animate-delay-200">
            We&apos;re pioneering the future of personalized healthcare through
            advanced genetic analysis and expert coaching, making cutting-edge
            science accessible to everyone.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section
        id="mission"
        className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-blue-200 rounded-full opacity-40 animate-float"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-indigo-200 rounded-full opacity-30 animate-float animate-delay-600"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-in-left">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 animate-bounce-in">
                Our <span className="text-blue-600">Mission</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed animate-slide-up animate-delay-200">
                At Epigenetic Coaching, we believe that everyone deserves access
                to personalized health insights based on their unique genetic
                makeup. Our mission is to democratize genetic medicine by making
                advanced testing and expert guidance accessible, affordable, and
                actionable.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed animate-slide-up animate-delay-400">
                We combine cutting-edge laboratory science with compassionate
                healthcare to help individuals make informed decisions about
                their health, nutrition, fitness, and wellness.
              </p>
              <Button
                size="lg"
                className="animate-pulse-glow hover:scale-105 transition-transform"
                asChild
              >
                <Link href="/shop">
                  Start Your Journey
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>

            <div className="relative animate-slide-in-right">
              <div className="aspect-square bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 rounded-3xl flex items-center justify-center animate-float shadow-2xl overflow-hidden">
                <Image
                  src="/foto1.avif"
                  alt="Epigenetic Coaching Mission"
                  width={256}
                  height={256}
                  className="object-cover rounded-3xl"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-400 rounded-full animate-bounce-in animate-delay-600"></div>
              <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-blue-500 rounded-full animate-bounce-in animate-delay-800"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        id="stats"
        className="py-20 bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-50 relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute top-20 left-20 w-16 h-16 bg-blue-300 rounded-full opacity-30 animate-rotate-slow"></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 bg-indigo-300 rounded-full opacity-35 animate-float"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-purple-200 rounded-full opacity-25 animate-float animate-delay-800"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 animate-bounce-in">
              Our Impact in <span className="text-blue-600">Numbers</span>
            </h2>
            <p className="text-xl text-gray-600 animate-slide-up animate-delay-200">
              Trusted by thousands of individuals on their health journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className={`border-0 shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:scale-105 animate-bounce-in animate-delay-${
                  (index + 2) * 200
                } group`}
              >
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-glow transition-all">
                    <stat.icon className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {stat.value}
                  </div>
                  <p className="text-gray-600 font-medium group-hover:text-gray-700 transition-colors">
                    {stat.label}
                  </p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section
        id="values"
        className="py-20 bg-gradient-to-br from-white via-slate-50 to-blue-100 relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-blue-200 rounded-full opacity-30 animate-float"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-slate-300 rounded-full opacity-40 animate-rotate-slow"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-blue-300 rounded-full opacity-25 animate-float animate-delay-600"></div>
        <div className="absolute top-1/4 left-1/3 w-8 h-8 bg-indigo-200 rounded-full opacity-35 animate-float animate-delay-1000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 animate-bounce-in">
              Our Core <span className="text-blue-600">Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-slide-up animate-delay-200">
              These principles guide everything we do, from research and
              development to customer care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-200 group hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mb-4 group-hover:animate-pulse-glow transition-all">
                  <Shield className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform animate-pulse" />
                </div>
                <CardTitle className="group-hover:text-blue-600 transition-colors">
                  Privacy & Security
                </CardTitle>
                <CardDescription className="text-base group-hover:text-gray-700 transition-colors">
                  Your genetic data is yours alone. We use bank-level encryption
                  and never share your information without explicit consent. You
                  maintain complete control over your data.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-400 group hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mb-4 group-hover:animate-pulse-glow transition-all">
                  <Award className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform animate-pulse" />
                </div>
                <CardTitle className="group-hover:text-blue-600 transition-colors">
                  Scientific Excellence
                </CardTitle>
                <CardDescription className="text-base group-hover:text-gray-700 transition-colors">
                  We maintain the highest standards in genetic testing and
                  analysis, working only with CLIA-certified laboratories and
                  board-certified healthcare professionals.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-600 group hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mb-4 group-hover:animate-pulse-glow transition-all">
                  <Heart className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform animate-pulse" />
                </div>
                <CardTitle className="group-hover:text-blue-600 transition-colors">
                  Compassionate Care
                </CardTitle>
                <CardDescription className="text-base group-hover:text-gray-700 transition-colors">
                  We believe healthcare should be personal and caring. Our team
                  is dedicated to supporting you with empathy and understanding
                  throughout your journey.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section
        id="team"
        className="py-20 bg-gradient-to-br from-indigo-50 via-blue-100 to-slate-100 relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-indigo-300 rounded-full opacity-25 animate-float"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-blue-300 rounded-full opacity-30 animate-rotate-slow"></div>
        <div className="absolute top-1/3 left-1/3 w-12 h-12 bg-slate-300 rounded-full opacity-35 animate-float animate-delay-800"></div>
        <div className="absolute top-2/3 right-1/4 w-14 h-14 bg-purple-200 rounded-full opacity-30 animate-float animate-delay-1200"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 animate-bounce-in">
              Meet Our Leadership <span className="text-blue-600">Team</span>
            </h2>
            <p className="text-xl text-gray-600 animate-slide-up animate-delay-200">
              Experienced professionals dedicated to advancing personalized
              healthcare
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className={`border-0 shadow-lg text-center hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-${
                  (index + 1) * 150
                } group hover:scale-105`}
              >
                <CardHeader>
                  <div
                    className={`w-24 h-24 bg-gradient-to-br ${
                      index % 2 === 0
                        ? "from-brand-100 to-brand-200"
                        : "from-blue-100 to-blue-200"
                    } rounded-full mx-auto mb-4 flex items-center justify-center group-hover:animate-pulse-glow transition-all`}
                  >
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                      <Users
                        className={`w-10 h-10 text-blue-600 group-hover:scale-110 transition-transform animate-pulse`}
                      />
                    </div>
                  </div>
                  <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                    {member.name}
                  </CardTitle>
                  <p
                    className={`text-blue-600 font-medium text-sm group-hover:font-bold transition-all`}
                  >
                    {member.title}
                  </p>
                  <CardDescription className="text-sm mt-2 group-hover:text-gray-700 transition-colors">
                    {member.bio}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section
        id="story"
        className="py-20 bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-50 relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute top-20 right-20 w-16 h-16 bg-indigo-300 rounded-full opacity-30 animate-float"></div>
        <div className="absolute bottom-20 left-20 w-20 h-20 bg-slate-300 rounded-full opacity-35 animate-rotate-slow"></div>
        <div className="absolute top-1/2 right-1/3 w-12 h-12 bg-blue-300 rounded-full opacity-40 animate-float animate-delay-400"></div>
        <div className="absolute top-1/4 left-1/5 w-10 h-10 bg-purple-200 rounded-full opacity-35 animate-float animate-delay-600"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 animate-bounce-in">
              Our <span className="text-blue-600">Story</span>
            </h2>
          </div>

          <div className="prose prose-lg mx-auto text-gray-600 space-y-6">
            <p className="animate-slide-up animate-delay-200 hover:text-gray-700 transition-colors">
              <span className="text-blue-600 font-semibold">
                Epigenetic Coaching
              </span>{" "}
              was founded in 2018 by a team of geneticists, physicians, and
              technology experts who shared a common vision: making personalized
              medicine accessible to everyone. Frustrated by the gap between
              groundbreaking genetic research and practical healthcare
              applications, they set out to bridge this divide.
            </p>

            <p className="animate-slide-up animate-delay-400 hover:text-gray-700 transition-colors">
              What started as a small research project has grown into a
              comprehensive platform serving thousands of customers worldwide.
              Our{" "}
              <span className="text-blue-600 font-semibold">
                CLIA-certified laboratory
              </span>{" "}
              processes samples with the highest quality standards, while our
              team of board-certified physicians and genetic counselors provides
              expert guidance tailored to each individual&apos;s unique genetic
              profile.
            </p>

            <p className="animate-slide-up animate-delay-600 hover:text-gray-700 transition-colors">
              Today,{" "}
              <span className="text-blue-600 font-semibold">
                Epigenetic Coaching
              </span>{" "}
              continues to push the boundaries of what&apos;s possible in
              personalized healthcare, constantly innovating and improving our
              services to help people live healthier, more informed lives based
              on their genetic insights.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 relative overflow-hidden animate-gradient-shift">
        {/* Background decoration */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-blue-400 rounded-full opacity-10 animate-float"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white rounded-full opacity-5 animate-float animate-delay-400"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-300 rounded-full opacity-10 animate-rotate-slow"></div>

        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-white animate-bounce-in">
              Ready to Join Our <span className="text-blue-300">Community</span>
              ?
            </h2>
            <p className="text-xl text-blue-100 animate-slide-up animate-delay-200">
              Discover what thousands of others have already learned about their
              genetic potential and start your personalized health journey
              today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animate-delay-400">
              <Button
                size="lg"
                variant="secondary"
                className="animate-pulse-glow hover:scale-105 transition-transform bg-blue-400 hover:bg-blue-300 text-gray-900"
                asChild
              >
                <Link href="/shop">
                  Order Your Kit
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-blue-900 hover:scale-105 transition-all animate-pulse-glow animate-delay-200"
                asChild
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
