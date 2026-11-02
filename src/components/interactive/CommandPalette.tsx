"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  MagnifyingGlass,
  ArrowRight,
  House,
  Briefcase,
  Archive as ArchiveIcon,
  TreeStructure,
  Stack as StackIcon,
  Wrench,
  ChatCircleText,
  MoonStars,
  SunDim,
  SpeakerHigh,
  SpeakerSlash,
  Copy,
  Check,
} from "@phosphor-icons/react";
import { projects, type Project } from "@/data/projects";
import { profile } from "@/data/profile";
import { useSceneTheme } from "@/lib/theme";
import { sound } from "@/lib/sound";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
}

export function CommandPalette({ isOpen, onClose, onSelectProject }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const { theme, toggleTheme } = useSceneTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  const isMuted = sound.getMuted();

  const handleToggleSound = () => {
    sound.toggleMute();
    onClose();
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.contact.email);
      sound.success();
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        onClose();
      }, 900);
    } catch {
      onClose();
    }
  };

  const ACTIONS = [
    {
      id: "nav-top",
      title: "Jump to Hero",
      subtitle: "Introduction and availability",
      icon: House,
      action: () => {
        document.querySelector("#top")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
    {
      id: "nav-work",
      title: "Jump to Featured Work",
      subtitle: "Production projects and case studies",
      icon: Briefcase,
      action: () => {
        document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
    {
      id: "nav-arch",
      title: "Jump to Architecture",
      subtitle: "Interactive full stack systems blueprint",
      icon: TreeStructure,
      action: () => {
        document.querySelector("#architecture")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
    {
      id: "nav-shelf",
      title: "Jump to Archive Shelf",
      subtitle: `Browse all ${projects.length} shipped projects`,
      icon: ArchiveIcon,
      action: () => {
        document.querySelector("#archive")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
    {
      id: "nav-stack",
      title: "Jump to Technical Stack",
      subtitle: "Languages, databases, frameworks, infra",
      icon: StackIcon,
      action: () => {
        document.querySelector("#stack")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
    {
      id: "nav-services",
      title: "Jump to Services & Pricing",
      subtitle: "Fixed pricing from ₹5,000, scopes and delivery",
      icon: Wrench,
      action: () => {
        document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
    {
      id: "nav-contact",
      title: "Contact & Start a Project",
      subtitle: "Email, Discord, GitHub direct links",
      icon: ChatCircleText,
      action: () => {
        document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
    {
      id: "action-theme",
      title: theme === "night" ? "Switch to Daylight Mode" : "Switch to Lamp-Lit Night",
      subtitle: "Toggles 3D scene lighting and DOM palette",
      icon: theme === "night" ? SunDim : MoonStars,
      action: () => {
        toggleTheme();
        onClose();
      },
    },
    {
      id: "action-sound",
      title: isMuted ? "Unmute Tactile Sound Effects" : "Mute Sound Effects",
      subtitle: "Web Audio UI feedback synthesized in browser",
      icon: isMuted ? SpeakerHigh : SpeakerSlash,
      action: handleToggleSound,
    },
    {
      id: "action-copy-email",
      title: copied ? "Email Copied!" : "Copy Email Address",
      subtitle: profile.contact.email,
      icon: copied ? Check : Copy,
      action: handleCopyEmail,
    },
  ];

  // Filter actions & projects based on query
  const filteredActions = ACTIONS.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  const filteredProjects = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.summary.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase()) ||
      p.stack.some((s) => s.toLowerCase().includes(query.toLowerCase()))
  );

  const totalItems = filteredActions.length + filteredProjects.length;

  useEffect(() => {
    if (isOpen) {
      sound.pop();
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          const openEvent = new CustomEvent("open-command-palette");
          window.dispatchEvent(openEvent);
        }
      }
      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        sound.click();
        setSelectedIndex((prev) => (prev + 1) % Math.max(totalItems, 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        sound.click();
        setSelectedIndex((prev) => (prev - 1 + totalItems) % Math.max(totalItems, 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (selectedIndex < filteredActions.length) {
          filteredActions[selectedIndex].action();
        } else {
          const projIndex = selectedIndex - filteredActions.length;
          if (filteredProjects[projIndex]) {
            onSelectProject(filteredProjects[projIndex]);
            onClose();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, totalItems, filteredActions, filteredProjects, onClose, onSelectProject]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 bg-black/60 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[580px] rounded-2xl border border-[var(--line-strong)] bg-[var(--panel)] shadow-2xl overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-[var(--line)] px-4 py-3.5 bg-[var(--panel-2)]/60">
          <MagnifyingGlass size={18} className="text-[var(--accent)] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command, project, or section name..."
            className="flex-1 bg-transparent text-sm sm:text-base text-[var(--ink)] placeholder:text-[var(--ink-muted)] outline-none border-none p-0 focus:ring-0"
          />
          <kbd className="hidden sm:inline-block rounded border border-[var(--line)] bg-[var(--bg-deep)] px-1.5 py-0.5 text-[10px] font-mono text-[var(--ink-muted)]">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
          {filteredActions.length > 0 && (
            <div>
              <span className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-[var(--ink-muted)] block">
                Navigation & Actions
              </span>
              {filteredActions.map((action, idx) => {
                const Icon = action.icon;
                const isSelected = selectedIndex === idx;

                return (
                  <button
                    key={action.id}
                    type="button"
                    onClick={() => {
                      sound.click();
                      action.action();
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[var(--accent)] text-[var(--on-accent)] font-semibold"
                        : "text-[var(--ink)] hover:bg-[var(--panel-2)]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} className="shrink-0" />
                      <div>
                        <p className="font-medium text-sm leading-tight">{action.title}</p>
                        <p
                          className={`text-xs mt-0.5 ${
                            isSelected ? "text-[var(--on-accent)]/80" : "text-[var(--ink-muted)]"
                          }`}
                        >
                          {action.subtitle}
                        </p>
                      </div>
                    </div>
                    <ArrowRight size={14} className={isSelected ? "opacity-100" : "opacity-0"} />
                  </button>
                );
              })}
            </div>
          )}

          {filteredProjects.length > 0 && (
            <div className="pt-2">
              <span className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-[var(--ink-muted)] block">
                Projects ({filteredProjects.length})
              </span>
              {filteredProjects.map((project, idx) => {
                const itemIndex = filteredActions.length + idx;
                const isSelected = selectedIndex === itemIndex;

                return (
                  <button
                    key={project.slug}
                    type="button"
                    onClick={() => {
                      sound.click();
                      onSelectProject(project);
                      onClose();
                    }}
                    onMouseEnter={() => setSelectedIndex(itemIndex)}
                    className={`w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[var(--accent)] text-[var(--on-accent)] font-semibold"
                        : "text-[var(--ink)] hover:bg-[var(--panel-2)]"
                    }`}
                  >
                    <div>
                      <p className="font-medium text-sm leading-tight">
                        {project.name}{" "}
                        <span
                          className={`text-[11px] font-mono ml-1 ${
                            isSelected ? "text-[var(--on-accent)]/80" : "text-[var(--accent-text)]"
                          }`}
                        >
                          [{project.category}]
                        </span>
                      </p>
                      <p
                        className={`text-xs line-clamp-1 mt-0.5 ${
                          isSelected ? "text-[var(--on-accent)]/80" : "text-[var(--ink-muted)]"
                        }`}
                      >
                        {project.summary}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono opacity-70 shrink-0 ml-2">Inspect</span>
                  </button>
                );
              })}
            </div>
          )}

          {totalItems === 0 && (
            <p className="py-8 text-center text-xs text-[var(--ink-muted)] font-mono">
              No matching commands or projects found.
            </p>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between border-t border-[var(--line)] px-4 py-2 bg-[var(--panel-2)]/60 text-[11px] font-mono text-[var(--ink-muted)]">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span>Cmd+K / Ctrl+K</span>
        </div>
      </div>
    </div>
  );
}
