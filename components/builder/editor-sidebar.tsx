"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PersonalInfoForm } from "./forms/personal-info-form"
import { ExperienceForm } from "./forms/experience-form"
import { EducationForm } from "./forms/education-form"
import { SkillsForm } from "./forms/skills-form"
import { ProjectsForm } from "./forms/projects-form"
import { CertificationsForm } from "./forms/certifications-form"
import { User, Briefcase, GraduationCap, Wrench, FolderOpen, Award } from "lucide-react"

const tabs = [
  { id: "personal", label: "Personal", icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "certifications", label: "Certs", icon: Award },
]

export function EditorSidebar() {
  const [activeTab, setActiveTab] = useState("personal")

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border p-4">
        <h2 className="text-lg font-semibold text-foreground">Resume Editor</h2>
        <p className="text-sm text-muted-foreground">Fill in your details below</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-1 flex-col overflow-hidden">
        <TabsList className="mx-4 mt-4 grid h-auto grid-cols-3 gap-1 bg-muted p-1">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="flex flex-col gap-1 py-2 text-xs data-[state=active]:bg-background"
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="flex-1 overflow-y-auto p-4">
          <TabsContent value="personal" className="m-0">
            <PersonalInfoForm />
          </TabsContent>
          <TabsContent value="experience" className="m-0">
            <ExperienceForm />
          </TabsContent>
          <TabsContent value="education" className="m-0">
            <EducationForm />
          </TabsContent>
          <TabsContent value="skills" className="m-0">
            <SkillsForm />
          </TabsContent>
          <TabsContent value="projects" className="m-0">
            <ProjectsForm />
          </TabsContent>
          <TabsContent value="certifications" className="m-0">
            <CertificationsForm />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
