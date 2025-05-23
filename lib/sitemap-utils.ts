// Utility functions for sitemap generation
export interface SitemapEntry {
  slug: string
  lastModified: string
}

// In a real application, these would fetch from your database or CMS
export async function getBlogPostsForSitemap(): Promise<SitemapEntry[]> {
  // This would typically be a database query
  return [
    { slug: "building-secure-apis-fastapi-jwt", lastModified: "2023-11-15" },
    { slug: "ml-anomaly-detection-network-traffic", lastModified: "2023-10-22" },
    { slug: "optimizing-nextjs-applications-performance", lastModified: "2023-09-18" },
    { slug: "containerization-best-practices-docker-kubernetes", lastModified: "2023-08-05" },
    { slug: "real-time-dashboard-react-websockets", lastModified: "2023-07-12" },
  ]
}

export async function getProjectsForSitemap(): Promise<SitemapEntry[]> {
  // This would typically be a database query
  return [
    { slug: "code-analyzer", lastModified: "2023-11-01" },
    { slug: "smart-home", lastModified: "2023-10-15" },
    { slug: "secure-share", lastModified: "2023-09-20" },
    { slug: "stock-predictor", lastModified: "2023-08-10" },
    { slug: "devops-suite", lastModified: "2023-07-25" },
    { slug: "bug-bounty", lastModified: "2023-06-30" },
  ]
}

export function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_BASE_URL || "https://your-portfolio-domain.com"
}
