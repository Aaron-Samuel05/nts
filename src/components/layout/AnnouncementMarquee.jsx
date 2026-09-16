import React from 'react'
import { announcementItems } from '../../data/siteData'

export default function AnnouncementMarquee() {
  const tickerItems = [...announcementItems, ...announcementItems, ...announcementItems]

  return (
    <div className="w-full overflow-hidden border-b border-white/10 bg-[#030303] py-2 text-white">
      <div className="inline-flex min-w-max animate-marquee items-center whitespace-nowrap hover:[animation-play-state:paused] motion-reduce:animate-none">
        {tickerItems.map((item, index) => (
          <span key={`${item}-${index}`} className="inline-flex items-center font-sans text-[11px] font-black uppercase tracking-[0.18em] text-white/90">
            <span className="mx-6 sm:mx-8 inline-block h-1.5 w-1.5 rounded-full bg-[#E9542E]" aria-hidden="true" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
