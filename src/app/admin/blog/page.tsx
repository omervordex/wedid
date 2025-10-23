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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  FileText,
  Save,
  X,
  Globe,
  TrendingUp,
  Sparkles,
  Settings,
} from "lucide-react";
import Image from "next/image";

export default function AdminBlogPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState<(typeof blogPosts)[0] | null>(
    null
  );
  const [newPost, setNewPost] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "health",
    tags: "",
    status: "draft",
    featuredImage: "",
  });

  if (!session || session.user.role !== "admin") {
    router.push("/auth/login");
    return null;
  }

  // Mock blog posts data
  const blogPosts = [
    {
      id: "1",
      title: "Understanding Your Genetic Predispositions",
      slug: "understanding-genetic-predispositions",
      excerpt:
        "Learn how genetic testing can reveal important health insights and guide your wellness journey.",
      content: "Full article content would go here...",
      category: "health",
      tags: ["genetics", "health", "wellness"],
      status: "published" as const,
      author: "Dr. Sarah Johnson",
      publishDate: new Date("2024-01-20"),
      lastModified: new Date("2024-01-22"),
      views: 1247,
      likes: 89,
      featuredImage: "/api/placeholder/400/250",
      readTime: 5,
    },
    {
      id: "2",
      title: "Nutrition and Epigenetics: A Complete Guide",
      slug: "nutrition-epigenetics-guide",
      excerpt:
        "Discover how your diet can influence gene expression and optimize your health outcomes.",
      content: "Full article content would go here...",
      category: "nutrition",
      tags: ["nutrition", "epigenetics", "diet"],
      status: "published" as const,
      author: "Dr. Michael Chen",
      publishDate: new Date("2024-01-18"),
      lastModified: new Date("2024-01-19"),
      views: 892,
      likes: 67,
      featuredImage: "/api/placeholder/400/250",
      readTime: 8,
    },
    {
      id: "3",
      title: "The Future of Personalized Medicine",
      slug: "future-personalized-medicine",
      excerpt:
        "Exploring how genetic insights are revolutionizing healthcare and treatment approaches.",
      content: "Full article content would go here...",
      category: "research",
      tags: ["personalized medicine", "research", "future"],
      status: "draft" as const,
      author: "Admin User",
      publishDate: null,
      lastModified: new Date("2024-01-25"),
      views: 0,
      likes: 0,
      featuredImage: "/api/placeholder/400/250",
      readTime: 12,
    },
    {
      id: "4",
      title: "Exercise and Your DNA: Optimizing Fitness",
      slug: "exercise-dna-fitness",
      excerpt:
        "How genetic testing can help you create the perfect workout routine for your body.",
      content: "Full article content would go here...",
      category: "fitness",
      tags: ["fitness", "exercise", "genetics"],
      status: "scheduled" as const,
      author: "Dr. Emily Rodriguez",
      publishDate: new Date("2024-02-01"),
      lastModified: new Date("2024-01-24"),
      views: 0,
      likes: 0,
      featuredImage: "/api/placeholder/400/250",
      readTime: 6,
    },
    {
      id: "5",
      title: "Common Myths About Genetic Testing",
      slug: "genetic-testing-myths",
      excerpt:
        "Debunking misconceptions and providing accurate information about genetic testing.",
      content: "Full article content would go here...",
      category: "education",
      tags: ["education", "myths", "testing"],
      status: "published" as const,
      author: "Dr. Sarah Johnson",
      publishDate: new Date("2024-01-15"),
      lastModified: new Date("2024-01-16"),
      views: 1589,
      likes: 124,
      featuredImage: "/api/placeholder/400/250",
      readTime: 7,
    },
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesStatus =
      filterStatus === "all" || post.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const selectedPostData = blogPosts.find((p) => p.id === selectedPost);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "text-green-600 bg-green-50 border-green-200";
      case "draft":
        return "text-gray-600 bg-gray-50 border-gray-200";
      case "scheduled":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "archived":
        return "text-blue-600 bg-blue-50 border-blue-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "health":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "nutrition":
        return "text-green-600 bg-green-50 border-green-200";
      case "fitness":
        return "text-purple-600 bg-purple-50 border-purple-200";
      case "research":
        return "text-indigo-600 bg-indigo-50 border-indigo-200";
      case "education":
        return "text-blue-600 bg-blue-50 border-blue-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const handleCreatePost = () => {
    setEditingPost(null);
    setNewPost({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "health",
      tags: "",
      status: "draft",
      featuredImage: "",
    });
    setShowEditor(true);
  };

  const handleEditPost = (post: (typeof blogPosts)[0]) => {
    setEditingPost(post);
    setNewPost({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      tags: post.tags.join(", "),
      status: post.status,
      featuredImage: post.featuredImage,
    });
    setShowEditor(true);
  };

  const handleSavePost = () => {
    if (!newPost.title || !newPost.content) {
      alert("Please fill in all required fields");
      return;
    }

    // const postData = {
    //   ...newPost,
    //   tags: newPost.tags
    //     .split(",")
    //     .map((tag) => tag.trim())
    //     .filter((tag) => tag),
    //   author: session.user.name,
    //   lastModified: new Date(),
    //   id: editingPost ? editingPost.id : Date.now().toString(),
    // };

    if (editingPost) {
      alert(`Post "${newPost.title}" updated successfully!`);
    } else {
      alert(`Post "${newPost.title}" created successfully!`);
    }

    setShowEditor(false);
    setEditingPost(null);
  };

  const handleDeletePost = (postId: string) => {
    const post = blogPosts.find((p) => p.id === postId);
    if (!post) return;

    if (confirm(`Are you sure you want to delete "${post.title}"?`)) {
      alert(`Post "${post.title}" has been deleted`);
    }
  };

  const handlePublishPost = (postId: string) => {
    const post = blogPosts.find((p) => p.id === postId);
    if (!post) return;

    alert(`Post "${post.title}" has been published!`);
  };

  const postStats = {
    total: blogPosts.length,
    published: blogPosts.filter((p) => p.status === "published").length,
    drafts: blogPosts.filter((p) => p.status === "draft").length,
    scheduled: blogPosts.filter((p) => p.status === "scheduled").length,
    totalViews: blogPosts.reduce((sum, p) => sum + p.views, 0),
    totalLikes: blogPosts.reduce((sum, p) => sum + p.likes, 0),
  };

  if (showEditor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-50 via-blue-50 to-white relative overflow-hidden animate-gradient-shift">
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-float"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-brand-200 rounded-full opacity-30 animate-float animate-delay-400"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-300 rounded-full opacity-25 animate-rotate-slow"></div>
          <div className="absolute bottom-40 right-1/3 w-14 h-14 bg-brand-300 rounded-full opacity-20 animate-float animate-delay-800"></div>
        </div>

        <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 relative z-10">
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
                <p className="text-xs text-brand-600 font-medium">Admin Blog</p>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={() => setShowEditor(false)}
              className="mb-4"
            >
              ← Back to Posts
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 animate-bounce-in animate-delay-200">
              {editingPost ? "Edit Post" : "Create New Post"}
            </h1>
            <p className="text-gray-600 mt-2 animate-slide-up animate-delay-400">
              {editingPost ? "Update your blog post" : "Write a new blog post"}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Editor */}
            <div className="lg:col-span-3 space-y-6">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-600">
                <CardHeader>
                  <CardTitle className="flex items-center group">
                    <div className="w-8 h-8 bg-gradient-to-br from-brand-100 to-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                      <FileText className="w-5 h-5 text-brand-600 group-hover:scale-110 transition-transform" />
                    </div>
                    Post Content
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title *
                    </label>
                    <Input
                      required
                      value={newPost.title}
                      onChange={(e) => {
                        const title = e.target.value;
                        setNewPost({
                          ...newPost,
                          title,
                          slug: title
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, "-")
                            .replace(/(^-|-$)/g, ""),
                        });
                      }}
                      placeholder="Enter post title"
                      className="text-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL Slug
                    </label>
                    <Input
                      value={newPost.slug}
                      onChange={(e) =>
                        setNewPost({ ...newPost, slug: e.target.value })
                      }
                      placeholder="url-slug"
                      className="font-mono text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Excerpt *
                    </label>
                    <Textarea
                      required
                      value={newPost.excerpt}
                      onChange={(e) =>
                        setNewPost({ ...newPost, excerpt: e.target.value })
                      }
                      placeholder="Brief description of the post..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Content *
                    </label>
                    <Textarea
                      required
                      value={newPost.content}
                      onChange={(e) =>
                        setNewPost({ ...newPost, content: e.target.value })
                      }
                      placeholder="Write your blog post content here..."
                      rows={15}
                      className="font-mono text-sm"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      You can use Markdown formatting
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-800">
                <CardHeader>
                  <CardTitle className="flex items-center group">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-brand-100 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                      <Globe className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                    </div>
                    Publish
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={newPost.status}
                      onChange={(e) =>
                        setNewPost({ ...newPost, status: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="scheduled">Scheduled</option>
                    </select>
                  </div>

                  <div className="flex space-x-3">
                    <Button onClick={handleSavePost} className="flex-1">
                      <Save className="w-4 h-4 mr-2" />
                      {editingPost ? "Update" : "Save"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowEditor(false)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-1000">
                <CardHeader>
                  <CardTitle className="flex items-center group">
                    <div className="w-8 h-8 bg-gradient-to-br from-brand-100 to-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                      <Settings className="w-5 h-5 text-brand-600 group-hover:scale-110 transition-transform" />
                    </div>
                    Post Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={newPost.category}
                      onChange={(e) =>
                        setNewPost({ ...newPost, category: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="health">Health</option>
                      <option value="nutrition">Nutrition</option>
                      <option value="fitness">Fitness</option>
                      <option value="research">Research</option>
                      <option value="education">Education</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags
                    </label>
                    <Input
                      value={newPost.tags}
                      onChange={(e) =>
                        setNewPost({ ...newPost, tags: e.target.value })
                      }
                      placeholder="genetics, health, wellness"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Separate tags with commas
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Featured Image URL
                    </label>
                    <Input
                      value={newPost.featuredImage}
                      onChange={(e) =>
                        setNewPost({
                          ...newPost,
                          featuredImage: e.target.value,
                        })
                      }
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedPost && selectedPostData) {
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
                <p className="text-xs text-brand-600 font-medium">Admin Blog</p>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={() => setSelectedPost(null)}
              className="mb-4"
            >
              ← Back to Posts
            </Button>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 animate-bounce-in animate-delay-200">
                  {selectedPostData.title}
                </h1>
                <p className="text-gray-600 mt-2 animate-slide-up animate-delay-400">
                  Post Details & Analytics
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Badge className={getStatusColor(selectedPostData.status)}>
                  {selectedPostData.status.toUpperCase()}
                </Badge>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditPost(selectedPostData)}
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  {selectedPostData.status === "draft" && (
                    <Button
                      size="sm"
                      onClick={() => handlePublishPost(selectedPostData.id)}
                    >
                      <Globe className="w-4 h-4 mr-1" />
                      Publish
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-600">
                <CardHeader>
                  <CardTitle className="flex items-center group">
                    <div className="w-8 h-8 bg-gradient-to-br from-brand-100 to-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                      <FileText className="w-5 h-5 text-brand-600 group-hover:scale-110 transition-transform" />
                    </div>
                    Post Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Title
                      </label>
                      <p className="font-semibold text-lg">
                        {selectedPostData.title}
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Excerpt
                      </label>
                      <p className="text-sm text-gray-700">
                        {selectedPostData.excerpt}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Category
                        </label>
                        <div className="mt-1">
                          <Badge
                            className={getCategoryColor(
                              selectedPostData.category
                            )}
                          >
                            {selectedPostData.category}
                          </Badge>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Author
                        </label>
                        <p className="text-sm font-medium">
                          {selectedPostData.author}
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Tags
                      </label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedPostData.tags.map((tag, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-800">
                <CardHeader>
                  <CardTitle className="flex items-center group">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-brand-100 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                      <Eye className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                    </div>
                    Content Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700 whitespace-pre-line">
                      {selectedPostData.content.substring(0, 500)}...
                    </p>
                  </div>
                  <div className="mt-4 flex space-x-3">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button variant="outline" size="sm">
                      <Globe className="w-4 h-4 mr-2" />
                      View Live
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-1000">
                <CardHeader>
                  <CardTitle className="flex items-center group">
                    <div className="w-8 h-8 bg-gradient-to-br from-brand-100 to-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                      <TrendingUp className="w-5 h-5 text-brand-600 group-hover:scale-110 transition-transform" />
                    </div>
                    Post Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Views</span>
                      <span className="font-semibold">
                        {selectedPostData.views.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Likes</span>
                      <span className="font-semibold">
                        {selectedPostData.likes}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Read Time</span>
                      <span className="font-semibold">
                        {selectedPostData.readTime} min
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Status</span>
                      <Badge
                        className={getStatusColor(selectedPostData.status)}
                      >
                        {selectedPostData.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-1200">
                <CardHeader>
                  <CardTitle className="flex items-center group">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-brand-100 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                      <Calendar className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                    </div>
                    Publishing Info
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedPostData.publishDate && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Published</span>
                        <span className="text-sm font-medium">
                          {selectedPostData.publishDate.toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Last Modified
                      </span>
                      <span className="text-sm font-medium">
                        {selectedPostData.lastModified.toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">URL</span>
                      <span className="text-sm font-mono">
                        /blog/{selectedPostData.slug}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

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
                  <Button
                    className="w-full justify-start"
                    onClick={() => handleEditPost(selectedPostData)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Post
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Globe className="w-4 h-4 mr-2" />
                    View Live
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-full justify-start"
                    onClick={() => handleDeletePost(selectedPostData.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Post
                  </Button>
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
              <p className="text-xs text-brand-600 font-medium">Admin Blog</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 animate-bounce-in animate-delay-200">
                Blog Management
              </h1>
              <p className="text-gray-600 mt-2 animate-slide-up animate-delay-400">
                Create and manage your blog content
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline">
                <TrendingUp className="w-4 h-4 mr-2" />
                Analytics
              </Button>
              <Button onClick={handleCreatePost}>
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-bounce-in animate-delay-600 group">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-brand-600">
                {postStats.total}
              </div>
              <div className="text-sm text-gray-600">Total Posts</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-bounce-in animate-delay-800 group">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">
                {postStats.published}
              </div>
              <div className="text-sm text-gray-600">Published</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-bounce-in animate-delay-1000 group">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-gray-600">
                {postStats.drafts}
              </div>
              <div className="text-sm text-gray-600">Drafts</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-bounce-in animate-delay-1200 group">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">
                {postStats.scheduled}
              </div>
              <div className="text-sm text-gray-600">Scheduled</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-bounce-in animate-delay-1400 group">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-600">
                {postStats.totalViews.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Views</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-bounce-in animate-delay-1600 group">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">
                {postStats.totalLikes}
              </div>
              <div className="text-sm text-gray-600">Total Likes</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All Posts</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {/* Filters and Search */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-1800">
              <CardHeader>
                <CardTitle className="flex items-center group">
                  <div className="w-8 h-8 bg-gradient-to-br from-brand-100 to-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                    <Search className="w-5 h-5 text-brand-600 group-hover:scale-110 transition-transform" />
                  </div>
                  Filter Posts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search posts by title, category, or tags..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="all">All Status</option>
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                      <option value="scheduled">Scheduled</option>
                    </select>
                    <Button variant="outline">
                      <Filter className="w-4 h-4 mr-2" />
                      More Filters
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Posts List */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-2000">
              <CardHeader>
                <CardTitle className="flex items-center group">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-brand-100 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                    <FileText className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                  </div>
                  Blog Posts ({filteredPosts.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredPosts.map((post, index) => (
                    <div
                      key={post.id}
                      className="p-4 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer animate-bounce-in"
                      style={{ animationDelay: `${2200 + index * 200}ms` }}
                      onClick={() => setSelectedPost(post.id)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {post.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>By {post.author}</span>
                            <span>
                              {post.publishDate
                                ? post.publishDate.toLocaleDateString()
                                : "Not published"}
                            </span>
                            <span>{post.readTime} min read</span>
                            <span>{post.views} views</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <Badge className={getCategoryColor(post.category)}>
                            {post.category}
                          </Badge>
                          <Badge className={getStatusColor(post.status)}>
                            {post.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 3).map((tag, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {post.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{post.tags.length - 3} more
                            </Badge>
                          )}
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditPost(post);
                            }}
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedPost(post.id);
                            }}
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeletePost(post.id);
                            }}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {filteredPosts.length === 0 && (
                    <div className="text-center py-8">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">
                        No posts found matching your criteria
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Other tab contents would be filtered versions of the same data */}
          {["published", "draft", "scheduled"].map((status) => (
            <TabsContent key={status} value={status}>
              <Card>
                <CardHeader>
                  <CardTitle>
                    {status.charAt(0).toUpperCase() + status.slice(1)} Posts (
                    {blogPosts.filter((p) => p.status === status).length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {blogPosts
                      .filter((p) => p.status === status)
                      .map((post) => (
                        <div
                          key={post.id}
                          className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() => setSelectedPost(post.id)}
                        >
                          <h3 className="font-semibold text-gray-900 mb-2">
                            {post.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {post.excerpt}
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">
                              By {post.author} • {post.views} views
                            </span>
                            <Badge className={getCategoryColor(post.category)}>
                              {post.category}
                            </Badge>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}

          <TabsContent value="analytics">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-in animate-delay-2400">
              <CardHeader>
                <CardTitle className="flex items-center group">
                  <div className="w-8 h-8 bg-gradient-to-br from-brand-100 to-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:animate-pulse-glow transition-all">
                    <TrendingUp className="w-5 h-5 text-brand-600 group-hover:scale-110 transition-transform" />
                  </div>
                  Blog Analytics
                </CardTitle>
                <CardDescription>
                  Performance metrics and insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-2">Blog Analytics Dashboard</p>
                  <p className="text-sm text-gray-400">
                    Detailed analytics and performance metrics would be
                    implemented here
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
