import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router";
import { Icon } from "../components/Icon";
import { ProjectCard } from "../components/Projects";
import { Reveal } from "../components/Reveal";
import { Container, SectionHeading } from "../components/SectionHeading";
import { projects, type ProjectCategory } from "../data/content";

const filters = ["All", "Frontend", "Fullstack", "Backend"] as const;
type Filter = (typeof filters)[number];

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
  const [filter, setFilter] = useState<Filter>("All");
  const visible =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category === (filter as ProjectCategory));

  return (
    <main className="min-h-svh bg-grid pt-16 pb-32">
      <Container>
        <BackLink to="/">Back to Home</BackLink>

        <div className="mt-20">
          <SectionHeading
            as="h1"
            eyebrow="All projects"
            lead={
              <>
                Things I've
                <br />
              </>
            }
            accent="built."
          />
          <Reveal delay={0.1}>
            <p className="mt-10 max-w-md text-[17px] leading-relaxed text-muted">
              A full list of personal, freelance, and professional projects —
              frontend, fullstack, and backend.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                filter === f
                  ? "bg-accent text-white"
                  : "border border-line-strong bg-surface/60 text-muted hover:text-fg"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.ul layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project) => (
              <motion.li
                key={project.slug}
                layout
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

        {visible.length === 0 && (
          <p className="mt-12 text-muted">No {filter.toLowerCase()} projects yet.</p>
        )}
      </Container>
    </main>
  );
}
