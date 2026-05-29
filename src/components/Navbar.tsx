import { NAVIGATION_LINKS } from "@/constant";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu09Icon, Moon02Icon, Sun, X } from "@hugeicons/core-free-icons";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

type Props = {
  setDark: Dispatch<SetStateAction<boolean>>;
  dark: boolean;
};

function Navbar({ setDark, dark }: Props) {
  const navigationLinks = NAVIGATION_LINKS;
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav
      className={`fixed z-50 transition-all duration-500 ${scrolled ? "top-0 left-0 right-0 md:top-3 md:left-4 md:right-4 glass md:rounded-full shadow-xl shadow-black/30" : "top-0 left-0 right-0 bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#"
          className="text-lg font-black tracking-tight text-foreground"
        >
          Arzl James
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navigationLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => setDark(!dark)}
            className="w-9 h-9 rounded-full cursor-pointer glass flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            {dark ? (
              <HugeiconsIcon icon={Sun} strokeWidth={1.8} />
            ) : (
              <HugeiconsIcon icon={Moon02Icon} strokeWidth={1.8} />
            )}
          </button>
          <a
            href="#contact"
            className="flex items-center gap-2 text-sm font-semibold bg-primary text-primary-foreground px-5 py-2 rounded-full hover:opacity-90 transition-opacity"
          >
            Let's talk{" "}
            <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground/60 inline-block" />
          </a>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => setDark(!dark)}
            className="w-9 h-9 rounded-full glass flex items-center justify-center text-muted-foreground"
          >
            {dark ? (
              <HugeiconsIcon icon={Sun} strokeWidth={1.8} />
            ) : (
              <HugeiconsIcon icon={Moon02Icon} strokeWidth={1.8} />
            )}
          </button>
          <button
            className="text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <HugeiconsIcon icon={X} strokeWidth={1.8} />
            ) : (
              <HugeiconsIcon icon={Menu09Icon} strokeWidth={1.8} />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
