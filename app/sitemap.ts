import type { MetadataRoute } from "next"

// Mock data - in a real app, this would come from your database or CMS
const blogPosts = [
  { slug: "building-secure-apis-fastapi-jwt", lastModified: "2023-11-15" },
  { slug: "ml-anomaly-detection-network-traffic", lastModified: "2023-10-22" },
  { slug: "optimizing-nextjs-applications-performance", lastModified: "2023-09-18" },
  { slug: "containerization-best-practices-docker-kubernetes", lastModified: "2023-08-05" },
  { slug: "real-time-dashboard-react-websockets", lastModified: "2023-07-12" },
]

const projects = [
  { slug: "kitto-ai", lastModified: "2024-05-01" },
  { slug: "electricity-theft-detection", lastModified: "2024-04-18" },
  { slug: "applied-physio-website", lastModified: "2024-03-30" },
  { slug: "college-website-redesign", lastModified: "2024-03-10" },
  { slug: "stress-detection", lastModified: "2024-02-28" },
  { slug: "api-testing-extension", lastModified: "2024-01-25" },
  { slug: "ai-code-editor", lastModified: "2023-12-15" },
  { slug: "retro-diary-app", lastModified: "2024-12-15" }
]


export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://portfolio.sagarkundu.live"

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/project`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/experience`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    },
  ]

  // Dynamic blog pages
  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.lastModified),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  // Dynamic project pages
  const projectPages = projects.map((project) => ({
    url: `${baseUrl}/project/${project.slug}`,
    lastModified: new Date(project.lastModified),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  return [...staticPages, ...blogPages, ...projectPages]
}
