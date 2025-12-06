"use client"

import { useState } from "react"
import { useResume } from "@/lib/resume-context"
import { exportToPDF, exportToDOCX } from "@/lib/export-utils"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Download, FileText, FileIcon, Loader2 } from "lucide-react"

export function ExportDropdown() {
  const { resumeData, selectedTemplate } = useResume()
  const [isExporting, setIsExporting] = useState(false)

  const getFilename = () => {
    const fullName = resumeData?.personalInfo?.fullName || "resume"
    return `${fullName}-resume`.toLowerCase().replace(/\s+/g, "-")
  }

  const handlePDFExport = async () => {
    setIsExporting(true)
    try {
      await exportToPDF(resumeData, getFilename(), selectedTemplate)
    } catch (error) {
      console.error("PDF export failed:", error)
    } finally {
      setIsExporting(false)
    }
  }

  const handleDOCXExport = () => {
    setIsExporting(true)
    try {
      exportToDOCX(resumeData, getFilename())
    } catch (error) {
      console.error("DOCX export failed:", error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" className="gap-2" disabled={isExporting}>
          {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
          <span className="hidden sm:inline">Download</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handlePDFExport} className="gap-2 cursor-pointer">
          <FileText className="h-4 w-4" />
          Download as PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDOCXExport} className="gap-2 cursor-pointer">
          <FileIcon className="h-4 w-4" />
          Download as DOC
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
