import type { ResumeData } from "@/lib/resume-context"
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react"

interface TemplateProps {
  data: ResumeData
}

function formatDate(dateString: string) {
  if (!dateString) return ""
  const date = new Date(dateString + "-01")
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
}

export function CompactTemplate({ data }: TemplateProps) {
  const { personalInfo, experience, education, skills, projects, certifications } = data

  return (
    <div className="h-full overflow-y-auto bg-white p-6" style={{ fontSize: "9px", lineHeight: "1.4" }}>
      {/* Compact header */}
      <header className="mb-4">
        <div className="flex justify-between items-start border-b-2 border-gray-800 pb-2">
          <div>
            <h1 className="text-xl font-black text-gray-900 tracking-tight">{personalInfo.fullName}</h1>
            {personalInfo.summary && <p className="text-gray-600 mt-1 text-xs max-w-md">{personalInfo.summary}</p>}
          </div>
          <div className="text-right text-xs space-y-0.5">
            {personalInfo.email && (
              <div className="flex items-center justify-end gap-1">
                <span>{personalInfo.email}</span>
                <Mail className="h-2.5 w-2.5" />
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center justify-end gap-1">
                <span>{personalInfo.phone}</span>
                <Phone className="h-2.5 w-2.5" />
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center justify-end gap-1">
                <span>{personalInfo.location}</span>
                <MapPin className="h-2.5 w-2.5" />
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center justify-end gap-1">
                <span>{personalInfo.linkedin}</span>
                <Linkedin className="h-2.5 w-2.5" />
              </div>
            )}
            {personalInfo.github && (
              <div className="flex items-center justify-end gap-1">
                <span>{personalInfo.github}</span>
                <Github className="h-2.5 w-2.5" />
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Two column layout for compact display */}
      <div className="grid grid-cols-3 gap-4">
        {/* Main column - 2/3 width */}
        <div className="col-span-2 space-y-3">
          {/* Experience */}
          {experience.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800 bg-gray-100 px-2 py-1 mb-2">
                Experience
              </h2>
              <div className="space-y-2">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-gray-900">{exp.position}</h3>
                      <span className="text-gray-500 text-xs">
                        {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                      </span>
                    </div>
                    <p className="text-gray-700 font-medium">
                      {exp.company}, {exp.location}
                    </p>
                    {exp.description && <p className="text-gray-600 mt-0.5">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800 bg-gray-100 px-2 py-1 mb-2">
                Projects
              </h2>
              <div className="space-y-2">
                {projects.map((project) => (
                  <div key={project.id}>
                    <div className="flex items-baseline gap-2">
                      <h3 className="font-bold text-gray-900">{project.name}</h3>
                      {project.technologies && <span className="text-gray-500 text-xs">[{project.technologies}]</span>}
                    </div>
                    {project.description && <p className="text-gray-600">{project.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Side column - 1/3 width */}
        <div className="space-y-3">
          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800 bg-gray-100 px-2 py-1 mb-2">
                Education
              </h2>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-gray-900 text-xs">{edu.degree}</h3>
                    <p className="text-gray-700 text-xs">{edu.field}</p>
                    <p className="text-gray-600 text-xs">{edu.school}</p>
                    <p className="text-gray-500 text-xs">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800 bg-gray-100 px-2 py-1 mb-2">
                Skills
              </h2>
              <div className="flex flex-wrap gap-1">
                {skills.map((skill, index) => (
                  <span key={index} className="px-1.5 py-0.5 bg-gray-800 text-white text-xs rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800 bg-gray-100 px-2 py-1 mb-2">
                Achievements
              </h2>
              <ul className="space-y-1">
                {certifications.map((cert) => (
                  <li key={cert.id} className="text-xs">
                    <span className="font-semibold text-gray-900">{cert.name}</span>
                    <span className="text-gray-500 block">{cert.issuer}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
