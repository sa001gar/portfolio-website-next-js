"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type TerminalContextType = {
  commandHistory: string[]
  addCommand: (command: string) => void
  clearHistory: () => void
  terminalReady: boolean
}

const TerminalContext = createContext<TerminalContextType | undefined>(undefined)

export function TerminalProvider({ children }: { children: ReactNode }) {
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [terminalReady, setTerminalReady] = useState(false)

  useEffect(() => {
    // Simulate terminal boot sequence
    const timer = setTimeout(() => {
      setTerminalReady(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const addCommand = (command: string) => {
    setCommandHistory((prev) => [...prev, command])
  }

  const clearHistory = () => {
    setCommandHistory([])
  }

  return (
    <TerminalContext.Provider value={{ commandHistory, addCommand, clearHistory, terminalReady }}>
      {children}
    </TerminalContext.Provider>
  )
}

export function useTerminal() {
  const context = useContext(TerminalContext)
  if (context === undefined) {
    throw new Error("useTerminal must be used within a TerminalProvider")
  }
  return context
}
