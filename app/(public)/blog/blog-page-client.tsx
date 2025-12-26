"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { TerminalText } from "@/components/terminal-text"
import { Badge } from "@/components/ui/badge"
import { SearchFilter } from "@/components/search-filter"
import { formatDate } from "@/lib/utils"
import { FileText, Calendar, User, Clock, ArrowRight, Search } from "lucide-react"

interface BlogPageClientProps {
  initialPosts: any[]
  allTags: string[]
}

export default function BlogPageClient({ initialPosts, allTags }: BlogPageClientProps) {
  const [posts, setPosts] = useState(initialPosts)
  const [tags] = useState(["All", ...allTags])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState("All")

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
  },[])

  // Filter logic
  useEffect(() => {
    let filtered = initialPosts

    if (selectedTag !== "All") {
      filtered = filtered.filter(post => post.tags?.includes(selectedTag))
    }

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(q) || 
        post.excerpt?.toLowerCase().includes(q)
      )
    }

    setPosts(filtered)
  }, [searchQuery, selectedTag, initialPosts])


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
            <SearchFilter placeholder="Search articles..." onSearch={setSearchQuery} className="w-full" />
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant={tag === selectedTag ? "default" : "outline"}
                className="cursor-pointer hover:bg-terminal-green/20 transition-colors"
                onClick={() => setSelectedTag(tag)}
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
                    {post.featured_image_url && (
                      <div className="md:w-48 md:h-32 relative rounded-md overflow-hidden border border-terminal-green/20">
                        <Image
                          src={post.featured_image_url}
                          alt={post.title}
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
                            <span>{formatDate(new Date(post.publish_date))}</span>
                          </div>
                          <div className="flex items-center">
                            <User className="w-3 h-3 mr-1" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            <span>{post.read_time}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-terminal-green/80 line-clamp-2">{post.excerpt}</p>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags?.map((tag: string) => (
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
      </div>
    </div>
  )
}
