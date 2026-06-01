# Technical Architecture — Next.js Static Travel Guide

## 1. Architecture style

This is a static frontend application with clean separation between:

- routing/pages;
- UI components;
- domain types;
- local data;
- pure utility logic;
- client-side state.

There is no backend and no database.

## 2. Target stack

```text
Next.js
TypeScript
App Router
Tailwind CSS
Leaflet
OpenStreetMap
Vitest
React Testing Library
GitHub Actions
GitHub Pages
```

## 3. Static export constraints

The app must be compatible with:

```ts
output: 'export'
```

Therefore, avoid:

- API routes;
- route handlers used as runtime APIs;
- server actions;
- middleware;
- SSR runtime data fetching;
- server-only image optimization;
- private runtime environment variables;
- any code requiring a Node.js server after build.

Recommended `next.config.ts`:

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
```

If deploying under a GitHub Pages project site, Codex should consider `basePath` and `assetPrefix` if needed. Prefer documenting this clearly and keeping a simple config first.

## 4. Recommended folder structure

```text
app/
├── globals.css
├── layout.tsx
├── page.tsx
├── itinerary/page.tsx
├── map/page.tsx
├── food/page.tsx
├── transport/page.tsx
├── nightlife/page.tsx
├── museums/page.tsx
├── alternative/page.tsx
├── art/page.tsx
├── practical/page.tsx
└── favorites/page.tsx

src/
├── components/
│   ├── filters/
│   ├── itinerary/
│   ├── layout/
│   ├── map/
│   ├── places/
│   └── ui/
├── data/
├── domain/
├── hooks/
├── lib/
└── test/
```

## 5. Domain layer

The domain layer contains TypeScript types and enums only.

Examples:

- `Place`
- `PlaceCategory`
- `ItineraryDay`
- `ItineraryBlock`
- `TransportOption`
- `VerificationMetadata`
- `PriceLevel`
- `Neighbourhood`

No React code in domain files.

## 6. Data layer

Use local `.ts` files for data.

Examples:

```text
src/data/places.ts
src/data/itinerary.ts
src/data/categories.ts
src/data/transport.ts
src/data/settings.ts
```

Benefits:

- typed data;
- easy imports;
- easy refactoring;
- no runtime fetch required;
- compatible with static export.

## 7. Application logic

Put pure logic in `src/lib`.

Examples:

- `filterPlaces(places, filters)`;
- `buildGoogleMapsPlaceUrl(place)`;
- `buildGoogleMapsDirectionsUrl(origin, destination, mode)`;
- `groupItineraryByDate(days)`;
- `getPlacesByCategory(category)`;
- `sortPlacesByPriority`;
- `isVerified`.

These functions must be unit tested.

## 8. Client-side state

Use React state for filters and UI interactions.

Use `localStorage` for favorites.

Encapsulate localStorage in a hook, for example:

```text
src/hooks/useFavorites.ts
```

The hook must handle:

- server/client differences;
- missing localStorage;
- malformed stored values;
- add/remove/toggle;
- stable item IDs.

## 9. Map architecture

Leaflet depends on browser APIs. In Next.js, isolate map code into client components.

Recommended:

- `app/map/page.tsx` can render a client component.
- `src/components/map/TravelMap.tsx` must include `'use client'`.
- If using `react-leaflet`, import the map dynamically with `ssr: false` if necessary.

Map components:

```text
TravelMap.tsx
MapMarker.tsx
MapFilters.tsx
MapLegend.tsx
MapPopupContent.tsx
```

## 10. UI architecture

Reusable components:

```text
PlaceCard
PlaceGrid
CategoryBadge
VerificationBadge
PriceBadge
FavoriteButton
ExternalLinkButton
SectionHeader
DayPlan
ItineraryBlockCard
MobileNav
DesktopNav
```

Keep pages as composition layers. Avoid heavy logic in page files.

## 11. Testing architecture

Use tests for:

- pure logic in `src/lib`;
- critical hooks;
- reusable UI components;
- basic page smoke rendering if practical.

Avoid over-testing visual details.

## 12. Deployment architecture

GitHub Actions:

- install dependencies;
- run typecheck;
- run tests;
- build static Next.js export;
- upload artifact;
- deploy to GitHub Pages.

Use official GitHub Pages actions if possible.
