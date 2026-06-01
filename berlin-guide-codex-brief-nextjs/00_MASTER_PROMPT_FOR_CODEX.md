# Master Prompt for Codex — Berlin Travel Guide Web App

You are working as a senior frontend engineer and software architect.

Build a production-quality static web app for a personal Berlin travel guide for a couple visiting Berlin from **10 June 2026 to 16 June 2026**.

The app will be hosted for free on **GitHub Pages** and must work well on mobile while travelling.

## Product context

The users are a couple in their late 30s staying at:

```text
Nena Apartments Moritzplatz by LESA
Kreuzberg, Berlin
```

They are vegetarian, like walking, discovering neighbourhoods, local culture, alternative places, art, museums, cafés, restaurants, nightlife and electronic music. They prefer quality, authenticity and interesting experiences over mass tourism. Budget is medium: not luxury, not always the cheapest.

The guide should be useful before and during the trip.

## Technical decision

Use this stack:

```text
Next.js + TypeScript + App Router + Static Export + Tailwind CSS + Leaflet/OpenStreetMap + GitHub Pages
```

The app must be a fully static app.

### Hard constraints

- Use **Next.js App Router**.
- Use **TypeScript**.
- Use **Tailwind CSS**.
- Use **Leaflet** for the interactive map.
- Use **OpenStreetMap tiles**.
- Use **GitHub Pages** as deployment target.
- Use `output: 'export'` in Next.js config.
- Use `images.unoptimized = true` because static export must work on GitHub Pages.
- Do not use API routes.
- Do not use route handlers for runtime APIs.
- Do not use server actions.
- Do not use middleware.
- Do not use SSR-only functionality.
- Do not require a backend.
- Do not require a database.
- Do not require private environment variables.
- Do not use Google Maps JavaScript API as the main map provider.
- Do not introduce paid APIs or billing requirements.

### Map strategy

Use:

- Leaflet + OpenStreetMap for the embedded guide map.
- External links to Google Maps for navigation and route planning.
- External links to BVG / VBB / Citymapper where useful.

The map must support:

- markers/chinchetas by category;
- popups with place summary;
- links to details;
- links to open in Google Maps;
- filters by category;
- optional highlighting of places planned for each day.

## Main features

Implement the first version with these sections:

1. Home
   - trip summary;
   - stay dates;
   - accommodation;
   - quick links;
   - recommended daily flow;
   - map preview.

2. Itinerary
   - day-by-day plan from 10 to 16 June 2026;
   - morning / lunch / afternoon / evening / night blocks;
   - alternatives for rain, tired days or low-budget options;
   - links to places, Google Maps routes and public transport;
   - clear notes about verification status.

3. Map
   - interactive Leaflet map;
   - accommodation marker;
   - restaurants;
   - cafés;
   - supermarkets / vegetarian-friendly shops;
   - museums;
   - art galleries / street art;
   - alternative places;
   - nightlife / electronic music venues;
   - parks / walks;
   - transport points.

4. Food
   - vegetarian restaurants;
   - restaurants with vegetarian options;
   - cafés;
   - bakeries;
   - supermarkets / organic shops;
   - quick food near accommodation;
   - filters by neighbourhood, price, meal type and verification status.

5. Transport
   - airport arrival/departure notes;
   - BVG/public transport basics;
   - useful stations near accommodation;
   - bike rental recommendations;
   - walking strategy by neighbourhood;
   - external links to route planners.

6. Nightlife
   - electronic music / techno / clubs / bars;
   - priority for melodic techno but not limited to it;
   - event cards with date, venue, style, source link and verification metadata;
   - external links to Resident Advisor, venue pages and ticket pages;
   - practical notes: door policies, cash, transport at night, pacing.

7. Museums
   - museums and cultural institutions;
   - opening hours field;
   - ticket/reservation link;
   - estimated visit time;
   - rainy-day suitability.

8. Alternative Berlin
   - street art;
   - independent shops;
   - markets;
   - neighbourhood walks;
   - less obvious places;
   - local/alternative experiences.

9. Art & Culture
   - galleries;
   - photography spots;
   - design/book/music shops;
   - cinema or cultural recommendations if relevant.

10. Practical Info
   - travel checklist;
   - tickets/reservations checklist;
   - emergency/useful links;
   - packing notes;
   - vegetarian travel notes;
   - offline usage tips.

11. Favorites
   - allow users to mark places/events as favorites;
   - persist favorites in `localStorage`;
   - expose a favorites page or section.

## UX requirements

- Mobile-first.
- Fast loading.
- Clear navigation.
- Sticky bottom navigation or mobile-friendly nav.
- Cards should be readable on a phone while walking.
- Every card should have clear actions:
  - View details;
  - Open in Google Maps;
  - Add/remove favorite;
  - Source/official site;
  - Route/public transport if available.
- Use badges for category, neighbourhood, price level, verification status and day.
- Use calm, modern visual design. Avoid overcomplicated UI.

## Data architecture

Keep data separate from UI.

Use local TypeScript data files, not hardcoded data inside pages.

Recommended folders:

```text
src/domain/
src/data/
src/lib/
src/components/
app/
```

Data files should include:

```text
src/data/places.ts
src/data/itinerary.ts
src/data/categories.ts
src/data/transport.ts
src/data/settings.ts
```

Domain models should include:

```text
src/domain/place.ts
src/domain/itinerary.ts
src/domain/category.ts
src/domain/transport.ts
```

Each relevant item should include verification metadata:

```ts
verification: {
  status: 'verified' | 'needs_verification' | 'outdated' | 'unknown';
  sourceUrl?: string;
  officialUrl?: string;
  lastVerifiedAt?: string;
  notes?: string;
}
```

Do not invent specific real-world details without verification metadata. Seed data may be illustrative, but it must be clearly marked as `needs_verification` or `unknown` unless verified externally by the user later.

## Suggested project structure

Create a clean project structure like this:

```text
berlin-travel-guide/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── itinerary/page.tsx
│   ├── map/page.tsx
│   ├── food/page.tsx
│   ├── transport/page.tsx
│   ├── nightlife/page.tsx
│   ├── museums/page.tsx
│   ├── alternative/page.tsx
│   ├── art/page.tsx
│   ├── practical/page.tsx
│   └── favorites/page.tsx
├── src/
│   ├── components/
│   │   ├── layout/
│   │   ├── map/
│   │   ├── places/
│   │   ├── itinerary/
│   │   ├── filters/
│   │   └── ui/
│   ├── data/
│   ├── domain/
│   ├── hooks/
│   ├── lib/
│   └── test/
├── public/
├── .github/workflows/deploy.yml
├── next.config.ts
├── package.json
├── tsconfig.json
├── vitest.config.ts
└── README.md
```

## Testing requirements

Use:

- Vitest
- React Testing Library
- Testing Library user-event
- jsdom

Create tests for:

- filter logic;
- Google Maps link generation;
- favorite persistence logic;
- itinerary grouping;
- basic component rendering;
- navigation rendering;
- place card actions.

Optional but recommended:

- Playwright smoke tests for main routes after static build.

Prioritize testing pure functions in `src/lib` and critical UI components.

## Quality requirements

- Keep components small and focused.
- Avoid business logic inside page components.
- Use typed domain models.
- Avoid `any`.
- Avoid duplicated category strings.
- Avoid hardcoded links scattered across components.
- Use accessible buttons and links.
- Make cards keyboard-friendly.
- Make the map usable but do not make the whole app dependent on the map.
- The app should still be useful if a map tile fails to load.

## Implementation phases

Implement incrementally.

### Phase 1 — Project skeleton

- Create Next.js app with TypeScript and Tailwind.
- Configure static export for GitHub Pages.
- Add global layout and navigation.
- Add placeholder pages.
- Add base data/domain structure.
- Add CI build.

### Phase 2 — Core data and UI

- Add domain models.
- Add seed data.
- Build reusable cards.
- Build filters.
- Build itinerary page.
- Build food/nightlife/museum sections.

### Phase 3 — Map

- Add Leaflet map using client-only dynamic import where needed.
- Add marker categories.
- Add popups.
- Add map filters.
- Add accommodation marker.
- Add links from cards to map and from map to detail pages/sections.

### Phase 4 — Favorites and local storage

- Add favorites hook.
- Add favorite buttons.
- Add Favorites page.
- Add tests.

### Phase 5 — Polish and deployment

- Add responsive improvements.
- Add metadata.
- Add README instructions.
- Add GitHub Pages workflow.
- Ensure `npm run build` produces static export.
- Ensure tests pass.

## Expected result

At the end, the repository should contain a working static Next.js app that can be deployed to GitHub Pages and used as a mobile-friendly Berlin guide.

Do not stop at pseudocode. Generate full, working code.
