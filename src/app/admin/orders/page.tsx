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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Download,
  Package,
  Truck,
  XCircle,
  Clock,
  DollarSign,
  User,
  Phone,
  Mail,
  RefreshCw,
  AlertTriangle,
  Sparkles,
  FileText,
  Settings,
} from "lucide-react";
import Image from "next/image";

export default function AdminOrdersPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  if (!session || session.user.role !== "admin") {
    router.push("/auth/login");
    return null;
  }

  // Mock orders data
  const orders = [
    {
      id: "1",
      orderNumber: "WD-240129-A7X9",
      customerName: "John Smith",
      customerEmail: "john.smith@email.com",
      customerPhone: "+1 (555) 123-4567",
      kitType: "Comprehensive Health Kit",
      quantity: 1,
      price: 399,
      status: "processing" as const,
      paymentStatus: "paid" as const,
      orderDate: new Date("2024-01-29T10:30:00"),
      shippingDate: new Date("2024-01-30T14:00:00"),
      estimatedDelivery: new Date("2024-02-02T17:00:00"),
      trackingNumber: "1Z999AA1234567890",
      shippingAddress: {
        street: "123 Main St",
        city: "San Francisco",
        state: "CA",
        zipCode: "94102",
        country: "USA",
      },
      notes: "Customer requested expedited processing",
    },
    {
      id: "2",
      orderNumber: "WD-240128-B8Y1",
      customerName: "Sarah Wilson",
      customerEmail: "sarah.wilson@email.com",
      customerPhone: "+1 (555) 234-5678",
      kitType: "Basic Health Kit",
      quantity: 1,
      price: 199,
      status: "delivered" as const,
      paymentStatus: "paid" as const,
      orderDate: new Date("2024-01-28T09:15:00"),
      shippingDate: new Date("2024-01-29T11:30:00"),
      deliveryDate: new Date("2024-02-01T16:45:00"),
      trackingNumber: "1Z999AA1234567891",
      shippingAddress: {
        street: "456 Oak Ave",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90210",
        country: "USA",
      },
      notes: "Delivered successfully, customer confirmed receipt",
    },
    {
      id: "3",
      orderNumber: "WD-240127-C9Z2",
      customerName: "Michael Johnson",
      customerEmail: "michael.j@email.com",
      customerPhone: "+1 (555) 345-6789",
      kitType: "Premium Coaching Package",
      quantity: 1,
      price: 799,
      status: "pending" as const,
      paymentStatus: "pending" as const,
      orderDate: new Date("2024-01-27T14:20:00"),
      shippingAddress: {
        street: "789 Health Blvd",
        city: "Seattle",
        state: "WA",
        zipCode: "98101",
        country: "USA",
      },
      notes: "Payment verification in progress",
    },
    {
      id: "4",
      orderNumber: "WD-240126-D1A3",
      customerName: "Emily Davis",
      customerEmail: "emily.davis@email.com",
      customerPhone: "+1 (555) 456-7890",
      kitType: "Comprehensive Health Kit",
      quantity: 2,
      price: 798,
      status: "shipped" as const,
      paymentStatus: "paid" as const,
      orderDate: new Date("2024-01-26T11:45:00"),
      shippingDate: new Date("2024-01-28T10:00:00"),
      estimatedDelivery: new Date("2024-02-01T17:00:00"),
      trackingNumber: "1Z999AA1234567892",
      shippingAddress: {
        street: "321 Wellness Way",
        city: "Portland",
        state: "OR",
        zipCode: "97201",
        country: "USA",
      },
      notes: "Multiple kits for family members",
    },
    {
      id: "5",
      orderNumber: "WD-240125-E5F6",
      customerName: "Robert Chen",
      customerEmail: "robert.chen@email.com",
      customerPhone: "+1 (555) 567-8901",
      kitType: "Basic Health Kit",
      quantity: 1,
      price: 199,
      status: "cancelled" as const,
      paymentStatus: "refunded" as const,
      orderDate: new Date("2024-01-25T16:30:00"),
      cancelDate: new Date("2024-01-26T09:15:00"),
      shippingAddress: {
        street: "654 Pine St",
        city: "Denver",
        state: "CO",
        zipCode: "80202",
        country: "USA",
      },
      notes: "Customer requested cancellation due to change of mind",
    },
    {
      id: "6",
      orderNumber: "WD-240124-F7G8",
      customerName: "Lisa Anderson",
      customerEmail: "lisa.anderson@email.com",
      customerPhone: "+1 (555) 678-9012",
      kitType: "Premium Coaching Package",
      quantity: 1,
      price: 799,
      status: "failed" as const,
      paymentStatus: "failed" as const,
      orderDate: new Date("2024-01-24T13:10:00"),
      shippingAddress: {
        street: "987 Elm Dr",
        city: "Austin",
        state: "TX",
        zipCode: "73301",
        country: "USA",
      },
      notes: "Payment failed - insufficient funds",
    },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || order.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const selectedOrderData = orders.find((o) => o.id === selectedOrder);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "processing":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "shipped":
        return "text-purple-600 bg-purple-50 border-purple-200";
      case "delivered":
        return "text-green-600 bg-green-50 border-green-200";
      case "cancelled":
        return "text-gray-600 bg-gray-50 border-gray-200";
      case "failed":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "text-green-600 bg-green-50 border-green-200";
      case "pending":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "failed":
        return "text-red-600 bg-red-50 border-red-200";
      case "refunded":
        return "text-blue-600 bg-blue-50 border-blue-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const handleOrderAction = (action: string, orderId: string) => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;

    switch (action) {
      case "process":
        alert(`Order ${order.orderNumber} is being processed`);
        break;
      case "ship":
        alert(`Order ${order.orderNumber} has been marked as shipped`);
        break;
      case "cancel":
        if (
          confirm(`Are you sure you want to cancel order ${order.orderNumber}?`)
        ) {
          alert(`Order ${order.orderNumber} has been cancelled`);
        }
        break;
      case "refund":
        if (confirm(`Process refund for order ${order.orderNumber}?`)) {
          alert(`Refund processed for order ${order.orderNumber}`);
        }
        break;
    }
  };

  const orderStats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    processing: orders.filter((o) => o.status === "processing").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    totalRevenue: orders
      .filter((o) => o.paymentStatus === "paid")
      .reduce((sum, o) => sum + o.price, 0),
  };

  if (selectedOrder && selectedOrderData) {
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
                  Admin Orders
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={() => setSelectedOrder(null)}
              className="mb-4"
            >
              ← Back to Orders
            </Button>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 animate-bounce-in animate-delay-200">
                  Order #{selectedOrderData.orderNumber}
                </h1>
                <p className="text-gray-600 mt-2 animate-slide-up animate-delay-400">
                  Order Details & Management
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Badge className={getStatusColor(selectedOrderData.status)}>
                  {selectedOrderData.status.toUpperCase()}
                </Badge>
                <Badge
                  className={getPaymentStatusColor(
                    selectedOrderData.paymentStatus
                  )}
                >
                  {selectedOrderData.paymentStatus.toUpperCase()}
                </Badge>
                <div className="flex space-x-2">
                  {selectedOrderData.status === "pending" && (
                    <Button
                      size="sm"
                      onClick={() =>
                        handleOrderAction("process", selectedOrderData.id)
                      }
                    >
                      <RefreshCw className="w-4 h-4 mr-1" />
                      Process
                    </Button>
                  )}
                  {selectedOrderData.status === "processing" && (
                    <Button
                      size="sm"
                      onClick={() =>
                        handleOrderAction("ship", selectedOrderData.id)
                      }
                    >
                      <Truck className="w-4 h-4 mr-1" />
                      Ship
                    </Button>
                  )}
                  {(selectedOrderData.status === "pending" ||
                    selectedOrderData.status === "processing") && (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() =>
                        handleOrderAction("cancel", selectedOrderData.id)
                      }
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Information */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-600">
                <CardHeader>
                  <CardTitle className="flex items-center group">
                    <div className="w-8 h-8 bg-gradient-to-br from-brand-100 to-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                      <Package className="w-5 h-5 text-brand-600 group-hover:scale-110 transition-transform" />
                    </div>
                    Order Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Order Number
                        </label>
                        <p className="font-mono font-semibold">
                          {selectedOrderData.orderNumber}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Order Date
                        </label>
                        <p className="text-sm">
                          {selectedOrderData.orderDate.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Kit Type
                        </label>
                        <p className="text-sm font-medium">
                          {selectedOrderData.kitType}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Quantity
                        </label>
                        <p className="text-sm">{selectedOrderData.quantity}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Total Amount
                        </label>
                        <p className="text-2xl font-bold text-green-600">
                          ${selectedOrderData.price}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Payment Status
                        </label>
                        <div className="mt-1">
                          <Badge
                            className={getPaymentStatusColor(
                              selectedOrderData.paymentStatus
                            )}
                          >
                            {selectedOrderData.paymentStatus}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Order Status
                        </label>
                        <div className="mt-1">
                          <Badge
                            className={getStatusColor(selectedOrderData.status)}
                          >
                            {selectedOrderData.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Information */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-800">
                <CardHeader>
                  <CardTitle className="flex items-center group">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-brand-100 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                      <User className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                    </div>
                    Customer Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-gray-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold">
                          {selectedOrderData.customerName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {selectedOrderData.customerEmail}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-gray-600" />
                          <span className="text-sm">
                            {selectedOrderData.customerEmail}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-gray-600" />
                          <span className="text-sm">
                            {selectedOrderData.customerPhone}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Information */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-1000">
                <CardHeader>
                  <CardTitle className="flex items-center group">
                    <div className="w-8 h-8 bg-gradient-to-br from-brand-100 to-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                      <Truck className="w-5 h-5 text-brand-600 group-hover:scale-110 transition-transform" />
                    </div>
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Shipping Address
                        </label>
                        <div className="mt-1 text-sm">
                          <p>{selectedOrderData.shippingAddress.street}</p>
                          <p>
                            {selectedOrderData.shippingAddress.city},{" "}
                            {selectedOrderData.shippingAddress.state}{" "}
                            {selectedOrderData.shippingAddress.zipCode}
                          </p>
                          <p>{selectedOrderData.shippingAddress.country}</p>
                        </div>
                      </div>

                      {selectedOrderData.trackingNumber && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Tracking Number
                          </label>
                          <p className="font-mono text-sm">
                            {selectedOrderData.trackingNumber}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      {selectedOrderData.shippingDate && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Shipped Date
                          </label>
                          <p className="text-sm">
                            {selectedOrderData.shippingDate.toLocaleString()}
                          </p>
                        </div>
                      )}

                      {selectedOrderData.estimatedDelivery && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Estimated Delivery
                          </label>
                          <p className="text-sm">
                            {selectedOrderData.estimatedDelivery.toLocaleString()}
                          </p>
                        </div>
                      )}

                      {selectedOrderData.deliveryDate && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Delivered Date
                          </label>
                          <p className="text-sm">
                            {selectedOrderData.deliveryDate.toLocaleString()}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Order Notes */}
              {selectedOrderData.notes && (
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-1200">
                  <CardHeader>
                    <CardTitle className="flex items-center group">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-brand-100 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                        <FileText className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                      </div>
                      Order Notes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">
                        {selectedOrderData.notes}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-1400">
                <CardHeader>
                  <CardTitle className="flex items-center group">
                    <div className="w-8 h-8 bg-gradient-to-br from-brand-100 to-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                      <Settings className="w-5 h-5 text-brand-600 group-hover:scale-110 transition-transform" />
                    </div>
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Download Invoice
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Customer
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Package className="w-4 h-4 mr-2" />
                    Track Package
                  </Button>
                  {selectedOrderData.paymentStatus === "paid" && (
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() =>
                        handleOrderAction("refund", selectedOrderData.id)
                      }
                    >
                      <DollarSign className="w-4 h-4 mr-2" />
                      Process Refund
                    </Button>
                  )}
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-1600">
                <CardHeader>
                  <CardTitle className="flex items-center group">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-brand-100 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                      <Clock className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                    </div>
                    Order Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">Order Placed</p>
                        <p className="text-xs text-gray-500">
                          {selectedOrderData.orderDate.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {selectedOrderData.shippingDate && (
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm font-medium">Shipped</p>
                          <p className="text-xs text-gray-500">
                            {selectedOrderData.shippingDate.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedOrderData.deliveryDate && (
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm font-medium">Delivered</p>
                          <p className="text-xs text-gray-500">
                            {selectedOrderData.deliveryDate.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedOrderData.cancelDate && (
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm font-medium">Cancelled</p>
                          <p className="text-xs text-gray-500">
                            {selectedOrderData.cancelDate.toLocaleString()}
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
              <p className="text-xs text-brand-600 font-medium">Admin Orders</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 animate-bounce-in animate-delay-200">
                Order Management
              </h1>
              <p className="text-gray-600 mt-2 animate-slide-up animate-delay-400">
                Manage customer orders and shipments
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Orders
              </Button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-bounce-in animate-delay-600 group">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-brand-600">
                {orderStats.total}
              </div>
              <div className="text-sm text-gray-600">Total Orders</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-bounce-in animate-delay-800 group">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">
                {orderStats.pending}
              </div>
              <div className="text-sm text-gray-600">Pending</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-bounce-in animate-delay-1000 group">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">
                {orderStats.processing}
              </div>
              <div className="text-sm text-gray-600">Processing</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-bounce-in animate-delay-1200 group">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-600">
                {orderStats.shipped}
              </div>
              <div className="text-sm text-gray-600">Shipped</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-bounce-in animate-delay-1400 group">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">
                {orderStats.delivered}
              </div>
              <div className="text-sm text-gray-600">Delivered</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-bounce-in animate-delay-1600 group">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">
                ${orderStats.totalRevenue.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Revenue</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="shipped">Shipped</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
            <TabsTrigger value="issues">Issues</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {/* Filters and Search */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-1800">
              <CardHeader>
                <CardTitle className="flex items-center group">
                  <div className="w-8 h-8 bg-gradient-to-br from-brand-100 to-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                    <Search className="w-5 h-5 text-brand-600 group-hover:scale-110 transition-transform" />
                  </div>
                  Filter Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search by order number, customer name, or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Orders List */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-2000">
              <CardHeader>
                <CardTitle className="flex items-center group">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-brand-100 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                    <Package className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                  </div>
                  Orders ({filteredOrders.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredOrders.map((order, index) => (
                    <div
                      key={order.id}
                      className="p-4 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer animate-bounce-in"
                      style={{ animationDelay: `${2200 + index * 200}ms` }}
                      onClick={() => setSelectedOrder(order.id)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            #{order.orderNumber}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {order.customerName} • {order.customerEmail}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                          <Badge
                            className={getPaymentStatusColor(
                              order.paymentStatus
                            )}
                          >
                            {order.paymentStatus}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Kit:</span>
                          <span className="ml-1 font-medium">
                            {order.kitType}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Amount:</span>
                          <span className="ml-1 font-medium">
                            ${order.price}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Date:</span>
                          <span className="ml-1 font-medium">
                            {order.orderDate.toLocaleDateString()}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Qty:</span>
                          <span className="ml-1 font-medium">
                            {order.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {filteredOrders.length === 0 && (
                    <div className="text-center py-8">
                      <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">
                        No orders found matching your criteria
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Other tab contents would be filtered versions of the same data */}
          {["pending", "processing", "shipped", "delivered"].map((status) => (
            <TabsContent key={status} value={status}>
              <Card>
                <CardHeader>
                  <CardTitle>
                    {status.charAt(0).toUpperCase() + status.slice(1)} Orders (
                    {orders.filter((o) => o.status === status).length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders
                      .filter((o) => o.status === status)
                      .map((order) => (
                        <div
                          key={order.id}
                          className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() => setSelectedOrder(order.id)}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                #{order.orderNumber}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {order.customerName}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">${order.price}</p>
                              <p className="text-xs text-gray-500">
                                {order.orderDate.toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}

          <TabsContent value="issues">
            <Card>
              <CardHeader>
                <CardTitle>Orders with Issues</CardTitle>
                <CardDescription>
                  Failed, cancelled, and problematic orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders
                    .filter(
                      (o) => o.status === "failed" || o.status === "cancelled"
                    )
                    .map((order) => (
                      <div
                        key={order.id}
                        className="p-4 border border-red-200 bg-red-50 rounded-lg"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              #{order.orderNumber}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {order.customerName}
                            </p>
                            <div className="flex items-center space-x-2 mt-2">
                              <AlertTriangle className="w-4 h-4 text-red-600" />
                              <span className="text-sm text-red-800">
                                {order.status === "failed"
                                  ? "Payment Failed"
                                  : "Cancelled"}
                              </span>
                            </div>
                          </div>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
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
