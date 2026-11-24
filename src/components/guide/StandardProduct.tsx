import { ArrowUpRightIcon } from 'lucide-react';
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
          <div className="flex items-center gap-2">
            <a
              href={product.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center gap-1 rounded-full bg-ink px-4 text-sm font-semibold text-cream transition-[background-color,transform] duration-150 ease-out hover:bg-ink/90 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-deep focus-visible:ring-offset-2 focus-visible:ring-offset-cream">
              View
              <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">{product.name} (opens retailer site)</span>
            </a>
          </div>
        </div>
      </div>
    </article>);

}