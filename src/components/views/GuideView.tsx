import React from 'react';
import { useReducedMotion } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';
import { categories } from '../../data/categories';
import { useActiveSection } from '../../hooks/useActiveSection';
import type { GuideLayout } from '../../types/catalog';
import { CategoryNav } from '../guide/CategoryNav';
import { CategorySection } from '../guide/CategorySection';
import { GuideHero } from '../guide/GuideHero';
import { PixelFlake } from '../shared/PixelFlake';

interface GuideViewProps {
  selectedIds: string[];
  onToggle: (id: string) => void;
  onOpenWishList: () => void;
  layout: GuideLayout;
  onLayoutChange: (layout: GuideLayout) => void;
}

const CATEGORY_IDS = categories.map((c) => c.id);

export function GuideView({ selectedIds, onToggle, onOpenWishList, layout, onLayoutChange }: GuideViewProps) {
  const reduce = useReducedMotion();
  const activeId = useActiveSection(CATEGORY_IDS);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ block: 'start', behavior: reduce ? 'auto' : 'smooth' });
  };

  const changeLayout = (next: GuideLayout) => {
    if (next === layout) return;
    // If the reader is already inside the picks, keep their current category in view after the swap
    const section = document.getElementById(activeId);
    const insidePicks = section ? section.getBoundingClientRect().top < 140 : false;
    onLayoutChange(next);
    if (insidePicks) {
      requestAnimationFrame(() => document.getElementById(activeId)?.scrollIntoView({ block: 'start' }));
    }
  };

  return (
    <main>
      <GuideHero
        savedCount={selectedIds.length}
        onBrowse={() => scrollTo(CATEGORY_IDS[0])}
        onOpenWishList={onOpenWishList} />
      

      <CategoryNav activeId={activeId} onSelect={scrollTo} layout={layout} onLayoutChange={changeLayout} />

      <div className="mx-auto w-full max-w-[1320px] px-4 pb-32 sm:px-6 lg:px-8">
        {categories.map((category) =>
        <CategorySection
          key={category.id}
          category={category}
          layout={layout}
          selectedIds={selectedIds}
          onToggle={onToggle} />

        )}

        <footer className="flex flex-col items-start gap-6 border-t border-ink/10 pt-12 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <PixelFlake className="h-8 w-8 shrink-0 text-sky-deep" />
            <p className="font-display text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl">
              Happy holidays!
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenWishList}
            className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-ink px-6 text-[15px] font-semibold text-cream transition-[background-color,transform] duration-150 ease-out hover:bg-ink/90 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-deep focus-visible:ring-offset-2 focus-visible:ring-offset-cream">
            
            See My Wish List
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </button>
        </footer>
      </div>
    </main>);

}