import { useEffect, useState } from "react";
import { profile, links, techTicker, asset } from "../data/portfolio.js";
import { Icon } from "./Icons.jsx";

// Profile photo inside the spinning gradient ring; falls back to the monogram
// if profile.photo is unset or the image fails to load.
function Avatar() {
  const [err, setErr] = useState(false);
  const showPhoto = profile.photo && !err;
  return (
    <div className="relative grid h-20 w-20 shrink-0 place-items-center">
      <span className="spin-slow absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,var(--color-accent),transparent_40%,#6366f1_70%,var(--color-accent))]" />
      <span className="absolute inset-0.75 overflow-hidden rounded-full bg-surface">
        {showPhoto && (
          <img
            src={asset(profile.photo)}
            alt={profile.name}
            onError={() => setErr(true)}
            className="h-full w-full object-cover"
          />
        )}
      </span>
      {!showPhoto && (
        <span className="relative font-display text-2xl font-bold text-gradient">
          {profile.initials}
        </span>
      )}
    </div>
  );
}

function RotatingRole() {
  const [i, setI] = useState(0);
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setI((v) => (v + 1) % profile.roles.length);
        setShow(true);
      }, 280);
    }, 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <span
      className={`text-text transition-all duration-300 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
      }`}
    >
      {profile.roles[i]}
    </span>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20">
      {/* background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-60" />
        <div className="aurora aurora-1 left-[-10%] top-[-6%] h-[420px] w-[420px] bg-accent/30" />
        <div className="aurora aurora-2 right-[-8%] top-[8%] h-[360px] w-[360px] bg-indigo-500/25" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        {/* LEFT — copy */}
        <div className="reveal is-visible">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3.5 py-1.5 text-xs font-medium text-muted backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Open to entry-level roles · {profile.location}
          </span>

          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-text sm:text-6xl">
            Ovidiu Răzvan <br className="hidden sm:block" />
            <span className="text-gradient">Todor</span>
          </h1>

          <p className="mt-4 flex items-center gap-2 font-mono text-lg text-muted sm:text-xl">
            <span className="text-accent">{">"}</span>
            <RotatingRole />
          </p>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Computer Science graduate building production-style apps in{" "}
            <span className="text-text">Java &amp; Spring Boot</span>,{" "}
            <span className="text-text">Python</span> and{" "}
            <span className="text-text">React</span> — with a designer's eye for the
            front end. Backend &amp; database engineering is where I'm happiest.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-bg transition hover:bg-accent-bright shadow-[0_8px_30px_-8px_rgba(139,123,247,0.7)]"
            >
              View my work
              <Icon name="arrowRight" className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface/50 px-5 py-3 text-sm font-semibold text-text transition hover:border-accent/60 hover:bg-surface"
            >
              Get in touch
            </a>
          </div>

          <div className="mt-8 flex items-center gap-3">
            {[
              { name: "github", href: links.github, label: "GitHub" },
              { name: "linkedin", href: links.linkedin, label: "LinkedIn" },
              { name: "mail", href: `mailto:${links.email}`, label: "Email" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.name === "mail" ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid h-10 w-10 place-items-center rounded-lg border border-border text-muted transition hover:text-accent-bright hover:border-accent/60"
              >
                <Icon name={s.name} className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT — profile card */}
        <div className="reveal is-visible flex justify-center lg:justify-end" style={{ transitionDelay: "120ms" }}>
          <div className="relative w-full max-w-sm">
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-accent/40 via-transparent to-indigo-500/30 opacity-60 blur-md" />
            <div className="card-surface relative rounded-3xl p-7">
              {/* monogram */}
              <div className="flex items-center gap-4">
                <Avatar />
                <div>
                  <p className="font-display text-lg font-semibold text-text">{profile.shortName}</p>
                  <p className="text-sm text-muted">
                    {profile.title}
                  </p>
                  <p className="text-sm text-accent-bright">{profile.subtitle}</p>
                </div>
              </div>

              <div className="my-6 h-px bg-border" />

              <ul className="space-y-3 text-sm">
                {[
                  { icon: "mapPin", k: "Based in", v: profile.location },
                  { icon: "briefcase", k: "Focus", v: "Backend · Full-Stack · Databases" },
                  { icon: "cap", k: "Studying", v: "M.Sc. Digital Media & Web Dev" },
                  { icon: "award", k: "Latest", v: "Java Academy · Savnet × 3Pillar" },
                ].map((row) => (
                  <li key={row.k} className="flex items-start gap-3">
                    <Icon name={row.icon} className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span className="text-muted">
                      <span className="text-faint">{row.k}: </span>
                      <span className="text-text">{row.v}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-1.5">
                {["Java", "Spring Boot", "React", "PostgreSQL", "Python"].map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-border bg-surface-2/50 px-2 py-1 font-mono text-[11px] text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tech ticker */}
      <div className="marquee relative mt-16 overflow-hidden border-y border-border/60 py-4 sm:mt-20">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent" />
        <div className="marquee-track gap-8">
          {[...techTicker, ...techTicker].map((t, i) => (
            <span
              key={i}
              className="flex shrink-0 items-center gap-8 font-mono text-sm text-faint"
            >
              {t}
              <span className="text-accent/50">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
