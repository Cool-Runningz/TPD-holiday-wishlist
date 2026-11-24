import { ArrowUpRightIcon } from 'lucide-react';
import type { Product } from '../../types/catalog';
import { Price } from '../shared/Price';
import { SaveButton } from '../shared/SaveButton';

interface ProductListRowProps {
  product: Product;
  selected: boolean;
  onToggle: (id: string) => void;
}

export function ProductListRow({ product, selected, onToggle }: ProductListRowProps) {
  const titleId = `title-${product.id}`;

  return (
    <li
      id={`product-${product.id}`}
      aria-labelledby={titleId}
      className="grid scroll-mt-40 grid-cols-[72px_minmax(0,1fr)_auto] items-center gap-4 py-4 sm:grid-cols-[96px_minmax(0,1fr)_110px_auto] sm:gap-6">
      
      <div className="overflow-hidden rounded-xl border border-ink/10 bg-white">
        <img src={product.image} alt="" className="aspect-square w-full object-contain p-1.5" />
      </div>
      <div className="min-w-0">
        <p className="font-mono text-[11px] text-ink-muted">
          {product.maker} 
        </p>
        <h3 id={titleId} className="mt-0.5 font-display text-lg font-semibold tracking-[-0.01em] text-ink">
          {product.name}
        </h3>
        <p className="mt-1 hidden text-sm leading-relaxed text-ink-soft md:block">{product.description}</p>
        <div className="mt-1 sm:hidden">
          <Price amount={product.price} size="sm" />
        </div>
      </div>
      <div className="hidden justify-self-end sm:block">
        <Price amount={product.price} size="md" />
      </div>
      <div className="flex items-center gap-2 justify-self-end">
        <a
          href={product.buyUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-10 items-center gap-1 rounded-full bg-ink px-3 text-sm font-semibold text-cream transition-[background-color,transform] duration-150 ease-out hover:bg-ink/90 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-deep focus-visible:ring-offset-2 focus-visible:ring-offset-cream">
          View
          <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">{product.name} (opens retailer site)</span>
        </a>
        <SaveButton productName={product.name} selected={selected} onToggle={() => onToggle(product.id)} />
      </div>
    </li>);

}