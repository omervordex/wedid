import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Simple in-memory blog data for demo purposes
export type SimpleBlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: string;
  publishedAt: Date;
  tags: string[];
  readTime: number;
};

export const demoBlogPosts: SimpleBlogPost[] = [
  {
    id: "understanding-epigenetics",
    title:
      "Understanding Epigenetics: How Your Genes Respond to Your Environment",
    excerpt:
      "Discover how environmental factors can influence gene expression and impact your health, and learn practical ways to optimize your epigenetic health.",
    content: "Full article content for Understanding Epigenetics...",
    featuredImage: "/rt1.png",
    author: "Dr. Sarah Johnson",
    publishedAt: new Date("2024-01-15"),
    tags: ["Epigenetics", "Health", "Science"],
    readTime: 8,
  },
  {
    id: "nutrition-and-genetics",
    title: "Personalized Nutrition: How Your Genetics Influence Your Diet",
    excerpt:
      "Learn how genetic variations affect nutrient metabolism and discover how to tailor your diet based on your unique genetic profile.",
    content: "Full article content for Personalized Nutrition...",
    featuredImage: "/rt1.png",
    author: "Dr. Michael Chen",
    publishedAt: new Date("2024-01-10"),
    tags: ["Nutrition", "Genetics", "Wellness"],
    readTime: 6,
  },
  {
    id: "fitness-genetics",
    title: "Genetic Fitness: Optimizing Your Workout Based on Your DNA",
    excerpt:
      "Understand how genetic factors influence exercise response, recovery, and injury risk, and learn to design a personalized fitness plan.",
    content: "Full article content for Genetic Fitness...",
    featuredImage: "/rt1.png",
    author: "Dr. Amanda Brown",
    publishedAt: new Date("2023-12-28"),
    tags: ["Fitness", "Genetics", "Exercise"],
    readTime: 10,
  },
];

export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `WD-${timestamp.slice(-6)}-${random}`;
}

export function getRiskLevel(score: number): {
  level: "low" | "medium" | "high";
  color: string;
  label: string;
} {
  if (score <= 30) {
    return { level: "low", color: "text-green-600", label: "Low Risk" };
  } else if (score <= 70) {
    return { level: "medium", color: "text-yellow-600", label: "Medium Risk" };
  } else {
    return { level: "high", color: "text-red-600", label: "High Risk" };
  }
}
