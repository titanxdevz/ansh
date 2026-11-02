"use client";

import { BrandIcon } from "@/components/BrandIcon";
import { Reveal } from "@/components/Reveal";
import { skillGroups } from "@/data/profile";

/**
 * The stack, grouped by what the thing actually does.
 *
 * Grouped columns instead of one long spec list, so each cluster reads as a
 * single idea rather than 60 disconnected tags.
 */
export function Stack() {
  return (
    <section
      id="stack"
      data-scene-chapter
      className="relative flex min-h-[100dvh] items-center py-24 sm:py-32"
    >
      <div className="scrim" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <Reveal>
          <div className="mb-14 max-w-[44rem]">
            <h2 className="text-4xl leading-[1.06] tracking-tight sm:text-5xl">
              What runs on the desk
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[var(--ink-muted)]">
              Nine areas, most of them picked up because a project demanded it.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => (
            <Reveal key={group.id} delay={(index % 3) * 0.05}>
              <div>
                <h3 className="font-[family-name:var(--font-mono)] text-xs tracking-[0.16em] text-[var(--accent-text)] uppercase">
                  {group.label}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item.name} className="flex items-center gap-2.5">
                      {item.icon ? (
                        <BrandIcon
                          slug={item.icon}
                          size={16}
                          className="shrink-0 text-[var(--ink-muted)]"
                        />
                      ) : (
                        <span
                          className="size-1.5 shrink-0 rounded-full bg-[var(--line-strong)]"
                          aria-hidden="true"
                        />
                      )}
                      <span className="text-[15px] text-[var(--ink-muted)]">{item.name}</span>
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
