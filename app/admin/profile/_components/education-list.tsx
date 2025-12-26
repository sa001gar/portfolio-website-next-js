"use client"

import { useState } from "react"
import { addEducation, deleteEducation } from "@/app/admin/profile/actions"
import { Button } from "@/components/ui/button"
import { Trash2, Plus, GraduationCap } from "lucide-react"

export function EducationList({ items }: { items: any[] }) {
  const [showAdd, setShowAdd] = useState(false)

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-center">
         <h3 className="text-xl font-bold text-terminal-bright">Education</h3>
         <Button onClick={() => setShowAdd(!showAdd)} variant="outline" className="border-terminal-green text-terminal-green hover:bg-terminal-green/10">
           <Plus className="w-4 h-4 mr-2" /> Add Education
         </Button>
      </div>

      {showAdd && (
        <form action={async (formData) => {
            await addEducation(formData)
            setShowAdd(false)
        }} className="border border-terminal-green/20 rounded-lg p-6 bg-terminal-black/50 space-y-4 mb-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="degree" placeholder="Degree / Certificate" required className="bg-terminal-black border border-terminal-green/30 rounded px-3 py-2 text-terminal-green" />
              <input name="institution" placeholder="Institution" required className="bg-terminal-black border border-terminal-green/30 rounded px-3 py-2 text-terminal-green" />
              <input name="start_year" placeholder="Start Year" required className="bg-terminal-black border border-terminal-green/30 rounded px-3 py-2 text-terminal-green" />
              <input name="end_year" placeholder="End Year" required className="bg-terminal-black border border-terminal-green/30 rounded px-3 py-2 text-terminal-green" />
           </div>
           <div className="flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => setShowAdd(false)}>Cancel</Button>
              <Button type="submit" className="bg-terminal-green text-terminal-black">Save</Button>
           </div>
        </form>
      )}

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="relative border border-terminal-green/20 rounded-lg p-5 hover:bg-terminal-green/5 transition-colors group">
            <button 
                onClick={() => deleteEducation(item.id)}
                className="absolute top-4 right-4 text-terminal-green/30 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
            >
                <Trash2 className="w-5 h-5" />
            </button>
            <div className="flex items-start gap-4">
              <div className="bg-terminal-green/10 p-2 rounded">
                 <GraduationCap className="w-5 h-5 text-terminal-green" />
              </div>
              <div>
                 <h4 className="font-bold text-terminal-bright">{item.degree}</h4>
                 <div className="text-sm text-terminal-green/80 mb-1">{item.institution}</div>
                 <div className="text-xs text-terminal-green/50 font-mono">
                    {item.start_year} - {item.end_year}
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
