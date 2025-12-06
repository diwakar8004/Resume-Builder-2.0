"use client"

import { useResume, type ResumeData } from "@/lib/resume-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

export function EducationForm() {
  const { resumeData, setResumeData } = useResume()
  const [expandedIds, setExpandedIds] = useState<string[]>(resumeData.education.map((e) => e.id))

  const addEducation = () => {
    const newEdu = {
      id: `edu-${Date.now()}`,
      school: "",
      degree: "",
      field: "",
      location: "",
      startDate: "",
      endDate: "",
      gpa: "",
    }
    setResumeData({
      ...resumeData,
      education: [...resumeData.education, newEdu],
    })
    setExpandedIds([...expandedIds, newEdu.id])
  }

  const updateEducation = (id: string, updates: Partial<ResumeData["education"][0]>) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.map((edu) => (edu.id === id ? { ...edu, ...updates } : edu)),
    })
  }

  const removeEducation = (id: string) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter((edu) => edu.id !== id),
    })
  }

  const toggleExpanded = (id: string) => {
    setExpandedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  return (
    <div className="space-y-4">
      {resumeData.education.map((edu, index) => (
        <Card key={edu.id} className="overflow-hidden">
          <CardHeader
            className="flex cursor-pointer flex-row items-center justify-between p-4"
            onClick={() => toggleExpanded(edu.id)}
          >
            <div>
              <p className="font-medium text-foreground">{edu.degree || `Education ${index + 1}`}</p>
              <p className="text-sm text-muted-foreground">{edu.school || "School name"}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation()
                  removeEducation(edu.id)
                }}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
              {expandedIds.includes(edu.id) ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </div>
          </CardHeader>

          {expandedIds.includes(edu.id) && (
            <CardContent className="space-y-4 border-t p-4">
              <div className="space-y-2">
                <Label>School</Label>
                <Input
                  value={edu.school}
                  onChange={(e) => updateEducation(edu.id, { school: e.target.value })}
                  placeholder="University Name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Degree</Label>
                  <Input
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                    placeholder="Bachelor of Science"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Field of Study</Label>
                  <Input
                    value={edu.field}
                    onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
                    placeholder="Computer Science"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    value={edu.location}
                    onChange={(e) => updateEducation(edu.id, { location: e.target.value })}
                    placeholder="City, State"
                  />
                </div>
                <div className="space-y-2">
                  <Label>GPA (optional)</Label>
                  <Input
                    value={edu.gpa}
                    onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })}
                    placeholder="3.8"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      ))}

      <Button variant="outline" className="w-full gap-2 bg-transparent" onClick={addEducation}>
        <Plus className="h-4 w-4" />
        Add Education
      </Button>
    </div>
  )
}
