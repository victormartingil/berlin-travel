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
8. For autonomous/squatted spaces, add etiquette: exterior/event-only/respect residents.
9. If the place is an event venue, check the exact trip dates and enrich related `NightlifeEvent` entries with price, lineup, start/end time, ticket URL and `posterUrl` when available from the original source.
10. Do not write generic copy. Rewrite descriptions so they sound like a human travel note: specific, useful, and honest about when the place is or is not worth the detour.

Acceptance:
- No visible generic placeholder like "check source before going" unless paired with useful timing/context.
- Every place has a real use case in itinerary, map filters or backup sections.
- Itinerary copy prioritizes places, pacing and decisions; food appears as support, not as the only plan.
- Tests for data validation pass.
