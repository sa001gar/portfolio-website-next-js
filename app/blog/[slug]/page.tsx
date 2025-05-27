"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { TerminalWindow } from "@/components/terminal-window"
import { Badge } from "@/components/ui/badge"
import { RichTextRenderer } from "@/components/rich-text-renderer"
import { formatDate } from "@/lib/utils"
import { getBlogPostBySlug, getAllBlogPosts, type BlogPost } from "@/lib/contentful"
import { ArrowLeft, Calendar, User, Clock, Tag, Share2, BookOpen } from "lucide-react"

interface BlogPostPageProps {
  params: { slug: string }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [notFound404, setNotFound404] = useState(false)

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })

    loadPost()
  }, [params.slug])

  const loadPost = async () => {
    try {
      setLoading(true)
      const blogPost = await getBlogPostBySlug(params.slug)

      if (!blogPost) {
        setNotFound404(true)
        return
      }

      setPost(blogPost)

      // Load related posts (posts with similar tags)
      const allPosts = await getAllBlogPosts()
      const related = allPosts
        .filter((p) => p.id !== blogPost.id)
        .filter((p) => p.tags.some((tag) => blogPost.tags.includes(tag)))
        .slice(0, 3)

      setRelatedPosts(related)
    } catch (error) {
      console.error("Error loading blog post:", error)
      setNotFound404(true)
    } finally {
      setLoading(false)
    }
  }

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        })
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href)
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 min-h-screen">
        <div className="max-w-3xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-6 bg-terminal-green/20 rounded w-32"></div>
            <div className="space-y-4">
              <div className="h-10 bg-terminal-green/20 rounded w-3/4"></div>
              <div className="h-4 bg-terminal-green/10 rounded w-full"></div>
              <div className="h-4 bg-terminal-green/10 rounded w-2/3"></div>
            </div>
            <div className="h-64 bg-terminal-green/10 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (notFound404 || !post) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center text-terminal-green hover:text-terminal-bright transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to all articles
        </Link>

        {/* Article Header */}
        <article>
          <header className="mb-8">
            {post.featured && (
              <Badge variant="default" className="mb-4">
                Featured Article
              </Badge>
            )}

            <h1 className="text-3xl md:text-4xl font-bold text-terminal-bright mb-4">{post.title}</h1>

            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-terminal-green/70 mb-4">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{formatDate(post.publishDate)}</span>
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{post.readTime}</span>
              </div>
              <button
                onClick={handleShare}
                className="flex items-center text-terminal-green hover:text-terminal-bright transition-colors"
              >
                <Share2 className="w-4 h-4 mr-1" />
                <span>Share</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Featured Image */}
            {post.featuredImage && (
              <div className="relative w-full h-64 md:h-80 rounded-md overflow-hidden border border-terminal-green/20 mb-6">
                <Image
                  src={post.featuredImage.url || "/placeholder.svg"}
                  alt={post.featuredImage.alt}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </header>

          {/* Article Content */}
          <TerminalWindow title={`${post.slug}.md`} className="mb-8">
            <RichTextRenderer content={post.content} />
          </TerminalWindow>

          {/* Author Bio */}
          <div className="border border-terminal-green/20 rounded-md p-5 bg-terminal-green/5 mb-8">
            <div className="flex items-center mb-3">
              <div className="w-12 h-12 rounded-full bg-terminal-green/20 flex items-center justify-center mr-4">
                <User className="w-6 h-6 text-terminal-bright" />
              </div>
              <div>
                <h3 className="text-terminal-bright font-bold">{post.author}</h3>
                <p className="text-terminal-green/70 text-sm">Software Engineer & Technical Writer</p>
              </div>
            </div>
            <p className="text-terminal-green/80 text-sm">
              {post.author} is a software engineer specializing in full-stack development, machine learning, and
              cybersecurity. He shares his knowledge and experiences through articles and open-source contributions.
            </p>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="border-t border-terminal-green/20 pt-8">
              <div className="flex items-center mb-4">
                <BookOpen className="w-5 h-5 text-terminal-bright mr-2" />
                <h2 className="text-xl font-bold text-terminal-bright">Related Articles</h2>
              </div>
              <div className="space-y-4">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`} className="block group">
                    <div className="border border-terminal-green/20 rounded-md p-4 hover:border-terminal-green/50 transition-all hover:bg-terminal-green/5">
                      <div className="flex gap-4">
                        {relatedPost.featuredImage && (
                          <div className="w-16 h-16 relative rounded overflow-hidden border border-terminal-green/20 flex-shrink-0">
                            <Image
                              src={relatedPost.featuredImage.url || "/placeholder.svg"}
                              alt={relatedPost.featuredImage.alt}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="text-terminal-bright font-medium group-hover:text-terminal-bright mb-1">
                            {relatedPost.title}
                          </h3>
                          <p className="text-terminal-green/70 text-sm line-clamp-2">{relatedPost.excerpt}</p>
                          <div className="flex items-center text-xs text-terminal-green/60 mt-2">
                            <Calendar className="w-3 h-3 mr-1" />
                            <span>{formatDate(relatedPost.publishDate)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  )
}
