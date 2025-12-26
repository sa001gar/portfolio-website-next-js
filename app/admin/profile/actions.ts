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
    // social_links and avatar_url would be handled separately or via JSON parsing if passing raw JSON
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
  
  const data = {
    title: formData.get("title") as string,
    company: formData.get("company") as string,
    location: formData.get("location") as string,
    start_date: formData.get("start_date") as string,
    end_date: (formData.get("current") === "on") ? null : formData.get("end_date") as string,
    current: formData.get("current") === "on",
    description: formData.get("description") as string,
  }

  const { error } = await supabase.from("experience").insert(data)
  if (error) return { error: error.message }
  revalidatePath("/admin/profile")
  return { success: true }
}

export async function deleteExperience(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from("experience").delete().eq("id", id)
  if (error) return { error: error.message }
  revalidatePath("/admin/profile")
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
