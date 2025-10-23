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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Filter,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  FileText,
  Calendar,
  Clock,
  User,
  Beaker,
  ShieldCheck,
  TrendingUp,
  BarChart3,
} from "lucide-react";

export default function LabQualityControlPage() {
  const sessionResult = useSession();
  const session = sessionResult?.data;
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedSample, setSelectedSample] = useState<string | null>(null);
  const [qcNotes, setQcNotes] = useState("");

  if (!session || session.user.role !== "lab") {
    router.push("/auth/login");
    return null;
  }

  // Mock QC samples data
  const qcSamples = [
    {
      id: "1",
      kitNumber: "WD-240125-A7X9",
      patientName: "John Smith",
      sampleType: "Saliva",
      receivedDate: new Date("2024-01-20"),
      processedDate: new Date("2024-01-28"),
      technician: "Lab Tech A",
      qcStatus: "pending" as const,
      qcReviewer: null,
      qcDate: null,
      qcNotes: "",
      qualityMetrics: {
        dnaConcentration: 45.2,
        purity260280: 1.85,
        purity260230: 2.1,
        integrity: "Good",
        volume: 2.5,
      },
      processingMetrics: {
        amplificationSuccess: 98.5,
        callRate: 99.2,
        heterozygoteRate: 32.1,
        contaminationCheck: "Pass",
      },
      flags: [],
    },
    {
      id: "2",
      kitNumber: "WD-240124-B8Y1",
      patientName: "Sarah Wilson",
      sampleType: "Saliva",
      receivedDate: new Date("2024-01-18"),
      processedDate: new Date("2024-01-26"),
      technician: "Lab Tech B",
      qcStatus: "passed" as const,
      qcReviewer: "QC Manager",
      qcDate: new Date("2024-01-27"),
      qcNotes: "All metrics within acceptable range. Excellent sample quality.",
      qualityMetrics: {
        dnaConcentration: 52.8,
        purity260280: 1.92,
        purity260230: 2.3,
        integrity: "Excellent",
        volume: 3.0,
      },
      processingMetrics: {
        amplificationSuccess: 99.8,
        callRate: 99.7,
        heterozygoteRate: 31.8,
        contaminationCheck: "Pass",
      },
      flags: [],
    },
    {
      id: "3",
      kitNumber: "WD-240123-C9Z2",
      patientName: "Michael Johnson",
      sampleType: "Saliva",
      receivedDate: new Date("2024-01-15"),
      processedDate: new Date("2024-01-25"),
      technician: "Lab Tech C",
      qcStatus: "review_needed" as const,
      qcReviewer: null,
      qcDate: null,
      qcNotes: "",
      qualityMetrics: {
        dnaConcentration: 28.3,
        purity260280: 1.65,
        purity260230: 1.8,
        integrity: "Degraded",
        volume: 1.8,
      },
      processingMetrics: {
        amplificationSuccess: 85.2,
        callRate: 94.1,
        heterozygoteRate: 28.5,
        contaminationCheck: "Pass",
      },
      flags: [
        "Low DNA concentration",
        "Poor sample integrity",
        "Low call rate",
      ],
    },
    {
      id: "4",
      kitNumber: "WD-240122-D1A3",
      patientName: "Emily Davis",
      sampleType: "Saliva",
      receivedDate: new Date("2024-01-12"),
      processedDate: new Date("2024-01-22"),
      technician: "Lab Tech A",
      qcStatus: "failed" as const,
      qcReviewer: "QC Manager",
      qcDate: new Date("2024-01-23"),
      qcNotes: "Sample failed QC due to contamination. Recommend recollection.",
      qualityMetrics: {
        dnaConcentration: 15.1,
        purity260280: 1.42,
        purity260230: 1.5,
        integrity: "Poor",
        volume: 1.2,
      },
      processingMetrics: {
        amplificationSuccess: 72.8,
        callRate: 88.3,
        heterozygoteRate: 45.2,
        contaminationCheck: "Fail",
      },
      flags: [
        "Very low DNA concentration",
        "Contamination detected",
        "Poor amplification",
        "High heterozygote rate",
      ],
    },
    {
      id: "5",
      kitNumber: "WD-240121-E5F6",
      patientName: "Robert Chen",
      sampleType: "Saliva",
      receivedDate: new Date("2024-01-10"),
      processedDate: new Date("2024-01-20"),
      technician: "Lab Tech B",
      qcStatus: "pending" as const,
      qcReviewer: null,
      qcDate: null,
      qcNotes: "",
      qualityMetrics: {
        dnaConcentration: 38.7,
        purity260280: 1.78,
        purity260230: 2.0,
        integrity: "Good",
        volume: 2.2,
      },
      processingMetrics: {
        amplificationSuccess: 96.3,
        callRate: 98.8,
        heterozygoteRate: 33.2,
        contaminationCheck: "Pass",
      },
      flags: ["Slightly low volume"],
    },
  ];

  const filteredSamples = qcSamples.filter((sample) => {
    const matchesSearch =
      sample.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sample.kitNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "all" || sample.qcStatus === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const selectedSampleData = qcSamples.find((s) => s.id === selectedSample);

  const getQCStatusColor = (status: string) => {
    switch (status) {
      case "passed":
        return "text-green-600 bg-green-50 border-green-200";
      case "failed":
        return "text-red-600 bg-red-50 border-red-200";
      case "review_needed":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "pending":
        return "text-blue-600 bg-blue-50 border-blue-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getMetricStatus = (metric: string, value: number) => {
    switch (metric) {
      case "dnaConcentration":
        if (value >= 40) return "excellent";
        if (value >= 25) return "good";
        if (value >= 15) return "warning";
        return "poor";
      case "purity260280":
        if (value >= 1.8 && value <= 2.0) return "excellent";
        if (value >= 1.7 && value <= 2.1) return "good";
        if (value >= 1.6 && value <= 2.2) return "warning";
        return "poor";
      case "callRate":
        if (value >= 98) return "excellent";
        if (value >= 95) return "good";
        if (value >= 90) return "warning";
        return "poor";
      default:
        return "good";
    }
  };

  const getMetricColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-green-600";
      case "good":
        return "text-blue-600";
      case "warning":
        return "text-blue-600";
      case "poor":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const handleQCDecision = (decision: "pass" | "fail" | "review") => {
    if (!selectedSampleData) return;

    const action =
      decision === "pass"
        ? "passed"
        : decision === "fail"
        ? "failed"
        : "needs review";

    alert(
      `Sample ${selectedSampleData.kitNumber} has been marked as ${action}.\n` +
        (qcNotes ? `Notes: ${qcNotes}` : "No additional notes.")
    );

    setSelectedSample(null);
    setQcNotes("");
  };

  const pendingSamples = qcSamples.filter((s) => s.qcStatus === "pending");
  const reviewNeededSamples = qcSamples.filter(
    (s) => s.qcStatus === "review_needed"
  );

  if (selectedSample && selectedSampleData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-50 to-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Button
              variant="outline"
              onClick={() => setSelectedSample(null)}
              className="mb-4"
            >
              ← Back to QC List
            </Button>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Quality Control Review
                </h1>
                <p className="text-gray-600 mt-2">
                  {selectedSampleData.patientName} •{" "}
                  {selectedSampleData.kitNumber}
                </p>
              </div>
              <Badge className={getQCStatusColor(selectedSampleData.qcStatus)}>
                {selectedSampleData.qcStatus.replace("_", " ").toUpperCase()}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Sample Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Sample Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Patient
                        </label>
                        <p className="font-semibold">
                          {selectedSampleData.patientName}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Kit Number
                        </label>
                        <p className="font-mono text-sm">
                          {selectedSampleData.kitNumber}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Sample Type
                        </label>
                        <p className="text-sm">
                          {selectedSampleData.sampleType}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Received Date
                        </label>
                        <p className="text-sm">
                          {selectedSampleData.receivedDate.toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Processed Date
                        </label>
                        <p className="text-sm">
                          {selectedSampleData.processedDate.toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Technician
                        </label>
                        <p className="text-sm">
                          {selectedSampleData.technician}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quality Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Quality Metrics</CardTitle>
                  <CardDescription>
                    DNA quality and purity measurements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium">
                          DNA Concentration
                        </span>
                        <div className="text-right">
                          <span
                            className={`font-semibold ${getMetricColor(
                              getMetricStatus(
                                "dnaConcentration",
                                selectedSampleData.qualityMetrics
                                  .dnaConcentration
                              )
                            )}`}
                          >
                            {selectedSampleData.qualityMetrics.dnaConcentration}{" "}
                            ng/μL
                          </span>
                          <p className="text-xs text-gray-500">
                            Target: ≥25 ng/μL
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium">
                          260/280 Ratio
                        </span>
                        <div className="text-right">
                          <span
                            className={`font-semibold ${getMetricColor(
                              getMetricStatus(
                                "purity260280",
                                selectedSampleData.qualityMetrics.purity260280
                              )
                            )}`}
                          >
                            {selectedSampleData.qualityMetrics.purity260280}
                          </span>
                          <p className="text-xs text-gray-500">
                            Target: 1.8-2.0
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium">
                          260/230 Ratio
                        </span>
                        <div className="text-right">
                          <span className="font-semibold">
                            {selectedSampleData.qualityMetrics.purity260230}
                          </span>
                          <p className="text-xs text-gray-500">Target: ≥2.0</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium">
                          DNA Integrity
                        </span>
                        <Badge
                          variant={
                            selectedSampleData.qualityMetrics.integrity ===
                            "Excellent"
                              ? "default"
                              : selectedSampleData.qualityMetrics.integrity ===
                                "Good"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {selectedSampleData.qualityMetrics.integrity}
                        </Badge>
                      </div>

                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium">
                          Sample Volume
                        </span>
                        <div className="text-right">
                          <span className="font-semibold">
                            {selectedSampleData.qualityMetrics.volume} mL
                          </span>
                          <p className="text-xs text-gray-500">
                            Target: ≥2.0 mL
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Processing Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Processing Metrics</CardTitle>
                  <CardDescription>
                    Genotyping and analysis results
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium">
                          Amplification Success
                        </span>
                        <div className="text-right">
                          <span className="font-semibold">
                            {
                              selectedSampleData.processingMetrics
                                .amplificationSuccess
                            }
                            %
                          </span>
                          <p className="text-xs text-gray-500">Target: ≥95%</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium">Call Rate</span>
                        <div className="text-right">
                          <span
                            className={`font-semibold ${getMetricColor(
                              getMetricStatus(
                                "callRate",
                                selectedSampleData.processingMetrics.callRate
                              )
                            )}`}
                          >
                            {selectedSampleData.processingMetrics.callRate}%
                          </span>
                          <p className="text-xs text-gray-500">Target: ≥95%</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium">
                          Heterozygote Rate
                        </span>
                        <div className="text-right">
                          <span className="font-semibold">
                            {
                              selectedSampleData.processingMetrics
                                .heterozygoteRate
                            }
                            %
                          </span>
                          <p className="text-xs text-gray-500">
                            Expected: 30-35%
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium">
                          Contamination Check
                        </span>
                        <Badge
                          variant={
                            selectedSampleData.processingMetrics
                              .contaminationCheck === "Pass"
                              ? "default"
                              : "destructive"
                          }
                        >
                          {
                            selectedSampleData.processingMetrics
                              .contaminationCheck
                          }
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Flags and Issues */}
              {selectedSampleData.flags.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <AlertTriangle className="w-5 h-5 text-blue-600" />
                      <span>Quality Flags</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedSampleData.flags.map((flag, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 p-2 bg-blue-50 border border-blue-200 rounded"
                        >
                          <AlertTriangle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span className="text-sm text-blue-800">{flag}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* QC Decision */}
              <Card>
                <CardHeader>
                  <CardTitle>QC Decision</CardTitle>
                  <CardDescription>
                    Review the sample and make a quality control decision
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      QC Notes
                    </label>
                    <Textarea
                      value={qcNotes}
                      onChange={(e) => setQcNotes(e.target.value)}
                      placeholder="Add any notes about the quality control review..."
                      rows={4}
                    />
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      onClick={() => handleQCDecision("pass")}
                      className="flex-1"
                      variant="default"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Pass QC
                    </Button>
                    <Button
                      onClick={() => handleQCDecision("review")}
                      className="flex-1"
                      variant="outline"
                    >
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Needs Review
                    </Button>
                    <Button
                      onClick={() => handleQCDecision("fail")}
                      className="flex-1"
                      variant="destructive"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Fail QC
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>QC Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Overall Status
                      </span>
                      <Badge
                        className={getQCStatusColor(
                          selectedSampleData.qcStatus
                        )}
                      >
                        {selectedSampleData.qcStatus.replace("_", " ")}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Quality Flags
                      </span>
                      <span className="font-semibold text-red-600">
                        {selectedSampleData.flags.length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Processing Time
                      </span>
                      <span className="font-semibold">
                        {Math.ceil(
                          (selectedSampleData.processedDate.getTime() -
                            selectedSampleData.receivedDate.getTime()) /
                            (1000 * 60 * 60 * 24)
                        )}{" "}
                        days
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>QC Guidelines</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>DNA concentration ≥25 ng/μL</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>260/280 ratio between 1.8-2.0</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Call rate ≥95%</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>No contamination detected</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Quality Control
              </h1>
              <p className="text-gray-600 mt-2">
                Review and approve processed samples
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline">
                <BarChart3 className="w-4 h-4 mr-2" />
                QC Report
              </Button>
              <Button variant="outline">
                <TrendingUp className="w-4 h-4 mr-2" />
                Statistics
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pending">
              Pending ({pendingSamples.length})
            </TabsTrigger>
            <TabsTrigger value="review">
              Review Needed ({reviewNeededSamples.length})
            </TabsTrigger>
            <TabsTrigger value="all">All Samples</TabsTrigger>
            <TabsTrigger value="statistics">Statistics</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pending QC Review</CardTitle>
                <CardDescription>
                  Samples waiting for quality control approval
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingSamples.map((sample) => (
                    <div
                      key={sample.id}
                      className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedSample(sample.id)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {sample.patientName}
                          </h3>
                          <p className="text-sm font-mono text-gray-600">
                            {sample.kitNumber}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getQCStatusColor(sample.qcStatus)}>
                            {sample.qcStatus}
                          </Badge>
                          {sample.flags.length > 0 && (
                            <Badge variant="destructive">
                              {sample.flags.length} flags
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Processed:</span>
                          <span className="ml-1 font-medium">
                            {sample.processedDate.toLocaleDateString()}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Technician:</span>
                          <span className="ml-1 font-medium">
                            {sample.technician}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Call Rate:</span>
                          <span
                            className={`ml-1 font-medium ${getMetricColor(
                              getMetricStatus(
                                "callRate",
                                sample.processingMetrics.callRate
                              )
                            )}`}
                          >
                            {sample.processingMetrics.callRate}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {pendingSamples.length === 0 && (
                    <div className="text-center py-8">
                      <ShieldCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">
                        No samples pending QC review
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="review" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Samples Needing Review</CardTitle>
                <CardDescription>
                  Samples flagged for additional review
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reviewNeededSamples.map((sample) => (
                    <div
                      key={sample.id}
                      className="p-4 border border-blue-200 bg-blue-50 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedSample(sample.id)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {sample.patientName}
                          </h3>
                          <p className="text-sm font-mono text-gray-600">
                            {sample.kitNumber}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getQCStatusColor(sample.qcStatus)}>
                            review needed
                          </Badge>
                          <Badge variant="destructive">
                            {sample.flags.length} flags
                          </Badge>
                        </div>
                      </div>

                      <div className="mb-3">
                        <h4 className="text-sm font-medium text-gray-700 mb-1">
                          Quality Issues:
                        </h4>
                        <div className="space-y-1">
                          {sample.flags.slice(0, 2).map((flag, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2"
                            >
                              <AlertTriangle className="w-3 h-3 text-blue-600" />
                              <span className="text-xs text-blue-800">
                                {flag}
                              </span>
                            </div>
                          ))}
                          {sample.flags.length > 2 && (
                            <span className="text-xs text-gray-600">
                              +{sample.flags.length - 2} more issues
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">DNA Conc:</span>
                          <span
                            className={`ml-1 font-medium ${getMetricColor(
                              getMetricStatus(
                                "dnaConcentration",
                                sample.qualityMetrics.dnaConcentration
                              )
                            )}`}
                          >
                            {sample.qualityMetrics.dnaConcentration} ng/μL
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Call Rate:</span>
                          <span
                            className={`ml-1 font-medium ${getMetricColor(
                              getMetricStatus(
                                "callRate",
                                sample.processingMetrics.callRate
                              )
                            )}`}
                          >
                            {sample.processingMetrics.callRate}%
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Integrity:</span>
                          <span className="ml-1 font-medium">
                            {sample.qualityMetrics.integrity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="all" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardHeader>
                <CardTitle>All QC Samples</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search by patient name or kit number..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="passed">Passed</option>
                    <option value="failed">Failed</option>
                    <option value="review_needed">Review Needed</option>
                  </select>
                </div>

                <div className="space-y-4">
                  {filteredSamples.map((sample) => (
                    <div
                      key={sample.id}
                      className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedSample(sample.id)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {sample.patientName}
                          </h3>
                          <p className="text-sm font-mono text-gray-600">
                            {sample.kitNumber}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getQCStatusColor(sample.qcStatus)}>
                            {sample.qcStatus.replace("_", " ")}
                          </Badge>
                          {sample.flags.length > 0 && (
                            <Badge variant="outline">
                              {sample.flags.length} flags
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Processed:</span>
                          <span className="ml-1 font-medium">
                            {sample.processedDate.toLocaleDateString()}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Technician:</span>
                          <span className="ml-1 font-medium">
                            {sample.technician}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">QC Reviewer:</span>
                          <span className="ml-1 font-medium">
                            {sample.qcReviewer || "Not assigned"}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">QC Date:</span>
                          <span className="ml-1 font-medium">
                            {sample.qcDate
                              ? sample.qcDate.toLocaleDateString()
                              : "Pending"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="statistics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Clock className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        {pendingSamples.length}
                      </p>
                      <p className="text-sm text-gray-600">Pending QC</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        {
                          qcSamples.filter((s) => s.qcStatus === "passed")
                            .length
                        }
                      </p>
                      <p className="text-sm text-gray-600">Passed QC</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        {reviewNeededSamples.length}
                      </p>
                      <p className="text-sm text-gray-600">Need Review</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <XCircle className="w-4 h-4 text-red-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        {
                          qcSamples.filter((s) => s.qcStatus === "failed")
                            .length
                        }
                      </p>
                      <p className="text-sm text-gray-600">Failed QC</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>QC Performance Overview</CardTitle>
                <CardDescription>
                  Quality control metrics and trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-2">QC Statistics Dashboard</p>
                  <p className="text-sm text-gray-400">
                    Detailed analytics and charts would be implemented here
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
