import { Link } from "react-router";
import { Icon } from "./Icon";
import { sortedProjects } from "../data/content";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";
import { Container, SectionHeading } from "./SectionHeading";

export function Projects() {
  // The first project (by sort) leads, the next two sit side by side below it.
  const [lead, ...rest] = sortedProjects;

  return (
    <section id="projects" className="py-24 sm:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="Selected work" lead="Featured" accent="work." />
          <Reveal delay={0.1}>
            <p className="max-w-xs text-[15px] leading-relaxed text-muted">
              A curated selection — full stack, internal tools, backend and mobile.
            </p>
          </Reveal>
        </div>

        {lead && (
          <Reveal className="mt-14">
            <ProjectCard project={{ ...lead, wide: true }} />
          </Reveal>
        )}

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {rest.slice(0, 2).map((project, i) => (
            <Reveal key={project.id} delay={i * 0.08} className="h-full">
              <ProjectCard project={{ ...project, wide: false }} />
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
