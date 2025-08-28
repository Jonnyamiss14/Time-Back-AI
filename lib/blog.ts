import fs from "fs"
import path from "path"
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(), "content/blog")

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  author: string
  category: string
  tags: string[]
  readTime: string
  featured?: boolean
  content: string
}

export function getAllPosts(): BlogPost[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames
      .filter((name) => name.endsWith(".mdx"))
      .map((fileName) => {
        const slug = fileName.replace(/\.mdx$/, "")
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, "utf8")
        const { data, content } = matter(fileContents)

        return {
          slug,
          content,
          title: data.title || "",
          excerpt: data.excerpt || "",
          date: data.date || "",
          author: data.author || "",
          category: data.category || "",
          tags: data.tags || [],
          readTime: data.readTime || "5 min read",
          featured: data.featured || false,
        } as BlogPost
      })

    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
  } catch (error) {
    console.error("Error reading blog posts:", error)
    return []
  }
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug,
      content,
      title: data.title || "",
      excerpt: data.excerpt || "",
      date: data.date || "",
      author: data.author || "",
      category: data.category || "",
      tags: data.tags || [],
      readTime: data.readTime || "5 min read",
      featured: data.featured || false,
    } as BlogPost
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error)
    return null
  }
}

export function getCategories(): string[] {
  const posts = getAllPosts()
  const categories = [...new Set(posts.map((post) => post.category))]
  return categories.filter(Boolean)
}

export function getPostsByCategory(category: string): BlogPost[] {
  const posts = getAllPosts()
  return posts.filter((post) => post.category === category)
}

export function getFeaturedPosts(): BlogPost[] {
  const posts = getAllPosts()
  return posts.filter((post) => post.featured)
}
