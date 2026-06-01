# Codex Review Checklist

Use this checklist after Codex generates or modifies the project.

## Static export compatibility

- [ ] `next.config.ts` has `output: 'export'`.
- [ ] No API routes are used.
- [ ] No server actions are used.
- [ ] No middleware is used.
- [ ] No runtime server dependencies are required.
- [ ] Images are unoptimized or remote image usage is avoided.
- [ ] `npm run build` creates static output.

## Architecture

- [ ] Domain types are in `src/domain`.
- [ ] Data is in `src/data`.
- [ ] UI components are in `src/components`.
- [ ] Pure logic is in `src/lib`.
- [ ] Hooks are in `src/hooks`.
- [ ] Pages compose components but do not contain heavy logic.

## Data quality

- [ ] Every place has a stable ID.
- [ ] Every real-world item has verification metadata.
- [ ] Unverified items are not marked as verified.
- [ ] Coordinates are optional but required for map markers.
- [ ] External links are stored in data, not scattered in UI.

## Map

- [ ] Leaflet map renders only on client.
- [ ] App does not use Google Maps API.
- [ ] Markers are filtered by category.
- [ ] Popups include key actions.
- [ ] App remains useful without the map.

## UX

- [ ] Mobile navigation is practical.
- [ ] Cards are readable on phone.
- [ ] Buttons are easy to tap.
- [ ] Verification status is visible.
- [ ] Empty states exist.
- [ ] External links open safely.

## Testing

- [ ] `npm run typecheck` passes.
- [ ] `npm run test` passes.
- [ ] Filter logic is tested.
- [ ] Google Maps link generation is tested.
- [ ] Favorites logic is tested.
- [ ] Critical components have basic tests.

## Deployment

- [ ] GitHub Actions workflow exists.
- [ ] Workflow runs lint/typecheck/tests/build.
- [ ] Workflow uploads `out/`.
- [ ] README explains GitHub Pages setup.
