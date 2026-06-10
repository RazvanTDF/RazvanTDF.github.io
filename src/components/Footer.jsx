import { Icon } from "./Icons.jsx";
import { links, profile } from "../data/portfolio.js";

export default function Footer() {
  const socials = [
    { name: "github", href: links.github, label: "GitHub" },
    { name: "linkedin", href: links.linkedin, label: "LinkedIn" },
    { name: "mail", href: `mailto:${links.email}`, label: "Email" },
  ];

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 py-10 sm:flex-row sm:px-8">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-surface font-display text-sm font-bold">
            <span className="text-gradient">{profile.initials}</span>
          </span>
          <div>
            <p className="font-display text-sm font-semibold text-text">{profile.name}</p>
            <p className="text-xs text-faint">
              © {new Date().getFullYear()} · Built with React + Vite + Tailwind
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.name === "mail" ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={s.label}
              className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted transition hover:text-accent-bright hover:border-accent/60"
            >
              <Icon name={s.name} className="h-4.5 w-4.5" />
            </a>
          ))}
          <a
            href="#hero"
            className="ml-2 inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium text-muted transition hover:text-text hover:border-accent/60"
          >
            Back to top <Icon name="arrow" className="h-3.5 w-3.5 -rotate-45" />
          </a>
        </div>
      </div>
    </footer>
  );
}
