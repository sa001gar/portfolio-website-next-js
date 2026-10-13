"use client"

import { FaGithub } from "react-icons/fa"
import { GitFork, Star, FolderGit2, Users, ExternalLink, Code2 } from "lucide-react"
import { GitHubStats } from "@/lib/github"
import { Button } from "@/components/ui/button"

interface GitHubStatsProps {
  stats: GitHubStats
  username?: string
}

export function GitHubStatsSection({ stats, username = "sa001gar" }: GitHubStatsProps) {
  const profile = stats.userProfile

  return (
    <div className="bg-terminal-black border border-terminal-green/20 rounded-md p-6 space-y-6 shadow-sm">
      {/* Header with Profile Link */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-terminal-green/20">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-terminal-green/10 border border-terminal-green/30 rounded-md text-terminal-bright">
            <FaGithub className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold text-terminal-bright">
                {profile?.name || username}
              </h2>
              <span className="text-xs text-terminal-green/60 font-mono">
                @{profile?.login || username}
              </span>
            </div>
            {profile?.bio && (
              <p className="text-xs text-terminal-green/80 mt-0.5 line-clamp-1">
                {profile.bio}
              </p>
            )}
          </div>
        </div>

        <Button
          asChild
          variant="outline"
          size="sm"
          className="border-terminal-green/30 hover:border-terminal-green text-terminal-bright hover:bg-terminal-green/10 text-xs font-mono"
        >
          <a
            href={profile?.htmlUrl || `https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit GitHub Profile (opens in new tab)"
            className="flex items-center space-x-1.5"
          >
            <span>github.com/{username}</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1" />
          </a>
        </Button>
      </div>

      {/* Numerical Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-md border border-terminal-green/15 bg-terminal-green/5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-terminal-green/70 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Public Repos</span>
            <FolderGit2 className="w-4 h-4 text-terminal-green" />
          </div>
          <span className="text-2xl sm:text-3xl font-bold font-mono text-terminal-bright">
            {stats.totalRepos || profile?.publicRepos || 0}
          </span>
        </div>

        <div className="p-4 rounded-md border border-terminal-green/15 bg-terminal-green/5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-terminal-green/70 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Total Stars</span>
            <Star className="w-4 h-4 text-yellow-400" />
          </div>
          <span className="text-2xl sm:text-3xl font-bold font-mono text-terminal-bright">
            {stats.totalStars}
          </span>
        </div>

        <div className="p-4 rounded-md border border-terminal-green/15 bg-terminal-green/5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-terminal-green/70 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Total Forks</span>
            <GitFork className="w-4 h-4 text-terminal-green" />
          </div>
          <span className="text-2xl sm:text-3xl font-bold font-mono text-terminal-bright">
            {stats.totalForks}
          </span>
        </div>

        <div className="p-4 rounded-md border border-terminal-green/15 bg-terminal-green/5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-terminal-green/70 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Followers</span>
            <Users className="w-4 h-4 text-terminal-green" />
          </div>
          <span className="text-2xl sm:text-3xl font-bold font-mono text-terminal-bright">
            {profile?.followers || 0}
          </span>
        </div>
      </div>

      {/* Top Languages Breakdown */}
      {stats.topLanguages.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-terminal-green/70 uppercase tracking-wider flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-terminal-bright" />
              Primary Languages
            </span>
            <span className="text-xs text-terminal-green/50 font-mono">
              Across public repositories
            </span>
          </div>

          {/* Multi-segmented percentage bar */}
          <div className="h-2 w-full bg-terminal-green/10 rounded-full overflow-hidden flex">
            {stats.topLanguages.map((lang) => (
              <div
                key={lang.language}
                style={{
                  width: `${lang.percentage}%`,
                  backgroundColor: lang.color,
                }}
                className="h-full transition-all duration-500"
                title={`${lang.language}: ${lang.percentage}% (${lang.count} repos)`}
              />
            ))}
          </div>

          {/* Language Legend */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 pt-1">
            {stats.topLanguages.map((lang) => (
              <div key={lang.language} className="flex items-center space-x-1.5 text-xs font-mono">
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block flex-shrink-0"
                  style={{ backgroundColor: lang.color }}
                />
                <span className="text-terminal-bright font-medium">{lang.language}</span>
                <span className="text-terminal-green/60">
                  {lang.percentage}% ({lang.count})
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
