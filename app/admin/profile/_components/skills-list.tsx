"use client"

import { useState } from "react"
import { addSkill, deleteSkill } from "@/app/admin/profile/actions"
import { Button } from "@/components/ui/button"
import { Trash2, Plus, Code } from "lucide-react"

export function SkillsList({ items }: { items: any[] }) {
  const [showAdd, setShowAdd] = useState(false)

  // Group skills by category
  const groupedSkills = items.reduce((acc: any, skill) => {
    const category = skill.category || "Other"
    if (!acc[category]) acc[category] = []
    acc[category].push(skill)
    return acc
  }, {})

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex justify-between items-center">
         <h3 className="text-xl font-bold text-terminal-bright">Skills</h3>
         <Button onClick={() => setShowAdd(!showAdd)} variant="outline" className="border-terminal-green text-terminal-green hover:bg-terminal-green/10">
           <Plus className="w-4 h-4 mr-2" /> Add Skill
         </Button>
      </div>

      {showAdd && (
        <form action={async (formData) => {
            await addSkill(formData)
            setShowAdd(false)
        }} className="border border-terminal-green/20 rounded-lg p-6 bg-terminal-black/50 space-y-4 mb-8">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input name="name" placeholder="Skill Name (e.g. React)" required className="bg-terminal-black border border-terminal-green/30 rounded px-3 py-2 text-terminal-green" />
              <input name="category" placeholder="Category (e.g. Frontend)" required className="bg-terminal-black border border-terminal-green/30 rounded px-3 py-2 text-terminal-green" />
              <input name="proficiency" type="number" min="0" max="100" placeholder="Proficiency (0-100)" className="bg-terminal-black border border-terminal-green/30 rounded px-3 py-2 text-terminal-green" />
           </div>
           <div className="flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => setShowAdd(false)}>Cancel</Button>
              <Button type="submit" className="bg-terminal-green text-terminal-black">Save</Button>
           </div>
        </form>
      )}

      {Object.entries(groupedSkills).map(([category, categorySkills]: [string, any]) => (
        <div key={category} className="space-y-4">
           <h4 className="text-lg font-bold text-terminal-bright border-b border-terminal-green/20 pb-2">{category}</h4>
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
             {categorySkills.map((skill: any) => (
               <div key={skill.id} className="flex justify-between items-center border border-terminal-green/20 rounded p-3 bg-terminal-black/30 group">
                  <div className="flex items-center gap-2">
                     <Code className="w-4 h-4 text-terminal-green" />
                     <span className="text-terminal-green font-mono">{skill.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <span className="text-xs text-terminal-green/50">{skill.proficiency}%</span>
                     <button 
                        onClick={() => deleteSkill(skill.id)}
                        className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                     >
                        <Trash2 className="w-4 h-4" />
                     </button>
                  </div>
               </div>
             ))}
           </div>
        </div>
      ))}
    </div>
  )
}
