"use client"

import { useState, useMemo } from "react"
import { GitHubRepo, GitHubStats, CURATED_FEATURED_REPOS } from "@/lib/github"
import { GitHubStatsSection } from "@/components/github-stats"
import { GitHubRepoCard } from "@/components/github-repo-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Search,
  Filter,
  ArrowUpDown,
  AlertCircle,
  ExternalLink,
  FolderGit2,
  GitBranch,
  Archive,
  ChevronDown,
  WandSparkles,
} from "lucide-react"

interface GitHubReposSectionProps {
  stats: GitHubStats
  repositories: GitHubRepo[]
  featuredRepositories?: GitHubRepo[]
  error: string | null
  isRateLimited: boolean
  username?: string
}

type SortOption = "pushed" | "stars" | "forks" | "name"

export function GitHubReposSection({
  stats,
  repositories,
  featuredRepositories = [],
  error,
  isRateLimited,
  username = "sa001gar",
}: GitHubReposSectionProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState<string>("All")
  const [sortBy, setSortBy] = useState<SortOption>("pushed")
  const [hideForks, setHideForks] = useState(true)
  const [hideArchived, setHideArchived] = useState(true)
  const [featuredOnly, setFeaturedOnly] = useState(false)
  const [visibleCount, setVisibleCount] = useState(12)

  // Extract featured IDs and names
  const featuredIds = useMemo(() => {
    return new Set(featuredRepositories.map((r) => r.id))
  }, [featuredRepositories])

  // Extract unique languages sorted by count
  const availableLanguages = useMemo(() => {
    const counts: Record<string, number> = {}
    repositories.forEach((repo) => {
      if (repo.language) {
        counts[repo.language] = (counts[repo.language] || 0) + 1
      }
    })
    const sorted = Object.entries(counts)
      .sort(([, a], [, b]) => b - a)
      .map(([lang]) => lang)
    return ["All", ...sorted]
  }, [repositories])

  // Filter and Sort Repositories (Always prioritizing featured repositories first)
  const filteredAndSortedRepos = useMemo(() => {
    return repositories
      .filter((repo) => {
        // Forks filter
        if (hideForks && repo.isFork) return false
        // Archived filter
        if (hideArchived && repo.isArchived) return false

        // Featured Only filter
        const isFeatured = featuredIds.has(repo.id) || CURATED_FEATURED_REPOS.includes(repo.name)
        if (featuredOnly && !isFeatured) return false

        // Language filter
        if (selectedLanguage !== "All" && repo.language !== selectedLanguage) {
          return false
        }

        // Search Query filter
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase()
          const nameMatches = repo.name.toLowerCase().includes(query)
          const descMatches = repo.description?.toLowerCase().includes(query)
          const topicMatches = repo.topics?.some((t) => t.toLowerCase().includes(query))
          if (!nameMatches && !descMatches && !topicMatches) {
            return false
          }
        }

        return true
      })
      .sort((a, b) => {
        const aIsFeatured = featuredIds.has(a.id) || CURATED_FEATURED_REPOS.includes(a.name)
        const bIsFeatured = featuredIds.has(b.id) || CURATED_FEATURED_REPOS.includes(b.name)

        // Always show featured projects first!
        if (aIsFeatured && !bIsFeatured) return -1
        if (!aIsFeatured && bIsFeatured) return 1

        if (sortBy === "stars") {
          return b.stars - a.stars || new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime()
        }
        if (sortBy === "forks") {
          return b.forks - a.forks || new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime()
        }
        if (sortBy === "name") {
          return a.name.localeCompare(b.name)
        }
        // Default: most recently pushed
        return new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime()
      })
  }, [repositories, hideForks, hideArchived, featuredOnly, selectedLanguage, searchQuery, sortBy, featuredIds])

  const displayedRepos = filteredAndSortedRepos.slice(0, visibleCount)
  const hasMore = visibleCount < filteredAndSortedRepos.length

  return (
    <div className="space-y-8">
      {/* Rate Limit / Error Banner */}
      {(error || isRateLimited) && (
        <div className="border border-yellow-500/30 bg-yellow-500/10 rounded-md p-4 flex items-start gap-3 text-sm font-mono text-yellow-300">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-yellow-400 mt-0.5" />
          <div className="flex-1">
            <p className="font-bold">
              {isRateLimited ? "GitHub API Rate Limit Note" : "Notice"}
            </p>
            <p className="text-yellow-300/80 text-xs mt-1">
              {error ||
                "Live GitHub requests are temporarily subject to unauthenticated rate limits. Showing cached or fallback data."}
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="border-yellow-500/40 hover:bg-yellow-500/20 text-yellow-300 text-xs"
          >
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </Button>
        </div>
      )}

      {/* Developer Statistics */}
      <GitHubStatsSection stats={stats} username={username} />

      {/* Repositories Explorer Header */}
      <div className="space-y-4 pt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold font-mono text-terminal-bright flex items-center gap-2">
              <FolderGit2 className="w-6 h-6 text-terminal-green" />
              Public Repositories
            </h3>
            <p className="text-xs text-terminal-green/70 font-mono mt-1">
              Live data from GitHub REST API • Showing {filteredAndSortedRepos.length} repositories (Featured prioritized first)
            </p>
          </div>

          {/* Quick Config Toggles: Featured First, Hide Forks & Hide Archived */}
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setFeaturedOnly(!featuredOnly)}
              className={`text-xs font-mono border-yellow-500/30 ${
                featuredOnly
                  ? "bg-yellow-500/15 text-yellow-300 border-yellow-500/50"
                  : "text-terminal-green/70 hover:text-terminal-bright"
              }`}
            >
              <WandSparkles className="w-3 h-3 mr-1 text-yellow-400" />
              {featuredOnly ? "Showing Featured Only" : "Featured First"}
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setHideForks(!hideForks)}
              className={`text-xs font-mono border-terminal-green/20 ${
                hideForks
                  ? "bg-terminal-green/10 text-terminal-bright border-terminal-green/40"
                  : "text-terminal-green/60"
              }`}
            >
              <GitBranch className="w-3 h-3 mr-1" />
              {hideForks ? "Forks Hidden" : "Showing Forks"}
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setHideArchived(!hideArchived)}
              className={`text-xs font-mono border-terminal-green/20 ${
                hideArchived
                  ? "bg-terminal-green/10 text-terminal-bright border-terminal-green/40"
                  : "text-terminal-green/60"
              }`}
            >
              <Archive className="w-3 h-3 mr-1" />
              {hideArchived ? "Archived Hidden" : "Showing Archived"}
            </Button>
          </div>
        </div>

        {/* Filters and Search Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-terminal-green/50 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <Input
              type="text"
              placeholder="Search repositories by name, topic, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-terminal-black border-terminal-green/20 text-terminal-bright text-xs placeholder:text-terminal-green/40 focus:border-terminal-green font-mono"
            />
          </div>

          {/* Sort Selector */}
          <div className="md:col-span-4 flex items-center space-x-2">
            <ArrowUpDown className="w-4 h-4 text-terminal-green/50 flex-shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="w-full bg-terminal-black border border-terminal-green/20 text-terminal-bright text-xs rounded-md px-3 py-2 font-mono focus:outline-none focus:border-terminal-green"
              aria-label="Sort repositories"
            >
              <option value="pushed">Featured First (Recently Active)</option>
              <option value="stars">Featured First (Most Stars)</option>
              <option value="forks">Featured First (Most Forks)</option>
              <option value="name">Featured First (Name A-Z)</option>
            </select>
          </div>

          {/* Active Filter summary */}
          <div className="md:col-span-3 text-right hidden md:block">
            <span className="text-xs font-mono text-terminal-green/60">
              Showing {displayedRepos.length} of {filteredAndSortedRepos.length}
            </span>
          </div>
        </div>

        {/* Language Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-xs font-mono text-terminal-green/60 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            Lang:
          </span>
          {availableLanguages.slice(0, 8).map((lang) => (
            <Badge
              key={lang}
              variant={selectedLanguage === lang ? "default" : "outline"}
              onClick={() => setSelectedLanguage(lang)}
              className={`cursor-pointer text-xs font-mono transition-colors ${
                selectedLanguage === lang
                  ? "bg-terminal-green text-terminal-black font-semibold"
                  : "border-terminal-green/20 text-terminal-green/80 hover:border-terminal-green/50"
              }`}
            >
              {lang}
            </Badge>
          ))}
        </div>
      </div>

      {/* Repositories Grid */}
      {displayedRepos.length > 0 ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayedRepos.map((repo) => {
              const isCurated =
                featuredIds.has(repo.id) || CURATED_FEATURED_REPOS.includes(repo.name)
              return (
                <GitHubRepoCard
                  key={repo.id}
                  repo={repo}
                  isFeatured={isCurated}
                />
              )
            })}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="flex justify-center pt-4">
              <Button
                variant="outline"
                onClick={() => setVisibleCount((prev) => prev + 12)}
                className="border-terminal-green/30 hover:border-terminal-green text-terminal-bright hover:bg-terminal-green/10 font-mono text-xs"
              >
                Load More Repositories ({filteredAndSortedRepos.length - displayedRepos.length} remaining)
                <ChevronDown className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </div>
          )}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-12 border border-terminal-green/20 rounded-md bg-terminal-green/[0.02]">
          <FolderGit2 className="w-10 h-10 text-terminal-green/40 mx-auto mb-3" />
          <h4 className="text-base font-bold font-mono text-terminal-bright mb-1">
            No repositories found
          </h4>
          <p className="text-xs text-terminal-green/60 font-mono max-w-sm mx-auto mb-4">
            No repositories matched your filters or search query. Try resetting filters or searching for something else.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchQuery("")
              setSelectedLanguage("All")
              setHideForks(false)
              setHideArchived(false)
              setFeaturedOnly(false)
            }}
            className="border-terminal-green/30 text-terminal-bright text-xs font-mono"
          >
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  )
}
