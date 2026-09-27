import { motion } from "framer-motion";
import { Link } from "react-router";
import { profile } from "../data/content";
import { Container } from "./SectionHeading";
import { Icon } from "./Icon";

const ease = [0.22, 1, 0.36, 1] as const;

function Portrait() {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 30, rotate: 2 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.9, delay: 0.35, ease }}
      className="relative w-56 shrink-0 sm:w-60 lg:w-72 xl:w-80"
    >
      {/* Stacked card behind the portrait */}
      <div
        className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border border-line bg-surface-2"
        aria-hidden="true"
      />
      <div className="relative overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-2xl shadow-black/40">
        {profile.portrait ? (
          <img
            src={profile.portrait}
            alt={profile.name}
            className="aspect-[7/8] w-full object-cover object-top grayscale transition-[filter] duration-500 hover:grayscale-0"
          />
        ) : (
          <div className="grid aspect-[7/8] w-full place-items-center bg-[radial-gradient(circle_at_50%_35%,var(--accent-soft),transparent_60%),linear-gradient(160deg,var(--surface-2),var(--surface))]">
            <span className="font-display text-7xl font-black tracking-[-0.06em] text-fg/80">
              {profile.name
                .split(" ")
                .map((w) => w[0])
                .join("")}
            </span>
          </div>
        )}
        <figcaption className="truncate border-t border-line px-4 py-3 text-xs font-semibold text-fg">
          {profile.role}
          {profile.available && " · Available for work"}
        </figcaption>
      </div>
    </motion.figure>
  );
}

export function Hero() {
  return (
    <section className="relative flex min-h-svh flex-col bg-grid pt-16">
      <Container className="relative flex flex-1 flex-col">
        {/* Vertical guide lines */}
        <div
          className="pointer-events-none absolute inset-y-0 left-4 w-px bg-line sm:left-[calc(2rem+5rem)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-[21rem] hidden w-px bg-line lg:block xl:right-[25rem]"
          aria-hidden="true"
        />

        <div className="flex flex-1 items-center gap-10 py-16 lg:py-24">
          {/* Rotated discipline label */}
          <p className="hidden w-20 shrink-0 justify-center self-center text-[11px] font-semibold tracking-[0.3em] text-faint uppercase sm:flex [writing-mode:vertical-rl] rotate-180">
            {profile.disciplines.join(" · ")}
          </p>

          <div className="min-w-0 flex-1 pl-4 sm:pl-2">
            {profile.available && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-muted uppercase"
              >
                <span className="relative flex size-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-success/60 motion-reduce:hidden" />
                  <span className="relative size-2 rounded-full bg-success" />
                </span>
                Available for work
              </motion.p>
            )}

            <h1 className="mt-6 font-display text-[clamp(3.75rem,13vw,9.5rem)] leading-[0.9] font-black tracking-[-0.035em] text-fg">
              {profile.name.split(" ").map((word, i) => (
                <span key={word} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <motion.span
                    className="inline-block"
                    initial={{ y: "105%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, delay: 0.1 + i * 0.1, ease }}
                  >
                    {word}
                  </motion.span>
                  {i < profile.name.split(" ").length - 1 && " "}
                </span>
              ))}
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <Link
                to="/#projects"
                className="rounded-full border border-line-strong px-7 py-3 text-sm font-bold text-fg transition-colors hover:bg-surface-2"
              >
                View Work
              </Link>
              <Link
                to="/#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-bold text-white transition hover:brightness-110"
              >
                Let's Talk
                <Icon
                  name="arrowRight"
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </motion.div>
          </div>

          <div className="hidden w-80 shrink-0 justify-center lg:flex xl:w-96">
            <Portrait />
          </div>
        </div>

        <div className="flex items-center justify-between gap-6 border-t border-line py-6">
          <p className="font-display text-lg font-extrabold tracking-[-0.03em] text-fg sm:text-2xl">
            {profile.tagline}
          </p>
          <a
            href="#about"
            className="hidden shrink-0 items-center gap-1 text-sm text-muted transition-colors hover:text-fg sm:flex"
          >
            Scroll <Icon name="arrowDown" size={14} />
          </a>
        </div>
      </Container>
    </section>
  );
}
