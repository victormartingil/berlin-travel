# Prompt: Place Fact Check And Enrichment

Given a list of existing `Place` entries, review them one by one.

For each place:
1. Open official website or most authoritative source.
2. Verify address, opening hours, ticket/reservation links and current status.
3. Search Google/web for recent local-guide mentions and user signals, but do not copy reviews verbatim.
4. Improve `story`, `whyGo`, `localSignals`, `openingHours` and `practicalNotes`.
5. Mark `verified` only when official/institutional source supports the fact.
6. Mark `needs_verification` for dynamic event/venue info.
7. Add or update `googleMapsUrl` if a precise Maps link is known.
8. Add a visual card image when possible. Use Wikimedia Commons or official/press media only when license/permission is clear, store it in `public/images/places/{place-id}-NN.jpg`, and add metadata to `src/data/placeMedia.ts`.
9. Reject ambiguous images: wrong city, logos used as photos, low-quality screenshots, social posts without permission, or Google Images results without a clear license/source.
10. If ratings are requested, use a dated snapshot from Google Places API (`rating`, `userRatingCount`, `googleMapsUri`) via `npm run update:place-ratings`. Do not scrape Google Maps or copy star values from search snippets.
11. For autonomous/squatted spaces, add etiquette: exterior/event-only/respect residents.
12. If the place is an event venue, check the exact trip dates and enrich related `NightlifeEvent` entries with price, lineup, start/end time, ticket URL and `posterUrl` when available from the original source.
13. Do not write generic copy. Rewrite descriptions so they sound like a human travel note: specific, useful, and honest about when the place is or is not worth the detour.

For every ficha, explicitly check whether these fields are complete and useful:
- `description`: one-sentence practical positioning, not generic marketing.
- `story`: what makes it interesting for this specific guide.
- `whyGo`: concrete reason to spend time there.
- `localSignals`: what alternative/local/user sources suggest, paraphrased and not copied.
- `openingHours`: exact sourced hours where possible; otherwise a useful dynamic-hours explanation.
- `estimatedDuration`: realistic visit length.
- `priceLevel`, `ticketUrl`, `reservationUrl`, `officialUrl`, `sourceUrl`, `lastVerifiedAt`.
- `practicalNotes`: booking, cash/card, queue, weather, etiquette, noise, late-night or safety notes.
- `photos` or `placeMedia`: local embedded image only when license/permission is clear; otherwise source link only.
- Small cards: verify that the place shows either a real embedded thumbnail or a useful category visual fallback.
- `placeRatings`: optional Google Places snapshot with `rating`, `reviewCount`, `googlePlaceId`/`googleMapsUrl`, and `lastVerifiedAt`; omit if not verified.
- Spanish copy: preserve natural accents and readable phrasing. Search for common degraded strings such as `Mas`, `Menu movil`, `Practico`, `Senales`, `resenas`, `rapido`, `desvio`, `verificacion` before finishing.

For itinerary and recommendation references:
- Search `src/data/itinerary.ts`, page copy and recommendation components for this place name and aliases.
- If the place is mentioned in visible copy, link the mention to `/places/{id}/`.
- Prefer explicit `placeId` or `eventId` on itinerary items.
- If aliases are needed, update the linking helper and add a regression test.

For opening hours:
- Do not leave "Horario no fijado" or "revisar fuente oficial antes de ir" as standalone content.
- If current hours cannot be reliably fixed, write a useful note such as "works as an event-driven venue; check the calendar before choosing the night" and keep `needs_verification`.
- If hours are sourced from an official page, include the source and update `lastVerifiedAt`.

Acceptance:
- No visible generic placeholder like "check source before going" unless paired with useful timing/context.
- Every place has a real use case in itinerary, map filters or backup sections.
- Itinerary copy prioritizes places, pacing and decisions; food appears as support, not as the only plan.
- Tests for data validation pass.
- UI/card tests cover at least one place with embedded media.
- Static export links are valid for GitHub Pages when internal place links changed.
