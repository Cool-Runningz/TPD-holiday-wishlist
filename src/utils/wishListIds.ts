import { products } from '../data/products';

const VALID_IDS = new Set(products.map((p) => p.id));

/**
 * Accepts anything (parsed JSON, query tokens, etc.) and returns only known
 * product IDs, de-duplicated, in first-seen order. Never throws.
 */
export function sanitizeProductIds(input: unknown): string[] {
  if (!Array.isArray(input)) return [];
  const seen = new Set<string>();
  const result: string[] = [];
  for (const value of input) {
    if (typeof value !== 'string') continue;
    const id = value.trim().toLowerCase();
    if (!VALID_IDS.has(id) || seen.has(id)) continue;
    seen.add(id);
    result.push(id);
  }
  return result;
}