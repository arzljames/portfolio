import { experience } from "../data/content";
import { Reveal } from "./Reveal";
import { Container, SectionHeading, Tag } from "./SectionHeading";

export function Experience() {
  return (
    <section id="experience" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Experience"
          lead={
            <>
              Where I've
              <br />
            </>
          }
          accent="worked."
        />

        <ol className="mt-16">
          {experience.map((job, i) => (
            <li key={`${job.company}-${job.role}`}>
              <Reveal delay={i * 0.05}>
                <article
                  className={`grid gap-4 rounded-2xl p-6 transition-colors sm:grid-cols-[3.5rem_1fr_auto] sm:p-8 ${
                    job.current
                      ? "border border-line border-l-2 border-l-accent bg-gradient-to-r from-accent/[0.06] to-surface"
                      : "border-t border-line hover:bg-surface/60"
                  } ${i > 0 ? "mt-2" : ""}`}
                >
                  <span
                    className={`pt-1.5 font-mono text-xs font-semibold ${
                      job.current ? "text-accent" : "text-faint"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="max-w-2xl">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-display text-xl font-extrabold tracking-[-0.03em] text-fg sm:text-2xl">
                        {job.role}
                      </h3>
                      {job.current && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent-soft px-2.5 py-0.5 text-xs font-semibold text-accent">
                          <span className="size-1.5 rounded-full bg-accent" />
                          Current
                        </span>
                      )}
                    </div>
                    <p className="mt-2 flex items-center gap-2 font-semibold text-accent">
                      {job.logo ? (
                        <img
                          src={job.logo}
                          alt=""
                          className="size-6 shrink-0 object-contain"
                        />
                      ) : (
                        <span
                          className="grid size-6 shrink-0 place-items-center rounded-md bg-surface text-[11px] font-bold text-muted"
                          aria-hidden="true"
                        >
                          {job.company[0]}
                        </span>
                      )}
                      {job.company}
                    </p>
                    <p className="mt-0.5 text-xs text-faint">{job.location}</p>
                    <p className="mt-4 text-[15px] leading-relaxed text-muted">
                      {job.description}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {job.tags.map((tag) => (
                        <li key={tag}>
                          <Tag>{tag}</Tag>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p
                    className={`h-fit w-fit rounded-full border px-3 py-1 text-xs font-semibold whitespace-nowrap sm:order-none ${
                      job.current
                        ? "border-accent/40 bg-accent-soft text-accent"
                        : "border-line-strong text-muted"
                    } -order-1 sm:col-start-3`}
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
