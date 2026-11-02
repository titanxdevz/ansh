"use client";

import { BrandIcon } from "@/components/BrandIcon";
import { Reveal } from "@/components/Reveal";
import { skillGroups } from "@/data/profile";
import { Stack as StackIcon } from "@phosphor-icons/react";

export function Stack() {
  return (
    <section
      id="stack"
      data-scene-chapter
      className="relative flex min-h-[100dvh] items-center py-24 sm:py-32"
    >
      <div className="scrim" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8 space-y-14">
        <Reveal>
          <div className="max-w-[46rem]">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--line)] bg-[var(--panel)] text-xs font-mono text-[var(--accent-text)] mb-4">
              <StackIcon size={14} weight="bold" />
              <span>Production Toolchain</span>
            </div>
            <h2 className="text-4xl leading-[1.06] tracking-tight sm:text-5xl font-bold">
              What runs on the desk
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[var(--ink-muted)]">
              Nine areas, each chosen for memory efficiency, low latency, and deterministic crash recovery.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => (
            <Reveal key={group.id} delay={(index % 3) * 0.05}>
              <div className="rounded-xl border border-[var(--line)] bg-[var(--panel)] p-5 transition-all hover:border-[var(--line-strong)] hover:shadow-lg">
                <div className="flex items-center justify-between border-b border-[var(--line)] pb-3 mb-4">
                  <h3 className="font-[family-name:var(--font-mono)] text-xs tracking-[0.16em] text-[var(--accent-text)] uppercase font-semibold">
                    {group.label}
                  </h3>
                  <span className="text-[10px] font-mono text-[var(--ink-muted)]">
                    {group.items.length} modules
                  </span>
                </div>

                <ul className="space-y-2.5">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-center justify-between rounded-lg px-2.5 py-1.5 transition-colors hover:bg-[var(--panel-2)]/60"
                    >
                      <div className="flex items-center gap-2.5">
                        {item.icon ? (
                          <BrandIcon
                            slug={item.icon}
                            size={16}
                            className="shrink-0 text-[var(--ink-muted)]"
                          />
                        ) : (
                          <span
                            className="size-1.5 shrink-0 rounded-full bg-[var(--accent)]"
                            aria-hidden="true"
                          />
                        )}
                        <span className="text-sm font-medium text-[var(--ink)]">{item.name}</span>
                      </div>
                      <span className="text-[10px] font-mono text-[var(--ink-muted)] opacity-60">
                        active
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
