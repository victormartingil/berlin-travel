#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';

const apiKey = process.env.GOOGLE_PLACES_API_KEY;
if (!apiKey) {
  console.error('Missing GOOGLE_PLACES_API_KEY. Create a restricted Google Places API key and run again.');
  process.exit(1);
}

const placesSource = await readFile('src/data/places.ts', 'utf8');
const placeBlocks = placesSource.split(/\n  \{\n/).slice(1);
const places = placeBlocks
  .map((block) => {
    const id = block.match(/id: "([^"]+)"/)?.[1];
    const name = block.match(/name: "([^"]+)"/)?.[1];
    const address = block.match(/address: "([^"]+)"/)?.[1];
    const googleMapsQuery = block.match(/googleMapsQuery: "([^"]+)"/)?.[1];
    const googleMapsUrl = block.match(/googleMapsUrl: "([^"]+)"/)?.[1];
    if (!id || !name) return undefined;
    return { id, name, address, googleMapsQuery, googleMapsUrl };
  })
  .filter(Boolean);

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function queryForPlace(place) {
  if (place.googleMapsQuery) return place.googleMapsQuery;
  if (place.address) return `${place.name}, ${place.address}`;
  return `${place.name}, Berlin`;
}

async function fetchRating(place) {
  const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': 'places.id,places.displayName,places.rating,places.userRatingCount,places.googleMapsUri',
    },
    body: JSON.stringify({ textQuery: queryForPlace(place), maxResultCount: 1, languageCode: 'en' }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`${place.id}: ${response.status} ${body}`);
  }

  const data = await response.json();
  const result = data.places?.[0];
  if (!result?.rating || !Number.isFinite(result.rating)) return undefined;
  return {
    placeId: place.id,
    source: 'google_places',
    rating: Number(result.rating.toFixed(1)),
    reviewCount: result.userRatingCount ?? 0,
    googlePlaceId: result.id,
    googleMapsUrl: result.googleMapsUri ?? place.googleMapsUrl,
    lastVerifiedAt: todayIso(),
  };
}

const ratings = [];
for (const place of places) {
  try {
    const rating = await fetchRating(place);
    if (rating) ratings.push(rating);
    await new Promise((resolve) => setTimeout(resolve, 120));
  } catch (error) {
    console.error(error.message);
  }
}

ratings.sort((a, b) => a.placeId.localeCompare(b.placeId));
const body = `import type { PlaceRatingSnapshot } from "@/domain/place";\n\n// Generated/curated snapshots. Update with \`npm run update:place-ratings\`\n// when a Google Places API key is available locally.\nexport const placeRatings: PlaceRatingSnapshot[] = ${JSON.stringify(ratings, null, 2)};\n\nconst ratingByPlaceId = new Map(placeRatings.map((rating) => [rating.placeId, rating]));\n\nexport function getPlaceRating(placeId: string): PlaceRatingSnapshot | undefined {\n  return ratingByPlaceId.get(placeId);\n}\n`;
await writeFile('src/data/placeRatings.ts', body);
console.log(`Wrote ${ratings.length} rating snapshots to src/data/placeRatings.ts`);
