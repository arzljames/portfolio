import { Container } from "../components/SectionHeading";
import { BackLink } from "./ProjectsPage";

export function NotFoundPage() {
  return (
    <main className="grid min-h-svh place-items-center bg-grid">
      <Container className="text-center">
        <p className="font-display text-[clamp(6rem,20vw,12rem)] leading-none font-black tracking-[-0.06em] text-fg">
          404<span className="text-accent">.</span>
        </p>
        <p className="mt-4 text-muted">This page doesn't exist.</p>
        <div className="mt-8">
          <BackLink to="/">Back to Home</BackLink>
        </div>
      </Container>
    </main>
  );
}
