"use client";

import React, { useEffect, useState } from "react";
import {
  House,
  User,
  Briefcase,
  TreeStructure,
  Archive as ArchiveIcon,
  Stack as StackIcon,
  Wrench,
  ChatCircleText,
  MagnifyingGlass,
  MoonStars,
  SunDim,
} from "@phosphor-icons/react";
import { useSceneTheme } from "@/lib/theme";
import { sound } from "@/lib/sound";

interface DockItem {
  id: string;
  label: string;
  href: string;
  shortcut: string;
  icon: React.ComponentType<{ size?: number; weight?: "bold" | "regular" | "fill" | "duotone" }>;
}

const ITEMS: DockItem[] = [
  { id: "hero", label: "Top", href: "#top", shortcut: "H", icon: House },
  { id: "about", label: "About", href: "#about", shortcut: "A", icon: User },
  { id: "work", label: "Work", href: "#work", shortcut: "W", icon: Briefcase },
  { id: "architecture", label: "Architecture", href: "#architecture", shortcut: "T", icon: TreeStructure },
  { id: "archive", label: "Archive", href: "#archive", shortcut: "R", icon: ArchiveIcon },
  { id: "stack", label: "Stack", href: "#stack", shortcut: "S", icon: StackIcon },
  { id: "services", label: "Services", href: "#services", shortcut: "V", icon: Wrench },
  { id: "contact", label: "Contact", href: "#contact", shortcut: "C", icon: ChatCircleText },
];

interface FloatingDockProps {
  onOpenCommandPalette?: () => void;
}

export function FloatingDock({ onOpenCommandPalette }: FloatingDockProps) {
  const { theme, toggleTheme } = useSceneTheme();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      const key = e.key.toUpperCase();
      const match = ITEMS.find((i) => i.shortcut === key);
      if (match) {
        e.preventDefault();
        sound.click();
        const element = document.querySelector(match.href);
        element?.scrollIntoView({ behavior: "smooth" });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <nav
      aria-label="Floating quick dock"
      className="fixed bottom-6 inset-x-0 z-40 flex justify-center pointer-events-none px-4"
    >
      <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 rounded-2xl border border-[var(--line-strong)] bg-[var(--panel)]/90 backdrop-blur-md px-3 py-2 shadow-2xl transition-all duration-200 ring-1 ring-white/5">
        {ITEMS.map((item) => {
          const Icon = item.icon;
          const isHovered = hoveredItem === item.id;

          return (
            <div key={item.id} className="relative group flex items-center justify-center">
              {/* Tooltip */}
              <div
                className={`absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-[var(--line)] bg-[var(--bg-deep)] px-2 py-1 text-[11px] font-mono text-[var(--ink)] shadow-md pointer-events-none transition-all duration-150 ${
                  isHovered ? "opacity-100 -translate-y-1" : "opacity-0 translate-y-1"
                }`}
              >
                <span>{item.label}</span>
                <span className="ml-1.5 text-[10px] text-[var(--ink-muted)] border border-[var(--line)] rounded px-1">
                  {item.shortcut}
                </span>
              </div>

              <a
                href={item.href}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => sound.click()}
                aria-label={item.label}
                className="grid size-10 sm:size-11 place-items-center rounded-xl border border-transparent text-[var(--ink-muted)] hover:text-[var(--ink)] hover:border-[var(--line)] hover:bg-[var(--panel-2)] transition-all duration-150 hover:scale-110 active:scale-95"
              >
                <Icon size={20} weight={isHovered ? "bold" : "regular"} />
              </a>
            </div>
          );
        })}

        <div className="h-6 w-px bg-[var(--line)] mx-0.5" />

        {/* Command Palette Launcher */}
        <div className="relative group flex items-center justify-center">
          <div
            className={`absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-[var(--line)] bg-[var(--bg-deep)] px-2 py-1 text-[11px] font-mono text-[var(--ink)] shadow-md pointer-events-none transition-all duration-150 ${
              hoveredItem === "search" ? "opacity-100 -translate-y-1" : "opacity-0 translate-y-1"
            }`}
          >
            <span>Search (⌘K)</span>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.click();
              onOpenCommandPalette?.();
            }}
            onMouseEnter={() => setHoveredItem("search")}
            onMouseLeave={() => setHoveredItem(null)}
            aria-label="Open command palette"
            className="grid size-10 sm:size-11 place-items-center rounded-xl border border-transparent text-[var(--ink-muted)] hover:text-[var(--ink)] hover:border-[var(--line)] hover:bg-[var(--panel-2)] transition-all duration-150 hover:scale-110 active:scale-95 cursor-pointer"
          >
            <MagnifyingGlass size={20} />
          </button>
        </div>

        {/* Theme Toggle Button */}
        <div className="relative group flex items-center justify-center">
          <div
            className={`absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-[var(--line)] bg-[var(--bg-deep)] px-2 py-1 text-[11px] font-mono text-[var(--ink)] shadow-md pointer-events-none transition-all duration-150 ${
              hoveredItem === "theme" ? "opacity-100 -translate-y-1" : "opacity-0 translate-y-1"
            }`}
          >
            <span>{theme === "night" ? "Daylight Mode" : "Lamp Night Mode"}</span>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.click();
              toggleTheme();
            }}
            onMouseEnter={() => setHoveredItem("theme")}
            onMouseLeave={() => setHoveredItem(null)}
            aria-label="Toggle visual theme"
            className="grid size-10 sm:size-11 place-items-center rounded-xl border border-transparent text-[var(--accent-text)] hover:border-[var(--line)] hover:bg-[var(--panel-2)] transition-all duration-150 hover:scale-110 active:scale-95 cursor-pointer"
          >
            {theme === "night" ? <SunDim size={20} weight="bold" /> : <MoonStars size={20} weight="bold" />}
          </button>
        </div>
      </div>
    </nav>
  );
}
