"use client";

import { useEffect, useState } from "react";
import {
  MoonStars,
  SunDim,
  MagnifyingGlass,
  SpeakerHigh,
  SpeakerSlash,
} from "@phosphor-icons/react";
import { useSceneTheme } from "@/lib/theme";
import { profile } from "@/data/profile";
import { sound } from "@/lib/sound";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#architecture", label: "Architecture" },
  { href: "#archive", label: "Archive" },
  { href: "#stack", label: "Stack" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

interface NavProps {
  onOpenCommandPalette?: () => void;
}

export function Nav({ onOpenCommandPalette }: NavProps) {
  const { theme, toggleTheme } = useSceneTheme();
  const [scrolled, setScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setIsMuted(sound.getMuted());
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? "border-b border-[var(--line)] bg-[var(--bg)]/90 backdrop-blur-md shadow-sm" : ""
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-[1400px] items-center gap-4 px-5 sm:h-[72px] sm:px-8"
      >
        <a
          href="#top"
          onClick={() => sound.click()}
          className="flex items-center gap-2.5 font-[family-name:var(--font-display)] text-[17px] font-semibold tracking-tight"
        >
          <span className="inline-block size-2 rounded-full bg-[var(--accent)]" aria-hidden="true" />
          <span>{profile.name}</span>
        </a>

        {/* Desktop Navigation Links */}
        <ul className="ml-auto hidden items-center gap-6 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => sound.click()}
                className="link-underline text-sm font-medium text-[var(--ink-muted)] transition-colors hover:text-[var(--ink)]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Utility Controls */}
        <div className="ml-auto md:ml-0 flex items-center gap-2">
          {/* Quick Command Palette Launcher */}
          <button
            type="button"
            onClick={() => {
              sound.click();
              onOpenCommandPalette?.();
            }}
            aria-label="Open command palette (Cmd+K)"
            className="flex items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--panel)] px-2.5 py-1.5 text-xs text-[var(--ink-muted)] hover:border-[var(--line-strong)] hover:text-[var(--ink)] transition-colors cursor-pointer"
          >
            <MagnifyingGlass size={14} className="text-[var(--accent)]" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="rounded border border-[var(--line)] bg-[var(--bg-deep)] px-1 py-0.2 text-[10px] font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={handleToggleSound}
            aria-label={isMuted ? "Unmute UI sound effects" : "Mute UI sound effects"}
            className="btn btn-ghost h-9 w-9 shrink-0 cursor-pointer"
          >
            {isMuted ? (
              <SpeakerSlash size={16} className="text-[var(--ink-muted)]" />
            ) : (
              <SpeakerHigh size={16} className="text-[var(--accent-text)]" />
            )}
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={() => {
              sound.click();
              toggleTheme();
            }}
            aria-label={theme === "night" ? "Switch to daytime lighting" : "Switch to lamp-lit night"}
            className="btn btn-ghost h-9 w-9 shrink-0 cursor-pointer"
          >
            {theme === "night" ? (
              <SunDim size={17} weight="bold" />
            ) : (
              <MoonStars size={17} weight="bold" />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
