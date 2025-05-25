"use client"

import { useState, useEffect } from "react"
import { TerminalText } from "@/components/terminal-text"
import { ProjectCard } from "@/components/project-card"
import { Badge } from "@/components/ui/badge"
import { SearchFilter } from "@/components/search-filter"
import { FileCode } from "lucide-react"

// Mock project data
const projects = [
  {
    id: 1,
    title: "Applied Physio – Brand Website",
    description: "SEO-optimized website for a physiotherapy brand using Tailwind CSS and JavaScript.",
    image: "/projects/applied-physio/main.avif",
    tags: ["HTML", "Tailwind CSS", "JavaScript"],
    githubUrl: "https://github.com/sa001gar/applied-physio-website",
    liveUrl: "https://appliedphysio.in",
    slug: "applied-physio-website",
    category: "Brand Website"
  },
  {
    id: 2,
    title: "Kitto AI – Write Better",
    description: "Django-powered AI writing assistant that generates content with real-time word count and responsive UI.",
    image: "https://img.freepik.com/free-photo/3d-render-robot-using-laptop_34663-47.jpg",
    tags: ["Django", "AWS EC2", "RDS", "S3", "Cloudflare CDN"],
    githubUrl: "https://github.com/sa001gar/ai_project_aws_deployment",
    liveUrl: "https://kittoai.sagarkundu.live",
    slug: "kitto-ai",
    category: "AI Writing Assistant"
  },
  {
    id: 3,
    title: "Smart Electricity Theft Detection System",
    description: "Detects unauthorized electricity usage using Arduino sensors with real-time monitoring and Flask backend.",
    image: "https://github.com/sa001gar/portfolio-vite/blob/main/images/smart-electricity-theft-dashboard.png?raw=true",
    tags: ["Flask", "Next.js", "Arduino", "Python"],
    githubUrl: "https://github.com/sa001gar/Smart-Electricity-Theft-Detection",
    slug: "electricity-theft-detection",
    category: "IoT & Energy"
  },
  {
    id: 4,
    title: "College Website Redesign",
    description: "Modern redesign of a college website with better accessibility and performance using HTML and Tailwind.",
    image: "https://img.freepik.com/free-photo/education-concept-with-books-laptop_23-2148535203.jpg",
    tags: ["HTML", "Tailwind CSS", "JavaScript"],
    githubUrl: "https://github.com/sa001gar/college-website-redesign",
    liveUrl: "https://redesign-mccs.sagarkundu.live",
    slug: "college-website-redesign",
    category: "Web Redesign"
  },
  {
    id: 5,
    title: "Stress Detection Using Smartwatch",
    description: "Machine learning-based stress analysis using smartwatch sensor data with real-time feedback.",
    image: "https://raw.githubusercontent.com/sa001gar/portfolio-vite/refs/heads/main/images/stress.webp",
    tags: ["Python", "Flask", "Machine Learning"],
    githubUrl: "https://github.com/sa001gar/Stress-Detection-using-Smart-Watch",
    slug: "stress-detection",
    category: "Health Tech"
  },
  {
    id: 6,
    title: "API Testing Chrome Extension",
    description: "Lightweight Chrome extension for intuitive and fast API testing with live response previews.",
    image: "https://raw.githubusercontent.com/sa001gar/portfolio-vite/refs/heads/main/images/api-testing.webp",
    tags: ["JavaScript", "HTML", "CSS"],
    githubUrl: "https://github.com/sa001gar/api-testing-extension",
    slug: "api-testing-extension",
    category: "Developer Tool"
  },
  {
    id: 7,
    title: "AI Code Editor & Code Guru",
    description: "AI-powered code editor with real-time suggestions, syntax highlighting, and debugging features.",
    image: "https://raw.githubusercontent.com/sa001gar/portfolio-vite/main/images/ai-code-editor.jpg",
    tags: ["React", "Flask", "JavaScript"],
    githubUrl: "https://github.com/sa001gar/gurukul",
    slug: "ai-code-editor",
    category: "Developer Tool"
  },
  {
    id: 8,
    title: "Retro Diary",
    description: "A nostalgic diary web app with a vintage UI for personal journaling and reflection.",
    image: "https://raw.githubusercontent.com/sa001gar/portfolio-vite/main/images/retro-diary.jpg",
    tags: ["HTML", "CSS", "JavaScript", "Django"],
    githubUrl: "https://github.com/sa001gar/retro-diary",
    slug: "retro-diary-app",
    category: "Productivity"
  }



]

// Categories for filtering
const categories = ["All", "Web Development", "Machine Learning", "DevOps", "Cybersecurity", "Open Source"]

export default function ProjectsPage() {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
  }, [])

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
