import React from 'react';
import { StarIcon } from 'lucide-react';
import type { Product } from '../../types/catalog';
import { Price } from '../shared/Price';
import { SaveButton } from '../shared/SaveButton';

interface StandardProductProps {
  product: Product;
  selected: boolean;
  onToggle: (id: string) => void;
  /** Single-product categories lay out image and text side by side */
  wide?: boolean;
}

export function StandardProduct({ product, selected, onToggle, wide = false }: StandardProductProps) {
  const titleId = `title-${product.id}`;

  return (
    <article
      id={`product-${product.id}`}
      aria-labelledby={titleId}
      className={`flex scroll-mt-40 flex-col ${wide ? 'sm:grid sm:grid-cols-2 sm:items-center sm:gap-10' : ''}`}>
      
      <div className="relative overflow-hidden rounded-2xl bg-sand">
        <img src={product.image} alt="" className="aspect-[4/3] w-full object-contain p-6 mix-blend-multiply" />
        <div className="absolute right-3 top-3">
          <SaveButton productName={product.name} selected={selected} onToggle={() => onToggle(product.id)} />
        </div>
      </div>

      <div className={`mt-5 flex flex-1 flex-col ${wide ? 'sm:mt-0' : ''}`}>
        <p className="font-mono text-xs text-ink-muted">
          {product.maker} 
        </p>
        <h3 id={titleId} className="mt-1.5 font-display text-xl font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-2xl">
          {product.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">{product.description}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <Price amount={product.price} size="md" />
          {selected &&
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-ink">
              <StarIcon className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true" />
              Saved
            </span>
          }
        </div>
      </div>
    </article>);

}