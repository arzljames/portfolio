import { Link, useParams } from "react-router";
import { Icon } from "../components/Icon";
import {
  Highlights,
  MetaGrid,
  Notice,
  ProjectActions,
  ProjectEyebrow,
  ProjectGallery,
  StackList,
} from "../components/ProjectCard";
import { Reveal } from "../components/Reveal";
import { Container } from "../components/SectionHeading";
import { sortedProjects } from "../data/content";
import { NotFoundPage } from "./NotFoundPage";
import { BackLink } from "./ProjectsPage";

export function ProjectPage() {
  const { slug } = useParams();
  const index = sortedProjects.findIndex((p) => p.id === slug);
  if (index === -1) return <NotFoundPage />;

  const project = sortedProjects[index];
  const next = sortedProjects[(index + 1) % sortedProjects.length];
  const [lead, ...rest] = project.description.split(/\n\s*\n/);

  return (
    <main className="min-h-svh bg-grid pt-16 pb-32">
      <Container>
        <BackLink to="/projects">All Projects</BackLink>

        <Reveal className="mt-20">
          <ProjectEyebrow project={project} />
          <h1 className="mt-6 font-display text-5xl leading-[0.95] font-extrabold tracking-[-0.03em] text-fg sm:text-7xl">
            {project.title}
            <span className="text-accent">.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <ProjectGallery
            project={project}
            className="aspect-[16/10] rounded-3xl border border-line sm:aspect-[16/8]"
          />
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[2fr_1fr]">
          <Reveal className="space-y-6 text-[17px] leading-relaxed text-muted">
            <p className="text-xl leading-relaxed text-fg">{lead}</p>
            {rest.map((p) => (
              <p key={p}>{p}</p>
            ))}
            {project.highlights && <Highlights items={project.highlights} />}
            {project.notice && <Notice>{project.notice}</Notice>}
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-8">
              {project.meta && <MetaGrid items={project.meta} />}
              <div>
                <p className="text-xs font-bold tracking-[0.2em] text-muted uppercase">Stack</p>
                <div className="mt-3">
                  <StackList stack={project.stack} />
                </div>
              </div>
              <ProjectActions project={project} />
            </div>
          </Reveal>
        </div>

        {next.id !== project.id && (
          <Link
            to={`/projects/${next.id}`}
            className="group mt-24 flex items-center justify-between gap-6 border-t border-line pt-10"
          >
            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-muted uppercase">Next project</p>
              <p className="mt-2 font-display text-3xl font-extrabold tracking-[-0.03em] text-fg transition-colors group-hover:text-accent sm:text-5xl">
                {next.title}
              </p>
            </div>
            <Icon
              name="arrowRight"
              size={32}
              className="shrink-0 text-muted transition-all group-hover:translate-x-1 group-hover:text-accent"
            />
          </Link>
        )}
      </Container>
    </main>
  );
}
