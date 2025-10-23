"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import {
  Sparkles,
  Star,
  CheckCircle,
  Shield,
  CreditCard,
  MapPin,
  User,
  ArrowLeft,
  Lock,
  Truck,
  Gift,
} from "lucide-react";

// Mock data - in real app this would come from context/state
const mockOrder = {
  kit: {
    id: "comprehensive-health",
    name: "Comprehensive Health Kit",
    price: 399,
    originalPrice: 499,
    image: "/rt1.png",
    rating: 4.9,
    reviews: 2150,
    processingTime: "2-3 weeks",
    features: [
      "Complete nutritional genetics",
      "Advanced fitness optimization",
      "Comprehensive health risk analysis",
      "Medication response insights",
      "Sleep and stress optimization",
      "3 consultation sessions included",
      "Priority lab processing",
    ],
  },
  quantity: 1,
  subtotal: 399,
  shipping: 0,
  tax: 0,
  total: 399,
};

export default function CheckoutPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    paymentMethod: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handlePlaceOrder = () => {
    // Simulate order placement
    alert(
      "Order placed successfully! You will receive a confirmation email shortly."
    );
    router.push("/patient/dashboard");
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return (
          formData.email &&
          formData.firstName &&
          formData.lastName &&
          formData.phone
        );
      case 2:
        return (
          formData.address &&
          formData.city &&
          formData.state &&
          formData.zipCode
        );
      case 3:
        return (
          formData.cardNumber &&
          formData.expiryDate &&
          formData.cvv &&
          formData.cardName
        );
      default:
        return false;
    }
  };

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
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
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
                Secure Checkout
              </p>
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 animate-bounce-in animate-delay-200">
              Complete Your Order
            </h1>
            <p className="text-gray-600 mt-2 animate-slide-up animate-delay-400">
              Secure checkout with encrypted payment processing
            </p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 animate-slide-up animate-delay-600">
          <div className="flex items-center justify-center space-x-8">
            {[
              { number: 1, title: "Contact", icon: User },
              { number: 2, title: "Shipping", icon: MapPin },
              { number: 3, title: "Payment", icon: CreditCard },
            ].map((stepItem, index) => (
              <div key={stepItem.number} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    step >= stepItem.number
                      ? "bg-brand-600 text-white animate-pulse-glow"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  <stepItem.icon className="w-5 h-5" />
                </div>
                <span
                  className={`ml-2 text-sm font-medium ${
                    step >= stepItem.number ? "text-brand-600" : "text-gray-500"
                  }`}
                >
                  {stepItem.title}
                </span>
                {index < 2 && (
                  <div
                    className={`w-8 h-0.5 mx-4 ${
                      step > stepItem.number ? "bg-brand-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Contact Information */}
            {step === 1 && (
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-800">
                <CardHeader>
                  <CardTitle className="flex items-center group">
                    <div className="w-8 h-8 bg-gradient-to-br from-brand-100 to-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                      <User className="w-5 h-5 text-brand-600 group-hover:scale-110 transition-transform" />
                    </div>
                    Contact Information
                  </CardTitle>
                  <CardDescription>
                    We&apos;ll use this information to send your kit and results
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <Input
                        value={formData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        placeholder="Enter your first name"
                        className="border-gray-300 focus:border-brand-500 focus:ring-brand-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <Input
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        placeholder="Enter your last name"
                        className="border-gray-300 focus:border-brand-500 focus:ring-brand-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="Enter your email address"
                      className="border-gray-300 focus:border-brand-500 focus:ring-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      placeholder="Enter your phone number"
                      className="border-gray-300 focus:border-brand-500 focus:ring-brand-500"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Shipping Information */}
            {step === 2 && (
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-800">
                <CardHeader>
                  <CardTitle className="flex items-center group">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-brand-100 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                      <MapPin className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                    </div>
                    Shipping Address
                  </CardTitle>
                  <CardDescription>
                    Where should we send your DNA testing kit?
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address *
                    </label>
                    <Input
                      value={formData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      placeholder="Enter your street address"
                      className="border-gray-300 focus:border-brand-500 focus:ring-brand-500"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <Input
                        value={formData.city}
                        onChange={(e) =>
                          handleInputChange("city", e.target.value)
                        }
                        placeholder="Enter city"
                        className="border-gray-300 focus:border-brand-500 focus:ring-brand-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State *
                      </label>
                      <Input
                        value={formData.state}
                        onChange={(e) =>
                          handleInputChange("state", e.target.value)
                        }
                        placeholder="Enter state"
                        className="border-gray-300 focus:border-brand-500 focus:ring-brand-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ZIP Code *
                      </label>
                      <Input
                        value={formData.zipCode}
                        onChange={(e) =>
                          handleInputChange("zipCode", e.target.value)
                        }
                        placeholder="Enter ZIP code"
                        className="border-gray-300 focus:border-brand-500 focus:ring-brand-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <Input
                      value={formData.country}
                      onChange={(e) =>
                        handleInputChange("country", e.target.value)
                      }
                      className="border-gray-300 focus:border-brand-500 focus:ring-brand-500"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Payment Information */}
            {step === 3 && (
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-800">
                <CardHeader>
                  <CardTitle className="flex items-center group">
                    <div className="w-8 h-8 bg-gradient-to-br from-brand-100 to-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                      <CreditCard className="w-5 h-5 text-brand-600 group-hover:scale-110 transition-transform" />
                    </div>
                    Payment Information
                  </CardTitle>
                  <CardDescription>
                    Secure payment processing with bank-level encryption
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-2 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <Lock className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-green-800 font-medium">
                      Your payment information is encrypted and secure
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cardholder Name *
                    </label>
                    <Input
                      value={formData.cardName}
                      onChange={(e) =>
                        handleInputChange("cardName", e.target.value)
                      }
                      placeholder="Enter name as it appears on card"
                      className="border-gray-300 focus:border-brand-500 focus:ring-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number *
                    </label>
                    <Input
                      value={formData.cardNumber}
                      onChange={(e) =>
                        handleInputChange("cardNumber", e.target.value)
                      }
                      placeholder="1234 5678 9012 3456"
                      className="border-gray-300 focus:border-brand-500 focus:ring-brand-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date *
                      </label>
                      <Input
                        value={formData.expiryDate}
                        onChange={(e) =>
                          handleInputChange("expiryDate", e.target.value)
                        }
                        placeholder="MM/YY"
                        className="border-gray-300 focus:border-brand-500 focus:ring-brand-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV *
                      </label>
                      <Input
                        value={formData.cvv}
                        onChange={(e) =>
                          handleInputChange("cvv", e.target.value)
                        }
                        placeholder="123"
                        className="border-gray-300 focus:border-brand-500 focus:ring-brand-500"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between animate-slide-up animate-delay-1000">
              <Button
                variant="outline"
                onClick={handlePreviousStep}
                disabled={step === 1}
                className="animate-pulse-glow hover:scale-105 transition-transform"
              >
                Previous
              </Button>
              {step < 3 ? (
                <Button
                  onClick={handleNextStep}
                  disabled={!isStepValid()}
                  className="animate-pulse-glow hover:scale-105 transition-transform bg-brand-600 hover:bg-brand-700"
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  onClick={handlePlaceOrder}
                  disabled={!isStepValid()}
                  className="animate-pulse-glow hover:scale-105 transition-transform bg-gradient-to-r from-brand-600 to-blue-500 hover:from-brand-700 hover:to-blue-600 text-white shadow-lg"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Place Order
                </Button>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-1000">
              <CardHeader>
                <CardTitle className="flex items-center group">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-brand-100 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                    <Gift className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                  </div>
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Kit Info */}
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-100 to-blue-100 rounded-lg flex items-center justify-center">
                    <Image
                      src={mockOrder.kit.image}
                      alt={mockOrder.kit.name}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">
                      {mockOrder.kit.name}
                    </h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(mockOrder.kit.rating)
                                ? "text-blue-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">
                        {mockOrder.kit.rating} (
                        {mockOrder.kit.reviews.toLocaleString()})
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">
                      ${mockOrder.kit.price}
                    </div>
                    <div className="text-xs text-gray-500">
                      Qty: {mockOrder.quantity}
                    </div>
                  </div>
                </div>

                {/* Pricing Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${mockOrder.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${mockOrder.tax}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>${mockOrder.total}</span>
                    </div>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Shield className="w-4 h-4 text-brand-600" />
                    <span>SSL Encrypted</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Truck className="w-4 h-4 text-blue-600" />
                    <span>Free Shipping</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>30-Day Guarantee</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Notice */}
            <Card className="border-0 shadow-lg animate-bounce-in animate-delay-1200">
              <CardContent className="p-6">
                <div className="text-center">
                  <Lock className="w-8 h-8 text-brand-600 mx-auto mb-3 animate-pulse" />
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Secure Checkout
                  </h4>
                  <p className="text-sm text-gray-600">
                    Your payment information is encrypted and processed
                    securely. We never store your payment details.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
