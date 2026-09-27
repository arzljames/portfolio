import { Link } from "react-router";
import { projects, type Project } from "../data/content";
import { Icon } from "./Icon";
import { ProjectVisual, StatusBadge } from "./ProjectVisual";
import { Reveal } from "./Reveal";
import { Container, SectionHeading, Tag } from "./SectionHeading";

function meta(project: Project) {
  return `${project.category} · ${project.year}`;
}

function FeaturedProject({ project }: { project: Project }) {
  return (
    <Link to={`/projects/${project.slug}`} data-cursor="View" className="group block">
      <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-line bg-surface-2 sm:aspect-[16/7]">
        <ProjectVisual project={project} />
        <div className="absolute top-4 left-4 flex gap-2">
          <StatusBadge status={project.status} />
          <span className="rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
            {meta(project)}
          </span>
        </div>
      </div>
      <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div className="max-w-xl">
          <h3 className="font-display text-2xl font-extrabold tracking-[-0.03em] text-fg transition-colors group-hover:text-accent">
            {project.title}
          </h3>
          <p className="mt-2 text-[15px] leading-relaxed text-muted">{project.summary}</p>
        </div>
        <ul className="flex max-w-xs flex-wrap gap-2 sm:justify-end">
          {project.tags.map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}

function CompactProject({ project }: { project: Project }) {
  return (
    <Link to={`/projects/${project.slug}`} data-cursor="View" className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line bg-surface-2">
        <ProjectVisual project={project} />
        <div className="absolute top-4 left-4">
          <StatusBadge status={project.status} />
        </div>
      </div>
      <p className="mt-6 text-xs font-semibold tracking-[0.2em] text-muted uppercase">
        {meta(project)}
      </p>
      <h3 className="mt-1.5 font-display text-xl font-extrabold tracking-[-0.03em] text-fg transition-colors group-hover:text-accent">
        {project.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{project.summary}</p>
    </Link>
  );
}

/** Card used on the All Projects page. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      data-cursor="View"
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-line-strong"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-surface-2">
        <ProjectVisual project={project} />
        <div className="absolute top-3 left-3">
          <StatusBadge status={project.status} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold tracking-[0.2em] text-muted uppercase">
            {meta(project)}
          </p>
          <Icon
            name="arrowUpRight"
            size={15}
            className="text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
          />
        </div>
        <h3 className="mt-2 font-display text-xl font-extrabold tracking-[-0.03em] text-fg transition-colors group-hover:text-accent">
          {project.title}
        </h3>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">
          {project.summary}
        </p>
        <ul className="mt-auto flex flex-wrap gap-2 pt-5">
          {project.tags.slice(0, 3).map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}

export function Projects() {
  const [lead, ...rest] = projects.filter((p) => p.featured);

  return (
    <section id="projects" className="py-24 sm:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="Selected work" lead="Featured" accent="work." />
          <Reveal delay={0.1}>
            <p className="max-w-xs text-[15px] leading-relaxed text-muted">
              A curated selection — frontend, fullstack, and backend.
            </p>
          </Reveal>
        </div>

        {lead && (
          <Reveal className="mt-14">
            <FeaturedProject project={lead} />
          </Reveal>
        )}

        <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-6">
          {rest.slice(0, 2).map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.08}>
              <CompactProject project={project} />
            </Reveal>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 rounded-full border border-line-strong px-8 py-3.5 text-sm font-bold text-fg transition-colors hover:bg-surface-2"
          >
            View All Projects
            <Icon
              name="arrowUpRight"
              size={14}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </Container>
    </section>
  );
}
