# Data Model

## 1. Principles

- Data must be typed.
- UI must not hardcode travel content.
- Every real-world item must include verification metadata.
- Data should be easy to edit manually.
- IDs must be stable and human-readable.

## 2. Enums and union types

```ts
export type VerificationStatus =
  | 'verified'
  | 'needs_verification'
  | 'outdated'
  | 'unknown';

export type PriceLevel = 'free' | 'low' | 'medium' | 'high' | 'unknown';

export type PlaceCategory =
  | 'accommodation'
  | 'restaurant'
  | 'vegetarian_restaurant'
  | 'cafe'
  | 'bakery'
  | 'supermarket'
  | 'museum'
  | 'gallery'
  | 'street_art'
  | 'alternative'
  | 'nightlife'
  | 'club'
  | 'bar'
  | 'park'
  | 'walk'
  | 'transport'
  | 'shop'
  | 'viewpoint';

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'coffee' | 'any';

export type ItineraryBlockType =
  | 'morning'
  | 'lunch'
  | 'afternoon'
  | 'dinner'
  | 'evening'
  | 'night'
  | 'alternative';

export type RouteMode = 'walking' | 'transit' | 'bicycling' | 'driving';
```

## 3. Verification metadata

```ts
export interface VerificationMetadata {
  status: VerificationStatus;
  sourceUrl?: string;
  officialUrl?: string;
  lastVerifiedAt?: string;
  notes?: string;
}
```

## 4. Coordinates

```ts
export interface Coordinates {
  lat: number;
  lng: number;
}
```

## 5. Place

```ts
export interface Place {
  id: string;
  name: string;
  category: PlaceCategory;
  secondaryCategories?: PlaceCategory[];
  description: string;
  shortDescription?: string;
  neighbourhood?: string;
  address?: string;
  coordinates?: Coordinates;
  priceLevel: PriceLevel;
  vegetarianFriendly?: boolean;
  mealTypes?: MealType[];
  estimatedDurationMinutes?: number;
  openingHoursSummary?: string;
  bookingRecommended?: boolean;
  tags: string[];
  links: PlaceLinks;
  verification: VerificationMetadata;
  notes?: string[];
}

export interface PlaceLinks {
  official?: string;
  googleMaps?: string;
  instagram?: string;
  residentAdvisor?: string;
  tickets?: string;
  source?: string;
}
```

## 6. Itinerary

```ts
export interface ItineraryDay {
  id: string;
  date: string;
  title: string;
  summary: string;
  neighbourhoodFocus?: string[];
  blocks: ItineraryBlock[];
}

export interface ItineraryBlock {
  id: string;
  type: ItineraryBlockType;
  title: string;
  description: string;
  items: ItineraryItem[];
}

export interface ItineraryItem {
  id: string;
  title: string;
  description?: string;
  placeId?: string;
  startTime?: string;
  endTime?: string;
  estimatedDurationMinutes?: number;
  transport?: TransportHint;
  links?: ExternalLink[];
  tags?: string[];
  priority: 'must' | 'recommended' | 'optional' | 'backup';
}
```

## 7. Transport

```ts
export interface TransportHint {
  from?: string;
  to?: string;
  mode: RouteMode;
  summary?: string;
  googleMapsUrl?: string;
  publicTransportUrl?: string;
  notes?: string;
}

export interface TransportOption {
  id: string;
  title: string;
  category: 'airport' | 'public_transport' | 'bike' | 'walking' | 'taxi' | 'app';
  description: string;
  links: ExternalLink[];
  verification: VerificationMetadata;
}

export interface ExternalLink {
  label: string;
  url: string;
  kind?: 'official' | 'maps' | 'tickets' | 'source' | 'route' | 'social';
}
```

## 8. Nightlife event

Nightlife can be modelled as either `Place` or a separate event type.

Recommended for MVP: keep venues as `Place` and events as `TravelEvent`.

```ts
export interface TravelEvent {
  id: string;
  title: string;
  venuePlaceId?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  style?: string[];
  description: string;
  priceLevel: PriceLevel;
  links: ExternalLink[];
  verification: VerificationMetadata;
  tags: string[];
}
```

## 9. Settings

```ts
export interface TripSettings {
  destination: string;
  startDate: string;
  endDate: string;
  accommodationPlaceId: string;
  defaultMapCenter: Coordinates;
  defaultMapZoom: number;
}
```
