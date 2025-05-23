"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchFilterProps {
  placeholder?: string
  onSearch: (query: string) => void
  className?: string
  initialQuery?: string
}

export function SearchFilter({ placeholder = "Search...", onSearch, className, initialQuery = "" }: SearchFilterProps) {
  const [query, setQuery] = useState(initialQuery)
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Debounce search to avoid too many updates
    const timer = setTimeout(() => {
      onSearch(query)
    }, 300)

    return () => clearTimeout(timer)
  }, [query, onSearch])

  const handleClear = () => {
    setQuery("")
    onSearch("")
    inputRef.current?.focus()
  }

  return (
    <div
      className={cn(
        "relative flex items-center w-full max-w-md",
        isFocused ? "ring-1 ring-terminal-green" : "",
        className,
      )}
    >
      <div className="absolute left-3 text-terminal-green/60">
        <Search size={16} />
      </div>
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-terminal-black border border-terminal-green/30 rounded-md pl-9 pr-9 py-2 text-terminal-green placeholder:text-terminal-green/40 focus:outline-none"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {query && (
        <button
          onClick={handleClear}
          className="absolute right-3 text-terminal-green/60 hover:text-terminal-bright"
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  )
}
