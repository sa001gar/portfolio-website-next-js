import { TerminalWindow } from "@/components/terminal-window"
import { TerminalText } from "@/components/terminal-text"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Award, GraduationCap } from "lucide-react"

// Mock experience data
const experiences = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "TechCorp Inc.",
    period: "2021 - Present",
    description:
      "Leading the development of cloud-native applications and ML-powered features. Architecting scalable solutions using microservices and serverless technologies.",
    achievements: [
      "Reduced infrastructure costs by 40% through cloud optimization",
      "Led a team of 5 engineers to deliver a major product release",
      "Implemented CI/CD pipelines that reduced deployment time by 70%",
      "Designed and implemented a machine learning pipeline for predictive analytics",
    ],
    technologies: ["Next.js", "TypeScript", "Python", "AWS", "Docker", "Kubernetes", "TensorFlow"],
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "InnovateSoft",
    period: "2019 - 2021",
    description:
      "Developed and maintained web applications for enterprise clients. Worked on both frontend and backend components with a focus on performance and security.",
    achievements: [
      "Built a secure file sharing platform with end-to-end encryption",
      "Optimized database queries resulting in 60% faster page loads",
      "Implemented OAuth 2.0 authentication system",
      "Contributed to open-source libraries used by the company",
    ],
    technologies: ["React", "Node.js", "Django", "PostgreSQL", "Redis", "Docker"],
  },
  {
    id: 3,
    title: "Software Developer Intern",
    company: "StartupLabs",
    period: "2018 - 2019",
    description:
      "Worked on developing features for a SaaS product. Collaborated with senior developers to implement new functionality and fix bugs.",
    achievements: [
      "Developed a dashboard for real-time analytics",
      "Fixed critical security vulnerabilities",
      "Improved test coverage from 60% to 85%",
      "Created documentation for the API",
    ],
    technologies: ["JavaScript", "Python", "Flask", "MongoDB", "Git"],
  },
]

// Mock certifications data
const certifications = [
  {
    id: 1,
    name: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2022",
    logo: "/certs/aws.png",
  },
  {
    id: 2,
    name: "TensorFlow Developer Certificate",
    issuer: "Google",
    date: "2021",
    logo: "/certs/tensorflow.png",
  },
  {
    id: 3,
    name: "Certified Kubernetes Administrator",
    issuer: "Cloud Native Computing Foundation",
    date: "2020",
    logo: "/certs/kubernetes.png",
  },
  {
    id: 4,
    name: "Certified Ethical Hacker",
    issuer: "EC-Council",
    date: "2019",
    logo: "/certs/ceh.png",
  },
]

// Mock education data
const education = [
  {
    id: 1,
    degree: "B.Tech in Computer Science",
    institution: "Indian Institute of Technology",
    period: "2014 - 2018",
    description: "Specialized in Artificial Intelligence and Machine Learning. Graduated with honors.",
    courses: ["Data Structures & Algorithms", "Machine Learning", "Computer Networks", "Operating Systems"],
  },
]

export default function ExperiencePage() {
  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-12">
        <h1 className="text-3xl md:text-4xl font-bold text-terminal-bright mb-6">
          <TerminalText text="Experience" typingDelay={80} />
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
    "JavaScript/TypeScript",
    "Python",
    "Go",
    "C/C++",
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
    "Kubernetes",
    "AWS",
    "Azure",
    "CI/CD",
    "Terraform"
  ],
  "ml_ai": [
    "TensorFlow",
    "scikit-learn",
    "PyTorch",
    "NLP",
    "Computer Vision"
  ],
  "security": [
    "Penetration Testing",
    "OWASP",
    "Cryptography",
    "Network Security",
    "Bug Bounty"
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
