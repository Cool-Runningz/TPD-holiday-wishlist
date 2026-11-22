import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDownIcon, StarIcon } from 'lucide-react';
import { getProduct } from '../../utils/catalog';
import { PixelFlake } from '../shared/PixelFlake';
interface GuideHeroProps {
  savedCount: number;
  onBrowse: () => void;
  onOpenWishList: () => void;
}
const COLLAGE = [{
  id: 'remarkable',
  tag: 'remarkable/paper-pro',
  box: 'left-[1%] top-[3%] w-[45%] -rotate-[5deg]',
  tagPos: 'bottom-[16%] left-[18%]'
}, {
  id: 'headphones',
  tag: 'sony/wh-1000xm6',
  box: 'right-[3%] top-[1%] w-[41%]',
  tagPos: 'bottom-[12%] right-[6%]'
}, {
  id: 'keyboard',
  tag: 'keychron/q1-max',
  box: 'bottom-[-4%] left-[-3%] w-[68%]',
  tagPos: 'bottom-[20%] left-[14%]'
}, {
  id: 'bonsai',
  tag: 'lego/bonsai',
  box: 'bottom-[1%] right-[1%] w-[35%]',
  tagPos: 'bottom-[10%] left-[4%]'
}];
export function GuideHero({
  savedCount,
  onBrowse,
  onOpenWishList
}: GuideHeroProps) {
  const reduce = useReducedMotion();
  return <section aria-labelledby="guide-title" className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
      <div className="grid items-center gap-10 py-10 lg:grid-cols-12 lg:gap-12 lg:py-16">
        <div className="lg:col-span-6">
          <p className="flex items-center gap-2 font-mono text-xs text-ink-soft">
            <span aria-hidden="true" className="h-2 w-2 bg-sky-deep" />
            Holiday gift guide · Edition 2026
          </p>
          <h1 id="guide-title" className="mt-6 font-display font-semibold text-ink">
            <span className="block text-xl tracking-[-0.01em] sm:text-2xl">The Productive Dev</span>
            <span className="mt-3 block text-[clamp(52px,7.2vw,104px)] leading-[0.92] tracking-[-0.045em]">
              Holiday
              <br />
              Wish List{' '}
              <span className="inline-block rounded-2xl bg-sky px-3 pb-1 leading-[1.02]">2026</span>
            </span>
          </h1>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            
            <button type="button" onClick={onOpenWishList} className="inline-flex h-12 items-center gap-2 rounded-full border border-ink/25 px-6 text-[15px] font-semibold text-ink transition-[border-color,background-color] duration-150 ease-out hover:border-ink hover:bg-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-deep focus-visible:ring-offset-2 focus-visible:ring-offset-cream">
              <StarIcon className="h-4 w-4" aria-hidden="true" fill={savedCount > 0 ? 'currentColor' : 'none'} />
              My Wish List
              <span className="font-mono text-xs text-ink-muted">({savedCount})</span>
            </button>
          </div>
          
        </div>

        <div className="lg:col-span-6">
          <div role="img" aria-label="A collage of picks from this year's list: a reMarkable tablet, Sony headphones, a Keychron keyboard, and a LEGO bonsai." className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border-2 border-sky bg-white sm:aspect-[5/4]">
            <svg aria-hidden="true" className="absolute inset-0 h-full w-full text-ink/10">
              <defs>
                <pattern id="hero-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                  <rect width="2" height="2" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hero-grid)" />
            </svg>

            <PixelFlake className="absolute left-[47%] top-[43%] h-7 w-7 text-ink sm:h-9 sm:w-9" />

            {COLLAGE.map((item, i) => <motion.div key={item.id} className={`absolute ${item.box}`} initial={reduce ? false : {
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.24,
            delay: 0.05 + i * 0.05,
            ease: [0.23, 1, 0.32, 1]
          }}>
                <img src={getProduct(item.id).image} alt="" className="w-full mix-blend-multiply" />
                <span aria-hidden="true" className={`absolute ${item.tagPos} hidden rounded-md bg-ink px-2 py-1 font-mono text-[11px] text-cream sm:block`}>
                  {item.tag}
                </span>
              </motion.div>)}
          </div>
        </div>
      </div>
    </section>;
}