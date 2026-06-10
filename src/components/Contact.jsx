import { Section } from "./Section.jsx";
import Reveal from "./Reveal.jsx";
import { Icon } from "./Icons.jsx";
import { links, profile } from "../data/portfolio.js";

const methods = [
  { icon: "mail", label: "Email", value: links.email, href: `mailto:${links.email}` },
  { icon: "phone", label: "Phone", value: links.phone, href: links.phoneHref },
  { icon: "linkedin", label: "LinkedIn", value: "Connect with me", href: links.linkedin, ext: true },
  { icon: "github", label: "GitHub", value: "github.com/RazvanTDF", href: links.github, ext: true },
];

export default function Contact() {
  return (
    <Section id="contact">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent/40 via-indigo-500/15 to-transparent p-px">
          <div className="relative overflow-hidden rounded-[calc(1.5rem-1px)] bg-surface p-8 text-center sm:p-14">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-grid opacity-20" />
              <div className="aurora aurora-1 left-1/2 top-[-30%] h-72 w-72 -translate-x-1/2 bg-accent/25" />
            </div>

            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-bg/50 px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.18em] text-accent">
                Contact
              </span>
              <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
                Let's build something together.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted">
                I'm open to entry-level backend & full-stack roles, internships and freelance work.
                Based in {profile.location} — available for remote and on-site work.
              </p>

              <div className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
                {methods.map((m) => (
                  <a
                    key={m.label}
                    href={m.href}
                    target={m.ext ? "_blank" : undefined}
                    rel={m.ext ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-4 rounded-xl border border-border bg-bg/40 p-4 text-left transition hover:border-accent/60 hover:bg-surface-2/50"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-border bg-surface-2 text-accent transition group-hover:text-accent-bright">
                      <Icon name={m.icon} className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-[11px] uppercase tracking-wider text-faint">{m.label}</span>
                      <span className="block truncate text-sm font-medium text-text">{m.value}</span>
                    </span>
                    <Icon name="arrow" className="ml-auto h-4 w-4 shrink-0 text-faint transition group-hover:text-accent" />
                  </a>
                ))}
              </div>

              <a
                href={`mailto:${links.email}`}
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-bg transition hover:bg-accent-bright shadow-[0_8px_30px_-8px_rgba(139,123,247,0.7)]"
              >
                <Icon name="mail" className="h-4 w-4" /> Say hello
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
