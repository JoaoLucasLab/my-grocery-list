"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { GroceryItem } from "@/types/grocery";
import { GroceryListReadOnly } from "../../../components/GroceryListReadOnly";
import { Header } from "../../../components/Header";

type PageProps = { params: Promise<{ token: string }> };

export default function SharePage({ params }: PageProps) {
  const [token, setToken] = useState<string | null>(null);
  const [items, setItems] = useState<GroceryItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const resolved = await params;
      setToken(resolved.token);
      try {
        const res = await fetch(`/api/share/${resolved.token}`);
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data?.error ?? "Failed to load");
        }
        const list = await res.json();
        if (!cancelled) setItems(list);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Invalid link");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--background)]">
        <Header showShare={false} />
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
            <p className="text-slate-600 dark:text-slate-400">Loading shared list…</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[var(--background)]">
        <Header showShare={false} />
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
          <p className="text-center text-red-600 dark:text-red-400">{error}</p>
          <Link
            href="/"
            className="rounded-xl bg-emerald-600 px-5 py-2.5 font-medium text-white shadow-md hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
          >
            Go to my list
          </Link>
        </div>
      </div>
    );
  }

  const handleToggleChecked = async (itemId: string) => {
    if (!token) return;
    const item = items?.find((i) => i.id === itemId);
    if (!item) return;
    const newChecked = !item.checked;
    try {
      const res = await fetch(`/api/share/${token}/item`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId, checked: newChecked }),
      });
      if (!res.ok) throw new Error("Failed to update");
      setItems((prev) =>
        (prev ?? []).map((i) => (i.id === itemId ? { ...i, checked: newChecked } : i))
      );
    } catch {
      // Keep UI unchanged on error
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header showShare={false} />

      <main className="mx-auto max-w-2xl px-4 py-8">
        <div className="mb-6 rounded-2xl border border-emerald-200/70 bg-emerald-50/50 px-4 py-3 dark:border-emerald-900/50 dark:bg-emerald-900/20">
          <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
            You’re viewing a shared grocery list. You can check items off as you shop.
          </p>
          <Link
            href="/"
            className="mt-2 inline-block text-sm text-emerald-600 underline hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            Create your own list →
          </Link>
        </div>

        <section className="rounded-2xl border border-emerald-200/70 bg-white p-6 shadow-lg dark:border-emerald-900/50 dark:bg-slate-800/80">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
            Shared list
          </h2>
          <GroceryListReadOnly
            items={items ?? []}
            onToggleChecked={handleToggleChecked}
          />
        </section>
      </main>
    </div>
  );
}
