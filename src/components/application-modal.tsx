"use client";

import { useEffect, useId, useState } from "react";
import type { Job } from "@/lib/jobs";

interface ApplicationModalProps {
  job: Job;
  onClose: () => void;
}

type Status = "idle" | "submitting" | "submitted";

export default function ApplicationModal({
  job,
  onClose,
}: ApplicationModalProps) {
  const formId = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    coverLetter: "",
    resume: "",
  });

  // Close on Escape and lock background scroll while open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    // Mock submission — no backend yet.
    await new Promise((r) => setTimeout(r, 900));
    setStatus("submitted");
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${formId}-title`}
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-neutral-900"
        onClick={(e) => e.stopPropagation()}
      >
        {status === "submitted" ? (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-3xl dark:bg-green-900/40">
              ✅
            </div>
            <h2 className="text-xl font-semibold">Application sent!</h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Thanks {form.name || "there"} — your application for{" "}
              <span className="font-medium text-neutral-700 dark:text-neutral-200">
                {job.title}
              </span>{" "}
              at {job.company} has been received.
            </p>
            <button
              onClick={onClose}
              className="mt-2 rounded-lg bg-neutral-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 id={`${formId}-title`} className="text-lg font-semibold">
                  Apply for {job.title}
                </h2>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {job.company} · {job.location}
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="rounded-full p-1 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Field
                id={`${formId}-name`}
                label="Full name"
                value={form.name}
                onChange={(v) => update("name", v)}
                placeholder="Ada Lovelace"
                required
              />
              <Field
                id={`${formId}-email`}
                label="Email"
                type="email"
                value={form.email}
                onChange={(v) => update("email", v)}
                placeholder="ada@example.com"
                required
              />
              <Field
                id={`${formId}-resume`}
                label="Resume / portfolio URL"
                type="url"
                value={form.resume}
                onChange={(v) => update("resume", v)}
                placeholder="https://..."
              />
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor={`${formId}-cover`}
                  className="text-sm font-medium"
                >
                  Cover letter{" "}
                  <span className="font-normal text-neutral-400">
                    (optional)
                  </span>
                </label>
                <textarea
                  id={`${formId}-cover`}
                  value={form.coverLetter}
                  onChange={(e) => update("coverLetter", e.target.value)}
                  rows={4}
                  placeholder="Tell us why you're a great fit..."
                  className="resize-none rounded-lg border border-neutral-300 bg-transparent px-3 py-2 text-sm outline-none transition focus:border-neutral-900 dark:border-neutral-700 dark:focus:border-neutral-300"
                />
              </div>

              <div className="mt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-neutral-500 transition hover:text-neutral-800 dark:hover:text-neutral-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="rounded-lg bg-neutral-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-neutral-700 disabled:opacity-60 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
                >
                  {status === "submitting" ? "Submitting…" : "Submit application"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

interface FieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-neutral-300 bg-transparent px-3 py-2 text-sm outline-none transition focus:border-neutral-900 dark:border-neutral-700 dark:focus:border-neutral-300"
      />
    </div>
  );
}
