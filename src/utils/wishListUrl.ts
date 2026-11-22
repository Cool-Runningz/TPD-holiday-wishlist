import { sanitizeProductIds } from './wishListIds';

export const LIST_PARAM = 'list';

// Guards against absurdly long pasted query strings.
const MAX_RAW_LENGTH = 2000;

export interface SharedListResult {
  /** True when the URL contains a `list` parameter at all (even if empty/invalid). */
  present: boolean;
  /** Valid, de-duplicated product IDs from the parameter. */
  ids: string[];
  /** Tokens that were unknown, malformed, or duplicates. */
  skipped: number;
}

/**
 * Rewrites only the `list` parameter of a URL, preserving path, other query
 * parameters, and hash. Commas are kept literal so the link stays compact.
 */
function withListParam(href: string, ids: string[]): URL {
  const url = new URL(href);
  const params = new URLSearchParams(url.search);
  params.delete(LIST_PARAM);
  const rest = params.toString();
  // IDs are validated against the catalog and only contain [a-z0-9-], so they are URL-safe.
  const listPart = ids.length > 0 ? `${LIST_PARAM}=${ids.join(',')}` : '';
  url.search = [rest, listPart].filter(Boolean).join('&');
  return url;
}

export function buildShareUrl(ids: string[], href: string = window.location.href): string {
  return withListParam(href, sanitizeProductIds(ids)).toString();
}

export function readSharedList(href: string = window.location.href): SharedListResult {
  try {
    const url = new URL(href);
    if (!url.searchParams.has(LIST_PARAM)) return { present: false, ids: [], skipped: 0 };

    // Support repeated params (?list=a&list=b) as well as comma-separated values.
    const raw = url.searchParams.getAll(LIST_PARAM).join(',').slice(0, MAX_RAW_LENGTH);
    const tokens = raw.
    split(',').
    map((t) => t.trim()).
    filter(Boolean);
    const ids = sanitizeProductIds(tokens);
    return { present: true, ids, skipped: tokens.length - ids.length };
  } catch {
    return { present: false, ids: [], skipped: 0 };
  }
}

/** Removes `list` from the address bar without reloading, so later edits aren't overwritten on refresh. */
export function clearListParamFromAddressBar(): void {
  try {
    const url = new URL(window.location.href);
    if (!url.searchParams.has(LIST_PARAM)) return;
    window.history.replaceState(window.history.state, '', withListParam(url.toString(), []).toString());
  } catch {

    // History API unavailable (e.g. sandboxed frame) — safe to ignore.
  }}