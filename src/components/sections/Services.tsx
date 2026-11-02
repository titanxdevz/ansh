"use client";

import { Check } from "@phosphor-icons/react";
import { Reveal } from "@/components/Reveal";
import { services } from "@/data/profile";

export function Services() {
  return (
    <section
      id="services"
      data-scene-chapter
      className="relative flex min-h-[100dvh] items-center py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <h2 className="text-4xl leading-[1.06] tracking-tight sm:text-5xl">
                How I can help
              </h2>
              <p className="mt-5 max-w-[32rem] text-lg leading-relaxed text-[var(--ink-muted)]">
                Most work starts as one of these six. If your project is something else,
                ask anyway.
              </p>
              <p className="mt-8 font-[family-name:var(--font-mono)] text-sm text-[var(--ink-muted)]">
                Based in Gorakhpur, working with clients across India and beyond.
              </p>
            </div>
          </Reveal>

          <div>
            {services.map((service, index) => (
              <Reveal key={service.id} delay={index * 0.05}>
                <article className="border-t border-[var(--line)] py-8 first:border-t-0 first:pt-0">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                    <div className="max-w-[42rem]">
                      <h3 className="text-2xl leading-tight tracking-tight">{service.title}</h3>
                      <p className="mt-3 leading-relaxed text-[var(--ink-muted)]">
                        {service.description}
                      </p>
                    </div>
                    {service.price ? (
                      <span className="shrink-0 rounded-full border border-[var(--accent)] bg-[var(--accent-soft)] px-4 py-1.5 font-[family-name:var(--font-mono)] text-sm text-[var(--accent-text)]">
                        {service.price}
                      </span>
                    ) : null}
                  </div>

                  <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-2 text-sm text-[var(--ink-muted)]"
                      >
                        <Check size={13} weight="bold" className="text-[var(--accent-text)]" />
                        {point}
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
