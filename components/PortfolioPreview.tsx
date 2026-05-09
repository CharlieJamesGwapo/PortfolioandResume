import type { GeneratedContent } from "@/lib/types";

export default function PortfolioPreview({ data }: { data: GeneratedContent }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white shadow-sm">
      <header className="border-b border-slate-200 px-8 py-12 text-center">
        <h1 className="font-serif text-4xl font-bold text-slate-900">
          {data.hero.name}
        </h1>
        <p className="mt-2 text-lg text-slate-700">{data.hero.title}</p>
        <p className="mt-4 italic text-amber-700">{data.hero.tagline}</p>
        <p className="mt-2 text-sm text-slate-500">{data.hero.location}</p>
      </header>

      <Section title="About">
        <p className="whitespace-pre-line leading-relaxed text-slate-700">
          {data.about}
        </p>
      </Section>

      <Section title="Skills">
        <div className="flex flex-wrap gap-2">
          {data.skills.map((s) => (
            <span
              key={s}
              className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
            >
              {s}
            </span>
          ))}
        </div>
      </Section>

      <Section title="Experience">
        <div className="space-y-6">
          {data.experience.map((exp, i) => (
            <div key={i}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-semibold text-slate-900">
                  {exp.role} <span className="text-slate-500">@ {exp.company}</span>
                </h3>
                <span className="text-sm text-slate-500">{exp.period}</span>
              </div>
              <p className="mt-1 text-slate-700">{exp.description}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">
                {exp.achievements.map((a, j) => (
                  <li key={j}>{a}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Projects">
        <div className="grid gap-4 md:grid-cols-2">
          {data.projects.map((p, i) => (
            <div
              key={i}
              className="rounded-md border border-slate-200 p-4"
            >
              <h3 className="font-semibold text-slate-900">{p.name}</h3>
              <p className="mt-1 text-sm text-slate-700">{p.description}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded bg-amber-100 px-2 py-0.5 text-xs text-amber-900"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Education">
        <div className="space-y-3">
          {data.education.map((edu, i) => (
            <div key={i} className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <h3 className="font-semibold text-slate-900">{edu.degree}</h3>
                <p className="text-slate-700">{edu.school}</p>
              </div>
              <span className="text-sm text-slate-500">{edu.period}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Contact">
        <ul className="space-y-1 text-slate-700">
          <li>{data.contact.email}</li>
          {data.contact.linkedin && <li>{data.contact.linkedin}</li>}
          {data.contact.github && <li>{data.contact.github}</li>}
          {data.contact.website && <li>{data.contact.website}</li>}
        </ul>
      </Section>
    </article>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-slate-200 px-8 py-8 last:border-b-0">
      <h2 className="mb-4 font-serif text-2xl font-bold text-slate-900">
        {title}
      </h2>
      {children}
    </section>
  );
}
