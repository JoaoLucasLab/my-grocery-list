"use client";

import type { GroceryItem } from "@/types/grocery";
import { GroceryItemRow } from "./GroceryItemRow";

type GroceryListProps = {
  items: GroceryItem[];
  onToggleChecked: (id: string) => Promise<void>;
  onUpdate: (id: string, updates: { name?: string; quantity?: number }) => Promise<void>;
  onRemove: (id: string) => Promise<void>;
};

export function GroceryList({ items, onToggleChecked, onUpdate, onRemove }: GroceryListProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/50 py-12 text-center">
        <p className="text-slate-500">No items yet. Add one above.</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => (
        <GroceryItemRow
          key={item.id}
          item={item}
          onToggleChecked={onToggleChecked}
          onUpdate={onUpdate}
          onRemove={onRemove}
        />
      ))}
    </ul>
  );
}
