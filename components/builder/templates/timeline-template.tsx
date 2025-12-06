import type { ResumeData } from "@/lib/resume-context"
import { Mail, Phone, MapPin, Linkedin, Github, Circle } from "lucide-react"

interface TemplateProps {
  data: ResumeData
}

function formatDate(dateString: string) {
  if (!dateString) return ""
  const date = new Date(dateString + "-01")
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
}

export function TimelineTemplate({ data }: TemplateProps) {
  const { personalInfo, experience, education, skills, projects, certifications } = data

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-indigo-50 to-white" style={{ fontSize: "10px" }}>
      {/* Header with gradient */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
        <h1 className="text-2xl font-bold">{personalInfo.fullName}</h1>
        <div className="mt-3 flex flex-wrap gap-4 text-indigo-100 text-xs">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="h-3 w-3" /> {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" /> {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin className="h-3 w-3" /> {personalInfo.linkedin}
            </span>
          )}
          {personalInfo.github && (
            <span className="flex items-center gap-1">
              <Github className="h-3 w-3" /> {personalInfo.github}
            </span>
          )}
        </div>
        {personalInfo.summary && (
          <p className="mt-4 text-indigo-100 leading-relaxed border-l-2 border-indigo-300 pl-3">
            {personalInfo.summary}
          </p>
        )}
      </header>

      <div className="p-6 space-y-6">
        {/* Skills Pills */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-sm font-bold text-indigo-900 mb-3">Technical Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Experience Timeline */}
        {experience.length > 0 && (
          <section>
            <h2 className="text-sm font-bold text-indigo-900 mb-4">Experience</h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-gradient-to-b from-indigo-500 to-purple-500" />
              <div className="space-y-4">
                {experience.map((exp, index) => (
                  <div key={exp.id} className="relative pl-8">
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-indigo-600 border-2 border-white shadow flex items-center justify-center">
                      <Circle className="w-2 h-2 text-white fill-white" />
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm border border-indigo-100">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-indigo-900">{exp.position}</h3>
                          <p className="text-purple-600 font-medium">{exp.company}</p>
                        </div>
                        <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                          {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                        </span>
                      </div>
                      {exp.description && <p className="mt-2 text-gray-600">{exp.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Education Timeline */}
        {education.length > 0 && (
          <section>
            <h2 className="text-sm font-bold text-indigo-900 mb-4">Education</h2>
            <div className="relative">
              <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-gradient-to-b from-purple-500 to-pink-500" />
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="relative pl-8">
                    <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-purple-600 border-2 border-white shadow" />
                    <div className="bg-white rounded-lg p-3 shadow-sm border border-purple-100">
                      <h3 className="font-bold text-purple-900">
                        {edu.degree} — {edu.field}
                      </h3>
                      <p className="text-gray-600">{edu.school}</p>
                      <p className="text-xs text-purple-600">
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                        {edu.gpa && ` | GPA: ${edu.gpa}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Projects Grid */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-sm font-bold text-indigo-900 mb-3">Projects</h2>
            <div className="grid grid-cols-2 gap-3">
              {projects.map((project) => (
                <div key={project.id} className="bg-white rounded-lg p-3 shadow-sm border border-indigo-100">
                  <h3 className="font-bold text-indigo-800">{project.name}</h3>
                  {project.description && <p className="text-gray-600 mt-1 text-xs">{project.description}</p>}
                  {project.technologies && (
                    <p className="text-purple-600 mt-2 text-xs font-medium">{project.technologies}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Achievements */}
        {certifications.length > 0 && (
          <section>
            <h2 className="text-sm font-bold text-indigo-900 mb-3">Achievements</h2>
            <div className="flex flex-wrap gap-2">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-2 rounded-lg"
                >
                  <span className="font-semibold">{cert.name}</span>
                  <span className="block text-indigo-200 text-xs">{cert.issuer}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
