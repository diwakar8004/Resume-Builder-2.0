"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { useResume } from "@/lib/resume-context"
import { EditorSidebar } from "./editor-sidebar"
import { ResumePreview } from "./resume-preview"
import { TemplateSelector } from "./template-selector"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { FileText, Menu, Palette, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

export function ResumeBuilder() {
  const searchParams = useSearchParams()
  const { setSelectedTemplate, selectedTemplate } = useResume()
  const [showTemplates, setShowTemplates] = useState(false)
  const [showPreview, setShowPreview] = useState(true)
  const [mobileEditorOpen, setMobileEditorOpen] = useState(false)

  useEffect(() => {
    const template = searchParams.get("template")
    if (template) {
      setSelectedTemplate(template)
    }
  }, [searchParams, setSelectedTemplate])

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b border-border bg-card px-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <FileText className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="hidden text-lg font-bold text-foreground sm:inline">ResumeBuilder</span>
          </Link>

          {/* Mobile menu trigger */}
          <Sheet open={mobileEditorOpen} onOpenChange={setMobileEditorOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden bg-transparent">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full p-0 sm:max-w-md">
              <div className="h-full overflow-y-auto">
                <EditorSidebar />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 bg-transparent"
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            <span className="hidden sm:inline">{showPreview ? "Hide" : "Show"} Preview</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="gap-2 bg-transparent"
            onClick={() => setShowTemplates(!showTemplates)}
          >
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Templates</span>
          </Button>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Editor Sidebar - Desktop */}
        <aside className="hidden w-[400px] shrink-0 overflow-y-auto border-r border-border bg-card lg:block">
          <EditorSidebar />
        </aside>

        {/* Preview Panel */}
        <main className={`flex-1 overflow-hidden bg-muted/50 ${!showPreview ? "hidden" : ""}`}>
          <div className="h-full overflow-y-auto p-4 lg:p-8">
            <div className="mx-auto max-w-4xl">
              <ResumePreview />
            </div>
          </div>
        </main>

        {/* Template Selector Panel */}
        {showTemplates && (
          <aside className="w-72 shrink-0 overflow-y-auto border-l border-border bg-card p-4">
            <TemplateSelector onSelect={() => setShowTemplates(false)} />
          </aside>
        )}
      </div>
    </div>
  )
}
