"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useTerminal } from "@/components/terminal-provider"

interface CommandLineProps {
  prompt?: string
  onCommand?: (command: string) => void
  autoFocus?: boolean
}

export function CommandLine({ prompt = "visitor@sagarkundu:~$", onCommand, autoFocus = false }: CommandLineProps) {
  const [command, setCommand] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const { addCommand } = useTerminal()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (command.trim()) {
      addCommand(command)
      onCommand?.(command)
      setCommand("")
    }
  }

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <span className="text-terminal-bright mr-2">{prompt}</span>
      <input
        ref={inputRef}
        type="text"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        className="flex-1 bg-transparent border-none outline-none text-terminal-green font-mono"
        aria-label="Command input"
        autoComplete="off"
        spellCheck="false"
      />
    </form>
  )
}
