"use client";

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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  Dna,
  Activity,
  Heart,
  Brain,
  Utensils,
  Save,
  Send,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

export default function DoctorReviewResultsPage() {
  const session = useSession();
  const router = useRouter();
  const [kitNumber, setKitNumber] = useState("");
  const [selectedKit, setSelectedKit] = useState<{
    kitNumber: string;
    patientName: string;
    patientAge: number;
    kitType: string;
    receivedDate: Date;
    processedDate: Date;
    status: string;
    rawResults: Record<string, unknown>;
    familyHistory?: string[];
  } | null>(null);
  const [riskAssessment, setRiskAssessment] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [clinicalNotes, setClinicalNotes] = useState("");
  const [overallRiskLevel, setOverallRiskLevel] = useState<
    "low" | "medium" | "high"
  >("medium");

  // Handle case where session might be undefined during SSR
  if (!session) {
    return <div>Loading...</div>;
  }

  if (session.status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session.data || session.data.user.role !== "doctor") {
    router.push("/auth/login");
    return null;
  }

  // Mock kits data for review
  const pendingKits = [
    {
      kitNumber: "WD-240125-A7X9",
      patientName: "John Smith",
      patientAge: 34,
      kitType: "Comprehensive Health Kit",
      receivedDate: new Date("2024-01-20"),
      processedDate: new Date("2024-01-28"),
      status: "pending_review" as const,
      rawResults: {
        nutrition: {
          caffeineMetabolism: "Normal",
          lactoseIntolerance: "Intolerant",
          vitaminDAbsorption: "Reduced",
          alcoholMetabolism: "Slow",
        },
        fitness: {
          muscleType: "Mixed",
          recoveryTime: "Slow",
          injuryRisk: "High",
          enduranceCapacity: "Average",
        },
        health: {
          cardiovascularRisk: "Elevated",
          diabetesRisk: "Moderate",
          hypertensionRisk: "High",
          cancerRisk: "Low",
        },
        wellness: {
          sleepQuality: "Sensitive",
          stressResponse: "High",
          moodRegulation: "Normal",
          cognitiveFunction: "Above Average",
        },
      },
      familyHistory: ["Hypertension", "Type 2 Diabetes", "Heart Disease"],
      currentMedications: ["Lisinopril 10mg"],
    },
    {
      kitNumber: "WD-240124-B8Y1",
      patientName: "Sarah Wilson",
      patientAge: 28,
      kitType: "Basic Health Kit",
      receivedDate: new Date("2024-01-18"),
      processedDate: new Date("2024-01-26"),
      status: "pending_review" as const,
      rawResults: {
        nutrition: {
          caffeineMetabolism: "Fast",
          lactoseIntolerance: "Tolerant",
          vitaminDAbsorption: "Normal",
          alcoholMetabolism: "Normal",
        },
        fitness: {
          muscleType: "Fast Twitch",
          recoveryTime: "Fast",
          injuryRisk: "Low",
          enduranceCapacity: "High",
        },
        health: {
          cardiovascularRisk: "Low",
          diabetesRisk: "Low",
          hypertensionRisk: "Low",
          cancerRisk: "Low",
        },
        wellness: {
          sleepQuality: "Normal",
          stressResponse: "Low",
          moodRegulation: "Stable",
          cognitiveFunction: "High",
        },
      },
      familyHistory: [],
      currentMedications: [],
    },
    {
      kitNumber: "WD-240123-C9Z2",
      patientName: "Michael Johnson",
      patientAge: 45,
      kitType: "Premium Coaching Package",
      receivedDate: new Date("2024-01-15"),
      processedDate: new Date("2024-01-25"),
      status: "pending_review" as const,
      rawResults: {
        nutrition: {
          caffeineMetabolism: "Slow",
          lactoseIntolerance: "Intolerant",
          vitaminDAbsorption: "Very Reduced",
          alcoholMetabolism: "Very Slow",
        },
        fitness: {
          muscleType: "Slow Twitch",
          recoveryTime: "Very Slow",
          injuryRisk: "Very High",
          enduranceCapacity: "Low",
        },
        health: {
          cardiovascularRisk: "Very High",
          diabetesRisk: "High",
          hypertensionRisk: "Very High",
          cancerRisk: "Moderate",
        },
        wellness: {
          sleepQuality: "Poor",
          stressResponse: "Very High",
          moodRegulation: "Unstable",
          cognitiveFunction: "Below Average",
        },
      },
      familyHistory: [
        "Heart Disease",
        "Stroke",
        "High Cholesterol",
        "Diabetes",
      ],
      currentMedications: [
        "Atorvastatin 20mg",
        "Aspirin 81mg",
        "Metformin 500mg",
      ],
    },
  ];

  const handleKitSearch = () => {
    const kit = pendingKits.find(
      (k) => k.kitNumber === kitNumber.toUpperCase()
    );
    if (kit) {
      setSelectedKit(kit);
      // Auto-generate initial assessment
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const riskFactors = Object.values(kit.rawResults).flat();
      const highRiskCount =
        JSON.stringify(kit.rawResults)
          .toLowerCase()
          .match(/(high|very high|elevated|poor|unstable)/g)?.length || 0;

      if (highRiskCount > 5) {
        setOverallRiskLevel("high");
        setRiskAssessment(
          "Patient shows multiple high-risk genetic markers requiring immediate attention and lifestyle intervention."
        );
      } else if (highRiskCount > 2) {
        setOverallRiskLevel("medium");
        setRiskAssessment(
          "Patient has moderate risk factors that can be managed with targeted lifestyle modifications."
        );
      } else {
        setOverallRiskLevel("low");
        setRiskAssessment(
          "Patient shows favorable genetic profile with minimal risk factors."
        );
      }
    } else {
      alert("Kit number not found or not ready for review");
    }
  };

  const handleSaveResults = () => {
    if (!selectedKit) return;

    const results = {
      kitNumber: selectedKit.kitNumber,
      patientName: selectedKit.patientName,
      overallRiskLevel,
      riskAssessment,
      recommendations,
      clinicalNotes,
      reviewedBy: session.data.user.name,
      reviewedAt: new Date(),
    };

    // In real app, this would save to database
    console.log("Saving results:", results);
    alert("Results saved successfully!");
  };

  const handleSendToPatient = () => {
    if (!selectedKit) return;

    // In real app, this would send notification to patient
    alert(
      `Results sent to ${selectedKit.patientName}. Patient will receive email notification.`
    );

    // Reset form
    setSelectedKit(null);
    setKitNumber("");
    setRiskAssessment("");
    setRecommendations("");
    setClinicalNotes("");
    setOverallRiskLevel("medium");
  };

  const getRiskColor = (level: "low" | "medium" | "high") => {
    switch (level) {
      case "low":
        return "text-green-600 bg-green-50 border-green-200";
      case "medium":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "high":
        return "text-red-600 bg-red-50 border-red-200";
    }
  };

  const getResultColor = (value: string) => {
    const lowerValue = value.toLowerCase();
    if (
      lowerValue.includes("high") ||
      lowerValue.includes("elevated") ||
      lowerValue.includes("poor")
    ) {
      return "text-red-600 bg-red-50";
    } else if (
      lowerValue.includes("moderate") ||
      lowerValue.includes("slow") ||
      lowerValue.includes("sensitive")
    ) {
      return "text-blue-600 bg-blue-50";
    } else {
      return "text-green-600 bg-green-50";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-blue-50 to-white relative overflow-hidden animate-gradient-shift">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-brand-200 rounded-full opacity-30 animate-float animate-delay-400"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-300 rounded-full opacity-25 animate-rotate-slow"></div>
        <div className="absolute bottom-40 right-1/3 w-14 h-14 bg-brand-300 rounded-full opacity-20 animate-float animate-delay-800"></div>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
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
              <p className="text-xs text-brand-600 font-medium">
                Doctor Review Results
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 animate-bounce-in animate-delay-200">
                Review Results
              </h1>
              <p className="text-gray-600 mt-2 animate-slide-up animate-delay-400">
                Review genetic test results and provide clinical assessment
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Pending Reviews ({pendingKits.length})
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Kit Search */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-600">
              <CardHeader>
                <CardTitle className="flex items-center group">
                  <div className="w-8 h-8 bg-gradient-to-br from-brand-100 to-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                    <Search className="w-5 h-5 text-brand-600 group-hover:scale-110 transition-transform" />
                  </div>
                  Find Kit for Review
                </CardTitle>
                <CardDescription>
                  Enter kit number to load test results for review
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Enter kit number (e.g., WD-240125-A7X9)"
                      value={kitNumber}
                      onChange={(e) =>
                        setKitNumber(e.target.value.toUpperCase())
                      }
                      className="font-mono"
                    />
                  </div>
                  <Button onClick={handleKitSearch} disabled={!kitNumber}>
                    <Search className="w-4 h-4 mr-2" />
                    Load Kit
                  </Button>
                </div>

                {pendingKits.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">
                      Demo kit numbers for testing:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {pendingKits.map((kit) => (
                        <Button
                          key={kit.kitNumber}
                          variant="outline"
                          size="sm"
                          onClick={() => setKitNumber(kit.kitNumber)}
                          className="font-mono text-xs"
                        >
                          {kit.kitNumber}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {selectedKit && (
              <>
                {/* Patient Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Patient Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <User className="w-5 h-5 text-gray-600" />
                          <div>
                            <p className="font-semibold">
                              {selectedKit.patientName}
                            </p>
                            <p className="text-sm text-gray-600">
                              {selectedKit.patientAge} years old
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Dna className="w-5 h-5 text-gray-600" />
                          <div>
                            <p className="font-medium">{selectedKit.kitType}</p>
                            <p className="text-sm text-gray-600">
                              Kit: {selectedKit.kitNumber}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Processing Timeline
                          </p>
                          <p className="text-sm">
                            Received:{" "}
                            {selectedKit.receivedDate.toLocaleDateString()}
                          </p>
                          <p className="text-sm">
                            Processed:{" "}
                            {selectedKit.processedDate.toLocaleDateString()}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Family History
                          </p>
                          {selectedKit.familyHistory &&
                          selectedKit.familyHistory.length > 0 ? (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {selectedKit.familyHistory.map(
                                (condition, index) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {condition}
                                  </Badge>
                                )
                              )}
                            </div>
                          ) : (
                            <p className="text-sm text-gray-600">
                              No significant family history
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Raw Results */}
                <Card>
                  <CardHeader>
                    <CardTitle>Genetic Analysis Results</CardTitle>
                    <CardDescription>
                      Raw genetic markers and risk factors
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {/* Nutrition */}
                      <div>
                        <div className="flex items-center space-x-2 mb-3">
                          <Utensils className="w-5 h-5 text-brand-600" />
                          <h3 className="font-semibold">Nutrition</h3>
                        </div>
                        <div className="space-y-2">
                          {Object.entries(
                            selectedKit.rawResults.nutrition as Record<
                              string,
                              unknown
                            >
                          ).map(([key, value]) => (
                            <div
                              key={key}
                              className="flex justify-between items-center"
                            >
                              <span className="text-sm text-gray-600 capitalize">
                                {key.replace(/([A-Z])/g, " $1").trim()}:
                              </span>
                              <Badge className={getResultColor(String(value))}>
                                {String(value)}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Fitness */}
                      <div>
                        <div className="flex items-center space-x-2 mb-3">
                          <Activity className="w-5 h-5 text-brand-600" />
                          <h3 className="font-semibold">Fitness</h3>
                        </div>
                        <div className="space-y-2">
                          {Object.entries(
                            selectedKit.rawResults.fitness as Record<
                              string,
                              unknown
                            >
                          ).map(([key, value]) => (
                            <div
                              key={key}
                              className="flex justify-between items-center"
                            >
                              <span className="text-sm text-gray-600 capitalize">
                                {key.replace(/([A-Z])/g, " $1").trim()}:
                              </span>
                              <Badge className={getResultColor(String(value))}>
                                {String(value)}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Health */}
                      <div>
                        <div className="flex items-center space-x-2 mb-3">
                          <Heart className="w-5 h-5 text-brand-600" />
                          <h3 className="font-semibold">Health Risks</h3>
                        </div>
                        <div className="space-y-2">
                          {Object.entries(
                            selectedKit.rawResults.health as Record<
                              string,
                              unknown
                            >
                          ).map(([key, value]) => (
                            <div
                              key={key}
                              className="flex justify-between items-center"
                            >
                              <span className="text-sm text-gray-600 capitalize">
                                {key.replace(/([A-Z])/g, " $1").trim()}:
                              </span>
                              <Badge className={getResultColor(String(value))}>
                                {String(value)}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Wellness */}
                      <div>
                        <div className="flex items-center space-x-2 mb-3">
                          <Brain className="w-5 h-5 text-brand-600" />
                          <h3 className="font-semibold">Wellness</h3>
                        </div>
                        <div className="space-y-2">
                          {Object.entries(
                            selectedKit.rawResults.wellness as Record<
                              string,
                              unknown
                            >
                          ).map(([key, value]) => (
                            <div
                              key={key}
                              className="flex justify-between items-center"
                            >
                              <span className="text-sm text-gray-600 capitalize">
                                {key.replace(/([A-Z])/g, " $1").trim()}:
                              </span>
                              <Badge className={getResultColor(String(value))}>
                                {String(value)}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Clinical Assessment */}
                <Card>
                  <CardHeader>
                    <CardTitle>Clinical Assessment</CardTitle>
                    <CardDescription>
                      Provide your professional assessment and recommendations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Overall Risk Level */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Overall Risk Level *
                        </label>
                        <div className="flex space-x-3">
                          {(["low", "medium", "high"] as const).map((level) => (
                            <button
                              key={level}
                              type="button"
                              className={`px-4 py-2 border rounded-lg text-sm font-medium transition-all ${
                                overallRiskLevel === level
                                  ? getRiskColor(level) + " border-current"
                                  : "border-gray-300 hover:border-gray-400"
                              }`}
                              onClick={() => setOverallRiskLevel(level)}
                            >
                              {level.charAt(0).toUpperCase() + level.slice(1)}{" "}
                              Risk
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Risk Assessment */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Risk Assessment Summary *
                        </label>
                        <Textarea
                          value={riskAssessment}
                          onChange={(e) => setRiskAssessment(e.target.value)}
                          placeholder="Provide a comprehensive assessment of the patient's genetic risk profile..."
                          rows={4}
                          className="w-full"
                        />
                      </div>

                      {/* Recommendations */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Clinical Recommendations *
                        </label>
                        <Textarea
                          value={recommendations}
                          onChange={(e) => setRecommendations(e.target.value)}
                          placeholder="Provide specific, actionable recommendations for lifestyle modifications, monitoring, or interventions..."
                          rows={6}
                          className="w-full"
                        />
                      </div>

                      {/* Clinical Notes */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Additional Clinical Notes
                        </label>
                        <Textarea
                          value={clinicalNotes}
                          onChange={(e) => setClinicalNotes(e.target.value)}
                          placeholder="Any additional notes, follow-up requirements, or special considerations..."
                          rows={3}
                          className="w-full"
                        />
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-4 pt-4 border-t">
                        <Button
                          onClick={handleSaveResults}
                          disabled={!riskAssessment || !recommendations}
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Save Results
                        </Button>
                        <Button
                          onClick={handleSendToPatient}
                          disabled={!riskAssessment || !recommendations}
                          variant="outline"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Send to Patient
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-1000">
              <CardHeader>
                <CardTitle className="flex items-center group">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-brand-100 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                    <Clock className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                  </div>
                  Pending Reviews
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pendingKits.map((kit) => (
                    <div
                      key={kit.kitNumber}
                      className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                      onClick={() => setKitNumber(kit.kitNumber)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">
                          {kit.patientName}
                        </h4>
                        <Badge variant="outline">
                          <Clock className="w-3 h-3 mr-1" />
                          Pending
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-1">
                        {kit.kitType}
                      </p>
                      <p className="text-xs font-mono text-gray-500">
                        {kit.kitNumber}
                      </p>
                      <p className="text-xs text-gray-500">
                        Processed: {kit.processedDate.toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Review Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Review all genetic markers carefully</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Consider family history and current medications</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Provide actionable recommendations</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Include follow-up timeline if needed</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {selectedKit && (
              <Card>
                <CardHeader>
                  <CardTitle>Risk Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Overall Assessment
                      </span>
                      <Badge className={getRiskColor(overallRiskLevel)}>
                        {overallRiskLevel.toUpperCase()}
                      </Badge>
                    </div>

                    <div className="pt-3 border-t">
                      <p className="text-xs text-gray-500 mb-2">
                        High Risk Markers:
                      </p>
                      <div className="space-y-1">
                        {Object.entries(
                          selectedKit.rawResults as Record<string, unknown>
                        ).map(([category, results]) =>
                          Object.entries(
                            results as Record<string, unknown>
                          ).map(([key, value]) => {
                            if (
                              typeof value === "string" &&
                              (value.toLowerCase().includes("high") ||
                                value.toLowerCase().includes("elevated"))
                            ) {
                              return (
                                <div
                                  key={`${category}-${key}`}
                                  className="flex items-center space-x-2"
                                >
                                  <AlertTriangle className="w-3 h-3 text-red-600" />
                                  <span className="text-xs text-gray-700">
                                    {key.replace(/([A-Z])/g, " $1").trim()}
                                  </span>
                                </div>
                              );
                            }
                            return null;
                          })
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
