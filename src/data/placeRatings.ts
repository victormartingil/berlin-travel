import type { PlaceRatingSnapshot } from "@/domain/place";

// Generated/curated snapshots. Update with `npm run update:place-ratings`
// when a Google Places API key is available locally.
export const placeRatings: PlaceRatingSnapshot[] = [];

const ratingByPlaceId = new Map(placeRatings.map((rating) => [rating.placeId, rating]));

export function getPlaceRating(placeId: string): PlaceRatingSnapshot | undefined {
  return ratingByPlaceId.get(placeId);
}
