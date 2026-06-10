import { Section, SectionHeader } from "./Section.jsx";
import Reveal from "./Reveal.jsx";
import { Icon } from "./Icons.jsx";
import { profile, projects, certifications, languages, interests } from "../data/portfolio.js";

const certCount = certifications.additional.length + 1;

const stats = [
  { v: `${projects.length}`, k: "Projects & demos" },
  { v: "104h", k: "Java Academy" },
  { v: `${certCount}`, k: "Certifications" },
  { v: "M.Sc.", k: "In progress" },
];

export default function About() {
  return (
    <Section id="about">
      <SectionHeader
        index="01"
        kicker="About"
        title="A backend-minded developer who also sees design."
      />

      <div className="grid gap-10 lg:grid-cols-5">
        {/* text */}
        <Reveal className="space-y-5 lg:col-span-3">
          <p className="text-base leading-relaxed text-muted sm:text-lg">{profile.summary}</p>
          <p className="text-base leading-relaxed text-muted sm:text-lg">{profile.aboutExtra}</p>
        </Reveal>

        {/* snapshot */}
        <Reveal delay={120} className="lg:col-span-2">
          <div className="card-surface rounded-2xl p-6">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border">
              {stats.map((s) => (
                <div key={s.k} className="bg-surface p-5">
                  <div className="font-display text-3xl font-bold text-gradient">{s.v}</div>
                  <div className="mt-1 text-xs text-muted">{s.k}</div>
                </div>
              ))}
            </div>

            {/* languages */}
            <div className="mt-6">
              <p className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-faint">
                <Icon name="globe" className="h-3.5 w-3.5 text-accent" /> Languages
              </p>
              <ul className="space-y-3">
                {languages.map((l) => (
                  <li key={l.name}>
                    <div className="mb-1 flex items-baseline justify-between">
                      <span className="text-sm text-text">{l.name}</span>
                      <span className="text-xs text-muted">{l.level}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-accent to-accent-bright"
                        style={{ width: `${l.pct}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>

      {/* photography / interests strip */}
      <Reveal delay={80} className="mt-8">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-surface/50 p-6 sm:p-8">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-border bg-surface-2 text-accent">
              <Icon name="camera" className="h-6 w-6" />
            </div>
            <div>
              <p className="font-display text-lg font-semibold text-text">
                Outside the editor — {interests.headline}
              </p>
              <p className="mt-1 max-w-3xl text-sm leading-relaxed text-muted">{interests.text}</p>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
