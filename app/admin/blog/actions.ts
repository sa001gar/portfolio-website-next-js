"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export async function createBlogPost(formData: FormData) {
  const supabase = await createClient()
  
  const title = formData.get("title") as string
  const slug = formData.get("slug") as string || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
  const excerpt = formData.get("excerpt") as string
  const content = formData.get("content") as string
  const tags = (formData.get("tags") as string).split(",").map(t => t.trim()).filter(Boolean)
  const author = formData.get("author") as string
  const read_time = formData.get("read_time") as string
  const featured = formData.get("featured") === "on"
  
  if (!title) return { error: "Title is required" }

  const blogData = {
    title,
    slug,
    excerpt,
    content, // Rich text or HTML/Markdown
    tags,
    author,
    read_time,
    featured,
    publish_date: new Date().toISOString(), // Default to now
    updated_at: new Date().toISOString()
  }

  const { error } = await supabase.from("blogs").insert(blogData)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/admin/blog")
  redirect("/admin/blog")
}

export async function updateBlogPost(id: string, formData: FormData) {
  const supabase = await createClient()
  
  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const excerpt = formData.get("excerpt") as string
  const content = formData.get("content") as string
  const tags = (formData.get("tags") as string).split(",").map(t => t.trim()).filter(Boolean)
  const author = formData.get("author") as string
  const read_time = formData.get("read_time") as string
  const featured = formData.get("featured") === "on"
  
  const blogData = {
    title,
    slug,
    excerpt,
    content,
    tags,
    author,
    read_time,
    featured,
    updated_at: new Date().toISOString()
  }

  const { error } = await supabase.from("blogs").update(blogData).eq("id", id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/admin/blog")
  revalidatePath(`/admin/blog/${id}`)
  redirect("/admin/blog")
}

export async function deleteBlogPost(id: string) {
  const supabase = await createClient()
  
  const { error } = await supabase.from("blogs").delete().eq("id", id)
  
  if (error) {
    return { error: error.message }
  }

  revalidatePath("/admin/blog")
}
