import { useCallback, useEffect, useMemo, useState } from 'react';
import { products } from '../../data/products';
import type { GuideLayout, View } from '../../types/catalog';
import { getProduct } from '../../utils/catalog';
import { loadStoredIds, parseStoredValue, saveStoredIds, WISH_LIST_STORAGE_KEY } from '../../utils/wishListStorage';
import { clearListParamFromAddressBar, readSharedList } from '../../utils/wishListUrl';
import type { ImportNoticeData } from '../shared/ImportNotice';

const DEMO_SELECTION = ['keyboard', 'dock', 'trmnl', 'bonsai'];

interface InitialSelection {
  ids: string[];
  fromLink: boolean;
  notice: ImportNoticeData | null;
}

/**
 * Precedence on first load:
 * 1. Any `?list=` parameter wins — its sanitized IDs become the selection, even when
 *    that's an empty array (empty or entirely invalid links intentionally clear the old list).
 * 2. Otherwise, the list stored in localStorage (even if it's empty).
 * 3. Otherwise (first-ever visit), the optional demo selection or an empty list.
 */
function resolveInitialSelection(preselected: boolean): InitialSelection {
  const shared = readSharedList();
  if (shared.present) {
    return {
      ids: shared.ids,
      fromLink: true,
      notice:
      shared.ids.length > 0 ?
      { kind: 'imported', count: shared.ids.length, skipped: shared.skipped } :
      { kind: 'nothing-imported', skipped: shared.skipped }
    };
  }
  const stored = loadStoredIds();
  return { ids: stored ?? (preselected ? DEMO_SELECTION : []), fromLink: false, notice: null };
}

export function useWishBook(initialView: View, preselected: boolean) {
  const [initial] = useState(() => resolveInitialSelection(preselected));
  const [view, setView] = useState<View>(initial.fromLink ? 'wishlist' : initialView);
  const [selectedIds, setSelectedIds] = useState<string[]>(initial.ids);
  const [notice, setNotice] = useState<ImportNoticeData | null>(initial.notice);
  const [announcement, setAnnouncement] = useState('');
  const [layout, setLayout] = useState<GuideLayout>('grid');
  const [pendingAnchor, setPendingAnchor] = useState<string | null>(null);

  // Once a shared link has been handled, drop `list` from the address bar so a refresh
  // restores from localStorage instead of re-importing over the visitor's later edits.
  useEffect(() => {
    if (initial.notice) clearListParamFromAddressBar();
  }, [initial]);

  // Persist every change (including an imported list) to this browser.
  useEffect(() => {
    saveStoredIds(selectedIds);
  }, [selectedIds]);

  // Keep multiple open tabs in sync.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === WISH_LIST_STORAGE_KEY) setSelectedIds(parseStoredValue(e.newValue));
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    if (!pendingAnchor || view !== 'guide') return;
    document.getElementById(pendingAnchor)?.scrollIntoView({ block: 'start' });
    setPendingAnchor(null);
  }, [pendingAnchor, view]);

  const navigate = useCallback((nextView: View) => {
    setView(nextView);
    window.scrollTo({ top: 0 });
  }, []);

  const openInGuide = useCallback((anchorId: string) => {
    setView('guide');
    setPendingAnchor(anchorId);
  }, []);

  const toggle = useCallback(
    (id: string) => {
      const wasSaved = selectedIds.includes(id);
      const nextIds = wasSaved ? selectedIds.filter((x) => x !== id) : [...selectedIds, id];
      setSelectedIds(nextIds);
      const name = getProduct(id).name;
      setAnnouncement(
        wasSaved ?
        `${name} removed from My Wish List. ${nextIds.length} saved.` :
        `${name} saved to My Wish List. ${nextIds.length} saved.`
      );
    },
    [selectedIds]
  );

  const dismissNotice = useCallback(() => setNotice(null), []);

  const items = useMemo(() => products.filter((p) => selectedIds.includes(p.id)), [selectedIds]);

  return {
    view,
    navigate,
    openInGuide,
    selectedIds,
    toggle,
    items,
    announcement,
    layout,
    setLayout,
    notice,
    dismissNotice
  };
}