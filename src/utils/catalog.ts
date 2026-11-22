import { categories } from '../data/categories';
import { products } from '../data/products';
import type { Category, CategoryId, Product } from '../types/catalog';

export function getProduct(id: string): Product {
  const product = products.find((p) => p.id === id);
  if (!product) throw new Error(`Unknown product: ${id}`);
  return product;
}

export function getCategory(id: CategoryId): Category {
  const category = categories.find((c) => c.id === id);
  if (!category) throw new Error(`Unknown category: ${id}`);
  return category;
}

export function productsInCategory(id: CategoryId): Product[] {
  return products.filter((p) => p.category === id);
}

export function formatCurrency(amount: number): string {
  return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

export function formatPrice(amount: number): string {
  return Number.isInteger(amount) ? `$${amount.toLocaleString('en-US')}` : formatCurrency(amount);
}