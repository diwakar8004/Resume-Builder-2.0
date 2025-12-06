import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

const templates = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean & traditional",
    color: "bg-slate-50",
    accent: "border-slate-300",
    textClass: "text-slate-800",
    mutedClass: "text-slate-600",
    badge: null,
  },
  {
    id: "executive",
    name: "Executive",
    description: "Elegant serif style",
    color: "bg-amber-50",
    accent: "border-amber-300",
    textClass: "text-slate-800",
    mutedClass: "text-slate-600",
    badge: null,
  },
  {
    id: "developer",
    name: "Developer",
    description: "Dark tech theme",
    color: "bg-slate-800",
    accent: "border-emerald-400",
    textClass: "text-white",
    mutedClass: "text-white/70",
    badge: null,
  },
  {
    id: "compact",
    name: "Compact",
    description: "Dense layout",
    color: "bg-gray-50",
    accent: "border-gray-400",
    textClass: "text-slate-800",
    mutedClass: "text-slate-600",
    badge: null,
  },
  {
    id: "timeline",
    name: "Timeline",
    description: "Visual timeline",
    color: "bg-indigo-50",
    accent: "border-indigo-400",
    textClass: "text-slate-800",
    mutedClass: "text-slate-600",
    badge: null,
  },
  {
    id: "two-column",
    name: "Two Column",
    description: "Modern sidebar",
    color: "bg-sky-50",
    accent: "border-sky-400",
    textClass: "text-slate-800",
    mutedClass: "text-slate-600",
    badge: null,
  },
]

const sampleProfiles: Record<string, { name: string; title: string; summary: string[]; experience: string[]; skills: string }> = {
  minimal: {
    name: 'Alex Morgan',
    title: 'Product Designer',
    summary: ['Senior Product Designer with 8+ years experience', 'Focused on UX, prototyping and front-end'],
    experience: ['Lead Designer — Acme Corp', 'Senior Designer — Beta LLC', 'Product Designer — Gamma Inc'],
    skills: 'Figma · React · Prototyping',
  },
  executive: {
    name: 'Patricia Jones',
    title: 'Executive Director',
    summary: ['Seasoned executive with 15+ years leading teams', 'Specializes in strategy and stakeholder alignment'],
    experience: ['Director — Global Co', 'VP — Enterprise Inc', 'Manager — Solutions LLC'],
    skills: 'Leadership · Strategy · Roadmapping',
  },
  developer: {
    name: 'Samir Khan',
    title: 'Senior Software Engineer',
    summary: ['Full-stack developer with 10+ years experience', 'Focus on scalable web apps and dev tooling'],
    experience: ['Senior Engineer — TechCorp', 'Engineer — Webify', 'Intern — StartUpX'],
    skills: 'React · Node · TypeScript',
  },
  compact: {
    name: 'Jamie Lee',
    title: 'UX Researcher',
    summary: ['User researcher focused on qualitative studies', 'Helps teams validate product decisions'],
    experience: ['Researcher — Labs Inc', 'Research Assistant — UniX', 'Freelance'],
    skills: 'User Research · Interviews · Synthesis',
  },
  timeline: {
    name: 'Morgan Reed',
    title: 'Project Manager',
    summary: ['PM with strong history of delivery', 'Experienced across SaaS & mobile products'],
    experience: ['PM — AppWorks', 'Coordinator — BuildIt', 'PM Intern — LaunchPad'],
    skills: 'Roadmaps · Jira · Stakeholder Mgmt',
  },
  'two-column': {
    name: 'Taylor Kim',
    title: 'Design Technologist',
    summary: ['Bridges design and engineering', 'Creates design systems and prototypes'],
    experience: ['Design Technologist — StudioX', 'Designer — Pixel Labs', 'Engineer — CodeHouse'],
    skills: 'Design Systems · HTML · CSS',
  },
}

export function TemplatePreviewSection() {
  return (
    <section id="templates" className="bg-muted/30 py-20 sm:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Choose Your Template</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Pick from our professionally designed templates and customize them to match your style
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {templates.map((template) => (
            <Link
              key={template.id}
              href={`/builder?template=${template.id}`}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-1 transition-all duration-300 hover:border-primary hover:shadow-lg active:scale-95"
            >
              <div
                className={`relative aspect-3/4 overflow-hidden rounded-lg ${template.color} ${template.accent} border transition-transform duration-300 group-hover:scale-105`}
              >
                {/* Template preview mockup (layout-specific simplified previews) */}
                {(() => {
                  const profile = sampleProfiles[template.id] || sampleProfiles["minimal"]

                  // Two-column preview: left sidebar + right content
                  if (template.id === "two-column") {
                    return (
                      <div className={`absolute inset-4 flex h-full rounded-lg overflow-hidden z-10`}>
                        <div className="w-1/3 bg-slate-800 text-white p-3 flex flex-col">
                          <div className="w-10 h-10 rounded-full bg-slate-600 mb-2" />
                          <h4 className="text-xs font-semibold">{profile.name}</h4>
                          <p className="text-[10px] mt-1 text-slate-300">{profile.title}</p>
                          <div className="mt-3 text-[10px] text-slate-300">{profile.skills}</div>
                        </div>

                        <div className="flex-1 bg-white p-3 text-[10px] text-slate-800">
                          <h5 className="text-xs font-medium">Profile</h5>
                          <p className="mt-1 text-xs text-slate-600">{profile.summary[0]}</p>
                          <h5 className="text-xs font-medium mt-3">Experience</h5>
                          <ul className="mt-1 space-y-1 text-xs text-slate-600">
                            {profile.experience.slice(0, 2).map((e, i) => (
                              <li key={i}>{e}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )
                  }

                  // Timeline preview: vertical bullets with short lines
                  if (template.id === "timeline") {
                    return (
                      <div className={`absolute inset-4 flex flex-col gap-2 text-xs z-10 ${template.textClass}`}>
                        <h4 className="text-sm font-semibold">{profile.name}</h4>
                        <div className="mt-2 space-y-2">
                          {profile.experience.map((e, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <div className="w-2 h-2 rounded-full bg-indigo-500 mt-1" />
                              <div className={`text-sm ${template.mutedClass}`}>{e}</div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-auto text-xs text-slate-500">{profile.skills}</div>
                      </div>
                    )
                  }

                  // Developer preview: dark code-like blocks
                  if (template.id === "developer") {
                    return (
                      <div className="absolute inset-4 flex flex-col gap-3 z-10 text-white">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded bg-slate-700" />
                          <div>
                            <h4 className="text-sm font-semibold">{profile.name}</h4>
                            <p className="text-xs text-white/70">{profile.title}</p>
                          </div>
                        </div>

                        <div className="mt-2 bg-slate-700 p-2 rounded text-xs font-mono">
                          <div className="h-2 bg-slate-600 rounded mb-1 w-3/4" />
                          <div className="h-2 bg-slate-600 rounded mb-1 w-1/2" />
                          <div className="h-2 bg-slate-600 rounded w-2/3" />
                        </div>

                        <div className="mt-auto text-xs text-white/80">{profile.skills}</div>
                      </div>
                    )
                  }

                  // Compact preview: dense list
                  if (template.id === "compact") {
                    return (
                      <div className={`absolute inset-4 flex flex-col text-xs z-10 ${template.textClass}`}>
                        <h4 className="text-sm font-semibold">{profile.name}</h4>
                        <p className={`text-xs mt-1 ${template.mutedClass}`}>{profile.title}</p>
                        <ul className="mt-2 space-y-1 text-sm">
                          {profile.experience.map((e, i) => (
                            <li key={i} className={template.mutedClass}>
                              {e}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-auto text-xs text-slate-500">{profile.skills}</div>
                      </div>
                    )
                  }

                  // Executive preview: centered, elegant
                  if (template.id === "executive") {
                    return (
                      <div className={`absolute inset-4 flex flex-col items-center justify-center text-xs z-10 ${template.textClass}`}>
                        <h4 className="text-lg font-serif font-semibold">{profile.name}</h4>
                        <p className={`text-sm italic mt-1 ${template.mutedClass}`}>{profile.title}</p>
                        <p className={`mt-3 text-xs ${template.mutedClass}`}>{profile.summary[0]}</p>
                        <div className="mt-auto text-xs text-slate-500">{profile.skills}</div>
                      </div>
                    )
                  }

                  // Default / Minimal preview
                  return (
                    <div className={`absolute inset-4 flex flex-col gap-4 text-left z-10 ${template.textClass}`}>
                      <div>
                        <h4 className="text-sm font-semibold">{profile.name}</h4>
                        <p className={`text-xs mt-1 ${template.mutedClass}`}>{profile.title}</p>
                      </div>

                      <div className="space-y-1">
                        {profile.summary.map((s, i) => (
                          <p key={i} className={`text-sm ${template.mutedClass}`}>
                            {s}
                          </p>
                        ))}
                      </div>

                      <div className="mt-3">
                        <h5 className={`text-xs font-medium ${template.textClass}`}>Experience</h5>
                        <ul className="mt-2 space-y-2">
                          {profile.experience.map((e, i) => (
                            <li key={i} className={`text-sm ${template.mutedClass}`}>
                              {e}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-auto">
                        <h5 className={`text-xs font-medium ${template.textClass}`}>Skills</h5>
                        <p className={`mt-2 text-sm ${template.mutedClass}`}>{profile.skills}</p>
                      </div>
                    </div>
                  )
                })()}

                {/* Hover overlay */}
                <div className="absolute inset-0 z-0 flex items-center justify-center bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/5">
                  <span className="relative z-20 translate-y-4 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    Use Template
                  </span>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">{template.name}</h3>
                  {template.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {template.badge}
                    </Badge>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{template.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/builder" className="group">
              Browse All Templates
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
    </section>
  )
}
