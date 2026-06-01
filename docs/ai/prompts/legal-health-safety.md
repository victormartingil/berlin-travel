# Prompt: Legal, Health And Harm-Reduction Travel Safety

Use this prompt when adding or refreshing destination content about laws, public-space rules, drugs, alcohol, emergencies, healthcare, insurance and traveller safety.

## Objective
Create practical, non-moralising safety content for travellers. The output must help readers avoid legal trouble, respond correctly to emergencies and prepare health coverage before travel.

## Source Hierarchy
Use current sources and record `lastVerifiedAt`:
- Official city/state pages for local rules, fines, emergency numbers and public-space regulations.
- National law or ministry pages for controlled substances, cannabis, traffic and healthcare frameworks.
- EU/official social-security pages for EHIC/TSE and cross-border healthcare.
- Official public transport house rules for station/train behaviour.
- Recognised harm-reduction organisations for safer-use advice and drug-checking warnings.
- Local media only as secondary context, never as the sole source for legal facts.

## Content Rules
- Do not give legal or medical advice; write clear travel guidance with source links.
- Distinguish `legal`, `tolerated`, `restricted`, `illegal` and `unknown` instead of flattening everything into yes/no.
- For cannabis, include possession limits, public-consumption restrictions, non-commercial sale limits, tourist relevance and fine ranges when official sources provide them.
- For substances controlled under drug laws, state clearly that purchase/possession/supply can be criminal. Harm-reduction notes must not read as encouragement to consume.
- For alcohol/public drinking, separate street/park norms from public transport, noise, glass, litter and local restrictions.
- For emergencies, prioritise exact numbers and decision rules: 112, 110, medical on-call, poison hotline, drug emergency/advice services.
- For health coverage, explain EHIC/TSE limits and when travel insurance still matters: repatriation, private care, cancellations, liability and luggage.
- Use plain, human wording in ES and EN. Avoid fearmongering and avoid normalising risky behaviour.

## Suggested Data Model
Create or update a `safetyGuide` data file with:
- `id`
- `title` ES/EN
- `summary` ES/EN
- `items` ES/EN
- `sourceLabel` ES/EN
- `sourceUrl`
- `lastVerifiedAt`
- `risk`: `info | warning | urgent`

## UI Rules
- Safety content should be reachable from the main navigation, not hidden in a generic practical checklist.
- Cards should be scannable on mobile, with emergency cards near the top.
- Every card should expose its source and verification date.
- Do not overload the route itinerary with legal content; link to the safety page from practical/home/navigation.

## Review Checklist
- All legal/medical claims have official or specialist sources.
- No stale relative wording like "currently" without a verification date.
- No unsupported fine amounts.
- No advice that could be read as evading law enforcement.
- Spanish and English both read naturally.
- Static export routes and navigation links work under GitHub Pages base path.
