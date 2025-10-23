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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Scan,
  CheckCircle,
  AlertCircle,
  Package,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import { Sparkles } from "lucide-react";

export default function ActivateKitPage() {
  const sessionResult = useSession();
  const session = sessionResult?.data;
  const router = useRouter();
  const [kitCode, setKitCode] = useState("");
  const [isActivating, setIsActivating] = useState(false);
  const [activationResult, setActivationResult] = useState<{
    success: boolean;
    message: string;
    kitInfo?: {
      kitNumber: string;
      kitType: string;
      activatedAt: Date;
      expectedResults: Date;
      labLocation: string;
    };
  } | null>(null);

  if (!session || session.user.role !== "patient") {
    router.push("/auth/login");
    return null;
  }

  const handleActivateKit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsActivating(true);

    // Simulate activation process
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock validation - in real app, this would validate against database
    const validCodes = [
      "WD-240125-A7X9",
      "WD-240124-B8Y1",
      "WD-240123-C9Z2",
      "WD-240122-D1A3",
    ];

    if (validCodes.includes(kitCode.toUpperCase())) {
      setActivationResult({
        success: true,
        message: "Kit activated successfully!",
        kitInfo: {
          kitNumber: kitCode.toUpperCase(),
          kitType: "Comprehensive Health Kit",
          activatedAt: new Date(),
          expectedResults: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks
          labLocation: "San Francisco, CA",
        },
      });
    } else {
      setActivationResult({
        success: false,
        message:
          "Invalid kit code. Please check your kit number and try again.",
      });
    }

    setIsActivating(false);
  };

  const handleScanCode = () => {
    // In a real app, this would open camera for QR/barcode scanning
    alert(
      "Camera scanning would be implemented here. For demo, try: WD-240125-A7X9"
    );
  };

  const instructions = [
    {
      step: 1,
      title: "Locate Your Kit Code",
      description:
        "Find the activation code on your DNA kit box or instruction sheet. It starts with 'WD-' followed by numbers and letters.",
      icon: Package,
    },
    {
      step: 2,
      title: "Enter or Scan Code",
      description:
        "Type the code manually or use the scan button to capture it with your device camera.",
      icon: Scan,
    },
    {
      step: 3,
      title: "Activate Kit",
      description:
        "Click activate to register your kit and begin the testing process.",
      icon: CheckCircle,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-blue-50 to-white relative overflow-hidden animate-gradient-shift">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-brand-200 rounded-full opacity-30 animate-float animate-delay-400"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-300 rounded-full opacity-25 animate-rotate-slow"></div>
        <div className="absolute bottom-40 right-1/3 w-14 h-14 bg-brand-300 rounded-full opacity-20 animate-float animate-delay-800"></div>
      </div>
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-8 animate-slide-up">
          {/* Logo Section */}
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
              <p className="text-xs text-brand-600 font-medium">Activate Kit</p>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 animate-bounce-in animate-delay-200">
            Activate Your Kit
          </h1>
          <p className="text-gray-600 mt-2 animate-slide-up animate-delay-400">
            Enter your kit activation code to begin the testing process
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Activation Form */}
          <Card>
            <CardHeader>
              <CardTitle>Kit Activation</CardTitle>
              <CardDescription>
                Enter your DNA kit activation code below
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!activationResult ? (
                <form onSubmit={handleActivateKit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kit Activation Code *
                      </label>
                      <div className="flex space-x-2">
                        <Input
                          required
                          value={kitCode}
                          onChange={(e) =>
                            setKitCode(e.target.value.toUpperCase())
                          }
                          placeholder="WD-XXXXXX-XXXX"
                          className="flex-1 font-mono"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleScanCode}
                          className="px-3"
                        >
                          <Scan className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Example: WD-240125-A7X9
                      </p>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium text-blue-900">
                            Demo Codes for Testing:
                          </p>
                          <ul className="text-blue-700 mt-1 space-y-1">
                            <li>• WD-240125-A7X9 (Comprehensive Kit)</li>
                            <li>• WD-240124-B8Y1 (Basic Kit)</li>
                            <li>• WD-240123-C9Z2 (Premium Kit)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isActivating || kitCode.length < 10}
                  >
                    {isActivating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Activating Kit...
                      </>
                    ) : (
                      <>
                        Activate Kit
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              ) : (
                <div className="space-y-6">
                  {/* Activation Result */}
                  <div
                    className={`p-4 rounded-lg border ${
                      activationResult.success
                        ? "bg-green-50 border-green-200"
                        : "bg-red-50 border-red-200"
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {activationResult.success ? (
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                      )}
                      <div>
                        <h3
                          className={`font-semibold ${
                            activationResult.success
                              ? "text-green-900"
                              : "text-red-900"
                          }`}
                        >
                          {activationResult.success
                            ? "Kit Activated Successfully!"
                            : "Activation Failed"}
                        </h3>
                        <p
                          className={`text-sm mt-1 ${
                            activationResult.success
                              ? "text-green-700"
                              : "text-red-700"
                          }`}
                        >
                          {activationResult.message}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Kit Information */}
                  {activationResult.success && activationResult.kitInfo && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Kit Information</h3>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm text-gray-600">
                            Kit Number:
                          </span>
                          <span className="font-mono font-semibold">
                            {activationResult.kitInfo.kitNumber}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm text-gray-600">
                            Kit Type:
                          </span>
                          <span className="font-semibold">
                            {activationResult.kitInfo.kitType}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm text-gray-600">
                            Activated:
                          </span>
                          <span className="font-semibold">
                            {activationResult.kitInfo.activatedAt.toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm text-gray-600">
                            Expected Results:
                          </span>
                          <span className="font-semibold">
                            {activationResult.kitInfo.expectedResults.toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <div className="p-4 bg-brand-50 border border-brand-200 rounded-lg">
                        <h4 className="font-semibold text-brand-900 mb-2">
                          Next Steps:
                        </h4>
                        <ul className="text-sm text-brand-700 space-y-1">
                          <li>
                            1. Follow the collection instructions in your kit
                          </li>
                          <li>
                            2. Send your sample back using the prepaid label
                          </li>
                          <li>
                            3. Track your results in the dashboard or via email
                          </li>
                          <li>
                            4. Schedule a consultation when results are ready
                          </li>
                        </ul>
                      </div>

                      <div className="flex space-x-3">
                        <Button
                          onClick={() => router.push("/patient/dashboard")}
                          className="flex-1"
                        >
                          Go to Dashboard
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setActivationResult(null);
                            setKitCode("");
                          }}
                          className="flex-1"
                        >
                          Activate Another Kit
                        </Button>
                      </div>
                    </div>
                  )}

                  {!activationResult.success && (
                    <Button
                      onClick={() => {
                        setActivationResult(null);
                        setKitCode("");
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      Try Again
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Instructions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>How to Activate</CardTitle>
                <CardDescription>
                  Follow these simple steps to activate your kit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {instructions.map((instruction) => (
                    <div key={instruction.step} className="flex space-x-4">
                      <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-brand-600 font-bold text-sm">
                          {instruction.step}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {instruction.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {instruction.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-gray-600">
                  <p className="mb-2">
                    Can&apos;t find your activation code or having trouble?
                  </p>
                  <ul className="space-y-1">
                    <li>• Check the kit box and instruction sheet</li>
                    <li>• Look for the QR code on the sample tube</li>
                    <li>• Contact support if code is damaged</li>
                  </ul>
                </div>
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
