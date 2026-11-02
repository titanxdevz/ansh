"use client";

import { Reveal } from "@/components/Reveal";
import { profile } from "@/data/profile";

export function About() {
  return (
    <section
      id="about"
      data-scene-chapter
      className="relative flex min-h-[100dvh] items-center py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <h2 className="text-4xl leading-[1.06] tracking-tight sm:text-5xl">
                The desk this all happens at
              </h2>
              <p className="mt-5 max-w-[34rem] text-lg leading-relaxed text-[var(--ink-muted)]">
                Three things tend to break in a bot project: the bot, the panel it talks to, and
                the server under both. I work on all three.
              </p>
            </div>
          </Reveal>

          <div className="space-y-6">
            {profile.longBio.map((paragraph, index) => (
              <Reveal key={index} delay={index * 0.06}>
                <p
                  className={`text-lg leading-[1.75] ${
                    index === 0
                      ? "text-[var(--ink)]"
                      : "text-[var(--ink-muted)]"
                  }`}
                >
                  {paragraph}
                </p>
              </Reveal>
            ))}

            <Reveal delay={0.18}>
              <figure className="mt-10 border-l-2 border-[var(--accent)] pl-6">
                <blockquote className="text-xl leading-relaxed text-[var(--ink)]">
                  {profile.shortBio}
                </blockquote>
                <figcaption className="mt-4 font-[family-name:var(--font-mono)] text-sm text-[var(--ink-muted)]">
                  {profile.name}, {profile.location}
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
