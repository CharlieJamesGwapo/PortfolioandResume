import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="font-serif text-xl font-bold">
            Portfolyo
          </Link>
          <Link
            href="/builder"
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
          >
            Try it free
          </Link>
        </div>
      </nav>

      <section className="mx-auto max-w-6xl px-6 py-24 text-center">
        <h1 className="font-serif text-5xl font-bold leading-tight text-slate-900 md:text-6xl">
          Your portfolio and resume,
          <br />
          <span className="italic text-amber-700">written for you in 30 seconds.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
          Tell us about yourself in a few sentences. Our AI builds a polished
          portfolio site and a clean, ATS-friendly resume — ready to publish or
          download.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/builder"
            className="rounded-md bg-slate-900 px-6 py-3 text-base font-medium text-white shadow-lg hover:bg-slate-700"
          >
            Build mine now &rarr;
          </Link>
          <span className="text-sm text-slate-500">No signup required.</span>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-20 md:grid-cols-3">
          <Feature
            title="Tell us once"
            body="A short form: your role, a couple of sentences about your background, and where you want to go."
          />
          <Feature
            title="AI does the writing"
            body="Claude rewrites your story into a polished about page, experience bullets, project descriptions, and a tagline."
          />
          <Feature
            title="Edit, publish, print"
            body="Preview your portfolio, make tweaks, and export your resume as a print-ready PDF."
          />
        </div>
      </section>

      <section className="bg-amber-50">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <h2 className="font-serif text-3xl font-bold text-slate-900">
            Free during beta
          </h2>
          <p className="mt-4 text-slate-700">
            Pro and Max tiers (custom domain, unlimited regenerations,
            analytics) coming soon — payments via PayMongo.
          </p>
          <Link
            href="/builder"
            className="mt-8 inline-block rounded-md bg-slate-900 px-6 py-3 text-base font-medium text-white hover:bg-slate-700"
          >
            Start building
          </Link>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-8 text-center text-sm text-slate-500">
          Built with Next.js + Claude.
        </div>
      </footer>
    </main>
  );
}

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="font-serif text-xl font-bold text-slate-900">{title}</h3>
      <p className="mt-2 text-slate-600">{body}</p>
    </div>
  );
}
