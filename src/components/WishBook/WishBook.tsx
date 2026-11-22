import React from 'react';
import type { View } from '../../types/catalog';
import { ImportNotice } from '../shared/ImportNotice';
import { SavedTray } from '../shared/SavedTray';
import { TopBar } from '../TopBar';
import { GuideView } from '../views/GuideView';
import { WishListView } from '../views/WishListView';
import { useWishBook } from './useWishBook';

interface WishBookProps {
  initialView: View;
  preselected: boolean;
}

export function WishBook({ initialView, preselected }: WishBookProps) {
  const wb = useWishBook(initialView, preselected);

  return (
    <div className="min-h-screen w-full bg-cream font-sans text-ink">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-cream">
        
        Skip to content
      </a>

      <TopBar view={wb.view} count={wb.items.length} onNavigate={wb.navigate} />

      {wb.notice && <ImportNotice notice={wb.notice} onDismiss={wb.dismissNotice} />}

      <div id="content">
        {wb.view === 'guide' &&
        <GuideView
          selectedIds={wb.selectedIds}
          onToggle={wb.toggle}
          onOpenWishList={() => wb.navigate('wishlist')}
          layout={wb.layout}
          onLayoutChange={wb.setLayout} />

        }
        {wb.view === 'wishlist' &&
        <WishListView
          items={wb.items}
          onToggle={wb.toggle}
          onBrowse={() => wb.navigate('guide')}
          onOpenInGuide={wb.openInGuide} />

        }
      </div>

      {wb.view !== 'wishlist' && wb.items.length > 0 &&
      <SavedTray count={wb.items.length} onOpen={() => wb.navigate('wishlist')} />
      }

      <div aria-live="polite" className="sr-only">
        {wb.announcement}
      </div>
    </div>);

}