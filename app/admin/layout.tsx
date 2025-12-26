import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { logout } from "@/app/login/actions"
import { Terminal, LayoutDashboard, FolderKanban, FileText, User, Settings, LogOut } from "lucide-react"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/projects", label: "Projects", icon: FolderKanban },
    { href: "/admin/blog", label: "Blog", icon: FileText },
    { href: "/admin/profile", label: "Profile", icon: User },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-terminal-black flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-terminal-green/20 fixed h-full bg-terminal-black z-10 hidden md:flex flex-col">
        <div className="p-6 border-b border-terminal-green/20">
          <Link href="/" className="flex items-center gap-2 text-terminal-bright hover:opacity-80 transition-opacity">
            <Terminal className="w-6 h-6 text-terminal-green" />
            <span className="font-bold tracking-tight">Admin_Panel</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-terminal-green/70 hover:text-terminal-bright hover:bg-terminal-green/10 rounded-md transition-all group"
            >
              <item.icon className="w-5 h-5 group-hover:text-terminal-green transition-colors" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-terminal-green/20">
          <div className="px-4 py-3 mb-2">
            <div className="text-xs text-terminal-green/50 uppercase font-mono mb-1">Logged in as</div>
            <div className="text-sm text-terminal-bright truncate">{user.email}</div>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="flex items-center gap-3 px-4 py-2 w-full text-red-400 hover:bg-red-500/10 rounded-md transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8 overflow-y-auto h-screen">
        {children}
      </main>
    </div>
  )
}
