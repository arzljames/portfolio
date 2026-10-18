import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { useState, type ReactNode } from "react";
import { Link, useParams } from "react-router";
import { Icon } from "../components/Icon";
import { Highlights, Notice, ProjectActions, ProjectEyebrow } from "../components/ProjectCard";
import { Reveal } from "../components/Reveal";
import { Container, DotList, headingClass, SectionHeading } from "../components/SectionHeading";
import {
  categoryTypes,
  sortedProjects,
  statusLabels,
  type Project,
} from "../data/content";
import { NotFoundPage } from "./NotFoundPage";

const pad = (n: number) => String(n).padStart(2, "0");
const cardClass = "rounded-[28px] border border-line bg-surface";

/** Role shown when a project doesn't set its own. */
const defaultRole = "Solo design & build";

function Breadcrumb({ title }: { title: string }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-3 text-sm">
      <Link
        to="/projects"
        className="group inline-flex items-center gap-2 font-medium text-muted transition-colors hover:text-fg"
      >
        <Icon name="arrowLeft" size={15} className="transition-transform group-hover:-translate-x-0.5" />
        All projects
      </Link>
      <span className="text-faint" aria-hidden="true">
        /
      </span>
      <span className="font-semibold text-fg" aria-current="page">
        {title}
      </span>
    </nav>
  );
}

function InfoRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[5.5rem_1fr] items-baseline gap-4 border-b border-line py-4 first:pt-0">
      <dt className="text-muted">{label}</dt>
      <dd className="font-semibold text-fg">{children}</dd>
    </div>
  );
}

/** Status, type, role, stack and links. */
function InfoCard({ project }: { project: Project }) {
  return (
    <div className={`p-6 sm:p-7 ${cardClass}`}>
      <dl>
        <InfoRow label="Status">
          <span className="flex items-center gap-2.5">
            <span
              className={`size-2 rounded-full ${project.status === "live" ? "bg-success" : "bg-faint"}`}
              aria-hidden="true"
            />
            {statusLabels[project.status]}
          </span>
        </InfoRow>
        <InfoRow label="Type">{project.type ?? categoryTypes[project.category]}</InfoRow>
        <InfoRow label="Role">{project.role ?? defaultRole}</InfoRow>
        {project.meta?.map((item) => (
          <InfoRow key={item.label} label={item.label}>
            {item.value}
          </InfoRow>
        ))}
        <InfoRow label="Stack">
          <DotList items={project.stack} className="text-sm font-normal text-fg/85" />
        </InfoRow>
      </dl>
      <div className="mt-6">
        <ProjectActions project={project} demoFirst />
      </div>
    </div>
  );
}

const pillButton = "grid size-11 place-items-center rounded-full border border-line-strong text-fg transition-colors hover:bg-surface-2";

/** Screenshot gallery with tabs, prev/next buttons and a caption. */
function Gallery({ project }: { project: Project }) {
  const [index, setIndex] = useState(0);
  const { images } = project;
  const image = images[index];
  const many = images.length > 1;
  const go = (step: number) => setIndex((i) => (i + step + images.length) % images.length);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 60) go(info.offset.x < 0 ? 1 : -1);
  };

  return (
    <section aria-label={`${project.title} screenshots`} className={`p-3 sm:p-5 ${cardClass}`}>
      <div className="flex items-center justify-between gap-4 pb-4 sm:pb-5">
        <div className="-mx-1 flex min-w-0 gap-1 overflow-x-auto px-1">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-pressed={i === index}
              className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors ${
                i === index ? "bg-fg text-bg" : "text-muted hover:text-fg"
              }`}
            >
              {img.caption}
            </button>
          ))}
        </div>
        {many && (
          <div className="flex shrink-0 items-center gap-3">
            <span className="hidden font-mono text-xs text-muted sm:inline">
              {index + 1} / {images.length}
            </span>
            <button type="button" onClick={() => go(-1)} aria-label="Previous image" className={pillButton}>
              <Icon name="arrowLeft" size={16} />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next image" className={pillButton}>
              <Icon name="arrowRight" size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Images share one grid cell, so they crossfade without the frame jumping. */}
      <div className="relative grid overflow-hidden rounded-2xl bg-surface-2">
        <AnimatePresence initial={false}>
          <motion.img
            key={image.src}
            src={image.src}
            alt={`${project.title} — ${image.alt}`}
            draggable={false}
            className="col-start-1 row-start-1 block h-auto w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            drag={many ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={onDragEnd}
          />
        </AnimatePresence>
        {image.concept && (
          <span className="absolute top-4 right-4 rounded-full border border-white/10 bg-black/70 px-3 py-1.5 font-mono text-xs text-white backdrop-blur-md">
            Concept visual
          </span>
        )}
      </div>

      {image.description && (
        <p className="px-2 pt-4 pb-1 text-[15px] text-muted" aria-live="polite">
          {image.description}
        </p>
      )}
    </section>
  );
}

/** Feature rows with the image alternating sides, or the highlights when there are none. */
function WhatItDoes({ project }: { project: Project }) {
  if (project.features) {
    return (
      <section className="mt-28 sm:mt-36">
        <SectionHeading eyebrow="What it does">
          {project.features.heading.split("\n").map((line, i) => (
            <span key={line} className="block">
              {i > 0 && " "}
              {line}
            </span>
          ))}
        </SectionHeading>
        <div className="mt-14 space-y-5">
          {project.features.items.map((feature, i) => (
            <Reveal key={feature.title}>
              <article className={`grid overflow-hidden lg:grid-cols-2 ${cardClass}`}>
                <div
                  className={`flex flex-col justify-center px-7 py-9 sm:px-11 ${i % 2 ? "lg:order-last" : ""}`}
                >
                  <span className="font-mono text-xs text-accent">{pad(i + 1)}</span>
                  <h3 className="mt-4 font-display text-3xl font-extrabold tracking-[-0.04em] text-fg">
                    {feature.title}
                  </h3>
                  <p className="mt-4 max-w-md text-[17px] leading-relaxed text-fg/80">
                    {feature.description}
                  </p>
                </div>
                <div className="p-3 sm:p-4">
                  <img
                    src={feature.image.src}
                    alt={`${project.title} — ${feature.image.alt}`}
                    loading="lazy"
                    className="block h-auto w-full rounded-2xl bg-surface-2"
                  />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    );
  }

  if (!project.highlights) return null;
  return (
    <section className="mt-28 sm:mt-36">
      <Reveal>
        <p className="font-mono text-xs tracking-[0.12em] text-accent uppercase">What it does</p>
        <div className={`mt-8 p-7 sm:p-10 ${cardClass}`}>
          <Highlights items={project.highlights} />
        </div>
      </Reveal>
    </section>
  );
}

function UnderTheHood({ project }: { project: Project }) {
  if (!project.architecture) return null;
  return (
    <section className="mt-28 sm:mt-36">
      <SectionHeading eyebrow="Under the hood">{project.architecture.heading}</SectionHeading>
      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {project.architecture.parts.map((part, i) => (
          <Reveal key={part.title} delay={i * 0.06} className="h-full">
            <article className="h-full rounded-[22px] border border-line bg-surface p-7">
              <p className="font-mono text-xs tracking-[0.12em] text-muted uppercase">{part.label}</p>
              <h3 className="mt-5 font-display text-2xl font-extrabold tracking-[-0.04em] text-fg">
                {part.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-fg/80">{part.description}</p>
              {part.repo && (
                <a
                  href={part.repo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-1 font-semibold text-fg underline underline-offset-4 transition-colors hover:text-accent"
                >
                  {part.repo.label} <Icon name="arrowUpRight" size={14} />
                </a>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function NextProject({ project }: { project: Project }) {
  const image = project.images[0];
  return (
    <Reveal className="mt-28 sm:mt-36">
      <Link
        to={`/projects/${project.id}`}
        data-cursor="Next"
        className={`group grid overflow-hidden transition-colors hover:border-line-strong lg:grid-cols-2 ${cardClass}`}
      >
        <div className="flex flex-col justify-center px-7 py-10 sm:px-12">
          <ProjectEyebrow project={project} lead={`Next project · ${pad(project.sort)}`} className="text-muted" />
          <p className={`mt-6 text-5xl sm:text-6xl ${headingClass} transition-colors group-hover:text-accent`}>
            {project.title}
          </p>
          <Icon
            name="arrowRight"
            size={32}
            className="mt-8 text-muted transition-all group-hover:translate-x-1 group-hover:text-accent"
          />
        </div>
        <div className="p-3 sm:p-4">
          <img
            src={image.src}
            alt={`${project.title} — ${image.alt}`}
            loading="lazy"
            className="block h-auto w-full rounded-2xl bg-surface-2"
          />
        </div>
      </Link>
    </Reveal>
  );
}

export function ProjectPage() {
  const { slug } = useParams();
  const index = sortedProjects.findIndex((p) => p.id === slug);
  if (index === -1) return <NotFoundPage />;

  const project = sortedProjects[index];
  const next = sortedProjects[(index + 1) % sortedProjects.length];
  const longTitle = project.title.length > 12;

  return (
    <main className="pt-36 pb-28 sm:pt-40">
      <Container>
        <Breadcrumb title={project.title} />

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1fr_minmax(0,560px)] lg:gap-10">
          <Reveal>
            <ProjectEyebrow project={project} suffix={project.sort === 1 ? "Featured" : undefined} />
            <h1
              className={`mt-6 ${headingClass} ${
                longTitle ? "text-[clamp(3rem,6.5vw,6rem)]" : "text-[clamp(4rem,10vw,9rem)] leading-[0.85]"
              }`}
            >
              {project.title}
              <span className="text-accent">.</span>
            </h1>
            <div className="mt-8 max-w-xl space-y-4 text-xl leading-relaxed text-fg/85">
              {project.description.split(/\n\s*\n/).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            {project.notice && (
              <div className="mt-6 max-w-xl">
                <Notice>{project.notice}</Notice>
              </div>
            )}
          </Reveal>

          <Reveal delay={0.1}>
            <InfoCard project={project} />
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mt-16">
          <Gallery project={project} />
        </Reveal>

        <WhatItDoes project={project} />
        <UnderTheHood project={project} />

        {next.id !== project.id && <NextProject project={next} />}
      </Container>
    </main>
  );
}
