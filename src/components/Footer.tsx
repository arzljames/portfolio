import { Link, useLocation } from "react-router";
import { profile } from "../data/content";
import { Container } from "./SectionHeading";

const linkClass = "text-sm text-muted underline underline-offset-4 transition-colors hover:text-fg";

export function Footer() {
  const { pathname } = useLocation();
  const onHome = pathname === "/";
  const onProject = pathname.startsWith("/projects/");

  return (
    <footer className="pb-10">
      <Container>
        <div className="flex items-center justify-between gap-4 border-t border-line pt-8">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} {profile.name}
          </p>
          {onHome ? (
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className={linkClass}
            >
              Back to top ↑
            </button>
          ) : onProject ? (
            <div className="flex flex-wrap justify-end gap-x-6 gap-y-2">
              <Link to="/projects" className={linkClass}>
                All projects
              </Link>
              <a href={`mailto:${profile.email}`} className={linkClass}>
                {profile.email}
              </a>
            </div>
          ) : (
            <Link to="/" className={linkClass}>
              Home
            </Link>
          )}
        </div>
      </Container>
    </footer>
  );
}
