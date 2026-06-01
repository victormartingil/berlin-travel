# Prompt: New Destination Seed

Use this when adapting the guide architecture to another city.

Inputs:
- Trip dates and accommodation area.
- Traveller style and deal-breakers.
- Friend/local tips.
- Food preferences.
- Nightlife/music preferences.
- Weather and budget constraints.

Steps:
1. Build core models from the Berlin app: places, events, itinerary, media, validation.
2. Research official transport from airport/station first.
3. Add 8-12 essentials, then 10-20 style-specific places.
4. Build itinerary by day with energy pacing, rain/tired alternatives and food backups.
5. Add map filters and friend/local picks.
6. Add media only with clear license/permission.
7. Add internal detail pages for places and link itinerary mentions to those fichas.
8. Configure the correct static hosting base path before deployment.
9. Run lint/typecheck/tests/build and review.

Reuse these Berlin project prompts as implementation guardrails:
- `alternative-place-expansion.md` for intensive local/alternative/content research.
- `place-fact-check.md` for one-by-one ficha enrichment.
- `static-site-implementation-review.md` for static export, route, link, map, i18n and deployment checks.

Destination setup checklist:
- Decide the production base path at the beginning.
- Add a route audit equivalent to catch root-only broken links.
- Keep Google Maps as external navigation; keep internal fichas as the main detail experience.
- Store content in typed data files, not hardcoded UI.
- Treat event listings and opening hours as time-sensitive unless verified from current official sources.
