import { asset } from "../data/portfolio.js";
import { Icon } from "./Icons.jsx";

export function TagPill({ children }) {
  return (
    <span className="rounded-full border border-border bg-surface-2/60 px-2.5 py-1 font-mono text-[11px] leading-none text-muted">
      {children}
    </span>
  );
}

const ICON_FOR = {
  github: "github",
  demo: "play",
  live: "external",
  youtube: "play",
  sql: "fileCode",
  file: "download",
  download: "download",
};

// External absolute links stay as-is; internal public paths get the base prefix.
const resolve = (href) => (/^https?:|^mailto:|^tel:/.test(href) ? href : asset(href));

export function LinkButton({ type = "external", label, href, primary = false }) {
  const base =
    "group/btn inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200";
  const styles = primary
    ? "bg-accent text-bg hover:bg-accent-bright shadow-[0_4px_20px_-6px_rgba(139,123,247,0.6)]"
    : "border border-border bg-surface-2/40 text-text hover:border-accent/60 hover:bg-surface-2";

  return (
    <a href={resolve(href)} target="_blank" rel="noopener noreferrer" className={`${base} ${styles}`}>
      <Icon name={ICON_FOR[type] || "external"} className="h-4 w-4" />
      {label}
      <Icon
        name="arrow"
        className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-200 group-hover/btn:translate-x-0 group-hover/btn:opacity-100"
      />
    </a>
  );
}
