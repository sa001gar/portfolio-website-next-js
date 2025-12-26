import { createClient } from "@/lib/supabase/server"
import { TerminalWindow } from "@/components/terminal-window"
import { TerminalText } from "@/components/terminal-text"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Award, GraduationCap, Code } from "lucide-react"

export default async function ExperiencePage() {
  const supabase = await createClient()

  // Fetch Experience
  const { data: experiences } = await supabase
    .from("experience")
    .select("*")
    .order("order_index", { ascending: true })

  // Fetch Education
  const { data: education } = await supabase
    .from("education")
    .select("*")
    .order("order_index", { ascending: true })

  // Fetch Certifications
  const { data: certifications } = await supabase
    .from("certifications")
    .select("*")
    .order("order_index", { ascending: true })

  // Fetch Skills
  const { data: skills } = await supabase
    .from("skills")
    .select("*")
    .order("order_index", { ascending: true })

  // Group skills by category for JSON display
  const skillsJson: Record<string, string[]> = {}
  if (skills) {
      skills.forEach(skill => {
          if (!skillsJson[skill.category]) {
              skillsJson[skill.category] = []
          }
          skillsJson[skill.category].push(skill.name)
      })
  }

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-12">
        <h1 className="text-3xl md:text-4xl font-bold text-terminal-bright mb-6">
          <TerminalText text="Experience" typingDelay={80} showCursor={false}/>
        </h1>

        {/* Work Experience */}
        <section>
          <div className="flex items-center mb-6">
            <Briefcase className="w-5 h-5 text-terminal-bright mr-2" />
            <h2 className="text-2xl font-bold text-terminal-bright">Work Experience</h2>
          </div>

          <div className="space-y-8">
            {experiences?.map((exp) => (
              <div
                key={exp.id}
                className="border border-terminal-green/20 rounded-md p-5 hover:border-terminal-green/40 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-terminal-bright">{exp.title}</h3>
                    <p className="text-terminal-green">{exp.company}</p>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <Badge variant="outline" className="bg-terminal-green/5 uppercase">
                      {exp.start_date} - {exp.current ? "Present" : exp.end_date}
                    </Badge>
                  </div>
                </div>

                <p className="text-terminal-green/80 mb-4">{exp.description}</p>

                {exp.achievements && exp.achievements.length > 0 && (
                    <div className="mb-4">
                    <h4 className="text-terminal-bright font-medium mb-2">Key Achievements</h4>
                    <ul className="list-disc pl-5 space-y-1 text-terminal-green/80">
                        {exp.achievements.map((achievement: string, index: number) => (
                        <li key={index}>{achievement}</li>
                        ))}
                    </ul>
                    </div>
                )}

                {exp.technologies && exp.technologies.length > 0 && (
                    <div>
                    <h4 className="text-terminal-bright font-medium mb-2">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                            {tech}
                        </Badge>
                        ))}
                    </div>
                    </div>
                )}
              </div>
            ))}
            {(!experiences || experiences.length === 0) && (
                <p className="text-terminal-green/50 italic">No experience added yet.</p>
            )}
          </div>
        </section>

        {/* Certifications */}
        <section>
          <div className="flex items-center mb-6">
            <Award className="w-5 h-5 text-terminal-bright mr-2" />
            <h2 className="text-2xl font-bold text-terminal-bright">Certifications</h2>
          </div>

          <TerminalWindow title="certifications.sh">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certifications?.map((cert) => (
                <div key={cert.id} className="border border-terminal-green/20 rounded-md p-3 flex items-center">
                  <div className="w-10 h-10 bg-terminal-green/10 rounded-md flex items-center justify-center mr-3 flex-shrink-0">
                    {cert.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={cert.image_url} alt={cert.name} className="w-8 h-8 object-contain" />
                    ) : (
                         <span className="text-terminal-bright text-lg font-bold">{cert.name.charAt(0)}</span>
                    )}
                   
                  </div>
                  <div>
                    <h3 className="text-terminal-bright font-medium break-words">{cert.name}</h3>
                    <p className="text-terminal-green/70 text-sm">
                      {cert.issuer} • {cert.date}
                    </p>
                  </div>
                </div>
              ))}
               {(!certifications || certifications.length === 0) && (
                <p className="text-terminal-green/50 italic p-2">No certifications added yet.</p>
            )}
            </div>
          </TerminalWindow>
        </section>

        {/* Education */}
        <section>
          <div className="flex items-center mb-6">
            <GraduationCap className="w-5 h-5 text-terminal-bright mr-2" />
            <h2 className="text-2xl font-bold text-terminal-bright">Education</h2>
          </div>

          <div className="space-y-6">
            {education?.map((edu) => (
              <div
                key={edu.id}
                className="border border-terminal-green/20 rounded-md p-5 hover:border-terminal-green/40 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-terminal-bright">{edu.degree}</h3>
                    <p className="text-terminal-green">{edu.institution}</p>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <Badge variant="outline" className="bg-terminal-green/5">
                      {edu.start_year} - {edu.end_year}
                    </Badge>
                  </div>
                </div>

                {/* <p className="text-terminal-green/80 mb-4">{edu.description}</p> // No description in DB currently? Added via schema? */}

                {edu.courses && edu.courses.length > 0 && (
                    <div>
                    <h4 className="text-terminal-bright font-medium mb-2">Key Courses</h4>
                    <div className="flex flex-wrap gap-2">
                        {edu.courses.map((course: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                            {course}
                        </Badge>
                        ))}
                    </div>
                </div>
                )}
              </div>
            ))}
             {(!education || education.length === 0) && (
                <p className="text-terminal-green/50 italic">No education added yet.</p>
            )}
          </div>
        </section>

        {/* Skills */}
        <section>
          <div className="flex items-center mb-6">
            <Code className="w-5 h-5 text-terminal-bright mr-2" />
            <h2 className="text-2xl font-bold text-terminal-bright">Technical Skills</h2>
          </div>

          <TerminalWindow title="skills.json">
            <pre className="text-sm overflow-x-auto">
              {JSON.stringify(skillsJson, null, 2)}
            </pre>
          </TerminalWindow>
        </section>
      </div>
    </div>
  )
}
