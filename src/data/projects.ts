export type Project = {
  slug: string;
  name: string;
  category: "hosting" | "bots" | "tools" | "web";
  year: string;
  summary: string;
  highlights: string[];
  stack: string[];
  /** Simple Icons slug used for the logo, when the project has a recognizable brand mark. */
  icon?: string;
  featured?: boolean;
  link?: { label: string; href: string };
};

export const projects: Project[] = [
  {
    slug: "vexanode",
    name: "VexaNode",
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
    slug: "blitz",
    name: "Blitz",
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
    slug: "antinuke",
    name: "Antinuke",
    category: "bots",
    year: "2025",
    summary:
      "Built for ban and revert speed: permission checks stay O(1) and recovery runs in parallel.",
    highlights: [
      "BigInt bitmask permission checks",
      "Adaptive parallel recovery and in-flight ban dedup",
      "TTL caches to keep hot paths cheap",
    ],
    stack: ["discord.py", "Bitmask", "Discord"],
    icon: "discord",
    featured: true,
  },
  {
    slug: "botliy",
    name: "Botliy",
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
    slug: "vouch",
    name: "Vouch",
    category: "bots",
    year: "2024",
    summary:
      "Thirty-seven file Discord.js project running on Components V2 only, with hybrid slash and prefix commands.",
    highlights: [
      "11-step validation pipeline on every command",
      "SQLite in WAL mode",
      "Components V2 only, no legacy message content",
    ],
    stack: ["discord.js", "SQLite", "Components V2"],
    icon: "discorddotjs",
  },
  {
    slug: "mahiru",
    name: "Mahiru",
    category: "bots",
    year: "2024",
    summary:
      "Music bot with anime-style canvas banners and a shared SOURCE_MAP pattern across every asset.",
    highlights: [
      "Canvas banner generation with napi-rs",
      "Shared SOURCE_MAP pattern for image caching",
      "Kazagumo and Shoukaku player stack",
    ],
    stack: ["Kazagumo", "Shoukaku", "napi-rs", "Discord"],
    icon: "discord",
  },
  {
    slug: "hearth",
    name: "Hearth",
    category: "bots",
    year: "2024",
    summary:
      "Utility bot whose whole interface is Components V2: home menu, category view, and command detail screens.",
    highlights: [
      "Home, category, and detail screens",
      "Components V2 help UI",
      "Clean state handling across screens",
    ],
    stack: ["discord.js", "Components V2"],
    icon: "discorddotjs",
  },
  {
    slug: "multi-system",
    name: "Multi-System",
    category: "bots",
    year: "2024",
    summary:
      "Server operations bot with per-category webhook logging, mass-action detection, and self-protection.",
    highlights: [
      "Dangerous-permission detection on role assignment",
      "DB auto-migration on boot",
      "Self-protection against takeover attempts",
    ],
    stack: ["discord.js", "SQLite", "Webhooks"],
    icon: "discorddotjs",
  },
  {
    slug: "python-components",
    name: "Python Components V2",
    category: "bots",
    year: "2025",
    summary:
      "Client project: a production discord.py bot covering antinuke, moderation, utility, and developer tooling.",
    highlights: [
      "Antinuke, moderation, utility, and dev tools in one bot",
      "SQLite persistence",
      "Delivered as a client engagement",
    ],
    stack: ["discord.py", "SQLite"],
    icon: "discord",
  },
  {
    slug: "youtube-verification",
    name: "YouTube Verification",
    category: "bots",
    year: "2024",
    summary:
      "Subscription verification through OCR and API checks, with role gating that only unlocks in steps.",
    highlights: [
      "OCR plus API subscription checks",
      "Multi-step role gating",
      "Spoof-resistant verification flow",
    ],
    stack: ["Python", "OCR", "Discord"],
    icon: "youtube",
  },
  {
    slug: "reposloth",
    name: "RepoSloth",
    category: "tools",
    year: "2025",
    summary:
      "Desktop AI companion for repositories, with a chat agent, Git Studio, and pull request management.",
    highlights: [
      "Rust core with a TypeScript interface",
      "AI chat agent over your own codebase",
      "Git Studio and PR management built in",
    ],
    stack: ["Rust", "TypeScript", "Tauri"],
    icon: "rust",
  },
  {
    slug: "voiceforge",
    name: "VoiceForge",
    category: "tools",
    year: "2025",
    summary:
      "Free Windows voice changer tuned for low latency, built on egui, CPAL, and VB-CABLE routing.",
    highlights: [
      "Low-latency audio pipeline",
      "egui interface, no web runtime",
      "Free to distribute",
    ],
    stack: ["Rust", "egui", "CPAL", "VB-CABLE"],
    icon: "rust",
  },
  {
    slug: "rust-vs-node",
    name: "Rust vs Node",
    category: "tools",
    year: "2024",
    summary:
      "Benchmark site that runs both runtimes on the same VPS and database, then shows where each one breaks.",
    highlights: [
      "Same VPS, same database, fair comparison",
      "Live CPU, RAM, and request counters",
      "Breaking-point display as load climbs",
    ],
    stack: ["Rust", "Node.js", "SQLite"],
    icon: "rust",
  },
  {
    slug: "zyncx-admin",
    name: "ZYNCX Admin",
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
    slug: "92lr-dashboard",
    name: "92LR Dashboard",
    category: "web",
    year: "2024",
    summary:
      "Web dashboard protected by KeyAuth, in a dark theme with an animated mascot that reacts to state.",
    highlights: [
      "KeyAuth authentication",
      "Animated mascot reacting to app state",
      "Dark theme throughout",
    ],
    stack: ["KeyAuth", "JavaScript", "Canvas"],
  },
  {
    slug: "saiyara",
    name: "Saiyara Management",
    category: "bots",
    year: "2024",
    summary:
      "Community management bot that renders canvas leaderboard cards and tracks voice channel time.",
    highlights: [
      "Canvas leaderboard cards",
      "Voice channel time tracking",
      "Ranked board regenerated on demand",
    ],
    stack: ["discord.js", "napi-rs", "SQLite"],
    icon: "discorddotjs",
  },
  {
    slug: "dns-lookup",
    name: "dns_lookup.py",
    category: "tools",
    year: "2024",
    summary:
      "Termux DNS tool that enumerates subdomains through crt.sh, written for a phone without root.",
    highlights: [
      "Subdomain enumeration via crt.sh",
      "Runs on Termux on Android",
      "Single file, no dependencies to install",
    ],
    stack: ["Python", "Termux"],
    icon: "python",
  },
  {
    slug: "vanity-url",
    name: "Vanity URL Checker",
    category: "tools",
    year: "2024",
    summary:
      "Multi-threaded checker for vanity URLs with a 24-bit RGB console interface.",
    highlights: [
      "Multi-threaded request handling",
      "24-bit RGB console UI",
      "Runs from any terminal",
    ],
    stack: ["Python"],
    icon: "python",
  },
  {
    slug: "php2shell",
    name: "PHP2Shell",
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
];

export const featuredProjects = projects.filter((p) => p.featured);
