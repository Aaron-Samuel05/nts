import React from 'react'

const categoryItems = [
  'VODKA',
  'BOTTLING SERVICES',
  'BULK DE-MINERALIZED SPIRITS',
  'QUALITY CONTROL LAB',
  'WHISKY',
  'BRANDY',
  'RUM',
  'GIN',
  'BEER',
  'EXPORT LAGER',
]

export default function CategoryMarquee() {
  const tickerItems = [...categoryItems, ...categoryItems, ...categoryItems, ...categoryItems]

  return (
    <div className="home-category-marquee w-full overflow-hidden bg-coral-orange py-3 text-white">
      <div className="inline-flex min-w-max animate-marquee items-center whitespace-nowrap hover:[animation-play-state:paused] motion-reduce:animate-none">
        {tickerItems.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="inline-flex items-center font-sans text-[11px] font-black uppercase tracking-[0.18em] text-white"
          >
            <span className="mx-8 inline-block h-1.5 w-1.5 rounded-full bg-white/80" aria-hidden="true" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
