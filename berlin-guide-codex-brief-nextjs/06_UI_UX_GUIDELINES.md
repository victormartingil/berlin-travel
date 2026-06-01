# UI/UX Guidelines

## 1. Design direction

The web app should feel like a polished personal travel companion, not like a generic travel blog.

Style keywords:

- clean;
- calm;
- practical;
- mobile-first;
- map-friendly;
- modern;
- readable;
- warm but not childish.

## 2. Mobile-first layout

Most usage will happen on a phone while walking around Berlin.

Requirements:

- Cards must be readable on mobile.
- Buttons must be large enough to tap.
- Important actions must be visible without digging.
- Avoid dense tables.
- Prefer vertical sections and cards.
- Navigation must be easy with one hand.

## 3. Recommended navigation

Use a responsive layout:

- desktop: top navigation;
- mobile: bottom navigation or compact sticky menu.

Primary sections:

- Home
- Itinerary
- Map
- Food
- Nightlife
- More

The “More” section can link to:

- Transport
- Museums
- Alternative
- Art
- Practical
- Favorites

## 4. Card design

Every place/event card should include:

- name;
- category badge;
- neighbourhood;
- short description;
- price badge;
- verification badge;
- tags;
- actions.

Recommended actions:

- Open in Google Maps;
- Details/source;
- Favorite;
- Route if relevant.

## 5. Verification UX

Content reliability matters.

Use badges:

- `Verified`
- `Needs verification`
- `Unknown`
- `Outdated`

Do not hide unverified content, but make it clear.

## 6. Itinerary UX

The itinerary should be easy to scan:

- One card per day.
- Blocks inside each day.
- Icons or labels for morning/lunch/afternoon/evening/night.
- Alternatives in a visually separate section.
- Links to relevant places.

## 7. Map UX

The map should not dominate the whole app.

Good pattern:

- filters above or below map;
- map height around 60–70vh on map page;
- list of filtered places below map;
- category legend;
- selected marker popup.

On mobile, make sure the user can scroll away from the map easily.

## 8. Accessibility

Minimum requirements:

- semantic HTML;
- buttons for actions;
- links for external navigation;
- visible focus states;
- alt text for images if images are used;
- keyboard-accessible filters;
- meaningful page titles.

## 9. Visual hierarchy

Use clear hierarchy:

- Page title;
- short intro;
- filters/actions;
- main content cards.

Do not overload the home page.

## 10. Offline-ish usage

GitHub Pages is static, but not truly offline by default.

Still, make it useful:

- keep text content local;
- avoid loading too many remote assets;
- avoid requiring map to understand itinerary;
- add practical note encouraging users to save Google Maps offline areas separately.

PWA can be considered later, but it is not required for MVP.
