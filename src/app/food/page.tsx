import { PlacesSectionClient } from "@/components/places/PlacesSectionClient";

export default function FoodPage() {
  return <PlacesSectionClient title="Food" categories={["vegetarian", "restaurant", "cafe", "bakery", "supermarket"]} />;
}
