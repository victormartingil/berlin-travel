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

## Events
For the trip dates, search:
- Resident Advisor for electronic music and open airs.
- Official venue calendars for SO36, Lido, Gretchen, Badehaus, Cassiopeia, Urban Spree, ACUD, YAAM, about blank, Kater, Else, AEDEN, Tresor, Sisyphos.
- Stressfaktor or similar DIY listings for punk/autonomous spaces.

Represent uncertain event leads as `needs_verification`, not `verified`.

## Content Quality
Each ficha should answer:
- Why this place fits this specific trip.
- Best time to go.
- What to combine it with nearby.
- Whether it is rain-friendly, tired-day-friendly, low-budget or destination-worthy.
- Any etiquette/safety note, especially for autonomous spaces.

## Image Policy
Use embedded images only if source license is clear or image is owned/authorized. Google Images may be used for discovery only; final source must be original page with license/permission.
