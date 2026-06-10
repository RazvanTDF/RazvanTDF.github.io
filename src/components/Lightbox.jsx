import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { asset } from "../data/portfolio.js";
import { Icon } from "./Icons.jsx";

const LightboxCtx = createContext(null);

export function useLightbox() {
  return useContext(LightboxCtx);
}

export function LightboxProvider({ children }) {
  const [img, setImg] = useState(null); // { src, label }
  const open = useCallback((image) => setImg(image), []);
  const close = useCallback(() => setImg(null), []);

  useEffect(() => {
    if (!img) return;
    const onKey = (e) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [img, close]);

  return (
    <LightboxCtx.Provider value={{ open, close }}>
      {children}

      {img && (
        <div
          className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-bg/90 p-4 backdrop-blur-md sm:p-8"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={img.label || "Image preview"}
        >
          <button
            onClick={close}
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-muted transition hover:text-text hover:border-accent/60"
            aria-label="Close"
          >
            <Icon name="close" className="h-5 w-5" />
          </button>

          <img
            src={asset(img.src)}
            alt={img.label || ""}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[82vh] max-w-full rounded-lg border border-border object-contain shadow-2xl"
          />
          {img.label && (
            <p className="mt-4 font-mono text-xs uppercase tracking-wider text-muted">
              {img.label}
            </p>
          )}
        </div>
      )}
    </LightboxCtx.Provider>
  );
}
