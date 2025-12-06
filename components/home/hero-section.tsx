import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Download, Palette } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute right-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Trusted by 50,000+ job seekers</span>
          </div>

          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Build Your Perfect Resume in <span className="text-primary">Minutes</span>
          </h1>

          <p className="mt-6 text-pretty text-lg text-muted-foreground sm:text-xl">
            Create stunning, professional resumes that get you noticed. Choose from beautiful templates, customize every
            detail, and export to PDF or DOCX instantly.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="group w-full sm:w-auto" asChild>
              <Link href="/builder">
                Create Your Resume
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent" asChild>
              <Link href="#templates">View Templates</Link>
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Download className="h-5 w-5 text-primary" />
              <span>Export to PDF & DOCX</span>
            </div>
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary" />
              <span>5+ Pro Templates</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span>Real-time Preview</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
