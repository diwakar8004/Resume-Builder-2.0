import type { ResumeData } from "@/lib/resume-context"
import { Mail, Phone, MapPin, Linkedin, Github, Code, Briefcase, GraduationCap, Award, FolderGit2 } from "lucide-react"

interface TemplateProps {
  data: ResumeData
}

function formatDate(dateString: string) {
  if (!dateString) return ""
  const date = new Date(dateString + "-01")
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
}

export function DeveloperTemplate({ data }: TemplateProps) {
  const { personalInfo, experience, education, skills, projects, certifications } = data

  return (
    <div
      className="h-full overflow-y-auto bg-slate-900 text-gray-100"
      style={{ fontSize: "10px", fontFamily: "'Fira Code', monospace" }}
    >
      {/* Header with terminal style */}
      <header className="bg-slate-800 p-6 border-b-2 border-emerald-500">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-3 h-3 rounded-full bg-red-500" />
          <span className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-2 text-gray-400 text-xs">~/portfolio</span>
        </div>
        <h1 className="text-2xl font-bold text-emerald-400">
          <span className="text-gray-500">const</span> developer ={" "}
          <span className="text-amber-300">"{personalInfo.fullName}"</span>;
        </h1>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          {personalInfo.email && (
            <span className="flex items-center gap-2 text-gray-300">
              <Mail className="h-3 w-3 text-emerald-400" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-2 text-gray-300">
              <Phone className="h-3 w-3 text-emerald-400" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.github && (
            <span className="flex items-center gap-2 text-gray-300">
              <Github className="h-3 w-3 text-emerald-400" />
              {personalInfo.github}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-2 text-gray-300">
              <Linkedin className="h-3 w-3 text-emerald-400" />
              {personalInfo.linkedin}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-2 text-gray-300">
              <MapPin className="h-3 w-3 text-emerald-400" />
              {personalInfo.location}
            </span>
          )}
        </div>
      </header>

      <div className="p-6 space-y-5">
        {/* Summary */}
        {personalInfo.summary && (
          <section>
            <div className="flex items-center gap-2 mb-2">
              <Code className="h-4 w-4 text-emerald-400" />
              <h2 className="text-sm font-bold text-emerald-400">// About</h2>
            </div>
            <p className="text-gray-300 leading-relaxed pl-6 border-l-2 border-slate-700">{personalInfo.summary}</p>
          </section>
        )}

        {/* Skills with colored tags */}
        {skills.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-2">
              <Code className="h-4 w-4 text-emerald-400" />
              <h2 className="text-sm font-bold text-emerald-400">// Tech Stack</h2>
            </div>
            <div className="flex flex-wrap gap-2 pl-6">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-slate-800 border border-emerald-500/30 rounded text-emerald-300 text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Briefcase className="h-4 w-4 text-emerald-400" />
              <h2 className="text-sm font-bold text-emerald-400">// Experience</h2>
            </div>
            <div className="space-y-3 pl-6">
              {experience.map((exp) => (
                <div key={exp.id} className="border-l-2 border-emerald-500/50 pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-amber-300">{exp.position}</h3>
                      <p className="text-gray-400">{exp.company}</p>
                    </div>
                    <span className="text-emerald-400 text-xs bg-slate-800 px-2 py-1 rounded">
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.description && <p className="mt-2 text-gray-300">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <FolderGit2 className="h-4 w-4 text-emerald-400" />
              <h2 className="text-sm font-bold text-emerald-400">// Projects</h2>
            </div>
            <div className="grid grid-cols-1 gap-3 pl-6">
              {projects.map((project) => (
                <div key={project.id} className="bg-slate-800 p-3 rounded border border-slate-700">
                  <h3 className="font-bold text-amber-300">{project.name}</h3>
                  {project.description && <p className="text-gray-300 mt-1">{project.description}</p>}
                  {project.technologies && (
                    <p className="text-emerald-400 text-xs mt-2">Stack: {project.technologies}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <GraduationCap className="h-4 w-4 text-emerald-400" />
              <h2 className="text-sm font-bold text-emerald-400">// Education</h2>
            </div>
            <div className="space-y-2 pl-6">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-gray-200">
                      {edu.degree} — {edu.field}
                    </h3>
                    <p className="text-gray-400">{edu.school}</p>
                  </div>
                  <span className="text-emerald-400 text-xs">{formatDate(edu.endDate)}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-2">
              <Award className="h-4 w-4 text-emerald-400" />
              <h2 className="text-sm font-bold text-emerald-400">// Achievements</h2>
            </div>
            <ul className="space-y-1 pl-6">
              {certifications.map((cert) => (
                <li key={cert.id} className="text-gray-300 flex items-center gap-2">
                  <span className="text-emerald-400">▹</span>
                  {cert.name} <span className="text-gray-500">({cert.issuer})</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  )
}
