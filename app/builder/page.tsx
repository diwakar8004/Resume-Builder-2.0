"use client"

import { Suspense } from "react"
import { ResumeProvider } from "@/lib/resume-context"
import { ResumeBuilder } from "@/components/builder/resume-builder"

function BuilderContent() {
  return (
    <ResumeProvider>
      <ResumeBuilder />
    </ResumeProvider>
  )
}

export default function BuilderPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
      <BuilderContent />
    </Suspense>
  )
}
