import type { Item } from '../types/item';

export async function fetchItems(): Promise<Item[]> {
  const response = await fetch('/items');
  if (!response.ok) {
    throw new Error(`Failed to fetch items: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

export function buildImageUrl(guid: string): string {
  return `/image/${encodeURIComponent(guid)}`;
}
