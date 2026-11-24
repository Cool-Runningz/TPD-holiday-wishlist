import React from 'react';
import { formatPrice } from '../../utils/catalog';

interface PriceProps {
  amount?: number;
  size?: 'sm' | 'md' | 'lg';
}

const SIZES = {
  sm: 'text-base',
  md: 'text-lg',
  lg: 'text-3xl tracking-[-0.02em]'
};

export function Price({ amount, size = 'md' }: PriceProps) {
  if (amount === undefined) return null;

  return (
    <p className={`whitespace-nowrap font-display font-semibold leading-none text-ink tabular-nums ${SIZES[size]}`}>
      {formatPrice(amount)}
    </p>);

}