# Reference Templates and Inspiration

## 1. Technical inspiration

The goal is not to clone a design, but to follow proven patterns.

Useful implementation patterns:

- static travel guide;
- map with filters;
- place cards;
- itinerary timeline;
- mobile-first city guide;
- client-only map rendering in Next.js;
- local data files;
- GitHub Pages static deployment.

## 2. Recommended app patterns

### Pattern A — City guide dashboard

Home page with:

- hero summary;
- quick section cards;
- featured map preview;
- today/trip highlights;
- practical alerts.

### Pattern B — Map + list

Map page with:

- filters;
- map;
- legend;
- list of currently filtered places.

This is better than map-only because it remains useful on mobile and if map tiles load slowly.

### Pattern C — Itinerary timeline

Itinerary page with:

- one card per day;
- blocks per time of day;
- place references;
- alternatives;
- transport links.

### Pattern D — Data-first guide

All content is stored in `src/data`. UI reads from typed data.

This allows updating the guide without touching components.

## 3. Design inspiration

Look for inspiration in:

- modern city guide websites;
- Notion-style travel planners;
- Google Maps list cards;
- Airbnb guidebook cards;
- RA event cards;
- museum listing pages.

But keep the app simpler and faster.

## 4. What to avoid

Avoid:

- heavy animation;
- complex CMS;
- paid map APIs;
- backend dependencies;
- scraping;
- auto-generated unverified facts;
- huge hero images;
- too many nested menus;
- map-only UX.

## 5. Recommended visual components

- `HeroSummary`
- `QuickLinkCard`
- `PlaceCard`
- `EventCard`
- `DayPlanCard`
- `ItineraryBlock`
- `MapLegend`
- `FilterChip`
- `VerificationBadge`
- `FavoriteButton`
- `ExternalActionLink`
- `EmptyState`

## 6. Optional libraries

Keep dependencies minimal.

Recommended:

```text
next
react
react-dom
typescript
tailwindcss
leaflet
react-leaflet
lucide-react
clsx
vitest
@testing-library/react
@testing-library/user-event
@testing-library/jest-dom
jsdom
```

Optional:

```text
zod
playwright
```

Use `zod` only if Codex adds runtime validation for data files. It is useful but not mandatory.
