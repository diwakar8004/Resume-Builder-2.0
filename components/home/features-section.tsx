import { FileText, Palette, Download, Clock, Shield, Smartphone } from "lucide-react"

const features = [
  {
    icon: FileText,
    title: "Easy to Use Editor",
    description: "Intuitive drag-and-drop interface makes creating your resume a breeze. No design skills required.",
  },
  {
    icon: Palette,
    title: "Professional Templates",
    description: "Choose from 5+ beautifully designed templates, each crafted by professional designers.",
  },
  {
    icon: Download,
    title: "Multiple Export Formats",
    description: "Download your resume as PDF or DOCX. Perfect formatting guaranteed every time.",
  },
  {
    icon: Clock,
    title: "Real-time Preview",
    description: "See your changes instantly as you type. No more guessing how your resume will look.",
  },
  {
    icon: Shield,
    title: "Your Data is Safe",
    description: "Your information is securely stored and never shared with third parties.",
  },
  {
    icon: Smartphone,
    title: "Works Everywhere",
    description: "Create and edit your resume on any device - desktop, tablet, or mobile.",
  },
]

export function FeaturesSection() {
  return (
    <section className="bg-background py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything You Need to Build a Great Resume
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Powerful features designed to help you create the perfect resume quickly and easily
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="relative rounded-2xl border border-border bg-card p-8 transition-colors hover:bg-muted/50"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
