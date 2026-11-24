import type { Category, GuideLayout } from '../../types/catalog';
import { productsInCategory } from '../../utils/catalog';
import { ProductListRow } from './ProductListRow';
import { StandardProduct } from './StandardProduct';

interface CategorySectionProps {
  category: Category;
  layout: GuideLayout;
  selectedIds: string[];
  onToggle: (id: string) => void;
}

const GRID_COLUMNS: Record<number, string> = {
  1: '',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-2'
};

export function CategorySection({ category, layout, selectedIds, onToggle }: CategorySectionProps) {
  const items = productsInCategory(category.id);
  const headingId = `heading-${category.id}`;
  const isList = layout === 'list';

  return (
    <section
      id={category.id}
      aria-labelledby={headingId}
      className={`grid scroll-mt-32 gap-8 border-t border-ink/10 first:border-t-0 lg:grid-cols-12 lg:gap-x-16 ${
      isList ? 'py-12 lg:py-14' : 'py-16 lg:py-24'}`
      }>
      
      <header className="lg:col-span-4 lg:pr-4">
        <p className="font-mono text-xs text-sky-deep">
          {'{ '}
          {items.length} {items.length === 1 ? 'pick' : 'picks'}
          {' }'}
        </p>
        <h2
          id={headingId}
          className={`mt-3 font-display font-semibold leading-[1.02] tracking-[-0.035em] text-ink ${
          isList ? 'text-3xl' : 'text-4xl lg:text-[44px]'}`
          }>
          
          {category.name}
        </h2>
        <p className={`mt-4 font-display font-medium leading-snug text-ink ${isList ? 'text-lg' : 'text-xl'}`}>
          {category.tagline}
        </p>
      </header>

      <div className="lg:col-span-8">
        {isList ?
        <ul className="divide-y divide-ink/10 [&>li:first-child]:pt-0 [&>li:last-child]:pb-0">
            {items.map((product) =>
          <ProductListRow
            key={product.id}
            product={product}
            selected={selectedIds.includes(product.id)}
            onToggle={onToggle} />

          )}
          </ul> :

        <div className={`grid gap-x-8 gap-y-12 ${GRID_COLUMNS[items.length] ?? 'sm:grid-cols-2'}`}>
            {items.map((product) =>
          <StandardProduct
            key={product.id}
            product={product}
            wide={items.length === 1}
            selected={selectedIds.includes(product.id)}
            onToggle={onToggle} />

          )}
          </div>
        }
      </div>
    </section>);

}