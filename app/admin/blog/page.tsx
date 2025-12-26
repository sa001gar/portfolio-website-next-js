import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { TerminalText } from "@/components/terminal-text"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2 } from "lucide-react"

export default async function BlogPage() {
  const supabase = await createClient()
  const { data: posts, error } = await supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-terminal-bright mb-2">
            <TerminalText text="blog.list()" showCursor={false} />
          </h1>
          <p className="text-terminal-green/70">Manage your blog articles.</p>
        </div>
        <Link href="/admin/blog/new">
          <Button className="bg-terminal-green text-terminal-black hover:bg-terminal-green/90">
            <Plus className="w-4 h-4 mr-2" /> New Post
          </Button>
        </Link>
      </div>

      <div className="border border-terminal-green/20 rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-terminal-green/10 text-terminal-green/70 font-mono text-sm uppercase">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Author</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-terminal-green/10">
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <tr key={post.id} className="hover:bg-terminal-green/5 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-terminal-bright">{post.title}</div>
                    <div className="flex gap-2 text-xs">
                        <span className="text-terminal-green/50 truncate max-w-[200px]">{post.slug}</span>
                        {post.featured && (
                          <span className="text-yellow-500 font-mono">[Featured]</span>
                        )}
                    </div>
                  </td>
                  <td className="p-4 text-terminal-green/80">{post.author}</td>
                  <td className="p-4 text-terminal-green/80 text-sm">
                    {new Date(post.publish_date).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/blog/${post.id}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-terminal-green hover:text-terminal-bright hover:bg-terminal-green/20">
                          <Pencil className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-400 hover:bg-red-500/10">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-8 text-center text-terminal-green/50">
                  No posts found. Write something amazing!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
