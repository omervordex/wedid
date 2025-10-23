import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { getPostById, getRecentPosts } from "@/lib/blog-data";
import { formatDate } from "@/lib/utils";

type Props = { params: { id: string } };

export default function BlogDetailPage({ params }: Props) {
  const post = getPostById(params.id);
  if (!post) return notFound();

  const related = getRecentPosts(post.id).slice(0, 6);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-slate-50 py-12 lg:py-16 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/blog"
              className="text-sm text-blue-700 hover:underline"
            >
              ← Back to Blog
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-black leading-tight text-slate-900">
              <span className="bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">
                {post.title}
              </span>
            </h1>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm">
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 flex items-center gap-2">
                <User className="w-4 h-4" /> {post.author}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 flex items-center gap-2">
                <Calendar className="w-4 h-4" /> {formatDate(post.publishedAt)}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 flex items-center gap-2">
                <Clock className="w-4 h-4" /> {post.readTime} min
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured image */}
      <section className="py-6">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="border-0 shadow-xl overflow-hidden rounded-3xl">
            <CardContent className="p-0">
              <div className="relative w-full h-64 sm:h-80 lg:h-96">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            </CardContent>
          </Card>
          <div className="mt-4 flex gap-2 flex-wrap">
            {post.tags.map((t) => (
              <Badge
                key={t}
                variant="secondary"
                className="bg-blue-100 text-blue-700"
              >
                {t}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-10">
        <div className="max-w-4xl mx-auto px-4">
          <article className="prose prose-slate lg:prose-lg max-w-none leading-relaxed">
            <p className="first-letter:text-5xl first-letter:font-bold first-letter:mr-2 first-letter:float-left">
              {post.content}
            </p>
            <blockquote className="border-l-4 border-blue-600 pl-4 text-slate-700 bg-blue-50/40 rounded-md py-2">
              Empower your health decisions with personalized insights.
            </blockquote>
          </article>
        </div>
      </section>

      {/* Bottom related posts */}
      <section className="py-16 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {related.map((p) => (
              <Card
                key={p.id}
                className="border-0 shadow-md hover:shadow-lg transition-all group"
              >
                <CardContent className="p-0">
                  <div className="relative w-full h-44 rounded-t-xl overflow-hidden">
                    <Image
                      src={p.featuredImage}
                      alt={p.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-2">
                      <Badge
                        variant="outline"
                        className="text-xs border-blue-200 text-blue-700"
                      >
                        {p.tags[0]}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg mb-2 group-hover:text-blue-700">
                      <Link href={`/blog/${p.id}`}>{p.title}</Link>
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {p.excerpt}
                    </CardDescription>
                    <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />{" "}
                        {formatDate(p.publishedAt)}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {p.readTime} min
                      </span>
                    </div>
                    <Button asChild className="mt-4">
                      <Link href={`/blog/${p.id}`}>
                        Read
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
