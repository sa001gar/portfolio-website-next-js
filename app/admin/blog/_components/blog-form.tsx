"use client"

import { useState } from "react"
import { createBlogPost, updateBlogPost } from "@/app/admin/blog/actions"
import { useRouter } from "next/navigation"
import { Loader2, Save, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { RichTextEditor } from "@/components/rich-text-editor"
import { ImageUploader } from "@/components/image-uploader"

interface BlogFormProps {
  post?: any
  isEdit?: boolean
}

export function BlogForm({ post, isEdit = false }: BlogFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [content, setContent] = useState(post?.content || "")
  const [featuredImage, setFeaturedImage] = useState(post?.featured_image_url || "")
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    formData.set("content", content)
    formData.set("featured_image_url", featuredImage)

    let result

    if (isEdit && post) {
      result = await updateBlogPost(post.id, formData)
    } else {
      result = await createBlogPost(formData)
    }

    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/admin/blog" className="flex items-center text-terminal-green hover:text-terminal-bright">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Blog
        </Link>
        <h1 className="text-2xl font-bold text-terminal-bright">
          {isEdit ? `Edit Post: ${post.title}` : "New Blog Post"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 border border-terminal-green/20 rounded-lg p-6 bg-terminal-black/50">
        <div className="space-y-2">
            <label className="text-sm font-mono text-terminal-green/80 uppercase">Featured Image</label>
            <ImageUploader 
                value={featuredImage} 
                onChange={(val) => setFeaturedImage(val as string)} 
                folder="blogs"
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-mono text-terminal-green/80 uppercase">Title</label>
            <input
              name="title"
              defaultValue={post?.title}
              required
              className="w-full bg-terminal-black border border-terminal-green/30 rounded px-3 py-2 text-terminal-green focus:outline-none focus:border-terminal-bright focus:ring-1 focus:ring-terminal-bright/50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-mono text-terminal-green/80 uppercase">Slug</label>
            <input
              name="slug"
              defaultValue={post?.slug}
              placeholder="auto-generated-if-empty"
              className="w-full bg-terminal-black border border-terminal-green/30 rounded px-3 py-2 text-terminal-green focus:outline-none focus:border-terminal-bright focus:ring-1 focus:ring-terminal-bright/50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="space-y-2">
            <label className="text-sm font-mono text-terminal-green/80 uppercase">Author</label>
            <input
              name="author"
              defaultValue={post?.author || "Jane Doe"} 
              className="w-full bg-terminal-black border border-terminal-green/30 rounded px-3 py-2 text-terminal-green focus:outline-none focus:border-terminal-bright focus:ring-1 focus:ring-terminal-bright/50"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-mono text-terminal-green/80 uppercase">Read Time</label>
            <input
              name="read_time"
              defaultValue={post?.read_time || "5 min read"} 
              className="w-full bg-terminal-black border border-terminal-green/30 rounded px-3 py-2 text-terminal-green focus:outline-none focus:border-terminal-bright focus:ring-1 focus:ring-terminal-bright/50"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-mono text-terminal-green/80 uppercase">Excerpt</label>
          <textarea
            name="excerpt"
            defaultValue={post?.excerpt}
            rows={3}
            className="w-full bg-terminal-black border border-terminal-green/30 rounded px-3 py-2 text-terminal-green focus:outline-none focus:border-terminal-bright focus:ring-1 focus:ring-terminal-bright/50"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-mono text-terminal-green/80 uppercase">Content (Rich Text)</label>
          <div className="bg-terminal-black/50 border border-terminal-green/20 rounded-lg">
             <RichTextEditor 
                content={content} 
                onChange={setContent} 
                placeholder="Write your article..." 
             />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-mono text-terminal-green/80 uppercase">Tags (comma separated)</label>
          <input
            name="tags"
            defaultValue={post?.tags?.join(", ")}
            placeholder="Tutorial, React, Guide"
            className="w-full bg-terminal-black border border-terminal-green/30 rounded px-3 py-2 text-terminal-green focus:outline-none focus:border-terminal-bright focus:ring-1 focus:ring-terminal-bright/50"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="featured"
            id="featured"
            defaultChecked={post?.featured}
            className="h-4 w-4 rounded border-terminal-green/30 bg-terminal-black text-terminal-green focus:ring-terminal-bright/50"
          />
          <label htmlFor="featured" className="text-sm font-mono text-terminal-green/80 uppercase select-none cursor-pointer">
            Featured Post
          </label>
        </div>

        {error && (
          <div className="p-3 border border-red-500/30 bg-red-500/10 text-red-500 text-sm rounded font-mono">
            Error: {error}
          </div>
        )}

        <div className="pt-4 border-t border-terminal-green/20 flex justify-end">
          <Button
            type="submit"
            disabled={loading}
            className="bg-terminal-green text-terminal-black hover:bg-terminal-green/90 font-bold"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" /> Save Post
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
