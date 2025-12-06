"use client"

import { useResume, type ResumeData } from "@/lib/resume-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

export function ProjectsForm() {
  const { resumeData, setResumeData } = useResume()
  const [expandedIds, setExpandedIds] = useState<string[]>(resumeData.projects.map((p) => p.id))

  const addProject = () => {
    const newProject = {
      id: `proj-${Date.now()}`,
      name: "",
      description: "",
      technologies: "",
      link: "",
    }
    setResumeData({
      ...resumeData,
      projects: [...resumeData.projects, newProject],
    })
    setExpandedIds([...expandedIds, newProject.id])
  }

  const updateProject = (id: string, updates: Partial<ResumeData["projects"][0]>) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.map((proj) => (proj.id === id ? { ...proj, ...updates } : proj)),
    })
  }

  const removeProject = (id: string) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.filter((proj) => proj.id !== id),
    })
  }

  const toggleExpanded = (id: string) => {
    setExpandedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  return (
    <div className="space-y-4">
      {resumeData.projects.map((project, index) => (
        <Card key={project.id} className="overflow-hidden">
          <CardHeader
            className="flex cursor-pointer flex-row items-center justify-between p-4"
            onClick={() => toggleExpanded(project.id)}
          >
            <div>
              <p className="font-medium text-foreground">{project.name || `Project ${index + 1}`}</p>
              <p className="text-sm text-muted-foreground">{project.technologies || "Technologies used"}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation()
                  removeProject(project.id)
                }}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
              {expandedIds.includes(project.id) ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </div>
          </CardHeader>

          {expandedIds.includes(project.id) && (
            <CardContent className="space-y-4 border-t p-4">
              <div className="space-y-2">
                <Label>Project Name</Label>
                <Input
                  value={project.name}
                  onChange={(e) => updateProject(project.id, { name: e.target.value })}
                  placeholder="My Awesome Project"
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={project.description}
                  onChange={(e) => updateProject(project.id, { description: e.target.value })}
                  placeholder="Describe what the project does and your contributions..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Technologies Used</Label>
                <Input
                  value={project.technologies}
                  onChange={(e) => updateProject(project.id, { technologies: e.target.value })}
                  placeholder="React, Node.js, PostgreSQL"
                />
              </div>

              <div className="space-y-2">
                <Label>Link (optional)</Label>
                <Input
                  value={project.link}
                  onChange={(e) => updateProject(project.id, { link: e.target.value })}
                  placeholder="github.com/username/project"
                />
              </div>
            </CardContent>
          )}
        </Card>
      ))}

      <Button variant="outline" className="w-full gap-2 bg-transparent" onClick={addProject}>
        <Plus className="h-4 w-4" />
        Add Project
      </Button>
    </div>
  )
}
