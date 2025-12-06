"use client"

import { useResume } from "@/lib/resume-context"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

const templates = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean & traditional",
    color: "bg-slate-50 border-slate-300",
  },
  {
    id: "executive",
    name: "Executive",
    description: "Elegant serif style",
    color: "bg-amber-50 border-amber-300",
  },
  {
    id: "developer",
    name: "Developer",
    description: "Dark tech theme",
    color: "bg-slate-800 border-emerald-400",
  },
  {
    id: "compact",
    name: "Compact",
    description: "Dense layout",
    color: "bg-gray-50 border-gray-400",
  },
  {
    id: "timeline",
    name: "Timeline",
    description: "Visual timeline",
    color: "bg-indigo-50 border-indigo-400",
  },
  {
    id: "two-column",
    name: "Two Column",
    description: "Modern sidebar",
    color: "bg-sky-50 border-sky-400",
  },
]

interface TemplateSelectorProps {
  onSelect?: () => void
}

export function TemplateSelector({ onSelect }: TemplateSelectorProps) {
  const { selectedTemplate, setSelectedTemplate } = useResume()

  const handleSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
    onSelect?.()
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold text-foreground">Templates</h3>
        <p className="text-sm text-muted-foreground">Choose a design</p>
      </div>

      <div className="space-y-3">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => handleSelect(template.id)}
            className={cn(
              "relative w-full overflow-hidden rounded-lg border-2 p-1 text-left transition-all hover:border-primary",
              selectedTemplate === template.id ? "border-primary ring-2 ring-primary/20" : "border-border",
            )}
          >
            <div className={cn("aspect-[3/4] rounded border", template.color)}>
              {/* Mini preview */}
              <div className="flex h-full flex-col gap-1 p-2">
                <div className="h-2 w-8 rounded bg-foreground/10" />
                <div className="h-1 w-full rounded bg-foreground/5" />
                <div className="h-1 w-3/4 rounded bg-foreground/5" />
              </div>
            </div>

            <div className="p-2">
              <p className="text-sm font-medium text-foreground">{template.name}</p>
              <p className="text-xs text-muted-foreground">{template.description}</p>
            </div>

            {selectedTemplate === template.id && (
              <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                <Check className="h-3 w-3 text-primary-foreground" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
