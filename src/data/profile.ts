export type SkillGroup = {
  id: string;
  label: string;
  items: { name: string; icon?: string }[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    label: "Languages",
    items: [
      { name: "JavaScript", icon: "javascript" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Python", icon: "python" },
      { name: "Rust", icon: "rust" },
      { name: "PHP", icon: "php" },
      { name: "EJS", icon: "ejs" },
    ],
  },
  {
    id: "bots",
    label: "Bots",
    items: [
      { name: "Discord.js v14", icon: "discorddotjs" },
      { name: "discord.py 2.x", icon: "discord" },
      { name: "Components V2", icon: "discorddotjs" },
      { name: "Lavalink", icon: "lavalink" },
      { name: "Kazagumo", icon: "discord" },
      { name: "Shoukaku", icon: "discord" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    items: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextdotjs" },
      { name: "Tailwind", icon: "tailwindcss" },
      { name: "Glassmorphism", icon: "vercel" },
      { name: "napi-rs/canvas", icon: "napi-rs" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    items: [
      { name: "Express 5", icon: "express" },
      { name: "REST APIs", icon: "postman" },
      { name: "Webhooks", icon: "discord" },
      { name: "KeyAuth", icon: "keyauth" },
      { name: "Sharding", icon: "nodedotjs" },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    items: [
      { name: "SQLite (WAL)", icon: "sqlite" },
      { name: "better-sqlite3", icon: "sqlite" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "Mongoose", icon: "mongoose" },
      { name: "MySQL", icon: "mysql" },
      { name: "Prisma", icon: "prisma" },
    ],
  },
  {
    id: "infra",
    label: "Infrastructure",
    items: [
      { name: "Pterodactyl", icon: "pterodactyl" },
      { name: "Cloudflare Tunnel", icon: "cloudflare" },
      { name: "AWS VPS", icon: "amazonwebservices" },
      { name: "SMTP", icon: "maildotcom" },
      { name: "Node migration", icon: "serverless" },
    ],
  },
  {
    id: "billing",
    label: "Billing",
    items: [
      { name: "Paymenter", icon: "paymenter" },
      { name: "VirtFusion API", icon: "virtfusion" },
      { name: "Laravel Blade", icon: "laravel" },
    ],
  },
  {
    id: "security",
    label: "Security",
    items: [
      { name: "SSRF hardening", icon: "shield" },
      { name: "ReDoS review", icon: "shieldcheck" },
      { name: "SVG XSS", icon: "shieldx" },
      { name: "IDOR fixes", icon: "shieldslashed" },
      { name: "Rate limiting", icon: "trafficlight" },
      { name: "Security audits", icon: "lockkey" },
    ],
  },
  {
    id: "devenv",
    label: "Dev environment",
    items: [
      { name: "Termux", icon: "termux" },
      { name: "Android", icon: "android" },
      { name: "Antigravity", icon: "google" },
      { name: "AI coding agents", icon: "anthropic" },
    ],
  },
];

export type Service = {
  id: string;
  title: string;
  description: string;
  points: string[];
  /** Optional price label. Left empty until final pricing is decided. */
  price?: string;
};

export const services: Service[] = [
  {
    id: "discord-bots",
    title: "Custom Discord bots",
    description:
      "Bots built on Discord.js or discord.py, using Components V2 for the interface layer.",
    points: ["Slash or hybrid commands", "Sharded for large guild counts", "Handover with setup docs"],
  },
  {
    id: "dashboards",
    title: "Bot dashboards and websites",
    description:
      "Dashboards and marketing sites on Next.js, built to sit next to the bot they serve.",
    points: ["App Router with typed data layer", "Admin panels and billing views", "Responsive by default"],
  },
  {
    id: "theming",
    title: "Panel redesigns and theming",
    description:
      "Dark, sci-fi themes for Paymenter and Pterodactyl, including Blade templates and the client UI.",
    points: ["Full template restyle", "Font and colour system", "Delivered as deployable templates"],
  },
  {
    id: "hosting",
    title: "Hosting setup and infrastructure",
    description:
      "Panel, nodes, tunnels, and mail set up so a hosting service actually stays reachable.",
    points: ["Pterodactyl panel and Wings", "Cloudflare Tunnel configuration", "SMTP and DNS troubleshooting"],
  },
  {
    id: "security",
    title: "Security reviews and hardening",
    description:
      "Audits of bot and web code, with a written remediation plan instead of a vague report.",
    points: ["SSRF, ReDoS, SVG XSS, IDOR", "Findings with reproduction steps", "Fixes applied after sign-off"],
  },
  {
    id: "websites",
    title: "Freelance websites",
    description:
      "Sites for local businesses, scoped small and shipped fast.",
    points: ["Typical budget ₹5,000 to ₹7,000", "Mobile-first, fast to load", "Two revision rounds included"],
    price: "from ₹5,000",
  },
];

export const profile = {
  name: "Ansh",
  role: "Discord bot developer, full-stack developer, hosting operator",
  location: "Gorakhpur, Uttar Pradesh, India",
  languages: "Hinglish (Hindi + English)",
  shortBio:
    "Discord bot developer and hosting service operator. Builds production bots for personal projects and paid clients, designs dashboards and billing panels, and runs the server infrastructure behind VexaNode.",
  longBio: [
    "I build Discord bots that people actually keep running. Most of my work sits in three places at once: the bot itself, the panel people log into, and the servers underneath that keep both alive.",
    "VexaNode is my own hosting service, built on Pterodactyl with Paymenter handling billing. Running it means I get to see the infrastructure problems that clients hit, and I get to fix them for them.",
    "I work in Hinglish, which means you can describe a bug the way you actually noticed it. Half the work in any project is understanding what broke and why it felt wrong.",
  ],
  contact: {
    // TODO(ansh): replace these with real handles before publishing.
    email: "hello@ansh.dev",
    discord: "ansh",
    github: "github.com/ansh",
  },
  availability: "Open to freelance and client work",
};

export const statSlots = [
  // TODO(ansh): these are placeholders until live numbers are wired up.
  { id: "servers", label: "Servers hosted", value: null as number | null, suffix: "" },
  { id: "users", label: "Users served", value: null as number | null, suffix: "" },
  { id: "uptime", label: "Uptime", value: null as number | null, suffix: "%" },
  { id: "projects", label: "Projects shipped", value: 22, suffix: "" },
];
