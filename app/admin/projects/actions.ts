"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export async function createProject(formData: FormData) {
  const supabase = await createClient()
  
  const title = formData.get("title") as string
  // Simple slug generation
  const slug = formData.get("slug") as string
  const description = formData.get("description") as string
  const content = formData.get("content") as string
  const tags = (formData.get("tags") as string).split(",").map((tag) => tag.trim()).filter((tag) => tag.length > 0)
  const featured = formData.get("featured") === "on"
  
  // New fields
  const shoutout = formData.get("shoutout") as string
  
  // Parse JSON fields safely
  let contributors = []
  try {
      contributors = JSON.parse(formData.get("contributors") as string || "[]")
  } catch (e) {
      console.error("Error parsing contributors", e)
  }

  let images = []
  try {
      images = JSON.parse(formData.get("images") as string || "[]")
  } catch (e) {
       console.error("Error parsing images", e)
  }

  // Basic slug generation if empty
  let finalSlug = slug
  if (!finalSlug) {
    finalSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
  }

  const github_url = formData.get("github_url") as string
  const live_url = formData.get("live_url") as string

  // Basic validation
  if (!title) return { error: "Title is required" }

  const projectData = {
    title,
    slug: finalSlug,
    description,
    content,
    tags,
    featured,
    shoutout,
    contributors,
    images,
    github_url,
    live_url,
    updated_at: new Date().toISOString()
  }

  const { error } = await supabase.from("projects").insert(projectData)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/admin/projects")
  redirect("/admin/projects")
}

export async function updateProject(id: string, formData: FormData) {
  const supabase = await createClient()
  
  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const description = formData.get("description") as string
  const content = formData.get("content") as string
  const tags = (formData.get("tags") as string).split(",").map((tag) => tag.trim()).filter((tag) => tag.length > 0)
  const featured = formData.get("featured") === "on"
  
  // New fields
  const shoutout = formData.get("shoutout") as string
  
  // Parse JSON fields safely
  let contributors = []
  try {
      contributors = JSON.parse(formData.get("contributors") as string || "[]")
  } catch (e) {
      console.error("Error parsing contributors", e)
  }

  let images = []
  try {
      images = JSON.parse(formData.get("images") as string || "[]")
  } catch (e) {
       console.error("Error parsing images", e)
  }

  const github_url = formData.get("github_url") as string
  const live_url = formData.get("live_url") as string

  // Auto-generate slug if empty
  let finalSlug = slug
  if (!finalSlug) {
    finalSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
  }
  
  const projectData = {
    title,
    slug: finalSlug,
    description,
    content,
    tags,
    featured,
    shoutout,
    contributors,
    images,
    github_url,
    live_url,
    updated_at: new Date().toISOString()
  }

  const { error } = await supabase.from("projects").update(projectData).eq("id", id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/admin/projects")
  revalidatePath(`/admin/projects/${id}`)
  redirect("/admin/projects")
}

export async function deleteProject(id: string) {
  const supabase = await createClient()
  
  const { error } = await supabase.from("projects").delete().eq("id", id)
  
  if (error) {
    return { error: error.message }
  }

  revalidatePath("/admin/projects")
}
