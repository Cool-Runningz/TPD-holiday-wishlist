import { sanitizeProductIds } from './wishListIds';

export const WISH_LIST_STORAGE_KEY = 'tpd-christmas-wish-list:v1';

/**
 * Returns the stored IDs, or null when nothing has ever been stored (or storage
 * is unavailable / corrupted) so callers can tell "empty list" from "no list".
 */
export function loadStoredIds(): string[] | null {
  try {
    const raw = window.localStorage.getItem(WISH_LIST_STORAGE_KEY);
    if (raw === null) return null;
    return sanitizeProductIds(JSON.parse(raw));
  } catch {
    return null;
  }
}

export function parseStoredValue(raw: string | null): string[] {
  if (raw === null) return [];
  try {
    return sanitizeProductIds(JSON.parse(raw));
  } catch {
    return [];
  }
}

export function saveStoredIds(ids: string[]): boolean {
  try {
    window.localStorage.setItem(WISH_LIST_STORAGE_KEY, JSON.stringify(ids));
    return true;
  } catch {
    return false;
  }
}