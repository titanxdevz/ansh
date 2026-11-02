"use client";

import { useState } from "react";
import { SceneLayer } from "@/components/scene/SceneLayer";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Work } from "@/components/sections/Work";
import { Architecture } from "@/components/sections/Architecture";
import { Archive } from "@/components/sections/Archive";
import { Stack } from "@/components/sections/Stack";
import { Services } from "@/components/sections/Services";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";
import { FloatingDock } from "@/components/interactive/FloatingDock";
import { ProjectDrawer } from "@/components/interactive/ProjectDrawer";
import { CommandPalette } from "@/components/interactive/CommandPalette";
import { type Project } from "@/data/projects";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  return (
    <>
      <SceneLayer />
      <Nav onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />
      <main className="relative z-10 pb-28">
        <Hero />
        <About />
        <Work onSelectProject={(p) => setSelectedProject(p)} />
        <Architecture />
        <Archive onSelectProject={(p) => setSelectedProject(p)} />
        <Stack />
        <Services />
        <Contact />
      </main>
      <Footer />
      <FloatingDock onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />

      {/* Global Project Case Study Drawer */}
      <ProjectDrawer
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Global Quick Command Palette (Cmd+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectProject={(p) => setSelectedProject(p)}
      />
    </>
  );
}
