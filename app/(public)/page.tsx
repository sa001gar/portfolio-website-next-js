import { createClient } from "@/lib/supabase/server"
import HomePageClient from "./home-page-client"

export default async function Home() {
  const supabase = await createClient()

  // Run queries in parallel
  const [profileResult, skillsResult, projectResult] = await Promise.all([
    supabase.from("profiles").select("*").single(),
    supabase.from("skills").select("*").order("order_index"),
    supabase.from("projects").select("*").eq("featured", true).limit(1).single()
  ])

  // Don't fail the whole page if one query errors, just pass null/empty
  const profile = profileResult.data || null
  const skills = skillsResult.data || []
  const featuredProject = projectResult.data || null

  return (
    <HomePageClient 
      profile={profile} 
      skills={skills} 
      featuredProject={featuredProject} 
    />
  )
}
