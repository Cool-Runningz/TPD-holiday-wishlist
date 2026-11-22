export type CategoryId = 'home-office' | 'e-ink' | 'tech' | 'fitness' | 'wellness';

export type View = 'guide' | 'wishlist';

export type GuideLayout = 'grid' | 'list';

export interface Category {
  id: CategoryId;
  name: string;
  tagline: string;
  intro: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  maker: string;
  category: CategoryId;
  price: number;
  description: string;
  image: string;
  buyUrl: string;
}