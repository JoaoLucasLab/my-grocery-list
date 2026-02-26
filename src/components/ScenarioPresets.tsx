"use client";

import { useState } from "react";

type ScenarioKey = "busyWeek" | "bbq" | "breakfast" | "light";

type ScenarioPresetsProps = {
  onAdd: (name: string, quantity: number) => Promise<void>;
};

const SCENARIOS: Record<
  ScenarioKey,
  { label: string; description: string; items: { name: string; quantity: number }[] }
> = {
  busyWeek: {
    label: "Busy week",
    description: "Basic staples to get through a busy week.",
    items: [
      { name: "Rice", quantity: 1 },
      { name: "Beans", quantity: 1 },
      { name: "Pasta", quantity: 2 },
      { name: "Tomato sauce", quantity: 2 },
      { name: "Sliced bread", quantity: 1 },
      { name: "Milk", quantity: 2 },
      { name: "Coffee", quantity: 1 },
      { name: "Eggs", quantity: 1 },
      { name: "Mixed fruit", quantity: 1 },
    ],
  },
  bbq: {
    label: "BBQ",
    description: "Suggestions for a simple backyard barbecue.",
    items: [
      { name: "Beef", quantity: 2 },
      { name: "Sausage", quantity: 2 },
      { name: "Chicken wings / hearts", quantity: 1 },
      { name: "Charcoal", quantity: 1 },
      { name: "Coarse salt", quantity: 1 },
      { name: "Farofa / side dish", quantity: 1 },
      { name: "Vinaigrette / salad", quantity: 1 },
      { name: "Garlic bread", quantity: 1 },
      { name: "Soda", quantity: 2 },
      { name: "Beer / drinks", quantity: 2 },
      { name: "Ice", quantity: 1 },
    ],
  },
  breakfast: {
    label: "Breakfast",
    description: "Classics to start the day.",
    items: [
      { name: "Bread rolls", quantity: 6 },
      { name: "Sliced bread", quantity: 1 },
      { name: "Cheese", quantity: 1 },
      { name: "Ham", quantity: 1 },
      { name: "Butter / margarine", quantity: 1 },
      { name: "Coffee", quantity: 1 },
      { name: "Milk", quantity: 2 },
      { name: "Juice", quantity: 1 },
      { name: "Fruit (banana, apple, papaya…)", quantity: 1 },
      { name: "Yogurt", quantity: 2 },
    ],
  },
  light: {
    label: "Light meals",
    description: "Lighter options focused on salads and snacks.",
    items: [
      { name: "Lettuce", quantity: 1 },
      { name: "Tomato", quantity: 4 },
      { name: "Cucumber", quantity: 2 },
      { name: "Carrots", quantity: 1 },
      { name: "Olive oil", quantity: 1 },
      { name: "Tuna cans", quantity: 2 },
      { name: "Wholegrain bread", quantity: 1 },
      { name: "Cottage cheese", quantity: 1 },
      { name: "Greek yogurt", quantity: 2 },
      { name: "Mixed nuts", quantity: 1 },
      { name: "Fruit salad", quantity: 1 },
    ],
  },
};

export function ScenarioPresets({ onAdd }: ScenarioPresetsProps) {
  const [selected, setSelected] = useState<ScenarioKey>("busyWeek");
  const [loading, setLoading] = useState(false);

  const current = SCENARIOS[selected];

  const handleApply = async () => {
    if (loading) return;
    setLoading(true);
    try {
      for (const item of current.items) {
        await onAdd(item.name, item.quantity);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-4 rounded-xl border border-emerald-100 bg-emerald-50/70 p-3 text-sm">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <span className="font-medium text-emerald-800">
          Quick list modes
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value as ScenarioKey)}
            className="rounded-lg border border-emerald-200 bg-white px-2.5 py-1.5 text-xs font-medium text-emerald-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          >
            {Object.entries(SCENARIOS).map(([key, value]) => (
              <option key={key} value={key}>
                {value.label}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleApply}
            disabled={loading}
            className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-60"
          >
            {loading ? "Adding…" : "Add suggestions"}
          </button>
        </div>
      </div>
      <p className="text-xs text-emerald-900/80">
        {current.description}
      </p>
    </div>
  );
}

