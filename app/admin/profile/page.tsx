import { createClient } from "@/lib/supabase/server"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TerminalText } from "@/components/terminal-text"
import { GeneralForm } from "./_components/general-form"
import { ExperienceList } from "./_components/experience-list"
import { EducationList } from "./_components/education-list"
import { SkillsList } from "./_components/skills-list"

export default async function ProfilePage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user?.id).single()
  const { data: experience } = await supabase.from("experience").select("*").order("start_date", { ascending: false })
  const { data: education } = await supabase.from("education").select("*").order("start_year", { ascending: false })
  const { data: skills } = await supabase.from("skills").select("*").order("category")

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-terminal-bright mb-2">
          <TerminalText text="user.profile" showCursor={false} />
        </h1>
        <p className="text-terminal-green/70">Manage your personal information and resume.</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="bg-terminal-green/5 border border-terminal-green/20 p-1 mb-8">
          <TabsTrigger value="general" className="data-[state=active]:bg-terminal-green data-[state=active]:text-terminal-black">General</TabsTrigger>
          <TabsTrigger value="experience" className="data-[state=active]:bg-terminal-green data-[state=active]:text-terminal-black">Experience</TabsTrigger>
          <TabsTrigger value="education" className="data-[state=active]:bg-terminal-green data-[state=active]:text-terminal-black">Education</TabsTrigger>
          <TabsTrigger value="skills" className="data-[state=active]:bg-terminal-green data-[state=active]:text-terminal-black">Skills</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <GeneralForm profile={profile} />
        </TabsContent>
        
        <TabsContent value="experience">
          <ExperienceList items={experience || []} />
        </TabsContent>
        
        <TabsContent value="education">
          <EducationList items={education || []} />
        </TabsContent>
        
        <TabsContent value="skills">
          <SkillsList items={skills || []} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
