import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { TerminalWindow } from "@/components/terminal-window"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import { ArrowLeft, Calendar, User, Clock, Tag, BookOpen } from "lucide-react"
import { HighlightedContent } from "@/components/highlighted-content"

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const supabase = await createClient()
  const { slug } = await params

  const { data: post } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single()

  if (!post) {
    notFound()
  }

  // Fetch related posts
  let relatedPosts: any[] = []
  if (post.tags && post.tags.length > 0) {
      const { data: related } = await supabase
        .from("blogs")
        .select("id, title, slug, excerpt, publish_date, featured_image_url")
        .neq("id", post.id)
        .overlaps("tags", post.tags)
        .limit(3)
      relatedPosts = related || []
  }

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="max-w-5xl mx-auto space-y-8">
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
                <span>{formatDate(new Date(post.publish_date))}</span>
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{post.read_time}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags?.map((tag: string) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Featured Image */}
            {post.featured_image_url && (
              <div className="relative w-full h-64 md:h-80 rounded-md overflow-hidden border border-terminal-green/20 mb-6">
                <Image
                  src={post.featured_image_url}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </header>

          {/* Article Content */}
          <TerminalWindow title={`${post.slug}.md`} className="mb-8">
            <div className="prose prose-invert prose-terminal max-w-none p-4">
                <HighlightedContent content={post.content} />
            </div>
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
              {post.author} shares knowledge and experiences through articles and open-source contributions.
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
                        {relatedPost.featured_image_url && (
                          <div className="w-16 h-16 relative rounded overflow-hidden border border-terminal-green/20 flex-shrink-0">
                            <Image
                              src={relatedPost.featured_image_url}
                              alt={relatedPost.title}
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
                            <span>{formatDate(new Date(relatedPost.publish_date))}</span>
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
