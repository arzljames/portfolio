import { about } from "../data/content";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { Container, SectionHeading } from "./SectionHeading";

export function About() {
  return (
    <section id="about" className="relative overflow-hidden py-24 sm:py-32">
      <div
        className="pointer-events-none absolute -right-40 bottom-24 size-[32rem] rounded-full bg-accent/10 blur-[140px]"
        aria-hidden="true"
      />
      <Container className="relative grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="About me"
            lead={
              <>
                Building for the
                <br />
                web, front to
              </>
            }
            accent="back."
          />

          <Reveal delay={0.1} className="mt-10 space-y-5 text-[17px] leading-relaxed text-muted">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>

          <Reveal delay={0.15}>
            <dl className="mt-10 grid grid-cols-2 gap-y-8 border-t border-line pt-8 sm:grid-cols-4">
              {about.stats.map((stat) => (
                <div key={stat.value} className="flex flex-col-reverse gap-1">
                  <dt className="text-xs font-semibold tracking-[0.2em] text-muted uppercase">
                    {stat.label}
                  </dt>
                  <dd className="font-display text-4xl font-black tracking-[-0.05em] text-fg">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <ol className="flex flex-col gap-4 lg:pt-20">
          {about.services.map((service, i) => (
            <li key={service.title}>
              <Reveal delay={i * 0.06}>
                <article className="group flex gap-5 rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-line-strong hover:bg-surface-2">
                  <span className="pt-1 font-mono text-xs font-semibold text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-bold tracking-[-0.02em] text-fg">
                      {service.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {service.description}
                    </p>
                  </div>
                  <Icon
                    name={service.icon}
                    size={20}
                    className="shrink-0 text-accent transition-transform duration-300 group-hover:scale-110"
                  />
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
