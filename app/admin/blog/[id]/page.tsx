import { BlogForm } from "../_components/blog-form"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient()
  const { id } = await params
  const { data: post } = await supabase.from("blogs").select("*").eq("id", id).single()

  if (!post) {
    notFound()
  }

  return <BlogForm post={post} isEdit />
}
