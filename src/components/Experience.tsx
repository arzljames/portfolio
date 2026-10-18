import { experience } from "../data/content";
import { Reveal } from "./Reveal";
import { Container, DotList, SectionHeading } from "./SectionHeading";

export function Experience() {
  return (
    <section id="experience" className="py-28 sm:py-36">
      <Container>
        <SectionHeading index="02" eyebrow="Experience">
          Where I've worked.
        </SectionHeading>

        <ol className="mt-14 border-t border-line">
          {experience.map((job, i) => (
            <li key={`${job.company}-${job.role}`}>
              <Reveal delay={i * 0.05}>
                <article
                  className={`grid grid-cols-[3rem_1fr] gap-x-5 rounded-b-2xl border-b border-line px-4 py-7 transition-colors sm:grid-cols-[3rem_1fr_auto] sm:px-5 ${
                    job.current ? "bg-surface" : "hover:bg-surface/50"
                  }`}
                >
                  <span className="grid size-12 place-items-center overflow-hidden rounded-xl border border-line bg-surface-2">
                    {job.logo ? (
                      <img src={job.logo} alt="" className="size-8 object-contain" />
                    ) : (
                      <span className="font-display text-lg font-bold text-muted" aria-hidden="true">
                        {job.company[0]}
                      </span>
                    )}
                  </span>

                  <div className="min-w-0 max-w-2xl">
                    <p className="mb-2 font-mono text-xs text-muted sm:hidden">{job.period}</p>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h3 className="font-display text-xl font-extrabold tracking-[-0.035em] text-fg sm:text-2xl">
                        {job.role}
                      </h3>
                      {job.current && (
                        <span className="flex items-center gap-1.5 font-mono text-xs text-accent">
                          <span className="size-1.5 rounded-full bg-accent" />
                          Current
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-[15px] text-muted">
                      <span className="font-semibold text-fg">{job.company}</span> · {job.location}
                    </p>
                    <p className="mt-4 text-[15px] leading-relaxed text-muted">{job.description}</p>
                    <DotList items={job.tags} className="mt-4 text-fg/85" />
                  </div>

                  <p
                    className={`hidden pt-2 font-mono text-xs whitespace-nowrap sm:block ${
                      job.current ? "text-fg" : "text-muted"
                    }`}
                  >
                    {job.period}
                  </p>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
