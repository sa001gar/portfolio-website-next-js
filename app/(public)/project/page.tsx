import { createClient } from "@/lib/supabase/server"
import { getGitHubData } from "@/lib/github"
import ProjectsClient from "./projects-client"

export default async function ProjectsPage() {
  const supabase = await createClient()

  // Fetch Supabase curated projects and GitHub API data in parallel
  const [projectsResult, githubData] = await Promise.all([
    supabase.from("projects").select("*").order("featured", { ascending: false }),
    getGitHubData(),
  ])

  return (
    <ProjectsClient
      initialProjects={projectsResult.data || []}
      githubData={githubData}
    />
  )
}

