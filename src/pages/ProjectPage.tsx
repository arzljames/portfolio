import { Link, useParams } from "react-router";
import { Icon } from "../components/Icon";
import { ProjectVisual, StatusBadge } from "../components/ProjectVisual";
import { Reveal } from "../components/Reveal";
import { Container, Eyebrow, Tag } from "../components/SectionHeading";
import { projects } from "../data/content";
import { NotFoundPage } from "./NotFoundPage";
import { BackLink } from "./ProjectsPage";

export function ProjectPage() {
  const { slug } = useParams();
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return <NotFoundPage />;

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <main className="min-h-svh bg-grid pt-16 pb-32">
      <Container>
        <BackLink to="/projects">All Projects</BackLink>

        <Reveal className="mt-20">
          <Eyebrow>
            {project.category} · {project.year}
          </Eyebrow>
          <h1 className="mt-6 font-display text-5xl leading-[0.95] font-extrabold tracking-[-0.03em] text-fg sm:text-7xl">
            {project.title}
            <span className="text-accent">.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-line bg-surface-2 sm:aspect-[16/7]">
            <ProjectVisual project={project} />
            <div className="absolute top-4 left-4">
              <StatusBadge status={project.status} />
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[2fr_1fr]">
          <Reveal className="space-y-5 text-[17px] leading-relaxed text-muted">
            <p className="text-xl leading-relaxed text-fg">{project.summary}</p>
            {project.description.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="space-y-8">
              <div>
                <dt className="text-xs font-bold tracking-[0.2em] text-muted uppercase">Stack</dt>
                <dd className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </dd>
              </div>
              {(project.liveUrl || project.repoUrl) && (
                <div>
                  <dt className="text-xs font-bold tracking-[0.2em] text-muted uppercase">Links</dt>
                  <dd className="mt-3 flex flex-wrap gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-white hover:brightness-110"
                      >
                        Visit site <Icon name="arrowUpRight" size={14} />
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-bold text-fg hover:bg-surface-2"
                      >
                        Source <Icon name="arrowUpRight" size={14} />
                      </a>
                    )}
                  </dd>
                </div>
              )}
            </dl>
          </Reveal>
        </div>

        {next.slug !== project.slug && (
          <Link
            to={`/projects/${next.slug}`}
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
