<div align="center">
<div align="center">
  <img width="800" alt="SRP Banner" src="/assets/logo/SRP-white.png" />
</div>

# Stunning Realty Partners (SRP)

A simple React + Vite frontend for the SRP brokerage & network website.

This repository contains the site source and assets (logo, favicons, property images).

**Key folders**

- `components/` — React UI pieces (Header, Footer, PropertyCard, etc.)
- `pages/` — Page routes used by the app
- `assets/` — Images, favicons and static media

## Prerequisites

- Node.js (>=16) and `npm`

## Local development

1. Install dependencies

```bash
npm install
```

2. Run development server

```bash
npm run dev
```

Open http://localhost:5173 (Vite prints the exact URL).

## Build for production

```bash
npm run build
npm run preview
```

## Favicon and logo

- The favicons are in `/assets/favicon_io/` and are already referenced from `index.html`.
- Logo images live in `/assets/logo/` (examples: `SRP-black.png`, `SRP-white.png`).
- If the header logo doesn't display, open `components/Header.tsx` and set the image `src` to `/assets/logo/SRP-black.png` or `/assets/logo/SRP-white.png`.

## GitHub — push this project

If you want to push this repo to GitHub, run these commands from the project root. Replace `<your-username>` and `<repo-name>` with your values.

```bash
# initialize git (if not already a repo)
git init
git add .
git commit -m "Initial commit"

# create a remote on GitHub and push (example)
git remote add origin https://github.com/<your-username>/<repo-name>.git
git branch -M main
git push -u origin main
```

If you already have a Git repo, just add the remote and push.

## Notes & next steps

- Consider adding a small CI workflow (GitHub Actions) to build and preview on PRs.
- If you'd like, I can create the GitHub repo for you (I will need your GitHub repo URL or allow-listing instructions), or I can update `Header.tsx` to point at the correct logo file.

---

If you want, I can now initialize git locally and create the first commit for you.  
I can also push to a GitHub repo if you provide the repo URL (or set up a remote yourself and I'll show the commands).
