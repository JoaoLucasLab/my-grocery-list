/**
 * Type for a single grocery list item.
 * Centralizing it here avoids repetition and keeps CRUD consistent.
 */
export interface GroceryItem {
  id: string;
  name: string;
  quantity: number;
  checked: boolean;
  createdAt: number;
}
