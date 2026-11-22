import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { StarIcon } from 'lucide-react';

interface SaveButtonProps {
  productName: string;
  selected: boolean;
  onToggle: () => void;
  variant?: 'full' | 'icon';
}

const FOCUS =
'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-deep focus-visible:ring-offset-2 focus-visible:ring-offset-cream';

export function SaveButton({ productName, selected, onToggle, variant = 'icon' }: SaveButtonProps) {
  const reduce = useReducedMotion();

  const star =
  <motion.span
    key={String(selected)}
    initial={{ scale: selected && !reduce ? 0.6 : 1 }}
    animate={{ scale: 1 }}
    transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
    className="grid place-items-center">
    
      <StarIcon
      aria-hidden="true"
      className={variant === 'full' ? 'h-[18px] w-[18px]' : 'h-5 w-5'}
      strokeWidth={2}
      fill={selected ? 'currentColor' : 'none'} />
    
    </motion.span>;


  if (variant === 'full') {
    return (
      <button
        type="button"
        aria-pressed={selected}
        aria-label={`Add ${productName} to My Wish List`}
        onClick={onToggle}
        className={`inline-flex h-12 shrink-0 items-center gap-2.5 whitespace-nowrap rounded-full px-5 text-sm font-semibold transition-[background-color,border-color,color,transform] duration-150 ease-out active:scale-[0.97] ${FOCUS} ${
        selected ?
        'bg-ink text-cream hover:bg-ink/90 [&_svg]:text-sky' :
        'border border-ink/25 text-ink hover:border-ink hover:bg-paper'}`
        }>
        
        {star}
        <span>{selected ? 'Saved to My Wish List' : 'Add to My Wish List'}</span>
      </button>);

  }

  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={`Add ${productName} to My Wish List`}
      onClick={onToggle}
      className={`grid h-11 w-11 shrink-0 place-items-center rounded-full transition-[background-color,border-color,color,transform] duration-150 ease-out active:scale-[0.94] ${FOCUS} ${
      selected ? 'bg-ink text-sky hover:bg-ink/90' : 'border border-ink/15 bg-cream text-ink hover:border-ink/40 hover:bg-paper'}`
      }>
      
      {star}
    </button>);

}