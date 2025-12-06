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

export function ExecutiveTemplate({ data }: TemplateProps) {
  const { personalInfo, experience, education, skills, projects, certifications } = data

  return (
    <div className="h-full overflow-y-auto bg-white p-8" style={{ fontSize: "10px", fontFamily: "Georgia, serif" }}>
      {/* Elegant Header with centered name */}
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-normal tracking-widest text-gray-800 uppercase">{personalInfo.fullName}</h1>
        <div className="mt-3 h-px w-24 mx-auto bg-amber-600" />
        <div className="mt-3 flex flex-wrap justify-center items-center gap-3 text-gray-600 text-xs">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="h-3 w-3 text-amber-600" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3 text-amber-600" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3 text-amber-600" />
              {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin className="h-3 w-3 text-amber-600" />
              {personalInfo.linkedin}
            </span>
          )}
          {personalInfo.github && (
            <span className="flex items-center gap-1">
              <Github className="h-3 w-3 text-amber-600" />
              {personalInfo.github}
            </span>
          )}
        </div>
      </header>

      {/* Summary with elegant border */}
      {personalInfo.summary && (
        <section className="mb-6 border-t border-b border-amber-600/30 py-4">
          <p className="text-center text-gray-700 italic leading-relaxed">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="mb-3 text-center text-sm font-normal uppercase tracking-[0.3em] text-amber-700 border-b border-amber-600/20 pb-1">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="text-center">
                <h3 className="font-semibold text-gray-800">{exp.position}</h3>
                <p className="text-amber-700 italic">
                  {exp.company} {exp.location && `— ${exp.location}`}
                </p>
                <p className="text-gray-500 text-xs">
                  {formatDate(exp.startDate)} — {exp.current ? "Present" : formatDate(exp.endDate)}
                </p>
                {exp.description && (
                  <p className="mt-2 text-gray-700 leading-relaxed max-w-lg mx-auto">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="mb-3 text-center text-sm font-normal uppercase tracking-[0.3em] text-amber-700 border-b border-amber-600/20 pb-1">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="text-center">
                <h3 className="font-semibold text-gray-800">
                  {edu.degree} — {edu.field}
                </h3>
                <p className="text-amber-700 italic">{edu.school}</p>
                <p className="text-gray-500 text-xs">
                  {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                  {edu.gpa && ` | GPA: ${edu.gpa}`}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="mb-3 text-center text-sm font-normal uppercase tracking-[0.3em] text-amber-700 border-b border-amber-600/20 pb-1">
            Core Competencies
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {skills.map((skill, index) => (
              <span key={index} className="px-3 py-1 border border-amber-600/30 text-gray-700 rounded-full text-xs">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="mb-3 text-center text-sm font-normal uppercase tracking-[0.3em] text-amber-700 border-b border-amber-600/20 pb-1">
            Notable Projects
          </h2>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id} className="text-center">
                <h3 className="font-semibold text-gray-800">{project.name}</h3>
                {project.description && <p className="text-gray-700 mt-1 max-w-lg mx-auto">{project.description}</p>}
                {project.technologies && <p className="text-amber-700 text-xs mt-1 italic">{project.technologies}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section>
          <h2 className="mb-3 text-center text-sm font-normal uppercase tracking-[0.3em] text-amber-700 border-b border-amber-600/20 pb-1">
            Achievements
          </h2>
          <div className="space-y-1 text-center">
            {certifications.map((cert) => (
              <p key={cert.id} className="text-gray-700">
                <span className="font-semibold">{cert.name}</span>
                <span className="text-amber-700"> — {cert.issuer}</span>
              </p>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
