"use client";

import { useGroceryList } from "@/hooks/useGroceryList";
import { AddGroceryForm } from "@/components/AddGroceryForm";
import { GroceryList } from "@/components/GroceryList";
import { Header } from "@/components/Header";

export default function Home() {
  const { items, loading, error, add, update, remove, toggleChecked, reload } = useGroceryList();

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
            <p className="text-slate-600 dark:text-slate-400">Loading list…</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
          <p className="text-center text-red-600 dark:text-red-400">Error: {error}</p>
          <button
            type="button"
            onClick={reload}
            className="rounded-xl bg-emerald-600 px-5 py-2.5 font-medium text-white shadow-md hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
          >
            Retry
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />

      <main className="mx-auto max-w-2xl px-4 py-8">
        <section className="mb-8 rounded-2xl border border-emerald-200/70 bg-white p-6 shadow-lg dark:border-emerald-900/50 dark:bg-slate-800/80">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
            Add item
          </h2>
          <AddGroceryForm onAdd={add} />
        </section>

        <section className="rounded-2xl border border-emerald-200/70 bg-white p-6 shadow-lg dark:border-emerald-900/50 dark:bg-slate-800/80">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
              Your items
            </h2>
            <button
              type="button"
              onClick={reload}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200"
            >
              Reload
            </button>
          </div>
          <GroceryList
            items={items}
            onToggleChecked={toggleChecked}
            onUpdate={update}
            onRemove={remove}
          />
        </section>
      </main>
    </div>
  );
}
