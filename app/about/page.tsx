import Image from "next/image"
import { TerminalWindow } from "@/components/terminal-window"
import { TerminalCommand } from "@/components/terminal-command"
import { TerminalText } from "@/components/terminal-text"
import { Badge } from "@/components/ui/badge"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl md:text-4xl font-bold text-terminal-bright mb-6">
          <TerminalText text="About Me" typingDelay={80} showCursor={false} />
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="sticky top-24">
              <div className="relative w-full aspect-square max-w-[300px] mx-auto mb-6 rounded-md overflow-hidden border border-terminal-green/30 shadow-glow">
                <Image src="/profile-image.jpg" alt="Sagar Kundu" fill className="object-cover" />
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-terminal-bright font-medium mb-2">Location</h3>
                  <p className="text-terminal-green/80">Bangalore, India</p>
                </div>

                <div>
                  <h3 className="text-terminal-bright font-medium mb-2">Education</h3>
                  <p className="text-terminal-green/80">B.Tech in Computer Science</p>
                  <p className="text-terminal-green/60 text-sm">Indian Institute of Technology</p>
                </div>

                <div>
                  <h3 className="text-terminal-bright font-medium mb-2">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge>English (Fluent)</Badge>
                    <Badge>Hindi (Native)</Badge>
                    <Badge>Bengali (Native)</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 space-y-8">
            <TerminalWindow title="about.md">
              <div className="space-y-4">
                <p>
                  Hi! I'm a versatile software engineer with expertise in Full Stack development, ML/AI, DevOps, and
                  cybersecurity. I build innovative solutions that solve real-world problems using cutting-edge
                  technologies.
                </p>

                <p>
                  With over 5 years of experience in the software industry, I've worked on a diverse range of projects
                  from high-traffic web applications to machine learning models for predictive analytics. My approach
                  combines technical excellence with a strong focus on user experience and business value.
                </p>

                <p>
                  I'm passionate about open-source software and regularly contribute to community projects. My
                  background in cybersecurity gives me a unique perspective on building secure and robust applications.
                </p>
              </div>
            </TerminalWindow>

            <div>
              <h2 className="text-xl font-bold text-terminal-bright mb-4">Technical Expertise</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-terminal-bright font-medium mb-2">Programming Languages</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-terminal-bright rounded-full mr-2"></div>
                      <span className="text-terminal-green">JavaScript/TypeScript</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-terminal-bright rounded-full mr-2"></div>
                      <span className="text-terminal-green">Python</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-terminal-bright rounded-full mr-2"></div>
                      <span className="text-terminal-green">Go</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-terminal-bright rounded-full mr-2"></div>
                      <span className="text-terminal-green">C/C++</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-terminal-bright rounded-full mr-2"></div>
                      <span className="text-terminal-green">Bash</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-terminal-bright font-medium mb-2">Frameworks & Libraries</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-terminal-bright rounded-full mr-2"></div>
                      <span className="text-terminal-green">React.js</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-terminal-bright rounded-full mr-2"></div>
                      <span className="text-terminal-green">Next.js</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-terminal-bright rounded-full mr-2"></div>
                      <span className="text-terminal-green">Django</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-terminal-bright rounded-full mr-2"></div>
                      <span className="text-terminal-green">FastAPI</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-terminal-bright rounded-full mr-2"></div>
                      <span className="text-terminal-green">TensorFlow</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-terminal-bright rounded-full mr-2"></div>
                      <span className="text-terminal-green">scikit-learn</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-terminal-bright font-medium mb-2">Tools & Platforms</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-terminal-bright rounded-full mr-2"></div>
                      <span className="text-terminal-green">AWS</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-terminal-bright rounded-full mr-2"></div>
                      <span className="text-terminal-green">Azure</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-terminal-bright rounded-full mr-2"></div>
                      <span className="text-terminal-green">Docker</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-terminal-bright rounded-full mr-2"></div>
                      <span className="text-terminal-green">Kubernetes</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-terminal-bright rounded-full mr-2"></div>
                      <span className="text-terminal-green">Vercel/Netlify</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-terminal-bright rounded-full mr-2"></div>
                      <span className="text-terminal-green">GitHub Actions</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-terminal-bright mb-4">Interests & Hobbies</h2>

              <TerminalWindow title="interests.json">
                <TerminalCommand
                  command="cat interests.json | jq"
                  output={
                    <pre className="text-sm overflow-x-auto">
                      {`{
  "technical": [
    "Open Source Contribution",
    "Cybersecurity Research",
    "Machine Learning",
    "Blockchain Technology",
    "System Architecture"
  ],
  "personal": [
    "Photography",
    "Hiking",
    "Chess",
    "Reading Science Fiction",
    "Playing Guitar"
  ]
}`}
                    </pre>
                  }
                />
              </TerminalWindow>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
