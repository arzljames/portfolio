import { useEffect, useState } from "react";
import { profile } from "../data/content";
import { useLocalTime } from "../hooks/useLocalTime";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { Container, Eyebrow, headingClass } from "./SectionHeading";

function Label({ children }: { children: string }) {
  return <h3 className="font-mono text-xs tracking-[0.12em] text-muted uppercase">{children}</h3>;
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
    } catch {
      // Clipboard access can be denied; the email link still works.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="rounded-full border border-line-strong px-4 py-2.5 font-mono text-xs font-semibold text-fg transition-colors hover:bg-surface-2"
    >
      <span aria-live="polite">{copied ? "Copied!" : "Copy email"}</span>
    </button>
  );
}

export function Contact() {
  const time = useLocalTime(profile.timeZone);

  return (
    <section id="contact" className="pt-10 pb-24 sm:pb-32">
      <Container>
        <Reveal>
          <div className="rounded-[32px] border border-line bg-surface px-6 py-14 sm:px-12 sm:py-20 lg:px-[4.5rem]">
            <Eyebrow index="04">Contact</Eyebrow>
            <h2 className={`mt-8 text-[clamp(3.25rem,8vw,6.5rem)] ${headingClass}`}>
              Let's build
              <br />
              something <span className="text-accent">great.</span>
            </h2>

            <div className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-4">
              <a
                href={`mailto:${profile.email}`}
                className="font-display text-[clamp(1.75rem,4.5vw,3rem)] leading-tight font-extrabold tracking-[-0.04em] break-all text-fg underline decoration-accent decoration-2 underline-offset-[0.2em] transition-colors hover:text-accent"
              >
                {profile.email}
              </a>
              <CopyEmail />
            </div>

            <div className="mt-14 grid gap-10 border-t border-line pt-10 md:grid-cols-3">
              <div>
                <Label>Based in</Label>
                <p className="mt-4 font-semibold text-fg">{profile.location}</p>
                <p className="mt-1 text-muted">
                  {time} local · {profile.utcOffset}
                </p>
              </div>
              <div>
                <Label>Response time</Label>
                <p className="mt-4 font-semibold text-fg">{profile.responseTime.value}</p>
                <p className="mt-1 text-muted">{profile.responseTime.detail}</p>
              </div>
              <div>
                <Label>Follow me</Label>
                <ul className="mt-4 flex flex-wrap gap-6">
                  {profile.socials.map((social) => (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-fg underline underline-offset-4 transition-colors hover:text-accent"
                      >
                        {social.label}
                        <Icon name="arrowUpRight" size={14} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
