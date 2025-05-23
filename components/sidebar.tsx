"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Code, Briefcase, FileText, Mail, User, Terminal, Menu, X, Github, Linkedin, Twitter } from "lucide-react"
import { TerminalText } from "@/components/terminal-text"

const navItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "About", path: "/about", icon: User },
  { name: "Projects", path: "/projects", icon: Code },
  { name: "Experience", path: "/experience", icon: Briefcase },
  { name: "Blog", path: "/blog", icon: FileText },
  { name: "Contact", path: "/contact", icon: Mail },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 md:hidden bg-terminal-black border border-terminal-green/20 rounded-md p-2 text-terminal-green"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
        fixed top-0 left-0 z-40 w-[280px] h-screen transition-transform 
        bg-terminal-black border-r border-terminal-green/20
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
      >
        <div className="h-full flex flex-col overflow-y-auto py-5 px-4">
          {/* Logo */}
          <div className="mb-8 px-2">
            <div className="flex items-center">
              <Terminal className="h-6 w-6 text-terminal-bright" />
              <TerminalText
                text="sagar@kundu:~$"
                className="ml-2 text-xl font-mono font-bold text-terminal-bright"
                typingDelay={100}
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.path

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`
                    flex items-center px-3 py-2 rounded-md text-sm font-medium group transition-colors
                    ${
                      isActive
                        ? "bg-terminal-green/10 text-terminal-bright border-l-2 border-terminal-bright"
                        : "text-terminal-green/80 hover:bg-terminal-green/5 hover:text-terminal-bright"
                    }
                  `}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${isActive ? "text-terminal-bright" : "text-terminal-green/60 group-hover:text-terminal-green"}`}
                  />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Social links */}
          <div className="pt-6 border-t border-terminal-green/20">
            <p className="px-3 mb-3 text-xs text-terminal-green/60 font-mono">// Connect</p>
            <div className="flex space-x-3 px-3">
              <a
                href="https://github.com/sagarkundu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-terminal-green/80 hover:text-terminal-bright transition-colors"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://linkedin.com/in/sagarkundu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-terminal-green/80 hover:text-terminal-bright transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://twitter.com/sagarkundu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-terminal-green/80 hover:text-terminal-bright transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-6 mt-6">
            <div className="px-3 text-xs text-terminal-green/60 font-mono">
              <p>© {new Date().getFullYear()} Sagar Kundu</p>
              <p className="mt-1">v1.0.0</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsOpen(false)} />}
    </>
  )
}
