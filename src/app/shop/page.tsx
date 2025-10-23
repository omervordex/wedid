import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Clock,
  Shield,
  CheckCircle,
  Sparkles,
  ShoppingCart,
} from "lucide-react";

// Mock data for DNA kits
const kits = [
  {
    id: "basic-health",
    name: "Basic Health Kit",
    price: 199,
    originalPrice: 249,
    image: "/rt1.png",
    rating: 4.8,
    reviews: 1240,
    processingTime: "2-3 weeks",
    description:
      "Essential genetic insights for health and wellness optimization.",
    features: [
      "Nutritional genetics analysis",
      "Fitness and exercise recommendations",
      "Basic health risk assessment",
      "Personalized supplement suggestions",
      "1 consultation session included",
    ],
    popular: false,
    category: "Health",
  },
  {
    id: "comprehensive-health",
    name: "Comprehensive Health Kit",
    price: 399,
    originalPrice: 499,
    image: "/rt1.png",
    rating: 4.9,
    reviews: 2150,
    processingTime: "2-3 weeks",
    description:
      "Complete genetic analysis with detailed health insights and expert guidance.",
    features: [
      "Complete nutritional genetics",
      "Advanced fitness optimization",
      "Comprehensive health risk analysis",
      "Medication response insights",
      "Sleep and stress optimization",
      "3 consultation sessions included",
      "Priority lab processing",
    ],
    popular: true,
    category: "Health",
  },
  {
    id: "premium-coaching",
    name: "Premium Coaching Package",
    price: 799,
    originalPrice: 999,
    image: "/rt1.png",
    rating: 5.0,
    reviews: 580,
    processingTime: "1-2 weeks",
    description:
      "Ultimate package with comprehensive testing and ongoing coaching support.",
    features: [
      "All Comprehensive Kit features",
      "Epigenetic aging analysis",
      "Advanced nutrigenomics",
      "Pharmacogenomics testing",
      "6 months of coaching sessions",
      "Personalized meal plans",
      "Custom supplement formulations",
      "Priority support & expedited processing",
    ],
    popular: false,
    category: "Premium",
  },
  {
    id: "ancestry-discovery",
    name: "Ancestry Discovery Kit",
    price: 149,
    originalPrice: 199,
    image: "/rt1.png",
    rating: 4.7,
    reviews: 890,
    processingTime: "3-4 weeks",
    description:
      "Discover your genetic ancestry and family history with detailed regional breakdowns.",
    features: [
      "Ethnicity estimation",
      "Family migration patterns",
      "DNA relative matching",
      "Historical timeline",
      "Ancestry report",
    ],
    popular: false,
    category: "Ancestry",
  },
  {
    id: "wellness-optimization",
    name: "Wellness Optimization Kit",
    price: 299,
    originalPrice: 349,
    image: "/rt1.png",
    rating: 4.6,
    reviews: 1560,
    processingTime: "2-3 weeks",
    description:
      "Optimize your wellness with personalized nutrition and lifestyle recommendations.",
    features: [
      "Metabolism analysis",
      "Vitamin optimization",
      "Sleep genetics",
      "Stress response",
      "Exercise optimization",
      "2 consultation sessions",
    ],
    popular: false,
    category: "Wellness",
  },
  {
    id: "family-planning",
    name: "Family Planning Kit",
    price: 449,
    originalPrice: 549,
    image: "/rt1.png",
    rating: 4.8,
    reviews: 420,
    processingTime: "2-3 weeks",
    description:
      "Comprehensive genetic testing for couples planning to start a family.",
    features: [
      "Carrier screening",
      "Fertility genetics",
      "Pregnancy optimization",
      "Genetic counseling",
      "Family planning guidance",
      "3 consultation sessions",
    ],
    popular: false,
    category: "Family",
  },
  {
    id: "athletic-performance",
    name: "Athletic Performance Kit",
    price: 249,
    originalPrice: 299,
    image: "/rt1.png",
    rating: 4.9,
    reviews: 720,
    processingTime: "2-3 weeks",
    description:
      "Maximize your athletic potential with genetic insights for training and recovery.",
    features: [
      "Muscle composition analysis",
      "Injury risk assessment",
      "Recovery optimization",
      "Training recommendations",
      "Nutrition for athletes",
      "1 coaching session",
    ],
    popular: false,
    category: "Sports",
  },
  {
    id: "longevity-research",
    name: "Longevity Research Kit",
    price: 599,
    originalPrice: 699,
    image: "/rt1.png",
    rating: 4.7,
    reviews: 180,
    processingTime: "3-4 weeks",
    description:
      "Advanced genetic analysis focused on longevity and healthy aging.",
    features: [
      "Aging genetics analysis",
      "Longevity markers",
      "Disease risk assessment",
      "Anti-aging recommendations",
      "Research participation",
      "4 consultation sessions",
    ],
    popular: false,
    category: "Research",
  },
  {
    id: "mental-wellness",
    name: "Mental Wellness Kit",
    price: 199,
    originalPrice: 249,
    image: "/rt1.png",
    rating: 4.5,
    reviews: 630,
    processingTime: "2-3 weeks",
    description:
      "Understand your mental health genetics and optimize your cognitive wellness.",
    features: [
      "Mood genetics",
      "Stress response",
      "Sleep optimization",
      "Cognitive function",
      "Mental wellness plan",
      "1 therapy session",
    ],
    popular: false,
    category: "Mental Health",
  },
];

export default function ShopPage() {
  return (
    <div className="flex flex-col">
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

          <div className="flex items-center justify-center space-x-3 mb-6 animate-bounce-in animate-delay-200">
            <ShoppingCart className="w-8 h-8 text-blue-600 animate-pulse" />
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
              DNA Testing <span className="text-blue-600">Kits</span>
            </h1>
          </div>
          <p className="text-xl text-gray-600 leading-relaxed mb-8 animate-slide-up animate-delay-400">
            Choose the perfect kit for your personalized health journey. All
            kits include comprehensive genetic analysis and expert guidance.
          </p>

          <div className="flex items-center justify-center space-x-8 text-sm text-gray-600 animate-slide-up animate-delay-600">
            <div className="flex items-center space-x-2 animate-bounce-in animate-delay-800">
              <Shield className="w-5 h-5 text-blue-600 animate-pulse" />
              <span>CLIA Certified Lab</span>
            </div>
            <div className="flex items-center space-x-2 animate-bounce-in animate-delay-1000">
              <Clock className="w-5 h-5 text-blue-600 animate-pulse" />
              <span>Fast Results</span>
            </div>
            <div className="flex items-center space-x-2 animate-bounce-in animate-delay-1200">
              <CheckCircle className="w-5 h-5 text-green-600 animate-pulse" />
              <span>30-Day Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* Kits Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-blue-50 to-white relative overflow-hidden">
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-float"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-blue-200 rounded-full opacity-30 animate-float animate-delay-400"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-300 rounded-full opacity-25 animate-rotate-slow"></div>
          <div className="absolute bottom-40 right-1/3 w-14 h-14 bg-blue-300 rounded-full opacity-20 animate-float animate-delay-800"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16 animate-slide-up">
            <div className="flex items-center justify-center space-x-3 mb-6 animate-bounce-in">
              <ShoppingCart className="w-8 h-8 text-blue-600 animate-pulse" />
              <h2 className="text-3xl font-bold text-gray-900">
                Choose Your <span className="text-blue-600">Perfect Kit</span>
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-slide-up animate-delay-200">
              Each kit is designed to provide comprehensive genetic insights
              tailored to your health goals
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button className="rounded-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg focus-visible:ring-2 focus-visible:ring-blue-400">
              All Products
            </Button>
            <Button
              variant="outline"
              className="rounded-full px-6 py-3 border-blue-200 text-slate-800 bg-white/60 hover:bg-blue-50 hover:border-blue-300 shadow-sm hover:shadow focus-visible:ring-2 focus-visible:ring-blue-300"
            >
              Health
            </Button>
            <Button
              variant="outline"
              className="rounded-full px-6 py-3 border-blue-200 text-slate-800 bg-white/60 hover:bg-blue-50 hover:border-blue-300 shadow-sm hover:shadow focus-visible:ring-2 focus-visible:ring-blue-300"
            >
              Wellness
            </Button>
            <Button
              variant="outline"
              className="rounded-full px-6 py-3 border-blue-200 text-slate-800 bg-white/60 hover:bg-blue-50 hover:border-blue-300 shadow-sm hover:shadow focus-visible:ring-2 focus-visible:ring-blue-300"
            >
              Ancestry
            </Button>
            <Button
              variant="outline"
              className="rounded-full px-6 py-3 border-blue-200 text-slate-800 bg-white/60 hover:bg-blue-50 hover:border-blue-300 shadow-sm hover:shadow focus-visible:ring-2 focus-visible:ring-blue-300"
            >
              Sports
            </Button>
            <Button
              variant="outline"
              className="rounded-full px-6 py-3 border-blue-200 text-slate-800 bg-white/60 hover:bg-blue-50 hover:border-blue-300 shadow-sm hover:shadow focus-visible:ring-2 focus-visible:ring-blue-300"
            >
              Premium
            </Button>
          </div>

          {/* Products Grid - 3 per row on large screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kits.map((kit, index) => (
              <Card
                key={kit.id}
                className={`relative border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200 group ${
                  kit.popular
                    ? "ring-1 ring-blue-300 bg-blue-50/30"
                    : "bg-white"
                }`}
              >
                {kit.popular && (
                  <div className="absolute -top-1 left-1 z-10">
                    <Badge className="bg-blue-600 text-white text-xs px-2 py-1">
                      Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="p-2 pb-0">
                  {/* Product Image */}
                  <div className="relative mb-2">
                    <div className="w-full h-96 bg-gray-50 rounded-lg flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                      <Image
                        src={kit.image}
                        alt={kit.name}
                        width={480}
                        height={300}
                        className="object-contain w-full h-[22rem]"
                      />
                    </div>
                  </div>

                  {/* Product Title */}
                  <CardTitle className="text-base font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
                    {kit.name}
                  </CardTitle>

                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(kit.rating)
                              ? "text-blue-500 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">{kit.rating}</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center space-x-1">
                    <span className="text-xl font-bold text-gray-900">
                      ${kit.price}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ${kit.originalPrice}
                    </span>
                  </div>
                </CardHeader>

                <CardFooter className="p-4 pt-0">
                  <Button
                    className="w-full h-12 text-sm font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg focus-visible:ring-2 focus-visible:ring-blue-400 group"
                    size="sm"
                    asChild
                  >
                    <Link
                      href={`/shop/${kit.id}`}
                      className="flex items-center justify-center"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                      <span>Add to Cart</span>
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center animate-slide-up animate-delay-1000">
            <Card className="border-0 shadow-lg bg-gradient-to-r from-brand-50 to-blue-50">
              <CardContent className="p-8">
                <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
                  <div className="flex items-center space-x-2 animate-bounce-in animate-delay-1200">
                    <Shield className="w-5 h-5 text-brand-600 animate-pulse" />
                    <span className="font-medium">Free Shipping</span>
                  </div>
                  <div className="flex items-center space-x-2 animate-bounce-in animate-delay-1400">
                    <Clock className="w-5 h-5 text-blue-600 animate-pulse" />
                    <span className="font-medium">Fast Processing</span>
                  </div>
                  <div className="flex items-center space-x-2 animate-bounce-in animate-delay-1600">
                    <CheckCircle className="w-5 h-5 text-green-600 animate-pulse" />
                    <span className="font-medium">Money Back Guarantee</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-10 right-10 w-24 h-24 bg-brand-200 rounded-full opacity-15 animate-float"></div>
        <div className="absolute bottom-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-rotate-slow"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-brand-100 rounded-full opacity-25 animate-float animate-delay-600"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 animate-bounce-in">
              Why Choose Our <span className="text-blue-600">DNA Kits</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-slide-up animate-delay-200">
              Our comprehensive testing process combines cutting-edge science
              with personalized guidance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg text-center hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-200 group hover:scale-105">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-brand-100 to-brand-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-glow transition-all">
                  <Shield className="w-8 h-8 text-brand-600 group-hover:scale-110 transition-transform animate-pulse" />
                </div>
                <CardTitle className="group-hover:text-brand-600 transition-colors">
                  CLIA Certified Lab
                </CardTitle>
                <CardDescription className="group-hover:text-gray-700 transition-colors">
                  All testing performed in our CLIA-certified laboratory with
                  the highest quality standards
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg text-center hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-400 group hover:scale-105">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-glow transition-all">
                  <Clock className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform animate-pulse" />
                </div>
                <CardTitle className="group-hover:text-blue-600 transition-colors">
                  Fast Results
                </CardTitle>
                <CardDescription className="group-hover:text-gray-700 transition-colors">
                  Get your comprehensive genetic analysis results in just 2-3
                  weeks from sample receipt
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg text-center hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-600 group hover:scale-105">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-brand-100 to-brand-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-glow transition-all">
                  <CheckCircle className="w-8 h-8 text-brand-600 group-hover:scale-110 transition-transform animate-pulse" />
                </div>
                <CardTitle className="group-hover:text-brand-600 transition-colors">
                  Expert Support
                </CardTitle>
                <CardDescription className="group-hover:text-gray-700 transition-colors">
                  Work with certified genetic counselors and health coaches to
                  understand your results
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-white via-blue-50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-brand-200 rounded-full opacity-15 animate-float"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-blue-200 rounded-full opacity-20 animate-rotate-slow"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-brand-100 rounded-full opacity-25 animate-float animate-delay-600"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 animate-bounce-in">
              Frequently Asked <span className="text-blue-600">Questions</span>
            </h2>
          </div>

          <div className="space-y-8">
            {[
              {
                question: "How accurate are the DNA tests?",
                answer:
                  "Our tests are performed in CLIA-certified laboratories with >99% accuracy. We use advanced sequencing technology and multiple quality control measures.",
              },
              {
                question: "How long does it take to get results?",
                answer:
                  "Most results are available within 2-3 weeks of receiving your sample. Premium packages receive priority processing for faster results.",
              },
              {
                question: "Is my genetic data secure?",
                answer:
                  "Yes, we use bank-level encryption and never share your data without explicit consent. You own your data and can delete it at any time.",
              },
              {
                question: "What if I'm not satisfied with my results?",
                answer:
                  "We offer a 30-day money-back guarantee. If you're not completely satisfied, we'll refund your purchase.",
              },
            ].map((faq, index) => (
              <Card
                key={index}
                className={`border-l-4 ${
                  index % 2 === 0 ? "border-l-brand-600" : "border-l-blue-500"
                } hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-${
                  (index + 1) * 200
                } group hover:scale-[1.02]`}
              >
                <CardHeader>
                  <CardTitle
                    className={`text-lg group-hover:${
                      index % 2 === 0 ? "text-brand-600" : "text-blue-600"
                    } transition-colors`}
                  >
                    {faq.question}
                  </CardTitle>
                  <CardDescription className="text-base group-hover:text-gray-700 transition-colors">
                    {faq.answer}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
