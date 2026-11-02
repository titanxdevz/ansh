"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import { BrandIcon } from "@/components/BrandIcon";
import { Reveal } from "@/components/Reveal";
import { featuredProjects } from "@/data/projects";

/**
 * Featured work, as a bento grid.
 *
 * Each tile is sized and tinted differently so the grid has rhythm instead
 * of reading as a row of identical cards. The mark on each tile is the real
 * brand of the technology involved, never a mock-up of a product UI.
 */
const TILE_STYLE = [
  { span: "lg:col-span-7 lg:row-span-2", tint: "from-[#1d2a3d] to-[#151a26]", icon: 44 },
  { span: "lg:col-span-5", tint: "from-[#2a2338] to-[#171522]", icon: 32 },
  { span: "lg:col-span-5", tint: "from-[#233026] to-[#141a17]", icon: 32 },
  { span: "lg:col-span-4", tint: "from-[#33231f] to-[#1b1412]", icon: 28 },
  { span: "lg:col-span-8", tint: "from-[#1f2b2e] to-[#141a1c]", icon: 28 },
];

export function Work() {
  return (
    <section
      id="work"
      data-scene-chapter
      className="relative flex min-h-[100dvh] items-center py-24 sm:py-32"
    >
      <div className="scrim" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <Reveal>
          <div className="mb-12 max-w-[46rem]">
            <p className="eyebrow mb-5">Featured work</p>
            <h2 className="text-4xl leading-[1.06] tracking-tight sm:text-5xl">
              Projects that stayed online
            </h2>
            <p className="mt-5 max-w-[38rem] text-lg leading-relaxed text-[var(--ink-muted)]">
              Each of these is still running, or still being maintained. That was the goal.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
          {featuredProjects.map((project, index) => {
            const style = TILE_STYLE[index % TILE_STYLE.length];

            return (
              <Reveal
                key={project.slug}
                delay={index * 0.06}
                className={`sm:col-span-1 ${style.span}`}
              >
                <article className="group relative flex h-full min-h-[15rem] flex-col overflow-hidden rounded-[var(--radius-card)] border border-[var(--line)] bg-[var(--panel)] p-6 transition-colors duration-300 hover:border-[var(--line-strong)] sm:p-7">
                  <div
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${style.tint} opacity-80 transition-opacity duration-300 group-hover:opacity-100`}
                    aria-hidden="true"
                  />

                  <div className="relative flex flex-col">
                    <div className="flex items-start justify-between gap-4">
                      {project.icon ? (
                        <span className="grid size-12 place-items-center rounded-xl border border-[var(--line)] bg-[var(--bg-deep)]/60">
                          <BrandIcon slug={project.icon} size={24} />
                        </span>
                      ) : (
                        <span className="grid size-12 place-items-center rounded-xl border border-[var(--line)] bg-[var(--bg-deep)]/60 text-[var(--accent)]">
                          <span className="font-[family-name:var(--font-mono)] text-lg font-semibold">
                            {project.name.slice(0, 2)}
                          </span>
                        </span>
                      )}

                      {project.link ? (
                        <a
                          href={project.link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.name} on ${project.link.label}`}
                          className="grid size-9 place-items-center rounded-full border border-[var(--line)] text-[var(--ink-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent-text)]"
                        >
                          <ArrowUpRight size={16} weight="bold" />
                        </a>
                      ) : null}
                    </div>

                    <div className="mt-auto pt-8">
                    <h3 className="text-2xl leading-tight tracking-tight sm:text-[1.75rem]">
                      {project.name}
                    </h3>
                    <p className="mt-3 max-w-[42ch] leading-relaxed text-[var(--ink-muted)]">
                      {project.summary}
                    </p>

                    <ul className="mt-5 space-y-1.5">
                      {project.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex gap-2.5 text-sm leading-relaxed text-[var(--ink-muted)]"
                        >
                          <span
                            className="mt-[0.45rem] size-1 shrink-0 rounded-full bg-[var(--accent)]"
                            aria-hidden="true"
                          />
                          {highlight}
                        </li>
                      ))}
                    </ul>

                    <ul className="mt-6 flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-full border border-[var(--line)] bg-[var(--bg-deep)]/50 px-3 py-1 font-[family-name:var(--font-mono)] text-xs text-[var(--ink-muted)]"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
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
