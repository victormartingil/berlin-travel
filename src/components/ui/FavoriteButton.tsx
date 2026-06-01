"use client";

export function FavoriteButton({ active, onToggle }: { active: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} className={`rounded-md px-3 py-2 text-sm ${active ? "bg-rose-600 text-white" : "bg-zinc-200 text-zinc-900"}`}>
      {active ? "★ Favorite" : "☆ Favorite"}
    </button>
  );
}
