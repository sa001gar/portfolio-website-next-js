import type { ReactNode } from "react"

interface TerminalCommandProps {
  command: string
  output: ReactNode
  prompt?: string
}

export function TerminalCommand({ command, output, prompt = "visitor@sagarkundu:~$" }: TerminalCommandProps) {
  return (
    <div className="mb-2 sm:mb-4">
      <div className="flex flex-wrap sm:flex-nowrap">
        <span className="text-terminal-bright mr-1 sm:mr-2 text-xs sm:text-sm break-all">{prompt}</span>
        <span className="text-terminal-green text-xs sm:text-sm break-all">{command}</span>
      </div>
      <div className="mt-1 ml-0 text-terminal-green/90 text-xs sm:text-sm overflow-x-auto">
        {output}
      </div>
    </div>
  )
}