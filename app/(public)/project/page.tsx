import { createClient } from "@/lib/supabase/server"
import ProjectsClient from "./projects-client"

export default async function ProjectsPage() {
  const supabase = await createClient()
  const { data: projects } = await supabase.from("projects").select("*").order("featured", { ascending: false })

  return <ProjectsClient initialProjects={projects || []} />
}
