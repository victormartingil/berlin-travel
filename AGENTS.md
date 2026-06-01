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
