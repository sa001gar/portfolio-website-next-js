"use client"

import { useEffect, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Code,
  Briefcase,
  FileText,
  User,
  Mail,
  WandSparkles,
  ExternalLink,
  Star,
  GitFork,
  CheckCircle2,
  Calendar,
  MapPin,
  Terminal,
  Layers,
  Cpu,
  Shield,
  FolderGit2,
} from "lucide-react"
import { FaGithub } from "react-icons/fa"

import { TerminalWindow } from "@/components/terminal-window"
import { TerminalCommand } from "@/components/terminal-command"
import { CommandLine } from "@/components/command-line"
import { TerminalText } from "@/components/terminal-text"
import { ProjectCard } from "@/components/project-card"
import { GitHubRepoCard } from "@/components/github-repo-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GitHubData, LANGUAGE_COLORS, DEFAULT_LANGUAGE_COLOR } from "@/lib/github"

interface HomePageClientProps {
  profile: any
  skills: any[]
  projects: any[]
  experiences: any[]
  blogs: any[]
  githubData: GitHubData | null
}

function formatDisplayDate(dateStr: string | null | undefined): string {
  if (!dateStr) return ""
  try {
    if (/^[A-Za-z]{3}\s+\d{4}$/.test(dateStr.trim())) {
      return dateStr.trim()
    }
    const parts = dateStr.split("-")
    if (parts.length >= 2) {
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      const mIdx = parseInt(parts[1], 10) - 1
      if (mIdx >= 0 && mIdx < 12) {
        return `${monthNames[mIdx]} ${parts[0]}`
      }
    }
    const date = new Date(dateStr)
    if (!isNaN(date.getTime())) {
      return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
    }
    return dateStr
  } catch {
    return dateStr || ""
  }
}

export default function HomePageClient({
  profile,
  skills,
  projects,
  experiences,
  blogs,
  githubData,
}: HomePageClientProps) {
  useEffect(() => {
    // Smooth scroll to top on mount
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
  }, [])

  // Dynamic Profile metadata with intelligent fallbacks
  const name = profile?.full_name || "Sagar Kundu"
  const currentExp = experiences[0]
  const title = profile?.title || currentExp?.title || "SDE & Tech Lead"
  const company = currentExp?.company || "Clustrix Tech Solutions"
  const location = profile?.location || currentExp?.location?.split("·")[0]?.trim() || "Durgapur, West Bengal, India"
  const bio =
    profile?.bio ||
    currentExp?.description ||
    "Leading architecture and development of scalable web platforms, high-performance backends in Go and Rust, and distributed infrastructure."
  const avatarUrl = profile?.avatar_url || "/sagarkundu_square.avif"

  // Aggregate skills dynamically across skills table, experience technologies, and project tags
  const dynamicGroupedSkills = useMemo(() => {
    // If DB skills table is populated with multiple categories, prioritize it
    if (skills && skills.length > 3) {
      return skills.reduce((acc: Record<string, string[]>, skill: any) => {
        const cat = skill.category || "General"
        if (!acc[cat]) acc[cat] = []
        acc[cat].push(skill.name)
        return acc
      }, {})
    }

    // Otherwise, dynamically construct a categorized skills matrix from verified experience & projects
    const expTechs = Array.from(new Set(experiences.flatMap((e) => e.technologies || [])))
    const projectTags = Array.from(new Set(projects.flatMap((p) => p.tags || [])))
    const allSet = new Set([...expTechs, ...projectTags])

    const frontendKeywords = ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML", "CSS", "Tiptap"]
    const backendKeywords = ["Go", "Rust", "Node.js", "FastAPI", "Python", "REST APIs", "Microservices", "Job Queues", "BoltDB", "Distributed Systems"]
    const cloudKeywords = ["PostgreSQL", "Supabase", "Cloudflare", "Docker", "Cloud Infrastructure", "DevOps", "Database"]
    const securityAiKeywords = ["Web Application Security", "Cryptography", "AI", "LLM", "Document Processing", "System Architecture", "Performance Optimization"]

    const frontend = Array.from(allSet).filter((t) => frontendKeywords.some((k) => t.toLowerCase() === k.toLowerCase()))
    const backend = Array.from(allSet).filter((t) => backendKeywords.some((k) => t.toLowerCase() === k.toLowerCase()))
    const cloud = Array.from(allSet).filter((t) => cloudKeywords.some((k) => t.toLowerCase() === k.toLowerCase()))
    const securityAi = Array.from(allSet).filter((t) => securityAiKeywords.some((k) => t.toLowerCase() === k.toLowerCase()))

    return {
      "Backend & Systems": backend.length ? backend : ["Go", "Rust", "Node.js", "FastAPI", "Distributed Systems"],
      "Frontend & UI": frontend.length ? frontend : ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      "Cloud & Data": cloud.length ? cloud : ["PostgreSQL", "Cloudflare", "Docker", "Supabase"],
      "Security & AI": securityAi.length ? securityAi : ["Web Application Security", "Cryptography", "LLM", "AI"],
    }
  }, [skills, experiences, projects])

  // Featured projects: sorted featured first, limit to 6 for landing page
  const featuredProjects = useMemo(() => {
    const featured = projects.filter((p) => p.featured)
    const remaining = projects.filter((p) => !p.featured)
    return [...featured, ...remaining].slice(0, 6)
  }, [projects])

  // GitHub metrics
  const githubStats = githubData?.stats
  const totalRepos = githubStats?.totalRepos || (githubData?.repositories?.length ?? 106)
  const totalStars = githubStats?.totalStars || 17
  const topLanguages = githubStats?.topLanguages || []

  // Top featured GitHub repos (limit to 3)
  const showcaseGithubRepos = useMemo(() => {
    if (!githubData?.repositories?.length) return []
    if (githubData.featuredRepositories?.length) {
      return githubData.featuredRepositories.slice(0, 3)
    }
    return [...githubData.repositories]
      .sort((a, b) => b.stars - a.stars || new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime())
      .slice(0, 3)
  }, [githubData])

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen space-y-16">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* ========================================================= */}
        {/* HERO SECTION                                              */}
        {/* ========================================================= */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center pt-4">
          <div className="md:col-span-2 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-terminal-green/30 bg-terminal-green/5 text-xs font-mono text-terminal-green">
              <span className="w-2 h-2 rounded-full bg-terminal-green animate-pulse" />
              <span>Available for Architecture & Engineering Leadership</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-terminal-bright tracking-tight">
                <TerminalText text={name} typingDelay={70} showCursor={false} />
              </h1>
              <h2 className="text-xl md:text-2xl text-terminal-green font-mono flex items-center gap-2">
                <span>&gt;</span>
                <TerminalText text={`${title} @ ${company}`} typingDelay={35} showCursor={false} />
              </h2>
            </div>

            <p className="text-terminal-green/85 text-base md:text-lg leading-relaxed max-w-2xl font-sans">
              {bio}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button asChild className="bg-terminal-green text-terminal-black hover:bg-terminal-bright font-mono font-bold shadow-glow">
                <Link href="/project">
                  View Projects ({projects.length}) <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild className="border-terminal-green/40 text-terminal-bright hover:border-terminal-green font-mono">
                <Link href="/experience">Work Experience</Link>
              </Button>
              <Button variant="ghost" asChild className="text-terminal-green hover:text-terminal-bright hover:bg-terminal-green/10 font-mono">
                <Link href="/contact">Contact Me</Link>
              </Button>
            </div>
          </div>

          {/* Profile Image with Terminal Frame */}
          <div className="flex justify-center md:justify-end">
            <div className="relative group">
              <div className="relative w-52 h-52 md:w-60 md:h-60 rounded-2xl overflow-hidden border-2 border-terminal-green/40 shadow-glow bg-terminal-black">
                <Image
                  src={avatarUrl}
                  alt={name}
                  fill
                  priority
                  sizes="(max-width: 768px) 208px, 240px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-terminal-black/70 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-terminal-black border border-terminal-green/40 px-3 py-1 rounded-md text-[11px] font-mono text-terminal-green flex items-center gap-1.5 shadow-lg">
                <MapPin className="w-3 h-3 text-terminal-bright" />
                <span>{location}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* TELEMETRY / STATS STRIP                                    */}
        {/* ========================================================= */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-lg bg-terminal-black/60 border border-terminal-green/20">
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-terminal-green/60">Curated Systems</span>
            <div className="text-2xl md:text-3xl font-bold font-mono text-terminal-bright flex items-baseline gap-1.5">
              <span>{projects.length}</span>
              <span className="text-xs text-terminal-green/70 font-normal">projects</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-terminal-green/60">Public Repositories</span>
            <div className="text-2xl md:text-3xl font-bold font-mono text-terminal-bright flex items-baseline gap-1.5">
              <span>{totalRepos}</span>
              <span className="text-xs text-terminal-green/70 font-normal">on GitHub</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-terminal-green/60">GitHub Stars</span>
            <div className="text-2xl md:text-3xl font-bold font-mono text-yellow-400 flex items-baseline gap-1.5">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 self-center" />
              <span>{totalStars}</span>
              <span className="text-xs text-terminal-green/70 font-normal">stars</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-terminal-green/60">Current Role</span>
            <div className="text-sm md:text-base font-bold font-mono text-terminal-bright truncate" title={`${title} @ ${company}`}>
              {title}
            </div>
            <div className="text-xs text-terminal-green/70 truncate">{company}</div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* INTERACTIVE TERMINAL WINDOW                                */}
        {/* ========================================================= */}
        <section>
          <TerminalWindow title="sagar@kundu:~/portfolio">
            <TerminalCommand
              command="whoami"
              output={
                <div className="space-y-1 font-mono text-sm">
                  <div className="text-terminal-bright font-bold">{name}</div>
                  <div className="text-terminal-green">{title} &bull; {company}</div>
                  <div className="text-terminal-green/70 text-xs flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{location}</span>
                  </div>
                </div>
              }
            />

            <TerminalCommand
              command="cat ./stack.json"
              output={
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-1">
                  {Object.entries(dynamicGroupedSkills).map(([category, skillNames]) => (
                    <div key={category} className="space-y-1.5">
                      <p className="text-terminal-bright font-mono text-xs font-semibold uppercase tracking-wider border-b border-terminal-green/20 pb-1">
                        {category}
                      </p>
                      <ul className="text-xs font-mono space-y-1 text-terminal-green/85">
                        {skillNames.map((sName) => (
                          <li key={sName} className="flex items-center gap-1.5">
                            <span className="text-terminal-green/40">&bull;</span>
                            <span>{sName}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              }
            />

            {githubStats && (
              <TerminalCommand
                command="curl -s api.github.com/users/sa001gar"
                output={
                  <div className="space-y-1.5 font-mono text-xs text-terminal-green/85">
                    <div className="flex flex-wrap gap-4 text-terminal-bright">
                      <span>Public Repos: <strong className="text-terminal-green">{totalRepos}</strong></span>
                      <span>Total Stars: <strong className="text-yellow-400">{totalStars}</strong></span>
                      <span>Followers: <strong className="text-terminal-green">{githubStats.userProfile?.followers ?? 15}</strong></span>
                    </div>
                    {topLanguages.length > 0 && (
                      <div className="text-[11px] text-terminal-green/70 pt-1">
                        Top Languages: {topLanguages.slice(0, 5).map((l) => `${l.language} (${l.percentage}%)`).join(", ")}
                      </div>
                    )}
                  </div>
                }
              />
            )}

            <CommandLine autoFocus />
          </TerminalWindow>
        </section>

        {/* ========================================================= */}
        {/* FEATURED PROJECTS (2 lines title, 2 lines desc, 3 chips) */}
        {/* ========================================================= */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-terminal-green/20 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-terminal-green/70 uppercase tracking-wider mb-1">
                <WandSparkles className="w-3.5 h-3.5 text-terminal-green" />
                <span>$ ls ./projects --featured</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold font-mono text-terminal-bright">
                Featured Projects
              </h2>
              <p className="text-xs sm:text-sm text-terminal-green/75 font-mono mt-1">
                Handpicked production platforms, local-first tools, and distributed architectures.
              </p>
            </div>

            <Button variant="outline" asChild className="border-terminal-green/30 text-terminal-green hover:text-terminal-bright font-mono text-xs self-start sm:self-auto">
              <Link href="/project">
                View All Projects ({projects.length}) <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>

          {/* 3-Column Uniform Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.id || project.slug}
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

          <div className="text-center pt-2">
            <Button asChild variant="outline" className="border-terminal-green/40 hover:border-terminal-green font-mono text-xs">
              <Link href="/project">
                Explore Full Project Archive &amp; Live GitHub Repository Search ({totalRepos}) &rarr;
              </Link>
            </Button>
          </div>
        </section>

        {/* ========================================================= */}
        {/* LIVE GITHUB ACTIVITY HIGHLIGHTS                            */}
        {/* ========================================================= */}
        {githubData && (
          <section className="space-y-6 pt-4 border-t border-terminal-green/20">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-terminal-green/70 uppercase tracking-wider mb-1">
                  <FaGithub className="w-3.5 h-3.5 text-terminal-green" />
                  <span>$ gh api /user/repos --live</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold font-mono text-terminal-bright flex items-center gap-2">
                  Live GitHub Activity
                </h2>
                <p className="text-xs sm:text-sm text-terminal-green/75 font-mono mt-1">
                  Synchronized in real-time from the official GitHub REST API across all {totalRepos} public repositories.
                </p>
              </div>

              <Button variant="outline" asChild className="border-terminal-green/30 text-terminal-green hover:text-terminal-bright font-mono text-xs self-start sm:self-auto">
                <Link href="/project#github-repos">
                  Open Repository Explorer ({totalRepos}) <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>

            {/* Language Distribution Bar */}
            {topLanguages.length > 0 && (
              <div className="bg-terminal-black border border-terminal-green/20 rounded-md p-4 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-terminal-bright font-semibold">Language Breakdown Across All Repos</span>
                  <span className="text-terminal-green/60">Top {topLanguages.length} Languages</span>
                </div>

                <div className="h-2.5 w-full bg-terminal-black/80 rounded-full overflow-hidden flex border border-terminal-green/20">
                  {topLanguages.map((lang) => (
                    <div
                      key={lang.language}
                      style={{
                        width: `${lang.percentage}%`,
                        backgroundColor: lang.color || LANGUAGE_COLORS[lang.language] || DEFAULT_LANGUAGE_COLOR,
                      }}
                      title={`${lang.language}: ${lang.percentage}% (${lang.count} repos)`}
                      className="h-full transition-all duration-300"
                    />
                  ))}
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs font-mono pt-1">
                  {topLanguages.slice(0, 7).map((lang) => (
                    <div key={lang.language} className="flex items-center space-x-1.5">
                      <span
                        className="w-2 h-2 rounded-full inline-block flex-shrink-0"
                        style={{ backgroundColor: lang.color || LANGUAGE_COLORS[lang.language] || DEFAULT_LANGUAGE_COLOR }}
                      />
                      <span className="text-terminal-green/90">{lang.language}</span>
                      <span className="text-terminal-green/50 text-[11px]">{lang.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Top Showcase Repos */}
            {showcaseGithubRepos.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {showcaseGithubRepos.map((repo) => (
                  <GitHubRepoCard key={repo.id} repo={repo} isFeatured={repo.stars > 0} />
                ))}
              </div>
            )}
          </section>
        )}

        {/* ========================================================= */}
        {/* WORK EXPERIENCE PREVIEW (Dynamic from database)            */}
        {/* ========================================================= */}
        {experiences.length > 0 && (
          <section className="space-y-6 pt-4 border-t border-terminal-green/20">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-terminal-green/70 uppercase tracking-wider mb-1">
                  <Briefcase className="w-3.5 h-3.5 text-terminal-green" />
                  <span>$ tail -n 2 ./experience.log</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold font-mono text-terminal-bright">
                  Work Experience
                </h2>
                <p className="text-xs sm:text-sm text-terminal-green/75 font-mono mt-1">
                  Production leadership, distributed systems development, and security research.
                </p>
              </div>

              <Button variant="outline" asChild className="border-terminal-green/30 text-terminal-green hover:text-terminal-bright font-mono text-xs self-start sm:self-auto">
                <Link href="/experience">
                  Full Career &amp; Education &rarr;
                </Link>
              </Button>
            </div>

            <div className="space-y-4">
              {experiences.slice(0, 2).map((exp) => (
                <div
                  key={exp.id}
                  className="bg-terminal-black border border-terminal-green/20 rounded-md p-5 space-y-3 hover:border-terminal-green/50 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-terminal-green/15 pb-3">
                    <div>
                      <h3 className="text-lg font-bold font-mono text-terminal-bright flex items-center gap-2">
                        <span>{exp.title}</span>
                        {exp.current && (
                          <Badge variant="outline" className="text-[10px] bg-terminal-green/10 border-terminal-green/40 text-terminal-bright font-mono">
                            Current
                          </Badge>
                        )}
                      </h3>
                      <div className="text-sm font-mono text-terminal-green">
                        {exp.company}
                        {exp.location && <span className="text-terminal-green/60 ml-2">&bull; {exp.location}</span>}
                      </div>
                    </div>

                    <div className="text-xs font-mono text-terminal-green/70 flex items-center gap-1.5 self-start sm:self-auto">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>
                        {formatDisplayDate(exp.start_date)} &mdash; {exp.current ? "Present" : formatDisplayDate(exp.end_date)}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm font-sans text-terminal-green/85 leading-relaxed">
                    {exp.description}
                  </p>

                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="space-y-1.5 pt-1">
                      {exp.achievements.slice(0, 2).map((ach: string, idx: number) => (
                        <li key={idx} className="flex items-start text-xs font-mono text-terminal-green/80">
                          <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-terminal-green flex-shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {exp.technologies.slice(0, 8).map((tech: string) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="text-[11px] font-mono py-0.5 px-2 bg-terminal-green/5 border-terminal-green/20 text-terminal-green/85"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {exp.technologies.length > 8 && (
                        <span className="text-[11px] font-mono text-terminal-green/50 self-center">
                          +{exp.technologies.length - 8} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================= */}
        {/* RECENT ARTICLES (Dynamic from Supabase blogs)             */}
        {/* ========================================================= */}
        {blogs.length > 0 && (
          <section className="space-y-6 pt-4 border-t border-terminal-green/20">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-terminal-green/70 uppercase tracking-wider mb-1">
                  <FileText className="w-3.5 h-3.5 text-terminal-green" />
                  <span>$ ls ./blog --recent</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold font-mono text-terminal-bright">
                  Recent Technical Writing
                </h2>
                <p className="text-xs sm:text-sm text-terminal-green/75 font-mono mt-1">
                  Technical writeups, architectural deep dives, and system notes.
                </p>
              </div>

              <Button variant="outline" asChild className="border-terminal-green/30 text-terminal-green hover:text-terminal-bright font-mono text-xs self-start sm:self-auto">
                <Link href="/blog">
                  Read All Articles ({blogs.length}) &rarr;
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {blogs.map((post) => (
                <Link key={post.id || post.slug} href={`/blog/${post.slug}`} className="group block">
                  <div className="h-full bg-terminal-black border border-terminal-green/20 rounded-md p-5 space-y-2.5 hover:border-terminal-green/50 hover:shadow-glow transition-all">
                    <div className="text-xs font-mono text-terminal-green/60">
                      {formatDisplayDate(post.publish_date || post.created_at)}
                    </div>
                    <h3 className="text-lg font-bold font-mono text-terminal-bright group-hover:text-terminal-green transition-colors line-clamp-1">
                      {post.title}
                    </h3>
                    <p className="text-sm font-sans text-terminal-green/75 line-clamp-2 leading-relaxed">
                      {post.excerpt || "Click to read full technical breakdown and code examples."}
                    </p>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-2">
                        {post.tags.slice(0, 3).map((tag: string) => (
                          <Badge key={tag} variant="outline" className="text-[10px] font-mono border-terminal-green/20 text-terminal-green/70">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================= */}
        {/* DYNAMIC QUICK TERMINAL DIRECTORY                           */}
        {/* ========================================================= */}
        <section className="space-y-4 pt-4 border-t border-terminal-green/20">
          <div className="text-xs font-mono text-terminal-green/70 uppercase tracking-wider">
            $ cd /portfolio/sections
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/project" className="group">
              <div className="h-full border border-terminal-green/20 rounded-md p-4 hover:border-terminal-green/50 hover:bg-terminal-green/5 transition-all">
                <div className="flex items-center mb-2">
                  <Code className="h-5 w-5 text-terminal-bright mr-2 group-hover:text-terminal-green transition-colors" />
                  <h3 className="text-base font-bold font-mono text-terminal-bright">
                    Projects ({projects.length})
                  </h3>
                </div>
                <p className="text-terminal-green/80 text-xs font-sans mb-3 leading-relaxed">
                  Explore {projects.length} curated systems plus {totalRepos} live GitHub repositories with interactive filters.
                </p>
                <span className="text-terminal-green text-xs font-mono group-hover:text-terminal-bright transition-colors flex items-center">
                  View projects <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </div>
            </Link>

            <Link href="/experience" className="group">
              <div className="h-full border border-terminal-green/20 rounded-md p-4 hover:border-terminal-green/50 hover:bg-terminal-green/5 transition-all">
                <div className="flex items-center mb-2">
                  <Briefcase className="h-5 w-5 text-terminal-bright mr-2 group-hover:text-terminal-green transition-colors" />
                  <h3 className="text-base font-bold font-mono text-terminal-bright">
                    Experience ({experiences.length})
                  </h3>
                </div>
                <p className="text-terminal-green/80 text-xs font-sans mb-3 leading-relaxed">
                  Career journey, SDE &amp; Tech Lead responsibilities, achievements, and verified education.
                </p>
                <span className="text-terminal-green text-xs font-mono group-hover:text-terminal-bright transition-colors flex items-center">
                  View experience <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </div>
            </Link>

            <Link href="/blog" className="group">
              <div className="h-full border border-terminal-green/20 rounded-md p-4 hover:border-terminal-green/50 hover:bg-terminal-green/5 transition-all">
                <div className="flex items-center mb-2">
                  <FileText className="h-5 w-5 text-terminal-bright mr-2 group-hover:text-terminal-green transition-colors" />
                  <h3 className="text-base font-bold font-mono text-terminal-bright">
                    Blog
                  </h3>
                </div>
                <p className="text-terminal-green/80 text-xs font-sans mb-3 leading-relaxed">
                  Technical insights, articles, and architectures across distributed systems and modern web.
                </p>
                <span className="text-terminal-green text-xs font-mono group-hover:text-terminal-bright transition-colors flex items-center">
                  Read articles <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </div>
            </Link>

            <Link href="/about" className="group">
              <div className="h-full border border-terminal-green/20 rounded-md p-4 hover:border-terminal-green/50 hover:bg-terminal-green/5 transition-all">
                <div className="flex items-center mb-2">
                  <User className="h-5 w-5 text-terminal-bright mr-2 group-hover:text-terminal-green transition-colors" />
                  <h3 className="text-base font-bold font-mono text-terminal-bright">
                    About
                  </h3>
                </div>
                <p className="text-terminal-green/80 text-xs font-sans mb-3 leading-relaxed">
                  Engineering background, technical mindset, languages, and full stack toolchain.
                </p>
                <span className="text-terminal-green text-xs font-mono group-hover:text-terminal-bright transition-colors flex items-center">
                  About me <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </div>
            </Link>

            <Link href="/contact" className="group sm:col-span-2 lg:col-span-2">
              <div className="h-full border border-terminal-green/20 rounded-md p-4 hover:border-terminal-green/50 hover:bg-terminal-green/5 transition-all">
                <div className="flex items-center mb-2">
                  <Mail className="h-5 w-5 text-terminal-bright mr-2 group-hover:text-terminal-green transition-colors" />
                  <h3 className="text-base font-bold font-mono text-terminal-bright">
                    Contact &amp; Inquiries
                  </h3>
                </div>
                <p className="text-terminal-green/80 text-xs font-sans mb-3 leading-relaxed">
                  Get in touch for engineering roles, technical architecture consulting, or open-source collaboration.
                </p>
                <span className="text-terminal-green text-xs font-mono group-hover:text-terminal-bright transition-colors flex items-center">
                  Initiate contact <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
