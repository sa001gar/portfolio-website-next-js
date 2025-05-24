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
      <div className="flex items-center px-2 sm:px-4 py-2 bg-terminal-black border-b border-terminal-green/20">
        <div className="flex space-x-1 sm:space-x-2">
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex-1 text-center">
          <span className="text-xs font-mono text-terminal-green/70 truncate">{title}</span>
        </div>
        <div className="w-6 sm:w-12"></div> {/* Spacer to center the title */}
      </div>

      {/* Terminal content */}
      <div className="p-2 sm:p-4 font-mono text-sm sm:text-base text-terminal-green overflow-x-auto">
        {children}
      </div>
    </div>
  )
}