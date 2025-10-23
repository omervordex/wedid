"use client";

// Force dynamic rendering for this page
export const dynamic = "force-dynamic";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  Download,
  Calendar,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Heart,
  Utensils,
  Dumbbell,
  Brain,
  Shield,
} from "lucide-react";

export default function TestResultsPage() {
  const sessionResult = useSession();
  const session = sessionResult?.data;
  const router = useRouter();

  if (!session || session.user.role !== "patient") {
    router.push("/auth/login");
    return null;
  }

  // Mock test results data
  const testResults = {
    overview: {
      overallRiskScore: 65,
      riskLevel: "medium" as const,
      completedAt: new Date("2024-01-15"),
      kitNumber: "WD-240125-A7X9",
      reportVersion: "v2.1",
    },
    categories: [
      {
        id: "nutrition",
        name: "Nutritional Genetics",
        icon: Utensils,
        riskScore: 45,
        riskLevel: "low" as const,
        insights: [
          {
            trait: "Caffeine Sensitivity",
            result: "Normal Sensitivity",
            recommendation: "Up to 400mg daily is generally safe for you",
            impact: "low",
          },
          {
            trait: "Lactose Tolerance",
            result: "Lactose Intolerant",
            recommendation: "Consider lactose-free alternatives",
            impact: "medium",
          },
          {
            trait: "Vitamin D Absorption",
            result: "Reduced Absorption",
            recommendation:
              "Higher vitamin D supplementation may be beneficial",
            impact: "medium",
          },
        ],
      },
      {
        id: "fitness",
        name: "Fitness & Exercise",
        icon: Dumbbell,
        riskScore: 72,
        riskLevel: "medium" as const,
        insights: [
          {
            trait: "Muscle Fiber Type",
            result: "Mixed Fast/Slow",
            recommendation: "Combine strength and endurance training",
            impact: "low",
          },
          {
            trait: "Recovery Time",
            result: "Slower Recovery",
            recommendation: "Allow 48-72 hours between intense sessions",
            impact: "medium",
          },
          {
            trait: "Injury Risk",
            result: "Higher Risk",
            recommendation: "Focus on proper warm-up and flexibility",
            impact: "high",
          },
        ],
      },
      {
        id: "health",
        name: "Health Risks",
        icon: Heart,
        riskScore: 85,
        riskLevel: "high" as const,
        insights: [
          {
            trait: "Cardiovascular Disease",
            result: "Elevated Risk",
            recommendation: "Regular cardio exercise and heart-healthy diet",
            impact: "high",
          },
          {
            trait: "Type 2 Diabetes",
            result: "Moderate Risk",
            recommendation: "Monitor blood sugar and maintain healthy weight",
            impact: "medium",
          },
          {
            trait: "High Blood Pressure",
            result: "Genetic Predisposition",
            recommendation: "Limit sodium intake and manage stress",
            impact: "high",
          },
        ],
      },
      {
        id: "wellness",
        name: "Wellness & Lifestyle",
        icon: Brain,
        riskScore: 58,
        riskLevel: "medium" as const,
        insights: [
          {
            trait: "Sleep Quality",
            result: "Sensitive to Disruption",
            recommendation: "Maintain consistent sleep schedule",
            impact: "medium",
          },
          {
            trait: "Stress Response",
            result: "Higher Sensitivity",
            recommendation: "Practice stress management techniques",
            impact: "medium",
          },
          {
            trait: "Mood Regulation",
            result: "Normal Response",
            recommendation: "Continue current lifestyle habits",
            impact: "low",
          },
        ],
      },
    ],
    recommendations: [
      {
        category: "Immediate Actions",
        priority: "high",
        items: [
          "Schedule cardiovascular screening with your doctor",
          "Start heart-healthy Mediterranean diet",
          "Begin regular cardio exercise routine",
        ],
      },
      {
        category: "Dietary Changes",
        priority: "medium",
        items: [
          "Reduce dairy products or use lactose-free alternatives",
          "Increase vitamin D supplementation to 2000 IU daily",
          "Limit sodium intake to less than 2300mg per day",
        ],
      },
      {
        category: "Lifestyle Modifications",
        priority: "medium",
        items: [
          "Implement stress reduction techniques (meditation, yoga)",
          "Maintain consistent sleep schedule (7-9 hours)",
          "Allow adequate recovery time between workouts",
        ],
      },
    ],
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

  const getImpactIcon = (impact: "low" | "medium" | "high") => {
    switch (impact) {
      case "low":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "medium":
        return <AlertTriangle className="w-4 h-4 text-blue-600" />;
      case "high":
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Your Test Results
              </h1>
              <p className="text-gray-600 mt-2">
                Comprehensive genetic analysis and personalized recommendations
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button>
                <Calendar className="w-4 h-4 mr-2" />
                Book Consultation
              </Button>
            </div>
          </div>
        </div>

        {/* Overview Card */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">
                  Overall Risk Assessment
                </CardTitle>
                <CardDescription>
                  Kit: {testResults.overview.kitNumber} • Completed:{" "}
                  {testResults.overview.completedAt.toLocaleDateString()}
                </CardDescription>
              </div>
              <Badge className={getRiskColor(testResults.overview.riskLevel)}>
                {testResults.overview.riskLevel.toUpperCase()} RISK
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-10 h-10 text-blue-600" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">
                    {testResults.overview.overallRiskScore}
                  </div>
                  <div className="text-sm text-gray-600">
                    Overall Risk Score
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Risk Level</span>
                    <span>{testResults.overview.overallRiskScore}/100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${testResults.overview.overallRiskScore}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Your genetic profile indicates moderate health risks that can
                  be managed with lifestyle modifications.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span className="text-sm">CLIA Lab Certified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Medically Reviewed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Actionable Insights</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Results */}
        <Tabs defaultValue="categories" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>

          <TabsContent value="categories" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {testResults.categories.map((category) => (
                <Card key={category.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <category.icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            {category.name}
                          </CardTitle>
                          <CardDescription>
                            Risk Score: {category.riskScore}/100
                          </CardDescription>
                        </div>
                      </div>
                      <Badge className={getRiskColor(category.riskLevel)}>
                        {category.riskLevel}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {category.insights.map((insight, index) => (
                        <div
                          key={index}
                          className="p-4 bg-gray-50 rounded-lg space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-gray-900">
                              {insight.trait}
                            </h4>
                            {getImpactIcon(
                              insight.impact as "low" | "medium" | "high"
                            )}
                          </div>
                          <div className="text-sm">
                            <p className="text-gray-700 mb-1">
                              <span className="font-medium">Result:</span>{" "}
                              {insight.result}
                            </p>
                            <p className="text-gray-600">
                              <span className="font-medium">
                                Recommendation:
                              </span>{" "}
                              {insight.recommendation}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {testResults.recommendations.map((rec, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          rec.priority === "high"
                            ? "bg-red-500"
                            : rec.priority === "medium"
                            ? "bg-blue-500"
                            : "bg-green-500"
                        }`}
                      ></div>
                      <CardTitle className="text-lg">{rec.category}</CardTitle>
                    </div>
                    <Badge
                      variant={
                        rec.priority === "high" ? "destructive" : "secondary"
                      }
                    >
                      {rec.priority} priority
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {rec.items.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="flex items-start space-x-2"
                        >
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Testing Journey</CardTitle>
                <CardDescription>
                  Timeline of your genetic testing process
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    {
                      date: "Jan 1, 2024",
                      title: "Kit Ordered",
                      description: "Comprehensive Health Kit ordered online",
                      status: "completed",
                    },
                    {
                      date: "Jan 3, 2024",
                      title: "Kit Delivered",
                      description: "Kit delivered and activated by patient",
                      status: "completed",
                    },
                    {
                      date: "Jan 5, 2024",
                      title: "Sample Collected",
                      description: "Sample collected and shipped to lab",
                      status: "completed",
                    },
                    {
                      date: "Jan 8, 2024",
                      title: "Lab Processing",
                      description: "Sample received and processing began",
                      status: "completed",
                    },
                    {
                      date: "Jan 15, 2024",
                      title: "Results Available",
                      description: "Genetic analysis completed and reviewed",
                      status: "completed",
                    },
                    {
                      date: "Pending",
                      title: "Consultation Scheduled",
                      description: "Book a consultation to discuss results",
                      status: "pending",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div
                        className={`w-4 h-4 rounded-full flex-shrink-0 mt-1 ${
                          item.status === "completed"
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      ></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900">
                            {item.title}
                          </h3>
                          <span className="text-sm text-gray-500">
                            {item.date}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
