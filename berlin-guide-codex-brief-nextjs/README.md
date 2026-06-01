# Berlin Travel Guide — Codex Brief Package

This folder contains the full product and technical briefing for building a personal Berlin travel guide web app.

The target implementation is:

- **Next.js** with **App Router**
- **TypeScript**
- **Static export** compatible with **GitHub Pages**
- **Leaflet + OpenStreetMap** for the in-app map
- External deep links to **Google Maps**, **BVG**, **Citymapper**, official websites and event pages
- Local data files, no backend, no database, no authentication
- Client-side interactivity: filters, favorites, search, map markers and itinerary views
- Testing with Vitest, React Testing Library and optional Playwright

## How to use this package with Codex

1. Create a new repository, for example `berlin-travel-guide`.
2. Copy this folder into the repository under:

```text
/docs/codex-brief/
```

3. Open Codex from the root of the repository.
4. Paste the full content of:

```text
/docs/codex-brief/00_MASTER_PROMPT_FOR_CODEX.md
```

5. Ask Codex to generate the project incrementally, committing each phase separately.

## Important implementation principles

- The app must be fully static and deployable to GitHub Pages.
- The app must not use API routes, server actions, middleware, SSR-only features or runtime server dependencies.
- Do not hardcode unverified tourist claims as facts.
- Keep travel content in dedicated data files.
- Every place, restaurant, event or museum should include verification metadata.
- The UI must be mobile-first because it will be used during the trip.
- The architecture must be simple, clean and maintainable.

## Recommended first Codex task

Ask Codex to generate the full skeleton first:

- Next.js project setup
- static export config
- Tailwind setup
- page structure
- domain models
- seed data
- initial components
- map page with sample markers
- tests
- GitHub Actions deployment workflow

After the skeleton works locally, iterate on content and UX.
