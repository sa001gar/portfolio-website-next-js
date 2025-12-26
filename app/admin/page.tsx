import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TerminalText } from "@/components/terminal-text"
import { FileText, FolderKanban, Eye, Clock } from "lucide-react"

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Fetch counts
  const { count: blogCount } = await supabase.from("blogs").select("*", { count: "exact", head: true })
  const { count: projectCount } = await supabase.from("projects").select("*", { count: "exact", head: true })
  
  // Fake views/visitor data for now since we don't have analytics yet
  const totalViews = 12543
  const avgTime = "2m 15s"

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
          change="+2 this month" 
        />
        <StatsCard 
          title="Published Articles" 
          value={blogCount || 0} 
          icon={FileText} 
          change="Last post 2 days ago" 
        />
        <StatsCard 
          title="Total Views" 
          value={totalViews.toLocaleString()} 
          icon={Eye} 
          change="+12% from last month" 
        />
        <StatsCard 
          title="Avg. Read Time" 
          value={avgTime} 
          icon={Clock} 
          change="Stable" 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border border-terminal-green/20 rounded-lg p-6 bg-terminal-black/50">
          <h3 className="text-xl font-bold text-terminal-bright mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <ActivityItem 
              action="Created new project" 
              target="E-commerce Dashboard" 
              time="2 hours ago" 
            />
            <ActivityItem 
              action="Updated blog post" 
              target="Understanding React Server Components" 
              time="5 hours ago" 
            />
            <ActivityItem 
              action="Profile updated" 
              target="Bio section" 
              time="1 day ago" 
            />
          </div>
        </div>

        <div className="border border-terminal-green/20 rounded-lg p-6 bg-terminal-black/50">
          <h3 className="text-xl font-bold text-terminal-bright mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
             {/* We will add links here later or buttons */}
             <div className="p-4 border border-terminal-green/20 rounded hover:bg-terminal-green/10 cursor-pointer transition-colors text-center">
                <FolderKanban className="w-6 h-6 mx-auto mb-2 text-terminal-green" />
                <span className="text-sm">Add Project</span>
             </div>
             <div className="p-4 border border-terminal-green/20 rounded hover:bg-terminal-green/10 cursor-pointer transition-colors text-center">
                <FileText className="w-6 h-6 mx-auto mb-2 text-terminal-green" />
                <span className="text-sm">Write Blog</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatsCard({ title, value, icon: Icon, change }: any) {
  return (
    <div className="border border-terminal-green/20 rounded-lg p-5 bg-terminal-black/50 hover:border-terminal-green/40 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <span className="text-sm text-terminal-green/70 font-mono uppercase">{title}</span>
        <Icon className="w-4 h-4 text-terminal-green" />
      </div>
      <div className="text-2xl font-bold text-terminal-bright mb-1">{value}</div>
      <div className="text-xs text-terminal-green/50">{change}</div>
    </div>
  )
}

function ActivityItem({ action, target, time }: any) {
  return (
    <div className="flex items-start pb-4 border-b border-terminal-green/10 last:border-0 last:pb-0">
      <div className="w-2 h-2 mt-1.5 rounded-full bg-terminal-green/50 mr-3"></div>
      <div>
        <p className="text-sm text-terminal-bright">
          {action} <span className="text-terminal-green">{target}</span>
        </p>
        <p className="text-xs text-terminal-green/50">{time}</p>
      </div>
    </div>
  )
}
