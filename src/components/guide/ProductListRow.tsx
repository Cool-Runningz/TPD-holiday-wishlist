import React from 'react';
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
      <SaveButton productName={product.name} selected={selected} onToggle={() => onToggle(product.id)} />
    </li>);

}