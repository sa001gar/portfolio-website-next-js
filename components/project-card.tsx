import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  tags: string[]
  githubUrl?: string
  liveUrl?: string
  slug: string
  className?: string
}

export function ProjectCard({
  title,
  description,
  image,
  tags,
  githubUrl,
  liveUrl,
  slug,
  className,
}: ProjectCardProps) {
  return (
    <div
      className={cn(
        "group bg-terminal-black border border-terminal-green/20 rounded-md overflow-hidden hover:border-terminal-green/50 transition-all duration-300 shadow-sm hover:shadow-glow",
        className,
      )}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-terminal-black to-transparent opacity-80"></div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-terminal-bright mb-2">{title}</h3>
        <p className="text-terminal-green/80 text-sm mb-3 line-clamp-2">{description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs bg-terminal-green/5">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex space-x-3">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-terminal-green/70 hover:text-terminal-bright transition-colors"
                aria-label="View source code on GitHub"
              >
                <Github size={18} />
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-terminal-green/70 hover:text-terminal-bright transition-colors"
                aria-label="View live project"
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>

          <Link href={`/project/${slug}`} className="text-terminal-bright text-sm flex items-center hover:underline">
            Read More <ArrowRight size={14} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}
