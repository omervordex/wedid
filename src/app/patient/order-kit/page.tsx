"use client";

// Force dynamic rendering for this page
export const dynamic = "force-dynamic";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Star,
  Clock,
  CheckCircle,
  ShoppingCart,
  CreditCard,
  MapPin,
} from "lucide-react";

const kits = [
  {
    id: "basic-health",
    name: "Basic Health Kit",
    price: 199,
    originalPrice: 249,
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

export default function OrderKitPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [selectedKit, setSelectedKit] = useState<string | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    address: "",
    city: "",
    zipCode: "",
    phone: "",
    notes: "",
  });

  if (!session || session.user.role !== "patient") {
    router.push("/auth/login");
    return null;
  }

  const selectedKitData = kits.find((kit) => kit.id === selectedKit);

  const handleOrderKit = (kitId: string) => {
    setSelectedKit(kitId);
    setShowCheckout(true);
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate order processing
    const orderNumber = `WD-${Date.now().toString().slice(-6)}-${Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase()}`;

    alert(
      `Order placed successfully! Order Number: ${orderNumber}\nYour kit will be shipped within 2-3 business days.`
    );

    router.push("/patient/dashboard");
  };

  if (showCheckout && selectedKitData) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Button
              variant="outline"
              onClick={() => setShowCheckout(false)}
              className="mb-4"
            >
              ← Back to Kits
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
            <p className="text-gray-600 mt-2">Complete your order</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-16 h-16 bg-brand-100 rounded-lg flex items-center justify-center">
                      <ShoppingCart className="w-8 h-8 text-brand-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{selectedKitData.name}</h3>
                      <p className="text-sm text-gray-600">
                        Processing time: {selectedKitData.processingTime}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">
                        ${selectedKitData.price}
                      </p>
                      <p className="text-sm text-gray-500 line-through">
                        ${selectedKitData.originalPrice}
                      </p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span>Subtotal</span>
                      <span>${selectedKitData.price}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Shipping</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between items-center font-bold text-lg border-t pt-2 mt-2">
                      <span>Total</span>
                      <span>${selectedKitData.price}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping & Payment */}
            <Card>
              <CardHeader>
                <CardTitle>Shipping & Payment</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitOrder} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      Shipping Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <Input
                          required
                          value={shippingInfo.fullName}
                          onChange={(e) =>
                            setShippingInfo({
                              ...shippingInfo,
                              fullName: e.target.value,
                            })
                          }
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <Input
                          required
                          type="tel"
                          value={shippingInfo.phone}
                          onChange={(e) =>
                            setShippingInfo({
                              ...shippingInfo,
                              phone: e.target.value,
                            })
                          }
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address *
                      </label>
                      <Input
                        required
                        value={shippingInfo.address}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            address: e.target.value,
                          })
                        }
                        placeholder="Street address"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City *
                        </label>
                        <Input
                          required
                          value={shippingInfo.city}
                          onChange={(e) =>
                            setShippingInfo({
                              ...shippingInfo,
                              city: e.target.value,
                            })
                          }
                          placeholder="City"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          ZIP Code *
                        </label>
                        <Input
                          required
                          value={shippingInfo.zipCode}
                          onChange={(e) =>
                            setShippingInfo({
                              ...shippingInfo,
                              zipCode: e.target.value,
                            })
                          }
                          placeholder="12345"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Special Instructions
                      </label>
                      <Textarea
                        value={shippingInfo.notes}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            notes: e.target.value,
                          })
                        }
                        placeholder="Any special delivery instructions..."
                        rows={3}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Payment Method
                    </h3>

                    <div className="p-4 border border-gray-200 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">
                        This is a demo. In production, you would integrate with
                        Stripe, PayPal, or another payment processor.
                      </p>
                      <div className="flex items-center space-x-2">
                        <CreditCard className="w-5 h-5 text-gray-400" />
                        <span className="text-sm">
                          Demo Payment - No actual charge
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Place Order - ${selectedKitData.price}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Order DNA Kit</h1>
          <p className="text-gray-600 mt-2">
            Choose the perfect kit for your personalized health journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {kits.map((kit) => (
            <Card
              key={kit.id}
              className={`relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                kit.popular ? "ring-2 ring-brand-500 scale-105" : ""
              }`}
            >
              {kit.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-brand-600 text-white px-4 py-1">
                  Most Popular
                </Badge>
              )}

              <CardHeader className="text-center pb-4">
                <div className="w-full h-48 bg-gradient-to-br from-brand-100 to-brand-200 rounded-lg mb-4 flex items-center justify-center">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                    <div className="w-16 h-16 bg-brand-600 rounded-full"></div>
                  </div>
                </div>

                <CardTitle className="text-2xl font-bold">{kit.name}</CardTitle>

                <div className="flex items-center justify-center space-x-2 mb-2">
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
                  <span className="text-sm text-gray-600">
                    ({kit.reviews} reviews)
                  </span>
                </div>

                <div className="flex items-center justify-center space-x-2">
                  <span className="text-3xl font-bold text-gray-900">
                    ${kit.price}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    ${kit.originalPrice}
                  </span>
                </div>

                <CardDescription className="text-base mt-2">
                  {kit.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Results in {kit.processingTime}</span>
                </div>

                <ul className="space-y-2">
                  {kit.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start space-x-2 text-sm"
                    >
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="pt-6">
                <Button
                  className="w-full"
                  size="lg"
                  variant={kit.popular ? "default" : "outline"}
                  onClick={() => handleOrderKit(kit.id)}
                >
                  Order Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
