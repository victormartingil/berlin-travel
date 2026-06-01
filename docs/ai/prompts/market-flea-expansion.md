# Prompt: Market And Flea-Market Expansion

Use this prompt when expanding markets, flea markets, rastros, food markets, antique markets or weekend shopping routes for a destination.

## Objective
Add only markets that are useful for the traveller's real itinerary: strong local reputation, good fit by day/time/neighbourhood, clear opening pattern and a reason to choose it over other options.

## Research Workflow
1. Search official tourism/city pages first for opening days, times, address and public-transport fit.
2. Check the market's official site or organiser page when available.
3. Use local guides, Reddit, Google Maps and blogs only as discovery/quality signals, not as the sole source for factual hours.
4. Classify each candidate by use case: flea, antiques, food, craft/art, vintage, Saturday, Sunday, rain-friendly, near-base, destination-worthy.
5. Reject markets that duplicate an existing option unless they solve a different travel problem.
6. Verify whether the market is realistic for the trip dates. Weekend-only markets should not be recommended on weekdays except as future/backup context.

## Selection Criteria
Prefer markets that match at least one of these:
- Friend-recommended or directly requested by the user.
- Top-tier official/local-guide recommendation.
- Strong alternative to an overloaded tourist market.
- Good neighbourhood fit with an existing route day.
- Useful fallback for weather, low budget, vintage/records/books, antiques or casual food.

## Data Requirements
For every accepted market add:
- `category: "market"`
- `tags`: include at least one of `flea-market`, `flea`, `antiques`, `food`, `craft`, `saturday`, `sunday` where applicable.
- `openingHours` in ES/EN, with source-backed dates/times.
- `description`, `story`, `whyGo` or `localSignals` explaining why it belongs in this guide.
- `sourceUrl` or `officialUrl`, `lastVerifiedAt`, and verification metadata.
- `googleMapsQuery` when it helps route users to the named place rather than raw coordinates.

## UX Rules
- Add or update a dedicated Markets/Flea Markets section if market count becomes meaningful.
- Provide filters for market type and day: flea/antiques/food/craft/Saturday/Sunday.
- Do not hide markets only under food. Flea markets and antique markets are a separate travel use case.
- If a market enters the itinerary, link it through `placeId` so detail pages and daily maps work.

## Itinerary Rules
- Keep one primary market plan per day; add alternatives when they solve a clear decision.
- Explain tradeoffs: Mauerpark for Sunday chaos/karaoke, Arkonaplatz for calmer browsing, Strasse des 17. Juni for antiques/craft, Ostbahnhof for collectors.
- Do not send the traveller across the city for a medium market unless it pairs with another strong nearby plan.

## Review Checklist
- Factual hours are source-backed and dated.
- Market tags make filters work.
- New markets appear on map and `/markets/`.
- Itinerary maps still make spatial sense after adding market alternatives.
- Static export and GitHub Pages route audit pass.
