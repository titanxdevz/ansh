"use client";

import React, { useEffect } from "react";
import { X, ArrowUpRight, GithubLogo, CheckCircle, Cpu, ShieldCheck } from "@phosphor-icons/react";
import { BrandIcon } from "@/components/BrandIcon";
import { type Project } from "@/data/projects";
import { sound } from "@/lib/sound";

interface ProjectDrawerProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectDrawer({ project, onClose }: ProjectDrawerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (project) {
      document.body.style.overflow = "hidden";
      sound.pop();
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-title"
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="relative flex h-full w-full max-w-[620px] flex-col overflow-y-auto border-l border-[var(--line-strong)] bg-[var(--panel)] p-6 sm:p-8 shadow-2xl transition-transform duration-300 select-text"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-[var(--line)] pb-5">
          <div className="flex items-center gap-3">
            {project.icon ? (
              <span className="grid size-11 place-items-center rounded-xl border border-[var(--line)] bg-[var(--bg-deep)]">
                <BrandIcon slug={project.icon} size={22} />
              </span>
            ) : (
              <span className="grid size-11 place-items-center rounded-xl border border-[var(--line)] bg-[var(--bg-deep)] text-[var(--accent)] font-mono font-bold">
                {project.name.slice(0, 2)}
              </span>
            )}
            <div>
              <span className="text-[11px] font-mono text-[var(--accent-text)] uppercase tracking-wider font-semibold">
                {project.category} • {project.year}
              </span>
              <h2 id="drawer-title" className="text-2xl font-bold tracking-tight text-[var(--ink)]">
                {project.name}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project inspection drawer"
            className="grid size-9 place-items-center rounded-lg border border-[var(--line)] text-[var(--ink-muted)] hover:text-[var(--ink)] hover:border-[var(--line-strong)] transition-colors cursor-pointer"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        {/* Content Body */}
        <div className="mt-6 space-y-6">
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--ink-muted)]">
              Overview
            </h3>
            <p className="mt-2 text-base leading-relaxed text-[var(--ink)]">
              {project.summary}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--ink-muted)]">
              Architecture & Engineering Highlights
            </h3>
            <ul className="mt-3 space-y-2.5">
              {project.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-[var(--ink-muted)]"
                >
                  <span className="text-[var(--accent)] font-mono shrink-0 font-bold">›</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technology Matrix */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--ink-muted)]">
              Technology Stack
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="rounded-lg border border-[var(--line)] bg-[var(--bg-deep)] px-3 py-1 font-[family-name:var(--font-mono)] text-xs text-[var(--ink)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Links & Handover */}
          <div className="pt-6 border-t border-[var(--line)] flex flex-wrap gap-3">
            {project.link ? (
              <a
                href={project.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary h-11 px-6 text-sm"
              >
                <span>Visit {project.link.label}</span>
                <ArrowUpRight size={16} weight="bold" />
              </a>
            ) : null}
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost h-11 px-6 text-sm"
            >
              Back to showcase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
