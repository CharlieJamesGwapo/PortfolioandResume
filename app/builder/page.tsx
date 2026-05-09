"use client";

import { useState } from "react";
import Link from "next/link";
import PortfolioForm from "@/components/PortfolioForm";
import PortfolioPreview from "@/components/PortfolioPreview";
import ResumePreview from "@/components/ResumePreview";
import type { FormInput, GeneratedContent } from "@/lib/types";

type View = "portfolio" | "resume";

export default function BuilderPage() {
  const [data, setData] = useState<GeneratedContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<View>("portfolio");

  async function handleSubmit(input: FormInput) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error ?? "Generation failed.");
      setData(body.data as GeneratedContent);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen">
      <nav className="no-print border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="font-serif text-xl font-bold">
            Portfolyo
          </Link>
          {data && (
            <div className="flex gap-2">
              <button
                onClick={() => setView("portfolio")}
                className={tabClass(view === "portfolio")}
              >
                Portfolio
              </button>
              <button
                onClick={() => setView("resume")}
                className={tabClass(view === "resume")}
              >
                Resume
              </button>
              <button
                onClick={() => window.print()}
                className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Print / PDF
              </button>
              <button
                onClick={() => setData(null)}
                className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Start over
              </button>
            </div>
          )}
        </div>
      </nav>

      <div className="mx-auto max-w-6xl px-6 py-10">
        {!data ? (
          <div className="mx-auto max-w-2xl">
            <h1 className="font-serif text-3xl font-bold text-slate-900">
              Tell us about yourself
            </h1>
            <p className="mt-2 text-slate-600">
              Don&apos;t worry about polish — Claude will rewrite everything.
            </p>
            {error && (
              <div className="mt-4 rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-800">
                {error}
              </div>
            )}
            <div className="mt-8">
              <PortfolioForm onSubmit={handleSubmit} loading={loading} />
            </div>
            {/*
              PayMongo integration goes here later. The free tier currently has
              no usage cap — when adding paid tiers, gate this submit behind a
              session check and call PayMongo Checkout from the client.
            */}
          </div>
        ) : view === "portfolio" ? (
          <PortfolioPreview data={data} />
        ) : (
          <ResumePreview data={data} />
        )}
      </div>
    </main>
  );
}

function tabClass(active: boolean) {
  return `rounded-md px-4 py-2 text-sm font-medium ${
    active
      ? "bg-slate-900 text-white"
      : "border border-slate-300 text-slate-700 hover:bg-slate-50"
  }`;
}
