export type CategoryId = 'gadgets-tech' | 'home-office' | 'fitness-fun';

export type View = 'guide' | 'wishlist';

export type GuideLayout = 'grid' | 'list';

export interface Category {
  id: CategoryId;
  name: string;
  tagline: string;
}

export interface Product {
  id: string;
  name: string;
  maker: string;
  category: CategoryId;
  price?: number;
  description: string;
  image: string;
  url: string;
}