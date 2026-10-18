import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router";
import { Icon } from "../components/Icon";
import { ProjectCard } from "../components/ProjectCard";
import { Reveal } from "../components/Reveal";
import { Container, SectionHeading } from "../components/SectionHeading";
import { profile, sortedProjects, type ProjectCategory } from "../data/content";

const filters: { value: ProjectCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "fullstack", label: "Full stack" },
  { value: "internal", label: "Internal tools" },
  { value: "backend", label: "Backend / API" },
  { value: "mobile", label: "Mobile" },
];

const github = profile.socials.find((s) => s.label === "GitHub")?.href;

export function BackLink({ to, children }: { to: string; children: string }) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-fg"
    >
      <Icon
        name="arrowLeft"
        size={15}
        className="transition-transform group-hover:-translate-x-0.5"
      />
      {children}
    </Link>
  );
}

export function ProjectsPage() {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");
  const count = (value: ProjectCategory | "all") =>
    value === "all" ? sortedProjects.length : sortedProjects.filter((p) => p.category === value).length;
  const visible =
    filter === "all" ? sortedProjects : sortedProjects.filter((p) => p.category === filter);

  return (
    <main className="min-h-svh bg-grid pt-16 pb-32">
      <Container>
        <BackLink to="/">Back to Home</BackLink>

        <div className="mt-20">
          <SectionHeading as="h1" index="03" eyebrow="Selected work" lead="Things I've" accent="built." />
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-muted">
              Full-stack web apps, a mobile app for an indigenous language, and tools built for
              real people — from internal team hubs to online classrooms.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
          {filters
            .filter((f) => count(f.value) > 0)
            .map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setFilter(f.value)}
                aria-pressed={filter === f.value}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                  filter === f.value
                    ? "bg-accent text-white"
                    : "border border-line-strong bg-surface/60 text-fg hover:bg-surface-2"
                }`}
              >
                {f.label}
                <span
                  className={`ml-2 font-mono text-xs ${filter === f.value ? "text-white/75" : "text-faint"}`}
                >
                  {count(f.value)}
                </span>
              </button>
            ))}
        </div>

        <motion.ul layout className="mt-14 grid gap-6 lg:grid-cols-2">
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
          <Reveal className="mt-14">
            <div className="flex flex-col items-start justify-between gap-6 rounded-[28px] border border-dashed border-line-strong p-7 sm:flex-row sm:items-center sm:p-9">
              <div>
                <h2 className="font-display text-2xl font-extrabold tracking-[-0.03em] text-fg">
                  More experiments live on GitHub.
                </h2>
                <p className="mt-1.5 text-[15px] text-muted">
                  Side projects, practice repos and works in progress.
                </p>
              </div>
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex shrink-0 items-center gap-2.5 rounded-full bg-fg px-6 py-3.5 text-sm font-bold text-bg transition-opacity hover:opacity-90"
              >
                <Icon name="github" size={18} />
                {github.replace(/^https?:\/\//, "")}
              </a>
            </div>
          </Reveal>
        )}
      </Container>
    </main>
  );
}
