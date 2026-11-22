import React from 'react';
import { ArrowRightIcon, StarIcon } from 'lucide-react';

interface SavedTrayProps {
  count: number;
  onOpen: () => void;
}

export function SavedTray({ count, onOpen }: SavedTrayProps) {
  return (
    <div className="fixed inset-x-3 bottom-3 z-30 sm:inset-x-auto sm:bottom-6 sm:right-6">
      <div className="flex items-center gap-3 rounded-full bg-ink py-2 pl-4 pr-2 text-cream shadow-[0_16px_36px_-16px_rgba(20,33,61,0.6)]">
        <StarIcon className="h-4 w-4 shrink-0 text-sky" fill="currentColor" aria-hidden="true" />
        <p className="min-w-0 flex-1 truncate text-sm font-semibold sm:flex-none">{count} saved</p>
        <button
          type="button"
          onClick={onOpen}
          className="inline-flex h-10 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-sky px-4 text-sm font-semibold text-ink transition-[background-color,transform] duration-150 ease-out hover:bg-sky-wash active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream">
          
          My Wish List
          <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>);

}