"use client";

import { ArrowUpRight, Eye } from "@phosphor-icons/react";
import { BrandIcon } from "@/components/BrandIcon";
import { Reveal } from "@/components/Reveal";
import { featuredProjects, type Project } from "@/data/projects";
import { sound } from "@/lib/sound";

const TILE_STYLE = [
  { span: "lg:col-span-7", tint: "from-[#1d2a3d]/80 to-[#121620]", icon: 44 },
  { span: "lg:col-span-5", tint: "from-[#282138]/80 to-[#12141e]", icon: 32 },
  { span: "lg:col-span-5", tint: "from-[#1d2d23]/80 to-[#111714]", icon: 32 },
  { span: "lg:col-span-7", tint: "from-[#30211d]/80 to-[#151210]", icon: 28 },
  { span: "lg:col-span-12", tint: "from-[#1a252b]/80 to-[#101518]", icon: 28 },
];

interface WorkProps {
  onSelectProject?: (project: Project) => void;
}

export function Work({ onSelectProject }: WorkProps) {
  return (
    <section
      id="work"
      data-scene-chapter
      className="relative flex min-h-[100dvh] items-center py-24 sm:py-32"
    >
      <div className="scrim" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8 space-y-12">
        {/* Intro */}
        <Reveal>
          <div className="max-w-[46rem]">
            <p className="eyebrow mb-4">Featured Work & Architecture</p>
            <h2 className="text-4xl leading-[1.06] tracking-tight sm:text-5xl font-bold">
              Production systems built to stay online
            </h2>
            <p className="mt-5 max-w-[38rem] text-lg leading-relaxed text-[var(--ink-muted)]">
              Click any project card to inspect its scaling hurdles, sharding architecture, and technical implementation details.
            </p>
          </div>
        </Reveal>

        {/* Projects Bento Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-12">
          {featuredProjects.map((project, index) => {
            const style = TILE_STYLE[index % TILE_STYLE.length];

            return (
              <Reveal
                key={project.slug}
                delay={index * 0.05}
                className={`sm:col-span-1 ${style.span}`}
              >
                <article
                  onClick={() => {
                    sound.click();
                    onSelectProject?.(project);
                  }}
                  className="group relative flex h-full min-h-[18rem] flex-col justify-between overflow-hidden rounded-[var(--radius-card)] border border-[var(--line)] bg-[var(--panel)] p-6 transition-all duration-300 hover:border-[var(--line-strong)] hover:shadow-xl sm:p-8 cursor-pointer"
                >
                  <div
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${style.tint} opacity-80 transition-opacity duration-300 group-hover:opacity-100`}
                    aria-hidden="true"
                  />

                  <div className="relative flex flex-col h-full justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        {project.icon ? (
                          <span className="grid size-12 place-items-center rounded-xl border border-[var(--line)] bg-[var(--bg-deep)]/70 shadow-sm">
                            <BrandIcon slug={project.icon} size={24} />
                          </span>
                        ) : (
                          <span className="grid size-12 place-items-center rounded-xl border border-[var(--line)] bg-[var(--bg-deep)]/70 text-[var(--accent)] shadow-sm">
                            <span className="font-[family-name:var(--font-mono)] text-lg font-semibold">
                              {project.name.slice(0, 2)}
                            </span>
                          </span>
                        )}

                        <div className="flex items-center gap-2">
                          <span className="hidden sm:inline-flex items-center gap-1 text-xs font-mono text-[var(--ink-muted)] group-hover:text-[var(--accent-text)] transition-colors">
                            <Eye size={14} /> Inspect
                          </span>
                          {project.link ? (
                            <a
                              href={project.link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              aria-label={`${project.name} on ${project.link.label}`}
                              className="grid size-9 place-items-center rounded-full border border-[var(--line)] text-[var(--ink-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent-text)] bg-[var(--panel)]/70"
                            >
                              <ArrowUpRight size={16} weight="bold" />
                            </a>
                          ) : null}
                        </div>
                      </div>

                      <div className="pt-6">
                        <span className="text-[11px] font-mono text-[var(--accent-text)] uppercase tracking-wider font-semibold">
                          {project.role}
                        </span>
                        <h3 className="text-2xl leading-tight tracking-tight sm:text-[1.65rem] font-bold mt-1 text-[var(--ink)]">
                          {project.name}
                        </h3>
                        <p className="mt-2.5 max-w-[44ch] leading-relaxed text-[var(--ink-muted)] text-[15px]">
                          {project.summary}
                        </p>
                      </div>

                      <ul className="mt-5 space-y-2 border-t border-[var(--line)] pt-4">
                        {project.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="flex items-start gap-2 text-xs sm:text-[13px] leading-relaxed text-[var(--ink-muted)]"
                          >
                            <span className="text-[var(--accent)] font-mono shrink-0">›</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2 border-t border-[var(--line)]/60 pt-4">
                      {project.stack.map((item) => (
                        <span
                          key={item}
                          className="rounded-md border border-[var(--line)] bg-[var(--bg-deep)]/60 px-2.5 py-1 font-[family-name:var(--font-mono)] text-xs text-[var(--ink-muted)]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
