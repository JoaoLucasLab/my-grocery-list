"use client";

import { useState, FormEvent } from "react";

type AddGroceryFormProps = {
  onAdd: (name: string, quantity: number) => Promise<void>;
  disabled?: boolean;
};

export function AddGroceryForm({ onAdd, disabled }: AddGroceryFormProps) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    setError(null);
    setSubmitting(true);
    try {
      await onAdd(trimmed, quantity);
      setName("");
      setQuantity(1);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-3">
      <label className="flex flex-1 min-w-[140px] flex-col gap-1.5">
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Item</span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Milk, Bread…"
          className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-900 placeholder-slate-400 transition focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-emerald-400 dark:focus:bg-slate-700"
          disabled={disabled}
        />
      </label>
      <label className="flex w-20 flex-col gap-1.5">
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Qty</span>
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value) || 1)}
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 transition focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-100 dark:focus:border-emerald-400 dark:focus:bg-slate-700"
          disabled={disabled}
        />
      </label>
      <button
        type="submit"
        disabled={disabled || submitting || !name.trim()}
        className="rounded-xl bg-emerald-600 px-5 py-2.5 font-semibold text-white shadow-md transition hover:bg-emerald-700 disabled:opacity-50 disabled:shadow-none dark:bg-emerald-500 dark:hover:bg-emerald-600"
      >
        {submitting ? "Adding…" : "Add"}
      </button>
      {error && (
        <p className="w-full text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </form>
  );
}
