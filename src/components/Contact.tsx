import { profile } from "../data/content";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { Container, SectionHeading } from "./SectionHeading";

function Label({ children }: { children: string }) {
  return (
    <h3 className="text-xs font-bold tracking-[0.2em] text-muted uppercase">{children}</h3>
  );
}

export function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Contact"
          lead={
            <>
              Let's build
              <br />
              something
            </>
          }
          accent="great."
        />

        <Reveal delay={0.1} className="mt-16">
          <a
            href={`mailto:${profile.email}`}
            className="group inline-flex items-center gap-4 font-display text-[clamp(2rem,6.5vw,4.25rem)] leading-none font-extrabold tracking-[-0.035em] break-all text-fg transition-colors hover:text-accent"
          >
            {profile.email}
            <Icon
              name="arrowUpRight"
              size={36}
              className="shrink-0 text-muted transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
            />
          </a>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-16 grid gap-12 border-t border-line pt-12 md:grid-cols-3">
            <div>
              <Label>Based in</Label>
              <p className="mt-5 flex items-center gap-2 font-semibold text-fg">
                <Icon name="mapPin" size={16} className="text-accent" />
                {profile.location}
              </p>
              {profile.available && (
                <p className="mt-4 flex items-center gap-2 text-sm text-muted">
                  <span className="size-2 rounded-full bg-success" />
                  Available for new projects
                </p>
              )}
            </div>

            <div>
              <Label>Response time</Label>
              <p className="mt-4 font-display text-4xl font-black tracking-[-0.05em] text-fg">
                {profile.responseTime}
              </p>
              <p className="mt-3 text-sm text-muted">Average reply time on weekdays</p>
            </div>

            <div>
              <Label>Follow me</Label>
              <ul className="mt-3">
                {profile.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between border-b border-line py-3.5 text-sm font-bold text-fg transition-colors hover:text-accent"
                    >
                      {social.label}
                      <Icon
                        name="arrowUpRight"
                        size={14}
                        className="text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
