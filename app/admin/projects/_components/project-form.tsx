"use client"

import { useState } from "react"
import { createProject, updateProject } from "@/app/admin/projects/actions"
import { useRouter } from "next/navigation"
import { Loader2, Save, ArrowLeft, Plus, Trash2, X } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { RichTextEditor } from "@/components/rich-text-editor"
import { ImageUploader } from "@/components/image-uploader"

interface ProjectFormProps {
  project?: any
  isEdit?: boolean
}

// Helper function to generate slug from title
const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

export function ProjectForm({ project, isEdit = false }: ProjectFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [content, setContent] = useState(project?.content || "")
  const [contributors, setContributors] = useState<any[]>(project?.contributors || [])
  const [images, setImages] = useState<string[]>(project?.images || [])
  const [title, setTitle] = useState(project?.title || "")
  const [slug, setSlug] = useState(project?.slug || "")

  // Auto-generate slug when title changes
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    setTitle(newTitle)
    setSlug(generateSlug(newTitle))
  }
  
  const router = useRouter()

  const handleContributorChange = (index: number, field: string, value: string) => {
    const newContributors = [...contributors]
    newContributors[index] = { ...newContributors[index], [field]: value }
    setContributors(newContributors)
  }

  const addContributor = () => {
    setContributors([...contributors, { name: "", role: "", url: "", avatar_url: "" }])
  }

  const removeContributor = (index: number) => {
    setContributors(contributors.filter((_, i) => i !== index))
  }



  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    
    // Append rich text content
    formData.set("content", content)
    
    // Append JSON fields
    formData.set("contributors", JSON.stringify(contributors))
    formData.set("images", JSON.stringify(images))

    let result

    if (isEdit && project) {
      result = await updateProject(project.id, formData)
    } else {
      result = await createProject(formData)
    }

    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto pb-10">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/admin/projects" className="flex items-center text-terminal-green hover:text-terminal-bright">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Projects
        </Link>
        <h1 className="text-2xl font-bold text-terminal-bright">
          {isEdit ? `Edit Project: ${project.title}` : "New Project"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Main Info */}
        <div className="border border-terminal-green/20 rounded-lg p-6 bg-terminal-black/50 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-mono text-terminal-green/80 uppercase">Title</label>
              <input
                name="title"
                value={title}
                onChange={handleTitleChange}
                required
                className="w-full bg-terminal-black border border-terminal-green/30 rounded px-3 py-2 text-terminal-green focus:outline-none focus:border-terminal-bright"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-mono text-terminal-green/80 uppercase">Slug</label>
              <input
                name="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="auto-generated-from-title"
                className="w-full bg-terminal-black border border-terminal-green/30 rounded px-3 py-2 text-terminal-green focus:outline-none focus:border-terminal-bright"
              />
              <p className="text-xs text-terminal-green/50">Auto-generated from title. You can edit manually.</p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-mono text-terminal-green/80 uppercase">Description (Excerpt)</label>
            <textarea
              name="description"
              defaultValue={project?.description}
              rows={3}
              className="w-full bg-terminal-black border border-terminal-green/30 rounded px-3 py-2 text-terminal-green focus:outline-none focus:border-terminal-bright"
            />
          </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <label className="text-sm font-mono text-terminal-green/80 uppercase">GitHub URL</label>
                <input
                name="github_url"
                defaultValue={project?.github_url}
                className="w-full bg-terminal-black border border-terminal-green/30 rounded px-3 py-2 text-terminal-green focus:outline-none focus:border-terminal-bright"
                />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-mono text-terminal-green/80 uppercase">Live URL</label>
                <input
                name="live_url"
                defaultValue={project?.live_url}
                className="w-full bg-terminal-black border border-terminal-green/30 rounded px-3 py-2 text-terminal-green focus:outline-none focus:border-terminal-bright"
                />
            </div>
           </div>

           <div className="space-y-2">
            <label className="text-sm font-mono text-terminal-green/80 uppercase">Tags (comma separated)</label>
            <input
                name="tags"
                defaultValue={project?.tags?.join(", ")}
                placeholder="React, Next.js, CSS"
                className="w-full bg-terminal-black border border-terminal-green/30 rounded px-3 py-2 text-terminal-green focus:outline-none focus:border-terminal-bright"
            />
           </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="featured"
              id="featured"
              defaultChecked={project?.featured}
              className="h-4 w-4 rounded border-terminal-green/30 bg-terminal-black text-terminal-green"
            />
            <label htmlFor="featured" className="text-sm font-mono text-terminal-green/80 uppercase select-none cursor-pointer">
              Featured Project
            </label>
          </div>
        </div>

        {/* Content */}
        <div className="border border-terminal-green/20 rounded-lg p-6 bg-terminal-black/50 space-y-2">
          <label className="text-sm font-mono text-terminal-green/80 uppercase">Content (Rich Text)</label>
          <RichTextEditor content={content} onChange={setContent} placeholder="Write your project details..." />
        </div>

        {/* Shoutout */}
        <div className="border border-terminal-green/20 rounded-lg p-6 bg-terminal-black/50 space-y-2">
             <label className="text-sm font-mono text-terminal-green/80 uppercase">Shoutout / Acknowledgement</label>
             <textarea
              name="shoutout"
              defaultValue={project?.shoutout}
              rows={2}
              placeholder="Special thanks to..."
              className="w-full bg-terminal-black border border-terminal-green/30 rounded px-3 py-2 text-terminal-green focus:outline-none focus:border-terminal-bright"
            />
        </div>

        {/* Contributors */}
        <div className="border border-terminal-green/20 rounded-lg p-6 bg-terminal-black/50 space-y-4">
            <div className="flex items-center justify-between">
                <label className="text-sm font-mono text-terminal-green/80 uppercase">Contributors</label>
                <Button type="button" onClick={addContributor} variant="outline" size="sm" className="text-xs">
                    <Plus className="w-3 h-3 mr-1" /> Add Contributor
                </Button>
            </div>
            
            {contributors.length === 0 && (
                <p className="text-sm text-terminal-green/50 italic">No contributors added.</p>
            )}

            <div className="space-y-4">
                {contributors.map((contributor, index) => (
                    <div key={index} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end border border-terminal-green/10 p-4 rounded text-sm relative">
                        <Button
                            type="button"
                            onClick={() => removeContributor(index)}
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 h-6 w-6 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                            <Trash2 className="w-3 h-3" />
                        </Button>
                        <div className="space-y-1">
                            <span className="text-xs font-mono text-terminal-green/70">Name</span>
                            <input
                                value={contributor.name}
                                onChange={(e) => handleContributorChange(index, "name", e.target.value)}
                                className="w-full bg-terminal-black border border-terminal-green/30 rounded px-2 py-1"
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="space-y-1">
                            <span className="text-xs font-mono text-terminal-green/70">Role</span>
                            <input
                                value={contributor.role}
                                onChange={(e) => handleContributorChange(index, "role", e.target.value)}
                                className="w-full bg-terminal-black border border-terminal-green/30 rounded px-2 py-1"
                                placeholder="Designer"
                            />
                        </div>
                        <div className="space-y-1">
                            <span className="text-xs font-mono text-terminal-green/70">Avatar URL</span>
                            <input
                                value={contributor.avatar_url}
                                onChange={(e) => handleContributorChange(index, "avatar_url", e.target.value)}
                                className="w-full bg-terminal-black border border-terminal-green/30 rounded px-2 py-1"
                                placeholder="https://..."
                            />
                        </div>
                         <div className="space-y-1">
                            <span className="text-xs font-mono text-terminal-green/70">Profile URL</span>
                            <input
                                value={contributor.url}
                                onChange={(e) => handleContributorChange(index, "url", e.target.value)}
                                className="w-full bg-terminal-black border border-terminal-green/30 rounded px-2 py-1"
                                placeholder="https://..."
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>

          {/* Project Images */}
          <div className="border border-terminal-green/20 rounded-lg p-6 bg-terminal-black/50 space-y-4">
             <label className="text-sm font-mono text-terminal-green/80 uppercase">Project Gallery</label>
             <ImageUploader 
               multiple 
               value={images} 
               onChange={(val) => setImages(val as string[])} 
               folder="projects"
             />
          </div>


        {error && (
          <div className="p-3 border border-red-500/30 bg-red-500/10 text-red-500 text-sm rounded font-mono">
            Error: {error}
          </div>
        )}

        <div className="pt-4 border-t border-terminal-green/20 flex justify-end">
          <Button
            type="submit"
            disabled={loading}
            className="bg-terminal-green text-terminal-black hover:bg-terminal-green/90 font-bold"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" /> Save Project
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
