import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Target, Users, Zap, Heart } from "lucide-react"

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description: "We believe everyone deserves a chance to present themselves professionally and land their dream job.",
  },
  {
    icon: Users,
    title: "User-Focused",
    description: "Every feature we build starts with understanding what job seekers actually need.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "We constantly improve our templates and tools to stay ahead of hiring trends.",
  },
  {
    icon: Heart,
    title: "Accessibility",
    description: "Professional resume building should be accessible to everyone, regardless of budget.",
  },
]

const team = [
  { name: "Sarah Chen", role: "CEO & Co-Founder", image: "/professional-woman-headshot.png" },
  { name: "Michael Torres", role: "CTO & Co-Founder", image: "/professional-man-headshot.png" },
  { name: "Emily Johnson", role: "Head of Design", image: "/creative-woman-headshot.png" },
  { name: "David Kim", role: "Lead Developer", image: "/tech-professional-headshot.png" },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-muted/30 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">About ResumeBuilder</h1>
              <p className="mt-6 text-lg text-muted-foreground">
                We're on a mission to help millions of job seekers present their best selves through professionally
                designed resumes that get noticed.
              </p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="text-3xl font-bold text-foreground">Our Story</h2>
                <div className="mt-6 space-y-4 text-muted-foreground">
                  <p>
                    ResumeBuilder was born out of frustration. Our founders, both having gone through countless job
                    applications, realized that creating a professional resume shouldn't require expensive software or
                    design skills.
                  </p>
                  <p>
                    In 2023, we launched with a simple goal: make professional resume building accessible to everyone.
                    Today, we've helped over 50,000 job seekers create resumes that land interviews.
                  </p>
                  <p>
                    Our team combines expertise in design, technology, and career development to create tools that truly
                    make a difference in people's job searches.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-video overflow-hidden rounded-2xl bg-muted">
                  <img
                    src="/modern-office-team.png"
                    alt="ResumeBuilder team working"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-muted/30 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold text-foreground">Our Values</h2>
              <p className="mt-4 text-muted-foreground">The principles that guide everything we do</p>
            </div>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <div key={value.title} className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                    <value.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{value.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold text-foreground">Meet Our Team</h2>
              <p className="mt-4 text-muted-foreground">The passionate people behind ResumeBuilder</p>
            </div>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member) => (
                <div key={member.name} className="text-center">
                  <div className="mx-auto h-32 w-32 overflow-hidden rounded-full bg-muted">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h3 className="mt-4 font-semibold text-foreground">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary py-16">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-primary-foreground">Ready to build your professional resume?</h2>
            <p className="mt-4 text-primary-foreground/80">
              Join thousands of job seekers who've already landed their dream jobs.
            </p>
            <Button size="lg" variant="secondary" className="mt-8" asChild>
              <Link href="/builder">Start Building Now</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
