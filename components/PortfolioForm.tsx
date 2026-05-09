"use client";

import { useState } from "react";
import type { FormInput } from "@/lib/types";

type Props = {
  onSubmit: (input: FormInput) => Promise<void> | void;
  loading: boolean;
};

export default function PortfolioForm({ onSubmit, loading }: Props) {
  const [form, setForm] = useState<FormInput>({
    name: "",
    email: "",
    role: "",
    yearsExperience: "",
    location: "",
    rawBackground: "",
    goal: "",
  });

  function update<K extends keyof FormInput>(key: K, value: FormInput[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="space-y-5"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field
          label="Full name"
          required
          value={form.name}
          onChange={(v) => update("name", v)}
          placeholder="Charlie James"
        />
        <Field
          label="Email"
          type="email"
          value={form.email}
          onChange={(v) => update("email", v)}
          placeholder="charlie@example.com"
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field
          label="Role / target role"
          required
          value={form.role}
          onChange={(v) => update("role", v)}
          placeholder="Full-stack developer"
        />
        <Field
          label="Years of experience"
          value={form.yearsExperience}
          onChange={(v) => update("yearsExperience", v)}
          placeholder="3"
        />
      </div>

      <Field
        label="Location"
        value={form.location}
        onChange={(v) => update("location", v)}
        placeholder="Manila, Philippines"
      />

      <TextArea
        label="A few sentences about your background"
        value={form.rawBackground}
        onChange={(v) => update("rawBackground", v)}
        rows={5}
        placeholder="What you've worked on, technologies you know, projects you're proud of, anything else relevant. Don't worry about polish — the AI will rewrite it."
      />

      <TextArea
        label="What are you trying to achieve?"
        value={form.goal}
        onChange={(v) => update("goal", v)}
        rows={2}
        placeholder="e.g. land a senior frontend role, get freelance clients, transition into product"
      />

      <button
        type="submit"
        disabled={loading || !form.name || !form.role}
        className="w-full rounded-md bg-slate-900 px-6 py-3 text-base font-medium text-white shadow disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700"
      >
        {loading ? "Generating…" : "Generate my portfolio"}
      </button>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  rows = 4,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
      />
    </label>
  );
}
