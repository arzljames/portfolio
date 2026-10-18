import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { navLinks, profile } from "../data/content";
import { Icon } from "./Icon";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`font-display text-lg font-extrabold tracking-[-0.04em] text-fg ${className}`}
    >
      {profile.shortName}
    </Link>
  );
}

export function TalkButton({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/#contact"
      className={`group inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-on-accent transition hover:brightness-110 ${className}`}
    >
      Let's talk
      <Icon name="arrowRight" size={15} className="transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

/** The nav section currently under the upper third of the viewport, or null above the first one. */
function useActiveSection(ids: string[], enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
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
  }, [ids, enabled]);

  return enabled ? active : null;
}

const sectionIds = navLinks.map((link) => link.id);

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const onHome = pathname === "/";
  const section = useActiveSection(sectionIds, onHome);
  // Off the home page, the projects pages count as "Work".
  const active = onHome ? section : pathname.startsWith("/projects") ? "projects" : null;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <div className="mx-auto max-w-[1240px] rounded-[2rem] border border-line bg-bg/80 shadow-2xl shadow-black/30 backdrop-blur-xl">
        <nav className="flex h-16 items-center justify-between pr-2.5 pl-6" aria-label="Main">
          <Logo />

          <ul className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link
                  to={`/#${link.id}`}
                  aria-current={active === link.id ? "location" : undefined}
                  className={`text-sm transition-colors hover:text-fg ${
                    active === link.id ? "font-bold text-fg" : "font-medium text-muted"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <TalkButton />
          </div>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center rounded-full border border-line-strong text-fg md:hidden"
          >
            <Icon name={open ? "close" : "menu"} size={16} />
          </button>
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
