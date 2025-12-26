import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { TerminalWindow } from "@/components/terminal-window"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Github, ExternalLink } from "lucide-react"

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const supabase = await createClient()
  const { slug } = await params
  
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single()

  if (!project) {
    notFound()
  }

  // Fetch related projects (by tags) - limit 2
  let relatedProjects: any[] = []
  if (project.tags && project.tags.length > 0) {
      const { data: related } = await supabase
        .from("projects")
        .select("id, title, slug")
        .neq("id", project.id)
        .overlaps("tags", project.tags) 
        .limit(2)
      
      relatedProjects = related || []
  }

  // Helper to render basic markdown (headings, bold, newlines)
  const renderMarkdown = (text: string) => {
    if (!text) return "";
    return text
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold text-terminal-bright mb-4 mt-6">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold text-terminal-bright mb-3 mt-6">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold text-terminal-bright mb-3 mt-5">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, "<br />")
  }

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Link */}
        <Link
          href="/project"
          className="inline-flex items-center text-terminal-green hover:text-terminal-bright transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to all projects
        </Link>

        {/* Project Header */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-terminal-bright">{project.title}</h1>
          <p className="text-terminal-green/80 text-lg">{project.description}</p>

          <div className="flex flex-wrap gap-2">
            {project.tags?.map((tag: string) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            {project.github_url && (
              <Button variant="outline" size="sm" asChild>
                <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  View Source
                </a>
              </Button>
            )}
            {project.live_url && (
              <Button size="sm" asChild>
                <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Project Image */}
        {project.image_url && (
             <div className="relative h-64 md:h-80 rounded-md overflow-hidden border border-terminal-green/30 shadow-glow">
                <Image src={project.image_url} alt={project.title} fill className="object-cover" />
            </div>
        )}

        {/* Project Content */}
        {project.content && (
            <TerminalWindow title={`${project.slug}.md`}>
            <div className="prose prose-invert prose-terminal max-w-none">
                <div
                className="markdown-content"
                dangerouslySetInnerHTML={{
                    __html: renderMarkdown(project.content)
                }}
                />
            </div>
            </TerminalWindow>
        )}
        
        {/* Simple Features handling if buried in content, else omitted as structured data is not in schema yet */}
      </div>
    </div>
  )
}
