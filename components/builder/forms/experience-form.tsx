"use client"

import { useResume, type ResumeData } from "@/lib/resume-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

export function ExperienceForm() {
  const { resumeData, setResumeData } = useResume()
  const [expandedIds, setExpandedIds] = useState<string[]>(resumeData.experience.map((e) => e.id))

  const addExperience = () => {
    const newExp = {
      id: `exp-${Date.now()}`,
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    }
    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, newExp],
    })
    setExpandedIds([...expandedIds, newExp.id])
  }

  const updateExperience = (id: string, updates: Partial<ResumeData["experience"][0]>) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map((exp) => (exp.id === id ? { ...exp, ...updates } : exp)),
    })
  }

  const removeExperience = (id: string) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.filter((exp) => exp.id !== id),
    })
  }

  const toggleExpanded = (id: string) => {
    setExpandedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  return (
    <div className="space-y-4">
      {resumeData.experience.map((exp, index) => (
        <Card key={exp.id} className="overflow-hidden">
          <CardHeader
            className="flex cursor-pointer flex-row items-center justify-between p-4"
            onClick={() => toggleExpanded(exp.id)}
          >
            <div>
              <p className="font-medium text-foreground">{exp.position || `Experience ${index + 1}`}</p>
              <p className="text-sm text-muted-foreground">{exp.company || "Company name"}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation()
                  removeExperience(exp.id)
                }}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
              {expandedIds.includes(exp.id) ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </div>
          </CardHeader>

          {expandedIds.includes(exp.id) && (
            <CardContent className="space-y-4 border-t p-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Position</Label>
                  <Input
                    value={exp.position}
                    onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                    placeholder="Job Title"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Company</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                    placeholder="Company Name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  value={exp.location}
                  onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                  placeholder="City, State"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                    disabled={exp.current}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`current-${exp.id}`}
                  checked={exp.current}
                  onCheckedChange={(checked) => updateExperience(exp.id, { current: checked as boolean })}
                />
                <Label htmlFor={`current-${exp.id}`}>Currently working here</Label>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                  placeholder="Describe your responsibilities and achievements..."
                  rows={4}
                />
              </div>
            </CardContent>
          )}
        </Card>
      ))}

      <Button variant="outline" className="w-full gap-2 bg-transparent" onClick={addExperience}>
        <Plus className="h-4 w-4" />
        Add Experience
      </Button>
    </div>
  )
}
