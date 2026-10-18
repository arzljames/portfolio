import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router";
import { Icon } from "../components/Icon";
import { ProjectCard } from "../components/ProjectCard";
import { Reveal } from "../components/Reveal";
import { Container, headingClass, SectionHeading } from "../components/SectionHeading";
import { profile, sortedProjects, type ProjectCategory } from "../data/content";

const filters: { value: ProjectCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "fullstack", label: "Full stack" },
  { value: "internal", label: "Internal tools" },
  { value: "backend", label: "Backend / API" },
  { value: "mobile", label: "Mobile" },
];

const social = (label: string) => profile.socials.find((s) => s.label === label)?.href;

export function BackLink({ to, children }: { to: string; children: string }) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-fg"
    >
      <Icon name="arrowLeft" size={15} className="transition-transform group-hover:-translate-x-0.5" />
      {children}
    </Link>
  );
}

/** Closing call to action for pages other than home. */
export function BuildItCta() {
  const linkedin = social("LinkedIn");
  return (
    <Reveal className="mt-28 text-center sm:mt-36">
      <h2 className={`text-[clamp(2.75rem,7vw,5.5rem)] ${headingClass}`}>
        Have something in
        <br />
        mind? <span className="text-accent">Let's build it.</span>
      </h2>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <a
          href={`mailto:${profile.email}`}
          className="rounded-full bg-accent px-6 py-3.5 text-[15px] font-bold text-on-accent transition hover:brightness-110"
        >
          {profile.email}
        </a>
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-6 py-3.5 text-[15px] font-bold text-fg transition-colors hover:bg-surface-2"
          >
            LinkedIn <Icon name="arrowUpRight" size={14} />
          </a>
        )}
      </div>
    </Reveal>
  );
}

export function ProjectsPage() {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");
  const count = (value: ProjectCategory | "all") =>
    value === "all" ? sortedProjects.length : sortedProjects.filter((p) => p.category === value).length;
  const visible =
    filter === "all" ? sortedProjects : sortedProjects.filter((p) => p.category === filter);
  const github = social("GitHub");

  return (
    <main className="pt-36 pb-28 sm:pt-40">
      <Container>
        <BackLink to="/">Back to home</BackLink>

        <div className="mt-14">
          <SectionHeading as="h1" index="03" eyebrow="All projects">
            Things I've built.
          </SectionHeading>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-muted">
              Full-stack web apps, a mobile app for an indigenous language, and tools built for real
              people — from internal team hubs to online classrooms.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 flex flex-wrap gap-2.5" role="group" aria-label="Filter projects">
          {filters
            .filter((f) => count(f.value) > 0)
            .map((f) => {
              const on = filter === f.value;
              return (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setFilter(f.value)}
                  aria-pressed={on}
                  className={`rounded-full px-5 py-3 text-sm font-bold transition-colors ${
                    on ? "bg-fg text-bg" : "border border-line-strong text-fg hover:bg-surface-2"
                  }`}
                >
                  {f.label}
                  <span className={`ml-2 font-mono text-xs font-normal ${on ? "text-bg/60" : "text-muted"}`}>
                    {count(f.value)}
                  </span>
                </button>
              );
            })}
        </div>

        <motion.ul layout className="mt-8 grid gap-5 lg:grid-cols-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project) => (
              <motion.li
                key={project.id}
                layout
                className={project.wide ? "lg:col-span-2" : ""}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectCard project={project} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {github && (
          <Reveal className="mt-5">
            <div className="flex flex-col items-start justify-between gap-6 rounded-[28px] border border-dashed border-line-strong px-7 py-9 sm:flex-row sm:items-center sm:px-11">
              <div>
                <h2 className="font-display text-2xl font-extrabold tracking-[-0.04em] text-fg sm:text-3xl">
                  More experiments live on GitHub.
                </h2>
                <p className="mt-2 text-muted">Side projects, practice repos and works in progress.</p>
              </div>
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line-strong px-6 py-3.5 text-[15px] font-bold text-fg transition-colors hover:bg-surface-2"
              >
                {github.replace(/^https?:\/\//, "")}
                <Icon name="arrowUpRight" size={14} />
              </a>
            </div>
          </Reveal>
        )}

        <BuildItCta />
      </Container>
    </main>
  );
}
