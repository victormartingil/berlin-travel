"use client";
import { useFavoritesContext } from "@/components/favorites/FavoritesProvider";

export function useFavorites() {
  return useFavoritesContext();
}
