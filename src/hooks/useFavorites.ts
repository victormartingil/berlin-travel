"use client";
import { useEffect, useMemo, useState } from "react";
import { useCallback } from "react";

const KEY = "berlin-guide-favorites";

export function useFavorites() {
  const [ids, setIds] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = window.localStorage.getItem(KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed.filter((x) => typeof x === "string");
    } catch {
      return [];
    }
    return [];
  });

  useEffect(() => {
    if (window.localStorage) window.localStorage.setItem(KEY, JSON.stringify(ids));
  }, [ids]);

  const toggle = useCallback((id: string) => {
    setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  return useMemo(() => ({ ids, isFavorite: (id: string) => ids.includes(id), toggle }), [ids, toggle]);
}
