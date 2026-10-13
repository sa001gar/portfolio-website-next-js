"use client"

import { useState } from "react"
import { addExperience, updateExperience, deleteExperience } from "@/app/admin/profile/actions"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2, Plus, Briefcase, Pencil, X, Check, Loader2 } from "lucide-react"

export function ExperienceList({ items }: { items: any[] }) {
  const [showAdd, setShowAdd] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold font-mono text-terminal-bright">Work History</h3>
          <p className="text-xs font-mono text-terminal-green/60 mt-0.5">
            Manage your roles, achievements, and tech stack.
          </p>
        </div>
        <Button
          onClick={() => {
            setShowAdd(!showAdd)
            setEditingId(null)
          }}
          variant="outline"
          className="border-terminal-green text-terminal-green hover:bg-terminal-green/10 font-mono text-xs"
        >
          {showAdd ? (
            <>
              <X className="w-3.5 h-3.5 mr-1.5" /> Close
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Experience
            </>
          )}
        </Button>
      </div>

      {/* ADD EXPERIENCE FORM */}
      {showAdd && (
        <form
          action={async (formData) => {
            setIsPending(true)
            await addExperience(formData)
            setIsPending(false)
            setShowAdd(false)
          }}
          className="border border-terminal-green/30 rounded-lg p-6 bg-terminal-black/80 space-y-4 mb-8 shadow-sm"
        >
          <div className="flex items-center justify-between pb-2 border-b border-terminal-green/20">
            <h4 className="font-mono text-sm font-bold text-terminal-bright">Add New Experience</h4>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowAdd(false)}
              className="text-terminal-green/60 hover:text-terminal-bright h-7 px-2"
            >
              <X className="w-3.5 h-3.5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-terminal-green/70 mb-1">Job Title *</label>
              <input
                name="title"
                placeholder="e.g. SDE & Tech Lead"
                required
                className="w-full bg-terminal-black border border-terminal-green/30 rounded px-3 py-2 text-xs font-mono text-terminal-bright focus:border-terminal-green focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-terminal-green/70 mb-1">Company / Organization *</label>
              <input
                name="company"
                placeholder="e.g. Clustrix Tech Solutions"
                required
                className="w-full bg-terminal-black border border-terminal-green/30 rounded px-3 py-2 text-xs font-mono text-terminal-bright focus:border-terminal-green focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-terminal-green/70 mb-1">Location</label>
              <input
                name="location"
                placeholder="e.g. Durgapur, West Bengal, India · Hybrid"
                className="w-full bg-terminal-black border border-terminal-green/30 rounded px-3 py-2 text-xs font-mono text-terminal-bright focus:border-terminal-green focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-terminal-green/70 mb-1">Order Index (Priority)</label>
              <input
                name="order_index"
                type="number"
                defaultValue={0}
                placeholder="0 = Highest priority"
                className="w-full bg-terminal-black border border-terminal-green/30 rounded px-3 py-2 text-xs font-mono text-terminal-bright focus:border-terminal-green focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-terminal-green/70 mb-1">Start Date *</label>
              <input
                name="start_date"
                type="date"
                required
                className="w-full bg-terminal-black border border-terminal-green/30 rounded px-3 py-2 text-xs font-mono text-terminal-bright focus:border-terminal-green focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-terminal-green/70 mb-1">End Date</label>
              <input
                name="end_date"
                type="date"
                className="w-full bg-terminal-black border border-terminal-green/30 rounded px-3 py-2 text-xs font-mono text-terminal-bright focus:border-terminal-green focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input type="checkbox" name="current" id="add-current" className="rounded accent-terminal-green" />
            <label htmlFor="add-current" className="text-xs font-mono text-terminal-green cursor-pointer">
              I currently work here (Present)
            </label>
          </div>

          <div>
            <label className="block text-xs font-mono text-terminal-green/70 mb-1">Summary / Description</label>
            <textarea
              name="description"
              placeholder="Overview of your responsibilities..."
              rows={2}
              className="w-full bg-terminal-black border border-terminal-green/30 rounded px-3 py-2 text-xs font-mono text-terminal-bright focus:border-terminal-green focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-terminal-green/70 mb-1">
              Key Achievements (One achievement per line)
            </label>
            <textarea
              name="achievements"
              placeholder="Built and led multiple production systems...&#10;Developed reusable platforms...&#10;Designed high-performance systems..."
              rows={3}
              className="w-full bg-terminal-black border border-terminal-green/30 rounded px-3 py-2 text-xs font-mono text-terminal-bright focus:border-terminal-green focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-terminal-green/70 mb-1">
              Technologies & Skills (Comma separated)
            </label>
            <input
              name="technologies"
              placeholder="Web Application Security, Next.js, Go, Rust, Cloudflare, TypeScript"
              className="w-full bg-terminal-black border border-terminal-green/30 rounded px-3 py-2 text-xs font-mono text-terminal-bright focus:border-terminal-green focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-terminal-green/10">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowAdd(false)}
              className="font-mono text-xs"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              size="sm"
              className="bg-terminal-green text-terminal-black font-mono text-xs font-bold hover:bg-terminal-bright"
            >
              {isPending && <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />}
              Save Experience
            </Button>
          </div>
        </form>
      )}

      {/* EXPERIENCES LIST */}
      <div className="space-y-4">
        {items.map((item) => {
          const isEditing = editingId === item.id

          if (isEditing) {
            return (
              <form
                key={item.id}
                action={async (formData) => {
                  setIsPending(true)
                  await updateExperience(item.id, formData)
                  setIsPending(false)
                  setEditingId(null)
                }}
                className="border-2 border-terminal-green/50 rounded-lg p-6 bg-terminal-black space-y-4 shadow-glow"
              >
                <div className="flex items-center justify-between pb-2 border-b border-terminal-green/20">
                  <span className="font-mono text-sm font-bold text-terminal-bright flex items-center gap-2">
                    <Pencil className="w-3.5 h-3.5 text-terminal-green" />
                    Editing: {item.title}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingId(null)}
                    className="text-terminal-green/60 hover:text-terminal-bright h-7 px-2"
                  >
                    <X className="w-3.5 h-3.5" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-terminal-green/70 mb-1">Job Title *</label>
                    <input
                      name="title"
                      defaultValue={item.title}
                      required
                      className="w-full bg-terminal-black border border-terminal-green/30 rounded px-3 py-2 text-xs font-mono text-terminal-bright focus:border-terminal-green focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-terminal-green/70 mb-1">Company *</label>
                    <input
                      name="company"
                      defaultValue={item.company}
                      required
                      className="w-full bg-terminal-black border border-terminal-green/30 rounded px-3 py-2 text-xs font-mono text-terminal-bright focus:border-terminal-green focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-terminal-green/70 mb-1">Location</label>
                    <input
                      name="location"
                      defaultValue={item.location || ""}
                      placeholder="e.g. Durgapur, West Bengal, India · Hybrid"
                      className="w-full bg-terminal-black border border-terminal-green/30 rounded px-3 py-2 text-xs font-mono text-terminal-bright focus:border-terminal-green focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-terminal-green/70 mb-1">Order Index (Sort Priority)</label>
                    <input
                      name="order_index"
                      type="number"
                      defaultValue={item.order_index ?? 0}
                      className="w-full bg-terminal-black border border-terminal-green/30 rounded px-3 py-2 text-xs font-mono text-terminal-bright focus:border-terminal-green focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-terminal-green/70 mb-1">Start Date *</label>
                    <input
                      name="start_date"
                      type="date"
                      defaultValue={item.start_date || ""}
                      required
                      className="w-full bg-terminal-black border border-terminal-green/30 rounded px-3 py-2 text-xs font-mono text-terminal-bright focus:border-terminal-green focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-terminal-green/70 mb-1">End Date</label>
                    <input
                      name="end_date"
                      type="date"
                      defaultValue={item.end_date || ""}
                      className="w-full bg-terminal-black border border-terminal-green/30 rounded px-3 py-2 text-xs font-mono text-terminal-bright focus:border-terminal-green focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    name="current"
                    id={`edit-current-${item.id}`}
                    defaultChecked={item.current}
                    className="rounded accent-terminal-green"
                  />
                  <label htmlFor={`edit-current-${item.id}`} className="text-xs font-mono text-terminal-green cursor-pointer">
                    I currently work here (Present)
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-mono text-terminal-green/70 mb-1">Summary / Description</label>
                  <textarea
                    name="description"
                    defaultValue={item.description || ""}
                    rows={3}
                    className="w-full bg-terminal-black border border-terminal-green/30 rounded px-3 py-2 text-xs font-mono text-terminal-bright focus:border-terminal-green focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-terminal-green/70 mb-1">
                    Key Achievements (One achievement per line)
                  </label>
                  <textarea
                    name="achievements"
                    defaultValue={item.achievements?.join("\n") || ""}
                    rows={4}
                    placeholder="Enter each achievement on a new line"
                    className="w-full bg-terminal-black border border-terminal-green/30 rounded px-3 py-2 text-xs font-mono text-terminal-bright focus:border-terminal-green focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-terminal-green/70 mb-1">
                    Technologies & Skills (Comma separated)
                  </label>
                  <input
                    name="technologies"
                    defaultValue={item.technologies?.join(", ") || ""}
                    placeholder="e.g. Web Application Security, Node.js, Go, Rust"
                    className="w-full bg-terminal-black border border-terminal-green/30 rounded px-3 py-2 text-xs font-mono text-terminal-bright focus:border-terminal-green focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-terminal-green/20">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingId(null)}
                    className="font-mono text-xs"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isPending}
                    size="sm"
                    className="bg-terminal-green text-terminal-black font-mono text-xs font-bold hover:bg-terminal-bright flex items-center gap-1.5"
                  >
                    {isPending ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Check className="w-3.5 h-3.5" />
                    )}
                    Save Changes
                  </Button>
                </div>
              </form>
            )
          }

          // Static Display Card with Edit & Delete actions
          return (
            <div
              key={item.id}
              className="relative border border-terminal-green/20 rounded-lg p-5 bg-terminal-black/50 hover:border-terminal-green/50 hover:bg-terminal-green/[0.02] transition-all group"
            >
              {/* Action Buttons: Edit and Delete */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(item.id)
                    setShowAdd(false)
                  }}
                  className="p-1.5 rounded text-terminal-green/60 hover:text-terminal-bright hover:bg-terminal-green/10 transition-colors"
                  title="Edit this role"
                  aria-label={`Edit ${item.title}`}
                >
                  <Pencil className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => deleteExperience(item.id)}
                  className="p-1.5 rounded text-terminal-green/40 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  title="Delete this role"
                  aria-label={`Delete ${item.title}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-start gap-4 pr-16">
                <div className="bg-terminal-green/10 p-2.5 rounded border border-terminal-green/20 mt-0.5">
                  <Briefcase className="w-5 h-5 text-terminal-green" />
                </div>

                <div className="space-y-2 flex-1">
                  <div>
                    <h4 className="font-bold text-base font-mono text-terminal-bright">{item.title}</h4>
                    <div className="text-xs font-mono text-terminal-green/80 mt-0.5">
                      {item.company}
                      {item.location && <span className="text-terminal-green/60"> • {item.location}</span>}
                    </div>
                  </div>

                  <div className="text-xs text-terminal-green/50 font-mono">
                    {item.start_date} - {item.current ? "Present" : item.end_date || "Present"}
                    {item.order_index !== undefined && (
                      <span className="ml-2 text-[11px] text-terminal-green/40">
                        (Order: {item.order_index})
                      </span>
                    )}
                  </div>

                  {item.description && (
                    <p className="text-xs text-terminal-green/80 leading-relaxed pt-1">
                      {item.description}
                    </p>
                  )}

                  {/* Achievements Preview */}
                  {item.achievements && item.achievements.length > 0 && (
                    <div className="pt-2">
                      <span className="text-[11px] font-mono font-semibold text-terminal-bright block mb-1">
                        Key Achievements:
                      </span>
                      <ul className="list-disc list-inside space-y-0.5 text-xs text-terminal-green/75">
                        {item.achievements.map((ach: string, idx: number) => (
                          <li key={idx} className="line-clamp-2">
                            {ach}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technologies Badges */}
                  {item.technologies && item.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {item.technologies.map((tech: string, idx: number) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="text-[10px] px-2 py-0 border-terminal-green/20 text-terminal-green/80 font-mono bg-terminal-green/5"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}

        {(!items || items.length === 0) && (
          <div className="text-center py-8 border border-terminal-green/20 rounded-lg text-terminal-green/50 font-mono text-xs">
            No work experience records found. Click &quot;Add Experience&quot; to create one.
          </div>
        )}
      </div>
    </div>
  )
}
