import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { navLinks, profile } from "../data/content";
import { useTheme } from "../hooks/useTheme";
import { Icon } from "./Icon";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`font-display text-lg font-extrabold tracking-[-0.03em] text-fg ${className}`}
    >
      {profile.shortName}
    </Link>
  );
}

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className="grid size-9 place-items-center rounded-full border border-line-strong bg-surface-2 text-muted transition-colors hover:text-fg"
    >
      <Icon name={theme === "dark" ? "sun" : "moon"} size={15} />
    </button>
  );
}

export function TalkButton({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/#contact"
      className={`inline-flex items-center gap-2.5 rounded-full bg-accent px-5 py-2 text-sm font-bold text-white transition hover:brightness-110 ${className}`}
    >
      Let's talk
      <span className="size-1.5 rounded-full bg-white/80" aria-hidden="true" />
    </Link>
  );
}

/** The nav section currently under the upper third of the viewport, or null above the first one. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const line = window.innerHeight / 3;
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      let current: string | null = atBottom ? ids[ids.length - 1] : null;
      if (!atBottom) {
        for (const id of ids) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= line) current = id;
        }
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids]);

  return active;
}

const sectionIds = navLinks.map((link) => link.id);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const floating = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-500 ease-out ${
          floating
            ? "mx-3 mt-2.5 rounded-[2rem] border border-line bg-surface/90 shadow-2xl shadow-black/20 backdrop-blur-xl"
            : "mx-0 mt-0 border border-transparent"
        }`}
      >
        <nav
          className={`mx-auto flex max-w-[1280px] items-center justify-between px-4 transition-all duration-500 sm:px-8 ${
            floating ? "h-[4.25rem]" : "h-16"
          }`}
          aria-label="Main"
        >
          <Logo />

          <div className="hidden items-center gap-8 md:flex">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    to={`/#${link.id}`}
                    aria-current={active === link.id ? "location" : undefined}
                    className={`relative py-1 text-sm transition-colors hover:text-fg ${
                      active === link.id ? "text-fg" : "text-muted"
                    }`}
                  >
                    {link.label}
                    {active === link.id && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-0 -bottom-1 mx-auto h-0.5 w-4 rounded-full bg-accent"
                        transition={{ type: "spring", stiffness: 500, damping: 35 }}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
            <ThemeToggle />
            <TalkButton />
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-9 place-items-center rounded-full border border-line-strong text-fg"
            >
              <Icon name={open ? "close" : "menu"} size={16} />
            </button>
          </div>
        </nav>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden md:hidden"
            >
              <ul className="flex flex-col gap-1 px-4 pb-5">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <Link
                      to={`/#${link.id}`}
                      onClick={() => setOpen(false)}
                      aria-current={active === link.id ? "location" : undefined}
                      className={`block rounded-xl px-3 py-3 font-display text-2xl font-bold tracking-tight hover:bg-surface-2 ${
                        active === link.id ? "bg-surface-2 text-accent" : "text-fg"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li className="mt-3 px-3">
                  <span onClick={() => setOpen(false)}>
                    <TalkButton />
                  </span>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
