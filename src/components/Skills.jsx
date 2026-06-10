import { Section, SectionHeader } from "./Section.jsx";
import Reveal from "./Reveal.jsx";
import { Icon } from "./Icons.jsx";
import { skillGroups } from "../data/portfolio.js";

export default function Skills() {
  return (
    <Section id="skills" className="relative">
      <SectionHeader
        index="02"
        kicker="Skills"
        title="The toolbox"
        intro="From Java backends and SQL tuning to React front ends and brand design — grouped by where they live in a project."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <Reveal
            key={group.id}
            delay={(i % 3) * 90}
            className="card-surface group rounded-2xl p-6 transition-colors duration-300 hover:border-accent/40"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-surface-2 text-accent transition group-hover:text-accent-bright">
                <Icon name={group.icon} className="h-5 w-5" />
              </span>
              <h3 className="font-display text-base font-semibold text-text">{group.title}</h3>
            </div>
            <ul className="space-y-2">
              {group.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
                  <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent/70" strokeWidth={2.5} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
