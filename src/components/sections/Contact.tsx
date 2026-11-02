"use client";

import { useState } from "react";
import { ArrowUpRight, DiscordLogo, EnvelopeSimple, GithubLogo } from "@phosphor-icons/react";
import { Reveal } from "@/components/Reveal";
import { profile } from "@/data/profile";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="contact"
      data-scene-chapter
      className="relative flex min-h-[100dvh] items-center py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20">
          <Reveal>
            <div>
              <h2 className="text-4xl leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.5rem]">
                Got a bot idea, or a panel that needs fixing?
              </h2>
              <p className="mt-6 max-w-[36rem] text-lg leading-relaxed text-[var(--ink-muted)]">
                Send it over. You will get a straight answer about whether I am the right
                person for it, and roughly what it will take.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="btn btn-primary h-12 px-7 text-[15px]"
                >
                  <EnvelopeSimple size={17} weight="bold" />
                  Start a project
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="btn btn-ghost h-12 px-7 text-[15px]"
                >
                  {copied ? "Email copied" : "Copy email"}
                </button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="surface divide-y divide-[var(--line)]">
              <div className="flex items-center justify-between gap-4 px-6 py-5">
                <dt className="flex items-center gap-3 text-sm text-[var(--ink-muted)]">
                  <EnvelopeSimple size={18} />
                  Email
                </dt>
                <dd>
                  <a
                    href={`mailto:${profile.contact.email}`}
                    className="link-underline font-[family-name:var(--font-mono)] text-sm"
                  >
                    {profile.contact.email}
                  </a>
                </dd>
              </div>

              <div className="flex items-center justify-between gap-4 px-6 py-5">
                <dt className="flex items-center gap-3 text-sm text-[var(--ink-muted)]">
                  <DiscordLogo size={18} />
                  Discord
                </dt>
                <dd className="font-[family-name:var(--font-mono)] text-sm">
                  {profile.contact.discord}
                </dd>
              </div>

              <div className="flex items-center justify-between gap-4 px-6 py-5">
                <dt className="flex items-center gap-3 text-sm text-[var(--ink-muted)]">
                  <GithubLogo size={18} />
                  GitHub
                </dt>
                <dd>
                  <a
                    href={`https://${profile.contact.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline inline-flex items-center gap-1 font-[family-name:var(--font-mono)] text-sm"
                  >
                    {profile.contact.github}
                    <ArrowUpRight size={13} weight="bold" />
                  </a>
                </dd>
              </div>

              <div className="flex items-center justify-between gap-4 px-6 py-5">
                <dt className="text-sm text-[var(--ink-muted)]">Availability</dt>
                <dd className="text-sm">{profile.availability}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
