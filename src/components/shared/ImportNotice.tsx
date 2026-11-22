import React from 'react';
import { InfoIcon, XIcon } from 'lucide-react';

export type ImportNoticeData =
{kind: 'imported';count: number;skipped: number;} |
{kind: 'nothing-imported';skipped: number;};

interface ImportNoticeProps {
  notice: ImportNoticeData;
  onDismiss: () => void;
}

export function ImportNotice({ notice, onDismiss }: ImportNoticeProps) {
  const message =
  notice.kind === 'imported' ?
  `You opened a shared Wish List. Its ${notice.count} ${notice.count === 1 ? 'pick is' : 'picks are'} now saved to My Wish List on this device.${
  notice.skipped > 0 ?
  ` ${notice.skipped} ${notice.skipped === 1 ? 'item in the link wasn’t' : 'items in the link weren’t'} recognized and ${notice.skipped === 1 ? 'was' : 'were'} skipped.` :
  ''}` :

  notice.skipped > 0 ?
  `That shared link didn’t include any products we recognize (${notice.skipped} ${notice.skipped === 1 ? 'item' : 'items'} skipped), so nothing was imported and My Wish List is now empty.` :
  'That shared link was empty, so nothing was imported and My Wish List is now empty.';

  return (
    <div className="mx-auto w-full max-w-[1320px] px-4 pt-4 sm:px-6 lg:px-8">
      <div role="status" className="flex items-start gap-3 rounded-2xl border border-sky bg-sky-wash py-3 pl-4 pr-2 text-sm text-ink">
        <InfoIcon className="mt-0.5 h-4 w-4 shrink-0 text-sky-deep" aria-hidden="true" />
        <p className="flex-1 leading-relaxed">{message}</p>
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss message"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-ink-soft hover:bg-sky/30 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-deep">
          
          <XIcon className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>);

}