import type { GeneratedContent } from "@/lib/types";

export default function ResumePreview({ data }: { data: GeneratedContent }) {
  return (
    <div className="mx-auto max-w-[8.5in] bg-white p-12 text-slate-900 shadow-sm print:p-8 print:shadow-none">
      <header className="border-b-2 border-slate-900 pb-3">
        <h1 className="text-3xl font-bold tracking-tight">{data.hero.name}</h1>
        <p className="mt-1 text-base text-slate-700">{data.hero.title}</p>
        <p className="mt-1 text-sm text-slate-600">
          {data.contact.email}
          {data.hero.location && ` · ${data.hero.location}`}
          {data.contact.linkedin && ` · ${data.contact.linkedin}`}
          {data.contact.github && ` · ${data.contact.github}`}
        </p>
      </header>

      <ResumeSection title="Summary">
        <p className="text-sm leading-relaxed">{data.about}</p>
      </ResumeSection>

      <ResumeSection title="Skills">
        <p className="text-sm">{data.skills.join(" · ")}</p>
      </ResumeSection>

      <ResumeSection title="Experience">
        <div className="space-y-4">
          {data.experience.map((exp, i) => (
            <div key={i}>
              <div className="flex items-baseline justify-between">
                <h3 className="text-sm font-bold">
                  {exp.role}, {exp.company}
                </h3>
                <span className="text-xs text-slate-600">{exp.period}</span>
              </div>
              <p className="mt-0.5 text-sm italic text-slate-700">
                {exp.description}
              </p>
              <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm">
                {exp.achievements.map((a, j) => (
                  <li key={j}>{a}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </ResumeSection>

      <ResumeSection title="Projects">
        <div className="space-y-2">
          {data.projects.map((p, i) => (
            <div key={i} className="text-sm">
              <span className="font-bold">{p.name}</span>
              <span className="text-slate-700"> — {p.description}</span>
              <span className="text-slate-600"> ({p.tech.join(", ")})</span>
            </div>
          ))}
        </div>
      </ResumeSection>

      <ResumeSection title="Education">
        <div className="space-y-2">
          {data.education.map((edu, i) => (
            <div key={i} className="flex items-baseline justify-between text-sm">
              <span>
                <span className="font-bold">{edu.degree}</span>, {edu.school}
              </span>
              <span className="text-xs text-slate-600">{edu.period}</span>
            </div>
          ))}
        </div>
      </ResumeSection>
    </div>
  );
}

function ResumeSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-5">
      <h2 className="border-b border-slate-300 pb-1 text-xs font-bold uppercase tracking-widest text-slate-700">
        {title}
      </h2>
      <div className="mt-2">{children}</div>
    </section>
  );
}
