"use client"

import { useResume } from "@/lib/resume-context"
import { MinimalTemplate } from "./templates/minimal-template"
import { ExecutiveTemplate } from "./templates/executive-template"
import { DeveloperTemplate } from "./templates/developer-template"
import { CompactTemplate } from "./templates/compact-template"
import { TimelineTemplate } from "./templates/timeline-template"
import { TwoColumnTemplate } from "./templates/two-column-template"

export function ResumePreview() {
  const { selectedTemplate, resumeData } = useResume()

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case "minimal":
        return <MinimalTemplate data={resumeData} />
      case "executive":
        return <ExecutiveTemplate data={resumeData} />
      case "developer":
        return <DeveloperTemplate data={resumeData} />
      case "compact":
        return <CompactTemplate data={resumeData} />
      case "timeline":
        return <TimelineTemplate data={resumeData} />
      case "two-column":
        return <TwoColumnTemplate data={resumeData} />
      default:
        return <MinimalTemplate data={resumeData} />
    }
  }

  return (
    <div
      id="resume-preview"
      className="aspect-[8.5/11] w-full overflow-hidden rounded-lg bg-white shadow-xl"
      style={{ maxWidth: "816px" }}
    >
      <div id="resume-preview-content" className="h-full w-full">
        {renderTemplate()}
      </div>
    </div>
  )
}
