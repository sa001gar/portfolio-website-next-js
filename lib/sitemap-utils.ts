import { getAllBlogPosts } from "./contentful"

export async function getBlogPostsForSitemap() {
  try {
    const posts = await getAllBlogPosts()
    return posts.map((post) => ({
      slug: post.slug,
      lastModified: post.updatedAt,
      publishDate: post.publishDate,
    }))
  } catch (error) {
    console.error("Error fetching blog posts for sitemap:", error)
    return []
  }
}
