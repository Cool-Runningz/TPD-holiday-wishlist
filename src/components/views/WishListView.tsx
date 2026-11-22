import React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRightIcon, CopyIcon, Share2Icon, StarIcon } from 'lucide-react';
import { useShareWishList } from '../../hooks/useShareWishList';
import type { Product } from '../../types/catalog';
import { getCategory } from '../../utils/catalog';
import { Price } from '../shared/Price';
import { SaveButton } from '../shared/SaveButton';

interface WishListViewProps {
  items: Product[];
  onToggle: (id: string) => void;
  onBrowse: () => void;
  onOpenInGuide: (anchorId: string) => void;
}

export function WishListView({ items, onToggle, onBrowse, onOpenInGuide }: WishListViewProps) {
  const reduce = useReducedMotion();
  const { shareUrl, status, message, share, copy, canShare } = useShareWishList(items.map((p) => p.id));
  const isError = status === 'failed' || status === 'empty';

  return (
    <main className="mx-auto w-full max-w-[1320px] px-4 pb-20 sm:px-6 lg:px-8">
      <header className="grid gap-8 border-b border-ink/10 py-10 lg:grid-cols-12 lg:items-end lg:gap-12 lg:py-14">
        <div className="lg:col-span-7">
          <p className="flex items-center gap-2 font-mono text-xs text-ink-soft">
            <span aria-hidden="true" className="h-2 w-2 bg-sky-deep" />
            Saved from The Productive Dev Christmas Wish List 2026
          </p>
          <h1 className="mt-5 font-display text-[clamp(52px,7.5vw,104px)] font-semibold leading-[0.92] tracking-[-0.045em] text-ink">
            My Wish List
          </h1>
          {items.length > 0 &&
          <p className="mt-6 text-lg text-ink-soft">
              <strong className="font-semibold text-ink">
                {items.length} {items.length === 1 ? 'pick' : 'picks'} saved
              </strong>{' '}
              and ready to share.
            </p>
          }
        </div>

        {items.length > 0 &&
        <section aria-labelledby="share-heading" className="rounded-3xl bg-ink p-6 text-cream sm:p-8 lg:col-span-5">
            <h2 id="share-heading" className="font-display text-2xl font-semibold tracking-[-0.02em]">
              Share your list
            </h2>
            <p className="mt-1.5 text-[15px] text-cream/75">Send it to whoever keeps asking what you want this year.</p>
            <button
            type="button"
            onClick={share}
            disabled={!canShare}
            aria-describedby="share-status"
            className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-sky text-[15px] font-semibold text-ink transition-[background-color,transform] duration-150 ease-out hover:bg-sky-wash active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:cursor-not-allowed disabled:opacity-50">
            
              <Share2Icon className="h-4 w-4" aria-hidden="true" />
              Share My Wish List
            </button>
            <div className="mt-3 flex items-center gap-2 rounded-xl bg-cream/10 py-1.5 pl-3 pr-1.5 focus-within:ring-2 focus-within:ring-sky">
              <label htmlFor="share-url" className="sr-only">
                Shareable link to your wish list
              </label>
              <input
              id="share-url"
              type="text"
              readOnly
              value={shareUrl}
              onFocus={(e) => e.currentTarget.select()}
              className="min-w-0 flex-1 truncate bg-transparent font-mono text-xs text-cream focus:outline-none" />
            
              <button
              type="button"
              onClick={copy}
              disabled={!canShare}
              aria-label="Copy share link"
              className="inline-flex h-8 shrink-0 items-center gap-1 rounded-lg px-2.5 text-xs font-semibold text-sky hover:bg-cream/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky disabled:opacity-50">
              
                <CopyIcon className="h-3.5 w-3.5" aria-hidden="true" />
                Copy
              </button>
            </div>
            <p
            id="share-status"
            role="status"
            aria-live="polite"
            className={`mt-2 min-h-[1.25rem] text-sm ${isError ? 'text-cream' : 'text-sky'}`}>
            
              {message}
            </p>
          </section>
        }
      </header>

      {items.length === 0 ?
      <div className="mx-auto mt-16 flex max-w-md flex-col items-center text-center">
          <div className="grid h-20 w-20 place-items-center rounded-2xl bg-sky">
            <StarIcon className="h-9 w-9 text-ink" strokeWidth={1.75} aria-hidden="true" />
          </div>
          <h2 className="mt-6 font-display text-3xl font-semibold tracking-[-0.03em] text-ink">Nothing saved yet</h2>
          <p className="mt-3 text-ink-soft">
            Tap the star on anything you’d like to unwrap. It’ll show up here, ready to share.
          </p>
          <p className="mt-2 text-sm text-ink-muted">Sharing unlocks once you’ve starred at least one product.</p>
          <button
          type="button"
          onClick={onBrowse}
          className="mt-8 inline-flex h-12 items-center rounded-full bg-ink px-6 text-[15px] font-semibold text-cream transition-[background-color,transform] duration-150 ease-out hover:bg-ink/90 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-deep focus-visible:ring-offset-2 focus-visible:ring-offset-cream">
          
            Browse the gift guide
          </button>
        </div> :

      <section aria-labelledby="saved-heading" className="pt-10 lg:pt-14">
          <h2 id="saved-heading" className="sr-only">
            Saved picks
          </h2>
          <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence initial={false}>
              {items.map((product) =>
            <motion.li
              key={product.id}
              layout={!reduce}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: reduce ? 0 : 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col">
              
                  <div className="relative overflow-hidden rounded-2xl bg-sand">
                    <img src={product.image} alt="" className="aspect-square w-full object-contain p-8 mix-blend-multiply" />
                    <div className="absolute right-3 top-3">
                      <SaveButton productName={product.name} selected onToggle={() => onToggle(product.id)} />
                    </div>
                  </div>
                  <p className="mt-4 font-mono text-xs text-ink-muted">{getCategory(product.category).name}</p>
                  <h3 className="mt-1 font-display text-xl font-semibold leading-tight tracking-[-0.02em] text-ink">
                    {product.name}
                  </h3>
                  <button
                type="button"
                onClick={() => onOpenInGuide(`product-${product.id}`)}
                className="mt-1 self-start rounded text-sm text-ink-soft underline decoration-ink/25 underline-offset-4 hover:text-ink hover:decoration-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-deep">
                
                    {product.maker} · view in guide
                  </button>
                  <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                    <Price amount={product.price} size="md" />
                    <a
                  href={product.buyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 items-center gap-1 rounded-full bg-ink px-4 text-sm font-semibold text-cream transition-[background-color,transform] duration-150 ease-out hover:bg-ink/90 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-deep focus-visible:ring-offset-2 focus-visible:ring-offset-cream">
                  
                      Buy
                      <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
                      <span className="sr-only">{product.name} (opens retailer site)</span>
                    </a>
                  </div>
                </motion.li>
            )}
            </AnimatePresence>
          </ul>
          <button
          type="button"
          onClick={onBrowse}
          className="mt-14 rounded text-sm font-semibold text-sky-deep underline decoration-sky decoration-2 underline-offset-4 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-deep">
          
            Keep browsing the gift guide
          </button>
        </section>
      }
    </main>);

}