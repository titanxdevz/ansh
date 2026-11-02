export type Project = {
  slug: string;
  name: string;
  category: "hosting" | "bots" | "tools" | "web";
  year: string;
  summary: string;
  highlights: string[];
  stack: string[];
  /** Short label for the part I played in the project. */
  role?: string;
  /** Simple Icons slug used for the logo, when the project has a recognizable brand mark. */
  icon?: string;
  featured?: boolean;
  link?: { label: string; href: string };
};

export const projects: Project[] = [
  {
    slug: "vexanode",
    name: "VexaNode",
    role: "Founder and infrastructure",
    category: "hosting",
    year: "2024",
    summary:
      "Pterodactyl-based hosting service I run end to end: panel, Wings nodes, billing, and a separate VPS control panel.",
    highlights: [
      "Restyled 12 Paymenter Blade templates in a dark sci-fi theme",
      "VPS control panel on the VirtFusion API with MongoDB",
      "Node migrations, Cloudflare Tunnel setup, and SMTP troubleshooting",
    ],
    stack: ["Pterodactyl", "Paymenter", "VirtFusion", "MongoDB", "Cloudflare", "Laravel"],
    icon: "pterodactyl",
    featured: true,
  },
  {
    slug: "clien",
    name: "Clien",
    role: "Lead developer",
    category: "bots",
    year: "2025",
    summary:
      "Production Discord bot on Node ESM and discord.js v14, with an Express 5 API and sharded Lavalink music.",
    highlights: [
      "32-finding security audit with a written remediation plan",
      "better-sqlite3 and Mongoose on the same codebase",
      "Components V2 throughout the interface layer",
    ],
    stack: ["discord.js", "Express", "Lavalink", "SQLite", "MongoDB"],
    icon: "discorddotjs",
    featured: true,
  },
  {
    slug: "flixo",
    name: "Flixo",
    role: "Solo build",
    category: "bots",
    year: "2025",
    summary:
      "Always-on music bot with 14 DSP filters, Spotify and Last.fm sync, and a realtime web dashboard in progress.",
    highlights: [
      "8D, BassBoost, Nightcore and 11 more filters",
      "Next.js dashboard with 3D animation",
      "24/7 voice presence",
    ],
    stack: ["Lavalink", "Next.js", "Discord", "Last.fm"],
    icon: "discord",
    featured: true,
  },
  {
    slug: "botliy",
    name: "Botliy",
    role: "Full-stack build",
    category: "web",
    year: "2025",
    summary:
      "Bot listing and voting site with Components V2 vote webhooks, shipped with a clean security pass.",
    highlights: [
      "Fixed six security bugs: SSRF, ReDoS, SVG XSS, rate-limit key pollution",
      "Components V2 vote webhooks",
      "Live at botliy.online",
    ],
    stack: ["discord.js", "Express", "Components V2"],
    icon: "discorddotjs",
    featured: true,
    link: { label: "botliy.online", href: "https://botliy.online" },
  },
  {
    slug: "zyncx",
    name: "ZYNCX",
    role: "Frontend rebuild",
    category: "web",
    year: "2024",
    summary:
      "Admin panel for a Discord bot, rebuilt on Next.js and Prisma with an Apple-style interface.",
    highlights: [
      "Next.js App Router with Prisma",
      "Apple-style redesign",
      "Reads well on small screens",
    ],
    stack: ["Next.js", "Prisma", "React", "SQLite"],
    icon: "nextdotjs",
  },
  {
    slug: "speeds-host",
    name: "speeds.host",
    role: "UI/UX redesign",
    category: "web",
    year: "2025",
    summary:
      "UI and UX redesign for a Paymenter-powered hosting storefront, with the whole flow rebuilt.",
    highlights: [
      "Full Paymenter UI/UX redesign",
      "Checkout and plan flow rebuilt",
      "Live at speeds.host",
    ],
    stack: ["Paymenter", "Laravel", "Blade"],
    icon: "laravel",
    link: { label: "speeds.host", href: "https://speeds.host" },
  },
  {
    slug: "php2shell",
    name: "PHP2Shell",
    role: "Motion explainer",
    category: "tools",
    year: "2024",
    summary:
      "Nine-by-sixteen motion graphics explainer that walks through a PHP-to-shell technique.",
    highlights: [
      "9:16 vertical motion graphics",
      "Cyber-security explainer format",
      "Scripted pacing and motion",
    ],
    stack: ["Motion", "PHP", "Security"],
  },
  {
    slug: "syncxesports",
    name: "SyncxEsports",
    role: "Design and build",
    category: "web",
    year: "2026",
    summary:
      "Esports organization site I built and shipped, live on its own domain.",
    highlights: [
      "Live at syncxesports.live",
      "Next.js App Router build",
      "Holds up down to small screens",
    ],
    stack: ["Next.js", "React"],
    icon: "nextdotjs",
    link: { label: "syncxesports.live", href: "https://syncxesports.live/" },
  },
  {
    slug: "tejmediaworks",
    name: "TEJ Media Works",
    role: "Design and build",
    category: "web",
    year: "2026",
    summary:
      "Marketing site I built for TEJ Media, a done-for-you digital product partner for YouTube, Instagram, and TikTok creators.",
    highlights: [
      "Zero-investment partnership model explained end to end",
      "Process, comparison, and FAQ sections",
      "Live at tejmediaworks.com",
    ],
    stack: ["Next.js", "React", "Tailwind"],
    icon: "nextdotjs",
    link: { label: "tejmediaworks.com", href: "https://tejmediaworks.com" },
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
