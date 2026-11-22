import React from 'react';

interface PixelFlakeProps {
  className?: string;
}

const GRID = ['...X...', '.X.X.X.', '..XXX..', 'XXXXXXX', '..XXX..', '.X.X.X.', '...X...'];

export function PixelFlake({ className = '' }: PixelFlakeProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 7 7" shapeRendering="crispEdges" className={className}>
      {GRID.flatMap((row, y) =>
      Array.from(row).map((cell, x) =>
      cell === 'X' ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="currentColor" /> : null
      )
      )}
    </svg>);

}