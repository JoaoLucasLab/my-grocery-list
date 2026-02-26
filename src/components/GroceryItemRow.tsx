"use client";

import { useState } from "react";
import type { GroceryItem } from "@/types/grocery";

type GroceryItemRowProps = {
  item: GroceryItem;
  onToggleChecked: (id: string) => Promise<void>;
  onUpdate: (id: string, updates: { name?: string; quantity?: number }) => Promise<void>;
  onRemove: (id: string) => Promise<void>;
};

export function GroceryItemRow({ item, onToggleChecked, onUpdate, onRemove }: GroceryItemRowProps) {
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(item.name);
  const [editQuantity, setEditQuantity] = useState(item.quantity);
  const [saving, setSaving] = useState(false);
  const [removing, setRemoving] = useState(false);

  const handleSave = async () => {
    const name = editName.trim();
    if (!name) return;
    setSaving(true);
    try {
      await onUpdate(item.id, { name, quantity: Math.max(1, editQuantity) });
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditName(item.name);
    setEditQuantity(item.quantity);
    setEditing(false);
  };

  const handleRemove = async () => {
    setRemoving(true);
    try {
      await onRemove(item.id);
    } finally {
      setRemoving(false);
    }
  };

  if (editing) {
    return (
      <li className="flex flex-wrap items-center gap-2 rounded-xl border border-emerald-200/70 bg-emerald-50/50 p-3">
        <input
          type="text"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          autoFocus
        />
        <input
          type="number"
          min={1}
          value={editQuantity}
          onChange={(e) => setEditQuantity(Number(e.target.value) || 1)}
          className="w-16 rounded-lg border border-slate-200 bg-white px-2 py-2 text-slate-900"
        />
        <button
          type="button"
          onClick={handleSave}
          disabled={saving || !editName.trim()}
          className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          {saving ? "…" : "Save"}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          disabled={saving}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>
      </li>
    );
  }

  return (
    <li className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-slate-50/50 py-3 px-4 transition hover:border-emerald-200">
      <input
        type="checkbox"
        checked={item.checked}
        onChange={() => onToggleChecked(item.id)}
        className="h-5 w-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
        aria-label={`Mark ${item.name} as ${item.checked ? "pending" : "bought"}`}
      />
      <span
        className={`min-w-0 flex-1 font-medium ${item.checked ? "text-slate-500 line-through" : "text-slate-800"}`}
      >
        {item.name} × {item.quantity}
      </span>
      <button
        type="button"
        onClick={() => setEditing(true)}
        className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
      >
        Edit
      </button>
      <button
        type="button"
        onClick={handleRemove}
        disabled={removing}
        className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700 transition hover:bg-red-100 disabled:opacity-50"
      >
        {removing ? "…" : "Delete"}
      </button>
    </li>
  );
}
