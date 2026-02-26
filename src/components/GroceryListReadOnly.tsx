"use client";

import type { GroceryItem } from "@/types/grocery";

type GroceryListReadOnlyProps = {
  items: GroceryItem[];
  /** When provided, checkboxes are clickable and update via this callback (e.g. shared link). */
  onToggleChecked?: (id: string) => Promise<void>;
};

export function GroceryListReadOnly({ items, onToggleChecked }: GroceryListReadOnlyProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/50 py-12 text-center dark:border-slate-600 dark:bg-slate-700/20">
        <p className="text-slate-500 dark:text-slate-400">This list is empty.</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => (
        <li
          key={item.id}
          className={`flex items-center gap-3 rounded-xl border border-slate-200/80 bg-slate-50/50 py-3 px-4 dark:border-slate-600/80 dark:bg-slate-700/30 ${
            item.checked ? "opacity-75" : ""
          }`}
        >
          {onToggleChecked ? (
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => onToggleChecked(item.id)}
              className="h-5 w-5 shrink-0 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 dark:border-slate-500 dark:bg-slate-700"
              aria-label={`Mark ${item.name} as ${item.checked ? "pending" : "bought"}`}
            />
          ) : (
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border border-slate-300 text-emerald-600 dark:border-slate-500 ${
                item.checked ? "bg-emerald-500 text-white" : ""
              }`}
            >
              {item.checked && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </span>
          )}
          <span
            className={`min-w-0 flex-1 font-medium ${
              item.checked ? "text-slate-500 line-through dark:text-slate-400" : "text-slate-800 dark:text-slate-100"
            }`}
          >
            {item.name} × {item.quantity}
          </span>
        </li>
      ))}
    </ul>
  );
}
