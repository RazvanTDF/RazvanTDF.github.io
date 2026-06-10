import { Section, SectionHeader } from "./Section.jsx";
import Reveal from "./Reveal.jsx";
import { Icon } from "./Icons.jsx";
import { TagPill, LinkButton } from "./ui.jsx";
import { useLightbox } from "./Lightbox.jsx";
import { creative, asset } from "../data/portfolio.js";

export default function Creative() {
  const lb = useLightbox();

  return (
    <Section id="creative">
      <SectionHeader
        index="05"
        kicker="Creative / Design"
        title="The other half: branding & design"
        intro="What sets me apart from a pure-backend candidate — real branding, multilingual front ends and ongoing social-media work for live projects."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        {creative.map((item, idx) => (
          <Reveal
            key={item.id}
            delay={idx * 100}
            className="card-surface group flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-accent/50"
          >
            {/* Header visual */}
            {item.image ? (
              <button
                onClick={() => lb.open({ src: item.image, label: item.imageLabel })}
                className="relative block h-56 w-full overflow-hidden"
                aria-label={`View ${item.name}`}
              >
                <img
                  src={asset(item.image)}
                  alt={item.imageLabel}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />
                <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-bg/70 px-2.5 py-1 text-xs text-text backdrop-blur">
                  <Icon name="external" className="h-3.5 w-3.5 text-accent" /> View full board
                </span>
                <span className="absolute left-3 top-3 rounded-full bg-bg/70 px-2.5 py-1 font-mono text-[11px] text-muted backdrop-blur">
                  {item.status}
                </span>
              </button>
            ) : (
              <div className={`relative grid h-40 place-items-center overflow-hidden bg-gradient-to-br ${item.gradient}`}>
                <div className="absolute inset-0 bg-grid opacity-30" />
                <span className="relative text-5xl">{item.emoji}</span>
                <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-bg/70 px-2.5 py-1 font-mono text-[11px] text-emerald-300 backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> {item.status}
                </span>
              </div>
            )}

            {/* Body */}
            <div className="flex flex-1 flex-col p-6 sm:p-7">
              <div className="flex items-center gap-2">
                <span className="text-xl">{item.emoji}</span>
                <span className="font-mono text-[11px] text-faint">{item.kind}</span>
              </div>
              <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-text">{item.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.blurb}</p>

              <ul className="mt-4 space-y-2">
                {item.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5 text-sm text-muted">
                    <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent/70" strokeWidth={2.5} />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-2">
                {item.tags.map((t) => (
                  <TagPill key={t}>{t}</TagPill>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2.5 pt-1">
                {item.links?.map((l, i) => (
                  <LinkButton key={l.label} {...l} primary={i === 0} />
                ))}
                {item.image && (
                  <button
                    onClick={() => lb.open({ src: item.image, label: item.imageLabel })}
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface-2/40 px-3.5 py-2 text-sm font-medium text-text transition hover:border-accent/60 hover:bg-surface-2"
                  >
                    <Icon name="palette" className="h-4 w-4" /> View brand board
                  </button>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
