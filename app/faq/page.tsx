import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const faqCategories = [
  {
    category: "Getting Started",
    questions: [
      {
        q: "How do I create my first resume?",
        a: "Simply click 'Create Your Resume' from the homepage, choose a template you like, and start filling in your information. Our editor guides you through each section with helpful tips.",
      },
      {
        q: "Do I need to create an account?",
        a: "You can create a resume without an account, but signing up allows you to save your work, access it from any device, and create multiple resume versions.",
      },
      {
        q: "How long does it take to create a resume?",
        a: "Most users complete their first resume in 15-30 minutes. Our real-time preview helps you see changes instantly, speeding up the process.",
      },
    ],
  },
  {
    category: "Templates & Design",
    questions: [
      {
        q: "How many templates are available?",
        a: "We offer 5+ professionally designed templates ranging from minimal and corporate to modern and creative styles. Each template is ATS-friendly and optimized for readability.",
      },
      {
        q: "Can I switch templates after I've started?",
        a: "Yes! You can switch between templates at any time without losing your content. Your information automatically adapts to the new template's layout.",
      },
      {
        q: "Are the templates ATS-friendly?",
        a: "Absolutely. All our templates are designed to be parsed correctly by Applicant Tracking Systems (ATS), ensuring your resume gets through automated screenings.",
      },
    ],
  },
  {
    category: "Exporting & Downloading",
    questions: [
      {
        q: "What formats can I download my resume in?",
        a: "You can download your resume as a PDF (recommended for most applications) or as a DOCX file if you need to make edits in Word.",
      },
      {
        q: "Is there a limit to how many times I can download?",
        a: "Free users can download unlimited PDFs. Pro users also get access to DOCX downloads and premium templates.",
      },
      {
        q: "Will my resume look the same when printed?",
        a: 'Yes, our PDF exports are designed to look exactly the same when printed. We recommend using standard letter size (8.5" x 11") paper.',
      },
    ],
  },
  {
    category: "Account & Billing",
    questions: [
      {
        q: "What's included in the free plan?",
        a: "The free plan includes 2 basic templates, PDF export, real-time preview, and basic customization. It's perfect for getting started.",
      },
      {
        q: "Can I cancel my Pro subscription anytime?",
        a: "Yes, you can cancel your subscription at any time. You'll continue to have access to Pro features until the end of your billing period.",
      },
      {
        q: "Do you offer refunds?",
        a: "We offer a 7-day money-back guarantee on all paid plans. If you're not satisfied, contact our support team for a full refund.",
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-muted/30 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Frequently Asked Questions
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Find answers to common questions about ResumeBuilder. Can't find what you're looking for?{" "}
                <Link href="/contact" className="text-primary hover:underline">
                  Contact us
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {faqCategories.map((category) => (
                <div key={category.category}>
                  <h2 className="mb-6 text-xl font-bold text-foreground">{category.category}</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, index) => (
                      <AccordionItem key={index} value={`${category.category}-${index}`}>
                        <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-muted/30 py-16">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground">Still have questions?</h2>
            <p className="mt-4 text-muted-foreground">Our support team is here to help you succeed.</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild>
                <Link href="/contact">Contact Support</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/builder">Start Building</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
