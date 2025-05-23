import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface TerminalWindowProps {
  children: ReactNode
  title?: string
  className?: string
  fullHeight?: boolean
}

export function TerminalWindow({ children, title = "terminal", className, fullHeight = false }: TerminalWindowProps) {
  return (
    <div
      className={cn(
        "bg-terminal-black border border-terminal-green/30 rounded-md overflow-hidden shadow-glow",
        fullHeight ? "h-full" : "",
        className,
      )}
    >
      {/* Terminal header */}
      <div className="flex items-center px-4 py-2 bg-terminal-black border-b border-terminal-green/20">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex-1 text-center">
          <span className="text-xs font-mono text-terminal-green/70">{title}</span>
        </div>
        <div className="w-12"></div> {/* Spacer to center the title */}
      </div>

      {/* Terminal content */}
      <div className="p-4 font-mono text-terminal-green">{children}</div>
    </div>
  )
}
