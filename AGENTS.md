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
6. Atomic commit.

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

## AI Content Workflows
Reusable prompts live in `docs/ai/prompts/`.

Use them when adding Berlin content, expanding a section, or adapting the project to another destination:
- `docs/ai/prompts/alternative-place-expansion.md`: intensive research workflow for alternative/local/friend-style places, live music, vegan food, street art, autonomous spaces and nightlife.
- `docs/ai/prompts/place-fact-check.md`: one-by-one enrichment and verification checklist for existing place fichas.
- `docs/ai/prompts/new-destination-seed.md`: seed workflow for reusing this architecture for another city.

Content rules:
- Search current web sources before adding modern venues, events, restaurants or opening hours.
- Prefer official/institutional sources for verified facts.
- Use social media, Reddit, RA, Google/Maps and local guides as discovery signals, then verify via original source when possible.
- Represent dynamic venues/events as `needs_verification`.
- Never leave visible placeholder copy in fichas. If exact hours are variable, provide useful event-driven guidance and the source to check.
- For autonomous/squatted spaces, write respectful guidance: event-only when appropriate, no intrusive tourism, no treating residential/political projects as attractions.
- Embedded images require a clear license, ownership or permission. Google Images is discovery only, not a license source.
