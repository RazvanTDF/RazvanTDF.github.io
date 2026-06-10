import Reveal from "./Reveal.jsx";

export function Section({ id, className = "", children }) {
  return (
    <section id={id} className={`scroll-mt-24 py-20 sm:py-28 ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  );
}

export function SectionHeader({ index, kicker, title, intro, align = "left" }) {
  const center = align === "center";
  return (
    <Reveal className={`mb-12 sm:mb-16 ${center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`}>
      <div
        className={`mb-3 flex items-center gap-3 ${center ? "justify-center" : ""}`}
      >
        {index && (
          <span className="font-mono text-xs font-medium text-accent">{index}</span>
        )}
        <span className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent">
          {kicker}
        </span>
        <span className="h-px w-10 bg-gradient-to-r from-accent/60 to-transparent" />
      </div>
      <h2 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
        {title}
      </h2>
      {intro && <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{intro}</p>}
    </Reveal>
  );
}

export default Section;
