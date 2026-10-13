"use client"

import { useState, useEffect } from "react"
import { TerminalText } from "@/components/terminal-text"
import { ProjectCard } from "@/components/project-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SearchFilter } from "@/components/search-filter"
import { FileCode, WandSparkles, FolderGit2, ArrowRight } from "lucide-react"
import { FaGithub } from "react-icons/fa"
import { GitHubData } from "@/lib/github"
import { GitHubReposSection } from "@/components/github-repos-section"
import { GitHubStatsSection } from "@/components/github-stats"

interface ProjectsClientProps {
  initialProjects: any[]
  githubData?: GitHubData
}

export default function ProjectsClient({ initialProjects, githubData }: ProjectsClientProps) {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })

    // Activate GitHub tab if URL query parameter ?tab=github is present
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      if (params.get("tab") === "github") {
        setActiveTab("github")
      }
    }
  }, [])

  const [activeTab, setActiveTab] = useState<"curated" | "github">("curated")
  const [projects] = useState(initialProjects)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", "Web Development", "Machine Learning", "DevOps", "Cybersecurity", "Open Source"]

  // Filter curated projects based on search query and selected category
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags?.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory =
      selectedCategory === "All" ||
      project.tags?.some((tag: string) => tag === selectedCategory || tag.includes(selectedCategory))

    return matchesSearch && matchesCategory
  })

  const totalGitHubRepos = githubData?.stats?.totalRepos || githubData?.repositories?.length || 0

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold font-mono text-terminal-bright">
            <TerminalText text="Projects & Open Source" typingDelay={60} showCursor={false} />
          </h1>
          <p className="text-terminal-green/80 max-w-2xl text-sm md:text-base">
            Explore curated portfolio showcases alongside live public repositories and developer statistics synced with the GitHub REST API.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex border border-terminal-green/20 rounded-md p-1 bg-terminal-black max-w-md">
          <button
            type="button"
            onClick={() => setActiveTab("curated")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded text-xs font-mono transition-all ${
              activeTab === "curated"
                ? "bg-terminal-green text-terminal-black font-bold shadow-sm"
                : "text-terminal-green/70 hover:text-terminal-bright"
            }`}
          >
            <WandSparkles className="w-3.5 h-3.5" />
            <span>Showcase Projects ({projects.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("github")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded text-xs font-mono transition-all ${
              activeTab === "github"
                ? "bg-terminal-green text-terminal-black font-bold shadow-sm"
                : "text-terminal-green/70 hover:text-terminal-bright"
            }`}
          >
            <FaGithub className="w-3.5 h-3.5" />
            <span>GitHub Repos ({totalGitHubRepos})</span>
          </button>
        </div>

        {/* TAB 1: CURATED SHOWCASE PROJECTS */}
        {activeTab === "curated" && (
          <div className="space-y-8">
            {/* Search and Category Filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <SearchFilter
                placeholder="Search curated projects..."
                onSearch={setSearchQuery}
                className="w-full sm:w-auto sm:flex-1"
              />

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={category === selectedCategory ? "default" : "outline"}
                    className="cursor-pointer font-mono text-xs"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Curated Projects Grid */}
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
                <h3 className="text-xl font-bold text-terminal-bright mb-2 font-mono">No projects found</h3>
                <p className="text-terminal-green/60 text-xs font-mono">
                  No projects match your search criteria. Try adjusting your search or filters.
                </p>
              </div>
            )}

            {/* GitHub Integration Teaser Banner */}
            {githubData && (
              <div className="mt-12 pt-8 border-t border-terminal-green/20 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-terminal-bright font-mono flex items-center gap-2">
                      <FaGithub className="w-6 h-6 text-terminal-green" />
                      Live GitHub Activity
                    </h2>
                    <p className="text-xs text-terminal-green/70 font-mono mt-1">
                      Real-time stats from GitHub REST API across all {totalGitHubRepos} public repositories.
                    </p>
                  </div>

                  <Button
                    onClick={() => setActiveTab("github")}
                    className="bg-terminal-green text-terminal-black hover:bg-terminal-bright font-mono text-xs font-bold"
                  >
                    Explore All Repositories ({totalGitHubRepos})
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </div>

                {/* Developer Stats Section */}
                <GitHubStatsSection stats={githubData.stats} username="sa001gar" />
              </div>
            )}
          </div>
        )}

        {/* TAB 2: GITHUB & OPEN SOURCE EXPLORER */}
        {activeTab === "github" && (
          <div>
            {githubData ? (
              <GitHubReposSection
                stats={githubData.stats}
                repositories={githubData.repositories}
                featuredRepositories={githubData.featuredRepositories}
                error={githubData.error}
                isRateLimited={githubData.isRateLimited}
                username="sa001gar"
              />
            ) : (
              <div className="text-center py-12 border border-terminal-green/20 rounded-md">
                <FolderGit2 className="w-12 h-12 text-terminal-green/40 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-terminal-bright mb-2 font-mono">
                  GitHub Data Loading
                </h3>
                <p className="text-terminal-green/60 text-xs font-mono">
                  Fetching live developer statistics and repositories...
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
