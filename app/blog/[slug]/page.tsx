import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getPostBySlug, getAllPosts } from "@/lib/blog"
import { generateSEOMetadata } from "@/components/seo"
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import components from "@/components/mdx-components"
import Link from "next/link"
import Input from "@/components/ui/input" // Assuming Input component is imported from a UI library

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return generateSEOMetadata({
      title: "Post Not Found - TimeBack AI Blog",
      description: "The requested blog post could not be found.",
    })
  }

  return generateSEOMetadata({
    title: `${post.title} - TimeBack AI Blog`,
    description: post.excerpt,
    keywords: post.tags.join(", "),
    url: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.date,
    author: post.author,
    section: post.category,
    tags: post.tags,
  })
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "TimeBack AI",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
      },
    },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
    articleSection: post.category,
  }

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: process.env.NEXT_PUBLIC_SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${process.env.NEXT_PUBLIC_SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`,
      },
    ],
  }

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />

      <Navigation />

      {/* Article Header */}
      <article className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            {/* Article Meta */}
            <div className="mb-8">
              <Badge variant="secondary" className="mb-4">
                {post.category}
              </Badge>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">{post.title}</h1>
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">{post.excerpt}</p>

              {/* Author and Meta Info */}
              <div className="flex items-center justify-between flex-wrap gap-4 pb-8 border-b">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" alt={post.author} />
                    <AvatarFallback>
                      {post.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{post.author}</div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-[#10A39A] hover:prose-a:text-[#0D867F]">
              <MDXRemote source={post.content} components={components} />
            </div>

            {/* Video + Transcript Section */}
            <div className="mt-12 p-6 bg-gray-50 rounded-lg">
              <h3 className="heading-lg text-gray-900 mb-4">Watch & Learn</h3>
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#10A39A] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 font-medium">Video explanation coming soon</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-[#10A39A] text-[#10A39A] hover:bg-[#DEF3F2] bg-transparent"
              >
                Show Transcript
              </Button>
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t">
                <h3 className="text-lg font-semibold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-xl text-gray-900 mb-8 text-center">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Placeholder for related posts - would be implemented with actual logic */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="heading-lg text-gray-900 mb-2">AI Training Best Practices</h3>
                <p className="body-default text-gray-600 mb-4">
                  Essential guidelines for implementing effective AI training programs...
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#10A39A] text-[#10A39A] hover:bg-[#DEF3F2] bg-transparent"
                >
                  Read More
                </Button>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="heading-lg text-gray-900 mb-2">Measuring AI Training Success</h3>
                <p className="body-default text-gray-600 mb-4">
                  How to track and evaluate the impact of your AI training initiatives...
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#10A39A] text-[#10A39A] hover:bg-[#DEF3F2] bg-transparent"
                >
                  Read More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inline Subscribe */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center bg-[#DEF3F2] p-8 rounded-lg">
            <h2 className="heading-xl text-gray-900 mb-4">Get new posts & demos</h2>
            <p className="body-default text-gray-700 mb-6">
              Join our mailing list for practical AI training insights and exclusive demo access.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input type="email" placeholder="Enter your email" className="flex-1" />
              <Button className="bg-[#10A39A] hover:bg-[#0D867F] text-white">Subscribe</Button>
            </div>
            <p className="text-xs text-gray-600 mt-3">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
