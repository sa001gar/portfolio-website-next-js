import type { ReactNode } from "react"

interface TerminalCommandProps {
  command: string
  output: ReactNode
  prompt?: string
}

export function TerminalCommand({ command, output, prompt = "visitor@sagarkundu:~$" }: TerminalCommandProps) {
  return (
    <div className="mb-4">
      <div className="flex">
        <span className="text-terminal-bright mr-2">{prompt}</span>
        <span className="text-terminal-green">{command}</span>
      </div>
      <div className="mt-1 ml-0 text-terminal-green/90">{output}</div>
    </div>
  )
}
