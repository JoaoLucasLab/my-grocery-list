"use client";

import { useState, useEffect, useCallback } from "react";
import type { GroceryItem } from "@/types/grocery";

const API_BASE = "/api/grocery";

async function fetchList(): Promise<GroceryItem[]> {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

/**
 * Hook that holds grocery list CRUD logic using the Next.js API (Prisma + SQLite).
 * Data is stored in the database file (prisma/dev.db), not in the browser.
 */
export function useGroceryList() {
  const [items, setItems] = useState<GroceryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await fetchList();
      setItems(list);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const add = useCallback(async (name: string, quantity: number) => {
    const res = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim(), quantity: Math.max(1, quantity) }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data?.error ?? "Failed to add");
    }
    const newItem = await res.json();
    setItems((prev) => [...prev, newItem]);
  }, []);

  const update = useCallback(async (id: string, updates: Partial<Pick<GroceryItem, "name" | "quantity" | "checked">>) => {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data?.error ?? "Failed to update");
    }
    const updated = await res.json();
    setItems((prev) => prev.map((item) => (item.id === id ? updated : item)));
  }, []);

  const remove = useCallback(async (id: string) => {
    const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data?.error ?? "Failed to delete");
    }
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const toggleChecked = useCallback(
    async (id: string) => {
      const item = items.find((i) => i.id === id);
      if (!item) return;
      await update(id, { checked: !item.checked });
    },
    [items, update]
  );

  return { items, loading, error, add, update, remove, toggleChecked, reload: load };
}
