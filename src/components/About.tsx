import { about } from "../data/content";
import { Reveal } from "./Reveal";
import { Container, DotList, SectionHeading } from "./SectionHeading";

export function About() {
  return (
    <section id="about" className="py-28 sm:py-36">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionHeading index="01" eyebrow="About">
            Building for
            <br />
            the web,
            <br />
            front to back.
          </SectionHeading>

          <Reveal delay={0.1} className="space-y-6 text-lg leading-relaxed text-fg/80 lg:pt-10">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
        </div>

        <ol className="mt-16 grid gap-4 md:grid-cols-3">
          {about.services.map((service, i) => (
            <li key={service.title}>
              <Reveal delay={i * 0.06} className="h-full">
                <article className="flex h-full flex-col rounded-[22px] border border-line bg-surface p-7 transition-colors hover:border-line-strong">
                  <span className="font-mono text-xs text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold tracking-[-0.03em] text-fg">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">
                    {service.description}
                  </p>
                  <div className="mt-auto pt-6">
                    <DotList items={service.tags} className="border-t border-line pt-5 text-fg/85" />
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
