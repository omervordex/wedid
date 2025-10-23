"use client";

import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Star,
  CheckCircle,
  Clock,
  Shield,
  ShoppingCart,
  ArrowLeft,
} from "lucide-react";

const allKits = [
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
  },
];

export default function ShopDetailPage() {
  const router = useRouter();
  const params = useParams();
  const kitId = Array.isArray(params?.id)
    ? params.id[0]
    : (params?.id as string);
  const kit = useMemo(() => allKits.find((k) => k.id === kitId), [kitId]);
  const [quantity, setQuantity] = useState(1);

  if (!kit) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-8 text-center">
            <p className="mb-4">Product not found.</p>
            <Button onClick={() => router.push("/shop")}>Back to Shop</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const total = (quantity * kit.price).toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-blue-50 to-white relative overflow-hidden animate-gradient-shift">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-brand-200 rounded-full opacity-30 animate-float animate-delay-400"></div>
        <div className="absolute bottom-20 left-1/3 w-12 h-12 bg-blue-300 rounded-full opacity-25 animate-rotate-slow"></div>
        <div className="absolute bottom-40 right-1/4 w-14 h-14 bg-brand-300 rounded-full opacity-20 animate-float animate-delay-800"></div>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Back */}
        <div className="mb-6">
          <Button variant="outline" onClick={() => router.push("/shop")}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shop
          </Button>
        </div>

        {/* Header */}
        <div className="mb-8 animate-slide-up">
          <div className="flex items-center space-x-4 mb-6 animate-bounce-in">
            <div className="relative">
              <Image
                src="/logo.avif"
                alt="Epigenetic Coaching Logo"
                width={60}
                height={60}
                className="rounded-xl shadow-lg animate-pulse-glow"
              />
              <div className="absolute -top-1 -right-1">
                <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Epigenetic Coaching
              </h2>
              <p className="text-xs text-brand-600 font-medium">
                Product Details
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 animate-bounce-in animate-delay-200">
                {kit.name}
              </h1>
              <p className="text-gray-600 mt-2 animate-slide-up animate-delay-400">
                Comprehensive insights tailored to your wellness goals
              </p>
            </div>
            {kit.popular && (
              <div className="hidden md:block">
                <div className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-gray-900 shadow-xl ring-1 ring-white/60 bg-gradient-to-r from-blue-400 to-blue-300 backdrop-blur-[2px] border border-white/50">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/80 text-blue-500 shadow-sm">
                    ⭐
                  </span>
                  <span>Most Popular</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Gallery */}
          <div className="lg:col-span-3">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in">
              <CardContent className="p-6">
                <div className="relative w-full h-80 bg-gradient-to-br from-brand-100 via-blue-100 to-brand-200 rounded-2xl flex items-center justify-center animate-float">
                  <div className="relative">
                    <div className="w-56 h-56 bg-white rounded-3xl shadow-xl flex items-center justify-center p-6">
                      <Image
                        src={kit.image}
                        alt={kit.name}
                        width={180}
                        height={180}
                        className="object-contain rounded-xl"
                      />
                    </div>
                    <div className="absolute -top-2 -right-2">
                      <Sparkles className="w-6 h-6 text-blue-500 animate-pulse" />
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-center space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-1.5 w-8 rounded-full bg-blue-300/60"
                    ></div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary / Purchase */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-200">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Purchase</span>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(kit.rating)
                              ? "text-blue-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">
                      {kit.rating} ({kit.reviews.toLocaleString()})
                    </span>
                  </div>
                </CardTitle>
                <CardDescription>
                  Fast processing and secure CLIA-certified analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-end space-x-3">
                  <div>
                    <div className="text-4xl font-bold text-gray-900">
                      ${kit.price}
                    </div>
                    <div className="text-gray-500 line-through">
                      ${kit.originalPrice}
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-green-200">
                    Save ${kit.originalPrice - kit.price}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span>Results in {kit.processingTime}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-brand-600" />
                    <span>CLIA Certified</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>30-Day Guarantee</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    >
                      -
                    </Button>
                    <div className="w-14 text-center py-2 border border-gray-200 rounded-md bg-white">
                      {quantity}
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setQuantity((q) => q + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-lg">
                  <span className="text-sm text-gray-600">Total</span>
                  <span className="text-2xl font-bold text-gray-900">
                    ${total}
                  </span>
                </div>

                <Button
                  className="w-full h-12 text-lg font-semibold animate-pulse-glow bg-gradient-to-r from-brand-600 to-blue-500 hover:from-brand-700 hover:to-blue-600 text-white shadow-lg"
                  onClick={() => router.push("/checkout")}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" /> Proceed to Checkout
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg animate-bounce-in animate-delay-400">
              <CardHeader>
                <CardTitle>What You Get</CardTitle>
                <CardDescription>Features included in this kit</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {kit.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start space-x-3 text-sm text-gray-700"
                    >
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
