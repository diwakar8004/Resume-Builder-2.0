"use client"

import type React from "react"

import { useState } from "react"
import { useResume } from "@/lib/resume-context"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, X } from "lucide-react"

export function SkillsForm() {
  const { resumeData, setResumeData } = useResume()
  const [newSkill, setNewSkill] = useState("")

  const addSkill = () => {
    if (newSkill.trim() && !resumeData.skills.includes(newSkill.trim())) {
      setResumeData({
        ...resumeData,
        skills: [...resumeData.skills, newSkill.trim()],
      })
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter((skill) => skill !== skillToRemove),
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addSkill()
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a skill..."
          className="flex-1"
        />
        <Button onClick={addSkill} size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {resumeData.skills.map((skill) => (
          <Badge key={skill} variant="secondary" className="gap-1 py-1.5 pl-3 pr-2 text-sm">
            {skill}
            <button onClick={() => removeSkill(skill)} className="rounded-full p-0.5 hover:bg-muted-foreground/20">
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>

      {resumeData.skills.length === 0 && (
        <p className="text-center text-sm text-muted-foreground">No skills added yet. Start typing to add skills.</p>
      )}
    </div>
  )
}
