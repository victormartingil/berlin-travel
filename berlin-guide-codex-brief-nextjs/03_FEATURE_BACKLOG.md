# Feature Backlog

## MVP 1 — Static app foundation

### F001 — Next.js project setup

Create a Next.js App Router project with TypeScript and Tailwind CSS.

Acceptance criteria:

- `npm run dev` works.
- `npm run build` works.
- Static export is configured.
- App has a global layout.
- App has basic responsive navigation.

### F002 — Page structure

Create these pages:

- `/`
- `/itinerary/`
- `/map/`
- `/food/`
- `/transport/`
- `/nightlife/`
- `/museums/`
- `/alternative/`
- `/art/`
- `/practical/`
- `/favorites/`

Acceptance criteria:

- Every page renders.
- Navigation links work in static export.
- Page titles and descriptions are meaningful.

### F003 — Domain models

Create typed domain models.

Acceptance criteria:

- No `any` types.
- Places, itinerary and transport data are typed.
- Verification metadata is mandatory for relevant content.

### F004 — Seed data

Create initial seed data.

Acceptance criteria:

- Accommodation exists as a place.
- At least 15 sample places exist across categories.
- At least 7 itinerary days exist.
- All unverified content is marked as `needs_verification` or `unknown`.

## MVP 2 — Places and filters

### F005 — Place cards

Implement reusable place cards.

Acceptance criteria:

- Show title, category, neighbourhood, short description, price level and verification badge.
- Include actions for Google Maps, source/official website and favorite.

### F006 — Place filtering

Implement category/neighbourhood/price filters.

Acceptance criteria:

- Food page can filter restaurants/cafés/supermarkets.
- Map page can filter markers.
- Filters are implemented through tested pure functions.

### F007 — Verification badges

Show visible verification status.

Acceptance criteria:

- `verified` is visually distinct.
- `needs_verification` is visible but not alarming.
- `unknown` is clearly marked.

## MVP 3 — Map

### F008 — Interactive map

Implement Leaflet/OpenStreetMap map.

Acceptance criteria:

- Map renders only on client.
- Markers render by category.
- Popups show summary and actions.
- Map is usable on mobile.

### F009 — Map filters and legend

Add filters and legend to map.

Acceptance criteria:

- User can toggle categories.
- Legend matches marker categories.
- Accommodation marker is always visible unless explicitly filtered.

### F010 — Google Maps links

Generate external Google Maps links.

Acceptance criteria:

- Place links open correct query/location.
- Direction links support walking, transit and bicycling when applicable.
- URL generation is unit tested.

## MVP 4 — Itinerary

### F011 — Day-by-day itinerary

Create itinerary page.

Acceptance criteria:

- Shows days from 10 June to 16 June 2026.
- Each day has blocks.
- Items can link to places.
- Items can include alternatives.

### F012 — Transport links in itinerary

Add route links to itinerary items.

Acceptance criteria:

- Itinerary items can include transport notes.
- Items can include Google Maps route links.
- Items can include BVG/VBB/Citymapper external links.

## MVP 5 — Sections

### F013 — Food section

Acceptance criteria:

- Vegetarian-focused.
- Supports restaurants, vegetarian-friendly restaurants, cafés, bakeries and supermarkets.
- Includes filters and cards.

### F014 — Transport section

Acceptance criteria:

- Includes public transport basics.
- Includes bike rental section.
- Includes useful apps/links.
- Includes airport notes.

### F015 — Nightlife section

Acceptance criteria:

- Shows venues/events.
- Includes music style.
- Includes RA/official links.
- Includes practical notes.

### F016 — Museums section

Acceptance criteria:

- Shows museums/cultural institutions.
- Includes opening hours field.
- Includes ticket/source links.
- Includes estimated visit duration.

### F017 — Alternative Berlin section

Acceptance criteria:

- Shows street art, markets, independent shops and neighbourhood walks.

### F018 — Art section

Acceptance criteria:

- Shows galleries, photography spots, design/book/music places.

### F019 — Practical section

Acceptance criteria:

- Shows checklist.
- Shows reservation reminders.
- Shows useful links.
- Shows offline usage notes.

## MVP 6 — Favorites

### F020 — Favorite button

Acceptance criteria:

- User can favorite/unfavorite a place.
- Button is accessible.
- State is persisted in localStorage.

### F021 — Favorites page

Acceptance criteria:

- Shows saved places/events.
- Handles empty state.
- Allows removing favorites.

## MVP 7 — Quality and deployment

### F022 — Unit tests

Acceptance criteria:

- Tests for filters.
- Tests for map links.
- Tests for favorites storage.
- Tests for core components.

### F023 — GitHub Pages deployment

Acceptance criteria:

- GitHub Actions workflow exists.
- Workflow runs typecheck, tests and build.
- Static site can be deployed to GitHub Pages.

### F024 — Documentation

Acceptance criteria:

- README explains local development.
- README explains deployment.
- README explains how to update data.
