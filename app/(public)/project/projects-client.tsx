"use client"

import { useState, useEffect } from "react"
import { TerminalText } from "@/components/terminal-text"
import { ProjectCard } from "@/components/project-card"
import { Badge } from "@/components/ui/badge"
import { SearchFilter } from "@/components/search-filter"
import { FileCode } from "lucide-react"

interface ProjectsClientProps {
  initialProjects: any[]
}

export default function ProjectsClient({ initialProjects }: ProjectsClientProps) {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
  }, [])

  const [projects] = useState(initialProjects)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  
  // Extract all unique tags as categories plus "All"
  // Or stick to the predefined ones if user prefers
  const categories = ["All", "Web Development", "Machine Learning", "DevOps", "Cybersecurity", "Open Source"]

  // Filter projects based on search query and selected category
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags?.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory =
      selectedCategory === "All" ||
      // project.category === selectedCategory || // We don't have category column yet, using tags or logic
      project.tags?.some((tag: string) => tag === selectedCategory || tag.includes(selectedCategory))

    return matchesSearch && matchesCategory
  })

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-terminal-bright">
            <TerminalText text="Projects" typingDelay={80} showCursor={false}/>
          </h1>
          <p className="text-terminal-green/80 max-w-2xl">
            A collection of my work spanning web development, machine learning, and cybersecurity. Each project
            represents a unique challenge and solution.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <SearchFilter
            placeholder="Search projects..."
            onSearch={setSearchQuery}
            className="w-full sm:w-auto sm:flex-1"
          />

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={category === selectedCategory ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                image={project.thumbnail_url || project.images?.[0] || "/placeholder.svg"} 
                tags={project.tags || []}
                githubUrl={project.github_url}
                liveUrl={project.live_url}
                slug={project.slug}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border border-terminal-green/20 rounded-md">
            <FileCode className="w-12 h-12 text-terminal-green/40 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-terminal-bright mb-2">No projects found</h3>
            <p className="text-terminal-green/60">
              No projects match your search criteria. Try adjusting your search or filters.
            </p>
          </div>
        )}

        {/* Open Source Contributions - Static for now or fetch later */}
        <div className="mt-12 pt-8 border-t border-terminal-green/20">
          <h2 className="text-2xl font-bold text-terminal-bright mb-6">Open Source Contributions</h2>
           {/* ... keeping static content or removing if user prefers only dynamic ... */}
           <p className="text-terminal-green/60 italic">Open source contributions section...</p>
        </div>
      </div>
    </div>
  )
}
