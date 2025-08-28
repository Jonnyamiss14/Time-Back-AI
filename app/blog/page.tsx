import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { BlogCard } from "@/components/blog-card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { getAllPosts, getCategories, getFeaturedPosts } from "@/lib/blog"
import { Search } from "lucide-react"

export default function BlogPage() {
  const allPosts = getAllPosts()
  const featuredPosts = getFeaturedPosts()
  const categories = getCategories()
  const recentPosts = allPosts.slice(0, 6)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6">
              AI Training Insights
            </Badge>
            <h1 className="display-hero text-gray-900 mb-6">
              The TimeBack AI <span className="text-[#10A39A]">Blog</span>
            </h1>
            <p className="body-lead text-gray-700 mb-8 max-w-2xl mx-auto">
              Practical insights on AI training for schools and employment providers. Real-world experience, zero
              jargon.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input placeholder="Search articles..." className="pl-10" />
              </div>
              <Button className="bg-[#10A39A] hover:bg-[#0D867F] text-white">Search</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge variant="default" className="cursor-pointer bg-[#10A39A] hover:bg-[#0D867F]">
              All
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category}
                variant="outline"
                className="cursor-pointer hover:bg-[#10A39A] hover:text-white border-[#10A39A] text-[#10A39A]"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="heading-xl text-gray-900 mb-12 text-center">Featured Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredPosts.slice(0, 3).map((post) => (
                <BlogCard key={post.slug} post={post} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Posts */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="heading-xl text-gray-900 mb-12 text-center">Latest Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          {allPosts.length > 6 && (
            <div className="text-center mt-12">
              <Button
                variant="outline"
                size="lg"
                className="border-[#10A39A] text-[#10A39A] hover:bg-[#DEF3F2] bg-transparent"
              >
                Load More Articles
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
