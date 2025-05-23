"use client"

import { useState } from "react"
import { TerminalText } from "@/components/terminal-text"
import { ProjectCard } from "@/components/project-card"
import { Badge } from "@/components/ui/badge"
import { SearchFilter } from "@/components/search-filter"
import { FileCode } from "lucide-react"

// Mock project data
const projects = [
  {
    id: 1,
    title: "AI Code Analyzer",
    description:
      "Machine learning tool that analyzes code repositories to identify security vulnerabilities and quality issues.",
    image: "/projects/code-analyzer.jpg",
    tags: ["Python", "TensorFlow", "React", "AWS"],
    githubUrl: "https://github.com/sagarkundu/code-analyzer",
    liveUrl: "https://code-analyzer.example.com",
    slug: "code-analyzer",
    category: "Machine Learning",
  },
  {
    id: 2,
    title: "Smart Home Dashboard",
    description: "IoT dashboard for monitoring and controlling smart home devices with real-time analytics.",
    image: "/projects/smart-home.jpg",
    tags: ["Next.js", "TypeScript", "MQTT", "Docker"],
    githubUrl: "https://github.com/sagarkundu/smart-home",
    liveUrl: "https://smart-home.example.com",
    slug: "smart-home",
    category: "Web Development",
  },
  {
    id: 3,
    title: "Secure File Sharing",
    description: "End-to-end encrypted file sharing platform with zero-knowledge architecture.",
    image: "/projects/secure-share.jpg",
    tags: ["Go", "React", "Cryptography", "AWS"],
    githubUrl: "https://github.com/sagarkundu/secure-share",
    liveUrl: "https://secure-share.example.com",
    slug: "secure-share",
    category: "Cybersecurity",
  },
  {
    id: 4,
    title: "ML Stock Predictor",
    description: "Stock market prediction tool using machine learning and sentiment analysis.",
    image: "/projects/stock-predictor.jpg",
    tags: ["Python", "scikit-learn", "NLP", "FastAPI"],
    githubUrl: "https://github.com/sagarkundu/stock-predictor",
    slug: "stock-predictor",
    category: "Machine Learning",
  },
  {
    id: 5,
    title: "DevOps Automation Suite",
    description: "Comprehensive toolset for automating CI/CD pipelines and infrastructure management.",
    image: "/projects/devops-suite.jpg",
    tags: ["Terraform", "Ansible", "GitHub Actions", "Kubernetes"],
    githubUrl: "https://github.com/sagarkundu/devops-suite",
    slug: "devops-suite",
    category: "DevOps",
  },
  {
    id: 6,
    title: "Bug Bounty Platform",
    description: "Platform for managing and tracking bug bounty programs with automated vulnerability verification.",
    image: "/projects/bug-bounty.jpg",
    tags: ["Django", "React", "PostgreSQL", "Docker"],
    githubUrl: "https://github.com/sagarkundu/bug-bounty",
    liveUrl: "https://bug-bounty.example.com",
    slug: "bug-bounty",
    category: "Cybersecurity",
  },
]

// Categories for filtering
const categories = ["All", "Web Development", "Machine Learning", "DevOps", "Cybersecurity", "Open Source"]

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  // Filter projects based on search query and selected category
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory =
      selectedCategory === "All" ||
      project.category === selectedCategory ||
      project.tags.some((tag) => tag === selectedCategory)

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
                image={project.image}
                tags={project.tags}
                githubUrl={project.githubUrl}
                liveUrl={project.liveUrl}
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

        {/* Open Source Contributions */}
        <div className="mt-12 pt-8 border-t border-terminal-green/20">
          <h2 className="text-2xl font-bold text-terminal-bright mb-6">Open Source Contributions</h2>

          <div className="space-y-4">
            <div className="border border-terminal-green/20 rounded-md p-4 hover:border-terminal-green/50 transition-all">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-terminal-bright font-medium">TensorFlow</h3>
                  <p className="text-terminal-green/80 text-sm mt-1">
                    Contributed to the TensorFlow library with performance optimizations and bug fixes.
                  </p>
                </div>
                <Badge variant="outline" className="bg-terminal-green/5">
                  Contributor
                </Badge>
              </div>
              <div className="mt-3 flex gap-2">
                <Badge variant="secondary" className="text-xs">
                  Python
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  C++
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Machine Learning
                </Badge>
              </div>
            </div>

            <div className="border border-terminal-green/20 rounded-md p-4 hover:border-terminal-green/50 transition-all">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-terminal-bright font-medium">Next.js</h3>
                  <p className="text-terminal-green/80 text-sm mt-1">
                    Helped improve documentation and contributed examples for the Next.js framework.
                  </p>
                </div>
                <Badge variant="outline" className="bg-terminal-green/5">
                  Contributor
                </Badge>
              </div>
              <div className="mt-3 flex gap-2">
                <Badge variant="secondary" className="text-xs">
                  JavaScript
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  TypeScript
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  React
                </Badge>
              </div>
            </div>

            <div className="border border-terminal-green/20 rounded-md p-4 hover:border-terminal-green/50 transition-all">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-terminal-bright font-medium">Django REST Framework</h3>
                  <p className="text-terminal-green/80 text-sm mt-1">
                    Contributed security enhancements and performance optimizations to Django REST Framework.
                  </p>
                </div>
                <Badge variant="outline" className="bg-terminal-green/5">
                  Contributor
                </Badge>
              </div>
              <div className="mt-3 flex gap-2">
                <Badge variant="secondary" className="text-xs">
                  Python
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Django
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  API
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
