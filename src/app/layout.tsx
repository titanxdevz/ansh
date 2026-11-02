import type { Metadata, Viewport } from "next";
import "@fontsource-variable/outfit";
import "@fontsource-variable/dm-sans";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";
import { ScrollProgressProvider } from "@/lib/scroll-progress";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description:
    "Discord bot developer and hosting operator building production bots, dashboards, and billing panels. Founder of VexaNode.",
  keywords: [
    "Discord bot developer",
    "discord.js",
    "discord.py",
    "Pterodactyl hosting",
    "Next.js developer",
    "VexaNode",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — Discord bot developer & hosting operator`,
    description: profile.shortBio,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#14161f",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="night" className="dark">
      <body className="grain bg-[var(--bg)] text-[var(--ink)] antialiased">
        <ThemeProvider>
          <ScrollProgressProvider>{children}</ScrollProgressProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
