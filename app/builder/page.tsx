import { ResumeProvider } from "@/lib/resume-context"
import { ResumeBuilder } from "@/components/builder/resume-builder"

export default function BuilderPage() {
  return (
    <ResumeProvider>
      <ResumeBuilder />
    </ResumeProvider>
  )
}
