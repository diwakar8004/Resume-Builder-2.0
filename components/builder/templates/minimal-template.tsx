import type { ResumeData } from "@/lib/resume-context"
import { Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react"

interface TemplateProps {
  data: ResumeData
}

function formatDate(dateString: string) {
  if (!dateString) return ""
  const date = new Date(dateString + "-01")
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
}

export function MinimalTemplate({ data }: TemplateProps) {
  const { personalInfo, experience, education, skills, projects, certifications } = data

  return (
    <div className="h-full overflow-y-auto bg-white p-8 text-gray-900" style={{ fontSize: "10px" }}>
      {/* Header */}
      <header className="mb-6 border-b border-gray-200 pb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">{personalInfo.fullName}</h1>
        <div className="mt-2 flex flex-wrap items-center gap-4 text-gray-600">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {personalInfo.location}
            </span>
          )}
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-4 text-gray-600">
          {personalInfo.website && (
            <span className="flex items-center gap-1">
              <Globe className="h-3 w-3" />
              {personalInfo.website}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin className="h-3 w-3" />
              {personalInfo.linkedin}
            </span>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-900">Summary</h2>
          <p className="leading-relaxed text-gray-700">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-900">Experience</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                    <p className="text-gray-600">
                      {exp.company}
                      {exp.location && ` • ${exp.location}`}
                    </p>
                  </div>
                  <span className="shrink-0 text-gray-500">
                    {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                  </span>
                </div>
                {exp.description && <p className="mt-1 leading-relaxed text-gray-700">{exp.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-900">Education</h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {edu.degree} in {edu.field}
                  </h3>
                  <p className="text-gray-600">
                    {edu.school}
                    {edu.gpa && ` • GPA: ${edu.gpa}`}
                  </p>
                </div>
                <span className="shrink-0 text-gray-500">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-900">Skills</h2>
          <p className="text-gray-700">{skills.join(" • ")}</p>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-900">Projects</h2>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900">{project.name}</h3>
                  {project.link && <span className="text-gray-500">({project.link})</span>}
                </div>
                {project.description && <p className="mt-1 text-gray-700">{project.description}</p>}
                {project.technologies && <p className="mt-1 text-gray-500">Technologies: {project.technologies}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-900">Certifications</h2>
          <div className="space-y-2">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex items-start justify-between">
                <div>
                  <span className="font-semibold text-gray-900">{cert.name}</span>
                  <span className="text-gray-600"> • {cert.issuer}</span>
                </div>
                <span className="shrink-0 text-gray-500">{formatDate(cert.date)}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
