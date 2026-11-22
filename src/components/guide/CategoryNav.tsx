import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { LayoutGridIcon, ListIcon } from 'lucide-react';
import { categories } from '../../data/categories';
import type { CategoryId, GuideLayout } from '../../types/catalog';
import { productsInCategory } from '../../utils/catalog';

interface CategoryNavProps {
  activeId: string;
  onSelect: (id: CategoryId) => void;
  layout: GuideLayout;
  onLayoutChange: (layout: GuideLayout) => void;
}

const LAYOUTS: {id: GuideLayout;label: string;Icon: typeof ListIcon;}[] = [
{ id: 'grid', label: 'Grid', Icon: LayoutGridIcon },
{ id: 'list', label: 'List', Icon: ListIcon }];


export function CategoryNav({ activeId, onSelect, layout, onLayoutChange }: CategoryNavProps) {
  const reduce = useReducedMotion();

  return (
    <div className="sticky top-16 z-30 border-y border-ink/10 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1320px] items-center gap-2 px-2 sm:px-4 lg:px-6">
        <nav aria-label="Gift categories" className="min-w-0 flex-1">
          <ul className="flex overflow-x-auto">
            {categories.map((category) => {
              const active = activeId === category.id;
              return (
                <li key={category.id} className="shrink-0">
                  <a
                    href={`#${category.id}`}
                    aria-current={active ? 'true' : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      onSelect(category.id);
                    }}
                    className={`relative flex h-14 items-center gap-1.5 whitespace-nowrap px-3 text-sm font-semibold transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-deep ${
                    active ? 'text-ink' : 'text-ink-soft hover:text-ink'}`
                    }>
                    
                    {category.name}
                    <span className="font-mono text-[11px] font-normal text-ink-muted">
                      {productsInCategory(category.id).length}
                    </span>
                    {active &&
                    <motion.span
                      layoutId="category-indicator"
                      aria-hidden="true"
                      className="absolute inset-x-3 bottom-0 h-[3px] bg-sky-deep"
                      transition={{ duration: reduce ? 0 : 0.2, ease: [0.23, 1, 0.32, 1] }} />

                    }
                  </a>
                </li>);

            })}
          </ul>
        </nav>

        <div
          role="group"
          aria-label="Product layout"
          className="flex shrink-0 items-center gap-0.5 rounded-full border border-ink/15 bg-paper p-1">
          
          {LAYOUTS.map(({ id, label, Icon }) => {
            const active = layout === id;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={active}
                aria-label={`${label} view`}
                onClick={() => onLayoutChange(id)}
                className={`inline-flex h-8 items-center gap-1.5 rounded-full px-2.5 text-[13px] font-semibold transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-deep sm:px-3 ${
                active ? 'bg-ink text-cream' : 'text-ink-soft hover:text-ink'}`
                }>
                
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">{label}</span>
              </button>);

          })}
        </div>
      </div>
    </div>);

}