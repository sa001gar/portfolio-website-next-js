"use client"

import { useState } from "react"
import Link from "next/link"
import { TerminalText } from "@/components/terminal-text"
import { Badge } from "@/components/ui/badge"
import { SearchFilter } from "@/components/search-filter"
import { formatDate } from "@/lib/utils"
import { FileText, Calendar, User, Clock, ArrowRight } from "lucide-react"

// Mock blog posts data
const posts = [
  {
    id: 1,
    title: "Building Secure APIs with FastAPI and JWT",
    slug: "building-secure-apis-fastapi-jwt",
    excerpt:
      "Learn how to implement JWT authentication in FastAPI to create secure and scalable APIs for your applications.",
    date: new Date("2023-11-15"),
    readTime: "8 min read",
    author: "Sagar Kundu",
    tags: ["FastAPI", "Security", "Python", "JWT", "API"],
  },
  {
    id: 2,
    title: "Machine Learning for Anomaly Detection in Network Traffic",
    slug: "ml-anomaly-detection-network-traffic",
    excerpt:
      "Explore how machine learning algorithms can be used to detect unusual patterns and potential security threats in network traffic.",
    date: new Date("2023-10-22"),
    readTime: "12 min read",
    author: "Sagar Kundu",
    tags: ["Machine Learning", "Cybersecurity", "Python", "TensorFlow", "Network Security"],
  },
  {
    id: 3,
    title: "Optimizing Next.js Applications for Performance",
    slug: "optimizing-nextjs-applications-performance",
    excerpt:
      "Practical techniques to improve the performance of your Next.js applications, from code splitting to image optimization.",
    date: new Date("2023-09-18"),
    readTime: "10 min read",
    author: "Sagar Kundu",
    tags: ["Next.js", "Performance", "React", "Web Development", "JavaScript"],
  },
  {
    id: 4,
    title: "Containerization Best Practices with Docker and Kubernetes",
    slug: "containerization-best-practices-docker-kubernetes",
    excerpt:
      "Learn the best practices for containerizing your applications with Docker and orchestrating them with Kubernetes.",
    date: new Date("2023-08-05"),
    readTime: "15 min read",
    author: "Sagar Kundu",
    tags: ["Docker", "Kubernetes", "DevOps", "Containers", "Cloud"],
  },
  {
    id: 5,
    title: "Building a Real-time Dashboard with React and WebSockets",
    slug: "real-time-dashboard-react-websockets",
    excerpt:
      "A step-by-step guide to creating a real-time dashboard using React for the frontend and WebSockets for live data updates.",
    date: new Date("2023-07-12"),
    readTime: "11 min read",
    author: "Sagar Kundu",
    tags: ["React", "WebSockets", "JavaScript", "Real-time", "Dashboard"],
  },
]

// Categories for filtering
const categories = ["All", "Web Development", "Machine Learning", "DevOps", "Cybersecurity", "Tutorials"]

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  // Filter posts based on search query and selected category
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory =
      selectedCategory === "All" || post.tags.some((tag) => tag.toLowerCase() === selectedCategory.toLowerCase())

    return matchesSearch && matchesCategory
  })

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-terminal-bright">
            <TerminalText text="Blog" typingDelay={80} showCursor={false}/>
          </h1>
          <p className="text-terminal-green/80 max-w-2xl">
            Technical articles, tutorials, and insights on software development, machine learning, and cybersecurity.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <SearchFilter
            placeholder="Search articles..."
            onSearch={setSearchQuery}
            className="w-full sm:w-auto sm:flex-1"
          />

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={category === selectedCategory ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Blog Posts */}
        <div className="space-y-6">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="block group">
                <article className="border border-terminal-green/20 rounded-md p-5 hover:border-terminal-green/50 transition-all duration-300 hover:bg-terminal-green/5">
                  <h2 className="text-xl font-bold text-terminal-bright group-hover:text-terminal-bright mb-2">
                    {post.title}
                  </h2>

                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-terminal-green/70 mb-3">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="w-3 h-3 mr-1" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <p className="text-terminal-green/80 mb-4">{post.excerpt}</p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center text-terminal-bright text-sm font-medium group-hover:underline">
                    Read article <ArrowRight className="ml-1 w-4 h-4" />
                  </div>
                </article>
              </Link>
            ))
          ) : (
            <div className="text-center py-12 border border-terminal-green/20 rounded-md">
              <FileText className="w-12 h-12 text-terminal-green/40 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-terminal-bright mb-2">No articles found</h3>
              <p className="text-terminal-green/60">
                No articles match your search criteria. Try adjusting your search or filters.
              </p>
            </div>
          )}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-terminal-green/20">
          <div className="bg-terminal-green/5 border border-terminal-green/20 rounded-md p-6">
            <div className="flex items-center mb-4">
              <FileText className="w-5 h-5 text-terminal-bright mr-2" />
              <h2 className="text-xl font-bold text-terminal-bright">Subscribe to the Newsletter</h2>
            </div>

            <p className="text-terminal-green/80 mb-4">
              Get notified when I publish new articles. No spam, just quality content on software development and
              technology.
            </p>

            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="your.email@example.com"
                className="flex-1 bg-terminal-black border border-terminal-green/30 rounded-md px-3 py-2 text-terminal-green focus:outline-none focus:ring-1 focus:ring-terminal-bright focus:border-terminal-bright"
                required
              />
              <button
                type="submit"
                className="bg-terminal-green text-terminal-black font-medium py-2 px-4 rounded-md hover:bg-terminal-green/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
