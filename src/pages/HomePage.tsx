import { About } from "../components/About";
import { Contact } from "../components/Contact";
import { Experience } from "../components/Experience";
import { Hero } from "../components/Hero";
import { Projects } from "../components/Projects";

export function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
    </main>
  );
}
