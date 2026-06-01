# AGENTS.md — Berlin Travel Guide (Next.js Static, GitHub Pages)

## Objective
Build a personal Berlin travel guide (June 10-16, 2026) with Next.js App Router + TypeScript + Tailwind + Leaflet/OSM as a fully static site for GitHub Pages.
Support ES-ES and EN incrementally, fully static-compatible.

## Non-negotiable constraints
- `output: 'export'` in Next config.
- No API routes, server actions, middleware, runtime server dependencies.
- No backend/database/private runtime secrets.
- Embedded map: Leaflet + OpenStreetMap.
- Google Maps/BVG/VBB/Citymapper as external links only.
- Real-world content must include verification metadata.

## Mandatory flow per task
1. Implement ticket in branch.
2. Run local gates: `lint`, `typecheck`, `test`, `build`.
3. External review ticket (`BG-REV-*`).
4. External fix ticket(s) (`BG-FIX-*`) for applicable findings.
5. Re-run gates.
6. Run GitHub Pages route/export audit when routing, links, assets or deployment changed.
7. Atomic commit.

## Jira naming convention (English)
- Epics: `BG-EPIC-*`
- Stories: `BG-STORY-*`
- Tasks: `BG-TASK-*`
- Reviews: `BG-REV-*`
- Fixes: `BG-FIX-*`

## Local planning workspace
Use `.tmp/jira/` as local source of truth for generated plan artifacts.

## Quality gates
- Static build succeeds.
- Acceptance criteria met.
- Relevant tests added/updated.
- Review and fixes recorded.
- For GitHub Pages changes, production base path is validated.
- For content changes, visible copy is complete in ES and EN.
- For itinerary changes, place mentions link to internal fichas where possible.

## Runtime And Deployment Baseline
- Recommended runtime: Node `24`, npm `11`.
- Keep `packageManager` and `engines` aligned with the GitHub Actions workflow.
- GitHub Actions should use current non-deprecated Pages actions and `actions/setup-node` with Node `24`.
- The app is a GitHub Pages project site at `/berlin-travel`, not a domain-root site.
- Use `GITHUB_PAGES=true npm run build` to validate project-site export behavior.
- Never hardcode root-only links such as `/places/foo/` in generated static HTML for production. Next `Link` can use app-relative hrefs, but exported HTML must resolve to `/berlin-travel/...`.
- Use `src/lib/paths.ts` / `appPath()` for imperative DOM links, map popups, Leaflet-generated anchors and any link created outside normal Next routing.
- Before commit when links changed, run:
  - `GITHUB_PAGES=true npm run build`
  - `! rg 'href="/places/' out`
  - `rg -o 'href="/berlin-travel/places/[^"]+"' out/itinerary/index.html | head`

## AI Content Workflows
Reusable prompts live in `docs/ai/prompts/`.

Use them when adding Berlin content, expanding a section, or adapting the project to another destination:
- `docs/ai/prompts/alternative-place-expansion.md`: intensive research workflow for alternative/local/friend-style places, live music, vegan food, street art, autonomous spaces and nightlife.
- `docs/ai/prompts/place-fact-check.md`: one-by-one enrichment and verification checklist for existing place fichas.
- `docs/ai/prompts/static-site-implementation-review.md`: implementation/review workflow for GitHub Pages, internal links, i18n, map popups, tests and production readiness.
- `docs/ai/prompts/new-destination-seed.md`: seed workflow for reusing this architecture for another city.

Content rules:
- Search current web sources before adding modern venues, events, restaurants or opening hours.
- Prefer official/institutional sources for verified facts.
- Use social media, Reddit, RA, Google/Maps and local guides as discovery signals, then verify via original source when possible.
- Represent dynamic venues/events as `needs_verification`.
- Never leave visible placeholder copy in fichas. If exact hours are variable, provide useful event-driven guidance and the source to check.
- Write itinerary and ficha copy as human travel guidance: concrete, opinionated, specific to the route, and useful in both Spanish and English.
- For dated events, capture exact time, venue, price, lineup, ticket/source URL and flyer/source link when the original source provides them.
- For autonomous/squatted spaces, write respectful guidance: event-only when appropriate, no intrusive tourism, no treating residential/political projects as attractions.
- Embedded images require a clear license, ownership or permission. Google Images is discovery only, not a license source.

## Itinerary And Internal Linking Rules
- The itinerary is a route guide first. Food is useful support, not the main structure unless the block is explicitly about food.
- When itinerary/recommendation copy names a place that exists in `src/data/places.ts`, make that mention link to `/places/{id}/`.
- Keep Google Maps links as secondary actions for navigation. The primary in-app detail path is the internal ficha.
- Add aliases for common spelling variants when needed, for example accent differences, shortened venue names or friend-provided names.
- Add or update regression tests when automatic linking logic changes.
- For every relevant itinerary item, prefer explicit `placeId` or `eventId` over plain text only.

## Content Depth Standard
- Every ficha should feel like a useful human travel note, not database filler.
- Prefer concrete statements: best time, route fit, nearby combinations, realistic duration, price/ticket expectations, rain/tired suitability, booking needs and etiquette.
- Do not leave vague placeholders such as "check official source before going" as the only opening-hours content. If exact hours are dynamic, write the operational pattern and link the source to verify.
- For events on trip dates, store concrete details only when sourced: date, start time, end time when available, venue, lineup, style, price, ticket URL, source URL and poster/flyer source URL.
- Do not add places just to increase count. Add more only when they are top-tier, repeatedly recommended, friend-recommended, or clearly useful as a backup by area/weather/energy.

## Commit And Push Checklist
- Run `npm run lint && npm run typecheck && npm run test && npm run build`.
- If GitHub Pages behavior may be affected, also run `GITHUB_PAGES=true npm run build` and the route audit commands above.
- Use small commits by purpose, for example content expansion, map UX, route-link fix, deployment fix.
- After pushing to `main`, verify the GitHub Actions run and check at least one affected production URL with `curl -I -L`.
