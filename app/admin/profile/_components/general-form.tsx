"use client"

import { useState } from "react"
import { updateProfile } from "@/app/admin/profile/actions"
import { Button } from "@/components/ui/button"
import { Loader2, Save } from "lucide-react"

export function GeneralForm({ profile }: { profile: any }) {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    const formData = new FormData(event.currentTarget)
    await updateProfile(formData)
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl border border-terminal-green/20 rounded-lg p-6 bg-terminal-black/50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-mono text-terminal-green/80 uppercase">Full Name</label>
          <input
            name="full_name"
            defaultValue={profile?.full_name}
            className="w-full bg-terminal-black border border-terminal-green/30 rounded px-3 py-2 text-terminal-green focus:outline-none focus:border-terminal-bright"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-mono text-terminal-green/80 uppercase">Job Title</label>
          <input
            name="title"
            defaultValue={profile?.title}
            className="w-full bg-terminal-black border border-terminal-green/30 rounded px-3 py-2 text-terminal-green focus:outline-none focus:border-terminal-bright"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-mono text-terminal-green/80 uppercase">Bio</label>
        <textarea
          name="bio"
          defaultValue={profile?.bio}
          rows={4}
          className="w-full bg-terminal-black border border-terminal-green/30 rounded px-3 py-2 text-terminal-green focus:outline-none focus:border-terminal-bright"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-mono text-terminal-green/80 uppercase">Email</label>
          <input
            name="email"
            defaultValue={profile?.email}
            className="w-full bg-terminal-black border border-terminal-green/30 rounded px-3 py-2 text-terminal-green focus:outline-none focus:border-terminal-bright"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-mono text-terminal-green/80 uppercase">Location</label>
          <input
            name="location"
            defaultValue={profile?.location}
            className="w-full bg-terminal-black border border-terminal-green/30 rounded px-3 py-2 text-terminal-green focus:outline-none focus:border-terminal-bright"
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={loading} className="bg-terminal-green text-terminal-black hover:bg-terminal-green/90">
          {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          Save Changes
        </Button>
      </div>
    </form>
  )
}
