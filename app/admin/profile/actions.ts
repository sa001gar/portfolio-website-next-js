"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"

// --- Profile ---
export async function updateProfile(formData: FormData) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Not authenticated" }

  const profileData = {
    full_name: formData.get("full_name") as string,
    title: formData.get("title") as string,
    bio: formData.get("bio") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    location: formData.get("location") as string,
    working_hours: formData.get("working_hours") as string,
    avatar_url: (formData.get("avatar_url") as string) || null,
  }

  const { error } = await supabase.from("profiles").upsert({
    id: user.id,
    ...profileData,
    updated_at: new Date().toISOString()
  })

  if (error) return { error: error.message }
  revalidatePath("/admin/profile")
  return { success: true }
}

// --- Experience ---
export async function addExperience(formData: FormData) {
  const supabase = await createClient()

  const technologiesRaw = formData.get("technologies") as string
  const achievementsRaw = formData.get("achievements") as string

  const technologies = technologiesRaw
    ? technologiesRaw.split(",").map((s) => s.trim()).filter(Boolean)
    : []

  const achievements = achievementsRaw
    ? achievementsRaw.split("\n").map((s) => s.trim()).filter(Boolean)
    : []

  const orderIndexRaw = formData.get("order_index")
  const order_index = orderIndexRaw ? parseInt(orderIndexRaw as string, 10) || 0 : 0
  
  const data: any = {
    title: formData.get("title") as string,
    company: formData.get("company") as string,
    location: (formData.get("location") as string) || null,
    start_date: formData.get("start_date") as string,
    end_date: (formData.get("current") === "on" || formData.get("current") === "true") ? null : ((formData.get("end_date") as string) || null),
    current: formData.get("current") === "on" || formData.get("current") === "true",
    description: (formData.get("description") as string) || null,
    technologies,
    achievements,
    order_index,
  }

  const { error } = await supabase.from("experience").insert(data)
  if (error) return { error: error.message }
  revalidatePath("/admin/profile")
  revalidatePath("/experience")
  return { success: true }
}

export async function updateExperience(id: string, formData: FormData) {
  const supabase = await createClient()

  const technologiesRaw = formData.get("technologies") as string
  const achievementsRaw = formData.get("achievements") as string

  const technologies = technologiesRaw
    ? technologiesRaw.split(",").map((s) => s.trim()).filter(Boolean)
    : []

  const achievements = achievementsRaw
    ? achievementsRaw.split("\n").map((s) => s.trim()).filter(Boolean)
    : []

  const orderIndexRaw = formData.get("order_index")
  const order_index = orderIndexRaw !== null && orderIndexRaw !== "" ? parseInt(orderIndexRaw as string, 10) || 0 : 0

  const data: any = {
    title: formData.get("title") as string,
    company: formData.get("company") as string,
    location: (formData.get("location") as string) || null,
    start_date: formData.get("start_date") as string,
    end_date: (formData.get("current") === "on" || formData.get("current") === "true") ? null : ((formData.get("end_date") as string) || null),
    current: formData.get("current") === "on" || formData.get("current") === "true",
    description: (formData.get("description") as string) || null,
    technologies,
    achievements,
    order_index,
  }

  const { error } = await supabase.from("experience").update(data).eq("id", id)
  if (error) return { error: error.message }
  revalidatePath("/admin/profile")
  revalidatePath("/experience")
  return { success: true }
}

export async function deleteExperience(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from("experience").delete().eq("id", id)
  if (error) return { error: error.message }
  revalidatePath("/admin/profile")
  revalidatePath("/experience")
  return { success: true }
}

// --- Education ---
export async function addEducation(formData: FormData) {
  const supabase = await createClient()
  
  const data = {
    degree: formData.get("degree") as string,
    institution: formData.get("institution") as string,
    start_year: formData.get("start_year") as string,
    end_year: formData.get("end_year") as string,
  }

  const { error } = await supabase.from("education").insert(data)
  if (error) return { error: error.message }
  revalidatePath("/admin/profile")
  return { success: true }
}

export async function deleteEducation(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from("education").delete().eq("id", id)
  if (error) return { error: error.message }
  revalidatePath("/admin/profile")
  return { success: true }
}

// --- Skills ---
export async function addSkill(formData: FormData) {
  const supabase = await createClient()
  
  const data = {
    name: formData.get("name") as string,
    category: formData.get("category") as string,
    proficiency: parseInt(formData.get("proficiency") as string) || 0
  }

  const { error } = await supabase.from("skills").insert(data)
  if (error) return { error: error.message }
  revalidatePath("/admin/profile")
  return { success: true }
}

export async function deleteSkill(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from("skills").delete().eq("id", id)
  if (error) return { error: error.message }
  revalidatePath("/admin/profile")
  return { success: true }
}
