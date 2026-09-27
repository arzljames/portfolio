import { profile } from "../data/content";
import { Icon } from "./Icon";
import { Logo } from "./Navbar";
import { Container } from "./SectionHeading";

export function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <Container className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <Logo />
        <p className="text-xs font-semibold tracking-[0.2em] text-muted uppercase">
          © {new Date().getFullYear()} {profile.name} · Crafted with care
        </p>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-1.5 text-xs font-semibold tracking-[0.2em] text-muted uppercase transition-colors hover:text-fg"
        >
          Back to top <Icon name="arrowUp" size={13} />
        </button>
      </Container>
    </footer>
  );
}
