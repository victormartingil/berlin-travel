# Prompt: Context, Culture, News And Media Sections

Use this prompt when adding or refreshing sections about Berlin/Germany history, recent sociopolitical context, current affairs, books, films, documentaries, newspapers, magazines and alternative media.

## Goal
Create short, lively and useful context sections that make the trip richer without turning the travel guide into an encyclopedia. The reader should understand what they are seeing in Berlin, why the city feels politically/culturally different, what current issues are shaping daily life, and what to watch/read/listen to before or during the trip.

## Proposed App Sections
Add one or several sections depending on scope:
- `Context`: recent history, sociopolitical context and "how to read Berlin while walking".
- `Now`: current affairs digest for Berlin and Germany.
- `Watch / Read`: films, documentaries and books for context.
- `Press / Magazines`: local, national, international and alternative media sources worth following.
- Optional micro-sections inside existing place fichas: "Context nearby", "Seen in film/media", "Political/cultural note".

## Research Principles
Search current sources before writing. Use multiple source types:
- Wikipedia/Wikidata for orientation, dates, names and cross-links.
- Official or institutional sources for museums, memorials, statistics and civic facts.
- Local newspapers and magazines for Berlin-specific context.
- International newspapers for major Germany-wide issues.
- Alternative/independent media for subculture, housing, nightlife, migrant culture, queer culture, left politics and city conflicts.
- Academic, publisher or library references for books.
- IMDb, TMDb, official film pages, distributor pages or festival pages for films/documentaries.

Do not rely on one source. For anything controversial or current, compare at least two independent sources and state uncertainty clearly.

## Copyright And Attribution
- Do not copy Wikipedia paragraphs. Use it as a map, then synthesize in original language.
- Do not quote long passages from newspapers, books or reviews.
- Link sources next to each item or in a source list.
- For opinion-style text, clearly frame it as interpretation, not as verified fact.
- If summarizing a columnist or local essay, paraphrase the thesis and link the original.

## Tone
Write like a sharp local friend explaining the city during a walk:
- Human, direct and concrete.
- Dynamic and slightly playful, but not unserious.
- Opinionated where useful, but honest about uncertainty.
- Useful for travellers: connect ideas to places, neighbourhoods, routes and what the visitor will notice.
- Avoid generic textbook summaries and tourist-board clichés.

Local/native perspective:
- Do not impersonate a native Berliner unless the writer actually is one.
- Instead, synthesize clearly sourced local perspectives from interviews, essays, local media, venue texts, community statements and guidebooks.
- Use framing such as "a useful local way to read this is..." or "many Berlin debates around this place are about...".
- Separate sourced local sentiment from the guide's editorial interpretation.

Spanish:
- Use natural Spain Spanish.
- Avoid literal translations from English.
- Keep sentences readable and energetic.

English:
- Concise and travel-useful.
- Avoid academic density unless the topic requires it.

## History And Sociopolitical Context Scope
Cover only what helps understand Berlin during this trip. Possible blocks:
- Berlin as a layered city: Prussian capital, Weimar modernity, Nazi terror, destruction, division, Wall, reunification and gentrification.
- East/West traces: architecture, memorials, housing estates, clubs, squats and former industrial spaces.
- The Wall beyond the postcard: border regime, everyday division, memorial culture and how reunification still shapes neighbourhoods.
- Housing pressure: rent, displacement, squats/autonomous spaces, cooperatives and why "alternative Berlin" is politically charged.
- Migration and multicultural Berlin: Turkish/Kurdish/Arab/Vietnamese communities, Kreuzberg/Neukoelln, food, music and street life.
- Club culture as urban politics: post-Wall spaces, temporary use, noise conflicts, licensing, tourism and preservation.
- Memory culture: Holocaust memorials, Topography of Terror, Stolpersteine, GDR memory and how Germany publicly handles history.
- Green/open spaces: Tempelhofer Feld, Mauerpark and why public space debates matter.

For each block include:
- 100-180 words max.
- "Why it matters on this trip".
- 2-4 linked places from the guide.
- 2-4 source links.

## Current Affairs Scope
Create a dated digest. Always include the refresh date.

Research categories:
- Berlin local politics: housing, transport, culture funding, nightlife, climate, public space, policing, tourism, major construction.
- Germany-wide politics: federal government, elections, migration/asylum debates, economy, energy, far-right/anti-fascist context.
- Culture and nightlife: venue closures/openings, club protection, festival/event news, cultural funding.
- Mobility: BVG/VBB, strikes, airport/rail disruptions, ticket changes.
- Safety/practical: demonstrations, major events, weather alerts, scams or disruptions only when relevant.

Selection rules:
- Include 5-8 items, not a news dump.
- Prioritize what could affect the trip or help interpret the city.
- State dates and sources.
- Separate confirmed facts from analysis.
- Avoid doomscrolling; explain why each item matters for travellers.

Suggested item format:
- `headline`
- `date`
- `scope`: Berlin / Germany / Europe
- `whyItMatters`
- `travellerAngle`
- `sources`
- `status`: current / developing / background

## Books
Research recommended books from publishers, libraries, major reviews and curated lists. Include a balanced mix:
- Berlin history.
- Weimar/Nazi era and memory culture.
- Wall/GDR/reunification.
- Contemporary Berlin, housing, migration, subculture.
- Fiction that captures Berlin atmosphere.

Each recommendation should include:
- Title, author, year.
- Why it helps understand the trip.
- Best for: quick context / deep history / fiction mood / politics / architecture / nightlife.
- Language availability when known.
- Reference link: publisher, Open Library, WorldCat, library, author page or reputable bookseller.

Avoid adding too many. Aim for 6-10 strong recommendations plus 2-3 optional deep cuts.

## Films And Documentaries
Research lists from IMDb, TMDb, BFI/film institutes, festivals, critics and official pages. Include:
- Berlin classics.
- Wall/GDR/reunification stories.
- Club/subculture documentaries.
- Contemporary migration/housing/youth perspectives.
- A few accessible, entertaining choices, not only heavy material.

Each recommendation should include:
- Title, director, year.
- Type: film / documentary / series.
- Why it matters for this guide.
- Mood: fun / heavy / political / club culture / historical / neighbourhood texture.
- Reference links: IMDb plus official/TMDb/distributor/festival where possible.
- Where to watch only if current and verified; otherwise omit or mark `needs_verification`.

Avoid fake availability claims. Streaming catalogs change.

## Newspapers, Magazines And Local Media
Create a practical media guide with language and angle:
- Berlin local mainstream.
- Germany national/international English-language sources.
- Alternative/left/DIY/subculture sources.
- Event/nightlife listings.
- Culture magazines.
- Queer/feminist/migrant/community media when relevant.

For each source:
- Name.
- Language.
- Focus.
- Why it is useful for this trip.
- Link.
- Bias/angle note when useful.
- Update rhythm if known.

Do not present any outlet as neutral by default. Give a short angle note instead.

## Data And UI Recommendations
Prefer structured data over hardcoded copy:
- `src/data/context.ts` for history/context cards.
- `src/data/currentAffairs.ts` for dated news digest.
- `src/data/mediaRecommendations.ts` for books, films, documentaries and press.
- Reuse existing `LocaleString` style for ES/EN.
- Include `sourceUrl`, `lastVerifiedAt` and `verification` metadata for every item.

Recommended UI:
- Dashboard card: "Berlin in 5 minutes".
- Timeline: recent history without overloading.
- Cards: "Why this matters on the route".
- Current affairs digest with refresh date.
- Media shelves: Watch, Read, Follow.
- Links from context cards to internal place fichas when places are mentioned.
- Keep sections mobile-first and skimmable.

## Internal Linking
Whenever context text mentions a place already stored in `src/data/places.ts`, link it to `/places/{id}/`.

Examples:
- Tempelhofer Feld -> `/places/tempelhofer-feld/`.
- Topography of Terror -> `/places/topography-of-terror/`.
- Berlin Wall Memorial -> `/places/berlin-wall-memorial/`.
- RAW-Gelaende -> `/places/raw-gelaende/`.
- Koepi -> `/places/koepi/` if present.

For generated DOM outside normal Next rendering, use `appPath()`.

## Acceptance Criteria
- The section has ES and EN copy.
- Every item has sources and `lastVerifiedAt`.
- Current news includes publication dates and a digest refresh date.
- No copied long text from Wikipedia, press, books or reviews.
- Opinion/context text is clearly framed and not presented as fact.
- Recommendations are selective, not padded.
- Internal place mentions link to fichas.
- Static export and route audit pass when app routes or links are added.

## Review Checklist
Before commit:
1. Re-read the content as a traveller: is it interesting, useful and not too long?
2. Check if each paragraph answers "why does this matter for our Berlin trip?"
3. Verify that all current-affairs items are dated and sourced.
4. Check ES/EN naturalness.
5. Confirm internal links and source links.
6. Run local gates.
7. If routes changed, run the GitHub Pages route audit from `static-site-implementation-review.md`.
