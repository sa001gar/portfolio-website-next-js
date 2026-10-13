"use client"

import { Star, GitFork, ExternalLink, WandSparkles, Archive, GitBranch } from "lucide-react"
import { GitHubRepo, LANGUAGE_COLORS, DEFAULT_LANGUAGE_COLOR } from "@/lib/github"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface GitHubRepoCardProps {
  repo: GitHubRepo
  isFeatured?: boolean
  className?: string
}

function formatRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return "just now"
    const diffInMinutes = Math.floor(diffInSeconds / 60)
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 30) return `${diffInDays}d ago`
    const diffInMonths = Math.floor(diffInDays / 30)
    if (diffInMonths < 12) return `${diffInMonths}mo ago`

    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  } catch {
    return "recently"
  }
}

export function GitHubRepoCard({ repo, isFeatured, className }: GitHubRepoCardProps) {
  const languageColor = repo.language
    ? LANGUAGE_COLORS[repo.language] || DEFAULT_LANGUAGE_COLOR
    : DEFAULT_LANGUAGE_COLOR

  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between bg-terminal-black border border-terminal-green/20 rounded-md p-5 transition-all duration-300 hover:border-terminal-green/60 hover:shadow-glow",
        isFeatured && "border-terminal-green/40 bg-terminal-green/[0.02]",
        className
      )}
    >
      <div>
        {/* Header row: Repo Name and External Link */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2 flex-wrap min-w-0">
            <a
              href={repo.htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-bold font-mono text-terminal-bright hover:underline truncate group-hover:text-terminal-green transition-colors"
              title={repo.name}
            >
              {repo.name}
            </a>

            {isFeatured && (
              <Badge
                variant="outline"
                className="text-[10px] px-1.5 py-0 border-yellow-500/40 text-yellow-400 bg-yellow-500/10 flex items-center gap-1 font-mono"
              >
                <WandSparkles className="w-2.5 h-2.5" />
                Featured
              </Badge>
            )}

            {repo.isFork && (
              <Badge
                variant="outline"
                className="text-[10px] px-1.5 py-0 border-terminal-green/30 text-terminal-green/70 flex items-center gap-1 font-mono"
              >
                <GitBranch className="w-2.5 h-2.5" />
                Fork
              </Badge>
            )}

            {repo.isArchived && (
              <Badge
                variant="outline"
                className="text-[10px] px-1.5 py-0 border-red-500/30 text-red-400 flex items-center gap-1 font-mono"
              >
                <Archive className="w-2.5 h-2.5" />
                Archived
              </Badge>
            )}
          </div>

          <a
            href={repo.htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open repository ${repo.name} on GitHub (opens in a new tab)`}
            className="text-terminal-green/50 hover:text-terminal-bright p-1 rounded transition-colors flex-shrink-0"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Description */}
        <p className="text-xs text-terminal-green/75 leading-relaxed line-clamp-3 mb-4 min-h-[36px]">
          {repo.description || "No description provided for this repository."}
        </p>

        {/* Topics / Tags */}
        {repo.topics && repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {repo.topics.slice(0, 4).map((topic) => (
              <Badge
                key={topic}
                variant="outline"
                className="text-[10px] px-2 py-0.5 border-terminal-green/20 text-terminal-green/80 bg-terminal-green/5 font-mono"
              >
                #{topic}
              </Badge>
            ))}
            {repo.topics.length > 4 && (
              <span className="text-[10px] text-terminal-green/50 font-mono self-center">
                +{repo.topics.length - 4}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer Meta: Language, Stars, Forks, Updated */}
      <div className="pt-3 border-t border-terminal-green/10 flex items-center justify-between text-xs font-mono text-terminal-green/70">
        <div className="flex items-center space-x-3">
          {repo.language ? (
            <div className="flex items-center space-x-1.5">
              <span
                className="w-2 h-2 rounded-full inline-block flex-shrink-0"
                style={{ backgroundColor: languageColor }}
              />
              <span className="text-terminal-bright">{repo.language}</span>
            </div>
          ) : (
            <span className="text-terminal-green/50">Markdown</span>
          )}

          <div className="flex items-center space-x-1 hover:text-terminal-bright transition-colors" title={`${repo.stars} stars`}>
            <Star className="w-3.5 h-3.5 text-yellow-400/80" />
            <span>{repo.stars}</span>
          </div>

          <div className="flex items-center space-x-1 hover:text-terminal-bright transition-colors" title={`${repo.forks} forks`}>
            <GitFork className="w-3.5 h-3.5 text-terminal-green/80" />
            <span>{repo.forks}</span>
          </div>
        </div>

        <span className="text-[11px] text-terminal-green/50" title={`Pushed on ${repo.pushedAt}`}>
          Updated {formatRelativeTime(repo.pushedAt || repo.updatedAt)}
        </span>
      </div>
    </div>
  )
}
