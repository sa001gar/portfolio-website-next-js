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
        "group flex flex-col h-full bg-terminal-black border border-terminal-green/20 rounded-md overflow-hidden hover:border-terminal-green/50 transition-all duration-300 shadow-sm hover:shadow-glow",
        className,
      )}
    >
      {/* Thumbnail Header */}
      <div className="relative h-48 overflow-hidden flex-shrink-0 bg-terminal-black/60">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-terminal-black via-terminal-black/30 to-transparent opacity-90" />
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Title: exactly 2 lines reserved, aligned to top baseline */}
          <h3
            className="text-lg font-bold font-mono text-terminal-bright mb-2.5 line-clamp-2 h-[3.25rem] min-h-[3.25rem] max-h-[3.25rem] leading-[1.625rem] group-hover:text-terminal-green transition-colors"
            title={title}
          >
            {title}
          </h3>

          {/* Description: exactly 2 lines reserved, aligned to top baseline */}
          <p
            className="text-terminal-green/80 text-sm mb-3.5 line-clamp-2 h-[2.75rem] min-h-[2.75rem] max-h-[2.75rem] leading-[1.375rem]"
            title={description}
          >
            {description}
          </p>

          {/* Chips / Tags: exactly 3 lines reserved */}
          <div className="flex flex-wrap gap-1.5 h-[5.25rem] min-h-[5.25rem] max-h-[5.25rem] overflow-hidden content-start mb-4">
            {tags && tags.length > 0 ? (
              tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="h-6 inline-flex items-center text-[11px] font-mono px-2.5 rounded-full bg-terminal-green/5 border-terminal-green/25 text-terminal-green/90 hover:border-terminal-green/50 hover:bg-terminal-green/10 transition-colors shrink-0"
                >
                  {tag}
                </Badge>
              ))
            ) : null}
          </div>
        </div>

        {/* Footer: pinned to bottom */}
        <div className="pt-3 border-t border-terminal-green/15 flex items-center justify-between mt-auto">
          <div className="flex items-center space-x-3">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-terminal-green/70 hover:text-terminal-bright transition-colors p-1 rounded"
                aria-label={`View source code for ${title} on GitHub (opens in new tab)`}
              >
                <Github size={18} />
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-terminal-green/70 hover:text-terminal-bright transition-colors p-1 rounded"
                aria-label={`View live website for ${title} (opens in new tab)`}
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>

          <Link
            href={`/project/${slug}`}
            className="text-terminal-bright text-xs font-mono font-medium flex items-center hover:text-terminal-green hover:underline transition-colors"
            aria-label={`Read more details about ${title}`}
          >
            Read More <ArrowRight size={14} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}
