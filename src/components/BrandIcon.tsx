"use client";

import { brandPaths } from "@/lib/brand-paths";

type BrandIconProps = {
  slug: string;
  size?: number;
  className?: string;
  title?: string;
};

/**
 * A brand mark rendered from a locally bundled SVG path.
 * Colour comes from the current text colour so icons inherit the theme.
 */
export function BrandIcon({ slug, size = 16, className, title }: BrandIconProps) {
  const data = brandPaths[slug];
  if (!data) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={title ?? data.title}
      fill="currentColor"
      focusable="false"
    >
      <path d={data.d} />
    </svg>
  );
}

export function hasBrandIcon(slug: string | undefined): boolean {
  return Boolean(slug && brandPaths[slug]);
}
