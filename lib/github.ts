export interface GitHubRepo {
  id: number
  name: string
  fullName: string
  htmlUrl: string
  description: string | null
  language: string | null
  stars: number
  forks: number
  topics: string[]
  updatedAt: string
  pushedAt: string
  isFork: boolean
  isArchived: boolean
  homepage: string | null
  visibility: string
}

export interface LanguageStat {
  language: string
  count: number
  percentage: number
  color: string
}

export interface GitHubStats {
  totalRepos: number
  totalStars: number
  totalForks: number
  topLanguages: LanguageStat[]
  userProfile: {
    login: string
    avatarUrl: string
    htmlUrl: string
    name: string | null
    bio: string | null
    publicRepos: number
    followers: number
    following: number
  } | null
}

export interface GitHubData {
  stats: GitHubStats
  repositories: GitHubRepo[]
  featuredRepositories: GitHubRepo[]
  error: string | null
  isRateLimited: boolean
}

// GitHub language colors mapping
export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Go: "#00ADD8",
  Rust: "#dea584",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Dart: "#00B4AB",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Vue: "#41b883",
  Jupyter: "#DA5B0B",
  "Jupyter Notebook": "#DA5B0B",
}

export const DEFAULT_LANGUAGE_COLOR = "#00ff66"

// Configurable list of prioritized repository names
export const CURATED_FEATURED_REPOS = [
  "portfolio-website-next-js",
  "gopherqueue",
  "kookie-cli",
  "visitor-count",
  "beta-Applied-Physio",
  "The-Applied-Physio",
  "dtnhs",
  "ai_project_aws_deployment",
  "nearby-guardians",
  "fastapi-jwt-auth",
]

const GITHUB_USERNAME = "sa001gar"
const REVALIDATE_SECONDS = 21600 // 6 hours cache revalidation

/**
 * Server-side helper to fetch GitHub data with Next.js caching.
 */
export async function getGitHubData(): Promise<GitHubData> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "Portfolio-App-sa001gar",
  }

  // Include optional token if defined to increase rate limits from 60 to 5,000 req/hr
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  try {
    // 1. Fetch User Profile
    const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      headers,
      next: { revalidate: REVALIDATE_SECONDS },
    })

    if (userRes.status === 403 || userRes.status === 429) {
      return getFallbackData("GitHub API rate limit exceeded. Please try again later.", true)
    }

    if (!userRes.ok) {
      return getFallbackData(`GitHub API returned status ${userRes.status}`)
    }

    const userData = await userRes.json()

    // 2. Fetch Repositories with pagination support
    const totalPublicRepos = userData.public_repos || 0
    const perPage = 100
    const totalPages = Math.min(Math.ceil(totalPublicRepos / perPage) || 1, 3) // Cap at 3 pages (300 repos)

    const pagePromises = []
    for (let page = 1; page <= totalPages; page++) {
      pagePromises.push(
        fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=${perPage}&page=${page}`,
          {
            headers,
            next: { revalidate: REVALIDATE_SECONDS },
          }
        ).then(async (res) => {
          if (!res.ok) return []
          return res.json()
        })
      )
    }

    const pagesData = await Promise.all(pagePromises)
    const rawRepos = pagesData.flat()

    if (!Array.isArray(rawRepos)) {
      return getFallbackData("Invalid repository response from GitHub.")
    }

    // 3. Normalize Repositories
    const repositories: GitHubRepo[] = rawRepos.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      htmlUrl: repo.html_url,
      description: repo.description || null,
      language: repo.language || null,
      stars: repo.stargazers_count || 0,
      forks: repo.forks_count || 0,
      topics: Array.isArray(repo.topics) ? repo.topics : [],
      updatedAt: repo.updated_at,
      pushedAt: repo.pushed_at,
      isFork: Boolean(repo.fork),
      isArchived: Boolean(repo.archived),
      homepage: repo.homepage || null,
      visibility: repo.visibility || "public",
    }))

    // 4. Compute Statistics
    let totalStars = 0
    let totalForks = 0
    const languageCounts: Record<string, number> = {}

    repositories.forEach((repo) => {
      totalStars += repo.stars
      totalForks += repo.forks

      if (repo.language) {
        languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1
      }
    })

    const totalLanguageTaggedRepos = Object.values(languageCounts).reduce((a, b) => a + b, 0) || 1
    const topLanguages: LanguageStat[] = Object.entries(languageCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 6)
      .map(([language, count]) => ({
        language,
        count,
        percentage: Math.round((count / totalLanguageTaggedRepos) * 100),
        color: LANGUAGE_COLORS[language] || DEFAULT_LANGUAGE_COLOR,
      }))

    // 5. Select Featured Repositories
    // Prioritize curated repo names, then top-starred non-fork repos
    const nonForkNonArchived = repositories.filter((r) => !r.isFork && !r.isArchived)
    const curatedMatches = nonForkNonArchived.filter((r) =>
      CURATED_FEATURED_REPOS.includes(r.name)
    )
    const otherTopStarred = nonForkNonArchived
      .filter((r) => !CURATED_FEATURED_REPOS.includes(r.name))
      .sort((a, b) => b.stars - a.stars || new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime())

    const featuredRepositories = [...curatedMatches, ...otherTopStarred].slice(0, 6)

    const stats: GitHubStats = {
      totalRepos: repositories.length,
      totalStars,
      totalForks,
      topLanguages,
      userProfile: {
        login: userData.login,
        avatarUrl: userData.avatar_url,
        htmlUrl: userData.html_url,
        name: userData.name || null,
        bio: userData.bio || null,
        publicRepos: userData.public_repos || repositories.length,
        followers: userData.followers || 0,
        following: userData.following || 0,
      },
    }

    return {
      stats,
      repositories,
      featuredRepositories,
      error: null,
      isRateLimited: false,
    }
  } catch (err: any) {
    console.error("Error fetching GitHub data:", err)
    return getFallbackData(err?.message || "Failed to connect to GitHub API.")
  }
}

function getFallbackData(error: string, isRateLimited = false): GitHubData {
  return {
    stats: {
      totalRepos: 0,
      totalStars: 0,
      totalForks: 0,
      topLanguages: [],
      userProfile: null,
    },
    repositories: [],
    featuredRepositories: [],
    error,
    isRateLimited,
  }
}
