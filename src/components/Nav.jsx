import { useEffect, useState } from "react";
import { navItems, profile, links } from "../data/portfolio.js";
import { Icon } from "./Icons.jsx";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  // background shift after scrolling a little
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // scroll-spy: highlight the section currently in view
  useEffect(() => {
    const sections = navItems
      .map((n) => document.getElementById(n.id))
      .filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-colors duration-300 ${
        scrolled
          ? "border-b border-border/80 bg-bg/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        {/* Logo */}
        <a href="#hero" className="group flex items-center gap-2.5" aria-label="Home">
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-surface font-display text-sm font-bold">
            <span className="text-gradient">{profile.initials}</span>
          </span>
          <span className="hidden font-display text-sm font-semibold text-text sm:block">
            {profile.shortName}
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`rounded-md px-3 py-2 text-sm transition-colors ${
                  active === item.id
                    ? "text-accent-bright"
                    : "text-muted hover:text-text"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-9 w-9 place-items-center rounded-lg border border-border text-muted transition hover:text-text hover:border-accent/60 sm:grid"
            aria-label="GitHub"
          >
            <Icon name="github" className="h-4.5 w-4.5" />
          </a>
          <a
            href="#contact"
            className="hidden rounded-lg bg-accent px-4 py-2 text-sm font-medium text-bg transition hover:bg-accent-bright sm:inline-block"
          >
            Get in touch
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-lg border border-border text-text lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <Icon name={open ? "close" : "menu"} className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-bg/95 backdrop-blur-xl lg:hidden">
          <ul className="mx-auto grid max-w-6xl gap-1 px-5 py-4 sm:px-8">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className={`block rounded-md px-3 py-2.5 text-sm ${
                    active === item.id ? "text-accent-bright" : "text-muted"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="mt-2">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="block rounded-lg bg-accent px-3 py-2.5 text-center text-sm font-medium text-bg"
              >
                Get in touch
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
