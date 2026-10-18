import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/** Mono label above a heading, e.g. "01 — About". */
export function Eyebrow({ children, index }: { children: ReactNode; index?: string }) {
  return (
    <p className="font-mono text-xs tracking-[0.12em] text-accent uppercase">
      {index && <>{index} — </>}
      {children}
    </p>
  );
}

export const headingClass =
  "font-display font-extrabold leading-[0.95] tracking-[-0.045em] text-fg";

/** Big display heading with its eyebrow. */
export function SectionHeading({
  eyebrow,
  index,
  children,
  as: Tag = "h2",
}: {
  eyebrow: string;
  /** Optional section number shown before the eyebrow, e.g. "03". */
  index?: string;
  children: ReactNode;
  as?: "h1" | "h2";
}) {
  return (
    <Reveal>
      <Eyebrow index={index}>{eyebrow}</Eyebrow>
      <Tag className={`mt-6 text-5xl sm:text-6xl lg:text-7xl ${headingClass}`}>{children}</Tag>
    </Reveal>
  );
}

/** Mono list separated by middots, used for stacks and tags. */
export function DotList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-y-1 font-mono text-xs text-muted ${className}`}>
      {items.map((item, i) => (
        <li key={item} className="flex items-center">
          {item}
          {/* Trailing separator, so a wrapped line ends with "·" instead of starting with one. */}
          {i < items.length - 1 && (
            <span className="mx-2 text-faint" aria-hidden="true">
              ·
            </span>
          )}
        </li>
      ))}
    </ul>
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
    <div className={`mx-auto w-full max-w-7xl px-4 sm:px-8 xl:px-12 ${className}`}>
      {children}
    </div>
  );
}
