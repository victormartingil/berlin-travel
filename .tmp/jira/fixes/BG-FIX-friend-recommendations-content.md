# BG-FIX-friend-recommendations-content

## Fixes Applied
- Kept the existing `friendRecommended` model and UI labels.
- Added or marked recommended fichas for the submitted list where useful.
- Added generated local visual fallbacks for new cards without clearly reusable licensed photos.
- Updated validation expectations for the expanded friend recommendation set.
- Added Resident Advisor and Exberliner/The Berliner as agenda/current-culture references.

## Gates
- `npm run lint` passed.
- `npm run typecheck` passed.
- `npm run test` passed.
- `npm run build` passed.
- `GITHUB_PAGES=true npm run build` passed.
- Route export audit passed: no root-only `/places/` links in `out`, and itinerary links resolve under `/berlin-travel/places/`.
