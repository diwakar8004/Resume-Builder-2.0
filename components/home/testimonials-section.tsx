import { Star } from "lucide-react"

const testimonials = [
  {
    content:
      "I landed my dream job at a Fortune 500 company thanks to ResumeBuilder. The templates are professional and the editor is so easy to use!",
    author: "Sarah Mitchell",
    role: "Product Manager at Google",
    rating: 5,
  },
  {
    content:
      "The real-time preview feature is a game-changer. I could see exactly how my resume would look while editing. Highly recommend!",
    author: "James Chen",
    role: "Software Engineer at Meta",
    rating: 5,
  },
  {
    content:
      "After using ResumeBuilder, I got 3x more interview callbacks. The modern template helped my resume stand out from the crowd.",
    author: "Emily Rodriguez",
    role: "Marketing Director at Spotify",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="bg-muted/30 py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Loved by Job Seekers Everywhere
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join thousands of professionals who have already built their perfect resume
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="rounded-2xl border border-border bg-card p-8">
              <div className="flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <blockquote className="mt-6 text-foreground">"{testimonial.content}"</blockquote>
              <div className="mt-6">
                <p className="font-semibold text-foreground">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
