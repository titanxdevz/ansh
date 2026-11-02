"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, MagnifyingGlass } from "@phosphor-icons/react";
import { BrandIcon } from "@/components/BrandIcon";
import { Reveal } from "@/components/Reveal";
import { projects, type Project } from "@/data/projects";
import { sound } from "@/lib/sound";

const FILTERS = [
  { id: "all", label: "Everything" },
  { id: "bots", label: "Bots" },
  { id: "hosting", label: "Hosting" },
  { id: "web", label: "Web" },
  { id: "tools", label: "Tools" },
] as const;

type FilterId = (typeof FILTERS)[number]["id"];

interface ArchiveProps {
  onSelectProject?: (project: Project) => void;
}

function ProjectRow({
  project,
  onSelectProject,
}: {
  project: Project;
  onSelectProject?: (project: Project) => void;
}) {
  return (
    <div
      onClick={() => {
        sound.click();
        onSelectProject?.(project);
      }}
      className="group relative cursor-pointer py-5 px-3 rounded-xl transition-colors hover:bg-[var(--panel-2)]/50"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-8">
        <div className="flex items-center gap-3 sm:w-[16rem] sm:shrink-0">
          {project.icon ? (
            <BrandIcon slug={project.icon} size={18} className="text-[var(--ink-muted)] group-hover:text-[var(--accent)] transition-colors" />
          ) : (
            <span
              className="size-[18px] rounded border border-[var(--line-strong)]"
              aria-hidden="true"
            />
          )}
          <h3 className="text-lg font-medium tracking-tight text-[var(--ink)] group-hover:text-[var(--accent-text)] transition-colors">
            {project.name}
          </h3>
          <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--ink-muted)]">
            {project.year}
          </span>
        </div>

        <p className="flex-1 text-[15px] leading-relaxed text-[var(--ink-muted)]">
          {project.summary}
        </p>

        <div className="flex items-center gap-3 shrink-0">
          <span className="hidden lg:block font-[family-name:var(--font-mono)] text-xs text-[var(--ink-muted)]">
            {project.stack.slice(0, 2).join(" / ")}
          </span>

          {project.link ? (
            <a
              href={project.link.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-xs font-mono text-[var(--accent-text)] hover:underline"
            >
              <span>{project.link.label}</span>
              <ArrowUpRight size={13} weight="bold" />
            </a>
          ) : (
            <span className="text-[11px] font-mono text-[var(--ink-muted)] opacity-60">
              Internal
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function Archive({ onSelectProject }: ArchiveProps) {
  const [filter, setFilter] = useState<FilterId>("all");
  const [search, setSearch] = useState("");

  const visible = useMemo(() => {
    let list = filter === "all" ? projects : projects.filter((p) => p.category === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.stack.some((s) => s.toLowerCase().includes(q))
      );
    }
    return list;
  }, [filter, search]);

  return (
    <section
      id="archive"
      data-scene-chapter
      className="relative flex min-h-[100dvh] items-center py-24 sm:py-32"
    >
      <div className="scrim" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8 space-y-8">
        <Reveal>
          <div className="flex flex-col gap-6 border-b border-[var(--line)] pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-[36rem]">
              <span className="eyebrow mb-3 block">Complete Portfolio Registry</span>
              <h2 className="text-4xl leading-[1.06] tracking-tight sm:text-5xl font-bold">
                The rest of the shelf
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-[var(--ink-muted)]">
                All 22 production deployments, internal tools, and client platforms shipped so far.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Search input */}
              <div className="flex items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--panel)] px-3 py-1.5 text-xs font-mono">
                <MagnifyingGlass size={14} className="text-[var(--ink-muted)]" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Filter 22 projects..."
                  className="bg-transparent text-[var(--ink)] placeholder:text-[var(--ink-muted)] outline-none w-36 sm:w-44 border-none p-0 focus:ring-0"
                />
              </div>

              {/* Category pills */}
              <div
                role="group"
                aria-label="Filter projects by category"
                className="flex flex-wrap gap-1.5"
              >
                {FILTERS.map((option) => {
                  const active = filter === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => {
                        sound.click();
                        setFilter(option.id);
                      }}
                      aria-pressed={active}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-mono transition-colors cursor-pointer ${
                        active
                          ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent-text)] font-semibold"
                          : "border-[var(--line)] text-[var(--ink-muted)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>

        <div className="divide-y divide-[var(--line)]">
          {visible.map((project, index) => (
            <Reveal key={project.slug} delay={Math.min(index, 6) * 0.03}>
              <ProjectRow project={project} onSelectProject={onSelectProject} />
            </Reveal>
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="py-16 text-center text-sm font-mono text-[var(--ink-muted)]">
            No projects matched &quot;{search}&quot; in category &quot;{filter}&quot;.
          </p>
        ) : null}
      </div>
    </section>
  );
}
