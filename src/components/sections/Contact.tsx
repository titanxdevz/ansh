"use client";

import { useState } from "react";
import { ArrowUpRight, DiscordLogo, EnvelopeSimple, GithubLogo, Check, Copy } from "@phosphor-icons/react";
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
      <div className="scrim" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20">
          <Reveal>
            <div>
              <span className="eyebrow mb-3 block">Direct Collaboration</span>
              <h2 className="text-4xl leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.4rem] font-bold">
                Got a bot idea, or a panel that needs fixing?
              </h2>
              <p className="mt-6 max-w-[36rem] text-lg leading-relaxed text-[var(--ink-muted)]">
                Send it over. You will get a straight technical assessment: whether I am the right fit, the exact architectural approach, and an upfront quote.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="btn btn-primary h-12 px-7 text-[15px]"
                >
                  <EnvelopeSimple size={18} weight="bold" />
                  Email me directly
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="btn btn-ghost h-12 px-7 text-[15px] flex items-center gap-2 cursor-pointer"
                >
                  {copied ? <Check size={18} weight="bold" className="text-emerald-400" /> : <Copy size={18} />}
                  {copied ? "Copied to clipboard" : "Copy email address"}
                </button>
              </div>

              <div className="mt-8 flex items-center gap-2.5 font-mono text-xs text-[var(--ink-muted)]">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Typical response time: under 4 hours (IST timezone)</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6 sm:p-8 space-y-5 shadow-xl">
              <h3 className="text-lg font-bold font-[family-name:var(--font-display)] text-[var(--ink)]">
                Verified Communication Handles
              </h3>

              <dl className="divide-y divide-[var(--line)]">
                <div className="flex items-center justify-between gap-4 py-4 first:pt-0">
                  <dt className="flex items-center gap-3 text-sm text-[var(--ink-muted)]">
                    <EnvelopeSimple size={18} className="text-[var(--accent)]" />
                    Email
                  </dt>
                  <dd>
                    <a
                      href={`mailto:${profile.contact.email}`}
                      className="link-underline font-[family-name:var(--font-mono)] text-sm font-medium text-[var(--ink)] hover:text-[var(--accent)]"
                    >
                      {profile.contact.email}
                    </a>
                  </dd>
                </div>

                <div className="flex items-center justify-between gap-4 py-4">
                  <dt className="flex items-center gap-3 text-sm text-[var(--ink-muted)]">
                    <DiscordLogo size={18} className="text-[#5865f2]" />
                    Discord
                  </dt>
                  <dd className="font-[family-name:var(--font-mono)] text-sm font-medium text-[var(--ink)] bg-[var(--bg-deep)] px-2.5 py-1 rounded border border-[var(--line)]">
                    @{profile.contact.discord}
                  </dd>
                </div>

                <div className="flex items-center justify-between gap-4 py-4 last:pb-0">
                  <dt className="flex items-center gap-3 text-sm text-[var(--ink-muted)]">
                    <GithubLogo size={18} className="text-[var(--ink)]" />
                    GitHub
                  </dt>
                  <dd>
                    <a
                      href={`https://${profile.contact.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline inline-flex items-center gap-1 font-[family-name:var(--font-mono)] text-sm text-[var(--ink)] hover:text-[var(--accent)]"
                    >
                      {profile.contact.github}
                      <ArrowUpRight size={13} weight="bold" />
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
