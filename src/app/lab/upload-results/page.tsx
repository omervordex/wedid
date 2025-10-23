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
import {
  Upload,
  FileText,
  CheckCircle,
  AlertTriangle,
  Search,
  Download,
  Eye,
  Trash2,
  Calendar,
  Clock,
  User,
  Beaker,
} from "lucide-react";
import Image from "next/image";
import { Sparkles } from "lucide-react";

export default function LabUploadResultsPage() {
  const sessionResult = useSession();
  const session = sessionResult?.data;
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadMethod, setUploadMethod] = useState<"csv" | "manual">("csv");
  const [kitNumber, setKitNumber] = useState("");
  const [manualResults, setManualResults] = useState({
    nutrition: {
      caffeineMetabolism: "",
      lactoseIntolerance: "",
      vitaminDAbsorption: "",
      alcoholMetabolism: "",
    },
    fitness: {
      muscleType: "",
      recoveryTime: "",
      injuryRisk: "",
      enduranceCapacity: "",
    },
    health: {
      cardiovascularRisk: "",
      diabetesRisk: "",
      hypertensionRisk: "",
      cancerRisk: "",
    },
    wellness: {
      sleepQuality: "",
      stressResponse: "",
      moodRegulation: "",
      cognitiveFunction: "",
    },
  });
  const [uploadNotes, setUploadNotes] = useState("");

  if (!session || session.user.role !== "lab") {
    router.push("/auth/login");
    return null;
  }

  // Mock data for processed samples
  const processedSamples = [
    {
      id: "1",
      kitNumber: "WD-240125-A7X9",
      patientName: "John Smith",
      sampleType: "Saliva",
      receivedDate: new Date("2024-01-20"),
      processedDate: new Date("2024-01-28"),
      status: "completed" as const,
      technician: "Lab Tech A",
      qcStatus: "passed" as const,
      uploadedBy: null,
      uploadedAt: null,
    },
    {
      id: "2",
      kitNumber: "WD-240124-B8Y1",
      patientName: "Sarah Wilson",
      sampleType: "Saliva",
      receivedDate: new Date("2024-01-18"),
      processedDate: new Date("2024-01-26"),
      status: "completed" as const,
      technician: "Lab Tech B",
      qcStatus: "passed" as const,
      uploadedBy: "Lab User",
      uploadedAt: new Date("2024-01-27"),
    },
    {
      id: "3",
      kitNumber: "WD-240123-C9Z2",
      patientName: "Michael Johnson",
      sampleType: "Saliva",
      receivedDate: new Date("2024-01-15"),
      processedDate: new Date("2024-01-25"),
      status: "completed" as const,
      technician: "Lab Tech C",
      qcStatus: "review_needed" as const,
      uploadedBy: null,
      uploadedAt: null,
    },
    {
      id: "4",
      kitNumber: "WD-240122-D1A3",
      patientName: "Emily Davis",
      sampleType: "Saliva",
      receivedDate: new Date("2024-01-12"),
      processedDate: new Date("2024-01-22"),
      status: "processing" as const,
      technician: "Lab Tech A",
      qcStatus: "pending" as const,
      uploadedBy: null,
      uploadedAt: null,
    },
  ];

  const readyForUpload = processedSamples.filter(
    (sample) =>
      sample.status === "completed" &&
      sample.qcStatus === "passed" &&
      !sample.uploadedBy
  );

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleCSVUpload = async () => {
    if (!selectedFile || !kitNumber) {
      alert("Please select a file and enter kit number");
      return;
    }

    // Simulate file processing
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("kitNumber", kitNumber);
    formData.append("notes", uploadNotes);

    // Mock upload process
    alert(
      `CSV upload successful!\nKit: ${kitNumber}\nFile: ${selectedFile.name}\nResults will be available for doctor review.`
    );

    // Reset form
    setSelectedFile(null);
    setKitNumber("");
    setUploadNotes("");
  };

  const handleManualUpload = async () => {
    if (!kitNumber) {
      alert("Please enter kit number");
      return;
    }

    // Check if all required fields are filled
    const allResults = Object.values(manualResults).flatMap((category) =>
      Object.values(category)
    );
    const emptyFields = allResults.filter((value) => !value);

    if (emptyFields.length > 0) {
      alert("Please fill in all result fields");
      return;
    }

    // Mock manual upload
    const results = {
      kitNumber,
      results: manualResults,
      uploadedBy: session.user.name,
      uploadedAt: new Date(),
      notes: uploadNotes,
    };

    console.log("Manual upload:", results);
    alert(
      `Manual results uploaded successfully!\nKit: ${kitNumber}\nResults are now available for doctor review.`
    );

    // Reset form
    setKitNumber("");
    setManualResults({
      nutrition: {
        caffeineMetabolism: "",
        lactoseIntolerance: "",
        vitaminDAbsorption: "",
        alcoholMetabolism: "",
      },
      fitness: {
        muscleType: "",
        recoveryTime: "",
        injuryRisk: "",
        enduranceCapacity: "",
      },
      health: {
        cardiovascularRisk: "",
        diabetesRisk: "",
        hypertensionRisk: "",
        cancerRisk: "",
      },
      wellness: {
        sleepQuality: "",
        stressResponse: "",
        moodRegulation: "",
        cognitiveFunction: "",
      },
    });
    setUploadNotes("");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-50 border-green-200";
      case "processing":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "failed":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getQCStatusColor = (status: string) => {
    switch (status) {
      case "passed":
        return "text-green-600 bg-green-50 border-green-200";
      case "review_needed":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "failed":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const resultOptions = {
    nutrition: {
      caffeineMetabolism: ["Fast", "Normal", "Slow"],
      lactoseIntolerance: ["Tolerant", "Intolerant"],
      vitaminDAbsorption: ["Normal", "Reduced", "Very Reduced"],
      alcoholMetabolism: ["Fast", "Normal", "Slow", "Very Slow"],
    },
    fitness: {
      muscleType: ["Fast Twitch", "Slow Twitch", "Mixed"],
      recoveryTime: ["Fast", "Normal", "Slow", "Very Slow"],
      injuryRisk: ["Low", "Moderate", "High", "Very High"],
      enduranceCapacity: ["Low", "Average", "High", "Very High"],
    },
    health: {
      cardiovascularRisk: ["Low", "Moderate", "Elevated", "High", "Very High"],
      diabetesRisk: ["Low", "Moderate", "High"],
      hypertensionRisk: ["Low", "Moderate", "Elevated", "High", "Very High"],
      cancerRisk: ["Low", "Moderate", "High"],
    },
    wellness: {
      sleepQuality: ["Normal", "Sensitive", "Poor"],
      stressResponse: ["Low", "Normal", "High", "Very High"],
      moodRegulation: ["Stable", "Normal", "Unstable"],
      cognitiveFunction: [
        "Below Average",
        "Average",
        "Above Average",
        "High",
        "Very High",
      ],
    },
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
                Lab • Upload Results
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 animate-bounce-in animate-delay-200">
                Upload Results
              </h1>
              <p className="text-gray-600 mt-2 animate-slide-up animate-delay-400">
                Upload genetic analysis results for processed samples
              </p>
            </div>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                className="hover:scale-105 transition-transform"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Template
              </Button>
              <Button
                variant="outline"
                className="hover:scale-105 transition-transform"
              >
                <FileText className="w-4 h-4 mr-2" />
                Batch Upload
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Upload Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Upload Method Selection */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-600">
              <CardHeader>
                <CardTitle className="flex items-center group">
                  <div className="w-8 h-8 bg-gradient-to-br from-brand-100 to-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                    <Upload className="w-5 h-5 text-brand-600 group-hover:scale-110 transition-transform" />
                  </div>
                  Upload Method
                </CardTitle>
                <CardDescription>
                  Choose how you want to upload the results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <Button
                    variant={uploadMethod === "csv" ? "default" : "outline"}
                    onClick={() => setUploadMethod("csv")}
                    className="flex-1"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    CSV Upload
                  </Button>
                  <Button
                    variant={uploadMethod === "manual" ? "default" : "outline"}
                    onClick={() => setUploadMethod("manual")}
                    className="flex-1"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Manual Entry
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* CSV Upload */}
            {uploadMethod === "csv" && (
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-800">
                <CardHeader>
                  <CardTitle className="flex items-center group">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-brand-100 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                      <FileText className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                    </div>
                    CSV File Upload
                  </CardTitle>
                  <CardDescription>
                    Upload results using a CSV file format
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kit Number *
                    </label>
                    <Input
                      placeholder="Enter kit number (e.g., WD-240125-A7X9)"
                      value={kitNumber}
                      onChange={(e) =>
                        setKitNumber(e.target.value.toUpperCase())
                      }
                      className="font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Results File *
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                      <div className="text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="mt-4">
                          <label
                            htmlFor="file-upload"
                            className="cursor-pointer"
                          >
                            <span className="mt-2 block text-sm font-medium text-gray-900">
                              Drop your CSV file here, or{" "}
                              <span className="text-brand-600">browse</span>
                            </span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              accept=".csv"
                              className="sr-only"
                              onChange={handleFileSelect}
                            />
                          </label>
                          <p className="mt-1 text-xs text-gray-500">
                            CSV files up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                    {selectedFile && (
                      <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-sm font-medium text-green-900">
                            {selectedFile.name}
                          </span>
                          <span className="text-sm text-green-700">
                            ({(selectedFile.size / 1024).toFixed(1)} KB)
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Notes
                    </label>
                    <Textarea
                      placeholder="Add any notes about this upload..."
                      value={uploadNotes}
                      onChange={(e) => setUploadNotes(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <Button
                    onClick={handleCSVUpload}
                    disabled={!selectedFile || !kitNumber}
                    size="lg"
                    className="w-full"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload CSV Results
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Manual Entry */}
            {uploadMethod === "manual" && (
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-800">
                <CardHeader>
                  <CardTitle className="flex items-center group">
                    <div className="w-8 h-8 bg-gradient-to-br from-brand-100 to-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                      <Beaker className="w-5 h-5 text-brand-600 group-hover:scale-110 transition-transform" />
                    </div>
                    Manual Result Entry
                  </CardTitle>
                  <CardDescription>
                    Enter genetic analysis results manually
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kit Number *
                    </label>
                    <Input
                      placeholder="Enter kit number (e.g., WD-240125-A7X9)"
                      value={kitNumber}
                      onChange={(e) =>
                        setKitNumber(e.target.value.toUpperCase())
                      }
                      className="font-mono"
                    />
                  </div>

                  {/* Results Categories */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(resultOptions).map(([category, fields]) => (
                      <div key={category} className="space-y-4">
                        <h3 className="text-lg font-semibold capitalize flex items-center space-x-2">
                          <Beaker className="w-5 h-5 text-brand-600" />
                          <span>{category}</span>
                        </h3>
                        {Object.entries(fields).map(([field, options]) => (
                          <div key={field}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {field
                                .replace(/([A-Z])/g, " $1")
                                .trim()
                                .split(" ")
                                .map(
                                  (word) =>
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                )
                                .join(" ")}
                              *
                            </label>
                            <select
                              value={
                                manualResults[
                                  category as keyof typeof manualResults
                                ][
                                  field as keyof (typeof manualResults)[keyof typeof manualResults]
                                ]
                              }
                              onChange={(e) =>
                                setManualResults({
                                  ...manualResults,
                                  [category]: {
                                    ...manualResults[
                                      category as keyof typeof manualResults
                                    ],
                                    [field]: e.target.value,
                                  },
                                })
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                            >
                              <option value="">Select result</option>
                              {options.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Notes
                    </label>
                    <Textarea
                      placeholder="Add any notes about these results..."
                      value={uploadNotes}
                      onChange={(e) => setUploadNotes(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <Button
                    onClick={handleManualUpload}
                    disabled={!kitNumber}
                    size="lg"
                    className="w-full"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Upload Manual Results
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-1000">
              <CardHeader>
                <CardTitle className="flex items-center group">
                  <div className="w-8 h-8 bg-gradient-to-br from-brand-100 to-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                    <CheckCircle className="w-5 h-5 text-brand-600 group-hover:scale-110 transition-transform" />
                  </div>
                  Ready for Upload
                </CardTitle>
                <CardDescription>
                  Samples ready for result upload ({readyForUpload.length})
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {readyForUpload.length > 0 ? (
                    readyForUpload.map((sample) => (
                      <div
                        key={sample.id}
                        className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                        onClick={() => setKitNumber(sample.kitNumber)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-sm">
                            {sample.patientName}
                          </h4>
                          <Badge className={getQCStatusColor(sample.qcStatus)}>
                            QC {sample.qcStatus}
                          </Badge>
                        </div>
                        <p className="text-xs font-mono text-gray-600 mb-1">
                          {sample.kitNumber}
                        </p>
                        <p className="text-xs text-gray-500">
                          Processed: {sample.processedDate.toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-500">
                          By: {sample.technician}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 text-center py-4">
                      No samples ready for upload
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-1200">
              <CardHeader>
                <CardTitle className="flex items-center group">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-brand-100 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                    <Upload className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                  </div>
                  Recent Uploads
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {processedSamples
                    .filter((sample) => sample.uploadedBy)
                    .slice(0, 3)
                    .map((sample) => (
                      <div
                        key={sample.id}
                        className="p-3 bg-green-50 rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-sm">
                            {sample.patientName}
                          </h4>
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <p className="text-xs font-mono text-gray-600 mb-1">
                          {sample.kitNumber}
                        </p>
                        <p className="text-xs text-gray-500">
                          Uploaded: {sample.uploadedAt?.toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-500">
                          By: {sample.uploadedBy}
                        </p>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-1400">
              <CardHeader>
                <CardTitle className="flex items-center group">
                  <div className="w-8 h-8 bg-gradient-to-br from-brand-100 to-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                    <AlertTriangle className="w-5 h-5 text-brand-600 group-hover:scale-110 transition-transform" />
                  </div>
                  Upload Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Verify kit number before upload</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Ensure QC has passed</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Double-check all result values</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Add notes for any anomalies</span>
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
