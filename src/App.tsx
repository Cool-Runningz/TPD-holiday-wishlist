import React from 'react';
import { WishBook } from './components/WishBook/WishBook';

interface AppProps {
  startingView?: 'guide' | 'wishlist';
  preselectedItems?: boolean;
}

export function App({ startingView = 'guide', preselectedItems = false }: AppProps) {
  return (
    <WishBook
      key={`${startingView}-${preselectedItems}`}
      initialView={startingView}
      preselected={preselectedItems} />);


}