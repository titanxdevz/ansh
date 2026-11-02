"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import { Reveal } from "@/components/Reveal";
import { profile } from "@/data/profile";

export function Hero() {
  return (
    <section
      id="top"
      data-scene-chapter
      className="relative flex min-h-[100dvh] items-center pt-24 pb-16 sm:pt-28"
    >
      {/* Scrim so the headline always clears the scene behind it. */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[var(--bg)] via-[var(--bg)]/90 to-transparent lg:via-[var(--bg)]/60"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div className="max-w-[44rem]">
            <Reveal>
              <p className="eyebrow mb-6">Discord bot developer and hosting operator</p>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="text-[2.75rem] leading-[1.03] tracking-tight sm:text-[3.6rem] lg:text-[4.25rem] font-bold">
                Discord bots, dashboards, and the server boxes behind them.
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-6 max-w-[40rem] text-lg sm:text-xl leading-relaxed text-[var(--ink-muted)]">
                I build production bots for clients and run the server infrastructure behind VexaNode. Clean code, stable sharding, and zero marketing fluff.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a href="#contact" className="btn btn-primary h-12 px-7 text-[15px]">
                  Start a project
                  <ArrowUpRight size={17} weight="bold" />
                </a>
                <a href="#work" className="btn btn-ghost h-12 px-7 text-[15px]">
                  See the work
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-[var(--line)] pt-6">
                <div>
                  <dt className="text-xs font-mono text-[var(--ink-muted)] uppercase tracking-wider">Based in</dt>
                  <dd className="mt-1 font-[family-name:var(--font-display)] font-semibold text-[var(--ink)]">
                    {profile.location}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-mono text-[var(--ink-muted)] uppercase tracking-wider">Works in</dt>
                  <dd className="mt-1 font-[family-name:var(--font-display)] font-semibold text-[var(--ink)]">
                    {profile.languages}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-mono text-[var(--ink-muted)] uppercase tracking-wider">Availability</dt>
                  <dd className="mt-1 font-[family-name:var(--font-display)] font-semibold text-[var(--ink)]">
                    {profile.availability}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
