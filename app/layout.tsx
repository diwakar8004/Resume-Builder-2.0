import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { TemplatePreviewSection } from "@/components/home/template-preview-section"

const inter = Inter({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ResumeBuilder - Build Your Professional Resume",
  description:
    "Create stunning, professional resumes in minutes with our easy-to-use resume builder. Choose from 5+ beautiful templates and export to PDF or DOCX.",
  keywords: ["resume builder", "cv maker", "professional resume", "job application"],
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {children}

          {/* Render templates/formats preview inside same container so it aligns with pages */}
          <TemplatePreviewSection />
        </div>

        <Analytics />
      </body>
    </html>
  )
}
