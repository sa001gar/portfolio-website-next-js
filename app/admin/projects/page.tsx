import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { TerminalText } from "@/components/terminal-text"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react"

export default async function ProjectsPage() {
  const supabase = await createClient()
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-terminal-bright mb-2">
            <TerminalText text="projects.list()" showCursor={false} />
          </h1>
          <p className="text-terminal-green/70">Manage your portfolio projects.</p>
        </div>
        <Link href="/admin/projects/new">
          <Button className="bg-terminal-green text-terminal-black hover:bg-terminal-green/90">
            <Plus className="w-4 h-4 mr-2" /> Add Project
          </Button>
        </Link>
      </div>

      <div className="border border-terminal-green/20 rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-terminal-green/10 text-terminal-green/70 font-mono text-sm uppercase">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Tags</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-terminal-green/10">
            {projects && projects.length > 0 ? (
              projects.map((project) => (
                <tr key={project.id} className="hover:bg-terminal-green/5 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-terminal-bright">{project.title}</div>
                    <div className="text-xs text-terminal-green/50 truncate max-w-[200px]">{project.slug}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {project.tags?.slice(0, 3).map((tag: string) => (
                        <span key={tag} className="px-1.5 py-0.5 rounded text-xs bg-terminal-green/10 text-terminal-green border border-terminal-green/20">
                          {tag}
                        </span>
                      ))}
                      {project.tags?.length > 3 && (
                        <span className="text-xs text-terminal-green/50">+{project.tags.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                     {project.featured && (
                        <span className="px-2 py-1 rounded-full text-xs bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">Featured</span>
                     )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/projects/${project.id}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-terminal-green hover:text-terminal-bright hover:bg-terminal-green/20">
                          <Pencil className="w-4 h-4" />
                        </Button>
                      </Link>
                      {/* We will add delete action later */}
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-400 hover:bg-red-500/10">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-8 text-center text-terminal-green/50">
                  No projects found. Create one to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
