export type BlogPostLite = {
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

export const blogPosts: BlogPostLite[] = [
  {
    id: "understanding-epigenetics",
    title:
      "Understanding Epigenetics: How Your Genes Respond to Your Environment",
    excerpt:
      "Discover how environmental factors can influence gene expression and impact your health, and learn practical ways to optimize your epigenetic health.",
    content:
      "Epigenetics explores how behaviors and environment can cause changes that affect the way your genes work. These changes do not alter the DNA sequence, but they can change how your body reads a DNA sequence. In this guide, we cover mechanisms like DNA methylation, histone modification, and non-coding RNA...",
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
    content:
      "Genetic variations impact how we process macronutrients and micronutrients. This article reviews common polymorphisms and how they can guide dietary choices...",
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
    content:
      "From fast-twitch vs slow-twitch muscle fiber distribution to injury risk markers, genetics can inform training plans. We summarize key genes and practical tips...",
    featuredImage: "/rt1.png",
    author: "Dr. Amanda Brown",
    publishedAt: new Date("2024-01-05"),
    tags: ["Fitness", "Genetics", "Exercise"],
    readTime: 10,
  },
  {
    id: "sleep-genetics",
    title: "The Genetics of Sleep: Why Some People Are Natural Night Owls",
    excerpt:
      "Explore the genetic basis of circadian rhythms and sleep patterns, and discover strategies for optimizing your sleep based on your genetic makeup.",
    content:
      "Variants in circadian genes like PER3 are associated with chronotype. Learn what that means and how to improve your sleep hygiene accordingly...",
    featuredImage: "/rt1.png",
    author: "Dr. Emily Rodriguez",
    publishedAt: new Date("2023-12-28"),
    tags: ["Sleep", "Genetics", "Health"],
    readTime: 7,
  },
  {
    id: "pharmacogenomics-guide",
    title: "Pharmacogenomics: How Your Genes Affect Drug Response",
    excerpt:
      "Learn how genetic variations influence medication effectiveness and safety, and why personalized medicine is the future of healthcare.",
    content:
      "Pharmacogenomics helps clinicians choose the right drug at the right dose. We overview CYP450 metabolism and practical clinical use cases...",
    featuredImage: "/rt1.png",
    author: "Dr. Robert Kim",
    publishedAt: new Date("2023-12-20"),
    tags: ["Pharmacogenomics", "Medicine", "Safety"],
    readTime: 9,
  },
  {
    id: "stress-genetics",
    title:
      "Genetic Stress Response: Understanding Your Body's Reaction to Stress",
    excerpt:
      "Discover how genetic factors influence stress response and resilience, and learn evidence-based strategies for managing stress based on your genetics.",
    content:
      "HPA-axis variability has a strong genetic component. We review pathways and practical resilience techniques supported by evidence...",
    featuredImage: "/rt1.png",
    author: "Dr. Lisa Patel",
    publishedAt: new Date("2023-12-15"),
    tags: ["Stress", "Mental Health", "Genetics"],
    readTime: 5,
  },
];

export function getPostById(id: string) {
  return blogPosts.find((p) => p.id === id);
}

export function getRecentPosts(excludeId?: string) {
  return blogPosts.filter((p) => (excludeId ? p.id !== excludeId : true));
}
