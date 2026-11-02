"use client";

import { Check, ArrowRight, ShieldCheck, Clock, CurrencyInr } from "@phosphor-icons/react";
import { Reveal } from "@/components/Reveal";
import { services } from "@/data/profile";

export function Services() {
  return (
    <section
      id="services"
      data-scene-chapter
      className="relative flex min-h-[100dvh] items-center py-24 sm:py-32"
    >
      <div className="scrim" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <span className="eyebrow mb-3 block">Engagement Models</span>
              <h2 className="text-4xl leading-[1.06] tracking-tight sm:text-5xl font-bold">
                Direct, transparent engineering services.
              </h2>
              <p className="mt-5 max-w-[34rem] text-lg leading-relaxed text-[var(--ink-muted)]">
                Most work starts as one of these six tiers. No vague quotes or delayed estimates—everything includes setup docs, code handover, and two revision cycles.
              </p>

              <div className="mt-8 space-y-3 font-mono text-xs text-[var(--ink-muted)] border-t border-[var(--line)] pt-6">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-400" />
                  <span>Fixed scope or hourly milestones</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-amber-400" />
                  <span>Fast turnaround (typical 3-7 day deliveries)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CurrencyInr size={16} className="text-[var(--accent)]" />
                  <span>Payments accepted via UPI, Stripe, Bank Transfer</span>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="space-y-4">
            {services.map((service, index) => (
              <Reveal key={service.id} delay={index * 0.05}>
                <article className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6 transition-all hover:border-[var(--line-strong)] hover:shadow-lg">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold leading-tight tracking-tight text-[var(--ink)]">
                        {service.title}
                      </h3>
                      <p className="mt-2 leading-relaxed text-[var(--ink-muted)] text-sm sm:text-[15px]">
                        {service.description}
                      </p>
                    </div>
                    {service.price ? (
                      <span className="shrink-0 self-start rounded-full border border-[var(--accent)] bg-[var(--accent-soft)] px-3.5 py-1 font-[family-name:var(--font-mono)] text-xs font-semibold text-[var(--accent-text)]">
                        {service.price}
                      </span>
                    ) : (
                      <span className="shrink-0 self-start rounded-full border border-[var(--line)] bg-[var(--bg-deep)] px-3 py-1 font-[family-name:var(--font-mono)] text-xs text-[var(--ink-muted)]">
                        Custom scope
                      </span>
                    )}
                  </div>

                  <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2 border-t border-[var(--line)] pt-4">
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-2 text-xs sm:text-sm text-[var(--ink-muted)]"
                      >
                        <Check size={14} weight="bold" className="text-emerald-400 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
