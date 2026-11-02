"use client";

import { useEffect, useState } from "react";
import { MoonStars, SunDim } from "@phosphor-icons/react";
import { useSceneTheme } from "@/lib/theme";
import { profile } from "@/data/profile";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#stack", label: "Stack" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const { theme, toggleTheme } = useSceneTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-[var(--line)] bg-[var(--bg)]/85 backdrop-blur-md" : ""
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-[1400px] items-center gap-6 px-5 sm:h-[72px] sm:px-8"
      >
        <a href="#top" className="flex items-center gap-2.5 font-[family-name:var(--font-display)] text-[17px] font-semibold tracking-tight">
          <span className="inline-block size-2 rounded-full bg-[var(--accent)]" aria-hidden="true" />
          {profile.name}
        </a>

        <ul className="ml-auto hidden items-center gap-7 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="link-underline text-sm text-[var(--ink-muted)] transition-colors hover:text-[var(--ink)]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === "night" ? "Switch to daytime lighting" : "Switch to lamp-lit night"}
          className="btn btn-ghost ml-auto h-9 w-9 shrink-0 md:ml-0"
        >
          {theme === "night" ? (
            <SunDim size={16} weight="bold" />
          ) : (
            <MoonStars size={16} weight="bold" />
          )}
        </button>
      </nav>
    </header>
  );
}
