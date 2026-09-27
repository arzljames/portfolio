import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-4 text-xs font-semibold tracking-[0.25em] text-muted uppercase">
      {children}
      <span className="h-px w-20 bg-line-strong" aria-hidden="true" />
    </p>
  );
}

/** Big display heading; the `accent` words render in orange. */
export function SectionHeading({
  eyebrow,
  lead,
  accent,
  as: Tag = "h2",
}: {
  eyebrow: string;
  lead: ReactNode;
  accent: string;
  as?: "h1" | "h2";
}) {
  return (
    <Reveal>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Tag className="mt-6 font-display text-5xl leading-[0.95] font-extrabold tracking-[-0.03em] text-fg sm:text-6xl lg:text-7xl">
        {lead} <span className="text-accent">{accent}</span>
      </Tag>
    </Reveal>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-line-strong bg-surface-2/60 px-3 py-1 text-xs font-medium text-muted">
      {children}
    </span>
  );
}

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1280px] px-4 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}
