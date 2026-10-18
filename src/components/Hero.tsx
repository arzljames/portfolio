import { motion } from "framer-motion";
import { Link } from "react-router";
import { profile, stats } from "../data/content";
import { useLocalTime } from "../hooks/useLocalTime";
import { Icon } from "./Icon";
import { Container, headingClass } from "./SectionHeading";

const ease = [0.22, 1, 0.36, 1] as const;

function Portrait() {
  const time = useLocalTime(profile.timeZone);

  return (
    <motion.figure
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.3, ease }}
      className="relative overflow-hidden rounded-[28px] border border-line-strong bg-surface-2 shadow-2xl shadow-black/40"
    >
      {profile.portrait ? (
        <img
          src={profile.portrait}
          alt={profile.name}
          className="aspect-[4/5] w-full object-cover object-top grayscale transition-[filter] duration-700 hover:grayscale-0"
        />
      ) : (
        <div className="grid aspect-[4/5] w-full place-items-center bg-[radial-gradient(circle_at_50%_35%,var(--accent-soft),transparent_60%)]">
          <span className="font-display text-8xl font-black tracking-[-0.06em] text-fg/80">
            {profile.name
              .split(" ")
              .map((w) => w[0])
              .join("")}
          </span>
        </div>
      )}
      <figcaption className="absolute inset-x-3.5 bottom-3.5 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/65 px-4 py-3 backdrop-blur-md">
        <span className="truncate text-sm font-bold text-white">{profile.role}</span>
        <span className="shrink-0 font-mono text-xs text-white/60">
          {profile.city} · <span className="text-white/85">{time}</span>
        </span>
      </figcaption>
    </motion.figure>
  );
}

export function Hero() {
  return (
    <section className="relative bg-grid pt-36 sm:pt-44">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_440px] lg:gap-10">
          <div>
            {profile.available && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-2.5 font-mono text-xs tracking-[0.12em] text-muted uppercase"
              >
                <span className="relative flex size-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-success/60 motion-reduce:hidden" />
                  <span className="relative size-2 rounded-full bg-success" />
                </span>
                Available for work
              </motion.p>
            )}

            <h1 className={`mt-8 text-[clamp(4.5rem,13vw,10rem)] leading-[0.88] ${headingClass}`}>
              {profile.name.split(" ").map((word, i) => (
                <span key={word} className="block overflow-hidden pb-[0.06em]">
                  <motion.span
                    className="block"
                    initial={{ y: "105%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, delay: 0.1 + i * 0.1, ease }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease }}
            >
              <p className="mt-10 max-w-xl font-display text-[clamp(1.5rem,2.6vw,2rem)] leading-tight font-bold tracking-[-0.03em] text-fg">
                {profile.headline[0]} <span className="text-muted">{profile.headline[1]}</span>
              </p>
              <p className="mt-6 max-w-[34rem] text-[17px] leading-relaxed text-muted">
                {profile.intro}
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  to="/#contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-[15px] font-bold text-on-accent transition hover:brightness-110"
                >
                  Let's talk
                  <Icon name="arrowRight" size={15} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/#projects"
                  className="rounded-full border border-line-strong px-7 py-3.5 text-[15px] font-bold text-fg transition-colors hover:bg-surface-2"
                >
                  View work
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="mx-auto w-full max-w-[440px]">
            <Portrait />
          </div>
        </div>

        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 grid grid-cols-2 gap-y-8 border-y border-line py-8 md:grid-cols-4"
        >
          {stats.map((stat) => (
            <div key={stat.value} className="flex flex-col-reverse gap-1.5 pr-4">
              <dt className="text-sm text-muted">{stat.label}</dt>
              <dd className="font-display text-3xl font-extrabold tracking-[-0.04em] text-fg sm:text-4xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </Container>
    </section>
  );
}
