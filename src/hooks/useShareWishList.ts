import { useCallback, useEffect, useMemo, useState } from 'react';
import { buildShareUrl } from '../utils/wishListUrl';

export type ShareStatus = 'idle' | 'shared' | 'copied' | 'cancelled' | 'failed' | 'empty';

export const SHARE_MESSAGES: Record<ShareStatus, string> = {
  idle: '',
  shared: 'Link shared.',
  copied: 'Link copied to your clipboard. Paste it anywhere.',
  cancelled: 'Sharing cancelled. Your link is still here if you need it.',
  failed: 'Couldn’t copy automatically. Select the link above and copy it manually.',
  empty: 'Star at least one product before sharing your list.'
};

export function useShareWishList(ids: string[]) {
  const key = ids.join(',');
  const shareUrl = useMemo(() => buildShareUrl(key ? key.split(',') : []), [key]);
  const [status, setStatus] = useState<ShareStatus>('idle');

  // A changed list means any previous success message no longer describes the current link.
  useEffect(() => setStatus('idle'), [shareUrl]);

  const copy = useCallback(async () => {
    if (!key) {
      setStatus('empty');
      return;
    }
    if (!navigator.clipboard || typeof navigator.clipboard.writeText !== 'function') {
      setStatus('failed');
      return;
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      setStatus('copied');
    } catch {
      setStatus('failed');
    }
  }, [key, shareUrl]);

  const share = useCallback(async () => {
    if (!key) {
      setStatus('empty');
      return;
    }
    const data: ShareData = {
      title: 'My Wish List · The Productive Dev',
      text: 'Here’s my Christmas wish list from The Productive Dev.',
      url: shareUrl
    };
    if (typeof navigator.share === 'function' && (!navigator.canShare || navigator.canShare(data))) {
      try {
        await navigator.share(data);
        setStatus('shared');
        return;
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          setStatus('cancelled');
          return;
        }
        // NotAllowedError etc. (e.g. inside a sandboxed frame) — fall back to copying.
      }
    }
    await copy();
  }, [key, shareUrl, copy]);

  return { shareUrl, status, message: SHARE_MESSAGES[status], share, copy, canShare: key.length > 0 };
}