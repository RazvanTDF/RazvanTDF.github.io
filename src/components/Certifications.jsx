import { Section, SectionHeader } from "./Section.jsx";
import Reveal from "./Reveal.jsx";
import { Icon } from "./Icons.jsx";
import { useLightbox } from "./Lightbox.jsx";
import { certifications, asset } from "../data/portfolio.js";

function CertThumb({ src, label, onOpen, className = "" }) {
  return (
    <button
      onClick={onOpen}
      className={`group relative block overflow-hidden rounded-lg border border-border bg-surface-2 ${className}`}
      aria-label={`View ${label}`}
    >
      <img
        src={asset(src)}
        alt={label}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg/85 via-bg/10 to-transparent" />
      <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-2.5 text-left">
        <span className="text-[11px] font-medium leading-tight text-text">{label}</span>
        <Icon name="external" className="h-3.5 w-3.5 shrink-0 text-accent opacity-0 transition group-hover:opacity-100" />
      </span>
    </button>
  );
}

export default function Certifications() {
  const lb = useLightbox();
  const f = certifications.featured;

  return (
    <Section id="certifications">
      <SectionHeader
        index="06"
        kicker="Training & Certifications"
        title="Credentials & training"
        intro="Every certificate below is a real, viewable scan — click any of them to open the full document."
      />

      {/* FEATURED */}
      <Reveal className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent/40 via-indigo-500/10 to-transparent p-px">
        <div className="relative overflow-hidden rounded-[calc(1.5rem-1px)] bg-surface p-6 sm:p-9">
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-5">
            {/* text */}
            <div className="lg:col-span-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-accent-bright">
                <Icon name="award" className="h-3.5 w-3.5" /> {f.badge}
              </span>

              <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-text">{f.title}</h3>
              <p className="mt-1 text-sm text-accent-bright">{f.issuer}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {f.meta.map((m) => (
                  <span
                    key={m}
                    className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-2/50 px-2.5 py-1 text-xs text-muted"
                  >
                    <Icon name="check" className="h-3 w-3 text-accent" strokeWidth={2.5} /> {m}
                  </span>
                ))}
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted">{f.blurb}</p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {f.modules.map((m) => (
                  <div key={m.name} className="rounded-xl border border-border bg-bg/40 p-4">
                    <p className="font-display text-sm font-semibold text-accent">{m.name}</p>
                    <p className="mt-1.5 font-mono text-[11px] leading-relaxed text-muted">{m.items}</p>
                  </div>
                ))}
              </div>

              <p className="mt-4 flex items-center gap-2 text-xs text-faint">
                <Icon name="check" className="h-3.5 w-3.5 text-accent" strokeWidth={2.5} />
                {f.evaluation}
              </p>
            </div>

            {/* documents */}
            <div className="lg:col-span-2">
              <p className="mb-3 font-mono text-xs uppercase tracking-wider text-faint">Certificate documents</p>
              <div className="grid grid-cols-2 gap-3">
                <CertThumb
                  src={f.images[0].src}
                  label={f.images[0].label}
                  onOpen={() => lb.open(f.images[0])}
                  className="col-span-2 aspect-[1.45/1]"
                />
                {f.images.slice(1).map((img) => (
                  <CertThumb
                    key={img.src}
                    src={img.src}
                    label={img.label}
                    onOpen={() => lb.open(img)}
                    className="aspect-[0.72/1]"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ADDITIONAL */}
      <p className="mb-4 mt-10 font-mono text-xs uppercase tracking-wider text-faint">
        Additional certifications
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {certifications.additional.map((c, i) => (
          <Reveal
            key={c.title}
            delay={(i % 4) * 70}
            className="card-surface flex flex-col overflow-hidden rounded-2xl transition-colors hover:border-accent/40"
          >
            <CertThumb
              src={c.image}
              label="View certificate"
              onOpen={() => lb.open({ src: c.image, label: c.title })}
              className="aspect-[1.45/1] rounded-none border-0 border-b border-border"
            />
            <div className="flex flex-1 flex-col p-4">
              <h4 className="font-display text-sm font-semibold leading-snug text-text">{c.title}</h4>
              <p className="mt-1 text-xs text-accent-bright">{c.issuer}</p>
              <p className="mt-auto pt-2 font-mono text-[11px] text-faint">{c.meta}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
