# Codex Execution Plan

## Goal

Use Codex to generate the project incrementally and safely.

Do not ask Codex to do everything as one huge uncontrolled change. Work in phases.

## Phase 1 — Generate foundation

Prompt Codex:

```text
Generate the initial Next.js App Router project using TypeScript and Tailwind CSS. Configure it for static export and GitHub Pages. Add the route structure, layout, navigation, placeholder pages, basic README, package scripts, Vitest setup and GitHub Actions workflow. Do not implement the full map yet. Keep the app compiling and tests passing.
```

Expected result:

- app compiles;
- routes exist;
- layout exists;
- tests infrastructure works;
- deployment workflow exists.

Manual check:

```bash
npm install
npm run typecheck
npm run test
npm run build
npm run dev
```

## Phase 2 — Domain and data

Prompt Codex:

```text
Add the domain models and local TypeScript data files for places, itinerary, categories, transport options and trip settings. Use the structures defined in docs/codex-brief/04_DATA_MODEL.md. Add seed data for Berlin with clear verification metadata. Do not claim unverified places are verified.
```

Expected result:

- domain models;
- sample data;
- typed exports;
- no UI breakage.

## Phase 3 — Cards, filters and section pages

Prompt Codex:

```text
Implement reusable UI components for place cards, badges, section headers, filters and grids. Use the local data files to populate Food, Museums, Nightlife, Alternative, Art and Practical pages. Add unit tests for filtering and link generation.
```

Expected result:

- sections have real UI;
- filters work;
- cards show actions;
- tests added.

## Phase 4 — Itinerary

Prompt Codex:

```text
Implement the day-by-day itinerary page with morning, lunch, afternoon, dinner, evening, night and alternative blocks. Link itinerary items to places when placeId exists. Add Google Maps route links and transport hints where data provides them. Add tests for itinerary grouping/rendering logic.
```

Expected result:

- itinerary useful on mobile;
- day cards and blocks;
- links to places/routes.

## Phase 5 — Map

Prompt Codex:

```text
Implement the Leaflet/OpenStreetMap map page using client-only components compatible with Next.js static export. Render markers for places with coordinates, category filters, legend and popups. Add a filtered place list below the map. Ensure the app still builds statically. Do not use Google Maps API.
```

Expected result:

- map renders;
- markers work;
- filters work;
- no SSR errors.

## Phase 6 — Favorites

Prompt Codex:

```text
Implement favorites using localStorage. Add a reusable FavoriteButton, a useFavorites hook and a Favorites page. Handle malformed localStorage safely. Add tests for favorites logic.
```

Expected result:

- favorites persist;
- empty state works;
- tests pass.

## Phase 7 — Polish

Prompt Codex:

```text
Polish the app for mobile-first usage. Improve navigation, spacing, card hierarchy, accessibility, badges and empty states. Add useful README instructions for editing data and deploying to GitHub Pages. Ensure lint, typecheck, tests and build pass.
```

Expected result:

- polished MVP;
- maintainable README;
- deploy-ready.

## Phase 8 — Content enrichment

After the technical app is ready, update data files with verified content.

Prompt Codex:

```text
Using the verified content I provide, update the local data files. Preserve the existing data model, IDs, verification metadata and formatting. Do not invent missing facts. Mark unknown fields as unknown or needs_verification.
```

## Recommended working style

After each phase:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

Commit each phase separately:

```bash
git add .
git commit -m "chore: create static Next.js travel guide foundation"
```

Suggested commits:

- `chore: create static Next.js foundation`
- `feat: add travel guide domain model and seed data`
- `feat: add place cards and filters`
- `feat: add itinerary pages`
- `feat: add interactive map`
- `feat: add local favorites`
- `chore: add GitHub Pages deployment`
- `docs: add content editing guide`
