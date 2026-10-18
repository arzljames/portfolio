import { Link } from "react-router";
import { sortedProjects } from "../data/content";
import { Icon } from "./Icon";
import { FeaturedProject, HomeProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";
import { Container, SectionHeading } from "./SectionHeading";

export function Projects() {
  // The first project (by sort) leads, the next two sit side by side below it.
  const [lead, ...rest] = sortedProjects;

  return (
    <section id="projects" className="py-28 sm:py-36">
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading index="03" eyebrow="Selected work">
            Featured work.
          </SectionHeading>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-[17px] leading-relaxed text-muted lg:pb-2">
              A curated selection — full stack, internal tools, backend and mobile.
            </p>
          </Reveal>
        </div>

        {lead && (
          <Reveal className="mt-14">
            <FeaturedProject project={lead} />
          </Reveal>
        )}

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {rest.slice(0, 2).map((project, i) => (
            <Reveal key={project.id} delay={i * 0.08} className="h-full">
              <HomeProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 rounded-full border border-line-strong px-7 py-3.5 text-[15px] font-bold text-fg transition-colors hover:bg-surface-2"
          >
            View all {sortedProjects.length} projects
            <Icon name="arrowRight" size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
