"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { BrandIcon } from "@/components/BrandIcon";
import { Reveal } from "@/components/Reveal";
import { projects, type Project } from "@/data/projects";

const FILTERS = [
  { id: "all", label: "Everything" },
  { id: "bots", label: "Bots" },
  { id: "hosting", label: "Hosting" },
  { id: "web", label: "Web" },
  { id: "tools", label: "Tools" },
] as const;

type FilterId = (typeof FILTERS)[number]["id"];

function ProjectRow({ project }: { project: Project }) {
  return (
    <div className="group relative">
      <div className="flex flex-col gap-3 py-6 sm:flex-row sm:items-baseline sm:gap-8">
        <div className="flex items-center gap-3 sm:w-[16rem] sm:shrink-0">
          {project.icon ? (
            <BrandIcon slug={project.icon} size={18} className="text-[var(--ink-muted)]" />
          ) : (
            <span
              className="size-[18px] rounded border border-[var(--line-strong)]"
              aria-hidden="true"
            />
          )}
          <h3 className="text-lg font-medium tracking-tight">{project.name}</h3>
          <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--ink-muted)]">
            {project.year}
          </span>
        </div>

        <p className="flex-1 text-[15px] leading-relaxed text-[var(--ink-muted)]">
          {project.summary}
        </p>

        {project.link ? (
          <a
            href={project.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center gap-1.5 text-sm text-[var(--accent-text)]"
          >
            {project.link.label}
            <ArrowUpRight size={14} weight="bold" />
          </a>
        ) : (
          <span className="hidden shrink-0 font-[family-name:var(--font-mono)] text-xs text-[var(--ink-muted)] sm:block">
            {project.stack.slice(0, 2).join(" / ")}
          </span>
        )}
      </div>
    </div>
  );
}

export function Archive() {
  const [filter, setFilter] = useState<FilterId>("all");

  const visible = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <section
      id="archive"
      data-scene-chapter
      className="relative flex min-h-[100dvh] items-center py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <Reveal>
          <div className="mb-10 flex flex-col gap-6 border-b border-[var(--line)] pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-[36rem]">
              <h2 className="text-4xl leading-[1.06] tracking-tight sm:text-5xl">
                The rest of the shelf
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-[var(--ink-muted)]">
                Twenty-one projects so far, including the ones nobody asks to see.
              </p>
            </div>

            <div
              role="group"
              aria-label="Filter projects by category"
              className="flex flex-wrap gap-2"
            >
              {FILTERS.map((option) => {
                const active = filter === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setFilter(option.id)}
                    aria-pressed={active}
                    className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                      active
                        ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent-text)]"
                        : "border-[var(--line)] text-[var(--ink-muted)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        <ul className="divide-y divide-[var(--line)]">
          {visible.map((project, index) => (
            <Reveal key={project.slug} delay={Math.min(index, 6) * 0.04} as="li">
              <ProjectRow project={project} />
            </Reveal>
          ))}
        </ul>

        {visible.length === 0 ? (
          <p className="py-16 text-center text-[var(--ink-muted)]">
            Nothing in this category yet.
          </p>
        ) : null}
      </div>
    </section>
  );
}
