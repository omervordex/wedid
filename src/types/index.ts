export interface User {
  id: string;
  email: string;
  name: string;
  role: "patient" | "doctor" | "lab" | "admin";
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Patient extends User {
  role: "patient";
  dateOfBirth?: Date;
  phone?: string;
  address?: string;
  emergencyContact?: string;
}

export interface Doctor extends User {
  role: "doctor";
  specialization: string;
  licenseNumber: string;
  bio?: string;
  experience?: number;
  availability?: string[];
}

export interface Kit {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  features: string[];
  processingTime: string;
  isActive: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  kitId: string;
  status:
    | "pending"
    | "paid"
    | "shipped"
    | "delivered"
    | "activated"
    | "completed";
  amount: number;
  shippingAddress: string;
  trackingNumber?: string;
  activationCode?: string;
  activatedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface TestResult {
  id: string;
  orderId: string;
  patientId: string;
  doctorId?: string;
  labId?: string;
  results: Record<string, unknown>;
  riskScore: number;
  riskLevel: "low" | "medium" | "high";
  recommendations?: string;
  status: "pending" | "processing" | "completed" | "reviewed";
  completedAt?: Date;
  reviewedAt?: Date;
  createdAt: Date;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: Date;
  duration: number;
  type: "consultation" | "follow-up" | "result-review";
  status: "scheduled" | "confirmed" | "completed" | "cancelled";
  notes?: string;
  meetingLink?: string;
  createdAt: Date;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  authorId: string;
  status: "draft" | "published";
  tags: string[];
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  isRead: boolean;
  createdAt: Date;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: "info" | "warning" | "success" | "error";
  targetRole?: "patient" | "doctor" | "lab" | "admin";
  isActive: boolean;
  createdAt: Date;
  expiresAt?: Date;
}
