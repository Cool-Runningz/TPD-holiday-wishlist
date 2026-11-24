import { StarIcon } from 'lucide-react';
import type { View } from '../types/catalog';

interface TopBarProps {
  view: View;
  count: number;
  onNavigate: (view: View) => void;
}

const LINKS: {id: View;label: string;}[] = [
{ id: 'guide', label: 'Gift guide' }];


const FOCUS = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-deep focus-visible:ring-offset-2 focus-visible:ring-offset-cream';

export function TopBar({ view, count, onNavigate }: TopBarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1320px] items-center gap-3 px-4 sm:gap-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => onNavigate('guide')}
          className={`flex min-w-0 items-center gap-3 rounded-lg text-left ${FOCUS}`}>
           
          <span className="hidden min-w-0 leading-tight sm:block">
            <span className="block truncate font-display text-[15px] font-semibold tracking-[-0.01em] text-ink">
              The Productive Dev
            </span>
          </span>
          <span className="sr-only sm:hidden">The Productive Dev Wish List</span>
        </button>

        <nav aria-label="Wish List views" className="ml-auto flex items-center gap-1">
          {LINKS.map((link) => {
            const active = view === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => onNavigate(link.id)}
                aria-current={active ? 'page' : undefined}
                className={`inline-flex h-9 shrink-0 items-center whitespace-nowrap rounded-full px-3 text-sm font-semibold transition-colors duration-150 ease-out sm:px-3.5 ${FOCUS} ${
                active ? 'bg-sand text-ink' : 'text-ink-soft hover:text-ink'}`
                }>
                
                {link.label}
              </button>);

          })}
        </nav>

        <button
          type="button"
          onClick={() => onNavigate('wishlist')}
          aria-current={view === 'wishlist' ? 'page' : undefined}
          className={`inline-flex h-10 shrink-0 items-center gap-2 rounded-full px-3 text-sm font-semibold transition-colors duration-150 ease-out sm:px-4 ${FOCUS} ${
          view === 'wishlist' ? 'bg-ink text-cream' : 'border border-ink/25 text-ink hover:border-ink hover:bg-paper'}`
          }>
          
          <StarIcon className="h-4 w-4" aria-hidden="true" fill={count > 0 ? 'currentColor' : 'none'} />
          <span className="sr-only md:not-sr-only">My Wish List</span>
          <span className="grid h-6 min-w-[1.5rem] place-items-center rounded-full bg-sky px-1.5 text-xs font-bold tabular-nums text-ink">
            {count}
            <span className="sr-only"> saved</span>
          </span>
        </button>
      </div>
    </header>);

}