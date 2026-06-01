# Product Requirements — Berlin Travel Guide Web App

## 1. Goal

Build a personal, mobile-first Berlin travel guide web app for a couple travelling to Berlin from **10 June 2026 to 16 June 2026**.

The app must help them plan and navigate the trip with:

- day-by-day itinerary;
- interactive map with pins;
- vegetarian food options;
- transport links;
- museums;
- alternative Berlin;
- art and culture;
- nightlife and electronic music;
- practical information;
- favorites.

The app should be publishable for free and easy to share privately by link.

## 2. Users

Primary users:

- Couple in their late 30s.
- Vegetarian.
- Staying in Kreuzberg near Moritzplatz.
- Interested in walking, neighbourhoods, food, art, culture, nightlife and local experiences.
- Medium budget.
- Prefer authenticity, quality and useful planning over generic tourist content.

## 3. Primary use cases

### Before the trip

- Review the itinerary.
- Compare possible places.
- Mark favorites.
- Check transport options.
- Decide which restaurants/events/museums are worth booking.

### During the trip

- Open the app on mobile.
- Check today’s plan.
- Find nearby restaurants or cafés.
- Open a location in Google Maps.
- Check public transport links.
- Review alternatives if tired or if weather changes.
- Quickly access saved favorites.

## 4. Functional requirements

### Home

- Show trip summary.
- Show dates and accommodation.
- Show quick links to main sections.
- Show a short “today-style” travel philosophy.
- Show featured places or next itinerary items.

### Itinerary

- Show one page with all trip days.
- Each day must support blocks:
  - morning;
  - lunch;
  - afternoon;
  - dinner;
  - evening;
  - night;
  - alternatives.
- Each itinerary item may reference a place, transport link, source or note.
- Items must show estimated duration and area/neighbourhood when available.

### Map

- Show interactive map centered around Berlin/Kreuzberg.
- Show accommodation marker.
- Show categorized markers.
- Allow filtering by category.
- Marker popup must include:
  - name;
  - category;
  - neighbourhood;
  - short note;
  - open in Google Maps link;
  - favorite action if feasible.

### Food

- Show vegetarian restaurants.
- Show vegetarian-friendly restaurants.
- Show cafés.
- Show bakeries.
- Show supermarkets / organic shops.
- Allow filtering by category, neighbourhood, price and verification.

### Transport

- Explain local transport strategy.
- Include airport arrival/departure notes.
- Include nearest useful stations from accommodation.
- Include links to BVG/VBB/Google Maps/Citymapper.
- Include bike rental section.
- Include walking strategy.

### Nightlife

- Show clubs, venues, bars and events.
- Show electronic music style where known.
- Prioritize melodic techno when relevant, but do not limit the guide only to melodic techno.
- Include source links to RA, venue pages or official event pages.
- Include practical notes.

### Museums

- Show museums and cultural spaces.
- Show opening-hours field.
- Show ticket link.
- Show estimated visit duration.
- Show rainy-day suitability.

### Alternative Berlin

- Street art.
- independent shops;
- markets;
- walks;
- local/alternative places;
- less obvious attractions.

### Art & Culture

- Galleries.
- photography spots;
- bookshops;
- record/music shops;
- cultural recommendations.

### Practical Info

- Travel checklist.
- Packing notes.
- Useful links.
- Reservations checklist.
- Emergency notes.
- Offline usage tips.

### Favorites

- User can mark/unmark places and events.
- Favorites are persisted in browser localStorage.
- Favorites page shows saved items.

## 5. Non-functional requirements

- Must be statically deployable.
- Must work on GitHub Pages.
- Must be fast on mobile.
- Must avoid paid APIs.
- Must be maintainable and easy to update.
- Must not depend on backend availability.
- Must be accessible enough for practical mobile usage.
- Must have tests for critical logic.

## 6. Out of scope for MVP

- User accounts.
- Multi-user synchronization.
- Backend database.
- Real-time event scraping.
- Automatic restaurant/event updates.
- Payment integrations.
- Private maps requiring API keys.
- Complex CMS.

## 7. Content reliability

All travel content must include a verification status.

Allowed statuses:

- `verified`
- `needs_verification`
- `outdated`
- `unknown`

The app must visually indicate when a place or event needs verification.
