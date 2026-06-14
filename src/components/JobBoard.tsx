"use client";

import { useMemo, useState } from "react";
import { JOBS, JOB_TYPES, type Job, type JobType } from "@/lib/jobs";
import ApplicationModal from "./ApplicationModal";

export default function JobBoard() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<JobType | "All">("All");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [activeJob, setActiveJob] = useState<Job | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return JOBS.filter((job) => {
      if (type !== "All" && job.type !== type) return false;
      if (remoteOnly && !job.remote) return false;
      if (!q) return true;
      const haystack = [
        job.title,
        job.company,
        job.location,
        ...job.tags,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query, type, remoteOnly]);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Find your next role</h1>
        <p className="mt-2 text-neutral-500 dark:text-neutral-400">
          {JOBS.length} open positions across engineering, design and data.
        </p>
      </header>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search title, company, skill…"
          className="flex-1 rounded-lg border border-neutral-300 bg-transparent px-4 py-2.5 text-sm outline-none transition focus:border-neutral-900 dark:border-neutral-700 dark:focus:border-neutral-300"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value as JobType | "All")}
          className="rounded-lg border border-neutral-300 bg-transparent px-3 py-2.5 text-sm outline-none transition focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:focus:border-neutral-300"
        >
          <option value="All">All types</option>
          {JOB_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <label className="flex select-none items-center gap-2 rounded-lg border border-neutral-300 px-3 py-2.5 text-sm dark:border-neutral-700">
          <input
            type="checkbox"
            checked={remoteOnly}
            onChange={(e) => setRemoteOnly(e.target.checked)}
            className="h-4 w-4 accent-neutral-900 dark:accent-white"
          />
          Remote only
        </label>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-neutral-300 py-16 text-center text-neutral-500 dark:border-neutral-700">
          No jobs match your filters.
        </div>
      ) : (
        <ul className="flex flex-col gap-4">
          {filtered.map((job) => (
            <JobCard key={job.id} job={job} onApply={() => setActiveJob(job)} />
          ))}
        </ul>
      )}

      {activeJob && (
        <ApplicationModal job={activeJob} onClose={() => setActiveJob(null)} />
      )}
    </div>
  );
}

function JobCard({ job, onApply }: { job: Job; onApply: () => void }) {
  return (
    <li className="group rounded-xl border border-neutral-200 p-5 transition hover:border-neutral-400 hover:shadow-sm dark:border-neutral-800 dark:hover:border-neutral-600">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-2xl dark:bg-neutral-800">
            {job.logo}
          </div>
          <div>
            <h2 className="text-lg font-semibold">{job.title}</h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {job.company} · {job.location}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge>{job.type}</Badge>
              {job.remote && <Badge tone="green">Remote</Badge>}
              {job.tags.map((tag) => (
                <Badge key={tag} tone="muted">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
          <span className="text-sm font-medium">{job.salary}</span>
          <span className="text-xs text-neutral-400">
            {job.postedDaysAgo === 0
              ? "Posted today"
              : `Posted ${job.postedDaysAgo}d ago`}
          </span>
          <button
            onClick={onApply}
            className="mt-1 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
          >
            Apply now
          </button>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
        {job.description}
      </p>
    </li>
  );
}

function Badge({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "green" | "muted";
}) {
  const tones: Record<string, string> = {
    default:
      "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900",
    green:
      "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
    muted:
      "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300",
  };
  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
