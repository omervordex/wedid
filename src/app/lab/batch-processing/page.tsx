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
  Play,
  Pause,
  Square,
  RefreshCw,
  Plus,
  Eye,
  Download,
  Upload,
  Calendar,
  Clock,
  User,
  Beaker,
  CheckCircle,
  AlertTriangle,
  XCircle,
  BarChart3,
  FileText,
  Package,
} from "lucide-react";

export default function LabBatchProcessingPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);
  const [newBatchName, setNewBatchName] = useState("");
  const [batchNotes, setBatchNotes] = useState("");
  const [selectedSamples, setSelectedSamples] = useState<string[]>([]);

  if (!session || session.user.role !== "lab") {
    router.push("/auth/login");
    return null;
  }

  // Mock batch data
  const batches = [
    {
      id: "1",
      name: "Batch-2024-001",
      status: "running" as const,
      startDate: new Date("2024-01-28T09:00:00"),
      estimatedCompletion: new Date("2024-01-30T17:00:00"),
      progress: 65,
      totalSamples: 24,
      completedSamples: 15,
      failedSamples: 1,
      operator: "Lab Tech A",
      protocol: "Standard Genotyping v2.1",
      equipment: "Illumina NextSeq 550",
      notes: "Standard batch processing for weekly samples",
      samples: [
        { kitNumber: "WD-240125-A7X9", status: "completed" },
        { kitNumber: "WD-240124-B8Y1", status: "completed" },
        { kitNumber: "WD-240123-C9Z2", status: "running" },
        { kitNumber: "WD-240122-D1A3", status: "failed" },
        { kitNumber: "WD-240121-E5F6", status: "pending" },
      ],
    },
    {
      id: "2",
      name: "Batch-2024-002",
      status: "completed" as const,
      startDate: new Date("2024-01-25T08:30:00"),
      estimatedCompletion: new Date("2024-01-27T16:00:00"),
      completedDate: new Date("2024-01-27T15:45:00"),
      progress: 100,
      totalSamples: 18,
      completedSamples: 17,
      failedSamples: 1,
      operator: "Lab Tech B",
      protocol: "Standard Genotyping v2.1",
      equipment: "Illumina NextSeq 550",
      notes: "Batch completed successfully with minimal failures",
      samples: [
        { kitNumber: "WD-240120-F7G8", status: "completed" },
        { kitNumber: "WD-240119-H9I0", status: "completed" },
        { kitNumber: "WD-240118-J1K2", status: "failed" },
      ],
    },
    {
      id: "3",
      name: "Batch-2024-003",
      status: "pending" as const,
      startDate: null,
      estimatedCompletion: null,
      progress: 0,
      totalSamples: 32,
      completedSamples: 0,
      failedSamples: 0,
      operator: "Lab Tech C",
      protocol: "High-Throughput Genotyping v3.0",
      equipment: "Illumina NovaSeq 6000",
      notes: "Large batch scheduled for next processing cycle",
      samples: [
        { kitNumber: "WD-240127-L3M4", status: "pending" },
        { kitNumber: "WD-240126-N5O6", status: "pending" },
        { kitNumber: "WD-240125-P7Q8", status: "pending" },
      ],
    },
    {
      id: "4",
      name: "Batch-2024-004",
      status: "failed" as const,
      startDate: new Date("2024-01-22T10:00:00"),
      estimatedCompletion: new Date("2024-01-24T18:00:00"),
      progress: 45,
      totalSamples: 20,
      completedSamples: 9,
      failedSamples: 11,
      operator: "Lab Tech A",
      protocol: "Standard Genotyping v2.0",
      equipment: "Illumina NextSeq 550",
      notes:
        "Batch failed due to equipment malfunction. Samples will be reprocessed.",
      samples: [
        { kitNumber: "WD-240115-R9S0", status: "failed" },
        { kitNumber: "WD-240114-T1U2", status: "failed" },
        { kitNumber: "WD-240113-V3W4", status: "completed" },
      ],
    },
  ];

  // Mock available samples for new batch
  const availableSamples = [
    {
      kitNumber: "WD-240129-X5Y6",
      patientName: "Alice Johnson",
      receivedDate: new Date("2024-01-29"),
      sampleType: "Saliva",
      priority: "normal" as const,
    },
    {
      kitNumber: "WD-240128-Z7A8",
      patientName: "Bob Smith",
      receivedDate: new Date("2024-01-28"),
      sampleType: "Saliva",
      priority: "high" as const,
    },
    {
      kitNumber: "WD-240127-B9C0",
      patientName: "Carol Davis",
      receivedDate: new Date("2024-01-27"),
      sampleType: "Saliva",
      priority: "normal" as const,
    },
    {
      kitNumber: "WD-240126-D1E2",
      patientName: "David Wilson",
      receivedDate: new Date("2024-01-26"),
      sampleType: "Saliva",
      priority: "urgent" as const,
    },
  ];

  const selectedBatchData = batches.find((b) => b.id === selectedBatch);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-50 border-green-200";
      case "running":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "pending":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "failed":
        return "text-red-600 bg-red-50 border-red-200";
      case "paused":
        return "text-gray-600 bg-gray-50 border-gray-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "text-red-600 bg-red-50 border-red-200";
      case "high":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "normal":
        return "text-blue-600 bg-blue-50 border-blue-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const handleBatchAction = (action: string, batchId: string) => {
    const batch = batches.find((b) => b.id === batchId);
    if (!batch) return;

    switch (action) {
      case "start":
        alert(`Starting batch ${batch.name}...`);
        break;
      case "pause":
        alert(`Pausing batch ${batch.name}...`);
        break;
      case "stop":
        alert(`Stopping batch ${batch.name}...`);
        break;
      case "restart":
        alert(`Restarting batch ${batch.name}...`);
        break;
    }
  };

  const handleCreateBatch = () => {
    if (!newBatchName || selectedSamples.length === 0) {
      alert("Please enter batch name and select samples");
      return;
    }

    const newBatch = {
      name: newBatchName,
      samples: selectedSamples,
      notes: batchNotes,
      operator: session.user.name,
      createdAt: new Date(),
    };

    console.log("Creating new batch:", newBatch);
    alert(
      `Batch "${newBatchName}" created successfully with ${selectedSamples.length} samples!`
    );

    // Reset form
    setNewBatchName("");
    setBatchNotes("");
    setSelectedSamples([]);
  };

  const toggleSampleSelection = (kitNumber: string) => {
    setSelectedSamples((prev) =>
      prev.includes(kitNumber)
        ? prev.filter((s) => s !== kitNumber)
        : [...prev, kitNumber]
    );
  };

  const runningBatches = batches.filter((b) => b.status === "running");
  const pendingBatches = batches.filter((b) => b.status === "pending");

  if (selectedBatch && selectedBatchData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-50 to-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Button
              variant="outline"
              onClick={() => setSelectedBatch(null)}
              className="mb-4"
            >
              ← Back to Batches
            </Button>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {selectedBatchData.name}
                </h1>
                <p className="text-gray-600 mt-2">Batch Processing Details</p>
              </div>
              <div className="flex items-center space-x-3">
                <Badge className={getStatusColor(selectedBatchData.status)}>
                  {selectedBatchData.status.toUpperCase()}
                </Badge>
                <div className="flex space-x-2">
                  {selectedBatchData.status === "running" && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handleBatchAction("pause", selectedBatchData.id)
                        }
                      >
                        <Pause className="w-4 h-4 mr-1" />
                        Pause
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() =>
                          handleBatchAction("stop", selectedBatchData.id)
                        }
                      >
                        <Square className="w-4 h-4 mr-1" />
                        Stop
                      </Button>
                    </>
                  )}
                  {selectedBatchData.status === "pending" && (
                    <Button
                      size="sm"
                      onClick={() =>
                        handleBatchAction("start", selectedBatchData.id)
                      }
                    >
                      <Play className="w-4 h-4 mr-1" />
                      Start
                    </Button>
                  )}
                  {selectedBatchData.status === "failed" && (
                    <Button
                      size="sm"
                      onClick={() =>
                        handleBatchAction("restart", selectedBatchData.id)
                      }
                    >
                      <RefreshCw className="w-4 h-4 mr-1" />
                      Restart
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Progress Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Processing Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Overall Progress</span>
                        <span>{selectedBatchData.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${selectedBatchData.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-6">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {selectedBatchData.completedSamples}
                        </div>
                        <div className="text-sm text-green-700">Completed</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {selectedBatchData.totalSamples -
                            selectedBatchData.completedSamples -
                            selectedBatchData.failedSamples}
                        </div>
                        <div className="text-sm text-blue-700">Processing</div>
                      </div>
                      <div className="text-center p-4 bg-red-50 rounded-lg">
                        <div className="text-2xl font-bold text-red-600">
                          {selectedBatchData.failedSamples}
                        </div>
                        <div className="text-sm text-red-700">Failed</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Batch Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Batch Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Operator
                        </label>
                        <p className="font-semibold">
                          {selectedBatchData.operator}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Protocol
                        </label>
                        <p className="text-sm">{selectedBatchData.protocol}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Equipment
                        </label>
                        <p className="text-sm">{selectedBatchData.equipment}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Start Date
                        </label>
                        <p className="text-sm">
                          {selectedBatchData.startDate
                            ? selectedBatchData.startDate.toLocaleString()
                            : "Not started"}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Estimated Completion
                        </label>
                        <p className="text-sm">
                          {selectedBatchData.estimatedCompletion
                            ? selectedBatchData.estimatedCompletion.toLocaleString()
                            : "TBD"}
                        </p>
                      </div>
                      {selectedBatchData.completedDate && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Completed Date
                          </label>
                          <p className="text-sm">
                            {selectedBatchData.completedDate.toLocaleString()}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedBatchData.notes && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <label className="text-sm font-medium text-gray-500 block mb-2">
                        Notes
                      </label>
                      <p className="text-sm text-gray-700">
                        {selectedBatchData.notes}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Sample List */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    Samples in Batch ({selectedBatchData.samples.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedBatchData.samples.map((sample, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                      >
                        <div>
                          <p className="font-mono text-sm font-medium">
                            {sample.kitNumber}
                          </p>
                        </div>
                        <Badge className={getStatusColor(sample.status)}>
                          {sample.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    View Logs
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Analytics
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Processing Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedBatchData.startDate && (
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm font-medium">Batch Started</p>
                          <p className="text-xs text-gray-500">
                            {selectedBatchData.startDate.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedBatchData.status === "running" && (
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 animate-pulse"></div>
                        <div>
                          <p className="text-sm font-medium">
                            Currently Processing
                          </p>
                          <p className="text-xs text-gray-500">
                            {selectedBatchData.progress}% complete
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedBatchData.completedDate && (
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm font-medium">Batch Completed</p>
                          <p className="text-xs text-gray-500">
                            {selectedBatchData.completedDate.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedBatchData.status === "failed" && (
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm font-medium">Batch Failed</p>
                          <p className="text-xs text-gray-500">
                            Manual intervention required
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
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
                Batch Processing
              </h1>
              <p className="text-gray-600 mt-2">
                Manage and monitor sample processing batches
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Batch
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="active" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="active">
              Active ({runningBatches.length})
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending ({pendingBatches.length})
            </TabsTrigger>
            <TabsTrigger value="all">All Batches</TabsTrigger>
            <TabsTrigger value="create">Create Batch</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Running Batches</CardTitle>
                <CardDescription>
                  Currently active processing batches
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {runningBatches.length > 0 ? (
                    runningBatches.map((batch) => (
                      <div
                        key={batch.id}
                        className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => setSelectedBatch(batch.id)}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {batch.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {batch.totalSamples} samples • {batch.operator}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(batch.status)}>
                              {batch.status}
                            </Badge>
                            <span className="text-sm font-medium">
                              {batch.progress}%
                            </span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${batch.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Started:</span>
                            <span className="ml-1 font-medium">
                              {batch.startDate?.toLocaleDateString()}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">ETA:</span>
                            <span className="ml-1 font-medium">
                              {batch.estimatedCompletion?.toLocaleDateString()}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">Completed:</span>
                            <span className="ml-1 font-medium text-green-600">
                              {batch.completedSamples}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">Failed:</span>
                            <span className="ml-1 font-medium text-red-600">
                              {batch.failedSamples}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No active batches running</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pending Batches</CardTitle>
                <CardDescription>Batches ready to be started</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingBatches.map((batch) => (
                    <div
                      key={batch.id}
                      className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedBatch(batch.id)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {batch.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {batch.totalSamples} samples • {batch.operator}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(batch.status)}>
                            {batch.status}
                          </Badge>
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleBatchAction("start", batch.id);
                            }}
                          >
                            <Play className="w-4 h-4 mr-1" />
                            Start
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Protocol:</span>
                          <span className="ml-1 font-medium">
                            {batch.protocol}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Equipment:</span>
                          <span className="ml-1 font-medium">
                            {batch.equipment}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Samples:</span>
                          <span className="ml-1 font-medium">
                            {batch.totalSamples}
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
            <Card>
              <CardHeader>
                <CardTitle>All Batches</CardTitle>
                <CardDescription>
                  Complete history of processing batches
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {batches.map((batch) => (
                    <div
                      key={batch.id}
                      className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedBatch(batch.id)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {batch.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {batch.totalSamples} samples • {batch.operator}
                          </p>
                        </div>
                        <Badge className={getStatusColor(batch.status)}>
                          {batch.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Started:</span>
                          <span className="ml-1 font-medium">
                            {batch.startDate
                              ? batch.startDate.toLocaleDateString()
                              : "Not started"}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Progress:</span>
                          <span className="ml-1 font-medium">
                            {batch.progress}%
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Completed:</span>
                          <span className="ml-1 font-medium text-green-600">
                            {batch.completedSamples}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Failed:</span>
                          <span className="ml-1 font-medium text-red-600">
                            {batch.failedSamples}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Batch Creation Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Create New Batch</CardTitle>
                  <CardDescription>
                    Set up a new processing batch with selected samples
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Batch Name *
                    </label>
                    <Input
                      placeholder="Enter batch name (e.g., Batch-2024-005)"
                      value={newBatchName}
                      onChange={(e) => setNewBatchName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Processing Protocol
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Standard Genotyping v2.1</option>
                      <option>High-Throughput Genotyping v3.0</option>
                      <option>Custom Protocol v1.0</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Equipment
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Illumina NextSeq 550</option>
                      <option>Illumina NovaSeq 6000</option>
                      <option>Thermo Fisher Ion Torrent</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Batch Notes
                    </label>
                    <Textarea
                      placeholder="Add any notes about this batch..."
                      value={batchNotes}
                      onChange={(e) => setBatchNotes(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">
                        Selected Samples ({selectedSamples.length})
                      </h3>
                      <Button
                        onClick={handleCreateBatch}
                        disabled={!newBatchName || selectedSamples.length === 0}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Create Batch
                      </Button>
                    </div>

                    {selectedSamples.length > 0 && (
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {selectedSamples.map((kitNumber) => {
                          const sample = availableSamples.find(
                            (s) => s.kitNumber === kitNumber
                          );
                          return (
                            <div
                              key={kitNumber}
                              className="flex items-center justify-between p-2 bg-blue-50 rounded"
                            >
                              <span className="text-sm font-mono">
                                {kitNumber}
                              </span>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => toggleSampleSelection(kitNumber)}
                              >
                                <XCircle className="w-4 h-4" />
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Available Samples */}
              <Card>
                <CardHeader>
                  <CardTitle>Available Samples</CardTitle>
                  <CardDescription>
                    Select samples to include in the new batch
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {availableSamples.map((sample) => (
                      <div
                        key={sample.kitNumber}
                        className={`p-3 border rounded-lg cursor-pointer transition-all ${
                          selectedSamples.includes(sample.kitNumber)
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => toggleSampleSelection(sample.kitNumber)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-mono text-sm font-medium">
                              {sample.kitNumber}
                            </p>
                            <p className="text-sm text-gray-600">
                              {sample.patientName}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge
                              className={getPriorityColor(sample.priority)}
                            >
                              {sample.priority}
                            </Badge>
                            {selectedSamples.includes(sample.kitNumber) && (
                              <CheckCircle className="w-5 h-5 text-blue-600" />
                            )}
                          </div>
                        </div>

                        <div className="flex justify-between text-xs text-gray-500">
                          <span>
                            Received: {sample.receivedDate.toLocaleDateString()}
                          </span>
                          <span>{sample.sampleType}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
