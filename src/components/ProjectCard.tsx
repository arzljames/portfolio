import { Link } from "react-router";
import {
  categoryLabels,
  statusLabels,
  type Project,
  type ProjectImage,
  type ProjectStatus,
} from "../data/content";
import { Icon } from "./Icon";
import { DotList } from "./SectionHeading";

const pad = (n: number) => String(n).padStart(2, "0");
const projectPath = (project: Project) => `/projects/${project.id}`;

const pillClass =
  "inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/70 px-3 py-1.5 font-mono text-xs text-white backdrop-blur-md";

function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className={pillClass}>
      <span
        className={`size-1.5 rounded-full ${status === "live" ? "bg-emerald-400" : "bg-white/45"}`}
        aria-hidden="true"
      />
      {statusLabels[status]}
    </span>
  );
}

/** Status pill (top left) and "Concept visual" pill (top right) over a project image. */
function ImageBadges({ project, image }: { project: Project; image: ProjectImage }) {
  return (
    <div className="pointer-events-none absolute inset-x-3 top-3 z-10 flex items-start justify-between gap-3 sm:inset-x-4 sm:top-4">
      <StatusBadge status={project.status} />
      {image.concept && <span className={pillClass}>Concept visual</span>}
    </div>
  );
}

/** A project's first image inside the card's padded, rounded frame. */
function CardImage({
  project,
  badges = false,
  className = "",
}: {
  project: Project;
  badges?: boolean;
  /** Sizing for the image, e.g. a fixed aspect ratio; defaults to the image's own. */
  className?: string;
}) {
  const image = project.images[0];
  return (
    <div className="p-3 sm:p-4">
      <div className="relative overflow-hidden rounded-2xl bg-surface-2">
        <img
          src={image.src}
          alt={`${project.title} — ${image.alt}`}
          loading="lazy"
          className={`block w-full transition-transform duration-700 group-hover:scale-[1.02] ${
            className || "h-auto"
          }`}
        />
        {badges && <ImageBadges project={project} image={image} />}
      </div>
    </div>
  );
}

/** Mono label such as "01 · Full stack · Gaming"; `lead` replaces the number, `suffix` is appended. */
export function ProjectEyebrow({
  project,
  lead,
  suffix,
  numbered = true,
  className = "text-accent",
}: {
  project: Project;
  lead?: string;
  suffix?: string;
  numbered?: boolean;
  className?: string;
}) {
  const parts = [
    lead ?? (numbered ? pad(project.sort) : null),
    categoryLabels[project.category],
    project.tagline,
    suffix,
  ].filter(Boolean);
  return (
    <p className={`font-mono text-xs tracking-[0.12em] uppercase ${className}`}>{parts.join(" · ")}</p>
  );
}

export function Highlights({ items }: { items: string[] }) {
  return (
    <ul className="space-y-4 text-[17px] leading-relaxed text-fg/85">
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

export function Notice({ children }: { children: string }) {
  return (
    <p className="flex gap-3 rounded-2xl border border-line bg-surface p-4 text-sm leading-relaxed text-fg/85">
      <Icon name="alert" size={17} className="mt-0.5 shrink-0 text-accent" />
      {children}
    </p>
  );
}

const outlineButton =
  "inline-flex items-center gap-1.5 rounded-full border border-line-strong px-5 py-3 text-sm font-bold text-fg transition-colors hover:bg-surface-2";
const accentButton =
  "group inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-3 text-sm font-bold text-on-accent transition hover:brightness-110";

/** Live demo, download and source buttons; projects without links get a walkthrough prompt. */
export function ProjectActions({
  project,
  caseStudy = false,
  demoFirst = false,
}: {
  project: Project;
  /** Lead with a "View case study" button (home page featured card). */
  caseStudy?: boolean;
  /** Show the live demo as the primary button (project page). */
  demoFirst?: boolean;
}) {
  const { demo, source } = project.links;
  const download = project.category === "mobile" ? project.links.download : null;
  const sources = typeof source === "string" ? [{ label: "Source", url: source }] : (source ?? []);

  if (!caseStudy && !demo && !download && !sources.length) {
    if (project.status !== "private" && project.status !== "internal") return null;
    return (
      <p className="text-sm text-muted">
        {project.status === "internal" ? "Internal tool" : "Private project"} ·{" "}
        <Link to="/#contact" className="font-semibold text-fg underline underline-offset-4 hover:text-accent">
          Ask for a walkthrough
        </Link>
      </p>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {caseStudy && (
        <Link to={projectPath(project)} className={accentButton}>
          View case study
          <Icon name="arrowRight" size={15} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
      {download && (
        <a href={download} target="_blank" rel="noreferrer" className={caseStudy ? outlineButton : accentButton}>
          <Icon name="download" size={16} /> Download app
        </a>
      )}
      {demo && (
        <a href={demo} target="_blank" rel="noreferrer" className={demoFirst ? accentButton : outlineButton}>
          Live demo <Icon name="arrowUpRight" size={14} />
        </a>
      )}
      {sources.map((s) => (
        <a key={s.url} href={s.url} target="_blank" rel="noreferrer" className={outlineButton}>
          {s.label}
        </a>
      ))}
    </div>
  );
}

const cardClass = "overflow-hidden rounded-[28px] border border-line bg-surface";

/** Home page lead: image on top, then details, highlights and links in three columns. */
export function FeaturedProject({ project }: { project: Project }) {
  return (
    <article className={cardClass}>
      <CardImage project={project} />
      <div className="grid gap-10 px-6 pt-6 pb-9 sm:px-9 lg:grid-cols-[1.1fr_1fr_1fr]">
        <div>
          <ProjectEyebrow project={project} lead="Featured" />
          <h3 className="mt-4 font-display text-5xl font-extrabold tracking-[-0.045em] text-fg sm:text-6xl">
            <Link to={projectPath(project)} className="transition-colors hover:text-accent">
              {project.title}
            </Link>
          </h3>
          <p className="mt-5 text-lg leading-relaxed text-fg/80">{project.summary}</p>
        </div>
        {project.highlights && <Highlights items={project.highlights} />}
        <div className="space-y-6">
          <DotList items={project.stack} className="text-sm" />
          <ProjectActions project={project} caseStudy />
        </div>
      </div>
    </article>
  );
}

/** Home page card: links live in the card, so only the title links to the project page. */
export function HomeProjectCard({ project }: { project: Project }) {
  return (
    <article className={`flex h-full flex-col ${cardClass}`}>
      <CardImage project={project} />
      <div className="flex flex-1 flex-col px-6 pt-5 pb-7 sm:px-7">
        <ProjectEyebrow project={project} numbered={false} />
        <h3 className="mt-4 font-display text-3xl font-extrabold tracking-[-0.045em] text-fg sm:text-4xl">
          <Link to={projectPath(project)} className="transition-colors hover:text-accent">
            {project.title}
          </Link>
        </h3>
        <p className="mt-4 text-[17px] leading-relaxed text-fg/80">{project.summary}</p>
        <DotList items={project.stack} className="mt-5 text-sm" />
        <div className="mt-auto pt-8">
          <ProjectActions project={project} />
        </div>
      </div>
    </article>
  );
}

/** Projects page card; the whole card links to the project page. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to={projectPath(project)}
      data-cursor="View"
      className={`group flex h-full flex-col transition-colors hover:border-line-strong ${cardClass}`}
    >
      <CardImage
        project={project}
        badges
        className={project.wide ? "aspect-[16/10] object-cover object-top sm:aspect-[2/1]" : ""}
      />
      <div className="flex flex-1 flex-col px-6 pt-5 pb-7 sm:px-7">
        <ProjectEyebrow project={project} />
        <div className="mt-4 flex items-start justify-between gap-4">
          <h3
            className={`font-display font-extrabold tracking-[-0.045em] text-fg ${
              project.wide ? "text-4xl sm:text-5xl" : "text-3xl"
            }`}
          >
            {project.title}
          </h3>
          <Icon
            name="arrowUpRight"
            size={18}
            className="mt-2 shrink-0 text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
          />
        </div>
        <p className={`mt-4 text-[17px] leading-relaxed text-fg/80 ${project.wide ? "max-w-2xl" : ""}`}>
          {project.summary}
        </p>
        <DotList items={project.stack} className="mt-auto pt-6" />
      </div>
    </Link>
  );
}
