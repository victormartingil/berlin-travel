# Prompt: Static Site Implementation Review

Use this prompt before committing changes that affect routing, deployment, maps, itinerary copy, place links, media, i18n or data validation.

## Goal
Leave the project production-ready for GitHub Pages, with no broken internal routes, no root-only project-site links, no incomplete visible content, and enough tests to prevent regressions.

## Context
This app is a fully static Next.js App Router site deployed as a GitHub Pages project site:
- Production URL: `https://victormartingil.github.io/berlin-travel/`.
- Production base path: `/berlin-travel`.
- Static export is required.
- No backend, API routes, server actions, runtime secrets or paid APIs.
- ES is the default language and EN is the alternative language.

## Runtime Baseline
Use the maintained Node/npm baseline unless there is a strong reason to change it:
- Node `24`.
- npm `11`.
- `package.json` should declare matching `packageManager` and `engines`.
- GitHub Actions should use non-deprecated official actions and `actions/setup-node` with Node `24`.

If changing Node/npm/actions:
1. Update `.github/workflows/deploy.yml`.
2. Update `package.json`.
3. Regenerate `package-lock.json` with the selected npm version.
4. Run local gates and watch the remote GitHub Actions run after push.

## GitHub Pages Route Audit
Run this whenever internal links, `next.config.ts`, map popups, asset paths or deployment files change:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
GITHUB_PAGES=true npm run build
! rg 'href="/places/' out
rg -o 'href="/berlin-travel/places/[^"]+"' out/itinerary/index.html | head
```

Expected result:
- No exported `href="/places/...` links.
- Internal place links in exported HTML include `/berlin-travel/places/...`.
- Dynamic place pages appear in the build output under `/places/[id]`.

## Internal Link Rules
When route or recommendation copy mentions a place stored in `src/data/places.ts`:
- Link the visible name to `/places/{id}/`.
- Keep Google Maps as a secondary action for navigation.
- Prefer explicit `placeId` or `eventId` on itinerary data.
- Support aliases for common variants, accents and shortened names.
- Add or update tests for automatic linking logic.

Examples:
- `RAW-Gelaende` -> `/places/raw-gelaende/`.
- `REWE voll pflanzlich` -> `/places/rewe-voll-pflanzlich/`.
- `AEDEN` -> `/places/aeden/`.

For links created outside normal Next rendering, such as Leaflet popup DOM nodes, use `appPath()` from `src/lib/paths.ts`.

## Content Review
Before committing content changes, scan the visible app for weak copy:
- No standalone placeholders like "Horario no fijado" or "revisar fuente oficial antes de ir".
- No generic AI-sounding filler.
- Spanish and English versions both read naturally.
- Itinerary focuses on the best plans and pacing, not only food.
- Each ficha explains why the place fits this trip, when to go, what to combine nearby and what to watch out for.
- Events include sourced date, time, venue, price, lineup/style and ticket/source URLs when available.

## Map Review
When map code or data changes:
- Markers must appear on initial load without toggling filters.
- Popups must use safe DOM creation, not interpolated HTML with untrusted data.
- Popup thumbnail links must resolve correctly under GitHub Pages.
- Internal detail links inside popups must use `appPath()`.
- Google Maps links should point to the specific place when possible, not just raw coordinates.
- Mappable categories should have representative icons and test coverage.
- Itinerary day maps should derive stops from structured `placeId`/`eventId` data, not duplicated hand-written coordinates.
- Daily maps should show numbered markers, draw the main route line, exclude alternatives from the main route, and resolve event stops to their venue.
- Daily route maps must be described as orientation aids; do not imply exact walking/transit timing unless sourced.
- Add tests for route-stop extraction and Leaflet marker/polyline rendering when daily maps change.

## Media Review
For embedded local images:
- Store under `public/images/places/`.
- Add metadata in `src/data/placeMedia.ts`.
- Validate author, license, license URL, source URL, alt text and place reference.
- Do not treat Google Images or Google Maps as a license. They are discovery tools only unless the original source license/permission is clear.

## i18n Review
For visible UI or content changes:
- Add ES and EN text together.
- Avoid literal translations.
- Spanish should sound like natural Spain Spanish.
- English should be concise and useful for travel decisions.
- Run tests that cover i18n key coverage when relevant.

## Final Commit Checklist
Before commit:
1. Review `git diff`.
2. Run local gates.
3. Run GitHub Pages route audit if relevant.
4. Add or update regression tests.
5. Commit with a focused message.

After push to `main`:
1. Run `gh run list --repo victormartingil/berlin-travel --limit 5`.
2. Watch the new deploy with `gh run watch <run-id> --repo victormartingil/berlin-travel --exit-status`.
3. Verify at least one affected production URL with `curl -I -L`.
