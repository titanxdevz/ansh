"use client";

import React, { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { sound } from "@/lib/sound";
import {
  TreeStructure,
  ShieldCheck,
  Cpu,
  Database,
  CloudCheck,
  Lightning,
  ArrowsLeftRight,
  CodeBlock,
  CheckCircle,
} from "@phosphor-icons/react";

interface NodeSpec {
  id: string;
  name: string;
  role: string;
  protocol: string;
  latency: string;
  resilience: string;
  codeSnippet: string;
  connections: string[];
}

const NODES: NodeSpec[] = [
  {
    id: "gateway",
    name: "Discord Gateway Layer",
    role: "WebSocket connection pool handling guild dispatch events, heartbeats, and payload zlib deflate.",
    protocol: "WebSocket (RFC 6455) / WSS",
    latency: "< 24ms roundtrip",
    resilience: "Automatic exponential backoff with sequence ID resume on disconnect.",
    codeSnippet: `// ShardingManager cluster bootstrap
const manager = new ShardingManager('./dist/bot.js', {
  token: process.env.DISCORD_TOKEN,
  totalShards: 'auto',
  respawn: true,
  mode: 'worker'
});
manager.on('shardCreate', shard => {
  console.log(\`[CLUSTER] Shard \${shard.id} spawned & online\`);
});`,
    connections: ["cluster", "security"],
  },
  {
    id: "security",
    name: "Cloudflare Zero-Trust Tunnel",
    role: "Private egress-only tunnel protecting administrative dashboards, Wings daemon, and API ports from public scanners.",
    protocol: "QUIC / HTTP/3 over WireGuard",
    latency: "< 14ms edge proxy",
    resilience: "0 inbound open WAN ports. Layer 3/4/7 DDoS absorption by Cloudflare edge.",
    codeSnippet: `# cloudflared ingress configuration
tunnel: vexanode-prod-cluster
credentials-file: /etc/cloudflared/creds.json
ingress:
  - hostname: panel.vexanode.in
    service: http://localhost:8080
  - hostname: wings.vexanode.in
    service: https://localhost:8443
  - service: http_status:404`,
    connections: ["gateway", "panel"],
  },
  {
    id: "cluster",
    name: "Worker Shards & Event Dispatch",
    role: "Isolated worker threads executing slash commands, permission checks, and state coordination.",
    protocol: "Node.js Worker Threads & IPC",
    latency: "< 1.2ms event loop tick",
    resilience: "Crash isolation: single shard unhandled rejections do not take down neighboring shards.",
    codeSnippet: `// Safe event dispatch with timeout guard
async function handleInteraction(interaction) {
  const timeout = setTimeout(() => {
    interaction.deferReply({ ephemeral: true }).catch(() => {});
  }, 2500);
  try {
    await executeCommand(interaction);
  } finally {
    clearTimeout(timeout);
  }
}`,
    connections: ["audio", "database"],
  },
  {
    id: "audio",
    name: "Lavalink v4 Audio Engine",
    role: "High-performance Java audio server processing 48kHz stereo Opus pipes via Kazagumo & Shoukaku client bindings.",
    protocol: "WebSocket & RTP UDP audio streams",
    latency: "< 8ms packet buffer",
    resilience: "Multi-node failover pool: automatically reroutes playback if node socket drops.",
    codeSnippet: `// Kazagumo node connection pool
const kazagumo = new Kazagumo({
  defaultSearchEngine: 'youtube',
  send: (guildId, payload) => {
    const guild = client.guilds.cache.get(guildId);
    if (guild) guild.shard.send(payload);
  }
}, new Connectors.DiscordJS(client), [
  { name: 'Node-01-Delhi', url: '127.0.0.1:2333', auth: 'youshallnotpass' }
]);`,
    connections: ["cluster"],
  },
  {
    id: "database",
    name: "SQLite WAL Persistence",
    role: "Deterministic local relational database tuned for high write throughput and zero database lock contention.",
    protocol: "Native C ABI via better-sqlite3",
    latency: "< 0.65ms write commit",
    resilience: "WAL (Write-Ahead Logging) mode with auto-checkpoints and transactional integrity.",
    codeSnippet: `// SQLite WAL performance optimization
const db = new Database('guilds.db');
db.pragma('journal_mode = WAL');
db.pragma('synchronous = NORMAL');
db.pragma('busy_timeout = 5000');
db.pragma('temp_store = MEMORY');
const saveSettings = db.transaction((guildId, prefix) => {
  // Atomic ACID write executed in < 1ms
});`,
    connections: ["cluster", "panel"],
  },
  {
    id: "panel",
    name: "Paymenter & Pterodactyl API",
    role: "Billing automation and game server daemon orchestrating container lifecycles via VirtFusion & Wings.",
    protocol: "REST API / OAuth2 Bearer",
    latency: "< 45ms sync",
    resilience: "Idempotent payment webhooks with automatic provisioning retry queues.",
    codeSnippet: `// Automated server deployment hook
public function handleInvoicePaid(Invoice $invoice) {
  $plan = $invoice->plan;
  $server = $this->pterodactyl->createServer([
    'name' => $invoice->user->name . '-server',
    'user' => $invoice->user->pterodactyl_id,
    'egg'  => $plan->egg_id,
    'limits' => ['memory' => $plan->ram, 'disk' => $plan->disk]
  ]);
}`,
    connections: ["security", "database"],
  },
];

export function Architecture() {
  const [selectedId, setSelectedId] = useState<string>("gateway");
  const selectedNode = NODES.find((n) => n.id === selectedId) || NODES[0];

  const handleSelect = (id: string) => {
    sound.click();
    setSelectedId(id);
  };

  return (
    <section
      id="architecture"
      data-scene-chapter
      className="relative flex min-h-[100dvh] items-center py-24 sm:py-32"
    >
      <div className="scrim" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8 space-y-12">
        <Reveal>
          <div className="max-w-[46rem]">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--line)] bg-[var(--panel)] text-xs font-mono text-[var(--accent-text)] mb-4">
              <TreeStructure size={14} weight="bold" />
              <span>Interactive Architecture Schematic</span>
            </div>
            <h2 className="text-4xl leading-[1.06] tracking-tight sm:text-5xl font-bold">
              How the entire ecosystem connects
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[var(--ink-muted)]">
              Click any system node below to inspect its data protocols, latency benchmarks, failure recovery, and real production configuration.
            </p>
          </div>
        </Reveal>

        {/* Interactive Schematic Diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Nodes Map */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {NODES.map((node) => {
              const isSelected = selectedId === node.id;
              const isConnected = selectedNode.connections.includes(node.id);

              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => handleSelect(node.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "border-[var(--accent)] bg-[var(--panel)] shadow-lg ring-1 ring-[var(--accent)]"
                      : isConnected
                      ? "border-[var(--line-strong)] bg-[var(--panel)]/70 hover:border-[var(--accent)]/60"
                      : "border-[var(--line)] bg-[var(--panel)]/40 hover:border-[var(--line-strong)]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-[family-name:var(--font-display)] font-semibold text-base text-[var(--ink)]">
                      {node.name}
                    </span>
                    {isSelected ? (
                      <span className="text-[10px] font-mono font-bold text-[var(--on-accent)] bg-[var(--accent)] px-2 py-0.5 rounded">
                        ACTIVE
                      </span>
                    ) : isConnected ? (
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded">
                        PIPELINE LINK
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-xs text-[var(--ink-muted)] line-clamp-1">
                    {node.role}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Node Spec Sheet & Live Code Inspection */}
          <div className="lg:col-span-7 rounded-2xl border border-[var(--line-strong)] bg-[var(--panel)] p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--line)] pb-5">
              <div>
                <span className="text-xs font-mono text-[var(--accent-text)] uppercase tracking-wider font-semibold">
                  Node Specification
                </span>
                <h3 className="text-2xl font-bold tracking-tight text-[var(--ink)] mt-0.5">
                  {selectedNode.name}
                </h3>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full border border-[var(--line)] bg-[var(--bg-deep)] text-emerald-400">
                {selectedNode.latency}
              </span>
            </div>

            <p className="text-sm sm:text-base leading-relaxed text-[var(--ink)]">
              {selectedNode.role}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-[var(--line)] bg-[var(--bg-deep)]/60 p-3.5 font-mono text-xs">
                <span className="text-[10px] uppercase text-[var(--ink-muted)] block mb-1">
                  Communication Protocol
                </span>
                <span className="text-[var(--ink)] font-medium">
                  {selectedNode.protocol}
                </span>
              </div>
              <div className="rounded-xl border border-[var(--line)] bg-[var(--bg-deep)]/60 p-3.5 font-mono text-xs">
                <span className="text-[10px] uppercase text-[var(--ink-muted)] block mb-1">
                  Resilience Mechanism
                </span>
                <span className="text-[var(--accent-text)] font-medium">
                  {selectedNode.resilience}
                </span>
              </div>
            </div>

            {/* Code Configuration Snippet */}
            <div className="rounded-xl border border-[var(--line)] bg-[#0d1017] overflow-hidden">
              <div className="flex items-center justify-between border-b border-[var(--line)] bg-[#121620] px-4 py-2">
                <span className="text-xs font-mono text-[var(--ink-muted)] flex items-center gap-1.5">
                  <CodeBlock size={14} className="text-[var(--accent)]" />
                  production-config.ts
                </span>
                <span className="text-[10px] font-mono text-neutral-500">Read-Only</span>
              </div>
              <pre className="p-4 text-xs font-mono text-neutral-300 overflow-x-auto leading-relaxed select-text">
                <code>{selectedNode.codeSnippet}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
