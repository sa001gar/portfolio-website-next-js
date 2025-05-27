import { createClient } from "contentful"

// if (!process.env.CONTENTFUL_SPACE_ID) {
//   throw new Error("CONTENTFUL_SPACE_ID is required")
// }

// if (!process.env.CONTENTFUL_ACCESS_TOKEN) {
//   throw new Error("CONTENTFUL_ACCESS_TOKEN is required")
// }

export const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
})

// Types for Contentful blog post
export interface ContentfulBlogPost {
  sys: {
    id: string
    createdAt: string
    updatedAt: string
  }
  fields: {
    title: string
    slug: string
    excerpt: string
    content: string
    featuredImage?: {
      fields: {
        file: {
          url: string
          details: {
            image: {
              width: number
              height: number
            }
          }
        }
        title: string
        description?: string
      }
    }
    author: string
    publishDate: string
    readTime: string
    tags: string[]
    metaDescription?: string
    featured?: boolean
  }
}

// Transformed blog post type for our app
export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage?: {
    url: string
    alt: string
    width: number
    height: number
  }
  author: string
  publishDate: Date
  readTime: string
  tags: string[]
  metaDescription?: string
  featured?: boolean
  createdAt: Date
  updatedAt: Date
}

// Transform Contentful data to our app format
export function transformBlogPost(contentfulPost: ContentfulBlogPost): BlogPost {
  const { sys, fields } = contentfulPost

  return {
    id: sys.id,
    title: fields.title,
    slug: fields.slug,
    excerpt: fields.excerpt,
    content: fields.content,
    featuredImage: fields.featuredImage
      ? {
          url: `https:${fields.featuredImage.fields.file.url}`,
          alt: fields.featuredImage.fields.title,
          width: fields.featuredImage.fields.file.details.image.width,
          height: fields.featuredImage.fields.file.details.image.height,
        }
      : undefined,
    author: fields.author,
    publishDate: new Date(fields.publishDate),
    readTime: fields.readTime,
    tags: fields.tags || [],
    metaDescription: fields.metaDescription,
    featured: fields.featured || false,
    createdAt: new Date(sys.createdAt),
    updatedAt: new Date(sys.updatedAt),
  }
}

// Fetch all blog posts
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: "blogPost",
      order: "-fields.publishDate",
    })

    return response.items.map((item) => transformBlogPost(item as ContentfulBlogPost))
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }
}

// Fetch a single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: "blogPost",
      "fields.slug": slug,
      limit: 1,
    })

    if (response.items.length === 0) {
      return null
    }

    return transformBlogPost(response.items[0] as ContentfulBlogPost)
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return null
  }
}

// Fetch featured blog posts
export async function getFeaturedBlogPosts(limit = 3): Promise<BlogPost[]> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: "blogPost",
      "fields.featured": true,
      order: "-fields.publishDate",
      limit,
    })

    return response.items.map((item) => transformBlogPost(item as ContentfulBlogPost))
  } catch (error) {
    console.error("Error fetching featured blog posts:", error)
    return []
  }
}

// Search blog posts
export async function searchBlogPosts(query: string): Promise<BlogPost[]> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: "blogPost",
      query,
      order: "-fields.publishDate",
    })

    return response.items.map((item) => transformBlogPost(item as ContentfulBlogPost))
  } catch (error) {
    console.error("Error searching blog posts:", error)
    return []
  }
}

// Get blog posts by tag
export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: "blogPost",
      "fields.tags[in]": tag,
      order: "-fields.publishDate",
    })

    return response.items.map((item) => transformBlogPost(item as ContentfulBlogPost))
  } catch (error) {
    console.error("Error fetching blog posts by tag:", error)
    return []
  }
}

// Get all unique tags
export async function getAllTags(): Promise<string[]> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: "blogPost",
      select: "fields.tags",
    })

    const allTags = response.items.flatMap((item: any) => item.fields.tags || [])
    return [...new Set(allTags)].sort()
  } catch (error) {
    console.error("Error fetching tags:", error)
    return []
  }
}
