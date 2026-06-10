import { Section } from "./Section.jsx";
import Reveal from "./Reveal.jsx";
import { Icon } from "./Icons.jsx";
import { ai, links } from "../data/portfolio.js";

function PointRow({ t, d }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
      <span className="text-sm leading-relaxed">
        <span className="font-medium text-text">{t}</span>
        <span className="text-muted"> — {d}</span>
      </span>
    </li>
  );
}

export default function AISection() {
  return (
    <Section id="ai">
      <Reveal>
        {/* gradient border wrapper */}
        <div className="relative rounded-3xl bg-gradient-to-br from-accent/50 via-indigo-500/20 to-transparent p-px">
          <div className="relative overflow-hidden rounded-[calc(1.5rem-1px)] bg-surface p-7 sm:p-12">
            {/* bg fx */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-grid opacity-[0.25]" />
              <div className="aurora aurora-2 right-[-6%] top-[-20%] h-72 w-72 bg-accent/25" />
            </div>

            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 font-mono text-xs font-medium uppercase tracking-[0.15em] text-accent-bright">
                <Icon name="sparkles" className="h-3.5 w-3.5" /> {ai.kicker}
              </span>

              <h2 className="mt-5 max-w-3xl font-display text-2xl font-bold leading-snug tracking-tight text-text sm:text-3xl">
                {ai.title}
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">{ai.intro}</p>

              {/* two halves */}
              <div className="mt-9 grid gap-8 md:grid-cols-2 md:gap-10">
                <div className="md:border-r md:border-border md:pr-10">
                  <h3 className="mb-4 flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-accent">
                    <Icon name="brain" className="h-4 w-4" /> {ai.workflow.heading}
                  </h3>
                  <ul className="space-y-3.5">
                    {ai.workflow.points.map((p) => (
                      <PointRow key={p.t} {...p} />
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="mb-4 flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-accent">
                    <Icon name="server" className="h-4 w-4" /> {ai.building.heading}
                  </h3>
                  <ul className="space-y-3.5">
                    {ai.building.points.map((p) => (
                      <PointRow key={p.t} {...p} />
                    ))}
                  </ul>
                </div>
              </div>

              {/* closing */}
              <div className="mt-9 rounded-2xl border border-border bg-bg/40 p-5 sm:p-6">
                <p className="text-sm leading-relaxed text-muted sm:text-base">{ai.closing}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-bg transition hover:bg-accent-bright"
                  >
                    <Icon name="sparkles" className="h-4 w-4" /> Let's talk about it
                  </a>
                  <a
                    href={`mailto:${links.email}`}
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface-2/40 px-4 py-2.5 text-sm font-semibold text-text transition hover:border-accent/60"
                  >
                    <Icon name="mail" className="h-4 w-4" /> {links.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
