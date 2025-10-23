import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  User,
  ArrowRight,
  Clock,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import { blogPosts as sharedPosts } from "@/lib/blog-data";

// Use shared blog data (with images) so list and detail are consistent
const blogPosts = sharedPosts;

const featuredPost = blogPosts[0];
const recentPosts = blogPosts.slice(1);

export default function BlogPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-100 via-indigo-50 to-slate-100 py-16 lg:py-24 relative overflow-hidden">
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-300 rounded-full opacity-30 animate-float"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-indigo-300 rounded-full opacity-40 animate-float animate-delay-400"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-purple-300 rounded-full opacity-35 animate-rotate-slow"></div>
          <div className="absolute top-1/2 right-1/3 w-14 h-14 bg-slate-300 rounded-full opacity-25 animate-float animate-delay-600"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Logo Section */}
          <div className="flex items-center justify-center space-x-4 mb-8 animate-bounce-in">
            <div className="relative">
              <Image
                src="/logo.avif"
                alt="Epigenetic Coaching Logo"
                width={80}
                height={80}
                className="rounded-2xl shadow-lg animate-pulse-glow"
              />
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-6 h-6 text-blue-500 animate-pulse" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Epigenetic Coaching
              </h2>
              <p className="text-sm text-blue-600 font-medium">
                Epigenetic Coaching
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-3 mb-6 animate-bounce-in animate-delay-200">
            <BookOpen className="w-8 h-8 text-blue-600 animate-pulse" />
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
              Health & <span className="text-blue-600">Genetics</span> Blog
            </h1>
          </div>
          <p className="text-xl text-gray-600 leading-relaxed animate-slide-up animate-delay-400">
            Discover the latest insights in personalized medicine, genetic
            research, and evidence-based health optimization strategies from our
            team of experts.
          </p>
        </div>
      </section>

      {/* Featured + Latest (Two Column) */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-24 h-24 bg-blue-300 rounded-full opacity-30 animate-float"></div>
        <div className="absolute bottom-10 left-10 w-20 h-20 bg-indigo-300 rounded-full opacity-35 animate-rotate-slow"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-purple-200 rounded-full opacity-25 animate-float animate-delay-800"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left: Featured */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 animate-bounce-in">
                Featured <span className="text-blue-600">Article</span>
              </h2>
              <Card className="border-0 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 animate-slide-up group">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="aspect-video md:aspect-auto bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-100/30 to-transparent animate-gradient-shift"></div>
                    <div className="text-center p-8 relative z-10">
                      <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <User className="w-12 h-12 text-blue-600" />
                      </div>
                      <p className="text-blue-700 font-medium">
                        Featured Article
                      </p>
                    </div>
                  </div>

                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {featuredPost.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-blue-100 text-blue-700"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                      {featuredPost.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                      <span className="flex items-center gap-2">
                        <User className="w-4 h-4" /> {featuredPost.author}
                      </span>
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />{" "}
                        {formatDate(featuredPost.publishedAt)}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4" /> {featuredPost.readTime}{" "}
                        min
                      </span>
                    </div>
                    <Button asChild className="bg-blue-600 hover:bg-blue-700">
                      <Link href={`/blog/${featuredPost.id}`}>
                        Read Full Article
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right: Latest small list */}
            <aside className="space-y-4 lg:sticky lg:top-24">
              <h3 className="text-xl font-bold text-gray-900">Latest Posts</h3>
              <div className="divide-y divide-blue-100 rounded-xl border border-blue-100 bg-white">
                {recentPosts.slice(0, 5).map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.id}`}
                    className="block p-4 hover:bg-blue-50/60 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1 w-2 h-2 rounded-full bg-blue-600"></div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900 line-clamp-2">
                          {post.title}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(post.publishedAt)}</span>
                          <span>•</span>
                          <Clock className="w-3 h-3" />
                          <span>{post.readTime} min</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Recent Posts Grid removed; now integrated in sidebar */}
      {/* Bottom: More Articles Grid */}
      <section className="py-20 bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-50 relative overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-300 rounded-full opacity-30 animate-float"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-indigo-300 rounded-full opacity-35 animate-rotate-slow"></div>
        <div className="absolute top-1/3 right-1/4 w-14 h-14 bg-purple-200 rounded-full opacity-25 animate-float animate-delay-600"></div>
        <div className="absolute bottom-1/3 left-1/3 w-10 h-10 bg-slate-300 rounded-full opacity-30 animate-float animate-delay-1000"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-12 animate-slide-up text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              More <span className="text-blue-600">Articles</span>
            </h2>
            <p className="text-gray-600 mt-2">
              Explore recent posts from our experts
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <Card
                key={post.id}
                className="border-0 shadow-md hover:shadow-lg transition-all duration-300 group"
              >
                <CardContent className="p-0">
                  <div className="relative w-full h-40 rounded-t-xl overflow-hidden">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge
                        variant="outline"
                        className="text-xs border-blue-200 text-blue-700"
                      >
                        {post.tags[0]}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg leading-tight mb-2 group-hover:text-blue-700">
                      <Link href={`/blog/${post.id}`}>{post.title}</Link>
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                    <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" /> {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />{" "}
                        {formatDate(post.publishedAt)}
                      </span>
                    </div>
                    <Button
                      asChild
                      variant="outline"
                      className="mt-5 w-full border-blue-300 hover:bg-blue-50 hover:border-blue-400"
                    >
                      <Link href={`/blog/${post.id}`}>Read More</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 relative overflow-hidden animate-gradient-shift">
        {/* Background decoration */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-blue-400 rounded-full opacity-10 animate-float"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white rounded-full opacity-5 animate-float animate-delay-400"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-300 rounded-full opacity-10 animate-rotate-slow"></div>

        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-white animate-bounce-in">
              Stay Updated with the Latest{" "}
              <span className="text-blue-300">Research</span>
            </h2>
            <p className="text-xl text-blue-100 animate-slide-up animate-delay-200">
              Subscribe to our newsletter and get the latest insights in
              personalized medicine delivered directly to your inbox.
            </p>

            <div className="max-w-md mx-auto animate-slide-up animate-delay-400">
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-400 animate-pulse-glow"
                />
                <Button
                  variant="secondary"
                  size="lg"
                  className="animate-pulse-glow hover:scale-105 transition-transform bg-blue-400 hover:bg-blue-300 text-gray-900"
                >
                  Subscribe
                </Button>
              </div>
            </div>

            <p className="text-blue-200 text-sm animate-slide-up animate-delay-600">
              No spam, unsubscribe at any time. Privacy policy applies.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
