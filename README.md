# Berlin Travel Guide

Static Next.js travel guide for a Berlin trip (June 10-16, 2026), optimized for GitHub Pages.

## Features
- Next.js App Router + TypeScript + Tailwind CSS.
- Static export (`output: 'export'`) ready for GitHub Pages.
- Pages: Home, Itinerary, Map, Food, Transport, Nightlife, Museums, Alternative, Art, Practical, Favorites.
- Leaflet + OpenStreetMap embedded map (client-only).
- Google Maps deep links for places/routes.
- Data-first architecture (`src/data`) with typed domain models (`src/domain`).
- Verification metadata for real-world content.
- Favorites persisted in `localStorage`.
- Language switch ES/EN (client-side).

## Project Structure
- `src/app`: routes/pages.
- `src/components`: reusable UI and feature components.
- `src/domain`: TypeScript domain contracts.
- `src/data`: local typed content.
- `src/lib`: pure utilities (filters, maps, i18n helpers).
- `src/hooks`: client hooks (`useFavorites`).
- `src/test`: unit/component tests.

## Local Run
```bash
npm install
npm run dev
```

## Quality Gates
```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## Content Editing
- Places: `src/data/places.ts`
- Itinerary: `src/data/itinerary.ts`
- Transport notes: `src/data/transport.ts`
- Trip settings: `src/data/settings.ts`

Keep verification status updated for each real-world item:
- `verified`
- `needs_verification`
- `outdated`
- `unknown`

## i18n (ES/EN)
Current implementation uses a client-side locale switch persisted in localStorage.
- Locale provider: `src/components/i18n/LocaleProvider.tsx`
- Switcher: `src/components/i18n/LanguageSwitch.tsx`
- Localized fields in data use `{ es, en }`.

## GitHub Pages Deploy
Workflow: `.github/workflows/deploy.yml`

It runs:
1. `npm ci`
2. `npm run lint`
3. `npm run typecheck`
4. `npm run test`
5. `npm run build`
6. Upload `out/` and deploy to Pages

If deploying as project site (`https://<user>.github.io/<repo>/`), configure `basePath/assetPrefix` in `next.config.ts` if needed.
