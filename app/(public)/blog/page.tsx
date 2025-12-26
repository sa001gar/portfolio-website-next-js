import { createClient } from "@/lib/supabase/server"
import BlogPageClient from "./blog-page-client"

export default async function BlogPage() {
  const supabase = await createClient()
  
  const { data: posts } = await supabase.from("blogs").select("*").order("publish_date", { ascending: false })
  
  // Extract all tags
  const allTags = Array.from(new Set(posts?.flatMap(p => p.tags || []) || [])).sort() as string[]

  return <BlogPageClient initialPosts={posts || []} allTags={allTags} />
}
