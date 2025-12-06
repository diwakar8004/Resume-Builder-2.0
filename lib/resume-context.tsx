"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface ResumeData {
  personalInfo: {
    fullName: string
    email: string
    phone: string
    location: string
    website: string
    linkedin: string
    github: string
    summary: string
  }
  experience: Array<{
    id: string
    company: string
    position: string
    location: string
    startDate: string
    endDate: string
    current: boolean
    description: string
  }>
  education: Array<{
    id: string
    school: string
    degree: string
    field: string
    location: string
    startDate: string
    endDate: string
    gpa: string
  }>
  skills: string[]
  projects: Array<{
    id: string
    name: string
    description: string
    technologies: string
    link: string
  }>
  certifications: Array<{
    id: string
    name: string
    issuer: string
    date: string
    link: string
  }>
  customSections: Array<{
    id: string
    title: string
    items: Array<{
      id: string
      title: string
      description: string
    }>
  }>
}

const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: "Dhyan Chand Gond",
    email: "diwakargond923@gmail.com",
    phone: "+91 6394237705",
    location: "Lucknow, India",
    website: "",
    linkedin: "linkedin.com/in/dhyanchandgond",
    github: "github.com/dhyanchandgond",
    summary:
      "A passionate and dedicated web developer currently pursuing a Bachelor of Technology, with a deep interest in crafting responsive and engaging web applications. Motivated to turn innovative ideas into functional solutions while continuously enhancing technical skills. Known for precision, creativity, and a proactive approach to keeping up with emerging web technologies and development trends.",
  },
  experience: [
    {
      id: "exp-1",
      company: "Xovro Technologies",
      position: "Frontend Developer Intern",
      location: "Remote",
      startDate: "2024-01",
      endDate: "2024-03",
      current: false,
      description:
        "Completed a two-month internship assisting in front-end development and website refinement. Focused on responsive design, improved user experience, and consistent UI implementation.",
    },
  ],
  education: [
    {
      id: "edu-1",
      school: "Dr. A.P.J. Abdul Kalam Technical University",
      degree: "Bachelor of Technology",
      field: "CSE (AIML)",
      location: "Lucknow",
      startDate: "2023-08",
      endDate: "2027-05",
      gpa: "",
    },
    {
      id: "edu-2",
      school: "S. Prashad Y Prashad Inter College",
      degree: "Intermediate",
      field: "Science",
      location: "Bahraich",
      startDate: "2021-04",
      endDate: "2022-03",
      gpa: "",
    },
  ],
  skills: [
    "JAVA",
    "Data Structures & Algorithms",
    "C",
    "Web Development",
    "Teamwork",
    "Quick Learner",
    "Adaptable",
    "Problem Solving",
  ],
  projects: [
    {
      id: "proj-1",
      name: "PartanX",
      description:
        "Developed the front-end for PartanX, creating a responsive and engaging user interface. Focused on clean design, smooth performance, and seamless navigation across devices.",
      technologies: "HTML, CSS, JavaScript, React",
      link: "",
    },
    {
      id: "proj-2",
      name: "Xovro Technologies Website",
      description:
        "Built the front-end for Xovro Technologies, delivering a professional and user-friendly interface. Ensured visual consistency, accessibility, and performance optimization.",
      technologies: "React, Tailwind CSS",
      link: "",
    },
    {
      id: "proj-3",
      name: "Cyber Shield",
      description:
        "Built Cyber Shield, a responsive website providing comprehensive information on cybersecurity. Designed an intuitive layout for easy navigation and improved user engagement.",
      technologies: "HTML, CSS, JavaScript",
      link: "",
    },
  ],
  certifications: [
    {
      id: "cert-1",
      name: "Nexus Hackathon 2024 – Runner-up",
      issuer: "Nexus",
      date: "2024",
      link: "",
    },
    {
      id: "cert-2",
      name: "SRGI Debugging 2023 – 3rd Place",
      issuer: "College Level Competition",
      date: "2023",
      link: "",
    },
    {
      id: "cert-3",
      name: "21st Divisional Talent Search Examination – 2nd Place",
      issuer: "District Level",
      date: "2023",
      link: "",
    },
  ],
  customSections: [],
}

interface ResumeContextType {
  resumeData: ResumeData
  setResumeData: (data: ResumeData) => void
  updatePersonalInfo: (info: Partial<ResumeData["personalInfo"]>) => void
  selectedTemplate: string
  setSelectedTemplate: (template: string) => void
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined)

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData)
  const [selectedTemplate, setSelectedTemplate] = useState("minimal")

  const updatePersonalInfo = (info: Partial<ResumeData["personalInfo"]>) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info },
    }))
  }

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData,
        updatePersonalInfo,
        selectedTemplate,
        setSelectedTemplate,
      }}
    >
      {children}
    </ResumeContext.Provider>
  )
}

export function useResume() {
  const context = useContext(ResumeContext)
  if (!context) {
    throw new Error("useResume must be used within a ResumeProvider")
  }
  return context
}
