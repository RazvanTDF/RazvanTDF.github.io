import { Section, SectionHeader } from "./Section.jsx";
import Reveal from "./Reveal.jsx";
import { Icon } from "./Icons.jsx";
import { education } from "../data/portfolio.js";

export default function Education() {
  return (
    <Section id="education">
      <SectionHeader index="07" kicker="Education" title="Academic background" />

      <div className="grid gap-4 lg:grid-cols-3">
        {education.map((e, i) => (
          <Reveal
            key={e.degree}
            delay={i * 90}
            className={`card-surface relative flex flex-col rounded-2xl p-6 transition-colors hover:border-accent/40 ${
              e.current ? "ring-1 ring-accent/30" : ""
            }`}
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-surface-2 text-accent">
                <Icon name="cap" className="h-5 w-5" />
              </span>
              {e.current ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-medium text-accent-bright">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Current
                </span>
              ) : (
                <span className="font-mono text-xs text-faint">{e.period}</span>
              )}
            </div>

            <h3 className="font-display text-base font-semibold leading-snug text-text">{e.degree}</h3>
            <p className="mt-1 text-sm text-muted">{e.school}</p>
            {e.current && <p className="mt-1 font-mono text-xs text-faint">{e.period}</p>}
            {e.detail && <p className="mt-3 text-xs leading-relaxed text-muted">{e.detail}</p>}
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
