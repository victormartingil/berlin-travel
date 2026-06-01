# Prompt: Alternative Place Expansion

Use this prompt when expanding a city guide with alternative, independent, squatted/autonomous, street-art, live-music, vegetarian/vegan and low-budget places.

## Goal
Find only worthwhile additions that fit the trip style. Prefer fewer strong places over many generic tourist entries, but include enough backups for improvisation by neighbourhood and weather/energy level.

## Research Scope
For each section, search official websites first, then institutional guides, then specialist/local guides, then Reddit/social/event aggregators only as discovery signals.

Sections to research:
- Friend/local recommendations and their nearby clusters.
- Alternative culture: squats/autonomous spaces, independent art houses, DIY venues, leftfield cultural centres.
- Street art and urban texture: outdoor galleries, courtyards, mural corridors, industrial sites.
- Live music: indie, punk, rock, jazz, bass, small venues, non-techno nights.
- Nightlife: clubs, open airs, sunset bars, soft-night options, RA/Eventbrite/official event calendars.
- Food: vegetarian/vegan restaurants by neighbourhood and moment, not just near accommodation.
- Practical food: vegan supermarkets, organic supermarkets, picnic/snack stops.
- Rain and tired-day backups.

For Berlin specifically, always include friend/local-style places in the search seed when relevant:
- Tempelhofer Feld, Teufelsberg, Siegessaeule, YAAM, Mauerpark, RAW-Gelaende and Koepi-style autonomous/DIY references.
- Similar clusters: open-air culture, autonomous spaces, punk/DIY venues, street-art courtyards, industrial cultural sites, sunset/chill places, and not-only-techno live music.

## Selection Rules
Add a place only if at least one is true:
- It is explicitly recommended by a trusted local/friend/source.
- It is repeatedly recommended by alternative/local guides and has a clear use case.
- It fills a real itinerary gap by area, weather, budget, energy or time of day.
- It is a venue worth checking for events during trip dates.

Reject or downgrade if:
- It is generic tourism with no fit to the trip.
- It has unclear location/status and no official or institutional source.
- It is a private/autonomous/squatted space where visiting would be intrusive unless there is an event.
- It is mainly hype and lacks a concrete use case.

When deciding whether to add more places, think by real travel use case:
- "We are already in this neighbourhood and need a strong nearby backup."
- "It is raining and this gives us a good indoor alternative."
- "We are tired and need a low-effort plan."
- "We want a more alternative/local evening than the default club list."
- "We need vegetarian/vegan food outside the accommodation area."
- "A friend-style Berlin day needs one more outdoor/chill/industrial stop."

## Required Data For Every Place
- `id`, `name`, `category`, `neighbourhood`, `address`, `coordinates` when mappable.
- `priority`: `essential`, `high`, `medium`, or `optional`.
- `description`, `story`, `whyGo`, `localSignals` where useful.
- `openingHours`: exact where possible; event-driven guidance where not.
- `estimatedDuration`, `priceLevel`, `tags`.
- `officialUrl` or `sourceUrl`, `lastVerifiedAt`, `verification`.
- `googleMapsUrl` when a local/friend provided a Maps link.
- For food: `mealTypes`, `areaUseCase`, `diet`.
- For friend/local tips: `friendRecommended` and `friendNote`.

For each new place, also decide:
- Internal route fit: which day or section should mention it.
- Nearby combinations: 1-3 specific places from the existing dataset.
- Best slot: morning, lunch, afternoon, sunset, dinner, late night or rainy backup.
- Whether the place deserves a map icon/filter priority.

## Events
For the trip dates, search:
- Resident Advisor for electronic music and open airs.
- Official venue calendars for SO36, Lido, Gretchen, Badehaus, Cassiopeia, Urban Spree, ACUD, YAAM, about blank, Kater, Else, AEDEN, Tresor, Sisyphos.
- Stressfaktor or similar DIY listings for punk/autonomous spaces.

Represent uncertain event leads as `needs_verification`, not `verified`.

For each trip day, build an event shortlist before editing data:
- Search by exact date, venue and city, for example `site:ra.co/events Berlin 13 June 2026 Else`, `site:lido-berlin.de 15.06.2026`, and the venue's own calendar.
- Capture concrete details only when the source states them: date, start/end time, venue, price, age limit, cash/card rule, lineup, genre, ticket URL and poster/flyer URL.
- Add `posterUrl` only as a link to the original flyer/source page unless the image license or permission is clear.
- Prefer official venue pages for concerts and RA/official promoter pages for club nights; use Reddit/social posts only as discovery signals.
- If a venue has no confirmed listing for the trip dates, keep it as a place recommendation, not a fake event.
- In the itinerary, place confirmed events under the relevant day and explain why they fit the route, energy level and neighbourhood.
- Do not overload the route with events: surface the best option plus 1-2 realistic alternatives per night.

## Content Quality
Each ficha should answer:
- Why this place fits this specific trip.
- Best time to go.
- What to combine it with nearby.
- Whether it is rain-friendly, tired-day-friendly, low-budget or destination-worthy.
- Any etiquette/safety note, especially for autonomous spaces.

Copy must be human and specific:
- Avoid generic tourist-board language.
- Avoid repeating the same sentence template across places.
- In Spanish, write natural Spain Spanish, not literal English.
- In English, keep it concise and travel-useful.
- If exact opening hours vary, explain the useful operational reality and tell where to verify it.

## Implementation Rules
- When a section, itinerary item or recommendation mentions a stored place, link the visible place name to `/places/{id}/`.
- Keep Google Maps as a separate navigation action, not the only destination for a mention.
- If adding aliases or spelling variants, update the link-matching logic and tests.
- Update filters only when the new content gives users a real decision lever.
- Re-run data validation tests after adding places/events/media.
- If new places/events are added to an itinerary day, verify the daily route map still makes spatial sense.
- Use `placeId` and `eventId` consistently so daily maps can resolve numbered stops automatically.
- When a new place or event enters the itinerary, make sure the rendered route explains briefly what the stop is. Names like Bethanien, YAAM, OXI or RAW-Gelaende are not self-explanatory for travellers.
- Keep route sections organised around travel decisions and flow: start, main block, transition, selected night and backups. Avoid turning the route into a rigid meal-first schedule unless food is the actual plan.
- Keep alternatives out of the main daily route unless the itinerary explicitly promotes them to the selected plan.

## Image Policy
Use embedded images only if source license is clear or image is owned/authorized. Google Images may be used for discovery only; final source must be original page with license/permission.
