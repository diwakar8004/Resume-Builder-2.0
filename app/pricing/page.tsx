import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Free",
    description: "Perfect for getting started",
    price: "$0",
    period: "forever",
    features: ["2 basic templates", "Export to PDF", "Real-time preview", "Basic customization", "Email support"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    description: "For serious job seekers",
    price: "$9",
    period: "per month",
    features: [
      "All 5+ premium templates",
      "Export to PDF & DOCX",
      "Real-time preview",
      "Advanced customization",
      "Priority support",
      "Multiple resumes",
      "Cover letter templates",
      "LinkedIn optimization",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Team",
    description: "For career services & recruiters",
    price: "$29",
    period: "per month",
    features: [
      "Everything in Pro",
      "Up to 10 team members",
      "Team collaboration",
      "Analytics dashboard",
      "Custom branding",
      "API access",
      "Dedicated account manager",
      "Training sessions",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

const faqs = [
  {
    q: "Can I try Pro features for free?",
    a: "Yes! We offer a 7-day free trial of Pro with no credit card required.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Absolutely. You can cancel your subscription at any time with no penalties.",
  },
  {
    q: "Do you offer student discounts?",
    a: "Yes, we offer 50% off for students with a valid .edu email address.",
  },
]

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-muted/30 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Simple, Transparent Pricing
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Choose the plan that's right for you. Start for free, upgrade when you're ready.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-3">
              {plans.map((plan) => (
                <Card
                  key={plan.name}
                  className={`relative flex flex-col ${plan.popular ? "border-primary shadow-lg" : ""}`}
                >
                  {plan.popular && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>}
                  <CardHeader>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3">
                          <Check className="h-5 w-5 shrink-0 text-primary" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"} asChild>
                      <Link href="/builder">{plan.cta}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-muted/30 py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
            <div className="mt-12 space-y-8">
              {faqs.map((faq) => (
                <div key={faq.q}>
                  <h3 className="font-semibold text-foreground">{faq.q}</h3>
                  <p className="mt-2 text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
