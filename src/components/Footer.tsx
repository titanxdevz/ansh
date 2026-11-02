"use client";

import { BrandIcon } from "@/components/BrandIcon";
import { profile } from "@/data/profile";

const MARKS = ["discorddotjs", "nodedotjs", "typescript", "python", "rust", "php", "react", "nextdotjs", "cloudflare", "linux"];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-[var(--line)] bg-[var(--bg)]/80 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-8 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight">
            {profile.name}
          </p>
          <p className="mt-1 text-sm text-[var(--ink-muted)]">
            {profile.role}
          </p>
        </div>

        {/* Logo-only wall. Real brand marks, no category labels. */}
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 opacity-60">
          {MARKS.map((slug) => (
            <li key={slug}>
              <BrandIcon slug={slug} size={18} />
            </li>
          ))}
        </ul>

        <p className="text-sm text-[var(--ink-muted)]">
          {profile.location}
        </p>
      </div>
    </footer>
  );
}
