# BG-FIX-itinerary-essentials

## Fixes Applied
- Added the missing Holocaust Memorial ficha with official verification and local generated media fallback.
- Updated Thursday, Saturday, Sunday and Monday itinerary blocks to add essentials as compact route stops.
- Reframed extra museums, markets, rooftops and gardens as plan B, quick pass or replacement options.
- Preserved short flea-market aliases required by itinerary link regression tests.

## Verification
- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`
- `GITHUB_PAGES=true npm run build`
- `! rg 'href="/places/' out`
- `rg -o 'href="/berlin-travel/places/[^"]+"' out/itinerary/index.html | head`
