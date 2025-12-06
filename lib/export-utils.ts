import type { ResumeData } from "./resume-context"

export async function exportToPDF(resumeData: ResumeData | undefined, filename: string, templateType: string = "minimal") {
  if (!resumeData) {
    throw new Error("No resume data available")
  }

  const { jsPDF } = await import("jspdf")
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  })

  const PAGE_HEIGHT = pdf.internal.pageSize.getHeight()
  const PAGE_WIDTH = pdf.internal.pageSize.getWidth()

  // Route to template-specific renderer
  switch (templateType) {
    case "two-column":
      buildTwoColumnTemplate(pdf, resumeData, PAGE_WIDTH, PAGE_HEIGHT)
      break
    case "timeline":
      buildTimelineTemplate(pdf, resumeData, PAGE_WIDTH, PAGE_HEIGHT)
      break
    case "developer":
      buildDeveloperTemplate(pdf, resumeData, PAGE_WIDTH, PAGE_HEIGHT)
      break
    case "executive":
      buildExecutiveTemplate(pdf, resumeData, PAGE_WIDTH, PAGE_HEIGHT)
      break
    case "compact":
    case "minimal":
    default:
      buildMinimalTemplate(pdf, resumeData, PAGE_WIDTH, PAGE_HEIGHT)
      break
  }

  pdf.save(`${filename}.pdf`)
}

// ===== TWO-COLUMN TEMPLATE =====
function buildTwoColumnTemplate(pdf: any, data: ResumeData, pageWidth: number, pageHeight: number) {
  const sidebarWidth = 65
  const margin = 10
  const contentStart = sidebarWidth + margin
  const contentWidth = pageWidth - contentStart - margin

  // Draw sidebar
  pdf.setFillColor(30, 58, 138)
  pdf.rect(0, 0, sidebarWidth, pageHeight, "F")

  let y = margin + 5

  // Sidebar: Name
  pdf.setTextColor(255, 255, 255)
  pdf.setFont("Helvetica", "bold")
  pdf.setFontSize(13)
  pdf.text(data.personalInfo.fullName, 5, y)
  y += 8

  // Sidebar: Contact
  pdf.setFont("Helvetica", "normal")
  pdf.setFontSize(8)
  pdf.setTextColor(200, 220, 255)
  const contact = [data.personalInfo.email, data.personalInfo.phone, data.personalInfo.location]
    .filter(Boolean)
    .join("\n")
  const contactLines = pdf.splitTextToSize(contact, sidebarWidth - 4)
  contactLines.forEach((line: string) => {
    pdf.text(line, 5, y)
    y += 3
  })
  y += 5

  // Sidebar: Skills
  if (data.skills.length > 0) {
    pdf.setFont("Helvetica", "bold")
    pdf.setFontSize(9)
    pdf.setTextColor(100, 200, 255)
    pdf.text("SKILLS", 5, y)
    y += 4

    pdf.setFont("Helvetica", "normal")
    pdf.setFontSize(7)
    pdf.setTextColor(220, 230, 255)
    const skillsText = data.skills.join(" • ")
    const skillLines = pdf.splitTextToSize(skillsText, sidebarWidth - 4)
    skillLines.forEach((line: string) => {
      pdf.text(line, 5, y)
      y += 2.5
    })
  }

  // Main content area
  let contentY = margin

  // Summary
  if (data.personalInfo.summary) {
    pdf.setTextColor(0, 102, 204)
    pdf.setFont("Helvetica", "bold")
    pdf.setFontSize(11)
    pdf.text("PROFESSIONAL SUMMARY", contentStart, contentY)
    contentY += 5

    pdf.setFont("Helvetica", "normal")
    pdf.setFontSize(9)
    pdf.setTextColor(0, 0, 0)
    const summaryLines = pdf.splitTextToSize(data.personalInfo.summary, contentWidth - 2)
    summaryLines.forEach((line: string) => {
      if (contentY > pageHeight - margin - 10) {
        pdf.addPage()
        pdf.setFillColor(30, 58, 138)
        pdf.rect(0, 0, sidebarWidth, pageHeight, "F")
        contentY = margin
      }
      pdf.text(line, contentStart + 2, contentY)
      contentY += 3
    })
    contentY += 4
  }

  // Experience
  if (data.experience.length > 0) {
    if (contentY > pageHeight - margin - 25) {
      pdf.addPage()
      pdf.setFillColor(30, 58, 138)
      pdf.rect(0, 0, sidebarWidth, pageHeight, "F")
      contentY = margin
    }

    pdf.setTextColor(0, 102, 204)
    pdf.setFont("Helvetica", "bold")
    pdf.setFontSize(11)
    pdf.text("WORK EXPERIENCE", contentStart, contentY)
    contentY += 5

    pdf.setTextColor(0, 0, 0)
    data.experience.forEach((exp) => {
      if (contentY > pageHeight - margin - 15) {
        pdf.addPage()
        pdf.setFillColor(30, 58, 138)
        pdf.rect(0, 0, sidebarWidth, pageHeight, "F")
        contentY = margin
      }

      pdf.setFont("Helvetica", "bold")
      pdf.setFontSize(10)
      pdf.text(`${exp.position}`, contentStart + 2, contentY)
      contentY += 3

      pdf.setFont("Helvetica", "normal")
      pdf.setFontSize(9)
      pdf.text(`${exp.company}`, contentStart + 2, contentY)
      contentY += 2.5
      pdf.text(`${exp.startDate} - ${exp.current ? "Present" : exp.endDate}`, contentStart + 2, contentY)
      contentY += 3

      if (exp.description) {
        pdf.setFontSize(8)
        const descLines = pdf.splitTextToSize(exp.description, contentWidth - 4)
        descLines.slice(0, 2).forEach((line: string) => {
          if (contentY > pageHeight - margin - 5) {
            pdf.addPage()
            pdf.setFillColor(30, 58, 138)
            pdf.rect(0, 0, sidebarWidth, pageHeight, "F")
            contentY = margin
          }
          pdf.text(line, contentStart + 2, contentY)
          contentY += 2.5
        })
      }
      contentY += 2
    })
  }

  // Education
  if (data.education.length > 0) {
    if (contentY > pageHeight - margin - 20) {
      pdf.addPage()
      pdf.setFillColor(30, 58, 138)
      pdf.rect(0, 0, sidebarWidth, pageHeight, "F")
      contentY = margin
    }

    pdf.setTextColor(0, 102, 204)
    pdf.setFont("Helvetica", "bold")
    pdf.setFontSize(11)
    pdf.text("EDUCATION", contentStart, contentY)
    contentY += 5

    pdf.setTextColor(0, 0, 0)
    data.education.forEach((edu) => {
      if (contentY > pageHeight - margin - 10) {
        pdf.addPage()
        pdf.setFillColor(30, 58, 138)
        pdf.rect(0, 0, sidebarWidth, pageHeight, "F")
        contentY = margin
      }

      pdf.setFont("Helvetica", "bold")
      pdf.setFontSize(10)
      pdf.text(`${edu.degree}${edu.field ? ` in ${edu.field}` : ""}`, contentStart + 2, contentY)
      contentY += 3

      pdf.setFont("Helvetica", "normal")
      pdf.setFontSize(9)
      pdf.text(`${edu.school}`, contentStart + 2, contentY)
      contentY += 3
    })
  }
}

// ===== TIMELINE TEMPLATE =====
function buildTimelineTemplate(pdf: any, data: ResumeData, pageWidth: number, pageHeight: number) {
  const margin = 15
  const contentWidth = pageWidth - 2 * margin
  let y = margin

  // Header
  pdf.setTextColor(79, 70, 229)
  pdf.setFont("Helvetica", "bold")
  pdf.setFontSize(18)
  pdf.text(data.personalInfo.fullName, margin, y)
  y += 8

  // Contact
  pdf.setTextColor(0, 0, 0)
  pdf.setFont("Helvetica", "normal")
  pdf.setFontSize(9)
  const contact = [data.personalInfo.email, data.personalInfo.phone, data.personalInfo.location]
    .filter(Boolean)
    .join(" | ")
  pdf.text(contact, margin, y)
  y += 8

  // Experience
  if (data.experience.length > 0) {
    pdf.setTextColor(79, 70, 229)
    pdf.setFont("Helvetica", "bold")
    pdf.setFontSize(11)
    pdf.text("EXPERIENCE", margin, y)
    y += 5

    pdf.setTextColor(0, 0, 0)
    data.experience.forEach((exp) => {
      if (y > pageHeight - margin - 15) {
        pdf.addPage()
        y = margin
      }

      // Timeline dot
      pdf.setFillColor(79, 70, 229)
      pdf.circle(margin + 2, y + 0.5, 1, "F")

      pdf.setFont("Helvetica", "bold")
      pdf.setFontSize(10)
      pdf.text(`${exp.position}`, margin + 6, y)
      y += 3

      pdf.setFont("Helvetica", "normal")
      pdf.setFontSize(9)
      pdf.text(`${exp.company} | ${exp.startDate} - ${exp.current ? "Present" : exp.endDate}`, margin + 6, y)
      y += 4
    })
  }

  y += 3

  // Education
  if (data.education.length > 0) {
    if (y > pageHeight - margin - 20) {
      pdf.addPage()
      y = margin
    }

    pdf.setTextColor(79, 70, 229)
    pdf.setFont("Helvetica", "bold")
    pdf.setFontSize(11)
    pdf.text("EDUCATION", margin, y)
    y += 5

    pdf.setTextColor(0, 0, 0)
    data.education.forEach((edu) => {
      if (y > pageHeight - margin - 10) {
        pdf.addPage()
        y = margin
      }

      pdf.setFillColor(79, 70, 229)
      pdf.circle(margin + 2, y + 0.5, 1, "F")

      pdf.setFont("Helvetica", "bold")
      pdf.setFontSize(10)
      pdf.text(`${edu.degree}`, margin + 6, y)
      y += 3

      pdf.setFont("Helvetica", "normal")
      pdf.setFontSize(9)
      pdf.text(`${edu.school} | ${edu.startDate} - ${edu.endDate}`, margin + 6, y)
      y += 4
    })
  }

  // Skills
  if (data.skills.length > 0) {
    if (y > pageHeight - margin - 15) {
      pdf.addPage()
      y = margin
    }

    pdf.setTextColor(79, 70, 229)
    pdf.setFont("Helvetica", "bold")
    pdf.setFontSize(11)
    pdf.text("SKILLS", margin, y)
    y += 5

    pdf.setFont("Helvetica", "normal")
    pdf.setFontSize(9)
    pdf.setTextColor(0, 0, 0)
    const skillsText = data.skills.join(" • ")
    const skillLines = pdf.splitTextToSize(skillsText, contentWidth)
    skillLines.forEach((line: string) => {
      if (y > pageHeight - margin - 5) {
        pdf.addPage()
        y = margin
      }
      pdf.text(line, margin, y)
      y += 3
    })
  }
}

// ===== DEVELOPER TEMPLATE =====
function buildDeveloperTemplate(pdf: any, data: ResumeData, pageWidth: number, pageHeight: number) {
  const margin = 12
  const contentWidth = pageWidth - 2 * margin
  let y = margin

  // Dark header
  pdf.setFillColor(15, 23, 42)
  pdf.rect(0, 0, pageWidth, 20, "F")

  pdf.setTextColor(255, 255, 255)
  pdf.setFont("Helvetica", "bold")
  pdf.setFontSize(16)
  pdf.text(data.personalInfo.fullName, margin, y + 5)

  pdf.setFontSize(9)
  pdf.setTextColor(100, 200, 255)
  const contact = [data.personalInfo.email, data.personalInfo.phone, data.personalInfo.github]
    .filter(Boolean)
    .join(" | ")
  pdf.text(contact, margin, y + 12)

  y = 25

  // About
  if (data.personalInfo.summary) {
    pdf.setTextColor(16, 185, 129)
    pdf.setFont("Helvetica", "bold")
    pdf.setFontSize(11)
    pdf.text("ABOUT", margin, y)
    y += 5

    pdf.setTextColor(0, 0, 0)
    pdf.setFont("Helvetica", "normal")
    pdf.setFontSize(9)
    const summaryLines = pdf.splitTextToSize(data.personalInfo.summary, contentWidth)
    summaryLines.slice(0, 3).forEach((line: string) => {
      if (y > pageHeight - margin - 15) {
        pdf.addPage()
        y = margin
      }
      pdf.text(line, margin, y)
      y += 3
    })
    y += 4
  }

  // Experience
  if (data.experience.length > 0) {
    if (y > pageHeight - margin - 20) {
      pdf.addPage()
      y = margin
    }

    pdf.setTextColor(16, 185, 129)
    pdf.setFont("Helvetica", "bold")
    pdf.setFontSize(11)
    pdf.text("EXPERIENCE", margin, y)
    y += 5

    pdf.setTextColor(0, 0, 0)
    data.experience.forEach((exp) => {
      if (y > pageHeight - margin - 15) {
        pdf.addPage()
        y = margin
      }

      pdf.setFont("Helvetica", "bold")
      pdf.setFontSize(10)
      pdf.text(`${exp.position} @ ${exp.company}`, margin, y)
      y += 3

      pdf.setFont("Helvetica", "normal")
      pdf.setFontSize(9)
      pdf.text(`${exp.startDate} - ${exp.current ? "Present" : exp.endDate}`, margin, y)
      y += 3

      if (exp.description) {
        pdf.setFontSize(8)
        const descLines = pdf.splitTextToSize(exp.description, contentWidth)
        descLines.slice(0, 2).forEach((line: string) => {
          if (y > pageHeight - margin - 5) {
            pdf.addPage()
            y = margin
          }
          pdf.text(line, margin, y)
          y += 2.5
        })
      }
      y += 2
    })
  }

  // Education
  if (data.education.length > 0) {
    if (y > pageHeight - margin - 15) {
      pdf.addPage()
      y = margin
    }

    pdf.setTextColor(16, 185, 129)
    pdf.setFont("Helvetica", "bold")
    pdf.setFontSize(11)
    pdf.text("EDUCATION", margin, y)
    y += 5

    pdf.setTextColor(0, 0, 0)
    data.education.forEach((edu) => {
      if (y > pageHeight - margin - 10) {
        pdf.addPage()
        y = margin
      }

      pdf.setFont("Helvetica", "bold")
      pdf.setFontSize(10)
      pdf.text(`${edu.degree}${edu.field ? ` in ${edu.field}` : ""}`, margin, y)
      y += 3

      pdf.setFont("Helvetica", "normal")
      pdf.setFontSize(9)
      pdf.text(`${edu.school}`, margin, y)
      y += 3
    })
  }

  // Skills
  if (data.skills.length > 0) {
    if (y > pageHeight - margin - 15) {
      pdf.addPage()
      y = margin
    }

    pdf.setTextColor(16, 185, 129)
    pdf.setFont("Helvetica", "bold")
    pdf.setFontSize(11)
    pdf.text("SKILLS", margin, y)
    y += 5

    pdf.setFont("Helvetica", "normal")
    pdf.setFontSize(9)
    pdf.setTextColor(0, 0, 0)
    const skillsText = data.skills.join(", ")
    const skillLines = pdf.splitTextToSize(skillsText, contentWidth)
    skillLines.forEach((line: string) => {
      if (y > pageHeight - margin - 5) {
        pdf.addPage()
        y = margin
      }
      pdf.text(line, margin, y)
      y += 3
    })
  }
}

// ===== EXECUTIVE TEMPLATE =====
function buildExecutiveTemplate(pdf: any, data: ResumeData, pageWidth: number, pageHeight: number) {
  const margin = 15
  const contentWidth = pageWidth - 2 * margin
  let y = margin

  // Title
  pdf.setFont("Georgia", "normal")
  pdf.setFontSize(20)
  pdf.setTextColor(60, 40, 20)
  pdf.text(data.personalInfo.fullName, margin, y)
  y += 8

  // Subtitle
  pdf.setFont("Georgia", "normal")
  pdf.setFontSize(11)
  pdf.setTextColor(100, 70, 40)
  pdf.text("Professional Resume", margin, y)
  y += 6

  // Decorative line
  pdf.setDrawColor(150, 100, 50)
  pdf.setLineWidth(0.5)
  pdf.line(margin, y, pageWidth - margin, y)
  y += 6

  // Contact
  pdf.setFont("Helvetica", "normal")
  pdf.setFontSize(9)
  pdf.setTextColor(0, 0, 0)
  const contact = [data.personalInfo.email, data.personalInfo.phone, data.personalInfo.location]
    .filter(Boolean)
    .join(" | ")
  pdf.text(contact, margin, y)
  y += 8

  // Profile
  if (data.personalInfo.summary) {
    pdf.setFont("Georgia", "bold")
    pdf.setFontSize(11)
    pdf.setTextColor(60, 40, 20)
    pdf.text("PROFILE", margin, y)
    y += 5

    pdf.setFont("Helvetica", "normal")
    pdf.setFontSize(9)
    pdf.setTextColor(0, 0, 0)
    const summaryLines = pdf.splitTextToSize(data.personalInfo.summary, contentWidth)
    summaryLines.slice(0, 3).forEach((line: string) => {
      if (y > pageHeight - margin - 15) {
        pdf.addPage()
        y = margin
      }
      pdf.text(line, margin, y)
      y += 3
    })
    y += 4
  }

  // Experience
  if (data.experience.length > 0) {
    if (y > pageHeight - margin - 25) {
      pdf.addPage()
      y = margin
    }

    pdf.setFont("Georgia", "bold")
    pdf.setFontSize(11)
    pdf.setTextColor(60, 40, 20)
    pdf.text("CAREER HISTORY", margin, y)
    y += 5

    pdf.setTextColor(0, 0, 0)
    data.experience.forEach((exp) => {
      if (y > pageHeight - margin - 15) {
        pdf.addPage()
        y = margin
      }

      pdf.setFont("Helvetica", "bold")
      pdf.setFontSize(10)
      pdf.text(`${exp.position}`, margin, y)
      y += 3

      pdf.setFont("Helvetica", "normal")
      pdf.setFontSize(9)
      pdf.text(`${exp.company}${exp.location ? ", " + exp.location : ""}`, margin, y)
      y += 2.5
      pdf.text(`${exp.startDate} - ${exp.current ? "Present" : exp.endDate}`, margin, y)
      y += 3

      if (exp.description) {
        pdf.setFontSize(8)
        const descLines = pdf.splitTextToSize(exp.description, contentWidth - 2)
        descLines.slice(0, 2).forEach((line: string) => {
          if (y > pageHeight - margin - 5) {
            pdf.addPage()
            y = margin
          }
          pdf.text(line, margin, y)
          y += 2.5
        })
      }
      y += 2
    })
  }

  // Education
  if (data.education.length > 0) {
    if (y > pageHeight - margin - 15) {
      pdf.addPage()
      y = margin
    }

    pdf.setFont("Georgia", "bold")
    pdf.setFontSize(11)
    pdf.setTextColor(60, 40, 20)
    pdf.text("EDUCATION", margin, y)
    y += 5

    pdf.setTextColor(0, 0, 0)
    data.education.forEach((edu) => {
      if (y > pageHeight - margin - 10) {
        pdf.addPage()
        y = margin
      }

      pdf.setFont("Helvetica", "bold")
      pdf.setFontSize(10)
      pdf.text(`${edu.degree}`, margin, y)
      y += 3

      pdf.setFont("Helvetica", "normal")
      pdf.setFontSize(9)
      pdf.text(`${edu.school}`, margin, y)
      y += 3
    })
  }
}

// ===== MINIMAL TEMPLATE =====
function buildMinimalTemplate(pdf: any, data: ResumeData, pageWidth: number, pageHeight: number) {
  const margin = 12
  const contentWidth = pageWidth - 2 * margin
  let y = margin

  // Name
  pdf.setFont("Helvetica", "bold")
  pdf.setFontSize(16)
  pdf.setTextColor(0, 0, 0)
  pdf.text(data.personalInfo.fullName, margin, y)
  y += 6

  // Contact
  pdf.setFont("Helvetica", "normal")
  pdf.setFontSize(9)
  const contact = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
    data.personalInfo.linkedin,
    data.personalInfo.github,
  ]
    .filter(Boolean)
    .join(" | ")
  const contactLines = pdf.splitTextToSize(contact, contentWidth)
  contactLines.forEach((line: string) => {
    pdf.text(line, margin, y)
    y += 3
  })
  y += 3

  // Summary
  if (data.personalInfo.summary) {
    pdf.setFont("Helvetica", "bold")
    pdf.setFontSize(11)
    pdf.text("PROFESSIONAL SUMMARY", margin, y)
    y += 4

    pdf.setDrawColor(0)
    pdf.setLineWidth(0.3)
    pdf.line(margin, y, pageWidth - margin, y)
    y += 3

    pdf.setFont("Helvetica", "normal")
    pdf.setFontSize(9)
    const summaryLines = pdf.splitTextToSize(data.personalInfo.summary, contentWidth)
    summaryLines.forEach((line: string) => {
      if (y > pageHeight - margin - 15) {
        pdf.addPage()
        y = margin
      }
      pdf.text(line, margin, y)
      y += 3
    })
    y += 3
  }

  // Experience
  if (data.experience.length > 0) {
    if (y > pageHeight - margin - 20) {
      pdf.addPage()
      y = margin
    }

    pdf.setFont("Helvetica", "bold")
    pdf.setFontSize(11)
    pdf.text("WORK EXPERIENCE", margin, y)
    y += 4

    pdf.setDrawColor(0)
    pdf.setLineWidth(0.3)
    pdf.line(margin, y, pageWidth - margin, y)
    y += 3

    pdf.setTextColor(0, 0, 0)
    data.experience.forEach((exp) => {
      if (y > pageHeight - margin - 15) {
        pdf.addPage()
        y = margin
      }

      pdf.setFont("Helvetica", "bold")
      pdf.setFontSize(10)
      pdf.text(`${exp.position}`, margin, y)
      y += 3

      pdf.setFont("Helvetica", "normal")
      pdf.setFontSize(9)
      pdf.text(`${exp.company}`, margin, y)
      y += 2.5
      pdf.text(`${exp.startDate} - ${exp.current ? "Present" : exp.endDate}`, margin, y)
      y += 3

      if (exp.description) {
        pdf.setFontSize(8)
        const descLines = pdf.splitTextToSize(exp.description, contentWidth)
        descLines.slice(0, 2).forEach((line: string) => {
          if (y > pageHeight - margin - 5) {
            pdf.addPage()
            y = margin
          }
          pdf.text(line, margin, y)
          y += 2.5
        })
      }
      y += 2
    })
  }

  // Education
  if (data.education.length > 0) {
    if (y > pageHeight - margin - 15) {
      pdf.addPage()
      y = margin
    }

    pdf.setFont("Helvetica", "bold")
    pdf.setFontSize(11)
    pdf.text("EDUCATION", margin, y)
    y += 4

    pdf.setDrawColor(0)
    pdf.setLineWidth(0.3)
    pdf.line(margin, y, pageWidth - margin, y)
    y += 3

    pdf.setTextColor(0, 0, 0)
    data.education.forEach((edu) => {
      if (y > pageHeight - margin - 10) {
        pdf.addPage()
        y = margin
      }

      pdf.setFont("Helvetica", "bold")
      pdf.setFontSize(10)
      pdf.text(`${edu.degree}${edu.field ? ` in ${edu.field}` : ""}`, margin, y)
      y += 3

      pdf.setFont("Helvetica", "normal")
      pdf.setFontSize(9)
      pdf.text(`${edu.school}`, margin, y)
      y += 3
    })
  }

  // Skills
  if (data.skills.length > 0) {
    if (y > pageHeight - margin - 15) {
      pdf.addPage()
      y = margin
    }

    pdf.setFont("Helvetica", "bold")
    pdf.setFontSize(11)
    pdf.text("SKILLS", margin, y)
    y += 4

    pdf.setDrawColor(0)
    pdf.setLineWidth(0.3)
    pdf.line(margin, y, pageWidth - margin, y)
    y += 3

    pdf.setFont("Helvetica", "normal")
    pdf.setFontSize(9)
    pdf.setTextColor(0, 0, 0)
    const skillsText = data.skills.join(" • ")
    const skillLines = pdf.splitTextToSize(skillsText, contentWidth)
    skillLines.forEach((line: string) => {
      if (y > pageHeight - margin - 5) {
        pdf.addPage()
        y = margin
      }
      pdf.text(line, margin, y)
      y += 3
    })
  }
}

export function exportToDOCX(resumeData: ResumeData, filename: string) {
  let content = ""

  // Personal Info
  content += `${resumeData.personalInfo.fullName}\n`
  content += "\n"
  content += `Email: ${resumeData.personalInfo.email}\n`
  content += `Phone: ${resumeData.personalInfo.phone}\n`
  if (resumeData.personalInfo.location) content += `Location: ${resumeData.personalInfo.location}\n`
  if (resumeData.personalInfo.website) content += `Website: ${resumeData.personalInfo.website}\n`
  if (resumeData.personalInfo.linkedin) content += `LinkedIn: ${resumeData.personalInfo.linkedin}\n`
  if (resumeData.personalInfo.github) content += `GitHub: ${resumeData.personalInfo.github}\n`
  content += "\n"

  // Summary
  if (resumeData.personalInfo.summary) {
    content += "PROFESSIONAL SUMMARY\n"
    content += "─".repeat(50) + "\n"
    content += `${resumeData.personalInfo.summary}\n\n`
  }

  // Experience
  if (resumeData.experience.length > 0) {
    content += "WORK EXPERIENCE\n"
    content += "─".repeat(50) + "\n"
    resumeData.experience.forEach((exp) => {
      content += `${exp.position} at ${exp.company}\n`
      content += `${exp.startDate} - ${exp.current ? "Present" : exp.endDate}${exp.location ? ` | ${exp.location}` : ""}\n`
      if (exp.description) content += `${exp.description}\n`
      content += "\n"
    })
  }

  // Education
  if (resumeData.education.length > 0) {
    content += "EDUCATION\n"
    content += "─".repeat(50) + "\n"
    resumeData.education.forEach((edu) => {
      content += `${edu.degree}${edu.field ? ` in ${edu.field}` : ""}\n`
      content += `${edu.school}\n`
      content += `${edu.startDate} - ${edu.endDate}${edu.gpa ? ` | GPA: ${edu.gpa}` : ""}\n`
      content += "\n"
    })
  }

  // Skills
  if (resumeData.skills.length > 0) {
    content += "SKILLS\n"
    content += "─".repeat(50) + "\n"
    content += `${resumeData.skills.join(", ")}\n`
    content += "\n"
  }

  // Projects
  if (resumeData.projects.length > 0) {
    content += "PROJECTS\n"
    content += "─".repeat(50) + "\n"
    resumeData.projects.forEach((project) => {
      content += `${project.name}\n`
      if (project.technologies) content += `Technologies: ${project.technologies}\n`
      if (project.description) content += `${project.description}\n`
      if (project.link) content += `URL: ${project.link}\n`
      content += "\n"
    })
  }

  // Certifications
  if (resumeData.certifications.length > 0) {
    content += "CERTIFICATIONS\n"
    content += "─".repeat(50) + "\n"
    resumeData.certifications.forEach((cert) => {
      content += `${cert.name}\n`
      content += `${cert.issuer}${cert.date ? ` | ${cert.date}` : ""}\n`
      content += "\n"
    })
  }

  // Create and download
  const blob = new Blob([content], { type: "application/msword" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `${filename}.doc`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
