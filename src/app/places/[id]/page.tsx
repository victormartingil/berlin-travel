import { notFound } from "next/navigation";
import { PlaceDetailClient } from "@/components/places/PlaceDetailClient";
import { places } from "@/data/places";

export function generateStaticParams() {
  return places.map((place) => ({ id: place.id }));
}

export default async function PlaceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const place = places.find((item) => item.id === id);
  if (!place) notFound();
  return <PlaceDetailClient place={place} />;
}

