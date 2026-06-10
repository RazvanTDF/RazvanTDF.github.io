import { Section, SectionHeader } from "./Section.jsx";
import Reveal from "./Reveal.jsx";
import { Icon } from "./Icons.jsx";
import { TagPill, LinkButton } from "./ui.jsx";
import { projects, links } from "../data/portfolio.js";

function projectLinks(p) {
  const out = [...(p.links || [])];
  if (p.id === "thesis" && links.thesisYoutube) {
    out.push({ type: "youtube", label: "Watch demo", href: links.thesisYoutube });
  }
  return out;
}

function ProjectCard({ p, featured, delay }) {
  const ls = projectLinks(p);
  return (
    <Reveal
      delay={delay}
      className={`card-surface group relative flex flex-col overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 sm:p-7 ${
        featured ? "ring-1 ring-accent/10" : ""
      }`}
    >
      {/* glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-1 font-mono text-[11px] font-medium text-accent-bright">
          <Icon name="sparkles" className="h-3 w-3" /> {p.accent}
        </span>
        <span className="font-mono text-[11px] text-faint">{p.kind}</span>
      </div>

      <h3
        className={`font-display font-bold tracking-tight text-text ${
          featured ? "text-2xl" : "text-xl"
        }`}
      >
        {p.name}
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-muted">{p.blurb}</p>

      {p.highlights && (
        <ul className="mt-4 space-y-2">
          {p.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted">
              <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent/70" strokeWidth={2.5} />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <TagPill key={t}>{t}</TagPill>
        ))}
      </div>

      {p.note && <p className="mt-4 font-mono text-xs text-faint">ⓘ {p.note}</p>}

      {ls.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2.5 pt-1">
          {ls.map((l, i) => (
            <LinkButton key={l.label} {...l} primary={i === 0 && featured} />
          ))}
        </div>
      )}
    </Reveal>
  );
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <Section id="projects">
      <SectionHeader
        index="04"
        kicker="Projects"
        title="Things I've designed & built"
        intro="A mix of database engineering, full-stack apps and AI-powered tools. Several ship with a live, clickable demo — open them up."
      />

      {/* Featured */}
      <div className="grid gap-5 lg:grid-cols-2">
        {featured.map((p, i) => (
          <ProjectCard key={p.id} p={p} featured delay={i * 100} />
        ))}
      </div>

      {/* Rest */}
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {rest.map((p, i) => (
          <ProjectCard key={p.id} p={p} delay={(i % 2) * 100} />
        ))}
      </div>
    </Section>
  );
}
