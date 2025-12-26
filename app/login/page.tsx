"use client"

import { useState } from "react"
import { login } from "./actions"
import { TerminalText } from "@/components/terminal-text"
import { Loader2 } from "lucide-react"

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const result = await login(formData)

    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
    // If success, the server action handles redirect, so we don't need to do anything here
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-terminal-black p-4">
      <div className="w-full max-w-md border border-terminal-green/30 rounded-lg bg-terminal-black/50 backdrop-blur shadow-2xl overflow-hidden">
        <div className="bg-terminal-green/10 border-b border-terminal-green/20 px-4 py-3 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
          <div className="ml-2 text-xs text-terminal-green/60 font-mono">admin_access.sh</div>
        </div>

        <div className="p-8 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-terminal-bright">
              <TerminalText text="system.login()" />
            </h1>
            <p className="text-sm text-terminal-green/60">Enter credentials to access admin panel</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-mono text-terminal-green/80 uppercase">Email</label>
              <input
                name="email"
                type="email"
                required
                className="w-full bg-terminal-black border border-terminal-green/30 rounded px-3 py-2 text-terminal-green focus:outline-none focus:border-terminal-bright focus:ring-1 focus:ring-terminal-bright/50 transition-all font-mono"
                placeholder="admin@example.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono text-terminal-green/80 uppercase">Password</label>
              <input
                name="password"
                type="password"
                required
                className="w-full bg-terminal-black border border-terminal-green/30 rounded px-3 py-2 text-terminal-green focus:outline-none focus:border-terminal-bright focus:ring-1 focus:ring-terminal-bright/50 transition-all font-mono"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="p-3 border border-red-500/30 bg-red-500/10 text-red-500 text-sm rounded font-mono">
                Error: {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-terminal-green text-terminal-black font-bold py-2 px-4 rounded hover:bg-terminal-green/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Authenticating...
                </>
              ) : (
                "Access System"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
