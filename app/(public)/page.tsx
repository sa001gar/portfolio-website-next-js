import { createClient } from "@/lib/supabase/server"
import { getGitHubData } from "@/lib/github"
import HomePageClient from "./home-page-client"

export const revalidate = 3600 // Revalidate cached data every 1 hour

export default async function Home() {
  const supabase = await createClient()

  // Fetch all landing page data in parallel
  const [
    profileResult,
    skillsResult,
    projectsResult,
    experienceResult,
    blogsResult,
    githubData,
  ] = await Promise.all([
    supabase.from("profiles").select("*").limit(1).maybeSingle(),
    supabase.from("skills").select("*").order("order_index", { ascending: true }),
    supabase
      .from("projects")
      .select("*")
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false }),
    supabase
      .from("experience")
      .select("*")
      .order("order_index", { ascending: true }),
    supabase
      .from("blogs")
      .select("id, title, slug, excerpt, publish_date, tags, cover_image")
      .order("publish_date", { ascending: false })
      .limit(3),
    getGitHubData(),
  ])

  const profile = profileResult.data || null
  const skills = skillsResult.data || []
  const projects = projectsResult.data || []
  const experiences = experienceResult.data || []
  const blogs = blogsResult.data || []

  return (
    <HomePageClient
      profile={profile}
      skills={skills}
      projects={projects}
      experiences={experiences}
      blogs={blogs}
      githubData={githubData}
    />
  )
}
