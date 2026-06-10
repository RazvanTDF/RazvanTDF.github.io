# Ovidiu Răzvan Todor — Portfolio

Personal portfolio website. **React + Vite + TailwindCSS**, fully responsive,
dark "Midnight Indigo" theme. Built to be deployed on **GitHub Pages**.

> 🇷🇴 **Pe scurt:** editezi tot conținutul din `src/data/portfolio.js`, pui
> proiectul pe GitHub și activezi GitHub Pages (vezi *Deploy* mai jos).

---

## ✏️ Edit your content — one file

Almost everything (text, links, projects, certificates, skills…) lives in:

```
src/data/portfolio.js
```

Two things to fill in there (search for `← EDIT ME`):

1. **`linkedin`** — your real LinkedIn URL.
2. **`thesisYoutube`** — the YouTube link for the *Transporte del Futuro* demo.
   While it's empty, the "Watch demo" button on that project stays hidden.

To swap a certificate scan or image, drop a new file into `public/certificates/`
(or `public/images/`) and point to it in `portfolio.js`.

---

## 🧑‍💻 Run locally

Requires [Node.js](https://nodejs.org) 18+.

```bash
npm install      # first time only
npm run dev      # start dev server → http://localhost:5173
npm run build    # production build into /dist
npm run preview  # preview the production build locally
```

---

## 🚀 Deploy to GitHub Pages (automatic)

This repo ships with a GitHub Actions workflow (`.github/workflows/deploy.yml`)
that builds and publishes the site on every push to `main`.

1. Create a repo on GitHub and push this folder to it:
   ```bash
   git init
   git add .
   git commit -m "Portfolio"
   git branch -M main
   git remote add origin https://github.com/RazvanTDF/<repo-name>.git
   git push -u origin main
   ```
2. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Done. Every push to `main` redeploys automatically. Your site will be at
   `https://razvantdf.github.io/<repo-name>/`
   (or `https://razvantdf.github.io/` if you name the repo `RazvanTDF.github.io`).

> The Vite `base` is set to `'./'` (relative paths), so the site works no matter
> what the repo is called — no config change needed.

---

## 📁 Structure

```
public/
  certificates/   real certificate scans (Java Academy, T8X, Haufe, …)
  demos/          self-contained project demos (BookRental, TRR, FSADD, AR Tourist)
  files/          parking-management.sql (the Advanced Databases project)
  images/         FITLY brand board
  favicon.svg
src/
  data/portfolio.js   ← all content & links
  components/          UI sections
  hooks/useReveal.js   scroll animations
  index.css            theme tokens + effects
```

The high-res originals stay on your machine (they're git-ignored); optimized
copies are what ship in `public/`.
