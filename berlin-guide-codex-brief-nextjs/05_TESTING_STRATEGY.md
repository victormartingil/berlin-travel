# Testing Strategy

## 1. Goal

The app is simple, but it should be reliable. Tests should focus on logic that can easily break:

- filters;
- map links;
- localStorage favorites;
- itinerary grouping;
- critical UI components.

Do not over-test static content.

## 2. Recommended tools

```text
Vitest
React Testing Library
Testing Library user-event
jsdom
Playwright optional
```

## 3. Test pyramid

### Unit tests

Most important.

Test pure functions in `src/lib`:

- `filterPlaces`
- `buildGoogleMapsPlaceUrl`
- `buildGoogleMapsDirectionsUrl`
- `toggleFavorite`
- `readFavoritesFromStorage`
- `groupItineraryByDate`
- `getPlacesByCategory`

### Component tests

Test reusable UI behavior:

- `PlaceCard`
- `FavoriteButton`
- `PlaceFilters`
- `VerificationBadge`
- `DayPlan`
- `MobileNav`

### Smoke/e2e tests

Optional but recommended with Playwright:

- Home renders.
- Main routes render.
- Navigation works.
- Map page loads without crashing.

## 4. Example test cases

### Filter logic

```text
Given places across multiple categories
When filtering by vegetarian restaurant
Then only vegetarian restaurant places are returned
```

```text
Given places with different verification statuses
When filtering by verified
Then only verified places are returned
```

### Google Maps links

```text
Given a place with coordinates
When building a Google Maps place URL
Then the generated URL contains the coordinates
```

```text
Given origin and destination coordinates
When building a transit directions URL
Then the URL includes travelmode=transit
```

### Favorites

```text
Given no stored favorites
When adding a favorite
Then localStorage contains the item id
```

```text
Given a malformed localStorage value
When reading favorites
Then an empty list is returned safely
```

### Components

```text
Given a place card
Then it displays the place name, category and verification badge
```

```text
Given a favorite button
When clicked
Then it calls the expected toggle handler
```

## 5. CI quality gates

GitHub Actions should run:

```bash
npm ci
npm run lint
npm run typecheck
npm run test
npm run build
```

If Playwright is added:

```bash
npm run test:e2e
```

## 6. What not to test deeply

Avoid excessive tests for:

- Tailwind class names;
- exact card layout;
- static wording;
- Leaflet internals;
- third-party map behavior.

## 7. Testing map components

Leaflet can be awkward in jsdom.

Recommended approach:

- Keep map URL/filter/category logic outside the map component.
- Unit test that logic separately.
- Smoke test map component only enough to ensure it renders wrapper UI.
- Use dynamic import/client-only rendering where necessary.
