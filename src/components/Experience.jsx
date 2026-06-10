import { Section, SectionHeader } from "./Section.jsx";
import Reveal from "./Reveal.jsx";
import { Icon } from "./Icons.jsx";
import { TagPill } from "./ui.jsx";
import { useLightbox } from "./Lightbox.jsx";
import { experience, asset } from "../data/portfolio.js";

export default function Experience() {
  const lb = useLightbox();

  return (
    <Section id="experience">
      <SectionHeader
        index="03"
        kicker="Experience"
        title="Where I've built things"
        intro="Hands-on programs and internships where I shipped real, end-to-end software."
      />

      <ol className="relative ml-3 space-y-8 border-l border-border">
        {experience.map((job, i) => (
          <li key={job.company} className="relative pl-8 sm:pl-10">
            <span className="absolute -left-[6.5px] top-7 h-3 w-3 rounded-full border-2 border-accent bg-bg" />
            <Reveal delay={i * 80} className="card-surface rounded-2xl p-6 sm:p-7">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-display text-lg font-semibold text-text">
                    {job.role}{" "}
                    <span className="text-accent-bright">· {job.company}</span>
                  </h3>
                  <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted">
                    <Icon name="mapPin" className="h-3.5 w-3.5" /> {job.location}
                  </p>
                </div>
                <span className="shrink-0 rounded-md border border-border bg-surface-2/50 px-2.5 py-1 font-mono text-xs text-muted">
                  {job.period}
                </span>
              </div>

              {job.context && (
                <p className="mt-3 border-l-2 border-accent/40 pl-3 font-mono text-xs leading-relaxed text-faint">
                  {job.context}
                </p>
              )}

              <ul className="mt-4 space-y-2">
                {job.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted">
                    <Icon name="arrow" className="mt-1 h-3.5 w-3.5 shrink-0 text-accent/70" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-2">
                {job.tags.map((t) => (
                  <TagPill key={t}>{t}</TagPill>
                ))}
              </div>

              {job.image && (
                <button
                  onClick={() => lb.open({ src: job.image, label: job.imageLabel })}
                  className="group mt-5 inline-flex items-center gap-3 rounded-xl border border-border bg-surface-2/40 p-2 pr-4 text-left transition hover:border-accent/50"
                >
                  <img
                    src={asset(job.image)}
                    alt={job.imageLabel}
                    loading="lazy"
                    className="h-12 w-16 rounded-md object-cover"
                  />
                  <span className="text-sm text-muted transition group-hover:text-text">
                    <span className="flex items-center gap-1.5 font-medium text-text">
                      <Icon name="award" className="h-4 w-4 text-accent" /> View diploma
                    </span>
                    <span className="text-xs">{job.imageLabel}</span>
                  </span>
                </button>
              )}
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
