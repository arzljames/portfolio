import { NAVIGATION_LINKS } from "@/constant";
import { useEffect, useState } from "react";

function Navbar() {
  const navigationLinks = NAVIGATION_LINKS;
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <nav>Navbar</nav>;
}

export default Navbar;
