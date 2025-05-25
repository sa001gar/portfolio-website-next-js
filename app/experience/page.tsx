"use client"

import { useEffect } from "react"
import { TerminalWindow } from "@/components/terminal-window"
import { TerminalText } from "@/components/terminal-text"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Award, GraduationCap } from "lucide-react"

// Mock experience data
const experiences = [
  {
    id: 1,
    title: "Full Stack Developer",
    company: "Prime Dev Technologies Pvt. Ltd.",
    period: "DEC 2024 - Present",
    description:
      "Leading the development of web applications and software solutions for clients. Specializing in performance optimization, serverless technologies, and AI-powered features.",
    achievements: [
      "Improved database query performance by 50% through optimization techniques",
      "Integrated generative AI features into client applications, enhancing user engagement",
      "Developed SEO-friendly web applications to boost client visibility",
      "Built and deployed serverless chatbots for customer support automation",
      "Created an AI-powered dashboard manager for automated analytics and reporting",
      "Designed and implemented an AI-admin system for a blogging platform",
      "Implemented automated blog post generation using AI, integrated with an admin panel, cron jobs, and message queues",
    ],
    technologies: ["Next.js", "TypeScript", "Python", "AWS", "React", "Django", "FastAPI", "Jinja 2", "Serverless", "SEO", "Gemini", "TensorFlow", "RabbitMQ", "Cron"],
  },
]

// Mock certifications data
const certifications = [
  {
    id: 1,
    name: "Android Bug Hunting",
    issuer: "EC-Council",
    date: "2024",
    logo: "/certs/ec-council.png",
  },
  {
    id: 2,
    name: "Google Cyber Security Analyst",
    issuer: "Coursera - Google",
    date: "2025",
    logo: "/certs/tensorflow.png",
  },
  // {
  //   id: 3,
  //   name: "Certified Kubernetes Administrator",
  //   issuer: "Cloud Native Computing Foundation",
  //   date: "2020",
  //   logo: "/certs/kubernetes.png",
  // },
  // {
  //   id: 4,
  //   name: "Certified Ethical Hacker",
  //   issuer: "EC-Council",
  //   date: "2019",
  //   logo: "/certs/ceh.png",
  // },
]

// Mock education data
const education = [
  {
    id: 1,
    degree: "B.Sc in Computer Science (4 Years)",
    institution: "The University of Burdwan",
    period: "2023 - 2027",
    description:
      "Currently in the second year of undergraduate studies with a strong focus on Artificial Intelligence, Machine Learning, Cybersecurity, and Low-Level Systems. Passionate about system programming with deep interest in Go and Rust.",
    courses: [
      "Data Structures & Algorithms",
      "Machine Learning",
      "Artificial Intelligence",
      "Cybersecurity",
      "Operating Systems",
      "Compiler Design",
      "Systems Programming",
      "Web Development",
      "Low-Level Programming with Go and Rust",
    ],
  },
]

export default function ExperiencePage() {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
  }, [])

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
            {experiences.map((exp) => (
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
                    <Badge variant="outline" className="bg-terminal-green/5">
                      {exp.period}
                    </Badge>
                  </div>
                </div>

                <p className="text-terminal-green/80 mb-4">{exp.description}</p>

                <div className="mb-4">
                  <h4 className="text-terminal-bright font-medium mb-2">Key Achievements</h4>
                  <ul className="list-disc pl-5 space-y-1 text-terminal-green/80">
                    {exp.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-terminal-bright font-medium mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
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
              {certifications.map((cert) => (
                <div key={cert.id} className="border border-terminal-green/20 rounded-md p-3 flex items-center">
                  <div className="w-10 h-10 bg-terminal-green/10 rounded-md flex items-center justify-center mr-3">
                    <span className="text-terminal-bright text-lg font-bold">{cert.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="text-terminal-bright font-medium">{cert.name}</h3>
                    <p className="text-terminal-green/70 text-sm">
                      {cert.issuer} • {cert.date}
                    </p>
                  </div>
                </div>
              ))}
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
            {education.map((edu) => (
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
                      {edu.period}
                    </Badge>
                  </div>
                </div>

                <p className="text-terminal-green/80 mb-4">{edu.description}</p>

                <div>
                  <h4 className="text-terminal-bright font-medium mb-2">Key Courses</h4>
                  <div className="flex flex-wrap gap-2">
                    {edu.courses.map((course, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {course}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
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
              {`{
  "languages": [
    "Python",
    "JavaScript/TypeScript",
    "Go",
    "C/C++",
    "Rust",
    "Bash"
  ],
  "frontend": [
    "React.js",
    "Next.js",
    "Tailwind CSS",
    "Redux",
    "GraphQL"
  ],
  "backend": [
    "Node.js",
    "Django",
    "FastAPI",
    "Express",
    "Supabase"
  ],
  "databases": [
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "MySQL",
    "DynamoDB"
  ],
  "devops": [
    "Docker",
    "AWS",
    "Azure",
    "CI/CD",
  ],
  "ml_ai": [
    "TensorFlow",
    "scikit-learn",
    "PyTorch",
    "NLP",
  ],
  "security": [
    "Penetration Testing",
    "OWASP",
    "Network Security",
    "Bug Bounty"
    "Android Hacking",

  ]
}`}
            </pre>
          </TerminalWindow>
        </section>
      </div>
    </div>
  )
}

// Import missing component
import { Code } from "lucide-react"
