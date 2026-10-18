import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router";
import type { Project, ProjectCategory, ProjectStatus } from "../data/content";
import { Icon, type IconKey } from "./Icon";
import { Tag } from "./SectionHeading";

const categoryLabels: Record<ProjectCategory, string> = {
  fullstack: "Full stack",
  internal: "Internal tool",
  backend: "Backend",
  mobile: "Mobile",
};

// Backdrop glow behind each project's screenshots, picked by sort order.
const tints = [
  "rgb(16 185 129 / 0.22)",
  "rgb(225 29 72 / 0.22)",
  "rgb(139 92 246 / 0.3)",
  "rgb(20 184 166 / 0.22)",
  "rgb(249 115 22 / 0.2)",
  "rgb(20 184 166 / 0.18)",
  "rgb(168 85 247 / 0.24)",
];

const badges: Record<
  ProjectStatus,
  { label: string; className: string; icon?: IconKey; dot?: string } | null
> = {
  featured: { label: "Featured", icon: "star", className: "border-transparent bg-accent text-white" },
  live: {
    label: "Live demo",
    dot: "bg-emerald-400",
    className: "border-emerald-400/30 bg-emerald-500/15 text-emerald-300",
  },
  private: { label: "Private", icon: "lock", className: "border-white/15 bg-black/50 text-white" },
  retired: {
    label: "No longer live",
    dot: "bg-amber-400",
    className: "border-amber-400/30 bg-amber-500/15 text-amber-300",
  },
  concept: { label: "Concept visuals", className: "border-white/15 bg-black/50 text-white" },
  released: null,
};

const pad = (n: number) => String(n).padStart(2, "0");
const paragraphs = (text: string) => text.split(/\n\s*\n/);

function StatusBadge({ status }: { status: ProjectStatus }) {
  const badge = badges[status];
  if (!badge) return null;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-md ${badge.className}`}
    >
      {badge.icon && <Icon name={badge.icon} size={13} />}
      {badge.dot && <span className={`size-1.5 rounded-full ${badge.dot}`} />}
      {badge.label}
    </span>
  );
}

const arrowClass =
  "absolute top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur-md transition-colors hover:bg-black/80";

/** Screenshot carousel with a status badge, caption and prev/next controls. */
export function ProjectGallery({ project, className = "" }: { project: Project; className?: string }) {
  const [index, setIndex] = useState(0);
  const { images } = project;
  const image = images[index];
  const many = images.length > 1;
  const go = (step: number) => setIndex((i) => (i + step + images.length) % images.length);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 60) go(info.offset.x < 0 ? 1 : -1);
  };

  return (
    <div
      className={`relative overflow-hidden bg-surface-2 ${className}`}
      style={{
        backgroundImage: `radial-gradient(120% 90% at 0% 0%, ${tints[(project.sort - 1) % tints.length]}, transparent 65%)`,
      }}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={image.src}
          // Inset images are scaled to fit whole between the badges, arrows and dots.
          className={`absolute ${
            image.bleed
              ? "inset-0"
              : `inset-x-5 top-14 flex items-center justify-center sm:inset-x-16 ${many ? "bottom-14" : "bottom-6"}`
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          drag={many ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={onDragEnd}
        >
          <img
            src={image.src}
            alt={`${project.title} — ${image.alt}`}
            loading="lazy"
            draggable={false}
            className={
              image.bleed
                ? "size-full object-cover"
                : "max-h-full max-w-full rounded-xl border border-white/10 shadow-2xl shadow-black/50"
            }
          />
        </motion.div>
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-x-4 top-4 z-10 flex items-start justify-between gap-3">
        <StatusBadge status={project.status} />
        <span className="ml-auto rounded-full border border-white/15 bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
          {image.caption}
          {many && (
            <span className="ml-2 font-mono text-white/60">
              {index + 1} / {images.length}
            </span>
          )}
        </span>
      </div>

      {many && (
        <>
          <button type="button" onClick={() => go(-1)} aria-label="Previous image" className={`left-4 ${arrowClass}`}>
            <Icon name="chevronLeft" size={18} />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next image" className={`right-4 ${arrowClass}`}>
            <Icon name="chevronRight" size={18} />
          </button>
          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1 rounded-full bg-black/60 px-2 py-1.5 backdrop-blur-md">
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show ${img.caption}`}
                aria-current={i === index}
                className="grid size-5 place-items-center"
              >
                <span
                  className={`size-2 rounded-full transition-colors ${i === index ? "bg-accent" : "bg-white/35 hover:bg-white/60"}`}
                />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function ProjectEyebrow({ project }: { project: Project }) {
  return (
    <p className="font-mono text-xs font-semibold tracking-[0.25em] text-muted uppercase">
      <span className="text-accent">{pad(project.sort)}</span>
      <span className="ml-3">
        {categoryLabels[project.category]} · {project.tagline}
      </span>
    </p>
  );
}

export function Highlights({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 text-[15px] leading-relaxed text-fg/90">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="text-accent" aria-hidden="true">
            →
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function MetaGrid({ items }: { items: NonNullable<Project["meta"]> }) {
  return (
    <dl className="grid grid-cols-2 divide-x divide-line rounded-2xl border border-line">
      {items.map((item) => (
        <div key={item.label} className="px-5 py-4">
          <dt className="text-xs font-semibold tracking-[0.15em] text-muted uppercase">{item.label}</dt>
          <dd className="mt-1 font-semibold text-fg">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Notice({ children }: { children: string }) {
  return (
    <p className="flex gap-3 rounded-2xl border border-amber-400/20 bg-amber-500/[0.06] p-4 text-sm leading-relaxed text-fg/85">
      <Icon name="alert" size={17} className="mt-0.5 shrink-0 text-amber-400" />
      {children}
    </p>
  );
}

export function StackList({ stack }: { stack: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {stack.map((tech) => (
        <li key={tech}>
          <Tag>{tech}</Tag>
        </li>
      ))}
    </ul>
  );
}

const button =
  "inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-colors";

export function ProjectActions({ project }: { project: Project }) {
  const { demo } = project.links;
  const download = project.category === "mobile" ? project.links.download : null;
  const source = project.links.source;
  const sources =
    typeof source === "string"
      ? [{ label: demo ? "Source" : "Source code", url: source }]
      : (source ?? []);

  if (!demo && !sources.length && !download) {
    if (project.status !== "private") return null;
    return (
      <p className="flex items-center gap-2 text-sm text-muted">
        <Icon name="lock" size={15} />
        {project.category === "internal" ? "Internal tool" : "Private project"} — not publicly available
      </p>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {download && (
        <a href={download} target="_blank" rel="noreferrer" className={`${button} bg-accent text-white hover:brightness-110`}>
          <Icon name="download" size={16} /> Download app
        </a>
      )}
      {demo && (
        <a href={demo} target="_blank" rel="noreferrer" className={`${button} border border-line-strong text-fg hover:bg-surface-2`}>
          Live demo <Icon name="arrowUpRight" size={14} />
        </a>
      )}
      {sources.map((s) => (
        <a
          key={s.url}
          href={s.url}
          target="_blank"
          rel="noreferrer"
          className={`${button} ${demo ? "text-muted hover:text-fg" : "border border-line-strong text-fg hover:bg-surface-2"}`}
        >
          <Icon name="code" size={16} /> {s.label}
        </a>
      ))}
    </div>
  );
}

function Title({ project, className }: { project: Project; className: string }) {
  return (
    <h3 className={`font-display font-extrabold tracking-[-0.03em] text-fg ${className}`}>
      <Link to={`/projects/${project.id}`} className="transition-colors hover:text-accent">
        {project.title}
      </Link>
    </h3>
  );
}

const cardClass = "overflow-hidden rounded-[28px] border border-line bg-surface";

/** Full-width card: gallery beside the details. Mobile projects put the gallery on the right. */
function WideCard({ project }: { project: Project }) {
  const mobile = project.category === "mobile";
  const [lead, ...rest] = paragraphs(project.description);

  return (
    <article className={`grid lg:grid-cols-[1.15fr_1fr] ${cardClass}`}>
      <ProjectGallery
        project={project}
        className={`aspect-[16/10] lg:aspect-auto lg:min-h-[480px] ${mobile ? "lg:order-last" : ""}`}
      />
      <div className="flex flex-col justify-center gap-6 p-7 sm:p-10 lg:p-12">
        <ProjectEyebrow project={project} />
        <Title project={project} className={mobile ? "text-4xl sm:text-5xl" : "text-4xl sm:text-6xl"} />
        <div className="space-y-4">
          <p className={mobile ? "text-xl leading-relaxed text-fg" : "text-[17px] leading-relaxed text-muted"}>
            {lead}
          </p>
          {rest.map((p) => (
            <p key={p} className="text-[15px] leading-relaxed text-muted">
              {p}
            </p>
          ))}
        </div>
        {project.highlights && <Highlights items={project.highlights} />}
        {project.meta && <MetaGrid items={project.meta} />}
        {project.notice && <Notice>{project.notice}</Notice>}
        <StackList stack={project.stack} />
        <ProjectActions project={project} />
      </div>
    </article>
  );
}

function GridCard({ project }: { project: Project }) {
  return (
    <article className={`flex h-full flex-col ${cardClass}`}>
      <ProjectGallery project={project} className="aspect-[16/10]" />
      <div className="flex flex-1 flex-col gap-5 p-7 sm:p-8">
        <ProjectEyebrow project={project} />
        <Title project={project} className="text-3xl sm:text-4xl" />
        {paragraphs(project.description).map((p) => (
          <p key={p} className="text-[15px] leading-relaxed text-muted sm:text-base">
            {p}
          </p>
        ))}
        {project.highlights && <Highlights items={project.highlights} />}
        {project.meta && <MetaGrid items={project.meta} />}
        {project.notice && <Notice>{project.notice}</Notice>}
        <StackList stack={project.stack} />
        <div className="mt-auto pt-3">
          <ProjectActions project={project} />
        </div>
      </div>
    </article>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return project.wide ? <WideCard project={project} /> : <GridCard project={project} />;
}
