"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { TerminalText } from "@/components/terminal-text"
import { Badge } from "@/components/ui/badge"
import { SearchFilter } from "@/components/search-filter"
import { formatDate } from "@/lib/utils"
import { getAllBlogPosts, getAllTags, searchBlogPosts, getBlogPostsByTag, type BlogPost } from "@/lib/contentful"
import { FileText, Calendar, User, Clock, ArrowRight, Search } from "lucide-react"

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [allPosts, setAllPosts] = useState<BlogPost[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState("All")
  const [searchLoading, setSearchLoading] = useState(false)

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })

    // Load initial data
    loadInitialData()
  }, [])

  const loadInitialData = async () => {
    try {
      setLoading(true)
      const [blogPosts, blogTags] = await Promise.all([getAllBlogPosts(), getAllTags()])

      setAllPosts(blogPosts)
      setPosts(blogPosts)
      setTags(["All", ...blogTags])
    } catch (error) {
      console.error("Error loading blog data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    setSearchLoading(true)

    try {
      if (query.trim() === "") {
        // Reset to all posts or filtered by tag
        if (selectedTag === "All") {
          setPosts(allPosts)
        } else {
          const tagPosts = await getBlogPostsByTag(selectedTag)
          setPosts(tagPosts)
        }
      } else {
        // Search posts
        const searchResults = await searchBlogPosts(query)
        setPosts(searchResults)
      }
    } catch (error) {
      console.error("Error searching posts:", error)
    } finally {
      setSearchLoading(false)
    }
  }

  const handleTagFilter = async (tag: string) => {
    setSelectedTag(tag)
    setSearchLoading(true)

    try {
      if (tag === "All") {
        if (searchQuery.trim() === "") {
          setPosts(allPosts)
        } else {
          const searchResults = await searchBlogPosts(searchQuery)
          setPosts(searchResults)
        }
      } else {
        const tagPosts = await getBlogPostsByTag(tag)
        setPosts(tagPosts)
      }
    } catch (error) {
      console.error("Error filtering by tag:", error)
    } finally {
      setSearchLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="space-y-2">
              <div className="h-12 bg-terminal-green/20 rounded w-32"></div>
              <div className="h-6 bg-terminal-green/10 rounded w-96"></div>
            </div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="border border-terminal-green/20 rounded-md p-5 space-y-3">
                  <div className="h-6 bg-terminal-green/20 rounded w-3/4"></div>
                  <div className="h-4 bg-terminal-green/10 rounded w-full"></div>
                  <div className="h-4 bg-terminal-green/10 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-terminal-bright">
            <TerminalText text="Blog" typingDelay={80} showCursor={false} />
          </h1>
          <p className="text-terminal-green/80 max-w-2xl">
            Technical articles, tutorials, and insights on software development, machine learning, and cybersecurity.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="relative w-full sm:w-auto sm:flex-1">
            <SearchFilter placeholder="Search articles..." onSearch={handleSearch} className="w-full" />
            {searchLoading && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search className="w-4 h-4 text-terminal-green animate-pulse" />
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant={tag === selectedTag ? "default" : "outline"}
                className="cursor-pointer hover:bg-terminal-green/20 transition-colors"
                onClick={() => handleTagFilter(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Blog Posts */}
        <div className="space-y-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="block group">
                <article className="border border-terminal-green/20 rounded-md p-5 hover:border-terminal-green/50 transition-all duration-300 hover:bg-terminal-green/5">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Featured Image */}
                    {post.featuredImage && (
                      <div className="md:w-48 md:h-32 relative rounded-md overflow-hidden border border-terminal-green/20">
                        <Image
                          src={post.featuredImage.url || "/placeholder.svg"}
                          alt={post.featuredImage.alt}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 space-y-3">
                      <div>
                        {post.featured && (
                          <Badge variant="default" className="mb-2">
                            Featured
                          </Badge>
                        )}
                        <h2 className="text-xl font-bold text-terminal-bright group-hover:text-terminal-bright mb-2">
                          {post.title}
                        </h2>

                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-terminal-green/70 mb-3">
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            <span>{formatDate(post.publishDate)}</span>
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
                      </div>

                      <p className="text-terminal-green/80 line-clamp-2">{post.excerpt}</p>

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
                    </div>
                  </div>
                </article>
              </Link>
            ))
          ) : (
            <div className="text-center py-12 border border-terminal-green/20 rounded-md">
              <FileText className="w-12 h-12 text-terminal-green/40 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-terminal-bright mb-2">No articles found</h3>
              <p className="text-terminal-green/60">
                {searchQuery
                  ? `No articles match "${searchQuery}". Try adjusting your search.`
                  : "No articles match your search criteria. Try adjusting your filters."}
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
