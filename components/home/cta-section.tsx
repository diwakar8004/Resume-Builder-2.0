import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="bg-primary py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            Ready to Build Your Resume?
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80">
            Join thousands of job seekers who have already created their perfect resume with ResumeBuilder.
          </p>
          <div className="mt-8">
            <Button size="lg" variant="secondary" className="group" asChild>
              <Link href="/builder">
                Get Started for Free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
