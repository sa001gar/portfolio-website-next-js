import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { TerminalWindow } from "@/components/terminal-window"
import { TerminalCommand } from "@/components/terminal-command"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Github, ExternalLink, Server, Database, Layout } from "lucide-react"

// Mock projects data - in a real app, this would come from a database or CMS
const projects = [
  {
    id: 1,
    title: "AI Code Analyzer",
    slug: "code-analyzer",
    description:
      "Machine learning tool that analyzes code repositories to identify security vulnerabilities and quality issues.",
    fullDescription: `
The AI Code Analyzer is a sophisticated tool designed to help developers identify security vulnerabilities, code quality issues, and performance bottlenecks in their codebases. By leveraging machine learning algorithms, the tool can detect patterns that might be missed by traditional static analysis tools.

## Key Features

- **Vulnerability Detection**: Identifies common security vulnerabilities like SQL injection, XSS, and CSRF
- **Code Quality Analysis**: Evaluates code against best practices and suggests improvements
- **Performance Optimization**: Identifies potential performance bottlenecks and suggests optimizations
- **Custom Rule Creation**: Allows users to define custom rules for their specific requirements
- **Integration with CI/CD**: Seamlessly integrates with popular CI/CD pipelines

## Technical Implementation

The backend is built with Python, utilizing TensorFlow for the machine learning components. The model is trained on a dataset of code samples with known vulnerabilities and quality issues. The frontend is developed with React, providing an intuitive interface for viewing analysis results.

The system architecture follows a microservices approach, with separate services for code parsing, analysis, and reporting. This ensures scalability and allows for easy updates to individual components.

## Challenges and Solutions

One of the main challenges was balancing accuracy with performance. Initial models had high accuracy but were too slow for practical use. By optimizing the model architecture and implementing a caching layer, we achieved a 70% reduction in analysis time while maintaining 95% accuracy.

Another challenge was handling different programming languages. We implemented a modular approach with language-specific parsers that feed into a common analysis pipeline, allowing the tool to support multiple languages with minimal code duplication.
    `,
    image: "/projects/code-analyzer.jpg",
    tags: ["Python", "TensorFlow", "React", "AWS"],
    githubUrl: "https://github.com/sagarkundu/code-analyzer",
    liveUrl: "https://code-analyzer.example.com",
    features: [
      "ML-powered vulnerability detection",
      "Code quality assessment",
      "Performance optimization suggestions",
      "Multi-language support",
      "CI/CD integration",
    ],
    technologies: {
      frontend: ["React", "TypeScript", "Material UI", "D3.js"],
      backend: ["Python", "FastAPI", "TensorFlow", "scikit-learn"],
      infrastructure: ["AWS Lambda", "Docker", "GitHub Actions", "S3", "CloudFront"],
    },
    screenshots: [
      {
        url: "/projects/code-analyzer-dashboard.jpg",
        caption: "Main dashboard showing repository analysis",
      },
      {
        url: "/projects/code-analyzer-vulnerabilities.jpg",
        caption: "Detailed view of detected vulnerabilities",
      },
      {
        url: "/projects/code-analyzer-trends.jpg",
        caption: "Code quality trends over time",
      },
    ],
    relatedProjects: ["smart-home", "secure-share"],
  },
  {
    id: 2,
    title: "Smart Home Dashboard",
    slug: "smart-home",
    description: "IoT dashboard for monitoring and controlling smart home devices with real-time analytics.",
    fullDescription: "Full description of the Smart Home Dashboard project...",
    image: "/projects/smart-home.jpg",
    tags: ["Next.js", "TypeScript", "MQTT", "Docker"],
    githubUrl: "https://github.com/sagarkundu/smart-home",
    liveUrl: "https://smart-home.example.com",
    features: [
      "Real-time device monitoring",
      "Automated routines",
      "Energy usage analytics",
      "Voice control integration",
      "Mobile responsive design",
    ],
    technologies: {
      frontend: ["Next.js", "TypeScript", "Tailwind CSS", "Chart.js"],
      backend: ["Node.js", "Express", "MQTT", "WebSockets"],
      infrastructure: ["Docker", "Raspberry Pi", "AWS IoT Core", "MongoDB"],
    },
    screenshots: [
      {
        url: "/projects/smart-home-dashboard.jpg",
        caption: "Main dashboard with device status",
      },
      {
        url: "/projects/smart-home-analytics.jpg",
        caption: "Energy usage analytics",
      },
      {
        url: "/projects/smart-home-mobile.jpg",
        caption: "Mobile interface",
      },
    ],
    relatedProjects: ["code-analyzer", "secure-share"],
  },
  {
    id: 3,
    title: "Secure File Sharing",
    slug: "secure-share",
    description: "End-to-end encrypted file sharing platform with zero-knowledge architecture.",
    fullDescription: "Full description of the Secure File Sharing project...",
    image: "/projects/secure-share.jpg",
    tags: ["Go", "React", "Cryptography", "AWS"],
    githubUrl: "https://github.com/sagarkundu/secure-share",
    liveUrl: "https://secure-share.example.com",
    features: [
      "End-to-end encryption",
      "Zero-knowledge architecture",
      "Secure file transfer",
      "Expiring links",
      "Audit logging",
    ],
    technologies: {
      frontend: ["React", "TypeScript", "Styled Components"],
      backend: ["Go", "AWS Lambda", "DynamoDB"],
      infrastructure: ["AWS S3", "CloudFront", "KMS", "Terraform"],
    },
    screenshots: [
      {
        url: "/projects/secure-share-upload.jpg",
        caption: "File upload interface",
      },
      {
        url: "/projects/secure-share-sharing.jpg",
        caption: "Sharing options and permissions",
      },
      {
        url: "/projects/secure-share-audit.jpg",
        caption: "Audit logs and activity tracking",
      },
    ],
    relatedProjects: ["code-analyzer", "smart-home"],
  },
  {
    id: 4,
    title: "ML Stock Predictor",
    slug: "stock-predictor",
    description: "Stock market prediction tool using machine learning and sentiment analysis.",
    fullDescription: "Full description of the ML Stock Predictor project...",
    image: "/projects/stock-predictor.jpg",
    tags: ["Python", "scikit-learn", "NLP", "FastAPI"],
    githubUrl: "https://github.com/sagarkundu/stock-predictor",
    features: [
      "Price prediction models",
      "Sentiment analysis from news and social media",
      "Technical indicator analysis",
      "Backtesting framework",
      "Automated trading strategies",
    ],
    technologies: {
      frontend: ["React", "D3.js", "TradingView Charts"],
      backend: ["Python", "FastAPI", "scikit-learn", "NLTK", "PyTorch"],
      infrastructure: ["Docker", "PostgreSQL", "Redis", "GitHub Actions"],
    },
    screenshots: [
      {
        url: "/projects/stock-predictor-dashboard.jpg",
        caption: "Prediction dashboard",
      },
      {
        url: "/projects/stock-predictor-analysis.jpg",
        caption: "Sentiment analysis results",
      },
      {
        url: "/projects/stock-predictor-backtest.jpg",
        caption: "Strategy backtesting interface",
      },
    ],
    relatedProjects: ["code-analyzer", "devops-suite"],
  },
  {
    id: 5,
    title: "DevOps Automation Suite",
    slug: "devops-suite",
    description: "Comprehensive toolset for automating CI/CD pipelines and infrastructure management.",
    fullDescription: "Full description of the DevOps Automation Suite project...",
    image: "/projects/devops-suite.jpg",
    tags: ["Terraform", "Ansible", "GitHub Actions", "Kubernetes"],
    githubUrl: "https://github.com/sagarkundu/devops-suite",
    features: [
      "Infrastructure as Code templates",
      "Automated deployment pipelines",
      "Monitoring and alerting setup",
      "Security compliance checks",
      "Cost optimization tools",
    ],
    technologies: {
      frontend: ["React", "TypeScript", "Grafana"],
      backend: ["Go", "Python", "Bash"],
      infrastructure: ["Terraform", "Ansible", "Kubernetes", "Prometheus", "AWS/Azure"],
    },
    screenshots: [
      {
        url: "/projects/devops-dashboard.jpg",
        caption: "DevOps dashboard",
      },
      {
        url: "/projects/devops-pipeline.jpg",
        caption: "CI/CD pipeline visualization",
      },
      {
        url: "/projects/devops-infrastructure.jpg",
        caption: "Infrastructure management interface",
      },
    ],
    relatedProjects: ["secure-share", "stock-predictor"],
  },
  {
    id: 6,
    title: "Bug Bounty Platform",
    slug: "bug-bounty",
    description: "Platform for managing and tracking bug bounty programs with automated vulnerability verification.",
    fullDescription: "Full description of the Bug Bounty Platform project...",
    image: "/projects/bug-bounty.jpg",
    tags: ["Django", "React", "PostgreSQL", "Docker"],
    githubUrl: "https://github.com/sagarkundu/bug-bounty",
    liveUrl: "https://bug-bounty.example.com",
    features: [
      "Vulnerability submission and tracking",
      "Automated verification of certain vulnerability types",
      "Researcher reputation system",
      "Payment integration",
      "Program analytics",
    ],
    technologies: {
      frontend: ["React", "Redux", "Tailwind CSS"],
      backend: ["Django", "Django REST Framework", "Celery", "PostgreSQL"],
      infrastructure: ["Docker", "Nginx", "AWS", "GitHub Actions"],
    },
    screenshots: [
      {
        url: "/projects/bug-bounty-dashboard.jpg",
        caption: "Program dashboard",
      },
      {
        url: "/projects/bug-bounty-submission.jpg",
        caption: "Vulnerability submission form",
      },
      {
        url: "/projects/bug-bounty-analytics.jpg",
        caption: "Program analytics",
      },
    ],
    relatedProjects: ["code-analyzer", "secure-share"],
  },
]

// Function to get project by slug
function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug)
}

// Function to get related projects
function getRelatedProjects(slugs: string[]) {
  return projects.filter((project) => slugs.includes(project.slug))
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  const relatedProjects = getRelatedProjects(project.relatedProjects || [])

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Link */}
        <Link
          href="/projects"
          className="inline-flex items-center text-terminal-green hover:text-terminal-bright transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to all projects
        </Link>

        {/* Project Header */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-terminal-bright">{project.title}</h1>
          <p className="text-terminal-green/80 text-lg">{project.description}</p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            {project.githubUrl && (
              <Button variant="outline" size="sm" asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  View Source
                </a>
              </Button>
            )}
            {project.liveUrl && (
              <Button size="sm" asChild>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Project Image */}
        <div className="relative h-64 md:h-80 rounded-md overflow-hidden border border-terminal-green/30 shadow-glow">
          <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
        </div>

        {/* Project Description */}
        <TerminalWindow title={`${project.slug}.md`}>
          <div className="prose prose-invert prose-terminal max-w-none">
            <div
              className="markdown-content"
              dangerouslySetInnerHTML={{
                __html: project.fullDescription
                  .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold text-terminal-bright mb-4 mt-6">$1</h1>')
                  .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold text-terminal-bright mb-3 mt-6">$1</h2>')
                  .replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold text-terminal-bright mb-3 mt-5">$1</h3>')
                  .replace(/\n/g, "<br />"),
              }}
            />
          </div>
        </TerminalWindow>

        {/* Features */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-terminal-bright">Key Features</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {project.features.map((feature, index) => (
              <li
                key={index}
                className="flex items-start border border-terminal-green/20 rounded-md p-3 bg-terminal-green/5"
              >
                <div className="w-5 h-5 rounded-full bg-terminal-green/20 flex items-center justify-center mr-3 mt-0.5">
                  <div className="w-2 h-2 bg-terminal-bright rounded-full"></div>
                </div>
                <span className="text-terminal-green">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technology Stack */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-terminal-bright">Technology Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-terminal-green/20 rounded-md p-4">
              <div className="flex items-center mb-3">
                <Layout className="w-5 h-5 text-terminal-bright mr-2" />
                <h3 className="text-lg font-medium text-terminal-bright">Frontend</h3>
              </div>
              <ul className="space-y-2">
                {project.technologies.frontend.map((tech, index) => (
                  <li key={index} className="flex items-center text-terminal-green">
                    <div className="w-1.5 h-1.5 bg-terminal-bright rounded-full mr-2"></div>
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-terminal-green/20 rounded-md p-4">
              <div className="flex items-center mb-3">
                <Server className="w-5 h-5 text-terminal-bright mr-2" />
                <h3 className="text-lg font-medium text-terminal-bright">Backend</h3>
              </div>
              <ul className="space-y-2">
                {project.technologies.backend.map((tech, index) => (
                  <li key={index} className="flex items-center text-terminal-green">
                    <div className="w-1.5 h-1.5 bg-terminal-bright rounded-full mr-2"></div>
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-terminal-green/20 rounded-md p-4">
              <div className="flex items-center mb-3">
                <Database className="w-5 h-5 text-terminal-bright mr-2" />
                <h3 className="text-lg font-medium text-terminal-bright">Infrastructure</h3>
              </div>
              <ul className="space-y-2">
                {project.technologies.infrastructure.map((tech, index) => (
                  <li key={index} className="flex items-center text-terminal-green">
                    <div className="w-1.5 h-1.5 bg-terminal-bright rounded-full mr-2"></div>
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Screenshots */}
        {project.screenshots && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-terminal-bright">Screenshots</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.screenshots.map((screenshot, index) => (
                <div key={index} className="space-y-2">
                  <div className="relative h-48 rounded-md overflow-hidden border border-terminal-green/30">
                    <Image
                      src={screenshot.url || "/placeholder.svg"}
                      alt={screenshot.caption}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-terminal-green/70 text-sm text-center">{screenshot.caption}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Terminal Command Example */}
        <TerminalWindow title="project-demo.sh">
          <TerminalCommand
            command="git clone https://github.com/sagarkundu/code-analyzer.git"
            output={<span className="text-terminal-green/70">Cloning into 'code-analyzer'...</span>}
          />
          <TerminalCommand
            command="cd code-analyzer && npm install"
            output={<span className="text-terminal-green/70">Installing dependencies...</span>}
          />
          <TerminalCommand
            command="npm run dev"
            output={
              <div className="space-y-1">
                <span className="text-terminal-green/70">Starting development server...</span>
                <span className="text-terminal-bright">Server running at http://localhost:3000</span>
              </div>
            }
          />
        </TerminalWindow>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="space-y-4 border-t border-terminal-green/20 pt-8">
            <h2 className="text-2xl font-bold text-terminal-bright">Related Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedProjects.map((relatedProject) => (
                <Link key={relatedProject.id} href={`/projects/${relatedProject.slug}`} className="block group">
                  <div className="border border-terminal-green/20 rounded-md p-4 hover:border-terminal-green/50 transition-all hover:bg-terminal-green/5">
                    <h3 className="text-terminal-bright font-medium group-hover:text-terminal-bright mb-1">
                      {relatedProject.title}
                    </h3>
                    <p className="text-terminal-green/70 text-sm line-clamp-2">{relatedProject.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {relatedProject.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
