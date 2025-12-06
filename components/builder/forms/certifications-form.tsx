"use client"

import { useResume, type ResumeData } from "@/lib/resume-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

export function CertificationsForm() {
  const { resumeData, setResumeData } = useResume()
  const [expandedIds, setExpandedIds] = useState<string[]>(resumeData.certifications.map((c) => c.id))

  const addCertification = () => {
    const newCert = {
      id: `cert-${Date.now()}`,
      name: "",
      issuer: "",
      date: "",
      link: "",
    }
    setResumeData({
      ...resumeData,
      certifications: [...resumeData.certifications, newCert],
    })
    setExpandedIds([...expandedIds, newCert.id])
  }

  const updateCertification = (id: string, updates: Partial<ResumeData["certifications"][0]>) => {
    setResumeData({
      ...resumeData,
      certifications: resumeData.certifications.map((cert) => (cert.id === id ? { ...cert, ...updates } : cert)),
    })
  }

  const removeCertification = (id: string) => {
    setResumeData({
      ...resumeData,
      certifications: resumeData.certifications.filter((cert) => cert.id !== id),
    })
  }

  const toggleExpanded = (id: string) => {
    setExpandedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  return (
    <div className="space-y-4">
      {resumeData.certifications.map((cert, index) => (
        <Card key={cert.id} className="overflow-hidden">
          <CardHeader
            className="flex cursor-pointer flex-row items-center justify-between p-4"
            onClick={() => toggleExpanded(cert.id)}
          >
            <div>
              <p className="font-medium text-foreground">{cert.name || `Certification ${index + 1}`}</p>
              <p className="text-sm text-muted-foreground">{cert.issuer || "Issuing organization"}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation()
                  removeCertification(cert.id)
                }}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
              {expandedIds.includes(cert.id) ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </div>
          </CardHeader>

          {expandedIds.includes(cert.id) && (
            <CardContent className="space-y-4 border-t p-4">
              <div className="space-y-2">
                <Label>Certification Name</Label>
                <Input
                  value={cert.name}
                  onChange={(e) => updateCertification(cert.id, { name: e.target.value })}
                  placeholder="AWS Solutions Architect"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Issuing Organization</Label>
                  <Input
                    value={cert.issuer}
                    onChange={(e) => updateCertification(cert.id, { issuer: e.target.value })}
                    placeholder="Amazon Web Services"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Date Earned</Label>
                  <Input
                    type="month"
                    value={cert.date}
                    onChange={(e) => updateCertification(cert.id, { date: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Credential Link (optional)</Label>
                <Input
                  value={cert.link}
                  onChange={(e) => updateCertification(cert.id, { link: e.target.value })}
                  placeholder="https://credential.net/..."
                />
              </div>
            </CardContent>
          )}
        </Card>
      ))}

      <Button variant="outline" className="w-full gap-2 bg-transparent" onClick={addCertification}>
        <Plus className="h-4 w-4" />
        Add Certification
      </Button>
    </div>
  )
}
