import type { ResumeData } from "@/lib/resume-context"
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderKanban,
  Trophy,
} from "lucide-react"

interface TemplateProps {
  data: ResumeData
}

function formatDate(dateString: string) {
  if (!dateString) return ""
  const date = new Date(dateString + "-01")
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
}

export function TwoColumnTemplate({ data }: TemplateProps) {
  const { personalInfo, experience, education, skills, projects, certifications } = data

  return (
    <div className="h-full overflow-y-auto flex" style={{ fontSize: "10px" }}>
      {/* Left Sidebar - Dark blue */}
      <div className="w-1/3 bg-slate-800 text-white p-5 space-y-5">
        {/* Profile Image Placeholder */}
        <div className="w-20 h-20 mx-auto rounded-full bg-slate-600 flex items-center justify-center text-slate-400 border-2 border-sky-400">
          <User className="w-10 h-10" />
        </div>

        {/* Name */}
        <div className="text-center">
          <h1 className="text-lg font-bold text-white">{personalInfo.fullName}</h1>
          <p className="text-sky-400 text-xs mt-1">Web Developer</p>
        </div>

        {/* Contact Info */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-sky-400 border-b border-slate-600 pb-1">
            Contact
          </h2>
          {personalInfo.email && (
            <div className="flex items-center gap-2 text-gray-300">
              <Mail className="h-3 w-3 text-sky-400 shrink-0" />
              <span className="truncate">{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-2 text-gray-300">
              <Phone className="h-3 w-3 text-sky-400 shrink-0" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-2 text-gray-300">
              <MapPin className="h-3 w-3 text-sky-400 shrink-0" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-2 text-gray-300">
              <Linkedin className="h-3 w-3 text-sky-400 shrink-0" />
              <span className="truncate">{personalInfo.linkedin}</span>
            </div>
          )}
          {personalInfo.github && (
            <div className="flex items-center gap-2 text-gray-300">
              <Github className="h-3 w-3 text-sky-400 shrink-0" />
              <span className="truncate">{personalInfo.github}</span>
            </div>
          )}
        </div>

        {/* Skills with progress bars */}
        {skills.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-sky-400 border-b border-slate-600 pb-1 flex items-center gap-2">
              <Wrench className="h-3 w-3" /> Skills
            </h2>
            <div className="space-y-2">
              {skills.slice(0, 6).map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-300">{skill}</span>
                  </div>
                  <div className="h-1.5 bg-slate-600 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-sky-400 to-cyan-400 rounded-full"
                      style={{ width: `${85 - index * 8}%` }}
                    />
                  </div>
                </div>
              ))}
              {skills.length > 6 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {skills.slice(6).map((skill, index) => (
                    <span key={index} className="text-xs text-gray-400">
                      • {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-sky-400 border-b border-slate-600 pb-1 flex items-center gap-2">
              <GraduationCap className="h-3 w-3" /> Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-semibold text-white text-xs">{edu.degree}</h3>
                  <p className="text-sky-300 text-xs">{edu.field}</p>
                  <p className="text-gray-400 text-xs">{edu.school}</p>
                  <p className="text-gray-500 text-xs">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content Area */}
      <div className="flex-1 bg-white p-5 space-y-5">
        {/* Summary */}
        {personalInfo.summary && (
          <section>
            <h2 className="text-sm font-bold text-slate-800 border-b-2 border-sky-400 pb-1 mb-3 flex items-center gap-2">
              <User className="h-4 w-4 text-sky-500" /> Profile
            </h2>
            <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2 className="text-sm font-bold text-slate-800 border-b-2 border-sky-400 pb-1 mb-3 flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-sky-500" /> Work Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-slate-800">{exp.position}</h3>
                      <p className="text-sky-600 font-medium">
                        {exp.company}, {exp.location}
                      </p>
                    </div>
                    <span className="text-gray-500 text-xs bg-gray-100 px-2 py-1 rounded">
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.description && <p className="mt-2 text-gray-600">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-sm font-bold text-slate-800 border-b-2 border-sky-400 pb-1 mb-3 flex items-center gap-2">
              <FolderKanban className="h-4 w-4 text-sky-500" /> Projects
            </h2>
            <div className="space-y-3">
              {projects.map((project) => (
                <div key={project.id} className="border-l-2 border-sky-300 pl-3">
                  <h3 className="font-bold text-slate-800">{project.name}</h3>
                  {project.description && <p className="text-gray-600 mt-1">{project.description}</p>}
                  {project.technologies && (
                    <p className="text-sky-600 text-xs mt-1 font-medium">Tech: {project.technologies}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section>
            <h2 className="text-sm font-bold text-slate-800 border-b-2 border-sky-400 pb-1 mb-3 flex items-center gap-2">
              <Trophy className="h-4 w-4 text-sky-500" /> Achievements
            </h2>
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-800">{cert.name}</span>
                    <span className="text-gray-500"> — {cert.issuer}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
