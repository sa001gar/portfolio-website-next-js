import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { TerminalText } from "@/components/terminal-text"
import { 
  FileText, 
  FolderKanban, 
  Code2, 
  Briefcase, 
  User, 
  ExternalLink,
  ArrowRight,
  Activity
} from "lucide-react"

function formatRelativeTime(dateString: string | null | undefined): string {
  if (!dateString) return "Recently"
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return "Recently"
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return "Just now"
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`
  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) return `${diffInHours}h ago`
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 30) return `${diffInDays}d ago`
  const diffInMonths = Math.floor(diffInDays / 30)
  if (diffInMonths < 12) return `${diffInMonths}mo ago`
  const diffInYears = Math.floor(diffInMonths / 12)
  return `${diffInYears}y ago`
}

export default async function AdminDashboard() {
  const supabase = await createClient()

  // 1. Fetch Projects Stats
  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)

  const [
    { count: projectCount },
    { count: featuredProjectCount },
    { count: projectsThisMonth },
    { data: recentProjects }
  ] = await Promise.all([
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("projects").select("*", { count: "exact", head: true }).eq("featured", true),
    supabase.from("projects").select("*", { count: "exact", head: true }).gte("created_at", startOfMonth.toISOString()),
    supabase.from("projects").select("id, title, slug, created_at, updated_at").order("updated_at", { ascending: false }).limit(4),
  ])

  // 2. Fetch Blog Stats
  const [
    { count: blogCount },
    { data: latestBlog },
    { data: recentBlogs }
  ] = await Promise.all([
    supabase.from("blogs").select("*", { count: "exact", head: true }),
    supabase.from("blogs").select("title, publish_date, created_at").order("publish_date", { ascending: false }).limit(1).maybeSingle(),
    supabase.from("blogs").select("id, title, slug, created_at, updated_at, publish_date").order("updated_at", { ascending: false }).limit(4),
  ])

  // 3. Fetch Skills Stats
  const { data: skills } = await supabase.from("skills").select("id, name, category, created_at")
  const skillsCount = skills?.length || 0
  const uniqueCategories = new Set(skills?.map(s => s.category).filter(Boolean))
  const categoryCount = uniqueCategories.size

  // 4. Fetch Experience Stats
  const { data: experience } = await supabase.from("experience").select("id, title, company, current, created_at").order("created_at", { ascending: false })
  const experienceCount = experience?.length || 0
  const currentRole = experience?.find(e => e.current)

  // 5. Fetch Profile info
  const { data: profile } = await supabase.from("profiles").select("full_name, updated_at").limit(1).maybeSingle()

  // Build Dynamic Recent Activity feed
  type ActivityItem = {
    action: string
    target: string
    time: string
    timestamp: number
    href: string
  }

  const activities: ActivityItem[] = []

  recentProjects?.forEach(p => {
    const isNew = Math.abs(new Date(p.updated_at).getTime() - new Date(p.created_at).getTime()) < 60000
    activities.push({
      action: isNew ? "Created project" : "Updated project",
      target: p.title,
      time: formatRelativeTime(p.updated_at || p.created_at),
      timestamp: new Date(p.updated_at || p.created_at).getTime(),
      href: `/admin/projects/${p.id}`,
    })
  })

  recentBlogs?.forEach(b => {
    const isNew = Math.abs(new Date(b.updated_at).getTime() - new Date(b.created_at).getTime()) < 60000
    activities.push({
      action: isNew ? "Published article" : "Updated article",
      target: b.title,
      time: formatRelativeTime(b.updated_at || b.publish_date || b.created_at),
      timestamp: new Date(b.updated_at || b.publish_date || b.created_at).getTime(),
      href: `/admin/blog/${b.id}`,
    })
  })

  experience?.slice(0, 2).forEach(e => {
    activities.push({
      action: "Added experience",
      target: `${e.title} @ ${e.company}`,
      time: formatRelativeTime(e.created_at),
      timestamp: new Date(e.created_at).getTime(),
      href: "/admin/profile",
    })
  })

  skills?.slice(0, 2).forEach(s => {
    activities.push({
      action: "Added skill",
      target: `${s.name} (${s.category})`,
      time: formatRelativeTime(s.created_at),
      timestamp: new Date(s.created_at).getTime(),
      href: "/admin/profile",
    })
  })

  if (profile?.updated_at) {
    activities.push({
      action: "Updated profile",
      target: profile.full_name || "Bio & Info",
      time: formatRelativeTime(profile.updated_at),
      timestamp: new Date(profile.updated_at).getTime(),
      href: "/admin/profile",
    })
  }

  // Sort activities chronologically (newest first) and take top 5
  const sortedActivities = activities
    .filter(a => !isNaN(a.timestamp))
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 5)

  // Subtitle messages for stats cards
  const projectChangeText = (projectsThisMonth || 0) > 0
    ? `+${projectsThisMonth} this month`
    : (featuredProjectCount || 0) > 0
    ? `${featuredProjectCount} featured showcase`
    : (projectCount || 0) > 0
    ? "All projects active"
    : "No projects added yet"

  const blogChangeText = latestBlog
    ? `Latest: ${formatRelativeTime(latestBlog.publish_date || latestBlog.created_at)}`
    : "No articles published yet"

  const skillsChangeText = categoryCount > 0
    ? `Across ${categoryCount} ${categoryCount === 1 ? 'category' : 'categories'}`
    : "No skills configured yet"

  const experienceChangeText = currentRole
    ? `Current: ${currentRole.company}`
    : experienceCount > 0
    ? `${experienceCount} career ${experienceCount === 1 ? 'role' : 'roles'}`
    : "No entries yet"

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-terminal-bright mb-2">
          <TerminalText text="system.dashboard()" showCursor={false} />
        </h1>
        <p className="text-terminal-green/70">Overview of your portfolio content and statistics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Total Projects" 
          value={projectCount || 0} 
          icon={FolderKanban} 
          change={projectChangeText} 
          href="/admin/projects"
        />
        <StatsCard 
          title="Published Articles" 
          value={blogCount || 0} 
          icon={FileText} 
          change={blogChangeText} 
          href="/admin/blog"
        />
        <StatsCard 
          title="Skills Listed" 
          value={skillsCount} 
          icon={Code2} 
          change={skillsChangeText} 
          href="/admin/profile"
        />
        <StatsCard 
          title="Experience & Roles" 
          value={experienceCount} 
          icon={Briefcase} 
          change={experienceChangeText} 
          href="/admin/profile"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border border-terminal-green/20 rounded-lg p-6 bg-terminal-black/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-terminal-bright flex items-center gap-2">
              <Activity className="w-5 h-5 text-terminal-green" />
              Recent Activity
            </h3>
            <span className="text-xs font-mono text-terminal-green/50">live sync</span>
          </div>

          {sortedActivities.length > 0 ? (
            <div className="space-y-4">
              {sortedActivities.map((item, idx) => (
                <Link 
                  key={idx} 
                  href={item.href}
                  className="flex items-start pb-4 border-b border-terminal-green/10 last:border-0 last:pb-0 hover:bg-terminal-green/5 rounded p-1.5 -mx-1.5 transition-colors group"
                >
                  <div className="w-2 h-2 mt-1.5 rounded-full bg-terminal-green/50 group-hover:bg-terminal-bright group-hover:scale-125 transition-all mr-3 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-terminal-bright truncate">
                      {item.action}{" "}
                      <span className="text-terminal-green font-medium underline-offset-2 group-hover:underline">
                        {item.target}
                      </span>
                    </p>
                    <p className="text-xs text-terminal-green/50 font-mono mt-0.5">{item.time}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-terminal-green/30 group-hover:text-terminal-bright group-hover:translate-x-1 transition-all self-center ml-2" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-terminal-green/50 font-mono text-sm">
              No recent activity found. Start by creating a project or blog post!
            </div>
          )}
        </div>

        <div className="border border-terminal-green/20 rounded-lg p-6 bg-terminal-black/50">
          <h3 className="text-xl font-bold text-terminal-bright mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/admin/projects/new"
              className="p-4 border border-terminal-green/20 rounded hover:bg-terminal-green/10 hover:border-terminal-green/50 transition-all text-center group block"
            >
              <FolderKanban className="w-6 h-6 mx-auto mb-2 text-terminal-green group-hover:text-terminal-bright group-hover:scale-110 transition-all" />
              <span className="text-sm font-medium text-terminal-bright block">Add Project</span>
              <span className="text-xs text-terminal-green/50 block mt-1">New showcase entry</span>
            </Link>

            <Link
              href="/admin/blog/new"
              className="p-4 border border-terminal-green/20 rounded hover:bg-terminal-green/10 hover:border-terminal-green/50 transition-all text-center group block"
            >
              <FileText className="w-6 h-6 mx-auto mb-2 text-terminal-green group-hover:text-terminal-bright group-hover:scale-110 transition-all" />
              <span className="text-sm font-medium text-terminal-bright block">Write Blog</span>
              <span className="text-xs text-terminal-green/50 block mt-1">Publish an article</span>
            </Link>

            <Link
              href="/admin/profile"
              className="p-4 border border-terminal-green/20 rounded hover:bg-terminal-green/10 hover:border-terminal-green/50 transition-all text-center group block"
            >
              <User className="w-6 h-6 mx-auto mb-2 text-terminal-green group-hover:text-terminal-bright group-hover:scale-110 transition-all" />
              <span className="text-sm font-medium text-terminal-bright block">Edit Profile</span>
              <span className="text-xs text-terminal-green/50 block mt-1">Skills & experience</span>
            </Link>

            <Link
              href="/"
              target="_blank"
              className="p-4 border border-terminal-green/20 rounded hover:bg-terminal-green/10 hover:border-terminal-green/50 transition-all text-center group block"
            >
              <ExternalLink className="w-6 h-6 mx-auto mb-2 text-terminal-green group-hover:text-terminal-bright group-hover:scale-110 transition-all" />
              <span className="text-sm font-medium text-terminal-bright block">View Site</span>
              <span className="text-xs text-terminal-green/50 block mt-1">Preview portfolio</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatsCard({ 
  title, 
  value, 
  icon: Icon, 
  change,
  href 
}: { 
  title: string
  value: number | string
  icon: any
  change: string
  href?: string
}) {
  const content = (
    <div className="border border-terminal-green/20 rounded-lg p-5 bg-terminal-black/50 hover:border-terminal-green/40 hover:bg-terminal-green/[0.02] transition-all group h-full">
      <div className="flex justify-between items-start mb-2">
        <span className="text-sm text-terminal-green/70 font-mono uppercase group-hover:text-terminal-bright transition-colors">
          {title}
        </span>
        <Icon className="w-4 h-4 text-terminal-green group-hover:scale-110 transition-transform" />
      </div>
      <div className="text-2xl font-bold text-terminal-bright mb-1">{value}</div>
      <div className="text-xs text-terminal-green/50 font-mono truncate">{change}</div>
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    )
  }

  return content
}
